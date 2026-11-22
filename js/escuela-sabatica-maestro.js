/**
 * Escuela Sabática · Módulo 4: Modo Maestro Pro | IASD Belén
 * - Recursos exclusivos del Maestro (Folleto Maestros + Notas Elena G. de White)
 * - Banco interactivo de preguntas de la Lección (dinámico desde Supabase)
 * - Lista privada de oración de la clase (localStorage)
 * - Modo Dar Clase en pantalla completa (Cronómetro + Preguntas + Apuntes en letra grande)
 */
(function () {
    'use strict';

    const FALLBACK_PREGUNTAS_L9 = [
        {
            dia: 'Sábado / Introducción',
            categoria: 'Rompehielos',
            pregunta: '¿Por qué hoy en día, en medio de tantas redes sociales y voces espirituales, es más urgente que nunca obedecer 1 Juan 4:1?',
            versiculo: '1 Juan 4:1',
            pista: 'Invite a la clase a compartir un ejemplo cotidiano de cómo verificamos si una noticia o consejo es confiable.'
        },
        {
            dia: 'Domingo',
            categoria: 'Discernimiento',
            pregunta: 'Según 1 Tesalonicenses 5:19-21, ¿qué dos extremos peligrosos debemos evitar frente al don de profecía?',
            versiculo: '1 Tesalonicenses 5:19-21',
            pista: 'Evitar tanto el cinismo que desprecia la profecía como la credulidad que acepta todo sin examinarlo.'
        },
        {
            dia: 'Lunes',
            categoria: 'La Ley y el Testimonio',
            pregunta: '¿Por qué la armonía con la Biblia (Isaías 8:20) es la primera y más decisiva prueba de todo mensaje profético?',
            versiculo: 'Isaías 8:20',
            pista: 'Un verdadero profeta nunca contradice la revelación previa de Dios; siempre exalta las Escrituras.'
        },
        {
            dia: 'Martes',
            categoria: 'Cumplimiento profético',
            pregunta: '¿Cómo se equilibra la prueba del cumplimiento de las predicciones (Deuteronomio 18:21-22) con las profecías condicionales como la de Jonás en Nínive?',
            versiculo: 'Deuteronomio 18:21-22; Jeremías 18:7-10',
            pista: 'Las profecías de juicio o bendición pueden ser condicionales al arrepentimiento del pueblo, revelando la misericordia de Dios.'
        },
        {
            dia: 'Miércoles',
            categoria: 'Cristo en el centro',
            pregunta: 'En 1 Juan 4:2-3, ¿qué significa realmente confesar que Jesucristo ha venido en carne y cómo impacta nuestra vida diaria?',
            versiculo: '1 Juan 4:2-3',
            pista: 'Todo verdadero mensaje profético exalta la encarnación, el sacrificio y el señorío de Cristo, no al mensajero.'
        },
        {
            dia: 'Jueves',
            categoria: 'Por sus frutos',
            pregunta: 'Jesús dijo: "Por sus frutos los conoceréis" (Mateo 7:15-20). ¿Qué frutos concretos deberíamos observar en la vida y el ministerio de un mensajero de Dios?',
            versiculo: 'Mateo 7:15-20; Gálatas 5:22-23',
            pista: 'Humildad, integridad, amor por la iglesia, obediencia a la Palabra y transformación en quienes reciben el mensaje.'
        },
        {
            dia: 'Viernes',
            categoria: 'Aplicación para la Iglesia',
            pregunta: '¿Cómo podemos ayudar a los jóvenes y nuevos creyentes a valorar los escritos proféticos sin reemplazar nunca el estudio directo de la Biblia?',
            versiculo: '2 Crónicas 20:20',
            pista: 'Presentar el don profético como la "luz menor" que siempre nos dirige hacia la "luz mayor": la Palabra de Dios.'
        },
        {
            dia: 'Cierre y Decisión',
            categoria: 'Compromiso',
            pregunta: '¿Qué hábito concreto de estudio bíblico puede fortalecer esta semana tu discernimiento espiritual frente a los engaños del tiempo del fin?',
            versiculo: 'Hechos 17:11',
            pista: 'Cierre invitando a la clase a orar por el espíritu de los creyentes de Berea: escudriñar cada día las Escrituras.'
        }
    ];

    const PRAYER_KEY = 'iasd_belen_es_oracion_clase_2026';
    const NOTES_KEY = 'iasd_belen_es_apuntes_2026';

    const MSTATE = {
        preguntas: FALLBACK_PREGUNTAS_L9.slice(),
        qIndex: 0,
        showHint: false,
        prayers: [],
        fsOpen: false,
        fsFontScale: 1.0,
        fsDark: true
    };

    function esc(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function getSemana() {
        if (window.ESCUELA_SABATICA && typeof window.ESCUELA_SABATICA.getState === 'function') {
            return window.ESCUELA_SABATICA.getState().semana || {};
        }
        return {};
    }

    function loadPrayers() {
        try {
            const raw = JSON.parse(localStorage.getItem(PRAYER_KEY) || '[]');
            MSTATE.prayers = Array.isArray(raw) ? raw : [];
        } catch (e) {
            MSTATE.prayers = [];
        }
    }

    function savePrayers() {
        try {
            localStorage.setItem(PRAYER_KEY, JSON.stringify(MSTATE.prayers));
        } catch (e) { }
    }

    function buildMaestroShell() {
        const mount = document.getElementById('esMaestroProMount');
        if (!mount) return;

        mount.innerHTML = `
            <!-- 0. Resumen Pedagógico Dirigido al Maestro (con imágenes) -->
            <section class="es-section" id="resumenMaestro">
                <div class="es-section-head">
                    <span id="esResumenMaeKicker" class="es-kicker">Guía Rápida del Maestro · Lección 9</span>
                    <h2 class="es-section-title">Resumen Pedagógico para Dirigir la Clase</h2>
                    <p class="es-section-sub">Panorama visual diseñado exclusivamente para maestros: qué enfatizar, qué aclarar y cómo cerrar con un llamado práctico.</p>
                </div>

                <div class="es-maestro-brief-showcase">
                    <div class="es-maestro-brief-body">
                        <span class="es-maestro-brief-pill"><i class="fas fa-chalkboard-teacher"></i> Enfoque del Maestro</span>
                        <h3 id="esResumenMaeTitulo">Cómo enseñar "Poniendo a prueba a los profetas"</h3>
                        <p id="esResumenMaeTexto" class="es-maestro-brief-text">
                            Objetivo de la clase: Guiar a los estudiantes a comprender que poner a prueba el don profético no es falta de fe, sino obediencia bíblica (1 Tes. 5:19-21).
                        </p>
                    </div>
                    <div class="es-maestro-brief-photo">
                        <img src="https://pub-5ad02146ce66485a88aad0fa2fd1e620.r2.dev/anuncios/1795373887517-e668e964.jpg"
                            alt="Biblia abierta para preparación del maestro" />
                    </div>
                </div>

                <div class="es-brief-grid">
                    <div class="es-brief-card">
                        <h4><i class="fas fa-bullseye" style="color:var(--gold);"></i> Objetivo Central</h4>
                        <p>Que la clase entienda que examinar todo con la Biblia protege la fe y honra al Espíritu Santo (1 Tes. 5:19-21).</p>
                    </div>
                    <div class="es-brief-card">
                        <h4><i class="fas fa-bible" style="color:var(--blue-accent);"></i> Énfasis Teológico</h4>
                        <p>Mantener a Cristo y las Escrituras como norma suprema; el don profético siempre señala hacia la Biblia.</p>
                    </div>
                    <div class="es-brief-card">
                        <h4><i class="fas fa-exclamation-circle" style="color:#d97706;"></i> Punto a Aclarar</h4>
                        <p>Explicar con sencillez las profecías condicionales (Jonás en Nínive / Jer. 18:7-10) frente a Deut. 18:22.</p>
                    </div>
                    <div class="es-brief-card">
                        <h4><i class="fas fa-praying-hands" style="color:#16a34a;"></i> Llamado Final</h4>
                        <p>Desafiar a cada estudiante a adoptar el hábito de Berea (Hechos 17:11): abrir la Biblia cada mañana.</p>
                    </div>
                </div>
            </section>

            <!-- 1. Recursos Oficiales del Maestro (#1) -->
            <section class="es-section" id="recursosMaestro">
                <div class="es-section-head">
                    <span class="es-kicker">Material Exclusivo · Edición Maestros</span>
                    <h2 class="es-section-title">Biblioteca del Maestro para Esta Semana</h2>
                    <p class="es-section-sub">Accede directamente al Folleto de Maestros, Notas de Elena G. de White y al Modo Dar Clase sin distracciones.</p>
                </div>

                <div class="es-maestro-res-grid">
                    <a id="esLinkFolletoMaestro" href="https://s3.us-east-2.wasabisys.com/files.recursos-biblicos.com/Escuela%20Sabatica/Maestros/4to2026/Comentarios%20del%20Maestro%209.pdf" class="es-mres-card es-mres-featured">
                        <div class="es-mres-icon"><i class="fas fa-chalkboard-teacher"></i></div>
                        <span class="es-mres-pill">Edición Maestros · Lección 9</span>
                        <h3>Folleto de Escuela Sabática para Maestros</h3>
                        <p>Incluye comentarios didácticos, bosquejos de clase, ilustraciones y notas extra para el sábado.</p>
                        <span class="es-mres-cta">Leer PDF de Maestros aquí <i class="fas fa-book-open"></i></span>
                    </a>

                    <a id="esLinkNotasEgw" href="https://files.recursos-biblicos.com/Escuela%20Sabatica/NotasElena/4to2026/9%20Lecci%C3%B3n%209_%20Poniendo%20a%20prueba%20a%20los%20profetas%20.pdf" class="es-mres-card">
                        <div class="es-mres-icon"><i class="fas fa-feather-alt"></i></div>
                        <span class="es-mres-pill">Espíritu de Profecía · Lección 9</span>
                        <h3>Notas de Elena G. de White</h3>
                        <p>Citas inspiradas día por día seleccionadas específicamente para acompañar la lección de esta semana.</p>
                        <span class="es-mres-cta">Leer PDF de Notas aquí <i class="fas fa-book-open"></i></span>
                    </a>

                    <div class="es-mres-card es-mres-live">
                        <div class="es-mres-icon"><i class="fas fa-expand-arrows-alt"></i></div>
                        <span class="es-mres-pill">Sábado por la Mañana</span>
                        <h3>Modo "Dar Clase" en Pantalla Completa</h3>
                        <p>Vista limpia en letra grande con tu cronómetro, las preguntas de la lección y tus apuntes listos para enseñar.</p>
                        <button type="button" id="esBtnOpenDarClase" class="es-btn-gold" style="margin-top:0.55rem; width:fit-content; padding:0.68rem 1.25rem; font-size:0.86rem;">
                            <i class="fas fa-tv"></i> Abrir Modo Dar Clase
                        </button>
                    </div>
                </div>
            </section>

            <!-- 2. Banco Interactivo de Preguntas de la Lección (#2) -->
            <section class="es-section" id="bancoPreguntasMaestro">
                <div class="es-section-head">
                    <span id="esQBankKicker" class="es-kicker">Dinámica Participativa · Lección 9</span>
                    <h2 class="es-section-title">Banco de Preguntas para Dirigir la Clase</h2>
                    <p class="es-section-sub">Preguntas diseñadas para despertar el diálogo bíblico en jóvenes y adultos. Usa el botón para pasar a la siguiente.</p>
                </div>

                <div class="es-qbank-card">
                    <div class="es-qbank-top">
                        <div class="es-qbank-tags">
                            <span id="esQDiaBadge" class="es-q-tag-dia">Sábado</span>
                            <span id="esQCatBadge" class="es-q-tag-cat">Rompehielos</span>
                        </div>
                        <span id="esQCounter" class="es-q-counter">Pregunta 1 de 8</span>
                    </div>

                    <div id="esQText" class="es-q-question"></div>

                    <div class="es-q-meta-row">
                        <span id="esQVerse" class="es-q-verse"><i class="fas fa-bible"></i> 1 Juan 4:1</span>
                        <button type="button" id="esBtnToggleHint" class="es-q-hint-toggle">
                            <i class="far fa-lightbulb"></i> Ver pista pedagógica
                        </button>
                    </div>

                    <div id="esQHintBox" class="es-q-hint-box" style="display:none;"></div>

                    <div class="es-qbank-actions">
                        <button type="button" id="esBtnPrevQ" class="es-q-btn-sec">
                            <i class="fas fa-chevron-left"></i> Anterior
                        </button>
                        <button type="button" id="esBtnNextQ" class="es-btn-gold" style="padding:0.7rem 1.45rem; font-size:0.88rem;">
                            <i class="fas fa-dice"></i> Siguiente pregunta
                        </button>
                        <button type="button" id="esBtnRandQ" class="es-q-btn-sec">
                            <i class="fas fa-random"></i> Aleatoria
                        </button>
                        <button type="button" id="esBtnCopyQ" class="es-q-btn-sec">
                            <i class="far fa-copy"></i> Copiar
                        </button>
                    </div>

                    <div id="esQQuickPills" class="es-q-pills"></div>
                </div>
            </section>

            <!-- 3. Lista Privada de Oración de la Clase (#3) -->
            <section class="es-section" id="listaOracionClase">
                <div class="es-section-head">
                    <span class="es-kicker">Cuidado Pastoral · Privado en tu Dispositivo</span>
                    <h2 class="es-section-title">Lista de Oración de Mi Clase</h2>
                    <p class="es-section-sub">Anota los pedidos de oración de tus alumnos el sábado para recordar orar por ellos durante la semana. Solo tú puedes verlos en este dispositivo.</p>
                </div>

                <div class="es-card">
                    <form id="esPrayerForm" class="es-prayer-form">
                        <input type="text" id="esPrayerName" class="es-input" placeholder="Nombre del hermano / visita" required maxlength="60" />
                        <input type="text" id="esPrayerTopic" class="es-input" placeholder="Motivo de oración (salud, familia, trabajo, gratitud...)" required maxlength="160" />
                        <button type="submit" class="es-btn-gold" style="padding:0.72rem 1.3rem; font-size:0.86rem; white-space:nowrap;">
                            <i class="fas fa-praying-hands"></i> Agregar pedido
                        </button>
                    </form>

                    <div id="esPrayerList" class="es-prayer-list"></div>
                </div>
            </section>
        `;

        ensureDarClaseOverlay();
        bindMaestroEvents();
    }

    function ensureDarClaseOverlay() {
        if (document.getElementById('esDarClaseOverlay')) return;
        const overlay = document.createElement('div');
        overlay.id = 'esDarClaseOverlay';
        overlay.className = 'es-fs-overlay';
        overlay.setAttribute('aria-hidden', 'true');
        overlay.innerHTML = `
            <div class="es-fs-topbar">
                <div class="es-fs-brand">
                    <i class="fas fa-chalkboard-teacher" style="color:var(--gold-light);"></i>
                    <span id="esFsLessonTitle">Modo Dar Clase · Lección 9</span>
                </div>
                <div class="es-fs-tools">
                    <button type="button" id="esFsFontDown" class="es-fs-tool-btn" title="Reducir letra">A-</button>
                    <button type="button" id="esFsFontUp" class="es-fs-tool-btn" title="Aumentar letra">A+</button>
                    <button type="button" id="esFsThemeToggle" class="es-fs-tool-btn" title="Cambiar contraste">
                        <i class="fas fa-adjust"></i> Contraste
                    </button>
                    <button type="button" id="esFsCloseBtn" class="es-fs-close-btn">
                        <i class="fas fa-times"></i> Salir
                    </button>
                </div>
            </div>

            <div class="es-fs-body">
                <div class="es-fs-main-col">
                    <div class="es-fs-card es-fs-verse-banner">
                        <span class="es-fs-label"><i class="fas fa-bible"></i> Versículo de Memoria · <strong id="esFsVerseCita">1 Juan 4:1</strong></span>
                        <p id="esFsVerseText" class="es-fs-verse-text"></p>
                    </div>

                    <div class="es-fs-card">
                        <div class="es-fs-q-head">
                            <span id="esFsQBadge" class="es-fs-label">Pregunta 1 de 8</span>
                            <div style="display:flex; gap:0.5rem;">
                                <button type="button" id="esFsPrevQ" class="es-fs-tool-btn"><i class="fas fa-chevron-left"></i></button>
                                <button type="button" id="esFsNextQ" class="es-btn-gold" style="padding:0.45rem 1rem; font-size:0.82rem;">
                                    <i class="fas fa-dice"></i> Siguiente pregunta
                                </button>
                            </div>
                        </div>
                        <p id="esFsQText" class="es-fs-q-text"></p>
                        <p id="esFsQMeta" class="es-fs-q-meta"></p>
                    </div>

                    <div class="es-fs-card">
                        <span class="es-fs-label"><i class="fas fa-pen-nib"></i> Mis Apuntes de Clase (guardado automático)</span>
                        <textarea id="esFsNotes" class="es-fs-notes" placeholder="Escribe o revisa aquí tus puntos clave para guiar la clase..."></textarea>
                    </div>
                </div>

                <aside class="es-fs-side-col">
                    <div class="es-fs-card es-fs-timer-box">
                        <span class="es-fs-label"><i class="fas fa-stopwatch"></i> Cronómetro de Clase</span>
                        <div id="esFsTimerDisplay" class="es-fs-timer-num">35:00</div>
                        <div style="display:flex; justify-content:center; gap:0.5rem;">
                            <button type="button" id="esFsTimerToggle" class="es-btn-gold" style="padding:0.55rem 1.15rem; font-size:0.84rem;">
                                <i class="fas fa-play"></i> Iniciar / Pausar
                            </button>
                            <button type="button" id="esFsTimerReset" class="es-fs-tool-btn">
                                <i class="fas fa-undo"></i>
                            </button>
                        </div>
                    </div>

                    <div class="es-fs-card">
                        <span class="es-fs-label"><i class="fas fa-praying-hands"></i> Pedidos de Oración de Mi Clase</span>
                        <div id="esFsPrayerMini" class="es-fs-prayer-mini"></div>
                    </div>
                </aside>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    function renderCurrentQuestion() {
        const list = MSTATE.preguntas.length > 0 ? MSTATE.preguntas : FALLBACK_PREGUNTAS_L9;
        if (MSTATE.qIndex < 0) MSTATE.qIndex = list.length - 1;
        if (MSTATE.qIndex >= list.length) MSTATE.qIndex = 0;

        const q = list[MSTATE.qIndex];
        const diaEl = document.getElementById('esQDiaBadge');
        const catEl = document.getElementById('esQCatBadge');
        const cntEl = document.getElementById('esQCounter');
        const txtEl = document.getElementById('esQText');
        const verEl = document.getElementById('esQVerse');
        const hintEl = document.getElementById('esQHintBox');
        const hintBtn = document.getElementById('esBtnToggleHint');
        const pillsEl = document.getElementById('esQQuickPills');

        if (diaEl) diaEl.textContent = q.dia || `Pregunta ${MSTATE.qIndex + 1}`;
        if (catEl) catEl.textContent = q.categoria || 'Diálogo Bíblico';
        if (cntEl) cntEl.textContent = `Pregunta ${MSTATE.qIndex + 1} de ${list.length}`;
        if (txtEl) txtEl.textContent = q.pregunta || '';
        if (verEl) verEl.innerHTML = `<i class="fas fa-bible"></i> ${esc(q.versiculo || 'Escrituras')}`;

        if (hintEl) {
            hintEl.textContent = q.pista || 'Invita a dos o tres personas de la clase a compartir su punto de vista leyendo el texto bíblico.';
            hintEl.style.display = MSTATE.showHint ? 'block' : 'none';
        }
        if (hintBtn) {
            hintBtn.innerHTML = MSTATE.showHint
                ? '<i class="fas fa-lightbulb"></i> Ocultar pista'
                : '<i class="far fa-lightbulb"></i> Ver pista pedagógica';
        }

        if (pillsEl) {
            pillsEl.innerHTML = list.map((item, idx) => `
                <button type="button" class="es-q-pill ${idx === MSTATE.qIndex ? 'active' : ''}" data-q-idx="${idx}">
                    ${idx + 1}. ${esc((item.dia || '').split('/')[0].trim() || 'Pregunta')}
                </button>
            `).join('');
            pillsEl.querySelectorAll('[data-q-idx]').forEach(btn => {
                btn.addEventListener('click', () => {
                    MSTATE.qIndex = parseInt(btn.getAttribute('data-q-idx'), 10) || 0;
                    MSTATE.showHint = false;
                    renderCurrentQuestion();
                });
            });
        }

        // Sincronizar también en Modo Dar Clase
        const fsBadge = document.getElementById('esFsQBadge');
        const fsQText = document.getElementById('esFsQText');
        const fsQMeta = document.getElementById('esFsQMeta');
        if (fsBadge) fsBadge.textContent = `${q.dia || 'Pregunta'} · ${MSTATE.qIndex + 1} de ${list.length}`;
        if (fsQText) fsQText.textContent = q.pregunta || '';
        if (fsQMeta) fsQMeta.innerHTML = `<strong>Texto clave:</strong> ${esc(q.versiculo || '')}${q.pista ? ` · <em>${esc(q.pista)}</em>` : ''}`;
    }

    function renderPrayers() {
        const listEl = document.getElementById('esPrayerList');
        const fsMini = document.getElementById('esFsPrayerMini');

        if (listEl) {
            if (MSTATE.prayers.length === 0) {
                listEl.innerHTML = `<p class="es-prayer-empty"><i class="far fa-heart"></i> Aún no has anotado pedidos de oración de tu clase. Agrega el primero arriba.</p>`;
            } else {
                listEl.innerHTML = MSTATE.prayers.map(p => `
                    <div class="es-prayer-item ${p.orado ? 'done' : ''}">
                        <button type="button" class="es-prayer-check" data-p-toggle="${p.id}" title="Marcar como orado">
                            <i class="${p.orado ? 'fas fa-check-circle' : 'far fa-circle'}"></i>
                        </button>
                        <div class="es-prayer-info">
                            <strong>${esc(p.nombre)}</strong>
                            <span>${esc(p.motivo)}</span>
                        </div>
                        <button type="button" class="es-prayer-del" data-p-del="${p.id}" title="Eliminar pedido">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                `).join('');

                listEl.querySelectorAll('[data-p-toggle]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-p-toggle');
                        const found = MSTATE.prayers.find(x => String(x.id) === String(id));
                        if (found) {
                            found.orado = !found.orado;
                            savePrayers();
                            renderPrayers();
                        }
                    });
                });

                listEl.querySelectorAll('[data-p-del]').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const id = btn.getAttribute('data-p-del');
                        MSTATE.prayers = MSTATE.prayers.filter(x => String(x.id) !== String(id));
                        savePrayers();
                        renderPrayers();
                    });
                });
            }
        }

        if (fsMini) {
            const activos = MSTATE.prayers.filter(p => !p.orado);
            if (activos.length === 0) {
                fsMini.innerHTML = `<p style="font-size:0.86rem; opacity:0.75;">Sin pedidos pendientes anotados.</p>`;
            } else {
                fsMini.innerHTML = activos.map(p => `
                    <div class="es-fs-prayer-row">
                        <strong>${esc(p.nombre)}:</strong> ${esc(p.motivo)}
                    </div>
                `).join('');
            }
        }
    }

    function openDarClase() {
        const overlay = document.getElementById('esDarClaseOverlay');
        if (!overlay) return;
        const s = getSemana();
        const titleEl = document.getElementById('esFsLessonTitle');
        const citaEl = document.getElementById('esFsVerseCita');
        const verseEl = document.getElementById('esFsVerseText');
        const notesEl = document.getElementById('esFsNotes');
        const timerEl = document.getElementById('esFsTimerDisplay');
        const mainTimer = document.getElementById('esTimerDisplay');

        if (titleEl) titleEl.textContent = `Lección ${s.numero_leccion || 9}: ${s.titulo_leccion || 'Poniendo a prueba a los profetas'}`;
        if (citaEl) citaEl.textContent = s.versiculo_cita || '1 Juan 4:1';
        if (verseEl) verseEl.textContent = `“${s.versiculo_texto || ''}”`;
        if (timerEl && mainTimer) timerEl.textContent = mainTimer.textContent;
        if (notesEl) {
            try { notesEl.value = localStorage.getItem(NOTES_KEY) || ''; } catch (e) { }
        }

        renderCurrentQuestion();
        renderPrayers();

        MSTATE.fsOpen = true;
        overlay.classList.add('open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeDarClase() {
        const overlay = document.getElementById('esDarClaseOverlay');
        if (!overlay) return;
        MSTATE.fsOpen = false;
        overlay.classList.remove('open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function applyFsScale() {
        const overlay = document.getElementById('esDarClaseOverlay');
        if (overlay) {
            overlay.style.setProperty('--fs-scale', String(MSTATE.fsFontScale));
        }
    }

    function syncSemanaToMaestro(semana) {
        if (!semana) return;
        const linkMae = document.getElementById('esLinkFolletoMaestro');
        const linkEgw = document.getElementById('esLinkNotasEgw');
        const qKicker = document.getElementById('esQBankKicker');
        const maeKicker = document.getElementById('esResumenMaeKicker');
        const maeTitulo = document.getElementById('esResumenMaeTitulo');
        const maeTexto = document.getElementById('esResumenMaeTexto');

        if (linkMae && semana.pdf_maestros_url) linkMae.href = semana.pdf_maestros_url;
        if (linkEgw && semana.notas_egw_url) linkEgw.href = semana.notas_egw_url;
        if (qKicker) qKicker.textContent = `Dinámica Participativa · Lección ${semana.numero_leccion || 9}`;
        if (maeKicker) maeKicker.textContent = `Guía Rápida del Maestro · Lección ${semana.numero_leccion || 9}`;
        if (maeTitulo && semana.titulo_leccion) maeTitulo.textContent = `Cómo enseñar "${semana.titulo_leccion}"`;
        if (maeTexto && semana.resumen_maestro) maeTexto.textContent = semana.resumen_maestro;

        if (Array.isArray(semana.preguntas_maestro) && semana.preguntas_maestro.length > 0) {
            MSTATE.preguntas = semana.preguntas_maestro;
            MSTATE.qIndex = 0;
        }
        renderCurrentQuestion();
    }

    function bindMaestroEvents() {
        const btnPrev = document.getElementById('esBtnPrevQ');
        const btnNext = document.getElementById('esBtnNextQ');
        const btnRand = document.getElementById('esBtnRandQ');
        const btnCopy = document.getElementById('esBtnCopyQ');
        const btnHint = document.getElementById('esBtnToggleHint');
        const btnOpenFs = document.getElementById('esBtnOpenDarClase');
        const heroFsBtn = document.getElementById('esHeroBtnDarClase');
        const linkMae = document.getElementById('esLinkFolletoMaestro');
        const linkEgw = document.getElementById('esLinkNotasEgw');

        if (linkMae) {
            linkMae.addEventListener('click', (e) => {
                if (window.ESCUELA_SABATICA && typeof window.ESCUELA_SABATICA.openPdf === 'function') {
                    e.preventDefault();
                    window.ESCUELA_SABATICA.openPdf(linkMae.href, 'Comentarios del Maestro · Lección 9');
                }
            });
        }
        if (linkEgw) {
            linkEgw.addEventListener('click', (e) => {
                if (window.ESCUELA_SABATICA && typeof window.ESCUELA_SABATICA.openPdf === 'function') {
                    e.preventDefault();
                    window.ESCUELA_SABATICA.openPdf(linkEgw.href, 'Notas de Elena G. de White · Lección 9');
                }
            });
        }

        if (btnPrev) btnPrev.addEventListener('click', () => {
            MSTATE.qIndex--;
            MSTATE.showHint = false;
            renderCurrentQuestion();
        });
        if (btnNext) btnNext.addEventListener('click', () => {
            MSTATE.qIndex++;
            MSTATE.showHint = false;
            renderCurrentQuestion();
        });
        if (btnRand) btnRand.addEventListener('click', () => {
            const len = MSTATE.preguntas.length || 1;
            let next = Math.floor(Math.random() * len);
            if (len > 1 && next === MSTATE.qIndex) next = (next + 1) % len;
            MSTATE.qIndex = next;
            MSTATE.showHint = false;
            renderCurrentQuestion();
        });
        if (btnHint) btnHint.addEventListener('click', () => {
            MSTATE.showHint = !MSTATE.showHint;
            renderCurrentQuestion();
        });
        if (btnCopy) btnCopy.addEventListener('click', () => {
            const q = MSTATE.preguntas[MSTATE.qIndex];
            if (!q) return;
            const txt = `❓ Pregunta de Clase (${q.dia}): ${q.pregunta}\n📖 Texto clave: ${q.versiculo}`;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(txt).then(() => {
                    const orig = btnCopy.innerHTML;
                    btnCopy.innerHTML = '<i class="fas fa-check"></i> ¡Copiada!';
                    setTimeout(() => { btnCopy.innerHTML = orig; }, 1600);
                });
            }
        });

        if (btnOpenFs) btnOpenFs.addEventListener('click', openDarClase);
        if (heroFsBtn) heroFsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openDarClase();
        });

        // Formulario Lista de Oración
        const prayerForm = document.getElementById('esPrayerForm');
        if (prayerForm) {
            prayerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const nameEl = document.getElementById('esPrayerName');
                const topicEl = document.getElementById('esPrayerTopic');
                const nombre = (nameEl && nameEl.value || '').trim();
                const motivo = (topicEl && topicEl.value || '').trim();
                if (!nombre || !motivo) return;
                MSTATE.prayers.unshift({
                    id: Date.now(),
                    nombre,
                    motivo,
                    orado: false
                });
                savePrayers();
                renderPrayers();
                if (nameEl) nameEl.value = '';
                if (topicEl) topicEl.value = '';
            });
        }

        // Eventos del overlay Modo Dar Clase
        const fsClose = document.getElementById('esFsCloseBtn');
        const fsPrev = document.getElementById('esFsPrevQ');
        const fsNext = document.getElementById('esFsNextQ');
        const fsUp = document.getElementById('esFsFontUp');
        const fsDown = document.getElementById('esFsFontDown');
        const fsTheme = document.getElementById('esFsThemeToggle');
        const fsNotes = document.getElementById('esFsNotes');
        const fsTimerToggle = document.getElementById('esFsTimerToggle');
        const fsTimerReset = document.getElementById('esFsTimerReset');

        if (fsClose) fsClose.addEventListener('click', closeDarClase);
        if (fsPrev) fsPrev.addEventListener('click', () => {
            MSTATE.qIndex--;
            renderCurrentQuestion();
        });
        if (fsNext) fsNext.addEventListener('click', () => {
            MSTATE.qIndex++;
            renderCurrentQuestion();
        });
        if (fsUp) fsUp.addEventListener('click', () => {
            MSTATE.fsFontScale = Math.min(1.45, +(MSTATE.fsFontScale + 0.1).toFixed(2));
            applyFsScale();
        });
        if (fsDown) fsDown.addEventListener('click', () => {
            MSTATE.fsFontScale = Math.max(0.85, +(MSTATE.fsFontScale - 0.1).toFixed(2));
            applyFsScale();
        });
        if (fsTheme) fsTheme.addEventListener('click', () => {
            MSTATE.fsDark = !MSTATE.fsDark;
            const overlay = document.getElementById('esDarClaseOverlay');
            if (overlay) overlay.classList.toggle('es-fs-light', !MSTATE.fsDark);
        });
        if (fsNotes) {
            fsNotes.addEventListener('input', () => {
                try { localStorage.setItem(NOTES_KEY, fsNotes.value); } catch (e) { }
                const mainNotes = document.getElementById('esNotesTextarea');
                if (mainNotes) mainNotes.value = fsNotes.value;
            });
        }
        if (fsTimerToggle) {
            fsTimerToggle.addEventListener('click', () => {
                const mainToggle = document.getElementById('esTimerToggle');
                if (mainToggle) mainToggle.click();
            });
        }
        if (fsTimerReset) {
            fsTimerReset.addEventListener('click', () => {
                const mainReset = document.getElementById('esTimerReset');
                if (mainReset) mainReset.click();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && MSTATE.fsOpen) {
                closeDarClase();
            }
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        loadPrayers();
        buildMaestroShell();
        renderCurrentQuestion();
        renderPrayers();
        syncSemanaToMaestro(getSemana());
    });

    window.addEventListener('es:semanaloaded', (ev) => {
        if (ev && ev.detail && ev.detail.semana) {
            syncSemanaToMaestro(ev.detail.semana);
        }
    });
})();
