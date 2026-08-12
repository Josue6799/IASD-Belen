/* ========================================
   LMS - SISTEMA DE EVALUACIÓN Y CURSOS
   IASD Belén · Iglesia Adventista
   ======================================== */

// ===== BASE DE DATOS DE EXÁMENES (DATOS INICIALES DE EJEMPLO) =====
let DB_EXAMENES = [];
let nextExamId = 200;

const DB_EXAMENES_DEFAULT = [
    {
        id: 101,
        curso: 'Obra Misionera',
        titulo: 'Examen Módulo 1: Introducción a la Obra Misionera',
        fecha: '01/02/2026',
        fechaFinal: '31/12/2026',
        preguntas: [
            {
                tipo: 'multiple',
                texto: '¿Cuál es la Gran Comisión encomendada por Jesús en Mateo 28:19-20?',
                opciones: [
                    'Ir y hacer discípulos a todas las naciones',
                    'Construir grandes templos solamente',
                    'Esperar en silencio sin predicar',
                    'Guardar la verdad solo para nosotros'
                ],
                correcta: 'A',
                explicacion: 'Jesús comisionó a sus discípulos a ir por todo el mundo predicando el evangelio y bautizando.'
            },
            {
                tipo: 'vf',
                texto: 'El evangelismo personal incluye mostrar compasión y simpatía sincera por las personas.',
                correcta: 'Verdadero',
                explicacion: 'El método de Cristo es el único que da verdadero éxito en llegar a las personas.'
            },
            {
                tipo: 'corta',
                texto: 'Mencione brevemente dos métodos prácticos para compartir el evangelio en su comunidad.',
                correcta: 'Estudios bíblicos en hogares, proyectos de servicio comunitario o testimonio personal.',
                explicacion: 'Criterio: El alumno debe mencionar métodos prácticos de evangelismo.'
            }
        ],
        preguntasBanco: [],
        cantidadPreguntas: 3
    },
    {
        id: 102,
        curso: 'Profecía',
        titulo: 'Examen Módulo 1: Principios Proféticos de Daniel y Apocalipsis',
        fecha: '01/02/2026',
        fechaFinal: '31/12/2026',
        preguntas: [
            {
                tipo: 'multiple',
                texto: '¿Qué representa el principio profético día por año (Números 14:34, Ezequiel 4:6)?',
                opciones: [
                    'Un día profético equivale a un año literal',
                    'Un día equivale a 1000 años',
                    'Las profecías no tienen tiempo preciso',
                    'Un año equivale a un mes profético'
                ],
                correcta: 'A',
                explicacion: 'En la interpretación profética historicista, cada día profético simboliza un año solar literal.'
            },
            {
                tipo: 'vf',
                texto: 'El primer mensaje del ángel en Apocalipsis 14 anuncia que la hora de su juicio ha llegado.',
                correcta: 'Verdadero',
                explicacion: 'Apocalipsis 14:7 llama a temer a Dios y darle gloria porque la hora de su juicio ha llegado.'
            }
        ],
        preguntasBanco: [],
        cantidadPreguntas: 2
    }
];

function generarNuevoId() {
    let maxId = 0;
    DB_EXAMENES.forEach(ex => {
        if (ex.id && parseInt(ex.id, 10) > maxId) maxId = parseInt(ex.id, 10);
    });
    if (maxId >= nextExamId) nextExamId = maxId + 1;
    return nextExamId++;
}

// ===== BASE DE DATOS DE EXÁMENES REALIZADOS =====
let EXAMENES_REALIZADOS = [];

function cargarExamenesRealizados() {
    try {
        const data = localStorage.getItem('examenesRealizados');
        EXAMENES_REALIZADOS = data ? JSON.parse(data) : [];
    } catch (e) {
        EXAMENES_REALIZADOS = [];
    }
}

function guardarExamenesRealizados() {
    try {
        localStorage.setItem('examenesRealizados', JSON.stringify(EXAMENES_REALIZADOS));
    } catch (e) {
        console.warn('⚠️ Error guardando exámenes realizados:', e);
    }
}

// ===== PLAN DE ESTUDIOS Y AYUDAS =====
const PLAN_ESTUDIOS_DEFAULT = {
    'Obra Misionera': {
        temas: ['1. Introducción a la Obra Misionera', '2. El llamado divino y preparación espiritual', '3. Métodos prácticos de evangelismo personal', '4. Testimonio eficaz y estudio bíblico en hogares'],
        ayudas: [
            { titulo: 'El Evangelismo - Elena G. de White', tipo: 'libro', url: 'https://egwwritings.org/', descripcion: 'Lectura fundamental sobre el método adventista de evangelizar.' },
            { titulo: 'Video: Cómo dar estudios bíblicos', tipo: 'video', url: 'https://www.youtube.com/', descripcion: 'Guía práctica para impartir fe en la comunidad.' }
        ]
    },
    'Profecía': {
        temas: ['1. Principios de interpretación profética', '2. El libro de Daniel y las 70 semanas', '3. Apocalipsis: El conflicto cósmico', '4. El mensaje de los Tres Ángeles'],
        ayudas: [
            { titulo: 'El Conflicto de los Siglos', tipo: 'pdf', url: 'https://egwwritings.org/', descripcion: 'Compendio histórico de las profecías bíblicas.' },
            { titulo: 'Línea de tiempo de los 2300 días', tipo: 'enlace', url: '#', descripcion: 'Gráfico explicativo de Daniel 8:14.' }
        ]
    },
    'Predica': {
        temas: ['1. Homilética y estructura del sermón', '2. Hermenéutica y exégesis bíblica', '3. El uso de ilustraciones y el llamado', '4. Comunicación corporal y tono de voz'],
        ayudas: [
            { titulo: 'Manual del Orador Sagrado', tipo: 'libro', url: '#', descripcion: 'Técnicas de preparación de sermones expositivos.' },
            { titulo: 'Audio: Ejemplo de Sermón Expositivo', tipo: 'audio', url: '#', descripcion: 'Demostración práctica de sermón.' }
        ]
    },
    'Aventureros': {
        temas: ['1. Especialidad de nudos y amarras', '2. Cuidado de la naturaleza y creación', '3. Ley y Voto del Aventurero', '4. Arte campestre y manualidades'],
        ayudas: [
            { titulo: 'Manual Administrativo de Aventureros', tipo: 'pdf', url: '#', descripcion: 'Guía oficial para consejeros y líderes.' }
        ]
    },
    'Conquistadores': {
        temas: ['1. Clases progresivas y requisitos', '2. Primeros auxilios y vendajes', '3. Orientación con brújula y mapa', '4. Historia de la iglesia e hitos'],
        ayudas: [
            { titulo: 'Manual del Conquistador', tipo: 'libro', url: '#', descripcion: 'Requisitos de especialidades y marchas.' }
        ]
    },
    'Guías Mayores': {
        temas: ['1. Liderazgo juvenil cristiano', '2. Técnicas de campamento avanzadas', '3. Psicología del adolescente y consejería', '4. Proyectos comunitarios e impacto'],
        ayudas: [
            { titulo: 'Manual de Guía Mayor', tipo: 'pdf', url: '#', descripcion: 'Tarjeta de investidura y currículum de liderazgo.' }
        ]
    }
};

function obtenerPlanEstudios() {
    try {
        const data = localStorage.getItem('plan_estudios');
        if (data) return JSON.parse(data);
        localStorage.setItem('plan_estudios', JSON.stringify(PLAN_ESTUDIOS_DEFAULT));
        return PLAN_ESTUDIOS_DEFAULT;
    } catch (e) {
        return PLAN_ESTUDIOS_DEFAULT;
    }
}

function guardarPlanEstudios(planData) {
    try {
        localStorage.setItem('plan_estudios', JSON.stringify(planData));
    } catch (e) {
        console.warn('⚠️ Error guardando plan de estudios:', e);
    }
}

// ===== DATOS DE CURSOS =====
const CURSOS_DATA = {
    'Obra Misionera': {
        icono: '🕊️',
        descripcion: 'Aprende a compartir tu fe y llevar el mensaje de esperanza a otros.',
        temas: ['Introducción a la Obra Misionera', 'El llamado de Dios', 'Preparación espiritual', 'Métodos de evangelismo', 'Testimonio personal'],
        ayudas: '📖 Material de estudio: El evangelismo de Elena G. de White'
    },
    'Profecía': {
        icono: '📖',
        descripcion: 'Estudia las profecías bíblicas y su cumplimiento en la historia.',
        temas: ['Introducción a la Profecía', 'Daniel y el tiempo del fin', 'Apocalipsis y el conflicto cósmico', 'Las 70 semanas y los 2300 días', 'El mensaje de los tres ángeles'],
        ayudas: '📖 Material de estudio: El conflicto de los siglos'
    },
    'Predica': {
        icono: '🎤',
        descripcion: 'Desarrolla tus habilidades de oratoria y comunicación efectiva.',
        temas: ['Introducción a la Predicación', 'La estructura del sermón', 'El arte de contar historias', 'Uso de ilustraciones', 'La llamada al altar'],
        ayudas: '📖 Material de estudio: La oratoria sagrada'
    },
    'Aventureros': {
        icono: '<img src="img/aventureros.png" alt="Aventureros" style="width: 50px; height: auto; object-fit: contain;">',
        descripcion: 'Actividades, valores y aprendizaje para los más pequeños.',
        temas: ['Especialidad de nudos', 'Cuidado de la naturaleza', 'Valores cristianos', 'Juegos y dinámicas', 'Manualidades bíblicas'],
        ayudas: '📖 Material de estudio: Manual del Aventurero.'
    },
    'Conquistadores': {
        icono: '<img src="img/conquistadores.jpg" alt="Conquistadores" style="width: 50px; height: auto; object-fit: contain;">',
        descripcion: 'Campismo, especialidades y servicio para jóvenes de 10 a 15 años.',
        temas: ['Clase de liderazgo', 'Campamento de verano', 'Especialidad de primeros auxilios', 'Proyecto de servicio comunitario', 'Historia del club'],
        ayudas: '📖 Material de estudio: Manual del Conquistador.'
    },
    'Guías Mayores': {
        icono: '<img src="img/guias.png" alt="Guías Mayores" style="width: 50px; height: auto; object-fit: contain;">',
        descripcion: 'Liderazgo espiritual y desarrollo personal para jóvenes de 16 años en adelante.',
        temas: ['Técnicas de campamento avanzadas', 'Liderazgo juvenil', 'Consejería espiritual', 'Proyectos de impacto social', 'Preparación para el liderazgo en la iglesia'],
        ayudas: '📖 Material de estudio: Manual del Guía Mayor.'
    }
};

// ===== LOGROS E INSIGNIAS =====
const LOGROS_DEFINICIONES = [
    { id: 'primer_paso', titulo: '🌱 Primer Paso', descripcion: 'Inscribirse en tu primer curso espiritual.', icono: '🌱', categoria: 'Inscripción', evaluar: (identidad, misCursos, realizados) => misCursos.length >= 1 },
    { id: 'estudiante_constante', titulo: '📚 Estudiante Constante', descripcion: 'Estar inscrito en 3 o más cursos simultáneamente.', icono: '📚', categoria: 'Inscripción', evaluar: (identidad, misCursos, realizados) => misCursos.length >= 3 },
    { id: 'maestro_doctrina', titulo: '🎓 Maestro de la Fe', descripcion: 'Inscribirse en los 6 cursos del programa educativo.', icono: '🎓', categoria: 'Inscripción', evaluar: (identidad, misCursos, realizados) => misCursos.length >= 6 },
    { id: 'primer_examen', titulo: '✍️ Valentía Bíblica', descripcion: 'Rendir y entregar tu primer examen en el LMS.', icono: '✍️', categoria: 'Evaluación', evaluar: (identidad, misCursos, realizados) => realizados.length >= 1 },
    { id: 'mente_brillante', titulo: '⚡ Mente Brillante', descripcion: 'Obtener un 5.0 perfecto en cualquier examen.', icono: '⚡', categoria: 'Excelencia', evaluar: (identidad, misCursos, realizados) => realizados.some(r => r.calificacion === 5.0) },
    { id: 'misionero_fiel', titulo: '🕊️ Misionero Fiel', descripcion: 'Aprobar un examen del curso Obra Misionera (nota ≥ 4.0).', icono: '🕊️', categoria: 'Cursos', evaluar: (identidad, misCursos, realizados) => realizados.some(r => r.curso === 'Obra Misionera' && r.calificacion >= 4.0) },
    { id: 'profeta_sabio', titulo: '📖 Profeta Sabio', descripcion: 'Aprobar un examen del curso Profecía (nota ≥ 4.0).', icono: '📖', categoria: 'Cursos', evaluar: (identidad, misCursos, realizados) => realizados.some(r => r.curso === 'Profecía' && r.calificacion >= 4.0) },
    { id: 'orador_celestial', titulo: '🎤 Orador Celestial', descripcion: 'Aprobar un examen del curso Prédica (nota ≥ 4.0).', icono: '🎤', categoria: 'Cursos', evaluar: (identidad, misCursos, realizados) => realizados.some(r => r.curso === 'Predica' && r.calificacion >= 4.0) },
    { id: 'aventurero_ejemplar', titulo: '🌟 Aventurero Ejemplar', descripcion: 'Aprobar un examen del club de Aventureros (nota ≥ 4.0).', icono: '🌟', categoria: 'Clubes', evaluar: (identidad, misCursos, realizados) => realizados.some(r => r.curso === 'Aventureros' && r.calificacion >= 4.0) },
    { id: 'conquistador_victorioso', titulo: '🧭 Conquistador Victorioso', descripcion: 'Aprobar un examen del club de Conquistadores (nota ≥ 4.0).', icono: '🧭', categoria: 'Clubes', evaluar: (identidad, misCursos, realizados) => realizados.some(r => r.curso === 'Conquistadores' && r.calificacion >= 4.0) },
    { id: 'guia_lider', titulo: '👑 Guía Mayor Líder', descripcion: 'Aprobar un examen del club de Guías Mayores (nota ≥ 4.0).', icono: '👑', categoria: 'Clubes', evaluar: (identidad, misCursos, realizados) => realizados.some(r => r.curso === 'Guías Mayores' && r.calificacion >= 4.0) },
    {
        id: 'gran_promedio', titulo: '🏆 Excelencia Académica', descripcion: 'Mantener un promedio general igual o superior a 4.5.', icono: '🏆', categoria: 'Excelencia', evaluar: (identidad, misCursos, realizados) => {
            const califs = realizados.map(r => r.calificacion).filter(c => typeof c === 'number' && !isNaN(c));
            if (califs.length === 0) return false;
            return (califs.reduce((a, b) => a + b, 0) / califs.length) >= 4.5;
        }
    }
];

// ===== VARIABLES DE ESTADO =====
let modoAdminActivo = false;
let cursoSeleccionadoRevision = 'todos';
let editandoExamenIndex = -1;
let examenActualParaRendir = null;

// ===== CONTROL CENTRALIZADO DE SCROLL Y MODALES (SOLUCIÓN DEFINITIVA CON VISIBILIDAD GARANTIZADA) =====
const modalesAbiertos = new Set();

function mostrarElementoModal(el) {
    if (!el) return;
    el.classList.add('active');
    el.style.display = 'flex';
    el.style.visibility = 'visible';
    el.style.opacity = '1';
    el.style.zIndex = '100050';
}

function ocultarElementoModal(el) {
    if (!el) return;
    el.classList.remove('active');
    el.style.display = 'none';
    el.style.visibility = 'hidden';
    el.style.opacity = '0';
}

function bloquearScroll(idModal) {
    if (idModal) modalesAbiertos.add(idModal);
    document.body.style.overflow = 'hidden';
    const dashboard = document.getElementById('dashboardEvaluacion');
    if (dashboard && dashboard.style.display !== 'none') {
        dashboard.style.overflow = 'hidden';
    }
}

function desbloquearScroll(idModal) {
    if (idModal) modalesAbiertos.delete(idModal);

    const modalesOverlay = document.querySelectorAll('.modal-overlay');
    let hayVisibles = false;
    modalesOverlay.forEach(m => {
        if (m.classList.contains('active')) hayVisibles = true;
        const styleDisplay = m.style.display || window.getComputedStyle(m).display;
        const visibility = m.style.visibility || window.getComputedStyle(m).visibility;
        if ((styleDisplay === 'flex' || styleDisplay === 'block') && visibility !== 'hidden') {
            hayVisibles = true;
        }
    });

    if (modalesAbiertos.size === 0 && !hayVisibles) {
        const dashboard = document.getElementById('dashboardEvaluacion');
        if (dashboard && dashboard.style.display !== 'none') {
            document.body.style.overflow = 'hidden';
            dashboard.style.overflow = 'auto';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Listener Tecla Escape: Cierra modales sin causar doble barra de desplazamiento
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => {
            ocultarElementoModal(m);
        });
        modalesAbiertos.clear();

        const dashboard = document.getElementById('dashboardEvaluacion');
        if (dashboard && dashboard.style.display !== 'none') {
            document.body.style.overflow = 'hidden';
            dashboard.style.overflow = 'auto';
        } else {
            document.body.style.overflow = '';
        }
    }
});

// ===== IDENTIDAD DEL ALUMNO =====
function obtenerIdentidadAlumno() {
    try {
        const data = localStorage.getItem('alumnoIdentidad');
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
}

function guardarIdentidadAlumno(nombre, documento, grupo = 'Clase Belén') {
    const identidad = { nombre, documento, whatsapp: documento, grupo };
    localStorage.setItem('alumnoIdentidad', JSON.stringify(identidad));
    return identidad;
}

function examenYaRealizado(curso, tituloExamen) {
    const identidad = obtenerIdentidadAlumno();
    if (!identidad || !identidad.nombre) return false;

    cargarExamenesRealizados();
    return EXAMENES_REALIZADOS.some(ex =>
        ex.curso === curso &&
        ex.titulo === tituloExamen &&
        (ex.alumnoNombre === identidad.nombre || ex.alumnoDocumento === identidad.documento)
    );
}

// ===== PERSISTENCIA Y CURSOS =====
function cargarExamenesDesdeStorage() {
    try {
        const data = localStorage.getItem('db_examenes');
        if (data) {
            const parsed = JSON.parse(data);
            if (Array.isArray(parsed) && parsed.length > 0) {
                DB_EXAMENES = parsed.filter(ex => ex && ex.titulo);
                DB_EXAMENES.forEach(ex => { if (!ex.id) ex.id = generarNuevoId(); });
                return;
            }
        }
        DB_EXAMENES = JSON.parse(JSON.stringify(DB_EXAMENES_DEFAULT));
        guardarExamenesEnStorage();
    } catch (e) {
        DB_EXAMENES = JSON.parse(JSON.stringify(DB_EXAMENES_DEFAULT));
    }
}

function guardarExamenesEnStorage() {
    try {
        localStorage.setItem('db_examenes', JSON.stringify(DB_EXAMENES));
    } catch (e) {
        console.warn('⚠️ Error guardando exámenes:', e);
    }
}

function obtenerMisCursos() {
    try {
        const data = localStorage.getItem('misCursos');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function guardarMisCursos(cursos) {
    localStorage.setItem('misCursos', JSON.stringify(cursos));
}

function inscribirCurso(curso) {
    let cursos = obtenerMisCursos();
    if (!cursos.includes(curso)) {
        if (cursos.length >= 6) {
            mostrarToast('⚠️ Máximo 6 cursos permitidos simultáneamente', 'warning');
            return false;
        }
        cursos.push(curso);
        guardarMisCursos(cursos);
        evaluarYGuardarLogros(obtenerIdentidadAlumno());
        return true;
    }
    return false;
}

function desinscribirCurso(curso) {
    let cursos = obtenerMisCursos();
    cursos = cursos.filter(c => c !== curso);
    guardarMisCursos(cursos);
}

// ===== NOTIFICACIONES TOAST =====
function mostrarToast(mensaje, tipo = 'info') {
    const existe = document.getElementById('lmsToast');
    if (existe) existe.remove();

    const toast = document.createElement('div');
    toast.id = 'lmsToast';
    let bgColor = '#1a3a4a';
    if (tipo === 'success') bgColor = '#2e7d32';
    if (tipo === 'warning') bgColor = '#f57c00';
    if (tipo === 'error') bgColor = '#c62828';

    toast.style.cssText = `
        position: fixed;
        bottom: 5rem;
        left: 50%;
        transform: translateX(-50%);
        background: ${bgColor};
        color: white;
        padding: 0.8rem 1.6rem;
        border-radius: 2rem;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        font-weight: 600;
        z-index: 100090;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        animation: fadeInUp 0.3s ease forwards;
        display: flex;
        align-items: center;
        gap: 0.6rem;
    `;
    toast.innerHTML = mensaje;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== MODAL GENÉRICO CON CONTROL DE SCROLL =====
function mostrarModalGenerico(titulo, mensaje, botones = [], permitirCerrar = true) {
    cerrarModalGenerico();
    bloquearScroll('modalGenerico');

    const modal = document.createElement('div');
    modal.id = 'modalGenerico';
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100050;
        animation: fadeIn 0.3s ease;
        backdrop-filter: blur(5px);
    `;

    const botonesHTML = botones.map((btn, index) => {
        const esPrimario = index === 0;
        return `
            <button class="btn-modal-${index}" style="
                padding: 0.8rem 1.6rem;
                border-radius: 2rem;
                font-weight: 700;
                font-size: 0.9rem;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Inter', sans-serif;
                border: none;
                ${esPrimario ? `
                    background: linear-gradient(135deg, #d4a038 0%, #c9a53b 100%);
                    color: #1a3a4a;
                    box-shadow: 0 4px 15px rgba(212, 160, 56, 0.3);
                ` : `
                    background: transparent;
                    border: 2px solid #c9a53b;
                    color: #c9a53b;
                `}
                ${botones.length === 1 ? 'width: 100%;' : 'flex: 1; max-width: 180px;'}
            ">${btn.texto}</button>
        `;
    }).join('');

    modal.innerHTML = `
        <div class="modal-card" style="
            background: #ffffff;
            border-radius: 1.5rem;
            padding: 2rem 1.8rem;
            max-width: 440px;
            width: 90%;
            text-align: center;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
            animation: slideUp 0.3s ease;
            position: relative;
            border: 2px solid rgba(201, 165, 59, 0.3);
        ">
            ${permitirCerrar ? `
                <button onclick="cerrarModalGenerico()" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: transparent;
                    border: none;
                    font-size: 1.4rem;
                    color: #888;
                    cursor: pointer;
                ">&times;</button>
            ` : ''}
            <h3 style="color: #1a3a4a; font-size: 1.3rem; font-weight: 700; margin: 0 0 0.8rem 0; font-family: 'Inter', sans-serif;">${titulo}</h3>
            <div style="color: #5a6474; font-size: 0.95rem; line-height: 1.5; margin-bottom: 1.5rem; font-family: 'Inter', sans-serif;">${mensaje}</div>
            ${botones.length > 0 ? `<div style="display: flex; gap: 0.8rem; justify-content: center; flex-wrap: wrap;">${botonesHTML}</div>` : ''}
        </div>
    `;

    document.body.appendChild(modal);
    mostrarElementoModal(modal);

    botones.forEach((btn, index) => {
        const btnElement = modal.querySelector(`.btn-modal-${index}`);
        if (btnElement && btn.callback) {
            btnElement.addEventListener('click', () => {
                cerrarModalGenerico();
                btn.callback();
            });
        }
    });

    if (permitirCerrar) {
        modal.addEventListener('click', (e) => { if (e.target === modal) cerrarModalGenerico(); });
    }
}

function cerrarModalGenerico() {
    const modal = document.getElementById('modalGenerico');
    if (modal) {
        ocultarElementoModal(modal);
        modal.remove();
    }
    desbloquearScroll('modalGenerico');
}

// ===== MODAL DE BIENVENIDA TRAS INSCRIPCIÓN =====
function mostrarModalBienvenida(curso) {
    cerrarModalBienvenida();
    bloquearScroll('modalBienvenida');

    const modal = document.createElement('div');
    modal.id = 'modalBienvenida';
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.75);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100050;
        animation: fadeIn 0.3s ease;
        backdrop-filter: blur(5px);
    `;

    modal.innerHTML = `
        <div class="modal-card" style="
            background: #ffffff;
            border-radius: 1.5rem;
            padding: 2.2rem 1.8rem;
            max-width: 440px;
            width: 90%;
            text-align: center;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.4);
            animation: slideUp 0.3s ease;
            position: relative;
            border: 2px solid var(--golden);
        ">
            <div style="font-size: 3.5rem; margin-bottom: 0.5rem;">🎉</div>
            <h3 style="color: #1a3a4a; font-size: 1.4rem; font-weight: 800; margin: 0 0 0.8rem 0; font-family: 'Inter', sans-serif;">¡Bienvenido al Curso!</h3>
            <p style="color: #5a6474; font-size: 0.98rem; line-height: 1.5; margin-bottom: 1.6rem; font-family: 'Inter', sans-serif;">
                ✅ ¡Bienvenido a <strong>${curso}</strong>! Estás listo para comenzar tu aprendizaje y fortalecer tu fe.
            </p>
            <button onclick="cerrarModalBienvenida()" class="btn btn-golden" style="
                width: 100%;
                padding: 0.85rem;
                border-radius: 2rem;
                font-weight: 700;
                font-size: 0.95rem;
                cursor: pointer;
                font-family: 'Inter', sans-serif;
                border: none;
                background: linear-gradient(135deg, #d4a038 0%, #c9a53b 100%);
                color: #1a3a4a;
                box-shadow: 0 4px 15px rgba(212, 160, 56, 0.3);
            ">
                <i class="fas fa-check-circle"></i> Entendido
            </button>
        </div>
    `;

    document.body.appendChild(modal);
    mostrarElementoModal(modal);
}

function cerrarModalBienvenida() {
    const modal = document.getElementById('modalBienvenida');
    if (modal) {
        ocultarElementoModal(modal);
        modal.remove();
    }
    desbloquearScroll('modalBienvenida');
}

// ===== BOTÓN FLOTANTE "MODO ADMINISTRADOR" =====
function asegurarBotonFlotanteAdmin() {
    const dashboard = document.getElementById('dashboardEvaluacion');
    if (!dashboard) return;

    let btnAdmin = document.getElementById('btnAdminLMS');
    if (!btnAdmin) {
        btnAdmin = document.createElement('button');
        btnAdmin.id = 'btnAdminLMS';
        btnAdmin.innerHTML = '<i class="fas fa-cog"></i> Modo Administrador';
        document.body.appendChild(btnAdmin);
    }

    btnAdmin.onclick = function (e) {
        if (e) e.stopPropagation();
        abrirModalAdmin();
    };

    btnAdmin.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #2e7d32;
        color: white;
        padding: 0.75rem 1.4rem;
        border-radius: 2rem;
        border: none;
        font-family: 'Inter', sans-serif;
        font-weight: 700;
        font-size: 0.9rem;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(46,125,50,0.4);
        transition: all 0.3s ease;
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.6rem;
    `;
    btnAdmin.onmouseover = function () {
        this.style.transform = 'translateY(-3px) scale(1.05)';
        this.style.boxShadow = '0 8px 25px rgba(46,125,50,0.6)';
    };
    btnAdmin.onmouseout = function () {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 4px 15px rgba(46,125,50,0.4)';
    };

    const isVisible = dashboard.style.display !== 'none' && !modoAdminActivo;
    btnAdmin.style.display = isVisible ? 'flex' : 'none';
}

// ===== NAVEGACIÓN Y APERTURA DE EVALUACIÓN =====
function abrirModalEvaluacion() {
    const modal = document.getElementById('modalEvaluacion');
    if (modal) {
        bloquearScroll('modalEvaluacion');
        mostrarElementoModal(modal);
        const pwdInput = document.getElementById('inputPasswordEvaluacion');
        if (pwdInput) pwdInput.value = '';
        const errDiv = document.getElementById('errorPasswordEvaluacion');
        if (errDiv) errDiv.style.display = 'none';
        setTimeout(() => { if (pwdInput) pwdInput.focus(); }, 300);
    }
}

function verificarPasswordEvaluacion() {
    const pwdInput = document.getElementById('inputPasswordEvaluacion');
    const password = pwdInput ? pwdInput.value.trim() : '';
    if (password === 'eval2026') {
        cerrarModalEvaluacion();
        abrirDashboard();
    } else {
        const errorDiv = document.getElementById('errorPasswordEvaluacion');
        if (errorDiv) errorDiv.style.display = 'block';
        if (pwdInput) {
            pwdInput.value = '';
            pwdInput.focus();
        }
    }
}

function cerrarModalEvaluacion() {
    const modal = document.getElementById('modalEvaluacion');
    if (modal) {
        ocultarElementoModal(modal);
        const pwdInput = document.getElementById('inputPasswordEvaluacion');
        if (pwdInput) pwdInput.value = '';
        const errDiv = document.getElementById('errorPasswordEvaluacion');
        if (errDiv) errDiv.style.display = 'none';
    }
    desbloquearScroll('modalEvaluacion');
}

function abrirDashboard() {
    cargarExamenesDesdeStorage();
    cargarExamenesRealizados();
    sincronizarOfflinePending();

    const dashboard = document.getElementById('dashboardEvaluacion');
    if (dashboard) {
        dashboard.style.display = 'block';
        dashboard.style.overflow = 'auto';
        document.body.style.overflow = 'hidden';
    }

    asegurarBotonFlotanteAdmin();
    actualizarBadgesNotificaciones();
    cambiarPestalla('principal');
}

function cerrarDashboard() {
    const dashboard = document.getElementById('dashboardEvaluacion');
    if (dashboard) {
        dashboard.style.display = 'none';
    }
    document.body.style.overflow = '';
    asegurarBotonFlotanteAdmin();
    cerrarSesionAdmin();
}

function cambiarPestalla(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    const target = document.getElementById('contenido' + tab.charAt(0).toUpperCase() + tab.slice(1));
    if (target) target.style.display = 'block';

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--muted-text)';
    });
    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
    if (activeBtn) {
        activeBtn.style.background = 'var(--golden)';
        activeBtn.style.color = 'var(--deep-blue)';
    }

    if (tab === 'principal') renderizarPrincipal();
    if (tab === 'cursos') renderizarCursos();
    if (tab === 'revision') renderizarRevision();
    if (tab === 'logros') renderizarLogros();
    if (tab === 'grupo') renderizarGrupo();
}

// ===== PESTAÑA PRINCIPAL =====
function renderizarPrincipal() {
    const container = document.getElementById('contenidoExamenes');
    if (!container) return;

    const misCursos = obtenerMisCursos();
    const identidad = obtenerIdentidadAlumno();
    cargarExamenesRealizados();

    if (misCursos.length === 0) {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; padding: 3rem 2rem; text-align: center;">
                <div style="font-size: 3.5rem;">📚</div>
                <h3 style="color: var(--deep-blue); font-size: 1.2rem; margin: 0; font-family: 'Inter', sans-serif;">No estás inscrito en ningún curso</h3>
                <p style="color: var(--muted-text); font-size: 0.9rem; margin: 0; font-family: 'Inter', sans-serif;">Explora el catálogo de cursos e inscríbete para poder rendir exámenes.</p>
                <button onclick="cambiarPestalla('cursos')" class="btn btn-golden" style="margin-top: 0.5rem; padding: 0.7rem 1.8rem; border-radius: 2rem; border: none; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; background: var(--golden); color: var(--deep-blue);">
                    <i class="fas fa-arrow-right"></i> Ver Catálogo de Cursos
                </button>
            </div>
        `;
        return;
    }

    let cursosHTML = '';

    misCursos.forEach(curso => {
        const examenesCurso = DB_EXAMENES.filter(ex => ex.curso === curso);
        const data = CURSOS_DATA[curso] || { icono: '📚' };

        let examenesHTML = '';
        if (examenesCurso.length === 0) {
            examenesHTML = `
                <div style="padding: 0.6rem 0; color: var(--muted-text); font-size: 0.85rem; font-style: italic;">
                    🔒 No hay exámenes publicados para este curso actualmente.
                </div>
            `;
        } else {
            examenesHTML = examenesCurso.map((examen) => {
                const yaRealizado = identidad ? examenYaRealizado(curso, examen.titulo) : false;

                if (yaRealizado) {
                    return `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid rgba(0,0,0,0.04); flex-wrap: wrap; gap: 0.5rem;">
                            <span style="color: var(--dark-text); font-size: 0.9rem; font-weight: 500;">
                                <i class="fas fa-file-alt" style="color: var(--golden); margin-right: 0.5rem;"></i>
                                ${examen.titulo}
                            </span>
                            <button disabled style="background: #e8f5e9; color: #2e7d32; padding: 0.35rem 1rem; border: 1px solid #c8e6c9; border-radius: 2rem; font-weight: 600; cursor: not-allowed; font-size: 0.8rem; display: flex; align-items: center; gap: 0.4rem;">
                                <i class="fas fa-check-circle"></i> Realizado
                            </button>
                        </div>
                    `;
                } else {
                    return `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid rgba(0,0,0,0.04); flex-wrap: wrap; gap: 0.5rem;">
                            <span style="color: var(--dark-text); font-size: 0.9rem; font-weight: 500;">
                                <i class="fas fa-file-alt" style="color: var(--golden); margin-right: 0.5rem;"></i>
                                ${examen.titulo}
                                ${examen.fechaFinal ? `<br><small style="color: #888; font-size: 0.75rem;"><i class="far fa-clock"></i> Límite: ${examen.fechaFinal}</small>` : ''}
                            </span>
                            <button onclick="confirmarInicioExamen('${examen.id}')" 
                                style="background: var(--golden); color: var(--deep-blue); padding: 0.4rem 1.2rem; border: none; border-radius: 2rem; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.8rem; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.4rem;"
                                onmouseover="this.style.transform='scale(1.05)';"
                                onmouseout="this.style.transform='scale(1)';">
                                <i class="fas fa-play"></i> Tomar Examen
                            </button>
                        </div>
                    `;
                }
            }).join('');
        }

        cursosHTML += `
            <div style="background: var(--pure-white); border-radius: 1.2rem; padding: 1.3rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border-left: 4px solid var(--golden); margin-bottom: 1.2rem;">
                <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem;">
                    <div style="display: flex; justify-content: center; align-items: center; min-width: 50px;">${data.icono}</div>
                    <div>
                        <h3 style="color: var(--deep-blue); margin: 0; font-size: 1.1rem; font-family: 'Inter', sans-serif;">${curso}</h3>
                        <span style="color: var(--muted-text); font-size: 0.8rem;">${examenesCurso.length} examen(es) disponible(s)</span>
                    </div>
                </div>
                <div>${examenesHTML}</div>
            </div>
        `;
    });

    container.innerHTML = cursosHTML;
}

// ===== PESTAÑA CURSOS =====
function renderizarCursos() {
    const container = document.getElementById('contenidoCursosDinamico');
    if (!container) return;

    const misCursos = obtenerMisCursos();
    const planEstudios = obtenerPlanEstudios();

    let cursosHTML = `
        <h2 style="color: var(--deep-blue); font-size: 1.5rem; margin-bottom: 1rem; font-family: 'Inter', sans-serif;">Catálogo de Cursos y Recursos</h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.2rem;">
    `;

    Object.keys(CURSOS_DATA).forEach(nombre => {
        const data = CURSOS_DATA[nombre];
        const inscrito = misCursos.includes(nombre);
        const plan = planEstudios[nombre] || { temas: [], ayudas: [] };
        const nombreEscapado = nombre.replace(/'/g, "\\'");

        const ayudasHTML = (plan.ayudas || []).map(a => {
            let iconType = '📄';
            if (a.tipo === 'video') iconType = '🎬';
            if (a.tipo === 'libro') iconType = '📚';
            if (a.tipo === 'audio') iconType = '🎧';
            if (a.tipo === 'enlace') iconType = '🔗';
            return `
                <div style="font-size: 0.82rem; margin-top: 0.4rem; padding: 0.4rem 0.6rem; background: #fafaf9; border-radius: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                    <span>${iconType} <strong>${a.titulo}</strong></span>
                    <a href="${a.url || '#'}" target="_blank" rel="noopener" style="color: var(--deep-blue); font-weight: 700; text-decoration: none; font-size: 0.78rem;">Abrir ↗</a>
                </div>
            `;
        }).join('');

        cursosHTML += `
            <div style="background: var(--pure-white); padding: 1.5rem; border-radius: 1.5rem; box-shadow: var(--shadow-sm); border-left: 4px solid ${inscrito ? 'var(--golden)' : '#ccc'}; display: flex; flex-direction: column; justify-content: space-between;">
                <div>
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.8rem;">
                        <div style="min-width: 50px; display: flex; justify-content: center;">${data.icono}</div>
                        <div>
                            <h3 style="color: var(--deep-blue); margin: 0; font-size: 1.1rem; font-family: 'Inter', sans-serif;">${nombre}</h3>
                            <span style="font-size: 0.75rem; font-weight: 600; padding: 0.15rem 0.6rem; border-radius: 1rem; background: ${inscrito ? '#e8f5e9' : '#f5f5f5'}; color: ${inscrito ? '#2e7d32' : '#777'};">
                                ${inscrito ? '✓ Inscrito' : 'Disponible'}
                            </span>
                        </div>
                    </div>
                    <p style="color: var(--dark-text); font-size: 0.88rem; line-height: 1.4; margin-bottom: 0.8rem; font-family: 'Inter', sans-serif;">${data.descripcion}</p>
                    
                    ${plan.ayudas && plan.ayudas.length > 0 ? `
                        <details style="margin-bottom: 0.8rem; font-size: 0.82rem; color: var(--deep-blue);">
                            <summary style="cursor: pointer; font-weight: 700; outline: none;">🗂️ Recursos y Materiales (${plan.ayudas.length})</summary>
                            <div style="margin-top: 0.4rem;">${ayudasHTML}</div>
                        </details>
                    ` : ''}
                </div>
                <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; margin-top: 0.8rem;">
                    <button onclick="verPlanEstudios('${nombreEscapado}')" class="btn btn-golden btn-sm" style="flex: 1; padding: 0.5rem 0.8rem; border-radius: 0.8rem; font-size: 0.8rem; border: none; cursor: pointer; font-weight: 600; font-family: 'Inter', sans-serif;">
                        <i class="fas fa-book-open"></i> Ver Plan
                    </button>
                    ${inscrito ? `
                        <button onclick="desinscribirCursoConfirm('${nombreEscapado}')" 
                            style="background: #c62828; color: white; padding: 0.5rem 1rem; border-radius: 0.8rem; border: none; cursor: pointer; font-weight: 600; font-size: 0.8rem; font-family: 'Inter', sans-serif; flex: 1; transition: all 0.3s ease;"
                            onmouseover="this.style.background='#b71c1c';"
                            onmouseout="this.style.background='#c62828';">
                            <i class="fas fa-trash-alt"></i> Desinscribir
                        </button>
                    ` : `
                        <button onclick="confirmarInscripcionDirecta('${nombreEscapado}')" 
                            style="background: var(--deep-blue); color: white; padding: 0.5rem 1rem; border-radius: 0.8rem; border: none; cursor: pointer; font-weight: 600; font-size: 0.8rem; font-family: 'Inter', sans-serif; flex: 1; transition: all 0.3s ease;"
                            onmouseover="this.style.background='#132734';"
                            onmouseout="this.style.background='var(--deep-blue)';">
                            <i class="fas fa-plus-circle"></i> Inscribirme
                        </button>
                    `}
                </div>
            </div>
        `;
    });

    cursosHTML += `</div>`;
    container.innerHTML = cursosHTML;
}

function desinscribirCursoConfirm(curso) {
    mostrarModalGenerico(
        '⚠️ Confirmar desinscripción',
        `¿Estás seguro de desinscribirte de "<strong>${curso}</strong>"?<br><br><small style="color: #888;">Perderás el acceso a sus exámenes.</small>`,
        [
            {
                texto: '✓ Sí, desinscribir',
                callback: () => {
                    desinscribirCurso(curso);
                    renderizarPrincipal();
                    renderizarCursos();
                    renderizarRevision();
                    renderizarLogros();
                    mostrarToast(`🗑️ Te has desinscrito de ${curso}`, 'info');
                }
            },
            { texto: 'Cancelar', callback: () => { } }
        ]
    );
}

function confirmarInscripcionDirecta(curso) {
    mostrarModalGenerico(
        '📚 Confirmar Inscripción',
        `¿Estás seguro de inscribirte en el curso "<strong>${curso}</strong>"?`,
        [
            {
                texto: '✓ Sí, inscribirme',
                callback: () => {
                    if (inscribirCurso(curso)) {
                        renderizarPrincipal();
                        renderizarCursos();
                        renderizarRevision();
                        renderizarLogros();
                        mostrarModalBienvenida(curso);
                    } else {
                        mostrarToast('⚠️ Ya estás inscrito en este curso o has alcanzado el límite.', 'warning');
                    }
                }
            },
            { texto: 'Cancelar', callback: () => { } }
        ]
    );
}

function verPlanEstudios(curso) {
    bloquearScroll('modalPlanEstudios');
    const planEstudios = obtenerPlanEstudios();
    const data = planEstudios[curso] || { temas: CURSOS_DATA[curso]?.temas || [], ayudas: [] };

    const modal = document.getElementById('modalPlanEstudios');
    const body = document.getElementById('modalPlanBody');
    const titulo = document.getElementById('modalPlanTitulo');

    if (titulo) titulo.innerHTML = `<i class="fas fa-book-open" style="color: var(--golden);"></i> Plan de Estudios: ${curso}`;
    if (body) {
        const temasHTML = (data.temas || []).map((t, idx) => `
            <div style="background: #fafaf9; padding: 0.7rem 1rem; border-radius: 0.8rem; margin-bottom: 0.5rem; border-left: 3px solid var(--golden); font-size: 0.9rem;">
                <strong style="color: var(--deep-blue);">${t}</strong>
            </div>
        `).join('');

        const ayudasHTML = (data.ayudas || []).map(a => {
            let icon = '📄';
            if (a.tipo === 'video') icon = '🎬';
            if (a.tipo === 'libro') icon = '📚';
            if (a.tipo === 'audio') icon = '🎧';
            if (a.tipo === 'enlace') icon = '🔗';

            return `
                <div style="display: flex; justify-content: space-between; align-items: center; background: white; padding: 0.7rem 1rem; border-radius: 0.8rem; margin-bottom: 0.5rem; border: 1px solid #e8e3d8;">
                    <div>
                        <span style="font-size: 1.1rem; margin-right: 0.4rem;">${icon}</span>
                        <strong style="color: var(--deep-blue); font-size: 0.9rem;">${a.titulo}</strong>
                        ${a.descripcion ? `<p style="margin: 0; font-size: 0.78rem; color: #777;">${a.descripcion}</p>` : ''}
                    </div>
                    <a href="${a.url || '#'}" target="_blank" rel="noopener" class="btn btn-golden btn-sm" style="padding: 0.3rem 0.8rem; border-radius: 0.6rem; font-size: 0.78rem; text-decoration: none;">Abrir ↗</a>
                </div>
            `;
        }).join('');

        body.innerHTML = `
            <h4 style="color: var(--deep-blue); margin-bottom: 0.6rem; font-family: 'Inter', sans-serif;">📚 Temas del Curso:</h4>
            ${temasHTML.length > 0 ? temasHTML : '<p style="color:#888;">Aún no se han configurado temas para este curso.</p>'}

            <h4 style="color: var(--deep-blue); margin: 1.2rem 0 0.6rem 0; font-family: 'Inter', sans-serif;">🗂️ Ayudas y Recursos Didácticos:</h4>
            ${ayudasHTML.length > 0 ? ayudasHTML : '<p style="color:#888;">Aún no se han configurado recursos para este curso.</p>'}
        `;
    }

    if (modal) {
        mostrarElementoModal(modal);
    }
}

function cerrarModalPlanEstudios() {
    const modal = document.getElementById('modalPlanEstudios');
    if (modal) {
        ocultarElementoModal(modal);
    }
    desbloquearScroll('modalPlanEstudios');
}

// ===== FLUJO DE TOMAR EXAMEN =====
function confirmarInicioExamen(examId) {
    const examen = DB_EXAMENES.find(ex => String(ex.id) === String(examId));
    if (!examen) {
        mostrarModalGenerico('Error', 'No se encontró el examen seleccionado.');
        return;
    }

    if (examenYaRealizado(examen.curso, examen.titulo)) {
        mostrarModalGenerico('Examen ya realizado', `Ya has completado el examen "<strong>${examen.titulo}</strong>".`);
        return;
    }

    examenActualParaRendir = examen;

    mostrarModalGenerico(
        '📝 Confirmar inicio de examen',
        `¿Deseas iniciar el examen "<strong>${examen.titulo}</strong>" del curso <strong>${examen.curso}</strong>?`,
        [
            {
                texto: '<i class="fas fa-play"></i> Sí, iniciar',
                callback: () => iniciarFlujoIdentidad()
            },
            {
                texto: 'Cancelar',
                callback: () => { examenActualParaRendir = null; }
            }
        ]
    );
}

function iniciarFlujoIdentidad() {
    bloquearScroll('modalIdentidadAlumno');
    const identidadExistente = obtenerIdentidadAlumno();

    let modal = document.getElementById('modalIdentidadAlumno');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalIdentidadAlumno';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center;
            z-index: 100050; backdrop-filter: blur(5px);
        `;
        modal.innerHTML = `
            <div class="modal-card" style="background: white; border-radius: 1.5rem; padding: 2rem; max-width: 420px; width: 90%; box-shadow: 0 25px 60px rgba(0,0,0,0.3); border: 2px solid var(--golden);">
                <h3 style="color: #1a3a4a; margin-top: 0; font-family: 'Inter', sans-serif;"><i class="fas fa-id-card" style="color:#c9a53b;"></i> Identificación del Alumno</h3>
                <div style="margin-bottom: 0.8rem; text-align: left;">
                    <label style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; font-family: 'Inter', sans-serif;">Nombre Completo *</label>
                    <input type="text" id="inputNombreAlumno" placeholder="Ej: Juan Pérez" style="width: 100%; padding: 0.7rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-size: 0.9rem; box-sizing: border-box; font-family: 'Inter', sans-serif;">
                </div>
                <div style="margin-bottom: 0.8rem; text-align: left;">
                    <label style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; font-family: 'Inter', sans-serif;">Documento de Identidad *</label>
                    <input type="text" id="inputDocumentoAlumno" placeholder="Ej: 1098765432" style="width: 100%; padding: 0.7rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-size: 0.9rem; box-sizing: border-box; font-family: 'Inter', sans-serif;">
                </div>
                <div style="margin-bottom: 1.2rem; text-align: left;">
                    <label style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; font-family: 'Inter', sans-serif;">Grupo / Clase de Estudio</label>
                    <input type="text" id="inputGrupoAlumno" placeholder="Ej: Clase Sabática Belén" style="width: 100%; padding: 0.7rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-size: 0.9rem; box-sizing: border-box; font-family: 'Inter', sans-serif;">
                </div>
                <div style="display: flex; gap: 0.8rem;">
                    <button onclick="verificarIdentidadYRendir()" class="btn btn-golden" style="flex:1; border:none; padding:0.75rem; border-radius:2rem; font-weight:700; background: var(--golden); color: var(--deep-blue); cursor: pointer; font-family: 'Inter', sans-serif;">Comenzar Examen</button>
                    <button onclick="cancelarIdentidad()" class="btn btn-outline" style="flex:1; padding:0.75rem; border-radius:2rem; background: transparent; border: 2px solid var(--deep-blue); color: var(--deep-blue); cursor: pointer; font-weight: 700; font-family: 'Inter', sans-serif;">Cancelar</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    if (identidadExistente) {
        document.getElementById('inputNombreAlumno').value = identidadExistente.nombre || '';
        document.getElementById('inputDocumentoAlumno').value = identidadExistente.documento || identidadExistente.whatsapp || '';
        document.getElementById('inputGrupoAlumno').value = identidadExistente.grupo || 'Clase Belén';
    }

    mostrarElementoModal(modal);
}

function cancelarIdentidad() {
    const modal = document.getElementById('modalIdentidadAlumno');
    if (modal) ocultarElementoModal(modal);
    desbloquearScroll('modalIdentidadAlumno');
    examenActualParaRendir = null;
}

function verificarIdentidadYRendir() {
    const nombre = document.getElementById('inputNombreAlumno').value.trim();
    const documento = document.getElementById('inputDocumentoAlumno').value.trim();
    const grupo = document.getElementById('inputGrupoAlumno').value.trim() || 'Clase Belén';

    if (!nombre || !documento) {
        mostrarModalGenerico('Campos incompletos', 'Ingresa tu nombre y documento de identidad.');
        return;
    }

    guardarIdentidadAlumno(nombre, documento, grupo);

    const modal = document.getElementById('modalIdentidadAlumno');
    if (modal) ocultarElementoModal(modal);
    desbloquearScroll('modalIdentidadAlumno');

    if (examenActualParaRendir) {
        rendirExamen(examenActualParaRendir.curso, examenActualParaRendir);
        examenActualParaRendir = null;
    }
}

// ===== RENDERIZAR Y RENDIR EXAMEN =====
function rendirExamen(curso, examen) {
    bloquearScroll('modalRendirExamen');
    const identidad = obtenerIdentidadAlumno();

    let preguntasRendir = [];
    if (examen.preguntasBanco && examen.preguntasBanco.length > 0) {
        const banco = [...examen.preguntasBanco];
        banco.sort(() => 0.5 - Math.random());
        const cant = examen.cantidadPreguntas || banco.length;
        preguntasRendir = banco.slice(0, cant);
    } else {
        preguntasRendir = examen.preguntas || [];
    }

    examen._preguntasGeneradas = preguntasRendir;

    let modal = document.getElementById('modalRendirExamen');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalRendirExamen';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.75); display: flex; align-items: center; justify-content: center;
            z-index: 100050; backdrop-filter: blur(5px);
        `;
        modal.innerHTML = `
            <div class="modal-card" style="background: white; border-radius: 1.5rem; max-width: 750px; width: 95%; max-height: 85vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.4);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%); padding: 1.2rem 2rem; position: sticky; top: 0; z-index: 10; border-radius: 1.5rem 1.5rem 0 0; display: flex; justify-content: space-between; align-items: center;">
                    <h3 id="tituloExamenRendir" style="color: #c9a53b; margin: 0; font-size: 1.2rem; font-family: 'Inter', sans-serif;"></h3>
                    <button onclick="cerrarModalRendirExamen()" style="background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <div class="modal-body" id="bodyExamenRendir" style="padding: 1.8rem;"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('tituloExamenRendir').innerHTML = `<i class="fas fa-pencil-alt" style="color: #c9a53b;"></i> ${examen.titulo}`;

    let preguntasHTML = '';
    if (preguntasRendir.length > 0) {
        preguntasHTML = preguntasRendir.map((pregunta, idx) => {
            const num = idx + 1;
            if (pregunta.tipo === 'multiple' || pregunta.tipo === 'opcion_multiple') {
                const opcionesHTML = (pregunta.opciones || []).map((op, opIdx) => {
                    const letra = String.fromCharCode(65 + opIdx);
                    return `
                        <label style="display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem 1rem; margin-bottom: 0.4rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; cursor: pointer; background: #fafaf9; font-family: 'Inter', sans-serif;">
                            <input type="radio" name="pregunta_${idx}" value="${letra}" style="accent-color: #c9a53b; width: 18px; height: 18px;">
                            <span style="font-weight: 700; color: #1a3a4a;">${letra}.</span>
                            <span style="font-size: 0.92rem; color: #5a6474;">${op}</span>
                        </label>
                    `;
                }).join('');

                return `
                    <div style="background: #ffffff; padding: 1.2rem; border-radius: 1rem; margin-bottom: 1.2rem; border: 1px solid #e8e3d8;">
                        <p style="font-weight: 700; color: #1a3a4a; margin-bottom: 1rem; font-size: 1rem; font-family: 'Inter', sans-serif;">
                            <span style="background: #1a3a4a; color: #c9a53b; width: 26px; height: 26px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem; margin-right: 0.5rem;">${num}</span>
                            ${pregunta.texto}
                        </p>
                        ${opcionesHTML}
                    </div>
                `;
            } else if (pregunta.tipo === 'vf' || pregunta.tipo === 'verdadero_falso') {
                return `
                    <div style="background: #ffffff; padding: 1.2rem; border-radius: 1rem; margin-bottom: 1.2rem; border: 1px solid #e8e3d8;">
                        <p style="font-weight: 700; color: #1a3a4a; margin-bottom: 1rem; font-size: 1rem; font-family: 'Inter', sans-serif;">
                            <span style="background: #1a3a4a; color: #c9a53b; width: 26px; height: 26px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem; margin-right: 0.5rem;">${num}</span>
                            ${pregunta.texto}
                        </p>
                        <div style="display: flex; gap: 0.8rem;">
                            <label style="flex: 1; display: flex; align-items: center; gap: 0.6rem; padding: 0.8rem 1rem; border: 2px solid #c8e6c9; background: #f1f8e9; border-radius: 0.8rem; cursor: pointer; color: #2e7d32; font-weight: 600; font-family: 'Inter', sans-serif;">
                                <input type="radio" name="pregunta_${idx}" value="Verdadero"> Verdadero
                            </label>
                            <label style="flex: 1; display: flex; align-items: center; gap: 0.6rem; padding: 0.8rem 1rem; border: 2px solid #ffcdd2; background: #ffebee; border-radius: 0.8rem; cursor: pointer; color: #c62828; font-weight: 600; font-family: 'Inter', sans-serif;">
                                <input type="radio" name="pregunta_${idx}" value="Falso"> Falso
                            </label>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div style="background: #ffffff; padding: 1.2rem; border-radius: 1rem; margin-bottom: 1.2rem; border: 1px solid #e8e3d8;">
                        <p style="font-weight: 700; color: #1a3a4a; margin-bottom: 0.8rem; font-size: 1rem; font-family: 'Inter', sans-serif;">
                            <span style="background: #1a3a4a; color: #c9a53b; width: 26px; height: 26px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.8rem; margin-right: 0.5rem;">${num}</span>
                            ${pregunta.texto}
                        </p>
                        <textarea id="respuesta_${idx}" rows="3" placeholder="Escribe tu respuesta detallada aquí..." 
                            style="width: 100%; padding: 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; box-sizing: border-box;"></textarea>
                    </div>
                `;
            }
        }).join('');
    } else {
        preguntasHTML = '<p style="text-align: center; color: #777;">No hay preguntas configuradas.</p>';
    }

    document.getElementById('bodyExamenRendir').innerHTML = `
        <div style="margin-bottom: 1rem; padding: 0.8rem 1.2rem; background: var(--cream); border-left: 4px solid var(--golden); border-radius: 0.8rem; font-size: 0.88rem; color: var(--deep-blue); font-family: 'Inter', sans-serif;">
            👤 Alumno: <strong>${identidad?.nombre || ''}</strong> | Doc: <strong>${identidad?.documento || ''}</strong> | Grupo: <strong>${identidad?.grupo || 'Belén'}</strong>
        </div>
        <form id="formExamenActual">
            ${preguntasHTML}
        </form>
        <button onclick="finalizarExamen('${curso}', '${examen.id}')" 
            style="width: 100%; margin-top: 1rem; background: linear-gradient(135deg, #d4a038 0%, #c9a53b 100%); color: #1a3a4a; padding: 1rem; border: none; border-radius: 1rem; font-weight: 700; font-size: 1rem; cursor: pointer; font-family: 'Inter', sans-serif;">
            <i class="fas fa-paper-plane"></i> Finalizar y Entregar Examen
        </button>
    `;

    mostrarElementoModal(modal);
}

function cerrarModalRendirExamen() {
    const modal = document.getElementById('modalRendirExamen');
    if (modal) ocultarElementoModal(modal);
    desbloquearScroll('modalRendirExamen');
}

function finalizarExamen(curso, examId) {
    const examen = DB_EXAMENES.find(ex => String(ex.id) === String(examId));
    if (!examen) return;

    const identidad = obtenerIdentidadAlumno();
    if (!identidad || !identidad.nombre) {
        mostrarModalGenerico('Error', 'No se ha detectado la identidad del alumno.');
        return;
    }

    mostrarModalGenerico(
        'Confirmar entrega',
        '¿Estás seguro de entregar tu examen? Una vez enviado no podrás modificar tus respuestas.',
        [
            {
                texto: '✓ Sí, entregar',
                callback: () => procesarEntregaExamen(curso, examen, identidad)
            },
            { texto: 'Cancelar', callback: () => { } }
        ]
    );
}

// ===== PROCESAR ENTREGA Y RETROALIMENTACIÓN =====
function procesarEntregaExamen(curso, examen, identidad) {
    const preguntasUSadas = examen._preguntasGeneradas || examen.preguntas || [];
    let respuestas = [];
    let correctasObjetivas = 0;
    let totalObjetivas = 0;
    let tieneRespuestaCorta = false;

    preguntasUSadas.forEach((p, idx) => {
        let respAlumno = '';
        if (p.tipo === 'multiple' || p.tipo === 'opcion_multiple' || p.tipo === 'vf' || p.tipo === 'verdadero_falso') {
            totalObjetivas++;
            const radios = document.getElementsByName(`pregunta_${idx}`);
            for (let r of radios) { if (r.checked) respAlumno = r.value; }
            const esCorrecta = respAlumno.toLowerCase().trim() === (p.correcta || '').toLowerCase().trim();
            if (esCorrecta) correctasObjetivas++;

            respuestas.push({
                preguntaIndex: idx,
                texto: p.texto,
                tipo: p.tipo,
                respuestaAlumno: respAlumno,
                correcta: p.correcta,
                esCorrecta: esCorrecta,
                explicacion: p.explicacion || 'Revisa el texto bíblico y los conceptos clave del módulo.'
            });
        } else {
            tieneRespuestaCorta = true;
            const inputShort = document.getElementById(`respuesta_${idx}`);
            if (inputShort) respAlumno = inputShort.value.trim();

            respuestas.push({
                preguntaIndex: idx,
                texto: p.texto,
                tipo: 'respuesta_corta',
                respuestaAlumno: respAlumno,
                correcta: p.correcta || 'Criterio conceptual',
                notaAsignada: null,
                explicacion: p.explicacion || 'El instructor evaluará tu respuesta basada en el material.'
            });
        }
    });

    let notaFinal = null;
    let estadoNota = 'Pendiente';

    if (!tieneRespuestaCorta && totalObjetivas > 0) {
        const score = 1.0 + (correctasObjetivas / totalObjetivas) * 4.0;
        notaFinal = parseFloat(score.toFixed(1));
        estadoNota = notaFinal >= 4.0 ? 'Aprobado' : 'Reprobado';
    }

    const nuevoIntento = {
        id: Date.now(),
        examId: examen.id,
        curso: curso,
        titulo: examen.titulo,
        fecha: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
        alumnoNombre: identidad.nombre,
        alumnoDocumento: identidad.documento || identidad.whatsapp,
        alumnoWhatsapp: identidad.documento || identidad.whatsapp,
        alumnoGrupo: identidad.grupo || 'Belén',
        respuestas: respuestas,
        calificacion: notaFinal,
        nota: estadoNota,
        fechaRealizacion: new Date().toISOString()
    };

    cerrarModalRendirExamen();

    if (!navigator.onLine) {
        let pendientes = [];
        try { pendientes = JSON.parse(localStorage.getItem('pendientesSincronizacion')) || []; } catch (e) { }
        pendientes.push(nuevoIntento);
        localStorage.setItem('pendientesSincronizacion', JSON.stringify(pendientes));
        mostrarToast('📡 Guardado en modo Offline. Se sincronizará al volver la conexión.', 'warning');
    } else {
        EXAMENES_REALIZADOS.push(nuevoIntento);
        guardarExamenesRealizados();
        evaluarYGuardarLogros(identidad);
        agregarNotificacionInterna(`Examen entregado: ${examen.titulo}`, `Tus respuestas han sido procesadas.`);
        mostrarToast('✅ Examen entregado con éxito', 'success');
    }

    mostrarModalRetroalimentacion(nuevoIntento);

    renderizarPrincipal();
    renderizarRevision();
    renderizarLogros();
}

function mostrarModalRetroalimentacion(intento) {
    bloquearScroll('modalRetroalimentacion');
    let modal = document.getElementById('modalRetroalimentacion');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalRetroalimentacion';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center;
            z-index: 100050; backdrop-filter: blur(5px);
        `;
        modal.innerHTML = `
            <div class="modal-card" style="background: white; border-radius: 1.5rem; max-width: 650px; width: 95%; max-height: 85vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.4);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%); padding: 1.2rem 2rem; position: sticky; top: 0; z-index: 10; border-radius: 1.5rem 1.5rem 0 0; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="color: #c9a53b; margin: 0; font-family: 'Inter', sans-serif;"><i class="fas fa-graduation-cap"></i> Retroalimentación del Examen</h3>
                    <button onclick="cerrarModalRetroalimentacion()" style="background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <div class="modal-body" id="bodyRetroalimentacion" style="padding: 1.8rem;"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const itemsHTML = (intento.respuestas || []).map((r, i) => `
        <div style="background: #fafaf9; padding: 1rem; border-radius: 0.8rem; margin-bottom: 0.8rem; border-left: 4px solid ${r.esCorrecta === true ? '#2e7d32' : r.esCorrecta === false ? '#c62828' : 'var(--golden)'}; font-size: 0.88rem; font-family: 'Inter', sans-serif;">
            <strong style="color: var(--deep-blue); display: block; margin-bottom: 0.3rem;">${i + 1}. ${r.texto}</strong>
            <div><strong>Tu respuesta:</strong> ${r.respuestaAlumno || '(Vacío)'} ${r.esCorrecta === true ? '✅' : r.esCorrecta === false ? '❌' : '⏳'}</div>
            <div style="color: #555; margin-top: 0.2rem;"><strong>Respuesta Correcta:</strong> ${r.correcta}</div>
            <div style="margin-top: 0.4rem; background: #fff; padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #e0e0e0; color: #1a3a4a; font-style: italic;">
                💡 <strong>Explicación:</strong> ${r.explicacion}
            </div>
        </div>
    `).join('');

    document.getElementById('bodyRetroalimentacion').innerHTML = `
        <div style="text-align: center; margin-bottom: 1rem;">
            <h3 style="color: var(--deep-blue); margin: 0; font-family: 'Inter', sans-serif;">${intento.titulo}</h3>
            <span style="background: ${intento.calificacion >= 4 ? '#2e7d32' : intento.calificacion !== null ? '#c62828' : '#f57c00'}; color: white; padding: 0.3rem 1rem; border-radius: 1rem; font-weight: 700; font-size: 0.9rem; display: inline-block; margin-top: 0.4rem;">
                ${intento.calificacion !== null ? `Nota: ${intento.calificacion.toFixed(1)} (${intento.nota})` : 'Calificación Pendiente'}
            </span>
        </div>
        <div>${itemsHTML}</div>
        <button onclick="cerrarModalRetroalimentacion()" class="btn btn-golden" style="width: 100%; margin-top: 1rem; padding: 0.8rem; border-radius: 1rem; font-weight: 700; font-family: 'Inter', sans-serif;">
            Entendido, Cerrar
        </button>
    `;

    mostrarElementoModal(modal);
}

function cerrarModalRetroalimentacion() {
    const modal = document.getElementById('modalRetroalimentacion');
    if (modal) ocultarElementoModal(modal);
    desbloquearScroll('modalRetroalimentacion');
}

// ===== PESTAÑA REVISIÓN Y RESULTADOS =====
function renderizarRevision() {
    const container = document.getElementById('contenidoResultados');
    if (!container) return;

    const identidad = obtenerIdentidadAlumno();
    cargarExamenesRealizados();

    const docGuardado = identidad ? (identidad.documento || identidad.whatsapp || '') : '';

    let miHistorial = EXAMENES_REALIZADOS;
    if (docGuardado) {
        miHistorial = miHistorial.filter(ex =>
            (ex.alumnoDocumento && ex.alumnoDocumento.toLowerCase() === docGuardado.toLowerCase()) ||
            (ex.alumnoNombre && ex.alumnoNombre.toLowerCase().includes(docGuardado.toLowerCase()))
        );
    }

    const califs = miHistorial.map(e => e.calificacion).filter(c => typeof c === 'number' && !isNaN(c));
    const promGeneral = califs.length > 0 ? (califs.reduce((a, b) => a + b, 0) / califs.length).toFixed(1) : '0.0';
    const aprobados = califs.filter(c => c >= 4.0).length;
    const reprobados = califs.filter(c => c < 4.0).length;

    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
            <div style="background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%); color: white; padding: 1.2rem; border-radius: 1.2rem; text-align: center;">
                <span style="font-size: 0.8rem; opacity: 0.9; display: block; font-family: 'Inter', sans-serif;">PROMEDIO GENERAL</span>
                <span style="font-size: 2.2rem; font-weight: 800; color: var(--golden); font-family: 'Inter', sans-serif;">${promGeneral}</span>
            </div>
            <div style="background: #e8f5e9; color: #2e7d32; padding: 1.2rem; border-radius: 1.2rem; text-align: center; border: 1px solid #c8e6c9;">
                <span style="font-size: 0.8rem; display: block; font-family: 'Inter', sans-serif;">APROBADOS</span>
                <span style="font-size: 2.2rem; font-weight: 800; font-family: 'Inter', sans-serif;">${aprobados}</span>
            </div>
            <div style="background: #ffebee; color: #c62828; padding: 1.2rem; border-radius: 1.2rem; text-align: center; border: 1px solid #ffcdd2;">
                <span style="font-size: 0.8rem; display: block; font-family: 'Inter', sans-serif;">REPROBADOS</span>
                <span style="font-size: 2.2rem; font-weight: 800; font-family: 'Inter', sans-serif;">${reprobados}</span>
            </div>
        </div>

        <div style="margin-bottom: 1.2rem; background: var(--cream); padding: 1.2rem; border-radius: 1rem; border-left: 4px solid var(--golden);">
            <div style="display: flex; flex-wrap: wrap; gap: 0.8rem; align-items: center;">
                <div style="flex: 2; min-width: 220px;">
                    <label style="font-weight: 700; color: var(--deep-blue); font-size: 0.85rem; display: block; margin-bottom: 0.3rem; font-family: 'Inter', sans-serif;">
                        🔍 Buscar por Documento o Nombre:
                    </label>
                    <input type="text" id="inputSearchRevision" placeholder="Ingresa documento..." 
                        value="${docGuardado}"
                        style="width: 100%; padding: 0.6rem 1rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: white; box-sizing: border-box;">
                </div>
                <div style="flex: 1; min-width: 180px;">
                    <label style="font-weight: 700; color: var(--deep-blue); font-size: 0.85rem; display: block; margin-bottom: 0.3rem; font-family: 'Inter', sans-serif;">
                        📚 Curso:
                    </label>
                    <select id="selectCursoRevision" style="width: 100%; padding: 0.6rem 1rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: white;">
                        <option value="todos">Todos los cursos</option>
                        ${Object.keys(CURSOS_DATA).map(c => `<option value="${c}" ${cursoSeleccionadoRevision === c ? 'selected' : ''}>${c}</option>`).join('')}
                    </select>
                </div>
            </div>
        </div>

        <div id="tablaRevisionContainer" style="overflow-x: auto;"></div>
    `;

    const searchInput = document.getElementById('inputSearchRevision');
    const courseSelect = document.getElementById('selectCursoRevision');

    const updateTable = () => {
        const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
        const cursoFiltro = courseSelect ? courseSelect.value : 'todos';

        let filtrados = EXAMENES_REALIZADOS;
        if (query) {
            filtrados = filtrados.filter(ex =>
                (ex.alumnoDocumento && ex.alumnoDocumento.toLowerCase().includes(query)) ||
                (ex.alumnoNombre && ex.alumnoNombre.toLowerCase().includes(query))
            );
        }
        if (cursoFiltro && cursoFiltro !== 'todos') {
            filtrados = filtrados.filter(ex => ex.curso === cursoFiltro);
        }

        const tableContainer = document.getElementById('tablaRevisionContainer');
        if (!tableContainer) return;

        if (filtrados.length === 0) {
            tableContainer.innerHTML = `<p style="text-align: center; color: var(--muted-text); padding: 2rem; font-style: italic; font-family: 'Inter', sans-serif;">No se encontraron registros de exámenes rendidos con los criterios especificados.</p>`;
            return;
        }

        tableContainer.innerHTML = `
            <table style="width: 100%; border-collapse: collapse; text-align: left; font-family: 'Inter', sans-serif; font-size: 0.88rem;">
                <thead>
                    <tr style="background: var(--deep-blue); color: white;">
                        <th style="padding: 0.8rem 1rem; border-radius: 0.6rem 0 0 0.6rem;">Alumno</th>
                        <th style="padding: 0.8rem 1rem;">Curso</th>
                        <th style="padding: 0.8rem 1rem;">Examen</th>
                        <th style="padding: 0.8rem 1rem;">Fecha</th>
                        <th style="padding: 0.8rem 1rem;">Calificación</th>
                        <th style="padding: 0.8rem 1rem; border-radius: 0 0.6rem 0.6rem 0;">Estado</th>
                    </tr>
                </thead>
                <tbody>
                    ${filtrados.map((ex, idx) => `
                        <tr style="border-bottom: 1px solid #e8e3d8; ${idx % 2 === 0 ? 'background: #fafaf9;' : 'background: white;'}">
                            <td style="padding: 0.8rem 1rem; font-weight: 600; color: #1a3a4a;">
                                ${ex.alumnoNombre}
                                ${ex.alumnoDocumento ? `<br><small style="color: #888; font-weight: 400;">Doc: ${ex.alumnoDocumento}</small>` : ''}
                            </td>
                            <td style="padding: 0.8rem 1rem;">${ex.curso}</td>
                            <td style="padding: 0.8rem 1rem;">${ex.titulo}</td>
                            <td style="padding: 0.8rem 1rem;">${ex.fecha}</td>
                            <td style="padding: 0.8rem 1rem; font-weight: 700; color: ${ex.calificacion >= 4 ? '#2e7d32' : ex.calificacion !== null ? '#c62828' : '#f57c00'};">
                                ${ex.calificacion !== null && ex.calificacion !== undefined ? (typeof ex.calificacion === 'number' ? ex.calificacion.toFixed(1) : ex.calificacion) : 'Pendiente'}
                            </td>
                            <td style="padding: 0.8rem 1rem;">
                                <span style="padding: 0.25rem 0.7rem; border-radius: 1rem; font-size: 0.78rem; font-weight: 700; background: ${ex.calificacion >= 4 ? '#e8f5e9' : ex.calificacion !== null ? '#ffebee' : '#fff3e0'}; color: ${ex.calificacion >= 4 ? '#2e7d32' : ex.calificacion !== null ? '#c62828' : '#e65100'};">
                                    ${ex.nota || (ex.calificacion >= 4 ? 'Aprobado' : 'Pendiente')}
                                </span>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    };

    if (searchInput) searchInput.addEventListener('input', updateTable);
    if (courseSelect) courseSelect.addEventListener('change', updateTable);
    updateTable();
}

// ===== PESTAÑA LOGROS =====
function renderizarLogros() {
    const container = document.getElementById('contenidoLogrosDinamico');
    if (!container) return;

    const identidad = obtenerIdentidadAlumno();
    const misCursos = obtenerMisCursos();
    cargarExamenesRealizados();

    let realizados = EXAMENES_REALIZADOS;
    if (identidad && identidad.documento) {
        realizados = realizados.filter(r =>
            (r.alumnoDocumento && r.alumnoDocumento.toLowerCase() === identidad.documento.toLowerCase()) ||
            (r.alumnoNombre && r.alumnoNombre.toLowerCase() === identidad.nombre.toLowerCase())
        );
    }

    let logrosHTML = `
        <div style="margin-bottom: 1.5rem; text-align: center;">
            <h3 style="color: var(--deep-blue); margin: 0; font-family: 'Inter', sans-serif;">Insignias de Reconocimiento Espiritual</h3>
            <p style="color: var(--muted-text); font-size: 0.9rem; font-family: 'Inter', sans-serif;">Completa cursos y evaluaciones para desbloquear logros y certificados.</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.2rem;">
    `;

    LOGROS_DEFINICIONES.forEach(logro => {
        const desbloqueado = logro.evaluar(identidad, misCursos, realizados);
        logrosHTML += `
            <div style="background: ${desbloqueado ? '#ffffff' : '#f5f5f5'}; padding: 1.2rem; border-radius: 1.2rem; border: 2px solid ${desbloqueado ? 'var(--golden)' : '#e0e0e0'}; opacity: ${desbloqueado ? '1' : '0.65'}; transition: all 0.3s ease; text-align: center;">
                <div style="font-size: 2.8rem; margin-bottom: 0.4rem;">${logro.icono}</div>
                <h4 style="color: var(--deep-blue); margin: 0 0 0.3rem 0; font-size: 1rem; font-family: 'Inter', sans-serif;">${logro.titulo}</h4>
                <p style="color: #666; font-size: 0.8rem; line-height: 1.4; margin-bottom: 0.6rem; font-family: 'Inter', sans-serif;">${logro.descripcion}</p>
                <span style="font-size: 0.75rem; font-weight: 700; padding: 0.2rem 0.8rem; border-radius: 1rem; background: ${desbloqueado ? '#e8f5e9' : '#eeeeee'}; color: ${desbloqueado ? '#2e7d32' : '#888'};">
                    ${desbloqueado ? '✓ Desbloqueado' : '🔒 Bloqueado'}
                </span>
            </div>
        `;
    });

    logrosHTML += `</div>`;
    container.innerHTML = logrosHTML;
}

function evaluarYGuardarLogros(identidad) {
    if (!identidad) return;
    const misCursos = obtenerMisCursos();
    cargarExamenesRealizados();

    const realizados = EXAMENES_REALIZADOS.filter(r =>
        (r.alumnoDocumento && r.alumnoDocumento.toLowerCase() === identidad.documento.toLowerCase()) ||
        (r.alumnoNombre && r.alumnoNombre.toLowerCase() === identidad.nombre.toLowerCase())
    );

    LOGROS_DEFINICIONES.forEach(l => {
        if (l.evaluar(identidad, misCursos, realizados)) {
            let desbloqueados = [];
            try { desbloqueados = JSON.parse(localStorage.getItem('logrosDesbloqueados')) || []; } catch (e) { }
            if (!desbloqueados.includes(l.id)) {
                desbloqueados.push(l.id);
                localStorage.setItem('logrosDesbloqueados', JSON.stringify(desbloqueados));
                mostrarToast(`🏆 ¡Nuevo Logro Desbloqueado!: ${l.titulo}`, 'success');
            }
        }
    });
}

function generarCertificadoPDF(nombreAlumno, curso, promedio) {
    mostrarModalGenerico('📜 Certificado de Excelencia', `Certificado expedido a <strong>${nombreAlumno}</strong> por haber culminado exitosamente el curso <strong>${curso}</strong> con una calificación sobresaliente de <strong>${promedio}</strong>.<br><br>⛪ <em>Iglesia Adventista del Séptimo Día - Barrio Belén</em>`);
}

// ===== PESTAÑA GRUPO =====
function renderizarGrupo() {
    const container = document.getElementById('contenidoGrupoDinamico');
    if (!container) return;

    const identidad = obtenerIdentidadAlumno();

    container.innerHTML = `
        <div style="background: var(--cream); padding: 1.5rem; border-radius: 1.2rem; border-left: 4px solid var(--golden); margin-bottom: 1.5rem;">
            <h3 style="color: var(--deep-blue); margin: 0 0 0.5rem 0; font-family: 'Inter', sans-serif;">👥 Clase y Grupo de Estudio Belén</h3>
            <p style="color: var(--muted-text); font-size: 0.9rem; margin: 0; font-family: 'Inter', sans-serif;">
                Estás registrado como alumno de la <strong>${identidad?.grupo || 'Clase Belén'}</strong>.
            </p>
        </div>
        <div style="text-align: center; padding: 2rem; color: #777; font-family: 'Inter', sans-serif;">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">📖</div>
            <p style="margin: 0; font-size: 0.95rem;">"Así que la fe es por el oír, y el oír, por la palabra de Dios." — Romanos 10:17</p>
        </div>
    `;
}

// ===== NOTIFICACIONES INTERNAS Y BADGES =====
function agregarNotificacionInterna(titulo, cuerpo) {
    let notifs = [];
    try { notifs = JSON.parse(localStorage.getItem('notificacionesLMS')) || []; } catch (e) { }
    notifs.unshift({ id: Date.now(), titulo, cuerpo, fecha: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }), leido: false });
    localStorage.setItem('notificacionesLMS', JSON.stringify(notifs));
    actualizarBadgesNotificaciones();
}

function actualizarBadgesNotificaciones() {
    let notifs = [];
    try { notifs = JSON.parse(localStorage.getItem('notificacionesLMS')) || []; } catch (e) { }
    const noLeidas = notifs.filter(n => !n.leido).length;
    const badge = document.getElementById('badgeNotificacionesCount');
    if (badge) {
        if (noLeidas > 0) {
            badge.innerText = noLeidas;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
}

function abrirModalNotificacionesLMS() {
    bloquearScroll('modalNotificacionesLMS');
    let notifs = [];
    try { notifs = JSON.parse(localStorage.getItem('notificacionesLMS')) || []; } catch (e) { }

    notifs.forEach(n => n.leido = true);
    localStorage.setItem('notificacionesLMS', JSON.stringify(notifs));
    actualizarBadgesNotificaciones();

    let modal = document.getElementById('modalNotificacionesLMS');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalNotificacionesLMS';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center;
            z-index: 100050; backdrop-filter: blur(5px);
        `;
        modal.innerHTML = `
            <div class="modal-card" style="background: white; border-radius: 1.5rem; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.4);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%); padding: 1.2rem 2rem; position: sticky; top: 0; z-index: 10; border-radius: 1.5rem 1.5rem 0 0; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="color: #c9a53b; margin: 0; font-family: 'Inter', sans-serif;"><i class="fas fa-bell"></i> Notificaciones del LMS</h3>
                    <button onclick="cerrarModalNotificacionesLMS()" style="background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <div class="modal-body" id="bodyNotificacionesLMS" style="padding: 1.5rem;"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const itemsHTML = notifs.map(n => `
        <div style="background: #fafaf9; padding: 0.9rem; border-radius: 0.8rem; margin-bottom: 0.6rem; border-left: 3px solid var(--golden); font-family: 'Inter', sans-serif;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.2rem;">
                <strong style="color: var(--deep-blue); font-size: 0.9rem;">${n.titulo}</strong>
                <small style="color: #888; font-size: 0.75rem;">${n.fecha}</small>
            </div>
            <p style="margin: 0; font-size: 0.84rem; color: #555;">${n.cuerpo}</p>
        </div>
    `).join('');

    document.getElementById('bodyNotificacionesLMS').innerHTML = itemsHTML.length > 0 ? itemsHTML : '<p style="text-align: center; color: #777; font-family: \'Inter\', sans-serif;">No tienes notificaciones recientes.</p>';
    mostrarElementoModal(modal);
}

function cerrarModalNotificacionesLMS() {
    const modal = document.getElementById('modalNotificacionesLMS');
    if (modal) ocultarElementoModal(modal);
    desbloquearScroll('modalNotificacionesLMS');
}

// ===== SINCRONIZACIÓN OFFLINE =====
function sincronizarOfflinePending() {
    if (!navigator.onLine) return;
    let pendientes = [];
    try { pendientes = JSON.parse(localStorage.getItem('pendientesSincronizacion')) || []; } catch (e) { }
    if (pendientes.length === 0) return;

    cargarExamenesRealizados();
    pendientes.forEach(p => EXAMENES_REALIZADOS.push(p));
    guardarExamenesRealizados();
    localStorage.removeItem('pendientesSincronizacion');

    mostrarToast(`🟢 ${pendientes.length} examen(es) offline sincronizado(s) con éxito`, 'success');
    renderizarRevision();
}

window.addEventListener('online', () => {
    const badge = document.getElementById('lmsStatusBadge');
    if (badge) { badge.style.background = '#2e7d32'; badge.innerHTML = '🟢 En Línea'; }
    sincronizarOfflinePending();
});

window.addEventListener('offline', () => {
    const badge = document.getElementById('lmsStatusBadge');
    if (badge) { badge.style.background = '#f57c00'; badge.innerHTML = '📡 Modo Offline'; }
});

// ===== PANEL DE ADMINISTRACIÓN (MODO ADMINISTRADOR SOLUCIÓN GARANTIZADA) =====
function abrirModalAdmin() {
    if (modoAdminActivo) {
        mostrarPanelAdmin();
        return;
    }

    bloquearScroll('modalAdminPassword');

    let modalAdminPassword = document.getElementById('modalAdminPassword');
    if (!modalAdminPassword) {
        modalAdminPassword = document.createElement('div');
        modalAdminPassword.id = 'modalAdminPassword';
        modalAdminPassword.className = 'modal-overlay';
        modalAdminPassword.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.75);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 100050;
            backdrop-filter: blur(5px);
            animation: fadeIn 0.3s ease;
        `;
        modalAdminPassword.innerHTML = `
            <div class="modal-card" style="
                background: white;
                border-radius: 1.5rem;
                padding: 2rem;
                max-width: 400px;
                width: 90%;
                text-align: center;
                box-shadow: 0 25px 60px rgba(0,0,0,0.3);
                border: 2px solid var(--golden);
                animation: slideUp 0.3s ease;
            ">
                <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔐</div>
                <h3 style="color: #1a3a4a; font-size: 1.3rem; margin-bottom: 0.5rem; font-family: 'Inter', sans-serif; font-weight: 700;">Modo Administrador LMS</h3>
                <p style="color: #5a6474; margin-bottom: 1.2rem; font-size: 0.88rem; font-family: 'Inter', sans-serif;">Ingresa la contraseña para acceder al panel de gestión.</p>
                <input type="password" id="inputPasswordAdmin" placeholder="Contraseña admin..." style="
                    width: 100%;
                    padding: 0.8rem 1rem;
                    border: 2px solid #e8e3d8;
                    border-radius: 1rem;
                    font-size: 0.95rem;
                    margin-bottom: 0.8rem;
                    box-sizing: border-box;
                    font-family: 'Inter', sans-serif;
                ">
                <div id="errorPasswordAdmin" style="
                    color: #dc2626;
                    font-size: 0.85rem;
                    display: none;
                    margin-bottom: 0.8rem;
                    font-weight: 600;
                    background: #fee2e2;
                    padding: 0.5rem;
                    border-radius: 0.5rem;
                    font-family: 'Inter', sans-serif;
                ">❌ Contraseña incorrecta. Inténtalo de nuevo.</div>
                <div style="display: flex; gap: 0.8rem; justify-content: center;">
                    <button onclick="verificarPasswordAdmin()" class="btn btn-golden" style="
                        flex:1;
                        border: none;
                        padding: 0.75rem;
                        border-radius: 2rem;
                        font-weight: 700;
                        background: var(--golden);
                        color: var(--deep-blue);
                        cursor: pointer;
                        font-family: 'Inter', sans-serif;
                        transition: all 0.3s ease;
                    ">Ingresar</button>
                    <button onclick="cerrarModalAdminPassword()" class="btn btn-outline" style="
                        flex:1;
                        padding: 0.75rem;
                        border-radius: 2rem;
                        background: transparent;
                        border: 2px solid var(--deep-blue);
                        color: var(--deep-blue);
                        cursor: pointer;
                        font-weight: 700;
                        font-family: 'Inter', sans-serif;
                        transition: all 0.3s ease;
                    ">Salir</button>
                </div>
            </div>
        `;
        document.body.appendChild(modalAdminPassword);

        modalAdminPassword.querySelector('#inputPasswordAdmin').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') verificarPasswordAdmin();
        });
    }

    const pwdInput = document.getElementById('inputPasswordAdmin');
    if (pwdInput) pwdInput.value = '';
    const errDiv = document.getElementById('errorPasswordAdmin');
    if (errDiv) errDiv.style.display = 'none';

    mostrarElementoModal(modalAdminPassword);

    setTimeout(() => {
        const input = document.getElementById('inputPasswordAdmin');
        if (input) input.focus();
    }, 200);
}

function cerrarModalAdminPassword() {
    const modal = document.getElementById('modalAdminPassword');
    if (modal) {
        ocultarElementoModal(modal);
    }
    desbloquearScroll('modalAdminPassword');
}

function verificarPasswordAdmin() {
    const pwdInput = document.getElementById('inputPasswordAdmin');
    const pwd = pwdInput ? pwdInput.value.trim() : '';
    if (pwd === 'admin2026') {
        cerrarModalAdminPassword();
        modoAdminActivo = true;
        mostrarPanelAdmin();
        mostrarToast('🔓 Modo Administrador Activado', 'success');
    } else {
        const errorDiv = document.getElementById('errorPasswordAdmin');
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.innerHTML = '❌ Contraseña incorrecta (recuerda: admin2026)';
        }
        if (pwdInput) {
            pwdInput.value = '';
            pwdInput.focus();
        }
    }
}

function mostrarPanelAdmin() {
    const dashboard = document.getElementById('dashboardEvaluacion');
    if (!dashboard) return;

    document.querySelectorAll('.tab-btn').forEach(btn => btn.style.display = 'none');
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');

    let panelAdmin = document.getElementById('panelAdmin');
    if (!panelAdmin) {
        panelAdmin = document.createElement('div');
        panelAdmin.id = 'panelAdmin';
        panelAdmin.style.cssText = `display: block; padding: 1rem 0; animation: fadeIn 0.3s ease;`;
        const footerQuote = document.getElementById('lmsFooterQuote');
        if (footerQuote) {
            dashboard.insertBefore(panelAdmin, footerQuote);
        } else {
            dashboard.appendChild(panelAdmin);
        }
    }

    panelAdmin.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.8rem;">
            <h2 style="color: var(--deep-blue); font-size: 1.6rem; margin: 0; display: flex; align-items: center; gap: 0.6rem; font-family: 'Inter', sans-serif;">
                <i class="fas fa-cog" style="color: var(--golden);"></i> Panel de Administración LMS
            </h2>
            <button id="btnCerrarSesionAdmin" onclick="cerrarSesionAdmin()" style="
                background: #c62828;
                color: white;
                padding: 0.6rem 1.4rem;
                border-radius: 2rem;
                border: none;
                font-weight: 700;
                font-family: 'Inter', sans-serif;
                cursor: pointer;
                transition: all 0.3s ease;
            " onmouseover="this.style.background='#b71c1c';" onmouseout="this.style.background='#c62828';">
                <i class="fas fa-sign-out-alt"></i> Cerrar Sesión Admin
            </button>
        </div>

        <div id="adminCardContainer" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.2rem; margin-bottom: 2rem;">
            <div class="admin-card" onclick="abrirModalCrearExamen()" style="
                background: var(--pure-white);
                padding: 1.8rem;
                border-radius: 1.5rem;
                border: 2px solid var(--golden);
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.8rem;
                text-align: center;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                <div style="font-size: 2.5rem;">📝</div>
                <h4 style="color: var(--deep-blue); margin: 0; font-family: 'Inter', sans-serif;">Crear Nuevo Examen</h4>
                <p style="color: var(--muted-text); font-size: 0.8rem; margin: 0; font-family: 'Inter', sans-serif;">Preguntas dinámicas o bancos aleatorios</p>
            </div>

            <div class="admin-card" onclick="abrirModalEditarExamenes()" style="
                background: var(--pure-white);
                padding: 1.8rem;
                border-radius: 1.5rem;
                border: 2px solid var(--golden);
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.8rem;
                text-align: center;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                <div style="font-size: 2.5rem;">✏️</div>
                <h4 style="color: var(--deep-blue); margin: 0; font-family: 'Inter', sans-serif;">Editar / Eliminar Exámenes</h4>
                <p style="color: var(--muted-text); font-size: 0.8rem; margin: 0; font-family: 'Inter', sans-serif;">Modifica o elimina exámenes existentes</p>
            </div>

            <div class="admin-card" onclick="abrirModalGestionarResultados()" style="
                background: var(--pure-white);
                padding: 1.8rem;
                border-radius: 1.5rem;
                border: 2px solid var(--golden);
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.8rem;
                text-align: center;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                <div style="font-size: 2.5rem;">📊</div>
                <h4 style="color: var(--deep-blue); margin: 0; font-family: 'Inter', sans-serif;">Gestionar Resultados</h4>
                <p style="color: var(--muted-text); font-size: 0.8rem; margin: 0; font-family: 'Inter', sans-serif;">Califica entregas y revisa exámenes</p>
            </div>

            <div class="admin-card" onclick="abrirModalGestionarPlanEstudios()" style="
                background: var(--pure-white);
                padding: 1.8rem;
                border-radius: 1.5rem;
                border: 2px solid var(--golden);
                cursor: pointer;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.8rem;
                text-align: center;
                transition: all 0.3s ease;
            " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                <div style="font-size: 2.5rem;">📚</div>
                <h4 style="color: var(--deep-blue); margin: 0; font-family: 'Inter', sans-serif;">Plan de Estudios y Ayudas</h4>
                <p style="color: var(--muted-text); font-size: 0.8rem; margin: 0; font-family: 'Inter', sans-serif;">Agrega/Edita temas y materiales</p>
            </div>
        </div>
    `;

    panelAdmin.style.display = 'block';
    asegurarBotonFlotanteAdmin();
}

function cerrarSesionAdmin() {
    modoAdminActivo = false;
    const panelAdmin = document.getElementById('panelAdmin');
    if (panelAdmin) panelAdmin.style.display = 'none';

    document.querySelectorAll('.tab-btn').forEach(btn => btn.style.display = 'flex');
    asegurarBotonFlotanteAdmin();
    cambiarPestalla('principal');
}

// ===== GESTIÓN DE PLAN DE ESTUDIOS Y AYUDAS (ADMIN) =====
function abrirModalGestionarPlanEstudios() {
    bloquearScroll('modalGestionarPlanEstudios');
    let modal = document.getElementById('modalGestionarPlanEstudios');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalGestionarPlanEstudios';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center;
            z-index: 100050; backdrop-filter: blur(5px);
        `;
        modal.innerHTML = `
            <div class="modal-card" style="background: white; border-radius: 1.5rem; max-width: 680px; width: 95%; max-height: 85vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.4);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%); padding: 1.2rem 2rem; position: sticky; top: 0; z-index: 10; border-radius: 1.5rem 1.5rem 0 0; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="color: #c9a53b; margin: 0; font-family: 'Inter', sans-serif;"><i class="fas fa-book"></i> Gestionar Plan de Estudios y Ayudas</h3>
                    <button onclick="cerrarModalGestionarPlanEstudios()" style="background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <div class="modal-body" style="padding: 1.8rem;">
                    <div style="margin-bottom: 1.2rem;">
                        <label style="font-weight: 700; color: #1a3a4a; display: block; margin-bottom: 0.3rem; font-family: 'Inter', sans-serif;">Seleccionar Curso:</label>
                        <select id="selectCursoPlanAdmin" style="width: 100%; padding: 0.7rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-size: 0.95rem; background: white; font-family: 'Inter', sans-serif;">
                            ${Object.keys(CURSOS_DATA).map(c => `<option value="${c}">${c}</option>`).join('')}
                        </select>
                    </div>
                    <div id="bodyGestionarPlanContenido"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('#selectCursoPlanAdmin').addEventListener('change', function () {
            cargarEdicionPlanEstudios(this.value);
        });
    }

    const sel = document.getElementById('selectCursoPlanAdmin');
    if (sel) {
        sel.value = 'Obra Misionera';
        cargarEdicionPlanEstudios('Obra Misionera');
    }
    mostrarElementoModal(modal);
}

function cerrarModalGestionarPlanEstudios() {
    const modal = document.getElementById('modalGestionarPlanEstudios');
    if (modal) ocultarElementoModal(modal);
    desbloquearScroll('modalGestionarPlanEstudios');
}

function cargarEdicionPlanEstudios(curso) {
    const container = document.getElementById('bodyGestionarPlanContenido');
    if (!container) return;

    const planEstudios = obtenerPlanEstudios();
    const data = planEstudios[curso] || { temas: [], ayudas: [] };

    const temasHTML = (data.temas || []).map((t, idx) => `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #fafaf9; padding: 0.6rem 0.8rem; border-radius: 0.6rem; margin-bottom: 0.4rem; font-family: 'Inter', sans-serif;">
            <span style="font-size: 0.88rem; color: #1a3a4a;">${t}</span>
            <div>
                <button type="button" onclick="editarTemaPlan('${curso}', ${idx})" style="background: var(--golden); color: #1a3a4a; border: none; border-radius: 0.4rem; padding: 0.2rem 0.6rem; font-size: 0.75rem; cursor: pointer; font-weight: 700; font-family: 'Inter', sans-serif;">✏️ Editar</button>
                <button type="button" onclick="eliminarTemaPlan('${curso}', ${idx})" style="background: #c62828; color: white; border: none; border-radius: 0.4rem; padding: 0.2rem 0.6rem; font-size: 0.75rem; cursor: pointer; font-weight: 700; font-family: 'Inter', sans-serif;">🗑️ Eliminar</button>
            </div>
        </div>
    `).join('');

    const ayudasHTML = (data.ayudas || []).map((a, idx) => `
        <div style="display: flex; justify-content: space-between; align-items: center; background: #fafaf9; padding: 0.6rem 0.8rem; border-radius: 0.6rem; margin-bottom: 0.4rem; font-family: 'Inter', sans-serif;">
            <div>
                <strong style="font-size: 0.88rem; color: #1a3a4a;">${a.titulo}</strong> (${a.tipo})
                ${a.descripcion ? `<br><small style="color: #777;">${a.descripcion}</small>` : ''}
            </div>
            <button type="button" onclick="eliminarAyudaPlan('${curso}', ${idx})" style="background: #c62828; color: white; border: none; border-radius: 0.4rem; padding: 0.2rem 0.6rem; font-size: 0.75rem; cursor: pointer; font-weight: 700; font-family: 'Inter', sans-serif;">🗑️ Eliminar</button>
        </div>
    `).join('');

    container.innerHTML = `
        <div style="margin-bottom: 1.5rem; background: #fdfbf7; padding: 1rem; border-radius: 0.8rem; border: 1px solid #e8e3d8;">
            <h4 style="color: var(--deep-blue); margin: 0 0 0.6rem 0; font-family: 'Inter', sans-serif;">📚 Temas del Curso:</h4>
            ${temasHTML.length > 0 ? temasHTML : '<p style="color:#888; font-size:0.85rem;">No hay temas configurados.</p>'}
            <button type="button" onclick="agregarTemaPlan('${curso}')" style="margin-top: 0.6rem; background: var(--golden); color: #1a3a4a; border: none; border-radius: 0.6rem; padding: 0.4rem 0.9rem; font-size: 0.82rem; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif;">+ Agregar Tema</button>
        </div>

        <div style="background: #fdfbf7; padding: 1rem; border-radius: 0.8rem; border: 1px solid #e8e3d8;">
            <h4 style="color: var(--deep-blue); margin: 0 0 0.6rem 0; font-family: 'Inter', sans-serif;">🗂️ Materiales y Ayudas:</h4>
            ${ayudasHTML.length > 0 ? ayudasHTML : '<p style="color:#888; font-size:0.85rem;">No hay recursos agregados.</p>'}
            <button type="button" onclick="agregarAyudaPlan('${curso}')" style="margin-top: 0.6rem; background: var(--golden); color: #1a3a4a; border: none; border-radius: 0.6rem; padding: 0.4rem 0.9rem; font-size: 0.82rem; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif;">+ Agregar Recurso</button>
        </div>
    `;
}

function agregarTemaPlan(curso) {
    const nuevo = prompt(`Ingresa el nuevo tema para ${curso}:`);
    if (nuevo && nuevo.trim()) {
        const plan = obtenerPlanEstudios();
        if (!plan[curso]) plan[curso] = { temas: [], ayudas: [] };
        if (!plan[curso].temas) plan[curso].temas = [];
        plan[curso].temas.push(nuevo.trim());
        guardarPlanEstudios(plan);
        cargarEdicionPlanEstudios(curso);
        mostrarToast('✅ Tema agregado exitosamente', 'success');
    }
}

function editarTemaPlan(curso, idx) {
    const plan = obtenerPlanEstudios();
    const actual = plan[curso]?.temas[idx] || '';
    const ed = prompt(`Editar tema:`, actual);
    if (ed && ed.trim()) {
        plan[curso].temas[idx] = ed.trim();
        guardarPlanEstudios(plan);
        cargarEdicionPlanEstudios(curso);
        mostrarToast('✏️ Tema actualizado', 'success');
    }
}

function eliminarTemaPlan(curso, idx) {
    mostrarModalGenerico('Confirmar eliminación', '¿Eliminar este tema del plan de estudios?', [
        {
            texto: 'Sí, eliminar', callback: () => {
                const plan = obtenerPlanEstudios();
                plan[curso].temas.splice(idx, 1);
                guardarPlanEstudios(plan);
                cargarEdicionPlanEstudios(curso);
                mostrarToast('🗑️ Tema eliminado', 'info');
            }
        },
        { texto: 'Cancelar', callback: () => { } }
    ]);
}

function agregarAyudaPlan(curso) {
    const titulo = prompt(`Título del recurso (Ej: Libro de Lectura, Video explicativo):`);
    if (!titulo || !titulo.trim()) return;
    const url = prompt(`URL o enlace de recurso (deja # si no tienes enlace):`, '#') || '#';
    const tipo = prompt(`Tipo de recurso (libro, video, pdf, audio, enlace):`, 'pdf') || 'pdf';

    const plan = obtenerPlanEstudios();
    if (!plan[curso]) plan[curso] = { temas: [], ayudas: [] };
    if (!plan[curso].ayudas) plan[curso].ayudas = [];
    plan[curso].ayudas.push({ titulo: titulo.trim(), url: url.trim(), tipo: tipo.trim(), descripcion: 'Recurso adicional de estudio' });
    guardarPlanEstudios(plan);
    cargarEdicionPlanEstudios(curso);
    mostrarToast('✅ Recurso agregado', 'success');
}

function eliminarAyudaPlan(curso, idx) {
    mostrarModalGenerico('Confirmar eliminación', '¿Eliminar este recurso de ayuda?', [
        {
            texto: 'Sí, eliminar', callback: () => {
                const plan = obtenerPlanEstudios();
                plan[curso].ayudas.splice(idx, 1);
                guardarPlanEstudios(plan);
                cargarEdicionPlanEstudios(curso);
                mostrarToast('🗑️ Recurso eliminado', 'info');
            }
        },
        { texto: 'Cancelar', callback: () => { } }
    ]);
}

// ===== EDITAR Y ELIMINAR EXÁMENES =====
function abrirModalEditarExamenes() {
    verificarAccesoSeccion('lms_examenes', function () {
        bloquearScroll('modalEditarExamenes');
        let modal = document.getElementById('modalEditarExamenes');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modalEditarExamenes';
            modal.className = 'modal-overlay';
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center;
                z-index: 100050; backdrop-filter: blur(5px);
            `;
            modal.innerHTML = `
                <div class="modal-card" style="background: white; border-radius: 1.5rem; max-width: 600px; width: 95%; max-height: 80vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.4);">
                    <div class="modal-header" style="background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%); padding: 1.3rem 2rem; position: sticky; top: 0; z-index: 10; border-radius: 1.5rem 1.5rem 0 0; display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="color: #c9a53b; margin: 0; font-family: 'Inter', sans-serif;"><i class="fas fa-edit"></i> Editar o Eliminar Exámenes</h3>
                        <button onclick="cerrarModalEditarExamenes()" style="background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                    </div>
                    <div class="modal-body" style="padding: 1.8rem;">
                        <div style="margin-bottom: 1rem;">
                            <label style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem; font-family: 'Inter', sans-serif;">Seleccionar Curso</label>
                            <select id="selectCursoEditar" style="width: 100%; padding: 0.75rem 1rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; background: white;">
                                <option value="">-- Selecciona un curso --</option>
                                ${Object.keys(CURSOS_DATA).map(c => `<option value="${c}">${c}</option>`).join('')}
                            </select>
                        </div>
                        <div id="listaExamenesEditar"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            modal.querySelector('#selectCursoEditar').addEventListener('change', function () {
                cargarExamenesParaEditar(this.value);
            });
        }

        document.getElementById('selectCursoEditar').value = '';
        document.getElementById('listaExamenesEditar').innerHTML = '';
        mostrarElementoModal(modal);
    });
}

function cerrarModalEditarExamenes() {
    const modal = document.getElementById('modalEditarExamenes');
    if (modal) ocultarElementoModal(modal);
    desbloquearScroll('modalEditarExamenes');
}

function cargarExamenesParaEditar(curso) {
    const container = document.getElementById('listaExamenesEditar');
    if (!container) return;

    if (!curso) {
        container.innerHTML = '<p style="color: var(--muted-text); text-align: center; padding: 1rem; font-family: \'Inter\', sans-serif;">Selecciona un curso para ver sus exámenes.</p>';
        return;
    }

    const list = DB_EXAMENES.filter(ex => ex.curso === curso);
    if (list.length === 0) {
        container.innerHTML = `<p style="color: var(--muted-text); text-align: center; padding: 1rem; font-family: 'Inter', sans-serif;">No hay exámenes creados para <strong>${curso}</strong></p>`;
        return;
    }

    container.innerHTML = `
        <h4 style="color: var(--deep-blue); margin-bottom: 0.8rem; border-bottom: 2px solid var(--golden); padding-bottom: 0.3rem; font-family: 'Inter', sans-serif;">Exámenes de ${curso}</h4>
        ${list.map(ex => `
            <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.8rem 0; border-bottom: 1px solid #f0f0f0; font-family: 'Inter', sans-serif;">
                <div style="flex: 1; min-width: 140px;">
                    <strong style="color: var(--deep-blue); font-size: 0.95rem; display: block;">${ex.titulo}</strong>
                    <span style="color: var(--muted-text); font-size: 0.78rem;">Fecha: ${ex.fecha || 'Sin fecha'}</span>
                </div>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="editarExamenDirecto('${ex.id}')" style="background: var(--golden); color: var(--deep-blue); padding: 0.4rem 0.9rem; border: none; border-radius: 0.8rem; font-weight: 700; cursor: pointer; font-size: 0.8rem; font-family: 'Inter', sans-serif;"><i class="fas fa-pen"></i> Editar</button>
                    <button onclick="eliminarExamenDirecto('${ex.id}')" style="background: #c62828; color: white; padding: 0.4rem 0.9rem; border: none; border-radius: 0.8rem; font-weight: 700; cursor: pointer; font-size: 0.8rem; font-family: 'Inter', sans-serif;"><i class="fas fa-trash-alt"></i> Eliminar</button>
                </div>
            </div>
        `).join('')}
    `;
}

function editarExamenDirecto(examId) {
    const examen = DB_EXAMENES.find(ex => String(ex.id) === String(examId));
    if (!examen) return;
    cerrarModalEditarExamenes();
    abrirModalCrearExamenForm(examen);
}

function eliminarExamenDirecto(examId) {
    const examen = DB_EXAMENES.find(ex => String(ex.id) === String(examId));
    if (!examen) return;

    mostrarModalGenerico(
        '🗑️ Confirmar eliminación',
        `¿Estás seguro de eliminar el examen "<strong>${examen.titulo}</strong>"? Esta acción no se puede deshacer.`,
        [
            {
                texto: '✓ Sí, eliminar',
                callback: () => {
                    DB_EXAMENES = DB_EXAMENES.filter(ex => String(ex.id) !== String(examId));
                    guardarExamenesEnStorage();
                    cargarExamenesParaEditar(examen.curso);
                    renderizarPrincipal();
                    renderizarRevision();
                    mostrarToast('🗑️ Examen eliminado correctamente', 'info');
                }
            },
            { texto: 'Cancelar', callback: () => { } }
        ]
    );
}

// ===== CREAR / EDITAR EXÁMENES =====
function abrirModalCrearExamen() {
    verificarAccesoSeccion('lms_examenes', function () {
        editandoExamenIndex = -1;
        abrirModalCrearExamenForm(null);
    });
}

function abrirModalCrearExamenForm(examenObj) {
    bloquearScroll('modalCrearExamenForm');
    let modal = document.getElementById('modalCrearExamenForm');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalCrearExamenForm';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center;
            z-index: 100050; backdrop-filter: blur(5px);
        `;
        modal.innerHTML = `
            <div class="modal-card" style="background: white; border-radius: 1.5rem; max-width: 680px; width: 95%; max-height: 85vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.4);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%); padding: 1.3rem 2rem; position: sticky; top: 0; z-index: 10; border-radius: 1.5rem 1.5rem 0 0; display: flex; justify-content: space-between; align-items: center;">
                    <h3 id="modalCrearFormTitulo" style="color: #c9a53b; margin: 0; font-family: 'Inter', sans-serif;"><i class="fas fa-plus-circle"></i> Crear Examen</h3>
                    <button onclick="cerrarModalCrearExamenForm()" style="background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <div class="modal-body" style="padding: 1.8rem;">
                    <form id="formCrearExamenAdmin">
                        <input type="hidden" id="formExamId" value="">
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                            <div>
                                <label style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem; font-family: 'Inter', sans-serif;">Curso *</label>
                                <select id="formExamCurso" required style="width: 100%; padding: 0.7rem 1rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: white;">
                                    ${Object.keys(CURSOS_DATA).map(c => `<option value="${c}">${c}</option>`).join('')}
                                </select>
                            </div>
                            <div>
                                <label style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem; font-family: 'Inter', sans-serif;">Título del Examen *</label>
                                <input type="text" id="formExamTitulo" required placeholder="Ej: Examen Módulo 1" style="width: 100%; padding: 0.7rem 1rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-size: 0.9rem; box-sizing: border-box; font-family: 'Inter', sans-serif;">
                            </div>
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
                            <div>
                                <label style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem; font-family: 'Inter', sans-serif;">Fecha Publicación</label>
                                <input type="text" id="formExamFecha" placeholder="DD/MM/AAAA" style="width: 100%; padding: 0.7rem 1rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-size: 0.9rem; box-sizing: border-box; font-family: 'Inter', sans-serif;">
                            </div>
                            <div>
                                <label style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem; font-family: 'Inter', sans-serif;">Fecha Límite</label>
                                <input type="text" id="formExamFechaFinal" placeholder="DD/MM/AAAA" style="width: 100%; padding: 0.7rem 1rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-size: 0.9rem; box-sizing: border-box; font-family: 'Inter', sans-serif;">
                            </div>
                        </div>

                        <h4 style="color: var(--deep-blue); margin-bottom: 0.8rem; border-bottom: 2px solid var(--golden); padding-bottom: 0.3rem; display: flex; justify-content: space-between; align-items: center; font-family: 'Inter', sans-serif;">
                            <span>Preguntas del Examen</span>
                            <button type="button" onclick="agregarPreguntaDinamicaForm()" style="background: var(--golden); color: var(--deep-blue); padding: 0.3rem 0.8rem; border: none; border-radius: 0.8rem; font-weight: 700; cursor: pointer; font-size: 0.8rem; font-family: 'Inter', sans-serif;">
                                + Agregar Pregunta
                            </button>
                        </h4>

                        <div id="contenedorPreguntasDinamicas" style="margin-bottom: 1.5rem;"></div>

                        <button type="button" onclick="guardarExamenCompletoAdmin()" style="width: 100%; background: linear-gradient(135deg, #d4a038 0%, #c9a53b 100%); color: #1a3a4a; padding: 0.9rem; border: none; border-radius: 1rem; font-weight: 700; font-size: 1rem; cursor: pointer; font-family: 'Inter', sans-serif;">
                            💾 Guardar Examen en Base de Datos
                        </button>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const titleEl = document.getElementById('modalCrearFormTitulo');
    const idInput = document.getElementById('formExamId');
    const cursoSelect = document.getElementById('formExamCurso');
    const tituloInput = document.getElementById('formExamTitulo');
    const fechaInput = document.getElementById('formExamFecha');
    const fechaFinalInput = document.getElementById('formExamFechaFinal');
    const preguntasContainer = document.getElementById('contenedorPreguntasDinamicas');

    preguntasContainer.innerHTML = '';

    if (examenObj) {
        if (titleEl) titleEl.innerHTML = `<i class="fas fa-edit"></i> Editar Examen`;
        if (idInput) idInput.value = examenObj.id;
        if (cursoSelect) cursoSelect.value = examenObj.curso;
        if (tituloInput) tituloInput.value = examenObj.titulo;
        if (fechaInput) fechaInput.value = examenObj.fecha || '';
        if (fechaFinalInput) fechaFinalInput.value = examenObj.fechaFinal || '';

        const pList = examenObj.preguntasBanco || examenObj.preguntas || [];
        if (pList.length > 0) {
            pList.forEach(p => agregarPreguntaDinamicaForm(p));
        } else {
            agregarPreguntaDinamicaForm();
        }
    } else {
        if (titleEl) titleEl.innerHTML = `<i class="fas fa-plus-circle"></i> Crear Examen`;
        if (idInput) idInput.value = '';
        if (tituloInput) tituloInput.value = '';
        if (fechaInput) fechaInput.value = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        if (fechaFinalInput) fechaFinalInput.value = '';

        agregarPreguntaDinamicaForm();
    }

    mostrarElementoModal(modal);
}

function cerrarModalCrearExamenForm() {
    const modal = document.getElementById('modalCrearExamenForm');
    if (modal) ocultarElementoModal(modal);
    desbloquearScroll('modalCrearExamenForm');
}

function agregarPreguntaDinamicaForm(preguntaObj = null) {
    const container = document.getElementById('contenedorPreguntasDinamicas');
    if (!container) return;

    const index = container.children.length;
    const item = document.createElement('div');
    item.className = 'item-pregunta-admin';
    item.style.cssText = `background: #fafaf9; padding: 1rem; border-radius: 0.8rem; border: 1px solid #e8e3d8; margin-bottom: 0.8rem; position: relative; font-family: 'Inter', sans-serif;`;

    const tipo = preguntaObj ? preguntaObj.tipo : 'multiple';
    const texto = preguntaObj ? preguntaObj.texto : '';
    const correcta = preguntaObj ? preguntaObj.correcta : 'A';
    const explicacion = preguntaObj ? preguntaObj.explicacion : '';
    const opciones = preguntaObj && preguntaObj.opciones ? preguntaObj.opciones : ['', '', '', ''];

    item.innerHTML = `
        <button type="button" onclick="this.parentElement.remove()" style="position: absolute; top: 0.6rem; right: 0.6rem; background: #c62828; color: white; border: none; border-radius: 50%; width: 26px; height: 26px; cursor: pointer; font-size: 0.8rem;">&times;</button>
        <div style="display: grid; grid-template-columns: 1fr 150px; gap: 0.8rem; margin-bottom: 0.6rem;">
            <div>
                <label style="font-weight: 600; font-size: 0.8rem; color: #1a3a4a;">Pregunta ${index + 1}</label>
                <input type="text" class="input-preg-texto" value="${texto}" placeholder="Enunciado de la pregunta..." style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 0.5rem; font-size: 0.88rem; box-sizing: border-box; font-family: 'Inter', sans-serif;">
            </div>
            <div>
                <label style="font-weight: 600; font-size: 0.8rem; color: #1a3a4a;">Tipo</label>
                <select class="select-preg-tipo" onchange="cambiarTipoPreguntaAdmin(this)" style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 0.5rem; font-size: 0.88rem; background: white; font-family: 'Inter', sans-serif;">
                    <option value="multiple" ${tipo === 'multiple' || tipo === 'opcion_multiple' ? 'selected' : ''}>Opción Múltiple</option>
                    <option value="vf" ${tipo === 'vf' || tipo === 'verdadero_falso' ? 'selected' : ''}>Verdadero / Falso</option>
                    <option value="corta" ${tipo === 'corta' || tipo === 'respuesta_corta' ? 'selected' : ''}>Respuesta Corta</option>
                </select>
            </div>
        </div>

        <div class="bloque-opciones-admin" style="display: ${tipo === 'multiple' || tipo === 'opcion_multiple' ? 'block' : 'none'};">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
                <input type="text" class="opcion-a" placeholder="Opción A" value="${opciones[0] || ''}" style="padding: 0.4rem; border: 1px solid #ccc; border-radius: 0.4rem; font-size: 0.85rem;">
                <input type="text" class="opcion-b" placeholder="Opción B" value="${opciones[1] || ''}" style="padding: 0.4rem; border: 1px solid #ccc; border-radius: 0.4rem; font-size: 0.85rem;">
                <input type="text" class="opcion-c" placeholder="Opción C" value="${opciones[2] || ''}" style="padding: 0.4rem; border: 1px solid #ccc; border-radius: 0.4rem; font-size: 0.85rem;">
                <input type="text" class="opcion-d" placeholder="Opción D" value="${opciones[3] || ''}" style="padding: 0.4rem; border: 1px solid #ccc; border-radius: 0.4rem; font-size: 0.85rem;">
            </div>
            <div>
                <label style="font-weight: 600; font-size: 0.78rem; color: #1a3a4a;">Correcta:</label>
                <select class="correcta-multiple" style="padding: 0.3rem 0.6rem; border: 1px solid #ccc; border-radius: 0.4rem; font-size: 0.85rem; background: white;">
                    <option value="A" ${correcta === 'A' ? 'selected' : ''}>A</option>
                    <option value="B" ${correcta === 'B' ? 'selected' : ''}>B</option>
                    <option value="C" ${correcta === 'C' ? 'selected' : ''}>C</option>
                    <option value="D" ${correcta === 'D' ? 'selected' : ''}>D</option>
                </select>
            </div>
        </div>

        <div class="bloque-vf-admin" style="display: ${tipo === 'vf' || tipo === 'verdadero_falso' ? 'block' : 'none'};">
            <label style="font-weight: 600; font-size: 0.78rem; color: #1a3a4a;">Correcta:</label>
            <select class="correcta-vf" style="padding: 0.3rem 0.6rem; border: 1px solid #ccc; border-radius: 0.4rem; font-size: 0.85rem; background: white;">
                <option value="Verdadero" ${correcta === 'Verdadero' ? 'selected' : ''}>Verdadero</option>
                <option value="Falso" ${correcta === 'Falso' ? 'selected' : ''}>Falso</option>
            </select>
        </div>

        <div class="bloque-corta-admin" style="display: ${tipo === 'corta' || tipo === 'respuesta_corta' ? 'block' : 'none'};">
            <label style="font-weight: 600; font-size: 0.78rem; color: #1a3a4a;">Respuesta Criterio:</label>
            <input type="text" class="correcta-corta" placeholder="Criterio de evaluación..." value="${correcta}" style="width: 100%; padding: 0.4rem; border: 1px solid #ccc; border-radius: 0.4rem; font-size: 0.85rem; box-sizing: border-box;">
        </div>

        <div style="margin-top: 0.5rem;">
            <label style="font-weight: 600; font-size: 0.78rem; color: #1a3a4a;">Explicación / Retroalimentación:</label>
            <input type="text" class="input-preg-explicacion" value="${explicacion}" placeholder="Ej: Juan 8:12 - Jesús nos llama a ser luz..." style="width: 100%; padding: 0.4rem; border: 1px solid #ccc; border-radius: 0.4rem; font-size: 0.85rem; box-sizing: border-box;">
        </div>
    `;

    container.appendChild(item);
}

function cambiarTipoPreguntaAdmin(selectEl) {
    const parent = selectEl.closest('.item-pregunta-admin');
    if (!parent) return;
    const val = selectEl.value;
    parent.querySelector('.bloque-opciones-admin').style.display = val === 'multiple' ? 'block' : 'none';
    parent.querySelector('.bloque-vf-admin').style.display = val === 'vf' ? 'block' : 'none';
    parent.querySelector('.bloque-corta-admin').style.display = val === 'corta' ? 'block' : 'none';
}

function guardarExamenCompletoAdmin() {
    const idVal = document.getElementById('formExamId').value;
    const curso = document.getElementById('formExamCurso').value;
    const titulo = document.getElementById('formExamTitulo').value.trim();
    const fecha = document.getElementById('formExamFecha').value.trim();
    const fechaFinal = document.getElementById('formExamFechaFinal').value.trim();

    if (!titulo) {
        mostrarModalGenerico('Error', 'El examen debe tener un título.');
        return;
    }

    const items = document.querySelectorAll('.item-pregunta-admin');
    if (items.length === 0) {
        mostrarModalGenerico('Error', 'Agrega al menos una pregunta.');
        return;
    }

    let preguntas = [];
    items.forEach(it => {
        const txt = it.querySelector('.input-preg-texto').value.trim();
        const tipo = it.querySelector('.select-preg-tipo').value;
        const explicacion = it.querySelector('.input-preg-explicacion').value.trim();
        if (!txt) return;

        if (tipo === 'multiple') {
            const opA = it.querySelector('.opcion-a').value.trim();
            const opB = it.querySelector('.opcion-b').value.trim();
            const opC = it.querySelector('.opcion-c').value.trim();
            const opD = it.querySelector('.opcion-d').value.trim();
            const corr = it.querySelector('.correcta-multiple').value;
            preguntas.push({ tipo: 'multiple', texto: txt, opciones: [opA, opB, opC, opD], correcta: corr, explicacion });
        } else if (tipo === 'vf') {
            const corr = it.querySelector('.correcta-vf').value;
            preguntas.push({ tipo: 'vf', texto: txt, correcta: corr, explicacion });
        } else {
            const corr = it.querySelector('.correcta-corta').value.trim();
            preguntas.push({ tipo: 'corta', texto: txt, correcta: corr || 'Respuesta conceptual', explicacion });
        }
    });

    if (idVal) {
        const targetId = String(idVal);
        const idx = DB_EXAMENES.findIndex(ex => String(ex.id) === targetId);
        if (idx !== -1) {
            DB_EXAMENES[idx].curso = curso;
            DB_EXAMENES[idx].titulo = titulo;
            DB_EXAMENES[idx].fecha = fecha;
            DB_EXAMENES[idx].fechaFinal = fechaFinal;
            DB_EXAMENES[idx].preguntas = preguntas;
            DB_EXAMENES[idx].preguntasBanco = preguntas;
            DB_EXAMENES[idx].cantidadPreguntas = preguntas.length;
        }
    } else {
        const nuevoExamen = {
            id: generarNuevoId(),
            curso: curso,
            titulo: titulo,
            fecha: fecha || new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
            fechaFinal: fechaFinal,
            preguntas: preguntas,
            preguntasBanco: preguntas,
            cantidadPreguntas: preguntas.length,
            nota: 'Pendiente',
            calificacion: null
        };
        DB_EXAMENES.push(nuevoExamen);
        agregarNotificacionInterna(`Nuevo Examen Publicado: ${titulo}`, `Curso: ${curso}. ¡Ya puedes rendirlo!`);
    }

    guardarExamenesEnStorage();
    cerrarModalCrearExamenForm();
    mostrarToast('💾 Examen guardado exitosamente', 'success');

    renderizarPrincipal();
    renderizarRevision();
}

// ===== GESTIONAR RESULTADOS DE ALUMNOS =====
function abrirModalGestionarResultados() {
    verificarAccesoSeccion('lms_resultados', function () {
        bloquearScroll('modalGestionarResultados');
        let modal = document.getElementById('modalGestionarResultados');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'modalGestionarResultados';
            modal.className = 'modal-overlay';
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center;
                z-index: 100050; backdrop-filter: blur(5px);
            `;
            modal.innerHTML = `
                <div class="modal-card" style="background: white; border-radius: 1.5rem; max-width: 680px; width: 95%; max-height: 80vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.4);">
                    <div class="modal-header" style="background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%); padding: 1.3rem 2rem; position: sticky; top: 0; z-index: 10; border-radius: 1.5rem 1.5rem 0 0; display: flex; justify-content: space-between; align-items: center;">
                        <h3 style="color: #c9a53b; margin: 0; font-family: 'Inter', sans-serif;"><i class="fas fa-chart-line"></i> Gestionar Resultados de Alumnos</h3>
                        <button onclick="cerrarModalGestionarResultados()" style="background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                    </div>
                    <div class="modal-body" style="padding: 1.8rem;">
                        <div style="margin-bottom: 1rem;">
                            <label style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem; font-family: 'Inter', sans-serif;">Seleccionar Curso</label>
                            <select id="selectCursoResultadosAdmin" style="width: 100%; padding: 0.75rem 1rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; background: white;">
                                <option value="todos">Todos los Cursos</option>
                                ${Object.keys(CURSOS_DATA).map(c => `<option value="${c}">${c}</option>`).join('')}
                            </select>
                        </div>
                        <div id="listaEntregasResultadosAdmin"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            modal.querySelector('#selectCursoResultadosAdmin').addEventListener('change', function () {
                cargarEntregasResultadosAdmin(this.value);
            });
        }

        document.getElementById('selectCursoResultadosAdmin').value = 'todos';
        cargarEntregasResultadosAdmin('todos');
        mostrarElementoModal(modal);
    });
}

function cerrarModalGestionarResultados() {
    const modal = document.getElementById('modalGestionarResultados');
    if (modal) ocultarElementoModal(modal);
    desbloquearScroll('modalGestionarResultados');
}

function cargarEntregasResultadosAdmin(curso) {
    const container = document.getElementById('listaEntregasResultadosAdmin');
    if (!container) return;

    cargarExamenesRealizados();

    let list = EXAMENES_REALIZADOS;
    if (curso && curso !== 'todos') {
        list = list.filter(ex => ex.curso === curso);
    }

    if (list.length === 0) {
        container.innerHTML = `<p style="color: var(--muted-text); text-align: center; padding: 1.5rem; font-family: 'Inter', sans-serif;">No hay exámenes entregados por alumnos aún.</p>`;
        return;
    }

    container.innerHTML = `
        <h4 style="color: var(--deep-blue); margin-bottom: 0.8rem; border-bottom: 2px solid var(--golden); padding-bottom: 0.3rem; font-family: 'Inter', sans-serif;">Entregas de Alumnos</h4>
        ${list.map((ex, idx) => `
            <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.8rem 0; border-bottom: 1px solid #f0f0f0; font-family: 'Inter', sans-serif;">
                <div style="flex: 1; min-width: 160px;">
                    <strong style="color: var(--deep-blue); font-size: 0.95rem; display: block;">${ex.alumnoNombre}</strong>
                    <span style="color: var(--muted-text); font-size: 0.78rem; display: block;">Doc: ${ex.alumnoDocumento || ex.alumnoWhatsapp || 'S/D'} | Curso: <strong>${ex.curso}</strong></span>
                    <span style="color: #777; font-size: 0.75rem;">${ex.titulo} (${ex.fecha})</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.8rem;">
                    <span style="background: ${ex.calificacion !== null ? '#2e7d32' : '#f57c00'}; color: white; padding: 0.2rem 0.6rem; border-radius: 1rem; font-size: 0.8rem; font-weight: 700;">
                        ${ex.calificacion !== null ? typeof ex.calificacion === 'number' ? ex.calificacion.toFixed(1) : ex.calificacion : 'Pendiente'}
                    </span>
                    <button onclick="verExamenResultadoAdmin(${idx})" 
                        style="background: var(--golden); color: var(--deep-blue); padding: 0.4rem 0.9rem; border: none; border-radius: 0.8rem; font-weight: 700; cursor: pointer; font-size: 0.8rem; font-family: 'Inter', sans-serif;">
                        🔍 Ver Examen
                    </button>
                </div>
            </div>
        `).join('')}
    `;
}

function verExamenResultadoAdmin(intentoIndex) {
    bloquearScroll('modalVerExamenResultadoAdmin');
    cargarExamenesRealizados();
    const intento = EXAMENES_REALIZADOS[intentoIndex];
    if (!intento) return;

    let modal = document.getElementById('modalVerExamenResultadoAdmin');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalVerExamenResultadoAdmin';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center;
            z-index: 100050; backdrop-filter: blur(5px);
        `;
        modal.innerHTML = `
            <div class="modal-card" style="background: white; border-radius: 1.5rem; max-width: 750px; width: 95%; max-height: 85vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.5);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%); padding: 1.2rem 2rem; position: sticky; top: 0; z-index: 10; border-radius: 1.5rem 1.5rem 0 0; display: flex; justify-content: space-between; align-items: center;">
                    <h3 id="tituloVerExamenAdmin" style="color: #c9a53b; margin: 0; font-size: 1.1rem; font-family: 'Inter', sans-serif;"></h3>
                    <button onclick="cerrarModalVerExamenResultadoAdmin()" style="background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <div class="modal-body" id="bodyVerExamenAdmin" style="padding: 1.8rem;"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('tituloVerExamenAdmin').innerHTML = `<i class="fas fa-search"></i> Revisión: ${intento.titulo}`;

    let preguntasHTML = '';
    if (intento.respuestas && intento.respuestas.length > 0) {
        preguntasHTML = intento.respuestas.map((r, i) => {
            const num = i + 1;

            return `
                <div style="background: #fafaf9; padding: 1.2rem; border-radius: 1rem; margin-bottom: 1rem; border: 1px solid #e8e3d8; font-family: 'Inter', sans-serif;">
                    <p style="font-weight: 700; color: #1a3a4a; margin-bottom: 0.6rem;">${num}. ${r.texto}</p>
                    <div style="font-size: 0.9rem; margin-bottom: 0.4rem;">
                        <strong>Respuesta Alumno:</strong> 
                        <span style="color: ${r.esCorrecta === true ? '#2e7d32' : r.esCorrecta === false ? '#c62828' : '#1a3a4a'}; font-weight: 600;">
                            ${r.respuestaAlumno || '(Sin respuesta)'}
                        </span>
                        ${r.esCorrecta === true ? ' <span style="color:#2e7d32;">✓ (Correcta)</span>' : r.esCorrecta === false ? ' <span style="color:#c62828;">✗ (Incorrecta)</span>' : ''}
                    </div>
                    <div style="font-size: 0.85rem; color: var(--muted-text);">
                        <strong>Respuesta / Criterio Correcto:</strong> ${r.correcta || 'N/A'}
                    </div>
                </div>
            `;
        }).join('');
    } else {
        preguntasHTML = '<p style="color: #777; font-family: \'Inter\', sans-serif;">No se registraron detalles de preguntas en esta entrega.</p>';
    }

    document.getElementById('bodyVerExamenAdmin').innerHTML = `
        <div style="background: var(--cream); padding: 1rem; border-radius: 0.8rem; border-left: 4px solid var(--golden); margin-bottom: 1.2rem; font-size: 0.9rem; font-family: 'Inter', sans-serif;">
            <strong>Alumno:</strong> ${intento.alumnoNombre} | <strong>Doc:</strong> ${intento.alumnoDocumento || 'S/D'}<br>
            <strong>Curso:</strong> ${intento.curso} | <strong>Fecha:</strong> ${intento.fecha}
        </div>

        <div>${preguntasHTML}</div>

        <div style="margin-top: 1.5rem; background: #f5f5f5; padding: 1.2rem; border-radius: 1rem; text-align: center; font-family: 'Inter', sans-serif;">
            <label style="font-weight: 700; color: var(--deep-blue); display: block; margin-bottom: 0.5rem;">
                Calificación Final Examen (1.0 - 5.0):
            </label>
            <input type="number" id="inputCalificacionFinalAdmin" step="0.1" min="1" max="5" 
                value="${intento.calificacion !== null && intento.calificacion !== undefined ? intento.calificacion : ''}"
                style="width: 100px; padding: 0.5rem; border: 2px solid var(--golden); border-radius: 0.8rem; font-size: 1.1rem; text-align: center; font-weight: 700; font-family: 'Inter', sans-serif;">
            <br>
            <button onclick="guardarCalificacionFinalAdmin(${intentoIndex})" 
                style="margin-top: 1rem; background: var(--golden); color: var(--deep-blue); padding: 0.8rem 1.8rem; border: none; border-radius: 2rem; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif;">
                💾 Guardar Calificación del Alumno
            </button>
        </div>
    `;

    mostrarElementoModal(modal);
}

function cerrarModalVerExamenResultadoAdmin() {
    const modal = document.getElementById('modalVerExamenResultadoAdmin');
    if (modal) ocultarElementoModal(modal);
    desbloquearScroll('modalVerExamenResultadoAdmin');
}

function guardarCalificacionFinalAdmin(intentoIndex) {
    const inputCal = document.getElementById('inputCalificacionFinalAdmin');
    if (!inputCal) return;

    const val = parseFloat(inputCal.value);
    if (isNaN(val) || val < 1.0 || val > 5.0) {
        mostrarModalGenerico('Nota inválida', 'Ingresa una calificación válida entre 1.0 y 5.0');
        return;
    }

    cargarExamenesRealizados();
    if (intentoIndex >= EXAMENES_REALIZADOS.length) return;

    const intento = EXAMENES_REALIZADOS[intentoIndex];
    intento.calificacion = parseFloat(val.toFixed(1));
    intento.nota = val >= 4.0 ? 'Aprobado' : 'Reprobado';

    guardarExamenesRealizados();
    cerrarModalVerExamenResultadoAdmin();
    cargarEntregasResultadosAdmin(document.getElementById('selectCursoResultadosAdmin')?.value || 'todos');

    agregarNotificacionInterna(`Examen Calificado: ${intento.titulo}`, `Tu nota ha sido publicada: ${val.toFixed(1)}`);
    evaluarYGuardarLogros({ nombre: intento.alumnoNombre, documento: intento.alumnoDocumento });

    renderizarRevision();
    renderizarLogros();
    mostrarToast(`✅ Calificación ${val.toFixed(1)} guardada exitosamente`, 'success');
}

// ===== INICIALIZACIÓN Y EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('inputPasswordEvaluacion');
    if (passwordInput) {
        passwordInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') verificarPasswordEvaluacion();
        });
    }

    cargarExamenesDesdeStorage();
    cargarExamenesRealizados();
    asegurarBotonFlotanteAdmin();
    actualizarBadgesNotificaciones();
});

// Exportaciones globales absolutas
window.abrirModalEvaluacion = abrirModalEvaluacion;
window.verificarPasswordEvaluacion = verificarPasswordEvaluacion;
window.cerrarModalEvaluacion = cerrarModalEvaluacion;
window.abrirDashboard = abrirDashboard;
window.cerrarDashboard = cerrarDashboard;
window.cambiarPestalla = cambiarPestalla;
window.renderizarPrincipal = renderizarPrincipal;
window.renderizarCursos = renderizarCursos;
window.renderizarRevision = renderizarRevision;
window.renderizarLogros = renderizarLogros;
window.renderizarGrupo = renderizarGrupo;
window.verPlanEstudios = verPlanEstudios;
window.cerrarModalPlanEstudios = cerrarModalPlanEstudios;
window.desinscribirCursoConfirm = desinscribirCursoConfirm;
window.confirmarInscripcionDirecta = confirmarInscripcionDirecta;
window.confirmarInicioExamen = confirmarInicioExamen;
window.iniciarFlujoIdentidad = iniciarFlujoIdentidad;
window.cancelarIdentidad = cancelarIdentidad;
window.verificarIdentidadYRendir = verificarIdentidadYRendir;
window.rendirExamen = rendirExamen;
window.cerrarModalRendirExamen = cerrarModalRendirExamen;
window.finalizarExamen = finalizarExamen;
window.procesarEntregaExamen = procesarEntregaExamen;
window.mostrarModalRetroalimentacion = mostrarModalRetroalimentacion;
window.cerrarModalRetroalimentacion = cerrarModalRetroalimentacion;
window.mostrarModalBienvenida = mostrarModalBienvenida;
window.cerrarModalBienvenida = cerrarModalBienvenida;
window.mostrarModalGenerico = mostrarModalGenerico;
window.cerrarModalGenerico = cerrarModalGenerico;
window.generarCertificadoPDF = generarCertificadoPDF;
window.abrirModalNotificacionesLMS = abrirModalNotificacionesLMS;
window.cerrarModalNotificacionesLMS = cerrarModalNotificacionesLMS;
window.abrirModalAdmin = abrirModalAdmin;
window.cerrarModalAdminPassword = cerrarModalAdminPassword;
window.verificarPasswordAdmin = verificarPasswordAdmin;
window.mostrarPanelAdmin = mostrarPanelAdmin;
window.cerrarSesionAdmin = cerrarSesionAdmin;
window.abrirModalCrearExamen = abrirModalCrearExamen;
window.abrirModalCrearExamenForm = abrirModalCrearExamenForm;
window.cerrarModalCrearExamenForm = cerrarModalCrearExamenForm;
window.agregarPreguntaDinamicaForm = agregarPreguntaDinamicaForm;
window.cambiarTipoPreguntaAdmin = cambiarTipoPreguntaAdmin;
window.guardarExamenCompletoAdmin = guardarExamenCompletoAdmin;
window.abrirModalEditarExamenes = abrirModalEditarExamenes;
window.cerrarModalEditarExamenes = cerrarModalEditarExamenes;
window.cargarExamenesParaEditar = cargarExamenesParaEditar;
window.editarExamenDirecto = editarExamenDirecto;
window.eliminarExamenDirecto = eliminarExamenDirecto;
window.abrirModalGestionarResultados = abrirModalGestionarResultados;
window.cerrarModalGestionarResultados = cerrarModalGestionarResultados;
window.cargarEntregasResultadosAdmin = cargarEntregasResultadosAdmin;
window.verExamenResultadoAdmin = verExamenResultadoAdmin;
window.cerrarModalVerExamenResultadoAdmin = cerrarModalVerExamenResultadoAdmin;
window.guardarCalificacionFinalAdmin = guardarCalificacionFinalAdmin;
window.abrirModalGestionarPlanEstudios = abrirModalGestionarPlanEstudios;
window.cerrarModalGestionarPlanEstudios = cerrarModalGestionarPlanEstudios;
window.cargarEdicionPlanEstudios = cargarEdicionPlanEstudios;
window.agregarTemaPlan = agregarTemaPlan;
window.editarTemaPlan = editarTemaPlan;
window.eliminarTemaPlan = eliminarTemaPlan;
window.agregarAyudaPlan = agregarAyudaPlan;
window.eliminarAyudaPlan = eliminarAyudaPlan;
window.asegurarBotonFlotanteAdmin = asegurarBotonFlotanteAdmin;