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

    // Actualizar indicador de nivel
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

    // Mostrar/ocultar botón de logout
    if (btnLogout) {
        btnLogout.style.display = session.nivel > 1 ? 'inline-block' : 'none';
    }

    // Mostrar/ocultar formulario de login
    if (loginForm) {
        loginForm.style.display = session.nivel === 1 ? 'block' : 'none';
    }

    // Mostrar/ocultar toggle de login
    if (loginToggle) {
        loginToggle.style.display = session.nivel === 1 ? 'inline-block' : 'none';
    }

    // Actualizar elementos con data-nivel
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

    // 1. Restaurar sesión
    restaurarSesion();

    // 2. Configurar evento de login (Enter en campos)
    document.querySelectorAll('#loginForm input').forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                login();
            }
        });
    });

    // 3. Configurar botón de login si existe
    const btnLogin = document.getElementById('btnLogin');
    if (btnLogin) {
        btnLogin.addEventListener('click', login);
    }

    // 4. Configurar botón de logout
    const btnLogout = document.getElementById('btnLogout');
    if (btnLogout) {
        btnLogout.addEventListener('click', logout);
    }

    // 5. Configurar toggle de login
    const loginToggle = document.getElementById('loginToggle');
    if (loginToggle) {
        loginToggle.addEventListener('click', toggleLogin);
    }

    // 6. Inicializar Encuestas
    if (typeof EncuestaManager !== 'undefined' && EncuestaManager.render) {
        EncuestaManager.render();
    }

    // 7. Inicializar Calendarios (General y Clubes)
    if (typeof CalendarManager !== 'undefined' && CalendarManager.initAll) {
        CalendarManager.initAll();
    }

    // 8. Inicializar Buscador de Creencias
    if (typeof CreenciasManager !== 'undefined' && CreenciasManager.initSearch) {
        CreenciasManager.initSearch();
    }

    // 9. Configurar Modal de Agregar Eventos
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

    // 10. Configurar navegación por hash (URL)
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1) || 'home';
        showPage(hash);
    });

    // 11. Establecer la página de inicio activa por defecto
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
        document.body.style.overflow = 'hidden'; // Evita scroll
    }
}

function cerrarModal() {
    const modal = document.getElementById('modalContacto');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', function (event) {
    const modal = document.getElementById('modalContacto');
    if (modal && event.target === modal) {
        cerrarModal();
    }
});

// Cerrar modal con tecla ESC
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

    // Mostrar mensaje de éxito
    alert('✅ ¡Gracias por contactarnos! Un asesor se comunicará contigo pronto.');

    // Limpiar formulario
    document.getElementById('modalNombre').value = '';
    document.getElementById('modalWhatsapp').value = '';
    document.getElementById('modalEmail').value = '';

    // Cerrar modal
    cerrarModal();
}

// Exportar funciones
window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;
window.enviarFormulario = enviarFormulario;

console.log('✅ Modal de contacto cargado correctamente');

// ========================================
// SISTEMA DE GALERÍA DE FOTOS (SOLO ADMIN)
// ========================================

// Estado de la galería
let galeriaFotos = [];

/**
 * Carga las fotos guardadas en localStorage
 */
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

/**
 * Renderiza la galería de fotos en la página
 */
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

/**
 * Agrega una nueva foto (solo administradores)
 */
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

        // Limpiar campos
        titulo.value = '';
        descripcion.value = '';
        imagenInput.value = '';

        mostrarNotificacionGaleria('✅ Foto agregada correctamente', 'success');
    };
    reader.readAsDataURL(imagenInput.files[0]);
}

/**
 * Elimina una foto (solo administradores)
 */
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

/**
 * Alterna la visibilidad del formulario de galería
 */
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

/**
 * Muestra notificaciones para la galería
 */
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

// Inicializar la galería al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    cargarGaleria();
});

// Exportar funciones de galería
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

/**
 * Verifica si el usuario tiene acceso a una página por nivel
 * Esta función complementa la existente `tieneAcceso`
 */
function verificarNivelAcceso(pageId) {
    // Si la página existe en PAGINAS, verifica el nivel
    if (window.PAGINAS && PAGINAS[pageId]) {
        const nivelRequerido = PAGINAS[pageId].nivel || 1;
        if (session.nivel < nivelRequerido) {
            // Mostrar mensaje de acceso denegado
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

// Exportar función adicional
window.verificarNivelAcceso = verificarNivelAcceso;

console.log('✅ Sistema de protección por niveles actualizado correctamente');

// ========================================
// SCROLL REVEAL - ANIMACIONES AL HACER SCROLL
// ========================================

/**
 * Inicializa las animaciones de scroll reveal
 * Los elementos con clase 'scroll-reveal' aparecerán al hacer scroll
 */
function initScrollReveal() {
    const elementos = document.querySelectorAll('.scroll-reveal');

    if (elementos.length === 0) return;

    // Usar Intersection Observer para detectar cuando los elementos entran en vista
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Agregar clase 'visible' cuando el elemento entra en vista
                entry.target.classList.add('visible');

                // Opcional: dejar de observar el elemento después de que aparezca
                // observer.unobserve(entry.target);
            }
        });
    }, {
        // Configuración del observer
        threshold: 0.1, // Se activa cuando el 10% del elemento es visible
        rootMargin: '0px 0px -50px 0px' // Se activa un poco antes de que llegue a la vista
    });

    // Observar cada elemento
    elementos.forEach(el => observer.observe(el));
}

/**
 * Reinicia las animaciones de scroll reveal
 * Útil cuando se cambia de página (para que las animaciones se activen en la nueva página)
 */
function resetScrollReveal() {
    // Remover la clase 'visible' de todos los elementos
    document.querySelectorAll('.scroll-reveal.visible').forEach(el => {
        el.classList.remove('visible');
    });

    // Reiniciar el observer después de un pequeño delay
    setTimeout(() => {
        initScrollReveal();
    }, 100);
}

/**
 * Verifica si un elemento está visible en la pantalla
 */
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
    );
}

/**
 * Inicializa todas las animaciones al cargar la página
 * y cuando se cambia de página (showPage)
 */
function initAllAnimations() {
    // Inicializar scroll reveal
    initScrollReveal();

    // También activar elementos que ya están visibles al cargar
    setTimeout(() => {
        document.querySelectorAll('.scroll-reveal:not(.visible)').forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }, 200);
}

// ========================================
// SOBRESCRIBIR showPage PARA ACTIVAR ANIMACIONES
// ========================================

// Guardar la función original showPage
const originalShowPage = window.showPage;

// Sobrescribir showPage para reiniciar animaciones al cambiar de página
window.showPage = function (pageId) {
    // Llamar a la función original
    originalShowPage(pageId);

    // Reiniciar animaciones después de un pequeño delay (para que la página se renderice)
    setTimeout(() => {
        resetScrollReveal();
        // Inicializar nuevamente después de cambiar de página
        setTimeout(() => {
            initScrollReveal();
            // Activar elementos ya visibles
            document.querySelectorAll('.scroll-reveal:not(.visible)').forEach(el => {
                if (isElementInViewport(el)) {
                    el.classList.add('visible');
                }
            });
        }, 300);
    }, 200);
};

// ========================================
// INICIALIZAR ANIMACIONES AL CARGAR
// ========================================

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar animaciones después de un pequeño delay
    setTimeout(initAllAnimations, 500);
});

// También inicializar cuando se termine de cargar todo
window.addEventListener('load', function () {
    setTimeout(initAllAnimations, 300);
});

// Inicializar en cambios de scroll (por si hay elementos que se agreguen dinámicamente)
window.addEventListener('scroll', function () {
    // Activar elementos que entren en vista durante el scroll
    document.querySelectorAll('.scroll-reveal:not(.visible)').forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('visible');
        }
    });
}, { passive: true });

console.log('✅ Scroll Reveal - Animaciones inicializadas correctamente');