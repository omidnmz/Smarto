import crypto from 'node:crypto';

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export function newId(len = 20) {
  const bytes = crypto.randomBytes(len);
  let s = '';
  for (let i = 0; i < len; i++) s += ALPHA[bytes[i] % ALPHA.length];
  return s;
}
export const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex');
export const randomCode = () => String(crypto.randomInt(0, 100000)).padStart(5, '0');
export const randomToken = () => crypto.randomBytes(32).toString('base64url');

// Accepts 0912..., +98912..., 98912..., ۰۹۱۲... and returns 09xxxxxxxxx, or null.
export function normalizePhone(raw) {
  let s = String(raw || '')
    .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
    .replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d))
    .replace(/[^\d+]/g, '');
  if (s.startsWith('+98')) s = '0' + s.slice(3);
  else if (s.startsWith('0098')) s = '0' + s.slice(4);
  else if (s.startsWith('98') && s.length === 12) s = '0' + s.slice(2);
  else if (s.startsWith('9') && s.length === 10) s = '0' + s;
  return /^09\d{9}$/.test(s) ? s : null;
}

// Passwords are stored as scrypt$<salt>$<hash>. Persian and Arabic digits count as the same digits,
// so a password typed on either keyboard works.
const toLatin = (s) => String(s || '').replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
export const cleanPassword = (pw) => toLatin(pw).normalize('NFC');
export function hashPassword(pw) {
  const salt = crypto.randomBytes(16).toString('base64url');
  const h = crypto.scryptSync(cleanPassword(pw), salt, 32).toString('base64url');
  return `scrypt$${salt}$${h}`;
}
export function checkPassword(pw, stored) {
  const [kind, salt, h] = String(stored || '').split('$');
  if (kind !== 'scrypt' || !salt || !h) return false;
  const a = crypto.scryptSync(cleanPassword(pw), salt, 32);
  const b = Buffer.from(h, 'base64url');
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
export const tempPassword = () => String(crypto.randomInt(100000, 1000000));
