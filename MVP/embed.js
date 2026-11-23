/* =========================================================
   La app en la PC (administrador y comercio): piezas de escritorio.
   · Barra superior: institución / comercio, fecha de la demo y quién está conectado.
   · Pie de la barra lateral: la cuenta en uso (abre el perfil en admin).
   Usa el estado y las funciones de app.js y roles.js. En el celu no hace nada.
   ========================================================= */
(() => {
  const isPc = () => S.role === 'admin' || S.role === 'shop';
  const screen = document.getElementById('screen');

  const top = document.createElement('header');
  top.className = 'pc-top';
  const foot = document.createElement('button');
  foot.type = 'button';
  foot.className = 'pc-user';
  screen.append(top, foot);

  /* quién está usando la PC, según el rol */
  const who = () => S.role === 'admin'
    ? { ini: initials(S.adminName), name: S.adminName, sub: 'Administrador', org: S.adminOrg }
    : { ini: initials(SHOP), name: SHOP, sub: 'Comercio aliado', org: `${SHOP} · ${U().campus}` };

  function decorate() {
    document.body.dataset.role = S.role || 'student';
    if (!isPc()) return;
    const w = who(), live = S.role !== 'shop' || shopLive(shopPerk());
    top.innerHTML = T(`<span class="pc-org"><i></i>${esc(w.org)}</span>
      <span class="pc-date mono">${todayLbl()}</span>
      <span class="pc-me"><b>${esc(w.ini)}</b></span>`);
    foot.innerHTML = T(`<span class="av">${esc(w.ini)}</span><span><b>${esc(w.name)}</b><small>${w.sub}${S.role === 'shop' ? (live ? ' · activo' : ' · pausado') : ''}</small></span>`);
    foot.title = S.role === 'admin' ? 'Editar perfil' : 'Ver mis métricas';
  }

  foot.addEventListener('click', () => S.role === 'admin' ? adminSheet() : go('s_home'));

  /* En la PC la app se ve más chica que en el celu: ningún texto por debajo de MIN px
     (las etiquetas en mayúscula de 9–10 px quedaban ilegibles en una notebook). */
  const MIN = 11;
  function legible(root) {
    if (!isPc() || !root) return;
    root.querySelectorAll('*').forEach(el => {
      if (el.dataset.minfs || !el.childNodes.length) return;
      const fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs && fs < MIN) { el.style.fontSize = MIN + 'px'; el.dataset.minfs = '1'; }
    });
  }
  const fix = () => requestAnimationFrame(() => { legible(document.getElementById('view')); legible(document.getElementById('sheet')); legible(top); });

  /* cada vez que la app dibuja una pantalla, se actualizan la barra y el pie */
  const _go = go;
  go = function (...args) { const r = _go.apply(this, args); decorate(); report(); return r; };
  const _applyUni = applyUni;
  applyUni = function (...args) { const r = _applyUni.apply(this, args); decorate(); report(); return r; };

  /* ---------- la página de la demo: estado hacia afuera, órdenes hacia adentro ---------- */
  /* se avisa rol, universidad y si se puede volver atrás, cada vez que algo de eso cambia */
  let last = '';
  function report() {
    if (window.parent === window) return;
    const st = { type: 'state', role: S.role || 'student', uni: S.uni || 'unlam', canBack: !!canBack() };
    const k = JSON.stringify(st); if (k === last) return; last = k;
    try { window.parent.postMessage(st, '*'); } catch {}
  }
  const _syncBack = syncBack;
  syncBack = function (...args) { const r = _syncBack.apply(this, args); report(); fix(); return r; };
  const _openSheet = openSheet, _closeSheet = closeSheet;
  openSheet = function (...args) { const r = _openSheet.apply(this, args); report(); fix(); return r; };
  closeSheet = function (...args) { const r = _closeSheet.apply(this, args); report(); return r; };

  addEventListener('message', e => {
    if (e.source !== window.parent) return;
    const m = e.data || {};
    if (m.type === 'back') { if (canBack()) goBack(); report(); }
    if (m.type === 'reset') { try { localStorage.setItem('desafio-bienestar', JSON.stringify({ uni: m.uni || S.uni || 'unlam' })); } catch {} }
  });

  /* tooltip de los gráficos: cualquier elemento con data-tip muestra su detalle al pasar el mouse */
  const tip = document.createElement('div');
  tip.className = 'chart-tip'; tip.setAttribute('role', 'tooltip');
  screen.append(tip);
  let tipEl = null;
  screen.addEventListener('pointermove', e => {
    const el = e.target.closest('[data-tip]');
    if (!el) { if (tipEl) { tip.classList.remove('on'); tipEl = null; } return; }
    if (el !== tipEl) { tipEl = el; tip.textContent = el.dataset.tip; tip.classList.add('on'); }
    const r = screen.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight;
    let x = e.clientX - r.left + 14, y = e.clientY - r.top - h - 12;
    if (x + w > r.width - 8) x = e.clientX - r.left - w - 14;
    if (y < 8) y = e.clientY - r.top + 18;
    tip.style.transform = `translate(${Math.round(x)}px,${Math.round(y)}px)`;
  });
  screen.addEventListener('pointerleave', () => { tip.classList.remove('on'); tipEl = null; });

  /* hora real en la barra del celu (como en un iPhone: sin cero adelante en la hora) */
  const clock = document.querySelector('.statusbar .sb-time');
  function tick() {
    if (!clock) return;
    const d = new Date();
    clock.textContent = `${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`;
    setTimeout(tick, (60 - d.getSeconds()) * 1000 + 50);   /* justo al cambiar el minuto */
  }
  tick();

  decorate();
  report();
})();
