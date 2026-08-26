/* ========================================
   APLICACIÓN PRINCIPAL - IASD BELÉN
   Código general de la iglesia
   ======================================== */

// ========== SISTEMA DE AUTENTICACIÓN ==========

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

let session = {
    usuario: null,
    nivel: 1,
    nombre: 'Visitante'
};

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
        session.usuario = username;
        session.nivel = user.nivel;
        session.nombre = user.nombre;

        localStorage.setItem('iasd_session', JSON.stringify({
            usuario: username,
            nivel: user.nivel,
            nombre: user.nombre
        }));

        actualizarUI();
        alert(`✅ ¡Bienvenido ${user.nombre}!`);
        usernameInput.value = '';
        passwordInput.value = '';
        showPage('home');
        console.log(`✅ Sesión iniciada: ${user.nombre} (Nivel ${user.nivel})`);
    } else {
        alert('❌ Usuario o contraseña incorrectos');
        console.warn('⚠️ Intento de login fallido:', username);
    }
}

function logout() {
    session.usuario = null;
    session.nivel = 1;
    session.nombre = 'Visitante';
    localStorage.removeItem('iasd_session');
    actualizarUI();
    showPage('home');
    console.log('🔓 Sesión cerrada');
}

function tieneAcceso(pageId) {
    const nivelRequerido = window.PAGINAS?.[pageId]?.nivel || 1;
    return session.nivel >= nivelRequerido;
}

function verificarAcceso(pageId) {
    if (!tieneAcceso(pageId)) {
        const mensaje = document.getElementById('mensajeAccesoDenegado');
        if (mensaje) {
            const nivelReq = window.PAGINAS?.[pageId]?.nivel || 1;
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

function toggleLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const isHidden = loginForm.style.display === 'none' || loginForm.style.display === '';
        loginForm.style.display = isHidden ? 'block' : 'none';
    }
}

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

    const cerrarModalEvento = () => {
        if (modal) modal.classList.remove('active');
    };

    if (btnCerrar) btnCerrar.addEventListener('click', cerrarModalEvento);
    if (btnCancelar) btnCancelar.addEventListener('click', cerrarModalEvento);

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) cerrarModalEvento();
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
            cerrarModalEvento();
        });

        inputNombre.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                btnGuardar.click();
            }
        });
    }

    function getInitialRoute() {
        if (window.location.hash) {
            const h = window.location.hash.substring(1).replace(/^\//, '').trim();
            if (h) return h;
        }
        const path = window.location.pathname.replace(/^\/|\/$/g, '').trim();
        if (path && path !== 'index.html' && path !== 'index' && typeof PAGINAS !== 'undefined' && PAGINAS[path]) {
            return path;
        }
        return 'home';
    }

    window.addEventListener('hashchange', () => {
        const route = getInitialRoute();
        showPage(route);
    });

    window.addEventListener('popstate', () => {
        const route = getInitialRoute();
        showPage(route);
    });

    const initialRoute = getInitialRoute();
    showPage(initialRoute);

    // Carga inmediata de anuncios públicos desde Supabase al inicializar la app
    if (typeof cargarAnunciosPublicos === 'function') {
        cargarAnunciosPublicos();
    }

    console.log('✅ IASD Belén Web App inicializada correctamente');
});

// ========================================
// CARGA INMEDIATA DE ANUNCIOS PÚBLICOS
// ========================================

async function cargarAnunciosPublicos() {
    // 1. Mostrar de inmediato lo que exista en almacenamiento local
    if (typeof window.renderizarAnunciosPublicos === 'function') {
        window.renderizarAnunciosPublicos();
    }

    // 2. Consultar Supabase en segundo plano o al cargar para obtener la versión más reciente
    const client = window.supabaseClient;
    if (!client) {
        // Si el cliente aún se está inicializando, programar un reintento no bloqueante
        setTimeout(() => {
            if (window.supabaseClient && typeof window.cargarAnunciosPublicos === 'function') {
                window.cargarAnunciosPublicos();
            }
        }, 600);
        return;
    }

    try {
        const { data, error } = await client
            .from('anuncios')
            .select('*');

        if (error) {
            // Fallback silencioso con datos locales
            console.warn('ℹ️ Carga pública de anuncios usando almacenamiento local');
            return;
        }

        if (Array.isArray(data)) {
            const normalizados = data.map(r => {
                if (!r) return null;
                const fInicio = r.fecha_inicio || r.fechaInicio || (r.fecha ? String(r.fecha).substring(0, 10) : '');
                const fFin = r.fecha_fin || r.fechaFin || fInicio;
                const hInicio = r.hora_inicio || r.horaInicio || r.hora || '';
                const hFin = r.hora_fin || r.horaFin || hInicio;
                return {
                    id: r.id != null ? String(r.id) : String(Date.now()),
                    titulo: r.titulo || '',
                    contenido: r.contenido || r.descripcion || '',
                    categoria: r.categoria || 'General',
                    ubicacion: r.ubicacion || 'Templo Principal',
                    fecha_inicio: fInicio,
                    hora_inicio: hInicio,
                    fecha_fin: fFin,
                    hora_fin: hFin,
                    fechaInicio: fInicio,
                    fechaFin: fFin,
                    horaInicio: hInicio,
                    horaFin: hFin,
                    imagen: r.imagen || r.image || r.url || '',
                    activo: r.activo !== undefined ? Boolean(r.activo) : true
                };
            }).filter(Boolean);

            try {
                localStorage.setItem('anuncios_eventos', JSON.stringify(normalizados));
            } catch (e) {}

            // Notificar sincronización y refrescar vista pública
            window.dispatchEvent(new CustomEvent('datosAnunciosActualizados'));
            window.dispatchEvent(new CustomEvent('supabase_synced_anuncios_eventos', { detail: normalizados }));
            
            if (typeof window.renderizarAnunciosPublicos === 'function') {
                window.renderizarAnunciosPublicos();
            }
        }
    } catch (err) {
        // Fallback silencioso offline
        console.warn('ℹ️ Modo offline activo para anuncios públicos');
    }
}

window.cargarAnunciosPublicos = cargarAnunciosPublicos;

// Carga automática al instanciar
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setTimeout(cargarAnunciosPublicos, 50);
}
window.addEventListener('supabase_connection_status', (e) => {
    if (e?.detail?.ok) {
        cargarAnunciosPublicos();
    }
});

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

function abrirModalConfirmacionContacto(nombre) {
    const modal = document.getElementById('modalConfirmacionContacto');
    const textoNombre = document.getElementById('confirmacionNombreTexto');
    if (textoNombre) {
        if (nombre && nombre.trim() !== '') {
            textoNombre.textContent = `¡Gracias, ${nombre.trim()}!`;
        } else {
            textoNombre.textContent = '¡Gracias!';
        }
    }
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function cerrarModalConfirmacionContacto(event) {
    if (event && event.target && event.target.id !== 'modalConfirmacionContacto' && event.target.className !== 'modal-overlay') {
        return;
    }
    const modal = document.getElementById('modalConfirmacionContacto');
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
    const modalConfirmacion = document.getElementById('modalConfirmacionContacto');
    if (modalConfirmacion && event.target === modalConfirmacion) {
        cerrarModalConfirmacionContacto(event);
    }
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        cerrarModal();
        cerrarModalConfirmacionContacto();
    }
});

function enviarFormulario(event) {
    event.preventDefault();

    const nombreInput = document.getElementById('modalNombre');
    const whatsappInput = document.getElementById('modalWhatsapp');
    const emailInput = document.getElementById('modalEmail');

    const nombre = nombreInput ? nombreInput.value.trim() : '';
    const whatsapp = whatsappInput ? whatsappInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';

    if (!nombre || !whatsapp) {
        alert('⚠️ Por favor completa los campos obligatorios (Nombre completo y WhatsApp).');
        return;
    }

    try {
        const interesados = StorageHelper.get('interesados', []);
        const nuevoInteresado = {
            id: String(Date.now()),
            nombre: nombre,
            whatsapp: whatsapp,
            email: email || 'No proporcionado',
            fecha: new Date().toISOString(),
            contactado: false
        };

        interesados.push(nuevoInteresado);
        StorageHelper.set('interesados', interesados);

        // Si la sección de administración de interesados está visible, actualizarla
        const seccion = document.getElementById('seccionVerInteresados');
        if (seccion && seccion.style.display !== 'none' && typeof window.generarHTMLInteresados === 'function') {
            seccion.innerHTML = window.generarHTMLInteresados();
        }
    } catch (e) {
        console.error('Error al guardar interesado en localStorage:', e);
    }

    cerrarModal();

    if (nombreInput) nombreInput.value = '';
    if (whatsappInput) whatsappInput.value = '';
    if (emailInput) emailInput.value = '';

    // Lanzar animación de Confetti de celebración
    if (typeof lanzarConfetti === 'function') {
        lanzarConfetti();
    }

    setTimeout(() => {
        abrirModalConfirmacionContacto(nombre);
    }, 200);
}

// ========================================
// SISTEMA DE GALERÍA DE FOTOS
// ========================================

let galeriaFotos = [];

function cargarGaleria() {
    galeriaFotos = StorageHelper.get('galeria_fotos', []);
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
                    <button data-csp-click="eliminarFoto(${index})" class="btn btn-danger btn-sm" style="margin-top: 0.5rem;">
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
        StorageHelper.set('galeria_fotos', galeriaFotos);
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
        StorageHelper.set('galeria_fotos', galeriaFotos);
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

// ========================================
// SISTEMA DE PROTECCIÓN POR NIVELES
// ========================================

function verificarNivelAcceso(pageId) {
    if (window.PAGINAS && window.PAGINAS[pageId]) {
        const nivelRequerido = window.PAGINAS[pageId].nivel || 1;
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

// ========================================
// SCROLL REVEAL - ANIMACIONES
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

// Integración de Scroll Reveal con cambios de página
window.addEventListener('pageChanged', function () {
    setTimeout(() => {
        resetScrollReveal();
        setTimeout(() => {
            initScrollReveal();
            document.querySelectorAll('.scroll-reveal:not(.visible)').forEach(el => {
                if (isElementInViewport(el)) {
                    el.classList.add('visible');
                }
            });
        }, 200);
    }, 100);
});

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

// ========================================
// GRUPOS PEQUEÑOS
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

function obtenerMesAnnoActual() {
    const hoy = new Date();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    return `${hoy.getFullYear()}-${mm}`;
}

function cargarPredicadoresFechasPublico() {
    if (window.StorageHelper) {
        return window.StorageHelper.get('cronograma_predicadores_fechas', {});
    }
    try {
        const raw = localStorage.getItem('cronograma_predicadores_fechas');
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        return {};
    }
}

function calcularFechasDelMesPublico(ano, mesIndex, diaSemanaTarget) {
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

function generarHTMLTablaPredicadoresPublico(actividadNombre, mesAnno, diaSemanaTarget, targetContainerId) {
    if (!mesAnno) mesAnno = obtenerMesAnnoActual();
    const parts = mesAnno.split('-');
    const ano = parseInt(parts[0], 10);
    const mesIndex = parseInt(parts[1], 10) - 1;

    const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mesNombre = nombresMeses[mesIndex] || '';

    const data = cargarPredicadoresFechasPublico();
    const actData = data[actividadNombre] || {};

    const fechas = calcularFechasDelMesPublico(ano, mesIndex, diaSemanaTarget);

    let html = `
    <div class="cronograma-publico-card" style="background: white; border-radius: 1.2rem; padding: 1.2rem; margin-top: 1rem; border: 1px solid rgba(201,157,59,0.2); box-shadow: 0 4px 15px rgba(0,0,0,0.04);">
        <div class="cronograma-publico-header" style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.8rem; border-bottom: 2px solid var(--cream-dark); padding-bottom: 0.8rem; margin-bottom: 0.8rem;">
            <div class="titulo-actividad" style="display: flex; align-items: center; gap: 0.6rem; font-weight: 700; color: var(--deep-blue); font-size: 1rem;">
                <i class="fas fa-calendar-alt" style="color: var(--golden);"></i>
                <span>Cronograma de Predicadores / Encargados</span>
            </div>
            <div class="selector-mes-wrapper" style="display: flex; align-items: center; gap: 0.5rem;">
                <label style="font-size: 0.85rem; font-weight: 600; color: var(--muted-text);">Mes:</label>
                <input type="month" value="${mesAnno}" data-csp-change="cambiarMesPublico('${actividadNombre}', this.value, '${targetContainerId}', ${diaSemanaTarget})" style="padding: 0.35rem 0.7rem; border: 1px solid #cbd5e1; border-radius: 0.6rem; font-family: Inter, sans-serif; font-size: 0.85rem; outline: none; cursor: pointer; color: var(--deep-blue); font-weight: 600;">
            </div>
        </div>

        <div class="mes-subtitulo" style="font-weight: 700; color: var(--golden); font-size: 0.9rem; margin-bottom: 0.8rem; text-align: left;">
            📆 ${mesNombre} ${ano}
        </div>

        <div class="tabla-responsive" style="overflow-x: auto;">
            <table class="tabla-cronograma" style="width: 100%; border-collapse: collapse; font-size: 0.9rem; text-align: left;">
                <thead>
                    <tr style="background: var(--cream); color: var(--deep-blue);">
                        <th style="padding: 0.6rem 0.8rem; border-radius: 0.6rem 0 0 0.6rem; font-weight: 700;">Fecha</th>
                        <th style="padding: 0.6rem 0.8rem; border-radius: 0 0.6rem 0.6rem 0; font-weight: 700;">Predicador / Encargado</th>
                    </tr>
                </thead>
                <tbody>
    `;

    if (fechas.length === 0) {
        html += `<tr><td colspan="2" style="padding: 0.8rem; text-align: center; color: var(--muted-text);">No hay fechas programadas para este mes.</td></tr>`;
    } else {
        fechas.forEach(fechaStr => {
            const [fAno, fMes, fDia] = fechaStr.split('-');
            const fechaFormateada = `${fDia}/${fMes}/${fAno}`;
            const predicador = actData[fechaStr];

            html += `
            <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 0.6rem 0.8rem; font-weight: 600; color: var(--dark-text); white-space: nowrap;">📅 ${fechaFormateada}</td>
                <td style="padding: 0.6rem 0.8rem;">
                    ${predicador ? `<span style="background: #e0f2fe; color: #0369a1; font-weight: 700; padding: 0.3rem 0.8rem; border-radius: 1rem; display: inline-block; font-size: 0.85rem;">👤 ${predicador}</span>` : `<span style="background: #f1f5f9; color: #64748b; font-weight: 600; padding: 0.3rem 0.8rem; border-radius: 1rem; display: inline-block; font-size: 0.85rem; font-style: italic;">No asignado</span>`}
                </td>
            </tr>
            `;
        });
    }

    html += `
                </tbody>
            </table>
        </div>
    </div>
    `;

    return html;
}

function cambiarMesPublico(actividadNombre, nuevoMesAnno, targetContainerId, diaSemanaTarget) {
    const el = document.getElementById(targetContainerId);
    if (el) {
        el.innerHTML = generarHTMLTablaPredicadoresPublico(actividadNombre, nuevoMesAnno, diaSemanaTarget, targetContainerId);
    }
}

function cerrarGrupoCard() {
    const container = document.getElementById('grupoCardContainer');
    if (container) {
        container.classList.remove('active');
    }
}

function mostrarGrupo(grupoId) {
    if (typeof window.cerrarMenuMovilYDropdowns === 'function') {
        window.cerrarMenuMovilYDropdowns();
    }
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

    const mesAnnoActual = obtenerMesAnnoActual();

    const votoTexto = grupo.voto || 'Por amor a Jesús, me comprometo a participar activamente en mi Grupo Pequeño, amando y compartiendo el evangelio.';
    const lemaTexto = grupo.lema || 'Unidos para amar, servir y salvar.';
    const himnoTexto = grupo.himno || 'En los pasos de Jesús (Himno 528)';

    container.innerHTML = `
        <div class="grupo-card">
            <button class="grupo-card-close" data-csp-click="cerrarGrupoCard()" title="Cerrar">&times;</button>
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
            <div class="info-line">
                <i class="fas fa-scroll"></i>
                <span><strong>Voto:</strong> ${votoTexto}</span>
            </div>
            <div class="info-line">
                <i class="fas fa-flag"></i>
                <span><strong>Lema:</strong> ${lemaTexto}</span>
            </div>
            <div class="info-line">
                <i class="fas fa-music"></i>
                <span><strong>Himno:</strong> ${himnoTexto}</span>
            </div>
            <div class="versiculo">
                <i class="fas fa-bible" style="margin-right: 0.5rem; opacity: 0.6;"></i>
                ${grupo.versiculo}
            </div>

            <!-- SECCIÓN CRONOGRAMA DE PREDICADORES POR FECHA -->
            <div id="cronogramaGrupoContainer_${grupoId}">
                ${generarHTMLTablaPredicadoresPublico(grupo.nombre, mesAnnoActual, 2, `cronogramaGrupoContainer_${grupoId}`)}
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
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    const parent = document.querySelector('.grupos-pequenos-item');
    if (parent) {
        parent.classList.toggle('open');
    }
}

function abrirSelectorGruposPequenos() {
    const modal = document.getElementById('modalSelectorGrupos');
    if (!modal) {
        if (typeof window.showPage === 'function') {
            window.showPage('cronograma');
        }
        return;
    }
    renderizarContenidoSelectorGrupos();
    modal.style.display = 'flex';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function cerrarSelectorGruposPequenos(e) {
    if (e && e.target && e.target !== document.getElementById('modalSelectorGrupos') && !e.target.classList.contains('modal-grupos-close')) {
        return;
    }
    const modal = document.getElementById('modalSelectorGrupos');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
    document.body.style.overflow = '';
}

function renderizarContenidoSelectorGrupos() {
    const contenedor = document.getElementById('gridSelectorGruposContenido');
    if (!contenedor) return;

    let html = '';
    Object.keys(GRUPOS_PEQUEÑOS).forEach(key => {
        const g = GRUPOS_PEQUEÑOS[key];
        html += `
        <div style="background: white; border: 1px solid rgba(201,157,59,0.25); border-radius: 1.2rem; padding: 1.1rem; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 4px 15px rgba(0,0,0,0.03); transition: transform 0.2s, box-shadow 0.2s;">
            <div>
                <div style="display: flex; align-items: center; gap: 0.7rem; margin-bottom: 0.6rem;">
                    <div style="width: 38px; height: 38px; border-radius: 50%; background: rgba(237,108,2,0.12); color: #ed6c02; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; flex-shrink: 0;">
                        <i class="fas ${g.icono}"></i>
                    </div>
                    <div>
                        <h4 style="margin: 0; color: var(--deep-blue); font-size: 1.05rem; font-weight: 700; text-align: left;">${g.nombre}</h4>
                        <span style="font-size: 0.78rem; color: #ed6c02; font-weight: 600; display: block; text-align: left;">Martes de GP</span>
                    </div>
                </div>
                <div style="font-size: 0.84rem; color: #475569; margin-bottom: 0.4rem; line-height: 1.4; text-align: left;">
                    <div><strong>Líder:</strong> ${g.responsable}</div>
                    <div><strong>Anfitrión:</strong> ${g.anfitrion}</div>
                    <div style="font-size: 0.8rem; color: #64748b; margin-top: 0.3rem;"><i class="fas fa-map-marker-alt" style="color: var(--golden);"></i> ${g.direccion}</div>
                </div>
            </div>
            <button type="button" data-csp-click="cerrarSelectorGruposPequenos(); mostrarGrupo('${key}');" class="btn btn-outline" style="width: 100%; border-radius: 1.5rem; padding: 0.45rem; font-size: 0.82rem; border-color: var(--deep-blue); color: var(--deep-blue); font-weight: 600; cursor: pointer; margin-top: 0.8rem; display: flex; align-items: center; justify-content: center; gap: 0.4rem;">
                <i class="fas fa-calendar-alt" style="color: var(--golden);"></i> Ver Cronograma <i class="fas fa-arrow-right" style="font-size: 0.75rem;"></i>
            </button>
        </div>
        `;
    });

    contenedor.innerHTML = html;
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

    const nombreInput = document.getElementById('inputNombreSolicitante');
    const telefonoInput = document.getElementById('inputTelefonoSolicitante');
    const emailInput = document.getElementById('inputEmailSolicitante');
    const libroInput = document.getElementById('inputTituloLibroPrestamo');

    const nombre = nombreInput ? nombreInput.value.trim() : '';
    const telefono = telefonoInput ? telefonoInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const libro = libroInput ? libroInput.value.trim() : '';

    if (!nombre || !libro) {
        alert('⚠️ Por favor ingresa tu nombre completo y el título del libro.');
        return;
    }

    // Guardar el pedido en localStorage con la clave libros_pedidos
    try {
        const pedidos = StorageHelper.get('libros_pedidos', []);
        pedidos.push({
            id: Date.now(),
            libroId: 0,
            solicitante: nombre,
            telefono: telefono || 'No especificado',
            email: email || 'No especificado',
            fecha: new Date().toISOString(),
            estado: 'Pendiente',
            tituloLibro: libro
        });
        StorageHelper.set('libros_pedidos', pedidos);

        // Notificar cambios para sincronizar con el panel del administrador
        window.dispatchEvent(new CustomEvent('datosBibliotecaActualizados'));
        window.dispatchEvent(new Event('datosBibliotecaActualizados'));
    } catch (e) {
        console.error('❌ Error al guardar el pedido de libro:', e);
    }

    // Limpiar campos del formulario
    if (nombreInput) nombreInput.value = '';
    if (telefonoInput) telefonoInput.value = '';
    if (emailInput) emailInput.value = '';
    if (libroInput) libroInput.value = '';

    cerrarModalPrestamo();

    setTimeout(() => {
        abrirModalConfirmacion();
    }, 300);
}

// ========================================
// EXPORTACIONES GLOBALES
// ========================================

window.login = login;
window.logout = logout;
window.tieneAcceso = tieneAcceso;
window.verificarAcceso = verificarAcceso;
window.toggleLogin = toggleLogin;
window.actualizarUI = actualizarUI;
window.abrirModal = abrirModal;
window.cerrarModal = cerrarModal;
window.enviarFormulario = enviarFormulario;
window.cargarGaleria = cargarGaleria;
window.renderGaleria = renderGaleria;
window.agregarFoto = agregarFoto;
window.eliminarFoto = eliminarFoto;
window.toggleFormularioGaleria = toggleFormularioGaleria;
window.mostrarNotificacionGaleria = mostrarNotificacionGaleria;
window.verificarNivelAcceso = verificarNivelAcceso;
window.mostrarGrupo = mostrarGrupo;
window.abrirModalPrestamo = abrirModalPrestamo;
window.cerrarModalPrestamo = cerrarModalPrestamo;
window.abrirModalConfirmacion = abrirModalConfirmacion;
window.cerrarModalConfirmacion = cerrarModalConfirmacion;
window.abrirModalConfirmacionContacto = abrirModalConfirmacionContacto;
window.cerrarModalConfirmacionContacto = cerrarModalConfirmacionContacto;
window.enviarSolicitud = enviarSolicitud;

/* ========================================
   SISTEMA DE DESBLOQUEO DE CALENDARIOS Y ENCUESTA
   Contraseña requerida: eval2026
   ======================================== */
const LLAVE_SESSION_DESBLOQUEADO = 'calendariosDesbloqueados';
const PASSWORD_CORRECTA_CANDADO = 'eval2026';

function estaDesbloqueadoCandado() {
    return sessionStorage.getItem(LLAVE_SESSION_DESBLOQUEADO) === 'true';
}

function obtenerSeccionesRestringidas() {
    return document.querySelectorAll('.calendario-wrapper, .calendario-club');
}

function aplicarEstadoBloqueoCandado() {
    const unlocked = estaDesbloqueadoCandado();
    const secciones = obtenerSeccionesRestringidas();

    secciones.forEach(seccion => {
        if (unlocked) {
            seccion.classList.remove('bloqueado-candado');
            seccion.classList.add('seccion-desbloqueada');
            const overlay = seccion.querySelector('.overlay-candado');
            if (overlay) {
                overlay.style.display = 'none';
            }
        } else {
            seccion.classList.add('bloqueado-candado');
            seccion.classList.remove('seccion-desbloqueada');

            let overlay = seccion.querySelector('.overlay-candado');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'overlay-candado';
                overlay.innerHTML = `
                    <div class="overlay-candado-content">
                        <div class="candado-icono-wrapper">
                            <i class="fas fa-lock"></i>
                        </div>
                        <span class="candado-titulo">Contenido Protegido</span>
                        <button type="button" class="btn-ver-candado" data-csp-click="abrirModalDesbloqueoCandado()">
                            <i class="fas fa-eye"></i> Ver
                        </button>
                    </div>
                `;
                seccion.appendChild(overlay);
            } else {
                overlay.style.display = 'flex';
            }
        }
    });
}

function abrirModalDesbloqueoCandado() {
    const modal = document.getElementById('modalDesbloqueoCandado');
    const input = document.getElementById('inputPasswordCandado');
    const errorDiv = document.getElementById('errorPasswordCandado');

    if (modal) {
        if (input) {
            input.value = '';
        }
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
        modal.style.display = 'flex';
        modal.classList.add('active');
        setTimeout(() => {
            if (input) input.focus();
        }, 100);
    }
}

function cerrarModalDesbloqueoCandado() {
    const modal = document.getElementById('modalDesbloqueoCandado');
    const errorDiv = document.getElementById('errorPasswordCandado');
    const input = document.getElementById('inputPasswordCandado');

    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
    }
    if (errorDiv) {
        errorDiv.style.display = 'none';
    }
    if (input) {
        input.value = '';
    }
}

function verificarPasswordCandado() {
    const input = document.getElementById('inputPasswordCandado');
    const errorDiv = document.getElementById('errorPasswordCandado');

    if (!input) return;

    const pass = input.value.trim();

    if (pass === PASSWORD_CORRECTA_CANDADO) {
        sessionStorage.setItem(LLAVE_SESSION_DESBLOQUEADO, 'true');
        aplicarEstadoBloqueoCandado();
        cerrarModalDesbloqueoCandado();
    } else {
        if (errorDiv) {
            errorDiv.style.display = 'block';
        }
        input.value = '';
        input.focus();
    }
}

// Event Listeners e Inicialización Global
document.addEventListener('DOMContentLoaded', () => {
    aplicarEstadoBloqueoCandado();

    // Backdrop click
    const modal = document.getElementById('modalDesbloqueoCandado');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                cerrarModalDesbloqueoCandado();
            }
        });
    }

    // Tecla Enter en el input de contraseña
    const input = document.getElementById('inputPasswordCandado');
    if (input) {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                verificarPasswordCandado();
            }
        });
    }
});

// ===== VISTAS PÚBLICAS DEL CRONOGRAMA DE LA IGLESIA =====

const ACTIVIDADES_MAPA = {
    'canto': { nombre: 'Canto', diaSemana: 6, diaNombre: 'Sábados', icono: 'fa-music', categoria: 'Culto' },
    'escuela-sabatica': { nombre: 'Escuela Sabática', diaSemana: 6, diaNombre: 'Sábados', icono: 'fa-book-open', categoria: 'Culto' },
    'minuto-misionero': { nombre: 'Minuto Misionero', diaSemana: 6, diaNombre: 'Sábados', icono: 'fa-globe-americas', categoria: 'Culto' },
    'culto': { nombre: 'Predica', diaSemana: 6, diaNombre: 'Sábados', icono: 'fa-bible', categoria: 'Culto' },
    'sociedad-jovenes': { nombre: 'Sociedad de Jóvenes', diaSemana: 6, diaNombre: 'Sábados (tarde)', icono: 'fa-users', categoria: 'Sociedad de Jóvenes' },
    'lunes-oracion': { nombre: 'Lunes de Oración', diaSemana: 1, diaNombre: 'Lunes', icono: 'fa-hands-praying', categoria: 'Reuniones de Oración' },
    'miercoles-testimonio': { nombre: 'Miércoles de Testimonio', diaSemana: 3, diaNombre: 'Miércoles', icono: 'fa-comment-dots', categoria: 'Reuniones de Oración' }
};

function renderizarActividadPublica(pageId, mesAnno) {
    const pageEl = document.getElementById(pageId);
    if (!pageEl) return;

    if (!mesAnno) mesAnno = obtenerMesAnnoActual();

    const info = ACTIVIDADES_MAPA[pageId] || { nombre: pageId, diaSemana: 6, diaNombre: 'Sábados', icono: 'fa-calendar', categoria: 'Cronograma' };

    pageEl.innerHTML = `
        <button class="back-link" data-csp-click="showPage('home')"><i class="fas fa-arrow-left"></i> Volver al Inicio</button>
        <div class="service-box" style="max-width: 900px; margin: 0 auto;">
            <div style="display:flex; align-items:center; gap:1rem; margin-bottom:1.5rem; border-bottom:2px solid var(--cream-dark); padding-bottom:1rem;">
                <div style="width:50px; height:50px; background:linear-gradient(135deg, var(--deep-blue) 0%, var(--deep-blue-light) 100%); border-radius:50%; display:flex; align-items:center; justify-content:center; color:var(--golden); font-size:1.5rem;">
                    <i class="fas ${info.icono}"></i>
                </div>
                <div>
                    <h2 style="margin:0; text-align:left; color:var(--deep-blue);">${info.nombre}</h2>
                    <span style="color:var(--muted-text); font-size:0.9rem;">Categoría: ${info.categoria} • ${info.diaNombre}</span>
                </div>
            </div>

            <div id="containerActividadPublica_${pageId}">
                ${generarHTMLTablaPredicadoresPublico(info.nombre, mesAnno, info.diaSemana, `containerActividadPublica_${pageId}`)}
            </div>
        </div>
    `;
}

function renderizarCronogramaPublico(mesAnno) {
    const pageEl = document.getElementById('cronograma');
    if (!pageEl) return;

    if (!mesAnno) mesAnno = obtenerMesAnnoActual();

    const parts = mesAnno.split('-');
    const ano = parseInt(parts[0], 10);
    const mesIndex = parseInt(parts[1], 10) - 1;

    const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const mesNombre = nombresMeses[mesIndex] || '';

    const categorias = [
        {
            titulo: 'Culto Divino',
            icono: 'fa-pray',
            actividades: [
                { nombre: 'Canto', diaSemana: 6 },
                { nombre: 'Escuela Sabática', diaSemana: 6 },
                { nombre: 'Minuto Misionero', diaSemana: 6 },
                { nombre: 'Predica', diaSemana: 6 }
            ]
        },
        {
            titulo: 'Sociedad de Jóvenes',
            icono: 'fa-users',
            actividades: [
                { nombre: 'Sociedad de Jóvenes', diaSemana: 6 }
            ]
        },
        {
            titulo: 'Reuniones de Oración',
            icono: 'fa-hands-praying',
            actividades: [
                { nombre: 'Lunes de Oración', diaSemana: 1 },
                { nombre: 'Miércoles de Testimonio', diaSemana: 3 }
            ]
        },
        {
            titulo: 'Grupos Pequeños',
            icono: 'fa-home',
            actividades: [
                { nombre: 'Unidos en Verdad', diaSemana: 2 },
                { nombre: 'Mansión Gloriosa', diaSemana: 2 },
                { nombre: 'Mansión Gloriosa Kid', diaSemana: 2 },
                { nombre: 'Aposento Alto', diaSemana: 2 },
                { nombre: 'Jehová Jireh', diaSemana: 2 },
                { nombre: 'Maranatha 1', diaSemana: 2 },
                { nombre: 'Maranatha 2', diaSemana: 2 },
                { nombre: 'Ah de Venir', diaSemana: 2 }
            ]
        }
    ];

    let html = `
        <button class="back-link" data-csp-click="showPage('home')"><i class="fas fa-arrow-left"></i> Volver al Inicio</button>
        <div class="service-box" style="max-width:1100px; margin:0 auto; padding:2rem;">
            <div style="text-align:center; margin-bottom:2rem;">
                <h2 style="color:var(--deep-blue); font-size:2rem; font-family:'Montserrat',sans-serif; margin-bottom:0.5rem;">
                    <i class="fas fa-calendar-alt" style="color:var(--golden);"></i> Cronograma de Actividades y Predicadores
                </h2>
                <p style="color:var(--muted-text); font-size:1rem;">Consulta las fechas y responsables asignados para cada servicio de la iglesia.</p>
            </div>

            <div style="background:var(--cream); padding:1.2rem 1.8rem; border-radius:1.2rem; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:center; gap:1rem; margin-bottom:2rem; border:1px solid rgba(201,157,59,0.2);">
                <div style="display:flex; align-items:center; gap:0.8rem;">
                    <label style="font-weight:700; color:var(--deep-blue); font-size:0.95rem;">📆 Seleccionar Mes:</label>
                    <input type="month" value="${mesAnno}" data-csp-change="renderizarCronogramaPublico(this.value)" style="padding:0.5rem 0.9rem; border:1px solid #cbd5e1; border-radius:0.6rem; font-family:Inter,sans-serif; font-size:0.95rem; font-weight:600; color:var(--deep-blue); outline:none; cursor:pointer;">
                </div>
                <span style="font-weight:700; color:var(--deep-blue); background:white; padding:0.5rem 1.2rem; border-radius:1rem; border:1px solid rgba(11,43,79,0.1); font-size:1rem;">
                    📅 ${mesNombre} ${ano}
                </span>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.8rem;">
    `;

    categorias.forEach((cat, cIdx) => {
        html += `
        <div style="background:white; border-radius:1.2rem; padding:1.5rem; border:1px solid #e2e8f0; box-shadow:0 4px 15px rgba(0,0,0,0.03);">
            <div style="display:flex; align-items:center; gap:0.7rem; border-bottom:2px solid var(--golden); padding-bottom:0.7rem; margin-bottom:1.2rem;">
                <i class="fas ${cat.icono}" style="color:var(--golden); font-size:1.3rem;"></i>
                <h3 style="margin:0; font-size:1.2rem; color:var(--deep-blue); font-weight:700;">${cat.titulo}</h3>
            </div>
            <div style="display:flex; flex-direction:column; gap:1.2rem;">
        `;

        cat.actividades.forEach((act, aIdx) => {
            const containerId = `cPublic_${cIdx}_${aIdx}`;
            html += `
            <div style="background:#fafbfc; border:1px solid #e2e8f0; border-radius:0.8rem; padding:0.8rem;">
                <h4 style="margin:0 0 0.5rem 0; font-size:1rem; color:var(--deep-blue); font-weight:700; text-align:left;">${act.nombre}</h4>
                <div id="${containerId}">
                    ${generarHTMLTablaPredicadoresPublico(act.nombre, mesAnno, act.diaSemana, containerId)}
                </div>
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

    pageEl.innerHTML = html;
}

window.addEventListener('datosCronogramaActualizados', () => {
    const cronoPage = document.getElementById('cronograma');
    if (cronoPage && cronoPage.classList.contains('active')) {
        const inputMonth = cronoPage.querySelector('input[type="month"]');
        const currentMonth = inputMonth ? inputMonth.value : obtenerMesAnnoActual();
        renderizarCronogramaPublico(currentMonth);
    }
});

window.addEventListener('supabase_synced_cronograma_predicadores_fechas', () => {
    const cronoPage = document.getElementById('cronograma');
    if (cronoPage && cronoPage.classList.contains('active')) {
        const inputMonth = cronoPage.querySelector('input[type="month"]');
        const currentMonth = inputMonth ? inputMonth.value : obtenerMesAnnoActual();
        renderizarCronogramaPublico(currentMonth);
    }
});

// Exportar a window
window.abrirModalDesbloqueoCandado = abrirModalDesbloqueoCandado;
window.cerrarModalDesbloqueoCandado = cerrarModalDesbloqueoCandado;
window.verificarPasswordCandado = verificarPasswordCandado;
window.aplicarEstadoBloqueoCandado = aplicarEstadoBloqueoCandado;
window.mostrarGrupo = mostrarGrupo;
window.cerrarGrupoCard = cerrarGrupoCard;
window.abrirSelectorGruposPequenos = abrirSelectorGruposPequenos;
window.cerrarSelectorGruposPequenos = cerrarSelectorGruposPequenos;
window.renderizarContenidoSelectorGrupos = renderizarContenidoSelectorGrupos;
window.renderizarCronogramaPublico = renderizarCronogramaPublico;
window.renderizarActividadPublica = renderizarActividadPublica;
window.cambiarMesPublico = cambiarMesPublico;

window.cambiarMesPublico = cambiarMesPublico;
window.cargarPredicadoresFechasPublico = cargarPredicadoresFechasPublico;
window.generarHTMLTablaPredicadoresPublico = generarHTMLTablaPredicadoresPublico;
window.cerrarGrupoCard = cerrarGrupoCard;
window.mostrarGrupo = mostrarGrupo;

/* ========================================
   SCROLL REVEAL Y ANIMACIONES EN UNIFORMES
   ======================================== */
function inicializarAnimacionesUniformes() {
    const cards = document.querySelectorAll('.uniforme-card');
    if (!cards.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('reveal-visible');
                    }, (index % 3) * 120);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        cards.forEach(card => {
            if (!card.classList.contains('reveal-visible')) {
                observer.observe(card);
            }
        });
    } else {
        cards.forEach(card => card.classList.add('reveal-visible'));
    }
}

document.addEventListener('DOMContentLoaded', inicializarAnimacionesUniformes);
window.inicializarAnimacionesUniformes = inicializarAnimacionesUniformes;

function cerrarModalInscripcion() {
    const modal = document.getElementById('modalInscripcion');
    if (modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
    document.body.style.overflow = '';
}
window.cerrarModalInscripcion = cerrarModalInscripcion;

/* ==========================================================================
   4 MEJORAS VISUALES E INTERACTIVAS DEL HOME (IASD BELÉN)
   ========================================================================== */

/* 1. PARALLAX MULTI-CAPA Y PARTÍCULAS EN EL HERO */
function initHeroParallax() {
    const heroSection = document.getElementById('heroParallax');
    if (!heroSection) return;

    const capaFondo = heroSection.querySelector('.hero-capa-fondo');
    const capaParticulas = heroSection.querySelector('.hero-capa-particulas');
    const capaTexto = heroSection.querySelector('.hero-capa-texto');
    const canvas = document.getElementById('heroParticlesCanvas');

    // Canvas de Partículas Doradas Animadas
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = (canvas.width = heroSection.clientWidth || 800);
        let height = (canvas.height = heroSection.clientHeight || 450);

        window.addEventListener('resize', () => {
            if (heroSection && canvas) {
                width = canvas.width = heroSection.clientWidth;
                height = canvas.height = heroSection.clientHeight;
            }
        });

        const dots = [];
        const numDots = 35;
        for (let i = 0; i < numDots; i++) {
            dots.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 2.2 + 1,
                vx: (Math.random() - 0.5) * 0.3,
                vy: -Math.random() * 0.4 - 0.15,
                alpha: Math.random() * 0.6 + 0.2,
                pulse: Math.random() * 0.02 + 0.005
            });
        }

        function drawDots() {
            ctx.clearRect(0, 0, width, height);
            dots.forEach(d => {
                d.x += d.vx;
                d.y += d.vy;
                d.alpha += Math.sin(Date.now() * d.pulse) * 0.003;

                if (d.y < 0) d.y = height;
                if (d.x < 0) d.x = width;
                if (d.x > width) d.x = 0;

                ctx.save();
                ctx.globalAlpha = Math.max(0.15, Math.min(0.85, d.alpha));
                ctx.fillStyle = '#dfb75c';
                ctx.shadowBlur = 6;
                ctx.shadowColor = '#c99d3b';
                ctx.beginPath();
                ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            });
            requestAnimationFrame(drawDots);
        }
        drawDots();
    }

    // Movimiento Parallax al Hacer Scroll
    let ticking = false;
    function updateParallax() {
        if (window.innerWidth <= 768) return; // Desactivar en celulares

        const rect = heroSection.getBoundingClientRect();
        if (rect.bottom >= 0 && rect.top <= window.innerHeight) {
            const scrollY = window.scrollY || window.pageYOffset;
            const fondoOffset = scrollY * 0.22;
            const particulasOffset = scrollY * 0.48;
            const textoOffset = scrollY * 0.08;

            if (capaFondo) capaFondo.style.transform = `translateY(${fondoOffset}px)`;
            if (capaParticulas) capaParticulas.style.transform = `translateY(${particulasOffset}px)`;
            if (capaTexto) capaTexto.style.transform = `translateY(${textoOffset}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

/* 2. EFECTO CONFETTI CELEBRATIVO AL ENVIAR FORMULARIO */
function lanzarConfetti() {
    let canvas = document.getElementById('confettiCanvas');
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'confettiCanvas';
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100vw';
        canvas.style.height = '100vh';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '99999';
        document.body.appendChild(canvas);
    }

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#c99d3b', '#dfb75c', '#0b2b4f', '#00bcd4', '#e91e63', '#4caf50', '#ffffff'];
    const particles = [];
    const count = 90;

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height * 0.3 - 20,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 4,
            vy: Math.random() * 3.5 + 2,
            rotation: Math.random() * 360,
            vRot: (Math.random() - 0.5) * 8,
            opacity: 1,
            shape: Math.random() > 0.4 ? 'rect' : 'circle'
        });
    }

    let startTime = performance.now();
    const duration = 2800; // 2.8s

    function animateConfetti(now) {
        const elapsed = now - startTime;
        const progress = elapsed / duration;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.rotation += p.vRot;
            if (progress > 0.6) {
                p.opacity = Math.max(0, 1 - (progress - 0.6) / 0.4);
            }

            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.translate(p.x, p.y);
            ctx.rotate((p.rotation * Math.PI) / 180);
            ctx.fillStyle = p.color;

            if (p.shape === 'rect') {
                ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        });

        if (elapsed < duration) {
            requestAnimationFrame(animateConfetti);
        } else {
            if (canvas && canvas.parentNode) {
                canvas.parentNode.removeChild(canvas);
            }
        }
    }

    requestAnimationFrame(animateConfetti);
}
window.lanzarConfetti = lanzarConfetti;

/* 3. MODAL DE BIENVENIDA PARA PRIMERIZOS */
function initModalBienvenida() {
    try {
        const yaVisto = localStorage.getItem('bienvenidaMostrada');
        if (!yaVisto) {
            setTimeout(() => {
                const modal = document.getElementById('modalBienvenida');
                if (modal) {
                    modal.style.display = 'flex';
                }
            }, 1500);
        }
    } catch (e) {
        console.warn('Error al verificar bienvenidaMostrada:', e);
    }
}

function cerrarModalBienvenida() {
    try {
        localStorage.setItem('bienvenidaMostrada', 'true');
    } catch (e) {}
    const modal = document.getElementById('modalBienvenida');
    if (modal) {
        modal.style.display = 'none';
    }
}

function comenzarRecorrido() {
    cerrarModalBienvenida();
    if (typeof window.showPage === 'function') {
        window.showPage('visitantes');
    } else {
        const schedule = document.querySelector('.schedule-section-header');
        if (schedule) schedule.scrollIntoView({ behavior: 'smooth' });
    }
}

window.initModalBienvenida = initModalBienvenida;
window.cerrarModalBienvenida = cerrarModalBienvenida;
window.comenzarRecorrido = comenzarRecorrido;

/* 4. SELECTOR DE TEMA (CLARO / OSCURO) */
function initTema() {
    try {
        const temaGuardado = localStorage.getItem('tema');
        const esOscuro = temaGuardado === 'oscuro';

        if (esOscuro) {
            document.body.classList.add('tema-oscuro');
        } else {
            document.body.classList.remove('tema-oscuro');
        }
        actualizarBotonTema(esOscuro);
    } catch (e) {
        console.warn('Error al inicializar tema:', e);
    }
}

function toggleTema() {
    const esOscuro = document.body.classList.toggle('tema-oscuro');
    try {
        localStorage.setItem('tema', esOscuro ? 'oscuro' : 'claro');
    } catch (e) {}
    actualizarBotonTema(esOscuro);
}

function actualizarBotonTema(esOscuro) {
    const icono = document.getElementById('iconoTema');
    const texto = document.getElementById('textoTema');
    if (icono) {
        icono.className = esOscuro ? 'fas fa-sun' : 'fas fa-moon';
    }
    if (texto) {
        texto.textContent = esOscuro ? 'Claro' : 'Oscuro';
    }
}

window.initTema = initTema;
window.toggleTema = toggleTema;

/* 5. SECCIÓN ESTADÍSTICAS ANIMADAS (COUNT-UP) */
function initEstadisticasCountUp() {
    const section = document.getElementById('estadisticas');
    if (!section) return;

    const numElements = section.querySelectorAll('.estadistica-numero');
    let animated = false;

    function formatearNumero(valor) {
        if (valor >= 1000000) {
            const millones = Math.floor(valor / 1000000);
            return millones + ' Millones';
        }
        return valor.toLocaleString('es-CO');
    }

    function animarElemento(el) {
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1100; // 1.1s para dinamismo rápido
        const startTime = performance.now();

        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * target);

            el.textContent = `${prefix}${formatearNumero(currentVal)}${suffix}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                el.textContent = `${prefix}${formatearNumero(target)}${suffix}`;
            }
        }
        requestAnimationFrame(update);
    }

    function triggerCountUp() {
        if (animated) return;
        animated = true;
        numElements.forEach(el => animarElemento(el));
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    triggerCountUp();
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        observer.observe(section);
    } else {
        triggerCountUp();
    }
}

window.initEstadisticasCountUp = initEstadisticasCountUp;

/* 6. BOTÓN DE ACCIÓN FLOTANTE (FAB) UNIFICADO */
function toggleFabMenu() {
    const container = document.getElementById('fabContainer');
    const fabBtn = document.getElementById('fabBtn');
    if (!container) return;

    const isOpen = container.classList.toggle('open');
    if (fabBtn) {
        fabBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
}

function cerrarFabMenu() {
    const container = document.getElementById('fabContainer');
    const fabBtn = document.getElementById('fabBtn');
    if (container && container.classList.contains('open')) {
        container.classList.remove('open');
        if (fabBtn) {
            fabBtn.setAttribute('aria-expanded', 'false');
        }
    }
}

function initFabMenu() {
    // Cerrar el FAB al hacer clic fuera
    document.addEventListener('click', (e) => {
        const container = document.getElementById('fabContainer');
        if (!container || !container.classList.contains('open')) return;
        if (!container.contains(e.target)) {
            cerrarFabMenu();
        }
    });

    // Cerrar el FAB al presionar Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            cerrarFabMenu();
        }
    });
}

window.toggleFabMenu = toggleFabMenu;
window.cerrarFabMenu = cerrarFabMenu;
window.initFabMenu = initFabMenu;

// Aliases de compatibilidad para disparadores
window.abrirTransmisiones = function () {
    if (typeof window.abrirEnVivo === 'function') window.abrirEnVivo();
};
window.abrirLMS = function () {
    if (typeof window.abrirModalEvaluacion === 'function') window.abrirModalEvaluacion();
};
window.abrirAdmin = function () {
    if (typeof window.abrirModalAdminGeneral === 'function') window.abrirModalAdminGeneral();
};

// Inicialización Automática al Cargar DOM
document.addEventListener('DOMContentLoaded', () => {
    initTema();
    initHeroParallax();
    initModalBienvenida();
    initEstadisticasCountUp();
    initFabMenu();
});

console.log('✅ app.js (Iglesia, Parallax, Confetti, Bienvenida, Tema, FAB y Estadísticas) cargado correctamente');