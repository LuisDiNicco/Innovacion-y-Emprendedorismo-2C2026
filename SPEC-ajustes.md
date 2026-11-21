# Spec · Ajustes al MVP Desafío Bienestar

Borrador para revisar juntos antes de tocar código. Las preguntas abiertas están marcadas con **[DECIDIR]**.

---

## 0. Lo que dijeron los profes (feedback del video, 1:19:20 a 1:29:00)

- **Les gustó** la vuelta de los comercios de cercanía (el vivero que pone plantas y da descuento).
- **Pasito**: investigar la app. Suma puntos por caminar y los canjea en comercios cerca de donde estás. Para estudiantes sugieren **cafeterías y librerías** alrededor de la UNLaM. Ejemplo: en una caminata, gimnasios asociados cubrían un mes de gimnasio con los km hechos.
- **Fundamentar la parte teórica**: aclarar desde qué lugar se habla de salud mental y con qué fuentes. Buscar bibliografía sobre **burnout**, que sea validada (de psicólogos o investigadores, no de opinión). La profe mencionó al "creador del burnout": es **Christina Maslach** (Maslach Burnout Inventory). Para estudiantes existe el **MBI-Student Survey** (Schaufeli et al., 2002).
- Ustedes mismos plantearon la línea correcta: hablar de **bienestar, pertenencia y conexión**, no de salud mental clínica, porque eso "abre la puerta" a que haga falta un profesional que lo avale.

> El feedback a los otros grupos todavía se está transcribiendo. Lo sumo en la sección 5 cuando termine.

---

## 1. Landing: cada entregable en un viewport

**Objetivo:** en una pantalla de notebook o monitor común (alto útil de unos 750 a 900 px), cada sección se ve **entera, con su título**, sin hacer scroll.

**Cómo:**
- Cada `.rp-sec` pasa a `height: 100svh` con el título arriba y la grilla ocupando el resto (`flex` + `min-height: 0`).
- La tipografía y los paddings escalan con el alto de la pantalla (`clamp(…, vh, …)`), no con el ancho. Así una pantalla más baja achica un poco la letra en vez de cortar.
- El número gigante (01/02/03) y el título bajan de 96 px a unos 64 px: hoy se comen unos 140 px de alto.
- Snap suave entre secciones (`scroll-snap-type: y proximity`) para que cada scroll caiga en una entrega entera.
- En celular (menos de 860 px) se mantiene el scroll normal, porque ahí no entra de ninguna forma.

**Por sección:**
| Sección | Hoy | Ajuste |
|---|---|---|
| 01 FODA | Le faltan unos 150 px | Achicar el título y el padding de las tarjetas, y la letra de 14,5 a unos 13 px. Las 4 tarjetas quedan del mismo alto. |
| 02 Empatía | Ocupa casi 3 pantallas | **Cambiar el layout** al de un mapa de empatía clásico, en 3 columnas. Al centro, Lu (persona); arriba, *Piensa y siente*; a la izquierda, *Oye*; a la derecha, *Ve*; abajo, *Dice y hace*. Debajo, una franja con Dolores y Aspiraciones. Usuario final y cliente pagador pasan a una columna lateral angosta. |
| 03 Lean Canvas | Ya entra | Solo unificarlo con el nuevo encabezado. |

**[DECIDIR] El texto del cliente pagador en Empatía** es largo (4 párrafos). ¿Qué hacemos?
- (a) Se mantiene completo en letra chica, en una grilla de 2×2.
- (b) Se resume a una línea por actor y el texto completo se abre al tocar.
- (c) Se resume a una línea por actor y listo. El detalle ya está en el Lean Canvas.

**Secciones nuevas en la landing:**
- **04 · Fundamentos**: el marco teórico (ver sección 3). Una pantalla con 6 tarjetas de evidencia, cada una con su dato, su fuente y su año, en el estilo de la tarjeta "2,5 horas · Tu cabeza lo nota".
- **05 · Cómo se sostiene**: lo que hoy es la pantalla "Modelo de ingresos" de la app. Incluye las 4 fuentes de ingreso, la calculadora de licencia y la red de comercios aliados al estilo Pasito. Sale de la app (punto 10 del feedback).

**Columna izquierda del hero:** cambiar "Pausas cortas **entre clases**" por algo que no limite la app a los recreos. Por ejemplo: *"Desafíos cortos y jornadas con gente de toda la facu para desconectarte, conocer gente y dejar huella en tu universidad."*

---

## 2. App: nuevo recorrido

Se toma el wireframe aprobado como **esqueleto funcional** y se conserva nuestro lenguaje visual: tarjetas tipo entrada o ticket, sellos, papel y verde UNLaM.

### Antes y después

| # | Hoy | Propuesta |
|---|---|---|
| 1 | Splash con órbita de íconos y un logo genérico | **Bienvenida simple** como en el wireframe, con un logo propio nuevo (abajo). Tiene el nombre, "UNLaM", el slogan y el botón "Comenzar". |
| 2a | "Poco tiempo, mucho impacto…" (pantalla intermedia) | **Se elimina.** |
| 2b | Carrera y turno | Se fusiona en **un solo paso opcional**, "Contanos de vos", con departamento e intereses. Tiene un "Saltar". |
| 2c | "¿Cuánto hueco tenés entre clases?" | **Se elimina.** Todo el concepto de "hueco" desaparece de la app: el home deja de decir "tenés 15 min libres entre Análisis II y Sistemas", y se va el bloque "Tu martes" con los horarios de cursada. |
| 3 | Inicio | Se reordena según el wireframe: saludo → **desafío de la semana** (nuestro ticket) con duración, fecha y lugar y el botón "Ver desafío" → **comercio aliado de la semana** → **Tus puntos + progreso semanal** → **Tu impacto esta semana** (actividades · personas · CO₂) → jornadas colectivas. El check-in de energía se mantiene, revisando el texto (ver el punto de salud mental). |
| 4–7 | Desafíos, detalle, sellar, comunidad | **Se mantienen.** En **Desafíos**, filtros por categoría como en el wireframe (Naturaleza · Bienestar · Social · Solidaria). En el **detalle**, una fila de avatares de participantes con "+N", fecha y horario en formato de lista con íconos, y una **tarjeta de evidencia** chica (por ejemplo, en la caminata: "2,5 h de caminata por semana → 25% menos riesgo de depresión · JAMA Psychiatry 2022"). |
| 8 | Triple impacto (Social / Ambiental / Económico) | Pasa a ser **Mi impacto**, enfocado en la persona como en el wireframe: perfil, puntos, desafíos completados, personas conectadas, una grilla de impacto ambiental (árboles, kg reciclados, compost, CO₂), el anillo "Tu progreso", el nivel y el comercio aliado. **Se elimina la pestaña Económico** porque explica la app y no a la persona. |
| 9 | Panel Bienestar (vista institución) | Ver **[DECIDIR]** abajo. Se quitan los datos que suenan clínicos: "62 derivados desde Tutorías" y el "antes y después de energía" presentado como resultado. |
| 10 | Modelo de ingresos | **Sale de la app** y pasa a la landing (sección 05). |
| 11 | Pausa sin pantalla (respiración) | Se mantiene con un **rediseño visual**, presentada como "pausa", sin prometer efectos sobre la salud. |
| nuevo | — | **Beneficios** al estilo Pasito (ver abajo). |

**Barra de pestañas:** Inicio · Desafíos · (Sellar, botón central) · Comunidad · Mi impacto.

**[DECIDIR] Punto 9, Panel Bienestar.** Cuando dijiste "fusionarlo con la anterior", ¿a qué te referías?
- (a) Mi impacto tiene un interruptor "Vista institución" que muestra el panel liviano: participación, actividades realizadas y aportes de aliados.
- (b) El panel se elimina de la app y sus métricas pasan a la landing, junto al Lean Canvas.
- (c) Otra cosa.

### Logo nuevo

Un brote de tres hojas, en la línea del wireframe pero propio: dos hojas verdes, una clara y el tallo que forma una "D" o un sello circular. Va en SVG dibujado a mano, con la variante para el ícono de la app. Te muestro 2 o 3 opciones antes de aplicarlo.

### Beneficios (inspirado en Pasito)

- Cada desafío sellado suma puntos, y los puntos se canjean en **comercios de San Justo, cerca de la UNLaM**.
- Para canjear: elegís el beneficio, el comercio te da un **código de 4 dígitos** (como en Pasito) y queda canjeado. Hay un límite de 1 canje por comercio cada 15 días, para repartir el canje entre locales.
- Rubros (mock): **vivero** (dato a confirmar: el Hospital Italiano de San Justo tiene vivero), cafetería, librería y fotocopiadora, gimnasio, bicicletería y ONG (donar tus puntos).
- Para el comercio, el beneficio es que lo encuentran estudiantes que caminan por la zona. Esto se conecta con el modelo de negocio: el comercio aporta el beneficio o patrocina el desafío.
- Se entra desde la tarjeta "Tus puntos" del inicio y desde Mi impacto.

### Salud mental: criterios para toda la app

- Se habla de **bienestar, pausas, conexión y pertenencia**. Nunca de diagnosticar, tratar ni "mejorar tu salud mental".
- No hay consejos directos. Los textos del check-in pasan de "Semana pesada, probá una pausa…" a frases neutras que solo sugieren actividades.
- Cada dato de salud lleva **su fuente** (tarjetas de evidencia).
- Hay un acceso fijo y discreto a **Bienestar Estudiantil UNLaM**, como derivación a profesionales y no como un servicio propio.
- Pie de página en la landing: *"Desafío Bienestar promueve hábitos y vínculos saludables. No reemplaza la atención de profesionales de la salud."*

---

## 3. Marco teórico (para la sección 04 de la landing y el documento)

Están verificadas contra la fuente las primeras tres y la 5; las demás las cito de memoria y **hay que chequearlas antes de entregar**.

1. **Burnout académico**: Maslach & Jackson (1981), el concepto y el MBI. Schaufeli, Martínez, Marques Pinto, Salanova & Bakker (2002), *Journal of Cross-Cultural Psychology*: el burnout también se da en estudiantes (agotamiento, cinismo, baja eficacia). Es la base del problema.
2. **Actividad física y depresión**: Pearce et al. (2022), *JAMA Psychiatry*, 79(6), 550–559. Es un metaanálisis de 15 estudios con unas 191.000 personas. La dosis recomendada (equivalente a unas 2,5 h por semana de caminata ligera) se asocia con un 25% menos de riesgo de depresión, y la mitad de esa dosis con un 18% menos. Es el dato de la foto.
3. **Espacios verdes**: Twohig-Bennett & Jones (2018), *Environmental Research*. Revisión de 143 estudios: más exposición a espacios verdes se asocia con menos cortisol salival (un marcador de estrés).
4. **Ejercicio en espacios verdes y burnout universitario**: un estudio con universitarios chinos (2025, PMC12823991) encontró que el ejercicio al aire libre se asocia con menos burnout académico, en parte por la conexión con la naturaleza. Es de diseño transversal.
5. **Huerta y jardinería**: Soga, Gaston & Yamaura (2017), *Preventive Medicine Reports*, 5, 92–99. Metaanálisis de 22 estudios: menos depresión y ansiedad, y más satisfacción con la vida y sentido de comunidad.
6. **Vínculos sociales**: Holt-Lunstad, Smith & Layton (2010), *PLoS Medicine*. Las relaciones sociales fuertes se asocian con un 50% más de probabilidad de supervivencia. *(a verificar)*
7. **Menos pantallas**: Hunt et al. (2018), *Journal of Social and Clinical Psychology*. Limitar las redes a unos 30 min por día redujo la soledad y la depresión en estudiantes universitarios. *(a verificar)* Sustenta los desafíos de "Desconexión".
8. **Voluntariado**: Jenkinson et al. (2013), *BMC Public Health*, revisión sistemática: el voluntariado se asocia con menos depresión y más bienestar. *(a verificar)* Sustenta la categoría "Solidaria".

**Límite honesto (para decirlo en la defensa):** la mayoría de esta evidencia es observacional. No probamos que la app cause bienestar. Como próximo paso proponemos medir en el piloto con un instrumento validado (por ejemplo, el MBI-SS antes y después) y con el aval de profesionales de Bienestar Estudiantil.

---

## 4. Orden de trabajo propuesto

1. Landing: secciones en un viewport (FODA, Empatía, Canvas). Es rápido y no depende de las decisiones abiertas.
2. Logo: 2 o 3 opciones para que elijas.
3. App: eliminar pantallas, reordenar el inicio y armar Mi impacto y Beneficios.
4. Landing: sección 04 Fundamentos y 05 Cómo se sostiene.
5. Revisar los textos de salud mental en toda la app y volver a publicar en Vercel.

---

## 5. Feedback a otros grupos (útil para nosotros)

Cada punto dice qué le dijeron al grupo y qué significa para nosotros.

| Grupo / tema | Lo que dijeron | Qué tomamos |
|---|---|---|
| **Unipausa** (salud mental, organizador de estudio con alertas de estrés) | *"Todo lo que tiene que ver con salud mental es súper delicado"*. Si diagnostican, tiene que haber médicos. Investigar **leyes y antecedentes** de otras apps. Preguntaron con qué respaldo profesional se valida. Notaron que *"se nota que está todo hecho con IA"* y que el equipo mostraba dos enfoques distintos. | Es la crítica más cercana a nosotros. **No detectamos estrés ni damos ejercicios "para el ataque de pánico"**. En Fundamentos citamos la **Ley de Salud Mental 26.657** y la **Ley de Protección de Datos Personales 25.326** (el check-in de energía es un dato sensible: privado, opcional y anónimo para la institución). El diseño y los textos tienen que tener **impronta propia**, y los 6 integrantes tienen que poder defender lo mismo. |
| **Eficiencia energética IT** (grupo 1) | Elogiaron la **sección de cálculos con fuentes**: de dónde sale cada número (ENRE, Subsecretaría de Energía). Sugirieron la **responsabilidad social empresarial** como argumento de venta. | Cada número de "Mi impacto" (CO₂ por árbol, kg reciclados) tiene que decir **cómo se calcula y de dónde sale**: un "¿Cómo lo calculamos?" chico. Les vendemos a los comercios aliados como **RSE con impacto local medible**. |
| **Ciberseguridad para municipios** (grupo 2) | El slogan no se entendía ("SOC propio", demasiado técnico). Un slogan tiene que caracterizar el producto. | "Poco tiempo, mucho impacto" está bien. Revisar que el slogan rotativo no tenga frases vacías. |
| **Gestión del tiempo para estudiantes que trabajan** (grupo 5) | La propuesta de valor **no tiene que dejar afuera** a nadie del segmento: mejor "a tus tiempos" que "para los que trabajan". Ojo con los **datos sin fuente** (el desgranamiento de la UNLaM no es el de la UBA). El profe contó que a un grupo le dijo que su logo era feo. | Confirma sacar lo de "entre clases": que sirva a cualquier estudiante, con cualquier horario. Ningún dato sin fuente. El logo importa. |
| **Accesibilidad de documentos** (grupos 1 y 6) | Si alguien pregunta "¿qué hace?", tiene que quedar **claro de entrada para quién es**. Sugirieron **probarlo con estudiantes reales** y mostrar una demo real en el video. | En la bienvenida y en la landing, en una línea: *para quién* (estudiantes), *qué* (desafíos cortos en grupo) y *quién paga* (la universidad). Probar el MVP con 5 a 10 compañeros y mostrar sus reacciones en el video. |
| **Chat de información de la facu** (grupo 8) | *"No le veo el lado innovador"*. Si se vende a universidades, que sea **genérico**: la UNLaM como caso modelo, no hecho a medida con su logo. Preguntaron **quién carga la información**. | La UNLaM es el **piloto**, no el producto. En la landing y en el modelo de negocio aclarar que se adapta a cualquier universidad (marca blanca). Responder **quién carga los desafíos**: Bienestar, Extensión, el Centro de Estudiantes y los comercios desde su panel, y los estudiantes proponen. |

**Para todo el curso:**
- El video es un **comercial o pitch de negocio**, no dos minutos hablando a cámara. Tiene que **mostrar la solución (los mockups)**. No hacerlo todo con IA (personas o voces generadas): un video anterior tuvo que rehacerse.
- Conviene **validar antes**: si el día de la defensa aparece algo que debía estar corregido, se puede desaprobar y no hay recuperatorio.
- Se exige el **75% de asistencia**. La clase que viene es asincrónica y se trabaja con los avances. Las consultas por equipo se hacen por MIeL.
- En el pase de lista del Grupo 7 mencionaron que Donaire se dio de baja.
