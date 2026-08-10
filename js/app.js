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
        const interesados = JSON.parse(localStorage.getItem('interesados')) || [];
        const nuevoInteresado = {
            id: Date.now(),
            nombre: nombre,
            whatsapp: whatsapp,
            email: email || 'No proporcionado',
            fecha: new Date().toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }),
            contactado: false
        };

        interesados.push(nuevoInteresado);
        localStorage.setItem('interesados', JSON.stringify(interesados));

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

    setTimeout(() => {
        abrirModalConfirmacionContacto(nombre);
    }, 200);
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

function obtenerMesAnnoActual() {
    const hoy = new Date();
    const mm = String(hoy.getMonth() + 1).padStart(2, '0');
    return `${hoy.getFullYear()}-${mm}`;
}

function cargarPredicadoresFechasPublico() {
    try {
        return JSON.parse(localStorage.getItem('cronograma_predicadores_fechas')) || {};
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
                <input type="month" value="${mesAnno}" onchange="cambiarMesPublico('${actividadNombre}', this.value, '${targetContainerId}', ${diaSemanaTarget})" style="padding: 0.35rem 0.7rem; border: 1px solid #cbd5e1; border-radius: 0.6rem; font-family: Inter, sans-serif; font-size: 0.85rem; outline: none; cursor: pointer; color: var(--deep-blue); font-weight: 600;">
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
            <button class="grupo-card-close" onclick="cerrarGrupoCard()" title="Cerrar">&times;</button>
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
        const pedidos = JSON.parse(localStorage.getItem('libros_pedidos')) || [];
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
        localStorage.setItem('libros_pedidos', JSON.stringify(pedidos));

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
    return document.querySelectorAll('.calendario-wrapper, .calendario-club, #encuestaBox');
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
                        <button type="button" class="btn-ver-candado" onclick="abrirModalDesbloqueoCandado()">
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
        <button class="back-link" onclick="showPage('home')"><i class="fas fa-arrow-left"></i> Volver al Inicio</button>
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
        <button class="back-link" onclick="showPage('home')"><i class="fas fa-arrow-left"></i> Volver al Inicio</button>
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
                    <input type="month" value="${mesAnno}" onchange="renderizarCronogramaPublico(this.value)" style="padding:0.5rem 0.9rem; border:1px solid #cbd5e1; border-radius:0.6rem; font-family:Inter,sans-serif; font-size:0.95rem; font-weight:600; color:var(--deep-blue); outline:none; cursor:pointer;">
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

// Exportar a window
window.abrirModalDesbloqueoCandado = abrirModalDesbloqueoCandado;
window.cerrarModalDesbloqueoCandado = cerrarModalDesbloqueoCandado;
window.verificarPasswordCandado = verificarPasswordCandado;
window.aplicarEstadoBloqueoCandado = aplicarEstadoBloqueoCandado;
window.mostrarGrupo = mostrarGrupo;
window.cerrarGrupoCard = cerrarGrupoCard;
window.renderizarCronogramaPublico = renderizarCronogramaPublico;
window.renderizarActividadPublica = renderizarActividadPublica;
window.cambiarMesPublico = cambiarMesPublico;

/* ========================================
   SISTEMA DE TRANSMISIONES "EN VIVO"
   ======================================== */

const CATEGORIAS_TRANSMISIONES = [
    { nombre: 'Sábado (Culto)', icono: '🎥', color: '#1a3a4a' },
    { nombre: 'Sociedad de Jóvenes', icono: '🙌', color: '#2c5f7c' },
    { nombre: 'Lunes de Oración', icono: '🙏', color: '#d4a038' },
    { nombre: 'Miércoles de Testimonio', icono: '✝️', color: '#1a3a4a' },
    { nombre: 'Campaña', icono: '📢', color: '#c53030' }
];

const TRANSMISIONES_INICIALES = [
    {
        id: 1723650000001,
        categoria: "Sábado (Culto)",
        titulo: "Culto Divino - Dios es Nuestra Fortaleza",
        fecha: "2026-08-08",
        plataforma: "youtube",
        videoId: "dQw4w9WgXcQ",
        descripcion: "Transmisión en vivo del Culto Divino y Escuela Sabática.",
        destacado: true,
        enVivo: true,
        fechaCreacion: "2026-08-08T10:00:00.000Z"
    },
    {
        id: 1723650000002,
        categoria: "Sociedad de Jóvenes",
        titulo: "Sociedad de Jóvenes - Firmes en la Fe",
        fecha: "2026-08-01",
        plataforma: "youtube",
        videoId: "dQw4w9WgXcQ",
        descripcion: "Programa especial para jóvenes con testimonios y alabanzas.",
        destacado: true,
        enVivo: false,
        fechaCreacion: "2026-08-01T16:00:00.000Z"
    },
    {
        id: 1723650000003,
        categoria: "Lunes de Oración",
        titulo: "Lunes de Oración - Clamando con Esperanza",
        fecha: "2026-08-03",
        plataforma: "facebook",
        videoId: "https://www.facebook.com/facebook/videos/10153231379946729/",
        descripcion: "Noche de intercesión y peticiones de oración.",
        destacado: true,
        enVivo: false,
        fechaCreacion: "2026-08-03T19:00:00.000Z"
    },
    {
        id: 1723650000004,
        categoria: "Miércoles de Testimonio",
        titulo: "Miércoles de Testimonio - Bendiciones de Dios",
        fecha: "2026-08-05",
        plataforma: "youtube",
        videoId: "dQw4w9WgXcQ",
        descripcion: "Reunión congregacional para dar gloria a Dios por sus maravillas.",
        destacado: true,
        enVivo: false,
        fechaCreacion: "2026-08-05T19:00:00.000Z"
    },
    {
        id: 1723650000005,
        categoria: "Campaña",
        titulo: "Campaña Evangelística - Mensaje del Tercer Ángel",
        fecha: "2026-07-25",
        plataforma: "youtube",
        videoId: "dQw4w9WgXcQ",
        descripcion: "Gran noche de predicación y evangelismo.",
        destacado: true,
        enVivo: false,
        fechaCreacion: "2026-07-25T19:30:00.000Z"
    }
];

let videoActivoEnVivoId = null;

function obtenerTransmisiones() {
    const data = localStorage.getItem('transmisiones');
    if (!data) {
        localStorage.setItem('transmisiones', JSON.stringify(TRANSMISIONES_INICIALES));
        return TRANSMISIONES_INICIALES;
    }
    try {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : TRANSMISIONES_INICIALES;
    } catch (e) {
        return TRANSMISIONES_INICIALES;
    }
}

function guardarTransmisiones(lista) {
    localStorage.setItem('transmisiones', JSON.stringify(lista));
    actualizarBotonFlotanteEnVivo();
}

function obtenerYouTubeId(urlOrId) {
    if (!urlOrId) return '';
    urlOrId = urlOrId.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
        return urlOrId;
    }
    const match = urlOrId.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? match[1] : urlOrId;
}

function obtenerFacebookEmbedUrl(urlOrId) {
    if (!urlOrId) return '';
    urlOrId = urlOrId.trim();
    if (urlOrId.startsWith('http://') || urlOrId.startsWith('https://')) {
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(urlOrId)}&show_text=0&width=560`;
    }
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent('https://www.facebook.com/watch/?v=' + urlOrId)}&show_text=0&width=560`;
}

function obtenerThumbnailVideo(t) {
    if (t.plataforma === 'youtube') {
        const id = obtenerYouTubeId(t.videoId);
        return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
    return 'img/Logo adventista.png';
}

function abrirEnVivo() {
    const modal = document.getElementById('modalEnVivo');
    if (!modal) return;
    document.body.style.overflow = 'hidden';
    modal.style.display = 'flex';
    renderizarVistaCategoriasEnVivo();
    actualizarBotonFlotanteEnVivo();
}

function cerrarEnVivo(e) {
    if (e && e.target && e.target !== document.getElementById('modalEnVivo') && !e.target.classList.contains('envivo-close-btn')) {
        // Evitar cierre accidental si no fue en el overlay o botón de cerrar
    }
    const modal = document.getElementById('modalEnVivo');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function renderizarVistaCategoriasEnVivo() {
    const body = document.getElementById('envivoBodyContenido');
    const titulo = document.getElementById('envivoTituloModal');
    if (!body || !titulo) return;

    titulo.innerHTML = `<i class="fas fa-broadcast-tower" style="color:#c9a53b;"></i> Transmisiones En Vivo`;

    const transmisiones = obtenerTransmisiones();

    let html = `<div class="envivo-grid-categorias">`;

    CATEGORIAS_TRANSMISIONES.forEach(cat => {
        const videosCat = transmisiones.filter(t => t.categoria === cat.nombre);
        const hayLive = videosCat.some(t => t.enVivo);

        html += `
        <div class="envivo-card-cat" onclick="abrirCategoriaEnVivo('${cat.nombre}')">
            <div class="envivo-cat-icon" style="background: linear-gradient(135deg, ${cat.color} 0%, #2c5f7c 100%);">
                ${cat.icono}
            </div>
            <div class="envivo-cat-titulo">${cat.nombre}</div>
            <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap; justify-content:center;">
                <span class="envivo-cat-badge"><i class="fas fa-film"></i> ${videosCat.length} video${videosCat.length !== 1 ? 's' : ''}</span>
                ${hayLive ? '<span class="badge-live-pulse">🔴 EN VIVO</span>' : ''}
            </div>
        </div>
        `;
    });

    html += `</div>`;
    body.innerHTML = html;
}

function abrirCategoriaEnVivo(categoriaNombre) {
    const body = document.getElementById('envivoBodyContenido');
    const titulo = document.getElementById('envivoTituloModal');
    if (!body || !titulo) return;

    const catObj = CATEGORIAS_TRANSMISIONES.find(c => c.nombre === categoriaNombre) || { icono: '🎥', nombre: categoriaNombre };

    titulo.innerHTML = `
    <div style="display:flex; align-items:center; gap:0.8rem;">
        <button onclick="renderizarVistaCategoriasEnVivo()" style="background:rgba(255,255,255,0.2); border:none; color:white; padding:0.4rem 0.8rem; border-radius:1rem; font-size:0.85rem; cursor:pointer; font-weight:600; font-family:Inter,sans-serif;">
            <i class="fas fa-arrow-left"></i> Categorías
        </button>
        <span>${catObj.icono} ${categoriaNombre}</span>
    </div>
    `;

    const transmisiones = obtenerTransmisiones().filter(t => t.categoria === categoriaNombre);

    if (transmisiones.length === 0) {
        body.innerHTML = `
        <div style="text-align:center; padding:3rem 1rem;">
            <i class="fas fa-video-slash" style="font-size:3rem; color:#cbd5e1; margin-bottom:1rem;"></i>
            <h3 style="color:#1a3a4a; margin-bottom:0.5rem;">No hay transmisiones disponibles</h3>
            <p style="color:#64748b;">Aún no se han agregado transmisiones en la categoría <strong>${categoriaNombre}</strong>.</p>
            <button onclick="renderizarVistaCategoriasEnVivo()" class="btn-ver-video" style="max-width:200px; margin:1.5rem auto 0;">
                <i class="fas fa-arrow-left"></i> Volver a Categorías
            </button>
        </div>
        `;
        return;
    }

    // Ordenar por fecha (más reciente primero) y priorizar destacado / enVivo
    transmisiones.sort((a, b) => {
        if (a.enVivo && !b.enVivo) return -1;
        if (!a.enVivo && b.enVivo) return 1;
        if (a.destacado && !b.destacado) return -1;
        if (!a.destacado && b.destacado) return 1;
        return new Date(b.fecha) - new Date(a.fecha);
    });

    const videoDestacado = transmisiones.find(t => t.id === videoActivoEnVivoId) || transmisiones[0];
    videoActivoEnVivoId = videoDestacado.id;

    let iframeSrc = '';
    if (videoDestacado.plataforma === 'youtube') {
        const ytId = obtenerYouTubeId(videoDestacado.videoId);
        iframeSrc = `https://www.youtube.com/embed/${ytId}?autoplay=1`;
    } else {
        iframeSrc = obtenerFacebookEmbedUrl(videoDestacado.videoId);
    }

    let html = `
    <!-- REPRODUCTOR PRINCIPAL -->
    <div style="margin-bottom: 2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem; flex-wrap:wrap; gap:0.5rem;">
            <h3 style="margin:0; color:#1a3a4a; font-size:1.2rem; font-weight:700;">
                ${videoDestacado.titulo}
            </h3>
            <div style="display:flex; gap:0.5rem; align-items:center;">
                <span class="envivo-plat-badge envivo-plat-${videoDestacado.plataforma}" style="position:static;">
                    <i class="fab fa-${videoDestacado.plataforma}"></i> ${videoDestacado.plataforma}
                </span>
                ${videoDestacado.enVivo ? '<span class="badge-live-pulse">🔴 EN VIVO</span>' : ''}
            </div>
        </div>
        <p style="margin:0 0 1rem; color:#5a6474; font-size:0.88rem;">
            <i class="far fa-calendar-alt"></i> ${videoDestacado.fecha} ${videoDestacado.descripcion ? '· ' + videoDestacado.descripcion : ''}
        </p>

        <div class="envivo-player-container">
            <iframe src="${iframeSrc}" loading="lazy" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
    </div>
    `;

    // LISTA DE VIDEOS ANTERIORES
    if (transmisiones.length > 1) {
        html += `
        <div>
            <h4 style="color:#1a3a4a; font-size:1.05rem; font-weight:700; margin-bottom:1rem; border-bottom:2px solid #f0e6d2; padding-bottom:0.4rem;">
                <i class="fas fa-list-ul"></i> Transmisiones Anteriores (${transmisiones.length - 1})
            </h4>
            <div class="envivo-lista-videos">
        `;

        transmisiones.forEach(t => {
            if (t.id === videoDestacado.id) return; // omitir el reproduciéndose actualmente

            const thumbUrl = obtenerThumbnailVideo(t);

            html += `
            <div class="envivo-video-item">
                <div class="envivo-thumb-wrapper">
                    <img src="${thumbUrl}" alt="${t.titulo}" class="envivo-thumb-img" onerror="this.src='img/Logo adventista.png'">
                    <span class="envivo-plat-badge envivo-plat-${t.plataforma}">
                        <i class="fab fa-${t.plataforma}"></i> ${t.plataforma}
                    </span>
                    ${t.enVivo ? '<span class="badge-live-pulse" style="position:absolute; bottom:0.5rem; right:0.5rem; font-size:0.65rem; padding:0.2rem 0.5rem;">🔴 EN VIVO</span>' : ''}
                </div>
                <div class="envivo-video-info">
                    <div>
                        <div class="envivo-video-title">${t.titulo}</div>
                        <div class="envivo-video-fecha"><i class="far fa-calendar-alt"></i> ${t.fecha}</div>
                    </div>
                    <button onclick="conmutarVideo(${t.id}, '${categoriaNombre}')" class="btn-ver-video">
                        <i class="fas fa-play"></i> Ver Transmisión
                    </button>
                </div>
            </div>
            `;
        });

        html += `
            </div>
        </div>
        `;
    }

    body.innerHTML = html;
}

function conmutarVideo(id, categoriaNombre) {
    videoActivoEnVivoId = id;
    abrirCategoriaEnVivo(categoriaNombre);
}

function actualizarBotonFlotanteEnVivo() {
    const btn = document.getElementById('btnFlotanteEnVivo');
    const textoEl = document.getElementById('textoFlotanteEnVivo');
    const iconoEl = document.getElementById('iconoFlotanteEnVivo');
    if (!btn) return;

    const transmisiones = typeof obtenerTransmisiones === 'function' ? obtenerTransmisiones() : [];
    const hayLive = Array.isArray(transmisiones) && transmisiones.some(t => t.enVivo);

    if (hayLive) {
        btn.className = 'btn-flotante-envivo envivo-activo';
        if (textoEl) textoEl.textContent = 'En Vivo';
        if (iconoEl) {
            iconoEl.className = 'fas fa-circle';
            iconoEl.style.color = '#ffffff';
        }
    } else {
        btn.className = 'btn-flotante-envivo envivo-inactivo';
        if (textoEl) textoEl.textContent = 'En Vivo';
        if (iconoEl) {
            iconoEl.className = 'fas fa-video';
            iconoEl.style.color = '#c9a53b';
        }
    }
}

// Inicializar estado del botón flotante al cargar
document.addEventListener('DOMContentLoaded', () => {
    actualizarBotonFlotanteEnVivo();
});

// Exportar a window
window.abrirEnVivo = abrirEnVivo;
window.cerrarEnVivo = cerrarEnVivo;
window.renderizarVistaCategoriasEnVivo = renderizarVistaCategoriasEnVivo;
window.abrirCategoriaEnVivo = abrirCategoriaEnVivo;
window.conmutarVideo = conmutarVideo;
window.actualizarBotonFlotanteEnVivo = actualizarBotonFlotanteEnVivo;
window.obtenerTransmisiones = obtenerTransmisiones;
window.guardarTransmisiones = guardarTransmisiones;

console.log('✅ app.js (Iglesia & En Vivo) cargado correctamente');