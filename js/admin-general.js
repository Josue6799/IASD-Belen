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
    },
    {
        id: 'basedatos_cloud',
        icono: '🗄️',
        titulo: 'Base de Datos (Supabase)',
        descripcion: 'Configurar credenciales, probar conexión y sincronizar tablas',
        color: '#2e7d32',
        subopciones: [
            { texto: '🔌 Configurar credenciales y probar conexión', accion: 'configurarSupabase' },
            { texto: '🔄 Sincronizar datos locales con Supabase', accion: 'sincronizarSupabase' },
            { texto: '📊 Estado de tablas en la nube', accion: 'estadoSupabase' }
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
    <div id="tarjeta-${tarjeta.id}" class="tarjeta-admin" data-csp-click="toggleSubmenuAdmin('${tarjeta.id}', event)">
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
            <div class="admin-menu-item" data-csp-click="ejecutarAccionAdmin('cronogramaIglesia', '📅 Cronograma', event)">
                <div class="item-icono" style="background: var(--deep-blue);">
                    <i class="fas fa-calendar-alt" style="color: white; font-size: 1.2rem;"></i>
                </div>
                <span class="item-texto">Cronograma</span>
                <i class="fas fa-chevron-right item-flecha"></i>
            </div>
            <div class="admin-menu-item" data-csp-click="ejecutarAccionAdmin('calendarioIglesia', '📅 Calendario', event)">
                <div class="item-icono" style="background: linear-gradient(135deg, #1a3a4a 0%, #2c5f7c 100%);">
                    <i class="fas fa-calendar-week" style="color: white; font-size: 1.2rem;"></i>
                </div>
                <span class="item-texto">Calendario</span>
                <i class="fas fa-chevron-right item-flecha"></i>
            </div>
            <div class="admin-menu-item" data-csp-click="ejecutarAccionAdmin('gestionarTransmisiones', '📹 Gestionar Transmisiones', event)">
                <div class="item-icono" style="background: linear-gradient(135deg, #e53e3e 0%, #c53030 100%);">
                    <i class="fas fa-video" style="color: white; font-size: 1.2rem;"></i>
                </div>
                <span class="item-texto">Gestionar Transmisiones</span>
                <i class="fas fa-chevron-right item-flecha"></i>
            </div>
            <div class="admin-menu-item" data-csp-click="ejecutarAccionAdmin('baseDatosIglesia', '🗄️ Base de datos', event)">
                <div class="item-icono" style="background: var(--deep-blue);">
                    <i class="fas fa-database" style="color: white; font-size: 1.2rem;"></i>
                </div>
                <span class="item-texto">Base de datos</span>
                <i class="fas fa-chevron-right item-flecha"></i>
            </div>
            <div class="admin-menu-item" data-csp-click="ejecutarAccionAdmin('verInteresados', '👥 Ver interesados', event)">
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
                html += `<div class="categoria-club" data-csp-click="abrirModalClub('${op.clubNombre}', event)" style="margin-bottom: 0.8rem; border-bottom: 1px solid rgba(201,165,59,0.2); padding-bottom: 0.8rem;">
                    <span>${op.texto}</span>
                    <i class="fas fa-chevron-right" style="font-size:0.7rem; color:#c9a53b;"></i>
                </div>`;
            } else {
                html += `<div class="submenu-opcion" data-csp-click="ejecutarAccionAdmin('${op.accion}', '${op.texto}', event)">
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
            verificarAccesoSeccion('cronograma', abrirCronograma);
            break;
        case 'calendarioIglesia':
            verificarAccesoSeccion('calendario_iglesia', abrirCalendarioIglesiaAdmin);
            break;
        case 'gestionarTransmisiones':
            verificarAccesoSeccion('transmisiones', abrirModalGestionarTransmisiones);
            break;
        case 'baseDatosIglesia':
            verificarAccesoSeccion('bd_iglesia', abrirModalBaseDatos);
            break;
        case 'verInteresados':
            verificarAccesoSeccion('interesados', abrirVerInteresados);
            break;
        case 'agregarLibro':
            verificarAccesoSeccion('biblioteca_admin', abrirModalAgregarLibro);
            break;
        case 'eliminarLibro':
            verificarAccesoSeccion('biblioteca_admin', abrirModalEliminarLibro);
            break;
        case 'verLibrosPedidos':
            verificarAccesoSeccion('pedidos_biblioteca', abrirModalVerPedidos);
            break;
        case 'agregarEvento':
            verificarAccesoSeccion('anuncios', abrirModalAgregarAnuncio);
            break;
        case 'quitarEvento':
            verificarAccesoSeccion('anuncios', abrirModalQuitarAnuncio);
            break;
        case 'editarAnuncios':
            verificarAccesoSeccion('anuncios', function () {
                mostrarAlertaAdmin('Función de Editar anuncios en construcción');
            });
            break;
        case 'configurarSupabase':
        case 'sincronizarSupabase':
        case 'estadoSupabase':
            verificarAccesoSeccion('bd_iglesia', abrirModalBaseDatos);
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

    if (typeof actualizarBotonFlotanteEnVivo === 'function') {
        actualizarBotonFlotanteEnVivo();
    }

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
    const titEl = document.getElementById('modalAlertaTitulo');
    const msgEl = document.getElementById('modalAlertaMensaje');
    const modalEl = document.getElementById('modalAlertaAdmin');
    if (titEl) titEl.textContent = titulo;
    if (msgEl) msgEl.innerHTML = mensaje;
    bloquearScrollAdmin('modalAlertaAdmin');
    if (modalEl) {
        modalEl.classList.add('active');
        modalEl.style.display = 'flex';
        modalEl.style.position = 'fixed';
        modalEl.style.top = '0';
        modalEl.style.left = '0';
        modalEl.style.width = '100vw';
        modalEl.style.height = '100vh';
        modalEl.style.zIndex = '100005';
        modalEl.style.alignItems = 'center';
        modalEl.style.justifyContent = 'center';
        modalEl.style.background = 'rgba(0, 0, 0, 0.65)';
        modalEl.style.backdropFilter = 'blur(4px)';
    }
}

function cerrarModalAlerta() {
    const modalEl = document.getElementById('modalAlertaAdmin');
    if (modalEl) {
        modalEl.classList.remove('active');
        modalEl.style.display = 'none';
    }
    desbloquearScrollAdmin('modalAlertaAdmin');
}

// --- Modal de Confirmación ---
let _callbackConfirm = null;

function mostrarConfirmAdmin(mensaje, titulo, callbackSi) {
    const titEl = document.getElementById('modalConfirmTitulo');
    const msgEl = document.getElementById('modalConfirmMensaje');
    const modalEl = document.getElementById('modalConfirmAdmin');
    if (titEl) titEl.textContent = titulo || 'Confirmar acción';
    if (msgEl) msgEl.innerHTML = mensaje;
    _callbackConfirm = callbackSi;
    bloquearScrollAdmin('modalConfirmAdmin');
    if (modalEl) {
        modalEl.classList.add('active');
        modalEl.style.display = 'flex';
        modalEl.style.position = 'fixed';
        modalEl.style.top = '0';
        modalEl.style.left = '0';
        modalEl.style.width = '100vw';
        modalEl.style.height = '100vh';
        modalEl.style.zIndex = '100005';
        modalEl.style.alignItems = 'center';
        modalEl.style.justifyContent = 'center';
        modalEl.style.background = 'rgba(0, 0, 0, 0.65)';
        modalEl.style.backdropFilter = 'blur(4px)';
    }

    const btnSi = document.getElementById('btnConfirmSi');
    if (btnSi) {
        btnSi.onclick = function () {
            const callback = _callbackConfirm;
            cerrarModalConfirm();
            if (typeof callback === 'function') {
                callback();
            }
        };
    }
}

function cerrarModalConfirm() {
    const modalEl = document.getElementById('modalConfirmAdmin');
    if (modalEl) {
        modalEl.classList.remove('active');
        modalEl.style.display = 'none';
    }
    _callbackConfirm = null;
    desbloquearScrollAdmin('modalConfirmAdmin');
}

window.mostrarAlertaAdmin = mostrarAlertaAdmin;
window.cerrarModalAlerta = cerrarModalAlerta;
window.mostrarConfirmAdmin = mostrarConfirmAdmin;
window.cerrarModalConfirm = cerrarModalConfirm;

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

    let claveSeccion = 'calendario_aventureros';
    if (clubActual === 'Conquistadores') claveSeccion = 'calendario_conquistadores';
    else if (clubActual === 'Guías Mayores') claveSeccion = 'calendario_guias_mayores';

    verificarAccesoSeccion(claveSeccion, function () {
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
    });
}

function cerrarCalendarioClub() {
    const seccion = document.getElementById('seccionCalendarioClub');
    const panel = document.getElementById('panelAdminGeneral');
    if (seccion) seccion.style.display = 'none';
    if (panel) panel.style.display = 'block';
    storageKeyCalendarioClub = '';
}

function cargarEventosClub() {
    return StorageHelper.get(storageKeyCalendarioClub || 'eventos_aventureros', []);
}

function guardarEventosClub(eventos) {
    StorageHelper.set(storageKeyCalendarioClub || 'eventos_aventureros', eventos);
}

function generarHTMLCalendarioClub(clubNombre) {
    const eventos = cargarEventosClub().sort((a, b) => a.fecha.localeCompare(b.fecha));
    let html = '<div style="background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10;">';
    html += '<h3 style="color:#c9a53b;margin:0;font-size:1.2rem;">📅 Calendario - ' + clubNombre + '</h3>';
    html += '<button data-csp-click="cerrarCalendarioClub()" style="background:rgba(255,255,255,0.2);color:white;border:none;padding:0.5rem 1.5rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;"><i class="fas fa-arrow-left"></i> Volver al Panel</button></div>';
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
    html += '<label><input type="checkbox" id="eventoClubRecurrente" data-csp-change="toggleCampoRecurrencia()"> 📅 Repetir semanalmente</label>';
    html += '</div>';
    html += '<div class="campo-recurrencia" id="campoRecurrencia">';
    html += '<label style="font-weight:600;color:#1a3a4a;">Semanas a repetir:</label>';
    html += '<input type="number" id="eventoClubSemanas" min="1" max="52" value="4">';
    html += '</div>';
    html += '<button data-csp-click="agregarEventoClubAdmin()" id="btnGuardarEventoClub" style="margin-top:0.8rem;width:100%;padding:0.8rem;background:linear-gradient(135deg,#d4a038 0%,#c9a53b 100%);color:#1a3a4a;border:none;border-radius:2rem;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;"><i class="fas fa-plus"></i> Agregar Evento</button>';
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
            html += '<button class="btn-editar-evento" data-csp-click="abrirEditarEventoClub(' + ev.id + ')" title="Editar">✏️</button>';
            html += '<button class="btn-eliminar-miembro" data-csp-click="eliminarEventoClubAdmin(' + ev.id + ')" title="Quitar">🗑️</button>';
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

function obtenerNombreClubPorStorage(storageKey) {
    if (storageKey === 'cuotas_conquistadores' || storageKey === 'bd_conquistadores' || storageKey === 'eventos_conquistadores') {
        return 'Conquistadores';
    }
    if (storageKey === 'cuotas_guias_mayores' || storageKey === 'bd_guias_mayores' || storageKey === 'eventos_guias_mayores') {
        return 'Guías Mayores';
    }
    return 'Aventureros';
}

function obtenerStorageKeyCuotasPorClub(clubNombre) {
    if (clubNombre === 'Conquistadores') return 'cuotas_conquistadores';
    if (clubNombre === 'Guías Mayores' || clubNombre === 'Guias Mayores') return 'cuotas_guias_mayores';
    return 'cuotas_aventureros';
}

// Variable para almacenar la clave actual
let storageKeyActual = '';

// ===== FUNCIONES DEL MODAL DE CLUBES =====

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
    if (event && event.target !== document.getElementById('modalClubOpciones') && event.target !== event.currentTarget) return;
    const modal = document.getElementById('modalClubOpciones');
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// ===== FUNCIÓN PRINCIPAL DE CUOTAS =====
function abrirCuotasClub() {
    const modal = document.getElementById('modalClubOpciones');
    const clubActual = (modal && modal.dataset.club) ? modal.dataset.club : (clubSeleccionadoActual || 'Aventureros');
    clubSeleccionadoActual = clubActual;

    let claveSeccion = 'cuotas_aventureros';
    if (clubActual === 'Conquistadores') claveSeccion = 'cuotas_conquistadores';
    else if (clubActual === 'Guías Mayores' || clubActual === 'Guias Mayores') claveSeccion = 'cuotas_guias_mayores';

    verificarAccesoSeccion(claveSeccion, function () {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }

        const panel = document.getElementById('panelAdminGeneral');
        if (!panel) return;

        storageKeyActual = obtenerStorageKeyCuotasPorClub(clubActual);
        console.log('✅ Abriendo Cuotas Club:', clubActual, '→ Storage key:', storageKeyActual);

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
        }, 80);
    });
}

function cerrarSeccionCuotas() {
    const seccionCuotas = document.getElementById('seccionCuotasClub');
    const panel = document.getElementById('panelAdminGeneral');
    if (seccionCuotas) seccionCuotas.style.display = 'none';
    if (panel) panel.style.display = 'block';
    storageKeyActual = '';
}

// ===== FUNCIONES AUXILIARES DE CUOTAS =====

function cargarCuotas(storageKey) {
    const key = storageKey || storageKeyActual || 'cuotas_aventureros';
    const datos = StorageHelper.get(key, []);
    return Array.isArray(datos) ? datos : [];
}

function guardarCuotas(storageKey, datos) {
    const key = storageKey || storageKeyActual || 'cuotas_aventureros';
    const lista = Array.isArray(datos) ? datos : [];
    StorageHelper.set(key, lista);
    if (window.SupabaseSync) {
        window.SupabaseSync.set(key, key, lista);
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
    const lista = Array.isArray(miembros) ? miembros : [];

    // Encabezado (barra superior)
    let html = '<div style="background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:20;box-shadow:0 4px 15px rgba(0,0,0,0.15);">';
    html += '<h3 style="color:#c9a53b;margin:0;font-size:1.2rem;display:flex;align-items:center;gap:0.5rem;"><i class="fas fa-coins"></i> Cuotas - ' + clubNombre + '</h3>';
    html += '<div style="display:flex;align-items:center;gap:0.8rem;">';
    html += '<button class="btn-descargar-excel" data-csp-click="descargarExcelCuotas()" title="Descargar Excel" style="background:#2e7d32;color:white;border:none;padding:0.5rem 1.2rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;font-size:0.85rem;display:inline-flex;align-items:center;gap:0.4rem;"><i class="fas fa-file-excel"></i> Descargar Excel</button>';
    html += '<button data-csp-click="cerrarSeccionCuotas()" style="background:rgba(255,255,255,0.2);color:white;border:none;padding:0.5rem 1.4rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;font-size:0.85rem;display:inline-flex;align-items:center;gap:0.4rem;"><i class="fas fa-arrow-left"></i> Volver al Panel</button>';
    html += '</div>';
    html += '</div>';

    html += '<div style="max-width:100%;margin:0 auto;padding:1.2rem;">';

    // Tarjetas de resumen
    html += '<div class="cuotas-resumen-grid">';
    html += '<div class="cuotas-resumen-card"><div class="resumen-icono">👥</div><div class="resumen-titulo">Total de Miembros</div><div class="resumen-valor" id="cuotasTotalMiembros">' + lista.length + '</div></div>';
    html += '<div class="cuotas-resumen-card"><div class="resumen-icono">💰</div><div class="resumen-titulo">Total Recaudado</div><div class="resumen-valor" id="cuotasTotalGeneral">$0</div></div>';
    html += '</div>';

    // Formulario agregar miembro
    html += '<div class="cuotas-form-agregar" style="display:flex;gap:0.8rem;margin-bottom:1.2rem;background:white;padding:1rem;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.06);align-items:center;">';
    html += '<input type="text" id="cuotasInputNombre" placeholder="Nombre completo del nuevo miembro..." style="flex:1;padding:0.65rem 1rem;border:1px solid #d1d5db;border-radius:8px;font-size:0.95rem;outline:none;">';
    html += '<button id="cuotasBtnAgregar" data-csp-click="agregarMiembroCuotas()" style="background:#0b2b4f;color:white;border:none;padding:0.65rem 1.5rem;border-radius:8px;cursor:pointer;font-weight:600;display:inline-flex;align-items:center;gap:0.5rem;white-space:nowrap;"><i class="fas fa-plus"></i> Agregar Miembro</button>';
    html += '</div>';

    // Tabla
    html += '<div class="cuotas-tabla-wrapper" style="overflow-x:auto;background:white;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.08);margin-bottom:1.5rem;"><table class="cuotas-tabla">';
    html += '<thead><tr>';
    html += '<th class="col-nombres" rowspan="2" style="position:sticky;left:0;z-index:5;background:#1a3a4a;color:white;">N°</th>';
    html += '<th class="col-nombres" rowspan="2" style="position:sticky;left:40px;z-index:5;background:#1a3a4a;color:white;min-width:180px;">NOMBRES</th>';
    meses.forEach(function (mes) {
        html += '<th class="col-mes" colspan="' + (mes.domingos.length + 1) + '" style="text-align:center;background:#244a5e;color:#c9a53b;">' + mes.nombre + ' ' + mes.anio + '</th>';
    });
    html += '<th class="col-total" rowspan="2" style="background:#1a3a4a;color:#c9a53b;">TOTAL<br>GENERAL</th>';
    html += '<th class="col-acciones" rowspan="2" style="background:#1a3a4a;color:white;">ACCIONES</th>';
    html += '</tr><tr>';
    meses.forEach(function (mes) {
        mes.domingos.forEach(function (d) {
            html += '<th style="font-size:0.75rem;padding:0.4rem 0.3rem;">' + d.fechaTexto + '</th>';
        });
        html += '<th class="col-total" style="font-size:0.75rem;font-weight:700;">TOTAL</th>';
    });
    html += '</tr></thead><tbody>';

    if (lista.length === 0) {
        html += '<tr><td colspan="100" style="text-align:center;padding:3rem 1rem;color:#6b7280;font-style:italic;">No hay miembros registrados en este club. Agrega el primer miembro arriba.</td></tr>';
    } else {
        lista.forEach(function (miembro, idx) {
            const mId = String(miembro.id);
            html += '<tr data-miembro-id="' + mId + '">';
            html += '<td class="col-nombres" style="position:sticky;left:0;background:#f9fafb;font-weight:600;text-align:center;">' + (idx + 1) + '</td>';
            html += '<td class="col-nombres" style="position:sticky;left:40px;background:#f9fafb;font-weight:600;">' + (miembro.nombre || 'Sin nombre') + '</td>';
            meses.forEach(function (mes) {
                mes.domingos.forEach(function (d) {
                    const valor = (miembro.pagos && miembro.pagos[mes.clave] && miembro.pagos[mes.clave][d.numero] !== undefined) ? miembro.pagos[mes.clave][d.numero] : '';
                    html += '<td style="padding:2px;"><input type="number" class="cuotas-input" data-miembro="' + mId + '" data-mes="' + mes.clave + '" data-domingo="' + d.numero + '" value="' + valor + '" placeholder="0" min="0" style="width:100%;min-width:55px;padding:4px;border:1px solid #e5e7eb;border-radius:4px;text-align:right;font-size:0.85rem;"></td>';
                });
                html += '<td class="col-total-miembro cuotas-total-mes" data-miembro="' + mId + '" data-mes="' + mes.clave + '" style="font-weight:700;color:#0b2b4f;text-align:right;padding:4px 8px;font-size:0.85rem;">$0</td>';
            });
            html += '<td class="col-total-miembro cuotas-total-general" data-miembro="' + mId + '" style="font-weight:800;color:#2e7d32;text-align:right;padding:4px 8px;font-size:0.9rem;background:#f0fdf4;">$0</td>';
            html += '<td class="col-acciones" style="text-align:center;padding:4px;"><button class="btn-eliminar-miembro" data-csp-click="eliminarMiembroCuotas(\'' + mId + '\')" title="Eliminar miembro" style="background:#fee2e2;color:#b91c1c;border:none;padding:6px 10px;border-radius:6px;cursor:pointer;font-size:0.85rem;transition:all 0.2s;"><i class="fas fa-trash"></i></button></td>';
            html += '</tr>';
        });
    }
    html += '</tbody></table></div>';

    // Totales anuales
    html += '<div class="cuotas-totales-anuales" id="cuotasTotalesAnuales" style="display:flex;gap:1.5rem;margin-bottom:1.5rem;flex-wrap:wrap;">';
    html += '<div class="cuotas-anual-item" style="background:white;padding:1rem 1.5rem;border-radius:10px;box-shadow:0 2px 6px rgba(0,0,0,0.05);flex:1;min-width:220px;"><span class="anual-label" style="font-size:0.9rem;color:#4b5563;font-weight:600;">Total recaudado 2026:</span> <span class="anual-valor" id="totalAnual2026" style="font-size:1.15rem;font-weight:800;color:#0b2b4f;margin-left:0.5rem;">$0</span></div>';
    html += '<div class="cuotas-anual-item" style="background:white;padding:1rem 1.5rem;border-radius:10px;box-shadow:0 2px 6px rgba(0,0,0,0.05);flex:1;min-width:220px;"><span class="anual-label" style="font-size:0.9rem;color:#4b5563;font-weight:600;">Total recaudado 2027:</span> <span class="anual-valor" id="totalAnual2027" style="font-size:1.15rem;font-weight:800;color:#0b2b4f;margin-left:0.5rem;">$0</span></div>';
    html += '</div>';

    // Botón guardar y cerrar
    html += '<div style="display:flex;justify-content:flex-end;gap:1rem;">';
    html += '<button class="btn-guardar-cuotas" data-csp-click="guardarYCerrarCuotas()" style="background:#2e7d32;color:white;border:none;padding:0.75rem 2rem;border-radius:8px;cursor:pointer;font-weight:700;font-size:1rem;display:inline-flex;align-items:center;gap:0.5rem;box-shadow:0 4px 12px rgba(46,125,50,0.3);"><i class="fas fa-save"></i> Guardar y Cerrar</button>';
    html += '</div>';

    html += '</div>';

    return html;
}

function vincularEventosCuotas(storageKey) {
    const key = storageKey || storageKeyActual;
    const btnAgregar = document.getElementById('cuotasBtnAgregar');
    const inputNombre = document.getElementById('cuotasInputNombre');
    if (btnAgregar) {
        btnAgregar.onclick = function (e) {
            if (e) e.preventDefault();
            agregarMiembroCuotas();
        };
    }
    if (inputNombre) {
        inputNombre.onkeydown = function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                agregarMiembroCuotas();
            }
        };
    }
    document.querySelectorAll('.cuotas-input').forEach(function (input) {
        input.addEventListener('input', function () {
            actualizarTotalesCuotas(key);
            guardarDatosActuales();
        });
        input.addEventListener('change', function () {
            guardarDatosActuales();
        });
    });
}

function guardarDatosActuales() {
    const key = storageKeyActual || obtenerStorageKeyCuotasPorClub(clubSeleccionadoActual);
    if (!key) return;

    const miembros = cargarCuotas(key);
    let hayCambios = false;

    miembros.forEach(function (miembro) {
        if (!miembro.pagos) miembro.pagos = {};
        const mId = String(miembro.id);
        document.querySelectorAll('.cuotas-input[data-miembro="' + mId + '"]').forEach(function (input) {
            const mesClave = input.getAttribute('data-mes');
            const domingo = parseInt(input.getAttribute('data-domingo'), 10);
            if (!mesClave || isNaN(domingo)) return;

            const rawVal = parseFloat(input.value);
            if (!isNaN(rawVal) && rawVal > 0) {
                if (!miembro.pagos[mesClave]) miembro.pagos[mesClave] = {};
                if (miembro.pagos[mesClave][domingo] !== rawVal) {
                    miembro.pagos[mesClave][domingo] = rawVal;
                    hayCambios = true;
                }
            } else {
                if (miembro.pagos[mesClave] && miembro.pagos[mesClave][domingo] !== undefined) {
                    delete miembro.pagos[mesClave][domingo];
                    hayCambios = true;
                }
            }
        });
    });

    if (hayCambios) {
        guardarCuotas(key, miembros);
    }
}

function agregarMiembroCuotas() {
    const key = storageKeyActual || obtenerStorageKeyCuotasPorClub(clubSeleccionadoActual);
    if (!key) return;

    const inputNombre = document.getElementById('cuotasInputNombre');
    if (!inputNombre) return;
    const nombre = inputNombre.value.trim();
    if (!nombre) {
        mostrarToastExitoClub('⚠️ Por favor ingresa el nombre del miembro');
        return;
    }

    // 1. Guardar datos actuales para preservar cualquier número ingresado en la tabla
    guardarDatosActuales();

    // 2. Obtener lista actual de cuotas
    const miembros = cargarCuotas(key);
    const nuevoId = String(Date.now());
    const nuevoMiembro = {
        id: nuevoId,
        nombre: nombre,
        pagos: {}
    };

    miembros.push(nuevoMiembro);
    guardarCuotas(key, miembros);

    inputNombre.value = '';

    // 3. Re-renderizar sección
    const clubNombre = clubSeleccionadoActual || obtenerNombreClubPorStorage(key);
    const seccionCuotas = document.getElementById('seccionCuotasClub');
    if (seccionCuotas) {
        seccionCuotas.innerHTML = generarHTMLCuotas(clubNombre, miembros, key);
        setTimeout(function () {
            vincularEventosCuotas(key);
            actualizarTotalesCuotas(key);
            const nuevoInput = document.getElementById('cuotasInputNombre');
            if (nuevoInput) nuevoInput.focus();
        }, 50);
    }

    mostrarToastExitoClub('✅ Miembro "' + nombre + '" agregado a ' + clubNombre);
}

function eliminarMiembroCuotas(miembroId) {
    if (!miembroId) return;
    miembroPendienteEliminar = String(miembroId);
    storageKeyPendienteEliminar = storageKeyActual || obtenerStorageKeyCuotasPorClub(clubSeleccionadoActual);

    const key = storageKeyPendienteEliminar;
    const miembros = cargarCuotas(key);
    const miembro = miembros.find(m => String(m.id) === String(miembroId));
    const nombreMiembro = miembro ? miembro.nombre : 'este miembro';

    const modal = document.getElementById('modalConfirmarEliminar');
    if (modal) {
        const msg = modal.querySelector('.modal-confirm-mensaje');
        if (msg) {
            msg.innerHTML = `¿Estás seguro de que deseas eliminar a <strong>${nombreMiembro}</strong> del sistema de cuotas? Se borrarán sus pagos registrados.`;
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function confirmarEliminarMiembro() {
    const key = storageKeyPendienteEliminar || storageKeyActual || obtenerStorageKeyCuotasPorClub(clubSeleccionadoActual);
    const miembroId = miembroPendienteEliminar;
    if (!miembroId || !key) {
        cerrarModalConfirmarEliminar();
        return;
    }

    // 1. Guardar datos actuales antes de filtrar
    guardarDatosActuales();

    // 2. Filtrar miembro de la lista de cuotas
    let miembros = cargarCuotas(key);
    const miembroAEliminar = miembros.find(m => String(m.id) === String(miembroId));
    const nombreEliminado = miembroAEliminar ? miembroAEliminar.nombre : 'Miembro';

    miembros = miembros.filter(function (m) {
        return String(m.id) !== String(miembroId);
    });
    guardarCuotas(key, miembros);

    // 3. Sincronizar eliminación en Supabase
    if (window.SupabaseSync) {
        window.SupabaseSync.delete(key, key, 'id', String(miembroId));
    }
    if (window.supabaseClient) {
        Promise.resolve(window.supabaseClient.from(key).delete().eq('id', String(miembroId))).catch(() => {});
        if (!isNaN(miembroId)) {
            Promise.resolve(window.supabaseClient.from(key).delete().eq('id', Number(miembroId))).catch(() => {});
        }
    }

    // 4. Re-renderizar sección
    const clubNombre = clubSeleccionadoActual || obtenerNombreClubPorStorage(key);
    const seccionCuotas = document.getElementById('seccionCuotasClub');
    if (seccionCuotas) {
        seccionCuotas.innerHTML = generarHTMLCuotas(clubNombre, miembros, key);
        setTimeout(function () {
            vincularEventosCuotas(key);
            actualizarTotalesCuotas(key);
        }, 50);
    }

    cerrarModalConfirmarEliminar();
    mostrarToastExitoClub('🗑️ ' + nombreEliminado + ' eliminado de ' + clubNombre);
}

function cerrarModalConfirmarEliminar(event) {
    if (event && event.target !== document.getElementById('modalConfirmarEliminar') && event.target !== event.currentTarget) return;
    const modal = document.getElementById('modalConfirmarEliminar');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    miembroPendienteEliminar = null;
    storageKeyPendienteEliminar = null;
}

function actualizarTotalesCuotas(storageKey) {
    const key = storageKey || storageKeyActual || obtenerStorageKeyCuotasPorClub(clubSeleccionadoActual);
    const miembros = cargarCuotas(key);
    let totalGeneral = 0;
    let totalAnual2026 = 0;
    let totalAnual2027 = 0;

    miembros.forEach(function (miembro) {
        const mId = String(miembro.id);
        let totalMiembro = 0;
        document.querySelectorAll('.cuotas-total-mes[data-miembro="' + mId + '"]').forEach(function (td) {
            const mesClave = td.getAttribute('data-mes');
            let totalMes = 0;
            const anioMes = parseInt(mesClave.split('_')[0], 10);

            document.querySelectorAll('.cuotas-input[data-miembro="' + mId + '"][data-mes="' + mesClave + '"]').forEach(function (input) {
                totalMes += parseFloat(input.value) || 0;
            });

            td.textContent = '$' + totalMes.toLocaleString('es-CO');
            totalMiembro += totalMes;

            // Acumular por año
            if (anioMes === 2026) totalAnual2026 += totalMes;
            else if (anioMes === 2027) totalAnual2027 += totalMes;
        });

        const tdGeneral = document.querySelector('.cuotas-total-general[data-miembro="' + mId + '"]');
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
    const key = storageKeyActual || obtenerStorageKeyCuotasPorClub(clubSeleccionadoActual);
    if (!key) {
        alert('No hay ningún club seleccionado.');
        return;
    }

    const miembros = cargarCuotas(key);
    if (miembros.length === 0) {
        alert('No hay miembros para exportar en este club.');
        return;
    }

    const meses = generarMesesCuotas();
    const clubNombre = clubSeleccionadoActual || obtenerNombreClubPorStorage(key);

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
        let row = (idx + 1) + ';' + (miembro.nombre || 'Sin nombre');
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
    if (storageKeyActual) {
        guardarDatosActuales();
    }
    cerrarSeccionCuotas();
    mostrarToastExitoClub('✅ Cuotas guardadas correctamente');
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

    let claveSeccion = 'bd_aventureros';
    if (clubActual === 'Conquistadores') claveSeccion = 'bd_conquistadores';
    else if (clubActual === 'Guías Mayores') claveSeccion = 'bd_guias_mayores';

    verificarAccesoSeccion(claveSeccion, function () {
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
    });
}

function cerrarSeccionBD() {
    const seccionBD = document.getElementById('seccionBaseDatosClub');
    const panel = document.getElementById('panelAdminGeneral');
    if (seccionBD) seccionBD.style.display = 'none';
    if (panel) panel.style.display = 'block';
}

// ===== FUNCIONES DE DATOS =====
function cargarMiembrosBD(storageKey) {
    return StorageHelper.get(storageKey || 'bd_aventureros', []);
}

function guardarMiembrosBD(storageKey, datos) {
    StorageHelper.set(storageKey || 'bd_aventureros', datos);
}

// ===== GENERAR HTML DE LA VISTA =====
function generarHTMLBaseDatos(clubNombre, miembros, storageKey) {
    let html = '<div style="background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10;">';
    html += '<h3 style="color:#c9a53b;margin:0;font-size:1.2rem;">🗄️ Base de datos - ' + clubNombre + '</h3>';
    html += '<button data-csp-click="cerrarSeccionBD()" style="background:rgba(255,255,255,0.2);color:white;border:none;padding:0.5rem 1.5rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;"><i class="fas fa-arrow-left"></i> Volver al Panel</button>';
    html += '</div>';

    html += '<div style="max-width:100%;margin:0 auto;padding:1rem;">';

    // Tarjeta resumen
    html += '<div class="bd-resumen-grid">';
    html += '<div class="bd-resumen-card"><div class="resumen-icono">👥</div><div class="resumen-titulo">Total de personas</div><div class="resumen-valor" id="bdTotalPersonas">' + miembros.length + '</div></div>';
    html += '</div>';

    // Buscador
    html += '<div class="bd-buscador-wrapper">';
    html += '<span class="bd-icono-buscar">🔍</span>';
    html += '<input type="text" id="bdInputBuscar" placeholder="Buscar por nombre..." data-csp-input="filtrarMiembrosBD(\'' + storageKey + '\')">';
    html += '</div>';

    // Botón agregar
    html += '<button class="btn-agregar-miembro" data-csp-click="abrirModalAgregarMiembroBD(\'' + storageKey + '\')"><i class="fas fa-plus"></i> Agregar miembro</button>';

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
        '<button class="btn-editar-miembro" data-csp-click="abrirModalEditarMiembroBD(\'' + miembro.id + '\',\'' + storageKey + '\')" title="Editar">✏️</button>' +
        '<button class="btn-eliminar-miembro" data-csp-click="solicitarEliminarMiembroBD(\'' + miembro.id + '\',\'' + storageKey + '\')" title="Eliminar">🗑️</button>' +
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
        const index = miembros.findIndex(m => String(m.id) === String(miembroBDPendienteEditarId));
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
        const nuevoId = Date.now().toString();
        const nuevoMiembro = {
            id: nuevoId,
            nombre: nombre,
            cc: cc,
            tipoSangre: tipoSangre,
            fechaNacimiento: fechaNacimiento,
            cartillas: cartillas,
            especialidades: especialidades
        };
        miembros.push(nuevoMiembro);
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
    miembros = miembros.filter(function (m) { return String(m.id) !== String(miembroBDPendienteEliminarId); });
    guardarMiembrosBD(storageKeyBDPendiente, miembros);

    if (window.SupabaseSync) {
        window.SupabaseSync.delete(storageKeyBDPendiente, storageKeyBDPendiente, 'id', miembroBDPendienteEliminarId);
    }

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
    if (window.StorageHelper) {
        return window.StorageHelper.get(STORAGE_PREDICADORES_FECHAS, {});
    }
    try {
        const raw = localStorage.getItem(STORAGE_PREDICADORES_FECHAS);
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        return {};
    }
}

function guardarPredicadoresFechas(data) {
    if (window.StorageHelper) {
        window.StorageHelper.set(STORAGE_PREDICADORES_FECHAS, data);
    } else {
        try { localStorage.setItem(STORAGE_PREDICADORES_FECHAS, JSON.stringify(data)); } catch (e) {}
    }
    window.dispatchEvent(new CustomEvent('datosCronogramaActualizados', { detail: data }));
    window.dispatchEvent(new CustomEvent('datosIglesiaActualizados', { detail: data }));
    window.dispatchEvent(new CustomEvent('cronogramaPredicadoresActualizado', { detail: data }));
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
    const data = cargarPredicadoresFechas() || {};
    if (!data[actividad]) data[actividad] = {};
    const texto = (valor || '').trim();
    if (texto === '') {
        delete data[actividad][fecha];
        if (window.StorageHelper && typeof window.StorageHelper.delete === 'function') {
            const actId = (actividad || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
            window.StorageHelper.delete(STORAGE_PREDICADORES_FECHAS, `cron_${fecha}_${actId}`, 'id');
            window.StorageHelper.delete(STORAGE_PREDICADORES_FECHAS, `${(actividad || '').replace(/\s+/g, '_')}_${fecha}`, 'id');
        }
    } else {
        data[actividad][fecha] = texto;
    }
    guardarPredicadoresFechas(data);
    mostrarFeedbackAdmin(`Guardado: ${actividad} (${fecha})`);
}

function guardarActividadMes(actividad) {
    const data = cargarPredicadoresFechas() || {};
    if (!data[actividad]) data[actividad] = {};

    const inputs = document.querySelectorAll(`.input-predicador[data-actividad="${actividad}"]`);
    inputs.forEach(inp => {
        const fecha = inp.dataset.fecha;
        const val = (inp.value || '').trim();
        if (val === '') {
            delete data[actividad][fecha];
            if (window.StorageHelper && typeof window.StorageHelper.delete === 'function') {
                const actId = (actividad || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
                window.StorageHelper.delete(STORAGE_PREDICADORES_FECHAS, `cron_${fecha}_${actId}`, 'id');
                window.StorageHelper.delete(STORAGE_PREDICADORES_FECHAS, `${(actividad || '').replace(/\s+/g, '_')}_${fecha}`, 'id');
            }
        } else {
            data[actividad][fecha] = val;
        }
    });

    guardarPredicadoresFechas(data);
    mostrarFeedbackAdmin(`¡Predicadores guardados para "${actividad}"!`);
}

function guardarTodoElMes() {
    const data = cargarPredicadoresFechas() || {};
    const inputs = document.querySelectorAll('.input-predicador');
    inputs.forEach(inp => {
        const actividad = inp.dataset.actividad;
        const fecha = inp.dataset.fecha;
        const val = (inp.value || '').trim();
        if (!data[actividad]) data[actividad] = {};

        if (val === '') {
            delete data[actividad][fecha];
            if (window.StorageHelper && typeof window.StorageHelper.delete === 'function') {
                const actId = (actividad || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
                window.StorageHelper.delete(STORAGE_PREDICADORES_FECHAS, `cron_${fecha}_${actId}`, 'id');
                window.StorageHelper.delete(STORAGE_PREDICADORES_FECHAS, `${(actividad || '').replace(/\s+/g, '_')}_${fecha}`, 'id');
            }
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

// Actualización en tiempo real sin interrumpir al usuario si está escribiendo
window.addEventListener('supabase_synced_cronograma_predicadores_fechas', function (e) {
    const seccion = document.getElementById('seccionCronograma');
    if (seccion && seccion.style.display !== 'none') {
        const activeEl = document.activeElement;
        const isTyping = activeEl && activeEl.classList && activeEl.classList.contains('input-predicador');
        if (!isTyping) {
            seccion.innerHTML = generarHTMLCronograma(mesAnnoAdminCronograma);
        }
    }
});

function generarHTMLCronograma(mesAnno) {
    const parts = (mesAnno || '').split('-');
    const ano = parseInt(parts[0], 10) || new Date().getFullYear();
    const mesIndex = (parseInt(parts[1], 10) || (new Date().getMonth() + 1)) - 1;

    const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mesNombre = nombresMeses[mesIndex] || '';

    const dataGuardada = cargarPredicadoresFechas() || {};

    let html = `
    <div style="background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);padding:1.2rem 1.5rem;display:flex;justify-content:space-between;align-items:center;position:-webkit-sticky;position:sticky;top:0;z-index:1000;box-shadow:0 4px 20px rgba(0,0,0,0.25);flex-wrap:wrap;gap:0.8rem;">
        <div style="display:flex;align-items:center;gap:0.8rem;">
            <i class="fas fa-calendar-alt" style="color:#c9a53b;font-size:1.6rem;"></i>
            <div>
                <h3 style="color:white;margin:0;font-size:1.15rem;font-weight:700;">📅 Gestión de Predicadores por Fecha</h3>
                <span style="color:rgba(255,255,255,0.7);font-size:0.82rem;">Asignación sincronizada para el cronograma de la iglesia</span>
            </div>
        </div>
        <button data-csp-click="cerrarCronograma()" style="background:rgba(255,255,255,0.18);color:white;border:1px solid rgba(255,255,255,0.3);padding:0.6rem 1.4rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;font-size:0.9rem;transition:all 0.2s ease;">
            <i class="fas fa-arrow-left"></i> Volver al Panel
        </button>
    </div>

    <div style="max-width:1100px;margin:0 auto;padding:1.5rem 1rem;">
        <!-- BARRA CONTROLES GENERALES -->
        <div style="background:white;border-radius:1.5rem;padding:1.2rem 1.5rem;margin-bottom:1.5rem;box-shadow:0 6px 25px rgba(0,0,0,0.06);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1rem;border-left:5px solid #c9a53b;">
            <div style="flex:1 1 220px;">
                <label style="font-weight:700;color:#1a3a4a;font-size:0.9rem;margin-bottom:0.3rem;display:block;">
                    <i class="fas fa-calendar-day" style="color:#c9a53b;"></i> Mes y Año:
                </label>
                <input type="month" value="${mesAnno}" data-csp-change="cambiarMesCronogramaAdmin(this.value)" style="width:100%;max-width:240px;padding:0.55rem 0.9rem;border:2px solid #e2e8f0;border-radius:0.8rem;font-family:Inter,sans-serif;font-size:0.95rem;font-weight:600;color:#1a3a4a;outline:none;cursor:pointer;">
            </div>
            <div style="display:flex;align-items:center;flex-wrap:wrap;gap:0.8rem;">
                <span style="font-size:1rem;font-weight:700;color:#2c5f7c;background:#f0f7ff;padding:0.5rem 1rem;border-radius:1rem;border:1px solid rgba(44,95,124,0.15);">
                    📆 ${mesNombre} ${ano}
                </span>
                <button data-csp-click="guardarTodoElMes()" style="background:linear-gradient(135deg,#2e7d32 0%,#388e3c 100%);color:white;border:none;padding:0.7rem 1.5rem;border-radius:2rem;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;box-shadow:0 4px 15px rgba(46,125,50,0.3);transition:all 0.2s ease;display:flex;align-items:center;gap:0.5rem;">
                    <i class="fas fa-save"></i> Guardar Todo el Mes
                </button>
            </div>
        </div>

        <!-- LISTA DE CATEGORÍAS Y ACTIVIDADES -->
        <div style="display:flex;flex-direction:column;gap:1.5rem;">
    `;

    ESTRUCTURA_ACTIVIDADES.forEach(cat => {
        html += `
        <div style="background:white;border-radius:1.5rem;padding:1.5rem;box-shadow:0 6px 25px rgba(0,0,0,0.05);border:1px solid #edf2f7;">
            <div style="display:flex;align-items:center;gap:0.8rem;margin-bottom:1.2rem;padding-bottom:0.8rem;border-bottom:2px solid #f1f5f9;">
                <div style="width:38px;height:38px;background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#c9a53b;">
                    <i class="fas ${cat.icono}" style="font-size:1.1rem;"></i>
                </div>
                <h4 style="margin:0;font-size:1.2rem;color:#1a3a4a;font-weight:700;">Categoría: ${cat.categoria}</h4>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:1.2rem;">
        `;

        cat.actividades.forEach(act => {
            const actNombre = act.nombre;
            const diaSemana = act.diaSemana;
            const diaNombre = act.diaNombre;

            const fechasDelMes = calcularFechasDelMes(ano, mesIndex, diaSemana);
            const actData = dataGuardada[actNombre] || {};

            html += `
            <div style="background:#fafbfc;border:1px solid #e2e8f0;border-radius:1.2rem;padding:1.1rem;display:flex;flex-direction:column;justify-content:space-between;gap:1rem;">
                <div>
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.8rem;gap:0.5rem;flex-wrap:wrap;">
                        <h5 style="margin:0;font-size:1.05rem;color:#1a3a4a;font-weight:700;">${actNombre}</h5>
                        <span style="background:#e0f2fe;color:#0369a1;font-size:0.75rem;font-weight:700;padding:0.25rem 0.6rem;border-radius:1rem;">
                            📌 ${diaNombre}
                        </span>
                    </div>

                    <div style="display:flex;flex-direction:column;gap:0.7rem;">
            `;

            if (fechasDelMes.length === 0) {
                html += `<p style="font-size:0.85rem;color:#64748b;margin:0;">No hay fechas registradas para este mes.</p>`;
            } else {
                fechasDelMes.forEach(fechaStr => {
                    const [fAno, fMes, fDia] = fechaStr.split('-');
                    const fechaFormateada = `${fDia}/${fMes}/${fAno}`;
                    const valorActual = actData[fechaStr] || '';

                    html += `
                    <div style="display:flex;align-items:center;gap:0.6rem;background:white;padding:0.5rem 0.8rem;border-radius:0.8rem;border:1px solid #cbd5e1;flex-wrap:wrap;">
                        <span style="font-weight:700;color:#334155;font-size:0.85rem;min-width:80px;">
                            📅 ${fechaFormateada}
                        </span>
                        <input type="text" 
                               class="input-predicador" 
                               data-actividad="${actNombre}" 
                               data-fecha="${fechaStr}" 
                               value="${valorActual}" 
                               placeholder="Predicador o encargado..." 
                               data-csp-blur="guardarPredicadorFecha('${actNombre}', '${fechaStr}', this.value)" 
                               style="flex:1;min-width:140px;padding:0.45rem 0.7rem;border:1px solid #cbd5e1;border-radius:0.6rem;font-family:Inter,sans-serif;font-size:0.85rem;outline:none;transition:border-color 0.2s ease;">
                    </div>
                    `;
                });
            }

            html += `
                    </div>
                </div>
                <button data-csp-click="guardarActividadMes('${actNombre}')" style="width:100%;background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);color:white;border:none;padding:0.6rem;border-radius:0.8rem;font-weight:700;font-size:0.85rem;cursor:pointer;font-family:Inter,sans-serif;transition:all 0.2s ease;min-height:38px;">
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

                // Guardar en StorageHelper (guarda en localStorage + sincroniza automáticamente a las 3 tablas de Supabase)
                StorageHelper.set(cuotasKey, data.cuotas);
                StorageHelper.set(bdKey, data.bd);
                StorageHelper.set(eventosKey, data.eventos);

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
let filtroPedidosTabActual = 'Pendientes'; // 'Pendientes', 'EnCurso', o 'Todos'
let seccionVerPedidosActual = 'Libros'; // 'Libros' o 'Pedidos'
let filtroTextoLibrosPedidos = '';

function cargarLibros() {
    return StorageHelper.get(STORAGE_LIBROS, []);
}

function guardarLibros(libros) {
    StorageHelper.set(STORAGE_LIBROS, libros);
    window.dispatchEvent(new CustomEvent('datosBibliotecaActualizados'));
    window.dispatchEvent(new Event('datosBibliotecaActualizados'));
}

function cargarPedidos() {
    return StorageHelper.get(STORAGE_PEDIDOS, []);
}

function guardarPedidos(pedidos) {
    StorageHelper.set(STORAGE_PEDIDOS, pedidos);
    window.dispatchEvent(new CustomEvent('datosBibliotecaActualizados'));
    window.dispatchEvent(new Event('datosBibliotecaActualizados'));
}

// --- Agregar / Editar Libro ---
function abrirModalAgregarLibro() {
    libroPendienteEditarId = null;
    const libros = cargarLibros();
    
    // Auto-calcular siguiente ID numérico sugerido
    let nextId = 1;
    if (Array.isArray(libros) && libros.length > 0) {
        const numIds = libros.map(l => Number(l.id)).filter(n => !isNaN(n) && n > 0);
        nextId = numIds.length > 0 ? (Math.max(...numIds) + 1) : (libros.length + 1);
    }

    const inputId = document.getElementById('inputIdLibro');
    if (inputId) {
        inputId.value = nextId;
        inputId.disabled = false;
    }
    const inpTitulo = document.getElementById('inputTituloLibro');
    if (inpTitulo) inpTitulo.value = '';
    const inpCant = document.getElementById('inputCantidadLibro');
    if (inpCant) inpCant.value = '1';
    const inpAutor = document.getElementById('inputAutorLibro');
    if (inpAutor) inpAutor.value = '';
    const inpCat = document.getElementById('inputCategoriaLibro');
    if (inpCat) inpCat.value = '';
    const inpEstado = document.getElementById('inputEstadoLibro');
    if (inpEstado) inpEstado.value = 'Disponible';
    const inpUbi = document.getElementById('inputUbicacionLibro');
    if (inpUbi) inpUbi.value = '';

    const tituloEl = document.getElementById('modalBiblioTitulo');
    const btnEl = document.getElementById('btnGuardarLibro');
    if (tituloEl) tituloEl.innerHTML = '<i class="fas fa-plus-circle"></i> Agregar Libro';
    if (btnEl) btnEl.innerHTML = '<i class="fas fa-save"></i> Guardar Libro';

    const modal = document.getElementById('modalAgregarLibro');
    if (modal) modal.classList.add('active');
}

function cerrarModalAgregarLibro(event) {
    if (event && event.target && event.target !== document.getElementById('modalAgregarLibro')) return;
    const modal = document.getElementById('modalAgregarLibro');
    if (modal) modal.classList.remove('active');
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

    const inpTitulo = document.getElementById('inputTituloLibro');
    if (inpTitulo) inpTitulo.value = libro.titulo || '';
    const inpCant = document.getElementById('inputCantidadLibro');
    if (inpCant) inpCant.value = libro.cant || libro.cantidad || 1;
    const inpAutor = document.getElementById('inputAutorLibro');
    if (inpAutor) inpAutor.value = libro.autor || '';
    const inpCat = document.getElementById('inputCategoriaLibro');
    if (inpCat) inpCat.value = libro.cat || libro.categoria || '';
    const inpEstado = document.getElementById('inputEstadoLibro');
    if (inpEstado) inpEstado.value = libro.estado || 'Disponible';
    const inpUbi = document.getElementById('inputUbicacionLibro');
    if (inpUbi) inpUbi.value = libro.ubi || libro.ubicacion || '';

    libroPendienteEditarId = id;

    const tituloEl = document.getElementById('modalBiblioTitulo');
    const btnEl = document.getElementById('btnGuardarLibro');
    if (tituloEl) tituloEl.innerHTML = '<i class="fas fa-edit"></i> Editar Libro';
    if (btnEl) btnEl.innerHTML = '<i class="fas fa-save"></i> Guardar Cambios';

    // Cerrar modal de eliminar si está abierto
    const modalEliminar = document.getElementById('modalEliminarLibro');
    if (modalEliminar) modalEliminar.classList.remove('active');

    const modal = document.getElementById('modalAgregarLibro');
    if (modal) modal.classList.add('active');
}

function guardarNuevoLibro() {
    const inputId = document.getElementById('inputIdLibro');
    let idVal = inputId ? inputId.value.trim() : '';
    const titulo = (document.getElementById('inputTituloLibro') ? document.getElementById('inputTituloLibro').value : '').trim();
    const cantidad = parseInt(document.getElementById('inputCantidadLibro') ? document.getElementById('inputCantidadLibro').value : '1') || 1;
    const autor = (document.getElementById('inputAutorLibro') ? document.getElementById('inputAutorLibro').value : '').trim();
    const categoria = (document.getElementById('inputCategoriaLibro') ? document.getElementById('inputCategoriaLibro').value : '').trim() || 'General';
    const estado = (document.getElementById('inputEstadoLibro') ? document.getElementById('inputEstadoLibro').value : '') || 'Disponible';
    const ubicacion = (document.getElementById('inputUbicacionLibro') ? document.getElementById('inputUbicacionLibro').value : '').trim() || 'Biblioteca';

    if (!titulo) {
        mostrarAlertaAdmin('⚠️ El título del libro es obligatorio.');
        return;
    }

    const libros = cargarLibros();
    let idFinal;

    if (libroPendienteEditarId !== null) {
        idFinal = libroPendienteEditarId;
        const idx = libros.findIndex(l => String(l.id) === String(libroPendienteEditarId));
        if (idx !== -1) {
            libros[idx].titulo = titulo;
            libros[idx].cantidad = cantidad;
            libros[idx].cant = cantidad;
            libros[idx].autor = autor || 'Autor Desconocido';
            libros[idx].categoria = categoria;
            libros[idx].cat = categoria;
            libros[idx].estado = estado;
            libros[idx].ubicacion = ubicacion;
            libros[idx].ubi = ubicacion;
        }
        libroPendienteEditarId = null;
    } else {
        if (!idVal) {
            const numIds = libros.map(l => Number(l.id)).filter(n => !isNaN(n) && n > 0);
            idVal = numIds.length > 0 ? (Math.max(...numIds) + 1) : (libros.length + 1);
        }

        // Si ya existe un libro con este ID, auto-asignar siguiente ID libre
        const existe = libros.some(l => String(l.id).toLowerCase() === String(idVal).toLowerCase());
        if (existe) {
            const numIds = libros.map(l => Number(l.id)).filter(n => !isNaN(n) && n > 0);
            idVal = numIds.length > 0 ? (Math.max(...numIds) + 1) : (Date.now());
        }

        idFinal = (!isNaN(idVal) && String(idVal).trim() !== '') ? Number(idVal) : idVal;

        libros.push({
            id: idFinal,
            titulo: titulo,
            cantidad: cantidad,
            cant: cantidad,
            autor: autor || 'Autor Desconocido',
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

    _librosFiltrados = cargarLibros();
    filtrarEliminarLibro();
    if (typeof renderizarSeccionVerPedidos === 'function') {
        renderizarSeccionVerPedidos();
    }
    if (typeof renderizarCatalogo === 'function') {
        renderizarCatalogo();
    }
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
    }, 2200);
}

// --- Gestor / Eliminar / Editar Libros ---
let _librosFiltrados = [];

function abrirModalEliminarLibro() {
    _librosFiltrados = cargarLibros();
    const buscador = document.getElementById('buscadorEliminarLibro');
    if (buscador) buscador.value = '';
    const modal = document.getElementById('modalEliminarLibro');
    if (modal) modal.classList.add('active');
    renderizarEliminarLibro(_librosFiltrados);

    // Cargar datos frescos desde Supabase en segundo plano si está disponible
    if (window.supabaseClient) {
        window.supabaseClient.from('libros').select('*').then(({ data, error }) => {
            if (!error && Array.isArray(data) && data.length > 0) {
                const transformer = (window.TABLE_TRANSFORMERS && window.TABLE_TRANSFORMERS.libros) ? window.TABLE_TRANSFORMERS.libros.fromDb : null;
                const items = transformer ? transformer(data) : data;
                localStorage.setItem('libros_biblioteca', JSON.stringify(items));
                _librosFiltrados = items;
                const modalActivo = document.getElementById('modalEliminarLibro');
                if (modalActivo && modalActivo.classList.contains('active')) {
                    filtrarEliminarLibro();
                }
            }
        }).catch(() => {});
    }
}

function cerrarModalEliminarLibro(event) {
    if (event && event.target && event.target !== document.getElementById('modalEliminarLibro')) return;
    const modal = document.getElementById('modalEliminarLibro');
    if (modal) modal.classList.remove('active');
}

function filtrarEliminarLibro() {
    const buscador = document.getElementById('buscadorEliminarLibro');
    const termino = buscador ? buscador.value.trim().toLowerCase() : '';
    const libros = cargarLibros();
    _librosFiltrados = libros.filter(l =>
        (l.titulo && String(l.titulo).toLowerCase().includes(termino)) ||
        (l.autor && String(l.autor).toLowerCase().includes(termino)) ||
        ((l.categoria || l.cat) && String(l.categoria || l.cat).toLowerCase().includes(termino)) ||
        (l.id && String(l.id).toLowerCase().includes(termino))
    );
    renderizarEliminarLibro(_librosFiltrados);
}

function renderizarEliminarLibro(libros) {
    const contenedor = document.getElementById('listaEliminarLibros');
    if (!contenedor) return;

    if (!libros || libros.length === 0) {
        contenedor.innerHTML = '<p style="text-align:center; color:#5a6474; padding:2rem 1rem;">No se encontraron libros registrados.</p>';
        return;
    }

    let html = '<div class="tabla-contenedor-scroll" style="overflow-x:auto; -webkit-overflow-scrolling:touch; width:100%;"><table class="tabla-libros" style="width:100%; border-collapse:collapse; font-size:0.85rem; min-width:680px;">';
    html += '<thead><tr style="background:#1a3a4a; color:white; text-align:left;">';
    html += '<th style="padding:0.75rem 0.6rem;"># ID</th>';
    html += '<th style="padding:0.75rem 0.6rem;">Título</th>';
    html += '<th style="padding:0.75rem 0.6rem;">Autor</th>';
    html += '<th style="padding:0.75rem 0.6rem; text-align:center;">Cant.</th>';
    html += '<th style="padding:0.75rem 0.6rem;">Estado</th>';
    html += '<th style="padding:0.75rem 0.6rem; text-align:center;">Acciones</th>';
    html += '</tr></thead><tbody>';

    libros.forEach((lib, index) => {
        const bgRow = index % 2 === 0 ? '#ffffff' : '#f9f8f5';
        const numInv = lib.numero_inventario ? `#${lib.numero_inventario}` : (lib.id ? `#${lib.id}` : `#${index + 1}`);
        const cant = lib.cant || lib.cantidad || 1;
        const estado = lib.estado || 'Disponible';
        const estadoBadgeClass = estado === 'Disponible'
            ? 'background:#e8f5e9; color:#2e7d32; padding:0.25rem 0.65rem; border-radius:1rem; font-weight:600; font-size:0.75rem;'
            : 'background:#fff3e0; color:#e65100; padding:0.25rem 0.65rem; border-radius:1rem; font-weight:600; font-size:0.75rem;';

        html += `<tr style="background:${bgRow}; border-bottom:1px solid #eee;">
            <td style="padding:0.7rem 0.6rem; font-weight:600; color:#5a6474;">${numInv}</td>
            <td style="padding:0.7rem 0.6rem; font-weight:600; color:#1a3a4a;">${lib.titulo || 'Sin título'}</td>
            <td style="padding:0.7rem 0.6rem; color:#5a6474;">${lib.autor || '-'}</td>
            <td style="padding:0.7rem 0.6rem; text-align:center; font-weight:600;">${cant}</td>
            <td style="padding:0.7rem 0.6rem;"><span style="${estadoBadgeClass}">${estado}</span></td>
            <td style="padding:0.7rem 0.6rem; text-align:center; white-space:nowrap;">
                <button type="button" data-csp-click="abrirModalEditarLibro('${lib.id}')" style="background:#f0a800; color:white; border:none; padding:0.4rem 0.8rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem; margin-right:0.3rem;" title="Editar libro">✏️ Editar</button>
                <button type="button" data-csp-click="confirmarEliminarLibro('${lib.id}')" style="background:#c62828; color:white; border:none; padding:0.4rem 0.8rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem;" title="Eliminar libro">🗑️ Eliminar</button>
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
        
        // Sincronizar borrado con Supabase
        if (window.SupabaseSync) {
            window.SupabaseSync.delete('libros_biblioteca', 'libros', 'id', String(id));
        }
        if (window.supabaseClient) {
            Promise.resolve(window.supabaseClient.from('libros').delete().eq('id', String(id))).catch(() => {});
            if (!isNaN(id)) {
                Promise.resolve(window.supabaseClient.from('libros').delete().eq('id', Number(id))).catch(() => {});
            }
        }

        _librosFiltrados = nuevosLibros;
        filtrarEliminarLibro();
        if (typeof renderizarSeccionVerPedidos === 'function') {
            renderizarSeccionVerPedidos();
        }
        if (typeof renderizarCatalogo === 'function') {
            renderizarCatalogo();
        }
        mostrarToastBiblio('<i class="fas fa-trash"></i> Libro eliminado correctamente', '#c62828');
    });
}

// --- Ver Libros Pedidos ---
function abrirModalVerPedidos() {
    seccionVerPedidosActual = 'Libros';
    filtroPedidosTabActual = 'Pendientes';
    filtroTextoLibrosPedidos = '';
    const inputBuscador = document.getElementById('buscadorLibrosPedidos');
    if (inputBuscador) inputBuscador.value = '';

    actualizarTabsSeccionVerPedidos();
    actualizarBotonesTabPedidos();
    const modal = document.getElementById('modalVerPedidos');
    if (modal) modal.classList.add('active');
    renderizarSeccionVerPedidos();

    // Sincronizar datos frescos en segundo plano
    if (window.supabaseClient) {
        Promise.all([
            window.supabaseClient.from('libros').select('*'),
            window.supabaseClient.from('pedidos_libros').select('*')
        ]).then(([resLibros, resPedidos]) => {
            let actualizo = false;
            if (resLibros && !resLibros.error && Array.isArray(resLibros.data) && resLibros.data.length > 0) {
                const transformer = (window.TABLE_TRANSFORMERS && window.TABLE_TRANSFORMERS.libros) ? window.TABLE_TRANSFORMERS.libros.fromDb : null;
                const items = transformer ? transformer(resLibros.data) : resLibros.data;
                localStorage.setItem('libros_biblioteca', JSON.stringify(items));
                actualizo = true;
            }
            if (resPedidos && !resPedidos.error && Array.isArray(resPedidos.data)) {
                const transformer = (window.TABLE_TRANSFORMERS && window.TABLE_TRANSFORMERS.pedidos_libros) ? window.TABLE_TRANSFORMERS.pedidos_libros.fromDb : null;
                const items = transformer ? transformer(resPedidos.data) : resPedidos.data;
                localStorage.setItem('libros_pedidos', JSON.stringify(items));
                actualizo = true;
            }
            if (actualizo) {
                const modalActivo = document.getElementById('modalVerPedidos');
                if (modalActivo && modalActivo.classList.contains('active')) {
                    renderizarSeccionVerPedidos();
                }
            }
        }).catch(() => {});
    }
}

function cerrarModalVerPedidos(event) {
    if (event && event.target && event.target !== document.getElementById('modalVerPedidos')) return;
    const modal = document.getElementById('modalVerPedidos');
    if (modal) modal.classList.remove('active');
}

function cambiarSeccionVerPedidos(seccion) {
    seccionVerPedidosActual = seccion;
    actualizarTabsSeccionVerPedidos();
    renderizarSeccionVerPedidos();
}

function actualizarTabsSeccionVerPedidos() {
    const btnLibros = document.getElementById('btnTabSeccionLibros');
    const btnPedidos = document.getElementById('btnTabSeccionPedidos');
    const secLibros = document.getElementById('seccionVerLibros');
    const secPedidos = document.getElementById('seccionVerPedidos');

    const estActivo = 'padding:0.5rem 1.4rem; border-radius:1.5rem; border:none; background:#1a3a4a; color:white; font-weight:700; cursor:pointer; font-size:0.88rem; font-family:Inter,sans-serif; min-height:44px; display:inline-flex; align-items:center; gap:0.4rem;';
    const estInactivo = 'padding:0.5rem 1.4rem; border-radius:1.5rem; border:1px solid #1a3a4a; background:white; color:#1a3a4a; font-weight:700; cursor:pointer; font-size:0.88rem; font-family:Inter,sans-serif; min-height:44px; display:inline-flex; align-items:center; gap:0.4rem;';

    if (btnLibros) btnLibros.style.cssText = (seccionVerPedidosActual === 'Libros') ? estActivo : estInactivo;
    if (btnPedidos) btnPedidos.style.cssText = (seccionVerPedidosActual === 'Pedidos') ? estActivo : estInactivo;

    if (secLibros) secLibros.style.display = (seccionVerPedidosActual === 'Libros') ? 'block' : 'none';
    if (secPedidos) secPedidos.style.display = (seccionVerPedidosActual === 'Pedidos') ? 'block' : 'none';
}

function renderizarSeccionVerPedidos() {
    if (seccionVerPedidosActual === 'Libros') {
        renderizarLibrosPedidos();
    } else {
        renderizarPedidos();
    }
}

function filtrarLibrosPedidosAdmin() {
    const inputBuscador = document.getElementById('buscadorLibrosPedidos');
    filtroTextoLibrosPedidos = inputBuscador ? inputBuscador.value.trim().toLowerCase() : '';
    renderizarLibrosPedidos();
}

function renderizarLibrosPedidos() {
    const libros = cargarLibros();
    const contenedor = document.getElementById('listaLibrosAdminEstados');
    if (!contenedor) return;

    let librosFiltrados = libros;
    if (filtroTextoLibrosPedidos) {
        librosFiltrados = libros.filter(l => 
            (l.titulo && String(l.titulo).toLowerCase().includes(filtroTextoLibrosPedidos)) ||
            (l.autor && String(l.autor).toLowerCase().includes(filtroTextoLibrosPedidos)) ||
            ((l.categoria || l.cat) && String(l.categoria || l.cat).toLowerCase().includes(filtroTextoLibrosPedidos)) ||
            (l.id && String(l.id).toLowerCase().includes(filtroTextoLibrosPedidos))
        );
    }

    if (!librosFiltrados || librosFiltrados.length === 0) {
        const msj = filtroTextoLibrosPedidos
            ? 'No se encontraron libros que coincidan con la búsqueda.'
            : 'No hay libros registrados en la biblioteca.';
        contenedor.innerHTML = `<p style="text-align:center; color:#5a6474; padding:2rem 1rem;">${msj}</p>`;
        return;
    }

    let html = '<div class="tabla-contenedor-scroll" style="overflow-x:auto; -webkit-overflow-scrolling:touch; width:100%;"><table class="tabla-libros" style="width:100%; border-collapse:collapse; font-size:0.85rem; min-width:720px;">';
    html += '<thead><tr style="background:#1a3a4a; color:white; text-align:left;">';
    html += '<th style="padding:0.75rem 0.6rem;">ID / Título del Libro</th>';
    html += '<th style="padding:0.75rem 0.6rem;">Autor</th>';
    html += '<th style="padding:0.75rem 0.6rem;">Categoría</th>';
    html += '<th style="padding:0.75rem 0.6rem;">Estado Actual</th>';
    html += '<th style="padding:0.75rem 0.6rem; text-align:center;">Cambiar Estado</th>';
    html += '<th style="padding:0.75rem 0.6rem; text-align:center;">Acciones</th>';
    html += '</tr></thead><tbody>';

    librosFiltrados.forEach((l, index) => {
        const bgRow = index % 2 === 0 ? '#ffffff' : '#f9f8f5';
        const estado = l.estado || 'Disponible';

        let estadoBadge = '<span style="background:#e8f5e9; color:#2e7d32; padding:0.25rem 0.7rem; border-radius:1rem; font-weight:700; font-size:0.78rem; display:inline-flex; align-items:center; gap:0.3rem;"><i class="fas fa-check-circle"></i> Disponible</span>';
        if (estado === 'En curso') {
            estadoBadge = '<span style="background:#fff3e0; color:#e65100; padding:0.25rem 0.7rem; border-radius:1rem; font-weight:700; font-size:0.78rem; display:inline-flex; align-items:center; gap:0.3rem;"><i class="fas fa-hourglass-half"></i> En curso</span>';
        } else if (estado === 'Prestado') {
            estadoBadge = '<span style="background:#ffebee; color:#c62828; padding:0.25rem 0.7rem; border-radius:1rem; font-weight:700; font-size:0.78rem; display:inline-flex; align-items:center; gap:0.3rem;"><i class="fas fa-user-clock"></i> Prestado</span>';
        } else if (estado === 'Dañado') {
            estadoBadge = '<span style="background:#f5f5f5; color:#757575; padding:0.25rem 0.7rem; border-radius:1rem; font-weight:700; font-size:0.78rem; display:inline-flex; align-items:center; gap:0.3rem;"><i class="fas fa-exclamation-triangle"></i> Dañado</span>';
        }

        html += `<tr style="background:${bgRow}; border-bottom:1px solid #eee;">
            <td style="padding:0.7rem 0.6rem; font-weight:600; color:#1a3a4a;">
                <div><span style="font-size:0.75rem; color:#d4a038; font-weight:700;">[ID: ${l.id}]</span> ${l.titulo || 'Sin título'}</div>
            </td>
            <td style="padding:0.7rem 0.6rem; color:#5a6474;">${l.autor || '-'}</td>
            <td style="padding:0.7rem 0.6rem; color:#5a6474;">${l.categoria || l.cat || 'General'}</td>
            <td style="padding:0.7rem 0.6rem;">${estadoBadge}</td>
            <td style="padding:0.7rem 0.6rem; text-align:center;">
                <select data-csp-change="cambiarEstadoLibroDirecto('${l.id}', this.value)" style="padding:0.4rem 0.6rem; border-radius:0.8rem; border:1px solid #1a3a4a; font-weight:600; font-size:0.8rem; min-height:40px; cursor:pointer; background:white; color:#1a3a4a; outline:none;">
                    <option value="Disponible" ${estado === 'Disponible' ? 'selected' : ''}>🟢 Disponible</option>
                    <option value="En curso" ${estado === 'En curso' ? 'selected' : ''}>🟠 En curso</option>
                    <option value="Prestado" ${estado === 'Prestado' ? 'selected' : ''}>🔴 Prestado</option>
                    <option value="Dañado" ${estado === 'Dañado' ? 'selected' : ''}>⚪ Dañado</option>
                </select>
            </td>
            <td style="padding:0.7rem 0.6rem; text-align:center; white-space:nowrap;">
                <button type="button" data-csp-click="abrirModalEditarLibro('${l.id}')" style="background:#f0a800; color:white; border:none; padding:0.35rem 0.75rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem;" title="Editar libro">✏️ Editar</button>
            </td>
        </tr>`;
    });

    html += '</tbody></table></div>';
    contenedor.innerHTML = html;
}

function cambiarEstadoLibroDirecto(id, nuevoEstado) {
    let libros = cargarLibros();
    const idx = libros.findIndex(l => String(l.id) === String(id));
    if (idx !== -1) {
        libros[idx].estado = nuevoEstado;
        guardarLibros(libros);

        mostrarToastBiblio(`<i class="fas fa-sync-alt"></i> Estado del libro cambiado a "${nuevoEstado}"`);
        renderizarSeccionVerPedidos();
        if (typeof renderizarCatalogo === 'function') {
            renderizarCatalogo();
        }
    }
}

function filtrarPedidosTab(tab) {
    filtroPedidosTabActual = tab;
    actualizarBotonesTabPedidos();
    renderizarPedidos();
}

function actualizarBotonesTabPedidos() {
    const btnPend = document.getElementById('btnFiltroPedidosPendientes');
    const btnEnCurso = document.getElementById('btnFiltroPedidosEnCurso');
    const btnTodos = document.getElementById('btnFiltroPedidosTodos');

    const estActivo = 'padding:0.4rem 1rem; border-radius:1.5rem; border:none; background:#1a3a4a; color:white; font-weight:600; cursor:pointer; font-size:0.82rem; font-family:Inter,sans-serif; min-height:44px; display:inline-flex; align-items:center; justify-content:center;';
    const estInactivo = 'padding:0.4rem 1rem; border-radius:1.5rem; border:1px solid #1a3a4a; background:white; color:#1a3a4a; font-weight:600; cursor:pointer; font-size:0.82rem; font-family:Inter,sans-serif; min-height:44px; display:inline-flex; align-items:center; justify-content:center;';

    if (btnPend) btnPend.style.cssText = (filtroPedidosTabActual === 'Pendientes') ? estActivo : estInactivo;
    if (btnEnCurso) btnEnCurso.style.cssText = (filtroPedidosTabActual === 'EnCurso') ? estActivo : estInactivo;
    if (btnTodos) btnTodos.style.cssText = (filtroPedidosTabActual === 'Todos') ? estActivo : estInactivo;
}

function renderizarPedidos() {
    const todosPedidos = cargarPedidos();
    const libros = cargarLibros();
    const contenedor = document.getElementById('listaPedidosLibros');
    if (!contenedor) return;

    if (filtroPedidosTabActual === 'EnCurso') {
        renderizarPedidosEnCurso(contenedor);
        return;
    }

    let pedidos = todosPedidos;
    if (filtroPedidosTabActual === 'Pendientes') {
        pedidos = todosPedidos.filter(p => p.estado !== 'Entregado' && p.estado !== 'Cancelado');
    }

    if (!pedidos || pedidos.length === 0) {
        const msj = filtroPedidosTabActual === 'Pendientes'
            ? 'No hay solicitudes de préstamos pendientes.'
            : 'No se encontraron registros de pedidos.';
        contenedor.innerHTML = `<p style="text-align:center; color:#5a6474; padding:2rem 1rem;">${msj}</p>`;
        return;
    }

    let html = '<div class="tabla-contenedor-scroll" style="overflow-x:auto; -webkit-overflow-scrolling:touch; width:100%;"><table class="tabla-libros" style="width:100%; border-collapse:collapse; font-size:0.85rem; min-width:760px;">';
    html += '<thead><tr style="background:#1a3a4a; color:white; text-align:left;">';
    html += '<th style="padding:0.75rem 0.6rem;">Solicitante</th>';
    html += '<th style="padding:0.75rem 0.6rem;">Contacto</th>';
    html += '<th style="padding:0.75rem 0.6rem;">Libro Solicitado</th>';
    html += '<th style="padding:0.75rem 0.6rem;">Fecha</th>';
    html += '<th style="padding:0.75rem 0.6rem;">Estado</th>';
    html += '<th style="padding:0.75rem 0.6rem; text-align:center;">Acciones</th>';
    html += '</tr></thead><tbody>';

    pedidos.forEach((p, index) => {
        const bgRow = index % 2 === 0 ? '#ffffff' : '#f9f8f5';
        const libroEncontrado = libros.find(l => String(l.id) === String(p.libroId || p.libro_id));
        const tituloLibro = libroEncontrado ? libroEncontrado.titulo : (p.tituloLibro || p.titulo_libro || 'Libro sin título');
        const fechaTexto = p.fecha ? new Date(p.fecha).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }) : '-';
        const estado = p.estado || 'Pendiente';

        let estadoBadge = '<span style="background:#fff3e0; color:#e65100; padding:0.25rem 0.65rem; border-radius:1rem; font-weight:600; font-size:0.75rem;">Pendiente</span>';
        if (estado === 'Entregado') {
            estadoBadge = '<span style="background:#e8f5e9; color:#2e7d32; padding:0.25rem 0.65rem; border-radius:1rem; font-weight:600; font-size:0.75rem;">Entregado</span>';
        } else if (estado === 'Cancelado') {
            estadoBadge = '<span style="background:#ffebee; color:#c62828; padding:0.25rem 0.65rem; border-radius:1rem; font-weight:600; font-size:0.75rem;">Cancelado</span>';
        }

        const phoneClean = p.telefono ? String(p.telefono).replace(/\D/g, '') : '';
        const telefonoHtml = p.telefono
            ? (phoneClean.length >= 7
                ? `<div><a href="https://wa.me/${phoneClean}" target="_blank" rel="noopener noreferrer" style="color:#2e7d32; font-weight:700; text-decoration:none;" title="Abrir WhatsApp">📱 ${p.telefono}</a></div>`
                : `<div>📱 ${p.telefono}</div>`)
            : '';
        const emailHtml = p.email && p.email !== 'No especificado' ? `<div style="font-size:0.75rem; color:#5a6474;">✉️ ${p.email}</div>` : '';

        html += `<tr style="background:${bgRow}; border-bottom:1px solid #eee;">
            <td style="padding:0.7rem 0.6rem; font-weight:600; color:#1a3a4a;">${p.solicitante || 'Anónimo'}</td>
            <td style="padding:0.7rem 0.6rem; color:#1a3a4a;">${telefonoHtml || ''}${emailHtml || (telefonoHtml ? '' : '-')}</td>
            <td style="padding:0.7rem 0.6rem; font-weight:600; color:#2c5f7c;">${tituloLibro}</td>
            <td style="padding:0.7rem 0.6rem; color:#5a6474; white-space:nowrap;">${fechaTexto}</td>
            <td style="padding:0.7rem 0.6rem;">${estadoBadge}</td>
            <td style="padding:0.7rem 0.6rem; text-align:center; white-space:nowrap;">`;

        if (estado !== 'Entregado') {
            html += `<button type="button" class="btn-accion-libro btn-entregar-libro" data-csp-click="marcarEntregadoPedido('${p.id}')" style="background:#2e7d32; color:white; border:none; padding:0.4rem 0.8rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem; margin-right:0.3rem;">✅ Entregar</button>`;
        }
        if (estado !== 'Cancelado' && estado !== 'Entregado') {
            html += `<button type="button" data-csp-click="cancelarPedido('${p.id}')" style="background:#757575; color:white; border:none; padding:0.4rem 0.7rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem;">❌ Cancelar</button>`;
        }
        if (estado === 'Entregado') {
            html += `<span style="color:#2e7d32; font-weight:600; font-size:0.8rem;">✔️ Completado</span>`;
        }

        html += `</td></tr>`;
    });

    html += '</tbody></table></div>';
    contenedor.innerHTML = html;
}

function renderizarPedidosEnCurso(contenedor) {
    const libros = cargarLibros();
    const todosPedidos = cargarPedidos();

    const librosEnCurso = libros.filter(l => l.estado === 'En curso' || l.estado === 'Prestado');

    if (!librosEnCurso || librosEnCurso.length === 0) {
        contenedor.innerHTML = `<p style="text-align:center; color:#5a6474; padding:2rem 1rem;">No hay libros actualmente en curso o prestados en la biblioteca.</p>`;
        return;
    }

    let html = '<div class="tabla-contenedor-scroll" style="overflow-x:auto; -webkit-overflow-scrolling:touch; width:100%;"><table class="tabla-libros" style="width:100%; border-collapse:collapse; font-size:0.85rem; min-width:760px;">';
    html += '<thead><tr style="background:#1a3a4a; color:white; text-align:left;">';
    html += '<th style="padding:0.75rem 0.6rem;">Título del Libro</th>';
    html += '<th style="padding:0.75rem 0.6rem;">Solicitante / Contacto</th>';
    html += '<th style="padding:0.75rem 0.6rem;">Fecha Solicitud</th>';
    html += '<th style="padding:0.75rem 0.6rem;">Fecha Devolución (+14 días)</th>';
    html += '<th style="padding:0.75rem 0.6rem; text-align:center;">Acciones</th>';
    html += '</tr></thead><tbody>';

    librosEnCurso.forEach((l, index) => {
        const bgRow = index % 2 === 0 ? '#ffffff' : '#f9f8f5';
        
        const pedidoAsociado = todosPedidos.slice().reverse().find(p => 
            p.estado !== 'Cancelado' &&
            ((p.libroId && String(p.libroId) === String(l.id)) || 
             (l.titulo && p.tituloLibro && String(l.titulo).toLowerCase().trim() === String(p.tituloLibro).toLowerCase().trim()))
        );

        let solicitanteHtml = '<span style="color:#757575; font-style:italic;">Sin solicitante registrado</span>';
        let fechaSolTexto = 'Sin fecha';
        let fechaDevTexto = 'No aplica';

        if (pedidoAsociado) {
            const phoneClean = pedidoAsociado.telefono ? String(pedidoAsociado.telefono).replace(/\D/g, '') : '';
            const tel = pedidoAsociado.telefono
                ? (phoneClean.length >= 7
                    ? ` <div><a href="https://wa.me/${phoneClean}" target="_blank" rel="noopener noreferrer" style="color:#2e7d32; font-weight:700; text-decoration:none;">📱 ${pedidoAsociado.telefono}</a></div>`
                    : ` <div>📱 ${pedidoAsociado.telefono}</div>`)
                : '';
            const email = (pedidoAsociado.email && pedidoAsociado.email !== 'No especificado') ? ` <div style="font-size:0.75rem; color:#5a6474;">✉️ ${pedidoAsociado.email}</div>` : '';
            solicitanteHtml = `<strong style="color:#1a3a4a;">${pedidoAsociado.solicitante || 'Anónimo'}</strong>${tel}${email}`;

            if (pedidoAsociado.fecha) {
                const fechaObj = new Date(pedidoAsociado.fecha);
                if (!isNaN(fechaObj.getTime())) {
                    fechaSolTexto = fechaObj.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
                    const fechaDevObj = new Date(fechaObj.getTime() + 14 * 24 * 60 * 60 * 1000);
                    fechaDevTexto = fechaDevObj.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' });
                }
            }
        }

        html += `<tr style="background:${bgRow}; border-bottom:1px solid #eee;">
            <td style="padding:0.7rem 0.6rem; font-weight:600; color:#1a3a4a;">
                <div><span style="font-size:0.75rem; color:#d4a038; font-weight:700;">[ID: ${l.id}]</span> ${l.titulo || 'Sin título'}</div>
                <div style="font-size:0.75rem; color:#5a6474; font-weight:normal;">Autor: ${l.autor || '-'}</div>
            </td>
            <td style="padding:0.7rem 0.6rem;">${solicitanteHtml}</td>
            <td style="padding:0.7rem 0.6rem; color:#1a3a4a; white-space:nowrap; font-weight:600;">
                <i class="fas fa-calendar-alt" style="color:#1a3a4a; font-size:0.8rem;"></i> ${fechaSolTexto}
            </td>
            <td style="padding:0.7rem 0.6rem; color:#e65100; white-space:nowrap; font-weight:700;">
                <i class="fas fa-clock" style="color:#e65100; font-size:0.8rem;"></i> ${fechaDevTexto}
            </td>
            <td style="padding:0.7rem 0.6rem; text-align:center; white-space:nowrap;">
                <button type="button" data-csp-click="completarEnCurso('${l.id}', '${pedidoAsociado ? pedidoAsociado.id : ''}')" style="background:#2e7d32; color:white; border:none; padding:0.45rem 0.9rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem; min-height:40px; display:inline-flex; align-items:center; gap:0.4rem;">
                    <i class="fas fa-check-circle"></i> Marcar Disponible
                </button>
            </td>
        </tr>`;
    });

    html += '</tbody></table></div>';
    contenedor.innerHTML = html;
}

function completarEnCurso(libroId, pedidoId) {
    let libros = cargarLibros();
    const idx = libros.findIndex(l => String(l.id) === String(libroId));
    if (idx !== -1) {
        libros[idx].estado = 'Disponible';
        guardarLibros(libros);
    }

    if (pedidoId) {
        let pedidos = cargarPedidos();
        const pIdx = pedidos.findIndex(p => String(p.id) === String(pedidoId));
        if (pIdx !== -1) {
            pedidos[pIdx].estado = 'Entregado';
            guardarPedidos(pedidos);
        }
    }

    mostrarToastBiblio('<i class="fas fa-check-circle"></i> Libro devuelto y marcado como Disponible');
    renderizarSeccionVerPedidos();
    if (typeof renderizarCatalogo === 'function') {
        renderizarCatalogo();
    }
}

function marcarEntregadoPedido(id) {
    let pedidos = cargarPedidos();
    let libros = cargarLibros();
    const pedido = pedidos.find(p => String(p.id) === String(id));
    if (pedido) {
        pedido.estado = 'Entregado';
        guardarPedidos(pedidos);

        // Actualizar libro asociado a "En curso"
        const libroEncontrado = libros.find(l => 
            (pedido.libroId && String(l.id) === String(pedido.libroId)) ||
            (pedido.tituloLibro && l.titulo && String(l.titulo).toLowerCase().trim() === String(pedido.tituloLibro).toLowerCase().trim())
        );
        if (libroEncontrado) {
            libroEncontrado.estado = 'En curso';
            guardarLibros(libros);
        }

        renderizarSeccionVerPedidos();
        if (typeof renderizarCatalogo === 'function') {
            renderizarCatalogo();
        }
        mostrarToastBiblio('<i class="fas fa-check-circle"></i> Pedido marcado como entregado y libro en curso');
    }
}

function cancelarPedido(id) {
    let pedidos = cargarPedidos();
    const pedido = pedidos.find(p => String(p.id) === String(id));
    if (pedido) {
        pedido.estado = 'Cancelado';
        guardarPedidos(pedidos);
        renderizarSeccionVerPedidos();
        if (typeof renderizarCatalogo === 'function') {
            renderizarCatalogo();
        }
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
        renderizarSeccionVerPedidos();
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
            renderizarSeccionVerPedidos();
        }
    }
});

// ===== ANUNCIOS / EVENTOS =====
const STORAGE_ANUNCIOS = 'anuncios_eventos';
let anuncioPendienteEditarId = null;

function cargarAnuncios() {
    return StorageHelper.get(STORAGE_ANUNCIOS, []);
}

function guardarAnuncios(anuncios) {
    StorageHelper.set(STORAGE_ANUNCIOS, anuncios);
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

    const modal = document.getElementById('modalAgregarAnuncio');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
}

function cerrarModalAgregarAnuncio(event) {
    const modal = document.getElementById('modalAgregarAnuncio');
    if (event && event.target !== modal && !event.target.classList.contains('cerrar-modal') && !event.target.closest('[data-csp-click*="cerrarModalAgregarAnuncio"]')) return;
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
    const modalQuitar = document.getElementById('modalQuitarAnuncio');
    const hayOtroModal = modalQuitar && modalQuitar.classList.contains('active') && modalQuitar.style.display !== 'none';
    if (!hayOtroModal) {
        document.body.style.overflow = '';
    }
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

    const modal = document.getElementById('modalAgregarAnuncio');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
    }
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
            anuncios[idx].horaInicio = horaInicio || '';
            anuncios[idx].fechaFin = fechaFin || fechaInicio;
            anuncios[idx].horaFin = horaFin || horaInicio || '';
            anuncios[idx].ubicacion = ubicacion;
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
            horaInicio: horaInicio || '',
            fechaFin: fechaFin || fechaInicio,
            horaFin: horaFin || horaInicio || '',
            ubicacion: ubicacion,
            imagen: imagen || '',
            categoria: categoria || 'Anuncio General'
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
    const horaFin = document.getElementById('anuncioHoraFin') ? document.getElementById('anuncioHoraFin').value : '';
    const ubicacion = document.getElementById('anuncioUbicacion').value.trim();
    const categoria = document.getElementById('anuncioCategoria').value;
    const imagen = document.getElementById('anuncioImagen') ? document.getElementById('anuncioImagen').value.trim() : '';
    const contenido = document.getElementById('anuncioContenido').value.trim();

    const fechaStr = fechaInicio
        ? new Date(fechaInicio + 'T00:00:00').toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
        : '';

    let html = '';
    if (imagen) {
        html += `<div class="anuncio-card-img-wrapper"><img src="${imagen}" alt="${titulo || 'Anuncio'}" class="anuncio-card-img" style="width:100%; height:auto; object-fit:contain; border-radius:1rem; margin-bottom:1rem; display:block;"></div>`;
    }
    if (categoria) {
        html += `<span class="anuncio-categoria-badge" style="background: var(--golden, #c99d3b); color: var(--deep-blue, #1a3a4a); padding:0.25rem 1.1rem; border-radius:2rem; font-size:0.75rem; font-weight:700; display:inline-block; margin-bottom:0.6rem;">${categoria}</span>`;
    }
    if (titulo) {
        html += `<h3 class="anuncio-card-titulo" style="color:#1a3a4a; margin-top:0.2rem; margin-bottom:0.8rem; font-size:1.4rem; font-weight:700;">${titulo}</h3>`;
    }
    if (fechaStr || ubicacion) {
        html += `<div class="anuncio-card-meta" style="color:#5a6474; font-size:0.9rem; margin-bottom:1rem; display:flex; flex-wrap:wrap; gap:0.8rem;">`;
        if (fechaStr) html += `<span><i class="far fa-calendar-alt" style="color:var(--golden);"></i> ${fechaStr} ${horaInicio ? '· 🕐 ' + horaInicio : ''}</span>`;
        if (fechaFin && fechaFin !== fechaInicio) {
            const fechaFinStr = new Date(fechaFin + 'T00:00:00').toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
            html += `<span><i class="fas fa-hourglass-end" style="color:var(--golden);"></i> Finaliza: ${fechaFinStr} ${horaFin ? '· ' + horaFin : ''}</span>`;
        }
        if (ubicacion) html += `<span><i class="fas fa-map-marker-alt" style="color:var(--golden);"></i> ${ubicacion}</span>`;
        html += `</div>`;
    }
    if (contenido) {
        html += `<div class="anuncio-card-contenido" style="color:#2c3e50; line-height:1.7; font-size:0.95rem;">${contenido.replace(/\n/g, '<br>')}</div>`;
    }

    if (!html) {
        html = '<p style="color:var(--muted-text); text-align:center; padding:1.5rem 0;">No has ingresado datos para previsualizar.</p>';
    }

    const contenedor = document.getElementById('vistaPreviaContenido');
    if (contenedor) contenedor.innerHTML = html;
    const modalVista = document.getElementById('modalVistaPrevia');
    if (modalVista) {
        modalVista.style.display = 'flex';
        modalVista.classList.add('active');
    }
}

function cerrarVistaPrevia(event) {
    const modal = document.getElementById('modalVistaPrevia');
    if (event && event.target !== modal && !event.target.classList.contains('cerrar-modal') && !event.target.closest('[data-csp-click*="cerrarVistaPrevia"]')) return;
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
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
        const ubicacion = a.ubicacion || '';
        const categoria = a.categoria || '';
        const contenido = a.contenido ? a.contenido.replace(/\n/g, '<br>') : '';
        const imagen = a.imagen || '';
        const titulo = a.titulo || '';

        const hasMeta = Boolean(fechaInicio || ubicacion);

        html += `
<div class="anuncio-card">
    ${imagen ? `
    <div class="anuncio-card-img-wrapper">
        <img src="${imagen}" alt="${titulo || 'Anuncio'}" class="anuncio-card-img" />
    </div>` : ''}
    
    ${categoria ? `<span class="anuncio-categoria-badge">${categoria}</span>` : ''}
    
    ${titulo ? `<h3 class="anuncio-card-titulo">${titulo}</h3>` : ''}
    
    ${hasMeta ? `
    <div class="anuncio-card-meta">
        ${fechaInicio ? `<span><i class="far fa-calendar-alt"></i> ${fechaInicio} ${horaInicio ? '· 🕐 ' + horaInicio : ''}</span>` : ''}
        ${fechaFin ? `<span><i class="fas fa-hourglass-end"></i> Finaliza: ${fechaFin}</span>` : ''}
        ${ubicacion ? `<span><i class="fas fa-map-marker-alt"></i> ${ubicacion}</span>` : ''}
    </div>` : ''}
    
    ${contenido ? `
    <div class="anuncio-card-contenido">
        ${contenido}
    </div>` : ''}
</div>`;
    });

    container.innerHTML = html;
}

// Escuchar cambios del Admin y de Supabase
window.addEventListener('datosAnunciosActualizados', renderizarAnunciosPublicos);
window.addEventListener('supabase_synced_anuncios_eventos', function () {
    renderizarAnunciosPublicos();
    const modalQuitar = document.getElementById('modalQuitarAnuncio');
    if (modalQuitar && modalQuitar.classList.contains('active')) {
        filtrarAnunciosQuitar();
    }
});
window.addEventListener('supabase_synced_anuncios', function () {
    renderizarAnunciosPublicos();
    const modalQuitar = document.getElementById('modalQuitarAnuncio');
    if (modalQuitar && modalQuitar.classList.contains('active')) {
        filtrarAnunciosQuitar();
    }
});
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
    const modal = document.getElementById('modalQuitarAnuncio');
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
    }
    document.body.style.overflow = 'hidden';
}

function cerrarModalQuitarAnuncio(event) {
    const modal = document.getElementById('modalQuitarAnuncio');
    if (event && event.target !== modal && !event.target.classList.contains('cerrar-modal')) return;
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
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
            <button type="button" data-csp-click="abrirModalEditarAnuncio('${a.id}')" style="background:#f0a800; color:white; border:none; padding:0.4rem 0.7rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem; margin-right:0.3rem;" title="Editar anuncio">✏️ Editar</button>
            <button type="button" data-csp-click="confirmarEliminarAnuncio('${a.id}')" style="background:#c62828; color:white; border:none; padding:0.4rem 0.7rem; border-radius:1.5rem; cursor:pointer; font-weight:600; font-size:0.8rem;" title="Eliminar anuncio">🗑️ Eliminar</button>
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
            StorageHelper.delete(STORAGE_ANUNCIOS, id, 'id');
            let nuevosAnuncios = cargarAnuncios().filter(a => String(a.id) !== String(id));
            guardarAnuncios(nuevosAnuncios);
            filtrarAnunciosQuitar();
            mostrarToastAnuncios('<i class="fas fa-trash"></i> Anuncio eliminado correctamente', '#c62828');
        }
    );
}

// Asignaciones globales a window para delegador CSP
window.cargarAnuncios = cargarAnuncios;
window.guardarAnuncios = guardarAnuncios;
window.mostrarToastAnuncios = mostrarToastAnuncios;
window.abrirModalAgregarAnuncio = abrirModalAgregarAnuncio;
window.cerrarModalAgregarAnuncio = cerrarModalAgregarAnuncio;
window.abrirModalEditarAnuncio = abrirModalEditarAnuncio;
window.guardarNuevoAnuncio = guardarNuevoAnuncio;
window.generarVistaPreviaAnuncio = generarVistaPreviaAnuncio;
window.cerrarVistaPrevia = cerrarVistaPrevia;
window.renderizarAnunciosPublicos = renderizarAnunciosPublicos;
window.abrirModalQuitarAnuncio = abrirModalQuitarAnuncio;
window.cerrarModalQuitarAnuncio = cerrarModalQuitarAnuncio;
window.filtrarAnunciosQuitar = filtrarAnunciosQuitar;
window.renderizarListaQuitar = renderizarListaQuitar;
window.confirmarEliminarAnuncio = confirmarEliminarAnuncio;


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

    // Disparar carga fresca desde Supabase
    if (window.supabaseClient) {
        window.supabaseClient.from('interesados').select('*').then(({ data, error }) => {
            if (!error && Array.isArray(data)) {
                const transformer = (window.TABLE_TRANSFORMERS && window.TABLE_TRANSFORMERS.interesados) ? window.TABLE_TRANSFORMERS.interesados.fromDb : null;
                const items = transformer ? transformer(data) : data;
                localStorage.setItem(STORAGE_INTERESADOS, JSON.stringify(items));
                const sec = document.getElementById('seccionVerInteresados');
                if (sec && sec.style.display !== 'none') {
                    sec.innerHTML = generarHTMLInteresados();
                }
            }
        }).catch(() => {});
    }
}

// Escuchar sincronizaciones en tiempo real
window.addEventListener('supabase_synced_interesados', function() {
    const seccion = document.getElementById('seccionVerInteresados');
    if (seccion && seccion.style.display !== 'none') {
        seccion.innerHTML = generarHTMLInteresados();
    }
});

function cerrarVerInteresados() {
    const seccion = document.getElementById('seccionVerInteresados');
    const panel = document.getElementById('panelAdminGeneral');
    if (seccion) seccion.style.display = 'none';
    if (panel) panel.style.display = 'block';
}

function cargarInteresados() {
    return StorageHelper.get(STORAGE_INTERESADOS, []);
}

function guardarInteresados(lista) {
    StorageHelper.set(STORAGE_INTERESADOS, lista);
}

function toggleContactadoInteresado(id) {
    const lista = cargarInteresados();
    const index = lista.findIndex(item => String(item.id) === String(id));
    if (index !== -1) {
        lista[index].contactado = !lista[index].contactado;
        guardarInteresados(lista);
        const seccion = document.getElementById('seccionVerInteresados');
        if (seccion) seccion.innerHTML = generarHTMLInteresados();
    }
}

function eliminarInteresado(id) {
    mostrarConfirmAdmin(
        '¿Estás seguro de que deseas eliminar a este interesado de la lista?',
        'Eliminar interesado',
        function () {
            let lista = cargarInteresados();
            lista = lista.filter(item => String(item.id) !== String(id));
            guardarInteresados(lista);
            const seccion = document.getElementById('seccionVerInteresados');
            if (seccion) seccion.innerHTML = generarHTMLInteresados();
        }
    );
}

function generarHTMLInteresados() {
    const lista = cargarInteresados().slice().reverse();
    const total = lista.length;
    const contactados = lista.filter(i => i.contactado).length;
    const pendientes = total - contactados;

    let html = '<div style="background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10;box-shadow:0 4px 15px rgba(0,0,0,0.1);">';
    html += '<h3 style="color:#c9a53b;margin:0;font-size:1.2rem;display:flex;align-items:center;gap:0.5rem;"><i class="fas fa-users"></i> Personas Interesadas (¡Queremos conocerte!)</h3>';
    html += '<button data-csp-click="cerrarVerInteresados()" style="background:rgba(255,255,255,0.2);color:white;border:none;padding:0.5rem 1.5rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;transition:all 0.2s;"><i class="fas fa-arrow-left"></i> Volver</button></div>';

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
        html += '<p style="font-size:0.9rem;color:#999;margin-top:0.3rem;">Cuando los visitantes envíen el formulario "¡Queremos conocerte!", aparecerán aquí en tiempo real.</p>';
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

            const cleanWa = (item.whatsapp || item.telefono || '').toString().replace(/\D/g, '');
            const waLink = cleanWa ? `<a href="https://wa.me/${cleanWa}" target="_blank" style="color:#25D366;text-decoration:none;font-weight:600;"><i class="fab fa-whatsapp"></i> ${item.whatsapp || item.telefono}</a>` : (item.whatsapp || item.telefono || '-');

            let fechaStr = item.fecha || '-';
            try {
                if (item.fecha && item.fecha.includes('T')) {
                    const d = new Date(item.fecha);
                    if (!isNaN(d.getTime())) {
                        fechaStr = d.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
                    }
                }
            } catch (e) {}

            html += `<tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:0.9rem 0.8rem;color:#888;">${total - index}</td>
                <td style="padding:0.9rem 0.8rem;font-weight:600;color:#1a3a4a;">${item.nombre}</td>
                <td style="padding:0.9rem 0.8rem;">${waLink}</td>
                <td style="padding:0.9rem 0.8rem;color:#555;">${item.email || 'No proporcionado'}</td>
                <td style="padding:0.9rem 0.8rem;color:#777;font-size:0.85rem;">${fechaStr}</td>
                <td style="padding:0.9rem 0.8rem;">${estadoBadge}</td>
                <td style="padding:0.9rem 0.8rem;text-align:center;">
                    <div style="display:flex;gap:0.4rem;justify-content:center;">
                        <button data-csp-click="toggleContactadoInteresado('${item.id}')" title="${btnContactoText}" style="background:${btnContactoColor};color:white;border:none;padding:0.4rem 0.8rem;border-radius:0.5rem;cursor:pointer;font-size:0.8rem;font-weight:600;">
                            <i class="fas ${btnContactoIcon}"></i>
                        </button>
                        <button data-csp-click="eliminarInteresado('${item.id}')" title="Eliminar" style="background:#dc3545;color:white;border:none;padding:0.4rem 0.8rem;border-radius:0.5rem;cursor:pointer;font-size:0.8rem;">
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
window.cambiarMesCronogramaAdmin = cambiarMesCronogramaAdmin;
window.guardarPredicadorFecha = guardarPredicadorFecha;
window.guardarActividadMes = guardarActividadMes;
window.guardarTodoElMes = guardarTodoElMes;
window.cargarPredicadoresFechas = cargarPredicadoresFechas;
window.guardarPredicadoresFechas = guardarPredicadoresFechas;
window.mostrarFeedbackAdmin = mostrarFeedbackAdmin;
window.agregarEvento = agregarEvento;
window.eliminarEvento = eliminarEvento;
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
window.agregarMiembroCuotas = agregarMiembroCuotas;
window.eliminarMiembroCuotas = eliminarMiembroCuotas;
window.confirmarEliminarMiembro = confirmarEliminarMiembro;
window.cerrarModalConfirmarEliminar = cerrarModalConfirmarEliminar;
window.guardarYCerrarCuotas = guardarYCerrarCuotas;
window.actualizarTotalesCuotas = actualizarTotalesCuotas;
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
window.cambiarSeccionVerPedidos = cambiarSeccionVerPedidos;
window.filtrarLibrosPedidosAdmin = filtrarLibrosPedidosAdmin;
window.cambiarEstadoLibroDirecto = cambiarEstadoLibroDirecto;
window.renderizarLibrosPedidos = renderizarLibrosPedidos;
window.renderizarSeccionVerPedidos = renderizarSeccionVerPedidos;
window.renderizarPedidosEnCurso = renderizarPedidosEnCurso;
window.completarEnCurso = completarEnCurso;
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

    if (typeof window.sincronizarTransmisionesConSupabase === 'function') {
        window.sincronizarTransmisionesConSupabase();
    }
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

    const transmisiones = typeof obtenerTransmisiones === 'function' ? obtenerTransmisiones() : (StorageHelper.get('transmisiones', []) || []);

    let transEdit = null;
    if (transmisionEditandoId) {
        transEdit = transmisiones.find(t => String(t.id) === String(transmisionEditandoId));
    }

    const fechaHoy = new Date().toISOString().split('T')[0];
    const platEdit = transEdit ? (transEdit.plataforma || transEdit.tipo || 'youtube').toLowerCase() : 'youtube';
    const videoUrlEdit = transEdit ? (transEdit.url_video || transEdit.url || transEdit.videoId || '') : '';

    let html = `
    <!-- FORMULARIO DE AGREGAR / EDITAR TRANSMISIÓN -->
    <div style="background: #faf8f5; border: 1px solid rgba(201,165,59,0.3); border-radius: 1.2rem; padding: 1.5rem; margin-bottom: 2rem;">
        <h4 style="margin: 0 0 1rem; color: #1a3a4a; font-size: 1.1rem; display: flex; align-items: center; gap: 0.5rem;">
            <i class="${transEdit ? 'fas fa-edit' : 'fas fa-plus-circle'}" style="color: #c9a53b;"></i>
            ${transEdit ? 'Editar Transmisión' : 'Agregar Nueva Transmisión'}
        </h4>

        <form id="formTransmisionAdmin" data-csp-submit="guardarTransmisionForm(event)" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
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
                <input type="text" id="transTitulo" placeholder="Ej: Culto Divino de Adoración" value="${transEdit ? (transEdit.titulo || '') : ''}" required style="width:100%; padding:0.65rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-family:Inter,sans-serif;">
            </div>

            <div>
                <label style="display:block; font-weight:600; font-size:0.85rem; color:#1a3a4a; margin-bottom:0.3rem;">Fecha de transmisión *</label>
                <input type="date" id="transFecha" value="${transEdit ? (transEdit.fecha || fechaHoy) : fechaHoy}" required style="width:100%; padding:0.65rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-family:Inter,sans-serif;">
            </div>

            <div>
                <label style="display:block; font-weight:600; font-size:0.85rem; color:#1a3a4a; margin-bottom:0.3rem;">Plataforma *</label>
                <select id="transPlataforma" required style="width:100%; padding:0.65rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-family:Inter,sans-serif;">
                    <option value="youtube" ${platEdit === 'youtube' ? 'selected' : ''}>YouTube</option>
                    <option value="facebook" ${platEdit === 'facebook' ? 'selected' : ''}>Facebook</option>
                </select>
            </div>

            <div style="grid-column: span 2;">
                <label style="display:block; font-weight:600; font-size:0.85rem; color:#1a3a4a; margin-bottom:0.3rem;">URL o ID del video *</label>
                <input type="text" id="transVideoId" placeholder="Para YouTube: dQw4w9WgXcQ o URL completa. Para Facebook: URL completa" value="${videoUrlEdit}" required style="width:100%; padding:0.65rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-family:Inter,sans-serif;">
            </div>

            <div style="grid-column: 1 / -1;">
                <label style="display:block; font-weight:600; font-size:0.85rem; color:#1a3a4a; margin-bottom:0.3rem;">Descripción (Opcional)</label>
                <textarea id="transDescripcion" rows="2" placeholder="Breve descripción del tema o predicador..." style="width:100%; padding:0.65rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-family:Inter,sans-serif;">${transEdit && transEdit.descripcion ? transEdit.descripcion : ''}</textarea>
            </div>

            <div style="display:flex; gap:1.5rem; align-items:center; grid-column: 1 / -1; background:white; padding:0.8rem; border-radius:0.6rem; border:1px solid #e2e8f0;">
                <label style="display:inline-flex; align-items:center; gap:0.5rem; font-weight:600; font-size:0.88rem; color:#1a3a4a; cursor:pointer;">
                    <input type="checkbox" id="transDestacado" ${transEdit && (transEdit.destacado === true || transEdit.destacado === 'true') ? 'checked' : ''}>
                    ⭐ Marcar como Destacado
                </label>
                <label style="display:inline-flex; align-items:center; gap:0.5rem; font-weight:600; font-size:0.88rem; color:#c53030; cursor:pointer;">
                    <input type="checkbox" id="transEnVivo" ${transEdit && (transEdit.enVivo === true || transEdit.enVivo === 'true' || transEdit.en_vivo === true || transEdit.en_vivo === 'true') ? 'checked' : ''}>
                    🔴 Marcar como EN VIVO (Transmitiendo actualmente)
                </label>
            </div>

            <div style="grid-column: 1 / -1; display:flex; gap:0.8rem; justify-content:flex-end; margin-top:0.5rem;">
                ${transEdit ? `
                <button type="button" data-csp-click="cancelarEdicionTransmision()" style="background:#e2e8f0; color:#475569; border:none; padding:0.7rem 1.2rem; border-radius:0.8rem; font-weight:600; cursor:pointer; font-family:Inter,sans-serif;">
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
            <select id="filtroCategoriaAdmin" data-csp-change="filtrarTransmisionesAdminList(this.value)" style="padding:0.45rem 0.8rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-size:0.85rem; font-family:Inter,sans-serif;">
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

    // Copia para ordenar por fecha descendente
    const listaOrdenada = [...lista].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

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

    listaOrdenada.forEach(t => {
        const plat = (t.plataforma || t.tipo || 'youtube').toLowerCase();
        const esLive = t.enVivo === true || t.enVivo === 'true' || t.en_vivo === true || t.en_vivo === 'true';
        const esDest = t.destacado === true || t.destacado === 'true';

        html += `
        <tr style="border-bottom:1px solid #e2e8f0;">
            <td style="padding:0.65rem 0.8rem; font-weight:600; color:#1a3a4a; font-size:0.85rem;">${t.categoria || 'General'}</td>
            <td style="padding:0.65rem 0.8rem; font-weight:700; color:#2c5f7c; font-size:0.88rem;">${t.titulo || 'Sin título'}</td>
            <td style="padding:0.65rem 0.8rem; font-size:0.85rem; color:#475569;">${t.fecha || '-'}</td>
            <td style="padding:0.65rem 0.8rem;">
                <span class="envivo-plat-badge envivo-plat-${plat}" style="position:static; font-size:0.65rem;">
                    <i class="fab fa-${plat}"></i> ${plat}
                </span>
            </td>
            <td style="padding:0.65rem 0.8rem; text-align:center; font-size:0.85rem;">
                ${esLive ? '<span class="badge-live-pulse" style="font-size:0.65rem; padding:0.2rem 0.5rem; margin-right:0.3rem;">🔴 EN VIVO</span>' : ''}
                ${esDest ? '<span style="background:#fef3c7; color:#b45309; padding:0.2rem 0.5rem; border-radius:1rem; font-size:0.7rem; font-weight:700;">⭐ Destacado</span>' : ''}
                ${!esLive && !esDest ? '<span style="color:#94a3b8;">⏹️ Normal</span>' : ''}
            </td>
            <td style="padding:0.65rem 0.8rem; text-align:center;">
                <div style="display:flex; gap:0.4rem; justify-content:center;">
                    <button data-csp-click="editarTransmisionAdmin('${t.id}')" style="background:#e0f2fe; color:#0369a1; border:none; padding:0.35rem 0.7rem; border-radius:0.5rem; cursor:pointer; font-weight:600; font-size:0.8rem;" title="Editar">
                        ✏️ Editar
                    </button>
                    <button data-csp-click="eliminarTransmisionAdmin('${t.id}')" style="background:#fee2e2; color:#991b1b; border:none; padding:0.35rem 0.7rem; border-radius:0.5rem; cursor:pointer; font-weight:600; font-size:0.8rem;" title="Eliminar">
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
    const transmisiones = typeof obtenerTransmisiones === 'function' ? obtenerTransmisiones() : (StorageHelper.get('transmisiones', []) || []);
    const filtradas = cat === 'TODAS' ? transmisiones : transmisiones.filter(t => t.categoria === cat);
    const wrapper = document.getElementById('tablaTransmisionesAdminWrapper');
    if (wrapper) {
        wrapper.innerHTML = generarTablaTransmisionesAdminHTML(filtradas);
    }
}

function guardarTransmisionForm(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();

    const categoria = document.getElementById('transCategoria').value;
    const titulo = document.getElementById('transTitulo').value.trim();
    const fecha = document.getElementById('transFecha').value;
    let plataforma = document.getElementById('transPlataforma').value.toLowerCase();
    let videoIdRaw = document.getElementById('transVideoId').value.trim();
    const descripcion = document.getElementById('transDescripcion').value.trim();
    const destacado = document.getElementById('transDestacado').checked;
    const enVivo = document.getElementById('transEnVivo').checked;

    if (!titulo || !fecha || !videoIdRaw) {
        mostrarAlertaAdmin('Por favor complete todos los campos obligatorios (*)', 'Campos requeridos');
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

    let transmisiones = typeof obtenerTransmisiones === 'function' ? obtenerTransmisiones() : (StorageHelper.get('transmisiones', []) || []);
    if (!Array.isArray(transmisiones)) transmisiones = [];

    // Si se marca enVivo en una categoría, desmarcar las otras en la misma categoría si se desea
    if (enVivo) {
        transmisiones.forEach(t => {
            if (t.categoria === categoria) {
                t.enVivo = false;
                t.en_vivo = false;
            }
        });
    }

    let itemGuardado = null;

    if (transmisionEditandoId) {
        const strEditId = String(transmisionEditandoId);
        const idx = transmisiones.findIndex(t => String(t.id) === strEditId);
        itemGuardado = {
            id: strEditId,
            categoria,
            titulo,
            fecha,
            plataforma,
            tipo: plataforma,
            videoId: videoId,
            url_video: videoIdRaw,
            url: videoIdRaw,
            descripcion,
            destacado: Boolean(destacado),
            enVivo: Boolean(enVivo),
            en_vivo: Boolean(enVivo),
            activo: true,
            activa: true
        };
        if (idx !== -1) {
            transmisiones[idx] = {
                ...transmisiones[idx],
                ...itemGuardado
            };
        } else {
            transmisiones.push(itemGuardado);
        }
        transmisionEditandoId = null;
        mostrarAlertaAdmin('Transmisión actualizada correctamente.', 'Transmisión Actualizada');
    } else {
        const newId = String(Date.now());
        itemGuardado = {
            id: newId,
            categoria,
            titulo,
            fecha,
            plataforma,
            tipo: plataforma,
            videoId: videoId,
            url_video: videoIdRaw,
            url: videoIdRaw,
            descripcion,
            destacado: Boolean(destacado),
            enVivo: Boolean(enVivo),
            en_vivo: Boolean(enVivo),
            activo: true,
            activa: true,
            fechaCreacion: new Date().toISOString()
        };
        transmisiones.push(itemGuardado);
        mostrarAlertaAdmin('Transmisión agregada y publicada correctamente.', 'Transmisión Guardada');
    }

    if (typeof guardarTransmisiones === 'function') {
        guardarTransmisiones(transmisiones);
    } else {
        localStorage.setItem('transmisiones', JSON.stringify(transmisiones));
        if (typeof StorageHelper !== 'undefined' && StorageHelper.set) {
            StorageHelper.set('transmisiones', transmisiones);
        }
    }

    if (typeof actualizarVisibilidadBtnEnVivo === 'function') {
        actualizarVisibilidadBtnEnVivo();
    }
    if (typeof actualizarBotonFlotanteEnVivo === 'function') {
        actualizarBotonFlotanteEnVivo();
    }
    window.dispatchEvent(new CustomEvent('transmisionesActualizadas', { detail: transmisiones }));

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
    if (!id) return;
    const strId = String(id);
    const transmisiones = typeof obtenerTransmisiones === 'function' ? obtenerTransmisiones() : (StorageHelper.get('transmisiones', []) || []);
    const t = transmisiones.find(x => String(x.id) === strId);
    const nombre = t ? t.titulo : 'esta transmisión';

    mostrarConfirmAdmin(
        `¿Está seguro de eliminar "<strong>${nombre}</strong>"? Esta acción no se puede deshacer.`,
        'Eliminar transmisión',
        function () {
            const actualizadas = typeof obtenerTransmisiones === 'function' ? obtenerTransmisiones() : (StorageHelper.get('transmisiones', []) || []);
            const filtradas = actualizadas.filter(x => String(x.id) !== strId);
            
            // 1. Guardar y sincronizar con StorageHelper y Supabase
            if (typeof guardarTransmisiones === 'function') {
                guardarTransmisiones(filtradas);
            } else {
                localStorage.setItem('transmisiones', JSON.stringify(filtradas));
                if (typeof StorageHelper !== 'undefined' && StorageHelper.set) {
                    StorageHelper.set('transmisiones', filtradas);
                }
            }

            if (typeof StorageHelper !== 'undefined' && StorageHelper.delete) {
                StorageHelper.delete('transmisiones', strId, 'id');
            }

            // Direct Supabase delete
            if (window.supabaseClient) {
                window.supabaseClient.from('transmisiones').delete().eq('id', strId).then(({ error }) => {
                    if (error) {
                        console.warn('Error al eliminar transmisión de Supabase:', error);
                    }
                }).catch(err => {
                    console.warn('Error de red al eliminar en Supabase:', err);
                });
            }

            if (String(transmisionEditandoId) === strId) {
                transmisionEditandoId = null;
            }

            if (typeof actualizarVisibilidadBtnEnVivo === 'function') {
                actualizarVisibilidadBtnEnVivo();
            }
            if (typeof actualizarBotonFlotanteEnVivo === 'function') {
                actualizarBotonFlotanteEnVivo();
            }
            window.dispatchEvent(new CustomEvent('transmisionesActualizadas', { detail: filtradas }));

            renderizarAdminTransmisiones();
            if (typeof renderizarVistaCategoriasEnVivo === 'function') {
                renderizarVistaCategoriasEnVivo();
            }
        }
    );
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

    // Cargar datos actualizados desde Supabase en segundo plano
    if (window.supabaseClient) {
        window.supabaseClient.from('eventos_iglesia').select('*').then(({ data, error }) => {
            if (!error && Array.isArray(data)) {
                const transformer = (window.TABLE_TRANSFORMERS && window.TABLE_TRANSFORMERS.eventos_iglesia) ? window.TABLE_TRANSFORMERS.eventos_iglesia.fromDb : null;
                const items = transformer ? transformer(data) : data;
                localStorage.setItem('eventosIglesia', JSON.stringify(items));
                const sec = document.getElementById('seccionCalendarioIglesia');
                if (sec && sec.style.display !== 'none') {
                    sec.innerHTML = generarHTMLCalendarioIglesia();
                }
                window.dispatchEvent(new Event('datosIglesiaActualizados'));
            }
        }).catch(() => {});
    }
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
    return StorageHelper.get('eventosIglesia', []);
}

function guardarEventosIglesiaAdmin(eventos) {
    StorageHelper.set('eventosIglesia', eventos);
    window.dispatchEvent(new Event('datosIglesiaActualizados'));
}

function generarHTMLCalendarioIglesia() {
    const eventos = cargarEventosIglesiaAdmin().sort((a, b) => (a.fecha || '').localeCompare(b.fecha || ''));

    let html = '<div style="background:linear-gradient(135deg,#1a3a4a 0%,#2c5f7c 100%);padding:1rem 2rem;display:flex;justify-content:space-between;align-items:center;position:sticky;top:0;z-index:10;">';
    html += '<h3 style="color:#c9a53b;margin:0;font-size:1.2rem;">📅 Calendario General de la Iglesia</h3>';
    html += '<button data-csp-click="cerrarCalendarioIglesiaAdmin()" style="background:rgba(255,255,255,0.2);color:white;border:none;padding:0.5rem 1.5rem;border-radius:2rem;cursor:pointer;font-weight:600;font-family:Inter,sans-serif;"><i class="fas fa-arrow-left"></i> Volver al Panel</button></div>';
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
    html += '<label style="font-weight:600;color:#1a3a4a;cursor:pointer;"><input type="checkbox" id="eventoIglesiaRecurrente" data-csp-change="toggleCampoRecurrenciaIglesia()"> 📅 Repetir semanalmente</label>';
    html += '</div>';
    html += '<div class="campo-recurrencia" id="campoRecurrenciaIglesia" style="display:none;margin-bottom:1rem;padding:0.8rem;background:#faf8f5;border-radius:0.8rem;border:1px solid #e8e3d8;">';
    html += '<label style="font-weight:600;color:#1a3a4a;margin-right:0.5rem;">Semanas a repetir:</label>';
    html += '<input type="number" id="eventoIglesiaSemanas" min="1" max="52" value="4" style="width:80px;padding:0.4rem 0.6rem;border-radius:0.5rem;border:1px solid #cbd5e1;">';
    html += '</div>';
    
    html += '<button data-csp-click="agregarEventoIglesiaAdmin()" id="btnGuardarEventoIglesia" style="margin-top:0.5rem;width:100%;padding:0.8rem;background:linear-gradient(135deg,#d4a038 0%,#c9a53b 100%);color:#1a3a4a;border:none;border-radius:2rem;font-weight:700;cursor:pointer;font-family:Inter,sans-serif;"><i class="fas fa-plus"></i> Agregar Evento</button>';
    html += '</div>';

    // Lista de eventos
    html += '<div>';
    html += '<h4 style="color:#1a3a4a;margin-bottom:0.8rem;"><i class="fas fa-list-ul"></i> Eventos Registrados (' + eventos.length + ')</h4>';
    if (eventos.length === 0) {
        html += '<p style="text-align:center;color:#5a6474;padding:1.5rem;background:white;border-radius:1rem;">No hay eventos programados en el calendario general.</p>';
    } else {
        eventos.forEach(ev => {
            const evIdSafe = String(ev.id || '').replace(/'/g, "\\'");
            html += '<div class="evento-item" style="background:white;border-radius:1rem;padding:1rem;margin-bottom:0.8rem;box-shadow:0 2px 8px rgba(0,0,0,0.04);display:flex;justify-content:space-between;align-items:center;">';
            html += '<div class="evento-info"><div class="evento-titulo" style="font-weight:700;color:#1a3a4a;">' + (ev.titulo || 'Sin título') + (ev.recurrente ? ' <span style="font-size:0.75rem;background:#fef3c7;color:#b45309;padding:0.15rem 0.5rem;border-radius:0.8rem;">🔄 Semanal</span>' : '') + '</div>';
            html += '<div class="evento-fecha" style="font-size:0.85rem;color:#5a6474;"><i class="far fa-calendar-alt"></i> ' + (ev.fecha || '') + (ev.hora ? ' a las ' + ev.hora : '') + (ev.descripcion ? ' · ' + ev.descripcion : '') + '</div></div>';
            html += '<div style="display:flex;gap:0.4rem;">';
            html += '<button class="btn-editar-evento" data-csp-click="abrirEditarEventoIglesia(\'' + evIdSafe + '\')" title="Editar" style="background:#e0f2fe;color:#0369a1;border:none;padding:0.4rem 0.7rem;border-radius:0.5rem;cursor:pointer;font-weight:600;">✏️</button>';
            html += '<button class="btn-eliminar-miembro" data-csp-click="eliminarEventoIglesiaAdmin(\'' + evIdSafe + '\')" title="Eliminar" style="background:#fee2e2;color:#991b1b;border:none;padding:0.4rem 0.7rem;border-radius:0.5rem;cursor:pointer;font-weight:600;">🗑️</button>';
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

    const inTitulo = document.getElementById('eventoIglesiaTitulo');
    const inFecha = document.getElementById('eventoIglesiaFecha');
    const inHora = document.getElementById('eventoIglesiaHora');
    const inDesc = document.getElementById('eventoIglesiaDescripcion');

    if (inTitulo) inTitulo.value = evento.titulo || '';
    if (inFecha) inFecha.value = evento.fecha || '';
    if (inHora) inHora.value = evento.hora || '';
    if (inDesc) inDesc.value = evento.descripcion || '';

    eventoIglesiaPendienteEditarId = String(id);

    const formTitulo = document.getElementById('formCalendarioIglesiaTitulo');
    if (formTitulo) formTitulo.innerHTML = '<i class="fas fa-edit"></i> Editar Evento';
    const btnGuardar = document.getElementById('btnGuardarEventoIglesia');
    if (btnGuardar) btnGuardar.innerHTML = '<i class="fas fa-save"></i> Guardar Cambios';

    const checkbox = document.getElementById('eventoIglesiaRecurrente');
    if (checkbox) checkbox.checked = false;
    toggleCampoRecurrenciaIglesia();
}

function agregarEventoIglesiaAdmin() {
    const inputTitulo = document.getElementById('eventoIglesiaTitulo');
    const inputFecha = document.getElementById('eventoIglesiaFecha');
    const inputHora = document.getElementById('eventoIglesiaHora');
    const inputDescripcion = document.getElementById('eventoIglesiaDescripcion');

    const titulo = inputTitulo ? inputTitulo.value.trim() : '';
    const fecha = inputFecha ? inputFecha.value : '';
    const hora = inputHora ? inputHora.value : '';
    const descripcion = inputDescripcion ? inputDescripcion.value.trim() : ''; // Opcional

    if (!titulo || !fecha) {
        mostrarAlertaAdmin('Por favor completa el título y la fecha del evento.');
        return;
    }

    const checkbox = document.getElementById('eventoIglesiaRecurrente');
    const esRecurrente = checkbox ? checkbox.checked : false;
    const inputSemanas = document.getElementById('eventoIglesiaSemanas');
    const semanas = esRecurrente ? (parseInt(inputSemanas ? inputSemanas.value : 1) || 1) : 1;

    let eventos = cargarEventosIglesiaAdmin();

    if (eventoIglesiaPendienteEditarId !== null) {
        const idx = eventos.findIndex(e => String(e.id) === String(eventoIglesiaPendienteEditarId));
        if (idx !== -1) {
            eventos.splice(idx, 1);
        }
    }

    const nuevosParaInsertar = [];
    if (esRecurrente) {
        const serieId = 'serie_' + Date.now();
        const fechaBase = new Date(fecha + 'T00:00:00');
        for (let i = 0; i < semanas; i++) {
            const fechaNueva = new Date(fechaBase);
            fechaNueva.setDate(fechaNueva.getDate() + (i * 7));
            const fechaStr = fechaNueva.toISOString().split('T')[0];
            const ev = {
                id: String(Date.now() + i),
                titulo: titulo,
                fecha: fechaStr,
                hora: hora || '09:00',
                descripcion: descripcion || '',
                lugar: 'Templo Principal',
                categoria: 'General',
                recurrente: true,
                semanas: semanas,
                serieId: serieId
            };
            eventos.push(ev);
            nuevosParaInsertar.push(ev);
        }
    } else {
        const ev = {
            id: String(eventoIglesiaPendienteEditarId !== null ? eventoIglesiaPendienteEditarId : Date.now()),
            titulo: titulo,
            fecha: fecha,
            hora: hora || '09:00',
            descripcion: descripcion || '',
            lugar: 'Templo Principal',
            categoria: 'General',
            recurrente: false,
            semanas: 1
        };
        eventos.push(ev);
        nuevosParaInsertar.push(ev);
    }

    // 1. Guardar en localStorage y disparar sincronización
    guardarEventosIglesiaAdmin(eventos);

    // 2. Inserción directa en Supabase para sincronización instantánea
    if (window.supabaseClient) {
        const rows = nuevosParaInsertar.map(e => ({
            id: String(e.id),
            titulo: e.titulo,
            descripcion: e.descripcion || '',
            fecha: e.fecha,
            hora: e.hora || '09:00',
            lugar: e.lugar || 'Templo Principal',
            categoria: e.categoria || 'General'
        }));
        Promise.resolve(window.supabaseClient.from('eventos_iglesia').upsert(rows, { onConflict: 'id' }))
            .catch(err => console.warn('[Supabase] Error al sincronizar evento_iglesia:', err));
    }

    eventoIglesiaPendienteEditarId = null;
    const formTitulo = document.getElementById('formCalendarioIglesiaTitulo');
    if (formTitulo) formTitulo.innerHTML = '<i class="fas fa-plus-circle"></i> Agregar Evento a la Iglesia';
    const btnGuardar = document.getElementById('btnGuardarEventoIglesia');
    if (btnGuardar) btnGuardar.innerHTML = '<i class="fas fa-plus"></i> Agregar Evento';
    if (inputTitulo) inputTitulo.value = '';
    if (inputFecha) inputFecha.value = '';
    if (inputHora) inputHora.value = '';
    if (inputDescripcion) inputDescripcion.value = '';
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
        let idsAEliminar = [];
        if (ev.serieId) {
            idsAEliminar = eventos.filter(e => e.serieId === ev.serieId).map(e => String(e.id));
            nuevosEventos = eventos.filter(e => e.serieId !== ev.serieId);
        } else {
            idsAEliminar = [String(id)];
            nuevosEventos = eventos.filter(e => String(e.id) !== String(id));
        }

        // 1. Guardar en localStorage y notificar
        guardarEventosIglesiaAdmin(nuevosEventos);

        // 2. Eliminar directamente en Supabase
        if (window.supabaseClient && idsAEliminar.length > 0) {
            Promise.resolve(window.supabaseClient.from('eventos_iglesia').delete().in('id', idsAEliminar))
                .catch(err => console.warn('[Supabase] Error al eliminar eventos_iglesia:', err));
        }
        if (window.SupabaseSync) {
            idsAEliminar.forEach(idDel => {
                window.SupabaseSync.delete('eventosIglesia', 'eventos_iglesia', 'id', idDel);
            });
        }

        // 3. Re-renderizar sección si está abierta
        const seccion = document.getElementById('seccionCalendarioIglesia');
        if (seccion) {
            seccion.innerHTML = generarHTMLCalendarioIglesia();
        }

        // 4. Feedback visual
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

// Sincronización en vivo de la sección admin de calendario
window.addEventListener('supabase_synced_eventosIglesia', function() {
    const seccion = document.getElementById('seccionCalendarioIglesia');
    if (seccion && seccion.style.display !== 'none') {
        seccion.innerHTML = generarHTMLCalendarioIglesia();
    }
});

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

/* =========================================================================
   CENTRO DE GESTIÓN DE BASE DE DATOS Y CONEXIÓN SUPABASE
   IASD Belén · Iglesia Adventista del Séptimo Día
   ========================================================================= */

let tabActivoBD = 'conexion';

function abrirModalBaseDatos() {
    let modal = document.getElementById('modalBaseDatosAdmin');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalBaseDatosAdmin';
        modal.className = 'modal-overlay';
        modal.style.zIndex = '100002';
        document.body.appendChild(modal);
    }

    bloquearScrollAdmin('modalBaseDatosAdmin');
    renderizarModalBaseDatos();
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';

    // Probar conexión automáticamente al abrir
    setTimeout(function() {
        probarConexionBaseDatosUI(true);
    }, 200);
}

function cerrarModalBaseDatos(event) {
    if (event && event.target !== document.getElementById('modalBaseDatosAdmin')) return;
    const modal = document.getElementById('modalBaseDatosAdmin');
    if (modal) {
        modal.style.display = 'none';
        modal.style.visibility = 'hidden';
    }
    desbloquearScrollAdmin('modalBaseDatosAdmin');
}

function cambiarTabBaseDatos(tabId) {
    tabActivoBD = tabId;
    renderizarModalBaseDatos();
}

function renderizarModalBaseDatos() {
    const modal = document.getElementById('modalBaseDatosAdmin');
    if (!modal) return;

    const creds = window.getActiveSupabaseCredentials ? window.getActiveSupabaseCredentials() : {
        url: window.SUPABASE_URL || 'https://ojfpzlvayjfzzqtqydgy.supabase.co',
        anonKey: window.SUPABASE_ANON_KEY || '',
        isCustom: false
    };

    const status = window.getSupabaseConnectionStatus ? window.getSupabaseConnectionStatus() : { ok: false, message: 'Estado no verificado' };

    let badgeClase = 'badge-status prestado';
    let badgeTexto = '🔴 Desconectado (Modo Local Offline Activo)';
    let badgeColor = '#e53935';

    if (status.ok) {
        badgeClase = 'badge-status disponible';
        badgeTexto = '🟢 Conectado a la Nube (Supabase Live)';
        badgeColor = '#2e7d32';
    } else if (status.code === '401_UNAUTHORIZED') {
        badgeTexto = '⚠️ Clave API Anon Inválida / Expirada';
        badgeColor = '#d97706';
    } else if (status.code === 'TABLES_MISSING') {
        badgeTexto = '⚠️ Conectado · Faltan tablas (Ejecutar SQL)';
        badgeColor = '#d97706';
    }

    // Recuento de tablas locales
    const conteoTablas = [
        { nombre: 'Anuncios y Eventos', clave: 'anuncios_eventos', tabla: 'anuncios', icono: 'fa-bullhorn' },
        { nombre: 'Catálogo de Libros', clave: 'libros_biblioteca', tabla: 'libros', icono: 'fa-book' },
        { nombre: 'Pedidos de Biblioteca', clave: 'libros_pedidos', tabla: 'pedidos_libros', icono: 'fa-hand-holding' },
        { nombre: 'Eventos de la Iglesia', clave: 'eventosIglesia', tabla: 'eventos_iglesia', icono: 'fa-calendar-alt' },
        { nombre: 'Cronograma Predicadores', clave: 'cronograma_predicadores_fechas', tabla: 'cronograma_predicadores', icono: 'fa-pray' },
        { nombre: 'Alumnos / Identidades LMS', clave: 'alumnos_identidades', tabla: 'alumnos_identidades', icono: 'fa-user-graduate' },
        { nombre: 'Exámenes & Cuestionarios', clave: 'db_examenes', tabla: 'examenes', icono: 'fa-file-alt' },
        { nombre: 'Respuestas de Exámenes', clave: 'examenesRealizados', tabla: 'respuestas_examenes', icono: 'fa-check-circle' },
        { nombre: 'Club Aventureros', clave: 'bd_aventureros', tabla: 'bd_aventureros', icono: 'fa-seedling' },
        { nombre: 'Club Conquistadores', clave: 'bd_conquistadores', tabla: 'bd_conquistadores', icono: 'fa-hiking' },
        { nombre: 'Club Guías Mayores', clave: 'bd_guias_mayores', tabla: 'bd_guias_mayores', icono: 'fa-compass' },
        { nombre: 'Personas Interesadas', clave: 'interesados', tabla: 'interesados', icono: 'fa-users' },
        { nombre: 'Transmisiones en Vivo', clave: 'transmisiones', tabla: 'transmisiones', icono: 'fa-video' }
    ].map(t => {
        let count = 0;
        try {
            const raw = localStorage.getItem(t.clave);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) count = parsed.length;
                else if (typeof parsed === 'object' && parsed !== null) count = Object.keys(parsed).length;
            }
        } catch(e){}
        return { ...t, count };
    });

    const totalRegistrosLocales = conteoTablas.reduce((acc, t) => acc + t.count, 0);

    modal.innerHTML = `
    <div class="modal-card" data-csp-click="event.stopPropagation()" style="max-width: 860px; width: 94%; max-height: 90vh; display: flex; flex-direction: column; padding: 0; overflow: hidden; border-radius: 1.8rem; box-shadow: 0 30px 80px rgba(0,0,0,0.4); border: 2px solid rgba(201,157,59,0.3); background: #ffffff;">
        
        <!-- HEADER -->
        <div style="background: linear-gradient(135deg, #07192d 0%, #0b2b4f 60%, #153a63 100%); padding: 1.6rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid rgba(201,157,59,0.4); color: white;">
            <div style="display: flex; align-items: center; gap: 1rem;">
                <div style="width: 48px; height: 48px; border-radius: 12px; background: rgba(201,157,59,0.2); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: #dfb75c; border: 1px solid rgba(201,157,59,0.4);">
                    <i class="fas fa-database"></i>
                </div>
                <div>
                    <h2 style="font-size: 1.4rem; margin: 0; color: #ffffff; font-family: 'Playfair Display', serif; letter-spacing: 0.5px;">Gestión de Base de Datos y Supabase</h2>
                    <p style="margin: 0.2rem 0 0; font-size: 0.85rem; color: rgba(255,255,255,0.75); font-family: 'Inter', sans-serif;">IASD Belén · Sincronización en la Nube y Almacenamiento Seguro</p>
                </div>
            </div>
            <button data-csp-click="cerrarModalBaseDatos()" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); width: 38px; height: 38px; border-radius: 50%; color: white; cursor: pointer; font-size: 1.2rem; display: flex; align-items: center; justify-content: center; transition: all 0.2s ease;" data-csp-mouseover="this.style.background='#e53935'" data-csp-mouseout="this.style.background='rgba(255,255,255,0.1)'">&times;</button>
        </div>

        <!-- BARRA DE ESTADO DE CONEXIÓN -->
        <div style="background: #f8fafc; padding: 0.9rem 2rem; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #e2e8f0; font-size: 0.88rem; flex-wrap: wrap; gap: 0.8rem;">
            <div style="display: flex; align-items: center; gap: 0.8rem;">
                <span style="font-weight: 700; color: #334155;">Estado:</span>
                <span id="badgeEstadoSupabase" style="display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.35rem 0.9rem; border-radius: 2rem; font-weight: 600; font-size: 0.82rem; background: ${badgeColor}15; color: ${badgeColor}; border: 1px solid ${badgeColor}40;">
                    ${badgeTexto}
                </span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.6rem;">
                <button data-csp-click="probarConexionBaseDatosUI()" class="btn-sm" style="background: #0b2b4f; color: white; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.4rem 0.9rem;">
                    <i class="fas fa-sync-alt" id="iconoRefrescarTest"></i> Probar Conexión
                </button>
            </div>
        </div>

        <!-- PESTAÑAS (TABS) -->
        <div style="display: flex; background: #f1f5f9; border-bottom: 1px solid #cbd5e1; padding: 0 1.5rem; gap: 0.5rem; overflow-x: auto;">
            <button data-csp-click="cambiarTabBaseDatos('conexion')" style="padding: 0.9rem 1.4rem; border: none; background: ${tabActivoBD === 'conexion' ? '#ffffff' : 'transparent'}; font-weight: 700; color: ${tabActivoBD === 'conexion' ? '#0b2b4f' : '#64748b'}; border-top: 3px solid ${tabActivoBD === 'conexion' ? '#c99d3b' : 'transparent'}; cursor: pointer; border-radius: 8px 8px 0 0; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
                <i class="fas fa-plug"></i> Conexión & Credenciales
            </button>
            <button data-csp-click="cambiarTabBaseDatos('tablas')" style="padding: 0.9rem 1.4rem; border: none; background: ${tabActivoBD === 'tablas' ? '#ffffff' : 'transparent'}; font-weight: 700; color: ${tabActivoBD === 'tablas' ? '#0b2b4f' : '#64748b'}; border-top: 3px solid ${tabActivoBD === 'tablas' ? '#c99d3b' : 'transparent'}; cursor: pointer; border-radius: 8px 8px 0 0; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
                <i class="fas fa-table"></i> Tablas y Registros (${totalRegistrosLocales})
            </button>
            <button data-csp-click="cambiarTabBaseDatos('sincronizar')" style="padding: 0.9rem 1.4rem; border: none; background: ${tabActivoBD === 'sincronizar' ? '#ffffff' : 'transparent'}; font-weight: 700; color: ${tabActivoBD === 'sincronizar' ? '#0b2b4f' : '#64748b'}; border-top: 3px solid ${tabActivoBD === 'sincronizar' ? '#c99d3b' : 'transparent'}; cursor: pointer; border-radius: 8px 8px 0 0; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
                <i class="fas fa-cloud-upload-alt"></i> Sincronizar Nube
            </button>
            <button data-csp-click="cambiarTabBaseDatos('sql')" style="padding: 0.9rem 1.4rem; border: none; background: ${tabActivoBD === 'sql' ? '#ffffff' : 'transparent'}; font-weight: 700; color: ${tabActivoBD === 'sql' ? '#0b2b4f' : '#64748b'}; border-top: 3px solid ${tabActivoBD === 'sql' ? '#c99d3b' : 'transparent'}; cursor: pointer; border-radius: 8px 8px 0 0; font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s;">
                <i class="fas fa-code"></i> Asistente SQL
            </button>
        </div>

        <!-- CUERPO DEL CONTENIDO -->
        <div style="flex: 1; overflow-y: auto; padding: 1.8rem 2rem; background: #ffffff;">
            
            <!-- TAB 1: CONEXIÓN & CREDENCIALES -->
            ${tabActivoBD === 'conexion' ? `
                <div style="max-width: 720px; margin: 0 auto;">
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 1.2rem; padding: 1.5rem; margin-bottom: 1.5rem;">
                        <h3 style="font-size: 1.1rem; color: #0b2b4f; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;">
                            <i class="fas fa-key" style="color: #c99d3b;"></i> Configurar Credenciales de Supabase
                        </h3>
                        <p style="font-size: 0.88rem; color: #64748b; line-height: 1.5; margin-bottom: 1.2rem;">
                            Ingresa los datos de tu proyecto de Supabase (obtenidos en <em>Project Settings ➔ API</em> en supabase.com). Los cambios se guardan y aplican al instante.
                        </p>

                        <div style="display: flex; flex-direction: column; gap: 1.2rem;">
                            <div>
                                <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #334155; margin-bottom: 0.4rem;">
                                    <i class="fas fa-link" style="color: #0b2b4f;"></i> Supabase Project URL:
                                </label>
                                <input type="url" id="inputSupabaseUrlUI" value="${creds.url}" placeholder="https://tu-proyecto.supabase.co" style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #cbd5e1; border-radius: 0.8rem; font-family: monospace; font-size: 0.9rem; background: #ffffff;">
                            </div>

                            <div>
                                <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #334155; margin-bottom: 0.4rem;">
                                    <i class="fas fa-shield-alt" style="color: #0b2b4f;"></i> Supabase Anon Key (Public API Key):
                                </label>
                                <textarea id="inputSupabaseKeyUI" rows="3" placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." style="width: 100%; padding: 0.75rem 1rem; border: 1.5px solid #cbd5e1; border-radius: 0.8rem; font-family: monospace; font-size: 0.85rem; background: #ffffff; resize: vertical;">${creds.anonKey}</textarea>
                            </div>

                            <div style="display: flex; gap: 0.8rem; flex-wrap: wrap; align-items: center; justify-content: space-between; padding-top: 0.5rem;">
                                <div style="display: flex; gap: 0.8rem; flex-wrap: wrap;">
                                    <button data-csp-click="guardarCredencialesSupabaseUI()" class="btn-sm" style="background: #c99d3b; color: #0b2b4f; font-weight: 700; padding: 0.65rem 1.6rem; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.5rem; border: none; box-shadow: 0 4px 14px rgba(201,157,59,0.3);">
                                        <i class="fas fa-save"></i> Guardar y Conectar
                                    </button>
                                    <button data-csp-click="probarConexionBaseDatosUI()" class="btn-sm" style="background: #0b2b4f; color: white; font-weight: 600; padding: 0.65rem 1.4rem; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.5rem; border: none;">
                                        <i class="fas fa-bolt"></i> Probar Conexión
                                    </button>
                                </div>
                                <button data-csp-click="restablecerCredencialesSupabaseUI()" class="btn-sm" style="background: transparent; color: #64748b; border: 1px solid #cbd5e1; padding: 0.55rem 1rem; font-size: 0.82rem;">
                                    <i class="fas fa-undo"></i> Restablecer por Defecto
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- CAJA DE DIAGNÓSTICO -->
                    <div id="cajaDiagnosticoBD" style="background: #f1f5f9; border-radius: 1rem; padding: 1.2rem 1.5rem; border: 1px solid #cbd5e1;">
                        <h4 style="font-size: 0.9rem; color: #334155; margin-bottom: 0.4rem; display: flex; align-items: center; gap: 0.4rem;">
                            <i class="fas fa-info-circle" style="color: #0b2b4f;"></i> Diagnóstico del Servidor:
                        </h4>
                        <div id="textoDiagnosticoBD" style="font-size: 0.85rem; color: #475569; line-height: 1.5; font-family: 'Inter', sans-serif;">
                            ${status.message}
                        </div>
                    </div>
                </div>
            ` : ''}

            <!-- TAB 2: TABLAS Y REGISTROS -->
            ${tabActivoBD === 'tablas' ? `
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.2rem; flex-wrap: wrap; gap: 0.8rem;">
                        <div>
                            <h3 style="font-size: 1.15rem; color: #0b2b4f; margin: 0;">Colecciones de la Iglesia</h3>
                            <p style="font-size: 0.85rem; color: #64748b; margin: 0.2rem 0 0;">Visualiza el número de registros en almacenamiento local sincronizado.</p>
                        </div>
                        <div style="display: flex; gap: 0.6rem;">
                            <button data-csp-click="descargarRespaldoJSON()" class="btn-sm" style="background: #0b2b4f; color: white; display: inline-flex; align-items: center; gap: 0.4rem;">
                                <i class="fas fa-download"></i> Descargar Respaldo JSON
                            </button>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem;">
                        ${conteoTablas.map(t => `
                            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.1rem 1.3rem; display: flex; align-items: center; justify-content: space-between; transition: all 0.2s ease;" data-csp-mouseover="this.style.borderColor='#c99d3b'; this.style.transform='translateY(-2px)'" data-csp-mouseout="this.style.borderColor='#e2e8f0'; this.style.transform='none'">
                                <div style="display: flex; align-items: center; gap: 0.8rem;">
                                    <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(11,43,79,0.08); display: flex; align-items: center; justify-content: center; color: #0b2b4f; font-size: 1.1rem;">
                                        <i class="fas ${t.icono}"></i>
                                    </div>
                                    <div>
                                        <div style="font-weight: 700; color: #1e293b; font-size: 0.88rem;">${t.nombre}</div>
                                        <div style="font-size: 0.75rem; color: #64748b; font-family: monospace;">${t.tabla}</div>
                                    </div>
                                </div>
                                <div style="background: #0b2b4f; color: #ffffff; padding: 0.25rem 0.7rem; border-radius: 1rem; font-weight: 700; font-size: 0.85rem;">
                                    ${t.count}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- TAB 3: SINCRONIZAR NUBE -->
            ${tabActivoBD === 'sincronizar' ? `
                <div style="max-width: 680px; margin: 0 auto; text-align: center;">
                    <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(201,157,59,0.15); display: flex; align-items: center; justify-content: center; font-size: 1.8rem; color: #c99d3b; margin: 0 auto 1.2rem;">
                        <i class="fas fa-cloud-upload-alt"></i>
                    </div>
                    <h3 style="font-size: 1.3rem; color: #0b2b4f; margin-bottom: 0.5rem;">Sincronización Total Local ➔ Supabase</h3>
                    <p style="font-size: 0.9rem; color: #64748b; line-height: 1.6; margin-bottom: 1.8rem;">
                        Esta acción enviará todos los eventos, libros, preguntas de examen, miembros de clubes y registros locales directamente a tu base de datos Supabase en la nube.
                    </p>

                    <div id="progresoSyncContenedor" style="display: none; margin-bottom: 1.5rem; text-align: left; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 1rem; padding: 1.2rem;">
                        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700; color: #334155; margin-bottom: 0.5rem;">
                            <span id="textoProgresoSync">Sincronizando...</span>
                            <span id="porcentajeProgresoSync">0%</span>
                        </div>
                        <div style="width: 100%; height: 10px; background: #e2e8f0; border-radius: 5px; overflow: hidden;">
                            <div id="barraProgresoSync" style="width: 0%; height: 100%; background: linear-gradient(90deg, #c99d3b, #0b2b4f); transition: width 0.3s ease;"></div>
                        </div>
                    </div>

                    <button data-csp-click="sincronizarBaseDatosUI()" id="btnIniciarSync" class="btn" style="background: #c99d3b; color: #0b2b4f; font-weight: 800; padding: 0.9rem 2.5rem; font-size: 1rem; border-radius: 2.5rem; display: inline-flex; align-items: center; gap: 0.6rem; border: none; cursor: pointer; box-shadow: 0 8px 24px rgba(201,157,59,0.35);">
                        <i class="fas fa-sync-alt"></i> Iniciar Sincronización Ahora
                    </button>
                </div>
            ` : ''}

            <!-- TAB 4: ASISTENTE SQL -->
            ${tabActivoBD === 'sql' ? `
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.8rem;">
                        <div>
                            <h3 style="font-size: 1.15rem; color: #0b2b4f; margin: 0;">Script de Creación de Tablas (supabase_setup.sql)</h3>
                            <p style="font-size: 0.85rem; color: #64748b; margin: 0.2rem 0 0;">Copia y ejecuta este script en el <strong>SQL Editor</strong> de Supabase para inicializar todas las tablas, columnas y políticas RLS.</p>
                        </div>
                        <button data-csp-click="copiarSQLSupabaseUI()" id="btnCopiarSQL" class="btn-sm" style="background: #0b2b4f; color: white; display: inline-flex; align-items: center; gap: 0.4rem; padding: 0.55rem 1.2rem; font-size: 0.88rem;">
                            <i class="fas fa-copy"></i> Copiar Todo el SQL
                        </button>
                    </div>

                    <div style="background: #0f172a; border-radius: 1rem; padding: 1.2rem; overflow-x: auto; border: 1px solid #1e293b; max-height: 380px;">
                        <pre style="margin: 0; font-family: 'Consolas', 'Courier New', monospace; font-size: 0.82rem; color: #94a3b8; line-height: 1.5; white-space: pre-wrap;" id="codigoSQLEditor">-- ============================================================
-- SCRIPT DEFINITIVO DE CONFIGURACIÓN EN SUPABASE
-- IASD Belén · Iglesia Adventista del Séptimo Día
-- ============================================================

-- 1. TABLA ALUMNOS_IDENTIDADES
CREATE TABLE IF NOT EXISTS public.alumnos_identidades (
    documento TEXT PRIMARY KEY,
    nombre TEXT,
    whatsapp TEXT,
    grupo TEXT DEFAULT 'General',
    pin TEXT,
    fecharegistro TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. TABLA CRONOGRAMA_PREDICADORES
CREATE TABLE IF NOT EXISTS public.cronograma_predicadores (
    id TEXT PRIMARY KEY,
    fecha TEXT,
    predicador TEXT,
    culto_tipo TEXT,
    actividad TEXT DEFAULT 'Culto',
    tema TEXT,
    curso TEXT,
    recurrente BOOLEAN DEFAULT false,
    semanas INTEGER DEFAULT 1
);
ALTER TABLE public.cronograma_predicadores DROP CONSTRAINT IF EXISTS cronograma_predicadores_fecha_key;
ALTER TABLE public.cronograma_predicadores DROP CONSTRAINT IF EXISTS cronograma_predicadores_fecha_actividad_key;
ALTER TABLE public.cronograma_predicadores ADD CONSTRAINT cronograma_predicadores_fecha_actividad_key UNIQUE (fecha, actividad);

-- 4. TABLA LIBROS Y BIBLIOTECA
CREATE TABLE IF NOT EXISTS public.libros (
    id TEXT PRIMARY KEY,
    titulo TEXT DEFAULT '',
    autor TEXT DEFAULT '',
    categoria TEXT DEFAULT 'General',
    cant INTEGER DEFAULT 1,
    estado TEXT DEFAULT 'Disponible',
    ubicacion TEXT DEFAULT 'Biblioteca',
    numero_inventario TEXT DEFAULT '',
    portada_url TEXT DEFAULT '',
    disponible BOOLEAN DEFAULT true
);
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS cant INTEGER DEFAULT 1;
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS ubicacion TEXT DEFAULT 'Biblioteca';
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS numero_inventario TEXT DEFAULT '';
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS portada_url TEXT DEFAULT '';
ALTER TABLE public.libros ALTER COLUMN numero_inventario DROP NOT NULL;
ALTER TABLE public.libros ALTER COLUMN numero_inventario SET DEFAULT '';

CREATE TABLE IF NOT EXISTS public.pedidos_libros (
    id TEXT PRIMARY KEY,
    libro_id TEXT,
    libroid INTEGER DEFAULT 0,
    solicitante TEXT,
    solicitante_nombre TEXT,
    telefono TEXT,
    email TEXT,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT now(),
    estado TEXT DEFAULT 'Pendiente',
    titulo_libro TEXT,
    titulolibro TEXT
);

CREATE TABLE IF NOT EXISTS public.interesados (
    id TEXT PRIMARY KEY,
    nombre TEXT,
    telefono TEXT,
    whatsapp TEXT,
    direccion TEXT,
    email TEXT,
    estudio_interes TEXT DEFAULT 'Estudio Bíblico',
    estado TEXT DEFAULT 'nuevo',
    contactado BOOLEAN DEFAULT false,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT now(),
    notas TEXT
);

-- 5. TABLA ANUNCIOS Y EVENTOS
CREATE TABLE IF NOT EXISTS public.anuncios (
    id TEXT PRIMARY KEY,
    titulo TEXT,
    descripcion TEXT,
    imagen TEXT,
    url TEXT,
    categoria TEXT DEFAULT 'General',
    fecha TIMESTAMP WITH TIME ZONE DEFAULT now(),
    creadopor TEXT DEFAULT 'admin'
);

CREATE TABLE IF NOT EXISTS public.eventos_iglesia (
    id TEXT PRIMARY KEY,
    titulo TEXT,
    descripcion TEXT,
    fecha TEXT,
    hora TEXT,
    tipo TEXT DEFAULT 'General',
    lugar TEXT DEFAULT 'Templo Principal'
);

-- 6. TABLAS DE CLUBES
CREATE TABLE IF NOT EXISTS public.bd_aventureros (
    id TEXT PRIMARY KEY, nombre TEXT, apellido TEXT, documento TEXT, fecha_nacimiento TEXT, tutor_nombre TEXT, celular TEXT, unidad TEXT, cargo TEXT DEFAULT 'Miembro', tipo_sangre TEXT, cartillas TEXT, especialidades TEXT, estado TEXT DEFAULT 'activo'
);

CREATE TABLE IF NOT EXISTS public.bd_conquistadores (
    id TEXT PRIMARY KEY, nombre TEXT, apellido TEXT, documento TEXT, fecha_nacimiento TEXT, tutor_nombre TEXT, celular TEXT, unidad TEXT, cargo TEXT DEFAULT 'Miembro', tipo_sangre TEXT, cartillas TEXT, especialidades TEXT, estado TEXT DEFAULT 'activo'
);

CREATE TABLE IF NOT EXISTS public.bd_guias_mayores (
    id TEXT PRIMARY KEY, nombre TEXT, apellido TEXT, documento TEXT, fecha_nacimiento TEXT, tutor_nombre TEXT, celular TEXT, unidad TEXT, cargo TEXT DEFAULT 'Miembro', tipo_sangre TEXT, cartillas TEXT, especialidades TEXT, estado TEXT DEFAULT 'activo'
);

-- 7. TABLAS LMS Y EVALUACIÓN
CREATE TABLE IF NOT EXISTS public.examenes (
    id TEXT PRIMARY KEY,
    id_curso TEXT DEFAULT 'general',
    titulo TEXT,
    descripcion TEXT,
    duracion_min INTEGER DEFAULT 30,
    preguntas JSONB DEFAULT '[]'::jsonb,
    cantidadpreguntas INTEGER DEFAULT 0,
    activo BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.respuestas_examenes (
    id TEXT PRIMARY KEY,
    examen_id TEXT,
    alumno_documento TEXT,
    alumno_nombre TEXT,
    calificacion NUMERIC DEFAULT 0,
    respuestas JSONB DEFAULT '{}'::jsonb,
    intento INTEGER DEFAULT 1,
    estado TEXT DEFAULT 'aprobado',
    fecha_rendido TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS público para lectura/escritura anónima
ALTER TABLE public.alumnos_identidades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cronograma_predicadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.libros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pedidos_libros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interesados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anuncios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.eventos_iglesia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bd_aventureros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bd_conquistadores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bd_guias_mayores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.examenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.respuestas_examenes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Acceso total alumnos" ON public.alumnos_identidades FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total cronograma" ON public.cronograma_predicadores FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total libros" ON public.libros FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total pedidos" ON public.pedidos_libros FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total interesados" ON public.interesados FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total anuncios" ON public.anuncios FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total eventos" ON public.eventos_iglesia FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total aventureros" ON public.bd_aventureros FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total conquistadores" ON public.bd_conquistadores FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total guias" ON public.bd_guias_mayores FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total examenes" ON public.examenes FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Acceso total respuestas" ON public.respuestas_examenes FOR ALL TO anon USING (true) WITH CHECK (true);
</pre>
                    </div>
                </div>
            ` : ''}

        </div>
    </div>
    `;
}

async function probarConexionBaseDatosUI(silencioso) {
    const icono = document.getElementById('iconoRefrescarTest');
    if (icono) icono.classList.add('fa-spin');

    const badge = document.getElementById('badgeEstadoSupabase');
    const diagnostico = document.getElementById('textoDiagnosticoBD');

    if (badge) {
        badge.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verificando conexión...';
        badge.style.color = '#d97706';
    }

    if (window.testSupabaseConnection) {
        const res = await window.testSupabaseConnection();

        if (icono) icono.classList.remove('fa-spin');

        if (res.ok) {
            if (badge) {
                badge.innerHTML = '🟢 Conectado a la Nube (Supabase Live)';
                badge.style.color = '#2e7d32';
                badge.style.background = '#2e7d3215';
                badge.style.borderColor = '#2e7d3240';
            }
            if (diagnostico) {
                diagnostico.innerHTML = `<span style="color: #2e7d32; font-weight: 700;">✅ ${res.message}</span>`;
            }
        } else {
            if (badge) {
                if (res.code === '401_UNAUTHORIZED') {
                    badge.innerHTML = '⚠️ Clave Anon Inválida / Expirada';
                    badge.style.color = '#d97706';
                } else {
                    badge.innerHTML = '🔴 Desconectado (Modo Local Seguro)';
                    badge.style.color = '#e53935';
                }
            }
            if (diagnostico) {
                diagnostico.innerHTML = `<span style="color: #e53935; font-weight: 600;">⚠️ ${res.message}</span><br><small style="color:#64748b;">(La aplicación continúa operando con persistencia local de forma automática).</small>`;
            }
        }

        if (!silencioso && window.mostrarAlertaAdmin) {
            if (res.ok) {
                mostrarAlertaAdmin('✅ ¡Conexión con Supabase verificada exitosamente!');
            } else {
                mostrarAlertaAdmin(`⚠️ Nota de conexión: ${res.message}\n\nIngresa una URL y Clave Anon válidas en la pestaña "Conexión & Credenciales".`);
            }
        }
    }
}

async function guardarCredencialesSupabaseUI() {
    const inputUrl = document.getElementById('inputSupabaseUrlUI');
    const inputKey = document.getElementById('inputSupabaseKeyUI');

    if (!inputUrl || !inputKey) return;

    const url = inputUrl.value.trim();
    const key = inputKey.value.trim();

    if (!url || !url.startsWith('http')) {
        alert('Por favor ingresa una URL válida de Supabase (ej: https://xyz.supabase.co)');
        return;
    }
    if (!key || key.length < 20) {
        alert('Por favor ingresa una clave Anon Key válida.');
        return;
    }

    if (window.setSupabaseCredentials) {
        const res = await window.setSupabaseCredentials(url, key);
        renderizarModalBaseDatos();
        probarConexionBaseDatosUI();
        if (res.ok) {
            alert('✅ Credenciales guardadas y conexión exitosa con Supabase.');
        } else {
            alert(`⚠️ Credenciales guardadas. Nota: ${res.message}`);
        }
    }
}

async function restablecerCredencialesSupabaseUI() {
    if (confirm('¿Restablecer las credenciales de Supabase a los valores por defecto del proyecto?')) {
        if (window.resetSupabaseCredentials) {
            await window.resetSupabaseCredentials();
            renderizarModalBaseDatos();
            probarConexionBaseDatosUI();
        }
    }
}

async function sincronizarBaseDatosUI() {
    const btn = document.getElementById('btnIniciarSync');
    const contenedorProgreso = document.getElementById('progresoSyncContenedor');
    const textoProgreso = document.getElementById('textoProgresoSync');
    const porcentajeProgreso = document.getElementById('porcentajeProgresoSync');
    const barra = document.getElementById('barraProgresoSync');

    if (btn) btn.disabled = true;
    if (contenedorProgreso) contenedorProgreso.style.display = 'block';

    if (window.sincronizarTodoASupabase) {
        const res = await window.sincronizarTodoASupabase(function(actual, total, tabla) {
            const pct = Math.round((actual / total) * 100);
            if (textoProgreso) textoProgreso.textContent = `Sincronizando ${tabla} (${actual}/${total})...`;
            if (porcentajeProgreso) porcentajeProgreso.textContent = `${pct}%`;
            if (barra) barra.style.width = `${pct}%`;
        });

        if (btn) btn.disabled = false;
        if (textoProgreso) textoProgreso.textContent = res.message;
        if (porcentajeProgreso) porcentajeProgreso.textContent = '100%';
        if (barra) barra.style.width = '100%';

        if (window.mostrarAlertaAdmin) {
            mostrarAlertaAdmin(`✅ ${res.message}`);
        } else {
            alert(res.message);
        }
    }
}

function copiarSQLSupabaseUI() {
    const pre = document.getElementById('codigoSQLEditor');
    const btn = document.getElementById('btnCopiarSQL');
    if (!pre) return;

    const texto = pre.innerText || pre.textContent;
    navigator.clipboard.writeText(texto).then(function() {
        if (btn) {
            btn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
            btn.style.background = '#2e7d32';
            setTimeout(function() {
                btn.innerHTML = '<i class="fas fa-copy"></i> Copiar Todo el SQL';
                btn.style.background = '#0b2b4f';
            }, 2500);
        }
    }).catch(function() {
        alert('No se pudo copiar automáticamente. Por favor selecciona el texto y presiona Ctrl+C.');
    });
}

function descargarRespaldoJSON() {
    const keys = Object.keys(window.KEY_TO_TABLE || {});
    const respaldo = {
        fechaExportacion: new Date().toISOString(),
        version: '1.0',
        iglesia: 'IASD Belén',
        datos: {}
    };

    keys.forEach(k => {
        try {
            const raw = localStorage.getItem(k);
            if (raw) respaldo.datos[k] = JSON.parse(raw);
        } catch(e){}
    });

    const blob = new Blob([JSON.stringify(respaldo, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `respaldo_iasd_belen_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}

// Exportar funciones del módulo de base de datos a window
window.abrirModalBaseDatos = abrirModalBaseDatos;
window.cerrarModalBaseDatos = cerrarModalBaseDatos;
window.cambiarTabBaseDatos = cambiarTabBaseDatos;
window.renderizarModalBaseDatos = renderizarModalBaseDatos;
window.probarConexionBaseDatosUI = probarConexionBaseDatosUI;
window.guardarCredencialesSupabaseUI = guardarCredencialesSupabaseUI;
window.restablecerCredencialesSupabaseUI = restablecerCredencialesSupabaseUI;
window.sincronizarBaseDatosUI = sincronizarBaseDatosUI;
window.copiarSQLSupabaseUI = copiarSQLSupabaseUI;
window.descargarRespaldoJSON = descargarRespaldoJSON;



