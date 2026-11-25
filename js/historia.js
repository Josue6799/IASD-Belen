(function () {
    "use strict";

    const HISTORIA_EVENTOS = [
        {
            id: 1,
            fecha: "1830 - 1844",
            titulo: "El Despertar Millerita",
            icon: "fa-lightbulb",
            color: "#b45309",
            mediaTipo: "documento",
            imagen: "https://pub-5ad02146ce66485a88aad0fa2fd1e620.r2.dev/anuncios/1795621979671-b3784382.jpg",
            pieFoto: "Diagrama profético original de 1843 basado en Daniel y Apocalipsis",
            texto: "A principios del siglo XIX, un gran avivamiento espiritual recorrió Estados Unidos y Europa. En este contexto, un granjero bautista llamado William Miller (1782-1849) comenzó un estudio profundo de las profecías bíblicas, especialmente del libro de Daniel. Tras años de investigación sistemática, Miller concluyó que la purificación del santuario de Daniel 8:14 señalaba la segunda venida de Cristo alrededor de 1843-1844. Miles de creyentes de diversas denominaciones se unieron a este movimiento profético con gozo y preparación espiritual.",
            textoCorto: "William Miller estudia las 2300 tardes y mañanas de Daniel 8:14 e inicia el movimiento del pronto advenimiento.",
            versiculo: "Y él dijo: Hasta dos mil trescientas tardes y mañanas; luego el santuario será purificado.",
            referencia: "Daniel 8:14",
            significado: "Raíz profética e inicio del despertar adventista"
        },
        {
            id: 2,
            fecha: "22 de Octubre de 1844",
            titulo: "El Gran Chasco",
            icon: "fa-heart-crack",
            color: "#b91c1c",
            imagen: "https://pub-5ad02146ce66485a88aad0fa2fd1e620.r2.dev/anuncios/1795621978178-24073a7f.jpg",
            pieFoto: "Capilla histórica de William Miller en Hampton, Nueva York",
            texto: "El 22 de octubre de 1844, miles de creyentes milleritas esperaban con solemne fervor la aparición visible de Cristo en las nubes. Al pasar la medianoche sin que el Salvador viniera a la tierra, sobrevino una profunda desilusión conocida como el 'Gran Chasco'. Sin embargo, este aparente fracaso purificó los motivos de los creyentes genuinos, quienes regresaron a las Escrituras en oración para descubrir que la fecha profética era correcta, pero el acontecimiento ocurría en el cielo y no en la tierra.",
            textoCorto: "El paso del día fijado sin la venida visible impulsa un estudio bíblico más riguroso y sincero.",
            versiculo: "Aunque la visión tardará aún por tiempo, mas se apresura hacia el fin, y no mentirá; aunque tardare, espéralo, porque sin duda vendrá, no tardará.",
            referencia: "Habacuc 2:3",
            significado: "Prueba de fe y punto de partida de la teología adventista"
        },
        {
            id: 3,
            fecha: "1844 - 1850",
            titulo: "La Luz del Santuario y el Juicio Investigador",
            icon: "fa-place-of-worship",
            color: "#0369a1",
            imagen: "https://pub-5ad02146ce66485a88aad0fa2fd1e620.r2.dev/anuncios/1795622046720-a6ad73c9.jpg",
            pieFoto: "Amanecer sobre el campo de maíz, recordando la convicción de Hiram Edson en 1844",
            texto: "A la mañana siguiente del chasco, Hiram Edson recibió una clara convicción mientras cruzaba un campo de maíz: Cristo no debía venir a la tierra en 1844, sino que entraba por primera vez en el Lugar Santísimo del Santuario Celestial para iniciar la fase final de expiación y el Juicio Investigador. Este descubrimiento armonizó la tipología de Levítico con Hebreos y Daniel, consolidándose como columna vertebral de la identidad doctrinal adventista.",
            textoCorto: "Descubrimiento de que Cristo inició su ministerio sumo sacerdotal en el Lugar Santísimo celestial.",
            versiculo: "Tenemos tal sumo sacerdote, el cual se sentó a la diestra del trono de la Majestad en los cielos, ministro del santuario, y de aquel verdadero tabernáculo que levantó el Señor, y no el hombre.",
            referencia: "Hebreos 8:1-2",
            significado: "Pilar distintivo del plan de salvación y expiación final"
        },
        {
            id: 4,
            fecha: "Diciembre 1844 - 1915",
            titulo: "El Don de Profecía: Elena G. de White",
            icon: "fa-book-bible",
            color: "#6d28d9",
            mediaTipo: "retrato",
            imagen: "https://pub-5ad02146ce66485a88aad0fa2fd1e620.r2.dev/anuncios/1795621981353-61609494.jpg",
            pieFoto: "Retrato histórico de Elena G. de White escribiendo sus manuscritos",
            texto: "En diciembre de 1844, una joven débil de 17 años llamada Elena Harmon (posteriormente Elena G. de White) recibió su primera visión divina consolando al remanente. Durante 70 años de prolífico ministerio, recibió más de 2,000 visiones y sueños proféticos, guiando el desarrollo doctrinal, el mensaje de salud, la educación adventista y la publicación de obras monumentales como El Conflicto de los Siglos, El Deseado de Todas las Gentes y Camino a Cristo.",
            textoCorto: "Manifestación del espíritu de profecía para guiar, instruir y unificar al pueblo de Dios.",
            versiculo: "Porque el testimonio de Jesús es el espíritu de la profecía.",
            referencia: "Apocalipsis 19:10",
            significado: "Guía profética inspirada bajo la autoridad suprema de la Biblia"
        },
        {
            id: 5,
            fecha: "21 de Mayo de 1863",
            titulo: "La Organización Formal de la Iglesia",
            icon: "fa-sitemap",
            color: "#047857",
            imagen: "https://pub-5ad02146ce66485a88aad0fa2fd1e620.r2.dev/anuncios/1795621982822-2e9565f1.jpg",
            pieFoto: "Histórico Dime Tabernacle en Battle Creek, Michigan",
            texto: "El 21 de mayo de 1863 en Battle Creek, Michigan, delegados representantes de 3,500 miembros y 125 congregaciones votaron formalmente la creación de la Asociación General de los Adventistas del Séptimo Día. Esta organización representativa, con John Byington como primer presidente y James White como líder inspirador, permitió coordinar recursos, sostener ministros y estructurar la misión evangelizadora con orden bíblico y solidez legal.",
            textoCorto: "Fundación de la Asociación General en Battle Creek para coordinar la predicación global.",
            versiculo: "Pero hágase todo decentemente y con orden.",
            referencia: "1 Corintios 14:40",
            significado: "Estructura eclesiástica representativa para la misión mundial"
        },
        {
            id: 6,
            fecha: "1874 - 1900",
            titulo: "El Mensaje de los Tres Ángeles y la Expansión Mundial",
            icon: "fa-globe-americas",
            color: "#c2410c",
            mediaTipo: "retrato",
            imagen: "https://pub-5ad02146ce66485a88aad0fa2fd1e620.r2.dev/anuncios/1795622043325-04a950d3.jpg",
            pieFoto: "John Nevins Andrews (1829-1883), primer misionero oficial enviado al extranjero",
            texto: "En 1874, la iglesia dio un paso histórico al enviar a J. N. Andrews a Suiza como su primer misionero oficial al extranjero. Rápidamente el movimiento se expandió por Europa, Australia, América Latina, África y Asia. La proclamación del mensaje de los tres ángeles de Apocalipsis 14 fue acompañada del establecimiento de casas editoriales, sanatorios médicos y colegios, transformando vidas de manera integral.",
            textoCorto: "Envío del primer misionero (J. N. Andrews) y establecimiento global de imprentas y sanatorios.",
            versiculo: "Vi volar por en medio del cielo a otro ángel, que tenía el evangelio eterno para predicarlo a los moradores de la tierra, a toda nación, tribu, lengua y pueblo.",
            referencia: "Apocalipsis 14:6",
            significado: "Nacimiento de la red misionera, educativa y médica en los 5 continentes"
        },
        {
            id: 7,
            fecha: "Siglo XXI - Presente",
            titulo: "Un Mensaje de Esperanza para el Mundo",
            icon: "fa-hands-holding-heart",
            color: "#0b2b4f",
            imagen: "https://pub-5ad02146ce66485a88aad0fa2fd1e620.r2.dev/anuncios/1795621985398-debf9ca5.jpg",
            pieFoto: "Auditorio de la Asociación General de la Iglesia Adventista del Séptimo Día",
            texto: "Hoy, la Iglesia Adventista del Séptimo Día es una confraternidad global de más de 22 millones de miembros bautizados en más de 212 países y territorios. Con una de las redes educativas cristianas más grandes del planeta, cientos de hospitales y sanatorios, la agencia humanitaria ADRA y cadenas mundiales como Hope Channel, la iglesia proclama con urgencia y amor la bendita esperanza del regreso de Jesucristo.",
            textoCorto: "Una familia global de más de 22 millones de creyentes llevando salud, educación y esperanza.",
            versiculo: "He aquí, vengo pronto; y mi galardón conmigo, para recompensar a cada uno según sea su obra.",
            referencia: "Apocalipsis 22:12",
            significado: "Movimiento contemporáneo de restauración y proclamación final"
        }
    ];

    let juegoItems = [];
    let juegoSeleccionado = null;

    function renderizarHistoriaEditorial() {
        const container = document.getElementById("historiaTimelineContenido");
        if (!container) return;

        container.innerHTML = HISTORIA_EVENTOS.map((evt, idx) => {
            const reversedClass = idx % 2 === 1 ? " is-reversed" : "";
            const mediaClass = evt.mediaTipo ? ` is-${evt.mediaTipo}` : "";
            return `
                <article class="hist-chapter-card${reversedClass}" style="--chapter-color: ${evt.color};">
                    <div class="hist-chapter-media${mediaClass}">
                        <img src="${evt.imagen}" alt="${evt.titulo}" loading="lazy" />
                        <div class="hist-chapter-media-scrim"></div>
                        <span class="hist-chapter-num">${evt.id}</span>
                        <div class="hist-chapter-caption">
                            <i class="fas fa-camera-retro"></i>
                            <span>${evt.pieFoto}</span>
                        </div>
                    </div>
                    <div class="hist-chapter-content">
                        <span class="hist-year-pill">
                            <i class="fas ${evt.icon}"></i> ${evt.fecha}
                        </span>
                        <h3 class="hist-chapter-title">${evt.titulo}</h3>
                        <p class="hist-chapter-text">${evt.texto}</p>
                        <div class="hist-quote-box">
                            <p class="hist-quote-text">"${evt.versiculo}"</p>
                            <span class="hist-quote-ref">— ${evt.referencia}</span>
                        </div>
                        <div class="hist-chapter-footer">
                            <span class="hist-significance-pill">
                                <i class="fas fa-award"></i> ${evt.significado}
                            </span>
                        </div>
                    </div>
                </article>
            `;
        }).join("");
    }

    function inicializarJuego(forzarMezcla = false) {
        if (juegoItems.length === 0 || forzarMezcla) {
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
        const container = document.getElementById("juegoSlotsContainer");
        if (!container) return;

        container.innerHTML = juegoItems
            .map((evt, idx) => {
                const isSelected = juegoSeleccionado === idx ? " selected-for-swap" : "";
                const isFirst = idx === 0;
                const isLast = idx === juegoItems.length - 1;
                return `
                    <div class="juego-card-item${isSelected}" id="juegoItem-${idx}" draggable="true" data-index="${idx}" data-csp-click="seleccionarItemJuego(${idx})">
                        <div class="juego-card-num-badge">${idx + 1}</div>
                        <div class="juego-card-thumb">
                            <img src="${evt.imagen}" alt="${evt.titulo}" loading="lazy" />
                        </div>
                        <div class="juego-card-content">
                            <div class="juego-card-title"><i class="fas ${evt.icon}" style="color: ${evt.color};"></i> ${evt.titulo}</div>
                            <div class="juego-card-clue">${evt.textoCorto}</div>
                        </div>
                        <div class="juego-card-actions">
                            <button type="button" class="juego-move-btn" data-csp-click="moverItemJuego(${idx}, -1)" ${isFirst ? "disabled" : ""} title="Subir posición">
                                <i class="fas fa-chevron-up"></i>
                            </button>
                            <button type="button" class="juego-move-btn" data-csp-click="moverItemJuego(${idx}, 1)" ${isLast ? "disabled" : ""} title="Bajar posición">
                                <i class="fas fa-chevron-down"></i>
                            </button>
                        </div>
                    </div>
                `;
            })
            .join("");

        configurarDragAndDropJuego();
        const victoryBanner = document.getElementById("juegoVictoryCard");
        if (victoryBanner) victoryBanner.style.display = "none";
    }

    function configurarDragAndDropJuego() {
        const items = document.querySelectorAll(".juego-card-item");
        items.forEach((item) => {
            item.addEventListener("dragstart", (e) => {
                const idx = parseInt(item.getAttribute("data-index"), 10);
                e.dataTransfer.setData("text/plain", idx);
                item.style.opacity = "0.5";
            });
            item.addEventListener("dragend", () => {
                item.style.opacity = "1";
            });
            item.addEventListener("dragover", (e) => {
                e.preventDefault();
            });
            item.addEventListener("drop", (e) => {
                e.preventDefault();
                const fromIdx = parseInt(e.dataTransfer.getData("text/plain"), 10);
                const toIdx = parseInt(item.getAttribute("data-index"), 10);
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

    window.cambiarVistaHistoria = function (vistaId) {
        const tabs = document.querySelectorAll(".historia-tab-btn");
        tabs.forEach((tab) => {
            if (tab.getAttribute("data-vista") === vistaId) tab.classList.add("active");
            else tab.classList.remove("active");
        });
        const panels = document.querySelectorAll(".historia-view-panel");
        panels.forEach((panel) => {
            if (panel.id === `historia-view-${vistaId}`) panel.classList.add("active");
            else panel.classList.remove("active");
        });
    };

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

    window.comprobarJuegoHistoria = function () {
        let aciertos = 0;
        const total = HISTORIA_EVENTOS.length;
        juegoItems.forEach((item, idx) => {
            const cardEl = document.getElementById(`juegoItem-${idx}`);
            if (cardEl) {
                cardEl.classList.remove("correct", "incorrect");
                if (item.id === idx + 1) {
                    cardEl.classList.add("correct");
                    aciertos++;
                } else {
                    cardEl.classList.add("incorrect");
                }
            }
        });
        const scorePill = document.getElementById("juegoScorePill");
        if (scorePill) scorePill.textContent = `${aciertos} de ${total} correctos`;
        const victoryCard = document.getElementById("juegoVictoryCard");
        if (victoryCard) {
            if (aciertos === total) {
                victoryCard.style.display = "block";
                victoryCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
            } else {
                victoryCard.style.display = "none";
            }
        }
    };

    window.reiniciarJuegoHistoria = function () {
        inicializarJuego(true);
        const scorePill = document.getElementById("juegoScorePill");
        if (scorePill) scorePill.textContent = `0 de ${HISTORIA_EVENTOS.length} correctos`;
    };

    window.darPistaJuegoHistoria = function () {
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
            alert(
                `💡 Pista para la Posición #${primerErrorIdx + 1}: Debería ser el evento de "${itemCorrecto.fecha}" (${itemCorrecto.titulo}). Actualmente tienes puesto "${currentItem.titulo}".`
            );
        } else {
            alert("🎉 ¡Todos los eventos ya están ordenados en perfecta secuencia cronológica!");
        }
    };

    window.initHistoriaModule = function () {
        renderizarHistoriaEditorial();
        inicializarJuego();
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", window.initHistoriaModule);
    } else {
        window.initHistoriaModule();
    }

    window.addEventListener("pageChanged", (e) => {
        if (e.detail && (e.detail.pageId === "historia" || e.detail.page === "historia")) {
            window.initHistoriaModule();
        }
    });
})();
