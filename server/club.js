import { q } from './db.js';
import { wsAccess, AccessError } from './access.js';
import { isPaid } from './costs.js';
import { newId, normalizePhone } from './ids.js';
import { bus } from './store.js';

// SMS to a business's own customers (customer club, Pro/VIP). Each panel has a monthly allowance;
// every send is logged in its smslog. Without KAVENEGAR_API_KEY and KAVENEGAR_SENDER nothing leaves
// the server: the send is logged as a test.
export const SMS_QUOTA = { pro: 300, vip: 1000 };
const MAX_TO = 500;
const MAX_TEXT = 500;
const monthKey = () => new Date().toISOString().slice(0, 7);
const configured = () => !!(process.env.KAVENEGAR_API_KEY && process.env.KAVENEGAR_SENDER);

export async function smsUsed(wsId) {
  const r = await q(`select coalesce(sum((data->>'count')::int),0) as n from docs where parent=$1 and data->>'month'=$2 and data->>'status'<>'خطا'`,
    [`workspaces/${wsId}/smslog`, monthKey()]);
  return Number(r.rows[0].n);
}
export const quotaOf = (ws) => Number(ws.smsQuota) || SMS_QUOTA[ws.plan] || 0;

async function kavenegar(receptors, message) {
  const url = `https://api.kavenegar.com/v1/${encodeURIComponent(process.env.KAVENEGAR_API_KEY)}/sms/send.json`;
  const body = new URLSearchParams({ receptor: receptors.join(','), message, sender: process.env.KAVENEGAR_SENDER });
  const res = await fetch(url, { method: 'POST', body });
  if (!res.ok) throw new Error('sms_failed:' + res.status + ' ' + (await res.text().catch(() => '')).slice(0, 200));
}

export function clubRoutes(app) {
  app.get('/api/sms/status', async (req) => {
    const wsId = String(req.query.ws || '');
    const a = await wsAccess({ user: req.user }, wsId);
    if (!a.read) throw new AccessError(403, 'permission_denied');
    return { quota: isPaid(a.ws) ? quotaOf(a.ws) : 0, used: await smsUsed(wsId), live: configured() };
  });

  app.post('/api/sms', async (req) => {
    if (!req.user) throw new AccessError(401, 'login_required');
    const wsId = String(req.body?.ws || '');
    const ctx = { user: req.user };
    const a = await wsAccess(ctx, wsId);
    if (!a.ws) throw new AccessError(404, 'not_found');
    if (!a.write || !['owner', 'gm', 'manager'].includes(a.role)) throw new AccessError(403, 'permission_denied');
    if (!isPaid(a.ws)) throw new AccessError(403, 'plan_required');
    const kind = req.body?.kind === 'promo' ? 'promo' : 'service';
    let text = String(req.body?.text || '').trim();
    if (!text || text.length > MAX_TEXT) throw new AccessError(400, 'bad_text');
    const seen = new Set();
    const to = (Array.isArray(req.body?.to) ? req.body.to : []).map((x) => ({ phone: normalizePhone(x?.phone), name: String(x?.name || '').slice(0, 60) }))
      .filter((x) => x.phone && /^09\d{9}$/.test(x.phone) && !seen.has(x.phone) && seen.add(x.phone)).slice(0, MAX_TO);
    if (!to.length) throw new AccessError(400, 'no_recipients');
    const left = quotaOf(a.ws) - await smsUsed(wsId);
    if (to.length > left) throw new AccessError(402, 'quota');
    // Advertising messages must carry the opt-out keyword by law.
    if (kind === 'promo' && !/لغو\s*(11|۱۱)/.test(text)) text += '\nلغو۱۱';
    const personal = text.includes('{نام}');
    let status = configured() ? 'فرستاده شد' : 'آزمایشی';
    let error = '';
    if (configured()) {
      try {
        if (personal) for (const r of to) await kavenegar([r.phone], text.replaceAll('{نام}', r.name || 'دوست عزیز'));
        else for (let i = 0; i < to.length; i += 200) await kavenegar(to.slice(i, i + 200).map((r) => r.phone), text);
      } catch (e) {
        status = 'خطا';
        error = String(e.message).slice(0, 200);
        req.log.error({ err: error }, 'customer sms failed');
      }
    }
    const id = newId();
    const parent = `workspaces/${wsId}/smslog`;
    const data = {
      date: new Date().toISOString().slice(0, 10), month: monthKey(), kind, text, count: to.length, status, error,
      to: to.slice(0, 200).map((r) => r.phone), segment: String(req.body?.segment || '').slice(0, 60), by: req.user.id, createdAt: Date.now(),
    };
    await q('insert into docs(path,parent,id,data,updated_at) values($1,$2,$3,$4,$5)', [`${parent}/${id}`, parent, id, data, Date.now()]);
    bus.emit('change', parent);
    if (status === 'خطا') throw new AccessError(502, 'sms_failed');
    return { ok: true, status, count: to.length };
  });
}
