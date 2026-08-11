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
    'miercoles-testimonio': { titulo: 'Miércoles de Testimonio', nivel: 2 }
};

function showPage(pageId) {
    // 1. Ocultar todas las páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    // 2. Mostrar la página seleccionada si existe
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        console.warn(`⚠️ Página "${pageId}" no encontrada`);
        return;
    }

    // 3. Actualizar título de la página
    const titulo = PAGINAS[pageId]?.titulo || 'IASD Belén';
    document.title = `${titulo} · IASD Belén`;

    // 4. Actualizar estados activos en navbar
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        // Buscar el botón que tiene el onclick correspondiente
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${pageId}'`)) {
            btn.classList.add('active');
        }
    });

    // 5. Cerrar menú móvil y dropdowns si están abiertos
    cerrarMenuMovilYDropdowns();

    // 6. Ocultar mensaje de acceso denegado si existe
    const mensaje = document.getElementById('mensajeAccesoDenegado');
    if (mensaje) mensaje.style.display = 'none';

    // 7. Reinicializar calendarios si se navega a páginas con calendario
    if (typeof CalendarManager !== 'undefined') {
        if (pageId === 'calendario') {
            CalendarManager.render('general');
        } else if (['aventureros', 'conquistadores', 'guias'].includes(pageId)) {
            CalendarManager.render(pageId);
        }
    }

    // 8. Renderizar cronograma público / actividades
    if (pageId === 'cronograma' && typeof window.renderizarCronogramaPublico === 'function') {
        window.renderizarCronogramaPublico();
    } else if (['culto', 'canto', 'escuela-sabatica', 'minuto-misionero', 'sociedad-jovenes', 'lunes-oracion', 'miercoles-testimonio'].includes(pageId) && typeof window.renderizarActividadPublica === 'function') {
        window.renderizarActividadPublica(pageId);
    }

    console.log(`📄 Página mostrada: ${pageId} - ${titulo}`);
}

function cerrarMenuMovilYDropdowns() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) navLinks.classList.remove('open');
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.dropdown-menu li').forEach(li => li.classList.remove('open'));
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

// Configuración de interacción para desplegables en móviles
document.addEventListener('DOMContentLoaded', function () {
    // Escuchar clic en botones principales de dropdown en móviles
    const dropdownBtns = document.querySelectorAll('.dropdown > .nav-btn');
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                const parentDropdown = this.closest('.dropdown');
                if (parentDropdown) {
                    const isAlreadyOpen = parentDropdown.classList.contains('open');
                    // Cerrar otros dropdowns de primer nivel
                    document.querySelectorAll('.dropdown').forEach(d => {
                        if (d !== parentDropdown) d.classList.remove('open');
                    });
                    parentDropdown.classList.toggle('open', !isAlreadyOpen);
                }
            }
        });
    });

    // Escuchar clic en enlaces con submenús anidados (ej. Grupos pequeños, Culto) en móviles
    const nestedSubmenuLinks = document.querySelectorAll('.dropdown-menu li > a');
    nestedSubmenuLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const parentLi = this.parentElement;
            const subList = parentLi.querySelector('ul');
            if (window.innerWidth <= 768 && subList) {
                e.preventDefault();
                e.stopPropagation();
                const isSubOpen = parentLi.classList.contains('open');
                // Cerrar otros submenús hermanos
                if (parentLi.parentElement) {
                    parentLi.parentElement.querySelectorAll('li').forEach(li => {
                        if (li !== parentLi) li.classList.remove('open');
                    });
                }
                parentLi.classList.toggle('open', !isSubOpen);
            }
        });
    });
});

// Exportar funciones
window.showPage = showPage;
window.toggleMobileMenu = toggleMobileMenu;
window.cerrarMenuMovilYDropdowns = cerrarMenuMovilYDropdowns;
window.PAGINAS = PAGINAS;

console.log('✅ Router.js cargado correctamente');