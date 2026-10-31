import { EventEmitter } from 'node:events';
import { q, pool } from './db.js';
import { newId, normalizePhone } from './ids.js';
import { parsePath, assertRead, checkWrite, workspaceFilter, isAdmin, wsAccess, AccessError } from './access.js';

// Every write announces the collection it touched; open streams decide who hears it.
export const bus = new EventEmitter();
bus.setMaxListeners(0);
const announce = (parent) => bus.emit('change', parent);

const MAX_DOC = 64 * 1024;
const now = () => Date.now();
const asObject = (d) => {
  if (!d || typeof d !== 'object' || Array.isArray(d)) throw new AccessError(400, 'bad_data');
  if (JSON.stringify(d).length > MAX_DOC) throw new AccessError(413, 'too_large');
  // Keys starting with _ are added by the server when reading; never store them.
  return Object.fromEntries(Object.entries(d).filter(([k]) => !k.startsWith('_')));
};
// Normalizes a person's phone and, if someone already signed up with it, links them.
async function cleanPerson(p, data) {
  if (p.col === 'people' && data && typeof data.phone === 'string') {
    data.phone = normalizePhone(data.phone) || data.phone.trim();
    if (!data.uid && /^09\d{9}$/.test(data.phone)) {
      const u = await q('select id from users where phone=$1', [data.phone]);
      if (u.rows[0]) data.uid = u.rows[0].id;
    }
  }
  return data;
}

export async function list(ctx, path) {
  const p = parsePath(path, 'col');
  await assertRead(ctx, p);
  let r;
  if (path === 'workspaces') {
    const f = await workspaceFilter(ctx);
    r = await q(`select id, data from docs where parent='workspaces' and ${f.sql.replaceAll('$U', '$1')}`, f.params);
    const member = new Set();
    if (ctx.user) {
      const m = await q(`select split_part(parent,'/',2) as ws from docs where parent like 'workspaces/%/people' and data->>'uid'=$1`, [ctx.user.id]);
      m.rows.forEach((x) => member.add(x.ws));
    }
    return r.rows.map((x) => ({
      id: x.id,
      data: {
        ...x.data,
        _access: ctx.user && x.data.ownerUid === ctx.user.id ? 'owner' : member.has(x.id) ? 'member' : x.data.example ? 'example' : 'admin',
      },
    }));
  } else if (path === 'requests' && !isAdmin(ctx.user)) {
    r = await q(`select id, data from docs where parent='requests' and data->>'uid'=$1`, [ctx.user.id]);
  } else {
    r = await q('select id, data from docs where parent=$1', [path]);
  }
  return r.rows.map((x) => ({ id: x.id, data: x.data }));
}

export async function add(ctx, path, data) {
  const p = parsePath(path, 'col');
  data = await cleanPerson(p, await checkWrite(ctx, p, 'add', asObject(data)));
  const id = newId();
  await q('insert into docs(path,parent,id,data,updated_at) values($1,$2,$3,$4,$5)', [`${path}/${id}`, path, id, data, now()]);
  announce(path);
  return id;
}

export async function update(ctx, path, data, { replace = false } = {}) {
  const p = parsePath(path, 'doc');
  data = await cleanPerson(p, await checkWrite(ctx, p, replace ? 'set' : 'update', asObject(data)));
  const parent = p.segs.slice(0, -1).join('/');
  const id = p.segs[p.segs.length - 1];
  if (p.top === 'requests' || p.segs.length === 2) {
    // Workspace and request docs must already exist; nobody creates them by path.
    const ex = await q('select 1 from docs where path=$1', [path]);
    if (!ex.rows[0]) throw new AccessError(404, 'not_found');
  }
  const sql = replace
    ? `insert into docs(path,parent,id,data,updated_at) values($1,$2,$3,$4,$5)
       on conflict(path) do update set data=excluded.data, updated_at=excluded.updated_at`
    : `insert into docs(path,parent,id,data,updated_at) values($1,$2,$3,$4,$5)
       on conflict(path) do update set data=docs.data || excluded.data, updated_at=excluded.updated_at`;
  await q(sql, [path, parent, id, data, now()]);
  announce(parent);
}

export async function remove(ctx, path) {
  const p = parsePath(path, 'doc');
  if (p.segs.length === 2 && p.top === 'workspaces') {
    const a = await wsAccess(ctx, p.wsId);
    if (!a.owner) throw new AccessError(403, 'permission_denied');
    await q(`delete from docs where path=$1 or path like $2`, [path, `${path}/%`]);
    announce('workspaces');
    return;
  }
  await checkWrite(ctx, p, 'delete', null);
  const parent = p.segs.slice(0, -1).join('/');
  await q('delete from docs where path=$1', [path]);
  announce(parent);
}

// Links people the owner added by phone to the account that just logged in with that phone.
export async function linkInvites(user) {
  const r = await q(
    `update docs set data = data || jsonb_build_object('uid', $1::text), updated_at=$3
     where parent like 'workspaces/%/people' and data->>'phone'=$2 and coalesce(data->>'uid','')=''
     returning parent`,
    [user.id, user.phone, now()],
  );
  new Set(r.rows.map((x) => x.parent)).forEach(announce);
  if (r.rows.length) announce('workspaces');
}

// Whether a change to `parent` should be pushed to this viewer.
export async function canHear(ctx, parent) {
  try {
    const p = parsePath(parent, 'col');
    await assertRead(ctx, p);
    return true;
  } catch {
    return false;
  }
}

export { pool };
