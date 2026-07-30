/* ========================================
   LMS - SISTEMA DE EVALUACIÓN Y CURSOS
   IASD Belén · Iglesia Adventista
   v5.1 - Correcciones: Desinscribir, Tomar Examen y Notificaciones
   ======================================== */

// ===== BASE DE DATOS DE EXÁMENES (CON IDs ÚNICOS) =====
const DB_EXAMENES = [
    { id: 101, curso: "Obra Misionera", titulo: "Módulo 1 - Introducción", fecha: "15/07/2026", fechaFinal: "30/07/2026", nota: "Aprobado", calificacion: 4.5 },
    { id: 102, curso: "Obra Misionera", titulo: "Módulo 2 - El llamado", fecha: "22/07/2026", fechaFinal: "05/08/2026", nota: "Pendiente", calificacion: null },
    { id: 103, curso: "Profecía", titulo: "Módulo 1 - Daniel", fecha: "10/07/2026", fechaFinal: "25/07/2026", nota: "5.0", calificacion: 5.0 },
    { id: 104, curso: "Profecía", titulo: "Módulo 2 - Apocalipsis", fecha: "17/07/2026", fechaFinal: "01/08/2026", nota: "4.0", calificacion: 4.0 },
    { id: 105, curso: "Predica", titulo: "Módulo 1 - Oratoria", fecha: "05/07/2026", fechaFinal: "20/07/2026", nota: "4.5", calificacion: 4.5 },
    { id: 106, curso: "Predica", titulo: "Módulo 2 - Estructura", fecha: "12/07/2026", fechaFinal: "27/07/2026", nota: "Pendiente", calificacion: null },
    { id: 107, curso: "Aventureros", titulo: "Especialidad de Nudos", fecha: "01/09/2026", fechaFinal: "15/09/2026", nota: "Aprobado", calificacion: 4.5 },
    { id: 108, curso: "Aventureros", titulo: "Cuidado de la Naturaleza", fecha: "08/09/2026", fechaFinal: "22/09/2026", nota: "Pendiente", calificacion: null },
    { id: 109, curso: "Conquistadores", titulo: "Clase de Liderazgo", fecha: "05/09/2026", fechaFinal: "19/09/2026", nota: "Pendiente", calificacion: null },
    { id: 110, curso: "Conquistadores", titulo: "Primeros Auxilios", fecha: "12/09/2026", fechaFinal: "26/09/2026", nota: "Aprobado", calificacion: 4.8 },
    { id: 111, curso: "Guías Mayores", titulo: "Técnicas de Campamento", fecha: "10/09/2026", fechaFinal: "24/09/2026", nota: "Pendiente", calificacion: null },
    { id: 112, curso: "Guías Mayores", titulo: "Liderazgo Juvenil", fecha: "17/09/2026", fechaFinal: "01/10/2026", nota: "Aprobado", calificacion: 5.0 }
];

// Contador para nuevos IDs
let nextExamId = 200;

function generarNuevoId() {
    // Buscar el ID más alto y sumar 1
    let maxId = 0;
    DB_EXAMENES.forEach(ex => {
        if (ex.id && ex.id > maxId) maxId = ex.id;
    });
    if (maxId >= nextExamId) nextExamId = maxId + 1;
    return nextExamId++;
}

// ===== BASE DE DATOS DE EXÁMENES REALIZADOS =====
let EXAMENES_REALIZADOS = [];

function cargarExamenesRealizados() {
    try {
        const data = localStorage.getItem('examenesRealizados');
        if (data) {
            EXAMENES_REALIZADOS = JSON.parse(data);
        }
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
        icono: '<img src="img/aventureros.png" alt="Aventureros" style="width: 60px; height: auto; object-fit: contain;">',
        descripcion: 'Actividades, valores y aprendizaje para los más pequeños.',
        temas: ['Especialidad de nudos', 'Cuidado de la naturaleza', 'Valores cristianos', 'Juegos y dinámicas', 'Manualidades bíblicas'],
        ayudas: '📖 Material de estudio: Manual del Aventurero.'
    },
    'Conquistadores': {
        icono: '<img src="img/conquistadores.jpg" alt="Conquistadores" style="width: 60px; height: auto; object-fit: contain;">',
        descripcion: 'Campismo, especialidades y servicio para jóvenes de 10 a 15 años.',
        temas: ['Clase de liderazgo', 'Campamento de verano', 'Especialidad de primeros auxilios', 'Proyecto de servicio comunitario', 'Historia del club'],
        ayudas: '📖 Material de estudio: Manual del Conquistador.'
    },
    'Guías Mayores': {
        icono: '<img src="img/guias.png" alt="Guías Mayores" style="width: 60px; height: auto; object-fit: contain;">',
        descripcion: 'Liderazgo espiritual y desarrollo personal para jóvenes de 16 años en adelante.',
        temas: ['Técnicas de campamento avanzadas', 'Liderazgo juvenil', 'Consejería espiritual', 'Proyectos de impacto social', 'Preparación para el liderazgo en la iglesia'],
        ayudas: '📖 Material de estudio: Manual del Guía Mayor.'
    }
};

// ===== VARIABLES DE ESTADO =====
let modoAdminActivo = false;
let cursoSeleccionadoRevision = 'todos';
let editandoExamenIndex = -1;
let examenActualParaRendir = null;

// ===== SISTEMA DE MODALES ELEGANTES =====

function mostrarModalGenerico(titulo, mensaje, botones = [], permitirCerrar = true) {
    const existente = document.getElementById('modalGenerico');
    if (existente) existente.remove();

    const modal = document.createElement('div');
    modal.id = 'modalGenerico';
    modal.className = 'modal-overlay';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 99999;
        animation: fadeIn 0.3s ease;
        backdrop-filter: blur(4px);
    `;

    const botonesHTML = botones.map((btn, index) => {
        const esPrimario = index === 0;
        return `
            <button class="btn-modal-${index}" style="
                padding: 0.8rem 1.8rem;
                border-radius: 2rem;
                font-weight: 700;
                font-size: 0.95rem;
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
                ${botones.length === 1 ? 'width: 100%;' : 'flex: 1; max-width: 200px;'}
            ">${btn.texto}</button>
        `;
    }).join('');

    modal.innerHTML = `
        <div class="modal-card" style="
            background: #ffffff;
            border-radius: 1.5rem;
            padding: 2.5rem 2rem;
            max-width: 480px;
            width: 90%;
            text-align: center;
            box-shadow: 0 25px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.4s ease;
            position: relative;
            border: 2px solid rgba(201, 165, 59, 0.2);
        ">
            ${permitirCerrar ? `
                <button onclick="cerrarModalGenerico()" style="
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: transparent;
                    border: none;
                    font-size: 1.5rem;
                    color: #999;
                    cursor: pointer;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='#f5f5f5'" onmouseout="this.style.background='transparent'">
                    <i class="fas fa-times"></i>
                </button>
            ` : ''}
            <div style="
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 1.5rem;
                box-shadow: 0 8px 25px rgba(26, 58, 74, 0.3);
            ">
                <i class="fas fa-info-circle" style="font-size: 1.8rem; color: #c9a53b;"></i>
            </div>
            <h3 style="
                color: #1a3a4a;
                font-size: 1.4rem;
                font-weight: 700;
                margin: 0 0 1rem 0;
                font-family: 'Inter', sans-serif;
            ">${titulo}</h3>
            <div style="
                color: #5a6474;
                font-size: 1rem;
                line-height: 1.6;
                margin-bottom: 1.5rem;
                font-family: 'Inter', sans-serif;
            ">${mensaje}</div>
            ${botones.length > 0 ? `
                <div style="
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                ">${botonesHTML}</div>
            ` : ''}
        </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    botones.forEach((btn, index) => {
        const btnElement = modal.querySelector(`.btn-modal-${index}`);
        if (btnElement && btn.callback) {
            btnElement.addEventListener('click', () => {
                cerrarModalGenerico();
                if (btn.callback) btn.callback();
            });
        }
    });

    if (permitirCerrar) {
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                cerrarModalGenerico();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cerrarModalGenerico();
            }
        });
    }
}

function cerrarModalGenerico() {
    const modal = document.getElementById('modalGenerico');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => {
            modal.remove();
            document.body.style.overflow = '';
        }, 300);
    }
}

// ===== FUNCIONES DE ALMACENAMIENTO LOCAL =====

function cargarExamenesDesdeStorage() {
    try {
        const data = localStorage.getItem('db_examenes');
        if (data) {
            const parsed = JSON.parse(data);
            DB_EXAMENES.length = 0;
            parsed.forEach(ex => {
                if (!ex.id) ex.id = generarNuevoId();
                DB_EXAMENES.push(ex);
            });
        }
    } catch (e) {
        console.warn('⚠️ Error cargando exámenes desde localStorage:', e);
    }
}

function guardarExamenesEnStorage() {
    try {
        localStorage.setItem('db_examenes', JSON.stringify(DB_EXAMENES));
    } catch (e) {
        console.warn('⚠️ Error guardando exámenes en localStorage:', e);
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

function estaInscrito(curso) {
    return obtenerMisCursos().includes(curso);
}

function inscribirCurso(curso) {
    const cursos = obtenerMisCursos();
    if (!cursos.includes(curso)) {
        cursos.push(curso);
        guardarMisCursos(cursos);
        return true;
    }
    return false;
}

function desinscribirCurso(curso) {
    let cursos = obtenerMisCursos();
    cursos = cursos.filter(c => c !== curso);
    guardarMisCursos(cursos);
    console.log(`📤 Curso "${curso}" removido. Cursos restantes:`, cursos);
}

function obtenerExamenesFiltrados() {
    const misCursos = obtenerMisCursos();
    if (misCursos.length === 0) return [];
    return DB_EXAMENES.filter(examen => misCursos.includes(examen.curso));
}

function obtenerResultadosFiltrados() {
    const identidad = obtenerIdentidadAlumno();

    if (identidad && identidad.nombre && identidad.whatsapp) {
        cargarExamenesRealizados();
        return EXAMENES_REALIZADOS.filter(examen =>
            examen.alumnoNombre === identidad.nombre &&
            examen.alumnoWhatsapp === identidad.whatsapp
        );
    }

    const misCursos = obtenerMisCursos();
    if (misCursos.length === 0) return [];
    return DB_EXAMENES.filter(examen =>
        misCursos.includes(examen.curso) && examen.calificacion !== null
    );
}

function obtenerIdentidadAlumno() {
    try {
        const data = localStorage.getItem('alumnoIdentidad');
        return data ? JSON.parse(data) : null;
    } catch (e) {
        return null;
    }
}

function guardarIdentidadAlumno(nombre, whatsapp) {
    const identidad = { nombre, whatsapp };
    localStorage.setItem('alumnoIdentidad', JSON.stringify(identidad));
}

function examenYaRealizado(curso, tituloExamen) {
    const identidad = obtenerIdentidadAlumno();
    if (!identidad || !identidad.nombre || !identidad.whatsapp) return false;

    cargarExamenesRealizados();
    return EXAMENES_REALIZADOS.some(ex =>
        ex.curso === curso &&
        ex.titulo === tituloExamen &&
        ex.alumnoNombre === identidad.nombre &&
        ex.alumnoWhatsapp === identidad.whatsapp
    );
}

// ===== BOTÓN FLOTANTE DINÁMICO =====
function asegurarBotonFlotanteAdmin() {
    const verificarYReparar = () => {
        const botonesFlotantes = document.querySelectorAll('[onclick*="abrirModalAdmin"]');
        botonesFlotantes.forEach(boton => {
            if (!boton.style.position || boton.style.position !== 'fixed') {
                boton.style.position = 'fixed';
                boton.style.bottom = '20px';
                boton.style.right = '20px';
                boton.style.zIndex = '9999';
            }

            if (window.getComputedStyle(boton).position !== 'fixed') {
                boton.style.setProperty('position', 'fixed', 'important');
                boton.style.setProperty('bottom', '20px', 'important');
                boton.style.setProperty('right', '20px', 'important');
                boton.style.setProperty('z-index', '9999', 'important');
            }
        });
    };

    verificarYReparar();
    setTimeout(verificarYReparar, 500);
    setTimeout(verificarYReparar, 1000);
}

// ===== MODAL DE CONTRASEÑA DE EVALUACIÓN =====

function abrirModalEvaluacion() {
    document.getElementById('modalEvaluacion').classList.add('active');
    document.getElementById('inputPasswordEvaluacion').value = '';
    document.getElementById('errorPasswordEvaluacion').style.display = 'none';
    setTimeout(() => document.getElementById('inputPasswordEvaluacion').focus(), 300);
}

function verificarPasswordEvaluacion() {
    const password = document.getElementById('inputPasswordEvaluacion').value.trim();
    if (password === 'eval2026') {
        document.getElementById('modalEvaluacion').classList.remove('active');
        abrirDashboard();
    } else {
        document.getElementById('errorPasswordEvaluacion').style.display = 'block';
        document.getElementById('inputPasswordEvaluacion').value = '';
        document.getElementById('inputPasswordEvaluacion').focus();
    }
}

function cerrarModalEvaluacion() {
    document.getElementById('modalEvaluacion').classList.remove('active');
    document.getElementById('inputPasswordEvaluacion').value = '';
    document.getElementById('errorPasswordEvaluacion').style.display = 'none';
}

// ===== DASHBOARD PRINCIPAL =====

function abrirDashboard() {
    cargarExamenesDesdeStorage();
    cargarExamenesRealizados();
    asegurarBotonFlotanteAdmin();

    document.getElementById('dashboardEvaluacion').style.display = 'block';
    document.body.style.overflow = 'hidden';

    if (modoAdminActivo) {
        mostrarPanelAdmin();
        return;
    }

    renderizarPrincipal();
    renderizarCursos();
    renderizarRevision();
}

function cerrarDashboard() {
    document.getElementById('dashboardEvaluacion').style.display = 'none';
    document.body.style.overflow = '';
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.getElementById('contenidoPrincipal').style.display = 'block';
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--muted-text)';
    });
    document.querySelector('.tab-btn[data-tab="principal"]').style.background = 'var(--golden)';
    document.querySelector('.tab-btn[data-tab="principal"]').style.color = 'var(--deep-blue)';

    document.querySelectorAll('.tab-btn').forEach(btn => btn.style.display = 'flex');

    const panelAdmin = document.getElementById('panelAdmin');
    if (panelAdmin) panelAdmin.style.display = 'none';

    modoAdminActivo = false;
}

// ===== PESTAÑAS =====

function cambiarPestalla(tab) {
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    const targetId = tab.charAt(0).toUpperCase() + tab.slice(1);
    const target = document.getElementById('contenido' + targetId);
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
}

// ===== PESTAÑA PRINCIPAL (CORREGIDO: BOTÓN TOMAR EXAMEN USA ID) =====

function renderizarPrincipal() {
    const container = document.getElementById('contenidoExamenes');
    if (!container) return;

    const misCursos = obtenerMisCursos();
    const identidad = obtenerIdentidadAlumno();
    cargarExamenesRealizados();

    if (misCursos.length === 0) {
        container.innerHTML = `
            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1rem; padding: 3rem 2rem; text-align: center; min-height: 300px;">
                <div style="font-size: 4rem;">📚</div>
                <h3 style="color: var(--muted-text); font-size: 1.3rem; margin: 0;">No estás inscrito en ningún curso</h3>
                <p style="color: var(--muted-text); font-size: 0.95rem; margin: 0;">Inscríbete en un curso desde la pestaña "Cursos"</p>
                <button onclick="cambiarPestalla('cursos')" class="btn btn-golden" style="margin-top: 0.5rem; padding: 0.7rem 2rem; border-radius: 2rem; border: none; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; background: var(--golden); color: var(--deep-blue);">
                    <i class="fas fa-arrow-right"></i> Ver Cursos
                </button>
            </div>
        `;
        return;
    }

    let cursosHTML = '';
    let totalExamenes = 0;

    misCursos.forEach(curso => {
        const examenesCurso = DB_EXAMENES.filter(ex => ex.curso === curso);
        totalExamenes += examenesCurso.length;

        const data = CURSOS_DATA[curso] || { icono: '📚' };

        let examenesHTML = '';
        if (examenesCurso.length === 0) {
            examenesHTML = `
                <div style="padding: 0.5rem 0; color: var(--muted-text); font-size: 0.85rem; font-style: italic;">
                    No hay exámenes disponibles para este curso aún
                </div>
            `;
        } else {
            examenesHTML = examenesCurso.map((examen) => {
                const yaRealizado = identidad ? examenYaRealizado(curso, examen.titulo) : false;

                if (yaRealizado) {
                    return `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid rgba(0,0,0,0.04);">
                            <span style="color: var(--dark-text); font-size: 0.9rem;">
                                <i class="fas fa-file-alt" style="color: var(--golden); margin-right: 0.5rem; font-size: 0.8rem;"></i>
                                ${examen.titulo}
                            </span>
                            <button disabled style="
                                background: #e8f5e9;
                                color: #2e7d32;
                                padding: 0.3rem 1rem;
                                border: 2px solid #c8e6c9;
                                border-radius: 2rem;
                                font-weight: 600;
                                cursor: not-allowed;
                                font-family: 'Inter', sans-serif;
                                font-size: 0.8rem;
                                display: flex;
                                align-items: center;
                                gap: 0.4rem;
                                opacity: 0.8;
                            ">
                                <i class="fas fa-check-circle"></i> ✅ Realizado
                            </button>
                        </div>
                    `;
                } else {
                    // CORREGIDO: Usar examen.id en lugar de índice
                    return `
                        <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid rgba(0,0,0,0.04);">
                            <span style="color: var(--dark-text); font-size: 0.9rem;">
                                <i class="fas fa-file-alt" style="color: var(--golden); margin-right: 0.5rem; font-size: 0.8rem;"></i>
                                ${examen.titulo}
                                ${examen.fechaFinal ? `<br><small style="color: #999; font-size: 0.7rem;"><i class="far fa-clock"></i> Límite: ${examen.fechaFinal}</small>` : ''}
                            </span>
                            <button onclick="confirmarInicioExamen(${examen.id})" 
                                style="background: var(--golden); color: var(--deep-blue); padding: 0.3rem 1rem; border: none; border-radius: 2rem; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.8rem; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.4rem;"
                                onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 4px 12px rgba(212,160,56,0.3)';"
                                onmouseout="this.style.transform=''; this.style.boxShadow='';">
                                <i class="fas fa-play"></i> Tomar Examen
                            </button>
                        </div>
                    `;
                }
            }).join('');
        }

        cursosHTML += `
            <div style="background: var(--pure-white); border-radius: 1.2rem; padding: 1.5rem; box-shadow: 0 2px 8px rgba(0,0,0,0.04); border-left: 4px solid var(--golden); margin-bottom: 1rem;">
                <div style="display: flex; align-items: center; gap: 0.8rem; margin-bottom: 0.8rem;">
                    <div style="display: flex; justify-content: center; align-items: center; min-width: 60px;">${data.icono}</div>
                    <div>
                        <h3 style="color: var(--deep-blue); margin: 0; font-size: 1.1rem; font-weight: 700;">${curso}</h3>
                        <span style="color: var(--muted-text); font-size: 0.75rem; background: var(--cream); padding: 0.15rem 0.8rem; border-radius: 2rem;">${examenesCurso.length} examen(es)</span>
                    </div>
                </div>
                <div style="padding-left: 0.5rem;">
                    ${examenesHTML}
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <div>
            <h2 style="color: var(--deep-blue); font-size: 1.3rem; margin: 0 0 1rem 0; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-graduation-cap" style="color: var(--golden);"></i>
                Mis Cursos
                <span style="font-size: 0.8rem; font-weight: 400; color: var(--muted-text); margin-left: 0.5rem;">
                    (${misCursos.length} curso${misCursos.length > 1 ? 's' : ''})
                </span>
            </h2>
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                ${cursosHTML}
            </div>
            <div style="margin-top: 1.5rem; padding: 0.8rem 1rem; background: var(--cream); border-radius: 0.8rem; text-align: center; border-left: 3px solid var(--golden);">
                <p style="color: var(--muted-text); font-size: 0.85rem; margin: 0;">
                    <i class="fas fa-book" style="color: var(--golden);"></i>
                    Cursos inscritos: <strong style="color: var(--deep-blue);">${misCursos.join(', ')}</strong>
                    ${totalExamenes > 0 ? `| <i class="fas fa-file-alt" style="color: var(--golden);"></i> Total exámenes: <strong style="color: var(--deep-blue);">${totalExamenes}</strong>` : ''}
                </p>
            </div>
        </div>
    `;
}

// ===== PESTAÑA CURSOS (CORREGIDO: BOTÓN DESINSCRIBIR) =====

function renderizarCursos() {
    const container = document.getElementById('contenidoCursosDinamico');
    if (!container) return;

    const misCursos = obtenerMisCursos();

    if (misCursos.length === 0) {
        container.innerHTML = `
            <h2 style="color: var(--deep-blue); font-size: 1.5rem; margin-bottom: 1rem;">Catálogo de Cursos</h2>
            <p style="color: var(--muted-text); margin-bottom: 1.5rem;">Elige un curso para inscribirte</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem;">
                ${Object.keys(CURSOS_DATA).map(nombre => `
                    <div onclick="abrirModalInscripcion('${nombre}')" class="curso-card" style="background: var(--pure-white); padding: 2rem; border-radius: 1.5rem; box-shadow: var(--shadow-sm); text-align: center; cursor: pointer; transition: all 0.3s ease; border: 2px solid transparent;">
                        <div style="display: flex; justify-content: center; align-items: center; min-height: 70px; margin-bottom: 0.5rem;">
                            ${CURSOS_DATA[nombre].icono}
                        </div>
                        <h3 style="color: var(--deep-blue); margin: 0.5rem 0;">${nombre}</h3>
                        <p style="color: var(--muted-text); font-size: 0.9rem;">${CURSOS_DATA[nombre].descripcion}</p>
                        <span style="display: inline-block; margin-top: 0.5rem; background: var(--golden); color: var(--deep-blue); padding: 0.2rem 1rem; border-radius: 2rem; font-size: 0.75rem; font-weight: 600;">Inscribirse</span>
                    </div>
                `).join('')}
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <h2 style="color: var(--deep-blue); font-size: 1.5rem; margin-bottom: 0.5rem;">Mis Cursos</h2>
        <p style="color: var(--muted-text); margin-bottom: 1.5rem;">Estás inscrito en ${misCursos.length} curso(s)</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            ${misCursos.map(nombre => {
        // Escapar el nombre del curso para usarlo en onclick
        const nombreEscapado = nombre.replace(/'/g, "\\'").replace(/"/g, '&quot;');
        return `
                <div style="background: var(--pure-white); padding: 1.5rem; border-radius: 1.5rem; box-shadow: var(--shadow-sm); border-left: 4px solid var(--golden);">
                    <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 0.5rem;">
                        <div style="display: flex; justify-content: center; align-items: center; min-width: 60px;">
                            ${CURSOS_DATA[nombre]?.icono || '📚'}
                        </div>
                        <div>
                            <h3 style="color: var(--deep-blue); margin: 0; font-size: 1.1rem;">${nombre}</h3>
                            <p style="color: var(--muted-text); font-size: 0.85rem; margin: 0;">Inscrito</p>
                        </div>
                    </div>
                    <p style="color: var(--dark-text); font-size: 0.9rem; margin: 0.5rem 0;">${CURSOS_DATA[nombre]?.descripcion || 'Curso en progreso'}</p>
                    <div style="display: flex; gap: 0.8rem; margin-top: 0.8rem; flex-wrap: wrap;">
                        <button onclick="verPlanEstudios('${nombreEscapado}')" class="btn btn-golden btn-sm">
                            <i class="fas fa-book-open"></i> Ver Plan de Estudios
                        </button>
                        <button onclick="desinscribirCursoConfirm('${nombreEscapado}')" 
                            style="background: #c62828; color: white; padding: 0.4rem 1rem; border-radius: 0.8rem; border: none; cursor: pointer; font-weight: 600; font-size: 0.75rem; font-family: 'Inter', sans-serif; transition: all 0.3s ease;"
                            onmouseover="this.style.background='#b71c1c';"
                            onmouseout="this.style.background='#c62828';">
                            <i class="fas fa-times"></i> Desinscribir
                        </button>
                    </div>
                </div>
            `;
    }).join('')}
        </div>
        <div style="margin-top: 1.5rem; text-align: center;">
            <button onclick="abrirModalInscripcionNuevo()" class="btn btn-golden" style="background: var(--golden); color: var(--deep-blue); padding: 0.7rem 2rem; border-radius: 2rem; border: none; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif;">
                <i class="fas fa-plus"></i> Inscribirme en otro curso
            </button>
        </div>
    `;
}

// ===== VER PLAN DE ESTUDIOS =====

function verPlanEstudios(curso) {
    const data = CURSOS_DATA[curso];
    if (!data) {
        mostrarModalGenerico('Curso no encontrado', 'El curso solicitado no existe en el sistema.', [
            { texto: 'Entendido', clase: 'btn-golden', callback: () => { } }
        ]);
        return;
    }

    const modal = document.getElementById('modalPlanEstudios');
    const titulo = document.getElementById('modalPlanTitulo');
    const body = document.getElementById('modalPlanBody');

    titulo.innerHTML = `<i class="fas fa-book-open" style="color: var(--golden);"></i> ${curso}`;

    body.innerHTML = `
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: center; align-items: center; min-width: 60px;">${data.icono}</div>
            <div>
                <h3 style="color: var(--deep-blue); margin: 0;">${curso}</h3>
                <p style="color: var(--muted-text); font-size: 0.9rem; margin: 0;">${data.descripcion}</p>
            </div>
        </div>

        <h4 style="color: var(--deep-blue); margin: 1rem 0 0.5rem; border-bottom: 2px solid var(--golden); padding-bottom: 0.3rem;">
            <i class="fas fa-list"></i> Plan de Estudios
        </h4>
        <div style="margin-bottom: 1.5rem;">
            ${data.temas.map((tema, index) => `
                <div style="display: flex; align-items: center; gap: 0.8rem; padding: 0.5rem 0; border-bottom: 1px solid rgba(0,0,0,0.04);">
                    <span style="background: var(--golden); color: var(--deep-blue); width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.8rem;">${index + 1}</span>
                    <span style="color: var(--dark-text);">${tema}</span>
                </div>
            `).join('')}
        </div>

        <h4 style="color: var(--deep-blue); margin: 1rem 0 0.5rem; border-bottom: 2px solid var(--golden); padding-bottom: 0.3rem;">
            <i class="fas fa-tools"></i> Recursos y Ayudas
        </h4>
        <div style="background: var(--cream); padding: 1rem; border-radius: 1rem;">
            <p style="color: var(--dark-text); margin: 0;">${data.ayudas}</p>
        </div>

        <div style="margin-top: 1.5rem; text-align: center;">
            <button onclick="cerrarModalPlanEstudios()" class="btn btn-golden">
                <i class="fas fa-check"></i> Entendido
            </button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalPlanEstudios() {
    const modal = document.getElementById('modalPlanEstudios');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== FLUJO DE CONFIRMACIÓN Y SEGURIDAD PARA EXÁMENES (CORREGIDO: RECIBE ID) =====

function confirmarInicioExamen(examId) {
    // Buscar el examen por ID
    const examen = DB_EXAMENES.find(ex => ex.id === examId);
    if (!examen) {
        console.error('❌ Examen no encontrado con ID:', examId);
        mostrarModalGenerico(
            'Error',
            'No se encontró el examen solicitado.',
            [{ texto: 'Entendido', clase: 'btn-golden', callback: () => { } }]
        );
        return;
    }

    // Verificar si ya fue realizado
    if (examenYaRealizado(examen.curso, examen.titulo)) {
        mostrarModalGenerico(
            'Examen ya realizado',
            `Ya has completado el examen "<strong>${examen.titulo}</strong>".<br>No es posible realizarlo nuevamente.`,
            [{ texto: 'Entendido', clase: 'btn-golden', callback: () => { } }]
        );
        return;
    }

    examenActualParaRendir = { curso: examen.curso, examen: examen };

    mostrarModalGenerico(
        'Confirmar Inicio de Examen',
        `¿Estás seguro de que quieres comenzar el examen "<strong>${examen.titulo}</strong>"?<br><br>
        <small style="color: #888;">Una vez iniciado, deberás completarlo. Solo tienes un intento.</small>`,
        [
            {
                texto: '<i class="fas fa-play"></i> Sí, comenzar',
                clase: 'btn-golden',
                callback: () => iniciarFlujoIdentidad()
            },
            {
                texto: '<i class="fas fa-times"></i> Cancelar',
                clase: 'btn-outline',
                callback: () => { examenActualParaRendir = null; }
            }
        ]
    );
}

function iniciarFlujoIdentidad() {
    const identidadExistente = obtenerIdentidadAlumno();

    let modal = document.getElementById('modalIdentidadAlumno');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalIdentidadAlumno';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            backdrop-filter: blur(4px);
        `;
        modal.innerHTML = `
            <div class="modal-card" style="
                background: white;
                border-radius: 1.5rem;
                padding: 2rem;
                max-width: 450px;
                width: 90%;
                box-shadow: 0 25px 60px rgba(0,0,0,0.3);
                border: 2px solid rgba(201,165,59,0.2);
            ">
                <div class="modal-header" style="
                    background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%);
                    margin: -2rem -2rem 1.5rem -2rem;
                    padding: 1.5rem 2rem;
                    border-radius: 1.5rem 1.5rem 0 0;
                ">
                    <h3 style="color: #c9a53b; margin: 0; font-family: 'Inter', sans-serif;">
                        <i class="fas fa-id-card"></i> Identificación del Alumno
                    </h3>
                </div>
                <p style="color: #5a6474; margin-bottom: 1.5rem; text-align: center; font-family: 'Inter', sans-serif;">
                    Para rendir el examen, necesitamos verificar tu identidad
                </p>
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label for="inputNombreAlumno" style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem; font-family: 'Inter', sans-serif;">
                        <i class="fas fa-user" style="color: #c9a53b;"></i> Nombre completo *
                    </label>
                    <input type="text" id="inputNombreAlumno" placeholder="Ej: Juan Pérez" 
                        style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; box-sizing: border-box; transition: all 0.3s ease;"
                        value="${identidadExistente ? identidadExistente.nombre : ''}"
                        onfocus="this.style.borderColor='#c9a53b'; this.style.boxShadow='0 0 0 3px rgba(201,165,59,0.1)';"
                        onblur="this.style.borderColor='#e8e3d8'; this.style.boxShadow='none';">
                </div>
                <div class="form-group" style="margin-bottom: 1.5rem;">
                    <label for="inputWhatsappAlumno" style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem; font-family: 'Inter', sans-serif;">
                        <i class="fab fa-whatsapp" style="color: #25D366;"></i> Número de WhatsApp *
                    </label>
                    <input type="tel" id="inputWhatsappAlumno" placeholder="Ej: 300 123 4567"
                        style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; box-sizing: border-box; transition: all 0.3s ease;"
                        value="${identidadExistente ? identidadExistente.whatsapp : ''}"
                        onfocus="this.style.borderColor='#c9a53b'; this.style.boxShadow='0 0 0 3px rgba(201,165,59,0.1)';"
                        onblur="this.style.borderColor='#e8e3d8'; this.style.boxShadow='none';">
                </div>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button onclick="verificarIdentidadYRendir()" style="
                        background: linear-gradient(135deg, #d4a038 0%, #c9a53b 100%);
                        color: #1a3a4a;
                        padding: 0.8rem 1.5rem;
                        border: none;
                        border-radius: 2rem;
                        font-weight: 700;
                        cursor: pointer;
                        font-family: 'Inter', sans-serif;
                        transition: all 0.3s ease;
                        flex: 1;
                        box-shadow: 0 4px 15px rgba(212,160,56,0.3);
                    " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
                        <i class="fas fa-play"></i> Comenzar Examen
                    </button>
                    <button onclick="cancelarIdentidad()" style="
                        background: transparent;
                        border: 2px solid #1a3a4a;
                        color: #1a3a4a;
                        padding: 0.8rem 1.5rem;
                        border-radius: 2rem;
                        font-weight: 600;
                        cursor: pointer;
                        font-family: 'Inter', sans-serif;
                        transition: all 0.3s ease;
                    ">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('#inputWhatsappAlumno').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') verificarIdentidadYRendir();
        });

        modal.addEventListener('click', function (e) {
            if (e.target === modal) cancelarIdentidad();
        });
    }

    if (identidadExistente) {
        document.getElementById('inputNombreAlumno').value = identidadExistente.nombre;
        document.getElementById('inputWhatsappAlumno').value = identidadExistente.whatsapp;
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('inputNombreAlumno').focus(), 300);
}

function cancelarIdentidad() {
    const modal = document.getElementById('modalIdentidadAlumno');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    examenActualParaRendir = null;
}

function verificarIdentidadYRendir() {
    const nombre = document.getElementById('inputNombreAlumno').value.trim();
    const whatsapp = document.getElementById('inputWhatsappAlumno').value.trim();

    if (!nombre || !whatsapp) {
        mostrarModalGenerico(
            'Campos incompletos',
            'Por favor completa todos los campos para continuar.',
            [{ texto: 'Entendido', clase: 'btn-golden', callback: () => { } }]
        );
        return;
    }

    if (whatsapp.length < 7) {
        mostrarModalGenerico(
            'WhatsApp inválido',
            'Ingresa un número de WhatsApp válido (mínimo 7 dígitos).',
            [{ texto: 'Corregir', clase: 'btn-golden', callback: () => { } }]
        );
        return;
    }

    guardarIdentidadAlumno(nombre, whatsapp);

    const modal = document.getElementById('modalIdentidadAlumno');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (examenActualParaRendir) {
        rendirExamen(examenActualParaRendir.curso, examenActualParaRendir.examen);
        examenActualParaRendir = null;
    }
}

// ===== RENDERIZAR EXAMEN =====

function rendirExamen(curso, examen) {
    const identidad = obtenerIdentidadAlumno();

    let modal = document.getElementById('modalRendirExamen');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalRendirExamen';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99998;
            backdrop-filter: blur(4px);
        `;
        modal.innerHTML = `
            <div class="modal-card" style="
                background: white;
                border-radius: 1.5rem;
                max-width: 750px;
                width: 95%;
                max-height: 85vh;
                overflow-y: auto;
                box-shadow: 0 25px 60px rgba(0,0,0,0.3);
                border: 2px solid rgba(201,165,59,0.2);
            ">
                <div class="modal-header" style="
                    background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%);
                    padding: 1.5rem 2rem;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    border-radius: 1.5rem 1.5rem 0 0;
                ">
                    <h3 id="tituloExamenRendir" style="color: #c9a53b; margin: 0; font-family: 'Inter', sans-serif;"></h3>
                </div>
                <div class="modal-body" id="bodyExamenRendir" style="padding: 2rem;"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('tituloExamenRendir').innerHTML =
        `<i class="fas fa-pencil-alt" style="color: #c9a53b;"></i> ${examen.titulo}`;

    let preguntasHTML = '';
    if (examen.preguntas && examen.preguntas.length > 0) {
        preguntasHTML = examen.preguntas.map((pregunta, idx) => {
            const numeroPregunta = idx + 1;

            if (pregunta.tipo === 'multiple') {
                const opcionesHTML = pregunta.opciones.map((opcion, opIdx) => {
                    const letra = String.fromCharCode(65 + opIdx);
                    return `
                        <label style="
                            display: flex;
                            align-items: center;
                            gap: 1rem;
                            padding: 1rem 1.2rem;
                            margin-bottom: 0.5rem;
                            border: 2px solid #e8e3d8;
                            border-radius: 1rem;
                            cursor: pointer;
                            transition: all 0.3s ease;
                            background: #fafaf9;
                            font-family: 'Inter', sans-serif;
                        " 
                        onmouseover="this.style.borderColor='#c9a53b'; this.style.background='#fdfaf3'; this.style.transform='translateX(4px)';"
                        onmouseout="this.style.borderColor='#e8e3d8'; this.style.background='#fafaf9'; this.style.transform='';"
                        onclick="
                            const labels = this.parentElement.querySelectorAll('label');
                            labels.forEach(l => {
                                l.style.background = '#fafaf9';
                                l.style.borderColor = '#e8e3d8';
                                l.style.color = '#5a6474';
                            });
                            this.style.background = 'linear-gradient(135deg, #fdfaf3 0%, #fef9e7 100%)';
                            this.style.borderColor = '#c9a53b';
                            this.style.color = '#1a3a4a';
                            this.style.fontWeight = '600';
                        ">
                            <input type="radio" name="pregunta_${idx}" value="${letra}" style="
                                width: 20px;
                                height: 20px;
                                accent-color: #c9a53b;
                                cursor: pointer;
                                flex-shrink: 0;
                            ">
                            <span style="
                                display: flex;
                                align-items: center;
                                gap: 0.8rem;
                                font-size: 0.95rem;
                                color: #5a6474;
                            ">
                                <span style="
                                    background: #e8e3d8;
                                    color: #1a3a4a;
                                    width: 32px;
                                    height: 32px;
                                    border-radius: 50%;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    font-weight: 700;
                                    font-size: 0.85rem;
                                    flex-shrink: 0;
                                ">${letra}</span>
                                ${opcion}
                            </span>
                        </label>
                    `;
                }).join('');

                return `
                    <div style="
                        background: #ffffff;
                        padding: 1.5rem;
                        border-radius: 1.2rem;
                        margin-bottom: 1.5rem;
                        border: 1px solid #e8e3d8;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.03);
                    ">
                        <p style="
                            font-weight: 700;
                            color: #1a3a4a;
                            margin-bottom: 1.2rem;
                            font-size: 1.05rem;
                            font-family: 'Inter', sans-serif;
                            display: flex;
                            align-items: flex-start;
                            gap: 0.5rem;
                        ">
                            <span style="
                                background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%);
                                color: #c9a53b;
                                min-width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 0.85rem;
                                flex-shrink: 0;
                            ">${numeroPregunta}</span>
                            ${pregunta.texto}
                        </p>
                        <div style="display: flex; flex-direction: column;">
                            ${opcionesHTML}
                        </div>
                    </div>
                `;
            } else if (pregunta.tipo === 'vf') {
                return `
                    <div style="
                        background: #ffffff;
                        padding: 1.5rem;
                        border-radius: 1.2rem;
                        margin-bottom: 1.5rem;
                        border: 1px solid #e8e3d8;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.03);
                    ">
                        <p style="
                            font-weight: 700;
                            color: #1a3a4a;
                            margin-bottom: 1.2rem;
                            font-size: 1.05rem;
                            font-family: 'Inter', sans-serif;
                            display: flex;
                            align-items: flex-start;
                            gap: 0.5rem;
                        ">
                            <span style="
                                background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%);
                                color: #c9a53b;
                                min-width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 0.85rem;
                                flex-shrink: 0;
                            ">${numeroPregunta}</span>
                            ${pregunta.texto}
                        </p>
                        <div style="display: flex; gap: 1rem;">
                            <label style="
                                flex: 1;
                                display: flex;
                                align-items: center;
                                gap: 0.8rem;
                                padding: 1rem 1.2rem;
                                border: 2px solid #e8e3d8;
                                border-radius: 1rem;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                background: #fafaf9;
                                font-family: 'Inter', sans-serif;
                            " onmouseover="this.style.borderColor='#4caf50'; this.style.background='#f1f8e9';"
                               onmouseout="this.style.borderColor='#e8e3d8'; this.style.background='#fafaf9';">
                                <input type="radio" name="pregunta_${idx}" value="Verdadero" style="accent-color: #4caf50; width: 18px; height: 18px; cursor: pointer;">
                                <span style="color: #2e7d32; font-weight: 600;">
                                    <i class="fas fa-check-circle"></i> Verdadero
                                </span>
                            </label>
                            <label style="
                                flex: 1;
                                display: flex;
                                align-items: center;
                                gap: 0.8rem;
                                padding: 1rem 1.2rem;
                                border: 2px solid #e8e3d8;
                                border-radius: 1rem;
                                cursor: pointer;
                                transition: all 0.3s ease;
                                background: #fafaf9;
                                font-family: 'Inter', sans-serif;
                            " onmouseover="this.style.borderColor='#ef5350'; this.style.background='#fef0f0';"
                               onmouseout="this.style.borderColor='#e8e3d8'; this.style.background='#fafaf9';">
                                <input type="radio" name="pregunta_${idx}" value="Falso" style="accent-color: #ef5350; width: 18px; height: 18px; cursor: pointer;">
                                <span style="color: #c62828; font-weight: 600;">
                                    <i class="fas fa-times-circle"></i> Falso
                                </span>
                            </label>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div style="
                        background: #ffffff;
                        padding: 1.5rem;
                        border-radius: 1.2rem;
                        margin-bottom: 1.5rem;
                        border: 1px solid #e8e3d8;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.03);
                    ">
                        <p style="
                            font-weight: 700;
                            color: #1a3a4a;
                            margin-bottom: 1rem;
                            font-size: 1.05rem;
                            font-family: 'Inter', sans-serif;
                            display: flex;
                            align-items: flex-start;
                            gap: 0.5rem;
                        ">
                            <span style="
                                background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%);
                                color: #c9a53b;
                                min-width: 30px;
                                height: 30px;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 0.85rem;
                                flex-shrink: 0;
                            ">${numeroPregunta}</span>
                            ${pregunta.texto}
                        </p>
                        <input type="text" id="respuesta_${idx}" placeholder="Escribe tu respuesta..." 
                            style="
                                width: 100%;
                                padding: 0.9rem 1rem;
                                border: 2px solid #e8e3d8;
                                border-radius: 1rem;
                                font-family: 'Inter', sans-serif;
                                font-size: 0.95rem;
                                box-sizing: border-box;
                                transition: all 0.3s ease;
                            "
                            onfocus="this.style.borderColor='#c9a53b'; this.style.boxShadow='0 0 0 3px rgba(201,165,59,0.1)';"
                            onblur="this.style.borderColor='#e8e3d8'; this.style.boxShadow='none';">
                    </div>
                `;
            }
        }).join('');
    } else {
        preguntasHTML = '<p style="text-align: center; color: #5a6474; font-family: \'Inter\', sans-serif;">Este examen no tiene preguntas configuradas.</p>';
    }

    document.getElementById('bodyExamenRendir').innerHTML = `
        <div style="
            margin-bottom: 1.5rem;
            padding: 1rem 1.5rem;
            background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%);
            color: white;
            border-radius: 1rem;
            text-align: center;
            box-shadow: 0 4px 15px rgba(26,58,74,0.2);
        ">
            <p style="margin: 0; font-size: 0.95rem; font-family: 'Inter', sans-serif;">
                <i class="fas fa-user" style="color: #c9a53b;"></i> 
                Alumno: <strong>${identidad?.nombre || 'No identificado'}</strong>
                ${identidad?.whatsapp ? `| <i class="fab fa-whatsapp" style="color: #25D366;"></i> ${identidad.whatsapp}` : ''}
            </p>
        </div>
        <form id="formularioExamen">
            ${preguntasHTML}
        </form>
        <button onclick="finalizarExamen('${curso}', '${examen.titulo}')" 
            style="
                width: 100%;
                margin-top: 1.5rem;
                background: linear-gradient(135deg, #d4a038 0%, #c9a53b 100%);
                color: #1a3a4a;
                padding: 1.2rem;
                border: none;
                border-radius: 1.2rem;
                font-weight: 700;
                font-size: 1.1rem;
                cursor: pointer;
                font-family: 'Inter', sans-serif;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(212, 160, 56, 0.3);
                position: sticky;
                bottom: 1rem;
            "
            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(212,160,56,0.4)';"
            onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(212,160,56,0.3)';">
            <i class="fas fa-paper-plane"></i> Finalizar y Entregar Examen
        </button>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function finalizarExamen(curso, tituloExamen) {
    const identidad = obtenerIdentidadAlumno();

    if (!identidad || !identidad.nombre || !identidad.whatsapp) {
        mostrarModalGenerico(
            'Error de identidad',
            'No se encontró la identidad del alumno. Por favor, vuelve a identificarte.',
            [{ texto: 'Entendido', clase: 'btn-golden', callback: () => { } }]
        );
        return;
    }

    if (examenYaRealizado(curso, tituloExamen)) {
        mostrarModalGenerico(
            'Examen ya entregado',
            'Este examen ya fue realizado anteriormente. No se puede entregar nuevamente.',
            [{ texto: 'Entendido', clase: 'btn-golden', callback: () => { } }]
        );
        return;
    }

    mostrarModalGenerico(
        'Confirmar entrega',
        '¿Estás seguro de que quieres entregar el examen?<br><br><strong style="color: #c62828;">Una vez entregado, no podrás modificarlo ni volver a realizarlo.</strong>',
        [
            {
                texto: '<i class="fas fa-check"></i> Sí, entregar',
                clase: 'btn-golden',
                callback: () => {
                    const examenRealizado = {
                        curso: curso,
                        titulo: tituloExamen,
                        fecha: new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }),
                        alumnoNombre: identidad.nombre,
                        alumnoWhatsapp: identidad.whatsapp,
                        nota: 'Pendiente',
                        calificacion: null,
                        fechaRealizacion: new Date().toISOString()
                    };

                    EXAMENES_REALIZADOS.push(examenRealizado);
                    guardarExamenesRealizados();

                    const modalExamen = document.getElementById('modalRendirExamen');
                    if (modalExamen) {
                        modalExamen.classList.remove('active');
                        document.body.style.overflow = '';
                    }

                    mostrarModalGenerico(
                        '✅ ¡Examen entregado!',
                        'Tu examen ha sido enviado exitosamente.<br><br>Tu resultado estará disponible en la sección de <strong>Revisión</strong> cuando sea calificado por el instructor.',
                        [{
                            texto: '<i class="fas fa-check"></i> Entendido',
                            clase: 'btn-golden',
                            callback: () => {
                                renderizarPrincipal();
                                renderizarRevision();
                            }
                        }]
                    );
                }
            },
            {
                texto: '<i class="fas fa-times"></i> Cancelar',
                clase: 'btn-outline',
                callback: () => { }
            }
        ]
    );
}

// ===== PESTAÑA REVISIÓN =====

function renderizarRevision() {
    const container = document.getElementById('contenidoResultados');
    if (!container) return;

    const identidad = obtenerIdentidadAlumno();
    const misCursos = obtenerMisCursos();

    cargarExamenesRealizados();

    if (!identidad || !identidad.nombre || !identidad.whatsapp) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem;">🔒</div>
                <p style="color: var(--muted-text); font-size: 1rem;">Debes rendir al menos un examen para ver tus resultados.</p>
                <p style="color: var(--muted-text); font-size: 0.85rem;">
                    Tus resultados aparecerán aquí una vez que realices un examen con tu identidad verificada.
                </p>
            </div>
        `;
        return;
    }

    const examenesAlumno = EXAMENES_REALIZADOS.filter(examen =>
        examen.alumnoNombre === identidad.nombre &&
        examen.alumnoWhatsapp === identidad.whatsapp
    );

    if (examenesAlumno.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem;">📝</div>
                <p style="color: var(--muted-text); font-size: 1rem;">No hay resultados para tu usuario.</p>
                <p style="color: var(--muted-text); font-size: 0.85rem;">
                    Alumno: <strong>${identidad.nombre}</strong>
                </p>
                <p style="color: var(--muted-text); font-size: 0.85rem;">
                    Realiza un examen desde la pestaña "Principal" para ver tus resultados aquí.
                </p>
            </div>
        `;
        return;
    }

    if (misCursos.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem;">📊</div>
                <p style="color: var(--muted-text);">No estás inscrito en ningún curso</p>
                <button onclick="cambiarPestalla('cursos')" class="btn btn-golden" style="margin-top: 0.5rem;">
                    <i class="fas fa-arrow-right"></i> Ver Cursos
                </button>
            </div>
        `;
        return;
    }

    let optionsHTML = `<option value="todos">📚 Todos los cursos</option>`;
    const cursosConExamenes = [...new Set(examenesAlumno.map(ex => ex.curso))];
    cursosConExamenes.forEach(curso => {
        const selected = cursoSeleccionadoRevision === curso ? 'selected' : '';
        const icono = CURSOS_DATA[curso]?.icono || '';
        let iconoTexto = icono && !icono.includes('img') ? icono : '📘';
        optionsHTML += `<option value="${curso}" ${selected}>${iconoTexto} ${curso}</option>`;
    });

    let resultadosFiltrados = examenesAlumno;
    let textoResumen = '';
    if (cursoSeleccionadoRevision !== 'todos') {
        resultadosFiltrados = examenesAlumno.filter(ex => ex.curso === cursoSeleccionadoRevision);
        textoResumen = `<strong>${cursoSeleccionadoRevision}</strong>`;
    } else {
        textoResumen = `<strong>${cursosConExamenes.join(', ')}</strong>`;
    }

    if (resultadosFiltrados.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem;">🔍</div>
                <p style="color: var(--muted-text); font-size: 1rem;">No hay resultados para <strong>${cursoSeleccionadoRevision}</strong></p>
                <button onclick="cursoSeleccionadoRevision = 'todos'; renderizarRevision();" class="btn btn-golden" style="margin-top: 0.5rem;">
                    <i class="fas fa-undo"></i> Ver todos los cursos
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div style="margin-bottom: 1.2rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.8rem; background: var(--cream); padding: 1rem 1.2rem; border-radius: 1rem; border-left: 4px solid var(--golden);">
            <label for="filtroCursoRevision" style="font-weight: 600; color: var(--deep-blue); font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-filter" style="color: var(--golden);"></i> Filtrar por:
            </label>
            <select id="filtroCursoRevision" 
                style="flex: 1; min-width: 180px; padding: 0.6rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: var(--pure-white); color: var(--dark-text); cursor: pointer; transition: all 0.3s ease; appearance: none; -webkit-appearance: none; background-image: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"12\" height=\"12\" viewBox=\"0 0 12 12\"><path fill=\"%235a6474\" d=\"M6 8L1 3h10z\"/></svg>'); background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem;">
                ${optionsHTML}
            </select>
        </div>

        <div style="background: var(--deep-blue); color: white; padding: 0.5rem 1rem; border-radius: 0.8rem 0.8rem 0 0; text-align: center; margin-bottom: 0;">
            <p style="margin: 0; font-size: 0.85rem;">
                <i class="fas fa-user" style="color: var(--golden);"></i> 
                Resultados de: <strong>${identidad.nombre}</strong> | 
                <i class="fab fa-whatsapp" style="color: #25D366;"></i> ${identidad.whatsapp}
            </p>
        </div>

        <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem; min-width: 400px;">
                <thead>
                    <tr style="background: var(--deep-blue); color: white;">
                        <th style="padding: 0.8rem 1rem; text-align: left;">Curso</th>
                        <th style="padding: 0.8rem 1rem; text-align: left;">Examen</th>
                        <th style="padding: 0.8rem 1rem; text-align: left;">Fecha</th>
                        <th style="padding: 0.8rem 1rem; text-align: center;">Calificación</th>
                    </tr>
                </thead>
                <tbody>
                    ${resultadosFiltrados.map((examen, index) => `
                        <tr style="border-bottom: 1px solid rgba(0,0,0,0.04); ${index % 2 === 0 ? 'background: #faf8f5;' : ''}">
                            <td style="padding: 0.7rem 1rem; font-weight: 600; color: var(--deep-blue);">${examen.curso}</td>
                            <td style="padding: 0.7rem 1rem; color: var(--dark-text);">${examen.titulo}</td>
                            <td style="padding: 0.7rem 1rem; color: var(--muted-text);">${examen.fecha}</td>
                            <td style="padding: 0.7rem 1rem; text-align: center;">
                                ${examen.calificacion !== null ? `
                                    <span style="background: ${examen.calificacion >= 4 ? '#2e7d32' : examen.calificacion >= 3 ? '#f57c00' : '#c62828'}; color: white; padding: 0.2rem 0.8rem; border-radius: 2rem; font-weight: 600; font-size: 0.8rem;">
                                        ${examen.calificacion.toFixed(1)}
                                    </span>
                                ` : `
                                    <span style="background: #9e9e9e; color: white; padding: 0.2rem 0.8rem; border-radius: 2rem; font-weight: 600; font-size: 0.8rem;">
                                        Pendiente
                                    </span>
                                `}
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
        <div style="margin-top: 1rem; padding: 0.8rem 1rem; background: var(--cream); border-radius: 0.8rem; text-align: center; border-left: 3px solid var(--golden);">
            <p style="color: var(--muted-text); font-size: 0.85rem; margin: 0;">
                <i class="fas fa-chart-line" style="color: var(--golden);"></i>
                Mostrando resultados de: ${textoResumen}
                <span style="margin-left: 0.8rem; background: var(--golden); color: var(--deep-blue); padding: 0.1rem 0.6rem; border-radius: 2rem; font-weight: 600; font-size: 0.75rem;">
                    ${resultadosFiltrados.length} examen(es)
                </span>
            </p>
        </div>
    `;

    const selector = document.getElementById('filtroCursoRevision');
    if (selector) {
        selector.addEventListener('change', function () {
            cursoSeleccionadoRevision = this.value;
            renderizarRevision();
        });
    }
}

// ===== INSCRIPCIÓN =====

function abrirModalInscripcion(curso) {
    const modal = document.getElementById('modalInscripcion');
    const body = document.getElementById('modalInscripcionBody');
    const titulo = document.getElementById('modalInscripcionTitulo');

    const data = CURSOS_DATA[curso];
    const icono = data?.icono || '📚';

    titulo.innerHTML = `<i class="fas fa-graduation-cap" style="color: var(--golden);"></i> ${curso}`;

    if (estaInscrito(curso)) {
        body.innerHTML = `
            <div style="text-align: center; margin: 1rem 0 1.5rem;">
                <div style="font-size: 3rem;">✅</div>
                <p style="color: var(--success); font-weight: 600; font-size: 1.1rem;">Ya estás inscrito en este curso</p>
                <p style="color: var(--muted-text); font-size: 0.9rem;">Puedes verlo en la pestaña "Cursos"</p>
                <button onclick="cerrarModalInscripcion()" class="btn btn-primary" style="margin-top: 1rem;">
                    <i class="fas fa-check"></i> Entendido
                </button>
            </div>
        `;
        modal.classList.add('active');
        return;
    }

    body.innerHTML = `
        <div style="text-align: center; margin: 0.5rem 0 1.5rem;">
            <div style="display: flex; justify-content: center; align-items: center; min-height: 60px;">${icono}</div>
            <p style="color: var(--dark-text); font-weight: 600; font-size: 1.1rem;">¿Estás inscrito en este curso?</p>
        </div>
        <div style="display: flex; gap: 1rem; justify-content: center;">
            <button onclick="confirmarInscripcion(true, '${curso.replace(/'/g, "\\'")}')" class="btn btn-success" style="flex: 1; max-width: 150px;">
                <i class="fas fa-check"></i> SI
            </button>
            <button onclick="confirmarInscripcion(false, '${curso.replace(/'/g, "\\'")}')" class="btn btn-danger" style="flex: 1; max-width: 150px;">
                <i class="fas fa-times"></i> NO
            </button>
        </div>
    `;

    modal.classList.add('active');
}

function abrirModalInscripcionNuevo() {
    const modal = document.getElementById('modalInscripcion');
    const body = document.getElementById('modalInscripcionBody');
    const titulo = document.getElementById('modalInscripcionTitulo');

    const misCursos = obtenerMisCursos();
    const cursosDisponibles = Object.keys(CURSOS_DATA).filter(c => !misCursos.includes(c));

    titulo.innerHTML = `<i class="fas fa-plus-circle" style="color: var(--golden);"></i> Inscribirse en otro curso`;

    if (cursosDisponibles.length === 0) {
        body.innerHTML = `
            <div style="text-align: center; margin: 1rem 0 1.5rem;">
                <div style="font-size: 3rem;">🎉</div>
                <p style="color: var(--success); font-weight: 600; font-size: 1.1rem;">¡Estás inscrito en todos los cursos!</p>
                <button onclick="cerrarModalInscripcion()" class="btn btn-primary" style="margin-top: 1rem;">
                    <i class="fas fa-check"></i> Entendido
                </button>
            </div>
        `;
        modal.classList.add('active');
        return;
    }

    body.innerHTML = `
        <div style="text-align: center; margin-bottom: 1rem;">
            <p style="color: var(--muted-text);">Selecciona un curso para inscribirte</p>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem;">
            ${cursosDisponibles.map(curso => `
                <button onclick="cerrarModalInscripcion(); abrirModalInscripcion('${curso.replace(/'/g, "\\'")}')" 
                    style="background: var(--pure-white); padding: 1rem; border: 2px solid var(--golden); border-radius: 1rem; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.3s ease;">
                    <div style="display: flex; justify-content: center; align-items: center; min-height: 50px;">${CURSOS_DATA[curso].icono}</div>
                    <p style="font-weight: 600; color: var(--deep-blue); margin: 0.3rem 0 0; font-size: 0.85rem;">${curso}</p>
                </button>
            `).join('')}
        </div>
        <button onclick="cerrarModalInscripcion()" class="btn btn-outline" style="width: 100%; margin-top: 1rem;">
            <i class="fas fa-times"></i> Cancelar
        </button>
    `;

    modal.classList.add('active');
}

function confirmarInscripcion(respuesta, curso) {
    const body = document.getElementById('modalInscripcionBody');
    const titulo = document.getElementById('modalInscripcionTitulo');

    if (respuesta) {
        if (estaInscrito(curso)) {
            cerrarModalInscripcion();
            renderizarPrincipal();
            renderizarCursos();
            renderizarRevision();
            cambiarPestalla('principal');
            abrirModalConfirmacionInscripcion('Ya estabas inscrito en este curso');
            return;
        }

        inscribirCurso(curso);
        cerrarModalInscripcion();
        renderizarPrincipal();
        renderizarCursos();
        renderizarRevision();
        cambiarPestalla('principal');
        abrirModalConfirmacionInscripcion(`✅ Inscripción confirmada en ${curso}`);
    } else {
        titulo.innerHTML = `<i class="fas fa-pen" style="color: var(--golden);"></i> Matrícula - ${curso}`;
        body.innerHTML = `
            <div style="text-align: center; margin-bottom: 1.5rem;">
                <p style="color: var(--muted-text);">Completa tus datos para matricularte en <strong>${curso}</strong></p>
            </div>
            <div class="form-group">
                <label for="matriculaNombre">Nombre completo</label>
                <input type="text" id="matriculaNombre" placeholder="Ej: Juan Pérez" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; box-sizing: border-box;">
            </div>
            <div class="form-group">
                <label for="matriculaWhatsapp">Número de WhatsApp</label>
                <input type="tel" id="matriculaWhatsapp" placeholder="Ej: 300 123 4567" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; box-sizing: border-box;">
            </div>
            <div class="form-group">
                <label for="matriculaEmail">Correo electrónico</label>
                <input type="email" id="matriculaEmail" placeholder="Ej: juan@email.com" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; box-sizing: border-box;">
            </div>
            <button onclick="enviarMatricula('${curso.replace(/'/g, "\\'")}')" class="btn btn-primary" style="width: 100%;">
                <i class="fas fa-check"></i> Aceptar matrícula
            </button>
            <button onclick="cerrarModalInscripcion()" class="btn btn-outline" style="width: 100%; margin-top: 0.5rem;">
                <i class="fas fa-times"></i> Cancelar
            </button>
        `;
    }
}

function enviarMatricula(curso) {
    const nombre = document.getElementById('matriculaNombre')?.value.trim();
    const whatsapp = document.getElementById('matriculaWhatsapp')?.value.trim();
    const email = document.getElementById('matriculaEmail')?.value.trim();

    if (!nombre || !whatsapp || !email) {
        mostrarModalGenerico(
            'Campos incompletos',
            'Por favor completa todos los campos para matricularte.',
            [{ texto: 'Entendido', clase: 'btn-golden', callback: () => { } }]
        );
        return;
    }

    inscribirCurso(curso);
    cerrarModalInscripcion();
    renderizarPrincipal();
    renderizarCursos();
    renderizarRevision();
    cambiarPestalla('principal');
    abrirModalConfirmacionInscripcion(`✅ ¡Bienvenido ${nombre}! Te has inscrito en ${curso}`);
}

function cerrarModalInscripcion() {
    document.getElementById('modalInscripcion').classList.remove('active');
}

// ===== DESINSCRIBIR CURSO (CORREGIDO) =====

function desinscribirCursoConfirm(curso) {
    console.log('🔍 Intentando desinscribir curso:', curso);

    if (!curso) {
        console.error('❌ Error: nombre de curso no proporcionado');
        mostrarModalGenerico(
            'Error',
            'No se pudo identificar el curso a desinscribir.',
            [{ texto: 'Entendido', clase: 'btn-golden', callback: () => { } }]
        );
        return;
    }

    mostrarModalGenerico(
        'Confirmar desinscripción',
        `¿Estás seguro de desinscribirte de "<strong>${curso}</strong>"?<br><br>
        <small style="color: #888;">Perderás el acceso a los exámenes de este curso.</small>`,
        [
            {
                texto: '<i class="fas fa-check"></i> Sí, desinscribir',
                clase: 'btn-golden',
                callback: () => {
                    console.log('🗑️ Ejecutando desinscripción de:', curso);
                    desinscribirCurso(curso);

                    // Verificar que se eliminó
                    const cursosActuales = obtenerMisCursos();
                    console.log('📋 Cursos después de desinscribir:', cursosActuales);

                    // Recargar vistas
                    renderizarPrincipal();
                    renderizarCursos();
                    renderizarRevision();

                    if (typeof mostrarNotificacionGaleria === 'function') {
                        mostrarNotificacionGaleria(`❌ Te has desinscrito de ${curso}`, 'info');
                    }

                    mostrarModalGenerico(
                        'Desinscripción exitosa',
                        `Te has desinscrito de "<strong>${curso}</strong>" correctamente.`,
                        [{ texto: 'Entendido', clase: 'btn-golden', callback: () => { } }]
                    );
                }
            },
            {
                texto: '<i class="fas fa-times"></i> Cancelar',
                clase: 'btn-outline',
                callback: () => { }
            }
        ]
    );
}

function abrirModalConfirmacionInscripcion(mensaje) {
    mostrarModalGenerico(
        'Inscripción',
        mensaje,
        [{ texto: 'Entendido', clase: 'btn-golden', callback: () => { } }]
    );
}

function cerrarModalConfirmacionInscripcion() {
    // Mantenido por compatibilidad
}

// ===== PANEL DE ADMINISTRADOR =====

function abrirModalAdmin() {
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
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            backdrop-filter: blur(4px);
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
                border: 2px solid rgba(201,165,59,0.2);
            ">
                <div style="
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                    box-shadow: 0 8px 25px rgba(26,58,74,0.3);
                ">
                    <i class="fas fa-lock" style="font-size: 1.5rem; color: #c9a53b;"></i>
                </div>
                <h3 style="color: #1a3a4a; margin: 0 0 0.5rem 0; font-family: 'Inter', sans-serif;">Acceso Administrador</h3>
                <p style="color: #5a6474; margin-bottom: 1.5rem; font-family: 'Inter', sans-serif;">Ingresa la contraseña de administrador</p>
                <input type="password" id="inputPasswordAdmin" placeholder="Contraseña..."
                    style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; margin-bottom: 1rem; box-sizing: border-box; transition: all 0.3s ease;"
                    onfocus="this.style.borderColor='#c9a53b'; this.style.boxShadow='0 0 0 3px rgba(201,165,59,0.1)';"
                    onblur="this.style.borderColor='#e8e3d8'; this.style.boxShadow='none';">
                <div id="errorPasswordAdmin" style="color: #dc2626; font-size: 0.85rem; display: none; margin-bottom: 0.5rem;">❌ Contraseña incorrecta</div>
                <div style="display: flex; gap: 0.8rem; justify-content: center;">
                    <button onclick="verificarPasswordAdmin()" style="
                        background: linear-gradient(135deg, #d4a038 0%, #c9a53b 100%);
                        color: #1a3a4a;
                        padding: 0.8rem 1.5rem;
                        border: none;
                        border-radius: 2rem;
                        font-weight: 700;
                        cursor: pointer;
                        font-family: 'Inter', sans-serif;
                        flex: 1;
                        transition: all 0.3s ease;
                    ">
                        <i class="fas fa-unlock"></i> Ingresar
                    </button>
                    <button onclick="cerrarModalAdminPassword()" style="
                        background: transparent;
                        border: 2px solid #1a3a4a;
                        color: #1a3a4a;
                        padding: 0.8rem 1.5rem;
                        border-radius: 2rem;
                        font-weight: 600;
                        cursor: pointer;
                        font-family: 'Inter', sans-serif;
                        transition: all 0.3s ease;
                    ">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modalAdminPassword);

        modalAdminPassword.querySelector('#inputPasswordAdmin').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') verificarPasswordAdmin();
        });

        modalAdminPassword.addEventListener('click', function (e) {
            if (e.target === modalAdminPassword) cerrarModalAdminPassword();
        });
    }

    modalAdminPassword.classList.add('active');
    document.getElementById('inputPasswordAdmin').value = '';
    document.getElementById('errorPasswordAdmin').style.display = 'none';
    setTimeout(() => document.getElementById('inputPasswordAdmin').focus(), 300);
}

function cerrarModalAdminPassword() {
    const modal = document.getElementById('modalAdminPassword');
    if (modal) modal.classList.remove('active');
}

function verificarPasswordAdmin() {
    const password = document.getElementById('inputPasswordAdmin').value.trim();
    if (password === 'admin2026') {
        document.getElementById('modalAdminPassword').classList.remove('active');
        modoAdminActivo = true;
        mostrarPanelAdmin();
    } else {
        document.getElementById('errorPasswordAdmin').style.display = 'block';
        document.getElementById('inputPasswordAdmin').value = '';
        document.getElementById('inputPasswordAdmin').focus();
    }
}

function cerrarModalAdmin() {
    document.getElementById('modalAdmin').classList.remove('active');
}

function mostrarPanelAdmin() {
    const dashboard = document.getElementById('dashboardEvaluacion');

    document.querySelectorAll('.tab-btn').forEach(btn => btn.style.display = 'none');
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');

    let panelAdmin = document.getElementById('panelAdmin');
    if (!panelAdmin) {
        panelAdmin = document.createElement('div');
        panelAdmin.id = 'panelAdmin';
        panelAdmin.style.cssText = `display: block; padding: 1rem 0;`;
        dashboard.appendChild(panelAdmin);
    }

    panelAdmin.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 0.8rem;">
            <h2 style="color: var(--deep-blue); font-size: 1.8rem; margin: 0; display: flex; align-items: center; gap: 0.8rem;">
                <i class="fas fa-cog" style="color: var(--golden);"></i> Panel de Administración
            </h2>
            <button onclick="cerrarSesionAdmin()" style="position: fixed; bottom: 2rem; right: 2rem; z-index: 9999; background: #c62828; color: white; padding: 0.6rem 1.5rem; border-radius: 2rem; border: none; font-weight: 600; font-family: 'Inter', sans-serif; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem; font-size: 0.85rem; box-shadow: 0 4px 15px rgba(198, 40, 40, 0.3);">
                <i class="fas fa-sign-out-alt"></i> Cerrar Sesión Admin
            </button>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.2rem;">
            <button onclick="abrirModalCrearExamen()" style="background: var(--pure-white); padding: 1.8rem; border-radius: 1.5rem; border: 2px solid var(--golden); cursor: pointer; transition: all 0.3s ease; box-shadow: var(--shadow-sm); font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: center; gap: 0.8rem; text-align: center;">
                <div style="font-size: 2.5rem;">📝</div>
                <h4 style="color: var(--deep-blue); margin: 0; font-size: 1rem;">Crear nuevo examen</h4>
                <p style="color: var(--muted-text); font-size: 0.8rem; margin: 0;">Agrega un examen con preguntas</p>
            </button>
            <button onclick="abrirModalEditarExamenes()" style="background: var(--pure-white); padding: 1.8rem; border-radius: 1.5rem; border: 2px solid var(--golden); cursor: pointer; transition: all 0.3s ease; box-shadow: var(--shadow-sm); font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: center; gap: 0.8rem; text-align: center;">
                <div style="font-size: 2.5rem;">✏️</div>
                <h4 style="color: var(--deep-blue); margin: 0; font-size: 1rem;">Editar Exámenes</h4>
                <p style="color: var(--muted-text); font-size: 0.8rem; margin: 0;">Elimina o modifica exámenes</p>
            </button>
            <button onclick="abrirModalGestionarResultados()" style="background: var(--pure-white); padding: 1.8rem; border-radius: 1.5rem; border: 2px solid var(--golden); cursor: pointer; transition: all 0.3s ease; box-shadow: var(--shadow-sm); font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: center; gap: 0.8rem; text-align: center;">
                <div style="font-size: 2.5rem;">📊</div>
                <h4 style="color: var(--deep-blue); margin: 0; font-size: 1rem;">Gestionar Resultados</h4>
                <p style="color: var(--muted-text); font-size: 0.8rem; margin: 0;">Asigna calificaciones a los exámenes</p>
            </button>
            <button onclick="abrirModalGestionCursos()" style="background: var(--pure-white); padding: 1.8rem; border-radius: 1.5rem; border: 2px solid var(--golden); cursor: pointer; transition: all 0.3s ease; box-shadow: var(--shadow-sm); font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: center; gap: 0.8rem; text-align: center;">
                <div style="font-size: 2.5rem;">📚</div>
                <h4 style="color: var(--deep-blue); margin: 0; font-size: 1rem;">Gestionar Cursos</h4>
                <p style="color: var(--muted-text); font-size: 0.8rem; margin: 0;">Edita temas y ayudas del Plan de Estudios</p>
            </button>
            <button onclick="abrirModalGestionBiblioteca()" style="background: var(--pure-white); padding: 1.8rem; border-radius: 1.5rem; border: 2px solid var(--golden); cursor: pointer; transition: all 0.3s ease; box-shadow: var(--shadow-sm); font-family: 'Inter', sans-serif; display: flex; flex-direction: column; align-items: center; gap: 0.8rem; text-align: center;">
                <div style="font-size: 2.5rem;">📖</div>
                <h4 style="color: var(--deep-blue); margin: 0; font-size: 1rem;">Gestionar Biblioteca</h4>
                <p style="color: var(--muted-text); font-size: 0.8rem; margin: 0;">Agrega y elimina libros del catálogo</p>
            </button>
        </div>
    `;

    panelAdmin.style.display = 'block';
}

function cerrarSesionAdmin() {
    modoAdminActivo = false;
    const panelAdmin = document.getElementById('panelAdmin');
    if (panelAdmin) panelAdmin.style.display = 'none';

    document.querySelectorAll('.tab-btn').forEach(btn => btn.style.display = 'flex');
    document.getElementById('contenidoPrincipal').style.display = 'block';
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--muted-text)';
    });
    document.querySelector('.tab-btn[data-tab="principal"]').style.background = 'var(--golden)';
    document.querySelector('.tab-btn[data-tab="principal"]').style.color = 'var(--deep-blue)';

    renderizarPrincipal();
    renderizarCursos();
    renderizarRevision();
}

// ===== GESTIONAR RESULTADOS =====

function abrirModalGestionarResultados() {
    let modal = document.getElementById('modalGestionarResultados');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalGestionarResultados';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            backdrop-filter: blur(4px);
        `;
        modal.innerHTML = `
            <div class="modal-card" style="
                background: white;
                border-radius: 1.5rem;
                max-width: 550px;
                width: 95%;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: 0 25px 60px rgba(0,0,0,0.3);
            ">
                <div class="modal-header" style="
                    background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%);
                    padding: 1.5rem 2rem;
                    position: sticky;
                    top: 0;
                    z-index: 10;
                    border-radius: 1.5rem 1.5rem 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                ">
                    <h3 style="color: #c9a53b; margin: 0;"><i class="fas fa-chart-line"></i> Gestionar Resultados</h3>
                    <button onclick="cerrarModalGestionarResultados()" style="background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <div class="modal-body" id="modalResultadosBody" style="padding: 2rem;"></div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('#modalResultadosBody').innerHTML = `
            <div class="form-group">
                <label for="selectCursoResultados" style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem;">Seleccionar Curso</label>
                <select id="selectCursoResultados" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; background: white;">
                    <option value="">-- Selecciona un curso --</option>
                    ${Object.keys(CURSOS_DATA).map(curso => `<option value="${curso}">${curso}</option>`).join('')}
                </select>
            </div>
            <div id="listaExamenesResultados" style="margin-top: 1rem;"></div>
        `;
        modal.querySelector('#selectCursoResultados').addEventListener('change', function () {
            cargarExamenesParaResultados(this.value);
        });
        modal.addEventListener('click', function (e) {
            if (e.target === modal) cerrarModalGestionarResultados();
        });
    }

    document.getElementById('selectCursoResultados').value = '';
    document.getElementById('listaExamenesResultados').innerHTML = '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalGestionarResultados() {
    const modal = document.getElementById('modalGestionarResultados');
    if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
}

function cargarExamenesParaResultados(curso) {
    const container = document.getElementById('listaExamenesResultados');
    if (!curso) { container.innerHTML = '<p style="color: var(--muted-text); text-align: center; padding: 1rem;">Selecciona un curso para ver sus exámenes.</p>'; return; }
    const examenes = DB_EXAMENES.filter(ex => ex.curso === curso);
    if (examenes.length === 0) { container.innerHTML = `<p style="color: var(--muted-text); text-align: center; padding: 1rem;">No hay exámenes para <strong>${curso}</strong></p>`; return; }
    container.innerHTML = `
        <h4 style="color: var(--deep-blue); margin-bottom: 0.8rem; border-bottom: 2px solid var(--golden); padding-bottom: 0.3rem;">Exámenes de ${curso}</h4>
        ${examenes.map((examen, index) => `
            <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; padding: 0.7rem 0; border-bottom: 1px solid rgba(0,0,0,0.04);">
                <div style="flex: 1; min-width: 140px;">
                    <strong style="color: var(--deep-blue); font-size: 0.9rem;">${examen.titulo}</strong>
                    <span style="color: var(--muted-text); font-size: 0.75rem; display: block;">${examen.fecha}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <span style="color: var(--muted-text); font-size: 0.8rem;">Nota:</span>
                    <input type="number" id="nota_${index}" step="0.1" min="1" max="5" value="${examen.calificacion !== null ? examen.calificacion : ''}" style="width: 70px; padding: 0.4rem 0.6rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: center;">
                    <span style="color: var(--muted-text); font-size: 0.7rem;">(1.0 - 5.0)</span>
                    <button onclick="guardarNotaExamen(${index}, '${curso}')" style="background: var(--golden); color: var(--deep-blue); padding: 0.3rem 0.8rem; border: none; border-radius: 0.8rem; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.75rem;"><i class="fas fa-save"></i> Guardar</button>
                </div>
            </div>
        `).join('')}
    `;
}

function guardarNotaExamen(index, curso) {
    const input = document.getElementById(`nota_${index}`);
    if (!input) return;
    const valor = parseFloat(input.value);
    if (isNaN(valor) || valor < 1 || valor > 5) {
        mostrarModalGenerico('Nota inválida', 'Ingresa una nota válida entre 1.0 y 5.0', [{ texto: 'Corregir', clase: 'btn-golden', callback: () => { } }]);
        return;
    }
    const examenesCurso = DB_EXAMENES.filter(ex => ex.curso === curso);
    if (index >= examenesCurso.length) return;
    const examen = examenesCurso[index];
    const globalIndex = DB_EXAMENES.indexOf(examen);
    if (globalIndex === -1) return;
    DB_EXAMENES[globalIndex].calificacion = valor;
    DB_EXAMENES[globalIndex].nota = valor.toFixed(1);
    guardarExamenesEnStorage();
    if (typeof mostrarNotificacionGaleria === 'function') mostrarNotificacionGaleria(`✅ Nota ${valor.toFixed(1)} guardada`, 'success');
    cargarExamenesParaResultados(curso);
    renderizarPrincipal();
    renderizarRevision();
}

// ===== EDITAR EXÁMENES =====

function abrirModalEditarExamenes() {
    let modal = document.getElementById('modalEditarExamenes');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalEditarExamenes';
        modal.className = 'modal-overlay';
        modal.style.cssText = `position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; z-index: 99999; backdrop-filter: blur(4px);`;
        modal.innerHTML = `
            <div class="modal-card" style="background: white; border-radius: 1.5rem; max-width: 550px; width: 95%; max-height: 80vh; overflow-y: auto; box-shadow: 0 25px 60px rgba(0,0,0,0.3);">
                <div class="modal-header" style="background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%); padding: 1.5rem 2rem; position: sticky; top: 0; z-index: 10; border-radius: 1.5rem 1.5rem 0 0; display: flex; justify-content: space-between; align-items: center;">
                    <h3 style="color: #c9a53b; margin: 0;"><i class="fas fa-edit"></i> Editar Exámenes</h3>
                    <button onclick="cerrarModalEditarExamenes()" style="background: transparent; border: none; color: white; font-size: 1.5rem; cursor: pointer;">&times;</button>
                </div>
                <div class="modal-body" id="modalEditarBody" style="padding: 2rem;">
                    <div class="form-group"><label for="selectCursoEditar" style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem;">Seleccionar Curso</label>
                    <select id="selectCursoEditar" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; background: white;"><option value="">-- Selecciona un curso --</option>${Object.keys(CURSOS_DATA).map(curso => `<option value="${curso}">${curso}</option>`).join('')}</select></div>
                    <div id="listaExamenesEditar" style="margin-top: 1rem;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('#selectCursoEditar').addEventListener('change', function () { cargarExamenesParaEditar(this.value); });
        modal.addEventListener('click', function (e) { if (e.target === modal) cerrarModalEditarExamenes(); });
    }
    document.getElementById('selectCursoEditar').value = '';
    document.getElementById('listaExamenesEditar').innerHTML = '';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalEditarExamenes() {
    const modal = document.getElementById('modalEditarExamenes');
    if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
}

function cargarExamenesParaEditar(curso) {
    const container = document.getElementById('listaExamenesEditar');
    if (!curso) { container.innerHTML = '<p style="color: var(--muted-text); text-align: center; padding: 1rem;">Selecciona un curso.</p>'; return; }
    const examenes = DB_EXAMENES.filter(ex => ex.curso === curso);
    if (examenes.length === 0) { container.innerHTML = `<p style="color: var(--muted-text); text-align: center; padding: 1rem;">No hay exámenes para <strong>${curso}</strong></p>`; return; }
    container.innerHTML = `
        <h4 style="color: var(--deep-blue); margin-bottom: 0.8rem; border-bottom: 2px solid var(--golden); padding-bottom: 0.3rem;">Exámenes de ${curso}</h4>
        ${examenes.map((examen) => `
            <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.7rem 0; border-bottom: 1px solid rgba(0,0,0,0.04);">
                <div style="flex: 1; min-width: 120px;"><strong style="color: var(--deep-blue); font-size: 0.9rem;">${examen.titulo}</strong><span style="color: var(--muted-text); font-size: 0.75rem; display: block;">${examen.fecha}</span></div>
                <div style="display: flex; gap: 0.5rem;">
                    <button onclick="editarExamen(${examen.id})" style="background: var(--golden); color: var(--deep-blue); padding: 0.3rem 0.8rem; border: none; border-radius: 0.8rem; font-weight: 600; cursor: pointer; font-size: 0.75rem;"><i class="fas fa-pen"></i> Editar</button>
                    <button onclick="eliminarExamen(${examen.id})" style="background: #c62828; color: white; padding: 0.3rem 0.8rem; border: none; border-radius: 0.8rem; font-weight: 600; cursor: pointer; font-size: 0.75rem;"><i class="fas fa-trash"></i> Eliminar</button>
                </div>
            </div>
        `).join('')}
    `;
}

function editarExamen(examId) {
    const examen = DB_EXAMENES.find(ex => ex.id === examId);
    if (!examen) return;
    const globalIndex = DB_EXAMENES.indexOf(examen);
    if (globalIndex === -1) return;
    cerrarModalEditarExamenes();
    abrirModalCrearExamenParaEditar(globalIndex);
}

function eliminarExamen(examId) {
    const examen = DB_EXAMENES.find(ex => ex.id === examId);
    if (!examen) return;
    mostrarModalGenerico('Eliminar examen', `¿Estás seguro de eliminar "<strong>${examen.titulo}</strong>"?`, [
        {
            texto: 'Eliminar', clase: 'btn-golden', callback: () => {
                const idx = DB_EXAMENES.indexOf(examen);
                if (idx === -1) return;
                DB_EXAMENES.splice(idx, 1);
                guardarExamenesEnStorage();
                if (typeof mostrarNotificacionGaleria === 'function') mostrarNotificacionGaleria('🗑️ Examen eliminado', 'info');
                cargarExamenesParaEditar(examen.curso);
                renderizarPrincipal();
                renderizarRevision();
            }
        },
        { texto: 'Cancelar', clase: 'btn-outline', callback: () => { } }
    ]);
}

// ===== CREAR EXAMEN (CORREGIDO: ENCABEZADO STICKY) =====

function abrirModalCrearExamen() {
    editandoExamenIndex = -1;
    abrirModalCrearExamenForm(null);
}

function abrirModalCrearExamenParaEditar(index) {
    editandoExamenIndex = index;
    abrirModalCrearExamenForm(DB_EXAMENES[index]);
}

function abrirModalCrearExamenForm(examenExistente) {
    let modal = document.getElementById('modalCrearExamenProfesional');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalCrearExamenProfesional';
        modal.className = 'modal-overlay';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 99999;
            backdrop-filter: blur(4px);
        `;
        modal.innerHTML = `
            <div class="modal-card" style="
                background: white;
                border-radius: 1.5rem;
                max-width: 650px;
                width: 95%;
                max-height: 85vh;
                display: flex;
                flex-direction: column;
                box-shadow: 0 25px 60px rgba(0,0,0,0.3);
            ">
                <!-- ENCABEZADO STICKY (CORREGIDO) -->
                <div class="modal-header" style="
                    background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%);
                    padding: 1.5rem 2rem;
                    position: sticky;
                    top: 0;
                    z-index: 100;
                    border-radius: 1.5rem 1.5rem 0 0;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-shrink: 0;
                ">
                    <h3 id="modalExamenTitulo" style="color: #c9a53b; margin: 0; font-family: 'Inter', sans-serif;">
                        <i class="fas fa-plus-circle"></i> Crear nuevo examen
                    </h3>
                    <button onclick="cerrarModalCrearExamenProfesional()" style="
                        background: rgba(255,255,255,0.15);
                        border: none;
                        color: white;
                        font-size: 1.3rem;
                        cursor: pointer;
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;
                    " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">
                        &times;
                    </button>
                </div>
                <!-- CUERPO CON SCROLL -->
                <div class="modal-body" id="modalExamenBody" style="
                    padding: 2rem;
                    overflow-y: auto;
                    flex: 1;
                "></div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', function (e) {
            if (e.target === modal) cerrarModalCrearExamenProfesional();
        });
    }

    // Construir contenido del body
    const body = document.getElementById('modalExamenBody');
    const hoy = new Date().toISOString().split('T')[0];
    const fechaFinal = new Date();
    fechaFinal.setDate(fechaFinal.getDate() + 7);
    const fechaFinalStr = fechaFinal.toISOString().split('T')[0];

    body.innerHTML = `
        <div style="background: #faf8f5; padding: 1.2rem; border-radius: 1rem; margin-bottom: 1.5rem; border-left: 4px solid #c9a53b;">
            <h4 style="color: #1a3a4a; margin: 0 0 0.8rem 0; font-size: 1rem;">📋 Información General</h4>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label for="selectCursoExamenPro" style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem;">Curso *</label>
                <select id="selectCursoExamenPro" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; background: white;">
                    ${Object.keys(CURSOS_DATA).map(curso => `<option value="${curso}">${curso}</option>`).join('')}
                </select>
            </div>
            <div class="form-group" style="margin-bottom: 1rem;">
                <label for="inputTituloExamenPro" style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem;">Nombre del examen *</label>
                <input type="text" id="inputTituloExamenPro" placeholder="Ej: Examen Final - Módulo 3" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; box-sizing: border-box;">
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <div class="form-group">
                    <label for="inputFechaExamenPro" style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem;">Fecha de inicio *</label>
                    <input type="date" id="inputFechaExamenPro" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; box-sizing: border-box;">
                </div>
                <div class="form-group">
                    <label for="inputFechaFinalExamen" style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem;"><i class="fas fa-hourglass-end" style="color: #c9a53b;"></i> Fecha Final *</label>
                    <input type="date" id="inputFechaFinalExamen" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; box-sizing: border-box;">
                </div>
            </div>
            <div class="form-group" style="margin-top: 0.5rem;">
                <label for="inputDescripcionExamen" style="font-weight: 600; font-size: 0.85rem; color: #1a3a4a; display: block; margin-bottom: 0.3rem;">Descripción / Instrucciones</label>
                <textarea id="inputDescripcionExamen" rows="3" placeholder="Escribe las instrucciones para los alumnos..." style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; box-sizing: border-box; resize: vertical;"></textarea>
            </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
            <h4 style="color: #1a3a4a; margin: 0 0 0.8rem 0; font-size: 1rem; display: flex; justify-content: space-between; align-items: center;">
                <span><i class="fas fa-question-circle" style="color: #c9a53b;"></i> Preguntas</span>
                <button onclick="agregarPregunta()" style="background: #c9a53b; color: #1a3a4a; padding: 0.4rem 1.2rem; border: none; border-radius: 2rem; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.85rem;">
                    <i class="fas fa-plus"></i> Agregar Pregunta
                </button>
            </h4>
            <div id="contenedorPreguntas" style="display: flex; flex-direction: column; gap: 1rem;"></div>
        </div>

        <button onclick="guardarExamenCompleto()" style="
            width: 100%;
            background: linear-gradient(135deg, #d4a038 0%, #c9a53b 100%);
            color: #1a3a4a;
            padding: 1rem;
            border: none;
            border-radius: 1.2rem;
            font-weight: 700;
            font-size: 1.1rem;
            cursor: pointer;
            font-family: 'Inter', sans-serif;
            box-shadow: 0 4px 15px rgba(212, 160, 56, 0.3);
        "><i class="fas fa-save"></i> Guardar Examen Completo</button>
    `;

    document.getElementById('inputFechaExamenPro').value = hoy;
    document.getElementById('inputFechaFinalExamen').value = fechaFinalStr;

    if (examenExistente) {
        document.getElementById('modalExamenTitulo').innerHTML = `<i class="fas fa-edit" style="color: #c9a53b;"></i> Editar examen`;
        document.getElementById('selectCursoExamenPro').value = examenExistente.curso;
        document.getElementById('inputTituloExamenPro').value = examenExistente.titulo;
        document.getElementById('inputDescripcionExamen').value = examenExistente.descripcion || '';
        document.getElementById('inputFechaFinalExamen').value = examenExistente.fechaFinal || hoy;
        document.getElementById('contenedorPreguntas').innerHTML = '';
        if (examenExistente.preguntas && examenExistente.preguntas.length > 0) {
            examenExistente.preguntas.forEach((preg) => agregarPreguntaConDatos(preg));
        }
    } else {
        document.getElementById('modalExamenTitulo').innerHTML = `<i class="fas fa-plus-circle" style="color: #c9a53b;"></i> Crear nuevo examen`;
        document.getElementById('selectCursoExamenPro').value = Object.keys(CURSOS_DATA)[0];
        document.getElementById('inputTituloExamenPro').value = '';
        document.getElementById('inputDescripcionExamen').value = '';
        document.getElementById('contenedorPreguntas').innerHTML = '';
        agregarPregunta();
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalCrearExamenProfesional() {
    const modal = document.getElementById('modalCrearExamenProfesional');
    if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
}

function agregarPregunta() { agregarPreguntaConDatos(null); }

function agregarPreguntaConDatos(datos) {
    const container = document.getElementById('contenedorPreguntas');
    const id = Date.now() + Math.random();
    const tipo = datos?.tipo || 'multiple';
    const texto = datos?.texto || '';
    const opciones = datos?.opciones || ['', '', '', ''];
    const correcta = datos?.correcta || '';

    const div = document.createElement('div');
    div.id = `pregunta_${id}`;
    div.style.cssText = `background: #ffffff; padding: 1rem; border-radius: 1rem; border: 1px solid #e8e3d8; position: relative;`;
    div.innerHTML = `
        <button onclick="eliminarPregunta('${id}')" style="position: absolute; top: 0.5rem; right: 0.5rem; background: #c62828; color: white; border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; font-size: 0.8rem; display: flex; align-items: center; justify-content: center;"><i class="fas fa-times"></i></button>
        <div class="form-group" style="margin-bottom: 0.5rem;">
            <label style="font-weight: 600; font-size: 0.8rem; color: #1a3a4a; display: block; margin-bottom: 0.2rem;">Tipo</label>
            <select class="selectTipoPregunta" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: white;">
                <option value="multiple" ${tipo === 'multiple' ? 'selected' : ''}>Selección Múltiple</option>
                <option value="vf" ${tipo === 'vf' ? 'selected' : ''}>Verdadero / Falso</option>
                <option value="corta" ${tipo === 'corta' ? 'selected' : ''}>Respuesta Corta</option>
            </select>
        </div>
        <div class="form-group" style="margin-bottom: 0.5rem;">
            <label style="font-weight: 600; font-size: 0.8rem; color: #1a3a4a;">Texto *</label>
            <input type="text" class="inputTextoPregunta" value="${texto}" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; box-sizing: border-box;">
        </div>
        <div class="opciones-container" style="${tipo !== 'multiple' ? 'display: none;' : ''}">
            <label style="font-weight: 600; font-size: 0.8rem; color: #1a3a4a;">Opciones</label>
            ${['A', 'B', 'C', 'D'].map((letra, idx) => `
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
                    <span style="font-weight: 700; color: #1a3a4a; width: 20px;">${letra}.</span>
                    <input type="text" class="inputOpcion" value="${opciones[idx] || ''}" style="flex: 1; padding: 0.4rem 0.6rem; border: 2px solid #e8e3d8; border-radius: 0.6rem; font-family: 'Inter', sans-serif; font-size: 0.85rem;">
                </div>
            `).join('')}
        </div>
        <div class="form-group" style="margin-bottom: 0.3rem;">
            <label style="font-weight: 600; font-size: 0.8rem; color: #1a3a4a;">Respuesta correcta</label>
            <div class="respuesta-container">
                ${tipo === 'multiple' ? `<select class="selectRespuestaCorrecta" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: white;"><option value="">-- Selecciona --</option>${['A', 'B', 'C', 'D'].map(l => `<option value="${l}" ${correcta === l ? 'selected' : ''}>Opción ${l}</option>`).join('')}</select>`
            : tipo === 'vf' ? `<select class="selectRespuestaCorrecta" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: white;"><option value="Verdadero" ${correcta === 'Verdadero' ? 'selected' : ''}>Verdadero</option><option value="Falso" ${correcta === 'Falso' ? 'selected' : ''}>Falso</option></select>`
                : `<input type="text" class="inputRespuestaCorta" value="${correcta}" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem;">`}
            </div>
        </div>
    `;

    div.querySelector('.selectTipoPregunta').addEventListener('change', function () {
        const ts = this.value;
        const oc = this.closest('.form-group').parentElement.querySelector('.opciones-container');
        const rc = this.closest('.form-group').parentElement.querySelector('.respuesta-container');
        if (ts === 'multiple') {
            oc.style.display = 'block';
            rc.innerHTML = `<select class="selectRespuestaCorrecta" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: white;"><option value="">-- Selecciona --</option>${['A', 'B', 'C', 'D'].map(l => `<option value="${l}">Opción ${l}</option>`).join('')}</select>`;
        } else if (ts === 'vf') {
            oc.style.display = 'none';
            rc.innerHTML = `<select class="selectRespuestaCorrecta" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: white;"><option value="Verdadero">Verdadero</option><option value="Falso">Falso</option></select>`;
        } else {
            oc.style.display = 'none';
            rc.innerHTML = `<input type="text" class="inputRespuestaCorta" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem;">`;
        }
    });

    container.appendChild(div);
}

function eliminarPregunta(id) {
    const el = document.getElementById(`pregunta_${id}`);
    if (el && document.querySelectorAll('#contenedorPreguntas > div').length > 1) el.remove();
    else mostrarModalGenerico('Error', 'Debe haber al menos una pregunta.', [{ texto: 'OK', clase: 'btn-golden', callback: () => { } }]);
}

function guardarExamenCompleto() {
    const curso = document.getElementById('selectCursoExamenPro').value;
    const titulo = document.getElementById('inputTituloExamenPro').value.trim();
    const fecha = document.getElementById('inputFechaExamenPro').value;
    const fechaFinal = document.getElementById('inputFechaFinalExamen').value;
    const descripcion = document.getElementById('inputDescripcionExamen').value.trim();

    if (!titulo || !fecha || !fechaFinal) {
        mostrarModalGenerico('Campos requeridos', 'Completa todos los campos obligatorios.', [{ texto: 'OK', clase: 'btn-golden', callback: () => { } }]);
        return;
    }

    const preguntas = [];
    const bloques = document.querySelectorAll('#contenedorPreguntas > div');
    for (const b of bloques) {
        const tipo = b.querySelector('.selectTipoPregunta').value;
        const texto = b.querySelector('.inputTextoPregunta').value.trim();
        if (!texto) { mostrarModalGenerico('Error', 'Todas las preguntas deben tener texto.', [{ texto: 'OK', clase: 'btn-golden' }]); return; }
        let opciones = [], correcta = '';
        if (tipo === 'multiple') {
            opciones = Array.from(b.querySelectorAll('.inputOpcion')).map(i => i.value.trim());
            if (opciones.some(o => !o)) { mostrarModalGenerico('Error', 'Completa todas las opciones.', [{ texto: 'OK' }]); return; }
            correcta = b.querySelector('.selectRespuestaCorrecta').value;
            if (!correcta) { mostrarModalGenerico('Error', 'Selecciona la respuesta correcta.', [{ texto: 'OK' }]); return; }
        } else if (tipo === 'vf') {
            correcta = b.querySelector('.selectRespuestaCorrecta').value;
        } else {
            correcta = b.querySelector('.inputRespuestaCorta').value.trim();
            if (!correcta) { mostrarModalGenerico('Error', 'Escribe la respuesta correcta.', [{ texto: 'OK' }]); return; }
        }
        preguntas.push({ tipo, texto, opciones, correcta });
    }

    if (preguntas.length === 0) { mostrarModalGenerico('Error', 'Agrega al menos una pregunta.', [{ texto: 'OK' }]); return; }

    const ff = (d) => new Date(d + 'T00:00:00').toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const nuevoExamen = {
        id: examenExistente?.id || generarNuevoId(),
        curso, titulo,
        fecha: ff(fecha),
        fechaFinal: ff(fechaFinal),
        descripcion: descripcion || 'Sin descripción',
        preguntas, nota: 'Pendiente', calificacion: null
    };

    if (editandoExamenIndex >= 0 && editandoExamenIndex < DB_EXAMENES.length) {
        DB_EXAMENES[editandoExamenIndex] = nuevoExamen;
    } else {
        DB_EXAMENES.push(nuevoExamen);
    }

    guardarExamenesEnStorage();
    cerrarModalCrearExamenProfesional();
    renderizarPrincipal();
    renderizarRevision();
    if (typeof mostrarNotificacionGaleria === 'function') mostrarNotificacionGaleria('✅ Examen guardado', 'success');
}

// ===== GESTIONAR CURSOS Y BIBLIOTECA =====

function abrirModalGestionCursos() {
    mostrarModalGenerico('🔧 Gestionar Cursos', 'Próximamente: Aquí podrás editar los temas y ayudas del Plan de Estudios.', [{ texto: 'Entendido', clase: 'btn-golden', callback: () => { } }]);
}
function cerrarModalGestionCursos() { }
function abrirModalGestionBiblioteca() {
    mostrarModalGenerico('🔧 Gestionar Biblioteca', 'Próximamente: Aquí podrás agregar y eliminar libros del catálogo.', [{ texto: 'Entendido', clase: 'btn-golden', callback: () => { } }]);
}
function cerrarModalGestionBiblioteca() { }

// ===== INICIALIZACIÓN =====

document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('inputPasswordEvaluacion');
    if (passwordInput) passwordInput.addEventListener('keydown', function (e) { if (e.key === 'Enter') verificarPasswordEvaluacion(); });
    cargarExamenesDesdeStorage();
    cargarExamenesRealizados();
    asegurarBotonFlotanteAdmin();
});

const originalAbrirDashboard = abrirDashboard;
abrirDashboard = function () {
    cargarExamenesRealizados();
    asegurarBotonFlotanteAdmin();
    originalAbrirDashboard();
};

// ===== EXPORTACIONES GLOBALES =====

window.abrirModalEvaluacion = abrirModalEvaluacion;
window.verificarPasswordEvaluacion = verificarPasswordEvaluacion;
window.cerrarModalEvaluacion = cerrarModalEvaluacion;
window.abrirDashboard = abrirDashboard;
window.cerrarDashboard = cerrarDashboard;
window.cambiarPestalla = cambiarPestalla;
window.renderizarPrincipal = renderizarPrincipal;
window.renderizarCursos = renderizarCursos;
window.renderizarRevision = renderizarRevision;
window.verPlanEstudios = verPlanEstudios;
window.cerrarModalPlanEstudios = cerrarModalPlanEstudios;
window.abrirModalInscripcion = abrirModalInscripcion;
window.abrirModalInscripcionNuevo = abrirModalInscripcionNuevo;
window.confirmarInscripcion = confirmarInscripcion;
window.enviarMatricula = enviarMatricula;
window.cerrarModalInscripcion = cerrarModalInscripcion;
window.desinscribirCursoConfirm = desinscribirCursoConfirm;
window.abrirModalConfirmacionInscripcion = abrirModalConfirmacionInscripcion;
window.cerrarModalConfirmacionInscripcion = cerrarModalConfirmacionInscripcion;
window.abrirModalAdmin = abrirModalAdmin;
window.cerrarModalAdminPassword = cerrarModalAdminPassword;
window.verificarPasswordAdmin = verificarPasswordAdmin;
window.cerrarModalAdmin = cerrarModalAdmin;
window.mostrarPanelAdmin = mostrarPanelAdmin;
window.cerrarSesionAdmin = cerrarSesionAdmin;
window.abrirModalGestionarResultados = abrirModalGestionarResultados;
window.cerrarModalGestionarResultados = cerrarModalGestionarResultados;
window.guardarNotaExamen = guardarNotaExamen;
window.abrirModalEditarExamenes = abrirModalEditarExamenes;
window.cerrarModalEditarExamenes = cerrarModalEditarExamenes;
window.editarExamen = editarExamen;
window.eliminarExamen = eliminarExamen;
window.abrirModalCrearExamen = abrirModalCrearExamen;
window.cerrarModalCrearExamenProfesional = cerrarModalCrearExamenProfesional;
window.agregarPregunta = agregarPregunta;
window.eliminarPregunta = eliminarPregunta;
window.guardarExamenCompleto = guardarExamenCompleto;
window.abrirModalGestionCursos = abrirModalGestionCursos;
window.cerrarModalGestionCursos = cerrarModalGestionCursos;
window.abrirModalGestionBiblioteca = abrirModalGestionBiblioteca;
window.cerrarModalGestionBiblioteca = cerrarModalGestionBiblioteca;
window.confirmarInicioExamen = confirmarInicioExamen;
window.iniciarFlujoIdentidad = iniciarFlujoIdentidad;
window.verificarIdentidadYRendir = verificarIdentidadYRendir;
window.finalizarExamen = finalizarExamen;
window.mostrarModalGenerico = mostrarModalGenerico;
window.cerrarModalGenerico = cerrarModalGenerico;

console.log('✅ LMS.js v5.1 - Correcciones: Desinscribir, Tomar Examen y Notificaciones aplicadas correctamente');