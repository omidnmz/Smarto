import { q } from './db.js';
import { AccessError } from './access.js';
import { isPaid } from './costs.js';
import * as costs from './costs.js';
import { isExpired } from './subscription.js';
import { newId, normalizePhone } from './ids.js';
import { bus } from './store.js';

// The public page of a business: smarto.ir/b/<slug>, or the business's own domain on VIP.
// Every plan gets a page with its menu, services or products, hours and contact, and a form to join
// the customer club. Pro and VIP pages also take bookings (salon, clinic, dental) and orders
// (café, restaurant, shop, retail) straight into the panel.
const FOOD = new Set(['cafe', 'restaurant']);
const APPT = new Set(['salon', 'clinic', 'dental']);
const SHOP = new Set(['shop', 'retail']);
const SLUG = /^[a-z0-9](?:[a-z0-9-]{1,30})[a-z0-9]$/;
const DOMAIN = /^(?=.{4,100}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/;
const TEXT = { about: 600, address: 300, hours: 300, phone: 30, instagram: 60 };
const MAX_ITEMS = 30;
const DAY = 86400000;

// Iran is UTC+3:30 all year.
const tehranNow = () => new Date(Date.now() + 3.5 * 3600000);
const today = () => tehranNow().toISOString().slice(0, 10);
const nowTime = () => tehranNow().toISOString().slice(11, 16);
const str = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : '');
const bad = (code = 'bad_data') => { throw new AccessError(400, code); };

// Cleans the `page` settings an owner saves on their workspace. The custom domain is set by the admin.
export async function cleanPage(page, wsId, oldPage, admin) {
  if (page === null || page === undefined) return page;
  if (typeof page !== 'object' || Array.isArray(page)) bad();
  const out = { on: !!page.on, booking: page.booking !== false, ordering: page.ordering !== false };
  for (const [k, n] of Object.entries(TEXT)) out[k] = str(page[k], n);
  const slug = str(page.slug, 40).toLowerCase();
  if (slug) {
    if (!SLUG.test(slug) || (!admin && slug.startsWith('sample-'))) bad('bad_slug');
    const r = await q(`select 1 from docs where parent='workspaces' and data->'page'->>'slug'=$1 and id<>$2`, [slug, wsId || '']);
    if (r.rows[0]) throw new AccessError(409, 'slug_taken');
    out.slug = slug;
  }
  const domain = admin ? str(page.domain, 100).toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '') : (oldPage?.domain || '');
  if (domain) {
    if (!DOMAIN.test(domain)) bad('bad_domain');
    out.domain = domain;
  }
  return out;
}

async function findWs(key, host) {
  let r;
  if (key === '_') {
    r = await q(`select id, data from docs where parent='workspaces' and data->'page'->>'domain'=$1`, [String(host || '').toLowerCase().split(':')[0]]);
  } else {
    r = await q(`select id, data from docs where parent='workspaces' and (data->'page'->>'slug'=$1 or id=$1) limit 1`, [key]);
  }
  const row = r.rows[0];
  if (!row || !row.data.page?.on) throw new AccessError(404, 'not_found');
  return { id: row.id, ws: row.data };
}

// The workspace the custom domain in `host` belongs to, if any.
export async function wsForHost(host) {
  const h = String(host || '').toLowerCase().split(':')[0];
  if (!h || !h.includes('.')) return null;
  const r = await q(`select id from docs where parent='workspaces' and data->'page'->>'domain'=$1`, [h]);
  return r.rows[0]?.id || null;
}

const can = (ws) => {
  const live = isPaid(ws) && !isExpired(ws);
  return {
    book: live && APPT.has(ws.type) && ws.page.booking !== false,
    order: live && (FOOD.has(ws.type) || SHOP.has(ws.type)) && ws.page.ordering !== false,
  };
};

async function itemsOf(id, ws) {
  const col = FOOD.has(ws.type) ? 'menu' : APPT.has(ws.type) ? 'services' : SHOP.has(ws.type) ? 'products' : null;
  if (!col) return { col: null, items: [] };
  const r = await q('select id, data from docs where parent=$1', [`workspaces/${id}/${col}`]);
  const items = r.rows
    .filter((x) => col !== 'menu' || x.data.available !== false)
    .map((x) => ({
      id: x.id, name: String(x.data.name || ''), price: Number(x.data.price) || 0,
      cat: col === 'menu' ? String(x.data.cat || '') : '',
      out: col === 'products' && typeof x.data.stock === 'number' && x.data.stock <= 0,
    }))
    .filter((x) => x.name)
    .sort((a, b) => a.cat.localeCompare(b.cat, 'fa') || a.name.localeCompare(b.name, 'fa'));
  return { col, items };
}

async function insert(wsId, col, data) {
  const parent = `workspaces/${wsId}/${col}`;
  const id = newId();
  await q('insert into docs(path,parent,id,data,updated_at) values($1,$2,$3,$4,$5)', [`${parent}/${id}`, parent, id, data, Date.now()]);
  bus.emit('change', parent);
  return id;
}

const visitor = (b) => {
  const name = str(b?.name, 60);
  const phone = normalizePhone(String(b?.phone || ''));
  if (!name || !phone) bad('bad_contact');
  return { name, phone };
};

// Refuses writes to sample pages and to panels whose subscription has ended.
function writable(ws) {
  if (ws.example) throw new AccessError(403, 'example');
  if (isExpired(ws)) throw new AccessError(402, 'subscription_expired');
}

export function publicRoutes(app) {
  const limited = { config: { rateLimit: { max: 10, timeWindow: '10 minutes' } } };

  app.get('/api/public/:key', async (req) => {
    const { id, ws } = await findWs(String(req.params.key), req.headers.host);
    const p = ws.page;
    const { col, items } = await itemsOf(id, ws);
    const c = ws.club || {};
    return {
      name: String(ws.name || ''), type: ws.type, label: String(ws.typeLabel || ''), example: !!ws.example,
      page: { about: p.about || '', address: p.address || '', hours: p.hours || '', phone: p.phone || '', instagram: p.instagram || '' },
      kind: col, items, ...can(ws),
      club: { stampGoal: Number(c.stampGoal) || 10, reward: String(c.reward || 'یک خرید رایگان') },
      badge: ws.plan !== 'vip',
      today: today(), now: nowTime(),
    };
  });

  app.post('/api/public/:key/join', limited, async (req) => {
    const { id, ws } = await findWs(String(req.params.key), req.headers.host);
    const v = visitor(req.body);
    writable(ws);
    const parent = `workspaces/${id}/members`;
    const ex = await q(`select 1 from docs where parent=$1 and data->>'phone'=$2`, [parent, v.phone]);
    if (ex.rows[0]) return { ok: true, already: true };
    const m = /^(\d{1,2})-(\d{1,2})$/.exec(String(req.body?.birthday || ''));
    const birthday = m && +m[1] >= 1 && +m[1] <= 12 && +m[2] >= 1 && +m[2] <= 31 ? `${+m[1]}-${+m[2]}` : '';
    await insert(id, 'members', { ...v, birthday, note: '', redeemed: 0, wallet: 0, joinedAt: today(), source: 'سایت', createdAt: Date.now() });
    return { ok: true };
  });

  app.post('/api/public/:key/book', limited, async (req) => {
    const { id, ws } = await findWs(String(req.params.key), req.headers.host);
    const v = visitor(req.body);
    writable(ws);
    if (!can(ws).book) throw new AccessError(403, 'not_available');
    const date = String(req.body?.date || ''), time = String(req.body?.time || '');
    const t = today();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < t || date > new Date(Date.parse(t) + 60 * DAY).toISOString().slice(0, 10)) bad('bad_date');
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(time) || (date === t && time <= nowTime())) bad('bad_time');
    const sv = await q('select id, data from docs where path=$1', [`workspaces/${id}/services/${String(req.body?.serviceId || '')}`]);
    if (!sv.rows[0]) bad('bad_service');
    // Link to the client card with the same mobile, or start one.
    const cp = `workspaces/${id}/clients`;
    const cl = await q('select id, data from docs where parent=$1', [cp]);
    let clientId = cl.rows.find((x) => normalizePhone(String(x.data.phone || '')) === v.phone)?.id;
    if (!clientId) clientId = await insert(id, 'clients', { name: v.name, phone: v.phone, note: 'از صفحه عمومی', createdAt: Date.now() });
    const s = sv.rows[0];
    await insert(id, 'appointments', {
      date, time, clientId, clientName: v.name, phone: v.phone, serviceId: s.id, serviceName: String(s.data.name || ''),
      staff: '', price: Number(s.data.price) || 0, status: 'رزرو', paid: false, note: str(req.body?.note, 300), source: 'سایت', createdAt: Date.now(),
    });
    return { ok: true };
  });

  app.post('/api/public/:key/order', limited, async (req) => {
    const { id, ws } = await findWs(String(req.params.key), req.headers.host);
    const v = visitor(req.body);
    writable(ws);
    if (!can(ws).order) throw new AccessError(403, 'not_available');
    const { col, items } = await itemsOf(id, ws);
    const byId = Object.fromEntries(items.map((x) => [x.id, x]));
    const lines = (Array.isArray(req.body?.items) ? req.body.items : []).slice(0, MAX_ITEMS)
      .map((x) => ({ it: byId[String(x?.id || '')], qty: Math.floor(Number(x?.qty) || 0) }))
      .filter((x) => x.it && !x.it.out && x.qty >= 1 && x.qty <= 50);
    if (!lines.length) bad('empty');
    const address = str(req.body?.address, 300), note = str(req.body?.note, 300);
    const delivery = req.body?.mode === 'delivery';
    if (delivery && !address) bad('bad_address');
    const base = { date: today(), time: nowTime(), customer: v.name, phone: v.phone, source: 'سایت', createdAt: Date.now() };
    if (col === 'menu') {
      let data = {
        ...base, items: lines.map((l) => ({ mid: l.it.id, name: l.it.name, price: l.it.price, qty: l.qty })),
        kind: delivery ? 'دلیوری' : 'بیرون‌بر', status: 'ثبت‌شده', paid: false, pay: '',
        note: [delivery ? 'آدرس: ' + address : '', note].filter(Boolean).join(' · '),
      };
      // Same stock bookkeeping as an order taken at the till.
      const p = { segs: ['workspaces', id, 'forders'], top: 'workspaces', wsId: id, col: 'forders' };
      data = await costs.beforeWrite(p, 'add', data, { ws });
      const oid = await insert(id, 'forders', data);
      (await costs.afterAdd({ ...p, segs: [...p.segs, oid] }, data)).forEach((x) => bus.emit('change', x));
    } else {
      await insert(id, 'sorders', {
        ...base, items: lines.map((l) => ({ pid: l.it.id, name: l.it.name, price: l.it.price, qty: l.qty })),
        channel: 'سایت', status: 'جدید', fee: 0, address, ship: delivery ? 'پیک' : 'حضوری', note,
      });
    }
    return { ok: true, total: lines.reduce((a, l) => a + l.it.price * l.qty, 0) };
  });
}
