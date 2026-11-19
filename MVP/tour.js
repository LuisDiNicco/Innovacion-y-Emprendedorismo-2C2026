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
    { k: 'Inicio', slide: 0, ms: 9000,
      t: 'Desafío Bienestar, una app para estudiantes universitarios',
      p: 'Arranca en la UNLaM: pausas cortas entre clases y jornadas colectivas con gente de toda la facu.',
      run: async ok => { fresh(); S.onboarded = false; S.step = -1; go('welcome');
        await sleep(4300); if (!ok()) return; S.step = 0; go('welcome'); } },

    { k: 'Registro', slide: 4, ms: 6000,
      t: 'Entrás con tu mail de la UNLaM',
      p: 'Con tu departamento y tu turno te arma una ronda: gente de tus horarios y de otras carreras.',
      run: async ok => { fresh(); S.onboarded = false; S.step = 1; go('welcome');
        await sleep(1800); if (!ok()) return; S.turno = 'Tarde'; S.carrera = 'Ingeniería'; refresh(); } },

    { k: 'Tu día', slide: 1, ms: 6500,
      t: 'Tu cursada, con los huecos ya pensados',
      p: 'La app conoce tu horario y te propone qué hacer entre clase y clase. Poco tiempo, mucho impacto.',
      run: async ok => { fresh(); S.onboarded = true; S.mood = null; S.filter = 'all'; go('home');
        await sleep(1600); if (!ok()) return; scrollToSel('.myday', 90); } },

    { k: 'Ánimo', slide: 3, ms: 7500,
      t: 'Check-in de energía en 2 segundos',
      p: 'Según cómo llegás te sugiere qué hacer. Si la semana pesa, te acerca el espacio de escucha de Bienestar.',
      run: async ok => { fresh(); S.onboarded = true; S.mood = null; go('home');
        await sleep(900); if (!ok()) return; scrollToSel('.mood-ask', 90);
        await sleep(1900); if (!ok()) return; S.mood = 2; save(); refresh(); scrollToSel('.mood-reply', 90); } },

    { k: 'Desafío', slide: 2, ms: 8000,
      t: 'Cada desafío: cuándo, dónde y con quién',
      p: 'Jornadas largas o pausas cortas. Ves quién organiza, cuántos van y podés sumar a tu ronda o invitar a alguien.',
      run: async ok => { fresh(); S.onboarded = true; go('detail', 'fore');
        await sleep(2600); if (!ok()) return; scrollToSel('.buddy');
        await sleep(2600); if (!ok()) return; scrollToSel('.triple'); } },

    { k: 'Sellar', slide: 6, ms: 11000,
      t: 'Sellás tu asistencia en el lugar',
      p: 'Mantenés apretado el sello: suma puntos, registra cómo te vas y si conociste a alguien.',
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

    { k: 'Comunidad', slide: 2, ms: 8500,
      t: 'Nadie debería cursar solo',
      p: 'Tu ronda, una dupla con tu mismo hueco libre, postales de otros estudiantes y círculos por interés.',
      run: async ok => { fresh(); go('community');
        await sleep(2600); if (!ok()) return; scrollToSel('.peers', 110);
        await sleep(2600); if (!ok()) return; scrollToSel('.postales', 110); } },

    { k: 'Impacto', slide: 7, ms: 10000,
      t: 'Triple impacto, medido',
      p: 'Social: los vínculos que generaste. Ambiental: tu jardín crece con cada desafío. Económico: los aliados que lo hacen posible.',
      run: async ok => { fresh();
        S.impTab = 'social'; go('impact');
        await sleep(3300); if (!ok()) return; S.impTab = 'ambiental'; go('impact');
        await sleep(3500); if (!ok()) return; S.impTab = 'economico'; go('impact'); } },

    { k: 'Institución', slide: 4, ms: 7500,
      t: 'La universidad, que es quien paga, mide todo',
      p: 'Instalaciones, participación mensual y tasa de actividades realizadas. Además, energía antes y después y aportes de aliados.',
      run: async ok => { fresh(); go('admin');
        await sleep(2800); if (!ok()) return; scrollToSel('.wbars', 120); } },

    { k: 'Ingresos', slide: 5, ms: 9000,
      t: 'Cómo genera ingresos',
      p: 'Licencia anual por estudiante activo, insumos del Municipio, desafíos patrocinados y programas con obras sociales.',
      run: async ok => { fresh(); S.calcN = 5000; go('business');
        await sleep(2400); if (!ok()) return; scrollToSel('.calc', 80);
        await sleep(1400);
        const r = document.getElementById('calcR');
        for (let n = 5000; n <= 15000 && r; n += 500) { if (!ok()) return; r.value = n; r.dispatchEvent(new Event('input', { bubbles: true })); await sleep(90); } } },

    { k: 'Pausa', slide: 8, ms: 6500,
      t: 'Y si estás saturado: 10 minutos sin pantalla',
      p: 'Una pausa guiada para respirar y volver. La app no reemplaza a un profesional: te acerca a otros.',
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
  document.addEventListener('keydown', e => { if (e.key === ' ' && !e.target.closest('input,textarea,button')) { e.preventDefault(); playing ? stop() : play(); } });

  intro();
  if (typeof fitPhone === "function") { fitPhone(); document.fonts && document.fonts.ready.then(fitPhone); }
})();
