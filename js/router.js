/* ========================================
   ENRUTADOR Y NAVEGACIÓN (ROUTER)
   IASD Belén · Iglesia Adventista
   ======================================== */

// Definición de páginas con sus títulos
const PAGINAS = {
    // Página principal
    home: { titulo: 'Inicio', nivel: 1 },

    // Secciones públicas (nivel 1 - Visitante)
    creencias: { titulo: 'Las 28 Creencias Fundamentales', nivel: 1 },
    doctrinas: { titulo: 'Las 6 Doctrinas Fundamentales', nivel: 1 },
    diezmo: { titulo: 'Diezmos y Ofrendas', nivel: 1 },
    anuncios: { titulo: 'Anuncios Especiales', nivel: 1 },
    visitantes: { titulo: '¿Quiénes son los adventistas del 7° día?', nivel: 1 },
    historia: { titulo: 'Historia de la IASD', nivel: 1 },
    estructura: { titulo: 'Estructura Organizacional', nivel: 1 },
    cronograma: { titulo: 'Cronograma de la Iglesia', nivel: 1 },

    // Secciones de clubes (públicas pero con contenido restringido)
    clubes: { titulo: 'Clubes de la Iglesia', nivel: 1 },
    aventureros: { titulo: 'Club de Aventureros', nivel: 2 },
    conquistadores: { titulo: 'Club de Conquistadores', nivel: 2 },
    guias: { titulo: 'Guías Mayores', nivel: 2 },

    // Secciones para miembros (nivel 2 - Miembro)
    calendario: { titulo: 'Calendario de Eventos', nivel: 2 },
    culto: { titulo: 'Culto Divino', nivel: 2 },
    canto: { titulo: 'Canto y Alabanza', nivel: 2 },
    'escuela-sabatica': { titulo: 'Escuela Sabática', nivel: 2 },
    'minuto-misionero': { titulo: 'Minuto Misionero', nivel: 2 },
    'sociedad-jovenes': { titulo: 'Sociedad de Jóvenes', nivel: 2 },
    'lunes-oracion': { titulo: 'Lunes de Oración', nivel: 2 },
    'miercoles-testimonio': { titulo: 'Miércoles de Testimonio', nivel: 2 },
    salud: { titulo: 'Salud y Bienestar (NEWSTART)', nivel: 1 },
    planlectura: { titulo: 'Plan de Lectura Bíblica', nivel: 1 }
};

// Estado para controlar la página activa actualmente
let _currentPageId = 'home';

// Control de barra de progreso superior
function triggerPageProgressBar() {
    let bar = document.getElementById('pageProgressBar');
    if (!bar) {
        bar = document.createElement('div');
        bar.id = 'pageProgressBar';
        document.body.prepend(bar);
    }
    bar.classList.add('animating');
    bar.style.width = '0%';
    bar.style.opacity = '1';

    // Rápido avance a 65%
    setTimeout(() => {
        bar.style.width = '68%';
    }, 40);

    // Completar a 100% y desvanecer
    setTimeout(() => {
        bar.style.width = '100%';
        setTimeout(() => {
            bar.style.opacity = '0';
            setTimeout(() => {
                bar.classList.remove('animating');
                bar.style.width = '0%';
            }, 300);
        }, 220);
    }, 280);
}

function showPage(pageId) {
    // Prevenir apertura de URLs externas a través de showPage
    if (pageId && (pageId.startsWith('http://') || pageId.startsWith('https://'))) {
        window.open(pageId, '_blank');
        return;
    }

    const pages = document.querySelectorAll('.page');
    const targetPage = document.getElementById(pageId);

    if (!targetPage) {
        console.warn(`⚠️ Página "${pageId}" no encontrada`);
        return;
    }

    // Iniciar barra de progreso
    triggerPageProgressBar();

    const currentActive = document.querySelector('.page.active');

    if (currentActive && currentActive !== targetPage) {
        // Salida suave con clase page-exit
        currentActive.classList.add('page-exit');

        setTimeout(() => {
            pages.forEach(p => {
                p.classList.remove('active');
                p.classList.remove('page-exit');
            });

            targetPage.classList.add('active');
            _currentPageId = pageId;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            _afterShowPage(pageId);
        }, 170);
    } else {
        // Re-activar si es la misma página o carga inicial
        pages.forEach(p => {
            p.classList.remove('active');
            p.classList.remove('page-exit');
        });

        // Forzar reflow para reiniciar animación
        void targetPage.offsetWidth;
        targetPage.classList.add('active');
        _currentPageId = pageId;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        _afterShowPage(pageId);
    }
}

function _afterShowPage(pageId) {
    // Actualizar título de la página
    const titulo = PAGINAS[pageId]?.titulo || 'IASD Belén';
    document.title = `${titulo} · IASD Belén`;

    // Actualizar estados activos en navbar
    const navButtons = document.querySelectorAll('.nav-btn, .nav-links a[data-page]');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        const pageAttr = btn.getAttribute('data-page');
        const cspClick = btn.getAttribute('data-csp-click') || btn.getAttribute('onclick') || '';
        if (pageAttr === pageId || cspClick.includes(`'${pageId}'`)) {
            btn.classList.add('active');
        }
    });

    // Cerrar menú móvil y dropdowns
    cerrarMenuMovilYDropdowns();

    // Ocultar mensaje de acceso denegado si existe
    const mensaje = document.getElementById('mensajeAccesoDenegado');
    if (mensaje) mensaje.style.display = 'none';

    // Reinicializar calendarios
    if (typeof CalendarManager !== 'undefined') {
        if (pageId === 'calendario') {
            CalendarManager.render('general');
        } else if (['aventureros', 'conquistadores', 'guias'].includes(pageId)) {
            CalendarManager.render(pageId);
        }
    }

    // Renderizar cronograma público / actividades
    if (pageId === 'cronograma' && typeof window.renderizarCronogramaPublico === 'function') {
        window.renderizarCronogramaPublico();
    } else if (['culto', 'canto', 'escuela-sabatica', 'minuto-misionero', 'sociedad-jovenes', 'lunes-oracion', 'miercoles-testimonio'].includes(pageId) && typeof window.renderizarActividadPublica === 'function') {
        window.renderizarActividadPublica(pageId);
    }

    // Activar animaciones de uniformes al navegar a clubes
    if (['aventureros', 'conquistadores', 'guias'].includes(pageId) && typeof window.inicializarAnimacionesUniformes === 'function') {
        setTimeout(window.inicializarAnimacionesUniformes, 60);
    }

    // Inicializar o refrescar creencias al navegar a 'creencias'
    if (pageId === 'creencias' && typeof CreenciasManager !== 'undefined') {
        CreenciasManager.init();
        CreenciasManager.applyFilters();
    }

    // Disparar evento de cambio de página
    window.dispatchEvent(new CustomEvent('pageChanged', { detail: { pageId } }));

    console.log(`📄 Página mostrada: ${pageId} - ${PAGINAS[pageId]?.titulo || ''}`);
}

function cerrarMenuMovilYDropdowns() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('open');
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.dropdown-menu li, .has-submenu').forEach(li => li.classList.remove('open'));
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        const isOpening = !navLinks.classList.contains('open');
        if (!isOpening) {
            cerrarMenuMovilYDropdowns();
        } else {
            navLinks.classList.add('open');
        }
    }
}

// Configuración de interacción y delegación para navegación y desplegables
(function setupNavigationListeners() {
    function isMobileView() {
        return window.innerWidth <= 768 || window.matchMedia('(max-width: 768px)').matches;
    }

    document.addEventListener('click', function (e) {
        // 1. Botón de menú hamburguesa
        const toggleBtn = e.target.closest('#mobileMenuToggle, .mobile-menu-toggle');
        if (toggleBtn) {
            e.preventDefault();
            e.stopPropagation();
            toggleMobileMenu();
            return;
        }

        // 2. Clic en desplegables de primer nivel (Creencias, ¿Quiénes somos?, Clubes, Cronograma)
        const dropdownBtn = e.target.closest('.dropdown > .nav-btn, .dropdown > .dropdown-trigger, .dropdown-trigger');
        if (dropdownBtn) {
            const parentDropdown = dropdownBtn.closest('.dropdown');
            if (parentDropdown && isMobileView()) {
                e.preventDefault();
                e.stopPropagation();
                const wasOpen = parentDropdown.classList.contains('open');

                // Cerrar otros dropdowns hermanos
                document.querySelectorAll('.dropdown').forEach(d => {
                    if (d !== parentDropdown) {
                        d.classList.remove('open');
                        d.querySelectorAll('.has-submenu').forEach(sub => sub.classList.remove('open'));
                    }
                });

                parentDropdown.classList.toggle('open', !wasOpen);
                return;
            }
        }

        // 3. Clic en submenús anidados (ej. Culto, Grupos Pequeños)
        const submenuToggle = e.target.closest('.submenu-toggle, .has-submenu > a');
        if (submenuToggle) {
            const parentLi = submenuToggle.closest('.has-submenu') || submenuToggle.parentElement;
            if (parentLi && isMobileView()) {
                e.preventDefault();
                e.stopPropagation();
                const wasSubOpen = parentLi.classList.contains('open');

                // Cerrar otros submenús en el mismo nivel
                if (parentLi.parentElement) {
                    parentLi.parentElement.querySelectorAll('.has-submenu').forEach(sub => {
                        if (sub !== parentLi) sub.classList.remove('open');
                    });
                }

                parentLi.classList.toggle('open', !wasSubOpen);
                return;
            }
        }

        // 4. Clic en enlaces de página con data-page o dentro del navbar
        const pageLink = e.target.closest('#navLinks a[data-page], #navLinks button[data-page], .navbar [data-page]');
        if (pageLink && !pageLink.classList.contains('dropdown-trigger') && !pageLink.closest('.dropdown-trigger')) {
            const targetPageId = pageLink.getAttribute('data-page');
            if (targetPageId) {
                e.preventDefault();
                showPage(targetPageId);
                return;
            }
        }

        // 5. Clic fuera del menú en móviles para cerrar automáticamente
        const navPrincipal = document.getElementById('navPrincipal') || document.querySelector('.navbar-wrapper');
        const navLinks = document.getElementById('navLinks');
        if (navLinks && navLinks.classList.contains('open') && isMobileView()) {
            if (navPrincipal && !navPrincipal.contains(e.target)) {
                cerrarMenuMovilYDropdowns();
            }
        }
    });

    // Cerrar al cambiar el tamaño de pantalla a escritorio
    window.addEventListener('resize', function () {
        if (!isMobileView()) {
            const navLinks = document.getElementById('navLinks');
            if (navLinks && navLinks.classList.contains('open')) {
                cerrarMenuMovilYDropdowns();
            }
        }
    });
})();

// Exportar funciones
window.showPage = showPage;
window.toggleMobileMenu = toggleMobileMenu;
window.cerrarMenuMovilYDropdowns = cerrarMenuMovilYDropdowns;
window.PAGINAS = PAGINAS;

console.log('✅ Router.js cargado correctamente');