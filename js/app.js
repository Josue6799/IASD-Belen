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