// Loads the sample businesses. Pass --reset to restore samples that were changed.
import { migrate, pool } from '../server/db.js';
import { seedSamples } from '../server/seed.js';

await migrate();
const done = await seedSamples({ reset: process.argv.includes('--reset') });
console.log(done.length ? `samples loaded: ${done.join(', ')}` : 'samples already present');
await pool.end();
