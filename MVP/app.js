/* =========================================================
   DESAFÍO BIENESTAR — MVP mockeado (sin backend). Todo vive en memoria
   + localStorage para que la demo recuerde tu progreso.

   Triple impacto (Modelo Sistema B):
   · Social    → vínculos entre estudiantes, bienestar, pertenencia
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
  cup:   'M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5ZM16 10.5h1.5a2.5 2.5 0 0 1 0 5H16M8.5 3.5v2.5M12.5 3.5v2.5',
  gym:   'M6.5 8v8M17.5 8v8M3.5 10v4M20.5 10v4M6.5 12h11',
  pares: 'M3.5 5.5c3-1.2 5.8-1 8.5 1 2.7-2 5.5-2.2 8.5-1v13c-3-1.2-5.8-1-8.5 1-2.7-2-5.5-2.2-8.5-1ZM12 6.5v13',
};
const LOGO = (cls = '') => `<svg class="logo3 ${cls}" viewBox="0 0 64 64" aria-hidden="true">
  <path class="lf l1" d="M32 52C21 44 19 28 28 14c9 12 11 27 4 38Z" fill="#7FBF5E" transform="rotate(-42 32 52)"/>
  <path class="lf l3" d="M32 52C21 44 19 28 28 14c9 12 11 27 4 38Z" fill="#005A29" transform="rotate(42 32 52) scale(-1 1) translate(-64 0)"/>
  <path class="lf l2" d="M32 52C22 42 22 22 32 6c10 16 10 36 0 46Z" fill="#00873E"/>
  <path class="vein" d="M32 50V18" stroke="#F3F1E6" stroke-width="1.6" stroke-linecap="round" opacity=".55"/>
</svg>`;
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
  { k: 1, l: 'Agotado' }, { k: 2, l: 'Cargado' }, { k: 3, l: 'Normal' }, { k: 4, l: 'Bien' }, { k: 5, l: 'Con pila' },
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
  { id: 'vivero', n: 'Vivero Las Talas',        cat: 'Vivero',      ic: 'fore',  c: 'var(--moss)',   where: 'San Justo · a 4 cuadras',   what: '15% en plantines y macetas', cost: 150 },
  { id: 'cafe',   n: 'Café de la Puerta 1',     cat: 'Cafetería',   ic: 'cup',   c: 'var(--soil)',   where: 'Frente al campus',          what: 'Café con medialuna',          cost: 80 },
  { id: 'libro',  n: 'Librería Illia',          cat: 'Librería',    ic: 'pares', c: 'var(--indigo)', where: 'Av. Illia · San Justo',     what: '10% en libros y útiles',      cost: 120 },
  { id: 'gym',    n: 'Gimnasio Barrio Activo',  cat: 'Gimnasio',    ic: 'gym',   c: 'var(--river)',  where: 'San Justo centro',          what: 'Una semana libre',            cost: 300 },
  { id: 'fotoc',  n: 'Fotocopiadora del CEI',   cat: 'Campus',      ic: 'shop',  c: 'var(--teal)',   where: 'Planta baja · Ingeniería',  what: '50 copias sin cargo',         cost: 120 },
  { id: 'bici',   n: 'Bicicletería La Rueda',   cat: 'Movilidad',   ic: 'cam',   c: 'var(--clay)',   where: 'Av. Illia · San Justo',     what: 'Service de bici a mitad de precio', cost: 300 },
];
/* posición de cada desafío en el mapita del campus (% x, % y) */
const PINS = { huerta: [20, 30], desc: [52, 46], estudio: [64, 22], cam: [40, 76], rec: [74, 74], fore: [88, 40] };
/* filtros del listado, como en el wireframe */
const GROUPS = { nat: ['fore', 'huerta', 'rec'], bien: ['desc', 'cam'], social: ['soli', 'pares'] };

const FACES = [['MB', '#F3C13A'], ['AG', '#E3EADC'], ['FS', '#F1C9B9'], ['IA', '#B9DCC2'], ['PV', '#C9DDE6']];
const faces = n => FACES.slice(0, n).map(([t, b]) => `<span style="background:${b}">${t}</span>`).join('');
const rondaFaces = () => RONDA.map(p => `<span style="background:${p.bg}">${p.ini}</span>`).join('');

/* ---------- estado ---------- */
const DEFAULT = { uni: 'unlam', onboarded: false, name: 'Lu', pauseMin: 5, interests: ['fore', 'desc'], carrera: 'Ingeniería', turno: 'Tarde', points: 340,
                  joined: ['desc'], done: [], pauses: 0, filter: 'all', mood: null, after: [],
                  met: 0, buddies: [], circles: ['mate'], perks: [], q: '', hugs: [], posts: [], impTab: 'yo', codes: {}, withRonda: [] };
let S = load();
function load() { try { return { ...DEFAULT, ...JSON.parse(localStorage.getItem('desafio-bienestar') || '{}') }; } catch { return structuredClone(DEFAULT); } }
function save() { try { localStorage.setItem('desafio-bienestar', JSON.stringify(S)); } catch {} }
const isJoined = id => S.joined.includes(id);
const isDone = id => S.done.includes(id);

const LEVELS = [['Semilla', 0], ['Raíz', 250], ['Plantín', 500], ['Árbol', 1000]];
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

/* ---------- universidades: la misma app, configurada para cada una ----------
   El contenido se escribe una vez (base UNLaM) y cada universidad
   reemplaza nombres, lugares, mail y color. Sumar otra = sumar un bloque acá. */
const UNIS = {
  unlam: { label: 'UNLa&#77;', sub: 'La Matanza', color: '#00873E', short: 'UNLaM', full: 'Universidad Nacional de La Matanza', campus: 'San Justo', mail: '@alumno.unlam.edu.ar',
           deps: ['Ingeniería', 'Económicas', 'Humanidades', 'Derecho', 'Salud', 'Otra'], rep: [] },
  fiuba: { label: 'UBA', sub: 'Ingeniería', color: '#1F5FA8', short: 'FIUBA', full: 'Facultad de Ingeniería · UBA', campus: 'Paseo Colón', mail: '@fi.uba.ar',
           deps: ['Informática', 'Civil', 'Industrial', 'Química', 'Electrónica', 'Otra'],
           rep: [
             ['@alumno.unlam.edu.ar', '@fi.uba.ar'],
             ['Municipio de La Matanza', 'Ciudad de Buenos Aires'],
             ['Salida Puerta 2 · Florencio Varela 1903', 'Salida principal · Av. Paseo Colón 850'],
             ['Pulmón verde, frente a la Biblioteca', 'Parque Lezama, a 4 cuadras'],
             ['Pulmón verde central del campus', 'Parque Lezama'],
             ['Huerta del Dto. de Ingeniería', 'Terraza verde de Paseo Colón'],
             ['Huerta del Dto. Ingeniería', 'Terraza verde de Paseo Colón'],
             ['Parque detrás del Polideportivo', 'Reserva Ecológica Costanera Sur'],
             ['Hall del Edificio de Ingeniería', 'Hall central de Paseo Colón'],
             ['Centro comunitario de San Justo', 'Centro comunitario de La Boca'],
             ['Largada: Puerta 1', 'Largada: Paseo Colón 850'],
             ['Café de la Puerta 1', 'Café Paseo Colón'],
             ['Fotocopiadora del CEI', 'Fotocopiadora del CEIT'],
             ['Planta baja · Ingeniería', 'Subsuelo · Paseo Colón'],
             ['Vivero Las Talas', 'Vivero Lezama'],
             ['Librería Illia', 'Librería San Juan'],
             ['Av. Illia', 'Av. San Juan'],
             ['DIIT', 'FIUBA'],
             ['Lic. en Nutrición', 'Ing. Química'],
             ['de Nutrición', 'de Química'],
             ['Comunicación Social', 'Ing. Civil'],
             ['San Justo', 'San Telmo'],
             ['UNLaM', 'FIUBA'], ['UNLAM', 'FIUBA'],
           ] },
};
const U = () => UNIS[S.uni] || UNIS.unlam;
const T = html => U().rep.reduce((h, [a, b]) => h.split(a).join(b), html);
function applyUni() {
  $('#screen').dataset.uni = S.uni || 'unlam';
  const push = $('#push'); if (push) { push.dataset.base ??= push.innerHTML; push.innerHTML = T(push.dataset.base); }
  document.querySelectorAll('[data-setuni]').forEach(b => b.classList.toggle('on', b.dataset.setuni === (S.uni || 'unlam')));
}

/* ---------- router ---------- */
const $ = s => document.querySelector(s);
const view = $('#view');
const tabbar = $('#tabbar');
const appTabs = [...tabbar.querySelectorAll('[data-tab]')];
let current = { name: null, param: null };
const trail = [];
const SUB = ['detail', 'passport', 'perks', 'pause'];   // pantallas con "volver"

function go(name, param = null, { back = false, still = false } = {}) {
  if (!back && !still && current.name && SUB.includes(name) && current.name !== name) trail.push([current.name, current.param]);
  const render = () => {
    const active = document.activeElement;
    const hideNav = ['welcome', 'pause', 'detail'].includes(name);
    const moveFocus = !still && (view.contains(active) || (hideNav && tabbar.contains(active)));
    view.className = 'view' + (name === 'detail' ? ' detail' : '') + (name === 'welcome' ? ' full' : '') + (hideNav ? ' without-nav' : '') + (still ? ' still' : '');
    view.innerHTML = T(VIEWS[name](param));
    if (!still) view.scrollTop = 0;
    current = { name, param };
    const isDestination = screen => ['home', 'list', 'community', 'impact'].includes(screen);
    const parent = isDestination(name) ? name : trail.findLast(([screen]) => isDestination(screen))?.[0];
    appTabs.forEach(b => {
      const selected = !hideNav && b.dataset.tab === parent;
      b.classList.toggle('on', selected);
      if (selected) b.setAttribute('aria-current', 'page');
      else b.removeAttribute('aria-current');
    });
    $('#screen').classList.toggle('dark', name === 'welcome' && S.step !== 1);
    tabbar.classList.toggle('hide', hideNav);
    tabbar.inert = hideNav;
    if (moveFocus) view.focus({ preventScroll: true });
    document.querySelectorAll('[data-jump]').forEach(b => b.classList.toggle('on', b.dataset.jump === name));
    afterRender(name);
  };
  if (current.name && !still) {
    view.classList.add('leaving'); if (back) view.classList.add('from-back');
    setTimeout(render, 200);
  } else render();
}
const refresh = () => { const top = view.scrollTop; go(current.name, current.param, { still: true }); view.scrollTop = top; };
const goBack = () => { const [n, p] = trail.pop() || ['home', null]; go(n, p, { back: true }); };

/* ---------- componentes ---------- */
const r = (i) => `data-r style="--i:${i}"`;
const backBtn = (light) => `<button class="back${light ? '' : ' on-paper'}" data-back aria-label="Volver">${ic('back')}</button>`;

function tag(c, i) {
  const t = TYPES[c.type];
  const fits = !c.long && S.interests.includes(c.type);
  const st = isDone(c.id) ? ' done' : isJoined(c.id) ? ' joined' : '';
  const badge = isDone(c.id) ? '<span class="state done">Sellado</span>' : isJoined(c.id) ? '<span class="state">Anotado</span>' : '';
  const ronda = c.ronda ? `<span class="t-ronda"><span class="faces sm">${RONDA.slice(1, 1 + Math.min(c.ronda, 3)).map(p => `<span style="background:${p.bg}">${p.ini}</span>`).join('')}</span>${c.ronda} de tu ronda</span>` : '';
  return `<button class="tag${st}" style="--c:${t.c}" data-go="detail" data-p="${c.id}" ${r(i)}>
    <div class="spine">${ic(c.type)}</div>
    <div class="body">
      <div class="t-top"><span class="t-type">${t.label}${c.long ? ' · jornada' : ''}</span><span class="t-dur">${durTxt(c.mins)}</span></div>
      <h4>${c.title}</h4>
      <div class="t-when">${c.dow} ${c.time} · ${c.place.split(' · ')[0].split(',')[0]}</div>
      <div class="t-foot">${ronda || (fits ? '<span class="t-fit">Te puede gustar</span>' : c.long ? `<span class="t-fit">${c.going} van</span>` : '<span></span>')}<span class="t-right">${badge}<span class="pts">+${c.pts}</span></span></div>
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
    const step = S.step === 1 ? 1 : -1;
    if (step === -1) {
      const u = U();
      return `<div class="splash3">
        <div class="s3-art">
          <div class="ht halftone"></div>
          <div class="s3-stack">
            <div class="s2-tag t1" style="--c:var(--river)">${ic('cam')}<b>Caminata</b></div>
            <div class="s2-tag t2" style="--c:var(--soil)">${ic('huerta')}<b>Huerta</b></div>
            <div class="s3-ticket">
              <div class="s3-logo">${LOGO()}</div>
              <b>Desafío<br>Bienestar</b>
              <div class="s2-perf"></div>
              <div class="s2-row mono"><span>${u.short}</span><span>2C2026</span></div>
            </div>
            <div class="s2-stamp">${stampSVG('fore', 'POCO TIEMPO · MUCHO IMPACTO · ')}</div>
          </div>
        </div>
        <div class="s3-sheet">
          <h1>Poco tiempo,<br><em>mucho</em> impacto.</h1>
          <p>Actividades en grupo para desconectarte y conocer gente.</p>
          <button class="btn s3-btn" data-step="1">Comenzar <span class="arrow">${ic('arrow')}</span></button>
          <button class="link s3-login" data-start>Ya tengo cuenta</button>
        </div>
      </div>`;
    }
    const chip = (attr, val, on, label = val) => `<button class="chip${on ? ' on' : ''}" data-${attr}="${val}">${label}</button>`;
    return `<div class="welcome ob">
      <div class="ob-top">${backBtn(false).replace('data-back', 'data-step="-1"')}<span class="mono ob-k">Opcional · 20 segundos</span></div>
      <div class="ob-body">
        <h2 class="ob-h" ${r(1)}>Contanos un poco de vos</h2>
        <p class="ob-p" ${r(2)}>Lo usamos para mostrarte primero lo que te puede gustar. Podés cambiarlo cuando quieras.</p>
        <div class="q" ${r(3)}><div class="mono">¿Qué estudiás?</div><div class="chips">${U().deps.map(c => chip('carrera', c, S.carrera === c)).join('')}</div></div>
        <div class="q" ${r(4)}><div class="mono">¿Qué te tienta? · elegí los que quieras</div><div class="chips">${Object.entries(TYPES).map(([k, v]) => chip('int', k, S.interests.includes(k), ic(k) + v.label)).join('')}</div></div>
      </div>
      <div class="ob-foot">
        <button class="btn" data-start>Listo, ver desafíos <span class="arrow">${ic('arrow')}</span></button>
        <button class="link ob-skip" data-start>Saltar por ahora</button>
      </div>
    </div>`;
  },

  home() {
    const f = CH.find(c => c.featured);
    const done = Math.min(5, 2 + S.done.length);
    const im = impact();
    const upcoming = CH.filter(c => !c.featured && !c.long).sort((x, y) => x.day - y.day).slice(0, 3);
    const jornadas = CH.filter(c => c.long);
    const ally = PERKS[0];
    const pins = CH.filter(c => PINS[c.id]).map(c => `<button class="pin${c.featured ? ' hot' : ''}" style="--c:${TYPES[c.type].c};left:${PINS[c.id][0]}%;top:${PINS[c.id][1]}%" data-go="detail" data-p="${c.id}" title="${c.title}">${ic(c.type)}</button>`).join('');
    return `
      <div class="top" ${r(0)}><span class="mono" style="color:var(--ink-3)">Mar 17 nov · Semana 14</span>
        <span class="top-r"><button class="bell" data-bell aria-label="Avisos">${ic('bell')}<i></i></button><button class="avatar" data-go="passport">${S.name.slice(0, 2)}</button></span></div>
      <div class="greet pad" ${r(1)}>
        <h1 class="h-display">¡Hola, ${S.name}!</h1>
        <p>Mirá qué pasa esta semana en tu facu.</p>
      </div>

      <div class="ticket-wrap" ${r(2)}>
        <button class="ticket" style="--c:var(--unlam)" data-go="detail" data-p="${f.id}">
          <div class="ht halftone"></div>
          <div class="row1"><span class="mono">Desafío de la semana</span><span class="badge mono">+${f.pts} pts</span></div>
          <h3>${f.title}</h3>
          <div class="t-facts"><span>${ic('clock')}${durTxt(f.mins)}</span><span>${ic('bell')}${f.dow} · ${f.time} hs</span><span>${ic('pin')}${f.place.split(',')[0]}</span></div>
          <div class="perf"></div>
          <div class="meta"><span class="faces">${faces(4)}</span><span class="t-go">Ver desafío ${ic('arrow')}</span></div>
        </button>
      </div>

      <div class="sec pad duo" ${r(3)}>
        <button class="pts-card" data-go="perks">
          <span class="mono">Tus puntos</span>
          <b data-count="${S.points}">0</b>
          <small>Canjealos en comercios de la zona ${ic('arrow')}</small>
        </button>
        <div class="prog-card">
          <div class="wc-ring"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="25" class="bg"/><circle cx="30" cy="30" r="25" class="fg" style="--g:${done / 5}"/></svg><span>${done}<small>/5</small></span></div>
          <span class="mono">Progreso semanal</span>
          <small>${done >= 5 ? '¡Meta cumplida!' : 'Te faltan ' + (5 - done) + ' para tu meta'}</small>
        </div>
      </div>

      <div class="sec pad" ${r(4)}>
        <div class="nearby">
          <div class="nb-h"><span class="mono">Cerca tuyo · Campus San Justo</span><button class="link" data-tab="list">Ver lista</button></div>
          <div class="map campus">
            <svg viewBox="0 0 330 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="330" height="150" fill="#E3EADC"/>
              <path d="M0 98 C80 86 120 120 200 100 S300 74 330 84" stroke="#F3F1E6" stroke-width="12" fill="none"/>
              <path d="M118 0 L134 150 M252 0 L238 150" stroke="#F3F1E6" stroke-width="8"/>
              <rect x="146" y="20" width="78" height="44" rx="7" fill="#C9D8C4"/><rect x="26" y="18" width="70" height="36" rx="7" fill="#C9D8C4"/>
              <rect x="262" y="112" width="56" height="30" rx="7" fill="#C9D8C4"/><rect x="150" y="112" width="60" height="28" rx="7" fill="#C9D8C4"/>
              <circle cx="282" cy="34" r="22" fill="#B9DCC2"/><circle cx="58" cy="122" r="18" fill="#B9DCC2"/><circle cx="300" cy="62" r="12" fill="#B9DCC2"/>
            </svg>
            ${pins}
            <span class="map-l mono">UNLaM · San Justo</span>
          </div>
        </div>
      </div>

      <div class="sec pad" ${r(5)}>
        <button class="ally-card" data-go="perks">
          <span class="perk-ic">${ic(ally.ic)}</span>
          <span><span class="mono">Comercio aliado</span><b>${ally.n}</b><small>${ally.what} · ${ally.where}</small></span>
          <span class="pill">${ally.cost} pts</span>
        </button>
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
        <div class="sec-h pad" ${r(12)}><h2>Tu impacto esta semana</h2><button class="link" data-tab="impact">Ver más</button></div>
        <div class="mini-impact" ${r(13)}>
          <div><b data-count="${done}">0</b><span>actividades<br>hechas</span></div>
          <div><b data-count="${im.people}">0</b><span>personas<br>conectadas</span></div>
          <div><b data-count="${im.trees}">0</b><span>árboles<br>plantados</span></div>
        </div>
      </div>

      <div class="sec pad" ${r(14)}>
        <button class="pz-card" data-go="pause">${ic('desc')}<span><b>¿Tenés 5 minutos?</b><small>Una pausa sin pantalla, a tu ritmo</small></span>${ic('arrow')}</button>
      </div>`;
  },

  list() {
    const opts = [['all', 'Todos', ''], ['nat', 'Naturaleza', 'fore'], ['bien', 'Bienestar', 'desc'], ['social', 'Social', 'soli'], ['long', 'Jornadas', 'people']];
    const chips = opts.map(([k, l, i]) => `<button class="chip${S.filter === k ? ' on' : ''}" data-filter="${k}">${i ? ic(i) : ''}${l}</button>`).join('');
    const norm = t => t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const q = norm(S.q || '');
    const items = CH.filter(c => S.filter === 'long' ? c.long : GROUPS[S.filter] ? GROUPS[S.filter].includes(c.type) : true)
      .filter(c => !q || norm(c.title + ' ' + c.place + ' ' + TYPES[c.type].label + ' ' + c.org).includes(q));
    return `
      <div class="page-h">
        <div class="eyebrow mono" ${r(0)}>Semana del 16 al 22 de noviembre</div>
        <h1 class="h-display" ${r(1)}>Desafíos</h1>
        <p ${r(2)}>Todos en un solo lugar, con día, hora y lugar. Actividades cortas y jornadas largas para hacer con gente de toda la facu.</p>
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
        : `<button class="btn" data-join="${id}">Sumarme <span class="arrow">${ic('arrow')}</span></button>`;
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
        <div class="going" ${r(4)}><span class="faces">${faces(4)}<span class="more">+${c.going + (joined ? 1 : 0) - 4}</span></span>
          <p><b>Participantes (${c.going + (joined ? 1 : 0)})</b> de ${c.cap} lugares.<br>${c.ronda ? `${c.ronda} son de tu ronda.` : '3 cursan con vos Análisis II.'}</p></div>

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
          <div class="tri"><span class="tri-k">Social</span><p>Conocés a ${Math.max(2, Math.round(c.going / 4))} personas nuevas en promedio ${c.long ? 'y trabajás en equipo con gente de otras carreras.' : 'y cortás ' + c.mins + '′ la rutina.'}</p></div>
          <div class="tri"><span class="tri-k">${['soli', 'pares', 'desc'].includes(c.type) ? 'Comunidad' : 'Ambiental'}</span><p><b>${c.yieldN}</b> ${c.yieldT}</p></div>
          <div class="tri"><span class="tri-k">Lo hacen posible</span><p>Insumos y logística: ${c.org.includes('Municipio') ? 'Municipio de La Matanza' : 'UNLaM · fondos de extensión'}.</p></div>
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
        <button class="care" data-help>${ic('ear')}<span><b>Espacio de escucha</b><small>Si necesitás hablar con alguien, Bienestar Estudiantil tiene espacios de escucha.</small></span>${ic('arrow')}</button>
      </div>`;
  },

  impact() {
    const im = impact(), lv = level(), tab = S.impTab === 'inst' ? 'inst' : 'yo';
    const seg = `<div class="seg pad" ${r(2)}><div><button class="${tab === 'yo' ? 'on' : ''}" data-imp="yo">Mi impacto</button><button class="${tab === 'inst' ? 'on' : ''}" data-imp="inst">Vista institución</button></div></div>`;
    if (tab === 'inst') {
      const weeks = [22, 27, 31, 26, 34, 37, 41], max = 50;
      return `
      <div class="page-h">
        <div class="eyebrow mono" ${r(0)}>Lo que ve la universidad</div>
        <h1 class="h-display" ${r(1)}>Vista institución</h1>
      </div>
      ${seg}
      <p class="inst-sub pad" ${r(3)}>UNLaM · Bienestar Estudiantil · piloto 2C2026</p>
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
          <span class="mono">Aportes de aliados este cuatrimestre</span>
          <div class="arow"><b>Municipio de La Matanza</b><span>120 plantines · 3 jornadas con logística</span></div>
          <div class="arow"><b>UNLaM · Extensión</b><span>Espacios del campus · fondos de extensión</span></div>
          <div class="arow"><b>Comercios de la zona</b><span>${PERKS.length} beneficios activos · 214 canjes</span></div>
        </div>
      </div>
      <div class="sec pad" ${r(8)}>
        <div class="privacy">${ic('check')}<p><b>Solo datos agregados de participación.</b> La institución no ve nombres ni cómo se siente cada estudiante, y la app no registra datos de salud (Ley 25.326 de Protección de Datos Personales).</p></div>
      </div>
      <div class="sec pad" ${r(9)}>
        <button class="btn" data-publish>${ic('plus')} Publicar un desafío</button>
        <p class="mono fine">Se notifica a los estudiantes con día, horario y lugar.</p>
      </div>`;
    }
    const completed = HISTORY.length + S.done.length;
    const pct = Math.round(lv.pct * 100);
    return `
      <div class="page-h">
        <div class="eyebrow mono" ${r(0)}>Segundo cuatrimestre 2026</div>
        <h1 class="h-display" ${r(1)}>Mi impacto</h1>
      </div>
      ${seg}
      <div class="sec pad" ${r(3)}>
        <button class="me-card" data-go="passport">
          <span class="photo">${S.name.slice(0, 2)}</span>
          <span><b>${S.name}</b><small>${S.carrera === 'Ingeniería' ? 'Ing. en Informática' : S.carrera} · Nivel ${lv.name}</small></span>
          <span class="mono me-go">Perfil ${ic('arrow')}</span>
        </button>
      </div>
      <div class="sec pad trio" ${r(4)}>
        <div><b data-count="${S.points}">0</b><span>puntos</span></div>
        <div><b data-count="${completed}">0</b><span>desafíos completados</span></div>
        <div><b data-count="${im.people}">0</b><span>personas conectadas</span></div>
      </div>

      <div class="sec pad" ${r(5)}>
        <div class="prog-big">
          <div class="pb-ring"><svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="33" class="bg"/><circle cx="40" cy="40" r="33" class="fg" style="--g:${lv.pct}"/></svg><span>${pct}<small>%</small></span></div>
          <div><span class="mono">Tu progreso</span><b>${lv.next ? 'Te faltan ' + (lv.next[1] - S.points) + ' pts para ' + lv.next[0] : '¡Llegaste a Árbol!'}</b>
            <div class="steps">${LEVELS.map(([n], i) => `<span class="${i === lv.i ? 'now' : i < lv.i ? 'past' : ''}">${n}</span>`).join('')}</div></div>
        </div>
      </div>

      <div class="sec">
        <div class="sec-h pad" ${r(6)}><h2>Tus vínculos</h2><span class="mono" style="color:var(--ink-3)">${im.people} personas</span></div>
        <div class="constel" ${r(7)}>${constellation(im.people)}</div>
      </div>

      <div class="sec">
        <div class="sec-h pad" ${r(8)}><h2>Impacto ambiental</h2><button class="link" data-calc>¿Cómo lo calculamos?</button></div>
        <div class="garden" ${r(9)}>${garden()}</div>
        <div class="sec stats">
          <div class="stat" style="--c:var(--moss)" ${r(10)}>${ic('fore')}<b data-count="${im.trees}">0</b><span>árboles nativos plantados</span></div>
          <div class="stat" style="--c:var(--teal)" ${r(11)}>${ic('rec')}<b>${im.kg}<small> kg</small></b><span>de residuos recuperados</span></div>
          <div class="stat" style="--c:var(--soil)" ${r(12)}>${ic('huerta')}<b data-count="${im.plants}">0</b><span>plantines en la huerta</span></div>
          <div class="stat" style="--c:var(--tomato)" ${r(13)}>${ic('desc')}<b data-count="${im.offline}">0</b><span>minutos sin pantalla</span></div>
        </div>
      </div>

      <div class="sec pad" ${r(14)}>
        <div class="supporters">
          <span class="mono">Con el apoyo de comercios locales</span>
          <div class="sup-row">${PERKS.slice(0, 4).map(p => `<button class="sup" data-go="perks"><span class="perk-ic">${ic(p.ic)}</span><small>${p.n}</small></button>`).join('')}</div>
        </div>
      </div>
      <div class="ods-row pad" ${r(15)}>${[3, 4, 11, 13, 15].map(odsChip).join('')}</div>`;
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
        <div class="eyebrow mono" ${r(0)}>Tu perfil</div>
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
      <div class="sec pad" ${r(3)}>
        <div class="prof">
          <div class="pf-h"><h3>Tu perfil</h3><span class="mono">La app se adapta a tu facu</span></div>
          <div class="pf-field"><span class="mono">Universidad</span>
            <div class="pf-unis">${Object.entries(UNIS).map(([k, u]) => `<button class="pf-u${(S.uni || 'unlam') === k ? ' on' : ''}" data-setuni="${k}" style="--uc:${u.color}"><i></i><span><b>${u.label}</b><small>${u.sub}</small></span></button>`).join('')}</div>
          </div>
          <div class="pf-field"><span class="mono">Carrera</span>
            <div class="chips">${U().deps.map(c => `<button class="chip sm${S.carrera === c ? ' on' : ''}" data-carrera="${c}">${c}</button>`).join('')}</div>
          </div>
        </div>
      </div>
      <div class="sec"><div class="sec-h pad"><h2>Sellos</h2><span class="mono" style="color:var(--ink-3)">${all.length} de ${all.length + pending.length}</span></div>
        <div class="stamps">${all.map((s, i) => cell(s, i)).join('')}${pending.map((c, i) => cell({ type: c.type, t: c.title }, all.length + i, true)).join('')}</div>
      </div>
      <div class="sec pad menu" ${r(20)}>
        <button data-go="perks">${ic('gift')} Beneficios · ${S.points} pts</button>
        <button data-help>${ic('ear')} Espacio de escucha</button>
        <button data-copy>${ic('share')} Invitar a alguien · LU-BIEN-26</button>
        <button data-imp="inst">${ic('swap')} Ver como institución</button>
      </div>`;
  },

  perks() {
    const card = (p, i) => {
      const got = S.perks.includes(p.id), can = S.points >= p.cost;
      return `<div class="perk-t" style="--c:${p.c}" ${r(4 + i)}>
        <div class="pt-l"><span class="perk-ic">${ic(p.ic)}</span><span class="mono">${p.cat}</span></div>
        <div class="pt-m"><b>${p.what}</b><small>${p.n} · ${p.where}</small></div>
        <div class="pt-r"><span class="mono">${p.cost}<small>pts</small></span>
          <button class="chip sm${got ? ' on' : ''}" data-perk="${p.id}" ${!can && !got ? 'disabled' : ''}>${got ? 'Ver código' : 'Canjear'}</button></div>
      </div>`;
    };
    return `
      <div class="page-h with-back">${backBtn(false)}
        <div class="eyebrow mono" ${r(0)}>Tus puntos se transforman</div>
        <h1 class="h-display" ${r(1)}>Beneficios</h1>
        <p ${r(2)}>Comercios y espacios cerca de la UNLaM que se suman como aliados.</p>
      </div>
      <div class="sec pad" ${r(3)}>
        <div class="balance">
          <div><span class="mono">Tenés</span><b data-count="${S.points}">0</b><span class="mono">puntos</span></div>
          <p>Sumás al sellar tu asistencia (de 25 a 120 por desafío) y con cada pausa completa (+10).</p>
        </div>
      </div>
      <div class="sec pad perk-list">${PERKS.map(card).join('')}</div>
      <p class="fine pad" ${r(12)}>Un canje por comercio cada 15 días · el código vence a los 10 minutos · lo valida el comercio desde su panel.</p>
      <div class="sec pad" ${r(13)}>
        <button class="propose" data-joinbiz>${ic('shop')}<span><b>¿Tenés un comercio cerca de la UNLaM?</b><small>Sumate como aliado: más estudiantes en tu local y una acción de responsabilidad social medible.</small></span></button>
      </div>`;
  },

  pause() {
    const m = S.pauseMin || 5;
    const leafs = Array.from({ length: 12 }, (_, i) =>
      `<span style="left:${(i * 83) % 100}%;--dx:${(i % 2 ? 1 : -1) * (20 + i * 4)}px;animation-duration:${9 + (i % 5) * 2}s;animation-delay:-${i * 1.3}s"></span>`).join('');
    return `<div class="pause">
      <div class="leafs">${leafs}</div>
      <div class="pz-top">${backBtn(true)}<span class="mono">Pausa sin pantalla</span></div>
      <div class="pz-len" ${r(0)}>${[3, 5, 10].map(n => `<button class="${n === m ? 'on' : ''}" data-pmin="${n}">${n} min</button>`).join('')}</div>
      <div class="breath" ${r(1)}>
        <svg class="pz-ring" viewBox="0 0 220 220"><circle cx="110" cy="110" r="104" class="bg"/><circle cx="110" cy="110" r="104" class="fg" id="pzRing"/></svg>
        <div class="b-halo"></div><div class="b-core"></div>
        <span class="clock" id="clock">${String(m).padStart(2, '0')}:00</span>
      </div>
      <div class="pz-txt" ${r(2)}>
        <h2 id="breathTxt">Inhalá</h2>
        <p class="hint">Seguí el círculo: crece cuando tomás aire y se achica cuando lo soltás. Dejá el celu boca abajo y mirá algo verde.</p>
      </div>
      <button class="btn pz-end" data-endpause ${r(3)}>Terminar pausa</button>
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
  const total = (S.pauseMin || 5) * 60; let left = total, t = 0;
  const ring = $('#pzRing'), C = 2 * Math.PI * 104;
  if (ring) { ring.style.strokeDasharray = C; ring.style.strokeDashoffset = 0; }
  const phase = k => (k % 12) < 4 ? 'Inhalá' : (k % 12) < 6 ? 'Sostené' : 'Soltá despacio';
  let last = 'Inhalá';
  pauseTimer = setInterval(() => {
    left = Math.max(0, left - 1); t++;
    const c = $('#clock'); if (!c) return clearInterval(pauseTimer);
    c.textContent = `${String(Math.floor(left / 60)).padStart(2, '0')}:${String(left % 60).padStart(2, '0')}`;
    if (ring) ring.style.strokeDashoffset = C * (1 - left / total);
    const ph = left ? phase(t) : 'Listo. Volvé despacio.';
    if (ph !== last) { last = ph; const b = $('#breathTxt'); b.style.opacity = 0; setTimeout(() => { b.textContent = ph; b.style.opacity = 1; }, 300); }
    if (!left) clearInterval(pauseTimer);
  }, 1000);
}

/* ---------- toast ---------- */
let toastT;
function toast(html) {
  const t = $('#toast'); t.innerHTML = T(html); t.classList.add('on');
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

let sheetTrigger;
function openSheet(html) {
  const sheet = $('#sheet');
  if (sheet.inert) sheetTrigger = document.activeElement;
  sheet.innerHTML = `<div class="grab"></div><button class="sheet-close" type="button" data-close aria-label="Cerrar">×</button>${T(html)}`;
  sheet.querySelector('h2').id = 'sheetTitle';
  sheet.scrollTop = 0;
  sheet.inert = false;
  $('#scrim').classList.add('on'); sheet.classList.add('on'); sheet.setAttribute('aria-hidden', 'false');
  sheet.querySelector('.sheet-close').focus({ preventScroll: true });
}
function closeSheet() {
  const sheet = $('#sheet');
  if (sheet.inert) return;
  if (sheet.contains(document.activeElement)) {
    const target = sheetTrigger?.isConnected && sheetTrigger !== document.body ? sheetTrigger : view;
    target.focus({ preventScroll: true });
  }
  sheetTrigger = null;
  $('#scrim').classList.remove('on'); sheet.classList.remove('on'); sheet.setAttribute('aria-hidden', 'true');
  sheet.inert = true;
}

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
    <p class="sub">Un toque. Es privado: solo lo ves vos, en tu historial.</p>
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

function redeemSheet(id) {
  const p = PERKS.find(x => x.id === id);
  const code = S.codes[id];
  if (code) return openSheet(`
    <div class="mono" style="color:${p.c};margin-bottom:8px">${p.cat} · ${p.n}</div>
    <h2>${p.what}</h2>
    <p class="sub">Mostrale este código a quien te atiende. Vence en 10 minutos.</p>
    <div class="code4">${[...code].map(d => `<span>${d}</span>`).join('')}</div>
    <p class="mono fine" style="text-align:center">Próximo canje en este comercio: en 15 días</p>
    <div style="height:14px"></div><button class="btn ghost" data-close>Listo</button>`);
  openSheet(`
    <div class="mono" style="color:${p.c};margin-bottom:8px">${p.cat} · ${p.where}</div>
    <h2>${p.what}</h2>
    <p class="sub">En <b>${p.n}</b>. Se descuentan <b>${p.cost} pts</b> de tus ${S.points}. Te damos un código de 4 dígitos para mostrar en el local.</p>
    <div style="height:18px"></div>
    <button class="btn" data-redeem="${id}">Canjear por ${p.cost} pts</button>`);
}

function calcSheet() {
  openSheet(`
    <h2>¿Cómo lo calculamos?</h2>
    <p class="sub">Contamos solo lo que se puede verificar en cada actividad.</p>
    <div class="calc-list">
      <div><b>Árboles y plantines</b><small>Los registra quien organiza la jornada (por ejemplo, el vivero municipal) y se reparten entre quienes sellaron asistencia.</small></div>
      <div><b>Kg de residuos</b><small>Pesaje del punto limpio al cierre, dividido por la cantidad de asistentes.</small></div>
      <div><b>Minutos sin pantalla</b><small>Duración de los desafíos de desconexión y de las pausas que completaste.</small></div>
      <div><b>Personas conectadas</b><small>Lo que marcás vos al sellar: “¿Conociste a alguien nuevo?”.</small></div>
    </div>
    <div style="height:16px"></div><button class="btn ghost" data-close>Entendido</button>`);
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
  if (el.id === 'resetBtn') { try { localStorage.removeItem('desafio-bienestar'); } catch {} S = { ...structuredClone(DEFAULT), uni: S.uni }; pushShown = false; trail.length = 0; closeSheet(); return go('welcome'); }

  if ('close' in d) closeSheet();

  /* onboarding */
  if (d.int) { S.interests = S.interests.includes(d.int) ? S.interests.filter(x => x !== d.int) : [...S.interests, d.int]; save(); return refresh(); }
  if (d.setuni) { S.uni = d.setuni; if (!U().deps.includes(S.carrera)) S.carrera = U().deps[0]; save(); applyUni(); return current.name ? refresh() : null; }
  if ('adduni' in d) return toast(`${ic('build')} Desafío Bienestar se configura para cada universidad: escribinos`);
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
  if (d.perk) return redeemSheet(d.perk);
  if (d.redeem) {
    const p = PERKS.find(x => x.id === d.redeem); if (S.points < p.cost) return;
    S.points -= p.cost; S.perks.push(p.id); S.codes[p.id] = String(1000 + Math.floor(Math.random() * 9000)); save();
    if (current.name === 'perks') refresh();
    return redeemSheet(p.id);
  }
  if ('joinbiz' in d) return toast(`${ic('shop')} ¡Gracias! Te contactamos para sumarte`);
  if ('calc' in d) return calcSheet();
  if (d.pmin) { S.pauseMin = +d.pmin; save(); return go('pause', null, { still: true }); }

  /* impacto */
  if (d.imp) { S.impTab = d.imp; save(); trail.length = 0; return go('impact', null, { still: current.name === 'impact' }); }

  /* propuestas / institución */
  if ('propose' in d) return proposeSheet(false);
  if ('publish' in d) return proposeSheet(true);
  if (d.ptype) { el.parentElement.querySelectorAll('.chip').forEach(x => x.classList.toggle('on', x === el)); return; }
  if (d.sendprop !== undefined) { closeSheet(); return toast(d.sendprop === '1' ? `${ic('bell')} Publicado · notificado a 1.284 estudiantes` : `${ic('check')} Propuesta enviada a Bienestar`); }

  if ('endpause' in d) {
    S.pauses++; S.points += 10; save();
    toast(`${ic('check')} Pausa completa <b>+10 pts</b>`);
    return goBack();
  }
});
$('#scrim').addEventListener('click', closeSheet);
$('#sheet').addEventListener('keydown', e => { if (e.key === 'Escape') closeSheet(); });
document.addEventListener('input', e => {
  if (e.target.id === 'q') {
    S.q = e.target.value; const pos = e.target.selectionStart;
    go('list', null, { still: true });
    const q = document.getElementById('q'); q.focus(); q.setSelectionRange(pos, pos);
    return;
  }
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
  const avail = innerHeight - $('.site-header').offsetHeight - $('.demo-toolbar').offsetHeight - 40;
  const widthScale = innerWidth > 860 && innerWidth <= 1240 ? (innerWidth - 575) / 412 : 1;
  const s = Math.max(.55, Math.min(1, avail / 866, widthScale));
  ph.style.transform = "scale(" + s + ")";
  fit.style.width = (412 * s) + "px"; fit.style.height = (866 * s) + "px";
  window.__ps = s;
}
addEventListener("resize", fitPhone);

/* ---------- arranque ---------- */
applyUni();
go(S.onboarded ? 'home' : 'welcome');

fitPhone();
