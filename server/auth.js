import { q } from './db.js';
import { newId, sha256, randomCode, randomToken, normalizePhone } from './ids.js';
import { sendLoginCode } from './sms.js';
import { isAdmin } from './access.js';
import { linkInvites } from './store.js';

const COOKIE = 'smarto_session';
const SESSION_DAYS = 60;
const CODE_TTL = 2 * 60 * 1000;
const RESEND_AFTER = 60 * 1000;
const MAX_ATTEMPTS = 5;
const pepper = () => process.env.SESSION_SECRET || 'dev-secret';

export async function currentUser(req) {
  const tok = req.cookies?.[COOKIE];
  if (!tok) return null;
  const r = await q(
    `select u.id, u.phone from sessions s join users u on u.id=s.user_id where s.token_hash=$1 and s.expires_at>$2`,
    [sha256(tok + pepper()), Date.now()],
  );
  return r.rows[0] || null;
}

export function authRoutes(app) {
  // Codes are limited per phone number, and each address may ask for a bounded number of
  // different phones (mobile carriers share addresses, so the per-address cap is generous).
  const perPhone = (max) => ({
    config: {
      rateLimit: {
        max, timeWindow: '10 minutes', hook: 'preHandler',
        keyGenerator: (req) => 'p:' + (normalizePhone(req.body?.phone) || req.ip),
      },
    },
  });
  const ipHits = new Map();
  const ipAllowed = (ip) => {
    const t = Date.now();
    const h = (ipHits.get(ip) || []).filter((x) => t - x < 10 * 60 * 1000);
    h.push(t);
    ipHits.set(ip, h);
    if (ipHits.size > 10000) ipHits.clear();
    return h.length <= 30;
  };

  app.post('/api/auth/request', perPhone(5), async (req, reply) => {
    const phone = normalizePhone(req.body?.phone);
    if (!phone) return reply.code(400).send({ error: 'bad_phone' });
    if (!ipAllowed(req.ip)) return reply.code(429).send({ error: 'too_many' });
    const prev = await q('select sent_at from otps where phone=$1', [phone]);
    if (prev.rows[0] && Date.now() - Number(prev.rows[0].sent_at) < RESEND_AFTER) {
      return reply.code(429).send({ error: 'wait', retryIn: Math.ceil((RESEND_AFTER - (Date.now() - Number(prev.rows[0].sent_at))) / 1000) });
    }
    const code = randomCode();
    await q(
      `insert into otps(phone,code_hash,expires_at,attempts,sent_at) values($1,$2,$3,0,$4)
       on conflict(phone) do update set code_hash=excluded.code_hash, expires_at=excluded.expires_at, attempts=0, sent_at=excluded.sent_at`,
      [phone, sha256(phone + code + pepper()), Date.now() + CODE_TTL, Date.now()],
    );
    try { await sendLoginCode(phone, code, req.log); } catch { return reply.code(502).send({ error: 'sms_failed' }); }
    return { ok: true, ttl: CODE_TTL / 1000 };
  });

  app.post('/api/auth/verify', perPhone(10), async (req, reply) => {
    const phone = normalizePhone(req.body?.phone);
    const code = String(req.body?.code || '').replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).trim();
    if (!phone || !/^\d{5}$/.test(code)) return reply.code(400).send({ error: 'bad_code' });
    const r = await q('select * from otps where phone=$1', [phone]);
    const o = r.rows[0];
    if (!o || Number(o.expires_at) < Date.now() || o.attempts >= MAX_ATTEMPTS) return reply.code(400).send({ error: 'expired' });
    if (o.code_hash !== sha256(phone + code + pepper())) {
      await q('update otps set attempts=attempts+1 where phone=$1', [phone]);
      return reply.code(400).send({ error: 'wrong_code' });
    }
    await q('delete from otps where phone=$1', [phone]);
    let u = (await q('select id, phone from users where phone=$1', [phone])).rows[0];
    if (!u) {
      u = { id: newId(), phone };
      await q('insert into users(id,phone,created_at) values($1,$2,$3)', [u.id, phone, Date.now()]);
    }
    const tok = randomToken();
    await q('insert into sessions(token_hash,user_id,expires_at) values($1,$2,$3)', [sha256(tok + pepper()), u.id, Date.now() + SESSION_DAYS * 864e5]);
    await linkInvites(u);
    reply.setCookie(COOKIE, tok, {
      path: '/', httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: SESSION_DAYS * 86400,
    });
    return { id: u.id, phone: u.phone, isAdmin: isAdmin(u) };
  });

  app.post('/api/auth/logout', async (req, reply) => {
    const tok = req.cookies?.[COOKIE];
    if (tok) await q('delete from sessions where token_hash=$1', [sha256(tok + pepper())]);
    reply.clearCookie(COOKIE, { path: '/' });
    return { ok: true };
  });

  app.get('/api/me', async (req) => {
    const u = req.user;
    return u ? { id: u.id, phone: u.phone, isAdmin: isAdmin(u) } : { id: null };
  });
}
