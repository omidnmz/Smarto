import { q } from './db.js';
import { isAdmin, AccessError } from './access.js';

// The platform admin's own panel: every account and every business, with plans and blocking.
const need = (req) => {
  if (!req.user) throw new AccessError(401, 'login_required');
  if (!isAdmin(req.user)) throw new AccessError(403, 'permission_denied');
};

export function adminRoutes(app) {
  app.get('/api/admin/overview', async (req) => {
    need(req);
    const [users, wss, members, active] = await Promise.all([
      q('select id, phone, created_at, last_login, coalesce(blocked,false) as blocked from users order by created_at desc'),
      q(`select id, data from docs where parent='workspaces'`),
      q(`select split_part(parent,'/',2) as ws, data->>'uid' as uid, data->>'role' as role, data->>'name' as name from docs where parent like 'workspaces/%/people'`),
      q(`select split_part(path,'/',2) as ws, max(updated_at) as t from docs where path like 'workspaces/%/%' group by 1`),
    ]);
    const last = Object.fromEntries(active.rows.map((r) => [r.ws, Number(r.t)]));
    const people = {};
    const memberOf = {};
    for (const m of members.rows) {
      people[m.ws] = (people[m.ws] || 0) + 1;
      if (m.uid) (memberOf[m.uid] ||= []).push({ ws: m.ws, role: m.role });
    }
    const phoneOf = Object.fromEntries(users.rows.map((u) => [u.id, u.phone]));
    return {
      users: users.rows.map((u) => ({
        id: u.id, phone: u.phone, createdAt: Number(u.created_at), lastLogin: Number(u.last_login) || null,
        blocked: u.blocked, admin: isAdmin(u), panels: memberOf[u.id] || [],
      })),
      workspaces: wss.rows.map((w) => ({
        id: w.id, name: w.data.name, type: w.data.type, typeLabel: w.data.typeLabel || '', plan: w.data.plan || 'basic',
        example: !!w.data.example, ownerUid: w.data.ownerUid || '', ownerPhone: phoneOf[w.data.ownerUid] || '',
        createdAt: Number(w.data.createdAt) || null, teamSize: w.data.teamSize || '', people: people[w.id] || 0, lastActive: last[w.id] || null,
      })),
    };
  });

  // Blocking signs the account out everywhere and stops it from logging in again.
  app.post('/api/admin/user', async (req) => {
    need(req);
    const id = String(req.body?.id || '');
    const blocked = req.body?.blocked === true;
    const u = (await q('select id, phone from users where id=$1', [id])).rows[0];
    if (!u) throw new AccessError(404, 'not_found');
    if (isAdmin(u)) throw new AccessError(400, 'cannot_block_admin');
    await q('update users set blocked=$2 where id=$1', [id, blocked]);
    if (blocked) await q('delete from sessions where user_id=$1', [id]);
    return { ok: true };
  });
}
