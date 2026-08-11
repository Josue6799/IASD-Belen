/* ========================================
   PANEL DE ADMINISTRACIÓN GENERAL
   IASD Belén · Iglesia Adventista
   ======================================== */

// FORZAR FUNCIONES GLOBALES
window.abrirModalAdminGeneral = function () {
    /* ========================================
       PANEL DE ADMINISTRACIÓN GENERAL
       IASD Belén · Iglesia Adventista
       ======================================== */

    // ===== INYECCIÓN DE ESTILOS CSS (VERSIÓN ESTABLE) =====
    (function () {
        const estilos = document.createElement('style');
        estilos.textContent = `
    /* Animaciones */
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes slideDown {
        from { opacity: 0; max-height: 0; }
        to { opacity: 1; max-height: 500px; }
    }
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    /* Overlay del modal */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(4px);
        animation: fadeInUp 0.3s ease;
    }
    
    /* Tarjeta del admin */
    .tarjeta-admin {
        background: #ffffff;
        border-radius: 1.5rem;
        padding: 2rem;
        border: 2px solid rgba(201,165,59,0.2);
        box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
    }
    .tarjeta-admin:hover {
        transform: translateY(-6px);
        box-shadow: 0 12px 35px rgba(0,0,0,0.12);
        border-color: #c9a53b;
    }
    
    /* Submenú (opciones simples) */
    .submenu-opcion {
        padding: 0.65rem 1rem;
        border-radius: 0.8rem;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #2d3748;
        font-size: 0.9rem;
        font-weight: 500;
        border-bottom: 1px solid rgba(0,0,0,0.04);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .submenu-opcion:hover {
        background: #ffffff;
        color: #1a3a4a;
        padding-left: 1.3rem;
    }
    
    /* ===== ESTILOS EXCLUSIVOS PARA CLUBES (ESTÁTICOS Y ORDENADOS) ===== */
    .categoria-club {
        padding: 0.7rem 1rem;
        border-radius: 0.8rem;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #1a3a4a;
        font-size: 0.95rem;
        font-weight: 600;
        background: #f4f0ea;
        margin-bottom: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid transparent;
    }
    .categoria-club:hover {
        background: #e8e0d4;
        border-color: #c9a53b;
        padding-left: 1.3rem;
    }

    .sub-submenu-container {
        overflow: hidden;
        transition: max-height 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        margin-bottom: 0.5rem;
        padding-left: 0.5rem;
        border-left: 2px solid rgba(201,165,59,0.3);
    }

    .sub-submenu-opcion {
        padding: 0.5rem 1rem 0.5rem 1.5rem;
        border-radius: 0.6rem;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #5a6474;
        font-size: 0.85rem;
        font-weight: 500;
        border-bottom: 1px solid rgba(0,0,0,0.02);
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .sub-submenu-opcion:hover {
        background: #ffffff;
        color: #1a3a4a;
        padding-left: 2rem;
    }

    /* Scrollbar personalizada */
    #panelAdminGeneral::-webkit-scrollbar { width: 8px; }
    #panelAdminGeneral::-webkit-scrollbar-track { background: #f1f1f1; }
    #panelAdminGeneral::-webkit-scrollbar-thumb { background: #c9a53b; border-radius: 4px; }
`;
        document.head.appendChild(estilos);
    })();
}

// ===== DATOS DE LAS TARJETAS Y SUBMENÚS =====
const TARJETAS_ADMIN = [
    {
        id: 'clubes',
        icono: '👥',
        titulo: 'Clubes',
        descripcion: 'Gestionar Aventureros, Conquistadores y Guías Mayores',
        color: '#1a3a4a',
        subopciones: [
            {
                texto: '🌟 Aventureros',
                accion: 'aventureros',
                esCategoria: true,
                clubNombre: 'Aventureros'
            },
            {
                texto: '🏕️ Conquistadores',
                accion: 'conquistadores',
                esCategoria: true,
                clubNombre: 'Conquistadores'
            },
            {
                texto: '🎓 Guías Mayores',
                accion: 'guiasMayores',
                esCategoria: true,
                clubNombre: 'Guías Mayores'
            }
        ]
    },
    {
        id: 'iglesia',
        icono: '⛪',
        titulo: 'Iglesia',
        descripcion: 'Gestionar Cronograma y Base de datos de la Iglesia',
        color: '#2c5f7c',
        subopciones: [
            { texto: '📅 Gestionar Cronograma', accion: 'cronogramaIglesia' },
            { texto: '📋 Encuestas', accion: 'encuestasIglesia' },
            { texto: '📅 Calendario', accion: 'calendarioIglesia' },
            { texto: '📹 Gestionar Transmisiones', accion: 'gestionarTransmisiones' },
            { texto: '🗄️ Base de datos', accion: 'baseDatosIglesia' },
            { texto: '👥 Ver interesados', accion: 'verInteresados' }
        ]
    },
    {
        id: 'biblioteca',
        icono: '📚',
        titulo: 'Biblioteca',
        descripcion: 'Administrar el catálogo de libros disponibles',
        color: '#1a3a4a',
        subopciones: [
            { texto: '➕ Agregar libro', accion: 'agregarLibro' },
            { texto: '🗑️ Eliminar libro', accion: 'eliminarLibro' },
            { texto: '👁️ Ver libros pedidos', accion: 'verLibrosPedidos' }
        ]
    },
    {
        id: 'anuncios',
        icono: '📢',
        titulo: 'Anuncios',
        descripcion: 'Gestionar eventos y anuncios de la iglesia',
        color: '#2c5f7c',
        subopciones: [
            { texto: '➕ Agregar eventos', accion: 'agregarEvento' },
            { texto: '🗑️ Quitar eventos', accion: 'quitarEvento' },
            { texto: '✏️ Editar anuncios', accion: 'editarAnuncios' },
        ]
    }
];

// ===== FUNCIONES DEL MODAL DE CONTRASEÑA =====

function abrirModalAdminGeneral() {
    const modal = document.getElementById('modalAdminGeneral');
    if (!modal) return;

    modal.style.display = 'flex';
    const input = document.getElementById('inputPasswordAdminGeneral');
    const error = document.getElementById('errorPasswordAdminGeneral');

    if (input) input.value = '';
    if (error) error.style.display = 'none';

    setTimeout(() => {
        if (input) input.focus();
    }, 300);
}

function cerrarModalAdminGeneral() {
    const modal = document.getElementById('modalAdminGeneral');
    if (!modal) return;

    modal.style.display = 'none';

    const input = document.getElementById('inputPasswordAdminGeneral');
    const error = document.getElementById('errorPasswordAdminGeneral');
    if (input) input.value = '';
    if (error) error.style.display = 'none';
}

function verificarPasswordAdminGeneral() {
    const input = document.getElementById('inputPasswordAdminGeneral');
    if (!input) return;

    const password = input.value.trim();
    const error = document.getElementById('errorPasswordAdminGeneral');

    if (password === 'admin2026') {
        cerrarModalAdminGeneral();
        abrirPanelAdminGeneral();
    } else {
        if (error) {
            error.style.display = 'block';
            error.textContent = '❌ Contraseña incorrecta';
        }
        input.value = '';
        input.focus();

        // Animación de shake
        const modalCard = document.querySelector('#modalAdminGeneral .modal-card');
        if (modalCard) {
            modalCard.style.animation = 'none';
            modalCard.offsetHeight;
            modalCard.style.animation = 'shake 0.5s ease';
        }
    }
}

// ===== FUNCIONES DEL PANEL DE ADMINISTRACIÓN =====

function abrirPanelAdminGeneral() {
    const panel = document.getElementById('panelAdminGeneral');
    if (!panel) return;

    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';

    // Ocultar botón verde
    const btnAdmin = document.getElementById('btnAdminGeneral');
    if (btnAdmin) btnAdmin.style.display = 'none';

    // Renderizar tarjetas
    renderizarTarjetasAdmin();

    // Mostrar panel
    panel.style.display = 'block';
    panel.scrollTop = 0;
}

function cerrarPanelAdminGeneral() {
    const panel = document.getElementById('panelAdminGeneral');
    if (!panel) return;

    panel.style.display = 'none';

    // Restaurar scroll del body
    document.body.style.overflow = '';

    // Mostrar botón verde nuevamente
    const btnAdmin = document.getElementById('btnAdminGeneral');
    if (btnAdmin) btnAdmin.style.display = 'flex';
}
function renderizarTarjetasAdmin() {
    const container = document.getElementById('tarjetasAdminContainer');
    if (!container) return;

    container.innerHTML = TARJETAS_ADMIN.map(tarjeta => `
    <div id="tarjeta-${tarjeta.id}" class="tarjeta-admin" onclick="toggleSubmenuAdmin('${tarjeta.id}', event)">
        <div style="
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, ${tarjeta.color} 0%, #3d7a9e 100%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.2rem;
            font-size: 2.5rem;
            box-shadow: 0 8px 25px rgba(26,58,74,0.2);
        ">
            ${tarjeta.icono}
        </div>
        <h3 style="
            color: #1a3a4a;
            font-size: 1.3rem;
            font-weight: 700;
            margin-bottom: 0.4rem;
        ">${tarjeta.titulo}</h3>
        <p style="
            color: #5a6474;
            font-size: 0.88rem;
            line-height: 1.5;
            margin-bottom: 1.2rem;
        ">${tarjeta.descripcion}</p>
        <span style="
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: #faf8f5;
            color: #1a3a4a;
            padding: 0.4rem 1.2rem;
            border-radius: 2rem;
            font-size: 0.8rem;
            font-weight: 600;
            border: 1px solid rgba(201,165,59,0.3);
            transition: all 0.3s ease;
        ">
            <i class="fas fa-chevron-down" id="chevron-${tarjeta.id}"></i>
            Ver opciones
        </span>
        <div id="submenu-${tarjeta.id}" style="
            display: none;
            margin-top: 1rem;
            text-align: left;
            background: #faf8f5;
            border-radius: 1rem;
            padding: 0.5rem;
            border: 1px solid #e8e3d8;
            animation: slideDown 0.3s ease forwards;
        "></div>
    </div>
`).join('');
}

function toggleSubmenuAdmin(tarjetaId, event) {
    event.stopPropagation();

    const submenu = document.getElementById(`submenu-${tarjetaId}`);
    const chevron = document.getElementById(`chevron-${tarjetaId}`);

    if (!submenu) return;

    // Cerrar todos los demás submenús
    document.querySelectorAll('[id^="submenu-"]').forEach(sm => {
        if (sm.id !== `submenu-${tarjetaId}`) {
            sm.style.display = 'none';
        }
    });

    // Resetear todos los chevrones
    document.querySelectorAll('[id^="chevron-"]').forEach(ch => {
        ch.style.transform = 'rotate(0deg)';
    });

    const tarjeta = TARJETAS_ADMIN.find(t => t.id === tarjetaId);
    if (!tarjeta) return;

    if (submenu.style.display === 'block') {
        submenu.style.display = 'none';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
        return;
    }

    // Construir submenú
    let html = '';

    // === DISEÑO MODERNO PARA IGLESIA (EVITA ERRORES DE SINTAXIS) ===
    if (tarjetaId === 'iglesia') {
        html += `
        <div class="admin-menu-moderno">
            <div class="admin-menu-item" onclick="ejecutarAccionAdmin('cronogramaIglesia', '📅 Cronograma', event)">
                <div class="item-icono" style="background: var(--deep-blue);">
                    <i class="fas fa-calendar-alt" style="color: white; font-size: 1.2rem;"></i>
                </div>
                <span class="item-texto">Cronograma</span>
                <i class="fas fa-chevron-right item-flecha"></i>
            </div>
            <div class="admin-menu-item" onclick="ejecutarAccionAdmin('encuestasIglesia', '📋 Encuestas', event)">
                <div class="item-icono" style="background: linear-gradient(135deg, #d4a038 0%, #c9a53b 100%);">
                    <i class="fas fa-clipboard-list" style="color: white; font-size: 1.2rem;"></i>
                </div>
                <span class="item-texto">Encuestas</span>
                <i class="fas fa-chevron-right item-flecha"></i>
            </div>
            <div class="admin-menu-item" onclick="ejecutarAccionAdmin('calendarioIglesia', '📅 Calendario', event)">
                <div class="item-icono" style="background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%);">
                    <i class="fas fa-calendar-week" style="color: white; font-size: 1.2rem;"></i>
                </div>
                <span class="item-texto">Calendario</span>
                <i class="fas fa-chevron-right item-flecha"></i>
            </div>
            <div class="admin-menu-item" onclick="ejecutarAccionAdmin('gestionarTransmisiones', '📹 Gestionar Transmisiones', event)">
                <div class="item-icono" style="background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);">
                    <i class="fas fa-video" style="color: white; font-size: 1.2rem;"></i>
                </div>
                <span class="item-texto">Gestionar Transmisiones</span>
                <i class="fas fa-chevron-right item-flecha"></i>
            </div>
            <div class="admin-menu-item" onclick="ejecutarAccionAdmin('baseDatosIglesia', '🗄️ Base de datos', event)">
                <div class="item-icono" style="background: var(--deep-blue);">
                    <i class="fas fa-database" style="color: white; font-size: 1.2rem;"></i>
                </div>
                <span class="item-texto">Base de datos</span>
                <i class="fas fa-chevron-right item-flecha"></i>
            </div>
            <div class="admin-menu-item" onclick="ejecutarAccionAdmin('verInteresados', '👥 Ver interesados', event)">
                <div class="item-icono" style="background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%);">
                    <i class="fas fa-users" style="color: white; font-size: 1.2rem;"></i>
                </div>
                <span class="item-texto">Ver interesados</span>
                <i class="fas fa-chevron-right item-flecha"></i>
            </div>
        </div>
        `;
    } else {
        // === PARA CLUBES, BIBLIOTECA, ANUNCIOS (MANTENER EL BUCLE) ===
        tarjeta.subopciones.forEach(op => {
            if (op.esCategoria && op.clubNombre) {
                html += `<div class="categoria-club" onclick="abrirModalClub('${op.clubNombre}', event)" style="margin-bottom: 0.8rem; border-bottom: 1px solid rgba(201,165,59,0.2); padding-bottom: 0.8rem;">
                    <span>${op.texto}</span>
                    <i class="fas fa-chevron-right" style="font-size:0.7rem; color:#c9a53b;"></i>
                </div>`;
            } else {
                html += `<div class="submenu-opcion" onclick="ejecutarAccionAdmin('${op.accion}', '${op.texto}', event)">
                    <i class="fas fa-circle" style="font-size:0.4rem;color:#c9a53b;flex-shrink:0;"></i>
                    ${op.texto}
                </div>`;
            }
        });
    }

    submenu.innerHTML = html;
    submenu.style.display = 'block';
    if (chevron) chevron.style.transform = 'rotate(180deg)';
}

function toggleSubSubmenu(event, submenuId) {
    event.stopPropagation();
    const container = document.getElementById('sub-submenu-' + submenuId);
    const chevron = document.getElementById('chevron-' + submenuId);
    if (!container) return;

    // Cerrar otros sub-submenús en la misma tarjeta
    const parent = container.closest('[id^="submenu-"]');
    if (parent) {
        parent.querySelectorAll('.sub-submenu-container').forEach(c => {
            if (c.id !== 'sub-submenu-' + submenuId) c.style.maxHeight = '0';
        });
        parent.querySelectorAll('[id^="chevron-"][id*="-"]').forEach(ch => {
            if (ch.id !== 'chevron-' + submenuId) ch.style.transform = 'rotate(0deg)';
        });
    }

    // Alternar el sub-submenú actual
    if (container.style.maxHeight === '0px' || container.style.maxHeight === '') {
        container.style.maxHeight = container.scrollHeight + 'px';
        if (chevron) chevron.style.transform = 'rotate(180deg)';
    } else {
        container.style.maxHeight = '0';
        if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
}

function ejecutarAccionAdmin(accion, texto, event) {
    event.stopPropagation();
    switch (accion) {
        case 'cronogramaIglesia':
            abrirCronograma();
            break;
        case 'encuestasIglesia':
            abrirEncuestas();
            break;
        case 'calendarioIglesia':
            abrirCalendarioIglesiaAdmin();
            break;
        case 'gestionarTransmisiones':
            abrirModalGestionarTransmisiones();
            break;
        case 'baseDatosIglesia':
            alert('Función de Base de datos en construcción');
            break;
        case 'verInteresados':
            abrirVerInteresados();
            break;
        case 'agregarLibro':
            abrirModalAgregarLibro();
            break;
        case 'eliminarLibro':
            abrirModalEliminarLibro();
            break;
        case 'verLibrosPedidos':
            abrirModalVerPedidos();
            break;
        case 'agregarEvento':
            abrirModalAgregarAnuncio();
            break;
        case 'quitarEvento':
            abrirModalQuitarAnuncio(); // ✅ AHORA LLAMA A LA FUNCIÓN REAL
            break;
        case 'editarAnuncios':
            mostrarAlertaAdmin('Función de Editar anuncios en construcción');
            break;
        default:
            alert(`Función: ${texto}`);
            console.log(`🔧 Acción: ${accion} - ${texto}`);
    }
}

// ===== MONITOREO DE VISIBILIDAD DEL BOTÓN =====

function verificarVisibilidadBotonAdmin() {
    const btnAdmin = document.getElementById('btnAdminGeneral');
    const dashboardLMS = document.getElementById('dashboardEvaluacion');
    const panelAdmin = document.getElementById('panelAdminGeneral');

    if (!btnAdmin) return;

    // Si el dashboard del LMS está visible o el panel de admin está abierto, ocultar botón
    if ((dashboardLMS && dashboardLMS.style.display === 'block') ||
        (panelAdmin && panelAdmin.style.display === 'block')) {
        btnAdmin.style.display = 'none';
    } else {
        btnAdmin.style.display = 'flex';
    }
}

// ===== EVENTOS GLOBALES =====

document.addEventListener('keydown', function (e) {
    // Cerrar modal con Escape
    if (e.key === 'Escape') {
        const modalAdminGeneral = document.getElementById('modalAdminGeneral');
        if (modalAdminGeneral && modalAdminGeneral.style.display === 'flex') {
            cerrarModalAdminGeneral();
        }
    }
});

document.addEventListener('DOMContentLoaded', function () {
    // Evento Enter para contraseña
    const inputPassword = document.getElementById('inputPasswordAdminGeneral');
    if (inputPassword) {
        inputPassword.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                verificarPasswordAdminGeneral();
            }
        });
    }

    // Verificar visibilidad inicial del botón
    verificarVisibilidadBotonAdmin();

    // Monitorear cambios en el dashboard del LMS
    const dashboardLMS = document.getElementById('dashboardEvaluacion');
    if (dashboardLMS) {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'style') {
                    verificarVisibilidadBotonAdmin();
                }
            });
        });

        observer.observe(dashboardLMS, {
            attributes: true,
            attributeFilter: ['style']
        });
    }

    // Verificar periódicamente (fallback)
    setInterval(verificarVisibilidadBotonAdmin, 2000);

    console.log('✅ Admin - Panel de Administración General inicializado');
});

// ===== EXPORTACIONES GLOBALES (VERSIÓN QUE FUNCIONA) =====
window.abrirModalAdminGeneral = function () {
    console.log("🟢 Abriendo modal...");

    const modal = document.getElementById('modalAdminGeneral');
    if (!modal) {
        console.error("❌ No se encontró el elemento modalAdminGeneral");
        alert("Error crítico: No se encontró el modal en el HTML. Revisa el ID.");
        return;
    }

    // Forzar display y visibilidad
    modal.style.display = 'flex';
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    modal.style.zIndex = '99999';

    // Limpiar y enfocar
    const input = document.getElementById('inputPasswordAdminGeneral');
    const error = document.getElementById('errorPasswordAdminGeneral');

    if (input) {
        input.value = '';
        setTimeout(() => input.focus(), 300);
    }
    if (error) error.style.display = 'none';

    console.log("✅ Modal abierto correctamente");
};


// ===== ADMIN CALENDARIO DE CLUBES =====
const CLUBES_STORAGE_CALENDARIO = {
    'Aventureros': 'eventos_aventureros',
    'Conquistadores': 'eventos_conquistadores',
    'Guías Mayores': 'eventos_guias_mayores'
};

// ===== MODALES PERSONALIZADOS (reemplazo de alert/confirm) =====

// ===== CONTROL CENTRALIZADO DE SCROLL Y MODALES DEL ADMIN =====
const adminModalesAbiertos = new Set();

function bloquearScrollAdmin(idModal) {
    if (idModal) adminModalesAbiertos.add(idModal);
    document.body.style.overflow = 'hidden';
}

function desbloquearScrollAdmin(idModal) {
    if (idModal) adminModalesAbiertos.delete(idModal);

    const algunModalVisible = [
        document.getElementById('panelAdminGeneral'),
        document.getElementById('modalGestionarTransmisiones'),
        document.getElementById('modalAlertaAdmin'),
        document.getElementById('modalConfirmAdmin'),
        document.getElementById('seccionCalendarioIglesia'),
        document.getElementById('seccionCalendarioClub'),
        document.getElementById('seccionCuotasClub'),
        document.getElementById('seccionBaseDatosClub'),
        document.getElementById('modalAgregarAnuncio'),
        document.getElementById('modalQuitarAnuncio')
    ].some(el => {
        if (!el) return false;
        if (el.classList.contains('active')) return true;
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden';
    });

    if (adminModalesAbiertos.size === 0 && !algunModalVisible) {
        document.body.style.overflow = '';
    } else {
        document.body.style.overflow = 'hidden';
    }
}

// --- Modal de Alerta ---
function mostrarAlertaAdmin(mensaje, titulo = 'Atención') {
    document.getElementById('modalAlertaTitulo').textContent = titulo;
    document.getElementById('modalAlertaMensaje').innerHTML = mensaje;
    bloquearScrollAdmin('modalAlertaAdmin');
    document.getElementById('modalAlertaAdmin').classList.add('active');
}

function cerrarModalAlerta() {
    document.getElementById('modalAlertaAdmin').classList.remove('active');
    desbloquearScrollAdmin('modalAlertaAdmin');
}

// --- Modal de Confirmación ---
let _callbackConfirm = null;

function mostrarConfirmAdmin(mensaje, titulo, callbackSi) {
    document.getElementById('modalConfirmTitulo').textContent = titulo || 'Confirmar acción';
    document.getElementById('modalConfirmMensaje').innerHTML = mensaje;
    _callbackConfirm = callbackSi;
    bloquearScrollAdmin('modalConfirmAdmin');
    document.getElementById('modalConfirmAdmin').classList.add('active');

    const btnSi = document.getElementById('btnConfirmSi');
    btnSi.onclick = function () {
        const callback = _callbackConfirm;
        cerrarModalConfirm();
        if (typeof callback === 'function') {
            callback();
        }
    };
}

function cerrarModalConfirm() {
    document.getElementById('modalConfirmAdmin').classList.remove('active');
    _callbackConfirm = null;
    desbloquearScrollAdmin('modalConfirmAdmin');
}

// Cerrar modales con Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const alerta = document.getElementById('modalAlertaAdmin');
        if (alerta && (alerta.classList.contains('active') || alerta.style.display === 'flex')) {
            cerrarModalAlerta();
            return;
        }

        const confirm = document.getElementById('modalConfirmAdmin');
        if (confirm && (confirm.classList.contains('active') || confirm.style.display === 'flex')) {
            cerrarModalConfirm();
            return;
        }

        const calIglesia = document.getElementById('seccionCalendarioIglesia');
        if (calIglesia && calIglesia.style.display !== 'none' && calIglesia.style.display !== '') {
            cerrarCalendarioIglesiaAdmin();
            return;
        }

        const calClub = document.getElementById('seccionCalendarioClub');
        if (calClub && calClub.style.display !== 'none' && calClub.style.display !== '') {
            cerrarCalendarioClub();
            return;
        }

        const cuotas = document.getElementById('seccionCuotasClub');
        if (cuotas && cuotas.style.display !== 'none' && cuotas.style.display !== '') {
            cerrarCuotasClub();
            return;
        }

        const bdClub = document.getElementById('seccionBaseDatosClub');
        if (bdClub && bdClub.style.display !== 'none' && bdClub.style.display !== '') {
            cerrarBaseDatosClub();
            return;
        }

        const trans = document.getElementById('modalGestionarTransmisiones');
        if (trans && trans.style.display !== 'none' && trans.style.display !== '') {
            cerrarModalGestionarTransmisiones();
            return;
        }

        const panel = document.getElementById('panelAdminGeneral');
        if (panel && panel.style.display !== 'none' && panel.style.display !== '') {
            cerrarPanelAdminGeneral();
            return;
        }
    }
});

// Cerrar al hacer clic fuera del modal (CORREGIDO)
const alertaModal = document.getElementById('modalAlertaAdmin');
if (alertaModal) {
    alertaModal.addEventListener('click', function (e) {
        if (e.target === this) cerrarModalAlerta();
    });
}

const confirmModal = document.getElementById('modalConfirmAdmin');
if (confirmModal) {
    confirmModal.addEventListener('click', function (e) {
        if (e.target === this) cerrarModalConfirm();
    });
}

let storageKeyCalendarioClub = '';

// ===== FUNCIÓN PARA ABRIR EL CALENDARIO DE UN CLUB (MEJORADA) =====
function abrirCalendarioClub() {
    const modal = document.getElementById('modalClubOpciones');
    const clubActual = (modal && modal.dataset.club) ? modal.dataset.club : clubSeleccionadoActual;
    if (!clubActual) {
        console.error('❌ No se encontró el club activo.');
        return;
    }

    storageKeyCalendarioClub = CLUBES_STORAGE_CALENDARIO[clubActual] || 'eventos_aventureros';

    cerrarModalClub();

    const panel = document.getElementById('panelAdminGeneral');
    if (!panel) return;

    let seccion = document.getElementById('seccionCalendarioClub');
    if (!seccion) {
        seccion = document.createElement('div');
        seccion.id = 'seccionCalendarioClub';
        seccion.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#faf8f5;z-index:9999;overflow-y:auto;font-family:Inter,sans-serif;';
        document.body.appendChild(seccion);
    }

    const eventos = cargarEventosClub();
    seccion.innerHTML = generarHTMLCalendarioClub(clubActual);
    seccion.style.display = 'block';
    panel.style.display = 'none';
}

function cerrarCalendarioClub() {
    const seccion = document.getElementById('seccionCalendarioClub');
    const panel = document.getElementById('panelAdminGeneral');
    if (seccion) seccion.style.display = 'none';
    if (panel) panel.style.display = 'block';
    storageKeyCalendarioClub = '';
}

function cargarEventosClub() {
    try { return JSON.parse(localStorage.getItem(storageKeyCalendarioClub)) || []; }
    catch (e) { return []; }
}

function guardarEventosClub(eventos) {
    localStorage.setItem(storageKeyCalendarioClub, JSON.stringify(eventos));
}

function generarHTMLCalendarioClub(clubNombre) {
    const eventos = cargarEventosClub().sort((a, b) => a.fecha.localeCompare(b.fecha));
    let html = '<div style="background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10;">';
    html += '<h3 style="color:#c9a53b;margin:0;font-size:1.2rem;">📅 Calendario - ' + clubNombre + '</h3>';
    html += '<button onclick="cerrarCalendarioClub()" style="background:rgba(255,255,255,0.2);color:white;border:none;padding:0.5rem 1.5rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;"><i class="fas fa-arrow-left"></i> Volver al Panel</button></div>';
    html += '<div style="max-width:800px;margin:0 auto;padding:1rem;">';
    // formulario
    html += '<div style="background:white;border-radius:1.5rem;padding:1.5rem;margin-bottom:1.5rem;box-shadow:0 4px 15px rgba(0,0,0,0.05);">';
    html += '<h4 style="color:#1a3a4a;margin-bottom:1rem;" id="formCalendarioTitulo"><i class="fas fa-plus-circle"></i> Agregar Evento</h4>';
    html += '<input type="text" id="eventoClubTitulo" placeholder="Título del evento" style="width:100%;padding:0.7rem 1rem;border:2px solid #e8e3d8;border-radius:1rem;margin-bottom:0.8rem;font-family:Inter,sans-serif;">';
    html += '<div style="display:flex;gap:0.8rem;flex-wrap:wrap;">';
    html += '<input type="date" id="eventoClubFecha" style="flex:1;padding:0.7rem 1rem;border:2px solid #e8e3d8;border-radius:1rem;font-family:Inter,sans-serif;">';
    html += '<input type="time" id="eventoClubHora" style="flex:1;padding:0.7rem 1rem;border:2px solid #e8e3d8;border-radius:1rem;font-family:Inter,sans-serif;">';
    html += '</div>';
    // Recurrencia
    html += '<div class="recurrencia-opcion">';
    html += '<label><input type="checkbox" id="eventoClubRecurrente" onchange="toggleCampoRecurrencia()"> 📅 Repetir semanalmente</label>';
    html += '</div>';
    html += '<div class="campo-recurrencia" id="campoRecurrencia">';
    html += '<label style="font-weight:600;color:#1a3a4a;">Semanas a repetir:</label>';
    html += '<input type="number" id="eventoClubSemanas" min="1" max="52" value="4">';
    html += '</div>';
    html += '<button onclick="agregarEventoClubAdmin()" id="btnGuardarEventoClub" style="margin-top:0.8rem;width:100%;padding:0.8rem;background:linear-gradient(135deg,#d4a038 0%,#c9a53b 100%);color:#1a3a4a;border:none;border-radius:2rem;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;"><i class="fas fa-plus"></i> Agregar Evento</button>';
    html += '</div>';
    // lista
    html += '<div>';
    if (eventos.length === 0) {
        html += '<p style="text-align:center;color:#5a6474;">No hay eventos programados.</p>';
    } else {
        eventos.forEach(ev => {
            html += '<div class="evento-item">';
            html += '<div class="evento-info"><div class="evento-titulo">' + ev.titulo + '</div>';
            html += '<div class="evento-fecha">' + ev.fecha + ' a las ' + ev.hora + '</div></div>';
            html += '<div>';
            html += '<button class="btn-editar-evento" onclick="abrirEditarEventoClub(' + ev.id + ')" title="Editar">✏️</button>';
            html += '<button class="btn-eliminar-miembro" onclick="eliminarEventoClubAdmin(' + ev.id + ')" title="Quitar">🗑️</button>';
            html += '</div>';
            html += '</div>';
        });
    }
    html += '</div></div>';
    return html;
}

function toggleCampoRecurrencia() {
    const checkbox = document.getElementById('eventoClubRecurrente');
    const campo = document.getElementById('campoRecurrencia');
    if (campo) {
        campo.classList.toggle('visible', checkbox.checked);
    }
}

function abrirEditarEventoClub(id) {
    const eventos = cargarEventosClub();
    const evento = eventos.find(e => String(e.id) === String(id));
    if (!evento) return;

    document.getElementById('eventoClubTitulo').value = evento.titulo;
    document.getElementById('eventoClubFecha').value = evento.fecha;
    document.getElementById('eventoClubHora').value = evento.hora;

    eventoPendienteEditarId = id;

    document.getElementById('formCalendarioTitulo').innerHTML = '<i class="fas fa-edit"></i> Editar Evento';
    document.getElementById('btnGuardarEventoClub').innerHTML = '<i class="fas fa-save"></i> Guardar Cambios';

    // Desmarcar recurrencia al editar
    const checkbox = document.getElementById('eventoClubRecurrente');
    if (checkbox) checkbox.checked = false;
    toggleCampoRecurrencia();
}

function agregarEventoClubAdmin() {
    const titulo = document.getElementById('eventoClubTitulo').value.trim();
    const fecha = document.getElementById('eventoClubFecha').value;
    const hora = document.getElementById('eventoClubHora').value;
    if (!titulo || !fecha || !hora) {
        mostrarAlertaAdmin('Por favor completa todos los campos antes de agregar el evento.');
        return;
    }

    const esRecurrente = document.getElementById('eventoClubRecurrente').checked;
    const semanas = esRecurrente ? parseInt(document.getElementById('eventoClubSemanas').value) || 1 : 1;

    const eventos = cargarEventosClub();

    // Si estamos editando, eliminar el evento original y generar los nuevos (incluyendo posible recurrencia)
    if (eventoPendienteEditarId !== null) {
        // Eliminar el evento original
        const indexOriginal = eventos.findIndex(e => String(e.id) === String(eventoPendienteEditarId));
        if (indexOriginal !== -1) {
            eventos.splice(indexOriginal, 1);
        }
    }

    // Calcular fechas de los sábados si es recurrente
    if (esRecurrente) {
        const fechaBase = new Date(fecha + 'T00:00:00');
        for (let i = 0; i < semanas; i++) {
            const fechaNueva = new Date(fechaBase);
            fechaNueva.setDate(fechaNueva.getDate() + (i * 7));
            const fechaStr = fechaNueva.toISOString().split('T')[0];
            eventos.push({
                id: Date.now() + i, // garantizar unicidad (suficiente mientras no se dispare en el mismo ms)
                titulo: titulo,
                fecha: fechaStr,
                hora: hora
            });
        }
    } else {
        eventos.push({
            id: eventoPendienteEditarId !== null ? eventoPendienteEditarId : Date.now(),
            titulo: titulo,
            fecha: fecha,
            hora: hora
        });
    }

    guardarEventosClub(eventos);

    // Limpiar estado de edición
    eventoPendienteEditarId = null;
    document.getElementById('formCalendarioTitulo').innerHTML = '<i class="fas fa-plus-circle"></i> Agregar Evento';
    document.getElementById('btnGuardarEventoClub').innerHTML = '<i class="fas fa-plus"></i> Agregar Evento';
    document.getElementById('eventoClubTitulo').value = '';
    document.getElementById('eventoClubFecha').value = '';
    document.getElementById('eventoClubHora').value = '';
    const checkbox = document.getElementById('eventoClubRecurrente');
    if (checkbox) checkbox.checked = false;
    toggleCampoRecurrencia();

    // Refrescar vista
    const clubAfectado = Object.keys(CLUBES_STORAGE_CALENDARIO).find(k => CLUBES_STORAGE_CALENDARIO[k] === storageKeyCalendarioClub) || '';
    const seccion = document.getElementById('seccionCalendarioClub');
    if (seccion) {
        seccion.innerHTML = generarHTMLCalendarioClub(clubAfectado);
    }

    window.dispatchEvent(new CustomEvent('datosClubActualizados', { detail: { club: clubAfectado } }));
    window.dispatchEvent(new Event('datosClubActualizados'));
}

function eliminarEventoClubAdmin(id) {
    mostrarConfirmAdmin('¿Estás seguro de que deseas quitar este evento?', 'Eliminar evento', function () {
        let eventos = cargarEventosClub().filter(e => String(e.id) !== String(id));
        guardarEventosClub(eventos);

        const clubAfectado = Object.keys(CLUBES_STORAGE_CALENDARIO).find(k => CLUBES_STORAGE_CALENDARIO[k] === storageKeyCalendarioClub) || '';
        const seccion = document.getElementById('seccionCalendarioClub');
        if (seccion) {
            seccion.innerHTML = generarHTMLCalendarioClub(clubAfectado);
        }

        window.dispatchEvent(new CustomEvent('datosClubActualizados', { detail: { club: clubAfectado } }));
        window.dispatchEvent(new Event('datosClubActualizados'));

        // Toast de confirmación de eliminación exitosa
        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#c62828;color:white;padding:1rem 2rem;border-radius:2rem;font-weight:600;z-index:99999;font-family:Inter,sans-serif;box-shadow:0 8px 30px rgba(198,40,40,0.4);';
        toast.innerHTML = '<i class="fas fa-trash"></i> Evento eliminado correctamente';
        document.body.appendChild(toast);
        setTimeout(function () {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(function () { toast.remove(); }, 500);
        }, 2000);
    });
}
// ===== VARIABLES GLOBALES =====
let miembroPendienteEliminar = null;
let storageKeyPendienteEliminar = null;
let miembroBDPendienteEditarId = null;
let storageKeyBDPendienteEditar = null;
let eventoPendienteEditarId = null; // null = modo crear, número = modo editar

// Mapeo de nombres de club a claves de localStorage
const CLUBES_STORAGE = {
    'Aventureros': 'cuotas_aventureros',
    'Conquistadores': 'cuotas_conquistadores',
    'Guías Mayores': 'cuotas_guias_mayores'
};

// Variable para almacenar la clave actual
let storageKeyActual = '';

// ===== FUNCIONES DEL MODAL DE CLUBES (SIN CAMBIOS) =====

function abrirModalClub(clubNombre, event) {
    if (event) event.stopPropagation();
    clubSeleccionadoActual = clubNombre;
    const modal = document.getElementById('modalClubOpciones');
    const titulo = document.getElementById('modalClubTitulo');
    if (!modal || !titulo) return;
    modal.dataset.club = clubNombre;

    titulo.textContent = 'Opciones para ' + clubNombre;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalClub(event) {
    if (event && event.target !== document.getElementById('modalClubOpciones')) return;
    const modal = document.getElementById('modalClubOpciones');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
    clubSeleccionadoActual = '';
}

// ===== FUNCIÓN PRINCIPAL DE CUOTAS (MEJORADA) =====
function abrirCuotasClub() {
    const modal = document.getElementById('modalClubOpciones');
    const clubActual = modal ? modal.dataset.club : clubSeleccionadoActual;
    if (!clubActual) {
        console.error('❌ No se encontró el club activo.');
        return;
    }
    cerrarModalClub();

    const panel = document.getElementById('panelAdminGeneral');
    if (!panel) return;

    storageKeyActual = CLUBES_STORAGE[clubActual] || 'cuotas_aventureros';
    console.log('✅ Club:', clubActual, '→ Storage key:', storageKeyActual);

    let seccionCuotas = document.getElementById('seccionCuotasClub');
    if (!seccionCuotas) {
        seccionCuotas = document.createElement('div');
        seccionCuotas.id = 'seccionCuotasClub';
        seccionCuotas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#faf8f5;z-index:9999;overflow-y:auto;font-family:Inter,sans-serif;';
        document.body.appendChild(seccionCuotas);
    }

    const miembros = cargarCuotas(storageKeyActual);
    seccionCuotas.innerHTML = generarHTMLCuotas(clubActual, miembros, storageKeyActual);
    seccionCuotas.style.display = 'block';
    panel.style.display = 'none';

    setTimeout(function () {
        vincularEventosCuotas(storageKeyActual);
        actualizarTotalesCuotas(storageKeyActual);
    }, 100);
}
function cerrarSeccionCuotas() {
    const seccionCuotas = document.getElementById('seccionCuotasClub');
    const panel = document.getElementById('panelAdminGeneral');
    if (seccionCuotas) seccionCuotas.style.display = 'none';
    if (panel) panel.style.display = 'block';
    storageKeyActual = '';
}

// ===== FUNCIONES AUXILIARES DE CUOTAS (MODIFICADAS) =====

function cargarCuotas(storageKey) {
    try {
        const data = localStorage.getItem(storageKey);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function guardarCuotas(storageKey, datos) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(datos));
    } catch (e) {
        console.warn('Error guardando cuotas:', e);
    }
}

function generarMesesCuotas() {
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const resultado = [];
    for (let anio = 2026; anio <= 2027; anio++) {
        const mesInicio = anio === 2026 ? 7 : 0;
        const mesFin = anio === 2027 ? 9 : 11;
        for (let m = mesInicio; m <= mesFin; m++) {
            const diasEnMes = new Date(anio, m + 1, 0).getDate();
            const domingos = [];
            for (let d = 1; d <= diasEnMes; d++) {
                const fecha = new Date(anio, m, d);
                if (fecha.getDay() === 0) {
                    const numeroDomingo = domingos.length + 1;
                    const dia = String(d).padStart(2, '0');
                    const mesFormateado = String(m + 1).padStart(2, '0');
                    domingos.push({
                        numero: numeroDomingo,
                        fechaTexto: `${dia}/${mesFormateado}`
                    });
                }
            }
            resultado.push({
                nombre: meses[m],
                anio: anio,
                domingos: domingos,
                clave: anio + '_' + (m + 1)
            });
        }
    }
    return resultado;
}

function generarHTMLCuotas(clubNombre, miembros, storageKey) {
    const meses = generarMesesCuotas();

    // Encabezado (barra superior)
    let html = '<div style="background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10;">';
    html += '<h3 style="color:#c9a53b;margin:0;font-size:1.2rem;">💰 Cuotas - ' + clubNombre + '</h3>';
    html += '<div style="display:flex;align-items:center;gap:0.8rem;">';
    html += '<button class="btn-descargar-excel" onclick="descargarExcelCuotas()" title="Descargar Excel">📥 Descargar Excel</button>';
    html += '<button onclick="cerrarSeccionCuotas()" style="background:rgba(255,255,255,0.2);color:white;border:none;padding:0.5rem 1.5rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;"><i class="fas fa-arrow-left"></i> Volver al Panel</button>';
    html += '</div>';
    html += '</div>';

    html += '<div style="max-width:100%;margin:0 auto;padding:1rem;">';

    // Tarjetas de resumen
    html += '<div class="cuotas-resumen-grid">';
    html += '<div class="cuotas-resumen-card"><div class="resumen-icono">👥</div><div class="resumen-titulo">Total de Miembros</div><div class="resumen-valor" id="cuotasTotalMiembros">' + miembros.length + '</div></div>';
    html += '<div class="cuotas-resumen-card"><div class="resumen-icono">💰</div><div class="resumen-titulo">Total Recaudado</div><div class="resumen-valor" id="cuotasTotalGeneral">$0</div></div>';
    html += '</div>';

    // Formulario agregar miembro
    html += '<div class="cuotas-form-agregar"><input type="text" id="cuotasInputNombre" placeholder="Nombre completo del miembro..."><button id="cuotasBtnAgregar"><i class="fas fa-plus"></i> Agregar Miembro</button></div>';

    // Tabla
    html += '<div class="cuotas-tabla-wrapper"><table class="cuotas-tabla">';
    html += '<thead><tr>';
    html += '<th class="col-nombres" rowspan="2">N°</th>';
    html += '<th class="col-nombres" rowspan="2">NOMBRES</th>';
    meses.forEach(function (mes) {
        html += '<th class="col-mes" colspan="' + (mes.domingos.length + 1) + '">' + mes.nombre + ' ' + mes.anio + '</th>';
    });
    html += '<th class="col-total" rowspan="2">TOTAL<br>GENERAL</th>';
    html += '<th class="col-acciones" rowspan="2"></th>';
    html += '</tr><tr>';
    meses.forEach(function (mes) {
        mes.domingos.forEach(function (d) {
            html += '<th>' + d.fechaTexto + '</th>';
        });
        html += '<th class="col-total">TOTAL</th>';
    });
    html += '</tr></thead><tbody>';

    miembros.forEach(function (miembro, idx) {
        html += '<tr data-miembro-id="' + miembro.id + '">';
        html += '<td class="col-nombres">' + (idx + 1) + '</td>';
        html += '<td class="col-nombres">' + miembro.nombre + '</td>';
        meses.forEach(function (mes) {
            mes.domingos.forEach(function (d) {
                const valor = (miembro.pagos && miembro.pagos[mes.clave] && miembro.pagos[mes.clave][d.numero]) ? miembro.pagos[mes.clave][d.numero] : '';
                html += '<td><input type="number" class="cuotas-input" data-miembro="' + miembro.id + '" data-mes="' + mes.clave + '" data-domingo="' + d.numero + '" value="' + valor + '" placeholder="0" min="0"></td>';
            });
            html += '<td class="col-total-miembro cuotas-total-mes" data-miembro="' + miembro.id + '" data-mes="' + mes.clave + '">$0</td>';
        });
        html += '<td class="col-total-miembro cuotas-total-general" data-miembro="' + miembro.id + '">$0</td>';
        html += '<td class="col-acciones"><button class="btn-eliminar-miembro" onclick="eliminarMiembroCuotas(' + miembro.id + ')" title="Eliminar miembro">🗑️</button></td>';
        html += '</tr>';
    });
    html += '</tbody></table></div>';

    // Totales anuales
    html += '<div class="cuotas-totales-anuales" id="cuotasTotalesAnuales">';
    html += '<div class="cuotas-anual-item"><span class="anual-label">Total recaudado 2026:</span> <span class="anual-valor" id="totalAnual2026">$0</span></div>';
    html += '<div class="cuotas-anual-item"><span class="anual-label">Total recaudado 2027:</span> <span class="anual-valor" id="totalAnual2027">$0</span></div>';
    html += '</div>';

    // Botón guardar y cerrar
    html += '<button class="btn-guardar-cuotas" onclick="guardarYCerrarCuotas()"><i class="fas fa-save"></i> Guardar y Cerrar</button>';
    html += '</div>';

    return html;
}

function vincularEventosCuotas(storageKey) {
    const btnAgregar = document.getElementById('cuotasBtnAgregar');
    const inputNombre = document.getElementById('cuotasInputNombre');
    if (btnAgregar && inputNombre) {
        btnAgregar.onclick = function () { agregarMiembroCuotas(); };
        inputNombre.onkeydown = function (e) { if (e.key === 'Enter') agregarMiembroCuotas(); };
    }
    document.querySelectorAll('.cuotas-input').forEach(function (input) {
        input.addEventListener('input', function () { actualizarTotalesCuotas(storageKey); });
    });
}

function guardarDatosActuales() {
    if (!storageKeyActual) return;
    const miembros = cargarCuotas(storageKeyActual);
    miembros.forEach(function (miembro) {
        if (!miembro.pagos) miembro.pagos = {};
        document.querySelectorAll('.cuotas-input[data-miembro="' + miembro.id + '"]').forEach(function (input) {
            const mesClave = input.getAttribute('data-mes');
            const domingo = parseInt(input.getAttribute('data-domingo'));
            if (!miembro.pagos[mesClave]) miembro.pagos[mesClave] = {};
            miembro.pagos[mesClave][domingo] = parseFloat(input.value) || 0;
        });
    });
    guardarCuotas(storageKeyActual, miembros);
}

function agregarMiembroCuotas() {
    if (!storageKeyActual) return;
    const inputNombre = document.getElementById('cuotasInputNombre');
    if (!inputNombre) return;
    const nombre = inputNombre.value.trim();
    if (!nombre) { alert('Por favor ingresa un nombre.'); return; }

    // ⭐ GUARDAR DATOS ACTUALES ANTES DE AGREGAR
    guardarDatosActuales();

    const miembros = cargarCuotas(storageKeyActual);
    miembros.push({ id: Date.now(), nombre: nombre, pagos: {} });
    guardarCuotas(storageKeyActual, miembros);
    inputNombre.value = '';
    const seccionCuotas = document.getElementById('seccionCuotasClub');
    seccionCuotas.innerHTML = generarHTMLCuotas(clubSeleccionadoActual, miembros, storageKeyActual);
    setTimeout(function () {
        vincularEventosCuotas(storageKeyActual);
        actualizarTotalesCuotas(storageKeyActual);
    }, 100);
}

function eliminarMiembroCuotas(miembroId) {
    miembroPendienteEliminar = miembroId;
    const modal = document.getElementById('modalConfirmarEliminar');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function confirmarEliminarMiembro() {
    if (miembroPendienteEliminar === null || !storageKeyActual) return;
    const miembroId = miembroPendienteEliminar;
    let miembros = cargarCuotas(storageKeyActual);
    miembros = miembros.filter(function (m) { return m.id !== miembroId; });
    guardarCuotas(storageKeyActual, miembros);
    const seccionCuotas = document.getElementById('seccionCuotasClub');
    seccionCuotas.innerHTML = generarHTMLCuotas(clubSeleccionadoActual, miembros, storageKeyActual);
    setTimeout(function () {
        vincularEventosCuotas(storageKeyActual);
        actualizarTotalesCuotas(storageKeyActual);
    }, 100);
    cerrarModalConfirmarEliminar();
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#c62828;color:white;padding:1rem 2rem;border-radius:2rem;font-weight:600;z-index:99999;font-family:Inter,sans-serif;box-shadow:0 8px 30px rgba(198,40,40,0.4);';
    toast.innerHTML = '<i class="fas fa-trash"></i> Miembro eliminado correctamente';
    document.body.appendChild(toast);
    setTimeout(function () { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s ease'; setTimeout(function () { toast.remove(); }, 500); }, 2000);
}

function cerrarModalConfirmarEliminar(event) {
    if (event && event.target !== document.getElementById('modalConfirmarEliminar')) return;
    const modal = document.getElementById('modalConfirmarEliminar');
    if (modal) { modal.classList.remove('active'); document.body.style.overflow = ''; }
    miembroPendienteEliminar = null;
}

function actualizarTotalesCuotas(storageKey) {
    const miembros = cargarCuotas(storageKey);
    let totalGeneral = 0;
    let totalAnual2026 = 0;
    let totalAnual2027 = 0;

    miembros.forEach(function (miembro) {
        let totalMiembro = 0;
        document.querySelectorAll('.cuotas-total-mes[data-miembro="' + miembro.id + '"]').forEach(function (td) {
            const mesClave = td.getAttribute('data-mes');
            let totalMes = 0;
            const anioMes = parseInt(mesClave.split('_')[0]);

            document.querySelectorAll('.cuotas-input[data-miembro="' + miembro.id + '"][data-mes="' + mesClave + '"]').forEach(function (input) {
                totalMes += parseFloat(input.value) || 0;
            });

            td.textContent = '$' + totalMes.toLocaleString('es-CO');
            totalMiembro += totalMes;

            // Acumular por año
            if (anioMes === 2026) totalAnual2026 += totalMes;
            else if (anioMes === 2027) totalAnual2027 += totalMes;
        });

        const tdGeneral = document.querySelector('.cuotas-total-general[data-miembro="' + miembro.id + '"]');
        if (tdGeneral) tdGeneral.textContent = '$' + totalMiembro.toLocaleString('es-CO');
        totalGeneral += totalMiembro;
    });

    // Actualizar tarjetas de resumen general
    const totalMiembrosEl = document.getElementById('cuotasTotalMiembros');
    const totalGeneralEl = document.getElementById('cuotasTotalGeneral');
    if (totalMiembrosEl) totalMiembrosEl.textContent = miembros.length;
    if (totalGeneralEl) totalGeneralEl.textContent = '$' + totalGeneral.toLocaleString('es-CO');

    // Actualizar totales anuales
    const total2026El = document.getElementById('totalAnual2026');
    const total2027El = document.getElementById('totalAnual2027');
    if (total2026El) total2026El.textContent = '$' + totalAnual2026.toLocaleString('es-CO');
    if (total2027El) total2027El.textContent = '$' + totalAnual2027.toLocaleString('es-CO');
}

function descargarExcelCuotas() {
    if (!storageKeyActual) {
        alert('No hay ningún club seleccionado.');
        return;
    }

    const miembros = cargarCuotas(storageKeyActual);
    if (miembros.length === 0) {
        alert('No hay miembros para exportar.');
        return;
    }

    const meses = generarMesesCuotas();
    const clubNombre = Object.keys(CLUBES_STORAGE).find(k => CLUBES_STORAGE[k] === storageKeyActual) || 'Club';

    // Construir el CSV
    let csv = 'N°;Nombre';
    meses.forEach(mes => {
        mes.domingos.forEach(d => {
            csv += ';' + d.fechaTexto + ' (' + mes.nombre + ' ' + mes.anio + ')';
        });
        csv += ';Total ' + mes.nombre + ' ' + mes.anio;
    });
    csv += ';Total General\n';

    let totalAnio2026 = 0;
    let totalAnio2027 = 0;

    miembros.forEach((miembro, idx) => {
        let row = (idx + 1) + ';' + miembro.nombre;
        let totalMiembro = 0;
        meses.forEach(mes => {
            let totalMes = 0;
            mes.domingos.forEach(d => {
                const valor = (miembro.pagos && miembro.pagos[mes.clave] && miembro.pagos[mes.clave][d.numero]) ? miembro.pagos[mes.clave][d.numero] : 0;
                row += ';' + valor;
                totalMes += Number(valor);
            });
            row += ';' + totalMes;
            totalMiembro += totalMes;
            if (mes.anio === 2026) totalAnio2026 += totalMes;
            if (mes.anio === 2027) totalAnio2027 += totalMes;
        });
        row += ';' + totalMiembro;
        csv += row + '\n';
    });

    // Totales anuales al final
    csv += '\nTotales Anuales;;;;;;;;;;;;;;;;;;;;;;\n';
    csv += 'Total Recaudado 2026;;;;;;;;;;;;;;;;;;;;;;' + totalAnio2026 + '\n';
    csv += 'Total Recaudado 2027;;;;;;;;;;;;;;;;;;;;;;' + totalAnio2027 + '\n';

    // Descargar el archivo
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Cuotas_' + clubNombre.replace(/\s+/g, '_') + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function guardarYCerrarCuotas() {
    if (!storageKeyActual) return;
    const miembros = cargarCuotas(storageKeyActual);
    miembros.forEach(function (miembro) {
        if (!miembro.pagos) miembro.pagos = {};
        document.querySelectorAll('.cuotas-input[data-miembro="' + miembro.id + '"]').forEach(function (input) {
            const mesClave = input.getAttribute('data-mes');
            const domingo = parseInt(input.getAttribute('data-domingo'));
            if (!miembro.pagos[mesClave]) miembro.pagos[mesClave] = {};
            miembro.pagos[mesClave][domingo] = parseFloat(input.value) || 0;
        });
    });
    guardarCuotas(storageKeyActual, miembros);
    cerrarSeccionCuotas();
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#2e7d32;color:white;padding:1rem 2rem;border-radius:2rem;font-weight:600;z-index:99999;font-family:Inter,sans-serif;box-shadow:0 8px 30px rgba(46,125,50,0.4);';
    toast.innerHTML = '<i class="fas fa-check-circle"></i> Datos guardados correctamente';
    document.body.appendChild(toast);
    setTimeout(function () { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s ease'; setTimeout(function () { toast.remove(); }, 500); }, 2000);
}

// ===== VARIABLES GLOBALES PARA BASE DE DATOS =====
let miembroBDPendienteEliminarId = null;
let storageKeyBDPendiente = null;

// Mapeo de nombres de club a claves de localStorage para BD
const CLUBES_STORAGE_BD = {
    'Aventureros': 'bd_aventureros',
    'Conquistadores': 'bd_conquistadores',
    'Guías Mayores': 'bd_guias_mayores'
};

// ===== FUNCIÓN PRINCIPAL: ABRIR BASE DE DATOS (MEJORADA) =====
function abrirBaseDatosClub() {
    const modal = document.getElementById('modalClubOpciones');
    const clubActual = modal ? modal.dataset.club : clubSeleccionadoActual;
    if (!clubActual) {
        console.error('❌ No se encontró el club activo.');
        return;
    }
    cerrarModalClub();

    const panel = document.getElementById('panelAdminGeneral');
    if (!panel) return;

    const storageKey = CLUBES_STORAGE_BD[clubActual] || 'bd_aventureros';

    let seccionBD = document.getElementById('seccionBaseDatosClub');
    if (!seccionBD) {
        seccionBD = document.createElement('div');
        seccionBD.id = 'seccionBaseDatosClub';
        seccionBD.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#faf8f5;z-index:9999;overflow-y:auto;font-family:Inter,sans-serif;';
        document.body.appendChild(seccionBD);
    }

    const miembros = cargarMiembrosBD(storageKey);
    seccionBD.innerHTML = generarHTMLBaseDatos(clubActual, miembros, storageKey);
    seccionBD.style.display = 'block';
    panel.style.display = 'none';

    setTimeout(function () {
        vincularEventosBD(storageKey);
    }, 100);
}

function cerrarSeccionBD() {
    const seccionBD = document.getElementById('seccionBaseDatosClub');
    const panel = document.getElementById('panelAdminGeneral');
    if (seccionBD) seccionBD.style.display = 'none';
    if (panel) panel.style.display = 'block';
}

// ===== FUNCIONES DE DATOS =====
function cargarMiembrosBD(storageKey) {
    try {
        const data = localStorage.getItem(storageKey);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function guardarMiembrosBD(storageKey, datos) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(datos));
    } catch (e) {
        console.warn('Error guardando miembros BD:', e);
    }
}

// ===== GENERAR HTML DE LA VISTA =====
function generarHTMLBaseDatos(clubNombre, miembros, storageKey) {
    let html = '<div style="background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10;">';
    html += '<h3 style="color:#c9a53b;margin:0;font-size:1.2rem;">🗄️ Base de datos - ' + clubNombre + '</h3>';
    html += '<button onclick="cerrarSeccionBD()" style="background:rgba(255,255,255,0.2);color:white;border:none;padding:0.5rem 1.5rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;"><i class="fas fa-arrow-left"></i> Volver al Panel</button>';
    html += '</div>';

    html += '<div style="max-width:100%;margin:0 auto;padding:1rem;">';

    // Tarjeta resumen
    html += '<div class="bd-resumen-grid">';
    html += '<div class="bd-resumen-card"><div class="resumen-icono">👥</div><div class="resumen-titulo">Total de personas</div><div class="resumen-valor" id="bdTotalPersonas">' + miembros.length + '</div></div>';
    html += '</div>';

    // Buscador
    html += '<div class="bd-buscador-wrapper">';
    html += '<span class="bd-icono-buscar">🔍</span>';
    html += '<input type="text" id="bdInputBuscar" placeholder="Buscar por nombre..." oninput="filtrarMiembrosBD(\'' + storageKey + '\')">';
    html += '</div>';

    // Botón agregar
    html += '<button class="btn-agregar-miembro" onclick="abrirModalAgregarMiembroBD(\'' + storageKey + '\')"><i class="fas fa-plus"></i> Agregar miembro</button>';

    // Tabla
    html += '<div class="bd-tabla-wrapper"><table class="bd-tabla"><thead><tr>';
    html += '<th>Nombre</th><th>TI/CC</th><th>Tipo Sangre</th><th>Fecha Nac.</th><th>Cartillas</th><th>Especialidades</th><th>Acción</th>';
    html += '</tr></thead><tbody id="bdTablaBody">';

    miembros.forEach(function (m) {
        html += generarFilaMiembroBD(m, storageKey);
    });

    html += '</tbody></table></div>';
    html += '</div>';

    return html;
}

function generarFilaMiembroBD(miembro, storageKey) {
    return '<tr data-miembro-id="' + miembro.id + '">' +
        '<td>' + miembro.nombre + '</td>' +
        '<td>' + miembro.cc + '</td>' +
        '<td>' + (miembro.tipoSangre || '-') + '</td>' +
        '<td>' + (miembro.fechaNacimiento || '-') + '</td>' +
        '<td>' + (miembro.cartillas || '-') + '</td>' +
        '<td>' + (miembro.especialidades || '-') + '</td>' +
        '<td>' +
        '<button class="btn-editar-miembro" onclick="abrirModalEditarMiembroBD(' + miembro.id + ',\'' + storageKey + '\')" title="Editar">✏️</button>' +
        '<button class="btn-eliminar-miembro" onclick="solicitarEliminarMiembroBD(' + miembro.id + ',\'' + storageKey + '\')" title="Eliminar">🗑️</button>' +
        '</td>' +
        '</tr>';
}

function abrirModalEditarMiembroBD(miembroId, storageKey) {
    const miembros = cargarMiembrosBD(storageKey);
    const miembro = miembros.find(m => m.id === miembroId);
    if (!miembro) return;

    // Rellenar formulario
    document.getElementById('bdInputNombre').value = miembro.nombre;
    document.getElementById('bdInputCC').value = miembro.cc;
    document.getElementById('bdInputTipoSangre').value = miembro.tipoSangre || '';
    document.getElementById('bdInputFechaNacimiento').value = miembro.fechaNacimiento || '';
    document.getElementById('bdInputCartillas').value = miembro.cartillas || '';
    document.getElementById('bdInputEspecialidades').value = miembro.especialidades || '';

    // Guardar estado de edición
    miembroBDPendienteEditarId = miembroId;
    storageKeyBDPendienteEditar = storageKey;

    // Cambiar título del modal
    document.getElementById('modalBdTitulo').innerHTML = '<i class="fas fa-edit"></i> Editar Miembro';

    // Abrir modal
    document.getElementById('modalAgregarMiembroBD').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===== FILTRADO EN TIEMPO REAL =====
function filtrarMiembrosBD(storageKey) {
    const input = document.getElementById('bdInputBuscar');
    const termino = input ? input.value.trim().toLowerCase() : '';
    const miembros = cargarMiembrosBD(storageKey);

    const filtrados = termino === '' ? miembros : miembros.filter(function (m) {
        return m.nombre.toLowerCase().includes(termino);
    });

    const tbody = document.getElementById('bdTablaBody');
    if (tbody) {
        tbody.innerHTML = filtrados.map(function (m) {
            return generarFilaMiembroBD(m, storageKey);
        }).join('');
    }

    document.getElementById('bdTotalPersonas').textContent = filtrados.length;
}

// ===== AGREGAR MIEMBRO =====
function abrirModalAgregarMiembroBD(storageKey) {
    // Guardar la clave actual para usarla al guardar
    window._bdStorageKeyActual = storageKey;

    // Limpiar formulario
    document.getElementById('bdInputNombre').value = '';
    document.getElementById('bdInputCC').value = '';
    document.getElementById('bdInputTipoSangre').value = '';
    document.getElementById('bdInputFechaNacimiento').value = '';
    document.getElementById('bdInputCartillas').value = '';
    document.getElementById('bdInputEspecialidades').value = '';

    const modal = document.getElementById('modalAgregarMiembroBD');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarModalAgregarMiembroBD(event) {
    if (event && event.target !== document.getElementById('modalAgregarMiembroBD')) return;
    const modal = document.getElementById('modalAgregarMiembroBD');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    // Restablecer estado de edición
    miembroBDPendienteEditarId = null;
    storageKeyBDPendienteEditar = null;
    document.getElementById('modalBdTitulo').innerHTML = '<i class="fas fa-user-plus"></i> Agregar Miembro';
}

function guardarNuevoMiembroBD() {
    const storageKey = storageKeyBDPendienteEditar || window._bdStorageKeyActual;
    if (!storageKey) return;

    const nombre = document.getElementById('bdInputNombre').value.trim();
    const cc = document.getElementById('bdInputCC').value.trim();
    const tipoSangre = document.getElementById('bdInputTipoSangre').value.trim();
    const fechaNacimiento = document.getElementById('bdInputFechaNacimiento').value;
    const cartillas = document.getElementById('bdInputCartillas').value.trim();
    const especialidades = document.getElementById('bdInputEspecialidades').value.trim();

    if (!nombre || !cc) {
        alert('Por favor completa al menos el nombre y TI/CC.');
        return;
    }

    const miembros = cargarMiembrosBD(storageKey);

    if (miembroBDPendienteEditarId) {
        // Actualizar miembro existente
        const index = miembros.findIndex(m => m.id === miembroBDPendienteEditarId);
        if (index !== -1) {
            miembros[index].nombre = nombre;
            miembros[index].cc = cc;
            miembros[index].tipoSangre = tipoSangre;
            miembros[index].fechaNacimiento = fechaNacimiento;
            miembros[index].cartillas = cartillas;
            miembros[index].especialidades = especialidades;
        }
    } else {
        // Agregar nuevo miembro
        miembros.push({
            id: Date.now(),
            nombre: nombre,
            cc: cc,
            tipoSangre: tipoSangre,
            fechaNacimiento: fechaNacimiento,
            cartillas: cartillas,
            especialidades: especialidades
        });
    }

    guardarMiembrosBD(storageKey, miembros);
    cerrarModalAgregarMiembroBD();

    // Recargar la vista
    const seccionBD = document.getElementById('seccionBaseDatosClub');
    const clubActual = clubSeleccionadoActual || Object.keys(CLUBES_STORAGE_BD).find(k => CLUBES_STORAGE_BD[k] === storageKey) || 'Aventureros';
    seccionBD.innerHTML = generarHTMLBaseDatos(clubActual, miembros, storageKey);
    document.getElementById('bdTotalPersonas').textContent = miembros.length;

    setTimeout(function () {
        vincularEventosBD(storageKey);
    }, 100);

    // Restablecer estado de edición
    miembroBDPendienteEditarId = null;
    storageKeyBDPendienteEditar = null;
    document.getElementById('modalBdTitulo').innerHTML = '<i class="fas fa-user-plus"></i> Agregar Miembro';
}

// ===== ELIMINAR MIEMBRO =====
function solicitarEliminarMiembroBD(miembroId, storageKey) {
    miembroBDPendienteEliminarId = miembroId;
    storageKeyBDPendiente = storageKey;

    const modal = document.getElementById('modalConfirmarEliminarBD');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function confirmarEliminarMiembroBD() {
    if (miembroBDPendienteEliminarId === null || !storageKeyBDPendiente) return;

    let miembros = cargarMiembrosBD(storageKeyBDPendiente);
    miembros = miembros.filter(function (m) { return m.id !== miembroBDPendienteEliminarId; });
    guardarMiembrosBD(storageKeyBDPendiente, miembros);

    // Recargar vista
    const seccionBD = document.getElementById('seccionBaseDatosClub');
    const clubActual = clubSeleccionadoActual || Object.keys(CLUBES_STORAGE_BD).find(k => CLUBES_STORAGE_BD[k] === storageKeyBDPendiente) || 'Aventureros';
    seccionBD.innerHTML = generarHTMLBaseDatos(clubActual, miembros, storageKeyBDPendiente);

    document.getElementById('bdTotalPersonas').textContent = miembros.length;

    setTimeout(function () {
        vincularEventosBD(storageKeyBDPendiente);
    }, 100);

    cerrarModalConfirmarEliminarBD();

    // Toast
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#c62828;color:white;padding:1rem 2rem;border-radius:2rem;font-weight:600;z-index:99999;font-family:Inter,sans-serif;box-shadow:0 8px 30px rgba(198,40,40,0.4);';
    toast.innerHTML = '<i class="fas fa-trash"></i> Miembro eliminado de la base de datos';
    document.body.appendChild(toast);
    setTimeout(function () { toast.style.opacity = '0'; toast.style.transition = 'opacity 0.5s ease'; setTimeout(function () { toast.remove(); }, 500); }, 2000);
}

function cerrarModalConfirmarEliminarBD(event) {
    if (event && event.target !== document.getElementById('modalConfirmarEliminarBD')) return;
    const modal = document.getElementById('modalConfirmarEliminarBD');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    miembroBDPendienteEliminarId = null;
    storageKeyBDPendiente = null;
}

// ===== VINCULAR EVENTOS =====
function vincularEventosBD(storageKey) {
    // El buscador ya tiene oninput en el HTML
    // Solo aseguramos que los botones de eliminar funcionen (ya tienen onclick)
}

// ===== EVENTOS DE TECLADO =====
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        const modal = document.getElementById('modalClubOpciones');
        if (modal && modal.classList.contains('active')) cerrarModalClub();
        const modalConfirm = document.getElementById('modalConfirmarEliminar');
        if (modalConfirm && modalConfirm.classList.contains('active')) cerrarModalConfirmarEliminar();
    }
});

// ===== CRONOGRAMA DE PREDICADORES Y ACTIVIDADES POR FECHA =====
const STORAGE_PREDICADORES_FECHAS = 'cronograma_predicadores_fechas';
const STORAGE_CRONOGRAMA = 'eventosIglesia'; // Mantener compatibilidad con eventos genéricos

let mesAnnoAdminCronograma = '2026-08'; // Mes/año seleccionado en admin por defecto

const ESTRUCTURA_ACTIVIDADES = [
    {
        categoria: 'Culto',
        icono: 'fa-pray',
        actividades: [
            { nombre: 'Canto', diaSemana: 6, diaNombre: 'Sábados' },
            { nombre: 'Escuela Sabática', diaSemana: 6, diaNombre: 'Sábados' },
            { nombre: 'Minuto Misionero', diaSemana: 6, diaNombre: 'Sábados' },
            { nombre: 'Predica', diaSemana: 6, diaNombre: 'Sábados' }
        ]
    },
    {
        categoria: 'Sociedad de Jóvenes',
        icono: 'fa-users',
        actividades: [
            { nombre: 'Sociedad de Jóvenes', diaSemana: 6, diaNombre: 'Sábados (tarde)' }
        ]
    },
    {
        categoria: 'Reuniones de Oración',
        icono: 'fa-hands-praying',
        actividades: [
            { nombre: 'Lunes de Oración', diaSemana: 1, diaNombre: 'Lunes' },
            { nombre: 'Miércoles de Testimonio', diaSemana: 3, diaNombre: 'Miércoles' }
        ]
    },
    {
        categoria: 'Grupos Pequeños',
        icono: 'fa-home',
        actividades: [
            { nombre: 'Unidos en Verdad', diaSemana: 2, diaNombre: 'Martes' },
            { nombre: 'Mansión Gloriosa', diaSemana: 2, diaNombre: 'Martes' },
            { nombre: 'Mansión Gloriosa Kid', diaSemana: 2, diaNombre: 'Martes' },
            { nombre: 'Aposento Alto', diaSemana: 2, diaNombre: 'Martes' },
            { nombre: 'Jehová Jireh', diaSemana: 2, diaNombre: 'Martes' },
            { nombre: 'Maranatha 1', diaSemana: 2, diaNombre: 'Martes' },
            { nombre: 'Maranatha 2', diaSemana: 2, diaNombre: 'Martes' },
            { nombre: 'Ah de Venir', diaSemana: 2, diaNombre: 'Martes' }
        ]
    }
];

function cargarPredicadoresFechas() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_PREDICADORES_FECHAS)) || {};
    } catch (e) {
        return {};
    }
}

function guardarPredicadoresFechas(data) {
    localStorage.setItem(STORAGE_PREDICADORES_FECHAS, JSON.stringify(data));
    window.dispatchEvent(new Event('datosCronogramaActualizados'));
    window.dispatchEvent(new Event('datosIglesiaActualizados'));
}

function calcularFechasDelMes(ano, mesIndex, diaSemanaTarget) {
    const fechas = [];
    const numDias = new Date(ano, mesIndex + 1, 0).getDate();
    for (let d = 1; d <= numDias; d++) {
        const fecha = new Date(ano, mesIndex, d);
        if (fecha.getDay() === diaSemanaTarget) {
            const mm = String(mesIndex + 1).padStart(2, '0');
            const dd = String(d).padStart(2, '0');
            fechas.push(`${ano}-${mm}-${dd}`);
        }
    }
    return fechas;
}

function abrirCronograma() {
    const panel = document.getElementById('panelAdminGeneral');
    let seccion = document.getElementById('seccionCronograma');
    if (!seccion) {
        seccion = document.createElement('div');
        seccion.id = 'seccionCronograma';
        document.body.appendChild(seccion);
    }
    seccion.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#faf8f5;z-index:9997;overflow-y:auto;font-family:Inter,sans-serif;';

    // Inicializar mes por defecto al actual si no está seteado
    if (!mesAnnoAdminCronograma) {
        const hoy = new Date();
        const mm = String(hoy.getMonth() + 1).padStart(2, '0');
        mesAnnoAdminCronograma = `${hoy.getFullYear()}-${mm}`;
    }

    seccion.innerHTML = generarHTMLCronograma(mesAnnoAdminCronograma);
    seccion.style.display = 'block';
    if (panel) panel.style.display = 'none';
}

function cerrarCronograma() {
    const seccion = document.getElementById('seccionCronograma');
    const panel = document.getElementById('panelAdminGeneral');
    if (seccion) seccion.style.display = 'none';
    if (panel) panel.style.display = 'block';
}

function cambiarMesCronogramaAdmin(nuevoMes) {
    if (!nuevoMes) return;
    mesAnnoAdminCronograma = nuevoMes;
    const seccion = document.getElementById('seccionCronograma');
    if (seccion) {
        seccion.innerHTML = generarHTMLCronograma(mesAnnoAdminCronograma);
    }
}

function guardarPredicadorFecha(actividad, fecha, valor) {
    const data = cargarPredicadoresFechas();
    if (!data[actividad]) data[actividad] = {};
    const texto = valor.trim();
    if (texto === '') {
        delete data[actividad][fecha];
    } else {
        data[actividad][fecha] = texto;
    }
    guardarPredicadoresFechas(data);
}

function guardarActividadMes(actividad) {
    const data = cargarPredicadoresFechas();
    if (!data[actividad]) data[actividad] = {};

    const inputs = document.querySelectorAll(`.input-predicador[data-actividad="${actividad}"]`);
    inputs.forEach(inp => {
        const fecha = inp.dataset.fecha;
        const val = inp.value.trim();
        if (val === '') {
            delete data[actividad][fecha];
        } else {
            data[actividad][fecha] = val;
        }
    });

    guardarPredicadoresFechas(data);
    mostrarFeedbackAdmin(`¡Predicadores guardados para "${actividad}"!`);
}

function guardarTodoElMes() {
    const data = cargarPredicadoresFechas();
    const inputs = document.querySelectorAll('.input-predicador');
    inputs.forEach(inp => {
        const actividad = inp.dataset.actividad;
        const fecha = inp.dataset.fecha;
        const val = inp.value.trim();
        if (!data[actividad]) data[actividad] = {};

        if (val === '') {
            delete data[actividad][fecha];
        } else {
            data[actividad][fecha] = val;
        }
    });

    guardarPredicadoresFechas(data);
    mostrarFeedbackAdmin('¡Todos los predicadores del mes han sido guardados con éxito!');
}

function mostrarFeedbackAdmin(mensaje) {
    let msgEl = document.getElementById('cronogramaToastAdmin');
    if (!msgEl) {
        msgEl = document.createElement('div');
        msgEl.id = 'cronogramaToastAdmin';
        msgEl.style.cssText = 'position:fixed;bottom:2rem;right:2rem;background:#1b5e20;color:white;padding:1rem 1.8rem;border-radius:2rem;font-weight:700;box-shadow:0 8px 30px rgba(0,0,0,0.3);z-index:10000;display:flex;align-items:center;gap:0.8rem;font-size:0.95rem;transition:all 0.3s ease;';
        document.body.appendChild(msgEl);
    }
    msgEl.innerHTML = `<i class="fas fa-check-circle" style="font-size:1.3rem;color:#a5d6a7;"></i> ${mensaje}`;
    msgEl.style.opacity = '1';
    msgEl.style.transform = 'translateY(0)';
    setTimeout(() => {
        msgEl.style.opacity = '0';
        msgEl.style.transform = 'translateY(20px)';
    }, 3000);
}

function generarHTMLCronograma(mesAnno) {
    const parts = mesAnno.split('-');
    const ano = parseInt(parts[0], 10);
    const mesIndex = parseInt(parts[1], 10) - 1;

    const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mesNombre = nombresMeses[mesIndex] || '';

    const dataGuardada = cargarPredicadoresFechas();

    let html = `
    <div style="background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);padding:1.2rem 2rem;display:flex;justify-content:space-between;align-items:center;position:-webkit-sticky;position:sticky;top:0;z-index:1000;box-shadow:0 4px 20px rgba(0,0,0,0.25);">
        <div style="display:flex;align-items:center;gap:0.8rem;">
            <i class="fas fa-calendar-alt" style="color:#c9a53b;font-size:1.6rem;"></i>
            <div>
                <h3 style="color:white;margin:0;font-size:1.2rem;font-weight:700;">📅 Gestión de Predicadores por Fecha</h3>
                <span style="color:rgba(255,255,255,0.7);font-size:0.85rem;">Asignación detallada para el cronograma de la iglesia</span>
            </div>
        </div>
        <button onclick="cerrarCronograma()" style="background:rgba(255,255,255,0.18);color:white;border:1px solid rgba(255,255,255,0.3);padding:0.6rem 1.4rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;font-size:0.9rem;transition:all 0.2s ease;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.18)'">
            <i class="fas fa-arrow-left"></i> Volver al Panel
        </button>
    </div>

    <div style="max-width:1100px;margin:0 auto;padding:2rem 1.5rem;">
        <!-- BARRA CONTROLES GENERALES -->
        <div style="background:white;border-radius:1.5rem;padding:1.5rem 2rem;margin-bottom:2rem;box-shadow:0 6px 25px rgba(0,0,0,0.06);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1.2rem;border-left:5px solid #c9a53b;">
            <div>
                <label style="font-weight:700;color:#1a3a4a;font-size:0.95rem;margin-right:0.8rem;display:block;margin-bottom:0.4rem;">
                    <i class="fas fa-calendar-day" style="color:#c9a53b;"></i> Seleccionar Mes y Año:
                </label>
                <input type="month" value="${mesAnno}" onchange="cambiarMesCronogramaAdmin(this.value)" style="padding:0.6rem 1rem;border:2px solid #e2e8f0;border-radius:0.8rem;font-family:Inter,sans-serif;font-size:1rem;font-weight:600;color:#1a3a4a;outline:none;cursor:pointer;">
            </div>
            <div style="display:flex;align-items:center;gap:1rem;">
                <span style="font-size:1.1rem;font-weight:700;color:#2c5f7c;background:#f0f7ff;padding:0.5rem 1.2rem;border-radius:1rem;border:1px solid rgba(44,95,124,0.15);">
                    📆 ${mesNombre} ${ano}
                </span>
                <button onclick="guardarTodoElMes()" style="background:linear-gradient(135deg,#2e7d32 0%,#388e3c 100%);color:white;border:none;padding:0.75rem 1.6rem;border-radius:2rem;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;box-shadow:0 4px 15px rgba(46,125,50,0.3);transition:all 0.2s ease;">
                    <i class="fas fa-save"></i> Guardar Todo el Mes
                </button>
            </div>
        </div>

        <!-- LISTA DE CATEGORÍAS Y ACTIVIDADES -->
        <div style="display:flex;flex-direction:column;gap:2rem;">
    `;

    ESTRUCTURA_ACTIVIDADES.forEach(cat => {
        html += `
        <div style="background:white;border-radius:1.6rem;padding:1.8rem;box-shadow:0 6px 25px rgba(0,0,0,0.05);border:1px solid #edf2f7;">
            <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:1.5rem;padding-bottom:0.8rem;border-bottom:2px solid #f1f5f9;">
                <div style="width:42px;height:42px;background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#c9a53b;">
                    <i class="fas ${cat.icono}" style="font-size:1.2rem;"></i>
                </div>
                <h4 style="margin:0;font-size:1.3rem;color:#1a3a4a;font-weight:700;">Categoría: ${cat.categoria}</h4>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:1.5rem;">
        `;

        cat.actividades.forEach(act => {
            const actNombre = act.nombre;
            const diaSemana = act.diaSemana;
            const diaNombre = act.diaNombre;

            const fechasDelMes = calcularFechasDelMes(ano, mesIndex, diaSemana);
            const actData = dataGuardada[actNombre] || {};

            html += `
            <div style="background:#fafbfc;border:1px solid #e2e8f0;border-radius:1.2rem;padding:1.3rem;display:flex;flex-direction:column;justify-space-between;">
                <div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;gap:0.5rem;">
                        <h5 style="margin:0;font-size:1.1rem;color:#1a3a4a;font-weight:700;">${actNombre}</h5>
                        <span style="background:#e0f2fe;color:#0369a1;font-size:0.75rem;font-weight:700;padding:0.3rem 0.7rem;border-radius:1rem;">
                            📌 ${diaNombre}
                        </span>
                    </div>

                    <div style="display:flex;flex-direction:column;gap:0.8rem;margin-bottom:1.2rem;">
            `;

            if (fechasDelMes.length === 0) {
                html += `<p style="font-size:0.85rem;color:#64748b;margin:0;">No hay fechas registradas para este mes.</p>`;
            } else {
                fechasDelMes.forEach(fechaStr => {
                    const [fAno, fMes, fDia] = fechaStr.split('-');
                    const fechaFormateada = `${fDia}/${fMes}/${fAno}`;
                    const valorActual = actData[fechaStr] || '';

                    html += `
                    <div style="display:flex;align-items:center;gap:0.8rem;background:white;padding:0.6rem 0.9rem;border-radius:0.8rem;border:1px solid #cbd5e1;">
                        <span style="font-weight:700;color:#334155;font-size:0.88rem;min-width:90px;">
                            📅 ${fechaFormateada}
                        </span>
                        <input type="text" 
                               class="input-predicador" 
                               data-actividad="${actNombre}" 
                               data-fecha="${fechaStr}" 
                               value="${valorActual}" 
                               placeholder="Predicador o encargado..." 
                               onblur="guardarPredicadorFecha('${actNombre}', '${fechaStr}', this.value)" 
                               style="flex:1;padding:0.45rem 0.8rem;border:1px solid #cbd5e1;border-radius:0.6rem;font-family:Inter,sans-serif;font-size:0.85rem;outline:none;transition:border-color 0.2s ease;" 
                               onfocus="this.style.borderColor='#c9a53b'">
                    </div>
                    `;
                });
            }

            html += `
                    </div>
                </div>
                <button onclick="guardarActividadMes('${actNombre}')" style="width:100%;background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);color:white;border:none;padding:0.6rem;border-radius:0.8rem;font-weight:700;font-size:0.85rem;cursor:pointer;font-family:Inter,sans-serif;transition:all 0.2s ease;">
                    <i class="fas fa-save"></i> Guardar ${actNombre}
                </button>
            </div>
            `;
        });

        html += `
            </div>
        </div>
        `;
    });

    html += `
        </div>
    </div>
    `;

    return html;
}

function vincularEventosCronograma() { /* Los handlers inline onblur y onclick manejan todo limpiamente */ }


// ===== ENCUESTAS =====
const STORAGE_ENCUESTAS = 'encuestasIglesia';

function abrirEncuestas() {
    const panel = document.getElementById('panelAdminGeneral');
    let seccion = document.getElementById('seccionEncuestas');
    if (!seccion) {
        seccion = document.createElement('div');
        seccion.id = 'seccionEncuestas';
        seccion.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#faf8f5;z-index:9997;overflow-y:auto;font-family:Inter,sans-serif;';
        document.body.appendChild(seccion);
    }
    seccion.innerHTML = generarHTMLEncuestas();
    seccion.style.display = 'block';
    panel.style.display = 'none';
}

function cerrarEncuestas() {
    const seccion = document.getElementById('seccionEncuestas');
    const panel = document.getElementById('panelAdminGeneral');
    if (seccion) seccion.style.display = 'none';
    if (panel) panel.style.display = 'block';
}

function cargarEncuestas() {
    try { return JSON.parse(localStorage.getItem(STORAGE_ENCUESTAS)) || []; }
    catch (e) { return []; }
}
function guardarEncuestas(encuestas) {
    localStorage.setItem(STORAGE_ENCUESTAS, JSON.stringify(encuestas));
}

function generarHTMLEncuestas() {
    const encuestas = cargarEncuestas();
    let html = '<div style="background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10;">';
    html += '<h3 style="color:#c9a53b;margin:0;font-size:1.2rem;">📋 Encuestas</h3>';
    html += '<button onclick="cerrarEncuestas()" style="background:rgba(255,255,255,0.2);color:white;border:none;padding:0.5rem 1.5rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;"><i class="fas fa-arrow-left"></i> Volver</button></div>';
    html += '<div style="max-width:800px;margin:0 auto;padding:1rem;">';
    // formulario
    html += '<div style="background:white;border-radius:1.5rem;padding:1.5rem;margin-bottom:1.5rem;box-shadow:0 4px 15px rgba(0,0,0,0.05);">';
    html += '<h4 style="color:#1a3a4a;margin-bottom:1rem;"><i class="fas fa-plus-circle"></i> Agregar Encuesta</h4>';
    html += '<input type="text" id="encuestaPregunta" placeholder="Pregunta" style="width:100%;padding:0.7rem 1rem;border:2px solid #e8e3d8;border-radius:1rem;margin-bottom:0.8rem;font-family:Inter,sans-serif;">';
    html += '<input type="text" id="encuestaOpciones" placeholder="Opciones (separadas por comas)" style="width:100%;padding:0.7rem 1rem;border:2px solid #e8e3d8;border-radius:1rem;margin-bottom:0.8rem;font-family:Inter,sans-serif;">';
    html += '<button onclick="agregarEncuesta()" style="width:100%;padding:0.8rem;background:linear-gradient(135deg,#d4a038 0%,#c9a53b 100%);color:#1a3a4a;border:none;border-radius:2rem;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;"><i class="fas fa-plus"></i> Agregar Encuesta</button>';
    html += '</div>';
    // lista
    encuestas.forEach(enc => {
        html += '<div class="encuesta-card">';
        html += '<div class="encuesta-pregunta">' + enc.pregunta + '</div>';
        html += '<div class="opciones-votos">';
        enc.opciones.forEach((op, i) => {
            html += '<div class="opcion-badge">' + op + ' <span class="votos-count">' + (enc.votos[i] || 0) + '</span></div>';
        });
        html += '</div>';
        html += '<button class="btn-eliminar-miembro" onclick="eliminarEncuesta(' + enc.id + ')" style="float:right;">🗑️</button>';
        html += '<div style="clear:both;"></div>';
        html += '</div>';
    });
    if (encuestas.length === 0) html += '<p style="text-align:center;color:#5a6474;">No hay encuestas activas.</p>';
    html += '</div>';
    return html;
}

function agregarEncuesta() {
    const pregunta = document.getElementById('encuestaPregunta').value.trim();
    const opcionesStr = document.getElementById('encuestaOpciones').value.trim();
    if (!pregunta || !opcionesStr) { alert('Completa todos los campos'); return; }
    const opciones = opcionesStr.split(',').map(op => op.trim()).filter(op => op);
    if (opciones.length === 0) { alert('Ingresa al menos una opción'); return; }
    const encuestas = cargarEncuestas();
    encuestas.push({
        id: Date.now(),
        pregunta,
        opciones,
        votos: new Array(opciones.length).fill(0)
    });
    guardarEncuestas(encuestas);
    window.dispatchEvent(new Event('datosIglesiaActualizados'));
    document.getElementById('seccionEncuestas').innerHTML = generarHTMLEncuestas();
}

function eliminarEncuesta(id) {
    if (!confirm('¿Eliminar esta encuesta?')) return;
    let encuestas = cargarEncuestas().filter(e => e.id !== id);
    guardarEncuestas(encuestas);
    window.dispatchEvent(new Event('datosIglesiaActualizados'));
    document.getElementById('seccionEncuestas').innerHTML = generarHTMLEncuestas();
}

// ===== EXPORTAR / IMPORTAR DATOS DEL CLUB =====

function obtenerClubActivoModal() {
    const modal = document.getElementById('modalClubOpciones');
    if (modal && modal.dataset && modal.dataset.club) {
        return modal.dataset.club;
    }
    return clubSeleccionadoActual || 'Aventureros';
}

function mostrarToastExitoClub(mensaje) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#2e7d32;color:white;padding:1rem 2rem;border-radius:2rem;font-weight:600;z-index:99999;font-family:Inter,sans-serif;box-shadow:0 8px 30px rgba(46,125,50,0.4);transition:opacity 0.5s ease;';
    toast.innerHTML = mensaje;
    document.body.appendChild(toast);
    setTimeout(function () {
        toast.style.opacity = '0';
        setTimeout(function () { toast.remove(); }, 500);
    }, 2500);
}

function exportarDatosClub() {
    const club = obtenerClubActivoModal();

    // Obtener claves de storage para las 3 secciones
    const cuotasKey = CLUBES_STORAGE[club] || 'cuotas_aventureros';
    const bdKey = CLUBES_STORAGE_BD[club] || 'bd_aventureros';
    const eventosKey = CLUBES_STORAGE_CALENDARIO[club] || 'eventos_aventureros';

    const cuotas = cargarCuotas(cuotasKey);
    const bd = cargarMiembrosBD(bdKey);
    let eventos = [];
    try {
        const rawEventos = localStorage.getItem(eventosKey);
        eventos = rawEventos ? JSON.parse(rawEventos) : [];
    } catch (e) {
        eventos = [];
    }

    // Verificar si el club no tiene datos para exportar
    const cuotasVacias = !Array.isArray(cuotas) || cuotas.length === 0;
    const bdVacia = !Array.isArray(bd) || bd.length === 0;
    const eventosVacios = !Array.isArray(eventos) || eventos.length === 0;

    if (cuotasVacias && bdVacia && eventosVacios) {
        mostrarAlertaAdmin('El club <strong>' + club + '</strong> no tiene datos registrados (cuotas, base de datos ni calendario) para exportar.', 'Sin datos para exportar');
        return;
    }

    const backup = {
        club: club,
        fecha: new Date().toISOString(),
        cuotas: Array.isArray(cuotas) ? cuotas : [],
        bd: Array.isArray(bd) ? bd : [],
        eventos: Array.isArray(eventos) ? eventos : []
    };

    const fechaStr = new Date().toISOString().split('T')[0];
    const nombreArchivo = 'Backup_' + club.replace(/\s+/g, '_') + '_' + fechaStr + '.json';

    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombreArchivo;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    mostrarToastExitoClub('✅ Datos del club ' + club + ' exportados correctamente.');
}

function importarDatosClub(event) {
    const input = event ? event.target : document.getElementById('inputImportarClub');
    const file = input && input.files ? input.files[0] : null;
    if (!file) return;

    const club = obtenerClubActivoModal();

    const reader = new FileReader();

    reader.onerror = function () {
        if (input) input.value = '';
        mostrarAlertaAdmin('No se pudo leer el archivo. Inténtalo de nuevo.', 'Error al leer el archivo');
    };

    reader.onload = function (e) {
        if (input) input.value = '';

        let data;
        try {
            data = JSON.parse(e.target.result);
        } catch (error) {
            mostrarAlertaAdmin('El archivo seleccionado no es un backup válido. Asegúrate de que sea un archivo JSON exportado desde el sistema.', 'Archivo no válido');
            return;
        }

        // 1. Validar objeto JSON y propiedades requeridas
        if (!data || typeof data !== 'object' || Array.isArray(data) ||
            !('club' in data) || !('cuotas' in data) || !('bd' in data) || !('eventos' in data)) {
            mostrarAlertaAdmin('El archivo seleccionado no es un backup válido. Asegúrate de que sea un archivo JSON exportado desde el sistema.', 'Archivo no válido');
            return;
        }

        // 2. Validar que pertenezca al mismo club
        if (data.club !== club) {
            const clubArchivo = data.club || 'desconocido';
            mostrarAlertaAdmin('Este archivo pertenece al club ' + clubArchivo + ', no a ' + club + '.', 'Club incorrecto');
            return;
        }

        // 3. Validar que el formato de las secciones no esté corrupto
        if (!Array.isArray(data.cuotas) || !Array.isArray(data.bd) || !Array.isArray(data.eventos)) {
            mostrarAlertaAdmin('El archivo está corrupto o tiene un formato incorrecto.', 'Archivo corrupto');
            return;
        }

        // 4. Modal de confirmación antes de sobrescribir
        const mensajeConfirm = '¿Estás seguro de importar este backup? Se sobrescribirán todos los datos actuales del club ' + club + '. Esta acción no se puede deshacer.';

        mostrarConfirmAdmin(
            mensajeConfirm,
            'Confirmar importación',
            function () {
                const cuotasKey = CLUBES_STORAGE[club] || 'cuotas_aventureros';
                const bdKey = CLUBES_STORAGE_BD[club] || 'bd_aventureros';
                const eventosKey = CLUBES_STORAGE_CALENDARIO[club] || 'eventos_aventureros';

                // Guardar en localStorage
                guardarCuotas(cuotasKey, data.cuotas);
                guardarMiembrosBD(bdKey, data.bd);
                try {
                    localStorage.setItem(eventosKey, JSON.stringify(data.eventos));
                } catch (err) {
                    console.error('Error guardando eventos en localStorage:', err);
                }

                // Disparar eventos de actualización
                window.dispatchEvent(new CustomEvent('datosClubActualizados', { detail: { club: club } }));
                window.dispatchEvent(new Event('datosClubActualizados'));

                // Actualizar las vistas si alguna sección del club está visible actualmente
                const seccionCuotas = document.getElementById('seccionCuotasClub');
                if (seccionCuotas && seccionCuotas.style.display !== 'none') {
                    const miembrosCuotas = cargarCuotas(cuotasKey);
                    seccionCuotas.innerHTML = generarHTMLCuotas(club, miembrosCuotas, cuotasKey);
                    vincularEventosCuotas(cuotasKey);
                    actualizarTotalesCuotas(cuotasKey);
                }

                const seccionBD = document.getElementById('seccionBaseDatosClub');
                if (seccionBD && seccionBD.style.display !== 'none') {
                    const miembrosBD = cargarMiembrosBD(bdKey);
                    seccionBD.innerHTML = generarHTMLBaseDatos(club, miembrosBD, bdKey);
                    vincularEventosBD(bdKey);
                }

                const seccionCal = document.getElementById('seccionCalendarioClub');
                if (seccionCal && seccionCal.style.display !== 'none') {
                    seccionCal.innerHTML = generarHTMLCalendarioClub(club);
                }

                // Notificar éxito y cerrar modal de opciones del club
                mostrarToastExitoClub('✅ Datos importados correctamente para ' + club);
                cerrarModalClub();
            }
        );
    };

    reader.readAsText(file);
}


// ===== BIBLIOTECA =====
const STORAGE_LIBROS = 'libros_biblioteca';
const STORAGE_PEDIDOS = 'libros_pedidos';
let libroPendienteEditarId = null;
let filtroPedidosTabActual = 'Pendientes'; // 'Pendientes' o 'Todos'

function cargarLibros() {
    try {
        const data = localStorage.getItem(STORAGE_LIBROS);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function guardarLibros(libros) {
    localStorage.setItem(STORAGE_LIBROS, JSON.stringify(libros));
    window.dispatchEvent(new CustomEvent('datosBibliotecaActualizados'));
    window.dispatchEvent(new Event('datosBibliotecaActualizados'));
}

function cargarPedidos() {
    try {
        const data = localStorage.getItem(STORAGE_PEDIDOS);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function guardarPedidos(pedidos) {
    localStorage.setItem(STORAGE_PEDIDOS, JSON.stringify(pedidos));
    window.dispatchEvent(new CustomEvent('datosBibliotecaActualizados'));
    window.dispatchEvent(new Event('datosBibliotecaActualizados'));
}

// --- Agregar / Editar Libro ---
function abrirModalAgregarLibro() {
    libroPendienteEditarId = null;
    const inputId = document.getElementById('inputIdLibro');
    if (inputId) {
        inputId.value = '';
        inputId.disabled = false;
    }
    document.getElementById('inputTituloLibro').value = '';
    document.getElementById('inputCantidadLibro').value = '1';
    document.getElementById('inputAutorLibro').value = '';
    document.getElementById('inputCategoriaLibro').value = '';
    document.getElementById('inputEstadoLibro').value = 'Disponible';
    document.getElementById('inputUbicacionLibro').value = '';

    const tituloEl = document.getElementById('modalBiblioTitulo');
    const btnEl = document.getElementById('btnGuardarLibro');
    if (tituloEl) tituloEl.innerHTML = '<i class="fas fa-plus-circle"></i> Agregar Libro';
    if (btnEl) btnEl.innerHTML = '<i class="fas fa-save"></i> Guardar Libro';

    document.getElementById('modalAgregarLibro').classList.add('active');
}

function cerrarModalAgregarLibro(event) {
    if (event && event.target !== document.getElementById('modalAgregarLibro')) return;
    document.getElementById('modalAgregarLibro').classList.remove('active');
    libroPendienteEditarId = null;
}

function abrirModalEditarLibro(id) {
    const libros = cargarLibros();
    const libro = libros.find(l => String(l.id) === String(id));
    if (!libro) return;

    const inputId = document.getElementById('inputIdLibro');
    if (inputId) {
        inputId.value = libro.id !== undefined ? libro.id : id;
        inputId.disabled = true;
    }

    document.getElementById('inputTituloLibro').value = libro.titulo || '';
    document.getElementById('inputCantidadLibro').value = libro.cant || libro.cantidad || 1;
    document.getElementById('inputAutorLibro').value = libro.autor || '';
    document.getElementById('inputCategoriaLibro').value = libro.cat || libro.categoria || '';
    document.getElementById('inputEstadoLibro').value = libro.estado || 'Disponible';
    document.getElementById('inputUbicacionLibro').value = libro.ubi || libro.ubicacion || '';

    libroPendienteEditarId = id;

    const tituloEl = document.getElementById('modalBiblioTitulo');
    const btnEl = document.getElementById('btnGuardarLibro');
    if (tituloEl) tituloEl.innerHTML = '<i class="fas fa-edit"></i> Editar Libro';
    if (btnEl) btnEl.innerHTML = '<i class="fas fa-save"></i> Guardar Cambios';

    // Cerrar modal de eliminar si está abierto
    const modalEliminar = document.getElementById('modalEliminarLibro');
    if (modalEliminar) modalEliminar.classList.remove('active');

    document.getElementById('modalAgregarLibro').classList.add('active');
}

function guardarNuevoLibro() {
    const inputId = document.getElementById('inputIdLibro');
    const idVal = inputId ? inputId.value.trim() : '';
    const titulo = document.getElementById('inputTituloLibro').value.trim();
    const cantidad = parseInt(document.getElementById('inputCantidadLibro').value) || 1;
    const autor = document.getElementById('inputAutorLibro').value.trim();
    const categoria = document.getElementById('inputCategoriaLibro').value.trim() || 'General';
    const estado = document.getElementById('inputEstadoLibro').value;
    const ubicacion = document.getElementById('inputUbicacionLibro').value.trim();

    if (!idVal) {
        mostrarAlertaAdmin('⚠️ El ID del libro es obligatorio.');
        return;
    }

    if (!titulo || !autor) {
        mostrarAlertaAdmin('⚠️ El título y el autor son campos obligatorios.');
        return;
    }

    const libros = cargarLibros();

    if (libroPendienteEditarId !== null) {
        const idx = libros.findIndex(l => String(l.id) === String(libroPendienteEditarId));
        if (idx !== -1) {
            libros[idx].titulo = titulo;
            libros[idx].cantidad = cantidad;
            libros[idx].cant = cantidad;
            libros[idx].autor = autor;
            libros[idx].categoria = categoria;
            libros[idx].cat = categoria;
            libros[idx].estado = estado;
            libros[idx].ubicacion = ubicacion;
            libros[idx].ubi = ubicacion;
        }
        libroPendienteEditarId = null;
    } else {
        // Verificar que no exista otro libro con el mismo ID
        const existe = libros.some(l => String(l.id).toLowerCase() === idVal.toLowerCase());
        if (existe) {
            mostrarAlertaAdmin('⚠️ Ya existe un libro con este ID. Por favor, ingresa un ID diferente.');
            return;
        }

        const idFinal = isNaN(idVal) ? idVal : Number(idVal);

        libros.push({
            id: idFinal,
            titulo: titulo,
            cantidad: cantidad,
            cant: cantidad,
            autor: autor,
            categoria: categoria,
            cat: categoria,
            estado: estado,
            ubicacion: ubicacion,
            ubi: ubicacion
        });
    }

    guardarLibros(libros);
    cerrarModalAgregarLibro();
    mostrarToastBiblio('<i class="fas fa-check-circle"></i> Libro guardado correctamente');

    // Refrescar lista de gestión si está abierta
    filtrarEliminarLibro();
}

// --- Toast de Biblioteca ---
function mostrarToastBiblio(mensaje, bg = '#2e7d32') {
    const toast = document.createElement('div');
    toast.style.cssText = `position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:${bg};color:white;padding:0.8rem 1.8rem;border-radius:2rem;font-weight:600;z-index:99999;font-family:Inter,sans-serif;box-shadow:0 8px 25px rgba(0,0,0,0.25);display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;`;
    toast.innerHTML = mensaje;
    document.body.appendChild(toast);
    setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(function () { toast.remove(); }, 500);
    }, 2000);
}

// --- Gestor / Eliminar / Editar Libros ---
let _librosFiltrados = [];

function abrirModalEliminarLibro() {
    _librosFiltrados = cargarLibros();
    const buscador = document.getElementById('buscadorEliminarLibro');
    if (buscador) buscador.value = '';
    document.getElementById('modalEliminarLibro').classList.add('active');
    renderizarEliminarLibro(_librosFiltrados);
}

function cerrarModalEliminarLibro(event) {
    if (event && event.target !== document.getElementById('modalEliminarLibro')) return;
    document.getElementById('modalEliminarLibro').classList.remove('active');
}

function filtrarEliminarLibro() {
    const buscador = document.getElementById('buscadorEliminarLibro');
    const termino = buscador ? buscador.value.trim().toLowerCase() : '';
    const libros = cargarLibros();
    _librosFiltrados = libros.filter(l =>
        (l.titulo && l.titulo.toLowerCase().includes(termino)) ||
        (l.autor && l.autor.toLowerCase().includes(termino)) ||
        ((l.categoria || l.cat) && (l.categoria || l.cat).toLowerCase().includes(termino))
    );
    renderizarEliminarLibro(_librosFiltrados);
}

function renderizarEliminarLibro(libros) {
    const contenedor = document.getElementById('listaEliminarLibros');
    if (!contenedor) return;

    if (libros.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; color:#5a6474; padding:2rem 1rem;">No se encontraron libros registrados.</p>';
        return;
    }

    let html = '<div style="overflow-x:auto;"><table class="tabla-libros" style="width:100%; border-collapse:collapse; font-size:0.85rem; min-width:600px;">';
    html += '<thead><tr style="background:#1a3a4a; color:white; text-align:left;">';
    html += '<th style="padding:0.7rem;">Título</th>';
    html += '<th style="padding:0.7rem;">Autor</th>';
    html += '<th style="padding:0.7rem; text-align:center;">Cant.</th>';
    html += '<th style="padding:0.7rem;">Estado</th>';
    html += '<th style="padding:0.7rem; text-align:center;">Acciones</th>';
    html += '</tr></thead><tbody>';

    libros.forEach((lib, index) => {
        const bgRow = index % 2 === 0 ? '#ffffff' : '#f9f8f5';
        const cant = lib.cant || lib.cantidad || 1;
        const estado = lib.estado || 'Disponible';
        const estadoBadgeClass = estado === 'Disponible'
            ? 'background:#e8f5e9; color:#2e7d32; padding:0.2rem 0.6rem; border-radius:1rem; font-weight:600; font-size:0.75rem;'
            : 'background:#fff3e0; color:#e65100; padding:0.2rem 0.6rem; border-radius:1rem; font-weight:600; font-size:0.75rem;';

        html += `<tr style="background:${bgRow}; border-bottom:1px solid #eee;">
            <td style="padding:0.7rem; font-weight:600; color:#1a3a4a;">${lib.titulo}</td>
            <td style="padding:0.7rem; color:#5a6474;">${lib.autor || '-'}</td>
            <td style="padding:0.7rem; text-align:center; font-weight:600;">${cant}</td>
            <td style="padding:0.7rem;"><span style="${estadoBadgeClass}">${estado}</span></td>
            <td style="padding:0.7rem; text-align:center; white-space:nowrap;">
                <button type="button" onclick="abrirModalEditarLibro(${lib.id})" style="background:#f0a800; color:white; border:none; padding:0.4rem 0.7rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem; margin-right:0.3rem;" title="Editar libro">✏️ Editar</button>
                <button type="button" onclick="confirmarEliminarLibro(${lib.id})" style="background:#c62828; color:white; border:none; padding:0.4rem 0.7rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem;" title="Eliminar libro">🗑️ Eliminar</button>
            </td>
        </tr>`;
    });

    html += '</tbody></table></div>';
    contenedor.innerHTML = html;
}

function confirmarEliminarLibro(id) {
    const libros = cargarLibros();
    const libro = libros.find(l => String(l.id) === String(id));
    const tituloLibro = libro ? libro.titulo : 'este libro';

    mostrarConfirmAdmin(`¿Estás seguro de que deseas eliminar <strong>"${tituloLibro}"</strong> de la biblioteca?`, 'Eliminar libro', function () {
        let nuevosLibros = cargarLibros().filter(l => String(l.id) !== String(id));
        guardarLibros(nuevosLibros);
        _librosFiltrados = nuevosLibros;
        filtrarEliminarLibro();
        mostrarToastBiblio('<i class="fas fa-trash"></i> Libro eliminado correctamente', '#c62828');
    });
}

// --- Ver Libros Pedidos ---
function abrirModalVerPedidos() {
    filtroPedidosTabActual = 'Pendientes';
    actualizarBotonesTabPedidos();
    document.getElementById('modalVerPedidos').classList.add('active');
    renderizarPedidos();
}

function cerrarModalVerPedidos(event) {
    if (event && event.target !== document.getElementById('modalVerPedidos')) return;
    document.getElementById('modalVerPedidos').classList.remove('active');
}

function filtrarPedidosTab(tab) {
    filtroPedidosTabActual = tab;
    actualizarBotonesTabPedidos();
    renderizarPedidos();
}

function actualizarBotonesTabPedidos() {
    const btnPend = document.getElementById('btnFiltroPedidosPendientes');
    const btnTodos = document.getElementById('btnFiltroPedidosTodos');
    if (btnPend && btnTodos) {
        if (filtroPedidosTabActual === 'Pendientes') {
            btnPend.style.background = '#1a3a4a';
            btnPend.style.color = 'white';
            btnPend.style.border = 'none';
            btnTodos.style.background = 'white';
            btnTodos.style.color = '#1a3a4a';
            btnTodos.style.border = '1px solid #1a3a4a';
        } else {
            btnTodos.style.background = '#1a3a4a';
            btnTodos.style.color = 'white';
            btnTodos.style.border = 'none';
            btnPend.style.background = 'white';
            btnPend.style.color = '#1a3a4a';
            btnPend.style.border = '1px solid #1a3a4a';
        }
    }
}

function renderizarPedidos() {
    const todosPedidos = cargarPedidos();
    const libros = cargarLibros();
    const contenedor = document.getElementById('listaPedidosLibros');
    if (!contenedor) return;

    let pedidos = todosPedidos;
    if (filtroPedidosTabActual === 'Pendientes') {
        pedidos = todosPedidos.filter(p => p.estado !== 'Entregado' && p.estado !== 'Cancelado');
    }

    if (pedidos.length === 0) {
        const msj = filtroPedidosTabActual === 'Pendientes'
            ? 'No hay solicitudes de préstamos pendientes.'
            : 'No se encontraron registros de pedidos.';
        contenedor.innerHTML = `<p style="text-align:center; color:#5a6474; padding:2rem 1rem;">${msj}</p>`;
        return;
    }

    let html = '<div style="overflow-x:auto;"><table class="tabla-libros" style="width:100%; border-collapse:collapse; font-size:0.85rem; min-width:680px;">';
    html += '<thead><tr style="background:#1a3a4a; color:white; text-align:left;">';
    html += '<th style="padding:0.7rem;">Solicitante</th>';
    html += '<th style="padding:0.7rem;">Contacto</th>';
    html += '<th style="padding:0.7rem;">Libro Solicitado</th>';
    html += '<th style="padding:0.7rem;">Fecha</th>';
    html += '<th style="padding:0.7rem;">Estado</th>';
    html += '<th style="padding:0.7rem; text-align:center;">Acciones</th>';
    html += '</tr></thead><tbody>';

    pedidos.forEach((p, index) => {
        const bgRow = index % 2 === 0 ? '#ffffff' : '#f9f8f5';
        const libroEncontrado = libros.find(l => String(l.id) === String(p.libroId));
        const tituloLibro = libroEncontrado ? libroEncontrado.titulo : (p.tituloLibro || 'Libro sin título');
        const fechaTexto = p.fecha ? new Date(p.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';
        const estado = p.estado || 'Pendiente';

        let estadoBadge = '<span style="background:#fff3e0; color:#e65100; padding:0.2rem 0.6rem; border-radius:1rem; font-weight:600; font-size:0.75rem;">Pendiente</span>';
        if (estado === 'Entregado') {
            estadoBadge = '<span style="background:#e8f5e9; color:#2e7d32; padding:0.2rem 0.6rem; border-radius:1rem; font-weight:600; font-size:0.75rem;">Entregado</span>';
        } else if (estado === 'Cancelado') {
            estadoBadge = '<span style="background:#ffebee; color:#c62828; padding:0.2rem 0.6rem; border-radius:1rem; font-weight:600; font-size:0.75rem;">Cancelado</span>';
        }

        const telefonoHtml = p.telefono ? `<div>📱 ${p.telefono}</div>` : '';
        const emailHtml = p.email ? `<div style="font-size:0.75rem; color:#5a6474;">✉️ ${p.email}</div>` : '';

        html += `<tr style="background:${bgRow}; border-bottom:1px solid #eee;">
            <td style="padding:0.7rem; font-weight:600; color:#1a3a4a;">${p.solicitante || 'Anónimo'}</td>
            <td style="padding:0.7rem; color:#1a3a4a;">${telefonoHtml}${emailHtml || '-'}</td>
            <td style="padding:0.7rem; font-weight:600; color:#2c5f7c;">${tituloLibro}</td>
            <td style="padding:0.7rem; color:#5a6474; white-space:nowrap;">${fechaTexto}</td>
            <td style="padding:0.7rem;">${estadoBadge}</td>
            <td style="padding:0.7rem; text-align:center; white-space:nowrap;">`;

        if (estado !== 'Entregado') {
            html += `<button type="button" class="btn-accion-libro btn-entregar-libro" onclick="marcarEntregadoPedido(${p.id})" style="background:#2e7d32; color:white; border:none; padding:0.4rem 0.8rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem; margin-right:0.3rem;">✅ Entregar</button>`;
        }
        if (estado !== 'Cancelado' && estado !== 'Entregado') {
            html += `<button type="button" onclick="cancelarPedido(${p.id})" style="background:#757575; color:white; border:none; padding:0.4rem 0.6rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem;">❌ Cancelar</button>`;
        }
        if (estado === 'Entregado') {
            html += `<span style="color:#2e7d32; font-weight:600; font-size:0.8rem;">✔️ Completado</span>`;
        }

        html += `</td></tr>`;
    });

    html += '</tbody></table></div>';
    contenedor.innerHTML = html;
}

function marcarEntregadoPedido(id) {
    let pedidos = cargarPedidos();
    const pedido = pedidos.find(p => String(p.id) === String(id));
    if (pedido) {
        pedido.estado = 'Entregado';
        guardarPedidos(pedidos);
        renderizarPedidos();
        mostrarToastBiblio('<i class="fas fa-check-circle"></i> Pedido marcado como entregado');
    }
}

function cancelarPedido(id) {
    let pedidos = cargarPedidos();
    const pedido = pedidos.find(p => String(p.id) === String(id));
    if (pedido) {
        pedido.estado = 'Cancelado';
        guardarPedidos(pedidos);
        renderizarPedidos();
        mostrarToastBiblio('<i class="fas fa-ban"></i> Pedido cancelado', '#757575');
    }
}

// Sincronización en tiempo real para Biblioteca
window.addEventListener('datosBibliotecaActualizados', function () {
    const modalEliminar = document.getElementById('modalEliminarLibro');
    if (modalEliminar && modalEliminar.classList.contains('active')) {
        filtrarEliminarLibro();
    }
    const modalPedidos = document.getElementById('modalVerPedidos');
    if (modalPedidos && modalPedidos.classList.contains('active')) {
        renderizarPedidos();
    }
});

window.addEventListener('storage', function (e) {
    if (e.key === 'libros_biblioteca' || e.key === 'libros_pedidos') {
        const modalEliminar = document.getElementById('modalEliminarLibro');
        if (modalEliminar && modalEliminar.classList.contains('active')) {
            filtrarEliminarLibro();
        }
        const modalPedidos = document.getElementById('modalVerPedidos');
        if (modalPedidos && modalPedidos.classList.contains('active')) {
            renderizarPedidos();
        }
    }
});

// ===== ANUNCIOS / EVENTOS =====
const STORAGE_ANUNCIOS = 'anuncios_eventos';
let anuncioPendienteEditarId = null;

function cargarAnuncios() {
    try {
        const data = localStorage.getItem(STORAGE_ANUNCIOS);
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

function guardarAnuncios(anuncios) {
    localStorage.setItem(STORAGE_ANUNCIOS, JSON.stringify(anuncios));
    window.dispatchEvent(new CustomEvent('datosAnunciosActualizados'));
    window.dispatchEvent(new Event('datosAnunciosActualizados'));
}

// --- Toast de Anuncios ---
function mostrarToastAnuncios(mensaje, bg = '#2e7d32') {
    const toast = document.createElement('div');
    toast.style.cssText = `position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:${bg};color:white;padding:0.8rem 1.8rem;border-radius:2rem;font-weight:600;z-index:99999;font-family:Inter,sans-serif;box-shadow:0 8px 25px rgba(0,0,0,0.25);display:flex;align-items:center;gap:0.5rem;font-size:0.9rem;`;
    toast.innerHTML = mensaje;
    document.body.appendChild(toast);
    setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.5s ease';
        setTimeout(function () { toast.remove(); }, 500);
    }, 2000);
}

// --- Agregar / Editar Anuncio ---
function abrirModalAgregarAnuncio() {
    anuncioPendienteEditarId = null;
    document.getElementById('anuncioTitulo').value = '';
    document.getElementById('anuncioFechaInicio').value = '';
    document.getElementById('anuncioHoraInicio').value = '';
    document.getElementById('anuncioFechaFin').value = '';
    document.getElementById('anuncioHoraFin').value = '';
    document.getElementById('anuncioUbicacion').value = 'Templo Principal';
    document.getElementById('anuncioCategoria').value = 'Culto';
    document.getElementById('anuncioImagen').value = '';
    document.getElementById('anuncioContenido').value = '';

    const tituloEl = document.getElementById('modalAnuncioTitulo');
    const btnEl = document.getElementById('btnGuardarAnuncio');
    if (tituloEl) tituloEl.innerHTML = '<i class="fas fa-bullhorn"></i> Publicar Nuevo Anuncio';
    if (btnEl) btnEl.innerHTML = '<i class="fas fa-paper-plane"></i> Publicar Evento';

    document.getElementById('modalAgregarAnuncio').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalAgregarAnuncio(event) {
    if (event && event.target !== document.getElementById('modalAgregarAnuncio')) return;
    document.getElementById('modalAgregarAnuncio').classList.remove('active');
    document.body.style.overflow = '';
    anuncioPendienteEditarId = null;
}

function abrirModalEditarAnuncio(id) {
    const anuncios = cargarAnuncios();
    const anuncio = anuncios.find(a => String(a.id) === String(id));
    if (!anuncio) return;

    document.getElementById('anuncioTitulo').value = anuncio.titulo || '';
    document.getElementById('anuncioFechaInicio').value = anuncio.fechaInicio || '';
    document.getElementById('anuncioHoraInicio').value = anuncio.horaInicio || '';
    document.getElementById('anuncioFechaFin').value = anuncio.fechaFin || '';
    document.getElementById('anuncioHoraFin').value = anuncio.horaFin || '';
    document.getElementById('anuncioUbicacion').value = anuncio.ubicacion || 'Templo Principal';
    document.getElementById('anuncioCategoria').value = anuncio.categoria || 'Culto';
    document.getElementById('anuncioImagen').value = anuncio.imagen || '';
    document.getElementById('anuncioContenido').value = anuncio.contenido || '';

    anuncioPendienteEditarId = id;

    const tituloEl = document.getElementById('modalAnuncioTitulo');
    const btnEl = document.getElementById('btnGuardarAnuncio');
    if (tituloEl) tituloEl.innerHTML = '<i class="fas fa-edit"></i> Editar Anuncio';
    if (btnEl) btnEl.innerHTML = '<i class="fas fa-save"></i> Guardar Cambios';

    const modalQuitar = document.getElementById('modalQuitarAnuncio');
    if (modalQuitar) modalQuitar.classList.remove('active');

    document.getElementById('modalAgregarAnuncio').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function guardarNuevoAnuncio() {
    const titulo = document.getElementById('anuncioTitulo').value.trim();
    const fechaInicio = document.getElementById('anuncioFechaInicio').value;
    const horaInicio = document.getElementById('anuncioHoraInicio').value;
    const fechaFin = document.getElementById('anuncioFechaFin').value;
    const horaFin = document.getElementById('anuncioHoraFin').value;
    const ubicacion = document.getElementById('anuncioUbicacion').value.trim();
    const categoria = document.getElementById('anuncioCategoria').value;
    const imagen = document.getElementById('anuncioImagen').value.trim();
    const contenido = document.getElementById('anuncioContenido').value.trim();

    if (!titulo || !fechaInicio || !contenido) {
        mostrarAlertaAdmin('⚠️ Completa los campos obligatorios: título del evento, fecha de inicio y contenido.');
        return;
    }

    if (fechaFin && fechaInicio && fechaFin < fechaInicio) {
        mostrarAlertaAdmin('⚠️ La fecha de fin no puede ser anterior a la fecha de inicio.');
        return;
    }

    const anuncios = cargarAnuncios();

    if (anuncioPendienteEditarId !== null) {
        const idx = anuncios.findIndex(a => String(a.id) === String(anuncioPendienteEditarId));
        if (idx !== -1) {
            anuncios[idx].titulo = titulo;
            anuncios[idx].fechaInicio = fechaInicio;
            anuncios[idx].horaInicio = horaInicio || '00:00';
            anuncios[idx].fechaFin = fechaFin || fechaInicio;
            anuncios[idx].horaFin = horaFin || horaInicio || '00:00';
            anuncios[idx].ubicacion = ubicacion || 'Templo Principal';
            anuncios[idx].categoria = categoria;
            anuncios[idx].imagen = imagen;
            anuncios[idx].contenido = contenido;
        }
        anuncioPendienteEditarId = null;
    } else {
        anuncios.push({
            id: Date.now(),
            titulo: titulo,
            contenido: contenido,
            fechaInicio: fechaInicio,
            horaInicio: horaInicio || '00:00',
            fechaFin: fechaFin || fechaInicio,
            horaFin: horaFin || horaInicio || '00:00',
            ubicacion: ubicacion || 'Templo Principal',
            imagen: imagen || '',
            categoria: categoria
        });
    }

    guardarAnuncios(anuncios);
    cerrarModalAgregarAnuncio();
    mostrarToastAnuncios('<i class="fas fa-check-circle"></i> Anuncio o evento guardado correctamente');

    filtrarAnunciosQuitar();
}

function generarVistaPreviaAnuncio() {
    const titulo = document.getElementById('anuncioTitulo').value.trim();
    const fechaInicio = document.getElementById('anuncioFechaInicio').value;
    const horaInicio = document.getElementById('anuncioHoraInicio').value;
    const fechaFin = document.getElementById('anuncioFechaFin').value;
    const ubicacion = document.getElementById('anuncioUbicacion').value.trim();
    const categoria = document.getElementById('anuncioCategoria').value;
    const imagen = document.getElementById('anuncioImagen').value.trim();
    const contenido = document.getElementById('anuncioContenido').value.trim();

    if (!titulo || !contenido) {
        mostrarAlertaAdmin('⚠️ Escribe al menos un título y contenido para ver la vista previa.');
        return;
    }

    const fechaStr = fechaInicio
        ? new Date(fechaInicio + 'T00:00:00').toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'Fecha no especificada';

    let html = '';
    if (imagen) html += `<img src="${imagen}" alt="${titulo}" style="width:100%; max-height:260px; object-fit:cover; border-radius:1rem; margin-bottom:1rem;">`;
    html += `<span style="background: var(--golden, #c99d3b); color: var(--deep-blue, #1a3a4a); padding:0.2rem 1rem; border-radius:1rem; font-size:0.75rem; font-weight:700; display:inline-block; margin-bottom:0.5rem;">${categoria}</span>`;
    html += `<h3 style="color:#1a3a4a; margin-top:0.3rem; margin-bottom:0.8rem; font-size:1.4rem;">${titulo}</h3>`;
    html += `<div style="color:#5a6474; font-size:0.9rem; margin-bottom:1rem; display:flex; flex-wrap:wrap; gap:0.8rem;">`;
    html += `<span>📅 ${fechaStr} ${horaInicio ? '· 🕐 ' + horaInicio : ''}</span>`;
    html += `<span>📍 ${ubicacion || 'Templo Principal'}</span>`;
    if (fechaFin && fechaFin !== fechaInicio) {
        const fechaFinStr = new Date(fechaFin + 'T00:00:00').toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
        html += `<span>🏁 Finaliza: ${fechaFinStr}</span>`;
    }
    html += `</div>`;
    html += `<div style="color:#2c3e50; line-height:1.7; font-size:0.95rem;">${contenido.replace(/\n/g, '<br>')}</div>`;

    document.getElementById('vistaPreviaContenido').innerHTML = html;
    document.getElementById('modalVistaPrevia').classList.add('active');
}

function cerrarVistaPrevia(event) {
    if (event && event.target !== document.getElementById('modalVistaPrevia')) return;
    document.getElementById('modalVistaPrevia').classList.remove('active');
}

// ===== RENDERIZAR ANUNCIOS PÚBLICOS =====
function renderizarAnunciosPublicos() {
    const container = document.getElementById('anunciosContainer');
    if (!container) return;

    const anuncios = cargarAnuncios().sort((a, b) => (b.fechaInicio || '').localeCompare(a.fechaInicio || ''));

    if (anuncios.length === 0) {
        container.innerHTML = `
    <div style="text-align:center; padding:3rem 1rem; color: var(--muted-text);">
        <i class="fas fa-bullhorn" style="font-size:3rem; display:block; margin-bottom:1rem; opacity:0.5;"></i>
        <p>No hay anuncios o eventos programados actualmente.</p>
    </div>`;
        return;
    }

    let html = '';
    anuncios.forEach(a => {
        const fechaInicio = a.fechaInicio ? new Date(a.fechaInicio + 'T00:00:00').toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
        const horaInicio = a.horaInicio || '';
        const fechaFin = a.fechaFin && a.fechaFin !== a.fechaInicio ? new Date(a.fechaFin + 'T00:00:00').toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
        const ubicacion = a.ubicacion || 'Templo Principal';
        const categoria = a.categoria || 'Anuncio General';
        const contenido = (a.contenido || '').replace(/\n/g, '<br>');
        const imagen = a.imagen || '';

        html += `
<div class="anuncio-card" style="
    background: var(--pure-white);
    border-radius: 1.5rem;
    padding: 1.8rem;
    margin-bottom: 1.5rem;
    box-shadow: var(--shadow-sm);
    border-left: 5px solid var(--golden);
    transition: var(--transition);
">
    ${imagen ? `<img src="${imagen}" alt="${a.titulo}" style="width:100%; max-height:250px; object-fit:cover; border-radius:1rem; margin-bottom:1rem;">` : ''}
    
    <span style="
        background: var(--golden);
        color: var(--deep-blue);
        padding: 0.2rem 1rem;
        border-radius: 2rem;
        font-size: 0.75rem;
        font-weight: 700;
        display: inline-block;
        margin-bottom: 0.5rem;
    ">${categoria}</span>
    
    <h3 style="color: var(--deep-blue); font-size: 1.4rem; margin: 0.5rem 0;">${a.titulo}</h3>
    
    <div style="color: var(--muted-text); font-size: 0.9rem; margin-bottom: 1rem; display: flex; flex-wrap: wrap; gap: 0.8rem;">
        <span><i class="far fa-calendar-alt" style="color: var(--golden);"></i> ${fechaInicio} ${horaInicio ? '· 🕐 ' + horaInicio : ''}</span>
        ${fechaFin ? `<span><i class="fas fa-hourglass-end" style="color: var(--golden);"></i> Finaliza: ${fechaFin}</span>` : ''}
        <span><i class="fas fa-map-marker-alt" style="color: var(--golden);"></i> ${ubicacion}</span>
    </div>
    
    <div style="color: var(--dark-text); line-height: 1.7;">
        ${contenido}
    </div>
</div>`;
    });

    container.innerHTML = html;
}

// Escuchar cambios del Admin
window.addEventListener('datosAnunciosActualizados', renderizarAnunciosPublicos);
window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_ANUNCIOS) {
        renderizarAnunciosPublicos();
    }
});

// Renderizar al cargar la página
document.addEventListener('DOMContentLoaded', renderizarAnunciosPublicos);
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(renderizarAnunciosPublicos, 1);
}

// ===== QUITAR / EDITAR ANUNCIOS =====
function abrirModalQuitarAnuncio() {
    const buscador = document.getElementById('buscadorQuitarAnuncio');
    if (buscador) buscador.value = '';
    const anuncios = cargarAnuncios().sort((a, b) => (b.fechaInicio || '').localeCompare(a.fechaInicio || ''));
    renderizarListaQuitar(anuncios);
    document.getElementById('modalQuitarAnuncio').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalQuitarAnuncio(event) {
    if (event && event.target !== document.getElementById('modalQuitarAnuncio')) return;
    document.getElementById('modalQuitarAnuncio').classList.remove('active');
    document.body.style.overflow = '';
}

function filtrarAnunciosQuitar() {
    const buscador = document.getElementById('buscadorQuitarAnuncio');
    const termino = buscador ? buscador.value.trim().toLowerCase() : '';
    const anuncios = cargarAnuncios().filter(a =>
        (a.titulo && a.titulo.toLowerCase().includes(termino)) ||
        (a.categoria && a.categoria.toLowerCase().includes(termino)) ||
        (a.ubicacion && a.ubicacion.toLowerCase().includes(termino))
    ).sort((a, b) => (b.fechaInicio || '').localeCompare(a.fechaInicio || ''));
    renderizarListaQuitar(anuncios);
}

function renderizarListaQuitar(anuncios) {
    const container = document.getElementById('listaQuitarAnuncios');
    if (!container) return;

    if (!anuncios || anuncios.length === 0) {
        container.innerHTML = `
    <div style="padding: 2rem; text-align: center; color: var(--muted-text);">
        <i class="fas fa-bullhorn" style="font-size: 2rem; color: #5a6474; display: block; margin-bottom: 0.5rem; opacity: 0.5;"></i>
        No hay anuncios registrados.
    </div>`;
        return;
    }

    let html = `<div style="overflow-x:auto;"><table class="tabla-quitar" style="width:100%; border-collapse:collapse; font-size:0.85rem; min-width:600px;">`;
    html += `<thead><tr style="background:#1a3a4a; color:white; text-align:left;">`;
    html += `<th style="padding:0.7rem;">Título</th>`;
    html += `<th style="padding:0.7rem;">Categoría</th>`;
    html += `<th style="padding:0.7rem;">Fecha Inicio</th>`;
    html += `<th style="padding:0.7rem; text-align:center;">Acciones</th>`;
    html += `</tr></thead><tbody>`;

    anuncios.forEach((a, index) => {
        const bgRow = index % 2 === 0 ? '#ffffff' : '#f9f8f5';
        const fecha = a.fechaInicio ? new Date(a.fechaInicio + 'T00:00:00').toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Sin fecha';
        const tituloEscapado = a.titulo.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        html += `
    <tr style="background:${bgRow}; border-bottom:1px solid #eee;">
        <td style="padding:0.7rem; font-weight:600; color:#1a3a4a;">${tituloEscapado}</td>
        <td style="padding:0.7rem; color:#5a6474;">${a.categoria || 'Anuncio General'}</td>
        <td style="padding:0.7rem; color:#5a6474; white-space:nowrap;">${fecha}</td>
        <td style="padding:0.7rem; text-align:center; white-space:nowrap;">
            <button type="button" onclick="abrirModalEditarAnuncio(${a.id})" style="background:#f0a800; color:white; border:none; padding:0.4rem 0.7rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem; margin-right:0.3rem;" title="Editar anuncio">✏️ Editar</button>
            <button type="button" onclick="confirmarEliminarAnuncio(${a.id})" style="background:#c62828; color:white; border:none; padding:0.4rem 0.7rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem;" title="Eliminar anuncio">🗑️ Eliminar</button>
        </td>
    </tr>`;
    });

    html += `</tbody></table></div>`;
    container.innerHTML = html;
}

function confirmarEliminarAnuncio(id) {
    const anuncios = cargarAnuncios();
    const anuncio = anuncios.find(a => String(a.id) === String(id));
    if (!anuncio) return;

    mostrarConfirmAdmin(
        `¿Estás seguro de que deseas eliminar el anuncio "<strong>${anuncio.titulo}</strong>"? esta acción afectará la página principal.`,
        'Eliminar anuncio',
        function () {
            let nuevosAnuncios = cargarAnuncios().filter(a => String(a.id) !== String(id));
            guardarAnuncios(nuevosAnuncios);
            filtrarAnunciosQuitar();
            mostrarToastAnuncios('<i class="fas fa-trash"></i> Anuncio eliminado correctamente', '#c62828');
        }
    );
}


// ===== EXPORTACIONES GLOBALES ADICIONALES =====
// ===== SECCIÓN: VER INTERESADOS (¡QUEREMOS CONOCERTE!) =====
const STORAGE_INTERESADOS = 'interesados';

function abrirVerInteresados() {
    const panel = document.getElementById('panelAdminGeneral');
    let seccion = document.getElementById('seccionVerInteresados');
    if (!seccion) {
        seccion = document.createElement('div');
        seccion.id = 'seccionVerInteresados';
        seccion.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#faf8f5;z-index:9997;overflow-y:auto;font-family:Inter,sans-serif;';
        document.body.appendChild(seccion);
    }
    seccion.innerHTML = generarHTMLInteresados();
    seccion.style.display = 'block';
    if (panel) panel.style.display = 'none';
}

function cerrarVerInteresados() {
    const seccion = document.getElementById('seccionVerInteresados');
    const panel = document.getElementById('panelAdminGeneral');
    if (seccion) seccion.style.display = 'none';
    if (panel) panel.style.display = 'block';
}

function cargarInteresados() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_INTERESADOS)) || [];
    } catch (e) {
        return [];
    }
}

function guardarInteresados(lista) {
    localStorage.setItem(STORAGE_INTERESADOS, JSON.stringify(lista));
}

function toggleContactadoInteresado(id) {
    const lista = cargarInteresados();
    const index = lista.findIndex(item => item.id === id);
    if (index !== -1) {
        lista[index].contactado = !lista[index].contactado;
        guardarInteresados(lista);
        const seccion = document.getElementById('seccionVerInteresados');
        if (seccion) seccion.innerHTML = generarHTMLInteresados();
    }
}

function eliminarInteresado(id) {
    if (confirm('¿Estás seguro de que deseas eliminar a este interesado de la lista?')) {
        let lista = cargarInteresados();
        lista = lista.filter(item => item.id !== id);
        guardarInteresados(lista);
        const seccion = document.getElementById('seccionVerInteresados');
        if (seccion) seccion.innerHTML = generarHTMLInteresados();
    }
}

function generarHTMLInteresados() {
    const lista = cargarInteresados().reverse();
    const total = lista.length;
    const contactados = lista.filter(i => i.contactado).length;
    const pendientes = total - contactados;

    let html = '<div style="background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10;box-shadow:0 4px 15px rgba(0,0,0,0.1);">';
    html += '<h3 style="color:#c9a53b;margin:0;font-size:1.2rem;display:flex;align-items:center;gap:0.5rem;"><i class="fas fa-users"></i> Personas Interesadas (¡Queremos conocerte!)</h3>';
    html += '<button onclick="cerrarVerInteresados()" style="background:rgba(255,255,255,0.2);color:white;border:none;padding:0.5rem 1.5rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;transition:all 0.2s;"><i class="fas fa-arrow-left"></i> Volver</button></div>';

    html += '<div style="max-width:1100px;margin:1.5rem auto;padding:0 1rem;">';

    // Métricas
    html += '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:1rem;margin-bottom:1.5rem;">';
    html += '<div style="background:white;padding:1.2rem;border-radius:1.2rem;box-shadow:0 4px 12px rgba(0,0,0,0.04);border-left:5px solid #2c5f7c;">';
    html += '<div style="font-size:0.85rem;color:#666;font-weight:600;">Total Registros</div>';
    html += '<div style="font-size:1.8rem;font-weight:800;color:#1a3a4a;">' + total + '</div>';
    html += '</div>';
    
    html += '<div style="background:white;padding:1.2rem;border-radius:1.2rem;box-shadow:0 4px 12px rgba(0,0,0,0.04);border-left:5px solid #d4a038;">';
    html += '<div style="font-size:0.85rem;color:#666;font-weight:600;">Pendientes</div>';
    html += '<div style="font-size:1.8rem;font-weight:800;color:#d4a038;">' + pendientes + '</div>';
    html += '</div>';

    html += '<div style="background:white;padding:1.2rem;border-radius:1.2rem;box-shadow:0 4px 12px rgba(0,0,0,0.04);border-left:5px solid #28a745;">';
    html += '<div style="font-size:0.85rem;color:#666;font-weight:600;">Contactados</div>';
    html += '<div style="font-size:1.8rem;font-weight:800;color:#28a745;">' + contactados + '</div>';
    html += '</div>';
    html += '</div>';

    // Tabla de datos
    html += '<div style="background:white;border-radius:1.5rem;padding:1.5rem;box-shadow:0 4px 20px rgba(0,0,0,0.06);overflow:hidden;">';
    if (lista.length === 0) {
        html += '<div style="text-align:center;padding:3rem 1rem;color:#666;">';
        html += '<i class="fas fa-inbox" style="font-size:3rem;color:#ccc;margin-bottom:1rem;"></i>';
        html += '<p style="font-size:1.1rem;margin:0;">No hay personas registradas por el momento.</p>';
        html += '<p style="font-size:0.9rem;color:#999;margin-top:0.3rem;">Cuando los visitantes envíen el formulario "¡Queremos conocerte!", aparecerán aquí.</p>';
        html += '</div>';
    } else {
        html += '<div style="overflow-x:auto;">';
        html += '<table style="width:100%;border-collapse:collapse;text-align:left;font-size:0.95rem;">';
        html += '<thead><tr style="border-bottom:2px solid #eee;color:#1a3a4a;font-weight:700;">';
        html += '<th style="padding:1rem 0.8rem;">#</th>';
        html += '<th style="padding:1rem 0.8rem;">Nombre Completo</th>';
        html += '<th style="padding:1rem 0.8rem;">WhatsApp</th>';
        html += '<th style="padding:1rem 0.8rem;">Correo Electrónico</th>';
        html += '<th style="padding:1rem 0.8rem;">Fecha</th>';
        html += '<th style="padding:1rem 0.8rem;">Estado</th>';
        html += '<th style="padding:1rem 0.8rem;text-align:center;">Acciones</th>';
        html += '</tr></thead><tbody>';

        lista.forEach((item, index) => {
            const estadoBadge = item.contactado 
                ? '<span style="background:#e6f4ea;color:#137333;padding:0.3rem 0.8rem;border-radius:1rem;font-size:0.8rem;font-weight:700;display:inline-block;"><i class="fas fa-check-circle"></i> Contactado</span>'
                : '<span style="background:#fef7e0;color:#b06000;padding:0.3rem 0.8rem;border-radius:1rem;font-size:0.8rem;font-weight:700;display:inline-block;"><i class="fas fa-clock"></i> Pendiente</span>';
            
            const btnContactoText = item.contactado ? 'Marcar pendiente' : 'Marcar contactado';
            const btnContactoColor = item.contactado ? '#6c757d' : '#28a745';
            const btnContactoIcon = item.contactado ? 'fa-undo' : 'fa-check';

            const cleanWa = (item.whatsapp || '').replace(/\\D/g, '');
            const waLink = cleanWa ? `<a href="https://wa.me/${cleanWa}" target="_blank" style="color:#25D366;text-decoration:none;font-weight:600;"><i class="fab fa-whatsapp"></i> ${item.whatsapp}</a>` : (item.whatsapp || '-');

            html += `<tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:0.9rem 0.8rem;color:#888;">${total - index}</td>
                <td style="padding:0.9rem 0.8rem;font-weight:600;color:#1a3a4a;">${item.nombre}</td>
                <td style="padding:0.9rem 0.8rem;">${waLink}</td>
                <td style="padding:0.9rem 0.8rem;color:#555;">${item.email || 'No proporcionado'}</td>
                <td style="padding:0.9rem 0.8rem;color:#777;font-size:0.85rem;">${item.fecha}</td>
                <td style="padding:0.9rem 0.8rem;">${estadoBadge}</td>
                <td style="padding:0.9rem 0.8rem;text-align:center;">
                    <div style="display:flex;gap:0.4rem;justify-content:center;">
                        <button onclick="toggleContactadoInteresado(${item.id})" title="${btnContactoText}" style="background:${btnContactoColor};color:white;border:none;padding:0.4rem 0.8rem;border-radius:0.5rem;cursor:pointer;font-size:0.8rem;font-weight:600;">
                            <i class="fas ${btnContactoIcon}"></i>
                        </button>
                        <button onclick="eliminarInteresado(${item.id})" title="Eliminar" style="background:#dc3545;color:white;border:none;padding:0.4rem 0.8rem;border-radius:0.5rem;cursor:pointer;font-size:0.8rem;">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
        });

        html += '</tbody></table></div>';
    }

    html += '</div></div>';
    return html;
}

window.abrirBaseDatosClub = abrirBaseDatosClub;
window.cerrarSeccionBD = cerrarSeccionBD;
window.abrirModalAgregarMiembroBD = abrirModalAgregarMiembroBD;
window.cerrarModalAgregarMiembroBD = cerrarModalAgregarMiembroBD;
window.guardarNuevoMiembroBD = guardarNuevoMiembroBD;
window.solicitarEliminarMiembroBD = solicitarEliminarMiembroBD;
window.confirmarEliminarMiembroBD = confirmarEliminarMiembroBD;
window.cerrarModalConfirmarEliminarBD = cerrarModalConfirmarEliminarBD;
window.filtrarMiembrosBD = filtrarMiembrosBD;
window.abrirCronograma = abrirCronograma;
window.cerrarCronograma = cerrarCronograma;
window.agregarEvento = agregarEvento;
window.eliminarEvento = eliminarEvento;
window.abrirEncuestas = abrirEncuestas;
window.cerrarEncuestas = cerrarEncuestas;
window.agregarEncuesta = agregarEncuesta;
window.eliminarEncuesta = eliminarEncuesta;
window.abrirVerInteresados = abrirVerInteresados;
window.cerrarVerInteresados = cerrarVerInteresados;
window.generarHTMLInteresados = generarHTMLInteresados;
window.toggleContactadoInteresado = toggleContactadoInteresado;
window.eliminarInteresado = eliminarInteresado;
window.abrirCalendarioClub = abrirCalendarioClub;
window.cerrarCalendarioClub = cerrarCalendarioClub;
window.agregarEventoClubAdmin = agregarEventoClubAdmin;
window.eliminarEventoClubAdmin = eliminarEventoClubAdmin;
window.abrirCuotasClub = abrirCuotasClub;
window.cerrarSeccionCuotas = cerrarSeccionCuotas;
window.descargarExcelCuotas = descargarExcelCuotas;
window.abrirModalEditarMiembroBD = abrirModalEditarMiembroBD;
window.abrirEditarEventoClub = abrirEditarEventoClub;
window.toggleCampoRecurrencia = toggleCampoRecurrencia;
window.exportarDatosClub = exportarDatosClub;
window.importarDatosClub = importarDatosClub;
window.abrirModalAgregarLibro = abrirModalAgregarLibro;
window.cerrarModalAgregarLibro = cerrarModalAgregarLibro;
window.guardarNuevoLibro = guardarNuevoLibro;
window.abrirModalEliminarLibro = abrirModalEliminarLibro;
window.cerrarModalEliminarLibro = cerrarModalEliminarLibro;
window.confirmarEliminarLibro = confirmarEliminarLibro;
window.abrirModalVerPedidos = abrirModalVerPedidos;
window.cerrarModalVerPedidos = cerrarModalVerPedidos;
window.marcarEntregadoPedido = marcarEntregadoPedido;
window.cancelarPedido = cancelarPedido;
window.filtrarPedidosTab = filtrarPedidosTab;
window.filtrarEliminarLibro = filtrarEliminarLibro;
window.abrirModalEditarLibro = abrirModalEditarLibro;
window.abrirModalAgregarAnuncio = abrirModalAgregarAnuncio;
window.cerrarModalAgregarAnuncio = cerrarModalAgregarAnuncio;
window.guardarNuevoAnuncio = guardarNuevoAnuncio;
window.generarVistaPreviaAnuncio = generarVistaPreviaAnuncio;
window.cerrarVistaPrevia = cerrarVistaPrevia;
window.abrirModalQuitarAnuncio = abrirModalQuitarAnuncio;
window.cerrarModalQuitarAnuncio = cerrarModalQuitarAnuncio;
window.filtrarAnunciosQuitar = filtrarAnunciosQuitar;
window.abrirModalEditarAnuncio = abrirModalEditarAnuncio;
window.confirmarEliminarAnuncio = confirmarEliminarAnuncio;
if (typeof abrirModalCrearExamen !== 'undefined') window.abrirModalCrearExamen = abrirModalCrearExamen;
if (typeof abrirModalEditarExamenes !== 'undefined') window.abrirModalEditarExamenes = abrirModalEditarExamenes;
if (typeof abrirModalGestionarResultados !== 'undefined') window.abrirModalGestionarResultados = abrirModalGestionarResultados;
if (typeof abrirModalGestionarPlanEstudios !== 'undefined') window.abrirModalGestionarPlanEstudios = abrirModalGestionarPlanEstudios;

/* ========================================
   GESTIÓN DE TRANSMISIONES EN VIVO (PANEL ADMIN)
   ======================================== */

let transmisionEditandoId = null;

function abrirModalGestionarTransmisiones() {
    const modal = document.getElementById('modalGestionarTransmisiones');
    if (!modal) return;
    document.body.style.overflow = 'hidden';
    modal.style.display = 'flex';
    transmisionEditandoId = null;
    renderizarAdminTransmisiones();
}

function cerrarModalGestionarTransmisiones(e) {
    if (e && e.target && e.target !== document.getElementById('modalGestionarTransmisiones')) {
        // mantener abierto si clic es dentro del modal
    }
    const modal = document.getElementById('modalGestionarTransmisiones');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function renderizarAdminTransmisiones() {
    const container = document.getElementById('adminTransmisionesContenido');
    if (!container) return;

    const transmisiones = typeof obtenerTransmisiones === 'function' ? obtenerTransmisiones() : [];

    let transEdit = null;
    if (transmisionEditandoId) {
        transEdit = transmisiones.find(t => t.id === transmisionEditandoId);
    }

    const fechaHoy = new Date().toISOString().split('T')[0];

    let html = `
    <!-- FORMULARIO DE AGREGAR / EDITAR TRANSMISIÓN -->
    <div style="background: #faf8f5; border: 1px solid rgba(201,165,59,0.3); border-radius: 1.2rem; padding: 1.5rem; margin-bottom: 2rem;">
        <h4 style="margin: 0 0 1rem; color: #1a3a4a; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
            <i class="${transEdit ? 'fas fa-edit' : 'fas fa-plus-circle'}" style="color: #c9a53b;"></i>
            ${transEdit ? 'Editar Transmisión' : 'Agregar Nueva Transmisión'}
        </h4>

        <form id="formTransmisionAdmin" onsubmit="guardarTransmisionForm(event)" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
            <div>
                <label style="display:block; font-weight:600; font-size:0.85rem; color:#1a3a4a; margin-bottom:0.3rem;">Categoría *</label>
                <select id="transCategoria" required style="width:100%; padding:0.65rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-family:Inter,sans-serif;">
                    <option value="Sábado (Culto)" ${transEdit && transEdit.categoria === 'Sábado (Culto)' ? 'selected' : ''}>🎥 Sábado (Culto)</option>
                    <option value="Sociedad de Jóvenes" ${transEdit && transEdit.categoria === 'Sociedad de Jóvenes' ? 'selected' : ''}>🙌 Sociedad de Jóvenes</option>
                    <option value="Lunes de Oración" ${transEdit && transEdit.categoria === 'Lunes de Oración' ? 'selected' : ''}>🙏 Lunes de Oración</option>
                    <option value="Miércoles de Testimonio" ${transEdit && transEdit.categoria === 'Miércoles de Testimonio' ? 'selected' : ''}>✝️ Miércoles de Testimonio</option>
                    <option value="Campaña" ${transEdit && transEdit.categoria === 'Campaña' ? 'selected' : ''}>📢 Campaña</option>
                </select>
            </div>

            <div style="grid-column: span 2;">
                <label style="display:block; font-weight:600; font-size:0.85rem; color:#1a3a4a; margin-bottom:0.3rem;">Título de la transmisión *</label>
                <input type="text" id="transTitulo" placeholder="Ej: Culto Divino de Adoración" value="${transEdit ? transEdit.titulo : ''}" required style="width:100%; padding:0.65rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-family:Inter,sans-serif;">
            </div>

            <div>
                <label style="display:block; font-weight:600; font-size:0.85rem; color:#1a3a4a; margin-bottom:0.3rem;">Fecha de transmisión *</label>
                <input type="date" id="transFecha" value="${transEdit ? transEdit.fecha : fechaHoy}" required style="width:100%; padding:0.65rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-family:Inter,sans-serif;">
            </div>

            <div>
                <label style="display:block; font-weight:600; font-size:0.85rem; color:#1a3a4a; margin-bottom:0.3rem;">Plataforma *</label>
                <select id="transPlataforma" required style="width:100%; padding:0.65rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-family:Inter,sans-serif;">
                    <option value="youtube" ${transEdit && transEdit.plataforma === 'youtube' ? 'selected' : ''}>YouTube</option>
                    <option value="facebook" ${transEdit && transEdit.plataforma === 'facebook' ? 'selected' : ''}>Facebook</option>
                </select>
            </div>

            <div style="grid-column: span 2;">
                <label style="display:block; font-weight:600; font-size:0.85rem; color:#1a3a4a; margin-bottom:0.3rem;">URL o ID del video *</label>
                <input type="text" id="transVideoId" placeholder="Para YouTube: dQw4w9WgXcQ o URL completa. Para Facebook: URL completa" value="${transEdit ? transEdit.videoId : ''}" required style="width:100%; padding:0.65rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-family:Inter,sans-serif;">
            </div>

            <div style="grid-column: 1 / -1;">
                <label style="display:block; font-weight:600; font-size:0.85rem; color:#1a3a4a; margin-bottom:0.3rem;">Descripción (Opcional)</label>
                <textarea id="transDescripcion" rows="2" placeholder="Breve descripción del tema o predicador..." style="width:100%; padding:0.65rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-family:Inter,sans-serif;">${transEdit && transEdit.descripcion ? transEdit.descripcion : ''}</textarea>
            </div>

            <div style="display:flex; gap:1.5rem; align-items:center; grid-column: 1 / -1; background:white; padding:0.8rem; border-radius:0.6rem; border:1px solid #e2e8f0;">
                <label style="display:inline-flex; align-items:center; gap:0.5rem; font-weight:600; font-size:0.88rem; color:#1a3a4a; cursor:pointer;">
                    <input type="checkbox" id="transDestacado" ${transEdit && transEdit.destacado ? 'checked' : ''}>
                    ⭐ Marcar como Destacado
                </label>
                <label style="display:inline-flex; align-items:center; gap:0.5rem; font-weight:600; font-size:0.88rem; color:#c53030; cursor:pointer;">
                    <input type="checkbox" id="transEnVivo" ${transEdit && transEdit.enVivo ? 'checked' : ''}>
                    🔴 Marcar como EN VIVO (Transmitiendo actualmente)
                </label>
            </div>

            <div style="grid-column: 1 / -1; display:flex; gap:0.8rem; justify-content:flex-end; margin-top:0.5rem;">
                ${transEdit ? `
                <button type="button" onclick="cancelarEdicionTransmision()" style="background:#e2e8f0; color:#475569; border:none; padding:0.7rem 1.2rem; border-radius:0.8rem; font-weight:600; cursor:pointer; font-family:Inter,sans-serif;">
                    Cancelar Edición
                </button>
                ` : ''}
                <button type="submit" style="background:linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%); color:white; border:none; padding:0.7rem 1.6rem; border-radius:0.8rem; font-weight:700; cursor:pointer; font-family:Inter,sans-serif;">
                    <i class="fas fa-save"></i> ${transEdit ? 'Guardar Cambios' : 'Publicar Transmisión'}
                </button>
            </div>
        </form>
    </div>

    <!-- LISTA DE TRANSMISIONES EXISTENTES -->
    <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:0.8rem;">
            <h4 style="margin:0; color:#1a3a4a; font-size:1.1rem;">
                <i class="fas fa-list"></i> Transmisiones Registradas (${transmisiones.length})
            </h4>
            <select id="filtroCategoriaAdmin" onchange="filtrarTransmisionesAdminList(this.value)" style="padding:0.45rem 0.8rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-size:0.85rem; font-family:Inter,sans-serif;">
                <option value="TODAS">Todas las categorías</option>
                <option value="Sábado (Culto)">🎥 Sábado (Culto)</option>
                <option value="Sociedad de Jóvenes">🙌 Sociedad de Jóvenes</option>
                <option value="Lunes de Oración">🙏 Lunes de Oración</option>
                <option value="Miércoles de Testimonio">✝️ Miércoles de Testimonio</option>
                <option value="Campaña">📢 Campaña</option>
            </select>
        </div>

        <div id="tablaTransmisionesAdminWrapper" style="overflow-x:auto; max-height:45vh; border:1px solid #e2e8f0; border-radius:0.8rem;">
            ${generarTablaTransmisionesAdminHTML(transmisiones)}
        </div>
    </div>
    `;

    container.innerHTML = html;
}

function generarTablaTransmisionesAdminHTML(lista) {
    if (!lista || lista.length === 0) {
        return `
        <div style="text-align:center; padding:2rem; color:#64748b;">
            <i class="fas fa-inbox" style="font-size:2rem; margin-bottom:0.5rem;"></i>
            <p style="margin:0;">No hay transmisiones registradas en el sistema.</p>
        </div>
        `;
    }

    // Ordenar por fecha descendente
    lista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    let html = `
    <table class="tabla-cronograma" style="width:100%; border-collapse:collapse; text-align:left;">
        <thead>
            <tr style="background:#1a3a4a; color:white;">
                <th style="padding:0.75rem 0.8rem;">Categoría</th>
                <th style="padding:0.75rem 0.8rem;">Título</th>
                <th style="padding:0.75rem 0.8rem;">Fecha</th>
                <th style="padding:0.75rem 0.8rem;">Plataforma</th>
                <th style="padding:0.75rem 0.8rem; text-align:center;">Estados</th>
                <th style="padding:0.75rem 0.8rem; text-align:center;">Acciones</th>
            </tr>
        </thead>
        <tbody>
    `;

    lista.forEach(t => {
        html += `
        <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.65rem 0.8rem; font-weight:600; color:#1a3a4a; font-size:0.85rem;">${t.categoria}</td>
            <td style="padding:0.65rem 0.8rem; font-weight:700; color:#2c5f7c; font-size:0.88rem;">${t.titulo}</td>
            <td style="padding:0.65rem 0.8rem; font-size:0.85rem; color:#475569;">${t.fecha}</td>
            <td style="padding:0.65rem 0.8rem;">
                <span class="envivo-plat-badge envivo-plat-${t.plataforma}" style="position:static; font-size:0.65rem;">
                    <i class="fab fa-${t.plataforma}"></i> ${t.plataforma}
                </span>
            </td>
            <td style="padding:0.65rem 0.8rem; text-align:center; font-size:0.85rem;">
                ${t.enVivo ? '<span class="badge-live-pulse" style="font-size:0.65rem; padding:0.2rem 0.5rem; margin-right:0.3rem;">🔴 EN VIVO</span>' : ''}
                ${t.destacado ? '<span style="background:#fef3c7; color:#b45309; padding:0.2rem 0.5rem; border-radius:1rem; font-size:0.7rem; font-weight:700;">⭐ Destacado</span>' : ''}
                ${!t.enVivo && !t.destacado ? '<span style="color:#94a3b8;">⏹️ Normal</span>' : ''}
            </td>
            <td style="padding:0.65rem 0.8rem; text-align:center;">
                <div style="display:flex; gap:0.4rem; justify-content:center;">
                    <button onclick="editarTransmisionAdmin(${t.id})" style="background:#e0f2fe; color:#0369a1; border:none; padding:0.35rem 0.7rem; border-radius:0.5rem; cursor:pointer; font-weight:600; font-size:0.8rem;" title="Editar">
                        ✏️ Editar
                    </button>
                    <button onclick="eliminarTransmisionAdmin(${t.id})" style="background:#fee2e2; color:#991b1b; border:none; padding:0.35rem 0.7rem; border-radius:0.5rem; cursor:pointer; font-weight:600; font-size:0.8rem;" title="Eliminar">
                        🗑️ Eliminar
                    </button>
                </div>
            </td>
        </tr>
        `;
    });

    html += `
        </tbody>
    </table>
    `;

    return html;
}

function filtrarTransmisionesAdminList(cat) {
    const transmisiones = typeof obtenerTransmisiones === 'function' ? obtenerTransmisiones() : [];
    const filtradas = cat === 'TODAS' ? transmisiones : transmisiones.filter(t => t.categoria === cat);
    const wrapper = document.getElementById('tablaTransmisionesAdminWrapper');
    if (wrapper) {
        wrapper.innerHTML = generarTablaTransmisionesAdminHTML(filtradas);
    }
}

function guardarTransmisionForm(e) {
    e.preventDefault();

    const categoria = document.getElementById('transCategoria').value;
    const titulo = document.getElementById('transTitulo').value.trim();
    const fecha = document.getElementById('transFecha').value;
    let plataforma = document.getElementById('transPlataforma').value;
    let videoIdRaw = document.getElementById('transVideoId').value.trim();
    const descripcion = document.getElementById('transDescripcion').value.trim();
    const destacado = document.getElementById('transDestacado').checked;
    const enVivo = document.getElementById('transEnVivo').checked;

    if (!titulo || !fecha || !videoIdRaw) {
        alert('⚠️ Por favor complete todos los campos obligatorios (*)');
        return;
    }

    // Auto-detectar plataforma si la URL indica claramente YouTube o Facebook
    if (videoIdRaw.includes('facebook.com') || videoIdRaw.includes('fb.watch')) {
        plataforma = 'facebook';
    } else if (videoIdRaw.includes('youtube.com') || videoIdRaw.includes('youtu.be')) {
        plataforma = 'youtube';
    }

    // Procesar ID si es YouTube
    let videoId = videoIdRaw;
    if (plataforma === 'youtube' && typeof window.obtenerYouTubeId === 'function') {
        videoId = window.obtenerYouTubeId(videoIdRaw);
    }

    let transmisiones = typeof obtenerTransmisiones === 'function' ? obtenerTransmisiones() : [];

    // Si se marca enVivo en una categoría, podemos desmarcar las otras en la misma categoría si se desea
    if (enVivo) {
        transmisiones.forEach(t => {
            if (t.categoria === categoria) {
                t.enVivo = false;
            }
        });
    }

    if (transmisionEditandoId) {
        const idx = transmisiones.findIndex(t => t.id === transmisionEditandoId);
        if (idx !== -1) {
            transmisiones[idx] = {
                ...transmisiones[idx],
                categoria,
                titulo,
                fecha,
                plataforma,
                videoId,
                descripcion,
                destacado,
                enVivo
            };
        }
        transmisionEditandoId = null;
        alert('✅ Transmisión actualizada correctamente');
    } else {
        const nuevaTrans = {
            id: Date.now(),
            categoria,
            titulo,
            fecha,
            plataforma,
            videoId,
            descripcion,
            destacado,
            enVivo,
            fechaCreacion: new Date().toISOString()
        };
        transmisiones.push(nuevaTrans);
        alert('✅ Transmisión agregada correctamente');
    }

    if (typeof guardarTransmisiones === 'function') {
        guardarTransmisiones(transmisiones);
    } else {
        localStorage.setItem('transmisiones', JSON.stringify(transmisiones));
    }

    renderizarAdminTransmisiones();
    if (typeof renderizarVistaCategoriasEnVivo === 'function') {
        renderizarVistaCategoriasEnVivo();
    }
}

function editarTransmisionAdmin(id) {
    transmisionEditandoId = id;
    renderizarAdminTransmisiones();
    const form = document.getElementById('formTransmisionAdmin');
    if (form) form.scrollIntoView({ behavior: 'smooth' });
}

function cancelarEdicionTransmision() {
    transmisionEditandoId = null;
    renderizarAdminTransmisiones();
}

function eliminarTransmisionAdmin(id) {
    const transmisiones = typeof obtenerTransmisiones === 'function' ? obtenerTransmisiones() : [];
    const t = transmisiones.find(x => x.id === id);
    const nombre = t ? t.titulo : 'esta transmisión';

    if (confirm(`¿Está seguro de eliminar ${nombre}? Esta acción no se puede deshacer.`)) {
        const filtradas = transmisiones.filter(x => x.id !== id);
        if (typeof guardarTransmisiones === 'function') {
            guardarTransmisiones(filtradas);
        } else {
            localStorage.setItem('transmisiones', JSON.stringify(filtradas));
        }

        if (transmisionEditandoId === id) transmisionEditandoId = null;

        renderizarAdminTransmisiones();
        if (typeof renderizarVistaCategoriasEnVivo === 'function') {
            renderizarVistaCategoriasEnVivo();
        }
        alert('🗑️ Transmisión eliminada correctamente');
    }
}

// Exportar a window
window.abrirModalGestionarTransmisiones = abrirModalGestionarTransmisiones;
window.cerrarModalGestionarTransmisiones = cerrarModalGestionarTransmisiones;
window.guardarTransmisionForm = guardarTransmisionForm;
window.editarTransmisionAdmin = editarTransmisionAdmin;
window.cancelarEdicionTransmision = cancelarEdicionTransmision;
window.eliminarTransmisionAdmin = eliminarTransmisionAdmin;
window.filtrarTransmisionesAdminList = filtrarTransmisionesAdminList;

/* ========================================
   GESTIÓN DE CALENDARIO GENERAL DE LA IGLESIA (ADMIN)
   ======================================== */

let eventoIglesiaPendienteEditarId = null;

function abrirCalendarioIglesiaAdmin() {
    const panel = document.getElementById('panelAdminGeneral');
    if (!panel) return;

    bloquearScrollAdmin('seccionCalendarioIglesia');

    let seccion = document.getElementById('seccionCalendarioIglesia');
    if (!seccion) {
        seccion = document.createElement('div');
        seccion.id = 'seccionCalendarioIglesia';
        seccion.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#faf8f5;z-index:9999;overflow-y:auto;font-family:Inter,sans-serif;';
        document.body.appendChild(seccion);
    }

    eventoIglesiaPendienteEditarId = null;
    seccion.innerHTML = generarHTMLCalendarioIglesia();
    seccion.style.display = 'block';
    panel.style.display = 'none';
}

function cerrarCalendarioIglesiaAdmin() {
    const seccion = document.getElementById('seccionCalendarioIglesia');
    const panel = document.getElementById('panelAdminGeneral');
    if (seccion) seccion.style.display = 'none';
    if (panel) panel.style.display = 'block';
    eventoIglesiaPendienteEditarId = null;
    desbloquearScrollAdmin('seccionCalendarioIglesia');
}

function cargarEventosIglesiaAdmin() {
    try {
        const raw = localStorage.getItem('eventosIglesia');
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
        const lista = [];
        Object.keys(parsed).forEach(f => {
            if (Array.isArray(parsed[f])) {
                parsed[f].forEach((item) => {
                    lista.push({
                        id: Date.now() + Math.random(),
                        titulo: typeof item === 'string' ? item : item.titulo,
                        fecha: f,
                        hora: typeof item === 'string' ? '' : (item.hora || ''),
                        descripcion: typeof item === 'string' ? '' : (item.descripcion || ''),
                        recurrente: false,
                        semanas: 1
                    });
                });
            }
        });
        return lista;
    } catch (e) {
        return [];
    }
}

function guardarEventosIglesiaAdmin(eventos) {
    localStorage.setItem('eventosIglesia', JSON.stringify(eventos));
    window.dispatchEvent(new Event('datosIglesiaActualizados'));
}

function generarHTMLCalendarioIglesia() {
    const eventos = cargarEventosIglesiaAdmin().sort((a, b) => a.fecha.localeCompare(b.fecha));

    let html = '<div style="background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10;">';
    html += '<h3 style="color:#c9a53b;margin:0;font-size:1.2rem;">📅 Calendario General de la Iglesia</h3>';
    html += '<button onclick="cerrarCalendarioIglesiaAdmin()" style="background:rgba(255,255,255,0.2);color:white;border:none;padding:0.5rem 1.5rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;"><i class="fas fa-arrow-left"></i> Volver al Panel</button></div>';
    html += '<div style="max-width:800px;margin:0 auto;padding:1rem;">';
    
    // Formulario
    html += '<div style="background:white;border-radius:1.5rem;padding:1.5rem;margin-bottom:1.5rem;box-shadow:0 4px 15px rgba(0,0,0,0.05);">';
    html += '<h4 style="color:#1a3a4a;margin-bottom:1rem;" id="formCalendarioIglesiaTitulo"><i class="fas fa-plus-circle"></i> Agregar Evento a la Iglesia</h4>';
    html += '<input type="text" id="eventoIglesiaTitulo" placeholder="Título del evento (ej: Culto Especial de Gratitud)" style="width:100%;padding:0.7rem 1rem;border:2px solid #e8e3d8;border-radius:1rem;margin-bottom:0.8rem;font-family:Inter,sans-serif;">';
    html += '<div style="display:flex;gap:0.8rem;flex-wrap:wrap;margin-bottom:0.8rem;">';
    html += '<input type="date" id="eventoIglesiaFecha" style="flex:1;padding:0.7rem 1rem;border:2px solid #e8e3d8;border-radius:1rem;font-family:Inter,sans-serif;">';
    html += '<input type="time" id="eventoIglesiaHora" style="flex:1;padding:0.7rem 1rem;border:2px solid #e8e3d8;border-radius:1rem;font-family:Inter,sans-serif;">';
    html += '</div>';
    html += '<textarea id="eventoIglesiaDescripcion" placeholder="Descripción opcional..." rows="2" style="width:100%;padding:0.7rem 1rem;border:2px solid #e8e3d8;border-radius:1rem;margin-bottom:0.8rem;font-family:Inter,sans-serif;"></textarea>';
    
    // Recurrencia
    html += '<div class="recurrencia-opcion" style="margin-bottom:0.5rem;">';
    html += '<label style="font-weight:600;color:#1a3a4a;cursor:pointer;"><input type="checkbox" id="eventoIglesiaRecurrente" onchange="toggleCampoRecurrenciaIglesia()"> 📅 Repetir semanalmente</label>';
    html += '</div>';
    html += '<div class="campo-recurrencia" id="campoRecurrenciaIglesia" style="display:none;margin-bottom:1rem;padding:0.8rem;background:#faf8f5;border-radius:0.8rem;border:1px solid #e8e3d8;">';
    html += '<label style="font-weight:600;color:#1a3a4a;margin-right:0.5rem;">Semanas a repetir:</label>';
    html += '<input type="number" id="eventoIglesiaSemanas" min="1" max="52" value="4" style="width:80px;padding:0.4rem 0.6rem;border-radius:0.5rem;border:1px solid #cbd5e1;">';
    html += '</div>';
    
    html += '<button onclick="agregarEventoIglesiaAdmin()" id="btnGuardarEventoIglesia" style="margin-top:0.5rem;width:100%;padding:0.8rem;background:linear-gradient(135deg,#d4a038 0%,#c9a53b 100%);color:#1a3a4a;border:none;border-radius:2rem;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;"><i class="fas fa-plus"></i> Agregar Evento</button>';
    html += '</div>';

    // Lista de eventos
    html += '<div>';
    html += '<h4 style="color:#1a3a4a;margin-bottom:0.8rem;"><i class="fas fa-list-ul"></i> Eventos Registrados (' + eventos.length + ')</h4>';
    if (eventos.length === 0) {
        html += '<p style="text-align:center;color:#5a6474;padding:1.5rem;background:white;border-radius:1rem;">No hay eventos programados en el calendario general.</p>';
    } else {
        eventos.forEach(ev => {
            html += '<div class="evento-item" style="background:white;border-radius:1rem;padding:1rem;margin-bottom:0.8rem;box-shadow:0 2px 8px rgba(0,0,0,0.04);display:flex;justify-content:space-between;align-items:center;">';
            html += '<div class="evento-info"><div class="evento-titulo" style="font-weight:700;color:#1a3a4a;">' + ev.titulo + (ev.recurrente ? ' <span style="font-size:0.75rem;background:#fef3c7;color:#b45309;padding:0.15rem 0.5rem;border-radius:0.8rem;">🔄 Semanal</span>' : '') + '</div>';
            html += '<div class="evento-fecha" style="font-size:0.85rem;color:#5a6474;"><i class="far fa-calendar-alt"></i> ' + ev.fecha + (ev.hora ? ' a las ' + ev.hora : '') + (ev.descripcion ? ' · ' + ev.descripcion : '') + '</div></div>';
            html += '<div style="display:flex;gap:0.4rem;">';
            html += '<button class="btn-editar-evento" onclick="abrirEditarEventoIglesia(' + ev.id + ')" title="Editar" style="background:#e0f2fe;color:#0369a1;border:none;padding:0.4rem 0.7rem;border-radius:0.5rem;cursor:pointer;font-weight:600;">✏️</button>';
            html += '<button class="btn-eliminar-miembro" onclick="eliminarEventoIglesiaAdmin(' + ev.id + ')" title="Quitar" style="background:#fee2e2;color:#991b1b;border:none;padding:0.4rem 0.7rem;border-radius:0.5rem;cursor:pointer;font-weight:600;">🗑️</button>';
            html += '</div>';
            html += '</div>';
        });
    }
    html += '</div></div>';
    return html;
}

function toggleCampoRecurrenciaIglesia() {
    const checkbox = document.getElementById('eventoIglesiaRecurrente');
    const campo = document.getElementById('campoRecurrenciaIglesia');
    if (campo) {
        campo.style.display = checkbox.checked ? 'block' : 'none';
    }
}

function abrirEditarEventoIglesia(id) {
    const eventos = cargarEventosIglesiaAdmin();
    const evento = eventos.find(e => String(e.id) === String(id));
    if (!evento) return;

    document.getElementById('eventoIglesiaTitulo').value = evento.titulo;
    document.getElementById('eventoIglesiaFecha').value = evento.fecha;
    document.getElementById('eventoIglesiaHora').value = evento.hora || '';
    document.getElementById('eventoIglesiaDescripcion').value = evento.descripcion || '';

    eventoIglesiaPendienteEditarId = id;

    document.getElementById('formCalendarioIglesiaTitulo').innerHTML = '<i class="fas fa-edit"></i> Editar Evento';
    document.getElementById('btnGuardarEventoIglesia').innerHTML = '<i class="fas fa-save"></i> Guardar Cambios';

    const checkbox = document.getElementById('eventoIglesiaRecurrente');
    if (checkbox) checkbox.checked = false;
    toggleCampoRecurrenciaIglesia();
}

function agregarEventoIglesiaAdmin() {
    const titulo = document.getElementById('eventoIglesiaTitulo').value.trim();
    const fecha = document.getElementById('eventoIglesiaFecha').value;
    const hora = document.getElementById('eventoIglesiaHora').value;
    const descripcion = document.getElementById('eventoIglesiaDescripcion').value.trim();

    if (!titulo || !fecha) {
        mostrarAlertaAdmin('Por favor completa el título y la fecha del evento.');
        return;
    }

    const esRecurrente = document.getElementById('eventoIglesiaRecurrente').checked;
    const semanas = esRecurrente ? parseInt(document.getElementById('eventoIglesiaSemanas').value) || 1 : 1;

    let eventos = cargarEventosIglesiaAdmin();

    if (eventoIglesiaPendienteEditarId !== null) {
        const idx = eventos.findIndex(e => String(e.id) === String(eventoIglesiaPendienteEditarId));
        if (idx !== -1) {
            eventos.splice(idx, 1);
        }
    }

    if (esRecurrente) {
        const serieId = 'serie_' + Date.now();
        const fechaBase = new Date(fecha + 'T00:00:00');
        for (let i = 0; i < semanas; i++) {
            const fechaNueva = new Date(fechaBase);
            fechaNueva.setDate(fechaNueva.getDate() + (i * 7));
            const fechaStr = fechaNueva.toISOString().split('T')[0];
            eventos.push({
                id: Date.now() + i,
                titulo: titulo,
                fecha: fechaStr,
                hora: hora,
                descripcion: descripcion,
                recurrente: true,
                semanas: semanas,
                serieId: serieId
            });
        }
    } else {
        eventos.push({
            id: eventoIglesiaPendienteEditarId !== null ? eventoIglesiaPendienteEditarId : Date.now(),
            titulo: titulo,
            fecha: fecha,
            hora: hora,
            descripcion: descripcion,
            recurrente: false,
            semanas: 1
        });
    }

    guardarEventosIglesiaAdmin(eventos);

    eventoIglesiaPendienteEditarId = null;
    document.getElementById('formCalendarioIglesiaTitulo').innerHTML = '<i class="fas fa-plus-circle"></i> Agregar Evento a la Iglesia';
    document.getElementById('btnGuardarEventoIglesia').innerHTML = '<i class="fas fa-plus"></i> Agregar Evento';
    document.getElementById('eventoIglesiaTitulo').value = '';
    document.getElementById('eventoIglesiaFecha').value = '';
    document.getElementById('eventoIglesiaHora').value = '';
    document.getElementById('eventoIglesiaDescripcion').value = '';
    const checkbox = document.getElementById('eventoIglesiaRecurrente');
    if (checkbox) checkbox.checked = false;
    toggleCampoRecurrenciaIglesia();

    const seccion = document.getElementById('seccionCalendarioIglesia');
    if (seccion) {
        seccion.innerHTML = generarHTMLCalendarioIglesia();
    }
}

function eliminarEventoIglesiaAdmin(id) {
    const eventos = cargarEventosIglesiaAdmin();
    const ev = eventos.find(e => String(e.id) === String(id));
    if (!ev) return;

    const esSerie = ev.serieId ? true : false;
    const mensaje = esSerie ? 
        `¿Estás seguro de que deseas eliminar "${ev.titulo}"? Esta es una serie recurrente y se eliminarán todas sus repeticiones.` : 
        `¿Estás seguro de que deseas eliminar el evento "${ev.titulo}"?`;

    mostrarConfirmAdmin(mensaje, 'Eliminar evento', function () {
        let nuevosEventos = [];
        if (ev.serieId) {
            nuevosEventos = cargarEventosIglesiaAdmin().filter(e => e.serieId !== ev.serieId);
        } else {
            nuevosEventos = cargarEventosIglesiaAdmin().filter(e => String(e.id) !== String(id));
        }

        guardarEventosIglesiaAdmin(nuevosEventos);

        const seccion = document.getElementById('seccionCalendarioIglesia');
        if (seccion) {
            seccion.innerHTML = generarHTMLCalendarioIglesia();
        }

        const toast = document.createElement('div');
        toast.style.cssText = 'position:fixed;bottom:2rem;left:50%;transform:translateX(-50%);background:#c62828;color:white;padding:1rem 2rem;border-radius:2rem;font-weight:600;z-index:99999;font-family:Inter,sans-serif;box-shadow:0 8px 30px rgba(198,40,40,0.4);';
        toast.innerHTML = '<i class="fas fa-trash"></i> Evento eliminado correctamente';
        document.body.appendChild(toast);
        setTimeout(function () {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.5s ease';
            setTimeout(function () { toast.remove(); }, 500);
        }, 2000);
    });
}

// Exportar a window
window.abrirCalendarioIglesiaAdmin = abrirCalendarioIglesiaAdmin;
window.cerrarCalendarioIglesiaAdmin = cerrarCalendarioIglesiaAdmin;
window.guardarEventosIglesiaAdmin = guardarEventosIglesiaAdmin;
window.agregarEventoIglesiaAdmin = agregarEventoIglesiaAdmin;
window.abrirEditarEventoIglesia = abrirEditarEventoIglesia;
window.eliminarEventoIglesiaAdmin = eliminarEventoIglesiaAdmin;
window.toggleCampoRecurrenciaIglesia = toggleCampoRecurrenciaIglesia;
window.bloquearScrollAdmin = bloquearScrollAdmin;
window.desbloquearScrollAdmin = desbloquearScrollAdmin;


