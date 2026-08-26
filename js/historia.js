/**
 * Módulo de Historia Interactiva IASD Belén
 * 4 Modalidades: Línea de Tiempo (Acordeón), Carrusel, Juego y Mapa del Tiempo
 * 100% compatible con CSP y data-csp-click
 */

(function () {
    'use strict';

    // 1. ESTRUCTURA DE DATOS: 7 HITOS HISTÓRICOS ADVENTISTAS
    const HISTORIA_EVENTOS = [
        {
            id: 1,
            fecha: "1830 - 1844",
            periodoId: "1830s",
            titulo: "El Despertar Millerita",
            icon: "fa-lightbulb",
            color: "#d97706",
            texto: "A principios del siglo XIX, un gran avivamiento espiritual recorrió Estados Unidos y Europa. En este contexto, un granjero bautista llamado William Miller (1782-1849) comenzó un estudio profundo de las profecías bíblicas, especialmente del libro de Daniel. Tras años de investigación sistemática, Miller concluyó que la purificación del santuario de Daniel 8:14 señalaba la segunda venida de Cristo alrededor de 1843-1844. Miles de creyentes de diversas denominaciones se unieron a este movimiento profético con gozo y preparación espiritual.",
            textoCorto: "William Miller estudia las 2300 tardes y mañanas de Daniel 8:14 e inicia el movimiento del pronto advenimiento.",
            versiculo: "Y él dijo: Hasta dos mil trescientas tardes y mañanas; luego el santuario será purificado.",
            referencia: "Daniel 8:14",
            significado: "Raíz profética e inicio del despertar adventista",
            tags: ["William Miller", "Daniel 8:14", "Avivamiento", "Profecía"]
        },
        {
            id: 2,
            fecha: "22 de Octubre de 1844",
            periodoId: "1840s",
            titulo: "El Gran Chasco",
            icon: "fa-heart-crack",
            color: "#c0392b",
            texto: "El 22 de octubre de 1844, miles de creyentes milleritas esperaban con solemne fervor la aparición visible de Cristo en las nubes. Al pasar la medianoche sin que el Salvador viniera a la tierra, sobrevino una profunda desilusión conocida como el 'Gran Chasco'. Sin embargo, este aparente fracaso purificó los motivos de los creyentes genuinos, quienes regresaron a las Escrituras para descubrir que la fecha era correcta, pero el acontecimiento profetizado era en el cielo y no en la tierra.",
            textoCorto: "El paso del día fijado sin la venida visible impulsa un estudio bíblico más riguroso y sincero.",
            versiculo: "Aunque la visión tardará aún por tiempo, mas se apresura hacia el fin, y no mentirá; aunque tardare, espéralo, porque sin duda vendrá, no tardará.",
            referencia: "Habacuc 2:3",
            significado: "Prueba de fe y punto de partida de la teología adventista",
            tags: ["22 de Octubre", "Prueba de Fe", "Estudio Bíblico"]
        },
        {
            id: 3,
            fecha: "1844 - 1850",
            periodoId: "1840s",
            titulo: "La Luz del Santuario y el Juicio Investigador",
            icon: "fa-place-of-worship",
            color: "#0284c7",
            texto: "A la mañana siguiente del chasco, Hiram Edson recibió una clara convicción mientras cruzaba un campo de maíz: Cristo no debía venir a la tierra en 1844, sino que entraba por primera vez en el Lugar Santísimo del Santuario Celestial para iniciar la fase final de expiación y el Juicio Investigador. Este descubrimiento armonizó la tipología del Levítico con Hebreos y Daniel, consolidándose como la columna vertebral de la identidad doctrinal adventista.",
            textoCorto: "Descubrimiento de que Cristo inició su ministerio sumo sacerdotal en el Lugar Santísimo celestial.",
            versiculo: "Tenemos tal sumo sacerdote, el cual se sentó a la diestra del trono de la Majestad en los cielos, ministro del santuario, y de aquel verdadero tabernáculo que levantó el Señor, y no el hombre.",
            referencia: "Hebreos 8:1-2",
            significado: "Pilar distintivo del plan de salvación y expiación final",
            tags: ["Hiram Edson", "Lugar Santísimo", "Hebreos", "Sumo Sacerdote"]
        },
        {
            id: 4,
            fecha: "Diciembre 1844 - 1915",
            periodoId: "1850s",
            titulo: "El Don de Profecía: Elena G. de White",
            icon: "fa-book-bible",
            color: "#7c3aed",
            texto: "En diciembre de 1844, una joven débil de 17 años llamada Elena Harmon (posteriormente Elena G. de White) recibió su primera visión divina consolando al remanente. Durante 70 años de prolífico ministerio, recibió más de 2000 visiones y sueños proféticos, guiando el desarrollo doctrinal, el mensaje de salud, la educación adventista y la publicación de obras monumentales como El Conflicto de los Siglos, El Deseado de Todas las Gentes y Camino a Cristo.",
            textoCorto: "Manifestación del espíritu de profecía para guiar, instruir y unificar al pueblo de Dios.",
            versiculo: "Porque el testimonio de Jesús es el espíritu de la profecía.",
            referencia: "Apocalipsis 19:10",
            significado: "Guía profética inspirada bajo la autoridad suprema de la Biblia",
            tags: ["Elena G. de White", "Testimonio de Jesús", "Salud", "Educación"]
        },
        {
            id: 5,
            fecha: "21 de Mayo de 1863",
            periodoId: "1860s",
            titulo: "La Organización Formal de la Iglesia",
            icon: "fa-sitemap",
            color: "#059669",
            texto: "El 21 de mayo de 1863 en Battle Creek, Michigan, delegados representantes de 3500 miembros y 125 congregaciones votaron formalmente la creación de la Asociación General de los Adventistas del Séptimo Día. Esta organización representativa, con John Byington como primer presidente y James White como líder inspirador, permitió coordinar recursos, sostener ministros y estructurar la misión evangelizadora con orden bíblico y solidez legal.",
            textoCorto: "Fundación de la Asociación General en Battle Creek para coordinar la predicación global.",
            versiculo: "Pero hágase todo decentemente y con orden.",
            referencia: "1 Corintios 14:40",
            significado: "Estructura eclesiástica representativa para la misión mundial",
            tags: ["Battle Creek", "Asociación General", "John Byington", "Organización"]
        },
        {
            id: 6,
            fecha: "1874 - 1900",
            periodoId: "1870s-1900s",
            titulo: "El Mensaje de los Tres Ángeles y la Expansión Mundial",
            icon: "fa-globe-americas",
            color: "#ea580c",
            texto: "En 1874, la iglesia dio un paso histórico al enviar a J.N. Andrews a Suiza como su primer misionero oficial al extranjero. Rápidamente el movimiento se expandió por Europa, Australia, América Latina, África y Asia. La proclamación del mensaje de los tres ángeles de Apocalipsis 14 fue acompañada del establecimiento de casas editoriales, sanatorios médicos y colegios, transformando vidas de manera integral.",
            textoCorto: "Envío del primer misionero (J.N. Andrews) y establecimiento global de imprentas y sanatorios.",
            versiculo: "Vi volar por en medio del cielo a otro ángel, que tenía el evangelio eterno para predicarlo a los moradores de la tierra, a toda nación, tribu, lengua y pueblo.",
            referencia: "Apocalipsis 14:6",
            significado: "Nacimiento de la red misionera, educativa y médica en los 5 continentes",
            tags: ["J.N. Andrews", "Misión Global", "Apocalipsis 14", "Salud"]
        },
        {
            id: 7,
            fecha: "Siglo XXI - Presente",
            periodoId: "sigloxxi",
            titulo: "Un Mensaje de Esperanza para el Mundo",
            icon: "fa-hands-holding-heart",
            color: "#0b2b4f",
            texto: "Hoy, la Iglesia Adventista del Séptimo Día es una confraternidad global de más de 22 millones de miembros bautizados en más de 200 países y territorios. Con la red educativa protestante más grande del planeta (más de 7,500 instituciones), más de 600 hospitales y sanatorios, la agencia humanitaria ADRA y cadenas mundiales de radio y televisión como Hope Channel, la iglesia proclama con urgencia y amor la bendita esperanza del regreso de Jesucristo.",
            textoCorto: "Una familia global de más de 22 millones de creyentes llevando salud, educación y esperanza.",
            versiculo: "He aquí, vengo pronto; y mi galardón conmigo, para recompensar a cada uno según sea su obra.",
            referencia: "Apocalipsis 22:12",
            significado: "Movimiento contemporáneo de restauración y proclamación final",
            tags: ["22+ Millones", "Educación", "Salud ADRA", "Segunda Venida"]
        }
    ];

    // ESTADO LOCAL DEL MÓDULO
    let currentCarruselIndex = 0;
    let carruselTouchStartX = 0;
    let carruselTouchEndX = 0;
    let juegoItems = [];
    let juegoSeleccionado = null;
    let decadaFiltroActiva = 'todas';

    // =========================================================================
    // RENDERIZADORES PRINCIPALES
    // =========================================================================

    /**
     * Renderiza la Línea de Tiempo Vertical Expandible (Acordeón)
     */
    function renderizarTimeline() {
        const container = document.getElementById('historiaTimelineContenido');
        if (!container) return;

        let html = '';
        HISTORIA_EVENTOS.forEach((evt, idx) => {
            const isFirst = idx === 0 ? ' expanded' : '';
            html += `
            <div class="timeline-node${isFirst}" id="timelineNode-${evt.id}" style="--node-color: ${evt.color};">
                <div class="timeline-node-bullet" data-csp-click="toggleAcordeonHistoria(${evt.id})" title="Click para expandir">
                    <i class="fas ${evt.icon}"></i>
                </div>
                <div class="timeline-card">
                    <div class="timeline-card-header" data-csp-click="toggleAcordeonHistoria(${evt.id})">
                        <div class="timeline-header-left">
                            <span class="timeline-year-tag"><i class="fas fa-calendar-alt"></i> ${evt.fecha}</span>
                            <h3 class="timeline-card-title">${evt.id}. ${evt.titulo}</h3>
                        </div>
                        <div class="timeline-header-toggle">
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </div>
                    <div class="timeline-card-body">
                        <div class="timeline-narrative-text">
                            <p>${evt.texto}</p>
                        </div>
                        <div class="timeline-quote-box">
                            <div class="quote-header"><i class="fas fa-book-bible" style="color: ${evt.color};"></i> Pasaje Bíblico Clave:</div>
                            <div class="quote-text">"${evt.versiculo}"</div>
                            <span class="quote-ref">— ${evt.referencia}</span>
                        </div>
                        <div class="timeline-significance-tag">
                            <i class="fas fa-award" style="color: var(--golden);"></i> ${evt.significado}
                        </div>
                    </div>
                </div>
            </div>`;
        });

        container.innerHTML = html;
    }

    /**
     * Renderiza el Carrusel de Eventos
     */
    function renderizarCarrusel() {
        const track = document.getElementById('historiaCarruselTrack');
        const dotsContainer = document.getElementById('historiaCarruselDots');
        if (!track || !dotsContainer) return;

        let slidesHTML = '';
        let dotsHTML = '';

        HISTORIA_EVENTOS.forEach((evt, idx) => {
            slidesHTML += `
            <div class="carousel-slide" style="--event-color: ${evt.color};">
                <div>
                    <div class="carousel-slide-top">
                        <span class="carousel-event-badge">
                            <i class="fas ${evt.icon}"></i> ${evt.fecha}
                        </span>
                        <span class="carousel-slide-counter">Hito ${idx + 1} de ${HISTORIA_EVENTOS.length}</span>
                    </div>
                    <h3 class="carousel-slide-title">${evt.titulo}</h3>
                    <p class="carousel-slide-content">${evt.texto}</p>
                </div>
                <div>
                    <div class="carousel-slide-quote">
                        <p>"${evt.versiculo}"</p>
                        <span>— ${evt.referencia}</span>
                    </div>
                </div>
            </div>`;

            const activeClass = idx === currentCarruselIndex ? ' active' : '';
            dotsHTML += `<button type="button" class="carousel-dot${activeClass}" data-csp-click="irACarruselHistoria(${idx})" aria-label="Ir a hito ${idx + 1}"></button>`;
        });

        track.innerHTML = slidesHTML;
        dotsContainer.innerHTML = dotsHTML;
        actualizarPosicionCarrusel();
        configurarGestosTouchCarrusel();
    }

    function actualizarPosicionCarrusel() {
        const track = document.getElementById('historiaCarruselTrack');
        if (!track) return;

        track.style.transform = `translateX(-${currentCarruselIndex * 100}%)`;

        // Actualizar dots
        const dots = document.querySelectorAll('#historiaCarruselDots .carousel-dot');
        dots.forEach((dot, idx) => {
            if (idx === currentCarruselIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Actualizar botones de navegación
        const prevBtn = document.getElementById('carruselBtnPrev');
        const nextBtn = document.getElementById('carruselBtnNext');
        if (prevBtn) prevBtn.disabled = currentCarruselIndex === 0;
        if (nextBtn) nextBtn.disabled = currentCarruselIndex === HISTORIA_EVENTOS.length - 1;
    }

    function configurarGestosTouchCarrusel() {
        const wrapper = document.getElementById('historiaCarruselWrapper');
        if (!wrapper || wrapper.dataset.touchBound === 'true') return;

        wrapper.addEventListener('touchstart', (e) => {
            carruselTouchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        wrapper.addEventListener('touchend', (e) => {
            carruselTouchEndX = e.changedTouches[0].screenX;
            const diff = carruselTouchStartX - carruselTouchEndX;
            if (Math.abs(diff) > 45) {
                if (diff > 0) {
                    // Deslizar a la izquierda -> Siguiente
                    window.moverCarruselHistoria(1);
                } else {
                    // Deslizar a la derecha -> Anterior
                    window.moverCarruselHistoria(-1);
                }
            }
        }, { passive: true });

        wrapper.dataset.touchBound = 'true';
    }

    /**
     * Inicializa y Renderiza el Juego "Ordena la Historia"
     */
    function inicializarJuego(forzarMezcla = false) {
        if (juegoItems.length === 0 || forzarMezcla) {
            // Barajar aleatoriamente garantizando que no quede ordenado por defecto
            let shuffled = [...HISTORIA_EVENTOS];
            let attempts = 0;
            do {
                shuffled = shuffled.sort(() => Math.random() - 0.5);
                attempts++;
            } while (attempts < 10 && shuffled.every((item, i) => item.id === i + 1));
            juegoItems = shuffled;
        }

        juegoSeleccionado = null;
        renderizarJuegoSlots();
    }

    function renderizarJuegoSlots() {
        const container = document.getElementById('juegoSlotsContainer');
        if (!container) return;

        let html = '';
        juegoItems.forEach((evt, idx) => {
            const isSelected = juegoSeleccionado === idx ? ' selected-for-swap' : '';
            const isFirst = idx === 0;
            const isLast = idx === juegoItems.length - 1;

            html += `
            <div class="juego-card-item${isSelected}" id="juegoItem-${idx}" draggable="true" data-index="${idx}" data-csp-click="seleccionarItemJuego(${idx})">
                <div class="juego-card-num-badge">${idx + 1}</div>
                <div class="juego-card-content">
                    <div class="juego-card-title"><i class="fas ${evt.icon}" style="color: ${evt.color};"></i> ${evt.titulo}</div>
                    <div class="juego-card-clue">${evt.textoCorto}</div>
                </div>
                <div class="juego-card-actions">
                    <button type="button" class="juego-move-btn" data-csp-click="moverItemJuego(${idx}, -1)" ${isFirst ? 'disabled' : ''} title="Subir posición">
                        <i class="fas fa-chevron-up"></i>
                    </button>
                    <button type="button" class="juego-move-btn" data-csp-click="moverItemJuego(${idx}, 1)" ${isLast ? 'disabled' : ''} title="Bajar posición">
                        <i class="fas fa-chevron-down"></i>
                    </button>
                </div>
            </div>`;
        });

        container.innerHTML = html;
        configurarDragAndDropJuego();

        // Ocultar banner de victoria si estaba visible
        const victoryBanner = document.getElementById('juegoVictoryCard');
        if (victoryBanner) victoryBanner.style.display = 'none';
    }

    function configurarDragAndDropJuego() {
        const items = document.querySelectorAll('.juego-card-item');
        items.forEach(item => {
            item.addEventListener('dragstart', (e) => {
                const idx = parseInt(item.getAttribute('data-index'));
                e.dataTransfer.setData('text/plain', idx);
                item.style.opacity = '0.5';
            });

            item.addEventListener('dragend', () => {
                item.style.opacity = '1';
            });

            item.addEventListener('dragover', (e) => {
                e.preventDefault();
            });

            item.addEventListener('drop', (e) => {
                e.preventDefault();
                const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
                const toIdx = parseInt(item.getAttribute('data-index'));
                if (!isNaN(fromIdx) && !isNaN(toIdx) && fromIdx !== toIdx) {
                    intercambiarPosicionesJuego(fromIdx, toIdx);
                }
            });
        });
    }

    function intercambiarPosicionesJuego(idx1, idx2) {
        const temp = juegoItems[idx1];
        juegoItems[idx1] = juegoItems[idx2];
        juegoItems[idx2] = temp;
        juegoSeleccionado = null;
        renderizarJuegoSlots();
    }

    /**
     * Renderiza el Mapa del Tiempo con Zoom por Décadas
     */
    function renderizarMapaTiempo() {
        const container = document.getElementById('mapaEventsDisplay');
        if (!container) return;

        let filtrados = HISTORIA_EVENTOS;
        if (decadaFiltroActiva !== 'todas') {
            filtrados = HISTORIA_EVENTOS.filter(e => e.periodoId === decadaFiltroActiva);
        }

        if (filtrados.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding: 2rem; color: var(--muted-text);">No hay eventos en este período seleccionado.</div>`;
            return;
        }

        let html = '';
        filtrados.forEach(evt => {
            html += `
            <div class="mapa-event-card" style="--era-color: ${evt.color};">
                <div class="mapa-event-header">
                    <div>
                        <span class="mapa-event-year"><i class="fas fa-clock"></i> ${evt.fecha}</span>
                        <h3 class="mapa-event-title" style="margin-top: 0.5rem;"><i class="fas ${evt.icon}" style="color: ${evt.color};"></i> ${evt.titulo}</h3>
                    </div>
                </div>
                <div class="mapa-event-body">
                    <p>${evt.texto}</p>
                </div>
                <div class="timeline-quote-box" style="margin-top: 1rem;">
                    <div class="quote-header"><i class="fas fa-book-bible" style="color: ${evt.color};"></i> Texto Bíblico:</div>
                    <div class="quote-text">"${evt.versiculo}"</div>
                    <span class="quote-ref">— ${evt.referencia}</span>
                </div>
                <div class="mapa-event-tags">
                    ${evt.tags.map(t => `<span class="mapa-tag-item"><i class="fas fa-tag" style="font-size:0.7rem; color:var(--golden);"></i> ${t}</span>`).join('')}
                </div>
            </div>`;
        });

        container.innerHTML = html;
    }

    // =========================================================================
    // EXPOSICIÓN GLOBAL DE FUNCIONES PARA DATA-CSP-CLICK
    // =========================================================================

    /**
     * Cambiar entre las 4 vistas interactivas
     */
    window.cambiarVistaHistoria = function (vistaId) {
        // Actualizar pestañas
        const tabs = document.querySelectorAll('.historia-tab-btn');
        tabs.forEach(tab => {
            if (tab.getAttribute('data-vista') === vistaId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Actualizar paneles
        const panels = document.querySelectorAll('.historia-view-panel');
        panels.forEach(panel => {
            if (panel.id === `historia-view-${vistaId}`) {
                panel.classList.add('active');
            } else {
                panel.classList.remove('active');
            }
        });

        // Reajustes al cambiar de vista
        if (vistaId === 'carrusel') {
            actualizarPosicionCarrusel();
        }
    };

    /**
     * Toggle individual de Acordeón
     */
    window.toggleAcordeonHistoria = function (id) {
        const node = document.getElementById(`timelineNode-${id}`);
        if (node) {
            node.classList.toggle('expanded');
        }
    };

    /**
     * Expandir todas las tarjetas de la línea de tiempo
     */
    window.expandirTodoTimeline = function () {
        const nodes = document.querySelectorAll('.timeline-node');
        nodes.forEach(n => n.classList.add('expanded'));
    };

    /**
     * Contraer todas las tarjetas de la línea de tiempo
     */
    window.contraerTodoTimeline = function () {
        const nodes = document.querySelectorAll('.timeline-node');
        nodes.forEach(n => n.classList.remove('expanded'));
    };

    /**
     * Mover carrusel con flechas
     */
    window.moverCarruselHistoria = function (delta) {
        const nuevoIndex = currentCarruselIndex + delta;
        if (nuevoIndex >= 0 && nuevoIndex < HISTORIA_EVENTOS.length) {
            currentCarruselIndex = nuevoIndex;
            actualizarPosicionCarrusel();
        }
    };

    /**
     * Ir directamente a un slide del carrusel
     */
    window.irACarruselHistoria = function (index) {
        if (index >= 0 && index < HISTORIA_EVENTOS.length) {
            currentCarruselIndex = index;
            actualizarPosicionCarrusel();
        }
    };

    /**
     * Seleccionar o mover items en el juego
     */
    window.seleccionarItemJuego = function (index) {
        if (juegoSeleccionado === null) {
            juegoSeleccionado = index;
            renderizarJuegoSlots();
        } else if (juegoSeleccionado === index) {
            juegoSeleccionado = null;
            renderizarJuegoSlots();
        } else {
            intercambiarPosicionesJuego(juegoSeleccionado, index);
        }
    };

    window.moverItemJuego = function (index, direction) {
        const targetIndex = index + direction;
        if (targetIndex >= 0 && targetIndex < juegoItems.length) {
            intercambiarPosicionesJuego(index, targetIndex);
        }
    };

    /**
     * Comprobar el orden cronológico del juego
     */
    window.comprobarJuegoHistoria = function () {
        let aciertos = 0;
        const total = HISTORIA_EVENTOS.length;

        juegoItems.forEach((item, idx) => {
            const cardEl = document.getElementById(`juegoItem-${idx}`);
            if (cardEl) {
                cardEl.classList.remove('correct', 'incorrect');
                if (item.id === idx + 1) {
                    cardEl.classList.add('correct');
                    aciertos++;
                } else {
                    cardEl.classList.add('incorrect');
                }
            }
        });

        // Actualizar contador
        const scorePill = document.getElementById('juegoScorePill');
        if (scorePill) {
            scorePill.textContent = `${aciertos} de ${total} correctos`;
        }

        // Si todos están correctos, mostrar victoria
        const victoryCard = document.getElementById('juegoVictoryCard');
        if (victoryCard) {
            if (aciertos === total) {
                victoryCard.style.display = 'block';
                victoryCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                victoryCard.style.display = 'none';
            }
        }
    };

    /**
     * Reiniciar y volver a barajar el juego
     */
    window.reiniciarJuegoHistoria = function () {
        inicializarJuego(true);
        const scorePill = document.getElementById('juegoScorePill');
        if (scorePill) scorePill.textContent = `0 de ${HISTORIA_EVENTOS.length} correctos`;
    };

    /**
     * Pista rápida en el juego
     */
    window.darPistaJuegoHistoria = function () {
        // Encontrar el primer elemento fuera de lugar
        let primerErrorIdx = -1;
        for (let i = 0; i < juegoItems.length; i++) {
            if (juegoItems[i].id !== i + 1) {
                primerErrorIdx = i;
                break;
            }
        }

        if (primerErrorIdx !== -1) {
            const itemCorrecto = HISTORIA_EVENTOS[primerErrorIdx];
            const currentItem = juegoItems[primerErrorIdx];
            const msg = `💡 Pista para la Posición #${primerErrorIdx + 1}: Debería ser el evento del año "${itemCorrecto.fecha}" (${itemCorrecto.titulo}). Actualmente tienes puesto "${currentItem.titulo}".`;
            alert(msg);
        } else {
            alert('🎉 ¡Todos los eventos ya están ordenados en perfecta secuencia cronológica!');
        }
    };

    /**
     * Filtrar eventos por década en el Mapa del Tiempo
     */
    window.filtrarDecadaHistoria = function (decadaKey) {
        decadaFiltroActiva = decadaKey;

        // Actualizar chips de décadas
        const chips = document.querySelectorAll('.decada-chip-btn');
        chips.forEach(chip => {
            if (chip.getAttribute('data-decada') === decadaKey) {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });

        renderizarMapaTiempo();
    };

    /**
     * Inicialización del Módulo
     */
    window.initHistoriaModule = function () {
        renderizarTimeline();
        renderizarCarrusel();
        inicializarJuego();
        renderizarMapaTiempo();
    };

    // Auto inicializar al cargar el DOM o cuando se navegue a la página
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initHistoriaModule);
    } else {
        window.initHistoriaModule();
    }

    // Escuchar el evento de navegación del router SPA
    window.addEventListener('pageChanged', (e) => {
        if (e.detail && e.detail.pageId === 'historia') {
            window.initHistoriaModule();
        }
    });

})();
