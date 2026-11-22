/**
 * Gestor Semanal Aislado de Escuela Sabática · admin.html | IASD Belén
 * Módulo 6: 100% independiente de admin-general.js.
 * Solo interactúa con public.escuela_sabatica_semana y public.escuela_sabatica_foro.
 */
(function () {
    'use strict';

    const DEFAULT_SUPABASE_URL = 'https://ojfpzlvayjfzzqtqydgy.supabase.co';
    const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qZnB6bHZheWpmenpxdHF5ZGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDIzOTYsImV4cCI6MjEwMDIxODM5Nn0.iLCgGBZPP0Zv0cU3xpbNq1rdb9C4AbBKyXV8Mr665NE';

    const ASTATE = {
        sb: null,
        semanaId: null,
        videos: [],
        preguntas: [],
        foroItems: [],
        tab: 'semana'
    };

    function getSb() {
        if (ASTATE.sb) return ASTATE.sb;
        try {
            if (typeof window.supabaseClient !== 'undefined' && window.supabaseClient) {
                ASTATE.sb = window.supabaseClient;
                return ASTATE.sb;
            }
            const url = (localStorage.getItem('supabase_custom_url') || '').trim() || DEFAULT_SUPABASE_URL;
            const key = (localStorage.getItem('supabase_custom_anon_key') || '').trim() || DEFAULT_SUPABASE_ANON_KEY;
            if (window.supabase && typeof window.supabase.createClient === 'function') {
                ASTATE.sb = window.supabase.createClient(url, key);
                return ASTATE.sb;
            }
        } catch (e) {
            console.error('[Admin ES] Error iniciando Supabase:', e);
        }
        return null;
    }

    function esc(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function extractYtId(input) {
        const s = String(input || '').trim();
        if (!s) return '';
        if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
        const m = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
        return m ? m[1] : s;
    }

    function injectStyles() {
        if (document.getElementById('esAdminModalStyles')) return;
        const style = document.createElement('style');
        style.id = 'esAdminModalStyles';
        style.textContent = `
            #esAdminModalOverlay {
                position: fixed; inset: 0; z-index: 10050;
                background: rgba(7, 25, 45, 0.72); backdrop-filter: blur(4px);
                display: none; align-items: center; justify-content: center;
                padding: 1rem; overflow-y: auto;
            }
            #esAdminModalOverlay.open { display: flex; }
            .es-adm-card {
                width: min(980px, 100%); max-height: 92vh;
                background: #ffffff; color: #141f2d; border-radius: 1.25rem;
                box-shadow: 0 24px 60px rgba(7, 25, 45, 0.35);
                display: flex; flex-direction: column; overflow: hidden;
                font-family: 'Inter', -apple-system, sans-serif;
            }
            .es-adm-head {
                background: linear-gradient(135deg, #07192d 0%, #0b2b4f 100%);
                color: #fff; padding: 1.15rem 1.5rem;
                display: flex; align-items: center; justify-content: space-between; gap: 1rem;
                border-bottom: 2px solid rgba(201, 157, 59, 0.45);
            }
            .es-adm-head h2 { margin: 0; font-size: 1.18rem; display: flex; align-items: center; gap: 0.55rem; }
            .es-adm-close {
                background: rgba(255,255,255,0.14); border: none; color: #fff;
                width: 34px; height: 34px; border-radius: 50%; cursor: pointer; font-size: 1rem;
            }
            .es-adm-close:hover { background: rgba(220,38,38,0.85); }
            .es-adm-tabs {
                display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between;
                gap: 0.6rem; padding: 0.75rem 1.5rem; background: #f8fafc; border-bottom: 1px solid #e2e8f0;
            }
            .es-adm-tab-group { display: flex; gap: 0.5rem; }
            .es-adm-tab {
                padding: 0.5rem 1rem; border-radius: 999px; border: 1px solid #cbd5e1;
                background: #fff; color: #334155; font-weight: 700; font-size: 0.84rem; cursor: pointer;
            }
            .es-adm-tab.active { background: #0b2b4f; color: #fff; border-color: #0b2b4f; }
            .es-adm-body {
                padding: 1.35rem 1.5rem 1.8rem; overflow-y: auto; flex: 1;
            }
            .es-adm-grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 0.9rem; }
            .es-adm-field { margin-bottom: 0.85rem; }
            .es-adm-field label { display: block; font-size: 0.78rem; font-weight: 700; color: #0b2b4f; margin-bottom: 0.28rem; }
            .es-adm-input, .es-adm-textarea {
                width: 100%; padding: 0.6rem 0.85rem; border-radius: 0.65rem;
                border: 1.5px solid #cbd5e1; font-family: inherit; font-size: 0.88rem; color: #0f172a;
                background: #fff;
            }
            .es-adm-input:focus, .es-adm-textarea:focus { outline: none; border-color: #c99d3b; }
            .es-adm-box {
                background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.9rem;
                padding: 1rem; margin: 1rem 0;
            }
            .es-adm-box h3 { margin: 0 0 0.7rem; font-size: 0.96rem; color: #0b2b4f; }
            .es-adm-list-row {
                display: flex; align-items: center; justify-content: space-between; gap: 0.7rem;
                background: #fff; border: 1px solid #e2e8f0; border-radius: 0.65rem;
                padding: 0.6rem 0.85rem; margin-bottom: 0.5rem; font-size: 0.85rem;
            }
            .es-adm-btn {
                display: inline-flex; align-items: center; gap: 0.4rem;
                padding: 0.55rem 1rem; border-radius: 999px; border: none;
                font-weight: 700; font-size: 0.84rem; cursor: pointer;
            }
            .es-adm-btn-gold { background: #c99d3b; color: #07192d; }
            .es-adm-btn-navy { background: #0b2b4f; color: #fff; }
            .es-adm-btn-green { background: #16a34a; color: #fff; }
            .es-adm-btn-red { background: #fee2e2; color: #b91c1c; }
            .es-adm-btn-sec { background: #e2e8f0; color: #1e293b; }
            .es-adm-status {
                font-size: 0.84rem; font-weight: 600; color: #15803d; margin-left: 0.6rem;
            }
            .es-adm-foro-item {
                background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.85rem;
                padding: 0.95rem 1rem; margin-bottom: 0.8rem;
            }
            .es-adm-foro-item.is-answered { border-left: 4px solid #16a34a; }
            .es-adm-foro-item.is-pending { border-left: 4px solid #d97706; }
            @media (max-width: 700px) {
                #esAdminModalOverlay { padding: 0; }
                .es-adm-card { width: 100%; max-height: 100dvh; height: 100dvh; border-radius: 0; }
                .es-adm-head { padding: 0.9rem 1rem; }
                .es-adm-head h2 { font-size: 1rem; }
                .es-adm-tabs { padding: 0.65rem 1rem; }
                .es-adm-body { padding: 1rem; }
                .es-adm-grid-2 { grid-template-columns: 1fr; }
                .es-adm-input, .es-adm-textarea { font-size: 16px; }
            }
        `;
        document.head.appendChild(style);
    }

    function ensureModal() {
        if (document.getElementById('esAdminModalOverlay')) return;
        injectStyles();

        const overlay = document.createElement('div');
        overlay.id = 'esAdminModalOverlay';
        overlay.innerHTML = `
            <div class="es-adm-card">
                <div class="es-adm-head">
                    <h2><i class="fas fa-book-bible" style="color:#dfb75c;"></i> Gestor Semanal · Escuela Sabática</h2>
                    <button type="button" id="esAdmCloseBtn" class="es-adm-close" title="Cerrar"><i class="fas fa-times"></i></button>
                </div>
                <div class="es-adm-tabs">
                    <div class="es-adm-tab-group">
                        <button type="button" class="es-adm-tab active" data-es-adm-tab="semana">
                            <i class="fas fa-sliders-h"></i> Lección de la Semana
                        </button>
                        <button type="button" class="es-adm-tab" data-es-adm-tab="foro">
                            <i class="fas fa-comments"></i> Moderar Foro (<span id="esAdmForoCount">0</span>)
                        </button>
                    </div>
                    <a href="escuela-sabatica.html" target="_blank" rel="noopener noreferrer" class="es-adm-btn es-adm-btn-sec" style="text-decoration:none;">
                        <i class="fas fa-external-link-alt"></i> Ver página en vivo
                    </a>
                </div>
                <div class="es-adm-body">
                    <!-- TAB 1: LECCIÓN DE LA SEMANA -->
                    <div id="esAdmTabSemana">
                        <div class="es-adm-grid-2">
                            <div class="es-adm-field">
                                <label>Trimestre</label>
                                <input id="esAdmTrimestre" class="es-adm-input" type="text" placeholder="4° Trimestre 2026" />
                            </div>
                            <div class="es-adm-field">
                                <label>Tema del Trimestre</label>
                                <input id="esAdmTema" class="es-adm-input" type="text" placeholder="El Don de Profecía" />
                            </div>
                        </div>

                        <div class="es-adm-grid-2">
                            <div class="es-adm-field">
                                <label>Número de Lección</label>
                                <input id="esAdmNumLeccion" class="es-adm-input" type="number" min="1" max="14" value="9" />
                            </div>
                            <div class="es-adm-field">
                                <label>Título de la Lección</label>
                                <input id="esAdmTituloLeccion" class="es-adm-input" type="text" placeholder="Poniendo a prueba a los profetas" />
                            </div>
                        </div>

                        <div class="es-adm-grid-2">
                            <div class="es-adm-field">
                                <label>Cita del Versículo de Memoria</label>
                                <input id="esAdmVerseCita" class="es-adm-input" type="text" placeholder="1 Juan 4:1" />
                            </div>
                            <div class="es-adm-field">
                                <label>Enlace de Audio Semanal (MP3 / Podcast / Opcional)</label>
                                <input id="esAdmAudioUrl" class="es-adm-input" type="url" placeholder="https://..." />
                            </div>
                        </div>

                        <div class="es-adm-field">
                            <label>Texto Completo del Versículo de Memoria</label>
                            <textarea id="esAdmVerseTexto" class="es-adm-textarea" rows="2"></textarea>
                        </div>

                        <div class="es-adm-grid-2">
                            <div class="es-adm-field">
                                <label>Resumen General de la Lección (Modo Estudiante)</label>
                                <textarea id="esAdmResumenEst" class="es-adm-textarea" rows="4" placeholder="Resumen claro y edificante para toda la iglesia..."></textarea>
                            </div>
                            <div class="es-adm-field">
                                <label>Resumen Pedagógico (Modo Maestro)</label>
                                <textarea id="esAdmResumenMae" class="es-adm-textarea" rows="4" placeholder="Objetivo de la clase, enfoque teológico, punto a aclarar y llamado final..."></textarea>
                            </div>
                        </div>

                        <div class="es-adm-grid-2">
                            <div class="es-adm-field">
                                <label>Enlace Folleto PDF Adultos</label>
                                <input id="esAdmPdfAdultos" class="es-adm-input" type="url" />
                            </div>
                            <div class="es-adm-field">
                                <label>Enlace Folleto Edición Maestros</label>
                                <input id="esAdmPdfMaestros" class="es-adm-input" type="url" />
                            </div>
                        </div>

                        <div class="es-adm-field">
                            <label>Enlace Notas de Elena G. de White</label>
                            <input id="esAdmNotasEgw" class="es-adm-input" type="url" />
                        </div>

                        <!-- Videos de YouTube -->
                        <div class="es-adm-box">
                            <h3><i class="fab fa-youtube" style="color:#dc2626;"></i> Videos de Repaso de Esta Semana</h3>
                            <div id="esAdmVideosList"></div>
                            <div class="es-adm-grid-2" style="margin-top:0.7rem;">
                                <input id="esAdmNewVidUrl" class="es-adm-input" type="text" placeholder="URL o ID de YouTube (ej: https://youtube.com/watch?v=...)" />
                                <input id="esAdmNewVidTitle" class="es-adm-input" type="text" placeholder="Título del video" />
                            </div>
                            <div style="display:flex; gap:0.6rem; align-items:center;">
                                <input id="esAdmNewVidCanal" class="es-adm-input" type="text" placeholder="Canal (ej: SUMtv)" style="max-width:220px;" />
                                <button type="button" id="esAdmBtnAddVideo" class="es-adm-btn es-adm-btn-navy">
                                    <i class="fas fa-plus"></i> Agregar video
                                </button>
                            </div>
                        </div>

                        <!-- Banco de Preguntas del Modo Maestro -->
                        <div class="es-adm-box">
                            <h3><i class="fas fa-dice" style="color:#c99d3b;"></i> Preguntas del Modo Maestro (<span id="esAdmQCount">0</span>)</h3>
                            <div id="esAdmQuestionsList"></div>
                            <div class="es-adm-grid-2" style="margin-top:0.7rem;">
                                <input id="esAdmNewQDia" class="es-adm-input" type="text" placeholder="Día (ej: Lunes)" />
                                <input id="esAdmNewQVerse" class="es-adm-input" type="text" placeholder="Versículo clave (ej: Isaías 8:20)" />
                            </div>
                            <div class="es-adm-field">
                                <input id="esAdmNewQText" class="es-adm-input" type="text" placeholder="Escribe la pregunta para la clase..." />
                            </div>
                            <div style="display:flex; gap:0.6rem; flex-wrap:wrap; align-items:center;">
                                <input id="esAdmNewQPista" class="es-adm-input" type="text" placeholder="Pista pedagógica opcional para el maestro..." style="flex:1;" />
                                <button type="button" id="esAdmBtnAddQ" class="es-adm-btn es-adm-btn-navy">
                                    <i class="fas fa-plus"></i> Agregar pregunta
                                </button>
                            </div>
                        </div>

                        <div style="display:flex; align-items:center; flex-wrap:wrap; gap:0.7rem; margin-top:1rem;">
                            <button type="button" id="esAdmBtnSaveSemana" class="es-adm-btn es-adm-btn-gold" style="padding:0.72rem 1.5rem; font-size:0.9rem;">
                                <i class="fas fa-save"></i> Guardar Cambios en Escuela Sabática
                            </button>
                            <span id="esAdmSaveStatus" class="es-adm-status"></span>
                        </div>
                    </div>

                    <!-- TAB 2: MODERACIÓN DEL FORO -->
                    <div id="esAdmTabForo" style="display:none;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.9rem;">
                            <p style="margin:0; font-size:0.86rem; color:#475569;">Responde preguntas como Administrador o modera mensajes del foro de estudio.</p>
                            <button type="button" id="esAdmBtnReloadForo" class="es-adm-btn es-adm-btn-sec">
                                <i class="fas fa-sync-alt"></i> Actualizar
                            </button>
                        </div>
                        <div id="esAdmForoList"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        bindModalEvents();
    }

    function renderVideosAdmin() {
        const box = document.getElementById('esAdmVideosList');
        if (!box) return;
        if (ASTATE.videos.length === 0) {
            box.innerHTML = '<p style="font-size:0.84rem; color:#64748b;">Sin videos agregados todavía.</p>';
            return;
        }
        box.innerHTML = ASTATE.videos.map((v, idx) => `
            <div class="es-adm-list-row">
                <div>
                    <strong>${esc(v.titulo || 'Video')}</strong>
                    <div style="font-size:0.77rem; color:#64748b;">${esc(v.canal || 'YouTube')} · ID: ${esc(v.id)}</div>
                </div>
                <button type="button" class="es-adm-btn es-adm-btn-red" data-del-vid="${idx}"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');

        box.querySelectorAll('[data-del-vid]').forEach(btn => {
            btn.addEventListener('click', () => {
                const i = parseInt(btn.getAttribute('data-del-vid'), 10);
                ASTATE.videos.splice(i, 1);
                renderVideosAdmin();
            });
        });
    }

    function renderQuestionsAdmin() {
        const box = document.getElementById('esAdmQuestionsList');
        const cnt = document.getElementById('esAdmQCount');
        if (cnt) cnt.textContent = String(ASTATE.preguntas.length);
        if (!box) return;
        if (ASTATE.preguntas.length === 0) {
            box.innerHTML = '<p style="font-size:0.84rem; color:#64748b;">Sin preguntas cargadas.</p>';
            return;
        }
        box.innerHTML = ASTATE.preguntas.map((q, idx) => `
            <div class="es-adm-list-row">
                <div style="flex:1;">
                    <strong>${idx + 1}. [${esc(q.dia || 'Clase')}]</strong> ${esc(q.pregunta)}
                    <div style="font-size:0.77rem; color:#64748b;">${esc(q.versiculo || '')}</div>
                </div>
                <button type="button" class="es-adm-btn es-adm-btn-red" data-del-q="${idx}"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');

        box.querySelectorAll('[data-del-q]').forEach(btn => {
            btn.addEventListener('click', () => {
                const i = parseInt(btn.getAttribute('data-del-q'), 10);
                ASTATE.preguntas.splice(i, 1);
                renderQuestionsAdmin();
            });
        });
    }

    function renderForoAdmin() {
        const list = document.getElementById('esAdmForoList');
        const cnt = document.getElementById('esAdmForoCount');
        if (cnt) cnt.textContent = String(ASTATE.foroItems.length);
        if (!list) return;

        if (ASTATE.foroItems.length === 0) {
            list.innerHTML = '<p style="text-align:center; color:#64748b; padding:1.5rem;">Aún no hay mensajes en el foro de Escuela Sabática.</p>';
            return;
        }

        list.innerHTML = ASTATE.foroItems.map(item => `
            <div class="es-adm-foro-item ${item.respondida ? 'is-answered' : 'is-pending'}">
                <div style="display:flex; justify-content:space-between; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.4rem;">
                    <div>
                        <strong>${esc(item.nombre)}</strong>
                        <span style="font-size:0.76rem; background:#e2e8f0; padding:0.15rem 0.5rem; border-radius:999px; margin-left:0.35rem;">${esc(item.rol)}</span>
                        <span style="font-size:0.76rem; color:#64748b; margin-left:0.35rem;">Lección ${item.numero_leccion} · ${esc(item.tipo)}</span>
                    </div>
                    <span style="font-size:0.76rem; font-weight:700; color:${item.respondida ? '#15803d' : '#b45309'};">
                        ${item.respondida ? '✔ Respondida' : '● Pendiente'}
                    </span>
                </div>
                <p style="margin:0 0 0.7rem; font-size:0.9rem; white-space:pre-wrap;">${esc(item.mensaje)}</p>
                <div style="display:flex; flex-wrap:wrap; gap:0.5rem; align-items:center;">
                    ${!item.parent_id ? `<button type="button" class="es-adm-btn es-adm-btn-navy" data-adm-reply="${item.id}" data-adm-lec="${item.numero_leccion}"><i class="fas fa-reply"></i> Responder como Admin</button>` : ''}
                    <button type="button" class="es-adm-btn es-adm-btn-green" data-adm-toggle-ans="${item.id}" data-curr="${item.respondida ? '1' : '0'}">
                        <i class="fas fa-check"></i> ${item.respondida ? 'Marcar pendiente' : 'Marcar respondida'}
                    </button>
                    <button type="button" class="es-adm-btn es-adm-btn-red" data-adm-del-foro="${item.id}">
                        <i class="fas fa-trash"></i> Eliminar
                    </button>
                </div>
            </div>
        `).join('');

        list.querySelectorAll('[data-adm-reply]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const parentId = parseInt(btn.getAttribute('data-adm-reply'), 10);
                const lec = parseInt(btn.getAttribute('data-adm-lec'), 10) || 9;
                const respuesta = prompt('Escribe tu respuesta oficial como Administrador / Escuela Sabática:');
                if (!respuesta || !respuesta.trim()) return;
                const sb = getSb();
                if (!sb) return;
                const clean = respuesta.trim();
                await sb.from('escuela_sabatica_foro').insert([{
                    numero_leccion: lec,
                    parent_id: parentId,
                    nombre: 'Equipo Escuela Sabática',
                    rol: 'Admin',
                    tipo: 'respuesta',
                    titulo: `[Respuesta Admin] ${clean.slice(0, 80)}`,
                    mensaje: clean,
                    respondida: true,
                    visible: true
                }]);
                await sb.from('escuela_sabatica_foro').update({ respondida: true }).eq('id', parentId);
                loadForoAdmin();
            });
        });

        list.querySelectorAll('[data-adm-toggle-ans]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = parseInt(btn.getAttribute('data-adm-toggle-ans'), 10);
                const curr = btn.getAttribute('data-curr') === '1';
                const sb = getSb();
                if (!sb) return;
                await sb.from('escuela_sabatica_foro').update({ respondida: !curr }).eq('id', id);
                loadForoAdmin();
            });
        });

        list.querySelectorAll('[data-adm-del-foro]').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = parseInt(btn.getAttribute('data-adm-del-foro'), 10);
                if (!confirm('¿Eliminar este mensaje del foro?')) return;
                const sb = getSb();
                if (!sb) return;
                await sb.from('escuela_sabatica_foro').delete().eq('id', id);
                loadForoAdmin();
            });
        });
    }

    async function loadSemanaAdmin() {
        const sb = getSb();
        if (!sb) return;
        const { data, error } = await sb
            .from('escuela_sabatica_semana')
            .select('*')
            .eq('activa', true)
            .order('updated_at', { ascending: false })
            .limit(1);

        if (!error && Array.isArray(data) && data.length > 0) {
            const s = data[0];
            ASTATE.semanaId = s.id;
            ASTATE.videos = Array.isArray(s.videos) ? s.videos.slice() : [];
            ASTATE.preguntas = Array.isArray(s.preguntas_maestro) ? s.preguntas_maestro.slice() : [];

            document.getElementById('esAdmTrimestre').value = s.trimestre || '';
            document.getElementById('esAdmTema').value = s.tema_trimestre || '';
            document.getElementById('esAdmNumLeccion').value = s.numero_leccion || 9;
            document.getElementById('esAdmTituloLeccion').value = s.titulo_leccion || '';
            document.getElementById('esAdmVerseCita').value = s.versiculo_cita || '';
            document.getElementById('esAdmVerseTexto').value = s.versiculo_texto || '';
            document.getElementById('esAdmResumenEst').value = s.resumen_estudiante || '';
            document.getElementById('esAdmResumenMae').value = s.resumen_maestro || '';
            document.getElementById('esAdmAudioUrl').value = s.audio_url || '';
            document.getElementById('esAdmPdfAdultos').value = s.pdf_adultos_url || '';
            document.getElementById('esAdmPdfMaestros').value = s.pdf_maestros_url || '';
            document.getElementById('esAdmNotasEgw').value = s.notas_egw_url || '';

            renderVideosAdmin();
            renderQuestionsAdmin();
        }
    }

    async function loadForoAdmin() {
        const sb = getSb();
        if (!sb) return;
        const { data, error } = await sb
            .from('escuela_sabatica_foro')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(60);

        if (!error && Array.isArray(data)) {
            ASTATE.foroItems = data;
            renderForoAdmin();
        }
    }

    async function saveSemanaAdmin() {
        const sb = getSb();
        const statusEl = document.getElementById('esAdmSaveStatus');
        if (!sb) {
            if (statusEl) statusEl.textContent = 'Sin conexión a Supabase.';
            return;
        }

        const num = parseInt(document.getElementById('esAdmNumLeccion').value, 10) || 9;
        const payload = {
            trimestre: document.getElementById('esAdmTrimestre').value.trim() || '4° Trimestre 2026',
            tema_trimestre: document.getElementById('esAdmTema').value.trim() || 'El Don de Profecía',
            numero_leccion: num,
            titulo_leccion: document.getElementById('esAdmTituloLeccion').value.trim() || 'Lección de la Semana',
            fecha_semana: `${document.getElementById('esAdmTrimestre').value.trim() || '4° Trimestre 2026'} · Lección ${num}`,
            versiculo_cita: document.getElementById('esAdmVerseCita').value.trim() || '1 Juan 4:1',
            versiculo_texto: document.getElementById('esAdmVerseTexto').value.trim(),
            resumen_estudiante: document.getElementById('esAdmResumenEst').value.trim(),
            resumen_maestro: document.getElementById('esAdmResumenMae').value.trim(),
            audio_url: document.getElementById('esAdmAudioUrl').value.trim(),
            pdf_adultos_url: document.getElementById('esAdmPdfAdultos').value.trim(),
            pdf_maestros_url: document.getElementById('esAdmPdfMaestros').value.trim(),
            notas_egw_url: document.getElementById('esAdmNotasEgw').value.trim(),
            videos: ASTATE.videos,
            preguntas_maestro: ASTATE.preguntas,
            activa: true,
            updated_at: new Date().toISOString()
        };

        if (statusEl) statusEl.textContent = 'Guardando...';

        let err = null;
        if (ASTATE.semanaId) {
            const res = await sb.from('escuela_sabatica_semana').update(payload).eq('id', ASTATE.semanaId);
            err = res.error;
        } else {
            const res = await sb.from('escuela_sabatica_semana').insert([payload]).select().single();
            err = res.error;
            if (res.data) ASTATE.semanaId = res.data.id;
        }

        if (err) {
            console.error('[Admin ES] Error guardando semana:', err);
            if (statusEl) statusEl.textContent = '❌ Error al guardar. Revisa la conexión.';
        } else {
            if (statusEl) statusEl.textContent = '✅ ¡Guardado! Ya está visible en escuela-sabatica.html';
        }
    }

    function bindModalEvents() {
        const overlay = document.getElementById('esAdminModalOverlay');
        const closeBtn = document.getElementById('esAdmCloseBtn');

        if (closeBtn) closeBtn.addEventListener('click', closeGestor);
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeGestor();
            });
        }

        document.querySelectorAll('[data-es-adm-tab]').forEach(btn => {
            btn.addEventListener('click', () => {
                const t = btn.getAttribute('data-es-adm-tab');
                ASTATE.tab = t;
                document.querySelectorAll('[data-es-adm-tab]').forEach(b => b.classList.toggle('active', b === btn));
                document.getElementById('esAdmTabSemana').style.display = t === 'semana' ? 'block' : 'none';
                document.getElementById('esAdmTabForo').style.display = t === 'foro' ? 'block' : 'none';
                if (t === 'foro') loadForoAdmin();
            });
        });

        const btnAddVid = document.getElementById('esAdmBtnAddVideo');
        if (btnAddVid) {
            btnAddVid.addEventListener('click', () => {
                const urlEl = document.getElementById('esAdmNewVidUrl');
                const titEl = document.getElementById('esAdmNewVidTitle');
                const canEl = document.getElementById('esAdmNewVidCanal');
                const ytId = extractYtId(urlEl.value);
                if (!ytId) return;
                ASTATE.videos.push({
                    id: ytId,
                    titulo: titEl.value.trim() || 'Video de Repaso',
                    canal: canEl.value.trim() || 'Escuela Sabática',
                    descripcion: ''
                });
                urlEl.value = '';
                titEl.value = '';
                canEl.value = '';
                renderVideosAdmin();
            });
        }

        const btnAddQ = document.getElementById('esAdmBtnAddQ');
        if (btnAddQ) {
            btnAddQ.addEventListener('click', () => {
                const diaEl = document.getElementById('esAdmNewQDia');
                const verEl = document.getElementById('esAdmNewQVerse');
                const txtEl = document.getElementById('esAdmNewQText');
                const pisEl = document.getElementById('esAdmNewQPista');
                const pregunta = txtEl.value.trim();
                if (!pregunta) return;
                ASTATE.preguntas.push({
                    dia: diaEl.value.trim() || 'Clase',
                    categoria: 'Diálogo Bíblico',
                    pregunta,
                    versiculo: verEl.value.trim() || 'Biblia',
                    pista: pisEl.value.trim()
                });
                diaEl.value = '';
                verEl.value = '';
                txtEl.value = '';
                pisEl.value = '';
                renderQuestionsAdmin();
            });
        }

        const btnSave = document.getElementById('esAdmBtnSaveSemana');
        if (btnSave) btnSave.addEventListener('click', saveSemanaAdmin);

        const btnReloadForo = document.getElementById('esAdmBtnReloadForo');
        if (btnReloadForo) btnReloadForo.addEventListener('click', loadForoAdmin);
    }

    function openGestor() {
        ensureModal();
        const overlay = document.getElementById('esAdminModalOverlay');
        if (overlay) overlay.classList.add('open');
        const statusEl = document.getElementById('esAdmSaveStatus');
        if (statusEl) statusEl.textContent = '';
        loadSemanaAdmin();
        loadForoAdmin();
    }

    function closeGestor() {
        const overlay = document.getElementById('esAdminModalOverlay');
        if (overlay) overlay.classList.remove('open');
    }

    window.abrirGestorEscuelaSabatica = openGestor;

    document.addEventListener('DOMContentLoaded', () => {
        const navBtn = document.getElementById('nav-item-escuela-sabatica');
        if (navBtn) {
            navBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openGestor();
            });
        }
    });
})();
