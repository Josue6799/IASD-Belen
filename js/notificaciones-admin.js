(function () {
    'use strict';

    const STATE = {
        items: [],
        filtro: 'no_leidas', // 'no_leidas' | 'todas'
        abierto: false,
        cargando: false,
        canalRealtime: null,
        inicializado: false
    };

    function escaparHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function tiempoRelativo(iso) {
        if (!iso) return '';
        const fecha = new Date(iso);
        if (isNaN(fecha.getTime())) return '';
        const seg = Math.max(0, Math.floor((Date.now() - fecha.getTime()) / 1000));
        if (seg < 60) return 'Hace un momento';
        const min = Math.floor(seg / 60);
        if (min < 60) return `Hace ${min} min`;
        const hrs = Math.floor(min / 60);
        if (hrs < 24) return `Hace ${hrs} h`;
        const dias = Math.floor(hrs / 24);
        if (dias < 7) return `Hace ${dias} d`;
        return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }

    function iconoPorSeccion(seccion) {
        const s = String(seccion || '').toLowerCase();
        if (s.includes('interesad')) return { icon: 'fa-user-plus', color: '#0284c7', bg: '#e0f2fe' };
        if (s.includes('anuncio')) return { icon: 'fa-bullhorn', color: '#d97706', bg: '#fef3c7' };
        if (s.includes('transmisi')) return { icon: 'fa-broadcast-tower', color: '#dc2626', bg: '#fee2e2' };
        if (s.includes('pedido') || s.includes('biblioteca')) return { icon: 'fa-book', color: '#7c3aed', bg: '#ede9fe' };
        if (s.includes('cuota')) return { icon: 'fa-coins', color: '#15803d', bg: '#dcfce7' };
        if (s.includes('bd ') || s.includes('miembro')) return { icon: 'fa-users', color: '#0b2b4f', bg: '#e2e8f0' };
        if (s.includes('evento') || s.includes('calendario')) return { icon: 'fa-calendar-alt', color: '#0f766e', bg: '#ccfbf1' };
        if (s.includes('cronograma')) return { icon: 'fa-clock', color: '#4338ca', bg: '#e0e7ff' };
        if (s.includes('estudiante')) return { icon: 'fa-graduation-cap', color: '#9333ea', bg: '#f3e8ff' };
        return { icon: 'fa-bell', color: '#0b2b4f', bg: '#f1f5f9' };
    }

    function etiquetaAccion(accion) {
        if (accion === 'INSERT') return { texto: 'Nuevo', cls: 'notif-tag-insert' };
        if (accion === 'UPDATE') return { texto: 'Editado', cls: 'notif-tag-update' };
        if (accion === 'DELETE') return { texto: 'Eliminado', cls: 'notif-tag-delete' };
        return { texto: accion || 'Evento', cls: 'notif-tag-update' };
    }

    function contarNoLeidas() {
        return STATE.items.reduce((acc, item) => acc + (item && !item.leida ? 1 : 0), 0);
    }

    function actualizarBadge() {
        const badge = document.getElementById('notifBellBadge');
        const btn = document.getElementById('btnNotificacionesAdmin');
        const total = contarNoLeidas();

        if (badge) {
            if (total > 0) {
                badge.textContent = total > 99 ? '99+' : String(total);
                badge.style.display = 'flex';
            } else {
                badge.textContent = '0';
                badge.style.display = 'none';
            }
        }
        if (btn) {
            btn.title = total > 0
                ? `Notificaciones (${total} sin leer)`
                : 'Notificaciones del sistema';
        }
    }

    function renderizarPanel() {
        const dropdown = document.getElementById('notifAdminDropdown');
        if (!dropdown) return;

        const noLeidas = contarNoLeidas();
        const lista = STATE.filtro === 'no_leidas'
            ? STATE.items.filter(item => !item.leida)
            : STATE.items;

        let html = `
            <div class="notif-header">
                <div class="notif-header-title">
                    <i class="fas fa-bell"></i>
                    <span>Notificaciones</span>
                    ${noLeidas > 0 ? `<span class="notif-count-pill">${noLeidas}</span>` : ''}
                </div>
                <div class="notif-header-actions">
                    ${noLeidas > 0 ? `<button type="button" class="notif-action-link" data-notif-action="marcar-todas">Marcar todas leídas</button>` : ''}
                    ${STATE.items.some(i => i.leida) ? `<button type="button" class="notif-action-link notif-action-danger" data-notif-action="limpiar-leidas">Limpiar leídas</button>` : ''}
                </div>
            </div>
            <div class="notif-tabs">
                <button type="button" class="notif-tab ${STATE.filtro === 'no_leidas' ? 'active' : ''}" data-notif-filter="no_leidas">
                    Sin leer (${noLeidas})
                </button>
                <button type="button" class="notif-tab ${STATE.filtro === 'todas' ? 'active' : ''}" data-notif-filter="todas">
                    Todas (${STATE.items.length})
                </button>
            </div>
            <div class="notif-list">
        `;

        if (STATE.cargando && STATE.items.length === 0) {
            html += `<div class="notif-empty"><i class="fas fa-spinner fa-spin"></i><p>Cargando notificaciones...</p></div>`;
        } else if (lista.length === 0) {
            html += `
                <div class="notif-empty">
                    <i class="far fa-check-circle"></i>
                    <p>${STATE.filtro === 'no_leidas' ? 'No tienes notificaciones sin leer.' : 'Aún no hay notificaciones registradas.'}</p>
                </div>
            `;
        } else {
            lista.forEach(item => {
                const ic = iconoPorSeccion(item.seccion);
                const acc = etiquetaAccion(item.accion);
                html += `
                    <div class="notif-item ${item.leida ? 'leida' : 'no-leida'}" data-notif-id="${escaparHtml(item.id)}">
                        <div class="notif-item-icon" style="background:${ic.bg}; color:${ic.color};">
                            <i class="fas ${ic.icon}"></i>
                        </div>
                        <div class="notif-item-body">
                            <div class="notif-item-meta">
                                <span class="notif-seccion-tag">${escaparHtml(item.seccion)}</span>
                                <span class="notif-accion-tag ${acc.cls}">${acc.texto}</span>
                                <span class="notif-time">${escaparHtml(tiempoRelativo(item.created_at))}</span>
                            </div>
                            <div class="notif-item-titulo">${escaparHtml(item.titulo)}</div>
                            ${item.detalle ? `<div class="notif-item-detalle">${escaparHtml(item.detalle)}</div>` : ''}
                        </div>
                        ${!item.leida ? `<span class="notif-unread-dot" title="Sin leer"></span>` : ''}
                    </div>
                `;
            });
        }

        html += `</div>`;
        dropdown.innerHTML = html;
    }

    async function cargarNotificaciones() {
        if (!window.supabaseClient) return;
        STATE.cargando = true;
        if (STATE.abierto) renderizarPanel();

        try {
            const { data, error } = await window.supabaseClient
                .from('notificaciones_admin')
                .select('id, seccion, tabla_origen, accion, titulo, detalle, leida, created_at')
                .order('created_at', { ascending: false })
                .limit(60);

            if (error) {
                console.warn('[Notificaciones] Error al cargar:', error.message || error);
                return;
            }
            STATE.items = Array.isArray(data) ? data : [];
            actualizarBadge();
            if (STATE.abierto) renderizarPanel();
        } catch (err) {
            console.warn('[Notificaciones] Error de red:', err);
        } finally {
            STATE.cargando = false;
            if (STATE.abierto) renderizarPanel();
        }
    }

    async function marcarComoLeida(id) {
        if (!id || !window.supabaseClient) return;
        const item = STATE.items.find(x => String(x.id) === String(id));
        if (!item || item.leida) return;

        item.leida = true;
        actualizarBadge();
        if (STATE.abierto) renderizarPanel();

        const { error } = await window.supabaseClient
            .from('notificaciones_admin')
            .update({ leida: true })
            .eq('id', item.id);

        if (error) {
            console.warn('[Notificaciones] No se pudo marcar como leída:', error.message || error);
        }
    }

    async function marcarTodasLeidas() {
        if (!window.supabaseClient) return;
        const idsNoLeidas = STATE.items.filter(x => !x.leida).map(x => x.id);
        if (idsNoLeidas.length === 0) return;

        STATE.items.forEach(x => { x.leida = true; });
        actualizarBadge();
        if (STATE.abierto) renderizarPanel();

        const { error } = await window.supabaseClient
            .from('notificaciones_admin')
            .update({ leida: true })
            .eq('leida', false);

        if (error) {
            console.warn('[Notificaciones] Error marcando todas como leídas:', error.message || error);
        }
    }

    async function limpiarLeidas() {
        if (!window.supabaseClient) return;
        STATE.items = STATE.items.filter(x => !x.leida);
        actualizarBadge();
        if (STATE.abierto) renderizarPanel();

        const { error } = await window.supabaseClient
            .from('notificaciones_admin')
            .delete()
            .eq('leida', true);

        if (error) {
            console.warn('[Notificaciones] Error limpiando leídas:', error.message || error);
        }
    }

    function suscribirRealtime() {
        if (!window.supabaseClient || STATE.canalRealtime) return;
        try {
            STATE.canalRealtime = window.supabaseClient
                .channel('realtime:notificaciones_admin')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'notificaciones_admin' },
                    () => {
                        cargarNotificaciones();
                    }
                )
                .subscribe();
        } catch (err) {
            console.warn('[Notificaciones] No se pudo suscribir a Realtime:', err);
        }
    }

    function cerrarDropdown() {
        const dropdown = document.getElementById('notifAdminDropdown');
        STATE.abierto = false;
        if (dropdown) dropdown.style.display = 'none';
    }

    function toggleNotificacionesAdmin(e) {
        if (e && typeof e.stopPropagation === 'function') e.stopPropagation();
        const dropdown = document.getElementById('notifAdminDropdown');
        if (!dropdown) return;

        STATE.abierto = !STATE.abierto;
        if (STATE.abierto) {
            dropdown.style.display = 'flex';
            renderizarPanel();
            cargarNotificaciones();
        } else {
            dropdown.style.display = 'none';
        }
    }

    function initNotificacionesAdmin() {
        if (STATE.inicializado) return;
        const dropdown = document.getElementById('notifAdminDropdown');
        const wrap = document.getElementById('notifBellWrap');
        if (!dropdown || !wrap) return;

        STATE.inicializado = true;

        dropdown.addEventListener('click', (e) => {
            e.stopPropagation();
            const actionBtn = e.target.closest('[data-notif-action]');
            if (actionBtn) {
                const act = actionBtn.getAttribute('data-notif-action');
                if (act === 'marcar-todas') marcarTodasLeidas();
                else if (act === 'limpiar-leidas') limpiarLeidas();
                return;
            }
            const filterBtn = e.target.closest('[data-notif-filter]');
            if (filterBtn) {
                STATE.filtro = filterBtn.getAttribute('data-notif-filter') || 'no_leidas';
                renderizarPanel();
                return;
            }
            const itemEl = e.target.closest('[data-notif-id]');
            if (itemEl) {
                marcarComoLeida(itemEl.getAttribute('data-notif-id'));
            }
        });

        document.addEventListener('click', (e) => {
            if (STATE.abierto && !wrap.contains(e.target)) {
                cerrarDropdown();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && STATE.abierto) {
                cerrarDropdown();
            }
        });

        const arrancarSupabase = () => {
            if (window.supabaseClient) {
                cargarNotificaciones();
                suscribirRealtime();
                setInterval(() => {
                    if (document.visibilityState === 'visible') cargarNotificaciones();
                }, 30000);
            } else {
                setTimeout(arrancarSupabase, 500);
            }
        };
        arrancarSupabase();
    }

    window.toggleNotificacionesAdmin = toggleNotificacionesAdmin;
    window.cargarNotificacionesAdmin = cargarNotificaciones;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNotificacionesAdmin);
    } else {
        initNotificacionesAdmin();
    }
})();
