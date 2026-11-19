/* =========================================================
   DESAFÍO BIENESTAR — MVP mockeado (sin backend). Todo vive en memoria
   + localStorage para que la demo recuerde tu progreso.

   Triple impacto (Modelo Sistema B):
   · Social    → vínculos entre estudiantes, salud mental, pertenencia
   · Ambiental → forestación, huertas, reciclaje, espacios verdes
   · Económico → alianzas UNLaM (B2B) + Municipio (B2G) + empresas
   ========================================================= */

/* ---------- íconos (trazo, 24x24) ---------- */
const P = {
  fore:  'M12 21v-9m0 0c-4.2 0-6.5-2.8-6.5-7.5C9.7 4.5 12 7.3 12 12Zm0 3c3.3 0 5.5-2.2 5.5-5.8-3.3 0-5.5 2.2-5.5 5.8Z',
  huerta:'M3.5 20.5h17M12 20.5v-6.5m0 0c-3.3 0-5.3-2-5.3-5.5 3.3 0 5.3 2 5.3 5.5Zm0-2c0-3.3 2-5.5 5.3-5.5 0 3.3-2 5.5-5.3 5.5ZM6 20.5l1-2.5m10 2.5-1-2.5',
  cam:   'M8.2 3.5c1.6 0 2.6 2 2.6 4.3S9.7 12 8.2 12 5.6 10.1 5.6 7.8s1-4.3 2.6-4.3ZM7 15h2.4M15.8 8.5c1.6 0 2.6 2 2.6 4.3S17.3 17 15.8 17s-2.6-1.9-2.6-4.2 1-4.3 2.6-4.3ZM14.6 20h2.4',
  rec:   'M19.5 12a7.5 7.5 0 0 1-12.8 5.3M4.5 12a7.5 7.5 0 0 1 12.8-5.3M17.6 3v3.8h-3.8M6.4 21v-3.8h3.8',
  desc:  'M8 3h8a1.2 1.2 0 0 1 1.2 1.2v15.6A1.2 1.2 0 0 1 16 21H8a1.2 1.2 0 0 1-1.2-1.2V4.2A1.2 1.2 0 0 1 8 3ZM3.5 3.5l17 17M11 18h2',
  pin:   'M12 21s-6-5.4-6-10.5a6 6 0 0 1 12 0C18 15.6 12 21 12 21Zm0-8.2a2.3 2.3 0 1 0 0-4.6 2.3 2.3 0 0 0 0 4.6Z',
  back:  'M15 5 8 12l7 7',
  arrow: 'M5 12h14m-5-5 5 5-5 5',
  seal:  'M9 3h6v5l3 3v3H6v-3l3-3zM5 18h14M7 21h10',
  check: 'M5 12.5 10 17 19 7',
  bell:  'M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15ZM10 21h4',
  people:'M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM2.5 20c.6-3.5 3.2-5.5 6.5-5.5s5.9 2 6.5 5.5M16 4.2a3.4 3.4 0 0 1 0 6.6M18 14.8c2 .6 3.2 2.4 3.5 5.2',
  heart: 'M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z',
  hug:   'M7 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM17 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM3 21v-6a4 4 0 0 1 4-4h1.5L12 14l3.5-3H17a4 4 0 0 1 4 4v6',
  chat:  'M4 5h16v11H9l-5 4Z',
  share: 'M12 15V3m0 0L7.5 7.5M12 3l4.5 4.5M5 12v8h14v-8',
  plus:  'M12 5v14M5 12h14',
  ear:   'M7 9a5 5 0 0 1 10 0c0 3-3 4-3 7a3 3 0 0 1-5.5 1.6M10 9.5a2 2 0 0 1 4 0',
  build: 'M3 21h18M5 21V8l7-4 7 4v13M9 21v-5h6v5M9 11h.01M15 11h.01',
  coin:  'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM14.5 9.5c-.4-1-1.4-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.6 2.5 2 2.5.9 2.5 2-1 2-2.5 2c-1.2 0-2.2-.6-2.6-1.6M12 6.5V8m0 8v1.5',
  swap:  'M4 8h13l-3.5-3.5M20 16H7l3.5 3.5',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13.5V12l3 2',
  search:'M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15ZM16 16l5 5',
  gift:  'M4 10h16v10H4ZM3 7h18v3H3ZM12 7v13M12 7c-1.5-3-5-3.5-5-1.2C7 7 9.5 7 12 7Zm0 0c1.5-3 5-3.5 5-1.2C17 7 14.5 7 12 7Z',
  shop:  'M4 9 5.5 4h13L20 9M4 9v11h16V9M4 9h16M9 20v-6h6v6',
  soli:  'M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10ZM9 12h6M12 9v6',
  pares: 'M3.5 5.5c3-1.2 5.8-1 8.5 1 2.7-2 5.5-2.2 8.5-1v13c-3-1.2-5.8-1-8.5 1-2.7-2-5.5-2.2-8.5-1ZM12 6.5v13',
};
const ic = (k, cls = 'ic') => `<svg class="${cls}" viewBox="0 0 24 24"><path d="${P[k]}"/></svg>`;

/* ---------- datos mock ---------- */
const TYPES = {
  fore:   { label: 'Forestación',  c: 'var(--moss)'   },
  huerta: { label: 'Huerta',       c: 'var(--soil)'   },
  cam:    { label: 'Caminata',     c: 'var(--river)'  },
  rec:    { label: 'Reciclaje',    c: 'var(--teal)'   },
  desc:   { label: 'Desconexión',  c: 'var(--tomato)' },
  soli:   { label: 'Solidaria',    c: 'var(--clay)'   },
  pares:  { label: 'Entre pares',  c: 'var(--indigo)' },
};

const WEEK = [
  { d: 'LUN', n: 16 }, { d: 'MAR', n: 17 }, { d: 'MIÉ', n: 18 }, { d: 'JUE', n: 19 },
  { d: 'VIE', n: 20 }, { d: 'SÁB', n: 21 }, { d: 'DOM', n: 22 },
];
const TODAY = 17;

const CH = [
  { id: 'desc', type: 'desc', day: 17, dow: 'Hoy', time: '18:00', mins: 20, pts: 35, ronda: 1, featured: true,
    title: 'Mate sin pantallas antes de parciales', place: 'Pulmón verde, frente a la Biblioteca',
    org: 'Centro de Estudiantes', going: 11, cap: 20,
    text: 'Veinte minutos en ronda, celulares en una canasta en el medio. Se charla de lo que surja: la cursada, la vida, el último parcial. Nadie te obliga a hablar.',
    bring: ['Tu mate (o no, siempre hay uno girando)', 'El celu en la mochila'],
    yieldN: '20′', yieldT: 'sin pantalla, en grupo, a la luz del día.' },
  { id: 'huerta', type: 'huerta', day: 18, dow: 'Mañana', time: '13:00', mins: 15, pts: 40, ronda: 0,
    title: 'Siembra de primavera en la huerta', place: 'Huerta del Dto. de Ingeniería',
    org: 'Bienestar Estudiantil UNLaM', going: 8, cap: 12,
    text: 'Pasamos lechuga, albahaca y tomate de los almácigos a los bancales. Lo que se coseche va al comedor universitario. Llegás, te damos guantes, te vas con tierra en las manos.',
    bring: ['Ropa que se pueda ensuciar', 'Botella de agua'],
    yieldN: '12', yieldT: 'plantines nuevos en la huerta comunitaria.' },
  { id: 'cam', type: 'cam', day: 19, dow: 'Jueves', time: '12:30', mins: 15, pts: 25, ronda: 4,
    title: 'Vuelta al campus entre parciales', place: 'Salida Puerta 2 · Florencio Varela 1903',
    org: 'Bienestar Estudiantil UNLaM', going: 23, cap: 40,
    text: 'Una vuelta tranquila al campus, sin cronómetro ni ranking. Ideal para despejar la cabeza antes o después de rendir. Volvemos a tiempo para la próxima clase.',
    bring: ['Calzado cómodo'],
    yieldN: '1,2', yieldT: 'km caminados entre árboles, no entre pestañas.' },
  { id: 'rec', type: 'rec', day: 20, dow: 'Viernes', time: '17:00', mins: 10, pts: 30, ronda: 0,
    title: 'Punto limpio: tapitas y PET', place: 'Hall del Edificio de Ingeniería',
    org: 'Municipio de La Matanza · Ambiente', going: 6, cap: 15, sponsor: 'Verde Envases',
    text: 'Clasificamos lo que juntó la facultad durante la semana. Las tapitas van a una campaña solidaria y el PET a una cooperativa de reciclado de la zona.',
    bring: ['Tapitas y botellas limpias, si tenés'],
    yieldN: '≈1,5', yieldT: 'kg de residuos recuperados por persona.' },
  { id: 'fore', type: 'fore', day: 21, dow: 'Sábado', time: '10:00', mins: 150, pts: 120, ronda: 4, long: true,
    title: 'Jornada de forestación: 200 nativos en el campus', place: 'Parque detrás del Polideportivo',
    org: 'Municipio de La Matanza · Ambiente', going: 86, cap: 150,
    text: 'La jornada grande del cuatri. Estudiantes de todos los departamentos, en equipos mezclados, plantamos 200 ceibos, talas y jacarandás con el vivero municipal. Hay mate, música y almuerzo a la canasta al final. Podés venir un rato o quedarte toda la mañana.',
    bring: ['Gorra y protector solar', 'Guantes, si tenés', 'Algo para compartir'],
    yieldN: '200', yieldT: 'árboles nativos plantados entre estudiantes de toda la facu.' },
  { id: 'estudio', type: 'pares', day: 18, dow: 'Mañana', time: '18:00', mins: 45, pts: 45, ronda: 2,
    title: 'Ronda de estudio antes del parcial de Análisis II', place: 'Biblioteca · Sala grupal 2',
    org: 'Tutorías DIIT', going: 17, cap: 24,
    text: 'Estudiantes que ya aprobaron la materia acompañan a los que rinden la semana que viene. Se repasan ejercicios en grupos chicos, sin vergüenza de preguntar. Nadie rinde solo.',
    bring: ['Apuntes y guía de ejercicios', 'Ganas de preguntar'],
    yieldN: '3', yieldT: 'tutores pares por cada grupo de 8 estudiantes.' },
  { id: 'viandas', type: 'soli', day: 19, dow: 'Jueves', time: '17:00', mins: 60, pts: 55, ronda: 0,
    title: 'Cocina solidaria: viandas para el comedor', place: 'Cocina del comedor universitario',
    org: 'Bienestar Estudiantil UNLaM', going: 21, cap: 25,
    text: 'Cocinamos en equipo con verduras de la huerta del campus. Las viandas van al comedor para estudiantes que cursan todo el día y no llegan a almorzar.',
    bring: ['Pelo atado', 'Delantal, si tenés'],
    yieldN: '120', yieldT: 'viandas para compañeros que cursan todo el día.' },
  { id: 'apoyo', type: 'soli', day: 21, dow: 'Sábado', time: '14:00', mins: 120, pts: 100, ronda: 1, long: true,
    title: 'Apoyo escolar en el barrio', place: 'Centro comunitario de San Justo',
    org: 'UNLaM · Extensión Universitaria', going: 38, cap: 60,
    text: 'Una tarde con chicos y chicas de primaria y secundaria del barrio: tareas, lectura y juegos de matemática. Vas en pareja con alguien de otra carrera. La facu sale al territorio.',
    bring: ['Lápices y algún libro que ya no uses', 'Paciencia y buena onda'],
    yieldN: '45', yieldT: 'chicos acompañados por estudiantes universitarios.' },
  { id: 'maraton', type: 'cam', day: 22, dow: 'Domingo', time: '09:00', mins: 90, pts: 110, ronda: 3, long: true,
    sponsor: 'Andén Deportes', sponsorTxt: 'Pone remeras, hidratación y cronometraje. Por cada kilómetro corrido dona útiles al apoyo escolar del barrio.',
    title: 'Maratón solidaria 5K UNLaM', place: 'Largada: Puerta 1 · vuelta por el campus y el barrio',
    org: 'Andén Deportes + Bienestar Estudiantil', going: 214, cap: 400,
    text: 'Corrés, trotás o caminás: lo importante es llegar con tu ronda. 5 km por el campus y el barrio, con postas de hidratación y música en la llegada. Cada kilómetro que suman los estudiantes se convierte en útiles para el apoyo escolar.',
    bring: ['Zapatillas cómodas', 'Tu ronda', 'Ganas de aguantar hasta el final'],
    yieldN: '1.070', yieldT: 'km corridos entre todos = útiles para 45 chicos del barrio.' },
  { id: 'picnic', type: 'desc', day: 22, dow: 'Domingo', time: '16:00', mins: 180, pts: 90, ronda: 3, long: true,
    title: 'Tarde sin pantallas: picnic de fin de cuatri', place: 'Pulmón verde central del campus',
    org: 'Centro de Estudiantes', going: 132, cap: 250,
    text: 'Una tarde larga para cerrar el cuatrimestre: juegos de mesa, ronda de guitarras, feria de huerta y una canasta para los celulares. Venís con tu ronda y te vas conociendo gente de otras carreras.',
    bring: ['Mantel o lona', 'Juego de mesa, si tenés', 'Algo rico para compartir'],
    yieldN: '3 h', yieldT: 'sin pantalla, con gente de todas las carreras.' },
];
const byId = id => CH.find(c => c.id === id);
const dur = m => m < 60 ? `${m}<small>min</small>` : `${Math.floor(m / 60)}<small>h</small>${m % 60 ? (m % 60) + '<small>min</small>' : ''}`;
const durTxt = m => m < 60 ? m + ' min' : Math.floor(m / 60) + ' h' + (m % 60 ? ' ' + (m % 60) + ' min' : '');

const HISTORY = [
  { type: 'desc',   t: 'Almuerzo sin celulares',    date: '16 NOV' },
  { type: 'rec',    t: 'Separación de residuos',    date: '13 NOV' },
  { type: 'cam',    t: 'Caminata al lago',          date: '06 NOV' },
  { type: 'fore',   t: 'Jornada de forestación',    date: '01 NOV' },
  { type: 'huerta', t: 'Armado de bancales',        date: '29 OCT' },
  { type: 'fore',   t: 'Plantación de ceibos',      date: '18 OCT' },
];

const MOODS = [
  { k: 1, l: 'Agotado',  say: 'Semana pesada. Hoy no hace falta rendir en nada más: probá una pausa corta o algo tranqui con tu ronda.', rec: ['desc', 'cam'] },
  { k: 2, l: 'Cargado',  say: 'Mucha cabeza puesta en la cursada. Una caminata entre clases baja un cambio, y estudiar en grupo alivia.', rec: ['cam', 'estudio'] },
  { k: 3, l: 'Normal',   say: 'Día común. Buen momento para sumarte a algo y conocer a alguien nuevo.', rec: ['estudio', 'viandas'] },
  { k: 4, l: 'Bien',     say: 'Arriba. ¿Le contagiás las ganas a alguien? Hay lugar en la cocina solidaria.', rec: ['viandas', 'apoyo'] },
  { k: 5, l: 'Con pila', say: 'Con toda. El sábado se planta: llevá a tu ronda.', rec: ['fore', 'huerta'] },
];

const PEERS = [
  { id: 'leo',  n: 'Leo M.',  ini: 'LM', bg: '#F3C13A', carrera: 'Ing. en Informática', slot: 'Jue 12 a 13 h', type: 'cam',    also: 'Cursan juntos Análisis II' },
  { id: 'sofi', n: 'Sofi R.', ini: 'SR', bg: '#B9DCC2', carrera: 'Lic. en Nutrición',   slot: 'Mié 13 a 14 h', type: 'huerta', also: 'Le interesa la huerta, como a vos' },
  { id: 'tomi', n: 'Tomi A.', ini: 'TA', bg: '#E3EADC', carrera: 'Ing. Industrial',     slot: 'Mar 18 a 19 h', type: 'desc',   also: 'Primer año, todavía no conoce a nadie' },
  { id: 'cami', n: 'Cami G.', ini: 'CG', bg: '#F1C9B9', carrera: 'Comunicación Social', slot: 'Sáb 14 a 16 h', type: 'soli',   also: 'Va al apoyo escolar y busca compañera' },
  { id: 'rodri', n: 'Rodri P.', ini: 'RP', bg: '#C9D0E6', carrera: 'Ing. en Informática', slot: 'Mié 18 a 19 h', type: 'pares', also: 'Aprobó Análisis II y da una mano' },
];

const RONDA = [
  { ini: 'LU', bg: '#F3C13A' }, { ini: 'LM', bg: '#B9DCC2' }, { ini: 'ME', bg: '#F1C9B9' },
  { ini: 'NI', bg: '#E3EADC' }, { ini: 'JU', bg: '#C9DDE6' },
];

const POSTALES = [
  { id: 'p0', who: 'Sofi', type: 'soli', when: 'hace 1 h', hugs: 34,
    t: 'Una nena me explicó fracciones mejor que mi profe de secundaria. Volví con más ganas que las que llevé.' },
  { id: 'p1', who: 'Meli', type: 'huerta', when: 'hace 2 h', hugs: 12,
    t: 'Primera vez que planto algo. Una chica de Nutrición me explicó todo y ya tengo compañera para el miércoles.' },
  { id: 'p2', who: 'Nico', type: 'desc', when: 'ayer', hugs: 27,
    t: 'Veinte minutos sin celu y terminamos hablando de todo menos de parciales. Necesitaba eso más de lo que pensaba.' },
  { id: 'p3', who: 'Juli', type: 'fore', when: 'sábado', hugs: 41,
    t: 'Nuestro ceibo ya tiene placa: “Ronda de los jueves”. En marzo volvemos a verlo crecer.' },
];

const CIRCLES = [
  { id: 'mate',   n: 'Mate sin pantallas',     m: 77, type: 'desc' },
  { id: 'huerta', n: 'Huerteros DIIT',         m: 48, type: 'huerta' },
  { id: 'cam',    n: 'Caminantes de los jueves', m: 31, type: 'cam' },
  { id: 'fore',   n: 'Brigada nativa',         m: 22, type: 'fore' },
  { id: 'soli',   n: 'Voluntariado en el barrio', m: 56, type: 'soli' },
  { id: 'pares',  n: 'Tutores pares DIIT',     m: 39, type: 'pares' },
];

const PERKS = [
  { id: 'vivero',  n: 'Vivero Las Talas',    where: 'San Justo · a 4 cuadras',  what: '15% en plantines y macetas', cost: 150 },
  { id: 'fotoc',   n: 'Fotocopiadora del CEI', where: 'Planta baja · Ingeniería', what: '50 copias sin cargo',         cost: 120 },
  { id: 'cafe',    n: 'Buffet del Polideportivo', where: 'Campus UNLaM',          what: 'Café con medialuna',          cost: 80 },
  { id: 'bici',    n: 'Bicicletería La Rueda', where: 'Av. Illia · San Justo',    what: 'Service de bici a mitad de precio', cost: 300 },
];

const FACES = [['MB', '#F3C13A'], ['AG', '#E3EADC'], ['FS', '#F1C9B9'], ['IA', '#B9DCC2'], ['PV', '#C9DDE6']];
const faces = n => FACES.slice(0, n).map(([t, b]) => `<span style="background:${b}">${t}</span>`).join('');
const rondaFaces = () => RONDA.map(p => `<span style="background:${p.bg}">${p.ini}</span>`).join('');

/* ---------- estado ---------- */
const DEFAULT = { onboarded: false, name: 'Lu', time: 15, interests: ['fore', 'desc'], carrera: 'Ingeniería', turno: 'Tarde', points: 340,
                  joined: ['desc'], done: [], pauses: 0, filter: 'all', mood: null, after: [],
                  met: 0, buddies: [], circles: ['mate'], perks: [], q: '', hugs: [], posts: [], impTab: 'social', withRonda: [] };
let S = load();
function load() { try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem('brote2') || '{}') }; } catch { return structuredClone(DEFAULT); } }
function save() { try { localStorage.setItem('brote2', JSON.stringify(S)); } catch {} }
const isJoined = id => S.joined.includes(id);
const isDone = id => S.done.includes(id);

const LEVELS = [['Semilla', 0], ['Brote', 250], ['Plantín', 500], ['Árbol', 1000]];
function level() {
  let i = LEVELS.findLastIndex(([, p]) => S.points >= p);
  const next = LEVELS[i + 1];
  return { name: LEVELS[i][0], i, next, pct: next ? (S.points - LEVELS[i][1]) / (next[1] - LEVELS[i][1]) : 1 };
}
function impact() {
  const d = t => S.done.filter(id => byId(id).type === t).length;
  return {
    trees: 2 + d('fore'),
    kg: (6.5 + d('rec') * 1.5).toFixed(1).replace('.', ','),
    offline: 140 + d('desc') * 20 + S.pauses * 10,
    people: 9 + S.met,
    encounters: HISTORY.length + S.done.length,
    plants: 18 + d('huerta') * 12,
    hours: ((HISTORY.length + S.done.length) * 0.5).toFixed(1).replace('.', ','),
  };
}

/* ---------- router ---------- */
const $ = s => document.querySelector(s);
const view = $('#view');
let current = { name: null, param: null };
const trail = [];
const SUB = ['detail', 'passport', 'admin', 'business'];   // pantallas con "volver"

function go(name, param = null, { back = false, still = false } = {}) {
  if (!back && !still && current.name && SUB.includes(name) && current.name !== name) trail.push([current.name, current.param]);
  const render = () => {
    view.className = 'view' + (name === 'detail' ? ' detail' : '') + (name === 'welcome' ? ' full' : '') + (still ? ' still' : '');
    view.innerHTML = VIEWS[name](param);
    if (!still) view.scrollTop = 0;
    current = { name, param };
    document.querySelectorAll('.tabbar [data-tab]').forEach(b => b.classList.toggle('on', b.dataset.tab === name));
    $('#screen').classList.toggle('dark', name === 'welcome' && (S.step === undefined || S.step === null || S.step === -1));
    $('#tabbar').classList.toggle('hide', ['welcome', 'pause', 'admin', 'business', 'detail'].includes(name));
    document.querySelectorAll('[data-jump]').forEach(b => b.classList.toggle('on', b.dataset.jump === name));
    afterRender(name);
  };
  if (current.name && !still) {
    view.classList.add('leaving'); if (back) view.classList.add('back');
    setTimeout(render, 200);
  } else render();
}
const refresh = () => { const top = view.scrollTop; go(current.name, current.param, { still: true }); view.scrollTop = top; };
const goBack = () => { const [n, p] = trail.pop() || ['home', null]; go(n, p, { back: true }); };

/* ---------- componentes ---------- */
const r = (i) => `data-r style="--i:${i}"`;
const backBtn = (light) => `<button class="back${light ? '' : ' on-paper'}" data-back>${ic('back')}</button>`;

function tag(c, i) {
  const t = TYPES[c.type];
  const fits = !c.long && c.mins <= S.time;
  const st = isDone(c.id) ? ' done' : isJoined(c.id) ? ' joined' : '';
  const badge = isDone(c.id) ? '<span class="state done">Sellado</span>' : isJoined(c.id) ? '<span class="state">Anotado</span>' : '';
  const ronda = c.ronda ? `<span class="t-ronda"><span class="faces sm">${RONDA.slice(1, 1 + Math.min(c.ronda, 3)).map(p => `<span style="background:${p.bg}">${p.ini}</span>`).join('')}</span>${c.ronda} de tu ronda</span>` : '';
  return `<button class="tag${st}" style="--c:${t.c}" data-go="detail" data-p="${c.id}" ${r(i)}>
    <div class="spine">${ic(c.type)}</div>
    <div class="body">
      <div class="t-top"><span class="t-type">${t.label}${c.long ? ' · jornada' : ''}</span><span class="t-dur">${durTxt(c.mins)}</span></div>
      <h4>${c.title}</h4>
      <div class="t-when">${c.dow} ${c.time} · ${c.place.split(' · ')[0].split(',')[0]}</div>
      <div class="t-foot">${ronda || (fits ? '<span class="t-fit">Entra en tu hueco</span>' : c.long ? `<span class="t-fit">${c.going} van</span>` : '<span></span>')}<span class="t-right">${badge}<span class="pts">+${c.pts}</span></span></div>
      ${c.sponsor ? `<div class="spons mono">con el apoyo de ${c.sponsor}</div>` : ''}
    </div>
  </button>`;
}

/* tarjeta horizontal para jornadas colectivas */
function jcard(c, i) {
  const t = TYPES[c.type];
  return `<button class="jcard" style="--c:${t.c}" data-go="detail" data-p="${c.id}" ${r(i)}>
    <div class="j-top"><span class="j-ic">${ic(c.type)}</span><span class="j-dur">${durTxt(c.mins)}</span><div class="ht halftone"></div></div>
    <div class="j-body"><span class="mono">${c.dow} · ${c.time}</span><b>${c.title}</b>
      <span class="j-foot"><span class="faces sm">${faces(3)}</span>${c.going} van</span></div>
  </button>`;
}

function stampSVG(type, label) {
  const id = 'sp' + Math.random().toString(36).slice(2, 8);
  return `<svg viewBox="0 0 100 100"><defs><path id="${id}" d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0"/></defs>
    <circle cx="50" cy="50" r="47" fill="none" stroke="currentColor" stroke-width="2.6"/>
    <circle cx="50" cy="50" r="43.5" fill="none" stroke="currentColor" stroke-width=".8"/>
    <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="1.2" stroke-dasharray="2 2.6"/>
    <text font-family="IBM Plex Mono, monospace" font-size="7.4" letter-spacing="1.5" fill="currentColor"><textPath href="#${id}">${label}</textPath></text>
    <g transform="translate(35.6 35.6) scale(1.2)" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${P[type]}"/></g></svg>`;
}

/* nivel de energía: círculo que se llena (sin caritas ni emojis) */
const moodGlyph = k => `<svg viewBox="0 0 30 30" class="mg"><defs><clipPath id="mg${k}"><circle cx="15" cy="15" r="11"/></clipPath></defs>
  <circle cx="15" cy="15" r="13.5" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <rect class="lvl" x="0" y="${27 - k * 4.6}" width="30" height="30" fill="currentColor" clip-path="url(#mg${k})"/></svg>`;

function moodScale(attr, sel) {
  return `<div class="moods">${MOODS.map(m => `<button class="mood${sel === m.k ? ' on' : ''}" data-${attr}="${m.k}">${moodGlyph(m.k)}<span>${m.l}</span></button>`).join('')}</div>`;
}

const ODS = {
  3:  ['Salud y bienestar', '#4C9F38'], 4: ['Educación de calidad', '#C5192D'], 11: ['Ciudades sostenibles', '#FD9D24'],
  12: ['Consumo responsable', '#BF8B2E'], 13: ['Acción por el clima', '#3F7E44'], 15: ['Vida de ecosistemas terrestres', '#56C02B'],
  17: ['Alianzas para los objetivos', '#19486A'],
};
const odsChip = n => `<span class="ods" style="--oc:${ODS[n][1]}"><b>${n}</b>${ODS[n][0]}</span>`;

/* ---------- vistas ---------- */
const VIEWS = {

  welcome() {
    const step = S.step === undefined || S.step === null ? -1 : S.step;
    if (step === -1) {
      const word = (w, base) => [...w].map((ch, k) => `<span style="--i:${base + k}">${ch}</span>`).join('');
      const leaves = Array.from({ length: 9 }, (_, k) =>
        `<span style="left:${(k * 37 + 8) % 100}%;--dx:${(k % 2 ? 1 : -1) * (18 + k * 5)}px;animation-duration:${10 + (k % 4) * 3}s;animation-delay:-${k * 1.7}s"></span>`).join('');
      const pillar = (icon, label, k) => `<span class="orb-i" style="--k:${k}" title="${label}">${icon}</span>`;
      return `<div class="splash">
        <div class="sp-ht halftone"></div>
        <div class="sp-leaves">${leaves}</div>
        <div class="sp-center">
          <div class="sp-rings"><i></i><i></i><i></i></div>
          <div class="sp-orbit">
            ${pillar(ic('heart'), 'Bienestar emocional', 0)}
            ${pillar(ic('people'), 'Conexión social', 1)}
            ${pillar(ic('fore'), 'Sostenibilidad', 2)}
            ${pillar(ic('build'), 'Comunidad universitaria', 3)}
          </div>
          <div class="sp-logo">
            <svg viewBox="0 0 64 64" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path class="sp-stem" d="M32 54V30" stroke="#005A29" stroke-width="3.4"/>
              <path class="sp-leaf l1" d="M32 34c-9 0-14-6-14-16 9 0 14 6 14 16Z" fill="#00873E"/>
              <path class="sp-leaf l2" d="M32 40c7.5 0 12-5 12-13-7.5 0-12 5-12 13Z" fill="#7FBF5E"/>
              <path class="sp-ground" d="M18 54h28" stroke="#005A29" stroke-width="3.4"/>
            </svg>
          </div>
        </div>
        <div class="sp-text">
          <h1 class="sp-name"><span class="w">${word('Desafío', 0)}</span><span class="w">${word('Bienestar', 7)}</span></h1>
          <span class="sp-pill mono">UNLaM · 2C2026</span>
          <p class="sp-tag">Poco tiempo, mucho impacto.</p>
        </div>
        <div class="sp-foot">
          <button class="btn sp-btn" data-step="0">Comenzar <span class="arrow">${ic('arrow')}</span></button>
          <span class="mono">Para estudiantes universitarios · de estudiantes para estudiantes</span>
        </div>
      </div>`;
    }

    const prog = `<div class="ob-prog">${[0, 1, 2].map(i => `<i class="${i <= step ? 'on' : ''}"></i>`).join('')}</div>`;
    const chip = (attr, val, on, label = val, cls = '') => `<button class="chip ${cls}${on ? ' on' : ''}" data-${attr}="${val}">${label}</button>`;
    if (step === 0) return `<div class="welcome ob">
      <div class="ob-body">
        <div class="sched-art" aria-hidden="true">
          <div class="sa-sun"></div>
          <svg class="sa-sprout" viewBox="0 0 250 280" fill="none" stroke="#0D2B1B" stroke-width="3" stroke-linecap="round" aria-hidden="true">
          <path class="draw" style="--len:260;--d:.9s" d="M120 268 C118 210 126 160 116 100"/>
          <path class="pop" style="--d:1.5s;--o:100% 100%" d="M118 150 C80 150 56 126 52 86 C92 88 116 112 118 150Z" fill="#00873E" stroke="none"/>
          <path class="pop" style="--d:1.7s;--o:0% 100%" d="M120 120 C126 84 152 62 192 60 C188 98 162 120 120 120Z" fill="#7FBF5E" stroke="none"/>
          <path class="pop" style="--d:1.9s;--o:50% 100%" d="M116 102 C104 78 108 52 124 30 C138 54 134 80 116 102Z" fill="#005A29" stroke="none"/>
        </svg>
          <div class="sa-day mono">Martes · tu cursada</div>
          <div class="sa-block cls" style="--d:.15s"><span class="mono">14:00</span><b>Análisis Matemático II</b><small>Aula 312</small></div>
          <div class="sa-block brote" style="--d:.55s"><span class="mono">16:00</span><b>Desafío · 20′ entre clases</b><small>Mate sin pantallas con tu ronda</small><i class="sa-faces"><span style="background:#F3C13A">LM</span><span style="background:#F1C9B9">ME</span><span style="background:#C9DDE6">JU</span></i></div>
          <div class="sa-block cls" style="--d:.95s"><span class="mono">16:20</span><b>Sistemas Operativos</b><small>Aula 105</small></div>
        </div>
        <div class="for-who" ${r(1)}><span class="mono">Para estudiantes universitarios</span><span class="pill">UNLaM</span></div>
        <h1 ${r(2)}>Poco tiempo,<br><em>mucho</em> impacto.</h1>
        <p class="lead" ${r(3)}>Pausas cortas entre clases y jornadas colectivas con gente de toda la facu para desconectarte, conocer gente y dejar huella.</p>
      </div>
      <div class="ob-foot" ${r(4)}>
        <button class="btn" data-step="1">Empezar <span class="arrow">${ic('arrow')}</span></button>
        <div class="ob-sub"><span class="mono">Entrás con tu mail @alumno.unlam.edu.ar</span><button class="link" data-go="business">Soy institución</button></div>
      </div>
    </div>`;
    if (step === 1) return `<div class="welcome ob">
      <div class="ob-top">${backBtn(false).replace('data-back', 'data-step="0"')}${prog}</div>
      <div class="ob-body">
        <span class="mono ob-k" ${r(0)}>Paso 1 de 2 · Contanos de vos</span>
        <h2 class="ob-h" ${r(1)}>¿Qué estudiás y cuándo cursás?</h2>
        <p class="ob-p" ${r(2)}>Así te armamos una ronda con gente de tus horarios.</p>
        <div class="q" ${r(3)}><div class="mono">Departamento</div><div class="chips">${['Ingeniería', 'Económicas', 'Humanidades', 'Derecho', 'Salud'].map(c => chip('carrera', c, S.carrera === c)).join('')}</div></div>
        <div class="q" ${r(4)}><div class="mono">Turno</div><div class="chips">${['Mañana', 'Tarde', 'Noche'].map(c => chip('turno', c, S.turno === c)).join('')}</div></div>
      </div>
      <div class="ob-foot"><button class="btn" data-step="2">Seguir <span class="arrow">${ic('arrow')}</span></button></div>
    </div>`;
    return `<div class="welcome ob">
      <div class="ob-top">${backBtn(false).replace('data-back', 'data-step="1"')}${prog}</div>
      <div class="ob-body">
        <span class="mono ob-k" ${r(0)}>Paso 2 de 2 · Tu tiempo</span>
        <h2 class="ob-h" ${r(1)}>¿Cuánto hueco tenés entre clases?</h2>
        <div class="q" ${r(2)}><div class="chips">${[10, 15, 20].map(m => chip('time', m, S.time === m, m + '<small> min</small>', 'time')).join('')}</div></div>
        <div class="q" ${r(3)}><div class="mono">¿Qué te tienta? · elegí los que quieras</div><div class="chips">${Object.entries(TYPES).map(([k, v]) => chip('int', k, S.interests.includes(k), ic(k) + v.label)).join('')}</div></div>
      </div>
      <div class="ob-foot"><button class="btn" data-start>Listo, ver mis desafíos <span class="arrow">${ic('arrow')}</span></button></div>
    </div>`;
  },

  home() {
    const f = CH.find(c => c.featured);
    const done = Math.min(5, 2 + S.done.length);
    const week = WEEK.map(w => {
      const dots = CH.filter(c => c.day === w.n).slice(0, 3).map(c => `<i style="background:${TYPES[c.type].c}"></i>`).join('');
      return `<div class="day${w.n === TODAY ? ' today' : ''}${w.n < TODAY ? ' past' : ''}"><span class="d">${w.d}</span><span class="n">${w.n}</span><span class="dots">${dots}</span></div>`;
    }).join('');
    const im = impact();
    const m = MOODS.find(x => x.k === S.mood);
    const recs = m ? m.rec.map(byId) : [];
    const moodBlock = m ? `
        <div class="mood-reply">
          <div class="mr-top">${moodGlyph(m.k)}<div><span class="mono">Llegás ${m.l.toLowerCase()}</span><p>${m.say}</p></div>
          <button class="link" data-mood="0">cambiar</button></div>
          <div class="mr-recs">${recs.map(c => `<button class="mr-rec" style="--c:${TYPES[c.type].c}" data-go="detail" data-p="${c.id}">${ic(c.type)}<span><b>${c.title}</b><small>${c.dow} ${c.time} · ${durTxt(c.mins)}</small></span></button>`).join('')}</div>
          ${m.k <= 2 ? `<button class="care" data-help>${ic('ear')}<span><b>¿Necesitás hablar con alguien?</b><small>Bienestar Estudiantil tiene espacios de escucha gratuitos.</small></span>${ic('arrow')}</button>` : ''}
        </div>`
      : `<div class="mood-ask"><div class="ma-h"><h3>¿Cómo llegás hoy?</h3><span class="mono">Sólo lo ves vos</span></div>${moodScale('mood', null)}</div>`;
    const upcoming = CH.filter(c => !c.featured && !c.long).sort((x, y) => x.day - y.day).slice(0, 3);
    const jornadas = CH.filter(c => c.long);
    return `
      <div class="top" ${r(0)}><span class="mono" style="color:var(--ink-3)">Mar 17 nov · Semana 14</span>
        <span class="top-r"><button class="bell" data-bell aria-label="Avisos">${ic('bell')}<i></i></button><button class="avatar" data-go="passport">${S.name.slice(0, 2)}</button></span></div>
      <div class="greet pad" ${r(1)}>
        <h1 class="h-display">Hola, ${S.name}.</h1>
        <p>Tenés <b>${S.time} min libres</b> entre Análisis II y Sistemas. Esto es lo que hay para vos.</p>
      </div>

      <div class="ticket-wrap" ${r(2)}>
        <button class="ticket" style="--c:var(--unlam)" data-go="detail" data-p="${f.id}">
          <div class="ht halftone"></div>
          <div class="row1"><span class="mono">Desafío de la semana</span><span class="badge mono">+${f.pts} pts</span></div>
          <h3>${f.title}</h3>
          <div class="perf"></div>
          <div class="meta"><span><b>${f.dow} · ${f.time} hs</b> · ${durTxt(f.mins)}</span><span class="faces">${faces(4)}</span></div>
        </button>
      </div>

      <div class="sec pad" ${r(3)}>${moodBlock}</div>

      <div class="sec pad" ${r(4)}>
        <div class="weekcard">
          <div class="wc-h">
            <div class="wc-ring"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="25" class="bg"/><circle cx="30" cy="30" r="25" class="fg" style="--g:${done / 5}"/></svg><span>${done}<small>/5</small></span></div>
            <div><span class="mono">Tu semana</span><b>${done >= 5 ? '¡Meta cumplida!' : 'Te faltan ' + (5 - done) + ' para tu meta'}</b><small>Racha de 4 semanas</small></div>
          </div>
          <div class="week">${week}</div>
        </div>
      </div>

      <div class="sec pad" ${r(5)}>
        <div class="myday">
          <div class="md-h"><span class="mono">Tu martes</span><span class="mono exam">Semana de parciales</span></div>
          <div class="md-row done"><span class="mono">14:00</span><b>Análisis Matemático II</b><small>Aula 312</small></div>
          <button class="md-row gap" data-go="pause"><span class="mono">16:00</span><b>Pausa de 10 min sin pantalla</b><small>En tu hueco libre</small></button>
          <div class="md-row"><span class="mono">16:20</span><b>Sistemas Operativos</b><small>Aula 105</small></div>
          <button class="md-row gap" data-go="detail" data-p="desc"><span class="mono">18:00</span><b>Mate sin pantallas</b><small>Va tu ronda</small></button>
        </div>
      </div>

      <div class="sec">
        <div class="sec-h pad" ${r(6)}><h2>Esta semana</h2><button class="link" data-tab="list">Ver todos</button></div>
        <div class="tags">${upcoming.map((c, i) => tag(c, 7 + i)).join('')}</div>
      </div>

      <div class="sec">
        <div class="sec-h pad" ${r(10)}><h2>Jornadas colectivas</h2><button class="link" data-filter="long" data-tab="list">Ver</button></div>
        <p class="sec-sub pad" ${r(10)}>Más largas y con gente de toda la facu.</p>
        <div class="jrow" ${r(11)}>${jornadas.map((c, i) => jcard(c, 11 + i)).join('')}</div>
      </div>

      <div class="sec">
        <div class="sec-h pad" ${r(12)}><h2>Tu huella</h2><button class="link" data-tab="impact">Ver impacto</button></div>
        <div class="garden mini" ${r(13)}>${garden()}</div>
        <div class="mini-impact" ${r(13)}>
          <div><b data-count="${im.people}">0</b><span>personas<br>nuevas</span></div>
          <div><b data-count="${im.offline}">0</b><span>min sin<br>pantalla</span></div>
          <div><b data-count="${im.trees}">0</b><span>árboles<br>plantados</span></div>
        </div>
      </div>`;
  },

  list() {
    const opts = [['all', 'Todos'], ['short', 'Pausas cortas'], ['long', 'Jornadas']].concat(Object.entries(TYPES).map(([k, v]) => [k, v.label]));
    const chips = opts.map(([k, l]) => `<button class="chip${S.filter === k ? ' on' : ''}" data-filter="${k}">${P[k] ? ic(k) : ''}${l}</button>`).join('');
    const norm = t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const q = norm(S.q || '');
    const items = CH.filter(c => S.filter === 'all' || (S.filter === 'short' ? !c.long : S.filter === 'long' ? c.long : c.type === S.filter))
      .filter(c => !q || norm(c.title + ' ' + c.place + ' ' + TYPES[c.type].label + ' ' + c.org).includes(q));
    return `
      <div class="page-h">
        <div class="eyebrow mono" ${r(0)}>Semana del 16 al 22 de noviembre</div>
        <h1 class="h-display" ${r(1)}>Desafíos</h1>
        <p ${r(2)}>Todos en un solo lugar, con día, hora y lugar. Pausas que entran en tu hueco de ${S.time}′ y jornadas largas para hacer con gente de toda la facu.</p>
      </div>
      <label class="search pad" ${r(3)}>${ic('search')}<input id="q" type="search" placeholder="Buscar: estudio, huerta, maratón…" value="${S.q || ''}" autocomplete="off"></label>
      <div class="filters" ${r(3)}>${chips}</div>
      <div class="tags">${items.length ? items.map((c, i) => tag(c, 4 + i)).join('') : '<div class="empty">Nada por acá esta semana.</div>'}</div>
      <div class="sec pad" ${r(10)}><button class="propose" data-propose>${ic('plus')}<span><b>Proponé un desafío</b><small>Tu idea pasa por Bienestar y, si suma, se publica para todos.</small></span></button></div>`;
  },

  detail(id) {
    const c = byId(id), t = TYPES[c.type];
    const joined = isJoined(id), done = isDone(id), withR = S.withRonda.includes(id);
    const cta = done
      ? `<button class="btn ghost" disabled>${ic('check')} Sellado · +${c.pts} pts</button>`
      : joined
        ? `<button class="btn tomato" data-seal="${id}">${ic('seal')} Sellar asistencia</button>`
        : `<button class="btn" data-join="${id}">Me sumo <span class="arrow">${ic('arrow')}</span></button>`;
    const peer = PEERS.find(p => p.type === c.type);
    return `
      <div class="detail-hero" style="--c:${t.c}">
        ${backBtn(true)}
        <div class="ht halftone"></div>
        <div class="giant">${ic(c.type)}</div>
        <span class="pill type" ${r(0)}>${ic(c.type)} ${t.label}</span>
        <h1 class="h-display" ${r(1)}>${c.title}</h1>
        <div class="mins" ${r(2)}>${dur(c.mins)}</div>
        ${c.long ? `<span class="pill long" ${r(2)}>${ic('people')} Jornada colectiva</span>` : ''}
      </div>
      <div class="facts" ${r(3)}>
        <div class="fact"><span class="mono">Cuándo</span><b>${c.dow} ${c.day}/11<br>${c.time} hs</b></div>
        <div class="fact"><span class="mono">Dónde</span><b>${c.place}</b></div>
        <div class="fact"><span class="mono">Suma</span><b>+${c.pts} puntos</b></div>
        <div class="fact"><span class="mono">Organiza</span><b>${c.org}</b></div>
      </div>
      <div class="minimap pad" ${r(3)}>
        <div class="map">
          <svg viewBox="0 0 330 110" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="330" height="110" fill="#E3EADC"/>
            <path d="M0 70 C80 60 120 90 200 72 S300 50 330 60" stroke="#F3F1E6" stroke-width="10" fill="none"/>
            <path d="M120 0 L135 110 M250 0 L238 110" stroke="#F3F1E6" stroke-width="7"/>
            <rect x="150" y="18" width="70" height="38" rx="6" fill="#C9D8C4"/>
            <rect x="30" y="18" width="60" height="30" rx="6" fill="#C9D8C4"/>
            <circle cx="270" cy="30" r="16" fill="#B9DCC2"/><circle cx="60" cy="88" r="12" fill="#B9DCC2"/>
          </svg>
          <span class="map-pin" style="--c:${t.c}">${ic('pin')}</span>
          <span class="map-l mono">UNLaM · San Justo</span>
        </div>
      </div>
      <div class="detail-body">
        ${c.sponsor ? `<div class="sponsor" ${r(4)}><span class="mono">${c.long ? 'Impulsado por una empresa' : 'Desafío patrocinado'}</span><b>Con el apoyo de ${c.sponsor}</b><small>${c.sponsorTxt || 'Aporta contenedores y bolsas: el insumo no lo pagás vos ni la facultad.'}</small></div>` : ''}
        <div class="going" ${r(4)}><span class="faces">${faces(3)}</span>
          <p><b>${c.going + (joined ? 1 : 0)} anotados</b> de ${c.cap} lugares.<br>${c.ronda ? `${c.ronda} son de tu ronda.` : '3 cursan con vos Análisis II.'}</p></div>

        <div class="buddy" ${r(5)}>
          <div class="eyebrow mono">No vayas solo</div>
          <div class="buddy-row">
            <button class="buddy-opt${withR ? ' on' : ''}" data-withronda="${id}">${ic('people')}<span><b>${withR ? 'Avisado a tu ronda' : 'Ir con mi ronda'}</b><small>${withR ? 'Meli y Leo dijeron que sí' : 'Les avisamos y se encuentran antes'}</small></span></button>
            ${peer ? `<button class="buddy-opt${S.buddies.includes(peer.id) ? ' on' : ''}" data-buddy="${peer.id}"><span class="av" style="background:${peer.bg}">${peer.ini}</span><span><b>${S.buddies.includes(peer.id) ? 'Invitación enviada' : 'Invitar a ' + peer.n}</b><small>${peer.carrera}</small></span></button>` : ''}
          </div>
        </div>

        <div class="sec" ${r(6)}><p>${c.text}</p></div>
        <div class="sec" ${r(7)}><div class="eyebrow mono">Qué llevar</div><ul class="bring">${c.bring.map(b => `<li>${b}</li>`).join('')}</ul></div>
        <div class="triple" ${r(8)}>
          <div class="eyebrow mono">Lo que genera este desafío</div>
          <div class="tri"><span class="tri-k">Social</span><p>Conocés a ${Math.max(2, Math.round(c.going / 4))} personas nuevas en promedio ${c.long ? 'y trabajás en equipo con gente de otras carreras.' : 'y cortás ' + c.mins + '′ la cursada.'}</p></div>
          <div class="tri"><span class="tri-k">${['soli', 'pares', 'desc'].includes(c.type) ? 'Comunidad' : 'Ambiental'}</span><p><b>${c.yieldN}</b> ${c.yieldT}</p></div>
          <div class="tri"><span class="tri-k">Económico</span><p>Insumos y logística: ${c.org.includes('Municipio') ? 'Municipio de La Matanza' : 'UNLaM · fondos de extensión'}.</p></div>
        </div>
      </div>
      <div class="cta-bar" ${r(9)}>${cta}</div>`;
  },

  community() {
    const im = impact();
    const peers = PEERS.map(p => {
      const inv = S.buddies.includes(p.id);
      return `<div class="peer">
        <span class="av lg" style="background:${p.bg}">${p.ini}</span>
        <b>${p.n}</b><small>${p.carrera}</small>
        <span class="peer-slot mono">${ic('clock')} libre ${p.slot}</span>
        <span class="peer-also">${p.also}</span>
        <button class="chip sm${inv ? ' on' : ''}" data-buddy="${p.id}">${inv ? ic('check') + 'Invitado' : 'Invitar a ' + TYPES[p.type].label.toLowerCase()}</button>
      </div>`;
    }).join('');
    const posts = [...S.posts, ...POSTALES].map((p, i) => {
      const hugged = S.hugs.includes(p.id);
      return `<article class="postal" style="--c:${TYPES[p.type].c};--rot:${i % 2 ? .8 : -.8}deg" ${r(8 + i)}>
        <header><span class="pill">${ic(p.type)} ${TYPES[p.type].label}</span><span class="mono">${p.who} · ${p.when}</span></header>
        <p>“${p.t}”</p>
        <button class="hug${hugged ? ' on' : ''}" data-hug="${p.id}">${ic('hug')}<span>${p.hugs + (hugged ? 1 : 0)}</span> abrazos</button>
      </article>`;
    }).join('');
    const circles = CIRCLES.map(c => {
      const on = S.circles.includes(c.id);
      return `<button class="circle${on ? ' on' : ''}" style="--c:${TYPES[c.type].c}" data-circle="${c.id}">${ic(c.type)}<span><b>${c.n}</b><small>${c.m + (on ? 1 : 0)} estudiantes</small></span><i>${on ? 'Adentro' : 'Sumarme'}</i></button>`;
    }).join('');
    return `
      <div class="page-h">
        <div class="eyebrow mono" ${r(0)}>De estudiantes para estudiantes</div>
        <h1 class="h-display" ${r(1)}>Comunidad</h1>
        <p ${r(2)}>Ya conociste a <b>${im.people} personas</b> este cuatri. Nadie debería cursar solo.</p>
      </div>

      <div class="sec pad" ${r(3)}>
        <div class="ronda-big">
          <div class="rb-h"><div><span class="mono">Tu ronda · 5 personas · 4 carreras</span><h3>Ronda de los jueves</h3></div><span class="faces">${rondaFaces()}</span></div>
          <div class="bubbles">
            <div class="bub"><b>Meli</b>¿Nos vemos en Puerta 2 a las 12:25 para la caminata?</div>
            <div class="bub"><b>Leo</b>Dale. Llevo agua para todos.</div>
            <div class="bub me">Voy, salgo de Análisis II y voy derecho.</div>
          </div>
          <div class="rb-next">${ic('cam')}<span>Próximo: <b>Jue 19 · 12:30 · Vuelta al campus</b></span></div>
          <p class="rb-note mono">Las rondas se arman por horarios libres en común y se renuevan cada cuatrimestre.</p>
        </div>
      </div>

      <div class="sec">
        <div class="sec-h pad" ${r(4)}><h2>Buscá dupla</h2><span class="mono" style="color:var(--ink-3)">mismo hueco libre</span></div>
        <div class="peers" ${r(5)}>${peers}</div>
      </div>

      <div class="sec">
        <div class="sec-h pad" ${r(6)}><h2>Postales</h2><span class="mono" style="color:var(--ink-3)">después de cada desafío</span></div>
        <div class="postales pad" ${r(7)}>${posts}</div>
      </div>

      <div class="sec">
        <div class="sec-h pad" ${r(12)}><h2>Círculos</h2></div>
        <div class="circles pad" ${r(13)}>${circles}</div>
      </div>

      <div class="sec pad" ${r(14)}>
        <div class="invite">
          <div><span class="mono">Boca en boca</span><h3>Traé a alguien de tu cursada</h3><p>Cuando haga su primer desafío, suman <b>+20 pts</b> los dos.</p></div>
          <button class="code mono" data-copy>LU-BIEN-26 ${ic('share')}</button>
        </div>
      </div>

      <div class="sec pad" ${r(15)}>
        <button class="care" data-help>${ic('ear')}<span><b>Espacio de escucha</b><small>Si la cursada te está pasando por arriba, no estás solo. Hablá con Bienestar.</small></span>${ic('arrow')}</button>
      </div>`;
  },

  impact() {
    const im = impact(), lv = level(), tab = S.impTab;
    const seg = [['social', 'Social'], ['ambiental', 'Ambiental'], ['economico', 'Económico']]
      .map(([k, l]) => `<button class="${tab === k ? 'on' : ''}" data-imp="${k}">${l}</button>`).join('');
    const odsBy = { social: [3, 4], ambiental: [11, 13, 15, 12], economico: [17, 4] };
    let body = '';
    if (tab === 'social') {
      const after = S.after.length ? S.after : [4, 4, 3, 5];
      const avgA = (after.reduce((a, b) => a + b, 0) / after.length);
      const depts = [['Ingeniería', 412, true], ['Económicas', 356], ['Humanidades', 228], ['Derecho', 174], ['Salud', 114]];
      body = `
        <div class="constel" ${r(5)}>${constellation(im.people)}</div>
        <div class="sec stats">
          <div class="stat" style="--c:var(--unlam)" ${r(6)}>${ic('people')}<b data-count="${im.people}">0</b><span>personas nuevas que conociste</span></div>
          <div class="stat" style="--c:var(--river)" ${r(7)}>${ic('chat')}<b data-count="${im.encounters}">0</b><span>encuentros cara a cara</span></div>
          <div class="stat" style="--c:var(--tomato)" ${r(8)}>${ic('desc')}<b data-count="${im.offline}">0</b><span>minutos lejos de la pantalla</span></div>
          <div class="stat" style="--c:var(--clay)" ${r(9)}>${ic('soli')}<b>6<small> h</small></b><span>de voluntariado en el barrio</span></div>
        </div>
        <div class="sec pad" ${r(10)}>
          <div class="beforeafter">
            <span class="mono">Tu energía · antes y después de cada desafío</span>
            <div class="ba-row"><span>Llegás</span><div class="ba-t"><i style="--w:${(2.4 / 5) * 100}%"></i></div><b>2,4</b></div>
            <div class="ba-row after"><span>Te vas</span><div class="ba-t"><i style="--w:${(avgA / 5) * 100}%"></i></div><b>${avgA.toFixed(1).replace('.', ',')}</b></div>
            <p>Lo registrás con un toque al sellar. Es privado: Bienestar sólo ve promedios anónimos.</p>
          </div>
        </div>
        <div class="sec pad" ${r(11)}>
          <div class="collective">
            <span class="mono">Toda la UNLaM · encuentros este cuatri</span>
            <div class="big" data-count="1284">0</div>
            <p>estudiantes se encontraron en algún desafío. <b>38%</b> conoció a alguien de otra carrera.</p>
            <div class="bars">${depts.map(([n, v, me]) => `<div class="bar${me ? ' me' : ''}"><span>${n}</span><span class="t"><i data-pct="${v / 412}"></i></span><span class="v">${v}</span></div>`).join('')}</div>
          </div>
        </div>`;
    } else if (tab === 'ambiental') {
      body = `
        <div class="garden" ${r(5)}>${garden()}</div>
        <div class="sec stats">
          <div class="stat" style="--c:var(--moss)" ${r(6)}>${ic('fore')}<b data-count="${im.trees}">0</b><span>árboles nativos plantados</span></div>
          <div class="stat" style="--c:var(--teal)" ${r(7)}>${ic('rec')}<b>${im.kg}<small> kg</small></b><span>de residuos recuperados</span></div>
          <div class="stat" style="--c:var(--soil)" ${r(8)}>${ic('huerta')}<b data-count="${im.plants}">0</b><span>plantines en la huerta</span></div>
          <div class="stat" style="--c:var(--river)" ${r(9)}>${ic('cam')}<b>25<small> kg</small></b><span>de CO₂ evitados por los árboles</span></div>
        </div>
        <div class="sec pad" ${r(10)}>
          <div class="collective">
            <span class="mono">Meta colectiva del cuatrimestre</span>
            <div class="big">312 <small>/ 400 árboles</small></div>
            <p>Si la UNLaM llega a 400, el <b>Municipio de La Matanza</b> suma un corredor de nativos en el campus.</p>
            <div class="track paper"><i data-pct="${312 / 400}"></i></div>
          </div>
        </div>`;
    } else {
      body = `
        <div class="sec pad" ${r(5)}>
          <div class="allies">
            <div class="ally"><span class="ally-ic">${ic('build')}</span><div><span class="mono">B2B · cliente pagador</span><b>UNLaM · Bienestar Estudiantil y Extensión</b><small>Aporta espacios, fondos de extensión y difunde sus actividades en un solo lugar.</small></div></div>
            <div class="ally"><span class="ally-ic">${ic('fore')}</span><div><span class="mono">B2G · aliado</span><b>Municipio de La Matanza · Ambiente</b><small>Insumos y logística: plantines, guantes, contenedores, traslado del vivero.</small></div></div>
            <div class="ally"><span class="ally-ic">${ic('coin')}</span><div><span class="mono">B2B · sponsors</span><b>Empresas de sostenibilidad y bienestar</b><small>Patrocinan desafíos o aportan materiales por convenio.</small></div></div>
          </div>
        </div>
        <div class="sec stats">
          <div class="stat" style="--c:var(--unlam)" ${r(6)}>${ic('clock')}<b>${im.hours}<small> h</small></b><span>de voluntariado acreditables en Extensión</span></div>
          <div class="stat" style="--c:var(--soil)" ${r(7)}>${ic('huerta')}<b>120</b><span>plantines aportados por aliados</span></div>
        </div>
        <div class="sec pad" ${r(8)}>
          <div class="collective">
            <span class="mono">¿Por qué le sirve a quien paga?</span>
            <ul class="why">
              <li><b>Retención:</b> estudiantes que se integran abandonan menos la cursada.</li>
              <li><b>Medición:</b> participación y tasa de realización de cada actividad, en tiempo real.</li>
              <li><b>Prevención:</b> promoción de la salud antes de que haga falta atención clínica.</li>
              <li><b>Sustentabilidad:</b> metas ambientales del campus con datos verificables.</li>
            </ul>
            <div class="two-btn"><button class="btn ghost sm" data-go="admin">${ic('build')} Panel institución</button><button class="btn sm" data-go="business">${ic('coin')} Modelo de ingresos</button></div>
          </div>
        </div>`;
    }
    return `
      <div class="page-h">
        <div class="eyebrow mono" ${r(0)}>Segundo cuatrimestre 2026</div>
        <h1 class="h-display" ${r(1)}>Triple impacto</h1>
        <p ${r(2)}>Lo que hacés con otros no queda en un rato.</p>
      </div>
      <div class="seg pad" ${r(3)}><div>${seg}</div></div>
      <div class="ods-row pad" ${r(4)}>${odsBy[tab].map(odsChip).join('')}</div>
      ${body}
      <div class="sec level" ${r(16)}>
        <div class="row"><h3>Nivel ${lv.name}</h3><span class="mono">${S.points}${lv.next ? ' / ' + lv.next[1] : ''} pts</span></div>
        <div class="track"><i data-pct="${lv.pct}"></i></div>
        <div class="steps">${LEVELS.map(([n], i) => `<span class="${i === lv.i ? 'now' : ''}">${n}</span>`).join('')}</div>
      </div>`;
  },

  passport() {
    const done = S.done.map(id => ({ type: byId(id).type, t: byId(id).title, date: byId(id).day + ' NOV', isNew: true }));
    const all = [...done, ...HISTORY];
    const pending = CH.filter(c => !isDone(c.id) && c.day >= TODAY).slice(0, 3);
    const rot = i => ((i * 37) % 17) - 8;
    const cell = (s, i, locked) => `<div class="st${locked ? ' locked' : ''}${s.isNew ? ' new' : ''}" ${r(3 + i)}>
        <div class="disc" style="--c:${TYPES[s.type].c};--rot:${locked ? 0 : rot(i)}deg">${stampSVG(s.type, `${TYPES[s.type].label.toUpperCase()} · UNLAM · ${s.date || 'PRONTO'} · `)}</div>
        <span>${s.t}</span></div>`;
    return `
      <div class="page-h with-back">${backBtn(false)}
        <div class="eyebrow mono" ${r(0)}>Documento de bienestar</div>
        <h1 class="h-display" ${r(1)}>Pasaporte Bienestar</h1>
      </div>
      <div class="passport" ${r(2)}>
        <div class="ht halftone"></div>
        <div class="r">
          <div class="photo">${S.name.slice(0, 2)}</div>
          <dl><dt>Titular</dt><dd>${S.name}</dd><dt>Carrera</dt><dd>${S.carrera === 'Ingeniería' ? 'Ing. en Informática' : S.carrera}</dd><dt>Nivel</dt><dd>${level().name} · ${S.points} pts</dd><dt>Ronda</dt><dd>De los jueves</dd></dl>
        </div>
        <div class="mrz">DBU&lt;UNLAM&lt;&lt;${S.name.toUpperCase()}&lt;&lt;&lt;&lt;2C2026&lt;&lt;${String(S.points).padStart(5, '0')}&lt;&lt;&lt;</div>
      </div>
      <div class="sec"><div class="sec-h pad"><h2>Sellos</h2><span class="mono" style="color:var(--ink-3)">${all.length} de ${all.length + pending.length}</span></div>
        <div class="stamps">${all.map((s, i) => cell(s, i)).join('')}${pending.map((c, i) => cell({ type: c.type, t: c.title }, all.length + i, true)).join('')}</div>
      </div>
      <div class="sec">
        <div class="sec-h pad" ${r(19)}><h2>Beneficios</h2><span class="mono" style="color:var(--ink-3)">${S.points} pts</span></div>
        <div class="perks pad" ${r(19)}>${PERKS.map(p => { const got = S.perks.includes(p.id), can = S.points >= p.cost;
          return `<div class="perk${got ? ' got' : ''}"><span class="perk-ic">${ic('gift')}</span><div><b>${p.what}</b><small>${p.n} · ${p.where}</small></div>
          <button class="chip sm${got ? ' on' : ''}" data-perk="${p.id}" ${!can && !got ? 'disabled' : ''}>${got ? 'Canjeado' : p.cost + ' pts'}</button></div>`; }).join('')}</div>
        <p class="fine">Comercios de San Justo que se suman como aliados de Desafío Bienestar.</p>
      </div>
      <div class="sec pad menu" ${r(20)}>
        <button data-help>${ic('ear')} Espacio de escucha</button>
        <button data-copy>${ic('share')} Invitar a alguien · LU-BIEN-26</button>
        <button data-go="admin">${ic('swap')} Ver como institución (demo)</button>
      </div>`;
  },

  admin() {
    const weeks = [22, 27, 31, 26, 34, 37, 41];
    const max = 50;
    return `
      <div class="admin">
        <div class="page-h with-back">${backBtn(false)}
          <div class="eyebrow mono" ${r(0)}>Vista institución · cliente pagador</div>
          <h1 class="h-display" ${r(1)}>Panel Bienestar</h1>
          <p ${r(2)}>UNLaM · Secretaría de Bienestar Estudiantil · piloto 2C2026</p>
        </div>
        <div class="kpis pad">
          <div class="kpi" ${r(3)}><span class="mono">Instalaciones nuevas</span><b data-count="312">0</b><small>este mes · <em>+18%</em></small></div>
          <div class="kpi" ${r(4)}><span class="mono">Participación mensual</span><b>41%</b><small>participantes / estudiantes con la app</small></div>
          <div class="kpi wide" ${r(5)}><span class="mono">Tasa de actividades realizadas</span><div class="kpi-r"><b>87%</b><small>26 realizadas de 30 planificadas</small></div><div class="track paper"><i data-pct=".87"></i></div></div>
        </div>
        <div class="sec pad" ${r(6)}>
          <div class="panel">
            <span class="mono">Participación semanal (%)</span>
            <div class="wbars">${weeks.map((v, i) => `<div class="wb${i === weeks.length - 1 ? ' now' : ''}"><i style="--h:${(v / max) * 100}%"></i><span>${v}</span><small>S${8 + i}</small></div>`).join('')}</div>
          </div>
        </div>
        <div class="sec pad" ${r(7)}>
          <div class="panel">
            <span class="mono">Energía antes → después · promedio anónimo</span>
            <div class="ba-row"><span>Antes</span><div class="ba-t"><i style="--w:52%"></i></div><b>2,6</b></div>
            <div class="ba-row after"><span>Después</span><div class="ba-t"><i style="--w:74%"></i></div><b>3,7</b></div>
            <p class="note">62 estudiantes derivados desde Tutorías participaron en 2 o más desafíos.</p>
          </div>
        </div>
        <div class="sec pad" ${r(8)}>
          <div class="panel">
            <span class="mono">Aportes de aliados este cuatrimestre</span>
            <div class="arow"><b>Municipio de La Matanza</b><span>120 plantines · 3 jornadas con logística</span></div>
            <div class="arow"><b>UNLaM · Extensión</b><span>Espacios del campus · fondos de extensión</span></div>
            <div class="arow"><b>Vivero local (sponsor)</b><span>40 kits de guantes y herramientas</span></div>
          </div>
        </div>
        <div class="sec pad" ${r(9)}>
          <div class="plan">
            <div class="plan-h"><span class="mono">Tu plan</span><span class="pill">Piloto</span></div>
            <h3>Licencia Universidad</h3>
            <p>Sin costo durante el piloto 2C2026. Desde 1C2027: licencia anual por estudiante activo.</p>
            <ul><li>Desafíos ilimitados y difusión en un solo lugar</li><li>Panel de participación y retención</li><li>Reporte de impacto para Extensión y metas ambientales</li></ul>
            <button class="link" data-go="business">Ver modelo de negocio</button>
          </div>
        </div>
        <div class="sec pad" ${r(10)}>
          <button class="btn" data-publish>${ic('plus')} Publicar un desafío</button>
          <p class="mono fine">Se notifica a los estudiantes con día, horario y lugar.</p>
        </div>
      </div>`;
  },

  business() {
    const n = S.calcN || 5000;
    const rev = n * 3, fixed = 120 * 12 + 6000, margin = rev - fixed;
    const fmt = v => 'US$ ' + Math.round(v).toLocaleString('es-AR');
    const streams = [
      ['build', 'B2B · núcleo', 'Universidades y facultades', 'Licencia anual por estudiante activo', 'Bienestar Estudiantil o Extensión. Compran retención, difusión en un solo lugar y métricas de participación.', 'var(--unlam)'],
      ['fore', 'B2G · en especie', 'Municipios y organismos públicos', 'Insumos, logística y convenios', 'Juventud, Salud y Ambiente financian los desafíos al aire libre como política pública de espacios verdes.', 'var(--moss)'],
      ['coin', 'B2B · sponsors', 'Empresas de sostenibilidad y bienestar', 'Desafíos patrocinados', 'Pagan por presentar un desafío o aportan materiales. Visibilidad con propósito ante miles de estudiantes.', 'var(--soil)'],
      ['heart', 'B2B · expansión', 'Obras sociales y prepagas', 'Programa de prevención', 'Financian promoción de la salud mental antes de que derive en atención clínica de mayor costo.', 'var(--river)'],
    ].map(([i, k, who, how, why, c]) => `<div class="stream" style="--c:${c}">
        <div class="s-top"><span class="s-ic">${ic(i)}</span><span class="mono">${k}</span></div>
        <b>${who}</b><span class="s-how">${how}</span><small>${why}</small></div>`).join('');
    return `
      <div class="biz">
        <div class="biz-hero">
          ${backBtn(true)}
          <div class="ht halftone"></div>
          <span class="mono" ${r(0)}>Desafío Bienestar para instituciones</span>
          <h1 class="h-display" ${r(1)}>Estudiantes que se quedan.<br><em>Campus que crece.</em></h1>
          <p ${r(2)}>El estudiante usa Desafío Bienestar gratis. Paga la institución que necesita retenerlo, cuidarlo y medir el impacto.</p>
        </div>
        <div class="sec pad" ${r(3)}>
          <div class="who">
            <div><span class="mono">Usuario final</span><b>Estudiante</b><small>Gratis. Pausas, gente, impacto.</small></div>
            <span class="who-arrow">${ic('arrow')}</span>
            <div class="payer"><span class="mono">Cliente pagador</span><b>Universidad</b><small>Retención, difusión y datos.</small></div>
          </div>
        </div>
        <div class="sec">
          <div class="sec-h pad" ${r(4)}><h2>Cómo genera ingresos</h2></div>
          <div class="streams pad" ${r(5)}>${streams}</div>
        </div>
        <div class="sec pad" ${r(6)}>
          <div class="calc">
            <span class="mono">Calculadora · licencia universidad</span>
            <div class="calc-n"><b id="calcN">${n.toLocaleString('es-AR')}</b><span>estudiantes activos</span></div>
            <input type="range" min="1000" max="20000" step="500" value="${n}" id="calcR" aria-label="Estudiantes activos">
            <div class="calc-rows">
              <div><span>Ingreso anual</span><b id="cRev">${fmt(rev)}</b></div>
              <div><span>Costos fijos (hosting + operación)</span><b id="cFix">− ${fmt(fixed)}</b></div>
              <div class="tot${margin < 0 ? ' neg' : ''}"><span>Margen anual</span><b id="cMar">${fmt(margin)}</b></div>
            </div>
            <p class="note">Licencia: US$ 3 por estudiante activo por año. Costos fijos: hosting US$ 120/mes y operación US$ 6.000/año. Los insumos (costo variable) los cubren el Municipio y los sponsors.</p>
          </div>
        </div>
        <div style="height:30px"></div>
      </div>`;
  },

  pause() {
    const leafs = Array.from({ length: 12 }, (_, i) =>
      `<span style="left:${(i * 83) % 100}%;--dx:${(i % 2 ? 1 : -1) * (20 + i * 4)}px;animation-duration:${9 + (i % 5) * 2}s;animation-delay:-${i * 1.3}s"></span>`).join('');
    return `<div class="pause">
      <div class="leafs">${leafs}</div>
      <div class="mono" ${r(0)}>Pausa sin pantalla · 10 minutos</div>
      <div class="orb" ${r(1)}><i></i><i></i><i></i><span class="clock" id="clock">10:00</span></div>
      <div ${r(2)}>
        <h2 id="breathTxt">Inhalá despacio…</h2>
        <p class="hint">Dejá el celu boca abajo. Si estás con alguien, contale cómo venís. Al volver sumás 10 pts.</p>
      </div>
      <button class="btn" data-endpause ${r(3)}>Terminar pausa</button>
    </div>`;
  },
};

/* ---------- constelación de vínculos ---------- */
function constellation(n) {
  const cx = 195, cy = 118, cols = ['#00873E', '#2FA65A', '#0F7A6A', '#5E8F1F', '#DF4F36', '#F3C13A'];
  const inis = ['LM', 'ME', 'NI', 'JU', 'SR', 'TA', 'CG', 'AB', 'RO', 'VA', 'FE', 'MA', 'PA', 'DA', 'EL', 'GI'];
  const count = Math.min(n, 16);
  let lines = '', nodes = '';
  for (let i = 0; i < count; i++) {
    const ring = i < 6 ? 62 : 104, k = i < 6 ? i : i - 6, tot = i < 6 ? 6 : count - 6;
    const a = (k / Math.max(tot, 1)) * Math.PI * 2 + (i < 6 ? -0.5 : 0.15);
    const x = cx + Math.cos(a) * ring * 1.45, y = cy + Math.sin(a) * ring * 0.82;
    const d = 0.2 + i * 0.07;
    lines += `<line class="draw" style="--len:200;--d:${d}s" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="#0D2B1B33" stroke-width="1" stroke-dasharray="3 3"/>`;
    const r0 = i < 6 ? 14 : 10;
    nodes += `<g class="pop" style="--d:${d + .3}s;--o:50% 50%"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r0}" fill="${cols[i % cols.length]}"/>${i < 6 ? `<text x="${x.toFixed(1)}" y="${(y + 3.5).toFixed(1)}" text-anchor="middle" font-family="IBM Plex Mono, monospace" font-size="9" fill="#F3F1E6">${inis[i]}</text>` : ''}</g>`;
  }
  return `<svg viewBox="0 0 390 236">${lines}${nodes}
    <g class="pop" style="--d:.1s;--o:50% 50%"><circle cx="${cx}" cy="${cy}" r="24" fill="#0D2B1B"/><text x="${cx}" y="${cy + 5}" text-anchor="middle" font-family="Gloock, serif" font-size="15" fill="#F3C13A">Vos</text></g>
    <text x="16" y="228" font-family="IBM Plex Mono, monospace" font-size="9.5" letter-spacing="1.3" fill="#0D2B1B88">${n} VÍNCULOS NUEVOS · 4 CARRERAS</text></svg>`;
}

/* ---------- jardín generativo ---------- */
function garden() {
  const items = [...HISTORY.map(h => ({ type: h.type })).reverse(), ...S.done.map(id => ({ type: byId(id).type, isNew: true }))];
  const xs = [52, 300, 120, 220, 350, 170, 80, 265, 30, 330, 145, 245];
  const G = 210;
  const plant = (type, x, i, isNew) => {
    const d = isNew ? 0.4 : 0.25 + i * 0.12;
    const sd = -i * 0.7;
    if (type === 'fore') {
      const h = 78 + (i % 3) * 14;
      return `<g class="sway" style="--sd:${sd}s">
        <path class="grow" style="--d:${d}s" d="M${x} ${G} L${x} ${G - h}" stroke="#4A3424" stroke-width="5" stroke-linecap="round"/>
        <g class="pop" style="--d:${d + .45}s">
          <circle cx="${x}" cy="${G - h - 8}" r="30" fill="#00873E"/>
          <circle cx="${x - 20}" cy="${G - h + 8}" r="19" fill="#2FA65A"/>
          <circle cx="${x + 18}" cy="${G - h + 4}" r="16" fill="#005A29"/>
          <circle cx="${x}" cy="${G - h - 8}" r="30" fill="url(#dots)"/>
        </g></g>`;
    }
    if (type === 'huerta') {
      return `<g class="pop" style="--d:${d}s">
        <ellipse cx="${x - 9}" cy="${G - 12}" rx="8" ry="16" transform="rotate(-28 ${x - 9} ${G - 12})" fill="#4E9A3A"/>
        <ellipse cx="${x + 9}" cy="${G - 12}" rx="8" ry="16" transform="rotate(28 ${x + 9} ${G - 12})" fill="#3C7F2E"/>
        <ellipse cx="${x}" cy="${G - 16}" rx="7" ry="18" fill="#7FBF5E"/>
        <circle cx="${x}" cy="${G - 3}" r="8" fill="#C98A2B"/></g>`;
    }
    if (type === 'rec') {
      return `<g class="sway" style="--sd:${sd}s"><g class="grow" style="--d:${d}s" fill="none" stroke="#2FA65A" stroke-width="3" stroke-linecap="round">
        <path d="M${x} ${G} C${x - 2} ${G - 30} ${x - 14} ${G - 46} ${x - 22} ${G - 52}"/>
        <path d="M${x} ${G} C${x} ${G - 34} ${x + 4} ${G - 50} ${x + 2} ${G - 64}"/>
        <path d="M${x} ${G} C${x + 4} ${G - 26} ${x + 16} ${G - 38} ${x + 24} ${G - 42}"/></g></g>`;
    }
    const col = { desc: '#DF4F36', soli: '#B5562F', pares: '#3E4C8A' }[type] || '#0F7A6A';
    const h = 46 + (i % 3) * 10, cy = G - h;
    const petals = [0, 72, 144, 216, 288].map(a => `<ellipse cx="${x}" cy="${cy - 8}" rx="5.5" ry="9" fill="${col}" transform="rotate(${a} ${x} ${cy})"/>`).join('');
    return `<g class="sway" style="--sd:${sd}s">
      <path class="grow" style="--d:${d}s" d="M${x} ${G} C${x - 4} ${G - h / 2} ${x + 4} ${G - h / 2} ${x} ${cy}" stroke="#0D2B1B" stroke-width="2" fill="none"/>
      <path class="pop" style="--d:${d + .3}s;--o:100% 100%" d="M${x} ${G - 16} c-10 0 -15 -6 -16 -14 c9 0 15 5 16 14z" fill="#2FA65A"/>
      <g class="pop" style="--d:${d + .5}s;--o:50% 50%">${petals}<circle cx="${x}" cy="${cy}" r="4.5" fill="#F3C13A"/></g></g>`;
  };
  const plants = items.slice(0, xs.length).map((it, i) => plant(it.type, xs[i], i, it.isNew)).join('');
  return `<svg viewBox="0 0 390 250" preserveAspectRatio="xMidYMax slice">
    <defs><pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.1" fill="#F3F1E640"/></pattern>
      <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><path d="M0 0v6" stroke="#0D2B1B22" stroke-width="2"/></pattern></defs>
    <circle class="g-sun" cx="320" cy="60" r="36" fill="#F3C13A"/>
    <path d="M0 196 C80 160 150 178 210 186 S330 160 390 176 V250 H0Z" fill="#C9D8C4"/>
    ${plants}
    <path d="M0 ${G} C100 204 190 214 280 208 S360 206 390 209 V250 H0Z" fill="#0D2B1B"/>
    <path d="M0 ${G} C100 204 190 214 280 208 S360 206 390 209 V250 H0Z" fill="url(#hatch)"/>
    <text x="22" y="238" font-family="IBM Plex Mono, monospace" font-size="9.5" letter-spacing="1.4" fill="#F3F1E699">${items.length} ACCIONES · CAMPUS SAN JUSTO</text>
  </svg>`;
}

/* ---------- post-render: contadores, barras, push ---------- */
let pushShown = false, pauseTimer = null;
function afterRender(name) {
  view.querySelectorAll('[data-count]').forEach(el => {
    const to = +el.dataset.count, t0 = performance.now(), dur = 1100;
    const fmt = n => n.toLocaleString('es-AR');
    if (view.classList.contains('still')) { el.textContent = fmt(to); return; }
    const step = now => { const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(to * e)); if (p < 1) requestAnimationFrame(step); };
    setTimeout(() => requestAnimationFrame(step), 300);
  });
  setTimeout(() => view.querySelectorAll('[data-pct]').forEach(el => el.style.transform = `scaleX(${el.dataset.pct})`), 350);

  clearInterval(pauseTimer);
  if (name === 'pause') startPause();
  if (name === 'home' && !pushShown) { pushShown = true; setTimeout(showPush, 2600); }
}

function showPush() {
  const p = $('#push'); p.classList.add('on');
  setTimeout(() => p.classList.remove('on'), 6500);
}

function startPause() {
  let left = 600; const words = ['Inhalá despacio…', 'Sostené un momento…', 'Soltá el aire…', 'Mirá algo verde.'];
  let w = 0, tick = 0;
  pauseTimer = setInterval(() => {
    left = Math.max(0, left - 1); tick++;
    const c = $('#clock'); if (!c) return clearInterval(pauseTimer);
    c.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
    if (tick % 4 === 0) { const b = $('#breathTxt'); b.style.opacity = 0; setTimeout(() => { w = (w + 1) % words.length; b.textContent = words[w]; b.style.opacity = 1; }, 400); }
  }, 1000);
}

/* ---------- toast ---------- */
let toastT;
function toast(html) {
  const t = $('#toast'); t.innerHTML = html; t.classList.add('on');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2600);
}

/* ---------- hojas inferiores ---------- */
function qr() {
  let s = 7, out = '';
  for (let y = 0; y < 13; y++) for (let x = 0; x < 13; x++) {
    const inF = (a, b) => x >= a && x < a + 4 && y >= b && y < b + 4;
    let on;
    if (inF(0, 0) || inF(9, 0) || inF(0, 9)) {
      const lx = x < 4 ? x : x - 9, ly = y < 4 ? y : y - 9;
      on = lx < 3 && ly < 3;
    } else { s = (s * 9301 + 49297) % 233280; on = s / 233280 > 0.5; }
    out += `<i class="${on ? '' : 'o'}"></i>`;
  }
  return out;
}

function openSheet(html) {
  const sheet = $('#sheet');
  sheet.innerHTML = `<div class="grab"></div>${html}`;
  $('#scrim').classList.add('on'); sheet.classList.add('on'); sheet.setAttribute('aria-hidden', 'false');
}
function closeSheet() { $('#scrim').classList.remove('on'); const s = $('#sheet'); s.classList.remove('on'); s.setAttribute('aria-hidden', 'true'); }

function sealSheet(id) {
  const c = id ? byId(id) : null;
  if (!c) {
    return openSheet(`<h2>Nada para sellar</h2>
      <p class="sub">Anotate a un desafío y, cuando estés ahí, sellá tu asistencia desde este botón.</p>
      <div style="height:20px"></div><button class="btn" data-tab="list" data-close>Ver desafíos <span class="arrow">${ic('arrow')}</span></button>`);
  }
  openSheet(`
    <div class="mono" style="color:${TYPES[c.type].c};margin-bottom:8px">${TYPES[c.type].label} · ${c.dow} ${c.time}</div>
    <h2>${c.title}</h2>
    <p class="sub">Escaneá el QR del organizador o mantené apretado el sello cuando estés en ${c.place.split(',')[0]}.</p>
    <div class="viewfinder"><div class="qr">${qr()}</div><i class="corner c1"></i><i class="corner c2"></i><i class="corner c3"></i><i class="corner c4"></i><i class="scan"></i></div>
    <div class="or mono">o</div>
    <div class="hold" id="hold" data-id="${c.id}">
      <div class="fill"></div>
      <div class="ring"><svg viewBox="0 0 46 46"><circle class="bg" cx="23" cy="23" r="20"/><circle class="fg" cx="23" cy="23" r="20"/></svg>${ic('seal')}</div>
      <span>Mantené apretado para sellar<small>Validamos tu ubicación en el campus</small></span>
    </div>`);
  bindHold($('#hold'));
}

let afterState = { id: null, mood: null, met: null };
function afterSheet(id) {
  const c = byId(id);
  afterState = { id, mood: afterState.id === id ? afterState.mood : null, met: afterState.id === id ? afterState.met : null };
  const met = [['0', 'Todavía no'], ['1', 'Sí, a 1'], ['3', 'A 2 o más']]
    .map(([k, l]) => `<button class="chip${afterState.met === k ? ' on' : ''}" data-met="${k}">${l}</button>`).join('');
  openSheet(`
    <div class="mono" style="color:${TYPES[c.type].c};margin-bottom:8px">Sellado · +${c.pts} pts</div>
    <h2>¿Cómo te vas?</h2>
    <p class="sub">Un toque. Es privado y nos ayuda a saber si esto te hace bien.</p>
    <div style="height:14px"></div>${moodScale('after', afterState.mood)}
    <div class="q"><div class="mono">¿Conociste a alguien nuevo?</div><div class="chips">${met}</div></div>
    <div class="q"><div class="mono">Dejá una postal para la comunidad (opcional)</div>
      <textarea id="postal" rows="3" placeholder="Algo que te llevás de hoy…"></textarea></div>
    <div style="height:18px"></div>
    <button class="btn" data-afterdone>Listo</button>`);
}

function helpSheet() {
  openSheet(`
    <h2>Espacio de escucha</h2>
    <p class="sub">Desafío Bienestar no es un servicio de salud: es una excusa para frenar y encontrarte con otros. Si necesitás hablar con alguien, hay gente para eso.</p>
    <div class="help-list">
      <div class="help"><span class="hi">${ic('ear')}</span><div><b>Bienestar Estudiantil UNLaM</b><small>Orientación y espacios de escucha gratuitos para estudiantes.</small></div></div>
      <div class="help"><span class="hi">${ic('people')}</span><div><b>Tutorías de tu departamento</b><small>Si la cursada se complica, te acompañan a reorganizarla.</small></div></div>
      <div class="help urgent"><span class="hi">${ic('bell')}</span><div><b>Si es una urgencia</b><small>Línea 135 (gratuita, CABA y GBA) · Emergencias 107 / 911</small></div></div>
    </div>
    <div style="height:18px"></div>
    <button class="btn" data-turno>Pedir un turno de escucha</button>`);
}

function proposeSheet(admin) {
  const types = Object.entries(TYPES).map(([k, v], i) => `<button class="chip${i === 0 ? ' on' : ''}" data-ptype="${k}">${ic(k)}${v.label}</button>`).join('');
  openSheet(`
    <h2>${admin ? 'Publicar desafío' : 'Proponé un desafío'}</h2>
    <p class="sub">${admin ? 'Se publica para todos y se notifica con día, horario y lugar.' : 'Bienestar lo revisa y, si suma, se publica.'}</p>
    <div class="form">
      <label><span class="mono">Título</span><input value="${admin ? 'Compost en el comedor' : 'Ronda de lectura al sol'}"></label>
      <div class="q"><div class="mono">Tipo</div><div class="chips">${types}</div></div>
      <div class="two"><label><span class="mono">Día y hora</span><input value="Mié 25 · 13:00"></label><label><span class="mono">Duración</span><input value="15′"></label></div>
      <label><span class="mono">Lugar</span><input value="Patio del Dto. de Humanidades"></label>
      ${admin ? `<div class="two"><label><span class="mono">Cupo</span><input value="25"></label><label><span class="mono">Aliado</span><input value="Municipio · Ambiente"></label></div>` : ''}
    </div>
    <div style="height:18px"></div>
    <button class="btn" data-sendprop="${admin ? 1 : 0}">${admin ? 'Publicar y notificar' : 'Enviar propuesta'}</button>`);
}

function bindHold(el) {
  let raf, t0, p = 0, doneFlag = false; const DUR = 1100;
  const set = v => { p = v; el.style.setProperty('--p', v); };
  const loop = now => { set(Math.min(1, (now - t0) / DUR)); if (p >= 1) { doneFlag = true; el.classList.remove('pressing'); sealed(el.dataset.id); } else raf = requestAnimationFrame(loop); };
  const decay = () => { set(Math.max(0, p - 0.08)); if (p > 0) raf = requestAnimationFrame(decay); };
  el.addEventListener('pointerdown', e => { e.preventDefault(); if (doneFlag) return; try { el.setPointerCapture(e.pointerId); } catch {} el.classList.add('pressing'); t0 = performance.now() - p * DUR; cancelAnimationFrame(raf); raf = requestAnimationFrame(loop); });
  const up = () => { if (doneFlag) return; el.classList.remove('pressing'); cancelAnimationFrame(raf); raf = requestAnimationFrame(decay); };
  el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  el.addEventListener('contextmenu', e => e.preventDefault());
}

function sealed(id) {
  const c = byId(id);
  closeSheet();
  if (!isDone(id)) { S.done.push(id); S.points += c.pts; save(); }
  try { navigator.vibrate && navigator.vibrate([20, 40, 30]); } catch {}
  const fx = $('#stampFx');
  const seeds = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2, d = 120 + (i % 3) * 30;
    const cols = ['#00873E', '#F3C13A', '#2FA65A', '#005A29'];
    return `<i class="seed" style="background:${cols[i % 4]};--x:${Math.cos(a) * d}px;--y:${Math.sin(a) * d}px;--rot:${i * 47}deg"></i>`;
  }).join('');
  fx.innerHTML = `<div class="stamp" style="color:${TYPES[c.type].c}">${stampSVG(c.type, `SELLADO · ${TYPES[c.type].label.toUpperCase()} · UNLAM · `)}</div>${seeds}`;
  setTimeout(() => { $('#screen').classList.add('shake'); setTimeout(() => $('#screen').classList.remove('shake'), 400); }, 330);
  setTimeout(() => fx.querySelector('.stamp')?.classList.add('out'), 1500);
  setTimeout(() => { fx.innerHTML = ''; refresh(); afterSheet(id); }, 1950);
}

/* ---------- eventos (delegación) ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('button, [data-go]');
  if (!el) return;
  const d = el.dataset;

  if (el.id === 'push') { $('#push').classList.remove('on'); return go('detail', 'huerta'); }
  if (el.id === 'resetBtn') { try { localStorage.removeItem('brote2'); } catch {} S = structuredClone(DEFAULT); pushShown = false; trail.length = 0; closeSheet(); return go('welcome'); }

  if ('close' in d) closeSheet();

  /* onboarding */
  if (d.time) { S.time = +d.time; save(); return refresh(); }
  if (d.int) { S.interests = S.interests.includes(d.int) ? S.interests.filter(x => x !== d.int) : [...S.interests, d.int]; save(); return refresh(); }
  if (d.step !== undefined) { S.step = +d.step; save(); return go('welcome', null, { back: +d.step === 0 }); }
  if (d.carrera) { S.carrera = d.carrera; save(); return refresh(); }
  if (d.turno) { S.turno = d.turno; save(); return refresh(); }
  if ('start' in d) { S.onboarded = true; save(); return go('home'); }

  /* navegación */
  if (d.tab && d.filter) { S.filter = d.filter; save(); trail.length = 0; return go(d.tab); }
  if (d.tab) {
    if (d.tab === 'stamp') { const next = CH.find(c => isJoined(c.id) && !isDone(c.id)); return sealSheet(next?.id); }
    if (d.tab !== current.name) { trail.length = 0; go(d.tab); }
    return;
  }
  if (d.jump) return;
  if (d.go) return go(d.go, d.p || null);
  if ('back' in d) return goBack();

  /* desafíos */
  if (d.filter) { S.filter = d.filter; save(); return refresh(); }
  if (d.join) { S.joined.push(d.join); save(); toast(`${ic('bell')} Anotado · te avisamos 1 h antes`); return refresh(); }
  if (d.seal) return sealSheet(d.seal);
  if (d.withronda) { if (!S.withRonda.includes(d.withronda)) { S.withRonda.push(d.withronda); save(); toast(`${ic('people')} Le avisamos a tu ronda`); } return refresh(); }

  /* salud mental */
  if (d.mood !== undefined) { S.mood = +d.mood || null; save(); return refresh(); }
  if ('help' in d) return helpSheet();
  if ('turno' in d) { closeSheet(); return toast(`${ic('check')} Pedido enviado · te escriben al mail`); }

  /* después del sello */
  if (d.after) { afterState.mood = +d.after; return afterSheet(afterState.id); }
  if (d.met) { afterState.met = d.met; return afterSheet(afterState.id); }
  if ('afterdone' in d) {
    const txt = ($('#postal')?.value || '').trim();
    const c = byId(afterState.id);
    if (afterState.mood) S.after.push(afterState.mood);
    S.met += +(afterState.met || 0);
    if (txt) S.posts.unshift({ id: 'm' + Date.now(), who: S.name, type: c.type, when: 'recién', hugs: 0, t: txt.replace(/</g, '&lt;') });
    save(); closeSheet(); afterState = { id: null, mood: null, met: null };
    toast(`${ic('check')} Asistencia sellada <b>+${c.pts} pts</b>`);
    return refresh();
  }

  /* comunidad */
  if (d.buddy) { if (!S.buddies.includes(d.buddy)) { S.buddies.push(d.buddy); save(); toast(`${ic('chat')} Invitación enviada a ${PEERS.find(p => p.id === d.buddy).n}`); } return refresh(); }
  if (d.hug) { S.hugs = S.hugs.includes(d.hug) ? S.hugs.filter(x => x !== d.hug) : [...S.hugs, d.hug]; save(); return refresh(); }
  if (d.circle) { S.circles = S.circles.includes(d.circle) ? S.circles.filter(x => x !== d.circle) : [...S.circles, d.circle]; save(); return refresh(); }
  if ('copy' in d) { try { navigator.clipboard?.writeText('LU-BIEN-26'); } catch {} return toast(`${ic('share')} Código copiado · compartilo`); }

  /* campanita y beneficios */
  if ('bell' in d) { const p = $('#push'); p.classList.remove('on'); void p.offsetWidth; p.classList.add('on'); setTimeout(() => p.classList.remove('on'), 6000); return; }
  if (d.perk) { if (!S.perks.includes(d.perk)) { const p = PERKS.find(x => x.id === d.perk); if (S.points < p.cost) return; S.points -= p.cost; S.perks.push(d.perk); save(); toast(`${ic('gift')} Canjeado · mostrá el QR en ${p.n}`); } return refresh(); }

  /* impacto */
  if (d.imp) { S.impTab = d.imp; save(); return go('impact'); }

  /* propuestas / institución */
  if ('propose' in d) return proposeSheet(false);
  if ('publish' in d) return proposeSheet(true);
  if (d.ptype) { el.parentElement.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === el)); return; }
  if (d.sendprop !== undefined) { closeSheet(); return toast(d.sendprop === '1' ? `${ic('bell')} Publicado · notificado a 1.284 estudiantes` : `${ic('check')} Propuesta enviada a Bienestar`); }

  if ('endpause' in d) {
    S.pauses++; S.points += 10; save();
    toast(`${ic('check')} Pausa completa <b>+10 pts</b>`);
    return go('home', null, { back: true });
  }
});
$('#scrim').addEventListener('click', closeSheet);
document.addEventListener('input', e => {
  if (e.target.id === 'q') {
    S.q = e.target.value; const pos = e.target.selectionStart;
    go('list', null, { still: true });
    const q = document.getElementById('q'); q.focus(); q.setSelectionRange(pos, pos);
    return;
  }
  if (e.target.id !== 'calcR') return;
  const n = +e.target.value; S.calcN = n; save();
  const rev = n * 3, fixed = 120 * 12 + 6000, fmt = v => 'US$ ' + Math.round(v).toLocaleString('es-AR');
  $('#calcN').textContent = n.toLocaleString('es-AR');
  $('#cRev').textContent = fmt(rev); $('#cMar').textContent = fmt(rev - fixed);
  $('#cMar').parentElement.classList.toggle('neg', rev - fixed < 0);
});
/* atajos del panel de presentación (desktop) */
document.querySelectorAll('[data-jump]').forEach(b => b.addEventListener('click', () => {
  const k = b.dataset.jump;
  closeSheet(); trail.length = 0;
  if (k === 'stamp') { const next = CH.find(c => isJoined(c.id) && !isDone(c.id)); return sealSheet(next?.id); }
  if (k === 'welcome') { S.onboarded = false; S.step = -1; save(); return go('welcome'); }
  if (k === 'detail') return go('detail', 'fore');
  go(k);
}));

/* ---------- el teléfono se dibuja a 390px reales y se escala para entrar en pantalla ---------- */
function fitPhone() {
  const ph = document.querySelector(".phone"), fit = document.querySelector(".phone-fit");
  if (!ph || !fit) return;
  if (innerWidth <= 560) { ph.style.transform = ""; fit.style.width = fit.style.height = ""; window.__ps = 1; return; }
  const tour = document.getElementById("tour");
  const inCol = tour && tour.closest(".phone-col");
  const avail = innerHeight - (inCol ? tour.offsetHeight + 14 : 0) - 56;
  const s = Math.max(.55, Math.min(1, avail / 866));
  ph.style.transform = "scale(" + s + ")";
  fit.style.width = (412 * s) + "px"; fit.style.height = (866 * s) + "px";
  window.__ps = s;
}
addEventListener("resize", fitPhone);

/* ---------- arranque ---------- */
go(S.onboarded ? 'home' : 'welcome');

fitPhone();
