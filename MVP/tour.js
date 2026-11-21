/* =========================================================
   Recorrido guiado: muestra la app sola, paso a paso,
   para alguien que nunca la tocó. Usa las funciones de app.js.
   ========================================================= */
(() => {
  const V = () => document.getElementById('view');
  const sleep = ms => new Promise(r => setTimeout(r, ms));

  /* scroll suave dentro de la pantalla del celu */
  const scrollToSel = (sel, offset = 70) => {
    const v = V(), el = v.querySelector(sel);
    if (!el) return;
    const s = window.__ps || 1;
    const top = v.scrollTop + (el.getBoundingClientRect().top - v.getBoundingClientRect().top) / s - offset;
    v.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };
  const fresh = () => { closeSheet(); trail.length = 0; };

  const STEPS = [
    { k: 'Bienvenida', slide: 0, ms: 7000,
      t: 'Desafío Bienestar, una app para estudiantes universitarios',
      p: 'Arranca en la UNLaM como piloto: actividades cortas y jornadas colectivas para desconectarte, conocer gente y cuidar tu campus.',
      run: async ok => { fresh(); S.onboarded = false; S.step = -1; go('welcome'); } },

    { k: 'Inicio', slide: 1, ms: 8000,
      t: 'Tu semana de un vistazo',
      p: 'El desafío de la semana, tus puntos, tu progreso y un mapa del campus con lo que pasa cerca tuyo.',
      run: async ok => { fresh(); S.onboarded = true; S.filter = 'all'; go('home');
        await sleep(2600); if (!ok()) return; scrollToSel('.duo', 90);
        await sleep(2200); if (!ok()) return; scrollToSel('.nearby', 90); } },

    { k: 'Desafío', slide: 1, ms: 8000,
      t: 'Cada desafío: cuándo, dónde y con quién',
      p: 'Jornadas largas o actividades cortas. Ves quién organiza, cuántos participan y podés ir con tu ronda o invitar a alguien.',
      run: async ok => { fresh(); S.onboarded = true; go('detail', 'fore');
        await sleep(2600); if (!ok()) return; scrollToSel('.going');
        await sleep(2600); if (!ok()) return; scrollToSel('.triple'); } },

    { k: 'Sellar', slide: 1, ms: 11000,
      t: 'Sellás tu asistencia en el lugar',
      p: 'Mantenés apretado el sello: suma puntos y registra si conociste a alguien nuevo.',
      run: async ok => {
        fresh(); S.onboarded = true;
        S.done = S.done.filter(x => x !== 'desc'); if (!S.joined.includes('desc')) S.joined.push('desc'); save();
        go('detail', 'desc');
        await sleep(1300); if (!ok()) return; sealSheet('desc');
        await sleep(1800); if (!ok()) return;
        const hold = document.getElementById('hold');
        if (hold) { hold.classList.add('pressing'); for (let p = 0; p <= 1.001; p += 0.05) { hold.style.setProperty('--p', p); await sleep(45); if (!ok()) return; } }
        sealed('desc');
        await sleep(3000); if (!ok()) return;
        afterState.mood = 4; afterState.met = '3'; afterSheet('desc');
        await sleep(2000); if (!ok()) return;
        const done = document.querySelector('[data-afterdone]'); if (done) done.click();
      } },

    { k: 'Agenda', slide: 1, ms: 7000,
      t: 'Tu agenda: a qué te anotaste y qué ya hiciste',
      p: 'La semana con tus actividades marcadas, un recordatorio para cada una y el historial de lo que fuiste sellando.',
      run: async ok => { fresh(); S.agDay = null; go('agenda');
        await sleep(3000); if (!ok()) return; scrollToSel('.ag-done', 110); } },

    { k: 'Beneficios', slide: 2, ms: 8000,
      t: 'Los puntos se canjean en comercios de la zona',
      p: 'Viveros, cafeterías, librerías, gimnasios. Un código de 4 dígitos, un canje por comercio cada 15 días.',
      run: async ok => { fresh(); S.onboarded = true; go('perks');
        await sleep(2600); if (!ok()) return;
        if (!S.codes.cafe) { S.points = Math.max(S.points, 200); S.points -= 80; S.perks.push('cafe'); S.codes.cafe = '4827'; save(); refresh(); }
        await sleep(400); if (!ok()) return; redeemSheet('cafe'); } },

    { k: 'Comunidad', slide: 3, ms: 8000,
      t: 'Nadie debería cursar solo',
      p: 'Tu ronda, una dupla con horarios en común, postales de otros estudiantes y círculos por interés.',
      run: async ok => { fresh(); go('community');
        await sleep(2600); if (!ok()) return; scrollToSel('.peers', 110);
        await sleep(2600); if (!ok()) return; scrollToSel('.postales', 110); } },

    { k: 'Perfil', slide: 3, ms: 9500,
      t: 'Tu nivel, tus puntos y tus sellos, en un solo lugar',
      p: 'Cada sello suma puntos. Los puntos te suben de nivel (Semilla, Raíz, Plantín, Árbol) y cada nivel desbloquea más beneficios.',
      run: async ok => { fresh(); S.impTab = 'yo'; go('impact');
        await sleep(2400); if (!ok()) return; levelsSheet();
        await sleep(4200); if (!ok()) return; closeSheet(); scrollToSel('.hub', 90); } },

    { k: 'Mi facu', slide: 2, ms: 7500,
      t: 'Cómo viene participando toda la facu',
      p: 'Participación semanal, meta colectiva y actividades por carrera. Datos agregados y anónimos, los mismos que ve Bienestar Estudiantil.',
      run: async ok => { fresh(); S.impTab = 'inst'; go('impact');
        await sleep(2800); if (!ok()) return; scrollToSel('.goal', 120); } },

    { k: 'Pausa', slide: 4, ms: 7000,
      t: 'Y cuando querés frenar: una pausa sin pantalla',
      p: 'Un círculo que acompaña tu respiración, de 3 a 10 minutos. No reemplaza a un profesional: si lo necesitás, la app te acerca a Bienestar.',
      run: async ok => { fresh(); go('pause'); } },
  ];

  /* ---------- UI ---------- */
  const box = document.getElementById('tour');
  const $t = id => document.getElementById(id);
  const dots = $t('tourDots');
  STEPS.forEach((s, i) => {
    const b = document.createElement('button');
    b.title = `${i + 1}. ${s.k}`; b.setAttribute('aria-label', `Paso ${i + 1}: ${s.k}`);
    b.innerHTML = `<span>${i + 1}</span>`;
    b.onclick = () => { stop(); show(i); };
    dots.appendChild(b);
  });

  let i = -1, token = 0, playing = false, timer = null, barT0 = 0, barDur = 0, raf;

  function paint() {
    [...dots.children].forEach((d, j) => { d.classList.toggle('on', j === i); d.classList.toggle('seen', j < i); });
    $t('tourPlay').innerHTML = playing ? '❚❚ Pausar' : (i < 0 ? '▶ Ver recorrido' : '▶ Seguir');
    box.classList.toggle('playing', playing);
  }
  function bar() {
    const p = playing && barDur ? Math.min(1, (performance.now() - barT0) / barDur) : (i >= 0 && !playing ? 0 : 0);
    $t('tourBar').style.transform = `scaleX(${p})`;
    if (playing) raf = requestAnimationFrame(bar);
  }
  async function show(k) {
    i = Math.max(0, Math.min(STEPS.length - 1, k));
    const s = STEPS[i], my = ++token;
    $t('tourN').textContent = `Recorrido · ${String(i + 1).padStart(2, '0')} / ${STEPS.length} · ${s.k}`;
    $t('tourT').textContent = s.t;
    $t('tourP').textContent = s.p;
    box.classList.remove('swap'); void box.offsetWidth; box.classList.add('swap');
    if (window.deckShow) window.deckShow(s.slide);
    paint();
    clearTimeout(timer);
    if (playing) { barT0 = performance.now(); barDur = s.ms; cancelAnimationFrame(raf); bar(); timer = setTimeout(next, s.ms); }
    try { await s.run(() => my === token); } catch (e) { console.warn(e); }
  }
  function next() {
    if (i >= STEPS.length - 1) { stop(); i = -1; token++; closeSheet(); trail.length = 0; S.onboarded = true; go('home'); intro(); return; }
    show(i + 1);
  }
  function play() { playing = true; if (i < 0) show(0); else show(i); }
  function stop() { playing = false; clearTimeout(timer); cancelAnimationFrame(raf); $t('tourBar').style.transform = 'scaleX(0)'; paint(); }
  function intro() {
    $t('tourN').textContent = 'Recorrido guiado · 1 minuto';
    $t('tourT').textContent = '¿Primera vez con Desafío Bienestar?';
    $t('tourP').textContent = 'Mirá la app funcionando sola, paso a paso. Podés pausar o saltar a cualquier paso.';
    paint();
  }

  $t('tourPlay').onclick = () => (playing ? stop() : play());
  $t('tourPrev').onclick = () => { stop(); show(i <= 0 ? 0 : i - 1); };
  $t('tourNext').onclick = () => { stop(); show(i < 0 ? 0 : i + 1); };
  /* si tocás el celu, el recorrido se pausa y la app es tuya */
  document.getElementById('screen').addEventListener('pointerdown', e => { if (playing && e.isTrusted) stop(); });
  document.getElementById('resetBtn').addEventListener('click', () => { stop(); i = -1; token++; intro(); });

  intro();
  if (typeof fitPhone === "function") { fitPhone(); document.fonts && document.fonts.ready.then(fitPhone); }
})();
