/* ==========================================================================
   MÓDULO DE INTERACCIÓN: TEOLOGÍA AVANZADA ADVENTISTA
   IASD Belén · Vanilla JavaScript (CSP Compliant)
   ========================================================================== */

(function () {
    'use strict';

    /**
     * Navega a una página dedicada de tema teológico o al índice
     * @param {string} pageId - ID de la página ('santuario', 'inmortalidad', etc.)
     */
    function navegarTeologia(pageId) {
        if (typeof window.showPage === 'function') {
            window.showPage(pageId);
        } else {
            window.location.hash = pageId;
        }
        // Desplazar al inicio suavemente
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Alterna la visibilidad de una pregunta frecuente (FAQ)
     * @param {HTMLElement} element - El elemento clickeado
     */
    function toggleFaqTeologia(element) {
        if (!element) return;
        const item = element.closest('.teologia-faq-item');
        if (!item) return;

        const answer = item.querySelector('.teologia-faq-a');
        const icon = item.querySelector('.teologia-faq-q i');

        if (answer) {
            const isHidden = answer.style.display === 'none' || getComputedStyle(answer).display === 'none';
            answer.style.display = isHidden ? 'block' : 'none';
            if (icon) {
                icon.className = isHidden ? 'fas fa-chevron-up' : 'fas fa-chevron-down';
            }
        }
    }

    /**
     * Alterna la visibilidad de un acordeón de argumentos sobre el Sábado
     * @param {HTMLElement} element - El elemento del encabezado clickeado
     */
    function toggleAcordeonSabado(element) {
        if (!element) return;
        const item = element.closest('.sabado-arg-item');
        if (!item) return;

        const body = item.querySelector('.sabado-arg-body');
        const icon = item.querySelector('.sabado-arg-toggle i');
        const isOpen = item.classList.contains('open');

        if (isOpen) {
            item.classList.remove('open');
            if (body) body.style.maxHeight = null;
            if (icon) icon.className = 'fas fa-plus';
        } else {
            item.classList.add('open');
            if (body) body.style.maxHeight = body.scrollHeight + 'px';
            if (icon) icon.className = 'fas fa-minus';
        }
    }

    /**
     * Expande o contrae todos los argumentos del Sábado
     * @param {boolean} expandir - True para expandir todos, false para contraer
     */
    function toggleTodosArgumentosSabado(expandir) {
        const items = document.querySelectorAll('.sabado-arg-item');
        items.forEach(item => {
            const body = item.querySelector('.sabado-arg-body');
            const icon = item.querySelector('.sabado-arg-toggle i');
            if (expandir) {
                item.classList.add('open');
                if (body) body.style.maxHeight = body.scrollHeight + 50 + 'px';
                if (icon) icon.className = 'fas fa-minus';
            } else {
                item.classList.remove('open');
                if (body) body.style.maxHeight = null;
                if (icon) icon.className = 'fas fa-plus';
            }
        });
    }

    /**
     * Filtra las tarjetas de historia del Sábado por época
     * @param {string} era - Identificador de la época ('todos', 'apostolica', 'patristica', 'medieval', 'reforma', 'remanente')
     * @param {HTMLElement} btn - Botón clickeado para activar su clase activa
     */
    function filtrarSiglosSabado(era, btn) {
        const cards = document.querySelectorAll('.sabado-century-card');
        const filterBtns = document.querySelectorAll('.sabado-history-filter-btn');

        filterBtns.forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');

        cards.forEach(card => {
            const cardEra = card.getAttribute('data-era') || '';
            if (era === 'todos' || cardEra === era) {
                card.style.display = 'flex';
                setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => { card.style.display = 'none'; }, 200);
            }
        });
    }

    /**
     * Alterna la visibilidad de un acordeón de argumentos sobre el Santuario y Juicio Investigador
     * @param {HTMLElement} element - El elemento del encabezado clickeado
     */
    function toggleAcordeonSantuario(element) {
        if (!element) return;
        const item = element.closest('.santuario-arg-item');
        if (!item) return;

        const body = item.querySelector('.santuario-arg-body');
        const icon = item.querySelector('.santuario-arg-toggle i');
        const isOpen = item.classList.contains('open');

        if (isOpen) {
            item.classList.remove('open');
            if (body) body.style.maxHeight = null;
            if (icon) icon.className = 'fas fa-plus';
        } else {
            item.classList.add('open');
            if (body) body.style.maxHeight = body.scrollHeight + 'px';
            if (icon) icon.className = 'fas fa-minus';
        }
    }

    /**
     * Expande o contrae todos los argumentos del Santuario y Juicio Investigador
     * @param {boolean} expandir - True para expandir todos, false para contraer
     */
    function toggleTodosArgumentosSantuario(expandir) {
        const items = document.querySelectorAll('.santuario-arg-item');
        items.forEach(item => {
            const body = item.querySelector('.santuario-arg-body');
            const icon = item.querySelector('.santuario-arg-toggle i');
            if (expandir) {
                item.classList.add('open');
                if (body) body.style.maxHeight = body.scrollHeight + 50 + 'px';
                if (icon) icon.className = 'fas fa-minus';
            } else {
                item.classList.remove('open');
                if (body) body.style.maxHeight = null;
                if (icon) icon.className = 'fas fa-plus';
            }
        });
    }

    /**
     * Filtra las tarjetas del mobiliario del Santuario según el departamento
     * @param {string} seccion - 'todos', 'atrio', 'santo', 'santisimo'
     * @param {HTMLElement} btn - Botón clickeado
     */
    function filtrarMobiliarioSantuario(seccion, btn) {
        const cards = document.querySelectorAll('.santuario-furniture-card');
        const filterBtns = document.querySelectorAll('.santuario-furniture-btn');

        filterBtns.forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');

        cards.forEach(card => {
            const cardSec = card.getAttribute('data-seccion') || '';
            if (seccion === 'todos' || cardSec === seccion) {
                card.style.display = 'flex';
                setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(10px)';
                setTimeout(() => { card.style.display = 'none'; }, 200);
            }
        });
    }

    /* ==========================================================================
       LÓGICA DEL TOUR INTERACTIVO HIPER-INMERSIVO DEL SANTUARIO (12 ESCENAS)
       ========================================================================== */

    const escenasSantuario = [
        {
            id: 1,
            titulo: "Escena 1: El Patio Exterior (Vista Superior)",
            subtitulo: "Vista panorámica del santuario entero desde arriba",
            tituloIluminado: "SANTUARIO TERRENAL",
            imagen: "https://res.cloudinary.com/onjg5kf6/image/upload/v1788365620/santuario_desde_arriba_jpuhvc.jpg",
            hotspots: []
        },
        {
            id: 2,
            titulo: "Escena 2: El Patio Exterior (Perspectiva Terrenal)",
            subtitulo: "Vista desde el nivel del suelo hacia el Altar del Holocausto y el Lavacro",
            tituloIluminado: "SANTUARIO TERRENAL",
            imagen: "https://res.cloudinary.com/onjg5kf6/image/upload/v1788365621/Santuario_abajo_wiwd7n.jpg",
            hotspots: []
        },
        {
            id: 3,
            titulo: "Escena 3: El Altar del Holocausto",
            subtitulo: "El lugar del sacrificio sustitutivo y la propiciación",
            imagen: "https://res.cloudinary.com/onjg5kf6/image/upload/v1788365620/Holocausto_jh18zd.jpg",
            hotspots: [
                {
                    id: "sc3_fuego_altar",
                    titulo: "El Fuego del Altar",
                    left: 50,
                    top: 42,
                    material: "Bronce con fuego sagrado perpetuo enviado por Dios",
                    simbolismo: "Representa el juicio divino contra el pecado y el consumo consumado del sacrificio expiatorio de Jesucristo en la cruz del Calvario."
                },
                {
                    id: "sc3_cuernos_altar",
                    titulo: "Los Cuernos del Altar",
                    left: 43,
                    top: 45,
                    leftMobile: 74,
                    topMobile: 58,
                    material: "Madera de acacia revestida de bronce macizo",
                    simbolismo: "Simbolizan el poder salvador supremo de Cristo y el refugio inquebrantable de gracia para el pecador arrepentido que busca misericordia."
                },
                {
                    id: "sc3_rejilla_bronce",
                    titulo: "La Rejilla de Bronce",
                    left: 50,
                    top: 74,
                    material: "Rejilla de bronce colado situada en la mitad del altar",
                    simbolismo: "Sostenía la víctima sobre el fuego, representando la capacidad infinita de Cristo para resistir y soportar todo el peso del juicio humano."
                }
            ]
        },
        {
            id: 4,
            titulo: "Escena 4: El Lavacro de Bronce",
            subtitulo: "La fuente de limpieza y regeneración espiritual",
            imagen: "https://res.cloudinary.com/onjg5kf6/image/upload/v1788365621/Lavacro_mxjngl.jpg",
            hotspots: [
                {
                    id: "sc4_agua",
                    titulo: "El Agua de Purificación",
                    left: 50,
                    top: 45,
                    material: "Agua pura renovada continuamente",
                    simbolismo: "Representa el lavamiento de la regeneración por el Espíritu Santo, la limpieza del bautismo y la purificación cotidiana del creyente."
                },
                {
                    id: "sc4_bronce_pulido",
                    titulo: "El Bronce Pulido",
                    left: 50,
                    top: 72,
                    material: "Espejos de bronce fino donados por las mujeres piadasas de Israel",
                    simbolismo: "Representa la Palabra de Dios que actúa como espejo espiritual revelando nuestras faltas para conducirnos a la gracia limpiadora."
                }
            ]
        },
        {
            id: 5,
            titulo: "Escena 5: 2º VELO · Entrada al Lugar Santo",
            subtitulo: "Vista del Lugar Santo desde afuera con el Sumo Sacerdote",
            imagen: "https://res.cloudinary.com/onjg5kf6/image/upload/v1788365620/lugar_santo_abierto_desde_afuera_me9xbw.jpg",
            hotspots: [
                {
                    id: "sc5_velo2",
                    titulo: "Vista del Lugar Santo desde Afuera (2º Velo)",
                    left: 50,
                    top: 50,
                    material: "Velo de lino torcido, azul, púrpura y carmesí",
                    simbolismo: "El Sumo Sacerdote posicionado a la izquierda antes de ingresar a la intercesión continua del primer departamento."
                }
            ]
        },
        {
            id: 6,
            titulo: "Escena 6: LUGAR SANTO",
            subtitulo: "El primer departamento del Santuario y sus tres muebles sagrados",
            tituloIluminado: "LUGAR SANTO",
            imagen: "https://res.cloudinary.com/onjg5kf6/image/upload/v1788365620/lugar_santo_qp8ioo.jpg",
            hotspots: [
                {
                    id: "sc6_candelabro",
                    titulo: "El Candelabro de Oro",
                    left: 35,
                    top: 62,
                    material: "",
                    simbolismo: ""
                },
                {
                    id: "sc6_mesa",
                    titulo: "La Mesa de los Panes",
                    left: 66,
                    top: 62,
                    material: "",
                    simbolismo: ""
                },
                {
                    id: "sc6_incienso",
                    titulo: "El Altar del Incienso",
                    left: 50,
                    top: 60,
                    material: "",
                    simbolismo: ""
                },
                {
                    id: "sc6_velo",
                    titulo: "El Velo del Templo",
                    left: 50,
                    top: 35,
                    material: "",
                    simbolismo: ""
                }
            ]
        },
        {
            id: 7,
            titulo: "Escena 7: El Candelabro de Oro (Menoráh)",
            subtitulo: "La fuente de luz perpetua en el Lugar Santo",
            imagen: "https://res.cloudinary.com/onjg5kf6/image/upload/v1788365620/candelabro_ybp7ot.jpg",
            hotspots: [
                {
                    id: "sc7_candelabro_detalle",
                    titulo: "El Candelabro de Oro (Menoráh)",
                    left: 50,
                    top: 45,
                    material: "Un talento de oro puro (aprox. 34 kg) labrado a martillo en una sola pieza",
                    simbolismo: "Representa a Jesucristo como la Luz Eterna del Mundo (Juan 8:12) y la presencia iluminadora del Espíritu Santo en la Iglesia."
                }
            ]
        },
        {
            id: 8,
            titulo: "Escena 8: La Mesa de los Panes de la Proposición",
            subtitulo: "El pan de la presencia continua ante Dios",
            imagen: "https://res.cloudinary.com/onjg5kf6/image/upload/v1788365620/Mesa_de_los_panes_texw0r.jpg",
            hotspots: [
                {
                    id: "sc8_mesa_detalle",
                    titulo: "Mesa de los Panes de la Proposición",
                    left: 50,
                    top: 50,
                    material: "Madera de acacia recubierta de oro puro con doble moldura de corona",
                    simbolismo: "Simboliza a Cristo como el Pan de Vida (Juan 6:35) que alimenta y sostiene espiritualmente a su pueblo de manera constante."
                }
            ]
        },
        {
            id: 9,
            titulo: "Escena 9: Altar de Oro del Incienso",
            subtitulo: "Las oraciones ascendentes y los méritos de Cristo",
            imagen: "https://res.cloudinary.com/onjg5kf6/image/upload/v1788365620/incensiario_txwjnu.jpg",
            hotspots: [
                {
                    id: "sc9_incienso_detalle",
                    titulo: "Altar de Oro del Incienso",
                    left: 50,
                    top: 48,
                    material: "Madera de acacia recubierta de oro puro con cuatro cuernos sagrados",
                    simbolismo: "Representa las oraciones sinceras de los santos que ascienden perfumadas por los méritos y la justicia de Cristo ante el Trono."
                }
            ]
        },
        {
            id: 10,
            titulo: "Escena 10: El Velo Abierto hacia el Lugar Santísimo",
            subtitulo: "Perspectiva desde el Lugar Santo hacia el Arca del Pacto",
            imagen: "https://res.cloudinary.com/onjg5kf6/image/upload/v1788365620/lugar_santisimo_abierto_viendo_desde_el_lugar_santo_qcmn4h.jpg",
            hotspots: [
                {
                    id: "sc10_velo_abierto",
                    titulo: "El Velo Abierto hacia el Lugar Santísimo",
                    left: 50,
                    top: 50,
                    material: "Velo interior abierto exponiendo el Santo de los Santos",
                    simbolismo: "Representa el acceso de Cristo en 1844 a la fase final de su ministerio: el Juicio Investigador y la vindicación de los santos."
                }
            ]
        },
        {
            id: 11,
            titulo: "Escena 11: EL LUGAR SANTÍSIMO (Arca Cerrada)",
            subtitulo: "El recinto supremo de la presencia divina",
            tituloIluminado: "LUGAR SANTÍSIMO",
            imagen: "https://res.cloudinary.com/onjg5kf6/image/upload/v1788365620/arca_del_pacho_cerrada_jcaegw.jpg",
            hotspots: [
                {
                    id: "sc11_arca_centro",
                    titulo: "El Arca del Pacto (Cerrada)",
                    left: 50,
                    top: 70,
                    material: "Cofre de madera de acacia revestido totalmente en oro interior y exteriormente",
                    simbolismo: "El centro sagrado de la presencia de Dios en la Tierra y guardián de la eterna Ley Moral."
                },
                {
                    id: "sc11_propiciatorio",
                    titulo: "El Propiciatorio (Kapporet)",
                    left: 50,
                    top: 50,
                    material: "Cubierta de oro puro sólido de una sola pieza",
                    simbolismo: "El Trono de la Gracia donde la justicia de la Ley y la misericordia sustitutiva de Cristo armonizan perfectamente."
                },
                {
                    id: "sc11_querubines",
                    titulo: "Los Querubines de Oro",
                    left: 55,
                    top: 40,
                    material: "Dos figuras de querubines de oro batido con alas extendidas",
                    simbolismo: "Representan a la hueste celestial contemplando con reverencia el misterio de la salvación y la santidad de Dios."
                }
            ]
        },
        {
            id: 12,
            titulo: "Escena 12: El Arca del Pacto Abierta",
            subtitulo: "El contenido sagrado del Arca del Pacto",
            tituloIluminado: "LUGAR SANTÍSIMO",
            imagen: "https://res.cloudinary.com/onjg5kf6/image/upload/v1788365620/arca_del_pacto_abierta_tnmge6.jpg",
            hotspots: [
                {
                    id: "sc12_vara_aaron",
                    titulo: "La Vara de Aarón que Floreció",
                    left: 40,
                    top: 60,
                    material: "Vara de almendro que brotó flores y almendras milagrosamente",
                    simbolismo: "Testimonio del llamado divino inalterable y la confirmación del sacerdocio legítimo elegido por Dios."
                },
                {
                    id: "sc12_tablas_ley",
                    titulo: "Las Tablas de la Ley (10 Mandamientos)",
                    left: 55,
                    top: 60,
                    material: "Dos tablas de piedra escritas directamente por el dedo de Dios",
                    simbolismo: "La norma inmutable de justicia, la Ley Moral de los Diez Mandamientos que rige el universo y el Juicio Investigador."
                },
                {
                    id: "sc12_mana",
                    titulo: "La Urna de Oro con el Maná",
                    left: 62,
                    top: 77,
                    material: "Vasija de oro conteniendo el maná conservado milagrosamente incorrupto",
                    simbolismo: "Recordatorio eterno del continuo e inagotable sustento providencial de Dios para su pueblo."
                }
            ]
        }
    ];

    let escenaActualIdx = 0;
    let hotspotActivoId = null;
    let listenerTecladoRef = null;

    /**
     * Inicia el Tour Interactivo del Santuario abriendo el modal a pantalla completa
     */
    function iniciarTourSantuario() {
        const modal = document.getElementById('modalTourSantuario');
        if (!modal) return;

        modal.classList.remove('hidden');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        renderizarDotsSantuario();
        cargarEscenaSantuario(0);

        if (!listenerTecladoRef) {
            listenerTecladoRef = function (e) {
                const isHidden = modal.classList.contains('hidden');
                if (isHidden) return;

                if (e.key === 'Escape') {
                    cerrarTour();
                } else if (e.key === 'ArrowRight') {
                    cambiarEscena(1);
                } else if (e.key === 'ArrowLeft') {
                    cambiarEscena(-1);
                }
            };
            window.addEventListener('keydown', listenerTecladoRef);
        }

        window.addEventListener('resize', recargarPosicionLineasYTarjetas);
    }

    /**
     * Cierra el Tour Interactivo y limpia estados
     */
    function cerrarTour() {
        const modal = document.getElementById('modalTourSantuario');
        if (modal) {
            modal.classList.add('hidden');
            modal.setAttribute('aria-hidden', 'true');
        }

        document.body.style.overflow = '';
        cerrarInfoHotspot();

        if (listenerTecladoRef) {
            window.removeEventListener('keydown', listenerTecladoRef);
            listenerTecladoRef = null;
        }
        window.removeEventListener('resize', recargarPosicionLineasYTarjetas);
    }

    /**
     * Cambia la escena activa (+1 o -1)
     * @param {number} direccion - 1 para avanzar, -1 para retroceder
     */
    function cambiarEscena(direccion) {
        let nuevoIdx = escenaActualIdx + direccion;
        if (nuevoIdx < 0 || nuevoIdx >= escenasSantuario.length) return;
        cargarEscenaSantuario(nuevoIdx);
    }

    /**
     * Carga una escena específica por su índice (0..11)
     * @param {number} idx - Índice de la escena
     */
    function cargarEscenaSantuario(idx) {
        escenaActualIdx = idx;
        const escena = escenasSantuario[idx];
        if (!escena) return;

        cerrarInfoHotspot();

        const titleEl = document.getElementById('santuarioTourTitle');
        const subtitleEl = document.getElementById('santuarioTourSubtitle');
        const progressBadge = document.getElementById('santuarioTourProgressBadge');
        const progressBarFill = document.getElementById('santuarioTourProgressBar');
        const prevBtn = document.getElementById('btnSantuarioPrev');
        const nextBtn = document.getElementById('btnSantuarioNext');
        const imgEl = document.getElementById('santuarioTourImg');

        if (titleEl) titleEl.textContent = escena.titulo;
        if (subtitleEl) subtitleEl.textContent = escena.subtitulo;
        if (progressBadge) progressBadge.textContent = `Escena ${idx + 1} de ${escenasSantuario.length}`;
        if (progressBarFill) progressBarFill.style.width = `${((idx + 1) / escenasSantuario.length) * 100}%`;

        if (prevBtn) prevBtn.disabled = (idx === 0);
        if (nextBtn) nextBtn.disabled = (idx === escenasSantuario.length - 1);

        actualizarDotsSantuario(idx);

        // Renderizar Título Grande Iluminado (para Escenas 1, 2, 6, 11, 12)
        let sceneTitleEl = document.getElementById('santuarioTourSceneOverlayTitle');
        if (!sceneTitleEl) {
            sceneTitleEl = document.createElement('div');
            sceneTitleEl.id = 'santuarioTourSceneOverlayTitle';
            sceneTitleEl.className = 'santuario-tour-scene-overlay-title';
            const viewport = document.getElementById('santuarioTourViewport');
            if (viewport) viewport.appendChild(sceneTitleEl);
        }

        if (escena.tituloIluminado) {
            sceneTitleEl.innerHTML = `<span>${escena.tituloIluminado}</span>`;
            sceneTitleEl.classList.remove('hidden');
        } else if (sceneTitleEl) {
            sceneTitleEl.classList.add('hidden');
        }

        if (imgEl) {
            imgEl.style.opacity = '0.3';
            imgEl.src = escena.imagen;

            const onImgLoad = function () {
                imgEl.style.opacity = '1';
                renderizarHotspotsSantuario();
                imgEl.removeEventListener('load', onImgLoad);
            };

            if (imgEl.complete) {
                onImgLoad();
            } else {
                imgEl.addEventListener('load', onImgLoad);
            }
        }
    }

    /**
     * Renderiza las viñetas (dots) de la barra inferior
     */
    function renderizarDotsSantuario() {
        const dotsContainer = document.getElementById('santuarioTourDots');
        if (!dotsContainer) return;

        let html = '';
        escenasSantuario.forEach((esc, i) => {
            html += `<div class="santuario-tour-dot ${i === 0 ? 'active' : ''}" data-csp-click="cargarEscenaSantuario(${i})" title="${esc.titulo}"></div>`;
        });
        dotsContainer.innerHTML = html;
    }

    /**
     * Actualiza el dot activo en la barra inferior
     * @param {number} activeIdx 
     */
    function actualizarDotsSantuario(activeIdx) {
        const dots = document.querySelectorAll('.santuario-tour-dot');
        dots.forEach((dot, i) => {
            if (i === activeIdx) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    /**
     * Renderiza los hotspots para la escena actual
     */
    function renderizarHotspotsSantuario() {
        const layer = document.getElementById('santuarioTourHotspotsLayer');
        if (!layer) return;

        layer.innerHTML = '';
        const escena = escenasSantuario[escenaActualIdx];
        if (!escena || !escena.hotspots) return;

        escena.hotspots.forEach(h => {
            const hsDiv = document.createElement('div');
            hsDiv.className = 'santuario-hotspot';
            const isMobile = window.innerWidth <= 768;
            const leftVal = (isMobile && h.leftMobile !== undefined) ? h.leftMobile : h.left;
            const topVal = (isMobile && h.topMobile !== undefined) ? h.topMobile : h.top;
            hsDiv.style.left = `${leftVal}%`;
            hsDiv.style.top = `${topVal}%`;
            hsDiv.id = `hs_${h.id}`;
            hsDiv.setAttribute('data-csp-click', `mostrarInfoHotspot('${h.id}')`);
            hsDiv.setAttribute('title', h.titulo);

            hsDiv.innerHTML = `<div class="santuario-hotspot-inner"></div>`;
            layer.appendChild(hsDiv);
        });
    }

    /**
     * Muestra la tarjeta flotante de información de un Hotspot
     * @param {string} hotspotId - ID del hotspot clickeado
     */
    function mostrarInfoHotspot(hotspotId) {
        const escena = escenasSantuario[escenaActualIdx];
        if (!escena) return;

        const hData = escena.hotspots.find(h => h.id === hotspotId);
        if (!hData) return;

        const allHotspots = document.querySelectorAll('.santuario-hotspot');
        allHotspots.forEach(hs => hs.classList.remove('active'));

        const currentHsEl = document.getElementById(`hs_${hotspotId}`);
        if (currentHsEl) {
            currentHsEl.classList.add('active');
        }

        hotspotActivoId = hotspotId;

        const card = document.getElementById('santuarioTourCard');
        const cardTitle = document.getElementById('santuarioTourCardTitle');
        const matWrapper = document.getElementById('santuarioTourCardMaterialWrapper');
        const matVal = document.getElementById('santuarioTourCardMaterial');
        const simbWrapper = document.getElementById('santuarioTourCardSimbolismoWrapper');
        const simbText = document.getElementById('santuarioTourCardSimbolismo');

        if (!card || !cardTitle) return;

        cardTitle.textContent = hData.titulo;

        if (hData.material && hData.material.trim() !== '') {
            matVal.textContent = hData.material;
            matWrapper.classList.remove('hidden');
        } else {
            matWrapper.classList.add('hidden');
        }

        if (hData.simbolismo && hData.simbolismo.trim() !== '') {
            simbText.textContent = hData.simbolismo;
            simbWrapper.classList.remove('hidden');
        } else {
            simbWrapper.classList.add('hidden');
        }

        card.classList.remove('hidden');

        if (currentHsEl) {
            posicionarTarjetaYLinea(currentHsEl);
        }
    }

    /**
     * Posiciona la tarjeta flotante cerca del hotspot y dibuja la línea conectora SVG
     * @param {HTMLElement} hotspotEl 
     */
    function posicionarTarjetaYLinea(hotspotEl) {
        const viewport = document.getElementById('santuarioTourViewport');
        const card = document.getElementById('santuarioTourCard');
        const line = document.getElementById('santuarioTourConnectorLine');

        if (!viewport || !card || !line || !hotspotEl) return;

        const vpRect = viewport.getBoundingClientRect();
        const hsRect = hotspotEl.getBoundingClientRect();

        const hx = hsRect.left + hsRect.width / 2 - vpRect.left;
        const hy = hsRect.top + hsRect.height / 2 - vpRect.top;

        const cardWidth = card.offsetWidth || 320;
        const cardHeight = card.offsetHeight || 160;

        let cx, cy;
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            cx = Math.max(10, (vpRect.width - cardWidth) / 2);
            if (hy < vpRect.height / 2) {
                cy = Math.min(vpRect.height - cardHeight - 15, hy + 35);
            } else {
                cy = Math.max(15, hy - cardHeight - 35);
            }
        } else {
            if (hx + 40 + cardWidth <= vpRect.width - 20) {
                cx = hx + 40;
            } else {
                cx = Math.max(20, hx - cardWidth - 40);
            }

            if (hy + cardHeight <= vpRect.height - 20) {
                cy = Math.max(20, hy - 20);
            } else {
                cy = Math.max(20, vpRect.height - cardHeight - 20);
            }
        }

        card.style.left = `${cx}px`;
        card.style.top = `${cy}px`;

        let anchorX = cx < hx ? cx + cardWidth : cx;
        let anchorY = Math.max(cy, Math.min(cy + cardHeight, hy));

        line.setAttribute('x1', hx);
        line.setAttribute('y1', hy);
        line.setAttribute('x2', anchorX);
        line.setAttribute('y2', anchorY);
        line.classList.remove('hidden');
    }

    /**
     * Recarga las posiciones de tarjetas y líneas en resize
     */
    function recargarPosicionLineasYTarjetas() {
        if (!hotspotActivoId) return;
        const currentHsEl = document.getElementById(`hs_${hotspotActivoId}`);
        if (currentHsEl) {
            posicionarTarjetaYLinea(currentHsEl);
        }
    }

    /**
     * Cierra la tarjeta flotante y la línea conectora
     */
    function cerrarInfoHotspot() {
        const card = document.getElementById('santuarioTourCard');
        const line = document.getElementById('santuarioTourConnectorLine');
        const allHotspots = document.querySelectorAll('.santuario-hotspot');

        if (card) card.classList.add('hidden');
        if (line) line.classList.add('hidden');
        allHotspots.forEach(hs => hs.classList.remove('active'));
        hotspotActivoId = null;
    }

    /**
     * Alterna entre Modo Guía (puntos de información visibles) y Modo Exploración (puntos ocultos)
     */
    function toggleOjo() {
        const modal = document.getElementById('modalTourSantuario');
        const btnOjo = document.getElementById('btnToggleOjoTour');
        if (!modal) return;

        const esExploracion = modal.classList.toggle('modo-exploracion');

        if (btnOjo) {
            if (esExploracion) {
                btnOjo.classList.add('cerrado');
                btnOjo.setAttribute('title', 'Modo Exploración activado (Haz clic para mostrar puntos)');
                const label = btnOjo.querySelector('.ojo-tour-label');
                if (label) label.textContent = 'Modo Exploración';
            } else {
                btnOjo.classList.remove('cerrado');
                btnOjo.setAttribute('title', 'Modo Guía activado (Haz clic para ocultar puntos)');
                const label = btnOjo.querySelector('.ojo-tour-label');
                if (label) label.textContent = 'Modo Guía';
            }
        }
    }

    /**
     * Inicializa el reproductor de video del Santuario con fade-out cinemático en los últimos 2 segundos
     */
    function inicializarVideoSantuario() {
        const video = document.getElementById('videoSantuarioTerrenal');
        const overlay = document.getElementById('videoSantuarioFadeOverlay');
        if (!video || !overlay) return;

        video.addEventListener('timeupdate', function () {
            if (video.duration && !isNaN(video.duration)) {
                if (video.currentTime >= video.duration - 2) {
                    overlay.classList.add('video-fade-out');
                } else {
                    overlay.classList.remove('video-fade-out');
                }
            }
        });

        video.addEventListener('seeking', function () {
            overlay.classList.remove('video-fade-out');
        });

        video.addEventListener('play', function () {
            if (video.currentTime < (video.duration ? video.duration - 2 : 0)) {
                overlay.classList.remove('video-fade-out');
            }
        });

        video.addEventListener('ended', function () {
            setTimeout(() => {
                overlay.classList.remove('video-fade-out');
            }, 1000);
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarVideoSantuario);
    } else {
        inicializarVideoSantuario();
    }

    // Exponer al ámbito global para compatibilidad con data-csp-click
    window.navegarTeologia = navegarTeologia;
    window.toggleFaqTeologia = toggleFaqTeologia;
    window.toggleAcordeonSabado = toggleAcordeonSabado;
    window.toggleTodosArgumentosSabado = toggleTodosArgumentosSabado;
    window.filtrarSiglosSabado = filtrarSiglosSabado;
    window.toggleAcordeonSantuario = toggleAcordeonSantuario;
    window.toggleTodosArgumentosSantuario = toggleTodosArgumentosSantuario;
    window.filtrarMobiliarioSantuario = filtrarMobiliarioSantuario;

    // Funciones del Tour Interactivo del Santuario
    window.iniciarTourSantuario = iniciarTourSantuario;
    window.cerrarTour = cerrarTour;
    window.cambiarEscena = cambiarEscena;
    window.cargarEscenaSantuario = cargarEscenaSantuario;
    window.mostrarInfoHotspot = mostrarInfoHotspot;
    window.cerrarInfoHotspot = cerrarInfoHotspot;
    window.cerrarTourSantuario = cerrarTour;
    window.cambiarEscenaSantuario = cambiarEscena;
    window.toggleOjo = toggleOjo;
    window.inicializarVideoSantuario = inicializarVideoSantuario;

    console.log('✅ Módulo de Teología Avanzada, Video con Fade Out y Tour Interactivo cargados correctamente.');
})();

