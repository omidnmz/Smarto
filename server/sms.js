// Sends the login code. With KAVENEGAR_API_KEY and KAVENEGAR_TEMPLATE set it uses
// Kavenegar's verify/lookup API; otherwise it only logs the code (for development).
export async function sendLoginCode(phone, code, log) {
  const key = process.env.KAVENEGAR_API_KEY;
  const template = process.env.KAVENEGAR_TEMPLATE;
  if (!key || !template) {
    log.warn({ phone }, `login code for ${phone}: ${code} (SMS not configured)`);
    return;
  }
  const url = `https://api.kavenegar.com/v1/${encodeURIComponent(key)}/verify/lookup.json`;
  const body = new URLSearchParams({ receptor: phone, token: code, template });
  const res = await fetch(url, { method: 'POST', body });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    log.error({ status: res.status, text }, 'kavenegar send failed');
    throw new Error('sms_failed');
  }
}
