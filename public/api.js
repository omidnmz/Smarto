// Small client for the Smarto server. It mirrors the collection/doc API the panel was written
// against: collection(path).onSnapshot/add and doc(path).update/set/delete.
(() => {
  const subs = new Map(); // collection path -> { listeners:Set, timer }
  const H = { 'Content-Type': 'application/json', 'X-Smarto': '1' };

  async function call(method, url, body) {
    const res = await fetch(url, { method, headers: H, credentials: 'same-origin', body: body ? JSON.stringify(body) : undefined });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const e = new Error(data.error || 'error');
      e.code = res.status === 403 ? 'permission_denied' : res.status === 401 ? 'login_required' : data.error || 'error';
      e.status = res.status; e.data = data;
      throw e;
    }
    return data;
  }

  async function refresh(path) {
    const s = subs.get(path);
    if (!s || !s.listeners.size) return;
    try {
      const r = await call('GET', '/api/col?path=' + encodeURIComponent(path));
      const snap = { docs: r.docs.map((d) => ({ id: d.id, data: () => d.data })) };
      s.listeners.forEach((l) => { try { l.cb(snap); } catch (e) { console.error(e); } });
    } catch (e) {
      // A collection this role may not open (salaries, costs) reads as empty.
      if (e.code === 'permission_denied') {
        s.listeners.forEach((l) => { try { l.cb({ docs: [] }); } catch (x) { console.error(x); } });
        return;
      }
      s.listeners.forEach((l) => l.err && l.err(e));
    }
  }
  const soon = (path) => {
    const s = subs.get(path);
    if (!s) return;
    clearTimeout(s.timer);
    s.timer = setTimeout(() => refresh(path), 120);
  };

  let es = null, wasDown = false;
  function stream() {
    if (es) es.close();
    es = new EventSource('/api/stream');
    es.onmessage = (ev) => { try { soon(JSON.parse(ev.data)); } catch {} };
    es.onerror = () => { wasDown = true; };
    es.onopen = () => { if (wasDown) { wasDown = false; subs.forEach((_, p) => soon(p)); } };
  }

  const db = {
    collection(path) {
      return {
        onSnapshot(cb, err) {
          let s = subs.get(path);
          if (!s) { s = { listeners: new Set(), timer: null }; subs.set(path, s); }
          const l = { cb, err };
          s.listeners.add(l);
          refresh(path);
          return () => { s.listeners.delete(l); if (!s.listeners.size) subs.delete(path); };
        },
        async add(data) { const r = await call('POST', '/api/col', { path, data }); soon(path); return { id: r.id }; },
      };
    },
    doc(path) {
      const parent = path.split('/').slice(0, -1).join('/');
      return {
        async update(data) { await call('PATCH', '/api/doc', { path, data }); soon(parent); },
        async set(data) { await call('PUT', '/api/doc', { path, data }); soon(parent); },
        async delete() { await call('DELETE', '/api/doc?path=' + encodeURIComponent(path)); soon(parent); },
      };
    },
  };

  window.smarto = {
    db,
    me: () => call('GET', '/api/me'),
    requestCode: (phone) => call('POST', '/api/auth/request', { phone }),
    verify: (phone, code) => call('POST', '/api/auth/verify', { phone, code }),
    logout: () => call('POST', '/api/auth/logout', {}),
    reconnect: () => { stream(); subs.forEach((_, p) => soon(p)); },
    start: stream,
  };
})();
