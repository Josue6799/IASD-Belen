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

    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.substring(1) || 'home';
        showPage(hash);
    });

    const hash = window.location.hash.substring(1) || 'home';
    showPage(hash);

    console.log('✅ IASD Belén Web App inicializada correctamente');
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

// ========================================
// SISTEMA DE GALERÍA DE FOTOS
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
window.enviarSolicitud = enviarSolicitud;

console.log('✅ app.js (Iglesia) cargado correctamente');