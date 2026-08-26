/* ========================================
   GESTOR DE LAS 6 DOCTRINAS FUNDAMENTALES
   IASD Belén · Iglesia Adventista
   Módulo 100% interactivo: Flip Cards 3D, Zoom,
   Parallax Header, Quiz Bíblico, Juego de Emparejar
   y Progreso de Estudio con LocalStorage.
   ======================================== */

const DoctrinasManager = {
    // Datos de las 6 doctrinas fundamentales
    doctrinasData: [
        {
            id: 1,
            tema: 'dios',
            nombre: 'La Naturaleza de Dios: El Dios Trino',
            tituloCorto: 'El Dios Trino',
            subtitulo: 'Padre, Hijo y Espíritu Santo: Tres personas coeternas en perfecto amor y unidad de propósito.',
            icono: 'fa-sun',
            badgeTema: 'Divinidad & Creación',
            colorGrad: 'linear-gradient(135deg, #0d233a 0%, #1565c0 100%)',
            colorGlow: 'rgba(21, 101, 192, 0.35)',
            colorBadge: '#1565c0',
            resumen: 'Creemos en un solo Dios eterno, revelado en tres personas coeternas e iguales: Padre, Hijo y Espíritu Santo. El Padre es la fuente de todo amor y deidad. El Hijo (Jesucristo) es el Verbo encarnado, nuestro Salvador y Señor. El Espíritu Santo es el agente activo de Dios en la tierra, quien convence, regenera y santifica al creyente.',
            versiculoLema: 'Mateo 28:19',
            versiculos: [
                { ref: 'Mateo 28:19', texto: 'Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.' },
                { ref: '2 Corintios 13:14', texto: 'La gracia del Señor Jesucristo, el amor de Dios, y la comunión del Espíritu Santo sean con todos vosotros. Amén.' },
                { ref: 'Juan 10:30', texto: 'Yo y el Padre uno somos.' }
            ]
        },
        {
            id: 2,
            tema: 'salvacion',
            nombre: 'La Salvación por Gracia',
            tituloCorto: 'Salvación por Gracia',
            subtitulo: 'Don inmerecido de Dios recibido únicamente por la fe en los méritos de Jesucristo, no por obras.',
            icono: 'fa-heart',
            badgeTema: 'Redención & Fe',
            colorGrad: 'linear-gradient(135deg, #c99d3b 0%, #8a6416 100%)',
            colorGlow: 'rgba(201, 157, 59, 0.35)',
            colorBadge: '#c99d3b',
            resumen: 'La salvación es un don gratuito de Dios ofrecido a toda la humanidad mediante Jesucristo. No se gana por méritos propios, sino que se recibe por fe. El pecador arrepentido es justificado por su gracia y transformado por el Espíritu Santo para una vida de obediencia motivada por el amor.',
            versiculoLema: 'Efesios 2:8-10',
            versiculos: [
                { ref: 'Efesios 2:8-10', texto: 'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe.' },
                { ref: 'Romanos 3:23-24', texto: 'Por cuanto todos pecaron, y están destituidos de la gloria de Dios, siendo justificados gratuitamente por su gracia, mediante la redención que es en Cristo Jesús.' },
                { ref: 'Romanos 5:1', texto: 'Justificados, pues, por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo.' }
            ]
        },
        {
            id: 3,
            tema: 'iglesia',
            nombre: 'La Iglesia: El Cuerpo de Cristo',
            tituloCorto: 'El Cuerpo de Cristo',
            subtitulo: 'Comunidad espiritual viva de creyentes llamada a adorar, nutrir y proclamar el evangelio al mundo.',
            icono: 'fa-church',
            badgeTema: 'Comunidad & Misión',
            colorGrad: 'linear-gradient(135deg, #5c2d91 0%, #311352 100%)',
            colorGlow: 'rgba(92, 45, 145, 0.35)',
            colorBadge: '#7b1fa2',
            resumen: 'La iglesia es la comunidad de creyentes que confiesan a Jesús como Señor. Es un organismo espiritual vivo cuyo único líder supremo es Cristo. Existe para proclamar el evangelio eterno, adorar a Dios, servir a la comunidad y preparar a las personas para el pronto regreso de Jesús.',
            versiculoLema: '1 Pedro 2:9',
            versiculos: [
                { ref: '1 Pedro 2:9', texto: 'Mas vosotros sois linaje escogido, real sacerdocio, nación santa, pueblo adquirido por Dios, para que anunciéis las virtudes de aquel que os llamó de las tinieblas a su luz admirable.' },
                { ref: 'Mateo 16:18', texto: 'Y yo también te digo, que tú eres Pedro, y sobre esta roca edificaré mi iglesia; y las puertas del Hades no prevalecerán contra ella.' },
                { ref: 'Efesios 1:22-23', texto: 'Y sometió todas las cosas bajo sus pies, y lo dio por cabeza sobre todas las cosas a la iglesia, la cual es su cuerpo, la plenitud de Aquel que todo lo llena en todo.' }
            ]
        },
        {
            id: 4,
            tema: 'sabado',
            nombre: 'El Sábado: Día de Descanso y Adoración',
            tituloCorto: 'El Sábado Bíblico',
            subtitulo: 'Séptimo día establecido en la creación como memorial eterno de descanso, comunión y lealtad a Dios.',
            icono: 'fa-calendar-check',
            badgeTema: 'Reposo & Adoración',
            colorGrad: 'linear-gradient(135deg, #1b5e20 0%, #0d3810 100%)',
            colorGlow: 'rgba(27, 94, 32, 0.35)',
            colorBadge: '#2e7d32',
            resumen: 'El sábado, desde la puesta de sol del viernes hasta la puesta de sol del sábado, fue instituido por el Creador como día de reposo y deleite espiritual. Es un memorial perpetuo del poder creador y redentor de Dios, un símbolo de bendición y santificación para toda la humanidad.',
            versiculoLema: 'Éxodo 20:8-11',
            versiculos: [
                { ref: 'Éxodo 20:8-11', texto: 'Acuérdate del día de reposo para santificarlo. Seis días trabajarás, y harás toda tu obra; mas el séptimo día es reposo para Jehová tu Dios...' },
                { ref: 'Génesis 2:2-3', texto: 'Y acabó Dios en el día séptimo la obra que hizo; y reposó el día séptimo de toda la obra que hizo. Y bendijo Dios al día séptimo, y lo santificó.' },
                { ref: 'Marcos 2:27-28', texto: 'El día de reposo fue hecho por causa del hombre, y no el hombre por causa del día de reposo; por tanto, el Hijo del Hombre es Señor aun del día de reposo.' }
            ]
        },
        {
            id: 5,
            tema: 'fin',
            nombre: 'El Tiempo del Fin: Segunda Venida y Juicio',
            tituloCorto: 'Segunda Venida & Juicio',
            subtitulo: 'La bendita esperanza: El regreso visible y glorioso de Jesucristo, la purificación del santuario y la Tierra Nueva.',
            icono: 'fa-hourglass-end',
            badgeTema: 'Profecía & Esperanza',
            colorGrad: 'linear-gradient(135deg, #880e4f 0%, #b71c1c 100%)',
            colorGlow: 'rgba(183, 28, 28, 0.35)',
            colorBadge: '#c62828',
            resumen: 'La historia humana culminará con la venida visible, personal y gloriosa de Cristo en las nubes. Los justos resucitarán y los vivos fieles serán transformados. Tras el juicio y la erradicación final del pecado, Dios establecerá una Tierra Nueva eterna donde reinará la paz y la justicia.',
            versiculoLema: 'Hechos 1:9-11',
            versiculos: [
                { ref: 'Hechos 1:9-11', texto: 'Este mismo Jesús, que ha sido tomado de vosotros al cielo, así vendrá como le habéis visto ir al cielo.' },
                { ref: 'Daniel 8:14', texto: 'Hasta dos mil trescientas tardes y mañanas; luego el santuario será purificado.' },
                { ref: 'Apocalipsis 21:1-4', texto: 'Vi un cielo nuevo y una tierra nueva... y Dios enjugará toda lágrima de los ojos de ellos; y ya no habrá muerte, ni llanto, ni dolor.' }
            ]
        },
        {
            id: 6,
            tema: 'vida',
            nombre: 'La Vida Cristiana: Principios Bíblicos',
            tituloCorto: 'La Vida Cristiana',
            subtitulo: 'Vivir según la voluntad de Dios: Salud integral, pureza moral, mayordomía fiel y amor al prójimo.',
            icono: 'fa-seedling',
            badgeTema: 'Conducta & Mayordomía',
            colorGrad: 'linear-gradient(135deg, #0277bd 0%, #004c8c 100%)',
            colorGlow: 'rgba(2, 119, 189, 0.35)',
            colorBadge: '#0284c7',
            resumen: 'Llamados a reflejar el carácter de Jesús en todo aspecto de la vida diaria: cuidando el cuerpo como templo del Espíritu Santo mediante hábitos saludables, practicando una mayordomía fiel de talentos y recursos, y manifestando el fruto del Espíritu Santo.',
            versiculoLema: '1 Corintios 10:31',
            versiculos: [
                { ref: '1 Corintios 10:31', texto: 'Si, pues, coméis o bebéis, o hacéis otra cosa, hacedlo todo para la gloria de Dios.' },
                { ref: 'Romanos 12:1', texto: 'Que presentéis vuestros cuerpos en sacrificio vivo, santo, agradable a Dios, que es vuestro culto racional.' },
                { ref: 'Gálatas 5:22-23', texto: 'Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza.' }
            ]
        }
    ],

    // Banco de preguntas para el Quiz de las 6 doctrinas
    quizQuestions: [
        {
            pregunta: '¿Cuál es la enseñanza bíblica fundamental sobre la naturaleza de Dios?',
            doctrinaId: 1,
            opciones: [
                'Un solo Dios revelado en tres personas coeternas: Padre, Hijo y Espíritu Santo',
                'Un solo Dios que cambia de modo según la época del Antiguo o Nuevo Testamento',
                'Tres dioses diferentes con distintos rangos de autoridad',
                'Solo el Padre es divino y el Hijo fue creado por Él'
            ],
            correcta: 0,
            explicacion: 'La Biblia revela a un solo Dios Trino en tres personas coeternas e iguales en naturaleza y propósito (Mateo 28:19; 2 Corintios 13:14).'
        },
        {
            pregunta: 'Según Efesios 2:8-9, ¿cómo se obtiene la salvación?',
            doctrinaId: 2,
            opciones: [
                'Por las buenas obras y la acumulación de méritos personales',
                'Por gracia mediante la fe en Cristo, siendo un don inmerecido de Dios',
                'Exclusivamente por pertenecer a una organización religiosa',
                'Por cumplir perfectamente la ley sin necesidad de mediador'
            ],
            correcta: 1,
            explicacion: 'La salvación es un regalo de gracia que se recibe por la fe en Jesús, y no por obras para que nadie se gloríe (Efesios 2:8-10).'
        },
        {
            pregunta: '¿Quién es la única cabeza y fundamento supremo de la Iglesia?',
            doctrinaId: 3,
            opciones: [
                'El pastor o el concilio de ancianos de la iglesia local',
                'El apóstol Pedro como primer obispo de Roma',
                'Jesucristo, quien dio su vida y la sustenta como su cuerpo vivo',
                'Una junta directiva humana con autoridad eclesiástica absoluta'
            ],
            correcta: 2,
            explicacion: 'Cristo es la cabeza suprema sobre todas las cosas a la iglesia, la cual es su cuerpo espiritual (Efesios 1:22-23; Colosenses 1:18).'
        },
        {
            pregunta: '¿Cuándo fue instituido el sábado y cuál es su vigencia según la Biblia?',
            doctrinaId: 4,
            opciones: [
                'Fue instituido en el Sinaí únicamente para el pueblo de Israel en el Antiguo Testamento',
                'Fue instituido en la Creación por Dios y bendecido como memorial eterno para toda la humanidad',
                'Fue creado por los apóstoles después de la resurrección de Jesús',
                'Es una festividad ceremonial que fue abolida en la cruz'
            ],
            correcta: 1,
            explicacion: 'Dios bendijo y santificó el séptimo día en la Creación como memorial del descanso y pacto perpetuo (Génesis 2:2-3; Éxodo 20:8-11).'
        },
        {
            pregunta: '¿De qué manera regresará Jesucristo en su Segunda Venida?',
            doctrinaId: 5,
            opciones: [
                'De forma invisible y secreta solo perceptible para unos pocos',
                'De manera puramente metafórica y espiritual en el corazón de los creyentes',
                'De manera literal, personal, visible y gloriosa en las nubes del cielo',
                'Reencarnando en un líder religioso terrenal en los últimos días'
            ],
            correcta: 2,
            explicacion: 'Hechos 1:11 y Apocalipsis 1:7 enseñan que Jesús volverá de forma personal, visible y todo ojo le verá en las nubes del cielo.'
        },
        {
            pregunta: '¿Por qué el cristiano cuida su salud y presenta su cuerpo en servicio a Dios?',
            doctrinaId: 6,
            opciones: [
                'Para ganar la vida eterna a través de estrictas dietas',
                'Porque nuestro cuerpo es templo del Espíritu Santo y busca glorificar a Dios en todo',
                'Por imposición cultural de tradiciones humanas sin base bíblica',
                'Porque lo físico no tiene ninguna relación con la vida espiritual'
            ],
            correcta: 1,
            explicacion: '1 Corintios 6:19-20 y 10:31 declaran que nuestro cuerpo es templo del Espíritu Santo y debemos glorificar a Dios en todo lo que hacemos.'
        }
    ],

    // Estado del Quiz
    quizActive: false,
    quizCurrentIndex: 0,
    quizScore: 0,
    quizSelectedOption: null,
    quizAnswered: false,

    // Estado del Juego de Emparejar (Matching Game)
    matchGamePairs: [
        { id: 1, nombre: 'La Naturaleza de Dios', versiculo: 'Mateo 28:19', texto: 'Bautizándolos en el nombre del Padre, del Hijo y del Espíritu Santo' },
        { id: 2, nombre: 'La Salvación por Gracia', versiculo: 'Efesios 2:8-10', texto: 'Por gracia sois salvos por medio de la fe; es don de Dios' },
        { id: 3, nombre: 'La Iglesia (Cuerpo de Cristo)', versiculo: '1 Pedro 2:9', texto: 'Linaje escogido, real sacerdocio, nación santa' },
        { id: 4, nombre: 'El Sábado Bíblico', versiculo: 'Éxodo 20:8-11', texto: 'Acuérdate del día de reposo para santificarlo' },
        { id: 5, nombre: 'Segunda Venida y Juicio', versiculo: 'Hechos 1:9-11', texto: 'Este mismo Jesús vendrá como le habéis visto ir al cielo' },
        { id: 6, nombre: 'La Vida Cristiana', versiculo: '1 Corintios 10:31', texto: 'Si coméis o bebéis, hacedlo todo para la gloria de Dios' }
    ],
    selectedDoctrinaMatch: null,
    selectedVerseMatch: null,
    matchedIds: [],
    matchAttempts: 0,
    parallaxBound: false,

    // ----------------------------------------------------
    // INICIALIZACIÓN
    // ----------------------------------------------------
    init() {
        this.renderAll();
        this.initParallax();
        this.actualizarProgresoEstudio();
        this.cargarMejorPuntajeQuiz();
        this.initMatchingGame();
    },

    // ----------------------------------------------------
    // RENDERIZADO PRINCIPAL
    // ----------------------------------------------------
    renderAll() {
        const container = document.getElementById('doctrinasCardsGrid');
        if (!container) return;

        const leidas = this.getDoctrinasLeidas();

        container.innerHTML = this.doctrinasData.map((d) => {
            const isRead = leidas.includes(d.id);
            const versesHtml = d.versiculos.map(v => `
                <li class="doctrina-verse-item">
                    <span class="doctrina-verse-ref"><i class="fas fa-book-bible"></i> <strong>${v.ref}</strong>:</span>
                    <span class="doctrina-verse-txt">"${v.texto}"</span>
                </li>
            `).join('');

            return `
                <div class="doctrina-flip-card theme-${d.tema}" id="doctrina-card-${d.id}" data-id="${d.id}" style="--doctrina-glow: ${d.colorGlow};">
                    <div class="doctrina-flip-inner">
                        <!-- CARA FRONTAL -->
                        <div class="doctrina-card-face doctrina-card-front" style="border-top-color: ${d.colorBadge};">
                            <div class="doctrina-front-top">
                                <span class="doctrina-badge-num">Doctrina #${d.id}</span>
                                <span class="doctrina-badge-theme" style="background:${d.colorBadge}; color:#fff;">
                                    <i class="fas ${d.icono}"></i> ${d.badgeTema}
                                </span>
                                <button type="button" 
                                    class="btn-doctrina-check ${isRead ? 'checked' : ''}" 
                                    data-csp-click="DoctrinasManager.toggleLeida(${d.id}, event)"
                                    title="${isRead ? 'Marcar como no estudiada' : 'Marcar como estudiada'}"
                                    aria-label="Marcar doctrina como leída">
                                    <i class="fas ${isRead ? 'fa-check-circle' : 'fa-circle'}"></i>
                                </button>
                            </div>

                            <div class="doctrina-front-icon-box" style="background:${d.colorGrad};">
                                <i class="fas ${d.icono}"></i>
                            </div>

                            <h3 class="doctrina-front-title">${d.nombre}</h3>
                            <p class="doctrina-front-sub">${d.subtitulo}</p>

                            <div class="doctrina-front-verse-pill">
                                <i class="fas fa-quote-left"></i>
                                <span>Texto clave: <strong>${d.versiculoLema}</strong></span>
                            </div>

                            <div class="doctrina-front-actions">
                                <button type="button" class="btn-flip-trigger" data-csp-click="DoctrinasManager.flipDoctrina(${d.id})">
                                    <span>Explorar Fundamentos</span>
                                    <i class="fas fa-rotate"></i>
                                </button>
                            </div>
                        </div>

                        <!-- CARA TRASERA -->
                        <div class="doctrina-card-face doctrina-card-back">
                            <div class="doctrina-back-header" style="background:${d.colorGrad};">
                                <div class="doctrina-back-meta">
                                    <span class="doctrina-back-pill">Pilar #${d.id}</span>
                                    <span class="doctrina-back-topic"><i class="fas ${d.icono}"></i> ${d.badgeTema}</span>
                                </div>
                                <h4 class="doctrina-back-title">${d.tituloCorto}</h4>
                            </div>

                            <div class="doctrina-back-body">
                                <div class="doctrina-back-summary-box">
                                    <h5 class="doctrina-summary-title"><i class="fas fa-feather-pointed"></i> Explicación Teológica:</h5>
                                    <p class="doctrina-back-text">${d.resumen}</p>
                                </div>

                                <div class="doctrina-back-verses-box">
                                    <h5 class="doctrina-verses-title"><i class="fas fa-scroll"></i> Textos Bíblicos Fundamentales:</h5>
                                    <ul class="doctrina-verses-list">
                                        ${versesHtml}
                                    </ul>
                                </div>
                            </div>

                            <div class="doctrina-back-footer">
                                <button type="button" 
                                    class="btn-doctrina-check-back ${isRead ? 'checked' : ''}" 
                                    data-csp-click="DoctrinasManager.toggleLeida(${d.id}, event)">
                                    <i class="fas ${isRead ? 'fa-check-circle' : 'fa-circle-check'}"></i>
                                    <span>${isRead ? '✓ Estudiada' : 'Marcar como Estudiada'}</span>
                                </button>
                                <button type="button" class="btn-flip-back" data-csp-click="DoctrinasManager.flipDoctrina(${d.id})">
                                    <i class="fas fa-arrow-left"></i> Volver al frente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    // ----------------------------------------------------
    // 1. FLIP 3D Y ZOOM DE TARJETAS
    // ----------------------------------------------------
    flipDoctrina(id) {
        const card = document.getElementById(`doctrina-card-${id}`);
        if (card) {
            card.classList.toggle('flipped');
        }
    },

    // ----------------------------------------------------
    // 2. EFECTO PARALLAX EN CABECERA
    // ----------------------------------------------------
    initParallax() {
        if (this.parallaxBound) return;
        this.parallaxBound = true;

        const header = document.getElementById('doctrinasHeroHeader');
        if (!header) return;

        let ticking = false;

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const page = document.getElementById('doctrinas');
                    if (page && page.classList.contains('active') && window.innerWidth > 768) {
                        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
                        const headerRect = header.getBoundingClientRect();
                        
                        // Solo animar si la cabecera está visible
                        if (headerRect.bottom > 0 && headerRect.top < window.innerHeight) {
                            const offset = scrollY * 0.25;
                            const bgShape = header.querySelector('.doctrinas-parallax-bg');
                            const floatingBadge = header.querySelector('.doctrinas-floating-badge');
                            const heroTitle = header.querySelector('.doctrinas-hero-title');

                            if (bgShape) {
                                bgShape.style.transform = `translate3d(0, ${offset * 0.6}px, 0)`;
                            }
                            if (floatingBadge) {
                                floatingBadge.style.transform = `translate3d(0, ${-offset * 0.2}px, 0)`;
                            }
                            if (heroTitle) {
                                heroTitle.style.transform = `translate3d(0, ${-offset * 0.15}px, 0)`;
                            }
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
    },

    // ----------------------------------------------------
    // 3. PROGRESO DE ESTUDIO (LOCALSTORAGE)
    // ----------------------------------------------------
    getDoctrinasLeidas() {
        try {
            const raw = localStorage.getItem('doctrinas_estudiadas_ids');
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error('Error al leer doctrinas_estudiadas_ids:', e);
            return [];
        }
    },

    setDoctrinasLeidas(ids) {
        try {
            localStorage.setItem('doctrinas_estudiadas_ids', JSON.stringify(ids));
        } catch (e) {
            console.error('Error al guardar doctrinas_estudiadas_ids:', e);
        }
    },

    toggleLeida(id, event) {
        if (event) {
            event.stopPropagation();
        }

        const idNum = parseInt(id, 10);
        let leidas = this.getDoctrinasLeidas();

        if (leidas.includes(idNum)) {
            leidas = leidas.filter(item => item !== idNum);
        } else {
            leidas.push(idNum);
        }

        this.setDoctrinasLeidas(leidas);
        this.actualizarProgresoEstudio();
        this.actualizarBotonesCheckTarjeta(idNum, leidas.includes(idNum));
    },

    marcarTodasComoLeidas() {
        const todosLosIds = this.doctrinasData.map(d => d.id);
        this.setDoctrinasLeidas(todosLosIds);
        this.actualizarProgresoEstudio();
        this.renderAll();
    },

    reiniciarProgreso() {
        this.setDoctrinasLeidas([]);
        this.actualizarProgresoEstudio();
        this.renderAll();
    },

    actualizarBotonesCheckTarjeta(id, isRead) {
        const card = document.getElementById(`doctrina-card-${id}`);
        if (!card) return;

        const frontBtn = card.querySelector('.btn-doctrina-check');
        const backBtn = card.querySelector('.btn-doctrina-check-back');

        if (frontBtn) {
            frontBtn.classList.toggle('checked', isRead);
            frontBtn.innerHTML = `<i class="fas ${isRead ? 'fa-check-circle' : 'fa-circle'}"></i>`;
            frontBtn.title = isRead ? 'Marcar como no estudiada' : 'Marcar como estudiada';
        }

        if (backBtn) {
            backBtn.classList.toggle('checked', isRead);
            backBtn.innerHTML = `<i class="fas ${isRead ? 'fa-check-circle' : 'fa-circle-check'}"></i> <span>${isRead ? '✓ Estudiada' : 'Marcar como Estudiada'}</span>`;
        }
    },

    actualizarProgresoEstudio() {
        const leidas = this.getDoctrinasLeidas();
        const total = this.doctrinasData.length || 6;
        const count = leidas.length;
        const percent = Math.min(100, Math.round((count / total) * 100));

        const barFill = document.getElementById('doctrinasProgresoBarFill');
        const percentBadge = document.getElementById('doctrinasProgresoPercentBadge');
        const counterText = document.getElementById('doctrinasProgresoCounterText');
        const heroCounter = document.getElementById('doctrinasHeroProgressBadge');

        if (barFill) barFill.style.width = `${percent}%`;
        if (percentBadge) percentBadge.textContent = `${percent}%`;
        if (counterText) {
            counterText.innerHTML = `Has completado <strong>${count} de ${total}</strong> doctrinas`;
        }
        if (heroCounter) {
            heroCounter.innerHTML = `<i class="fas fa-graduation-cap"></i> Progreso: <strong>${count}/${total}</strong>`;
        }
    },

    // ----------------------------------------------------
    // 4. QUIZ DOCTRINAL "¿CUÁNTO SABES DE LAS 6 DOCTRINAS?"
    // ----------------------------------------------------
    abrirQuiz() {
        const section = document.getElementById('doctrinasQuizContainer');
        if (!section) return;

        section.style.display = 'block';
        this.iniciarQuiz();
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },

    cerrarQuiz() {
        const section = document.getElementById('doctrinasQuizContainer');
        if (section) {
            section.style.display = 'none';
        }
    },

    cargarMejorPuntajeQuiz() {
        try {
            const best = localStorage.getItem('doctrinasQuizRecord');
            const scoreText = document.getElementById('doctrinasQuizBestScore');
            if (scoreText) {
                scoreText.textContent = best !== null ? `${best} / 6` : '--';
            }
        } catch (e) {
            console.error('Error al leer doctrinasQuizRecord:', e);
        }
    },

    iniciarQuiz() {
        this.quizActive = true;
        this.quizCurrentIndex = 0;
        this.quizScore = 0;
        this.quizAnswered = false;
        this.quizSelectedOption = null;

        const body = document.getElementById('doctrinasQuizBody');
        const results = document.getElementById('doctrinasQuizResults');
        if (body) body.style.display = 'block';
        if (results) results.style.display = 'none';

        this.renderPreguntaQuiz();
    },

    renderPreguntaQuiz() {
        const q = this.quizQuestions[this.quizCurrentIndex];
        if (!q) {
            this.finalizarQuiz();
            return;
        }

        this.quizAnswered = false;
        this.quizSelectedOption = null;

        const totalQ = this.quizQuestions.length;
        const currentNum = this.quizCurrentIndex + 1;
        const percent = Math.round(((currentNum - 1) / totalQ) * 100);

        const progFill = document.getElementById('doctrinasQuizProgFill');
        const numLabel = document.getElementById('doctrinasQuizNumLabel');
        const scoreLabel = document.getElementById('doctrinasQuizScoreLive');
        const questionText = document.getElementById('doctrinasQuizQuestionText');
        const optionsGrid = document.getElementById('doctrinasQuizOptionsGrid');
        const feedbackBox = document.getElementById('doctrinasQuizFeedbackBox');
        const btnNext = document.getElementById('btnDoctrinasQuizNext');

        if (progFill) progFill.style.width = `${percent}%`;
        if (numLabel) numLabel.textContent = `Pregunta ${currentNum} de ${totalQ}`;
        if (scoreLabel) scoreLabel.textContent = `Puntaje: ${this.quizScore} pts`;
        if (questionText) questionText.textContent = q.pregunta;

        if (feedbackBox) {
            feedbackBox.style.display = 'none';
            feedbackBox.className = 'quiz-feedback-box';
            feedbackBox.innerHTML = '';
        }

        if (btnNext) {
            btnNext.style.display = 'none';
            btnNext.textContent = (currentNum === totalQ) ? 'Ver Calificación Final 🏆' : 'Siguiente Pregunta →';
        }

        if (optionsGrid) {
            const letras = ['A', 'B', 'C', 'D'];
            optionsGrid.innerHTML = q.opciones.map((op, idx) => `
                <button type="button" 
                    class="quiz-option-btn" 
                    id="quiz-opt-${idx}" 
                    data-csp-click="DoctrinasManager.seleccionarOpcionQuiz(${idx})">
                    <span class="quiz-opt-letter">${letras[idx]}</span>
                    <span class="quiz-opt-text">${op}</span>
                    <span class="quiz-opt-icon"><i class="fas fa-chevron-right"></i></span>
                </button>
            `).join('');
        }
    },

    seleccionarOpcionQuiz(indice) {
        if (this.quizAnswered) return;
        this.quizAnswered = true;
        this.quizSelectedOption = indice;

        const q = this.quizQuestions[this.quizCurrentIndex];
        const isCorrect = (indice === q.correcta);

        if (isCorrect) {
            this.quizScore += 1;
        }

        // Actualizar UI de opciones
        const optionsGrid = document.getElementById('doctrinasQuizOptionsGrid');
        if (optionsGrid) {
            const btns = optionsGrid.querySelectorAll('.quiz-option-btn');
            btns.forEach((btn, idx) => {
                btn.disabled = true;
                if (idx === q.correcta) {
                    btn.classList.add('correct');
                    const icon = btn.querySelector('.quiz-opt-icon');
                    if (icon) icon.innerHTML = '<i class="fas fa-check"></i>';
                } else if (idx === indice && !isCorrect) {
                    btn.classList.add('incorrect');
                    const icon = btn.querySelector('.quiz-opt-icon');
                    if (icon) icon.innerHTML = '<i class="fas fa-xmark"></i>';
                }
            });
        }

        // Feedback
        const feedbackBox = document.getElementById('doctrinasQuizFeedbackBox');
        if (feedbackBox) {
            feedbackBox.style.display = 'block';
            feedbackBox.className = `quiz-feedback-box ${isCorrect ? 'feedback-success' : 'feedback-error'}`;
            feedbackBox.innerHTML = `
                <div class="feedback-header">
                    <i class="fas ${isCorrect ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
                    <strong>${isCorrect ? '¡Excelente! Respuesta correcta.' : 'Respuesta incorrecta.'}</strong>
                </div>
                <p class="feedback-desc">${q.explicacion}</p>
            `;
        }

        const scoreLabel = document.getElementById('doctrinasQuizScoreLive');
        if (scoreLabel) scoreLabel.textContent = `Puntaje: ${this.quizScore} pts`;

        const btnNext = document.getElementById('btnDoctrinasQuizNext');
        if (btnNext) btnNext.style.display = 'inline-flex';
    },

    siguientePreguntaQuiz() {
        this.quizCurrentIndex += 1;
        if (this.quizCurrentIndex < this.quizQuestions.length) {
            this.renderPreguntaQuiz();
        } else {
            this.finalizarQuiz();
        }
    },

    finalizarQuiz() {
        const body = document.getElementById('doctrinasQuizBody');
        const results = document.getElementById('doctrinasQuizResults');
        const progFill = document.getElementById('doctrinasQuizProgFill');

        if (progFill) progFill.style.width = '100%';
        if (body) body.style.display = 'none';
        if (results) results.style.display = 'block';

        const total = this.quizQuestions.length;
        const score = this.quizScore;
        const percent = Math.round((score / total) * 100);

        const scoreVal = document.getElementById('doctrinasQuizFinalScoreVal');
        const badgeMsg = document.getElementById('doctrinasQuizFinalBadge');
        const descMsg = document.getElementById('doctrinasQuizFinalDesc');
        const recordAlert = document.getElementById('doctrinasQuizNewRecordAlert');

        if (scoreVal) scoreVal.textContent = `${score} / ${total}`;

        let titulo = '';
        let desc = '';
        let icono = 'fa-award';

        if (score === total) {
            titulo = '🏆 ¡Eres un Teólogo Adventista!';
            desc = '¡Impresionante! Has demostrado un dominio perfecto de las 6 doctrinas bíblicas fundamentales. ¡Continúa compartiendo tu fe!';
            icono = 'fa-crown';
        } else if (score >= 4) {
            titulo = '⭐ ¡Excelente Conocimiento Bíblico!';
            desc = 'Tienes una base sólida en los fundamentos teológicos de la fe. Sigue repasando las tarjetas 3D para alcanzar la perfección.';
            icono = 'fa-star';
        } else {
            titulo = '📖 ¡Buen intento! Sigue estudiando';
            desc = 'El estudio de la Palabra de Dios es un camino constante de crecimiento espiritual. Te invitamos a leer nuevamente las 6 doctrinas.';
            icono = 'fa-book-open-reader';
        }

        if (badgeMsg) {
            badgeMsg.innerHTML = `<i class="fas ${icono}"></i> ${titulo}`;
        }
        if (descMsg) {
            descMsg.textContent = desc;
        }

        // Guardar récord
        try {
            const savedBest = localStorage.getItem('doctrinasQuizRecord');
            const currentBest = savedBest !== null ? parseInt(savedBest, 10) : -1;

            if (score > currentBest) {
                localStorage.setItem('doctrinasQuizRecord', String(score));
                if (recordAlert) recordAlert.style.display = 'inline-flex';
                this.cargarMejorPuntajeQuiz();
            } else {
                if (recordAlert) recordAlert.style.display = 'none';
            }
        } catch (e) {
            console.error('Error al guardar récord del quiz:', e);
        }
    },

    // ----------------------------------------------------
    // 5. JUEGO DE EMPAREJAR / RELACIONAR DOCTRINAS Y VERSÍCULOS
    // ----------------------------------------------------
    initMatchingGame() {
        this.matchedIds = [];
        this.selectedDoctrinaMatch = null;
        this.selectedVerseMatch = null;
        this.matchAttempts = 0;

        this.renderMatchingGame();
    },

    renderMatchingGame() {
        const doctrinasCol = document.getElementById('matchGameDoctrinasCol');
        const versesCol = document.getElementById('matchGameVersesCol');
        const counter = document.getElementById('matchGameScoreCounter');
        const attemptsCounter = document.getElementById('matchGameAttemptsCounter');
        const successModal = document.getElementById('matchGameSuccessBox');

        if (counter) counter.textContent = `Aciertos: ${this.matchedIds.length} / 6`;
        if (attemptsCounter) attemptsCounter.textContent = `Intentos: ${this.matchAttempts}`;
        if (successModal) successModal.style.display = 'none';

        if (!doctrinasCol || !versesCol) return;

        // Render columna de Doctrinas (orden natural o barajado)
        doctrinasCol.innerHTML = this.matchGamePairs.map(p => {
            const isMatched = this.matchedIds.includes(p.id);
            const isSelected = this.selectedDoctrinaMatch === p.id;
            return `
                <button type="button" 
                    class="match-card-item match-doctrina-card ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}" 
                    id="match-doc-${p.id}"
                    data-id="${p.id}"
                    data-csp-click="DoctrinasManager.selectDoctrinaMatch(${p.id})"
                    ${isMatched ? 'disabled' : ''}>
                    <div class="match-card-badge">Pilar #${p.id}</div>
                    <div class="match-card-title">${p.nombre}</div>
                    <div class="match-card-status">
                        <i class="fas ${isMatched ? 'fa-circle-check' : (isSelected ? 'fa-arrow-right' : 'fa-circle')}"></i>
                    </div>
                </button>
            `;
        }).join('');

        // Barajar versículos para que no coincidan en la misma posición
        const versesShuffled = [...this.matchGamePairs].sort((a, b) => (a.id * 37 + 13) % 7 - (b.id * 37 + 13) % 7);

        versesCol.innerHTML = versesShuffled.map(p => {
            const isMatched = this.matchedIds.includes(p.id);
            const isSelected = this.selectedVerseMatch === p.id;
            return `
                <button type="button" 
                    class="match-card-item match-verse-card ${isMatched ? 'matched' : ''} ${isSelected ? 'selected' : ''}" 
                    id="match-verse-${p.id}"
                    data-id="${p.id}"
                    data-csp-click="DoctrinasManager.selectVerseMatch(${p.id})"
                    ${isMatched ? 'disabled' : ''}>
                    <div class="match-verse-ref"><i class="fas fa-bible"></i> ${p.versiculo}</div>
                    <div class="match-verse-text">"${p.texto}"</div>
                    <div class="match-card-status">
                        <i class="fas ${isMatched ? 'fa-circle-check' : (isSelected ? 'fa-arrow-left' : 'fa-circle')}"></i>
                    </div>
                </button>
            `;
        }).join('');
    },

    selectDoctrinaMatch(id) {
        if (this.matchedIds.includes(id)) return;
        this.selectedDoctrinaMatch = id;

        // Actualizar visualmente la selección en la columna de doctrinas
        document.querySelectorAll('.match-doctrina-card').forEach(btn => {
            const cardId = parseInt(btn.getAttribute('data-id'), 10);
            btn.classList.toggle('selected', cardId === id);
        });

        if (this.selectedVerseMatch !== null) {
            this.checkMatch();
        }
    },

    selectVerseMatch(id) {
        if (this.matchedIds.includes(id)) return;
        this.selectedVerseMatch = id;

        // Actualizar visualmente la selección en la columna de versículos
        document.querySelectorAll('.match-verse-card').forEach(btn => {
            const cardId = parseInt(btn.getAttribute('data-id'), 10);
            btn.classList.toggle('selected', cardId === id);
        });

        if (this.selectedDoctrinaMatch !== null) {
            this.checkMatch();
        }
    },

    checkMatch() {
        this.matchAttempts += 1;
        const attemptsCounter = document.getElementById('matchGameAttemptsCounter');
        if (attemptsCounter) attemptsCounter.textContent = `Intentos: ${this.matchAttempts}`;

        const docId = this.selectedDoctrinaMatch;
        const verseId = this.selectedVerseMatch;

        const docEl = document.getElementById(`match-doc-${docId}`);
        const verseEl = document.getElementById(`match-verse-${verseId}`);

        if (docId === verseId) {
            // ¡Acierto!
            this.matchedIds.push(docId);

            if (docEl) {
                docEl.classList.remove('selected');
                docEl.classList.add('matched', 'animate-success');
                docEl.disabled = true;
                const statusIcon = docEl.querySelector('.match-card-status i');
                if (statusIcon) statusIcon.className = 'fas fa-circle-check';
            }

            if (verseEl) {
                verseEl.classList.remove('selected');
                verseEl.classList.add('matched', 'animate-success');
                verseEl.disabled = true;
                const statusIcon = verseEl.querySelector('.match-card-status i');
                if (statusIcon) statusIcon.className = 'fas fa-circle-check';
            }

            this.selectedDoctrinaMatch = null;
            this.selectedVerseMatch = null;

            const counter = document.getElementById('matchGameScoreCounter');
            if (counter) counter.textContent = `Aciertos: ${this.matchedIds.length} / 6`;

            // Verificar si completó el juego
            if (this.matchedIds.length === 6) {
                setTimeout(() => {
                    const successModal = document.getElementById('matchGameSuccessBox');
                    const successAttempts = document.getElementById('matchGameSuccessAttempts');
                    if (successAttempts) successAttempts.textContent = `${this.matchAttempts} intentos`;
                    if (successModal) {
                        successModal.style.display = 'block';
                        successModal.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }, 400);
            }
        } else {
            // Error: efecto shake y resetear selección
            if (docEl) docEl.classList.add('animate-shake', 'match-error');
            if (verseEl) verseEl.classList.add('animate-shake', 'match-error');

            setTimeout(() => {
                if (docEl) {
                    docEl.classList.remove('animate-shake', 'match-error', 'selected');
                }
                if (verseEl) {
                    verseEl.classList.remove('animate-shake', 'match-error', 'selected');
                }
                this.selectedDoctrinaMatch = null;
                this.selectedVerseMatch = null;
            }, 600);
        }
    },

    reiniciarMatchingGame() {
        this.initMatchingGame();
    },

    scrollToMatching() {
        const section = document.getElementById('doctrinasMatchingSection');
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    desplazarAJuegoRelacionar() {
        this.scrollToMatching();
    }
};

// Exponer globalmente
window.DoctrinasManager = DoctrinasManager;

// Inicialización automática
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => DoctrinasManager.init());
} else {
    DoctrinasManager.init();
}

console.log('✅ DoctrinasManager cargado correctamente');
