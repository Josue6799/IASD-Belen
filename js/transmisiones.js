/* ==========================================================================
   SISTEMA DE TRANSMISIONES / EN VIVO (IASD BELÉN) - CORRECCIÓN DEFINITIVA
   Fuente de verdad: Supabase (tabla 'transmisiones')
   Columnas reales de Supabase: id, titulo, url_video, fecha, activa, url, activo, tipo
   Caché de lectura: localStorage ('transmisiones')
   ========================================================================== */

// Variable de control GLOBAL para Realtime (fuera de cualquier función o IIFE)
let realtimeSubscribed = false;

function initTransmisionesRealtime() {
    if (realtimeSubscribed) {
        console.log('[Transmisiones] Realtime ya suscrito, omitiendo...');
        return;
    }
    if (!window.supabaseClient) return;

    try {
        const canal = window.supabaseClient.channel('realtime:transmisiones');
        // Agregar callbacks ANTES de suscribir
        canal.on('postgres_changes', { event: '*', schema: 'public', table: 'transmisiones' }, async () => {
            console.log('[Transmisiones] Cambio detectado en Supabase, actualizando...');
            if (typeof window.sincronizarTransmisionesConSupabase === 'function') {
                await window.sincronizarTransmisionesConSupabase();
            }
            if (typeof window.actualizarVisibilidadBtnEnVivo === 'function') {
                window.actualizarVisibilidadBtnEnVivo();
            }
            const modal = document.getElementById('modalEnVivo');
            if (modal && (modal.style.display === 'flex' || modal.style.display === 'block')) {
                if (typeof window.renderizarVistaCategoriasEnVivo === 'function') {
                    window.renderizarVistaCategoriasEnVivo();
                }
            }
        });
        canal.subscribe();
        realtimeSubscribed = true;
        console.log('[Transmisiones] Realtime suscrito correctamente');
    } catch (e) {
        console.warn('[Transmisiones] Error al suscribir canal realtime:', e);
    }
}

(function () {
    'use strict';

    const CATEGORIAS_TRANSMISIONES = [
        { nombre: 'Sábado (Culto)', icono: '🎥', color: '#1a3a4a' },
        { nombre: 'Sociedad de Jóvenes', icono: '🙌', color: '#2c5f7c' },
        { nombre: 'Lunes de Oración', icono: '🙏', color: '#d4a038' },
        { nombre: 'Miércoles de Testimonio', icono: '✝️', color: '#1a3a4a' },
        { nombre: 'Campaña', icono: '📢', color: '#c53030' }
    ];

    let videoActivoEnVivoId = null;
    let transmisionEditandoId = null;

    // Extractor de ID de YouTube súper robusto que soporta ?list=, timestamp, shorts, embed, etc.
    function obtenerYouTubeId(url) {
        if (!url || typeof url !== 'string') return null;
        url = url.trim();
        const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|live\/|shorts\/))([\w-]{11})/i;
        const match = url.match(regex);
        if (match && match[1]) return match[1];
        if (/^[\w-]{11}$/.test(url)) return url;
        return null;
    }

    function obtenerFacebookEmbedUrl(urlOrId) {
        if (!urlOrId) return '';
        urlOrId = String(urlOrId).trim();
        if (urlOrId.startsWith('http://') || urlOrId.startsWith('https://')) {
            return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(urlOrId)}&show_text=0&width=560`;
        }
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent('https://www.facebook.com/watch/?v=' + urlOrId)}&show_text=0&width=560`;
    }

    function obtenerThumbnailVideo(t) {
        if (!t) return 'https://res.cloudinary.com/onjg5kf6/image/upload/v1787333423/Logo_adventista_jum3od.png';
        const plat = (t.plataforma || t.tipo || 'youtube').toLowerCase();
        if (plat === 'youtube') {
            const id = obtenerYouTubeId(t.videoId || t.url_video || t.url || '');
            if (id) {
                return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            }
        }
        return 'https://res.cloudinary.com/onjg5kf6/image/upload/v1787333423/Logo_adventista_jum3od.png';
    }

    // Formateador visual de fechas para transmisiones (ej: "27 de agosto de 2026")
    function formatearFechaTransmision(fechaStr) {
        if (!fechaStr) return '';
        try {
            const str = String(fechaStr).trim();
            const dateMatch = str.match(/^(\d{4})-(\d{2})-(\d{2})/);
            if (dateMatch) {
                const anio = parseInt(dateMatch[1], 10);
                const mesIdx = parseInt(dateMatch[2], 10) - 1;
                const dia = parseInt(dateMatch[3], 10);
                const meses = [
                    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
                    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
                ];
                if (mesIdx >= 0 && mesIdx < 12) {
                    return `${dia} de ${meses[mesIdx]} de ${anio}`;
                }
            }
            const d = new Date(fechaStr);
            if (!isNaN(d.getTime())) {
                return d.toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
            }
        } catch (e) {
            console.warn('[Transmisiones] Error al formatear fecha:', e);
        }
        return String(fechaStr);
    }


    // Normalización de objeto leyendo únicamente columnas reales de Supabase:
    // id, titulo, url_video, fecha, activa, url, activo, tipo
    function normalizarTransmision(t) {
        if (!t) return null;
        let desc = String(t.url || t.descripcion || '');
        let cat = String(t.categoria || 'Sábado (Culto)');

        // Extraer categoría si viene empaquetada como [Cat:NombreCategoria] en el campo 'url'
        if (desc.startsWith('[Cat:')) {
            const match = desc.match(/^\[Cat:([^\]]+)\]\s*(.*)$/s);
            if (match) {
                cat = match[1].trim();
                desc = match[2].trim();
            }
        }

        const isActive = Boolean(t.activo === true || t.activa === true || t.activo === 'true' || t.activa === 'true');
        const plat = (t.tipo || t.plataforma || 'youtube').toLowerCase();
        const vUrl = t.url_video || t.videoId || t.url || '';

        return {
            id: String(t.id != null ? t.id : Date.now()),
            titulo: String(t.titulo || ''),
            categoria: cat,
            fecha: String(t.fecha || new Date().toISOString().split('T')[0]),
            plataforma: plat,
            tipo: plat,
            videoId: String(vUrl),
            url_video: String(vUrl),
            url: desc,
            descripcion: desc,
            destacado: false,
            en_vivo: isActive,
            enVivo: isActive,
            activo: isActive,
            activa: isActive,
            fechaCreacion: t.fechaCreacion || new Date().toISOString()
        };
    }

    // Obtener transmisiones de caché local (localStorage) - Sin datos de prueba
    function obtenerTransmisiones() {
        try {
            const raw = localStorage.getItem('transmisiones');
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                    return parsed.map(normalizarTransmision).filter(Boolean);
                }
            }
        } catch (e) {
            console.warn('[Transmisiones] Error al leer localStorage:', e);
        }
        return [];
    }

    // Cargar transmisiones
    function cargarTransmisiones() {
        return obtenerTransmisiones();
    }

    // Guardar transmisiones en caché local
    function guardarTransmisionesLocal(lista) {
        const arr = Array.isArray(lista) ? lista.map(normalizarTransmision).filter(Boolean) : [];
        try {
            localStorage.setItem('transmisiones', JSON.stringify(arr));
        } catch (e) {
            console.warn('[Transmisiones] Error al guardar en localStorage:', e);
        }
        actualizarVisibilidadBtnEnVivo();
        window.dispatchEvent(new CustomEvent('transmisionesActualizadas', { detail: arr }));
    }

    // Sincronización directa con Supabase utilizando sólo columnas reales
    async function sincronizarTransmisionesConSupabase() {
        if (!window.supabaseClient) return [];

        try {
            const { data, error } = await window.supabaseClient
                .from('transmisiones')
                .select('*');

            if (error) {
                console.warn('[Transmisiones] Supabase query notice:', error.message || error);
                actualizarVisibilidadBtnEnVivo();
                return obtenerTransmisiones();
            }

            if (Array.isArray(data)) {
                const items = data.map(normalizarTransmision).filter(Boolean);
                items.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

                localStorage.setItem('transmisiones', JSON.stringify(items));
                actualizarVisibilidadBtnEnVivo();

                const modalPublico = document.getElementById('modalEnVivo');
                if (modalPublico && (modalPublico.style.display === 'flex' || modalPublico.style.display === 'block')) {
                    renderizarVistaCategoriasEnVivo();
                }

                const modalAdmin = document.getElementById('modalGestionarTransmisiones');
                if (modalAdmin && (modalAdmin.style.display === 'flex' || modalAdmin.style.display === 'block')) {
                    renderizarAdminTransmisiones();
                }

                window.dispatchEvent(new CustomEvent('transmisionesActualizadas', { detail: items }));
                return items;
            }
        } catch (err) {
            console.warn('[Transmisiones] Error de sincronización:', err);
            actualizarVisibilidadBtnEnVivo();
        }
        return obtenerTransmisiones();
    }

    // Botón Flotante "🔴 EN VIVO"
    function actualizarVisibilidadBtnEnVivo() {
        const btn = document.getElementById('btnEnVivo') || document.getElementById('btnFlotanteEnVivo');
        if (!btn) return;

        const transmisiones = obtenerTransmisiones();
        const hayLive = Array.isArray(transmisiones) && transmisiones.some(t => t && (t.activo === true || t.activa === true));

        const dashboardLMS = document.getElementById('dashboardEvaluacion');
        const panelAdmin = document.getElementById('panelAdminGeneral');

        const lmsAbierto = dashboardLMS && (dashboardLMS.style.display === 'block' || window.getComputedStyle(dashboardLMS).display === 'block');
        const adminAbierto = panelAdmin && (panelAdmin.style.display === 'block' || window.getComputedStyle(panelAdmin).display === 'block');

        if (hayLive && !lmsAbierto && !adminAbierto) {
            btn.style.display = 'flex';
        } else {
            btn.style.display = 'none';
        }
    }

    // Modal Público de Transmisiones
    function abrirEnVivo() {
        const modal = document.getElementById('modalEnVivo');
        if (!modal) return;
        document.body.style.overflow = 'hidden';
        modal.style.display = 'flex';
        renderizarVistaCategoriasEnVivo();
        actualizarVisibilidadBtnEnVivo();
    }

    function cerrarEnVivo(e) {
        if (e && e.target && e.target !== document.getElementById('modalEnVivo') && !e.target.classList.contains('envivo-close-btn')) {
            // Evitar cierre accidental
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
            const hayLive = videosCat.some(t => t.activo === true || t.activa === true);

            html += `
            <div class="envivo-card-cat" data-csp-click="abrirCategoriaEnVivo('${cat.nombre}')">
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
            <button data-csp-click="renderizarVistaCategoriasEnVivo()" style="background:rgba(255,255,255,0.2); border:none; color:white; padding:0.4rem 0.8rem; border-radius:1rem; font-size:0.85rem; cursor:pointer; font-weight:600; font-family:Inter,sans-serif;">
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
                <button data-csp-click="renderizarVistaCategoriasEnVivo()" class="btn-ver-video" style="max-width:200px; margin:1.5rem auto 0;">
                    <i class="fas fa-arrow-left"></i> Volver a Categorías
                </button>
            </div>
            `;
            return;
        }

        transmisiones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        const videoDestacado = transmisiones.find(t => String(t.id) === String(videoActivoEnVivoId)) || transmisiones.find(t => t.activo === true || t.activa === true) || transmisiones[0];
        videoActivoEnVivoId = String(videoDestacado.id);

        const plat = (videoDestacado.tipo || videoDestacado.plataforma || 'youtube').toLowerCase();
        const vUrl = videoDestacado.url_video || videoDestacado.videoId || '';
        const esLive = videoDestacado.activo === true || videoDestacado.activa === true;

        let iframeSrc = '';
        if (plat === 'youtube') {
            const ytId = obtenerYouTubeId(vUrl);
            iframeSrc = `https://www.youtube.com/embed/${ytId || vUrl}?autoplay=1`;
        } else {
            iframeSrc = obtenerFacebookEmbedUrl(vUrl);
        }

        let html = `
        <!-- REPRODUCTOR PRINCIPAL -->
        <div style="margin-bottom: 2rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.8rem; flex-wrap:wrap; gap:0.5rem;">
                <h3 style="margin:0; color:#1a3a4a; font-size:1.2rem; font-weight:700;">
                    ${videoDestacado.titulo}
                </h3>
                <div style="display:flex; gap:0.5rem; align-items:center;">
                    <span class="envivo-plat-badge envivo-plat-${plat}" style="position:static;">
                        <i class="fab fa-${plat}"></i> ${plat}
                    </span>
                    ${esLive ? '<span class="badge-live-pulse">🔴 EN VIVO</span>' : ''}
                </div>
            </div>
            <p style="margin:0 0 1rem; color:#5a6474; font-size:0.88rem;">
                <i class="far fa-calendar-alt"></i> ${formatearFechaTransmision(videoDestacado.fecha)} ${videoDestacado.descripcion ? '· ' + videoDestacado.descripcion : ''}
            </p>

            <div class="envivo-player-container">
                <iframe src="${iframeSrc}" loading="lazy" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
        </div>
        `;

        if (transmisiones.length > 1) {
            html += `
            <div>
                <h4 style="color:#1a3a4a; font-size:1.05rem; font-weight:700; margin-bottom:1rem; border-bottom:2px solid #f0e6d2; padding-bottom:0.4rem;">
                    <i class="fas fa-list-ul"></i> Transmisiones Anteriores (${transmisiones.length - 1})
                </h4>
                <div class="envivo-lista-videos">
            `;

            transmisiones.forEach(t => {
                if (String(t.id) === String(videoDestacado.id)) return;

                const thumbUrl = obtenerThumbnailVideo(t);
                const itemPlat = (t.tipo || t.plataforma || 'youtube').toLowerCase();
                const itemLive = t.activo === true || t.activa === true;

                html += `
                <div class="envivo-video-item">
                    <div class="envivo-thumb-wrapper">
                        <img src="${thumbUrl}" alt="${t.titulo}" class="envivo-thumb-img" data-csp-error="this.src='https://res.cloudinary.com/onjg5kf6/image/upload/v1787333423/Logo_adventista_jum3od.png'">
                        <span class="envivo-plat-badge envivo-plat-${itemPlat}">
                            <i class="fab fa-${itemPlat}"></i> ${itemPlat}
                        </span>
                        ${itemLive ? '<span class="badge-live-pulse" style="position:absolute; bottom:0.5rem; right:0.5rem; font-size:0.65rem; padding:0.2rem 0.5rem;">🔴 EN VIVO</span>' : ''}
                    </div>
                    <div class="envivo-video-info">
                        <div>
                            <div class="envivo-video-title">${t.titulo}</div>
                            <div class="envivo-video-fecha"><i class="far fa-calendar-alt"></i> ${formatearFechaTransmision(t.fecha)}</div>
                        </div>
                        <button data-csp-click="conmutarVideo('${t.id}', '${categoriaNombre}')" class="btn-ver-video">
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
        videoActivoEnVivoId = String(id);
        abrirCategoriaEnVivo(categoriaNombre);
    }

    // Panel de Administración (Gestión de Transmisiones)
    function abrirModalGestionarTransmisiones() {
        const modal = document.getElementById('modalGestionarTransmisiones');
        if (!modal) return;
        document.body.style.overflow = 'hidden';
        modal.style.display = 'flex';
        transmisionEditandoId = null;
        renderizarAdminTransmisiones();
        sincronizarTransmisionesConSupabase();
    }

    function cerrarModalGestionarTransmisiones(e) {
        if (e && e.target && e.target !== document.getElementById('modalGestionarTransmisiones')) {
            // Mantener abierto si clic es dentro del contenido
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

        const transmisiones = obtenerTransmisiones();
        let transEdit = null;
        if (transmisionEditandoId) {
            transEdit = transmisiones.find(t => String(t.id) === String(transmisionEditandoId));
        }

        const fechaHoy = new Date().toISOString().split('T')[0];
        const platEdit = transEdit ? (transEdit.tipo || transEdit.plataforma || 'youtube') : 'youtube';
        const videoUrlEdit = transEdit ? transEdit.url_video : '';

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
                    <input type="date" id="transFecha" value="${transEdit ? (String(transEdit.fecha || '').split('T')[0].split(' ')[0] || fechaHoy) : fechaHoy}" required style="width:100%; padding:0.65rem; border-radius:0.6rem; border:1px solid #cbd5e1; font-family:Inter,sans-serif;">
                </div>

                <div>
                    <label style="display:block; font-weight:600; font-size:0.85rem; color:#1a3a4a; margin-bottom:0.3rem;">Plataforma (Tipo) *</label>
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
                    <label style="display:inline-flex; align-items:center; gap:0.5rem; font-weight:600; font-size:0.88rem; color:#c53030; cursor:pointer;">
                        <input type="checkbox" id="transEnVivo" ${transEdit ? (transEdit.activo ? 'checked' : '') : 'checked'}>
                        🔴 Transmisión Activa / En Vivo
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

        const listaOrdenada = [...lista].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        let html = `
        <table class="tabla-cronograma" style="width:100%; border-collapse:collapse; text-align:left;">
            <thead>
                <tr style="background:#1a3a4a; color:white;">
                    <th style="padding:0.75rem 0.8rem;">Categoría</th>
                    <th style="padding:0.75rem 0.8rem;">Título</th>
                    <th style="padding:0.75rem 0.8rem;">Fecha</th>
                    <th style="padding:0.75rem 0.8rem;">Tipo</th>
                    <th style="padding:0.75rem 0.8rem; text-align:center;">Estado</th>
                    <th style="padding:0.75rem 0.8rem; text-align:center;">Acciones</th>
                </tr>
            </thead>
            <tbody>
        `;

        listaOrdenada.forEach(t => {
            const plat = (t.tipo || t.plataforma || 'youtube').toLowerCase();
            const esLive = t.activo === true || t.activa === true;

            html += `
            <tr style="border-bottom:1px solid #e2e8f0;">
                <td style="padding:0.65rem 0.8rem; font-weight:600; color:#1a3a4a; font-size:0.85rem;">${t.categoria || 'General'}</td>
                <td style="padding:0.65rem 0.8rem; font-weight:700; color:#2c5f7c; font-size:0.88rem;">${t.titulo || 'Sin título'}</td>
                <td style="padding:0.65rem 0.8rem; font-size:0.85rem; color:#475569;">${formatearFechaTransmision(t.fecha) || '-'}</td>
                <td style="padding:0.65rem 0.8rem;">
                    <span class="envivo-plat-badge envivo-plat-${plat}" style="position:static; font-size:0.65rem;">
                        <i class="fab fa-${plat}"></i> ${plat}
                    </span>
                </td>
                <td style="padding:0.65rem 0.8rem; text-align:center; font-size:0.85rem;">
                    ${esLive ? '<span class="badge-live-pulse" style="font-size:0.65rem; padding:0.2rem 0.5rem; margin-right:0.3rem;">🔴 EN VIVO</span>' : '<span style="color:#94a3b8;">⏹️ Inactiva</span>'}
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
        const transmisiones = obtenerTransmisiones();
        const filtradas = cat === 'TODAS' ? transmisiones : transmisiones.filter(t => t.categoria === cat);
        const wrapper = document.getElementById('tablaTransmisionesAdminWrapper');
        if (wrapper) {
            wrapper.innerHTML = generarTablaTransmisionesAdminHTML(filtradas);
        }
    }

    async function guardarTransmisionForm(e) {
        if (e && typeof e.preventDefault === 'function') e.preventDefault();

        const categoria = document.getElementById('transCategoria').value;
        const titulo = document.getElementById('transTitulo').value.trim();
        const fecha = document.getElementById('transFecha').value;
        let plataforma = document.getElementById('transPlataforma').value.toLowerCase();
        let videoIdRaw = document.getElementById('transVideoId').value.trim();
        const descripcion = document.getElementById('transDescripcion').value.trim();
        const enVivoEl = document.getElementById('transEnVivo');
        const enVivo = enVivoEl ? enVivoEl.checked : true;

        if (!titulo || !fecha || !videoIdRaw) {
            if (typeof mostrarAlertaAdmin === 'function') {
                mostrarAlertaAdmin('Por favor complete todos los campos obligatorios (*)', 'Campos requeridos');
            } else {
                alert('Por favor complete todos los campos obligatorios (*)');
            }
            return;
        }

        if (videoIdRaw.includes('facebook.com') || videoIdRaw.includes('fb.watch')) {
            plataforma = 'facebook';
        } else if (videoIdRaw.includes('youtube.com') || videoIdRaw.includes('youtu.be')) {
            plataforma = 'youtube';
        }

        let videoId = videoIdRaw;
        if (plataforma === 'youtube') {
            const parsedId = obtenerYouTubeId(videoIdRaw);
            if (parsedId) videoId = parsedId;
        }

        let transmisiones = obtenerTransmisiones();

        const targetId = transmisionEditandoId ? String(transmisionEditandoId) : String(Date.now());
        const itemGuardado = {
            id: targetId,
            categoria: categoria,
            titulo: titulo,
            fecha: fecha,
            plataforma: plataforma,
            tipo: plataforma,
            videoId: videoId,
            url_video: videoIdRaw,
            url: videoIdRaw,
            descripcion: descripcion,
            destacado: false,
            en_vivo: Boolean(enVivo),
            enVivo: Boolean(enVivo),
            activo: Boolean(enVivo),
            activa: Boolean(enVivo),
            fechaCreacion: new Date().toISOString()
        };

        const idx = transmisiones.findIndex(t => String(t.id) === targetId);
        if (idx !== -1) {
            transmisiones[idx] = itemGuardado;
        } else {
            transmisiones.push(itemGuardado);
        }

        guardarTransmisionesLocal(transmisiones);
        transmisionEditandoId = null;

        if (window.supabaseClient) {
            try {
                // Mapear EXACTAMENTE a las columnas existentes en Supabase:
                // id, titulo, url_video, fecha, activa, url, activo, tipo
                const descConCat = itemGuardado.categoria ? `[Cat:${itemGuardado.categoria}] ${itemGuardado.descripcion || ''}`.trim() : (itemGuardado.descripcion || '');
                const payload = {
                    id: String(itemGuardado.id),
                    titulo: String(itemGuardado.titulo || ''),
                    url_video: String(itemGuardado.url_video || ''),
                    fecha: String(itemGuardado.fecha || ''),
                    tipo: String(itemGuardado.plataforma || itemGuardado.tipo || 'youtube'),
                    url: String(descConCat),
                    activo: Boolean(itemGuardado.activo),
                    activa: Boolean(itemGuardado.activa)
                };

                console.log('🚀 PAYLOAD FINAL ENVIADO A SUPABASE:', JSON.stringify(payload, null, 2));

                const { error } = await window.supabaseClient.from('transmisiones').upsert(payload, { onConflict: 'id' });
                if (error) {
                    console.warn('[Transmisiones] Error al guardar en Supabase:', error);
                }
            } catch (sbErr) {
                console.warn('[Transmisiones] Error de conexión al guardar en Supabase:', sbErr);
            }
        }

        if (typeof mostrarAlertaAdmin === 'function') {
            mostrarAlertaAdmin('Transmisión guardada correctamente.', 'Éxito');
        }

        renderizarAdminTransmisiones();

        const modalPublico = document.getElementById('modalEnVivo');
        if (modalPublico && (modalPublico.style.display === 'flex' || modalPublico.style.display === 'block')) {
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
        const transmisiones = obtenerTransmisiones();
        const t = transmisiones.find(x => String(x.id) === strId);
        const nombre = t ? t.titulo : 'esta transmisión';

        const confirmarEliminacion = function () {
            const actualizadas = obtenerTransmisiones().filter(x => String(x.id) !== strId);
            guardarTransmisionesLocal(actualizadas);

            if (window.supabaseClient) {
                window.supabaseClient.from('transmisiones').delete().eq('id', strId).then(({ error }) => {
                    if (error) console.warn('[Transmisiones] Error al eliminar en Supabase:', error);
                }).catch(err => {
                    console.warn('[Transmisiones] Error de red al eliminar en Supabase:', err);
                });
            }

            if (String(transmisionEditandoId) === strId) {
                transmisionEditandoId = null;
            }

            renderizarAdminTransmisiones();
            const modalPublico = document.getElementById('modalEnVivo');
            if (modalPublico && (modalPublico.style.display === 'flex' || modalPublico.style.display === 'block')) {
                renderizarVistaCategoriasEnVivo();
            }
        };

        if (typeof mostrarConfirmAdmin === 'function') {
            mostrarConfirmAdmin(
                `¿Está seguro de eliminar "<strong>${nombre}</strong>"? Esta acción no se puede deshacer.`,
                'Eliminar transmisión',
                confirmarEliminacion
            );
        } else if (confirm(`¿Está seguro de eliminar "${nombre}"?`)) {
            confirmarEliminacion();
        }
    }

    // Inicialización de Eventos
    document.addEventListener('DOMContentLoaded', () => {
        actualizarVisibilidadBtnEnVivo();
        sincronizarTransmisionesConSupabase();

        const dashboardLMS = document.getElementById('dashboardEvaluacion');
        if (dashboardLMS) {
            const observerLMS = new MutationObserver(actualizarVisibilidadBtnEnVivo);
            observerLMS.observe(dashboardLMS, { attributes: true, attributeFilter: ['style'] });
        }

        const panelAdmin = document.getElementById('panelAdminGeneral');
        if (panelAdmin) {
            const observerAdmin = new MutationObserver(actualizarVisibilidadBtnEnVivo);
            observerAdmin.observe(panelAdmin, { attributes: true, attributeFilter: ['style'] });
        }
    });

    window.addEventListener('transmisionesActualizadas', actualizarVisibilidadBtnEnVivo);
    window.addEventListener('storage', function (e) {
        if (e.key === 'transmisiones') {
            actualizarVisibilidadBtnEnVivo();
        }
    });

    setInterval(actualizarVisibilidadBtnEnVivo, 3000);

    // Exportación Global de Funciones a window
    window.abrirEnVivo = abrirEnVivo;
    window.cerrarEnVivo = cerrarEnVivo;
    window.renderizarVistaCategoriasEnVivo = renderizarVistaCategoriasEnVivo;
    window.abrirCategoriaEnVivo = abrirCategoriaEnVivo;
    window.conmutarVideo = conmutarVideo;
    window.actualizarVisibilidadBtnEnVivo = actualizarVisibilidadBtnEnVivo;
    window.actualizarBotonFlotanteEnVivo = actualizarVisibilidadBtnEnVivo;
    window.verificarVisibilidadBtnEnVivo = actualizarVisibilidadBtnEnVivo;
    window.obtenerTransmisiones = obtenerTransmisiones;
    window.cargarTransmisiones = cargarTransmisiones;
    window.guardarTransmisiones = guardarTransmisionesLocal;
    window.sincronizarTransmisionesConSupabase = sincronizarTransmisionesConSupabase;
    window.obtenerYouTubeId = obtenerYouTubeId;
    window.obtenerFacebookEmbedUrl = obtenerFacebookEmbedUrl;
    window.formatearFechaTransmision = formatearFechaTransmision;
    window.formatearFecha = formatearFechaTransmision;
    window.abrirModalGestionarTransmisiones = abrirModalGestionarTransmisiones;
    window.cerrarModalGestionarTransmisiones = cerrarModalGestionarTransmisiones;
    window.renderizarAdminTransmisiones = renderizarAdminTransmisiones;
    window.guardarTransmisionForm = guardarTransmisionForm;
    window.editarTransmisionAdmin = editarTransmisionAdmin;
    window.cancelarEdicionTransmision = cancelarEdicionTransmision;
    window.eliminarTransmisionAdmin = eliminarTransmisionAdmin;
    window.eliminarTransmision = eliminarTransmisionAdmin;
    window.filtrarTransmisionesAdminList = filtrarTransmisionesAdminList;
})();

// Llamada única a la suscripción Realtime al final del archivo
initTransmisionesRealtime();
