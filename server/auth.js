import { q } from './db.js';
import { newId, sha256, randomCode, randomToken, normalizePhone, hashPassword, checkPassword, cleanPassword } from './ids.js';
import { sendLoginCode } from './sms.js';
import { isAdmin } from './access.js';
import { linkInvites } from './store.js';

const COOKIE = 'smarto_session';
const SESSION_DAYS = 60;
const CODE_TTL = 2 * 60 * 1000;
const RESEND_AFTER = 60 * 1000;
const MAX_ATTEMPTS = 5;
const MIN_PASSWORD = 6;
const MAX_FAILS = 8;
const LOCK_MS = 15 * 60 * 1000;
const pepper = () => process.env.SESSION_SECRET || 'dev-secret';

export async function currentUser(req) {
  const tok = req.cookies?.[COOKIE];
  if (!tok) return null;
  const r = await q(
    `select u.id, u.phone from sessions s join users u on u.id=s.user_id where s.token_hash=$1 and s.expires_at>$2 and not u.blocked`,
    [sha256(tok + pepper()), Date.now()],
  );
  return r.rows[0] || null;
}

async function signIn(reply, u) {
  await q('update users set last_login=$2 where id=$1', [u.id, Date.now()]);
  const tok = randomToken();
  await q('insert into sessions(token_hash,user_id,expires_at) values($1,$2,$3)', [sha256(tok + pepper()), u.id, Date.now() + SESSION_DAYS * 864e5]);
  await linkInvites(u);
  reply.setCookie(COOKIE, tok, {
    path: '/', httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', maxAge: SESSION_DAYS * 86400,
  });
  return { id: u.id, phone: u.phone, isAdmin: isAdmin(u) };
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
    return h.length <= (Number(process.env.LOGIN_IP_LIMIT) || 30);
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
    if (!phone) return reply.code(400).send({ error: 'bad_code' });
    {
      if (!/^\d{5}$/.test(code)) return reply.code(400).send({ error: 'bad_code' });
      const r = await q('select * from otps where phone=$1', [phone]);
      const o = r.rows[0];
      if (!o || Number(o.expires_at) < Date.now() || o.attempts >= MAX_ATTEMPTS) return reply.code(400).send({ error: 'expired' });
      if (o.code_hash !== sha256(phone + code + pepper())) {
        await q('update otps set attempts=attempts+1 where phone=$1', [phone]);
        return reply.code(400).send({ error: 'wrong_code' });
      }
      await q('delete from otps where phone=$1', [phone]);
    }
    let u = (await q('select id, phone, blocked from users where phone=$1', [phone])).rows[0];
    if (u?.blocked) return reply.code(403).send({ error: 'blocked' });
    if (!u) {
      u = { id: newId(), phone };
      await q('insert into users(id,phone,created_at) values($1,$2,$3)', [u.id, phone, Date.now()]);
    }
    return signIn(reply, u);
  });

  // Phone and password. Signing up creates the account, or sets the first password of an account
  // that never had one. The admin phone never signs up this way: it logs in with a code first and
  // sets its password from «حساب من».
  app.post('/api/auth/signup', perPhone(10), async (req, reply) => {
    const phone = normalizePhone(req.body?.phone);
    const pw = cleanPassword(req.body?.password);
    if (!phone) return reply.code(400).send({ error: 'bad_phone' });
    if (!ipAllowed(req.ip)) return reply.code(429).send({ error: 'too_many' });
    if (pw.length < MIN_PASSWORD || pw.length > 100) return reply.code(400).send({ error: 'weak_password' });
    if (isAdmin({ phone })) return reply.code(403).send({ error: 'admin_use_code' });
    let u = (await q('select id, phone, blocked, password_hash from users where phone=$1', [phone])).rows[0];
    if (u?.blocked) return reply.code(403).send({ error: 'blocked' });
    if (u?.password_hash) return reply.code(409).send({ error: 'exists' });
    if (!u) {
      u = { id: newId(), phone };
      await q('insert into users(id,phone,created_at,password_hash) values($1,$2,$3,$4)', [u.id, phone, Date.now(), hashPassword(pw)]);
    } else {
      const r = await q('update users set password_hash=$2, failed_logins=0 where id=$1 and password_hash is null returning 1', [u.id, hashPassword(pw)]);
      if (!r.rows[0]) return reply.code(409).send({ error: 'exists' });
    }
    return signIn(reply, u);
  });

  app.post('/api/auth/login', perPhone(20), async (req, reply) => {
    const phone = normalizePhone(req.body?.phone);
    if (!phone) return reply.code(400).send({ error: 'bad_phone' });
    if (!ipAllowed(req.ip)) return reply.code(429).send({ error: 'too_many' });
    const u = (await q('select id, phone, blocked, password_hash, failed_logins, locked_until from users where phone=$1', [phone])).rows[0];
    if (!u || !u.password_hash) return reply.code(404).send({ error: 'no_account' });
    if (u.blocked) return reply.code(403).send({ error: 'blocked' });
    if (Number(u.locked_until) > Date.now()) return reply.code(429).send({ error: 'locked', retryIn: Math.ceil((Number(u.locked_until) - Date.now()) / 1000) });
    if (!checkPassword(req.body?.password, u.password_hash)) {
      const fails = u.failed_logins + 1;
      await q('update users set failed_logins=$2, locked_until=$3 where id=$1',
        [u.id, fails >= MAX_FAILS ? 0 : fails, fails >= MAX_FAILS ? Date.now() + LOCK_MS : 0]);
      return reply.code(400).send({ error: 'wrong_password' });
    }
    await q('update users set failed_logins=0, locked_until=0 where id=$1', [u.id]);
    return signIn(reply, u);
  });

  // Sets or changes the signed-in user's password. Changing needs the current one.
  app.post('/api/auth/password', async (req, reply) => {
    if (!req.user) return reply.code(401).send({ error: 'login_required' });
    const next = cleanPassword(req.body?.next);
    if (next.length < MIN_PASSWORD || next.length > 100) return reply.code(400).send({ error: 'weak_password' });
    const u = (await q('select password_hash from users where id=$1', [req.user.id])).rows[0];
    if (u?.password_hash && !checkPassword(req.body?.current, u.password_hash)) return reply.code(400).send({ error: 'wrong_password' });
    await q('update users set password_hash=$2, failed_logins=0, locked_until=0 where id=$1', [req.user.id, hashPassword(next)]);
    // Other devices are signed out; this one stays.
    const tok = String(req.cookies?.[COOKIE] || '');
    await q('delete from sessions where user_id=$1 and token_hash<>$2', [req.user.id, sha256(tok + pepper())]);
    return { ok: true };
  });

  app.post('/api/auth/logout', async (req, reply) => {
    const tok = req.cookies?.[COOKIE];
    if (tok) await q('delete from sessions where token_hash=$1', [sha256(tok + pepper())]);
    reply.clearCookie(COOKIE, { path: '/' });
    return { ok: true };
  });

  app.get('/api/me', async (req) => {
    const u = req.user;
    if (!u) return { id: null };
    const r = await q('select password_hash is not null as has from users where id=$1', [u.id]);
    return { id: u.id, phone: u.phone, isAdmin: isAdmin(u), hasPassword: !!r.rows[0]?.has };
  });
}
