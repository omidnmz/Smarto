import { q } from './db.js';

// Collections a workspace may hold (union of every business template).
export const WS_COLS = new Set([
  'people', 'products', 'sales', 'orders', 'payments', 'tasks', 'ideas', 'content', 'costs', 'salaries',
  'services', 'clients', 'appointments', 'sorders', 'menu', 'forders', 'inventory', 'jobs', 'parts',
  'rsales', 'ledger', 'checks', 'gsales', 'listings', 'visits', 'deals', 'plans',
]);
const TOP = new Set(['workspaces', 'requests', 'jobtypes']);
const SEG = /^[A-Za-z0-9_\-.:]{1,100}$/;

// Collections only some roles may open; everyone else in the workspace is refused.
const ROLE_ONLY = {
  salaries: ['owner', 'gm'],
  costs: ['owner', 'gm', 'manager'],
};
const PEOPLE_EDITORS = ['owner', 'gm'];

const adminPhones = () => String(process.env.ADMIN_PHONES || process.env.ADMIN_PHONE || '')
  .split(',').map((s) => s.trim()).filter(Boolean);
export const isAdmin = (user) => !!user && adminPhones().includes(user.phone);

export class AccessError extends Error {
  constructor(status, code) { super(code); this.status = status; this.code = code; }
}
const deny = () => { throw new AccessError(403, 'permission_denied'); };
const bad = (code = 'bad_path') => { throw new AccessError(400, code); };

// Parses and validates a path. kind is 'col' (odd segments) or 'doc' (even).
export function parsePath(path, kind) {
  if (typeof path !== 'string' || path.length > 400) bad();
  const s = path.split('/');
  if (!s.every((x) => SEG.test(x))) bad();
  if (kind === 'col' && s.length % 2 !== 1) bad();
  if (kind === 'doc' && s.length % 2 !== 0) bad();
  if (!TOP.has(s[0])) bad();
  if (s[0] !== 'workspaces' && s.length > 2) bad();
  if (s[0] === 'workspaces' && s.length > 4) bad();
  if (s.length >= 3 && !WS_COLS.has(s[2])) bad();
  return {
    segs: s,
    top: s[0],
    wsId: s[0] === 'workspaces' && s.length >= 2 ? s[1] : null,
    col: s.length >= 3 ? s[2] : null,
  };
}

async function loadWs(wsId) {
  const r = await q('select data from docs where path=$1', ['workspaces/' + wsId]);
  return r.rows[0]?.data || null;
}

// What this user may do inside one workspace: { read, write, role, owner }.
export async function wsAccess(ctx, wsId) {
  ctx.wsCache ||= new Map();
  if (ctx.wsCache.has(wsId)) return ctx.wsCache.get(wsId);
  const ws = await loadWs(wsId);
  let a = { read: false, write: false, role: null, owner: false, ws };
  if (ws) {
    if (isAdmin(ctx.user)) a = { read: true, write: true, role: 'owner', owner: true, ws };
    else if (ctx.user && ws.ownerUid === ctx.user.id) a = { read: true, write: true, role: 'owner', owner: true, ws };
    else {
      if (ctx.user) {
        const r = await q(
          `select data->>'role' as role from docs where parent=$1 and data->>'uid'=$2 limit 1`,
          [`workspaces/${wsId}/people`, ctx.user.id],
        );
        if (r.rows[0]) a = { read: true, write: true, role: r.rows[0].role, owner: false, ws };
      }
      // Samples can be browsed by anyone, as if by their owner, but never changed.
      if (!a.read && ws.example) a = { read: true, write: false, role: 'owner', owner: false, ws };
    }
  }
  ctx.wsCache.set(wsId, a);
  return a;
}

function roleAllowed(a, col) {
  const only = ROLE_ONLY[col];
  return !only || only.includes(a.role);
}

// Throws unless the user may read the collection at `path` (or a doc in it).
export async function assertRead(ctx, p) {
  if (p.top === 'jobtypes') return;
  if (p.top === 'requests') {
    if (!ctx.user) deny();
    return; // filtered per row in the query
  }
  if (p.segs.length <= 2) return; // the workspaces list is filtered per row
  const a = await wsAccess(ctx, p.wsId);
  if (!a.read || !roleAllowed(a, p.col)) deny();
}

// Throws unless the user may write to `p` with `data`; returns the data to store.
export async function checkWrite(ctx, p, op, data) {
  if (!ctx.user) throw new AccessError(401, 'login_required');
  const admin = isAdmin(ctx.user);
  if (p.top === 'jobtypes') { if (!admin) deny(); return data; }
  if (p.top === 'requests') {
    if (admin) return data;
    if (op !== 'add') deny();
    return { ...data, uid: ctx.user.id, userPhone: ctx.user.phone, status: 'در انتظار بررسی' };
  }
  // workspaces/{id}
  if (p.segs.length <= 2) {
    if (op === 'add') {
      if (admin) return data;
      const { example, order, legacy, ...rest } = data || {};
      return { ...rest, ownerUid: ctx.user.id };
    }
    const a = await wsAccess(ctx, p.wsId);
    if (!a.ws) throw new AccessError(404, 'not_found');
    if (!(a.owner || (a.write && a.role === 'gm'))) deny();
    if (!admin && data) {
      const { example, order, legacy, ownerUid, ...rest } = data;
      return rest;
    }
    return data;
  }
  const a = await wsAccess(ctx, p.wsId);
  if (!a.write || !roleAllowed(a, p.col)) deny();
  if (p.col === 'people') {
    if (!PEOPLE_EDITORS.includes(a.role)) deny();
    if (data && 'uid' in data && !admin) {
      // Only the owner may link a person to an account, and only to their own.
      if (!(a.owner && (data.uid === ctx.user.id || data.uid === ''))) {
        const { uid, ...rest } = data;
        data = rest;
      }
    }
  }
  return data;
}

// SQL filter for listing the top-level workspaces collection.
export async function workspaceFilter(ctx) {
  if (isAdmin(ctx.user)) return { sql: 'true', params: [] };
  if (!ctx.user) return { sql: `(data->>'example')='true'`, params: [] };
  return {
    sql: `((data->>'example')='true' or data->>'ownerUid'=$U or id in (
      select split_part(parent,'/',2) from docs where parent like 'workspaces/%/people' and data->>'uid'=$U))`,
    params: [ctx.user.id],
  };
}
