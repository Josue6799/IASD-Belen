/* ========================================
   APLICACIÓN PRINCIPAL (APP ENTRYPOINT)
   IASD Belén · Iglesia Adventista
   ======================================== */

// ========== SISTEMA DE AUTENTICACIÓN ==========

// Usuarios del sistema (credenciales)
const USUARIOS = {
    'miembro': {
        password: 'belen2026',
        nivel: 2,
        nombre: 'Miembro'
    },
    'club': {
        password: 'clubbelen2026',
        nivel: 3,
        nombre: 'Club'
    },
    'admin': {
        password: 'adminbelen2026',
        nivel: 4,
        nombre: 'Administrador'
    }
};

// Estado de la sesión
let session = {
    usuario: null,
    nivel: 1,
    nombre: 'Visitante'
};

/**
 * Inicia sesión con usuario y contraseña
 */
function login() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    if (!usernameInput || !passwordInput) {
        console.warn('⚠️ Formulario de login no encontrado');
        return;
    }

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (!username || !password) {
        alert('⚠️ Por favor ingrese usuario y contraseña');
        return;
    }

    const user = USUARIOS[username];

    if (user && user.password === password) {
        // Login exitoso
        session.usuario = username;
        session.nivel = user.nivel;
        session.nombre = user.nombre;

        // Guardar en localStorage
        localStorage.setItem('iasd_session', JSON.stringify({
            usuario: username,
            nivel: user.nivel,
            nombre: user.nombre
        }));

        // Actualizar interfaz
        actualizarUI();

        // Mostrar mensaje de bienvenida
        alert(`✅ ¡Bienvenido ${user.nombre}!`);

        // Limpiar campos
        usernameInput.value = '';
        passwordInput.value = '';

        // Mostrar página de inicio
        showPage('home');

        console.log(`✅ Sesión iniciada: ${user.nombre} (Nivel ${user.nivel})`);
    } else {
        alert('❌ Usuario o contraseña incorrectos');
        console.warn('⚠️ Intento de login fallido:', username);
    }
}

/**
 * Cierra sesión
 */
function logout() {
    session.usuario = null;
    session.nivel = 1;
    session.nombre = 'Visitante';

    localStorage.removeItem('iasd_session');

    actualizarUI();

    // Mostrar página de inicio
    showPage('home');

    console.log('🔓 Sesión cerrada');
}

/**
 * Verifica si el usuario tiene acceso a una página
 */
function tieneAcceso(pageId) {
    const nivelRequerido = PAGINAS[pageId]?.nivel || 1;
    return session.nivel >= nivelRequerido;
}

/**
 * Verifica acceso y muestra mensaje si es denegado
 */
function verificarAcceso(pageId) {
    if (!tieneAcceso(pageId)) {
        const mensaje = document.getElementById('mensajeAccesoDenegado');
        if (mensaje) {
            const nivelReq = PAGINAS[pageId]?.nivel || 1;
            mensaje.style.display = 'block';
            mensaje.innerHTML = `⛔ <strong>Acceso denegado</strong><br>Necesitas nivel ${nivelReq} para ver esta sección.<br>Inicia sesión con una cuenta de mayor privilegio.`;
            mensaje.style.background = '#fef2f2';
            mensaje.style.color = '#991b1b';
            mensaje.style.padding = '1rem';
            mensaje.style.borderRadius = '1rem';
            mensaje.style.border = '2px solid #dc2626';
            mensaje.style.margin = '1rem auto';
            mensaje.style.maxWidth = '500px';
            mensaje.style.textAlign = 'center';
        }
        showPage('home');
        return false;
    }
    return true;
}

// ========== INTERFAZ DE USUARIO ==========

/**
 * Actualiza la UI según la sesión actual
 */
function actualizarUI() {
    const indicador = document.getElementById('indicadorNivel');
    const btnLogout = document.getElementById('btnLogout');
    const loginForm = document.getElementById('loginForm');
    const loginToggle = document.getElementById('loginToggle');

    if (indicador) {
        if (session.nivel > 1) {
            indicador.style.display = 'inline-block';
            indicador.textContent = `👤 ${session.nombre} (Nivel ${session.nivel})`;
            indicador.style.background = session.nivel === 4 ? '#c9a53b' :
                session.nivel === 3 ? '#2e7d32' :
                    session.nivel === 2 ? '#1565c0' : 'transparent';
            indicador.style.color = 'white';
            indicador.style.padding = '0.3rem 1rem';
            indicador.style.borderRadius = '2rem';
            indicador.style.fontWeight = '600';
            indicador.style.fontSize = '0.85rem';
        } else {
            indicador.style.display = 'none';
        }
    }

    if (btnLogout) {
        btnLogout.style.display = session.nivel > 1 ? 'inline-block' : 'none';
    }

    if (loginForm) {
        loginForm.style.display = session.nivel === 1 ? 'block' : 'none';
    }

    if (loginToggle) {
        loginToggle.style.display = session.nivel === 1 ? 'inline-block' : 'none';
    }

    document.querySelectorAll('[data-nivel]').forEach(el => {
        const nivelReq = parseInt(el.dataset.nivel);
        el.style.display = session.nivel >= nivelReq ? 'block' : 'none';
    });
}

/**
 * Alterna visibilidad del formulario de login
 */
function toggleLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const isHidden = loginForm.style.display === 'none' || loginForm.style.display === '';
        loginForm.style.display = isHidden ? 'block' : 'none';
    }
}

/**
 * Restaura sesión desde localStorage
 */
function restaurarSesion() {
    const saved = localStorage.getItem('iasd_session');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            const user = USUARIOS[data.usuario];
            if (user) {
                session.usuario = data.usuario;
                session.nivel = user.nivel;
                session.nombre = user.nombre;
                console.log(`🔁 Sesión restaurada: ${session.nombre}`);
            } else {
                localStorage.removeItem('iasd_session');
            }
        } catch (e) {
            localStorage.removeItem('iasd_session');
        }
    }
    actualizarUI();
}

// ========== INICIALIZACIÓN ==========

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando IASD Belén Web App...');

    restaurarSesion();

    document.querySelectorAll('#loginForm input').forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                login();
            }
        });
    });

    const btnLogin = document.getElementById('btnLogin');
    if (btnLogin) {
        btnLogin.addEventListener('click', login);
    }

    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', logout);
    }

    const loginToggle = document.getElementById('loginToggle');
    if (loginToggle) {
        loginToggle.addEventListener('click', toggleLogin);
    }

    if (typeof EncuestaManager !== 'undefined' && EncuestaManager.render) {
        EncuestaManager.render();
    }

    if (typeof CalendarManager !== 'undefined' && CalendarManager.initAll) {
        CalendarManager.initAll();
    }

    if (typeof CreenciasManager !== 'undefined' && CreenciasManager.initSearch) {
        CreenciasManager.initSearch();
    }

    const modal = document.getElementById('modalEvento');
    const btnCerrar = document.getElementById('btnCerrarModal');
    const btnCancelar = document.getElementById('btnCancelarModal');
    const btnGuardar = document.getElementById('btnGuardarModal');
    const inputNombre = document.getElementById('modalEventoNombre');

    const cerrarModal = () => {
        if (modal) modal.classList.remove('active');
    };

    if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
    if (btnCancelar) btnCancelar.addEventListener('click', cerrarModal);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModal();
        });
    }

    if (btnGuardar && inputNombre) {
        btnGuardar.addEventListener('click', () => {
            const nombre = inputNombre.value.trim();
            const calendarType = modal?.dataset?.calendarType || 'general';

            if (!nombre) {
                alert('⚠️ Por favor ingrese el nombre del evento.');
                return;
            }

            if (typeof CalendarManager !== 'undefined' && CalendarManager.guardarNuevoEvento) {
                CalendarManager.guardarNuevoEvento(calendarType, nombre);
            }
            cerrarModal();
        });

        inputNombre.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                btnGuardar.click();
            }
        });
    }

    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1) || 'home';
        showPage(hash);
    });

    const hash = window.location.hash.substring(1) || 'home';
    showPage(hash);

    console.log('✅ IASD Belén Web App inicializada correctamente');
});

// Exportar funciones globales
window.login = login;
window.logout = logout;
window.tieneAcceso = tieneAcceso;
window.toggleLogin = toggleLogin;
window.actualizarUI = actualizarUI;

console.log('✅ App.js cargado correctamente');

// ========================================
// MODAL DE CONTACTO
// ========================================

function abrirModal() {
    const modal = document.getElementById('modalContacto');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarModal() {
    const modal = document.getElementById('modalContacto');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('click', function (event) {
    const modal = document.getElementById('modalContacto');
    if (modal && event.target === modal) {
        cerrarModal();
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        cerrarModal();
    }
});

function enviarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById('modalNombre').value.trim();
    const whatsapp = document.getElementById('modalWhatsapp').value.trim();
    const email = document.getElementById('modalEmail').value.trim();

    if (!nombre || !whatsapp || !email) {
        alert('⚠️ Por favor completa todos los campos.');
        return;
    }

    alert('✅ ¡Gracias por contactarnos! Un asesor se comunicará contigo pronto.');

    document.getElementById('modalNombre').value = '';
    document.getElementById('modalWhatsapp').value = '';
    document.getElementById('modalEmail').value = '';

    cerrarModal();
}

window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;
window.enviarFormulario = enviarFormulario;

console.log('✅ Modal de contacto cargado correctamente');

// ========================================
// SISTEMA DE GALERÍA DE FOTOS (SOLO ADMIN)
// ========================================

let galeriaFotos = [];

function cargarGaleria() {
    const saved = localStorage.getItem('galeria_fotos');
    if (saved) {
        try {
            galeriaFotos = JSON.parse(saved);
        } catch (e) {
            galeriaFotos = [];
        }
    }
    renderGaleria();
}

function renderGaleria() {
    const container = document.getElementById('galeriaContainer');
    if (!container) return;

    if (galeriaFotos.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--muted-text); grid-column: 1 / -1;">
                <i class="fas fa-images" style="font-size: 3rem; display: block; margin-bottom: 1rem;"></i>
                <p>No hay fotos en la galería. Agrega la primera foto.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = galeriaFotos.map((foto, index) => `
        <div style="background: var(--pure-white); border-radius: 1.5rem; overflow: hidden; box-shadow: var(--shadow-sm); border: 1px solid rgba(201,157,59,0.1);">
            <img src="${foto.imagen}" alt="${foto.titulo}" style="width: 100%; height: 200px; object-fit: cover;" />
            <div style="padding: 1rem;">
                <h4 style="color: var(--deep-blue); margin-bottom: 0.3rem;">${foto.titulo}</h4>
                <p style="color: var(--dark-text); font-size: 0.9rem;">${foto.descripcion}</p>
                <p style="color: var(--muted-text); font-size: 0.75rem; margin-top: 0.5rem;">
                    <i class="far fa-calendar-alt"></i> ${foto.fecha || 'Fecha no especificada'}
                </p>
                ${session.nivel === 4 ? `
                    <button onclick="eliminarFoto(${index})" class="btn btn-danger btn-sm" style="margin-top: 0.5rem;">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                ` : ''}
            </div>
        </div>
    `).join('');
}

function agregarFoto() {
    if (session.nivel !== 4) {
        alert('⛔ Solo el administrador puede agregar fotos.');
        return;
    }

    const titulo = document.getElementById('inputFotoTitulo');
    const descripcion = document.getElementById('inputFotoDescripcion');
    const imagenInput = document.getElementById('inputFotoImagen');

    if (!titulo || !descripcion || !imagenInput) {
        alert('⚠️ No se encontraron los campos del formulario.');
        return;
    }

    const tituloValue = titulo.value.trim();
    const descripcionValue = descripcion.value.trim();

    if (!tituloValue || !descripcionValue || !imagenInput.files[0]) {
        alert('⚠️ Por favor completa todos los campos y selecciona una imagen.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
        const nuevaFoto = {
            id: Date.now(),
            titulo: tituloValue,
            descripcion: descripcionValue,
            imagen: e.target.result,
            fecha: new Date().toLocaleDateString('es-ES'),
            creadoPor: session.usuario || 'admin'
        };

        galeriaFotos.unshift(nuevaFoto);
        localStorage.setItem('galeria_fotos', JSON.stringify(galeriaFotos));
        renderGaleria();

        titulo.value = '';
        descripcion.value = '';
        imagenInput.value = '';

        mostrarNotificacionGaleria('✅ Foto agregada correctamente', 'success');
    };
    reader.readAsDataURL(imagenInput.files[0]);
}

function eliminarFoto(index) {
    if (session.nivel !== 4) {
        alert('⛔ Solo el administrador puede eliminar fotos.');
        return;
    }

    if (confirm('¿Estás seguro de eliminar esta foto?')) {
        galeriaFotos.splice(index, 1);
        localStorage.setItem('galeria_fotos', JSON.stringify(galeriaFotos));
        renderGaleria();
        mostrarNotificacionGaleria('🗑️ Foto eliminada', 'info');
    }
}

function toggleFormularioGaleria() {
    if (session.nivel !== 4) {
        alert('⛔ Solo el administrador puede agregar fotos.');
        return;
    }

    const form = document.getElementById('formularioGaleria');
    if (form) {
        const isHidden = form.style.display === 'none' || form.style.display === '';
        form.style.display = isHidden ? 'block' : 'none';
    }
}

function mostrarNotificacionGaleria(mensaje, tipo) {
    tipo = tipo || 'info';
    const existing = document.querySelector('.toast-galeria');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-galeria';
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        padding: 1rem 1.5rem;
        border-radius: 1rem;
        font-weight: 600;
        z-index: 99999;
        animation: fadeInUp 0.5s ease forwards;
        max-width: 400px;
        box-shadow: 0 12px 40px rgba(0,0,0,0.2);
        font-family: 'Inter', sans-serif;
        background: ${tipo === 'success' ? '#2e7d32' : tipo === 'error' ? '#c62828' : '#1565c0'};
        color: white;
    `;
    toast.textContent = mensaje;
    document.body.appendChild(toast);

    setTimeout(function () {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        toast.style.transition = 'all 0.5s ease';
        setTimeout(function () { toast.remove(); }, 500);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function () {
    cargarGaleria();
});

window.cargarGaleria = cargarGaleria;
window.renderGaleria = renderGaleria;
window.agregarFoto = agregarFoto;
window.eliminarFoto = eliminarFoto;
window.toggleFormularioGaleria = toggleFormularioGaleria;
window.mostrarNotificacionGaleria = mostrarNotificacionGaleria;

console.log('✅ Sistema de galería de fotos cargado correctamente');

// ========================================
// SISTEMA DE PROTECCIÓN POR NIVELES (para el dropdown)
// ========================================

function verificarNivelAcceso(pageId) {
    if (window.PAGINAS && PAGINAS[pageId]) {
        const nivelRequerido = PAGINAS[pageId].nivel || 1;
        if (session.nivel < nivelRequerido) {
            const mensaje = document.getElementById('mensajeAccesoDenegado');
            if (mensaje) {
                mensaje.style.display = 'block';
                mensaje.innerHTML = `⛔ <strong>Acceso denegado</strong><br>Esta sección requiere nivel ${nivelRequerido}.<br>Inicia sesión con una cuenta de mayor privilegio.`;
                mensaje.style.background = '#fef2f2';
                mensaje.style.color = '#991b1b';
                mensaje.style.padding = '1rem';
                mensaje.style.borderRadius = '1rem';
                mensaje.style.border = '2px solid #dc2626';
                mensaje.style.margin = '1rem auto';
                mensaje.style.maxWidth = '500px';
                mensaje.style.textAlign = 'center';
            }
            showPage('home');
            return false;
        }
    }
    return true;
}

window.verificarNivelAcceso = verificarNivelAcceso;

console.log('✅ Sistema de protección por niveles actualizado correctamente');

// ========================================
// SCROLL REVEAL - ANIMACIONES AL HACER SCROLL
// ========================================

function initScrollReveal() {
    const elementos = document.querySelectorAll('.scroll-reveal');
    if (elementos.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elementos.forEach(el => observer.observe(el));
}

function resetScrollReveal() {
    document.querySelectorAll('.scroll-reveal.visible').forEach(el => {
        el.classList.remove('visible');
    });

    setTimeout(() => {
        initScrollReveal();
    }, 100);
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
    );
}

function initAllAnimations() {
    initScrollReveal();

    setTimeout(() => {
        document.querySelectorAll('.scroll-reveal:not(.visible)').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }, 200);
}

const originalShowPage = window.showPage;

window.showPage = function (pageId) {
    originalShowPage(pageId);

    setTimeout(() => {
        resetScrollReveal();
        setTimeout(() => {
            initScrollReveal();
            document.querySelectorAll('.scroll-reveal:not(.visible)').forEach(el => {
                if (isElementInViewport(el)) {
                    el.classList.add('visible');
                }
            });
        }, 300);
    }, 200);
};

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(initAllAnimations, 500);
});

window.addEventListener('load', function () {
    setTimeout(initAllAnimations, 300);
});

window.addEventListener('scroll', function () {
    document.querySelectorAll('.scroll-reveal:not(.visible)').forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('visible');
        }
    });
}, { passive: true });

console.log('✅ Scroll Reveal - Animaciones inicializadas correctamente');

// ========================================
// GRUPOS PEQUEÑOS - DATOS Y FUNCIONALIDAD
// ========================================

const GRUPOS_PEQUEÑOS = {
    'unidos_en_verdad': {
        nombre: 'Unidos en Verdad',
        responsable: 'ALEX CABRERA',
        anfitrion: 'ROCIO OSPINO',
        direccion: 'CRA 11 SUR # 71 - 51',
        versiculo: '"Donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos." - Mateo 18:20',
        icono: 'fa-home'
    },
    'mansion_gloriosa': {
        nombre: 'Mansión Gloriosa',
        responsable: 'JOSE CAMPO RAMIREZ',
        anfitrion: 'ANA TORRES',
        direccion: 'CALLE 64 # 5A SUR 36',
        versiculo: '"Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree no se pierda, mas tenga vida eterna" - Juan 3:16',
        icono: 'fa-home'
    },
    'mansion_gloriosa_kid': {
        nombre: 'Mansión Gloriosa Kid',
        responsable: 'SARAY PACHECO',
        anfitrion: 'ANA TORRES',
        direccion: 'CALLE 64 # 5A SUR 36',
        versiculo: '"Dejad a los niños venir a mí, y no se lo impidáis..." - Mateo 19:14',
        icono: 'fa-child'
    },
    'aposento_alto': {
        nombre: 'Aposento Alto',
        responsable: 'LILIANA CASTRO',
        anfitrion: 'LESBIA FUENTE',
        direccion: 'CALLE 51 B # 3A SUR 88',
        versiculo: '"Estad siempre gozosos. Orad sin cesar." - 1 Tesalonicenses 5:16-17',
        icono: 'fa-arrow-up'
    },
    'jehova_jireh': {
        nombre: 'Jehová Jireh',
        responsable: 'MERLIS CONRADO TORRES',
        anfitrion: 'VADITH TORRES',
        direccion: 'CALLE 98C #2D-139 CONJUNTO 5 TORRE 13 GARDENIAS',
        versiculo: '"Por nada estéis afanosos..." - Filipenses 4:6',
        icono: 'fa-cross'
    },
    'maranatha_1': {
        nombre: 'Maranatha 1',
        responsable: 'MARTIN ALVAREZ',
        anfitrion: 'EMILETH',
        direccion: 'CALLE 62 CON CARRERA 1A',
        versiculo: '"Ven, Señor Jesús." - Apocalipsis 22:20',
        icono: 'fa-star'
    },
    'maranatha_2': {
        nombre: 'Maranatha 2',
        responsable: 'YUDIS TORRES',
        anfitrion: 'ROSA PEREZ',
        direccion: 'CRA 7 SUR #51B-167',
        versiculo: '"¡Maranatha! El Señor viene." - 1 Corintios 16:22',
        icono: 'fa-star'
    },
    'ah_de_venir': {
        nombre: 'Ah de Venir',
        responsable: 'MARLIS ALVAREZ',
        anfitrion: 'NEREIDA ORTEGA',
        direccion: 'CALLE 80 # 1B-35',
        versiculo: '"El que da testimonio de estas cosas dice Ciertamente vengo en breve. Amén; sí, ven, Señor Jesús. " - Apocalipsis 22:20',
        icono: 'fa-clock'
    }
};

function mostrarGrupo(grupoId) {
    const grupo = GRUPOS_PEQUEÑOS[grupoId];
    if (!grupo) {
        console.warn('⚠️ Grupo no encontrado:', grupoId);
        return;
    }

    let container = document.getElementById('grupoCardContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'grupoCardContainer';
        container.className = 'grupo-card-container';

        const navbar = document.querySelector('.navbar');
        if (navbar && navbar.parentNode) {
            navbar.parentNode.insertBefore(container, navbar.nextSibling);
        } else {
            document.body.insertBefore(container, document.body.firstChild);
        }
    }

    container.innerHTML = `
        <div class="grupo-card">
            <div class="titulo-grupo">
                <i class="fas ${grupo.icono}"></i>
                ${grupo.nombre}
            </div>
            <div class="info-line">
                <i class="fas fa-user"></i>
                <span><strong>Responsable:</strong> ${grupo.responsable}</span>
            </div>
            <div class="info-line">
                <i class="fas fa-user-friends"></i>
                <span><strong>Anfitrión:</strong> ${grupo.anfitrion}</span>
            </div>
            <div class="info-line">
                <i class="fas fa-map-pin"></i>
                <span><strong>Ubicación:</strong> ${grupo.direccion}</span>
            </div>
            <div class="versiculo">
                <i class="fas fa-bible" style="margin-right: 0.5rem; opacity: 0.6;"></i>
                ${grupo.versiculo}
            </div>
        </div>
    `;

    setTimeout(() => {
        container.classList.add('active');
    }, 50);

    cerrarMenus();

    setTimeout(() => {
        container.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 200);

    console.log(`📋 Mostrando grupo: ${grupo.nombre}`);
}

function cerrarMenus() {
    document.querySelectorAll('.grupos-pequenos-item.open').forEach(el => {
        el.classList.remove('open');
    });

    document.querySelectorAll('.dropdown.open').forEach(el => {
        el.classList.remove('open');
    });
}

function toggleSubmenuGrupos(event) {
    event.stopPropagation();
    const parent = event.currentTarget.closest('.grupos-pequenos-item');
    if (parent) {
        parent.classList.toggle('open');
    }
}

const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
    document.addEventListener('DOMContentLoaded', function () {
        const gruposItem = document.querySelector('.grupos-pequenos-item');
        if (gruposItem) {
            const link = gruposItem.querySelector('a');
            if (link) {
                link.addEventListener('click', toggleSubmenuGrupos);
            }
        }
    });
}

document.addEventListener('click', function (event) {
    const container = document.getElementById('grupoCardContainer');
    if (container && container.classList.contains('active')) {
        const target = event.target;
        const isCardClick = container.contains(target);
        const isMenuClick = target.closest('.dropdown-menu') || target.closest('.grupos-pequenos-item');

        if (!isCardClick && !isMenuClick) {
            container.classList.remove('active');
            setTimeout(() => {
                container.innerHTML = '';
            }, 600);
        }
    }
});

console.log('✅ Grupos pequeños - Sistema cargado correctamente');

// ========================================
// BIBLIOTECA - FUNCIONES DE PRÉSTAMO
// ========================================

function abrirModalPrestamo() {
    const modal = document.getElementById('modalPrestamo');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        const inputs = modal.querySelectorAll('input');
        inputs.forEach(input => input.value = '');
        setTimeout(() => {
            const primerInput = modal.querySelector('input');
            if (primerInput) primerInput.focus();
        }, 300);
    }
}

function cerrarModalPrestamo() {
    const modal = document.getElementById('modalPrestamo');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function abrirModalConfirmacion() {
    const modal = document.getElementById('modalConfirmacion');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarModalConfirmacion() {
    const modal = document.getElementById('modalConfirmacion');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function enviarSolicitud(event) {
    event.preventDefault();

    const nombre = document.getElementById('inputNombreSolicitante').value.trim();
    const telefono = document.getElementById('inputTelefonoSolicitante').value.trim();
    const email = document.getElementById('inputEmailSolicitante').value.trim();
    const libro = document.getElementById('inputTituloLibro').value.trim();

    if (!nombre || !telefono || !email || !libro) {
        alert('⚠️ Por favor completa todos los campos.');
        return;
    }

    cerrarModalPrestamo();

    setTimeout(() => {
        abrirModalConfirmacion();
    }, 400);
}

window.abrirModalPrestamo = abrirModalPrestamo;
window.cerrarModalPrestamo = cerrarModalPrestamo;
window.abrirModalConfirmacion = abrirModalConfirmacion;
window.cerrarModalConfirmacion = cerrarModalConfirmacion;
window.enviarSolicitud = enviarSolicitud;

console.log('✅ Biblioteca - Funciones de préstamo cargadas correctamente');

// ========================================
// SISTEMA DE EVALUACIÓN Y CURSOS - MULTI-MATRÍCULA
// ========================================

// ===== BASE DE DATOS DE EXÁMENES (DUMMY DATA) =====
const DB_EXAMENES = [
    // Cursos originales
    { curso: "Obra Misionera", titulo: "Módulo 1 - Introducción", fecha: "15/07/2026", nota: "Aprobado", calificacion: 4.5 },
    { curso: "Obra Misionera", titulo: "Módulo 2 - El llamado", fecha: "22/07/2026", nota: "Pendiente", calificacion: null },
    { curso: "Profecía", titulo: "Módulo 1 - Daniel", fecha: "10/07/2026", nota: "5.0", calificacion: 5.0 },
    { curso: "Profecía", titulo: "Módulo 2 - Apocalipsis", fecha: "17/07/2026", nota: "4.0", calificacion: 4.0 },
    { curso: "Predica", titulo: "Módulo 1 - Oratoria", fecha: "05/07/2026", nota: "4.5", calificacion: 4.5 },
    { curso: "Predica", titulo: "Módulo 2 - Estructura", fecha: "12/07/2026", nota: "Pendiente", calificacion: null },
    // Nuevos cursos - Aventureros
    { curso: "Aventureros", titulo: "Especialidad de Nudos", fecha: "01/09/2026", nota: "Aprobado", calificacion: 4.5 },
    { curso: "Aventureros", titulo: "Cuidado de la Naturaleza", fecha: "08/09/2026", nota: "Pendiente", calificacion: null },
    // Nuevos cursos - Conquistadores
    { curso: "Conquistadores", titulo: "Clase de Liderazgo", fecha: "05/09/2026", nota: "Pendiente", calificacion: null },
    { curso: "Conquistadores", titulo: "Primeros Auxilios", fecha: "12/09/2026", nota: "Aprobado", calificacion: 4.8 },
    // Nuevos cursos - Guías Mayores
    { curso: "Guías Mayores", titulo: "Técnicas de Campamento", fecha: "10/09/2026", nota: "Pendiente", calificacion: null },
    { curso: "Guías Mayores", titulo: "Liderazgo Juvenil", fecha: "17/09/2026", nota: "Aprobado", calificacion: 5.0 }
];

// ===== DATOS DE CURSOS (PLAN DE ESTUDIOS) =====
const CURSOS_DATA = {
    'Obra Misionera': {
        icono: '🕊️',
        descripcion: 'Aprende a compartir tu fe y llevar el mensaje de esperanza a otros.',
        temas: [
            'Introducción a la Obra Misionera',
            'El llamado de Dios',
            'Preparación espiritual',
            'Métodos de evangelismo',
            'Testimonio personal'
        ],
        ayudas: '📖 Material de estudio: El evangelismo de Elena G. de White'
    },
    'Profecía': {
        icono: '📖',
        descripcion: 'Estudia las profecías bíblicas y su cumplimiento en la historia.',
        temas: [
            'Introducción a la Profecía',
            'Daniel y el tiempo del fin',
            'Apocalipsis y el conflicto cósmico',
            'Las 70 semanas y los 2300 días',
            'El mensaje de los tres ángeles'
        ],
        ayudas: '📖 Material de estudio: El conflicto de los siglos'
    },
    'Predica': {
        icono: '🎤',
        descripcion: 'Desarrolla tus habilidades de oratoria y comunicación efectiva.',
        temas: [
            'Introducción a la Predicación',
            'La estructura del sermón',
            'El arte de contar historias',
            'Uso de ilustraciones',
            'La llamada al altar'
        ],
        ayudas: '📖 Material de estudio: La oratoria sagrada'
    },
    // ===== NUEVOS CURSOS =====
    'Aventureros': {
        icono: '<img src="img/aventureros.png" alt="Aventureros" style="width: 60px; height: auto; object-fit: contain;">',
        descripcion: 'Actividades, valores y aprendizaje para los más pequeños.',
        temas: [
            'Especialidad de nudos',
            'Cuidado de la naturaleza',
            'Valores cristianos',
            'Juegos y dinámicas',
            'Manualidades bíblicas'
        ],
        ayudas: '📖 Material de estudio: Manual del Aventurero.'
    },
    'Conquistadores': {
        icono: '<img src="img/conquistadores.jpg" alt="Conquistadores" style="width: 60px; height: auto; object-fit: contain;">',
        descripcion: 'Campismo, especialidades y servicio para jóvenes de 10 a 15 años.',
        temas: [
            'Clase de liderazgo',
            'Campamento de verano',
            'Especialidad de primeros auxilios',
            'Proyecto de servicio comunitario',
            'Historia del club'
        ],
        ayudas: '📖 Material de estudio: Manual del Conquistador.'
    },
    'Guías Mayores': {
        icono: '<img src="img/guias.png" alt="Guías Mayores" style="width: 60px; height: auto; object-fit: contain;">',
        descripcion: 'Liderazgo espiritual y desarrollo personal para jóvenes de 16 años en adelante.',
        temas: [
            'Técnicas de campamento avanzadas',
            'Liderazgo juvenil',
            'Consejería espiritual',
            'Proyectos de impacto social',
            'Preparación para el liderazgo en la iglesia'
        ],
        ayudas: '📖 Material de estudio: Manual del Guía Mayor.'
    }
};

// ===== FUNCIONES DE ALMACENAMIENTO (multi-matrícula) =====

/**
 * Obtiene la lista de cursos del usuario desde localStorage
 * @returns {Array} Array de nombres de cursos
 */
function obtenerMisCursos() {
    try {
        const data = localStorage.getItem('misCursos');
        return data ? JSON.parse(data) : [];
    } catch (e) {
        return [];
    }
}

/**
 * Guarda la lista de cursos del usuario en localStorage
 * @param {Array} cursos - Array de nombres de cursos
 */
function guardarMisCursos(cursos) {
    localStorage.setItem('misCursos', JSON.stringify(cursos));
}

/**
 * Verifica si el usuario está inscrito en un curso específico
 * @param {string} curso - Nombre del curso
 * @returns {boolean} True si está inscrito
 */
function estaInscrito(curso) {
    return obtenerMisCursos().includes(curso);
}

/**
 * Inscribe al usuario en un curso (si no está ya inscrito)
 * @param {string} curso - Nombre del curso
 * @returns {boolean} True si se inscribió correctamente
 */
function inscribirCurso(curso) {
    const cursos = obtenerMisCursos();
    if (!cursos.includes(curso)) {
        cursos.push(curso);
        guardarMisCursos(cursos);
        return true;
    }
    return false;
}

/**
 * Elimina la inscripción de un curso
 * @param {string} curso - Nombre del curso
 */
function desinscribirCurso(curso) {
    let cursos = obtenerMisCursos();
    cursos = cursos.filter(c => c !== curso);
    guardarMisCursos(cursos);
}

/**
 * Obtiene los exámenes filtrados por los cursos del usuario
 * @returns {Array} Array de exámenes filtrados
 */
function obtenerExamenesFiltrados() {
    const misCursos = obtenerMisCursos();
    if (misCursos.length === 0) return [];
    return DB_EXAMENES.filter(examen => misCursos.includes(examen.curso));
}

/**
 * Obtiene los resultados (notas) filtrados por los cursos del usuario
 * @returns {Array} Array de resultados filtrados
 */
function obtenerResultadosFiltrados() {
    const misCursos = obtenerMisCursos();
    if (misCursos.length === 0) return [];
    return DB_EXAMENES.filter(examen =>
        misCursos.includes(examen.curso) && examen.calificacion !== null
    );
}

// ===== MODAL DE CONTRASEÑA =====
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

// ===== DASHBOARD =====
function abrirDashboard() {
    document.getElementById('dashboardEvaluacion').style.display = 'block';
    document.body.style.overflow = 'hidden';
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

// ===== PESTAÑA PRINCIPAL - Exámenes por Curso (Vista con Tarjetas) =====
function renderizarPrincipal() {
    const container = document.getElementById('contenidoExamenes');
    if (!container) return;

    const misCursos = obtenerMisCursos();

    // Caso 1: No está inscrito en ningún curso
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

    // Construir HTML para cada curso inscrito
    let cursosHTML = '';
    let totalExamenes = 0;

    misCursos.forEach(curso => {
        // Filtrar exámenes de este curso
        const examenesCurso = DB_EXAMENES.filter(ex => ex.curso === curso);
        totalExamenes += examenesCurso.length;

        // Data del curso para icono
        const data = CURSOS_DATA[curso] || { icono: '📚' };

        // Construir lista de exámenes
        let examenesHTML = '';
        if (examenesCurso.length === 0) {
            examenesHTML = `
                <div style="padding: 0.5rem 0; color: var(--muted-text); font-size: 0.85rem; font-style: italic;">
                    No hay exámenes disponibles para este curso aún
                </div>
            `;
        } else {
            examenesHTML = examenesCurso.map(examen => `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0; border-bottom: 1px solid rgba(0,0,0,0.04);">
                    <span style="color: var(--dark-text); font-size: 0.9rem;">
                        <i class="fas fa-file-alt" style="color: var(--golden); margin-right: 0.5rem; font-size: 0.8rem;"></i>
                        ${examen.titulo}
                    </span>
                    <span style="color: var(--muted-text); font-size: 0.8rem;">
                        <i class="far fa-calendar-alt" style="margin-right: 0.3rem;"></i> ${examen.fecha}
                    </span>
                </div>
            `).join('');
        }

        // Tarjeta del curso
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

    // Renderizar todo
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

// ===== PESTAÑA CURSOS =====
function renderizarCursos() {
    const container = document.getElementById('contenidoCursosDinamico');
    if (!container) return;

    const misCursos = obtenerMisCursos();

    if (misCursos.length === 0) {
        // No está inscrito - Mostrar tarjetas de cursos
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

    // Ya está inscrito - Mostrar lista de cursos con botón "Ver Plan"
    container.innerHTML = `
        <h2 style="color: var(--deep-blue); font-size: 1.5rem; margin-bottom: 0.5rem;">Mis Cursos</h2>
        <p style="color: var(--muted-text); margin-bottom: 1.5rem;">Estás inscrito en ${misCursos.length} curso(s)</p>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            ${misCursos.map(nombre => `
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
                        <button onclick="verPlanEstudios('${nombre}')" class="btn btn-golden btn-sm">
                            <i class="fas fa-book-open"></i> Ver Plan de Estudios
                        </button>
                        <button onclick="desinscribirCursoConfirm('${nombre}')" class="btn btn-danger btn-sm" style="background: #c62828; color: white; padding: 0.4rem 1rem; border-radius: 0.8rem; border: none; cursor: pointer; font-weight: 600; font-size: 0.75rem; font-family: 'Inter', sans-serif;">
                            <i class="fas fa-times"></i> Desinscribir
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        <div style="margin-top: 1.5rem; text-align: center;">
            <button onclick="abrirModalInscripcionNuevo()" class="btn btn-golden" style="background: var(--golden); color: var(--deep-blue); padding: 0.7rem 2rem; border-radius: 2rem; border: none; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif;">
                <i class="fas fa-plus"></i> Inscribirme en otro curso
            </button>
        </div>
    `;
}

// ===== VER PLAN DE ESTUDIOS (MODAL) =====
function verPlanEstudios(curso) {
    const data = CURSOS_DATA[curso];
    if (!data) {
        alert('⚠️ Curso no encontrado');
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

// ===== PESTAÑA REVISIÓN =====
let cursoSeleccionadoRevision = 'todos'; // Variable global para el filtro

function renderizarRevision() {
    const container = document.getElementById('contenidoResultados');
    if (!container) return;

    const misCursos = obtenerMisCursos();
    const resultados = obtenerResultadosFiltrados();

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

    if (resultados.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <div style="font-size: 3rem;">📝</div>
                <p style="color: var(--muted-text); font-size: 1rem;">No hay resultados disponibles para tus cursos.</p>
                <p style="color: var(--muted-text); font-size: 0.85rem;">
                    Cursos inscritos: <strong>${misCursos.join(', ')}</strong>
                </p>
            </div>
        `;
        return;
    }

    // Construir opciones del selector
    let optionsHTML = `<option value="todos">📚 Todos los cursos</option>`;
    misCursos.forEach(curso => {
        const selected = cursoSeleccionadoRevision === curso ? 'selected' : '';
        // Obtener icono del curso (si existe)
        const icono = CURSOS_DATA[curso]?.icono || '';
        let iconoTexto = '';
        if (icono && icono.includes('img')) {
            // Es una imagen, usamos un placeholder
            iconoTexto = '🟢';
        } else {
            iconoTexto = icono || '📘';
        }
        optionsHTML += `<option value="${curso}" ${selected}>${iconoTexto} ${curso}</option>`;
    });

    // Filtrar resultados según selección
    let resultadosFiltrados = resultados;
    let textoResumen = '';
    if (cursoSeleccionadoRevision !== 'todos') {
        resultadosFiltrados = resultados.filter(ex => ex.curso === cursoSeleccionadoRevision);
        textoResumen = `<strong>${cursoSeleccionadoRevision}</strong>`;
    } else {
        textoResumen = `<strong>${misCursos.join(', ')}</strong>`;
    }

    // Verificar si hay resultados después del filtro
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

    // Renderizar tabla con filtro
    container.innerHTML = `
        <div style="margin-bottom: 1.2rem; display: flex; flex-wrap: wrap; align-items: center; gap: 0.8rem; background: var(--cream); padding: 1rem 1.2rem; border-radius: 1rem; border-left: 4px solid var(--golden);">
            <label for="filtroCursoRevision" style="font-weight: 600; color: var(--deep-blue); font-size: 0.9rem; display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-filter" style="color: var(--golden);"></i> Filtrar por:
            </label>
            <select id="filtroCursoRevision" 
                style="flex: 1; min-width: 180px; padding: 0.6rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: var(--pure-white); color: var(--dark-text); cursor: pointer; transition: all 0.3s ease; appearance: none; -webkit-appearance: none; background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="%235a6474" d="M6 8L1 3h10z"/></svg>'); background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem;">
                ${optionsHTML}
            </select>
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
                                <span style="background: ${examen.calificacion >= 4 ? '#2e7d32' : examen.calificacion >= 3 ? '#f57c00' : '#c62828'}; color: white; padding: 0.2rem 0.8rem; border-radius: 2rem; font-weight: 600; font-size: 0.8rem;">
                                    ${examen.calificacion.toFixed(1)}
                                </span>
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

    // Agregar evento change al selector después de renderizar
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

    // Verificar si ya está inscrito
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
            <button onclick="confirmarInscripcion(true, '${curso}')" class="btn btn-success" style="flex: 1; max-width: 150px;">
                <i class="fas fa-check"></i> SI
            </button>
            <button onclick="confirmarInscripcion(false, '${curso}')" class="btn btn-danger" style="flex: 1; max-width: 150px;">
                <i class="fas fa-times"></i> NO
            </button>
        </div>
    `;

    modal.classList.add('active');
}

function abrirModalInscripcionNuevo() {
    // Mostrar un modal con todos los cursos disponibles
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
                <button onclick="cerrarModalInscripcion(); abrirModalInscripcion('${curso}')" 
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
        // Verificar si realmente está inscrito
        if (estaInscrito(curso)) {
            cerrarModalInscripcion();
            renderizarPrincipal();
            renderizarCursos();
            renderizarRevision();
            cambiarPestalla('principal');
            abrirModalConfirmacionInscripcion('Ya estabas inscrito en este curso');
            return;
        }

        // Si dice SI pero no está en el array, lo inscribimos
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
            <button onclick="enviarMatricula('${curso}')" class="btn btn-primary" style="width: 100%;">
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
        alert('⚠️ Por favor completa todos los campos.');
        return;
    }

    // Inscribir en el curso
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

// ===== DESINSCRIPCIÓN =====
function desinscribirCursoConfirm(curso) {
    if (confirm(`¿Estás seguro de desinscribirte de "${curso}"?`)) {
        desinscribirCurso(curso);
        renderizarPrincipal();
        renderizarCursos();
        renderizarRevision();
        mostrarNotificacionGaleria(`❌ Te has desinscrito de ${curso}`, 'info');
    }
}

// ===== MODAL DE CONFIRMACIÓN DE INSCRIPCIÓN =====
function abrirModalConfirmacionInscripcion(mensaje) {
    const modal = document.getElementById('modalConfirmacionInscripcion');
    if (modal) {
        const textElement = modal.querySelector('p');
        if (textElement) {
            textElement.textContent = mensaje || 'Ya estás registrado en el curso. Puedes verlo en la pestaña "Principal".';
        }
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarModalConfirmacionInscripcion() {
    const modal = document.getElementById('modalConfirmacionInscripcion');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== MODAL ADMIN (CONTRASEÑA) =====
let modoAdminActivo = false;

function abrirModalAdmin() {
    // Crear modal de contraseña si no existe
    let modalAdminPassword = document.getElementById('modalAdminPassword');
    if (!modalAdminPassword) {
        modalAdminPassword = document.createElement('div');
        modalAdminPassword.id = 'modalAdminPassword';
        modalAdminPassword.className = 'modal-overlay';
        modalAdminPassword.style.zIndex = '99999';
        modalAdminPassword.innerHTML = `
            <div class="modal-card" style="max-width: 400px; text-align: center;">
                <div class="modal-header" style="justify-content: center;">
                    <h3 style="color: var(--deep-blue);"><i class="fas fa-lock" style="color: var(--golden);"></i> Acceso Administrador</h3>
                </div>
                <div class="modal-body">
                    <p style="color: var(--muted-text); margin-bottom: 1.5rem;">Ingresa la contraseña de administrador</p>
                    <input type="password" id="inputPasswordAdmin" placeholder="Contraseña..."
                        style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; margin-bottom: 1rem; box-sizing: border-box;">
                    <div id="errorPasswordAdmin" style="color: #dc2626; font-size: 0.85rem; display: none; margin-bottom: 0.5rem;">❌ Contraseña incorrecta</div>
                    <div style="display: flex; gap: 0.8rem; justify-content: center;">
                        <button onclick="verificarPasswordAdmin()" class="btn btn-primary" style="flex: 1; max-width: 200px;">
                            <i class="fas fa-unlock"></i> Ingresar
                        </button>
                        <button onclick="cerrarModalAdminPassword()" class="btn btn-outline" style="flex: 1; max-width: 200px; background: transparent; border: 2px solid var(--deep-blue); color: var(--deep-blue);">
                            <i class="fas fa-times"></i> Cancelar
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalAdminPassword);

        // Evento Enter
        modalAdminPassword.querySelector('#inputPasswordAdmin').addEventListener('keydown', function (e) {
            if (e.key === 'Enter') verificarPasswordAdmin();
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

// ===== PANEL DE ADMINISTRADOR =====
function mostrarPanelAdmin() {
    const dashboard = document.getElementById('dashboardEvaluacion');

    // Ocultar pestañas de alumno
    document.querySelectorAll('.tab-btn').forEach(btn => btn.style.display = 'none');
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');

    // Crear panel admin si no existe
    let panelAdmin = document.getElementById('panelAdmin');
    if (!panelAdmin) {
        panelAdmin = document.createElement('div');
        panelAdmin.id = 'panelAdmin';
        panelAdmin.style.cssText = `
            display: block;
            padding: 1rem 0;
        `;
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

    // Mostrar pestañas de alumno
    document.querySelectorAll('.tab-btn').forEach(btn => btn.style.display = 'flex');
    document.getElementById('contenidoPrincipal').style.display = 'block';
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.style.background = 'transparent';
        btn.style.color = 'var(--muted-text)';
    });
    document.querySelector('.tab-btn[data-tab="principal"]').style.background = 'var(--golden)';
    document.querySelector('.tab-btn[data-tab="principal"]').style.color = 'var(--deep-blue)';

    // Recargar contenido
    renderizarPrincipal();
    renderizarCursos();
    renderizarRevision();
}

// ===== FUNCIONES DE PERSISTENCIA PARA DB_EXAMENES =====
function cargarExamenesDesdeStorage() {
    try {
        const data = localStorage.getItem('db_examenes');
        if (data) {
            const parsed = JSON.parse(data);
            DB_EXAMENES.length = 0;
            parsed.forEach(ex => DB_EXAMENES.push(ex));
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

// ========================================
// MEJORA 1: GESTIONAR RESULTADOS
// ========================================

function abrirModalGestionarResultados() {
    let modal = document.getElementById('modalGestionarResultados');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalGestionarResultados';
        modal.className = 'modal-overlay';
        modal.style.zIndex = '99999';
        modal.innerHTML = `
            <div class="modal-card" style="max-width: 550px; max-height: 80vh; overflow-y: auto;">
                <div class="modal-header">
                    <h3 style="color: var(--deep-blue);"><i class="fas fa-chart-line" style="color: var(--golden);"></i> Gestionar Resultados</h3>
                    <button onclick="cerrarModalGestionarResultados()" class="modal-close">&times;</button>
                </div>
                <div class="modal-body" id="modalResultadosBody">
                    <div class="form-group">
                        <label for="selectCursoResultados" style="font-weight: 600; font-size: 0.85rem; color: var(--deep-blue); display: block; margin-bottom: 0.3rem;">Seleccionar Curso</label>
                        <select id="selectCursoResultados" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; background: var(--pure-white);">
                            <option value="">-- Selecciona un curso --</option>
                            ${Object.keys(CURSOS_DATA).map(curso => `
                                <option value="${curso}">${curso}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div id="listaExamenesResultados" style="margin-top: 1rem;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        // Evento change del selector
        modal.querySelector('#selectCursoResultados').addEventListener('change', function () {
            cargarExamenesParaResultados(this.value);
        });
    }

    // Limpiar y resetear
    const selector = document.getElementById('selectCursoResultados');
    selector.value = '';
    document.getElementById('listaExamenesResultados').innerHTML = '';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalGestionarResultados() {
    const modal = document.getElementById('modalGestionarResultados');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function cargarExamenesParaResultados(curso) {
    const container = document.getElementById('listaExamenesResultados');
    if (!curso) {
        container.innerHTML = '<p style="color: var(--muted-text); text-align: center; padding: 1rem;">Selecciona un curso para ver sus exámenes.</p>';
        return;
    }

    const examenes = DB_EXAMENES.filter(ex => ex.curso === curso);
    if (examenes.length === 0) {
        container.innerHTML = `<p style="color: var(--muted-text); text-align: center; padding: 1rem;">No hay exámenes para <strong>${curso}</strong></p>`;
        return;
    }

    container.innerHTML = `
        <h4 style="color: var(--deep-blue); margin-bottom: 0.8rem; border-bottom: 2px solid var(--golden); padding-bottom: 0.3rem;">
            Exámenes de ${curso}
        </h4>
        ${examenes.map((examen, index) => `
            <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; padding: 0.7rem 0; border-bottom: 1px solid rgba(0,0,0,0.04);">
                <div style="flex: 1; min-width: 140px;">
                    <strong style="color: var(--deep-blue); font-size: 0.9rem;">${examen.titulo}</strong>
                    <span style="color: var(--muted-text); font-size: 0.75rem; display: block;">${examen.fecha}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                    <span style="color: var(--muted-text); font-size: 0.8rem;">Nota:</span>
                    <input type="number" id="nota_${index}" step="0.1" min="1" max="5" 
                        value="${examen.calificacion !== null ? examen.calificacion : ''}"
                        style="width: 70px; padding: 0.4rem 0.6rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; text-align: center;">
                    <span style="color: var(--muted-text); font-size: 0.7rem;">(1.0 - 5.0)</span>
                    <button onclick="guardarNotaExamen(${index}, '${curso}')" 
                        style="background: var(--golden); color: var(--deep-blue); padding: 0.3rem 0.8rem; border: none; border-radius: 0.8rem; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.75rem; transition: all 0.3s ease;">
                        <i class="fas fa-save"></i> Guardar
                    </button>
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
        alert('⚠️ Ingresa una nota válida entre 1.0 y 5.0');
        return;
    }

    // Encontrar el examen en DB_EXAMENES
    const examenesCurso = DB_EXAMENES.filter(ex => ex.curso === curso);
    if (index >= examenesCurso.length) return;

    const examen = examenesCurso[index];
    const globalIndex = DB_EXAMENES.indexOf(examen);
    if (globalIndex === -1) return;

    // Actualizar calificación
    DB_EXAMENES[globalIndex].calificacion = valor;
    DB_EXAMENES[globalIndex].nota = valor.toFixed(1);
    guardarExamenesEnStorage();

    mostrarNotificacionGaleria(`✅ Nota ${valor.toFixed(1)} guardada para "${examen.titulo}"`, 'success');

    // Recargar lista para actualizar
    cargarExamenesParaResultados(curso);

    // Actualizar vistas
    renderizarPrincipal();
    renderizarRevision();
}

// ========================================
// MEJORA 2: EDITAR EXÁMENES
// ========================================

function abrirModalEditarExamenes() {
    let modal = document.getElementById('modalEditarExamenes');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalEditarExamenes';
        modal.className = 'modal-overlay';
        modal.style.zIndex = '99999';
        modal.innerHTML = `
            <div class="modal-card" style="max-width: 550px; max-height: 80vh; overflow-y: auto;">
                <div class="modal-header">
                    <h3 style="color: var(--deep-blue);"><i class="fas fa-edit" style="color: var(--golden);"></i> Editar Exámenes</h3>
                    <button onclick="cerrarModalEditarExamenes()" class="modal-close">&times;</button>
                </div>
                <div class="modal-body" id="modalEditarBody">
                    <div class="form-group">
                        <label for="selectCursoEditar" style="font-weight: 600; font-size: 0.85rem; color: var(--deep-blue); display: block; margin-bottom: 0.3rem;">Seleccionar Curso</label>
                        <select id="selectCursoEditar" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; background: var(--pure-white);">
                            <option value="">-- Selecciona un curso --</option>
                            ${Object.keys(CURSOS_DATA).map(curso => `
                                <option value="${curso}">${curso}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div id="listaExamenesEditar" style="margin-top: 1rem;"></div>
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

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalEditarExamenes() {
    const modal = document.getElementById('modalEditarExamenes');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function cargarExamenesParaEditar(curso) {
    const container = document.getElementById('listaExamenesEditar');
    if (!curso) {
        container.innerHTML = '<p style="color: var(--muted-text); text-align: center; padding: 1rem;">Selecciona un curso para ver sus exámenes.</p>';
        return;
    }

    const examenes = DB_EXAMENES.filter(ex => ex.curso === curso);
    if (examenes.length === 0) {
        container.innerHTML = `<p style="color: var(--muted-text); text-align: center; padding: 1rem;">No hay exámenes para <strong>${curso}</strong></p>`;
        return;
    }

    container.innerHTML = `
        <h4 style="color: var(--deep-blue); margin-bottom: 0.8rem; border-bottom: 2px solid var(--golden); padding-bottom: 0.3rem;">
            Exámenes de ${curso}
        </h4>
        ${examenes.map((examen, index) => `
            <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 0.5rem; padding: 0.7rem 0; border-bottom: 1px solid rgba(0,0,0,0.04);">
                <div style="flex: 1; min-width: 120px;">
                    <strong style="color: var(--deep-blue); font-size: 0.9rem;">${examen.titulo}</strong>
                    <span style="color: var(--muted-text); font-size: 0.75rem; display: block;">${examen.fecha}</span>
                </div>
                <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                    <button onclick="editarExamen('${curso}', ${index})" 
                        style="background: var(--golden); color: var(--deep-blue); padding: 0.3rem 0.8rem; border: none; border-radius: 0.8rem; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.75rem; transition: all 0.3s ease;">
                        <i class="fas fa-pen"></i> Editar
                    </button>
                    <button onclick="eliminarExamen('${curso}', ${index})" 
                        style="background: #c62828; color: white; padding: 0.3rem 0.8rem; border: none; border-radius: 0.8rem; font-weight: 600; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.75rem; transition: all 0.3s ease;">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `).join('')}
    `;
}

function editarExamen(curso, index) {
    const examenesCurso = DB_EXAMENES.filter(ex => ex.curso === curso);
    if (index >= examenesCurso.length) return;

    const examen = examenesCurso[index];
    const globalIndex = DB_EXAMENES.indexOf(examen);
    if (globalIndex === -1) return;

    // Abrir modal de crear examen en modo edición
    cerrarModalEditarExamenes();
    abrirModalCrearExamenParaEditar(globalIndex);
}

function eliminarExamen(curso, index) {
    if (!confirm(`¿Estás seguro de eliminar "${examen.titulo}"?`)) return;

    const examenesCurso = DB_EXAMENES.filter(ex => ex.curso === curso);
    if (index >= examenesCurso.length) return;

    const examen = examenesCurso[index];
    const globalIndex = DB_EXAMENES.indexOf(examen);
    if (globalIndex === -1) return;

    DB_EXAMENES.splice(globalIndex, 1);
    guardarExamenesEnStorage();

    mostrarNotificacionGaleria(`🗑️ Examen eliminado correctamente`, 'info');
    cargarExamenesParaEditar(curso);
    renderizarPrincipal();
    renderizarRevision();
}

// ========================================
// MEJORA 3: CREAR EXAMEN PROFESIONAL
// ========================================

let editandoExamenIndex = -1;

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
        modal.style.zIndex = '99999';
        modal.innerHTML = `
            <div class="modal-card" style="max-width: 650px; max-height: 85vh; overflow-y: auto;">
                <div class="modal-header">
                    <h3 id="modalExamenTitulo" style="color: var(--deep-blue);"><i class="fas fa-plus-circle" style="color: var(--golden);"></i> Crear nuevo examen</h3>
                    <button onclick="cerrarModalCrearExamenProfesional()" class="modal-close">&times;</button>
                </div>
                <div class="modal-body" id="modalExamenBody">
                    <!-- SECCIÓN 1: INFORMACIÓN GENERAL -->
                    <div style="background: var(--cream); padding: 1.2rem; border-radius: 1rem; margin-bottom: 1.5rem; border-left: 4px solid var(--golden);">
                        <h4 style="color: var(--deep-blue); margin: 0 0 0.8rem 0; font-size: 1rem;">📋 Información General</h4>
                        <div class="form-group">
                            <label for="selectCursoExamenPro" style="font-weight: 600; font-size: 0.85rem; color: var(--deep-blue); display: block; margin-bottom: 0.3rem;">Curso *</label>
                            <select id="selectCursoExamenPro" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; background: var(--pure-white);">
                                ${Object.keys(CURSOS_DATA).map(curso => `
                                    <option value="${curso}">${curso}</option>
                                `).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="inputTituloExamenPro" style="font-weight: 600; font-size: 0.85rem; color: var(--deep-blue); display: block; margin-bottom: 0.3rem;">Nombre del examen *</label>
                            <input type="text" id="inputTituloExamenPro" placeholder="Ej: Examen Final - Módulo 3" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; box-sizing: border-box;">
                        </div>
                        <div class="form-group">
                            <label for="inputFechaExamenPro" style="font-weight: 600; font-size: 0.85rem; color: var(--deep-blue); display: block; margin-bottom: 0.3rem;">Fecha *</label>
                            <input type="date" id="inputFechaExamenPro" style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; box-sizing: border-box;">
                        </div>
                        <div class="form-group">
                            <label for="inputDescripcionExamen" style="font-weight: 600; font-size: 0.85rem; color: var(--deep-blue); display: block; margin-bottom: 0.3rem;">Descripción / Instrucciones</label>
                            <textarea id="inputDescripcionExamen" rows="3" placeholder="Escribe las instrucciones para los alumnos..." style="width: 100%; padding: 0.8rem 1rem; border: 2px solid #e8e3d8; border-radius: 1rem; font-family: 'Inter', sans-serif; font-size: 0.95rem; box-sizing: border-box; resize: vertical;"></textarea>
                        </div>
                    </div>

                    <!-- SECCIÓN 2: PREGUNTAS -->
                    <div style="margin-bottom: 1.5rem;">
                        <h4 style="color: var(--deep-blue); margin: 0 0 0.8rem 0; font-size: 1rem; display: flex; justify-content: space-between; align-items: center;">
                            <span><i class="fas fa-question-circle" style="color: var(--golden);"></i> Preguntas</span>
                            <button onclick="agregarPregunta()" style="background: var(--golden); color: var(--deep-blue); padding: 0.4rem 1.2rem; border: none; border-radius: 2rem; font-weight: 700; cursor: pointer; font-family: 'Inter', sans-serif; font-size: 0.85rem; transition: all 0.3s ease;">
                                <i class="fas fa-plus"></i> Agregar Pregunta
                            </button>
                        </h4>
                        <div id="contenedorPreguntas" style="display: flex; flex-direction: column; gap: 1rem;"></div>
                    </div>

                    <!-- BOTÓN GUARDAR -->
                    <button onclick="guardarExamenCompleto()" style="width: 100%; background: var(--golden); color: var(--deep-blue); padding: 1rem; border: none; border-radius: 1.2rem; font-weight: 700; font-size: 1.1rem; cursor: pointer; font-family: 'Inter', sans-serif; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(212, 160, 56, 0.3);">
                        <i class="fas fa-save"></i> Guardar Examen Completo
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Configurar fecha por defecto
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('inputFechaExamenPro').value = hoy;

    // Si estamos editando, cargar datos
    if (examenExistente) {
        document.getElementById('modalExamenTitulo').innerHTML = `<i class="fas fa-edit" style="color: var(--golden);"></i> Editar examen`;
        document.getElementById('selectCursoExamenPro').value = examenExistente.curso;
        document.getElementById('inputTituloExamenPro').value = examenExistente.titulo;
        document.getElementById('inputDescripcionExamen').value = examenExistente.descripcion || '';

        // Cargar preguntas si existen
        const container = document.getElementById('contenedorPreguntas');
        container.innerHTML = '';
        if (examenExistente.preguntas && examenExistente.preguntas.length > 0) {
            examenExistente.preguntas.forEach((preg, idx) => {
                agregarPreguntaConDatos(preg, idx);
            });
        }
    } else {
        document.getElementById('modalExamenTitulo').innerHTML = `<i class="fas fa-plus-circle" style="color: var(--golden);"></i> Crear nuevo examen`;
        document.getElementById('selectCursoExamenPro').value = Object.keys(CURSOS_DATA)[0];
        document.getElementById('inputTituloExamenPro').value = '';
        document.getElementById('inputDescripcionExamen').value = '';
        document.getElementById('contenedorPreguntas').innerHTML = '';
        // Agregar una pregunta por defecto
        agregarPregunta();
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalCrearExamenProfesional() {
    const modal = document.getElementById('modalCrearExamenProfesional');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function agregarPregunta() {
    agregarPreguntaConDatos(null, -1);
}

function agregarPreguntaConDatos(datos, index) {
    const container = document.getElementById('contenedorPreguntas');
    const id = Date.now() + Math.random();

    const div = document.createElement('div');
    div.id = `pregunta_${id}`;
    div.style.cssText = `
        background: var(--pure-white);
        padding: 1rem;
        border-radius: 1rem;
        border: 1px solid #e8e3d8;
        position: relative;
    `;

    const tipo = datos?.tipo || 'multiple';
    const texto = datos?.texto || '';
    const opciones = datos?.opciones || ['', '', '', ''];
    const correcta = datos?.correcta || '';

    div.innerHTML = `
        <button onclick="eliminarPregunta('${id}')" style="position: absolute; top: 0.5rem; right: 0.5rem; background: #c62828; color: white; border: none; border-radius: 50%; width: 28px; height: 28px; cursor: pointer; font-size: 0.8rem; transition: all 0.3s ease; display: flex; align-items: center; justify-content: center;">
            <i class="fas fa-times"></i>
        </button>
        
        <div class="form-group" style="margin-bottom: 0.5rem;">
            <label style="font-weight: 600; font-size: 0.8rem; color: var(--deep-blue); display: block; margin-bottom: 0.2rem;">Tipo de pregunta</label>
            <select class="selectTipoPregunta" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: var(--pure-white);">
                <option value="multiple" ${tipo === 'multiple' ? 'selected' : ''}>Selección Múltiple</option>
                <option value="vf" ${tipo === 'vf' ? 'selected' : ''}>Verdadero / Falso</option>
                <option value="corta" ${tipo === 'corta' ? 'selected' : ''}>Respuesta Corta</option>
            </select>
        </div>
        
        <div class="form-group" style="margin-bottom: 0.5rem;">
            <label style="font-weight: 600; font-size: 0.8rem; color: var(--deep-blue); display: block; margin-bottom: 0.2rem;">Texto de la pregunta *</label>
            <input type="text" class="inputTextoPregunta" placeholder="Escribe la pregunta..." value="${texto}" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; box-sizing: border-box;">
        </div>
        
        <div class="opciones-container" style="${tipo !== 'multiple' ? 'display: none;' : ''}">
            <label style="font-weight: 600; font-size: 0.8rem; color: var(--deep-blue); display: block; margin-bottom: 0.3rem;">Opciones</label>
            ${['A', 'B', 'C', 'D'].map((letra, idx) => `
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.3rem;">
                    <span style="font-weight: 700; color: var(--deep-blue); width: 20px;">${letra}.</span>
                    <input type="text" class="inputOpcion" placeholder="Opción ${letra}" value="${opciones[idx] || ''}" style="flex: 1; padding: 0.4rem 0.6rem; border: 2px solid #e8e3d8; border-radius: 0.6rem; font-family: 'Inter', sans-serif; font-size: 0.85rem; box-sizing: border-box;">
                </div>
            `).join('')}
        </div>
        
        <div class="form-group" style="margin-bottom: 0.3rem;">
            <label style="font-weight: 600; font-size: 0.8rem; color: var(--deep-blue); display: block; margin-bottom: 0.2rem;">Respuesta correcta</label>
            <div class="respuesta-container">
                ${tipo === 'multiple' ? `
                    <select class="selectRespuestaCorrecta" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: var(--pure-white);">
                        <option value="">-- Selecciona --</option>
                        ${['A', 'B', 'C', 'D'].map(letra => `
                            <option value="${letra}" ${correcta === letra ? 'selected' : ''}>Opción ${letra}</option>
                        `).join('')}
                    </select>
                ` : tipo === 'vf' ? `
                    <select class="selectRespuestaCorrecta" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: var(--pure-white);">
                        <option value="Verdadero" ${correcta === 'Verdadero' ? 'selected' : ''}>Verdadero</option>
                        <option value="Falso" ${correcta === 'Falso' ? 'selected' : ''}>Falso</option>
                    </select>
                ` : `
                    <input type="text" class="inputRespuestaCorta" placeholder="Escribe la respuesta correcta..." value="${correcta}" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; box-sizing: border-box;">
                `}
            </div>
        </div>
    `;

    // Evento para mostrar/ocultar opciones según tipo
    div.querySelector('.selectTipoPregunta').addEventListener('change', function () {
        const tipoSeleccionado = this.value;
        const opcionesContainer = this.closest('.form-group').parentElement.querySelector('.opciones-container');
        const respuestaContainer = this.closest('.form-group').parentElement.querySelector('.respuesta-container');

        if (tipoSeleccionado === 'multiple') {
            opcionesContainer.style.display = 'block';
            respuestaContainer.innerHTML = `
                <select class="selectRespuestaCorrecta" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: var(--pure-white);">
                    <option value="">-- Selecciona --</option>
                    ${['A', 'B', 'C', 'D'].map(letra => `
                        <option value="${letra}">Opción ${letra}</option>
                    `).join('')}
                </select>
            `;
        } else if (tipoSeleccionado === 'vf') {
            opcionesContainer.style.display = 'none';
            respuestaContainer.innerHTML = `
                <select class="selectRespuestaCorrecta" style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; background: var(--pure-white);">
                    <option value="Verdadero">Verdadero</option>
                    <option value="Falso">Falso</option>
                </select>
            `;
        } else {
            opcionesContainer.style.display = 'none';
            respuestaContainer.innerHTML = `
                <input type="text" class="inputRespuestaCorta" placeholder="Escribe la respuesta correcta..." style="width: 100%; padding: 0.5rem 0.8rem; border: 2px solid #e8e3d8; border-radius: 0.8rem; font-family: 'Inter', sans-serif; font-size: 0.9rem; box-sizing: border-box;">
            `;
        }
    });

    container.appendChild(div);
}

function eliminarPregunta(id) {
    const element = document.getElementById(`pregunta_${id}`);
    if (element) {
        const preguntas = document.querySelectorAll('#contenedorPreguntas > div');
        if (preguntas.length <= 1) {
            alert('⚠️ Debe haber al menos una pregunta por examen.');
            return;
        }
        element.remove();
    }
}

function guardarExamenCompleto() {
    const curso = document.getElementById('selectCursoExamenPro').value;
    const titulo = document.getElementById('inputTituloExamenPro').value.trim();
    const fecha = document.getElementById('inputFechaExamenPro').value;
    const descripcion = document.getElementById('inputDescripcionExamen').value.trim();

    if (!titulo) {
        alert('⚠️ Por favor ingresa el nombre del examen.');
        return;
    }
    if (!fecha) {
        alert('⚠️ Por favor selecciona una fecha.');
        return;
    }

    // Recolectar preguntas
    const preguntas = [];
    const bloques = document.querySelectorAll('#contenedorPreguntas > div');

    for (const bloque of bloques) {
        const tipo = bloque.querySelector('.selectTipoPregunta').value;
        const texto = bloque.querySelector('.inputTextoPregunta').value.trim();

        if (!texto) {
            alert('⚠️ Todas las preguntas deben tener texto.');
            return;
        }

        let opciones = [];
        let correcta = '';

        if (tipo === 'multiple') {
            const inputsOpcion = bloque.querySelectorAll('.inputOpcion');
            opciones = Array.from(inputsOpcion).map(inp => inp.value.trim());
            if (opciones.some(o => o === '')) {
                alert('⚠️ Completa todas las opciones para la pregunta de selección múltiple.');
                return;
            }
            const selectCorrecta = bloque.querySelector('.selectRespuestaCorrecta');
            correcta = selectCorrecta.value;
            if (!correcta) {
                alert('⚠️ Selecciona la respuesta correcta para la pregunta de selección múltiple.');
                return;
            }
        } else if (tipo === 'vf') {
            const selectCorrecta = bloque.querySelector('.selectRespuestaCorrecta');
            correcta = selectCorrecta.value;
        } else {
            const inputCorrecta = bloque.querySelector('.inputRespuestaCorta');
            correcta = inputCorrecta.value.trim();
            if (!correcta) {
                alert('⚠️ Escribe la respuesta correcta para la pregunta de respuesta corta.');
                return;
            }
        }

        preguntas.push({ tipo, texto, opciones, correcta });
    }

    if (preguntas.length === 0) {
        alert('⚠️ Agrega al menos una pregunta al examen.');
        return;
    }

    // Formatear fecha
    const fechaObj = new Date(fecha + 'T00:00:00');
    const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    const nuevoExamen = {
        curso: curso,
        titulo: titulo,
        fecha: fechaFormateada,
        descripcion: descripcion || 'Sin descripción',
        preguntas: preguntas,
        nota: 'Pendiente',
        calificacion: null
    };

    // Si estamos editando, reemplazar el examen existente
    if (editandoExamenIndex >= 0 && editandoExamenIndex < DB_EXAMENES.length) {
        DB_EXAMENES[editandoExamenIndex] = nuevoExamen;
        mostrarNotificacionGaleria(`✅ Examen "${titulo}" actualizado correctamente`, 'success');
    } else {
        DB_EXAMENES.push(nuevoExamen);
        mostrarNotificacionGaleria(`✅ Examen "${titulo}" creado correctamente`, 'success');
    }

    guardarExamenesEnStorage();
    cerrarModalCrearExamenProfesional();

    renderizarPrincipal();
    renderizarRevision();
}

// ===== GESTIONAR CURSOS (Placeholder) =====
function abrirModalGestionCursos() {
    let modal = document.getElementById('modalGestionCursos');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalGestionCursos';
        modal.className = 'modal-overlay';
        modal.style.zIndex = '99999';
        modal.innerHTML = `
            <div class="modal-card" style="max-width: 450px; text-align: center;">
                <div class="modal-header" style="justify-content: center;">
                    <h3 style="color: var(--deep-blue);">🔧 Gestionar Cursos</h3>
                </div>
                <div class="modal-body">
                    <div style="font-size: 4rem; margin: 0.5rem 0;">📚</div>
                    <p style="color: var(--dark-text); font-size: 1.1rem; margin: 0.5rem 0;">Próximamente: Aquí podrás editar los temas y ayudas del Plan de Estudios.</p>
                    <button onclick="cerrarModalGestionCursos()" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                        <i class="fas fa-check"></i> Entendido
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalGestionCursos() {
    const modal = document.getElementById('modalGestionCursos');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== GESTIONAR BIBLIOTECA (Placeholder) =====
function abrirModalGestionBiblioteca() {
    let modal = document.getElementById('modalGestionBiblioteca');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalGestionBiblioteca';
        modal.className = 'modal-overlay';
        modal.style.zIndex = '99999';
        modal.innerHTML = `
            <div class="modal-card" style="max-width: 450px; text-align: center;">
                <div class="modal-header" style="justify-content: center;">
                    <h3 style="color: var(--deep-blue);">🔧 Gestionar Biblioteca</h3>
                </div>
                <div class="modal-body">
                    <div style="font-size: 4rem; margin: 0.5rem 0;">📖</div>
                    <p style="color: var(--dark-text); font-size: 1.1rem; margin: 0.5rem 0;">Próximamente: Aquí podrás agregar y eliminar libros del catálogo.</p>
                    <button onclick="cerrarModalGestionBiblioteca()" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
                        <i class="fas fa-check"></i> Entendido
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarModalGestionBiblioteca() {
    const modal = document.getElementById('modalGestionBiblioteca');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===== MODIFICAR abrirDashboard() para cargar exámenes desde storage =====
function abrirDashboard() {
    cargarExamenesDesdeStorage();

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

// ===== MODIFICAR cerrarDashboard() para limpiar estado admin =====
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

// ===== ENTER PARA CONTRASEÑA =====
document.addEventListener('DOMContentLoaded', function () {
    const passwordInput = document.getElementById('inputPasswordEvaluacion');
    if (passwordInput) {
        passwordInput.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') verificarPasswordEvaluacion();
        });
    }

    cargarExamenesDesdeStorage();
});

console.log('✅ Sistema de Evaluación y Cursos (Multi-Matrícula) cargado correctamente');
console.log('🔐 Modo Administrador: contraseña "admin2026"');