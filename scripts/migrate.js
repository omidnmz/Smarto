import { migrate, pool } from '../server/db.js';

await migrate();
console.log('database ready');
await pool.end();
