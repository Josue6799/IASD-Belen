/**
 * Escuela Sabática · Repaso de la Lección | IASD Belén
 * Módulo 3: Switch Estudiante/Maestro, carga dinámica desde Supabase,
 * Versículo interactivo, Audio guiado, Checklist 7 días, Videos dinámicos y Apuntes.
 */
(function () {
    'use strict';

    const DEFAULT_SUPABASE_URL = 'https://ojfpzlvayjfzzqtqydgy.supabase.co';
    const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qZnB6bHZheWpmenpxdHF5ZGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDIzOTYsImV4cCI6MjEwMDIxODM5Nn0.iLCgGBZPP0Zv0cU3xpbNq1rdb9C4AbBKyXV8Mr665NE';

    const FALLBACK_SEMANA = {
        trimestre: '4° Trimestre 2026',
        tema_trimestre: 'El Don de Profecía',
        numero_leccion: 9,
        titulo_leccion: 'Poniendo a prueba a los profetas',
        fecha_semana: '4° Trimestre 2026 · Lección 9',
        versiculo_cita: '1 Juan 4:1',
        versiculo_texto: 'Amados, no creáis a todo espíritu, sino probad los espíritus si son de Dios; porque muchos falsos profetas han salido por el mundo.',
        pdf_adultos_url: 'https://files.recursos-biblicos.com/Escuela%20Sabatica/Leccion/4to2026/LeccionAdultos4to2026.pdf',
        pdf_maestros_url: 'https://s3.us-east-2.wasabisys.com/files.recursos-biblicos.com/Escuela%20Sabatica/Maestros/4to2026/Comentarios%20del%20Maestro%209.pdf',
        notas_egw_url: 'https://files.recursos-biblicos.com/Escuela%20Sabatica/NotasElena/4to2026/9%20Lecci%C3%B3n%209_%20Poniendo%20a%20prueba%20a%20los%20profetas%20.pdf',
        audio_url: '',
        resumen_estudiante: 'En un mundo lleno de voces y mensajes espirituales, Dios no nos deja sin brújula. En esta lección descubrimos que el apóstol Juan nos llama a no creer a todo espíritu, sino a examinar todo a la luz de la Palabra de Dios (1 Juan 4:1). La Biblia presenta cuatro pruebas claras para reconocer a un verdadero mensajero de Dios: (1) Armonía total con la Ley y las Escrituras (Isaías 8:20), (2) Cumplimiento fiel de sus profecías (Deuteronomio 18:21-22), (3) Exaltación genuina de Jesucristo como Señor encarnado (1 Juan 4:2-3), y (4) Frutos espirituales visibles en su vida y ministerio (Mateo 7:15-20). Cuando aplicamos estas pruebas con oración, nuestro discernimiento se fortalece y nuestra fe permanece firme en Cristo.',
        resumen_maestro: 'Objetivo de la clase: Guiar a los estudiantes a comprender que poner a prueba el don profético no es falta de fe, sino obediencia bíblica (1 Tes. 5:19-21). Enfoque pedagógico: Evite el debate estéril sobre falsos profetas modernos y centre la clase en las 4 pruebas bíblicas positivas que protegen a la iglesia. Punto clave a aclarar: Explique con claridad cómo funcionan las profecías condicionales (Jeremías 18:7-10; Jonás en Nínive) frente a Deuteronomio 18:22. Cierre y llamado: Presente el don de profecía como la "luz menor" que siempre conduce a la "luz mayor" (la Biblia) y desafíe a cada miembro a estudiar las Escrituras cada día como los creyentes de Berea (Hechos 17:11).',
        videos: [
            {
                id: 'p1qEgixAQjs',
                titulo: '9. Poniendo a prueba a los profetas — El Don de Profecía',
                canal: 'Escuela Sabática SUMtv',
                descripcion: 'Repaso completo y profundo de la Lección 9 sobre las pruebas bíblicas para discernir el verdadero don profético.'
            },
            {
                id: 'ivDsyF21_r8',
                titulo: 'Repaso Complementario — Lección 9',
                canal: 'Escuela Sabática',
                descripcion: 'Comentarios adicionales, contexto bíblico y aplicación práctica para el estudio personal y la clase del sábado.'
            }
        ],
        preguntas_maestro: []
    };

    const STATE = {
        mode: 'estudiante',
        semana: Object.assign({}, FALLBACK_SEMANA),
        verseLevel: 0,
        sb: null
    };

    function createSupabaseClientSafe() {
        try {
            const url = (localStorage.getItem('supabase_custom_url') || '').trim() || DEFAULT_SUPABASE_URL;
            const key = (localStorage.getItem('supabase_custom_anon_key') || '').trim() || DEFAULT_SUPABASE_ANON_KEY;
            if (window.supabase && typeof window.supabase.createClient === 'function') {
                return window.supabase.createClient(url, key);
            }
        } catch (e) {
            console.warn('[Escuela Sabática] Supabase no disponible, usando respaldo local.', e);
        }
        return null;
    }

    function escapeHtml(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function extractYouTubeId(input) {
        const s = String(input || '').trim();
        if (!s) return '';
        if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;
        const m = s.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
        return m ? m[1] : '';
    }

    // =========================================================================
    // 1. SWITCH SUAVE MODO ESTUDIANTE / MODO MAESTRO
    // =========================================================================
    function setMode(mode, scrollTop) {
        const nextMode = mode === 'maestro' ? 'maestro' : 'estudiante';
        STATE.mode = nextMode;

        const viewEst = document.getElementById('esViewEstudiante');
        const viewMae = document.getElementById('esViewMaestro');
        const btnEst = document.getElementById('esModeBtnEstudiante');
        const btnMae = document.getElementById('esModeBtnMaestro');
        const body = document.body;

        if (btnEst) {
            btnEst.classList.toggle('active', nextMode === 'estudiante');
            btnEst.setAttribute('aria-pressed', String(nextMode === 'estudiante'));
        }
        if (btnMae) {
            btnMae.classList.toggle('active', nextMode === 'maestro');
            btnMae.setAttribute('aria-pressed', String(nextMode === 'maestro'));
        }

        body.classList.toggle('es-mode-maestro', nextMode === 'maestro');

        if (viewEst && viewMae) {
            if (nextMode === 'maestro') {
                viewEst.classList.add('es-view-hidden');
                viewMae.classList.remove('es-view-hidden');
                viewMae.classList.remove('es-view-enter');
                void viewMae.offsetWidth;
                viewMae.classList.add('es-view-enter');
            } else {
                viewMae.classList.add('es-view-hidden');
                viewEst.classList.remove('es-view-hidden');
                viewEst.classList.remove('es-view-enter');
                void viewEst.offsetWidth;
                viewEst.classList.add('es-view-enter');
            }
        }

        try {
            localStorage.setItem('iasd_belen_es_mode', nextMode);
        } catch (e) { }

        if (scrollTop) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        window.dispatchEvent(new CustomEvent('es:modechange', { detail: { mode: nextMode } }));
    }

    function initModeSwitch() {
        const btnEst = document.getElementById('esModeBtnEstudiante');
        const btnMae = document.getElementById('esModeBtnMaestro');
        const heroMaestroBtns = document.querySelectorAll('[data-open-mode="maestro"]');
        const backEstBtns = document.querySelectorAll('[data-open-mode="estudiante"]');

        if (btnEst) btnEst.addEventListener('click', () => setMode('estudiante', true));
        if (btnMae) btnMae.addEventListener('click', () => setMode('maestro', true));
        heroMaestroBtns.forEach(b => b.addEventListener('click', (e) => {
            e.preventDefault();
            setMode('maestro', true);
        }));
        backEstBtns.forEach(b => b.addEventListener('click', (e) => {
            e.preventDefault();
            setMode('estudiante', true);
        }));

        if (window.location.hash === '#maestro') {
            setMode('maestro', false);
        } else {
            setMode('estudiante', false);
        }
    }

    // =========================================================================
    // 2. CARGA DINÁMICA DE LA SEMANA DESDE SUPABASE
    // =========================================================================
    function renderSemanaData() {
        const s = STATE.semana;

        const heroBadge = document.getElementById('esHeroBadge');
        const heroTitle = document.getElementById('esHeroTitle');
        const heroSub = document.getElementById('esHeroSub');
        const heroPdf = document.getElementById('esHeroPdfLink');
        const famAdultosPdf = document.getElementById('esFamAdultosPdf');
        const videosKicker = document.getElementById('esVideosKicker');
        const maestroBadge = document.getElementById('esMaestroBadge');
        const maestroTitle = document.getElementById('esMaestroLessonTitle');

        if (heroBadge) {
            heroBadge.innerHTML = `<i class="fas fa-book-open"></i> ${escapeHtml(s.trimestre)} · ${escapeHtml(s.tema_trimestre)}`;
        }
        if (heroTitle) {
            heroTitle.textContent = `Lección ${s.numero_leccion}: ${s.titulo_leccion}`;
        }
        if (heroSub) {
            heroSub.innerHTML = `Tu centro de estudio semanal de <strong>IASD Belén</strong>: folleto oficial en PDF, práctica del versículo, audio, videos de repaso y herramientas para toda la familia.`;
        }
        if (heroPdf && s.pdf_adultos_url) {
            heroPdf.href = s.pdf_adultos_url;
        }
        if (famAdultosPdf && s.pdf_adultos_url) {
            famAdultosPdf.href = s.pdf_adultos_url;
        }
        if (videosKicker) {
            videosKicker.textContent = `Repaso en Video · Lección ${s.numero_leccion}`;
        }
        if (maestroBadge) {
            maestroBadge.innerHTML = `<i class="fas fa-chalkboard-teacher"></i> Modo Maestro · Lección ${escapeHtml(s.numero_leccion)}`;
        }
        if (maestroTitle) {
            maestroTitle.textContent = `Prepara y dirige: "${s.titulo_leccion}"`;
        }

        const resKicker = document.getElementById('esResumenEstKicker');
        const resTitulo = document.getElementById('esResumenEstTitulo');
        const resTexto = document.getElementById('esResumenEstTexto');
        if (resKicker) resKicker.textContent = `Resumen Visual · Lección ${s.numero_leccion}`;
        if (resTitulo) resTitulo.textContent = s.titulo_leccion || FALLBACK_SEMANA.titulo_leccion;
        if (resTexto) resTexto.textContent = (s.resumen_estudiante || '').trim() || FALLBACK_SEMANA.resumen_estudiante;

        renderMemoryVerse();
        renderVideos();
        renderAudioSection();

        window.dispatchEvent(new CustomEvent('es:semanaloaded', { detail: { semana: s } }));
    }

    async function loadSemanaFromSupabase() {
        if (!STATE.sb) {
            renderSemanaData();
            return;
        }
        try {
            const { data, error } = await STATE.sb
                .from('escuela_sabatica_semana')
                .select('*')
                .eq('activa', true)
                .order('updated_at', { ascending: false })
                .limit(1);

            if (!error && Array.isArray(data) && data.length > 0) {
                STATE.semana = Object.assign({}, FALLBACK_SEMANA, data[0]);
            }
        } catch (e) {
            console.warn('[Escuela Sabática] Usando datos de respaldo:', e);
        }
        renderSemanaData();
    }

    // =========================================================================
    // 3. VERSÍCULO DE MEMORIA INTERACTIVO (#5)
    // =========================================================================
    function renderMemoryVerse() {
        const citaEl = document.getElementById('esVerseCita');
        const textEl = document.getElementById('esVerseInteractiveText');
        const hintEl = document.getElementById('esVerseHint');
        if (!textEl) return;

        const cita = STATE.semana.versiculo_cita || FALLBACK_SEMANA.versiculo_cita;
        const texto = STATE.semana.versiculo_texto || FALLBACK_SEMANA.versiculo_texto;

        if (citaEl) citaEl.textContent = cita;

        const words = texto.split(/\s+/).filter(Boolean);
        const level = STATE.verseLevel;

        if (level === 0) {
            textEl.innerHTML = `“${escapeHtml(texto)}”`;
            if (hintEl) hintEl.textContent = 'Lee el versículo en voz alta y luego cambia a Nivel 1 o Reto Maestro para memorizarlo.';
            return;
        }

        const htmlWords = words.map((w, idx) => {
            const clean = w.replace(/[.,;:¡!¿?"'()]/g, '');
            const shouldHide = level === 1
                ? (clean.length >= 4 && idx % 3 === 1)
                : (clean.length >= 3 && idx % 2 === 0);

            if (!shouldHide) {
                return `<span class="es-verse-word">${escapeHtml(w)}</span>`;
            }
            return `<button type="button" class="es-verse-blank" data-word="${escapeHtml(w)}" title="Toca para revelar">${'_'.repeat(Math.min(Math.max(clean.length, 4), 10))}</button>`;
        });

        textEl.innerHTML = `“${htmlWords.join(' ')}”`;
        if (hintEl) {
            hintEl.textContent = level === 1
                ? 'Toca cada espacio dorado para comprobar si recordaste la palabra correcta.'
                : 'Reto Maestro: recita el versículo completo y toca los espacios para verificar.';
        }

        textEl.querySelectorAll('.es-verse-blank').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.add('revealed');
                btn.textContent = btn.getAttribute('data-word');
            });
        });
    }

    function initMemoryVerseControls() {
        const levelBtns = document.querySelectorAll('[data-verse-level]');
        levelBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                STATE.verseLevel = parseInt(btn.getAttribute('data-verse-level'), 10) || 0;
                levelBtns.forEach(b => b.classList.toggle('active', b === btn));
                renderMemoryVerse();
            });
        });

        const btnWa = document.getElementById('esBtnWaVerse');
        if (btnWa) {
            btnWa.addEventListener('click', () => {
                const msg = `✨ *Versículo de Memoria · Lección ${STATE.semana.numero_leccion}*\n\n“${STATE.semana.versiculo_texto}”\n— *${STATE.semana.versiculo_cita}*\n\n📖 Repasa la lección en IASD Belén: ${window.location.href}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
            });
        }

        const heroWa = document.getElementById('esHeroBtnShareWa');
        if (heroWa) {
            heroWa.addEventListener('click', () => {
                const s = STATE.semana;
                const cleanUrl = window.location.href.split('#')[0];
                const msg = `📖 *Escuela Sabática · IASD Belén*\n*${s.trimestre} — ${s.tema_trimestre}*\n\n✨ *Lección ${s.numero_leccion}: ${s.titulo_leccion}*\n“${s.versiculo_texto}” (${s.versiculo_cita})\n\n🎧 Incluye folletos PDF (Adultos y Menores), audios día por día en voz humana, videos de repaso y foro de preguntas:\n👉 ${cleanUrl}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
            });
        }

        const maestroWa = document.getElementById('esMaestroBtnShareWa');
        if (maestroWa) {
            maestroWa.addEventListener('click', () => {
                const s = STATE.semana;
                const maestroUrl = window.location.href.split('#')[0] + '#maestro';
                const msg = `👨‍🏫 *Modo Maestro · Escuela Sabática IASD Belén*\n\n✨ *Lección ${s.numero_leccion}: ${s.titulo_leccion}*\nIncluye Comentarios del Maestro (PDF), Notas de Elena G. de White, banco de preguntas de la lección, cronómetro y Modo Dar Clase:\n👉 ${maestroUrl}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
            });
        }
    }

    // =========================================================================
    // 4. AUDIO REAL DE LA LECCIÓN (7 DÍAS MP3 + AUDIO SEMANAL PERSONALIZADO)
    // =========================================================================
    const AUDIO_DIAS_L9 = [
        { label: 'Lección 9 · Sábado (Introducción)', url: 'https://www.audioescuelasabatica.com/wp-content/uploads/2026/10/LECCION-9-SABADO.mp3' },
        { label: 'Lección 9 · Domingo (El papel de lo sobrenatural)', url: 'https://www.audioescuelasabatica.com/wp-content/uploads/2026/10/LECCION-9-DOMINGO.mp3' },
        { label: 'Lección 9 · Lunes (En armonía con la Biblia)', url: 'https://www.audioescuelasabatica.com/wp-content/uploads/2026/10/LECCION-9-LUNES.mp3' },
        { label: 'Lección 9 · Martes (La encarnación de Cristo)', url: 'https://www.audioescuelasabatica.com/wp-content/uploads/2026/10/LECCION-9-MARTES.mp3' },
        { label: 'Lección 9 · Miércoles (Frutos positivos)', url: 'https://www.audioescuelasabatica.com/wp-content/uploads/2026/10/LECCION-9-MIERCOLES.mp3' },
        { label: 'Lección 9 · Jueves (Profecías cumplidas)', url: 'https://www.audioescuelasabatica.com/wp-content/uploads/2026/10/LECCION-9-JUEVES.mp3' },
        { label: 'Lección 9 · Viernes (Para estudiar y meditar)', url: 'https://www.audioescuelasabatica.com/wp-content/uploads/2026/10/LECCION-9-VIERNES.mp3' }
    ];

    function initAudioDaysPlayer() {
        const bar = document.getElementById('esAudioDaysBar');
        const player = document.getElementById('esMainAudioPlayer');
        const titleEl = document.getElementById('esAudioDayTitle');
        if (!bar || !player) return;

        bar.querySelectorAll('[data-audio-day]').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-audio-day'), 10) || 0;
                const item = AUDIO_DIAS_L9[idx];
                if (!item) return;
                bar.querySelectorAll('[data-audio-day]').forEach(b => b.classList.toggle('active', b === btn));
                if (titleEl) titleEl.textContent = item.label;
                player.src = item.url;
                player.load();
                player.play().catch(() => {});
            });
        });
    }

    function renderAudioSection() {
        const customWrap = document.getElementById('esCustomAudioWrap');
        if (!customWrap) return;

        const url = (STATE.semana.audio_url || '').trim();
        if (!url) {
            customWrap.innerHTML = '';
            customWrap.style.display = 'none';
            return;
        }

        customWrap.style.display = 'block';
        if (/\.(mp3|m4a|ogg|wav)(\?.*)?$/i.test(url)) {
            customWrap.innerHTML = `
                <div class="es-audio-player-box">
                    <span class="es-audio-label"><i class="fas fa-headphones"></i> Audio de esta semana</span>
                    <audio controls preload="none" style="width:100%; margin-top:0.5rem;">
                        <source src="${escapeHtml(url)}" />
                        Tu navegador no soporta audio HTML5.
                    </audio>
                </div>
            `;
        } else {
            customWrap.innerHTML = `
                <a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" class="es-btn-gold" style="margin-bottom:0.8rem;">
                    <i class="fas fa-headphones"></i> Abrir Audio Semanal de la Lección
                </a>
            `;
        }
    }

    // =========================================================================
    // 5. VIDEOS DE REPASO DINÁMICOS
    // =========================================================================
    function renderVideos() {
        const grid = document.getElementById('esVideosGrid');
        if (!grid) return;

        const videos = Array.isArray(STATE.semana.videos) && STATE.semana.videos.length > 0
            ? STATE.semana.videos
            : FALLBACK_SEMANA.videos;

        grid.innerHTML = videos.map((v, idx) => {
            const ytId = extractYouTubeId(v.id || v.url);
            if (!ytId) return '';
            const titulo = escapeHtml(v.titulo || `Video de Repaso ${idx + 1}`);
            const canal = escapeHtml(v.canal || 'Escuela Sabática');
            const desc = v.descripcion ? `<p class="es-video-desc">${escapeHtml(v.descripcion)}</p>` : '';
            return `
                <article class="es-video-card">
                    <div class="es-video-frame">
                        <iframe src="https://www.youtube.com/embed/${ytId}?playsinline=1&rel=0"
                            title="${titulo}"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                    <div class="es-video-meta">
                        <span class="es-video-tag"><i class="fab fa-youtube"></i> ${canal}</span>
                        <h3>${titulo}</h3>
                        ${desc}
                        <a href="https://www.youtube.com/watch?v=${ytId}" target="_blank" rel="noopener noreferrer" class="es-video-yt-link">
                            Abrir en YouTube <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </article>
            `;
        }).join('');
    }

    // =========================================================================
    // 6. CHECKLIST DE 7 DÍAS
    // =========================================================================
    function initChecklist() {
        const STORAGE_KEY = 'iasd_belen_es_dias_2026';
        const dayBtns = Array.from(document.querySelectorAll('.es-day-btn'));
        const progressBar = document.getElementById('esProgressBar');
        const progressText = document.getElementById('esProgressText');
        const resetBtn = document.getElementById('btnResetWeek');

        let checkedDays = {};
        try {
            checkedDays = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
        } catch (e) { checkedDays = {}; }

        function renderDays() {
            let count = 0;
            dayBtns.forEach(btn => {
                const key = btn.getAttribute('data-day');
                const isDone = !!checkedDays[key];
                if (isDone) count++;
                btn.classList.toggle('done', isDone);
                const icon = btn.querySelector('i');
                if (icon) icon.className = isDone ? 'fas fa-check-circle' : 'far fa-circle';
            });
            const pct = Math.round((count / 7) * 100);
            if (progressBar) progressBar.style.width = pct + '%';
            if (progressText) {
                progressText.textContent = count === 7
                    ? '¡Felicitaciones! Completaste los 7 días de estudio esta semana 🎉'
                    : `${count} de 7 días estudiados esta semana`;
            }
        }

        dayBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-day');
                checkedDays[key] = !checkedDays[key];
                try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checkedDays)); } catch (e) { }
                renderDays();
            });
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                checkedDays = {};
                try { localStorage.setItem(STORAGE_KEY, '{}'); } catch (e) { }
                renderDays();
            });
        }
        renderDays();
    }

    // =========================================================================
    // 7. CRONÓMETRO DE CLASE (MODO MAESTRO)
    // =========================================================================
    function initTimer() {
        let totalSeconds = 35 * 60;
        let remaining = totalSeconds;
        let timerId = null;

        const displayEl = document.getElementById('esTimerDisplay');
        const toggleEl = document.getElementById('esTimerToggle');
        const timerResetEl = document.getElementById('esTimerReset');
        const presetBtns = Array.from(document.querySelectorAll('.es-preset-btn'));

        function renderTimer() {
            const m = Math.floor(remaining / 60);
            const s = remaining % 60;
            const formatted = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
            if (displayEl) displayEl.textContent = formatted;
            const fsDisplay = document.getElementById('esFsTimerDisplay');
            if (fsDisplay) fsDisplay.textContent = formatted;
        }

        function stopTimer() {
            if (timerId) {
                clearInterval(timerId);
                timerId = null;
            }
            if (toggleEl) toggleEl.innerHTML = '<i class="fas fa-play"></i> Iniciar';
        }

        if (toggleEl) {
            toggleEl.addEventListener('click', () => {
                if (timerId) {
                    stopTimer();
                } else {
                    if (remaining <= 0) remaining = totalSeconds;
                    toggleEl.innerHTML = '<i class="fas fa-pause"></i> Pausar';
                    timerId = setInterval(() => {
                        if (remaining > 0) {
                            remaining--;
                            renderTimer();
                        } else {
                            stopTimer();
                        }
                    }, 1000);
                }
            });
        }

        if (timerResetEl) {
            timerResetEl.addEventListener('click', () => {
                stopTimer();
                remaining = totalSeconds;
                renderTimer();
            });
        }

        presetBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const mins = parseInt(btn.getAttribute('data-min'), 10) || 35;
                presetBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                stopTimer();
                totalSeconds = mins * 60;
                remaining = totalSeconds;
                renderTimer();
            });
        });

        renderTimer();
    }

    // =========================================================================
    // 8. CUADERNO DE APUNTES PERSONAL
    // =========================================================================
    function initNotes() {
        const NOTES_KEY = 'iasd_belen_es_apuntes_2026';
        const notesEl = document.getElementById('esNotesTextarea');
        const notesStatus = document.getElementById('esNotesStatus');
        const btnCopyNotes = document.getElementById('esBtnCopyNotes');
        const btnWaNotes = document.getElementById('esBtnWaNotes');
        const btnClearNotes = document.getElementById('esBtnClearNotes');

        if (notesEl) {
            try {
                notesEl.value = localStorage.getItem(NOTES_KEY) || '';
            } catch (e) { }

            notesEl.addEventListener('input', () => {
                try {
                    localStorage.setItem(NOTES_KEY, notesEl.value);
                    if (notesStatus) {
                        notesStatus.innerHTML = '<i class="fas fa-check-circle" style="color:#16a34a;"></i> Apuntes guardados automáticamente';
                    }
                } catch (e) { }
            });
        }

        if (btnCopyNotes && notesEl) {
            btnCopyNotes.addEventListener('click', () => {
                const txt = notesEl.value.trim();
                if (!txt) {
                    if (notesStatus) notesStatus.textContent = 'Escribe tus apuntes primero para poder copiarlos.';
                    return;
                }
                const payload = `📖 Apuntes Escuela Sabática · Lección ${STATE.semana.numero_leccion} · IASD Belén\n\n${txt}`;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(payload).then(() => {
                        const orig = btnCopyNotes.innerHTML;
                        btnCopyNotes.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
                        setTimeout(() => { btnCopyNotes.innerHTML = orig; }, 1800);
                    });
                }
            });
        }

        if (btnWaNotes && notesEl) {
            btnWaNotes.addEventListener('click', () => {
                const txt = notesEl.value.trim();
                const msg = txt
                    ? `📖 *Apuntes Escuela Sabática · Lección ${STATE.semana.numero_leccion} · IASD Belén*\n\n${txt}`
                    : `📖 Te invito a repasar la Lección ${STATE.semana.numero_leccion} (${STATE.semana.titulo_leccion}) en IASD Belén: ${window.location.href}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
            });
        }

        if (btnClearNotes && notesEl) {
            btnClearNotes.addEventListener('click', () => {
                if (!notesEl.value.trim()) return;
                if (confirm('¿Deseas limpiar tus apuntes guardados?')) {
                    notesEl.value = '';
                    try { localStorage.removeItem(NOTES_KEY); } catch (e) { }
                    if (notesStatus) {
                        notesStatus.innerHTML = '<i class="fas fa-lock" style="color: var(--gold);"></i> Apuntes limpiados';
                    }
                }
            });
        }
    }

    // =========================================================================
    // 9. VISOR PDF MODAL INTEGRADO (SIN SALIR DE LA PÁGINA)
    // =========================================================================
    function initPdfModal() {
        const modal = document.getElementById('esPdfModal');
        const iframe = document.getElementById('esPdfIframe');
        const titleEl = document.getElementById('esPdfModalTitle');
        const dlBtn = document.getElementById('esPdfDownloadBtn');
        const altBtn = document.getElementById('esPdfAltViewerBtn');
        const closeBtn = document.getElementById('esPdfCloseBtn');
        if (!modal || !iframe) return;

        let currentUrl = '';
        let useGoogleViewer = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');

        function loadFrame() {
            if (!currentUrl) return;
            iframe.src = useGoogleViewer
                ? `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(currentUrl)}`
                : `${currentUrl}#toolbar=1&navpanes=0`;
        }

        function openPdf(url, title) {
            currentUrl = url;
            if (titleEl) titleEl.textContent = title || 'Folleto de Escuela Sabática';
            if (dlBtn) dlBtn.href = url;
            loadFrame();
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closePdf() {
            modal.classList.remove('open');
            modal.setAttribute('aria-hidden', 'true');
            iframe.src = 'about:blank';
            document.body.style.overflow = '';
        }

        document.querySelectorAll('[data-pdf-modal="true"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const url = link.getAttribute('href');
                const title = link.getAttribute('data-pdf-title') || link.textContent.trim();
                if (url) openPdf(url, title);
            });
        });

        if (altBtn) {
            altBtn.addEventListener('click', () => {
                useGoogleViewer = !useGoogleViewer;
                loadFrame();
            });
        }
        if (closeBtn) closeBtn.addEventListener('click', closePdf);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closePdf();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('open')) closePdf();
        });

        window.ESCUELA_SABATICA.openPdf = openPdf;
    }

    // Exponer estado y cliente limpio para Módulos 4 y 5
    window.ESCUELA_SABATICA = {
        getState: () => STATE,
        setMode: setMode,
        getSupabase: () => STATE.sb,
        openPdf: null
    };

    document.addEventListener('DOMContentLoaded', () => {
        STATE.sb = createSupabaseClientSafe();
        initModeSwitch();
        initMemoryVerseControls();
        initAudioDaysPlayer();
        initChecklist();
        initTimer();
        initNotes();
        initPdfModal();
        loadSemanaFromSupabase();
    });
})();
