/**
 * Escuela Sabática · Módulo 5: Foro de Estudio en Tiempo Real | IASD Belén
 * Conectado a public.escuela_sabatica_foro (Supabase + Realtime)
 * Cada nueva publicación dispara automáticamente la notificación en la campanita de admin.html
 */
(function () {
    'use strict';

    const AUTHOR_KEY = 'iasd_belen_es_foro_autor';

    const FSTATE = {
        items: [],
        filtro: 'todos',
        leccion: 9,
        replyingTo: null,
        channel: null,
        cargando: false
    };

    function esc(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getSb() {
        return window.ESCUELA_SABATICA ? window.ESCUELA_SABATICA.getSupabase() : null;
    }

    function getSemana() {
        return window.ESCUELA_SABATICA ? window.ESCUELA_SABATICA.getState().semana : {};
    }

    function tiempoRelativo(iso) {
        if (!iso) return 'Recién publicado';
        const d = new Date(iso);
        if (isNaN(d.getTime())) return '';
        const seg = Math.max(0, Math.floor((Date.now() - d.getTime()) / 1000));
        if (seg < 60) return 'Hace un momento';
        const min = Math.floor(seg / 60);
        if (min < 60) return `Hace ${min} min`;
        const hrs = Math.floor(min / 60);
        if (hrs < 24) return `Hace ${hrs} h`;
        const dias = Math.floor(hrs / 24);
        if (dias < 7) return `Hace ${dias} d`;
        return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }

    function roleStyle(rol) {
        if (rol === 'Maestro') return { bg: '#fef3c7', color: '#92400e', avatarBg: '#c99d3b' };
        if (rol === 'Joven') return { bg: '#f3e8ff', color: '#6b21a8', avatarBg: '#7c3aed' };
        if (rol === 'Admin') return { bg: '#dcfce7', color: '#166534', avatarBg: '#16a34a' };
        return { bg: '#e0f2fe', color: '#075985', avatarBg: '#0b2b4f' };
    }

    function buildForoUI() {
        const mount = document.getElementById('esForoMount');
        if (!mount) return;

        let savedName = '';
        try { savedName = localStorage.getItem(AUTHOR_KEY) || ''; } catch (e) { }

        mount.innerHTML = `
            <section class="es-section" id="foroEstudio">
                <div class="es-section-head">
                    <span class="es-kicker">Comunidad de Estudio · En Tiempo Real</span>
                    <h2 class="es-section-title">Foro de Preguntas y Aportes de la Lección</h2>
                    <p class="es-section-sub">¿Tienes una duda sobre un texto bíblico o un comentario que edificó tu semana? Compártelo aquí con la iglesia y los maestros.</p>
                </div>

                <div class="es-foro-banner">
                    <img src="https://pub-5ad02146ce66485a88aad0fa2fd1e620.r2.dev/anuncios/1795375155117-9e2c5166.jpg"
                        alt="Comunidad de estudio bíblico IASD Belén" />
                    <div class="es-foro-banner-scrim"></div>
                    <div class="es-foro-banner-inner">
                        <span class="es-foro-live-pill"><span class="es-live-dot"></span> Conectado en vivo · Lección <span id="esForoLeccionNum">9</span></span>
                        <h3>“Hierro con hierro se aguza; así el hombre aguza el rostro de su amigo.”</h3>
                        <p>Cada pregunta que envíes avisa automáticamente al equipo de Escuela Sabática para que reciba respuesta.</p>
                    </div>
                </div>

                <div class="es-foro-grid">
                    <!-- Formulario para publicar -->
                    <div class="es-card es-foro-form-card">
                        <h3 style="color:var(--navy-mid); font-size:1.1rem; margin-bottom:0.85rem;">
                            <i class="fas fa-comments" style="color:var(--gold);"></i> Participa en el Foro
                        </h3>
                        <form id="esForoForm" class="es-foro-form">
                            <div>
                                <label class="es-form-label" for="esForoNombre">Tu nombre</label>
                                <input type="text" id="esForoNombre" class="es-input" value="${esc(savedName)}" placeholder="Ej: María López" required maxlength="60" />
                            </div>
                            <div class="es-foro-row-2">
                                <div>
                                    <label class="es-form-label" for="esForoRol">Participo como</label>
                                    <select id="esForoRol" class="es-input">
                                        <option value="Estudiante">Estudiante</option>
                                        <option value="Joven">Joven</option>
                                        <option value="Maestro">Maestro</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="es-form-label" for="esForoTipo">Tipo de mensaje</label>
                                    <select id="esForoTipo" class="es-input">
                                        <option value="pregunta">❓ Tengo una pregunta</option>
                                        <option value="comentario">💬 Aporte / Reflexión</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label class="es-form-label" for="esForoMensaje">Tu pregunta o comentario</label>
                                <textarea id="esForoMensaje" class="es-notes-textarea" style="min-height:110px;"
                                    placeholder="Escribe tu pregunta sobre la lección o un pensamiento bíblico que quieras compartir..." required maxlength="800"></textarea>
                            </div>
                            <div style="display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:0.6rem;">
                                <span id="esForoFeedback" class="es-notes-status">
                                    <i class="fas fa-bell" style="color:var(--gold);"></i> Avisa al instante al equipo de Escuela Sabática
                                </span>
                                <button type="submit" id="esForoSubmitBtn" class="es-btn-gold" style="padding:0.7rem 1.35rem; font-size:0.87rem;">
                                    <i class="fas fa-paper-plane"></i> Publicar
                                </button>
                            </div>
                        </form>
                    </div>

                    <!-- Feed de preguntas y respuestas -->
                    <div class="es-card es-foro-feed-card">
                        <div class="es-foro-feed-top">
                            <div class="es-foro-filters">
                                <button type="button" class="es-foro-filter active" data-foro-filter="todos">Todos (<span id="esForoCountAll">0</span>)</button>
                                <button type="button" class="es-foro-filter" data-foro-filter="pregunta">Preguntas</button>
                                <button type="button" class="es-foro-filter" data-foro-filter="comentario">Aportes</button>
                            </div>
                            <span id="esForoLiveToast" class="es-foro-toast" style="display:none;"></span>
                        </div>
                        <div id="esForoList" class="es-foro-list">
                            <p class="es-prayer-empty"><i class="fas fa-spinner fa-spin"></i> Cargando conversaciones de la lección...</p>
                        </div>
                    </div>
                </div>
            </section>
        `;

        bindForoEvents();
    }

    function showToast(msg) {
        const el = document.getElementById('esForoLiveToast');
        if (!el) return;
        el.textContent = msg;
        el.style.display = 'inline-flex';
        clearTimeout(el._t);
        el._t = setTimeout(() => { el.style.display = 'none'; }, 3500);
    }

    function renderForoList() {
        const listEl = document.getElementById('esForoList');
        const countEl = document.getElementById('esForoCountAll');
        if (!listEl) return;

        const visibles = FSTATE.items.filter(i => i.visible !== false);
        const roots = visibles.filter(i => !i.parent_id);
        const repliesByParent = {};
        visibles.filter(i => i.parent_id).forEach(r => {
            if (!repliesByParent[r.parent_id]) repliesByParent[r.parent_id] = [];
            repliesByParent[r.parent_id].push(r);
        });

        if (countEl) countEl.textContent = String(roots.length);

        const filtered = FSTATE.filtro === 'todos'
            ? roots
            : roots.filter(r => r.tipo === FSTATE.filtro);

        if (filtered.length === 0) {
            listEl.innerHTML = `
                <div class="es-prayer-empty">
                    <i class="far fa-comments" style="font-size:1.4rem; display:block; margin-bottom:0.4rem; color:var(--gold);"></i>
                    Aún no hay mensajes en esta categoría para la Lección ${FSTATE.leccion}. ¡Sé el primero en compartir una pregunta o reflexión!
                </div>
            `;
            return;
        }

        listEl.innerHTML = filtered.map(post => {
            const st = roleStyle(post.rol);
            const initial = (post.nombre || 'H').trim().charAt(0).toUpperCase();
            const isQ = post.tipo === 'pregunta';
            const replies = (repliesByParent[post.id] || []).slice().sort((a, b) => new Date(a.created_at) - new Date(b.created_at));

            const repliesHtml = replies.length > 0
                ? `<div class="es-foro-replies">
                    ${replies.map(rep => {
                        const rst = roleStyle(rep.rol);
                        return `
                            <div class="es-foro-reply-item">
                                <div class="es-foro-post-meta">
                                    <strong>${esc(rep.nombre)}</strong>
                                    <span class="es-foro-rol" style="background:${rst.bg}; color:${rst.color};">${esc(rep.rol)}</span>
                                    <span class="es-foro-time">${tiempoRelativo(rep.created_at)}</span>
                                </div>
                                <p>${esc(rep.mensaje)}</p>
                            </div>
                        `;
                    }).join('')}
                </div>`
                : '';

            const replyBoxHtml = FSTATE.replyingTo === post.id
                ? `<form class="es-foro-reply-form" data-reply-parent="${post.id}">
                    <input type="text" class="es-input" name="rNombre" value="${esc(localStorage.getItem(AUTHOR_KEY) || '')}" placeholder="Tu nombre" required maxlength="60" />
                    <textarea class="es-input" name="rMensaje" rows="2" placeholder="Escribe tu respuesta edificante..." required maxlength="600"></textarea>
                    <div style="display:flex; gap:0.5rem; justify-content:flex-end;">
                        <button type="button" class="es-reset-btn" data-cancel-reply>Cancelar</button>
                        <button type="submit" class="es-btn-gold" style="padding:0.45rem 1rem; font-size:0.8rem;">Enviar respuesta</button>
                    </div>
                </form>`
                : '';

            return `
                <article class="es-foro-post">
                    <div class="es-foro-post-head">
                        <div class="es-foro-avatar" style="background:${st.avatarBg};">${esc(initial)}</div>
                        <div style="flex:1; min-width:0;">
                            <div class="es-foro-post-meta">
                                <strong>${esc(post.nombre)}</strong>
                                <span class="es-foro-rol" style="background:${st.bg}; color:${st.color};">${esc(post.rol)}</span>
                                <span class="es-foro-tipo ${isQ ? 'is-q' : 'is-c'}">${isQ ? '❓ Pregunta' : '💬 Aporte'}</span>
                                ${post.respondida ? '<span class="es-foro-answered"><i class="fas fa-check"></i> Respondida</span>' : ''}
                            </div>
                            <span class="es-foro-time">${tiempoRelativo(post.created_at)}</span>
                        </div>
                    </div>

                    <p class="es-foro-body">${esc(post.mensaje)}</p>

                    <div class="es-foro-post-foot">
                        <button type="button" class="es-foro-reply-btn" data-open-reply="${post.id}">
                            <i class="fas fa-reply"></i> Responder ${replies.length > 0 ? `(${replies.length})` : ''}
                        </button>
                    </div>

                    ${repliesHtml}
                    ${replyBoxHtml}
                </article>
            `;
        }).join('');

        // Bind reply buttons & inline reply forms
        listEl.querySelectorAll('[data-open-reply]').forEach(btn => {
            btn.addEventListener('click', () => {
                const pid = parseInt(btn.getAttribute('data-open-reply'), 10);
                FSTATE.replyingTo = FSTATE.replyingTo === pid ? null : pid;
                renderForoList();
            });
        });

        listEl.querySelectorAll('[data-cancel-reply]').forEach(btn => {
            btn.addEventListener('click', () => {
                FSTATE.replyingTo = null;
                renderForoList();
            });
        });

        listEl.querySelectorAll('.es-foro-reply-form').forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const parentId = parseInt(form.getAttribute('data-reply-parent'), 10);
                const rNombre = form.querySelector('[name="rNombre"]').value.trim();
                const rMensaje = form.querySelector('[name="rMensaje"]').value.trim();
                if (!rNombre || !rMensaje) return;

                const isMaestro = window.ESCUELA_SABATICA && window.ESCUELA_SABATICA.getState().mode === 'maestro';
                const rol = isMaestro ? 'Maestro' : (document.getElementById('esForoRol')?.value || 'Estudiante');
                await publishForoEntry({
                    parent_id: parentId,
                    nombre: rNombre,
                    rol,
                    tipo: 'respuesta',
                    mensaje: rMensaje
                });
                FSTATE.replyingTo = null;
            });
        });
    }

    async function loadForoMessages() {
        const sb = getSb();
        if (!sb) {
            const listEl = document.getElementById('esForoList');
            if (listEl) listEl.innerHTML = '<p class="es-prayer-empty">No se pudo conectar al foro en este momento.</p>';
            return;
        }
        FSTATE.cargando = true;
        try {
            const { data, error } = await sb
                .from('escuela_sabatica_foro')
                .select('*')
                .eq('numero_leccion', FSTATE.leccion)
                .eq('visible', true)
                .order('created_at', { ascending: false })
                .limit(80);

            if (!error && Array.isArray(data)) {
                FSTATE.items = data;
            }
        } catch (e) {
            console.warn('[Foro ES] Error cargando mensajes:', e);
        }
        FSTATE.cargando = false;
        renderForoList();
    }

    async function publishForoEntry({ parent_id = null, nombre, rol, tipo, mensaje }) {
        const sb = getSb();
        const fb = document.getElementById('esForoFeedback');
        if (!sb) {
            if (fb) fb.textContent = 'Sin conexión con la base de datos.';
            return false;
        }

        try { localStorage.setItem(AUTHOR_KEY, nombre); } catch (e) { }

        const prefijo = tipo === 'pregunta' ? 'Pregunta' : (tipo === 'respuesta' ? 'Respuesta' : 'Aporte');
        const preview = mensaje.length > 85 ? mensaje.slice(0, 82) + '...' : mensaje;
        const titulo = `[${prefijo}] ${nombre}: ${preview}`;

        const { data, error } = await sb
            .from('escuela_sabatica_foro')
            .insert([{
                numero_leccion: FSTATE.leccion,
                parent_id,
                nombre,
                rol,
                tipo,
                titulo,
                mensaje,
                visible: true
            }])
            .select()
            .single();

        if (error) {
            console.error('[Foro ES] Error al publicar:', error);
            if (fb) fb.innerHTML = '<i class="fas fa-exclamation-triangle" style="color:#dc2626;"></i> No se pudo enviar. Intenta nuevamente.';
            return false;
        }

        if (data && !FSTATE.items.some(i => i.id === data.id)) {
            FSTATE.items.unshift(data);
            renderForoList();
        }
        showToast('¡Publicado en vivo!');
        return true;
    }

    function subscribeRealtime() {
        const sb = getSb();
        if (!sb || FSTATE.channel) return;
        try {
            FSTATE.channel = sb
                .channel('es_foro_realtime')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'escuela_sabatica_foro' }, (payload) => {
                    if (payload.eventType === 'INSERT' && payload.new) {
                        if (payload.new.numero_leccion === FSTATE.leccion && payload.new.visible !== false) {
                            if (!FSTATE.items.some(i => i.id === payload.new.id)) {
                                FSTATE.items.unshift(payload.new);
                                renderForoList();
                                showToast('Nuevo mensaje en el foro');
                            }
                        }
                    } else if (payload.eventType === 'UPDATE' && payload.new) {
                        const idx = FSTATE.items.findIndex(i => i.id === payload.new.id);
                        if (idx >= 0) {
                            FSTATE.items[idx] = payload.new;
                            renderForoList();
                        }
                    } else if (payload.eventType === 'DELETE' && payload.old) {
                        FSTATE.items = FSTATE.items.filter(i => i.id !== payload.old.id);
                        renderForoList();
                    }
                })
                .subscribe();
        } catch (e) {
            console.warn('[Foro ES] Realtime no disponible:', e);
        }
    }

    function bindForoEvents() {
        const form = document.getElementById('esForoForm');
        if (form) {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = document.getElementById('esForoSubmitBtn');
                const fb = document.getElementById('esForoFeedback');
                const nombre = (document.getElementById('esForoNombre')?.value || '').trim();
                const rol = document.getElementById('esForoRol')?.value || 'Estudiante';
                const tipo = document.getElementById('esForoTipo')?.value || 'pregunta';
                const msgEl = document.getElementById('esForoMensaje');
                const mensaje = (msgEl?.value || '').trim();

                if (!nombre || !mensaje) return;

                if (btn) {
                    btn.disabled = true;
                    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                }

                const ok = await publishForoEntry({ nombre, rol, tipo, mensaje });
                if (ok && msgEl) {
                    msgEl.value = '';
                    if (fb) fb.innerHTML = '<i class="fas fa-check-circle" style="color:#16a34a;"></i> ¡Enviado! Se notificó al equipo de Escuela Sabática.';
                }

                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Publicar';
                }
            });
        }

        document.querySelectorAll('[data-foro-filter]').forEach(btn => {
            btn.addEventListener('click', () => {
                FSTATE.filtro = btn.getAttribute('data-foro-filter') || 'todos';
                document.querySelectorAll('[data-foro-filter]').forEach(b => b.classList.toggle('active', b === btn));
                renderForoList();
            });
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const s = getSemana();
        if (s && s.numero_leccion) FSTATE.leccion = s.numero_leccion;
        buildForoUI();
        loadForoMessages();
        subscribeRealtime();
    });

    window.addEventListener('es:semanaloaded', (ev) => {
        const lec = ev && ev.detail && ev.detail.semana && ev.detail.semana.numero_leccion;
        if (lec) {
            FSTATE.leccion = lec;
            const numEl = document.getElementById('esForoLeccionNum');
            if (numEl) numEl.textContent = String(lec);
            loadForoMessages();
        }
    });
})();
