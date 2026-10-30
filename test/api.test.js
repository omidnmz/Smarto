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
    env: { ...process.env, DATABASE_URL: DB, PORT: String(PORT), ADMIN_PHONE: ADMIN, SESSION_SECRET: 'test', KAVENEGAR_API_KEY: '' },
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
    const r = await this.call('POST', '/api/auth/request', { phone });
    assert.equal(r.status, 200);
    const m = [...out.matchAll(new RegExp(`login code for ${phone}: (\\d{5})`, 'g'))].pop();
    const v = await this.call('POST', '/api/auth/verify', { phone, code: m[1] });
    assert.equal(v.status, 200);
    return v.body;
  }
}

test('access rules', { skip: !DB && 'TEST_DATABASE_URL not set' }, async (t) => {
  const anon = new Client();
  const owner = new Client();
  const staff = new Client();
  const stranger = new Client();
  const admin = new Client();

  await t.test('visitors see only the samples, read-only', async () => {
    const ws = await anon.get('workspaces');
    assert.equal(ws.body.docs.length, 8);
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
