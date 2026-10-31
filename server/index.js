import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify';
import cookie from '@fastify/cookie';
import rateLimit from '@fastify/rate-limit';
import fstatic from '@fastify/static';
import { migrate } from './db.js';
import { seedSamples } from './seed.js';
import { authRoutes, currentUser } from './auth.js';
import { AccessError } from './access.js';
import * as store from './store.js';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const app = Fastify({ logger: { level: process.env.LOG_LEVEL || 'info' }, bodyLimit: 256 * 1024, trustProxy: true });

await app.register(cookie);
await app.register(rateLimit, { global: true, max: 600, timeWindow: '1 minute' });
await app.register(fstatic, { root: path.join(root, 'public'), index: 'index.html' });
await app.register(fstatic, {
  root: path.join(root, 'node_modules/vazirmatn/fonts/webfonts'), prefix: '/fonts/', decorateReply: false,
  maxAge: '30d', immutable: true,
});

app.addHook('onSend', async (req, reply, payload) => {
  reply.header('X-Content-Type-Options', 'nosniff');
  reply.header('Referrer-Policy', 'same-origin');
  reply.header('X-Frame-Options', 'DENY');
  reply.header('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'");
  return payload;
});

app.decorateRequest('user', null);
app.addHook('preHandler', async (req, reply) => {
  if (!req.url.startsWith('/api/')) return;
  // Writes must come from our own page: a custom header cannot be sent cross-site without CORS.
  if (req.method !== 'GET' && req.headers['x-smarto'] !== '1') return reply.code(403).send({ error: 'bad_origin' });
  req.user = await currentUser(req);
});

app.setErrorHandler((err, req, reply) => {
  if (err instanceof AccessError) return reply.code(err.status).send({ error: err.code });
  if (err.statusCode && err.statusCode < 500) return reply.code(err.statusCode).send({ error: err.code || 'bad_request' });
  req.log.error(err);
  return reply.code(500).send({ error: 'server_error' });
});

authRoutes(app);
const ctxOf = (req) => ({ user: req.user });

app.get('/api/col', async (req) => ({ docs: await store.list(ctxOf(req), String(req.query.path || '')) }));
app.post('/api/col', async (req) => ({ id: await store.add(ctxOf(req), String(req.body?.path || ''), req.body?.data) }));
app.patch('/api/doc', async (req) => { await store.update(ctxOf(req), String(req.body?.path || ''), req.body?.data); return { ok: true }; });
app.put('/api/doc', async (req) => { await store.update(ctxOf(req), String(req.body?.path || ''), req.body?.data, { replace: true }); return { ok: true }; });
app.delete('/api/doc', async (req) => { await store.remove(ctxOf(req), String(req.query.path || '')); return { ok: true }; });

// Live updates: the page keeps one stream open and refetches a collection when told it changed.
app.get('/api/stream', (req, reply) => {
  reply.hijack();
  const res = reply.raw;
  res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive', 'X-Accel-Buffering': 'no' });
  res.write('retry: 3000\n\n');
  const user = req.user;
  const onChange = async (parent) => {
    if (await store.canHear({ user }, parent)) res.write(`data: ${JSON.stringify(parent)}\n\n`);
  };
  store.bus.on('change', onChange);
  const beat = setInterval(() => res.write(': ping\n\n'), 25000);
  req.raw.on('close', () => { clearInterval(beat); store.bus.off('change', onChange); });
});

app.get('/healthz', async () => ({ ok: true }));
app.setNotFoundHandler((req, reply) => {
  if (req.url.startsWith('/api/')) return reply.code(404).send({ error: 'not_found' });
  return reply.sendFile('index.html');
});

await migrate();
if (process.env.SEED_SAMPLES !== 'false') {
  // Samples are reloaded on every start so their dates stay current; only the admin can change them anyway.
  const added = await seedSamples({ reset: true, log: app.log });
  if (added.length) app.log.info(`samples loaded: ${added.join(', ')}`);
}
const port = Number(process.env.PORT || 3000);
await app.listen({ port, host: '0.0.0.0' });
