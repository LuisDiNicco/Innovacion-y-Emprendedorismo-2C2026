/* =========================================================
   Una app, tres vistas.
   · Estudiante: la app de siempre (app.js).
   · Administrador: gestiona actividades, propuestas, usuarios y comercios.
   · Comercio: ve su publicidad, propone o se suma a actividades y canjea beneficios.
   Usa el estado y los componentes de app.js (mismo script global).
   ========================================================= */

const SHOP = 'Vivero Las Talas';                 /* el comercio de ejemplo del modo Comercio */
const shopPerk = () => PERKS.find(p => p.n === SHOP);
const shopLive = p => (S.shopStatus[p.n] || 'active') === 'active';
const dayLbl = n => dowFor(n) + ' ' + dnum(n);
const fmt = n => Number(n).toLocaleString('es-AR');
const sponsorLive = c => !c.sponsor || (S.shopStatus[c.sponsor] || 'active') === 'active';   /* un comercio pausado deja de aparecer */
const suspended = () => S.userState.me === 'suspended';
const goingOf = c => c.going + (isJoined(c.id) ? 1 : 0);                                      /* incluye tu propia inscripción */
const perkOf = n => PERKS.find(p => p.n === n);
const canjesOf = n => { const p = perkOf(n); return 9 + (n.length * 7) % 31 + (p && S.perks.includes(p.id) ? 1 : 0); };   /* un solo número para admin y comercio */
const pendingCode = () => { const c = S.codes[shopPerk().id]; return c && !S.validated.includes(c) ? c : null; };
const suspendedCount = () => Object.values(S.userState).filter(v => v === 'suspended').length;
const raCount = (arr, st) => arr.filter(p => p.status === st).length;

/* recompensa editada por el comercio */
function applyPerkOver() { Object.entries(S.perkOver || {}).forEach(([id, o]) => { const p = PERKS.find(x => x.id === id); if (p) Object.assign(p, o); }); }
applyPerkOver();

/* ---------- barra inferior según el rol ---------- */
const TB_STUDENT = tabbar.innerHTML;
const IC_P = {
  grid: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
  cal: '<path d="M4 6h16v14H4ZM4 10h16M8 3.5V7M16 3.5V7M8 14h2M14 14h2M8 17h2"/>',
  users: '<path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20c.6-3.5 3.2-5.5 6.5-5.5s5.9 2 6.5 5.5M16 4.2a3.4 3.4 0 0 1 0 6.6M18 14.8c2 .6 3.2 2.4 3.5 5.2"/>',
  shop: '<path d="M4 9 5.5 4h13L20 9M4 9v11h16V9M4 9h16M9 20v-6h6v6"/>',
  chart: '<path d="M4 20h16M7 20v-7M12 20V5M17 20v-10"/>',
  gift: '<path d="M4 10h16v10H4ZM3 7h18v3H3ZM12 7v13M12 7c-1.5-3-5-3.5-5-1.2C7 7 9.5 7 12 7Zm0 0c1.5-3 5-3.5 5-1.2C17 7 14.5 7 12 7Z"/>',
};
const tb = (tab, p, label) => `<button data-tab="${tab}"><svg viewBox="0 0 24 24">${IC_P[p]}</svg><span>${label}</span></button>`;
const TABS = {
  admin: [tb('a_home', 'grid', 'Resumen'), tb('a_acts', 'cal', 'Actividades'), tb('a_users', 'users', 'Usuarios'), tb('a_shops', 'shop', 'Comercios')],
  shop: [tb('s_home', 'chart', 'Métricas'), tb('s_acts', 'cal', 'Actividades'), tb('s_redeem', 'gift', 'Canjear')],
};
DEST.push('a_home', 'a_acts', 'a_users', 'a_shops', 's_home', 's_acts', 's_redeem');
let tbRole = 'student';
function renderTabbar() {
  const role = S.role || 'student';
  if (role === tbRole) return;
  tbRole = role;
  tabbar.innerHTML = TABS[role] ? TABS[role].join('') : TB_STUDENT;
  tabbar.style.gridTemplateColumns = TABS[role] ? `repeat(${TABS[role].length},minmax(0,1fr))` : '';
}

function setRole(role, silent) {
  if (S.role === role && !silent) return;
  S.role = role; save(); trail.length = 0; closeSheet(); renderTabbar();
  if (silent) return;
  toast(role === 'admin' ? `${ic('build')} Vista de administración` : role === 'shop' ? `${ic('shop')} Vista de comercio` : `${ic('user')} Vista de estudiante`);
  go(role === 'student' ? (S.onboarded ? 'home' : 'welcome') : ROLE_HOME[role]);
}

/* ---------- piezas comunes ---------- */
const head = (eyebrow, title) => `<div class="page-h"><div class="eyebrow mono" ${r(0)}>${eyebrow}</div><h1 class="h-display" ${r(1)}>${title}</h1></div>`;
const segs = (opts, cur, act) => `<div class="seg pad" ${r(2)}><div style="grid-template-columns:repeat(${opts.length},1fr)">${opts.map(([k, l]) => `<button class="${k === cur ? 'on' : ''}" data-ra="${act}" data-rid="${k}">${l}</button>`).join('')}</div></div>`;
const trio = (arr, i) => `<div class="sec pad trio" ${r(i)}>${arr.map(([n, l]) => `<div><b data-count="${n}">0</b><span>${l}</span></div>`).join('')}</div>`;
const kpi = (n, l, sub) => `<div class="kpi2"><b>${n}</b><span>${l}</span>${sub ? `<small>${sub}</small>` : ''}</div>`;
const bars = (vals, labels, color) => { const m = Math.max(...vals); return `<div class="mbars">${vals.map((v, i) => `<div><i style="height:${Math.round(v / m * 100)}%;background:${color || 'var(--unlam)'}"></i><em>${labels[i]}</em></div>`).join('')}</div>`; };
const DAYS7 = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const stPill = st => ({ active: ['Activo', 'ok'], pending: ['Pendiente', 'wait'], paused: ['Pausado', 'off'], suspended: ['Suspendido', 'off'], approved: ['Publicada', 'ok'], rejected: ['Rechazada', 'off'] }[st] || ['', '']);
const pill = st => { const [l, c] = stPill(st); return `<span class="stp ${c}">${l}</span>`; };
const actRow = (c, i, edit) => `<div class="ag-item" style="--c:${TYPES[c.type].c}" ${r(8 + Math.min(i, 8))}>
    <div class="ag-when"><b>${c.time}</b><span>${c.dow} ${dnum(c.day)}</span></div>
    <button class="ag-body" data-go="detail" data-p="${c.id}"><span class="mono">${TYPES[c.type].label} · ${durTxt(c.mins)}</span><b>${c.title}</b><small>${ic('people')}${goingOf(c)} de ${c.cap} inscriptos${c.sponsor ? ' · ' + c.sponsor : ''}</small></button>
    ${edit ? `<button class="ag-act" data-editact="${c.id}" aria-label="Editar actividad">${ic('arrow')}</button>` : '<span></span>'}
  </div>`;
const sortedCH = () => [...CH].sort((a, b) => a.day - b.day || a.time.localeCompare(b.time));

/* ---------- panel del comercio: métricas y gráficos ----------
   Todo sale del mismo estado que usa la app: los toques que hace el estudiante en «Cómo llegar» o Instagram
   suman ese día, y los canjes son los mismos que ve el administrador. */
const GOLD = '#B8860B';
const WEEK7 = [6, 5, 4, 3, 2, 1, 0].map(k => DOWL[dateOf(TODAY - k).getDay()].slice(0, 3) + ' ' + dnum(TODAY - k));   /* los 7 días hasta hoy */
const SLOTS = ['8 a 10', '10 a 12', '12 a 14', '14 a 16', '16 a 18', '18 a 20'];
const SLOT_W = [.55, .95, 1.4, .8, 1.05, .6];                                               /* el mediodía es el pico de uso */
const spread = (total, w) => { const s = w.reduce((a, b) => a + b, 0); const out = w.map(x => Math.floor(total * x / s)); out[out.length - 1] += total - out.reduce((a, b) => a + b, 0); return out; };
function shopMetrics() {
  const tk = k => S.track[SHOP + '|' + k] || 0;
  const vd = [118, 142, 171, 156, 189, 204, 262]; vd[6] += 5 * (tk('maps') + tk('ig'));
  const md = [3, 4, 6, 5, 6, 6, 8]; md[6] += tk('maps');
  const gd = [2, 3, 3, 4, 3, 4, 5]; gd[6] += tk('ig');
  const sum = a => a.reduce((x, y) => x + y, 0);
  const canjes = canjesOf(SHOP), cd = spread(canjes, vd);
  const views = sum(vd), maps = sum(md), ig = sum(gd);
  const grid = vd.map(v => spread(v, SLOT_W));
  const tot = SLOTS.map((_, j) => sum(grid.map(row => row[j])));
  return { days: WEEK7, views, maps, ig, canjes, fichas: Math.round(views * .23),
    d: { views: vd, maps: md, ig: gd, canjes: cd },
    prev: { views: 1051, maps: 31, ig: 22, canjes: Math.max(1, Math.round(canjes * .82)) },
    grid, bestSlot: SLOTS[tot.indexOf(Math.max(...tot))] + ' h' };
}
/* tarjeta de indicador: número, variación contra la semana anterior y tendencia de los 7 días */
function kpiX(label, val, prev, series, sub) {
  const d = Math.round((val - prev) / prev * 100), up = d >= 0;
  const W = 96, H = 30, mx = Math.max(...series), mn = Math.min(...series);
  const pts = series.map((v, i) => [i * W / (series.length - 1), H - 4 - (v - mn) / (mx - mn || 1) * (H - 8)]);
  const path = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join('');
  const [lx, ly] = pts[pts.length - 1];
  return `<div class="kx" data-tip="${label}: ${fmt(val)} · semana anterior ${fmt(prev)}">
    <span class="kx-l">${label}</span><b>${fmt(val)}</b>
    <div class="kx-f"><span class="dlt ${up ? 'up' : 'down'}">${up ? '▲' : '▼'} ${Math.abs(d)}%</span>
      <svg class="spark" viewBox="-4 -4 ${W + 8} ${H + 8}" aria-hidden="true"><path d="${path}L${W} ${H}L0 ${H}Z" fill="${GOLD}" fill-opacity=".1"/><path d="${path}" fill="none" stroke="${GOLD}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${lx}" cy="${ly}" r="4" fill="${GOLD}" stroke="#FBFAF4" stroke-width="2"/></svg></div>
    ${sub ? `<small>${sub}</small>` : ''}</div>`;
}
/* área: una sola serie, grilla fina, el pico rotulado y el detalle de cada día al pasar el mouse */
function areaChart(vals, labels, unit) {
  const W = 520, H = 200, pl = 36, pr = 14, pt = 22, pb = 28;
  const top = Math.ceil(Math.max(...vals) * 1.12 / 50) * 50;
  const x = i => pl + i * (W - pl - pr) / (vals.length - 1), y = v => pt + (1 - v / top) * (H - pt - pb);
  const line = vals.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join('');
  const grid = [0, .5, 1].map(f => { const v = Math.round(top * f); return `<line x1="${pl}" x2="${W - pr}" y1="${y(v)}" y2="${y(v)}" class="gl"/><text x="${pl - 8}" y="${y(v) + 3.5}" text-anchor="end" class="ax">${fmt(v)}</text>`; }).join('');
  const cw = (W - pl - pr) / (vals.length - 1), pk = vals.indexOf(Math.max(...vals));
  const hits = vals.map((v, i) => `<g class="hit" data-tip="${labels[i]} · ${fmt(v)} ${unit}"><rect x="${x(i) - cw / 2}" y="${pt - 10}" width="${cw}" height="${H - pt - pb + 10}" fill="transparent"/><line x1="${x(i)}" x2="${x(i)}" y1="${pt}" y2="${H - pb}" class="cross"/><circle cx="${x(i)}" cy="${y(v)}" r="4.5" class="hdot"/></g>`).join('');
  return `<svg class="area" viewBox="0 0 ${W} ${H}" role="img" aria-label="${unit} por día: ${vals.map((v, i) => labels[i] + ' ' + v).join(', ')}">
    ${grid}<line x1="${pl}" x2="${W - pr}" y1="${H - pb}" y2="${H - pb}" class="base"/>
    <path d="${line}L${x(vals.length - 1)} ${H - pb}L${x(0)} ${H - pb}Z" fill="${GOLD}" fill-opacity=".1"/>
    <path d="${line}" fill="none" stroke="${GOLD}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${x(pk)}" cy="${y(vals[pk])}" r="4.5" fill="${GOLD}" stroke="#FBFAF4" stroke-width="2"/>
    <text x="${x(pk) - (pk === vals.length - 1 ? 8 : 0)}" y="${y(vals[pk]) - 11}" text-anchor="${pk === vals.length - 1 ? 'end' : 'middle'}" class="pk">${fmt(vals[pk])}</text>
    ${labels.map((l, i) => `<text x="${x(i)}" y="${H - 9}" text-anchor="middle" class="ax">${l}</text>`).join('')}${hits}</svg>`;
}
/* embudo: cada paso con su barra y la conversión desde el paso anterior */
function funnel(steps) {
  const mx = steps[0][1];
  return `<div class="fn">${steps.map(([l, v], i) => `<div class="fn-row" data-tip="${l} · ${fmt(v)}${i ? ' · ' + Math.round(v / steps[i - 1][1] * 100) + '% del paso anterior' : ''}">
    <span class="fn-l">${l}</span><div class="fn-bar"><i style="width:${Math.max(1.5, v / mx * 100)}%"></i></div><b>${fmt(v)}</b><em>${i ? Math.round(v / steps[i - 1][1] * 100) + '%' : ''}</em></div>`).join('')}</div>`;
}
/* mapa de calor: días × franjas, un solo tono de claro a oscuro */
function heatmap(m) {
  const all = m.grid.flat(), mx = Math.max(...all), mn = Math.min(...all);
  const cell = (v, d, s) => `<i style="--a:${Math.round(12 + (v - mn) / (mx - mn) * 88)}%" data-tip="${d} · ${s} h · ${fmt(v)} vistas"></i>`;
  return `<div class="hm"><span></span>${SLOTS.map(s => `<span class="hm-x">${s.split(' a ')[0]}</span>`).join('')}
    ${m.grid.map((row, i) => `<span class="hm-y">${m.days[i].split(' ')[0]}</span>${row.map((v, j) => cell(v, m.days[i], SLOTS[j])).join('')}`).join('')}</div>
    <div class="hm-legend"><span>Menos</span><i></i><span>Más</span></div>`;
}

/* ========================= ADMINISTRADOR ========================= */
const USERS = [
  { id: 'u1', n: 'Mica Benítez', car: 'Humanidades', pts: 620, acts: 9 }, { id: 'u2', n: 'Tomás Rey', car: 'Informática', pts: 410, acts: 6 },
  { id: 'u3', n: 'Sofía Ferreyra', car: 'Nutrición', pts: 1040, acts: 17 }, { id: 'u4', n: 'Agustín Gómez', car: 'Ingeniería', pts: 150, acts: 3 },
  { id: 'u5', n: 'Pilar Vega', car: 'Derecho', pts: 530, acts: 8 }, { id: 'u6', n: 'Nico Iglesias', car: 'Económicas', pts: 95, acts: 2 },
];
const lvlOf = pts => [...LEVELS].reverse().find(l => pts >= l[1])[0];
const shopNames = () => Object.keys(SPONSORS);

Object.assign(VIEWS, {
  a_home() {
    const pend = raCount(S.proposals, 'pending'), susp = suspendedCount();
    const activeShops = shopNames().filter(n => (S.shopStatus[n] || 'active') === 'active').length;
    const top = [...CH].sort((a, b) => goingOf(b) - goingOf(a)).slice(0, 3);
    return `${head('Panel de administración', 'Resumen')}
      <div class="sec pad" ${r(3)}><div class="me-card admin"><span class="photo">${esc(initials(S.adminName))}</span><span><b>${esc(S.adminName)}</b><small>Administrador · ${esc(S.adminOrg)}</small></span><button class="mono me-go" data-editadmin>Editar ${ic('arrow')}</button></div></div>
      ${trio([[1284 - susp, 'estudiantes activos'], [CH.length, 'actividades publicadas'], [activeShops, 'comercios aliados']], 4)}
      <div class="sec pad" ${r(5)}>${pend
        ? `<button class="propose" data-ra="gopend">${ic('bell')}<span><b>${pend} ${pend === 1 ? 'propuesta espera' : 'propuestas esperan'} tu revisión</b><small>De estudiantes y comercios. Aprobá para publicarlas en Desafíos.</small></span></button>`
        : `<div class="privacy">${ic('check')}<p><b>Todo al día.</b> No hay propuestas pendientes.</p></div>`}</div>
      <div class="sec pad" ${r(6)}><div class="card2"><div class="mono">Participación semanal</div>${bars([22, 27, 31, 26, 34, 37, 41], DAYS7)}<small class="c2s">Estudiantes que sellaron asistencia por día</small></div></div>
      <div class="sec"><div class="sec-h pad" ${r(7)}><h2>Más inscriptos</h2></div><div class="ag-list pad">${top.map((c, i) => actRow(c, i, false)).join('')}</div></div>
      <div class="sec pad" ${r(12)}><div class="privacy">${ic('check')}<p><b>Ves datos agregados.</b> Cantidad de inscriptos y asistencia, nunca cómo se siente cada estudiante.</p></div></div>`;
  },

  a_acts() {
    const pend = raCount(S.proposals, 'pending'), tab = S.admTab === 'pub' ? 'pub' : 'pend';
    const prop = p => `<div class="prop" ${r(4)}>
        <div class="prop-h"><span class="frm ${p.from}">${p.from === 'shop' ? ic('shop') + 'Comercio' : ic('user') + 'Estudiante'}</span><span class="mono">${p.by}</span></div>
        <b>${p.title}</b>
        <small>${p.kind === 'support' ? 'Ofrece apoyar una actividad ya publicada' : `${TYPES[p.type].label} · ${dayLbl(p.day)} ${p.time} · ${p.place}`}</small>
        ${p.text ? `<p>${p.text}</p>` : ''}
        ${p.sponsorTxt ? `<div class="prop-sp">${ic('gift')}<span><b>Aporta:</b> ${p.sponsorTxt}</span></div>` : ''}
        ${p.uid && S.userState[p.uid] === 'suspended' ? `<div class="prop-sp">${ic('bell')}<span>Este usuario está suspendido. Reactivalo en Usuarios para publicar su propuesta.</span></div>` : ''}
        ${p.status === 'pending'
          ? `<div class="prop-act"><button class="btn ghost sm" data-ra="reject" data-rid="${p.id}">Rechazar</button><button class="btn sm" data-ra="approve" data-rid="${p.id}" ${p.uid && S.userState[p.uid] === 'suspended' ? 'disabled' : ''}>Aprobar y publicar</button></div>`
          : `<div class="prop-done">${pill(p.status)}</div>`}
      </div>`;
    const todo = S.proposals.filter(p => p.status === 'pending'), done = S.proposals.filter(p => p.status !== 'pending');
    const body = tab === 'pend'
      ? `<div class="sec pad prop-list">${todo.length ? todo.map(prop).join('') : `<div class="ag-empty" ${r(4)}><p>No hay propuestas por revisar.</p></div>`}</div>
         ${done.length ? `<div class="sec"><div class="sec-h pad"><h2>Resueltas</h2></div><div class="sec pad prop-list">${done.map(prop).join('')}</div></div>` : ''}`
      : `<div class="sec pad" ${r(4)}><button class="propose" data-newact>${ic('plus')}<span><b>Crear actividad</b><small>Se publica en Desafíos para todos los estudiantes, con día, hora, lugar y cupo.</small></span></button></div>
         <div class="sec"><div class="sec-h pad" ${r(5)}><h2>Todas las actividades</h2><span class="mono" style="color:var(--ink-3)">${rangeLbl(16, 22, true)}</span></div><div class="ag-list pad">${sortedCH().map((c, i) => actRow(c, i, true)).join('')}</div></div>`;
    return `${head('Administración', 'Actividades')}${segs([['pend', `Propuestas${pend ? ' · ' + pend : ''}`], ['pub', 'Publicadas']], tab, 'admtab')}${body}`;
  },

  a_users() {
    const state = u => S.userState[u.id] || 'active', susp = suspendedCount(), meOff = suspended();
    const row = (u, i) => `<div class="usr${state(u) === 'suspended' ? ' off' : ''}" ${r(5 + i)}>
        <span class="av">${initials(u.n)}</span>
        <span><b>${u.n}</b><small>${u.car} · Nivel ${lvlOf(u.pts)} · ${u.acts} sellos</small></span>
        <button class="chip sm${state(u) === 'suspended' ? ' on' : ''}" data-ra="usr" data-rid="${u.id}">${state(u) === 'suspended' ? 'Reactivar' : 'Suspender'}</button>
      </div>`;
    return `${head('Administración', 'Usuarios')}
      ${trio([[1284 - susp, 'estudiantes activos'], [38, 'se sumaron esta semana'], [susp, 'suspendidos']], 3)}
      <div class="sec"><div class="sec-h pad" ${r(4)}><h2>Estudiantes</h2><span class="mono" style="color:var(--ink-3)">${USERS.length + 1} de 1.284</span></div>
        <div class="usr-list pad">
          <div class="usr me${meOff ? ' off' : ''}" ${r(5)}><span class="av">${esc(initials(S.name))}</span><span><b>${esc(S.name)} <em class="mono">vista estudiante</em></b><small>${esc(S.carrera)} · ${S.points} pts · ${S.done.length} sellos nuevos</small></span><button class="chip sm${meOff ? ' on' : ''}" data-ra="usr" data-rid="me">${meOff ? 'Reactivar' : 'Suspender'}</button></div>
          ${USERS.map(row).join('')}
        </div></div>
      <div class="sec pad" ${r(12)}><div class="privacy">${ic('check')}<p><b>Privacidad primero.</b> Ves quién participa y cuánto, nunca cómo se siente cada estudiante.</p></div></div>`;
  },

  a_shops() {
    const st = n => S.shopStatus[n] || 'active';
    const card = (n, i) => { const sp = SPONSORS[n], k = st(n), apoya = CH.filter(c => c.sponsor === n).length;
      const acts = k === 'pending' ? `<button class="btn ghost sm" data-ra="shopst" data-rid="${n}|paused">Rechazar</button><button class="btn sm" data-ra="shopst" data-rid="${n}|active">Aprobar</button>`
        : k === 'active' ? `<button class="btn ghost sm" data-ra="shopst" data-rid="${n}|paused">Pausar</button>` : `<button class="btn sm" data-ra="shopst" data-rid="${n}|active">Reactivar</button>`;
      return `<div class="shopc" style="--c:${sp.c}" ${r(5 + Math.min(i, 8))}>
        <div class="shopc-h"><span class="pk-ic">${ic(sp.ic)}</span><div><span class="mono">${sp.cat}</span><b>${n}</b><small>${ic('pin')}${sp.where}</small></div>${pill(k)}</div>
        <div class="shopc-m"><span><b>${canjesOf(n)}</b> canjes</span><span><b>${apoya}</b> ${apoya === 1 ? 'actividad' : 'actividades'}</span><span>@${sp.ig}</span></div>
        ${perkOf(n) ? `<div class="shopc-rw">${ic('gift')}<span>${perkOf(n).what}</span><b>${perkOf(n).cost} pts</b></div>` : `<div class="shopc-rw none">${ic('gift')}<span>Solo apoya actividades · sin beneficio canjeable</span></div>`}
        <div class="prop-act">${acts}</div>
      </div>`; };
    const names = shopNames(), sug = S.suggested;
    return `${head('Administración', 'Comercios')}
      ${trio([[names.filter(n => st(n) === 'active').length, 'activos'], [names.filter(n => st(n) === 'pending').length, 'pendientes'], [names.reduce((a, n) => a + canjesOf(n), 0), 'canjes este mes']], 3)}
      <div class="sec pad" ${r(4)}><button class="propose" data-joinbiz>${ic('plus')}<span><b>Invitar a un comercio</b><small>Se suma a Solicitudes. Hasta que lo aprobás, no aparece para los estudiantes.</small></span></button></div>
      ${sug.length ? `<div class="sec"><div class="sec-h pad"><h2>Solicitudes</h2><span class="mono" style="color:var(--ink-3)">${sug.length}</span></div><div class="sec pad shop-list">${sug.map(g => `<div class="shopc sug"><div class="shopc-h" style="grid-template-columns:1fr auto"><div><span class="mono">${g.by}</span><b>${g.name}</b><small>${ic('pin')}${g.where || 'Sin dirección'}</small></div>${g.status === 'new' ? '<span class="stp wait">Nueva</span>' : '<span class="stp ok">Contactado</span>'}</div><div class="prop-act"><button class="btn ghost sm" data-ra="sugdel" data-rid="${g.id}">Descartar</button>${g.status === 'new' ? `<button class="btn sm" data-ra="sugok" data-rid="${g.id}">Enviar alta</button>` : ''}</div></div>`).join('')}</div></div>` : ''}
      <div class="sec"><div class="sec-h pad"><h2>Aliados</h2><span class="mono" style="color:var(--ink-3)">${names.length}</span></div><div class="sec pad shop-list">${names.map(card).join('')}</div></div>`;
  },

/* ========================= COMERCIO ========================= */
  s_home() {
    const sp = SPONSORS[SHOP], mine = CH.filter(c => c.sponsor === SHOP), reached = mine.reduce((a, c) => a + goingOf(c), 0);
    const m = shopMetrics(), sinVal = pendingCode() ? 1 : 0;
    const places = [...mine.map(c => [c.title, goingOf(c) * 6 + 40]), ['Sección Beneficios', 420 + m.canjes * 3]].sort((a, b) => b[1] - a[1]);
    const mx = places[0][1];
    return `${head('Panel del comercio', 'Tu publicidad')}
      <div class="sec pad" ${r(3)}><div class="me-card admin"><span class="photo">${ic(sp.ic)}</span><span><b>${SHOP}</b><small>Comercio aliado · @${sp.ig}</small></span>${pill(S.shopStatus[SHOP] || 'active')}</div></div>
      ${(S.shopStatus[SHOP] || 'active') !== 'active' ? `<div class="sec pad"><div class="prop-sp">${ic('bell')}<span><b>Tu comercio está pausado.</b> No aparece en Beneficios ni como sponsor hasta que Bienestar lo reactive.</span></div></div>` : ''}
      <div class="sec pad dash-range" ${r(4)}><span class="mono">Últimos 7 días</span><span class="mono">vs. semana anterior</span></div>
      <div class="sec pad kx-grid" ${r(4)}>
        ${kpiX('Vistas de tu local', m.views, m.prev.views, m.d.views)}
        ${kpiX('Canjes de tu beneficio', m.canjes, m.prev.canjes, m.d.canjes, sinVal ? '1 sin validar' : S.validated.length + ' validados hoy')}
        ${kpiX('Toques en «Cómo llegar»', m.maps, m.prev.maps, m.d.maps)}
        ${kpiX('Visitas a tu Instagram', m.ig, m.prev.ig, m.d.ig)}
      </div>
      <div class="sec pad" ${r(5)}><div class="dcard"><div class="dcard-h"><div><span class="mono">Vistas por día</span><b>${fmt(m.views)}</b></div><small>Estudiantes que vieron tu comercio en la app</small></div>${areaChart(m.d.views, m.days, 'vistas')}</div></div>
      <div class="sec pad" ${r(6)}><div class="dcard"><div class="dcard-h"><div><span class="mono">De la vista al canje</span><b>${(m.canjes / m.views * 100).toLocaleString('es-AR', { maximumFractionDigits: 1 })}%</b></div><small>de quienes te vieron canjearon tu beneficio</small></div>
        ${funnel([['Vieron tu comercio', m.views], ['Abrieron tu ficha', m.fichas], ['Cómo llegar o Instagram', m.maps + m.ig], ['Canjearon', m.canjes]])}</div></div>
      <div class="sec pad" ${r(7)}><div class="dcard"><div class="dcard-h"><div><span class="mono">Cuándo te ven</span><b>${m.bestSlot}</b></div><small>Franja con más vistas. Ideal para tus promos.</small></div>${heatmap(m)}</div></div>
      <div class="sec pad" ${r(8)}><div class="dcard"><div class="dcard-h"><div><span class="mono">Dónde aparece tu local</span><b>${places.length} lugares</b></div><small>Vistas en cada parte de la app</small></div>
        <div class="hb">${places.map(([n, v]) => `<div class="hb-row" data-tip="${esc(n)} · ${fmt(v)} vistas"><span>${n}</span><i><em style="width:${Math.round(v / mx * 100)}%"></em></i><b>${fmt(v)}</b></div>`).join('')}</div></div></div>
      <div class="sec pad" ${r(9)}><div class="kpis"><div class="kpi2 wide"><b>${fmt(reached)}</b><span>estudiantes alcanzados con tus ${mine.length} actividades</span><small>Cada actividad que apoyás muestra tu comercio con dirección, horario y redes.</small></div></div></div>
      <div class="sec pad" ${r(12)}><div class="privacy">${ic('check')}<p><b>Datos agregados.</b> Ves cuántos estudiantes te ven y te visitan, nunca quiénes son.</p></div></div>`;
  },

  s_acts() {
    const tab = S.shTab === 'props' ? 'props' : 'mine';
    const mine = CH.filter(c => c.sponsor === SHOP).sort((a, b) => a.day - b.day);
    const free = CH.filter(c => !c.sponsor).sort((a, b) => a.day - b.day);
    const offered = id => S.proposals.some(p => p.kind === 'support' && p.target === id && p.by === SHOP && p.status === 'pending');
    const my = S.proposals.filter(p => p.by === SHOP);
    const body = tab === 'mine'
      ? `<div class="sec pad" ${r(4)}><button class="propose" data-ra="newprop">${ic('plus')}<span><b>Proponer una actividad</b><small>Tu idea pasa por Bienestar y, si suma, se publica con tu comercio como sponsor.</small></span></button></div>
         <div class="sec"><div class="sec-h pad" ${r(5)}><h2>Las que apoyás</h2><span class="mono" style="color:var(--ink-3)">${mine.length}</span></div><div class="ag-list pad">${mine.map((c, i) => actRow(c, i, false)).join('')}</div></div>
         <div class="sec"><div class="sec-h pad" ${r(6)}><h2>Buscan sponsor</h2><span class="mono" style="color:var(--ink-3)">${free.length}</span></div>
           <div class="ag-list pad">${free.length ? free.map(c => `<div class="ofr" style="--c:${TYPES[c.type].c}"><button class="ag-body" data-go="detail" data-p="${c.id}"><span class="mono">${TYPES[c.type].label} · ${dayLbl(c.day)} ${c.time}</span><b>${c.title}</b><small>${ic('people')}${c.going} de ${c.cap} inscriptos</small></button>${offered(c.id) ? '<span class="stp wait">Ofrecido</span>' : `<button class="chip sm" data-ra="offer" data-rid="${c.id}">Sumarme</button>`}</div>`).join('') : '<div class="ag-empty"><p>Todas las actividades ya tienen sponsor.</p></div>'}</div></div>`
      : `<div class="sec pad" ${r(4)}><button class="propose" data-ra="newprop">${ic('plus')}<span><b>Proponer una actividad</b><small>Con día, lugar y qué aportás.</small></span></button></div>
         <div class="sec pad prop-list">${my.length ? my.map(p => `<div class="prop" ${r(5)}><div class="prop-h"><span class="frm shop">${ic('shop')}${p.kind === 'support' ? 'Apoyo' : 'Propuesta'}</span>${pill(p.status === 'pending' ? 'pending' : p.status)}</div><b>${p.title}</b>${p.kind === 'support' ? '' : `<small>${TYPES[p.type].label} · ${dayLbl(p.day)} ${p.time} · ${p.place}</small>`}${p.sponsorTxt ? `<div class="prop-sp">${ic('gift')}<span><b>Aportás:</b> ${p.sponsorTxt}</span></div>` : ''}</div>`).join('') : '<div class="ag-empty"><p>Todavía no enviaste propuestas.</p></div>'}</div>`;
    return `${head('Panel del comercio', 'Actividades')}${segs([['mine', 'Tus actividades'], ['props', `Propuestas${my.length ? ' · ' + my.length : ''}`]], tab, 'shtab')}${body}`;
  },

  s_redeem() {
    const sp = SPONSORS[SHOP], perk = shopPerk();
    const pending = pendingCode();
    const recent = [...S.validated.map(c => ['Estudiante · código ••' + c.slice(2), 'hoy']), ['Estudiante de Ingeniería', 'hace 2 h'], ['Estudiante de Económicas', 'ayer'], ['Estudiante de Humanidades', 'ayer']].slice(0, 5);
    return `${head('Panel del comercio', 'Canjear')}
      <div class="sec pad" ${r(3)}><div class="shop-val">
        <div class="mono">Validar un canje</div>
        <p>Pedile al estudiante el código de 4 dígitos que le muestra la app y cargalo acá. Vence a los 10 minutos.</p>
        <div class="sv-row"><input id="sh-code" inputmode="numeric" maxlength="4" placeholder="0000" autocomplete="off"><button class="btn" data-ra="validate">Validar</button></div>
        <small class="mono sv-hint">${pending ? 'Demo · hay un canje pendiente: ' + pending : 'Demo · canjeá el beneficio del vivero en vista Estudiante y validá su código acá.'}</small>
      </div></div>
      <div class="sec pad" ${r(4)}>
        <div class="pk-reward" style="--c:${perk.c}"><span class="pk-gift">${ic('gift')}</span><div><span class="mono">Recompensa que ofrecés</span><b>${perk.what}</b></div><span class="pk-cost">${perk.cost}<small>pts</small></span></div>
        <button class="link rw-edit" data-ra="editreward">Cambiar recompensa o puntos</button>
      </div>
      <div class="sec"><div class="sec-h pad" ${r(5)}><h2>Últimos canjes</h2><span class="mono" style="color:var(--ink-3)">${recent.length}</span></div>
        <div class="sh-list pad">${recent.map(([n, t]) => `<div class="sh-it"><span class="pk-gift">${ic('check')}</span><span><b>${n}</b><small>${perk.what}</small></span><em class="mono">${t}</em></div>`).join('')}</div></div>
      <div class="sec pad" ${r(12)}><div class="privacy">${ic('check')}<p><b>Sin datos personales.</b> Solo ves el código y qué beneficio entregás. La app descuenta los puntos al estudiante.</p></div></div>`;
  },
});

/* detalle de una actividad visto por el comercio */
function shopCta(c) {
  if (c.sponsor === SHOP) return `<button class="btn ghost" disabled>${ic('check')} Tu comercio apoya esta actividad</button>`;
  if (c.sponsor) return `<button class="btn ghost" disabled>Ya tiene sponsor: ${c.sponsor}</button>`;
  if (S.proposals.some(p => p.kind === 'support' && p.target === c.id && p.by === SHOP && p.status === 'pending')) return `<button class="btn ghost" disabled>${ic('check')} Ofrecimiento enviado a Bienestar</button>`;
  return `<button class="btn" data-ra="offer" data-rid="${c.id}">Ofrecer apoyo como sponsor <span class="arrow">${ic('arrow')}</span></button>`;
}

/* ---------- proponer una actividad (estudiante o comercio) ---------- */
function proposalSheet(kind) {
  const shop = kind === 'shop';
  actType = 'desc';
  const types = Object.entries(TYPES).map(([k, v]) => `<button type="button" class="chip${k === actType ? ' on' : ''}" data-ptype="${k}">${ic(k)}${v.label}</button>`).join('');
  const days = WEEK.filter(w => w.n >= TODAY + 1).map(w => `<option value="${w.n}">${dowFor(w.n)} ${dm(w.n)}</option>`).join('');
  openSheet(`
    <h2>${shop ? 'Proponer una actividad' : 'Proponé un desafío'}</h2>
    <p class="sub">${shop ? 'Bienestar la revisa y, si suma, se publica con tu comercio como sponsor.' : 'Bienestar lo revisa y, si suma, se publica para todos.'}</p>
    <div class="form">
      <label><span class="mono">Título *</span><input id="pp-title" maxlength="80" placeholder="${shop ? 'Ej: Taller de plantines' : 'Ej: Ronda de lectura al sol'}"></label>
      <div class="q"><div class="mono">Tipo</div><div class="chips">${types}</div></div>
      <div class="two"><label><span class="mono">Día</span><select id="pp-day">${days}</select></label><label><span class="mono">Hora</span><input id="pp-time" type="time" value="13:00"></label></div>
      <label><span class="mono">Lugar *</span><input id="pp-place" maxlength="90" placeholder="Ej: Patio del Dto. de Humanidades"></label>
      <label><span class="mono">De qué se trata</span><textarea id="pp-text" rows="3" placeholder="Qué se hace y qué se logra…"></textarea></label>
      ${shop ? `<label><span class="mono">Qué aportás vos</span><input id="pp-sp" maxlength="110" placeholder="Ej: Dono los plantines y las herramientas"></label>` : ''}
    </div>
    <div style="height:18px"></div>
    <button class="btn" data-ra="sendprop" data-rid="${kind}">Enviar propuesta</button>`);
}

function shopSheet(kind) {
  const admin = kind === 'admin';
  openSheet(`<h2>${admin ? 'Invitar a un comercio' : 'Sugerí un comercio'}</h2>
    <p class="sub">${admin ? 'Queda en Solicitudes hasta que le enviés el alta.' : 'Contanos qué local te gustaría ver en Beneficios. Bienestar lo contacta.'}</p>
    <div class="form"><label><span class="mono">Nombre del comercio *</span><input id="sg-name" maxlength="50" placeholder="Ej: Kiosco Don Pepe"></label>
    <label><span class="mono">Dirección</span><input id="sg-where" maxlength="80" placeholder="Ej: Rosas 3050, San Justo"></label></div>
    <div style="height:18px"></div><button class="btn" data-ra="sendshop" data-rid="${kind}">${admin ? 'Agregar a Solicitudes' : 'Enviar sugerencia'}</button>`);
}

const suspBanner = () => suspended() ? `<div class="sec pad"><div class="prop-sp">${ic('bell')}<span><b>Tu cuenta está suspendida.</b> Podés ver la app, pero no sumarte, sellar ni canjear. Escribile a Bienestar Estudiantil.</span></div></div>` : '';
const myProps = () => {
  const mine = S.proposals.filter(p => p.uid === 'me');
  if (!mine.length) return '';
  return `<div class="sec"><div class="sec-h pad"><h2>Tus propuestas</h2><span class="mono" style="color:var(--ink-3)">${mine.length}</span></div><div class="sec pad prop-list">${mine.map(p => `<div class="prop"><div class="prop-h"><b>${p.title}</b>${pill(p.status)}</div><small>${p.status === 'approved' ? 'Ya está publicada en Desafíos' : p.status === 'rejected' ? 'Bienestar no la pudo sumar esta vez' : 'Bienestar la está revisando'}</small></div>`).join('')}</div></div>`;
};
['home', 'perks'].forEach(k => { const f = VIEWS[k]; VIEWS[k] = p => suspBanner() + f(p); });
{ const f = VIEWS.list; VIEWS.list = p => suspBanner() + f(p) + myProps(); }

/* ---------- acciones ---------- */
function publishFromProposal(p) {
  if (p.kind === 'support') {
    const c = byId(p.target); if (!c) return;
    const a = { ...c, created: true, sponsor: p.by, sponsorTxt: p.sponsorTxt || 'Apoya esta actividad.' };
    CH[CH.indexOf(c)] = a; S.created = S.created.filter(x => x.id !== a.id).concat(a); return;
  }
  const a = { id: 'a' + Date.now().toString(36) + p.id, created: true, type: p.type, day: p.day, dow: dowFor(p.day), time: p.time, mins: 30, pts: 30, long: false,
    title: p.title, place: p.place, org: p.from === 'shop' ? p.by : 'Propuesta de estudiantes', going: 0, cap: 20,
    text: p.text || 'Actividad propuesta por la comunidad. Llegás, te sumás y te vas con algo hecho.', bring: ['Ganas de participar'],
    yieldN: '20', yieldT: 'lugares para estudiantes de toda la facu.',
    sponsor: p.from === 'shop' ? p.by : undefined, sponsorTxt: p.from === 'shop' ? (p.sponsorTxt || undefined) : undefined };
  CH.push(a); S.created.push(a);
}

document.addEventListener('click', e => {
  const t = e.target.closest('[data-track]');
  if (t && S.role === 'student') { const k = t.dataset.track; S.track[k] = (S.track[k] || 0) + 1; save(); }
  const el = e.target.closest('[data-ra]'); if (!el) return;
  const act = el.dataset.ra, id = el.dataset.rid;
  const val = k => (document.getElementById(k)?.value || '').trim();
  switch (act) {
    case 'admtab': S.admTab = id; save(); return go('a_acts', null, { still: true });
    case 'shtab': S.shTab = id; save(); return go('s_acts', null, { still: true });
    case 'gopend': S.admTab = 'pend'; save(); return go('a_acts');
    case 'approve': { const p = S.proposals.find(x => x.id === id); if (!p) return;
      if (p.kind === 'support' && byId(p.target)?.sponsor) { p.status = 'rejected'; save(); refresh(); return toast(`${ic('bell')} Esa actividad ya tiene sponsor`); }
      publishFromProposal(p); p.status = 'approved'; save(); refresh(); return toast(`${ic('bell')} Publicada · se notificó a los estudiantes`); }
    case 'reject': { const p = S.proposals.find(x => x.id === id); if (!p) return; p.status = 'rejected'; save(); refresh(); return toast(`${ic('check')} Propuesta rechazada · se avisó a quien la envió`); }
    case 'usr': { const on = S.userState[id] === 'suspended'; if (on) delete S.userState[id]; else S.userState[id] = 'suspended'; save(); refresh(); return toast(on ? `${ic('check')} Usuario reactivado` : `${ic('bell')} Usuario suspendido`); }
    case 'shopst': { const [n, st] = id.split('|'); if (st === 'active') delete S.shopStatus[n]; else S.shopStatus[n] = st; save(); refresh(); return toast(st === 'active' ? `${ic('check')} ${n} ya aparece para los estudiantes` : `${ic('bell')} ${n} dejó de aparecer`); }
    case 'newprop': return proposalSheet('shop');
    case 'sugok': { const g = S.suggested.find(x => x.id === id); if (g) g.status = 'contacted'; save(); refresh(); return toast(`${ic('check')} Enviamos el alta a ${g?.name}`); }
    case 'sugdel': S.suggested = S.suggested.filter(x => x.id !== id); save(); refresh(); return toast(`${ic('check')} Solicitud descartada`);
    case 'sendshop': {
      const name = val('sg-name'), where = val('sg-where');
      if (!name) { document.getElementById('sg-name').classList.add('err'); return toast(`${ic('pin')} Escribí el nombre del comercio`); }
      S.suggested.unshift({ id: 'g' + Date.now().toString(36), name: esc(name), where: esc(where), by: id === 'admin' ? 'Bienestar (invitación)' : `${esc(S.name)} · ${esc(S.carrera)}`, status: 'new' });
      save(); closeSheet(); if (current.name === 'a_shops') refresh();
      return toast(id === 'admin' ? `${ic('check')} Comercio agregado a Solicitudes` : `${ic('check')} ¡Gracias! Se lo pasamos a Bienestar`);
    }
    case 'offer': {
      const c = byId(id); if (!c) return;
      S.proposals.push({ id: 'p' + Date.now().toString(36), from: 'shop', by: SHOP, kind: 'support', target: id, title: 'Quiere apoyar: ' + c.title, sponsorTxt: 'Dona insumos y asesoramiento para la actividad.', status: 'pending' });
      save(); refresh(); return toast(`${ic('check')} Ofrecimiento enviado a Bienestar`);
    }
    case 'sendprop': {
      const title = val('pp-title'), place = val('pp-place');
      document.querySelectorAll('#pp-title,#pp-place').forEach(x => x.classList.remove('err'));
      if (!title || !place) { [['pp-title', title], ['pp-place', place]].filter(([, v]) => !v).forEach(([k]) => document.getElementById(k).classList.add('err')); return toast(`${ic('pin')} Completá título y lugar`); }
      const shop = id === 'shop';
      S.proposals.unshift({ id: 'p' + Date.now().toString(36), uid: shop ? undefined : 'me', from: shop ? 'shop' : 'student', by: shop ? SHOP : `${esc(S.name)} · ${esc(S.carrera)}`, title: esc(title), type: actType,
        day: +val('pp-day') || TODAY + 1, time: val('pp-time') || '13:00', place: esc(place), text: esc(val('pp-text')), sponsorTxt: shop ? esc(val('pp-sp')) || undefined : undefined, status: 'pending' });
      save(); closeSheet();
      if (shop) { S.shTab = 'props'; save(); go('s_acts', null, { still: current.name === 's_acts' }); }
      else if (current.name === 'list') refresh();
      return toast(`${ic('check')} Propuesta enviada a Bienestar`);
    }
    case 'validate': {
      const v = val('sh-code').replace(/\D/g, ''), perk = shopPerk(), real = S.codes[perk.id];
      if (v.length !== 4) return toast(`${ic('bell')} Ingresá los 4 dígitos del código`);
      if (S.validated.includes(v)) return toast(`${ic('bell')} Ese código ya fue usado`);
      if (v !== real) return toast(`${ic('bell')} Código no válido o vencido`);
      S.validated.push(v); save(); refresh(); return toast(`${ic('check')} Código válido · entregá: ${perk.what}`);
    }
    case 'editreward': {
      const p = shopPerk();
      return openSheet(`<h2>Tu recompensa</h2><p class="sub">Es lo que ven los estudiantes en Beneficios. Los cambios se publican al instante.</p>
        <div class="form"><label><span class="mono">Qué entregás</span><input id="rw-what" maxlength="60" value="${esc(p.what)}"></label>
        <label><span class="mono">Puntos que cuesta</span><input id="rw-cost" type="number" min="20" step="10" value="${p.cost}"></label></div>
        <div style="height:18px"></div><button class="btn" data-ra="savereward">Guardar</button>`);
    }
    case 'savereward': {
      const p = shopPerk(), what = val('rw-what'), cost = Math.max(20, +val('rw-cost') || p.cost);
      if (!what) return toast(`${ic('pin')} Escribí qué entregás`);
      S.perkOver[p.id] = { what: esc(what), cost }; applyPerkOver(); save(); closeSheet(); refresh();
      return toast(`${ic('check')} Recompensa actualizada`);
    }
  }
});

/* ---------- arranque según el rol guardado ---------- */
renderTabbar();
go(!S.role || S.role === 'student' ? (S.onboarded ? 'home' : 'welcome') : ROLE_HOME[S.role]);

/* ---------- las dos pantallas de la demo se hablan entre sí ---------- */
/* lo que hace uno (inscribirse, aprobar una propuesta, canjear) lo ve el otro al instante */
let syncT;
addEventListener('storage', e => {
  if (e.key !== 'desafio-bienestar') return;
  if (e.newValue === null) return location.reload();
  /* los datos se toman al instante (así ninguna pantalla guarda una copia vieja encima de un cambio de la otra);
     lo que es de cada pantalla (rol, pestaña, búsqueda, paso del registro) no se pisa */
  const mine = { role: S.role, step: S.step, q: S.q, filter: S.filter, agDay: S.agDay, admTab: S.admTab, shTab: S.shTab, impTab: S.impTab };
  try { S = { ...DEFAULT, ...JSON.parse(e.newValue), ...mine }; } catch { return; }
  applyCreated(); applyPerkOver(); applyUni();
  /* se vuelve a dibujar la pantalla de abajo (las hojas abiertas quedan como están);
     la pausa no, porque tiene un temporizador corriendo */
  cancelAnimationFrame(syncT);
  syncT = requestAnimationFrame(() => { if (current.name && current.name !== 'pause') refresh(); });
});
/* el marco de la PC cambia entre Administrador y Comercio sin recargar */
addEventListener('message', e => {
  if (e.source !== window.parent) return;   /* solo la página de la demo (sirve también abriendo el archivo directo) */
  const m = e.data || {};
  if (m.type === 'setrole' && ROLE_HOME[m.role]) { document.body.dataset.role = m.role; setRole(m.role, true); go(ROLE_HOME[m.role]); }
});
/* la barra de la demo elige la universidad */
addEventListener('message', e => {
  if (e.source !== window.parent) return;   /* solo la página de la demo (sirve también abriendo el archivo directo) */
  const m = e.data || {};
  if (m.type !== 'setuni' || !UNIS[m.uni]) return;
  S.uni = m.uni; if (!U().deps.includes(S.carrera)) S.carrera = U().deps[0];
  save(); applyUni(); if (current.name && current.name !== 'pause') refresh();
});
