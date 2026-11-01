import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from './db.js';

const file = path.join(path.dirname(path.dirname(fileURLToPath(import.meta.url))), 'seed', 'samples.json');
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const DAY = 86400000;

// Each sample was captured on its baseDate; shift every YYYY-MM-DD so the samples always look current.
function shiftDates(v, days) {
  if (typeof v === 'string' && DATE.test(v)) {
    const d = new Date(Date.parse(v + 'T00:00:00Z') + days * DAY);
    return d.toISOString().slice(0, 10);
  }
  if (Array.isArray(v)) return v.map((x) => shiftDates(x, days));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, shiftDates(x, days)]));
  return v;
}

// Inserts the sample businesses. Existing samples are left alone unless reset is true.
export async function seedSamples({ reset = false, log = console } = {}) {
  const { workspaces } = JSON.parse(fs.readFileSync(file, 'utf8'));
  const today = Date.parse(new Date().toISOString().slice(0, 10) + 'T00:00:00Z');
  const client = await pool.connect();
  const done = [];
  try {
    await client.query('begin');
    for (const [id, w] of Object.entries(workspaces)) {
      const wsPath = `workspaces/${id}`;
      const ex = await client.query('select data from docs where path=$1', [wsPath]);
      if (ex.rows[0] && !ex.rows[0].data.example) {
        log.warn?.(`skipping sample ${id}: a real workspace already uses this id`);
        continue;
      }
      if (ex.rows[0] && !reset) continue;
      const days = Math.round((today - Date.parse(w.baseDate + 'T00:00:00Z')) / DAY);
      await client.query('delete from docs where path=$1 or path like $2', [wsPath, `${wsPath}/%`]);
      const t = Date.now();
      await client.query('insert into docs(path,parent,id,data,updated_at) values($1,$2,$3,$4,$5)', [wsPath, 'workspaces', id, shiftDates(w.doc, days), t]);
      for (const [col, docs] of Object.entries(w.cols)) {
        const parent = `${wsPath}/${col}`;
        for (const [docId, data] of Object.entries(docs)) {
          await client.query('insert into docs(path,parent,id,data,updated_at) values($1,$2,$3,$4,$5)',
            [`${parent}/${docId}`, parent, docId, shiftDates(data, days), t]);
        }
      }
      done.push(id);
    }
    await client.query('commit');
  } catch (e) {
    await client.query('rollback');
    throw e;
  } finally {
    client.release();
  }
  return done;
}
