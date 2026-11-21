import { AccessError } from './access.js';

// Every panel pays monthly; a new panel gets its first month free. Panels made before subscriptions
// existed count their free month from the launch day. When the paid period ends the panel stays
// readable but takes no new records until the platform admin extends it.
export const LAUNCH = Date.parse('2026-11-21T00:00:00Z');
export const TRIAL_DAYS = 30;
const DAY = 86400000;
export function paidUntil(ws) {
  if (!ws || ws.example) return null;
  if (typeof ws.paidUntil === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(ws.paidUntil)) return ws.paidUntil;
  const start = Math.max(Number(ws.createdAt) || LAUNCH, LAUNCH);
  return new Date(start + TRIAL_DAYS * DAY).toISOString().slice(0, 10);
}
export const isExpired = (ws) => {
  const u = paidUntil(ws);
  return !!u && u < new Date().toISOString().slice(0, 10);
};
export function assertActive(ws) {
  if (isExpired(ws)) throw new AccessError(402, 'subscription_expired');
}
