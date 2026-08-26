/**
 * ==========================================================================
 * MÓDULO DE ESTRUCTURA ORGANIZACIONAL INTERACTIVA - IASD BELÉN
 * ==========================================================================
 * Implementa 4 modalidades interactivas:
 *  1. Diagrama de Árbol Jerárquico Expandible (Organigrama)
 *  2. Mapa Mundial de Divisiones con Tooltips Interactivos y Pines
 *  3. Tarjetas de Estadísticas con Count-up Animado
 *  4. Quiz Interactivo de la Estructura Organizacional
 */

(function () {
    'use strict';

    // ==========================================
    // DATOS: JERARQUÍA ORGANIZACIONAL (ÁRBOL)
    // ==========================================
    const JERARQUIA_DATOS = [
        {
            id: 'asociacion-general',
            nivel: 'Nivel 1 — Sede Mundial',
            titulo: 'Asociación General (General Conference)',
            icono: 'fa-globe-americas',
            color: '#c99d3b',
            bgColor: 'rgba(201, 157, 59, 0.12)',
            descripcion: 'Es la máxima autoridad administrativa y representativa de la Iglesia Adventista del Séptimo Día en todo el mundo. Fundada formalmente en 1863 en Battle Creek, Michigan, hoy coordina la misión global, vela por la pureza doctrinal, autoriza el Manual de la Iglesia y organiza los congresos mundiales cada 5 años.',
            detalles: [
                { label: '📍 Sede Principal', value: 'Silver Spring, Maryland, Estados Unidos' },
                { label: '🗳️ Gobernanza', value: 'Democrática representativa elegida en Congreso Quinquenal' },
                { label: '🌐 Alcance', value: '13 Divisiones mundiales, 1 Unión adscrita y 212+ países' },
                { label: '📖 Enfoque Central', value: 'Unidad doctrinal, misión global y mensaje de los tres ángeles' }
            ]
        },
        {
            id: 'uniones',
            nivel: 'Nivel 2 — Macro-Regiones',
            titulo: 'Uniones (Uniones Asociaciones / Misiones)',
            icono: 'fa-earth-americas',
            color: '#1a6b5a',
            bgColor: 'rgba(26, 107, 90, 0.12)',
            descripcion: 'Oficinas directivas que coordinan y respaldan el trabajo de varias Asociaciones y Misiones dentro de una nación o un conjunto de provincias/estados. Son el nexo entre el campo local y la División mundial, supervisando también universidades, editoriales y hospitales de su territorio.',
            detalles: [
                { label: '📍 Cobertura', value: 'Un país completo o varios estados/provincias' },
                { label: '🏢 Composición', value: 'Agrupa múltiples Asociaciones y Misiones locales' },
                { label: '🎓 Instituciones', value: 'Supervisa universidades adventistas y colegios superiores' },
                { label: '🤝 Rol Clave', value: 'Distribución estratégica de fondos y personal ministerial' }
            ]
        },
        {
            id: 'asociaciones-misiones',
            nivel: 'Nivel 3 — Campos Locales',
            titulo: 'Asociaciones y Misiones Locales',
            icono: 'fa-building-columns',
            color: '#2980b9',
            bgColor: 'rgba(41, 128, 185, 0.12)',
            descripcion: 'Sede administrativa responsable directa de un grupo delimitado de iglesias y distritos pastorales en una región geográfica. Gestiona credenciales pastorales, coordina campañas de evangelismo, financia y capacita a líderes de departamentos (Jóvenes, Escuela Sabática, Mayordomía, etc.).',
            detalles: [
                { label: '📍 Territorio', value: 'Ciudades, departamentos o regiones delimitadas' },
                { label: '⛪ Estructura', value: 'Distritos pastorales (grupos de 2 a 10 iglesias)' },
                { label: '👥 Función', value: 'Asignación de pastores, planes evangelísticos y escuelas' },
                { label: '💡 Diferencia', value: 'Asociación (autosuficiente) / Misión (en desarrollo)' }
            ]
        },
        {
            id: 'iglesia-local',
            nivel: 'Nivel 4 — Comunidad Base',
            titulo: 'Iglesia Local y Grupos Organizados',
            icono: 'fa-church',
            color: '#0b2b4f',
            bgColor: 'rgba(11, 43, 79, 0.12)',
            descripcion: 'Es el corazón vivo y la base fundamental de la Iglesia Adventista. Cada congregación local está formada por miembros bautizados que adoran juntos cada sábado, sirven a la comunidad, ofrecen discipulado, estudian la Biblia y proclaman el evangelio a su vecindario.',
            detalles: [
                { label: '📍 Ubicación', value: 'Templos y congregaciones en barrios, pueblos y ciudades' },
                { label: '👥 Liderazgo', value: 'Junta directiva local (Ancianos, Diáconos, Directores)' },
                { label: '🔥 Ministerios', value: 'Clubes (Aventureros/Conquistadores), Grupos Pequeños' },
                { label: '🎯 Misión', value: 'Comunión, testimonio diario y discipulado personal' }
            ]
        }
    ];

    // ==========================================
    // DATOS: DIVISIONES MUNDIALES (MAPA)
    // ==========================================
    const DIVISIONES_DATOS = [
        {
            id: 'dia',
            nombre: 'División Interamericana (DIA)',
            sede: 'Miami, Florida, EE. UU.',
            miembros: '3.700.000+',
            paises: 'México, Centroamérica, El Caribe, Colombia, Venezuela, Guyana',
            color: '#c99d3b',
            destacada: true,
            coordX: 30, // % sobre mapa
            coordY: 53,
            icono: '⭐'
        },
        {
            id: 'dsa',
            nombre: 'División Sudamericana (DSA)',
            sede: 'Brasilia, Brasil',
            miembros: '2.600.000+',
            paises: 'Argentina, Bolivia, Brasil, Chile, Ecuador, Paraguay, Perú, Uruguay',
            color: '#1a2a5a',
            coordX: 36,
            coordY: 72
        },
        {
            id: 'nad',
            nombre: 'División Norteamericana (NAD)',
            sede: 'Columbia, Maryland, EE. UU.',
            miembros: '1.250.000+',
            paises: 'Estados Unidos, Canadá, Bermudas, Guam, Micronesia',
            color: '#4a8db7',
            coordX: 25,
            coordY: 34
        },
        {
            id: 'eud',
            nombre: 'División Intereuropea (EUD)',
            sede: 'Berna, Suiza',
            miembros: '180.000+',
            paises: 'España, Portugal, Francia, Italia, Alemania, Suiza, Austria, Rumania, Bulgaria',
            color: '#d4772a',
            coordX: 52,
            coordY: 36
        },
        {
            id: 'ted',
            nombre: 'División Transeuropea (TED)',
            sede: 'St. Albans, Inglaterra',
            miembros: '88.000+',
            paises: 'Reino Unido, Países Bajos, Escandinavia, Polonia, Balcanes, Grecia',
            color: '#5a9a6a',
            coordX: 49,
            coordY: 28
        },
        {
            id: 'esd',
            nombre: 'División Euroasiática (ESD)',
            sede: 'Moscú, Rusia',
            miembros: '105.000+',
            paises: 'Rusia, Bielorrusia, Armenia, Georgia, Kazajistán, Uzbekistán',
            color: '#1a2a4a',
            coordX: 68,
            coordY: 26
        },
        {
            id: 'wcf',
            nombre: 'División Africana Centro-Occidental (WAD)',
            sede: 'Abiyán, Costa de Marfil',
            miembros: '980.000+',
            paises: 'Nigeria, Ghana, Costa de Marfil, Camerún, Senegal, Liberia',
            color: '#2d5016',
            coordX: 48,
            coordY: 57
        },
        {
            id: 'ecd',
            nombre: 'División Africana Centro-Oriental (ECD)',
            sede: 'Nairobi, Kenia',
            miembros: '4.800.000+',
            paises: 'Kenia, Uganda, Tanzania, Etiopía, Ruanda, R.D. del Congo',
            color: '#1a6b5a',
            coordX: 60,
            coordY: 60
        },
        {
            id: 'sid',
            nombre: 'División Africana del Sur y Océano Índico (SID)',
            sede: 'Pretoria, Sudáfrica',
            miembros: '4.400.000+',
            paises: 'Sudáfrica, Zimbabue, Zambia, Mozambique, Madagascar, Angola',
            color: '#1a4a3a',
            coordX: 56,
            coordY: 76
        },
        {
            id: 'nsd',
            nombre: 'División Norasiática del Pacífico (NSD)',
            sede: 'Goyang, Corea del Sur',
            miembros: '750.000+',
            paises: 'Corea del Sur, Japón, Taiwán, Mongolia, Bangladés',
            color: '#f4c430',
            coordX: 84,
            coordY: 40
        },
        {
            id: 'ssd',
            nombre: 'División Sudasiática del Pacífico (SSD)',
            sede: 'Silang, Filipinas',
            miembros: '1.700.000+',
            paises: 'Filipinas, Indonesia, Malasia, Tailandia, Vietnam, Singapur',
            color: '#c0392b',
            coordX: 83,
            coordY: 59
        },
        {
            id: 'sud',
            nombre: 'División Sudasiática (SUD)',
            sede: 'Hosur, Tamil Nadu, India',
            miembros: '1.600.000+',
            paises: 'India, Nepal, Bután, Maldivas',
            color: '#6a4a2a',
            coordX: 72,
            coordY: 50
        },
        {
            id: 'spd',
            nombre: 'División del Pacífico Sur (SPD)',
            sede: 'Wahroonga, Sídney, Australia',
            miembros: '620.000+',
            paises: 'Australia, Nueva Zelanda, Papúa Nueva Guinea, Fiyi, Samoa, Tonga',
            color: '#6a1b4d',
            coordX: 88,
            coordY: 76
        },
        {
            id: 'mena',
            nombre: 'Unión del Medio Oriente y Norte de África (MENA)',
            sede: 'Beirut, Líbano',
            miembros: '5.800+',
            paises: 'Egipto, Turquía, Líbano, Jordania, Golfo Pérsico, Magreb',
            color: '#7aaa4a',
            coordX: 60,
            coordY: 44
        }
    ];

    // ==========================================
    // DATOS: ESTADÍSTICAS GLOBALES
    // ==========================================
    const ESTADISTICAS_DATOS = [
        {
            id: 'miembros',
            numero: 22785195,
            sufijo: '',
            label: 'Miembros Bautizados',
            desc: 'Creyentes activos en congregaciones alrededor del globo.',
            icono: 'fa-users'
        },
        {
            id: 'paises',
            numero: 212,
            sufijo: '',
            label: 'Países con Presencia',
            desc: 'De los 235 países y áreas reconocidas por la ONU.',
            icono: 'fa-globe-americas'
        },
        {
            id: 'idiomas',
            numero: 535,
            sufijo: '',
            label: 'Idiomas en Publicaciones',
            desc: 'Lenguas y dialectos usados en la predicación y medios.',
            icono: 'fa-language'
        },
        {
            id: 'educacion',
            numero: 9419,
            sufijo: '',
            label: 'Instituciones Educativas',
            desc: 'Escuelas, colegios, academias y universidades cristianas.',
            icono: 'fa-school'
        },
        {
            id: 'estudiantes',
            numero: 2023844,
            sufijo: '',
            label: 'Estudiantes Matriculados',
            desc: 'Jóvenes formándose bajo una educación integral y con valores.',
            icono: 'fa-user-graduate'
        },
        {
            id: 'salud',
            numero: 229,
            sufijo: '',
            label: 'Hospitales y Clínicas',
            desc: 'Centros médicos sirviendo bajo el ministerio de curación.',
            icono: 'fa-hospital'
        },
        {
            id: 'editoriales',
            numero: 57,
            sufijo: '',
            label: 'Casas Editoras',
            desc: 'Imprentas que producen literatura misionera y devocionales.',
            icono: 'fa-book-open'
        },
        {
            id: 'alimentos',
            numero: 22,
            sufijo: '',
            label: 'Fábricas de Alimentos',
            desc: 'Promoción de nutrición saludable y estilo de vida pro-salud.',
            icono: 'fa-seedling'
        },
        {
            id: 'adra',
            numero: 118,
            sufijo: '',
            label: 'Países con ADRA Activa',
            desc: 'Agencia Adventista de Desarrollo y Recursos Asistenciales.',
            icono: 'fa-hand-holding-heart'
        }
    ];

    // ==========================================
    // DATOS: QUIZ INTERACTIVO
    // ==========================================
    const QUIZ_DATOS = [
        {
            pregunta: '¿Cuál es la sede mundial principal de la Asociación General de los Adventistas del Séptimo Día?',
            opciones: [
                'Battle Creek, Michigan',
                'Silver Spring, Maryland, Estados Unidos',
                'Brasilia, Brasil',
                'Berna, Suiza'
            ],
            correcta: 1,
            explicacion: '¡Correcto! La sede mundial de la Asociación General se encuentra en Silver Spring, Maryland (EE. UU.), desde donde se coordina la misión en todo el planeta.'
        },
        {
            pregunta: '¿Cuántas Divisiones mundiales administrativas componen la Asociación General?',
            opciones: [
                '7 Divisiones',
                '10 Divisiones',
                '13 Divisiones',
                '24 Divisiones'
            ],
            correcta: 2,
            explicacion: '¡Exacto! La iglesia cuenta con 13 Divisiones mundiales, además de una Unión con estatus similar (MENA) y territorios adscritos.'
        },
        {
            pregunta: '¿A qué nivel de la estructura organizacional pertenece un distrito pastoral con varias congregaciones?',
            opciones: [
                'Unión',
                'Asociación o Misión Local',
                'Asociación General',
                'División'
            ],
            correcta: 1,
            explicacion: '¡Muy bien! Las Asociaciones y Misiones locales son las que coordinan y agrupan a los distritos pastorales e iglesias de su territorio geográfico.'
        },
        {
            pregunta: '¿Cuál de las siguientes Divisiones cubre México, Centroamérica, El Caribe, Colombia y Venezuela?',
            opciones: [
                'División Sudamericana (DSA)',
                'División Norteamericana (NAD)',
                'División Interamericana (DIA)',
                'División Intereuropea (EUD)'
            ],
            correcta: 2,
            explicacion: '¡Excelente! La División Interamericana (DIA) es una de las más dinámicas y pobladas del mundo adventista con más de 3.7 millones de miembros.'
        },
        {
            pregunta: '¿Con qué frecuencia se reúne el Congreso Mundial de la Asociación General para elegir autoridades y votar cambios al Manual?',
            opciones: [
                'Cada 2 años',
                'Cada 3 años',
                'Cada 5 años (Quinquenal)',
                'Cada 10 años'
            ],
            correcta: 2,
            explicacion: '¡Así es! El Congreso de la Asociación General se celebra cada 5 años (quinquenio) con delegados electos de todo el mundo.'
        },
        {
            pregunta: '¿Aproximadamente cuántos millones de miembros bautizados tiene la Iglesia Adventista a nivel mundial?',
            opciones: [
                'Más de 5 millones',
                'Más de 22 millones',
                'Cerca de 50 millones',
                'Alrededor de 12 millones'
            ],
            correcta: 1,
            explicacion: '¡Correcto! La Iglesia Adventista cuenta con más de 22.7 millones de miembros bautizados en más de 212 países.'
        }
    ];

    // ==========================================
    // ESTADO DEL MÓDULO
    // ==========================================
    const state = {
        vistaActual: 'arbol',
        divisionSeleccionada: 'dia',
        quizIndex: 0,
        quizScore: 0,
        quizRespondido: false,
        statsAnimadas: false
    };

    // ==========================================
    // RENDERIZADO: ÁRBOL JERÁRQUICO
    // ==========================================
    function renderizarArbol() {
        const contenedor = document.getElementById('arbolJerarquiaContenido');
        if (!contenedor) return;

        let html = '<div class="arbol-container">';

        JERARQUIA_DATOS.forEach((item, index) => {
            const isFirst = index === 0;
            const expandedClass = isFirst ? 'expandido' : '';

            html += `
                <div class="arbol-node-card ${expandedClass}" id="arbol-node-${item.id}" style="--node-accent: ${item.color}; --node-bg: ${item.bgColor};">
                    <div class="arbol-node-header" data-csp-click="toggleNivelEstructura('${item.id}')" role="button" aria-expanded="${isFirst}">
                        <div class="arbol-header-left">
                            <div class="arbol-icon-badge">
                                <i class="fas ${item.icono}"></i>
                            </div>
                            <div class="arbol-header-title-block">
                                <span class="arbol-level-pill">${item.nivel}</span>
                                <h4 class="arbol-header-title">${item.titulo}</h4>
                            </div>
                        </div>
                        <div class="arbol-header-toggle-btn" aria-label="Expandir o contraer">
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </div>
                    <div class="arbol-node-body">
                        <p class="arbol-desc-text">${item.descripcion}</p>
                        <div class="arbol-details-grid">
                            ${item.detalles.map(d => `
                                <div class="arbol-detail-item">
                                    <div class="arbol-detail-label">${d.label}</div>
                                    <div class="arbol-detail-value">${d.value}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            if (index < JERARQUIA_DATOS.length - 1) {
                html += '<div class="arbol-connector-line"></div>';
            }
        });

        html += '</div>';
        contenedor.innerHTML = html;
    }

    // ==========================================
    // RENDERIZADO: MAPA DE DIVISIONES
    // ==========================================
    function renderizarMapa() {
        const pinsContainer = document.getElementById('mapaPinesLayer');
        const previewContainer = document.getElementById('mapaDivisionPreview');
        const gridContainer = document.getElementById('divisionesGridContainer');

        if (pinsContainer) {
            pinsContainer.innerHTML = DIVISIONES_DATOS.map((div, idx) => `
                <div class="mapa-pin-marker ${div.id === state.divisionSeleccionada ? 'active' : ''}" 
                     id="mapa-pin-${div.id}" 
                     style="top: ${div.coordY}%; left: ${div.coordX}%; --pin-color: ${div.color};"
                     data-csp-click="seleccionarDivisionMapa('${div.id}')"
                     title="${div.nombre}">
                    <span class="mapa-pin-pulse"></span>
                    ${div.icono || (idx + 1)}
                </div>
            `).join('');
        }

        if (gridContainer) {
            gridContainer.innerHTML = DIVISIONES_DATOS.map(div => `
                <div class="division-grid-card ${div.id === state.divisionSeleccionada ? 'active' : ''}"
                     id="div-card-${div.id}"
                     style="--div-color: ${div.color};"
                     data-csp-click="seleccionarDivisionMapa('${div.id}')">
                    <div class="division-card-name">${div.destacada ? '⭐ ' : ''}${div.nombre}</div>
                    <div class="division-card-sede">
                        <i class="fas fa-location-dot" style="color: ${div.color};"></i>
                        <span>${div.sede}</span>
                    </div>
                </div>
            `).join('');
        }

        actualizarPreviewDivision(state.divisionSeleccionada);
    }

    function actualizarPreviewDivision(divisionId) {
        const division = DIVISIONES_DATOS.find(d => d.id === divisionId) || DIVISIONES_DATOS[0];
        const previewContainer = document.getElementById('mapaDivisionPreview');
        if (!previewContainer) return;

        state.divisionSeleccionada = division.id;

        // Actualizar estados visuales de pins y cards
        document.querySelectorAll('.mapa-pin-marker').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.division-grid-card').forEach(c => c.classList.remove('active'));

        const activePin = document.getElementById(`mapa-pin-${division.id}`);
        if (activePin) activePin.classList.add('active');

        const activeCard = document.getElementById(`div-card-${division.id}`);
        if (activeCard) activeCard.classList.add('active');

        previewContainer.innerHTML = `
            <div class="mapa-info-card-preview" style="--active-division-color: ${division.color};">
                <div class="mapa-info-header">
                    <h4 class="mapa-info-title">${division.destacada ? '⭐ ' : ''}${division.nombre}</h4>
                    <span class="mapa-info-sede">
                        <i class="fas fa-building" style="color: ${division.color};"></i>
                        Sede: ${division.sede}
                    </span>
                </div>
                <div class="mapa-info-stats-grid">
                    <div class="mapa-info-stat-box">
                        <strong><i class="fas fa-users" style="color: var(--golden);"></i> Membresía Aproximada:</strong>
                        <span>${division.miembros} adventistas</span>
                    </div>
                    <div class="mapa-info-stat-box">
                        <strong><i class="fas fa-flag" style="color: var(--golden);"></i> Países y Territorios:</strong>
                        <span>${division.paises}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // ==========================================
    // RENDERIZADO: ESTADÍSTICAS (COUNT-UP)
    // ==========================================
    function renderizarEstadisticas() {
        const container = document.getElementById('estadisticasGridContainer');
        if (!container) return;

        container.innerHTML = ESTADISTICAS_DATOS.map(stat => `
            <div class="stat-counter-card" id="stat-card-${stat.id}">
                <div class="stat-icon-wrapper">
                    <i class="fas ${stat.icono}"></i>
                </div>
                <div class="stat-counter-number" data-target="${stat.numero}" id="counter-${stat.id}">0</div>
                <div class="stat-counter-label">${stat.label}</div>
                <p class="stat-counter-desc">${stat.desc}</p>
            </div>
        `).join('');
    }

    function animarContadores() {
        const counters = document.querySelectorAll('.stat-counter-number');
        if (!counters.length) return;

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || '0', 10);
            if (!target) return;

            const duration = 1800; // ms
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Easing cuadrático out
                const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                const currentVal = Math.floor(easeOutProgress * target);

                counter.textContent = currentVal.toLocaleString('es-ES');

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target.toLocaleString('es-ES');
                }
            }

            requestAnimationFrame(updateCount);
        });

        state.statsAnimadas = true;
    }

    // ==========================================
    // RENDERIZADO: QUIZ INTERACTIVO
    // ==========================================
    function renderizarQuiz() {
        const contenedor = document.getElementById('quizContainer');
        if (!contenedor) return;

        if (state.quizIndex >= QUIZ_DATOS.length) {
            // Pantalla final de resultados
            const porcentaje = Math.round((state.quizScore / QUIZ_DATOS.length) * 100);
            let mensaje = '¡Buen esfuerzo! Puedes repasar la sección y volver a intentarlo para afianzar tus conocimientos.';
            if (porcentaje >= 80) {
                mensaje = '¡Excelente! Tienes un conocimiento impecable sobre la organización mundial de la Iglesia Adventista.';
            } else if (porcentaje >= 50) {
                mensaje = '¡Muy buen trabajo! Conoces bastante bien la estructura adventista.';
            }

            contenedor.innerHTML = `
                <div class="quiz-main-card">
                    <div class="quiz-results-card active">
                        <div class="quiz-trophy-icon">🏆</div>
                        <h3 class="quiz-results-title">¡Quiz Completado!</h3>
                        <div class="quiz-results-score-text">
                            Obtuviste ${state.quizScore} de ${QUIZ_DATOS.length} respuestas correctas (${porcentaje}%)
                        </div>
                        <p class="quiz-results-msg">${mensaje}</p>
                        <button type="button" class="quiz-next-btn" data-csp-click="reiniciarQuizEstructura()" style="margin: 0 auto;">
                            <i class="fas fa-rotate-right"></i> Intentar de Nuevo
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        const q = QUIZ_DATOS[state.quizIndex];
        const letras = ['A', 'B', 'C', 'D'];
        const progresoPorc = Math.round(((state.quizIndex + 1) / QUIZ_DATOS.length) * 100);

        contenedor.innerHTML = `
            <div class="quiz-main-card">
                <div class="quiz-top-bar">
                    <span class="quiz-progress-badge">
                        <i class="fas fa-circle-question"></i> Pregunta ${state.quizIndex + 1} de ${QUIZ_DATOS.length}
                    </span>
                    <span class="quiz-score-badge">
                        <i class="fas fa-trophy" style="color: var(--golden);"></i> Puntos: ${state.quizScore}
                    </span>
                </div>

                <div class="quiz-progress-track">
                    <div class="quiz-progress-fill" style="width: ${progresoPorc}%;"></div>
                </div>

                <h3 class="quiz-question-title">${q.pregunta}</h3>

                <div class="quiz-options-container" id="quizOptionsContainer">
                    ${q.opciones.map((op, idx) => `
                        <button type="button" 
                                class="quiz-option-btn" 
                                id="quiz-opt-${idx}" 
                                data-csp-click="seleccionarOpcionQuiz(${idx})">
                            <span>${op}</span>
                            <span class="quiz-option-letter">${letras[idx]}</span>
                        </button>
                    `).join('')}
                </div>

                <div class="quiz-feedback-box" id="quizFeedbackBox">
                    <div class="quiz-feedback-title" id="quizFeedbackTitle"></div>
                    <p class="quiz-feedback-text" id="quizFeedbackText"></p>
                </div>

                <div class="quiz-actions-bar" id="quizActionsBar" style="display: none;">
                    <button type="button" class="quiz-next-btn" data-csp-click="siguientePreguntaQuiz()">
                        <span>${state.quizIndex + 1 === QUIZ_DATOS.length ? 'Ver Resultados' : 'Siguiente Pregunta'}</span>
                        <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    // ==========================================
    // CONTROLADORES Y ACCIONES DE INTERFAZ
    // ==========================================
    window.cambiarVistaEstructura = function (vistaId) {
        state.vistaActual = vistaId;

        // Actualizar botones de tab
        document.querySelectorAll('.estructura-tab-btn').forEach(btn => {
            if (btn.getAttribute('data-vista') === vistaId) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Actualizar paneles
        document.querySelectorAll('.estructura-view-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        const panelActivo = document.getElementById(`estructura-view-${vistaId}`);
        if (panelActivo) {
            panelActivo.classList.add('active');
        }

        // Si se activa la vista de estadísticas, disparar count-up
        if (vistaId === 'stats') {
            setTimeout(animarContadores, 100);
        }
    };

    window.toggleNivelEstructura = function (id) {
        const card = document.getElementById(`arbol-node-${id}`);
        if (!card) return;
        card.classList.toggle('expandido');
    };

    window.expandirTodoArbol = function () {
        document.querySelectorAll('.arbol-node-card').forEach(c => c.classList.add('expandido'));
    };

    window.contraerTodoArbol = function () {
        document.querySelectorAll('.arbol-node-card').forEach(c => c.classList.remove('expandido'));
    };

    window.seleccionarDivisionMapa = function (divisionId) {
        actualizarPreviewDivision(divisionId);
    };

    window.seleccionarOpcionQuiz = function (opcionIdx) {
        if (state.quizRespondido) return;
        state.quizRespondido = true;

        const q = QUIZ_DATOS[state.quizIndex];
        const esCorrecta = (opcionIdx === q.correcta);

        if (esCorrecta) {
            state.quizScore++;
        }

        // Marcar botones
        document.querySelectorAll('.quiz-option-btn').forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === q.correcta) {
                btn.classList.add('correcta');
            } else if (idx === opcionIdx && !esCorrecta) {
                btn.classList.add('incorrecta');
            }
        });

        // Mostrar Feedback
        const feedbackBox = document.getElementById('quizFeedbackBox');
        const feedbackTitle = document.getElementById('quizFeedbackTitle');
        const feedbackText = document.getElementById('quizFeedbackText');
        const actionsBar = document.getElementById('quizActionsBar');

        if (feedbackBox && feedbackTitle && feedbackText) {
            feedbackBox.className = `quiz-feedback-box ${esCorrecta ? 'correct' : 'incorrect'}`;
            feedbackTitle.innerHTML = esCorrecta
                ? '<i class="fas fa-circle-check"></i> ¡Excelente, respuesta correcta!'
                : '<i class="fas fa-circle-xmark"></i> Respuesta incorrecta';
            feedbackText.textContent = q.explicacion;
        }

        if (actionsBar) {
            actionsBar.style.display = 'flex';
        }
    };

    window.siguientePreguntaQuiz = function () {
        state.quizIndex++;
        state.quizRespondido = false;
        renderizarQuiz();
    };

    window.reiniciarQuizEstructura = function () {
        state.quizIndex = 0;
        state.quizScore = 0;
        state.quizRespondido = false;
        renderizarQuiz();
    };

    // ==========================================
    // INICIALIZACIÓN DEL MÓDULO
    // ==========================================
    function inicializarEstructura() {
        renderizarArbol();
        renderizarMapa();
        renderizarEstadisticas();
        renderizarQuiz();

        // IntersectionObserver para estadísticas si están en viewport
        const statsEl = document.getElementById('estadisticasGridContainer');
        if (statsEl && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !state.statsAnimadas && state.vistaActual === 'stats') {
                        animarContadores();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            observer.observe(statsEl);
        }
    }

    // Ejecutar al cargar DOM y cuando el router navega a #estructura
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarEstructura);
    } else {
        inicializarEstructura();
    }

    // Escuchar cambios de página si la app usa eventos personalizados o hash
    window.addEventListener('pageChanged', function (e) {
        if (e.detail && (e.detail.page === 'estructura' || e.detail.pageId === 'estructura')) {
            inicializarEstructura();
            if (state.vistaActual === 'stats') {
                setTimeout(animarContadores, 150);
            }
        }
    });

    window.inicializarEstructura = inicializarEstructura;

})();
