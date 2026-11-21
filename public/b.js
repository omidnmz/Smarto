// Public page of one business: menu, services or products, booking and ordering on Pro/VIP,
// and joining the customer club on every plan.
(() => {
  const key = (location.pathname.match(/^\/b\/([^/?#]+)/) || [])[1] || '_';
  const V = document.getElementById('view'), H = document.getElementById('head'), BAR = document.getElementById('cartbar');
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtN = (n) => Math.round(+n || 0).toLocaleString('fa-IR');
  const toEn = (s) => String(s || '').replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, (d) => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
  const pf = (s, o) => { try { return new Intl.DateTimeFormat('fa-IR-u-ca-persian', o).format(new Date(s + 'T12:00:00')); } catch (e) { return s; } };
  const addDays = (s, n) => new Date(Date.parse(s + 'T12:00:00Z') + n * 864e5).toISOString().slice(0, 10);
  const JMONTHS = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
  const SLOTS = []; for (let h = 9; h <= 21; h++) for (const m of ['00', '30']) SLOTS.push(String(h).padStart(2, '0') + ':' + m);
  const ERR = {
    bad_contact: 'نام و شماره موبایل را درست بنویس.', bad_date: 'روز را انتخاب کن.', bad_time: 'ساعت را انتخاب کن.',
    bad_address: 'آدرس را بنویس.', empty: 'چیزی انتخاب نشده است.', example: 'این صفحه نمونه است و چیزی ثبت نمی‌شود.',
    subscription_expired: 'این کسب‌وکار فعلاً سفارش آنلاین نمی‌گیرد.', not_available: 'این امکان فعلاً فعال نیست.',
    too_many: 'چند دقیقه دیگر دوباره امتحان کن.',
  };

  let d = null;
  const cart = {};
  const ui = { mode: 'pickup', day: '', step: 'browse', booked: false, joined: false, ordered: null };

  let tt;
  const toast = (m) => { const t = document.getElementById('toast'); t.textContent = m; t.hidden = false; clearTimeout(tt); tt = setTimeout(() => { t.hidden = true; }, 2600); };
  async function post(path, body) {
    const r = await fetch('/api/public/' + encodeURIComponent(key) + '/' + path, {
      method: 'POST', headers: { 'content-type': 'application/json', 'x-smarto': '1' }, body: JSON.stringify(body),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(j.error || 'error'); e.code = r.status === 429 ? 'too_many' : j.error; throw e; }
    return j;
  }
  const fail = (e) => toast(ERR[e.code] || 'ثبت نشد، دوباره امتحان کن.');
  const form = (f) => { const v = {}; new FormData(f).forEach((x, k) => { v[k] = toEn(String(x).trim()); }); return v; };

  const byId = () => Object.fromEntries(d.items.map((x) => [x.id, x]));
  const cartLines = () => { const m = byId(); return Object.entries(cart).filter(([id, n]) => n > 0 && m[id]).map(([id, n]) => ({ it: m[id], qty: n })); };
  const cartTotal = () => cartLines().reduce((a, l) => a + l.it.price * l.qty, 0);
  const cartCount = () => cartLines().reduce((a, l) => a + l.qty, 0);
  const contactFields = () => `<div class="two"><label>نام<input name="name" required maxlength="60" autocomplete="name"></label><label>موبایل<input name="phone" required inputmode="tel" autocomplete="tel" placeholder="۰۹۱۲…"></label></div>`;

  function head() {
    const p = d.page, c = [];
    if (p.phone) c.push(`<a href="tel:${esc(toEn(p.phone).replace(/[^\d+]/g, ''))}">تماس ${esc(p.phone)}</a>`);
    if (p.instagram) c.push(`<a href="https://instagram.com/${esc(p.instagram.replace(/^@/, ''))}" rel="noopener" target="_blank">اینستاگرام</a>`);
    if (p.hours) c.push(`<span>ساعت کار: ${esc(p.hours)}</span>`);
    if (p.address) c.push(`<span>${esc(p.address)}</span>`);
    H.innerHTML = `<h1>${esc(d.name)}</h1>${d.label ? `<div class="lbl">${esc(d.label)}</div>` : ''}${p.about ? `<p class="about">${esc(p.about)}</p>` : ''}${c.length ? `<div class="contact">${c.join('')}</div>` : ''}`;
  }

  function itemsCard() {
    if (!d.items.length) return '';
    const title = d.kind === 'menu' ? 'منو' : d.kind === 'services' ? 'خدمات' : 'محصولات';
    const groups = {};
    d.items.forEach((x) => { (groups[x.cat || ''] ||= []).push(x); });
    const row = (x) => `<li><span class="nm">${esc(x.name)}${x.out ? ' <span class="pill p-mute">ناموجود</span>' : ''}</span><span class="pr">${x.price ? fmtN(x.price) + ' تومان' : ''}</span>
      ${d.order && !x.out ? `<span class="qty">${cart[x.id] ? `<button data-dec="${x.id}" aria-label="کم کردن">−</button><b>${fmtN(cart[x.id])}</b>` : ''}<button class="add" data-inc="${x.id}" aria-label="افزودن ${esc(x.name)}">+</button></span>` : ''}</li>`;
    return `<section class="card"><h2>${title}</h2>${Object.entries(groups).map(([g, xs]) => `${g ? `<h3>${esc(g)}</h3>` : ''}<ul class="items">${xs.map(row).join('')}</ul>`).join('')}</section>`;
  }

  function checkoutCard() {
    if (ui.ordered) return `<section class="card done-box"><b>سفارش ثبت شد</b><span>جمع: ${fmtN(ui.ordered)} تومان. ${esc(d.name)} به‌زودی با تو تماس می‌گیرد.</span><button class="chip" data-again="1" style="justify-self:center">سفارش تازه</button></section>`;
    if (ui.step !== 'checkout' || !cartCount()) return '';
    const isFood = d.kind === 'menu';
    return `<section class="card" id="checkout"><h2>تکمیل سفارش</h2>
      <ul class="items">${cartLines().map((l) => `<li><span class="nm">${esc(l.it.name)} × ${fmtN(l.qty)}</span><span class="pr">${fmtN(l.it.price * l.qty)} تومان</span></li>`).join('')}</ul>
      <form class="form" data-f="order">
        <div class="seg2" role="group"><button type="button" data-mode="pickup" aria-pressed="${ui.mode === 'pickup'}">${isFood ? 'بیرون‌بر' : 'تحویل حضوری'}</button><button type="button" data-mode="delivery" aria-pressed="${ui.mode === 'delivery'}">${isFood ? 'ارسال با پیک' : 'ارسال'}</button></div>
        ${contactFields()}
        ${ui.mode === 'delivery' ? '<label>آدرس<textarea name="address" required maxlength="300" rows="2"></textarea></label>' : ''}
        <label>توضیح<input name="note" maxlength="300" placeholder="اختیاری"></label>
        <button class="btn">ثبت سفارش · ${fmtN(cartTotal())} تومان</button>
        <p class="small muted" style="margin:0">پرداخت هنگام تحویل یا با هماهنگی خود ${esc(d.name)} است.</p>
      </form></section>`;
  }

  function bookCard() {
    if (!d.book || !d.items.length) return '';
    if (ui.booked) return `<section class="card done-box"><b>نوبت رزرو شد</b><span>${esc(ui.booked)}. برای تأیید با تو تماس می‌گیرند.</span><button class="chip" data-again="1" style="justify-self:center">رزرو دیگر</button></section>`;
    const days = Array.from({ length: 14 }, (_, i) => addDays(d.today, i)).filter((s) => s !== d.today || SLOTS.some((t) => t > d.now));
    if (!ui.day) ui.day = days[0];
    return `<section class="card" id="book"><h2>رزرو نوبت</h2><form class="form" data-f="book">
      <label>خدمت<select name="serviceId" required>${d.items.map((x) => `<option value="${esc(x.id)}">${esc(x.name)}${x.price ? ' · ' + fmtN(x.price) + ' تومان' : ''}</option>`).join('')}</select></label>
      <div class="days" role="group" aria-label="روز">${days.map((s, i) => `<button type="button" data-day="${s}" aria-pressed="${ui.day === s}">${i === 0 ? 'امروز' : i === 1 ? 'فردا' : pf(s, { weekday: 'long' })}<b>${pf(s, { day: 'numeric' })}</b>${pf(s, { month: 'short' })}</button>`).join('')}</div>
      <label>ساعت<select name="time" required>${SLOTS.filter((t) => ui.day !== d.today || t > d.now).map((t) => `<option value="${t}">${t.replace(/\d/g, (x) => '۰۱۲۳۴۵۶۷۸۹'[x])}</option>`).join('')}</select></label>
      ${contactFields()}
      <label>توضیح<input name="note" maxlength="300" placeholder="اختیاری"></label>
      <button class="btn">رزرو نوبت</button></form></section>`;
  }

  function joinCard() {
    if (ui.joined) return `<section class="card done-box"><b>${ui.joined === 'already' ? 'قبلاً عضو باشگاه شده‌ای' : 'به باشگاه مشتری‌ها خوش آمدی'}</b><span>هر ${fmtN(d.club.stampGoal)} خرید: ${esc(d.club.reward)}</span></section>`;
    return `<section class="card"><h2>باشگاه مشتری‌ها</h2><p class="small muted" style="margin:0">عضو شو تا با هر خرید امتیاز بگیری؛ هر ${fmtN(d.club.stampGoal)} خرید: ${esc(d.club.reward)}. تولدت را هم بنویس تا هدیه بگیری.</p>
      <form class="form" data-f="join">${contactFields()}
      <div class="two"><label>ماه تولد<select name="bm"><option value="">اختیاری</option>${JMONTHS.map((m, i) => `<option value="${i + 1}">${m}</option>`).join('')}</select></label><label>روز تولد<input name="bd" type="number" min="1" max="31" inputmode="numeric" placeholder="اختیاری"></label></div>
      <button class="btn">عضویت</button></form></section>`;
  }

  function render() {
    if (!d) return;
    V.innerHTML = [
      d.example ? '<div class="sample">این صفحه نمونه است تا ببینی صفحه کسب‌وکارت چه شکلی می‌شود.</div>' : '',
      checkoutCard(), bookCard(), itemsCard(), joinCard(),
      d.badge ? '<p class="badge">ساخته‌شده با <a href="/">اسمارتو</a>، پنل هوشمند کسب‌وکار</p>' : '',
    ].join('');
    const n = cartCount();
    BAR.hidden = !(d.order && n && ui.step !== 'checkout' && !ui.ordered);
    if (!BAR.hidden) BAR.innerHTML = `<div class="in"><span>${fmtN(n)} مورد · <b>${fmtN(cartTotal())}</b> تومان</span><button class="btn" data-checkout="1">ادامه و ثبت سفارش</button></div>`;
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    const s = b.dataset;
    if (s.inc) { cart[s.inc] = (cart[s.inc] || 0) + 1; ui.ordered = null; render(); return; }
    if (s.dec) { cart[s.dec] = Math.max(0, (cart[s.dec] || 0) - 1); if (!cartCount()) ui.step = 'browse'; render(); return; }
    if (s.checkout) { ui.step = 'checkout'; render(); document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' }); return; }
    if (s.mode) { ui.mode = s.mode; render(); return; }
    if (s.day) { const f = document.querySelector('form[data-f=book]'), keep = f ? Object.fromEntries(new FormData(f)) : {}; ui.day = s.day; render(); const g = document.querySelector('form[data-f=book]'); if (g) Object.entries(keep).forEach(([k, v]) => { const el = g.elements[k]; if (el && [...(el.options || [{ value: v }])].some((o) => o.value === v)) el.value = v; }); return; }
    if (s.again) { ui.booked = false; ui.ordered = null; ui.step = 'browse'; render(); }
  });

  document.addEventListener('submit', async (e) => {
    const f = e.target.closest('form[data-f]'); if (!f) return;
    e.preventDefault();
    const v = form(f), btn = f.querySelector('.btn');
    btn.disabled = true;
    try {
      if (f.dataset.f === 'join') {
        const r = await post('join', { name: v.name, phone: v.phone, birthday: v.bm && v.bd ? v.bm + '-' + v.bd : '' });
        ui.joined = r.already ? 'already' : 'yes';
      } else if (f.dataset.f === 'book') {
        await post('book', { name: v.name, phone: v.phone, serviceId: v.serviceId, date: ui.day, time: v.time, note: v.note });
        const sv = byId()[v.serviceId];
        ui.booked = `${sv ? sv.name + '، ' : ''}${pf(ui.day, { weekday: 'long', day: 'numeric', month: 'long' })} ساعت ${v.time.replace(/\d/g, (x) => '۰۱۲۳۴۵۶۷۸۹'[x])}`;
      } else if (f.dataset.f === 'order') {
        const r = await post('order', { name: v.name, phone: v.phone, address: v.address || '', note: v.note, mode: ui.mode, items: cartLines().map((l) => ({ id: l.it.id, qty: l.qty })) });
        ui.ordered = r.total; Object.keys(cart).forEach((k) => delete cart[k]); ui.step = 'browse';
      }
      render(); window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) { fail(err); btn.disabled = false; }
  });

  fetch('/api/public/' + encodeURIComponent(key)).then(async (r) => {
    if (!r.ok) throw new Error(String(r.status));
    d = await r.json();
    document.title = d.name + (d.label ? ' · ' + d.label : '');
    head(); render();
  }).catch(() => {
    H.innerHTML = '<h1>صفحه پیدا نشد</h1>';
    V.innerHTML = '<div class="empty">این صفحه وجود ندارد یا صاحبش آن را خاموش کرده است. <a href="/">اسمارتو</a></div>';
  });
})();
