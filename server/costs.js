import { q } from './db.js';
import { AccessError } from './access.js';

// Cost control (recipes, food cost, purchases, stock that follows sales) is a Pro/VIP feature
// for café and restaurant panels. The stock bookkeeping happens here so that two tills
// selling at once cannot overwrite each other's numbers.
export const PAID_PLANS = new Set(['pro', 'vip']);
export const isPaid = (ws) => !!ws && PAID_PLANS.has(ws.plan);
export const PRO_COLS = new Set(['purchases']);

const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? v : Number(v) || 0);
const round = (v) => Math.round(v * 10000) / 10000;
const STOCK = `case when jsonb_typeof(data->'stock')='number' then (data->>'stock')::numeric else 0 end`;
const COST = `case when jsonb_typeof(data->'cost')='number' then (data->>'cost')::numeric else 0 end`;

// Adds `delta` (may be negative) to one inventory item's stock.
async function moveStock(wsId, iid, delta) {
  if (!delta) return;
  await q(`update docs set data = jsonb_set(data, '{stock}', to_jsonb(round(${STOCK} + $2::numeric, 4))), updated_at=$3 where path=$1`,
    [`workspaces/${wsId}/inventory/${iid}`, delta, Date.now()]);
}
const applyStock = async (wsId, out, sign) => {
  for (const [iid, qty] of Object.entries(out || {})) await moveStock(wsId, iid, sign * num(qty));
};

// Ingredients used by an order, from the recipes saved on its menu items: { inventoryId: qty }.
async function usageOf(wsId, items) {
  const mids = [...new Set((Array.isArray(items) ? items : []).map((i) => String(i?.mid || '')).filter(Boolean))];
  if (!mids.length) return {};
  const r = await q('select id, data from docs where parent=$1 and id = any($2)', [`workspaces/${wsId}/menu`, mids]);
  const recipe = Object.fromEntries(r.rows.map((x) => [x.id, Array.isArray(x.data.recipe) ? x.data.recipe : []]));
  const out = {};
  for (const it of items) {
    const n = num(it?.qty);
    for (const line of recipe[it?.mid] || []) {
      const use = num(line?.qty) * n;
      if (line?.iid && use > 0) out[line.iid] = round((out[line.iid] || 0) + use);
    }
  }
  return out;
}

// Runs before a doc in a workspace collection is stored; may change the data. `a` is the caller's access.
export async function beforeWrite(p, op, data, a) {
  if (!data) return data;
  if (p.col === 'forders') {
    // stockOut is the server's record of what an order took from stock; clients never set it.
    const { stockOut, ...rest } = data;
    data = rest;
    if (op === 'add' && isPaid(a.ws) && (a.ws.type === 'cafe' || a.ws.type === 'restaurant')) {
      const out = await usageOf(p.wsId, data.items);
      if (Object.keys(out).length) data.stockOut = out;
    }
  }
  if (p.col === 'purchases' && op === 'add') {
    const qty = num(data.qty), total = num(data.total);
    if (!(qty > 0) || total < 0 || typeof data.iid !== 'string') throw new AccessError(400, 'bad_data');
    const r = await q('select 1 from docs where path=$1', [`workspaces/${p.wsId}/inventory/${data.iid}`]);
    if (!r.rows[0]) throw new AccessError(400, 'bad_data');
    data = { ...data, qty, total, unitCost: round(total / qty) };
  }
  if (p.col === 'purchases' && op !== 'add') {
    // A purchase moves stock and the average cost, so it can be deleted but not edited.
    throw new AccessError(403, 'permission_denied');
  }
  return data;
}

// Runs after a doc was added. Returns the collections it changed besides the doc's own.
export async function afterAdd(p, data) {
  if (p.col === 'forders' && data.stockOut) {
    await applyStock(p.wsId, data.stockOut, -1);
    return [`workspaces/${p.wsId}/inventory`];
  }
  if (p.col === 'purchases') {
    // Buying raises stock and moves the unit cost to the weighted average of what is on the shelf.
    await q(`update docs set data = data || jsonb_build_object(
        'cost', round(case when greatest(${STOCK},0) + $2::numeric > 0
          then (greatest(${STOCK},0) * ${COST} + $3::numeric) / (greatest(${STOCK},0) + $2::numeric) else ${COST} end, 2),
        'stock', round(${STOCK} + $2::numeric, 4),
        'lastBuy', $4::text), updated_at=$5
      where path=$1`,
    [`workspaces/${p.wsId}/inventory/${data.iid}`, data.qty, data.total, String(data.date || ''), Date.now()]);
    return [`workspaces/${p.wsId}/inventory`];
  }
  return [];
}

// Runs after a doc was updated (merge). Cancelling an order gives its ingredients back.
export async function afterUpdate(p, data) {
  if (p.col !== 'forders' || data?.status !== 'لغو') return [];
  const path = p.segs.join('/');
  const r = await q(`with o as (select path, data->'stockOut' as s from docs where path=$1 and data ? 'stockOut' for update)
    update docs d set data = d.data - 'stockOut' from o where d.path=o.path returning o.s`, [path]);
  if (!r.rows[0]) return [];
  await applyStock(p.wsId, r.rows[0].s, 1);
  return [`workspaces/${p.wsId}/inventory`];
}

// Runs after a doc was deleted, with the data it had.
export async function afterRemove(p, old) {
  if (!old) return [];
  if (p.col === 'forders' && old.stockOut) {
    await applyStock(p.wsId, old.stockOut, 1);
    return [`workspaces/${p.wsId}/inventory`];
  }
  if (p.col === 'purchases' && old.iid) {
    await moveStock(p.wsId, old.iid, -num(old.qty));
    return [`workspaces/${p.wsId}/inventory`];
  }
  return [];
}
