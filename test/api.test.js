// End-to-end checks of login and access rules against a real PostgreSQL.
// Run with TEST_DATABASE_URL pointing at an empty, throwaway database.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import pg from 'pg';

const DB = process.env.TEST_DATABASE_URL;
const PORT = 3999;
const BASE = `http://127.0.0.1:${PORT}`;
const ADMIN = '09120000001';
let srv;
let out = '';

before(async () => {
  if (!DB) return;
  const c = new pg.Client({ connectionString: DB });
  await c.connect();
  await c.query('drop table if exists sessions, otps, users, docs cascade');
  await c.end();
  srv = spawn(process.execPath, ['server/index.js'], {
    env: { ...process.env, DATABASE_URL: DB, PORT: String(PORT), ADMIN_PHONE: ADMIN, SESSION_SECRET: 'test', KAVENEGAR_API_KEY: '', LOGIN_IP_LIMIT: '1000' },
  });
  srv.stdout.on('data', (d) => { out += d; });
  srv.stderr.on('data', (d) => { out += d; });
  for (let i = 0; i < 50 && !out.includes('Server listening'); i++) await new Promise((r) => setTimeout(r, 100));
});
after(() => srv?.kill());

class Client {
  cookie = '';
  async call(method, url, body, { csrf = true } = {}) {
    const headers = { cookie: this.cookie };
    if (body) headers['content-type'] = 'application/json';
    if (csrf) headers['x-smarto'] = '1';
    const r = await fetch(BASE + url, { method, headers, body: body ? JSON.stringify(body) : undefined });
    const set = r.headers.get('set-cookie');
    if (set) this.cookie = set.split(';')[0];
    return { status: r.status, body: await r.json().catch(() => null) };
  }
  get = (path) => this.call('GET', '/api/col?path=' + encodeURIComponent(path));
  add = (path, data) => this.call('POST', '/api/col', { path, data });
  patch = (path, data) => this.call('PATCH', '/api/doc', { path, data });
  async login(phone) {
    const codes = () => [...out.matchAll(new RegExp(`login code for ${phone}: (\\d{5})`, 'g'))];
    const before = codes().length;
    const r = await this.call('POST', '/api/auth/request', { phone });
    assert.equal(r.status, 200);
    // The server logs the code on its own stdout, which can reach us a moment after the HTTP reply.
    for (let i = 0; i < 50 && codes().length <= before; i++) await new Promise((res) => setTimeout(res, 50));
    const m = codes().pop();
    const v = await this.call('POST', '/api/auth/verify', { phone, code: m[1] });
    assert.equal(v.status, 200);
    return v.body;
  }
}
// One admin session shared by the tests, since the admin phone may only ask for a few codes per window.
let adminC;
const adminClient = () => (adminC ||= (async () => { const c = new Client(); await c.login(ADMIN); return c; })());

test('access rules', { skip: !DB && 'TEST_DATABASE_URL not set' }, async (t) => {
  const anon = new Client();
  const owner = new Client();
  const staff = new Client();
  const stranger = new Client();
  const admin = new Client();

  await t.test('visitors see only the samples, read-only', async () => {
    const ws = await anon.get('workspaces');
    assert.equal(ws.body.docs.length, 13);
    assert.ok(ws.body.docs.every((w) => w.data.example));
    assert.equal((await anon.get('workspaces/salon1/appointments')).status, 200);
    assert.equal((await anon.add('workspaces/salon1/tasks', { title: 'x' })).status, 401);
    assert.equal((await anon.get('requests')).status, 403);
  });

  await t.test('writes without the page header are refused', async () => {
    const r = await anon.call('POST', '/api/auth/request', { phone: '09121111111' }, { csrf: false });
    assert.equal(r.status, 403);
  });

  await t.test('a wrong code is refused', async () => {
    const c = new Client();
    await c.call('POST', '/api/auth/request', { phone: '09125555555' });
    const r = await c.call('POST', '/api/auth/verify', { phone: '09125555555', code: '00000' });
    assert.equal(r.status, 400);
  });

  let wsId;
  await t.test('an owner creates a business and invites staff by phone', async () => {
    const me = await owner.login('09121111111');
    assert.equal(me.isAdmin, false);
    const w = await owner.add('workspaces', { name: 'فروشگاه من', type: 'store', example: true, ownerUid: 'someone' });
    assert.equal(w.status, 200);
    wsId = w.body.id;
    const list = (await owner.get('workspaces')).body.docs;
    const mine = list.find((x) => x.id === wsId);
    assert.equal(mine.data.ownerUid, me.id);
    assert.equal(mine.data.example, undefined);
    assert.equal(mine.data._access, 'owner');
    assert.equal((await owner.add(`workspaces/${wsId}/people`, { name: 'فروشنده', role: 'team', phone: '۰۹۱۲۲۲۲۲۲۲۲' })).status, 200);
    assert.equal((await owner.add(`workspaces/${wsId}/salaries`, { amount: 1 })).status, 200);
    assert.equal((await owner.add('workspaces/salon1/tasks', { title: 'x' })).status, 403);
  });

  await t.test('invited staff log in and see only what their role allows', async () => {
    await staff.login('09122222222');
    const w = (await staff.get('workspaces')).body.docs.find((x) => x.id === wsId);
    assert.equal(w?.data._access, 'member');
    assert.equal((await staff.get(`workspaces/${wsId}/tasks`)).status, 200);
    assert.equal((await staff.add(`workspaces/${wsId}/tasks`, { title: 'کار' })).status, 200);
    assert.equal((await staff.get(`workspaces/${wsId}/salaries`)).status, 403);
    assert.equal((await staff.get(`workspaces/${wsId}/costs`)).status, 403);
    assert.equal((await staff.add(`workspaces/${wsId}/people`, { name: 'x', role: 'owner' })).status, 403);
    assert.equal((await staff.patch(`workspaces/${wsId}`, { name: 'hacked' })).status, 403);
  });

  await t.test('strangers cannot see or join a business', async () => {
    await stranger.login('09123333333');
    assert.ok(!(await stranger.get('workspaces')).body.docs.some((x) => x.id === wsId));
    assert.equal((await stranger.get(`workspaces/${wsId}/tasks`)).status, 403);
    assert.equal((await stranger.add(`workspaces/${wsId}/people`, { name: 'me', role: 'owner' })).status, 403);
    assert.equal((await stranger.call('DELETE', `/api/doc?path=workspaces/${wsId}`)).status, 403);
  });

  await t.test('needs forms wait for the admin', async () => {
    const r = await stranger.add('requests', { job: 'آتلیه', status: 'تایید شد', uid: 'x' });
    assert.equal(r.status, 200);
    const mine = (await stranger.get('requests')).body.docs;
    assert.equal(mine.length, 1);
    assert.equal(mine[0].data.status, 'در انتظار بررسی');
    assert.equal(mine[0].data.userPhone, '09123333333');
    assert.equal((await owner.get('requests')).body.docs.length, 0);
    assert.equal((await stranger.patch(`requests/${r.body.id}`, { status: 'تایید شد' })).status, 403);
    assert.equal((await stranger.add('jobtypes', { name: 'x' })).status, 403);

    const me = await admin.login(ADMIN);
    assert.equal(me.isAdmin, true);
    assert.equal((await admin.get('requests')).body.docs.length, 1);
    assert.equal((await admin.add('jobtypes', { name: 'آتلیه' })).status, 200);
    assert.equal((await admin.patch(`requests/${r.body.id}`, { status: 'تایید شد' })).status, 200);
    assert.ok((await admin.get('workspaces')).body.docs.some((x) => x.id === wsId));
  });

  await t.test('owners can delete their business', async () => {
    assert.equal((await owner.call('DELETE', `/api/doc?path=workspaces/${wsId}`)).status, 200);
    assert.equal((await staff.get(`workspaces/${wsId}/tasks`)).status, 403);
  });
});

test('cost control for café and restaurant plans', { skip: !DB && 'TEST_DATABASE_URL not set' }, async () => {
  const owner = new Client();
  const cashier = new Client();
  const admin = await adminClient();
  await owner.login('09124444441');
  const get = async (c, path) => (await c.get(path)).body.docs;
  const doc = async (c, col, id) => (await get(c, col)).find((x) => x.id === id).data;

  // Owners cannot pick their own plan; cost control stays closed on the basic plan.
  const w = await owner.add('workspaces', { name: 'کافه من', type: 'cafe', plan: 'vip' });
  const ws = `workspaces/${w.body.id}`;
  assert.equal((await doc(owner, 'workspaces', w.body.id)).plan, undefined);
  assert.equal((await owner.patch(ws, { plan: 'pro' })).status, 200);
  assert.equal((await doc(owner, 'workspaces', w.body.id)).plan, undefined);
  assert.equal((await owner.get(`${ws}/purchases`)).status, 403);
  assert.equal((await owner.get(`${ws}/purchases`)).body.error, 'plan_required');

  const milk = (await owner.add(`${ws}/inventory`, { name: 'شیر', unit: 'لیتر', stock: 10, min: 2, cost: 40000 })).body.id;
  const latte = (await owner.add(`${ws}/menu`, { name: 'لاته', price: 150000, recipe: [{ iid: milk, qty: 0.2 }] })).body.id;
  // On the basic plan sales do not touch stock.
  const o0 = await owner.add(`${ws}/forders`, { items: [{ mid: latte, qty: 1, price: 150000 }], status: 'ثبت‌شده' });
  assert.equal((await doc(owner, `${ws}/inventory`, milk)).stock, 10);
  assert.equal((await doc(owner, `${ws}/forders`, o0.body.id)).stockOut, undefined);

  assert.equal((await admin.patch(ws, { plan: 'pro' })).status, 200);
  assert.equal((await doc(owner, 'workspaces', w.body.id)).plan, 'pro');

  // A purchase raises stock and moves the unit cost to the weighted average.
  const buy = await owner.add(`${ws}/purchases`, { iid: milk, qty: 10, total: 600000, date: '2026-11-01' });
  assert.equal(buy.status, 200);
  let m = await doc(owner, `${ws}/inventory`, milk);
  assert.equal(m.stock, 20);
  assert.equal(m.cost, 50000);
  assert.equal((await owner.add(`${ws}/purchases`, { iid: 'nope', qty: 1, total: 1 })).status, 400);
  assert.equal((await owner.patch(`${ws}/purchases/${buy.body.id}`, { qty: 100 })).status, 403);

  // Each sale takes its recipe out of stock; clients cannot write stockOut themselves.
  const o1 = await owner.add(`${ws}/forders`, { items: [{ mid: latte, qty: 3, price: 150000 }], status: 'ثبت‌شده', stockOut: { [milk]: -100 } });
  assert.deepEqual((await doc(owner, `${ws}/forders`, o1.body.id)).stockOut, { [milk]: 0.6 });
  assert.equal((await doc(owner, `${ws}/inventory`, milk)).stock, 19.4);
  assert.equal((await owner.patch(`${ws}/forders/${o1.body.id}`, { stockOut: { [milk]: 50 } })).status, 200);
  assert.deepEqual((await doc(owner, `${ws}/forders`, o1.body.id)).stockOut, { [milk]: 0.6 });

  // Cancelling or deleting an order gives the ingredients back, once.
  assert.equal((await owner.patch(`${ws}/forders/${o1.body.id}`, { status: 'لغو' })).status, 200);
  assert.equal((await doc(owner, `${ws}/inventory`, milk)).stock, 20);
  assert.equal((await owner.call('DELETE', `/api/doc?path=${ws}/forders/${o1.body.id}`)).status, 200);
  assert.equal((await doc(owner, `${ws}/inventory`, milk)).stock, 20);
  const o2 = await owner.add(`${ws}/forders`, { items: [{ mid: latte, qty: 1, price: 150000 }], status: 'ثبت‌شده' });
  assert.equal((await doc(owner, `${ws}/inventory`, milk)).stock, 19.8);
  await owner.call('DELETE', `/api/doc?path=${ws}/forders/${o2.body.id}`);
  assert.equal((await doc(owner, `${ws}/inventory`, milk)).stock, 20);

  // Deleting a purchase takes its quantity back out of stock.
  assert.equal((await owner.call('DELETE', `/api/doc?path=${ws}/purchases/${buy.body.id}`)).status, 200);
  assert.equal((await doc(owner, `${ws}/inventory`, milk)).stock, 10);

  // A cashier sells (and moves stock) but does not see purchase prices.
  await owner.add(`${ws}/people`, { name: 'صندوقدار', role: 'cashier', phone: '09124444442' });
  await cashier.login('09124444442');
  assert.equal((await cashier.get(`${ws}/purchases`)).status, 403);
  assert.equal((await cashier.add(`${ws}/forders`, { items: [{ mid: latte, qty: 1, price: 150000 }] })).status, 200);
  assert.equal((await doc(owner, `${ws}/inventory`, milk)).stock, 9.8);

  // The café and restaurant samples show the feature.
  const anon = new Client();
  assert.ok((await get(anon, 'workspaces/cafe1/purchases')).length > 0);
  assert.ok((await get(anon, 'workspaces/rest1/menu')).some((x) => x.data.recipe?.length));
});

test('salon supplies follow appointments on paid plans', { skip: !DB && 'TEST_DATABASE_URL not set' }, async () => {
  const owner = new Client();
  const admin = await adminClient();
  await owner.login('09125555551');
  const doc = async (col, id) => (await owner.get(col)).body.docs.find((x) => x.id === id).data;
  const w = await owner.add('workspaces', { name: 'سالن من', type: 'salon' });
  const ws = `workspaces/${w.body.id}`;
  const dye = (await owner.add(`${ws}/inventory`, { name: 'رنگ', unit: 'کیلو', stock: 1, cost: 4000000 })).body.id;
  const color = (await owner.add(`${ws}/services`, { name: 'رنگ مو', price: 2500000, recipe: [{ iid: dye, qty: 0.06 }] })).body.id;
  const stock = async () => (await doc(`${ws}/inventory`, dye)).stock;

  // Basic plan: marking an appointment done does not touch stock.
  const a0 = (await owner.add(`${ws}/appointments`, { serviceId: color, status: 'رزرو' })).body.id;
  await owner.patch(`${ws}/appointments/${a0}`, { status: 'انجام‌شده' });
  assert.equal(await stock(), 1);

  await admin.patch(ws, { plan: 'vip' });
  const a1 = (await owner.add(`${ws}/appointments`, { serviceId: color, status: 'رزرو' })).body.id;
  assert.equal(await stock(), 1);
  await owner.patch(`${ws}/appointments/${a1}`, { status: 'انجام‌شده' });
  assert.equal(await stock(), 0.94);
  await owner.patch(`${ws}/appointments/${a1}`, { status: 'انجام‌شده', paid: true });
  assert.equal(await stock(), 0.94);
  await owner.patch(`${ws}/appointments/${a1}`, { status: 'لغو' });
  assert.equal(await stock(), 1);
  await owner.patch(`${ws}/appointments/${a1}`, { status: 'انجام‌شده' });
  assert.equal(await stock(), 0.94);
  await owner.call('DELETE', `/api/doc?path=${ws}/appointments/${a1}`);
  assert.equal(await stock(), 1);
  // An appointment added as already done takes its supplies too.
  await owner.add(`${ws}/appointments`, { serviceId: color, status: 'انجام‌شده' });
  assert.equal(await stock(), 0.94);
  assert.equal((await owner.get(`${ws}/purchases`)).status, 200);
});

test('the platform admin manages accounts', { skip: !DB && 'TEST_DATABASE_URL not set' }, async () => {
  const user = new Client();
  const admin = await adminClient();
  const me = await user.login('09126666661');
  await user.add('workspaces', { name: 'مغازه', type: 'retail' });
  assert.equal((await user.call('GET', '/api/admin/overview')).status, 403);
  const o = (await admin.call('GET', '/api/admin/overview')).body;
  const u = o.users.find((x) => x.id === me.id);
  assert.equal(u.phone, '09126666661');
  assert.ok(u.lastLogin > 0);
  assert.ok(o.workspaces.some((w) => w.ownerPhone === '09126666661' && w.plan === 'basic'));
  assert.equal((await admin.call('POST', '/api/admin/user', { id: o.users.find((x) => x.admin).id, blocked: true })).status, 400);

  // Blocking signs the account out and refuses new logins; unblocking lets it back in.
  assert.equal((await admin.call('POST', '/api/admin/user', { id: me.id, blocked: true })).status, 200);
  assert.equal((await user.call('GET', '/api/me')).body.id, null);
  const codes = () => [...out.matchAll(/login code for 09126666661: (\d{5})/g)];
  const before = codes().length;
  // The earlier code was sent under a minute ago, so wait out the resend limit by clearing it.
  const c = new pg.Client({ connectionString: DB });
  await c.connect();
  await c.query('delete from otps');
  await c.end();
  await user.call('POST', '/api/auth/request', { phone: '09126666661' });
  for (let i = 0; i < 50 && codes().length <= before; i++) await new Promise((r) => setTimeout(r, 50));
  const code = codes().pop()[1];
  assert.equal((await user.call('POST', '/api/auth/verify', { phone: '09126666661', code })).status, 403);
  assert.equal((await admin.call('POST', '/api/admin/user', { id: me.id, blocked: false })).status, 200);
});

test('customer club SMS', { skip: !DB && 'TEST_DATABASE_URL not set' }, async () => {
  const owner = new Client();
  const admin = await adminClient();
  await owner.login('09127777771');
  const w = await owner.add('workspaces', { name: 'کافه باشگاه', type: 'cafe' });
  const ws = `workspaces/${w.body.id}`;
  assert.equal((await owner.add(`${ws}/members`, { name: 'سارا', phone: '09121112222' })).status, 200);
  const send = (body) => owner.call('POST', '/api/sms', { ws: w.body.id, text: '{نام} عزیز سلام', to: [{ phone: '09121112222', name: 'سارا' }], ...body });
  assert.equal((await send()).body.error, 'plan_required');
  await admin.patch(ws, { plan: 'pro', smsQuota: 2 });
  const r = await send({ kind: 'promo', to: [{ phone: '۰۹۱۲۱۱۱۲۲۲۲' }, { phone: '09121112222' }, { phone: 'bad' }] });
  assert.equal(r.status, 200);
  assert.equal(r.body.status, 'آزمایشی');
  assert.equal(r.body.count, 1);
  const log = (await owner.get(`${ws}/smslog`)).body.docs;
  assert.equal(log.length, 1);
  assert.match(log[0].data.text, /لغو۱۱$/);
  assert.equal((await owner.add(`${ws}/smslog`, { count: -100 })).status, 403);
  assert.equal((await send({ to: [{ phone: '09121113333' }, { phone: '09121114444' }] })).body.error, 'quota');
  assert.deepEqual((await owner.call('GET', `/api/sms/status?ws=${w.body.id}`)).body, { quota: 2, used: 1, live: false });
});

test('phone and password accounts', { skip: !DB && 'TEST_DATABASE_URL not set' }, async () => {
  const a = new Client();
  const b = new Client();
  const admin = await adminClient();
  const ph = '09123334444';
  assert.equal((await a.call('POST', '/api/auth/login', { phone: ph, password: '123456' })).body.error, 'no_account');
  assert.equal((await a.call('POST', '/api/auth/signup', { phone: ph, password: '123' })).body.error, 'weak_password');
  // Persian digits are the same password as Latin digits.
  const s = await a.call('POST', '/api/auth/signup', { phone: '۰۹۱۲۳۳۳۴۴۴۴', password: '۱۲۳۴۵۶' });
  assert.equal(s.status, 200);
  assert.equal((await a.call('GET', '/api/me')).body.hasPassword, true);
  assert.equal((await b.call('POST', '/api/auth/signup', { phone: ph, password: 'another1' })).body.error, 'exists');
  assert.equal((await b.call('POST', '/api/auth/login', { phone: ph, password: 'nope12' })).body.error, 'wrong_password');
  assert.equal((await b.call('POST', '/api/auth/login', { phone: ph, password: '123456' })).status, 200);
  assert.equal((await b.call('GET', '/api/me')).body.id, s.body.id);

  // Changing the password needs the current one and signs out other devices.
  assert.equal((await a.call('POST', '/api/auth/password', { current: 'bad', next: 'newpass1' })).body.error, 'wrong_password');
  assert.equal((await a.call('POST', '/api/auth/password', { current: '123456', next: 'newpass1' })).status, 200);
  assert.equal((await a.call('GET', '/api/me')).body.id, s.body.id);
  assert.equal((await b.call('GET', '/api/me')).body.id, null);

  // The admin phone cannot be claimed with a password.
  assert.equal((await b.call('POST', '/api/auth/signup', { phone: ADMIN, password: '123456' })).body.error, 'admin_use_code');

  // A forgotten password: the admin makes a one-time password.
  const r = await admin.call('POST', '/api/admin/password', { id: s.body.id });
  assert.match(r.body.password, /^\d{6}$/);
  assert.equal((await a.call('GET', '/api/me')).body.id, null);
  assert.equal((await b.call('POST', '/api/auth/login', { phone: ph, password: 'newpass1' })).body.error, 'wrong_password');
  assert.equal((await b.call('POST', '/api/auth/login', { phone: ph, password: r.body.password })).status, 200);
  assert.equal((await b.call('POST', '/api/admin/password', { id: s.body.id })).status, 403);

  // Too many wrong passwords lock the account for a while.
  for (let i = 0; i < 8; i++) await a.call('POST', '/api/auth/login', { phone: ph, password: 'wrong' + i });
  assert.equal((await a.call('POST', '/api/auth/login', { phone: ph, password: r.body.password })).body.error, 'locked');
});

test('monthly subscription: one free month, then read-only until renewed', { skip: !DB && 'TEST_DATABASE_URL not set' }, async () => {
  const owner = new Client();
  const admin = await adminClient();
  await owner.login('09128888881');
  const w = await owner.add('workspaces', { name: 'فروشگاه اشتراک', type: 'retail' });
  const ws = `workspaces/${w.body.id}`;
  const row = async () => (await admin.call('GET', '/api/admin/overview')).body.workspaces.find((x) => x.id === w.body.id);
  // A new panel gets a 30-day trial.
  const until = (await row()).paidUntil;
  assert.match(until, /^\d{4}-\d{2}-\d{2}$/);
  assert.ok(until > new Date().toISOString().slice(0, 10));
  // The owner cannot extend their own subscription.
  await owner.patch(ws, { paidUntil: '2099-01-01' });
  assert.equal((await row()).paidUntil, until);
  assert.equal((await owner.add(`${ws}/products`, { name: 'الف' })).status, 200);

  // Once it ends, writes are refused but the data stays readable.
  await admin.patch(ws, { paidUntil: '2020-01-01' });
  const r = await owner.add(`${ws}/products`, { name: 'ب' });
  assert.equal(r.status, 402);
  assert.equal(r.body.error, 'subscription_expired');
  assert.equal((await owner.get(`${ws}/products`)).body.docs.length, 1);

  // Renewing by the admin opens it again.
  await admin.patch(ws, { paidUntil: '2099-01-01' });
  assert.equal((await owner.add(`${ws}/products`, { name: 'ب' })).status, 200);
});

test('public business page', { skip: !DB && 'TEST_DATABASE_URL not set' }, async () => {
  const owner = new Client();
  const other = new Client();
  const anon = new Client();
  const admin = await adminClient();
  await owner.login('09129999991');
  await other.login('09129999992');
  const w = await owner.add('workspaces', { name: 'سالن صفحه', type: 'salon' });
  const ws = `workspaces/${w.body.id}`;
  const sv = await owner.add(`${ws}/services`, { name: 'کوتاهی', price: 300000 });
  assert.equal((await anon.call('GET', '/api/public/salon-page')).status, 404);

  // Slugs are checked and unique; the owner cannot set a custom domain.
  assert.equal((await owner.patch(ws, { page: { on: true, slug: 'Bad Slug!' } })).body.error, 'bad_slug');
  assert.equal((await owner.patch(ws, { page: { on: true, slug: 'salon-page', domain: 'x.ir', about: 'سلام' } })).status, 200);
  const w2 = await other.add('workspaces', { name: 'دیگری', type: 'cafe' });
  assert.equal((await other.patch(`workspaces/${w2.body.id}`, { page: { on: true, slug: 'salon-page' } })).status, 409);

  const page = (await anon.call('GET', '/api/public/salon-page')).body;
  assert.equal(page.name, 'سالن صفحه');
  assert.equal(page.page.about, 'سلام');
  assert.equal(page.book, false); // basic plan: no booking
  assert.equal(page.badge, true);
  assert.deepEqual(page.items.map((x) => x.name), ['کوتاهی']);

  // Joining the club works on every plan, once per phone.
  const join = (b) => anon.call('POST', '/api/public/salon-page/join', b);
  assert.equal((await join({ name: 'مینا', phone: 'bad' })).body.error, 'bad_contact');
  assert.equal((await join({ name: 'مینا', phone: '۰۹۱۲۵۵۵۶۶۶۶', birthday: '6-15' })).status, 200);
  assert.equal((await join({ name: 'مینا', phone: '09125556666' })).body.already, true);
  const members = (await owner.get(`${ws}/members`)).body.docs;
  assert.equal(members.length, 1);
  assert.equal(members[0].data.birthday, '6-15');

  const day = new Date(Date.now() + 3.5 * 3600000 + 86400000).toISOString().slice(0, 10);
  const book = (b) => anon.call('POST', '/api/public/salon-page/book', { name: 'مینا', phone: '09125556666', serviceId: sv.body.id, date: day, time: '10:30', ...b });
  assert.equal((await book()).body.error, 'not_available');
  await admin.patch(ws, { plan: 'pro' });
  assert.equal((await anon.call('GET', '/api/public/salon-page')).body.book, true);
  assert.equal((await book({ date: '2020-01-01' })).body.error, 'bad_date');
  assert.equal((await book()).status, 200);
  const ap = (await owner.get(`${ws}/appointments`)).body.docs;
  assert.equal(ap.length, 1);
  assert.equal(ap[0].data.status, 'رزرو');
  assert.equal(ap[0].data.price, 300000);
  assert.equal(ap[0].data.source, 'سایت');
  assert.equal((await owner.get(`${ws}/clients`)).body.docs.length, 1);

  // Orders go into the café's orders and take ingredients out of stock.
  const cafe = `workspaces/${w2.body.id}`;
  await admin.patch(cafe, { plan: 'pro' });
  await other.patch(cafe, { page: { on: true, slug: 'cafe-page' } });
  const inv = await other.add(`${cafe}/inventory`, { name: 'قهوه', stock: 1, unit: 'کیلو' });
  const m = await other.add(`${cafe}/menu`, { name: 'اسپرسو', price: 90000, available: true, recipe: [{ iid: inv.body.id, qty: 0.02 }] });
  const order = (b) => anon.call('POST', '/api/public/cafe-page/order', { name: 'رضا', phone: '09127778888', items: [{ id: m.body.id, qty: 2 }, { id: 'nope', qty: 1 }], ...b });
  assert.equal((await order({ mode: 'delivery' })).body.error, 'bad_address');
  const o = await order();
  assert.equal(o.status, 200);
  assert.equal(o.body.total, 180000);
  const fo = (await other.get(`${cafe}/forders`)).body.docs;
  assert.equal(fo[0].data.kind, 'بیرون‌بر');
  assert.equal(fo[0].data.status, 'ثبت‌شده');
  const stock = (await other.get(`${cafe}/inventory`)).body.docs[0].data.stock;
  assert.equal(stock, 0.96);

  // Turned off or expired: no page, no orders.
  await admin.patch(cafe, { paidUntil: '2020-01-01' });
  assert.equal((await order()).body.error, 'subscription_expired');
  await owner.patch(ws, { page: { on: false, slug: 'salon-page' } });
  assert.equal((await anon.call('GET', '/api/public/salon-page')).status, 404);
});

test('building management collections and roles', { skip: !DB && 'TEST_DATABASE_URL not set' }, async () => {
  const owner = new Client();
  const janitor = new Client();
  const board = new Client();
  await owner.login('09124444441');
  await janitor.login('09124444442');
  await board.login('09124444443');
  const w = await owner.add('workspaces', { name: 'برج نمونه', type: 'building' });
  const ws = `workspaces/${w.body.id}`;
  await owner.add(`${ws}/people`, { name: 'مالک', role: 'owner', uid: (await owner.call('GET', '/api/me')).body.id });
  await owner.add(`${ws}/people`, { name: 'سرایدار', role: 'staff', phone: '09124444442' });
  await owner.add(`${ws}/people`, { name: 'هیئت مدیره', role: 'board', phone: '09124444443' });
  await janitor.login('09124444442');
  await board.login('09124444443');
  const u = await owner.add(`${ws}/units`, { no: '۱۲', area: 100, occ: 'مالک ساکن', people: 3 });
  assert.equal(u.status, 200);
  assert.equal((await owner.add(`${ws}/dues`, { unit: u.body.id, month: '1405-09', amount: 2000000, paid: false })).status, 200);
  assert.equal((await owner.add(`${ws}/tickets`, { title: 'لامپ', status: 'جدید' })).status, 200);
  assert.equal((await owner.add(`${ws}/notices`, { title: 'جلسه', text: 'جمعه' })).status, 200);
  // The janitor works on requests but does not see the charge book or the costs.
  assert.equal((await janitor.get(`${ws}/tickets`)).body.docs.length, 1);
  assert.equal((await janitor.get(`${ws}/dues`)).status, 403);
  assert.equal((await janitor.get(`${ws}/costs`)).status, 403);
  // The board sees the money.
  assert.equal((await board.get(`${ws}/dues`)).body.docs.length, 1);
  assert.equal((await board.get(`${ws}/costs`)).status, 200);
});
