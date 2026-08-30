/**
 * ==========================================================================
 * QUIÉNES SOMOS LOS ADVENTISTAS DEL 7° DÍA - LÓGICA E INTERACTIVIDAD
 * IASD Belén · Iglesia Adventista del Séptimo Día
 * ==========================================================================
 */

(function () {
    'use strict';

    /* ==========================================================================
       1. ESTRUCTURAS DE DATOS
       ========================================================================== */

    // a) 6 Creencias Distintivas (Flip Cards)
    const CREENCIAS_DISTINTIVAS = [
        {
            id: 'sabado',
            titulo: 'El Sábado Bíblico',
            icono: 'fa-calendar-check',
            pildora: 'Memorial de la Creación',
            resumen: 'Guardamos el séptimo día (sábado) de puesta de sol a puesta de sol como día sagrado de reposo, adoración y comunión con el Creador y la familia.',
            versiculo: 'Acuérdate del día de reposo para santificarlo. Seis días trabajarás, y harás toda tu obra; mas el séptimo día es reposo para Jehová tu Dios...',
            referencia: 'Éxodo 20:8-11; Génesis 2:1-3',
            explicacion: 'Instituido en la Creación y guardado por Jesús, el sábado es señal eterna de amor, lealtad y comunión con Dios.'
        },
        {
            id: 'santuario',
            titulo: 'El Santuario Celestial',
            icono: 'fa-church',
            pildora: 'Intercesión de Cristo',
            resumen: 'Creemos que en el cielo existe un santuario verdadero donde Jesucristo oficia como nuestro Sumo Sacerdote y Abogado mediando su sacrificio perfecto.',
            versiculo: 'Tenemos tal sumo sacerdote, el cual se sentó a la diestra del trono de la Majestad en los cielos, ministro del santuario, y de aquel verdadero tabernáculo...',
            referencia: 'Hebreos 8:1-2; Daniel 8:14',
            explicacion: 'Jesús intercede por nosotros en el cielo e inició en 1844 la fase final de su ministerio y juicio previo a su regreso.'
        },
        {
            id: 'muerte',
            titulo: 'Estado de los Muertos',
            icono: 'fa-bed',
            pildora: 'Esperanza y Resurrección',
            resumen: 'La muerte es un sueño inconsciente hasta la venida de Cristo. Los difuntos no tienen conciencia ni sufren en tormentos eternos.',
            versiculo: 'Porque los que viven saben que han de morir; pero los muertos nada saben, ni tienen más paga; porque su memoria es puesta en olvido.',
            referencia: 'Eclesiastés 9:5; 1 Tesalonicenses 4:16',
            explicacion: 'La muerte es un sueño inconsciente hasta la venida de Cristo, cuando otorgará la inmortalidad a los redimidos.'
        },
        {
            id: 'ley',
            titulo: 'La Ley de Dios y la Gracia',
            icono: 'fa-book-bible',
            pildora: 'Carácter Divino',
            resumen: 'Los Diez Mandamientos son eternos y vigentes. No guardamos la ley para ganarnos la salvación, sino como fruto gozoso del amor y la fe en Cristo.',
            versiculo: 'Aquí está la paciencia de los santos, los que guardan los mandamientos de Dios y la fe de Jesús.',
            referencia: 'Apocalipsis 14:12; Romanos 3:31',
            explicacion: 'Por gracia somos salvos y el Espíritu Santo graba la santa ley en nuestro corazón para vivir en amor y obediencia.'
        },
        {
            id: 'profecia',
            titulo: 'El Don de Profecía',
            icono: 'fa-scroll',
            pildora: 'Guía Espiritual',
            resumen: 'Uno de los dones del Espíritu Santo es la profecía, manifestado de forma especial en la vida y escritos de Elena G. de White para orientar a la iglesia.',
            versiculo: '...Adora a Dios; porque el testimonio de Jesús es el espíritu de la profecía.',
            referencia: 'Apocalipsis 19:10; Joel 2:28-29',
            explicacion: 'Manifestado en los escritos de Elena G. de White, orienta a la iglesia y exalta a la Biblia como única norma de fe.'
        },
        {
            id: 'salud',
            titulo: 'Salud y Mayordomía Integral',
            icono: 'fa-apple-whole',
            pildora: 'Templo del Espíritu',
            resumen: 'Nuestro cuerpo y mente son templos consagrados a Dios. Fomentamos una vida pura, alimentación saludable, ejercicio, descanso y abstinencia de drogas y alcohol.',
            versiculo: '¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros...? Glorificad, pues, a Dios en vuestro cuerpo.',
            referencia: '1 Corintios 6:19-20; 3 Juan 1:2',
            explicacion: 'Cuidar el cuerpo como templo del Espíritu Santo nos permite honrar a Dios y disfrutar una vida plena y saludable.'
        }
    ];

    // b) Preguntas del Quiz (5 preguntas interactivas)
    const QUIZ_PREGUNTAS = [
        {
            pregunta: '¿Por qué los adventistas guardamos el sábado como día de reposo?',
            opciones: [
                'Porque es una costumbre cultural de origen judío del siglo XIX.',
                'Porque Dios lo santificó en la creación y Jesús nos dio ejemplo de guardarlo.',
                'Porque es más cómodo congregarse ese día que en el resto de la semana.',
                'Porque fue una ley que comenzó exclusivamente con Moisés en el Sinaí.'
            ],
            correcta: 1,
            explicacion: '¡Exacto! El sábado fue instituido por Dios en la semana de la creación (Génesis 2:1-3), confirmado en el cuarto mandamiento (Éxodo 20:8-11) y guardado fielmente por Jesús.'
        },
        {
            pregunta: '¿Qué significa el nombre "Adventista del Séptimo Día"?',
            opciones: [
                'Que realizamos siete eventos misioneros durante el año.',
                'Que esperamos el pronto regreso de Jesús (Advenimiento) y guardamos el Sábado bíblico.',
                'Que fue fundada en el séptimo mes del año 1844.',
                'Que adoramos en siete santuarios principales alrededor del mundo.'
            ],
            correcta: 1,
            explicacion: '¡Correcto! "Adventista" proclama la esperanza de la segunda venida de Cristo y "Séptimo Día" honra el día de reposo instituido por el Creador.'
        },
        {
            pregunta: 'Según la doctrina bíblica adventista, ¿qué ocurre con el ser humano al morir?',
            opciones: [
                'El alma va directamente a reencarnar en otra criatura viva.',
                'Entra en un estado de sueño inconsciente hasta la resurrección con la venida de Cristo.',
                'Pasa a un purgatorio temporal para purificar sus faltas.',
                'Se convierte en un espíritu flotante que cuida a sus familiares vivos.'
            ],
            correcta: 1,
            explicacion: '¡Muy bien! La Biblia enseña que la muerte es un sueño inconsciente (Eclesiastés 9:5, Juan 11:11-14) y la recompensa eterna se recibe en la resurrección.'
        },
        {
            pregunta: '¿Cuál es la base de la mayordomía y el estilo de vida saludable en la fe adventista?',
            opciones: [
                'Creer que el cuerpo es templo del Espíritu Santo y debe ser cuidado con amor.',
                'Cumplir reglas dietéticas para ganar la salvación eterna.',
                'Una moda nutricional surgida en la década de 1950.',
                'Una obligación impuesta por las autoridades civiles.'
            ],
            correcta: 0,
            explicacion: '¡Excelente! En 1 Corintios 6:19-20 se nos recuerda que fuimos comprados por precio y que nuestro cuerpo es morada del Espíritu Santo.'
        },
        {
            pregunta: '¿Cuál es la única regla infalible de fe y doctrina para los adventistas?',
            opciones: [
                'Las tradiciones eclesiásticas de los primeros concilios.',
                'La Santa Biblia (las Sagradas Escrituras del Antiguo y Nuevo Testamento).',
                'Los libros de filosofía cristiana moderna.',
                'Los reglamentos administrativos de la Asociación General exclusivamente.'
            ],
            correcta: 1,
            explicacion: '¡Correcto! El principio de Sola Scriptura es absoluto: la Biblia es la Palabra inspirada de Dios y la máxima autoridad para la fe y la práctica.'
        }
    ];

    // c) Versículos para Emparejar (4 pares)
    const VERSICULOS_MATCH = [
        {
            id: 'v1',
            texto: '"Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito..."',
            referencia: 'Juan 3:16',
            tema: 'El Amor y Salvación'
        },
        {
            id: 'v2',
            texto: '"Acuérdate del día de reposo para santificarlo. Seis días trabajarás..."',
            referencia: 'Éxodo 20:8-11',
            tema: 'El Cuarto Mandamiento'
        },
        {
            id: 'v3',
            texto: '"Porque el Señor mismo con voz de mando... descenderá del cielo; y los muertos en Cristo resucitarán primero."',
            referencia: '1 Tesalonicenses 4:16',
            tema: 'La Segunda Venida'
        },
        {
            id: 'v4',
            texto: '"Aquí está la paciencia de los santos, los que guardan los mandamientos de Dios y la fe de Jesús."',
            referencia: 'Apocalipsis 14:12',
            tema: 'Pueblo Remanente'
        }
    ];

    // d) Preguntas Frecuentes (FAQ)
    const PREGUNTAS_FAQ = [
        {
            id: 'faq1',
            pregunta: '¿Por qué guardan el sábado en lugar del domingo?',
            icono: 'fa-calendar-day',
            respuesta: 'Porque el sábado es el séptimo día que Dios bendijo y santificó en la creación (Génesis 2:1-3) y el que ordenó en los Diez Mandamientos (Éxodo 20:8-11). Jesús, los apóstoles y la iglesia primitiva lo guardaron siempre. El cambio al domingo fue un proceso histórico posterior no respaldado por las Escrituras.'
        },
        {
            id: 'faq2',
            pregunta: '¿Qué creen sobre la muerte y el destino final del ser humano?',
            icono: 'fa-heart-pulse',
            respuesta: 'Creemos que la muerte es un sueño inconsciente (Eclesiastés 9:5, 1 Tesalonicenses 4:13). Los muertos descansan en sus tumbas hasta el día de la resurrección. Los justos resucitarán para vida eterna cuando Jesús vuelva, y Dios finalmente destruirá el mal por completo, trayendo un universo libre de dolor y sufrimiento.'
        },
        {
            id: 'faq3',
            pregunta: '¿Se puede ser adventista y comer de todo?',
            icono: 'fa-utensils',
            respuesta: 'Promovemos un estilo de vida saludable basado en las indicaciones bíblicas (Levítico 11) y el principio de que nuestro cuerpo es templo de Dios (1 Corintios 6:19). Fomentamos el vegetarianismo o dietas balanceadas y evitamos sustancias tóxicas como alcohol, tabaco y drogas. Es una elección voluntaria de salud y gratitud a Dios.'
        },
        {
            id: 'faq4',
            pregunta: '¿Creen en el fin del mundo con temor o con esperanza?',
            icono: 'fa-sun',
            respuesta: '¡Con inmensa esperanza y gozo! La Segunda Venida de Jesús no es una catástrofe aterradora para los creyentes, sino la "bienaventurada esperanza" (Tito 2:13): el momento glorioso en que terminará la injusticia, el dolor y la muerte, y comenzará la eternidad junto a Cristo.'
        },
        {
            id: 'faq5',
            pregunta: '¿Quién fue Elena G. de White y qué rol tiene en la iglesia?',
            icono: 'fa-feather',
            respuesta: 'Elena G. de White (1827-1915) fue una prolífica escritora y cofundadora de la iglesia en quien se manifestó el don bíblico de profecía. Sus obras abarcan educación, salud, espiritualidad y teología. Sus escritos nunca reemplazan la Biblia, sino que actúan como una "luz menor" que guía a los creyentes hacia la "luz mayor" de las Sagradas Escrituras.'
        },
        {
            id: 'faq6',
            pregunta: '¿Cómo es un servicio de culto adventista y puedo visitarlos?',
            icono: 'fa-hands-praying',
            respuesta: '¡Por supuesto, nuestras puertas están abiertas para todos! Nos reunimos los sábados por la mañana: iniciamos con la Escuela Sabática (estudio interactivo y participativo de la Biblia en grupos por edades) y continuamos con el Culto Divino de adoración con cantos, oraciones y un mensaje inspirador de la Palabra de Dios.'
        }
    ];

    // e) Timeline: Nuestra Identidad en 7 Pasos Clave
    const PASOS_IDENTIDAD = [
        {
            id: 'paso1',
            numero: 1,
            titulo: 'Sola Scriptura: La Biblia como Máxima Autoridad',
            icono: 'fa-book-open',
            descripcion: 'Aceptamos toda la Biblia (Antiguo y Nuevo Testamento) como la revelación infalible de la voluntad divina y la única norma de fe, doctrina y práctica cristiana.'
        },
        {
            id: 'paso2',
            numero: 2,
            titulo: 'La Gracia Redentora y Justificación por la Fe',
            icono: 'fa-cross',
            descripcion: 'La salvación es un regalo gratuito otorgado por la infinita gracia de Dios a través de la vida, muerte vicaria y resurrección de Jesucristo. Somos salvos por fe, no por obras.'
        },
        {
            id: 'paso3',
            numero: 3,
            titulo: 'El Sábado: Memorial del Amor Creador y Redentor',
            icono: 'fa-calendar-week',
            descripcion: 'El séptimo día es un santuario en el tiempo; un día de descanso sagrado semanal para desconectar del afán terrenal y conectarnos profundamente con Dios, la familia y la creación.'
        },
        {
            id: 'paso4',
            numero: 4,
            titulo: 'El Santuario Celestial y el Juicio Investigador',
            icono: 'fa-monument',
            descripcion: 'Jesús intercede por nosotros en el santuario celestial como nuestro Salvador y Juez amoroso, vindicando el carácter de justicia y misericordia de Dios ante el universo.'
        },
        {
            id: 'paso5',
            numero: 5,
            titulo: 'Salud Integral y el Cuerpo como Templo',
            icono: 'fa-heart-circle-check',
            descripcion: 'Honramos a Dios cuidando la mente, las emociones y el cuerpo mediante el ejercicio, el descanso, agua pura, aire limpio, nutrición sana y confianza en el Creador.'
        },
        {
            id: 'paso6',
            numero: 6,
            titulo: 'El Don Profético para la Iglesia Remanente',
            icono: 'fa-scroll',
            descripcion: 'Reconocemos el don de profecía como una señal bíblica del pueblo de Dios en el tiempo del fin, guiándonos a un estudio más diligente de la Biblia y al servicio misionero.'
        },
        {
            id: 'paso7',
            numero: 7,
            titulo: 'La Bendita Esperanza: La Segunda Venida de Jesús',
            icono: 'fa-cloud-sun',
            descripcion: 'Esperamos con anhelo el retorno visible, literal y glorioso de Jesucristo en las nubes de los cielos, acontecimiento que coronará el plan de salvación para siempre.'
        }
    ];

    // Frases del Typewriter
    const TYPEWRITER_PHRASES = [
        'Una comunidad cristiana global guiada por la Santa Biblia.',
        'Amamos a Dios, servimos al prójimo y proclamamos la esperanza.',
        'Guardamos el sábado como memorial sagrado de amor y reposo.',
        'Esperamos con fe el pronto y glorioso regreso de nuestro Salvador Jesús.'
    ];

    /* ==========================================================================
       2. ESTADO DEL MÓDULO
       ========================================================================== */
    const state = {
        perfil: localStorage.getItem('iasd_qs_perfil') || 'visitante',
        quizIndice: 0,
        quizPuntos: 0,
        quizRespondido: false,
        quizSeleccion: null,
        quizRecord: parseInt(localStorage.getItem('iasd_quiz_qs_record') || '0', 10),
        matchSelectedTexto: null,
        matchSelectedRef: null,
        matchAciertos: [],
        matchPairsShuffled: [],
        typewriterActive: false,
        typewriterPhraseIdx: 0,
        typewriterCharIdx: 0,
        typewriterIsDeleting: false,
        typewriterTimeout: null,
        particlesAnimationId: null
    };

    /* ==========================================================================
       3. TYPEWRITER EFFECT
       ========================================================================== */
    function initTypewriter() {
        const textElem = document.getElementById('qsTypewriterText');
        if (!textElem) return;

        if (state.typewriterTimeout) {
            clearTimeout(state.typewriterTimeout);
        }

        function typeLoop() {
            const currentPhrase = TYPEWRITER_PHRASES[state.typewriterPhraseIdx];
            
            if (state.typewriterIsDeleting) {
                state.typewriterCharIdx--;
            } else {
                state.typewriterCharIdx++;
            }

            const displayedText = currentPhrase.substring(0, state.typewriterCharIdx);
            textElem.textContent = displayedText;

            let typingSpeed = state.typewriterIsDeleting ? 28 : 55;

            if (!state.typewriterIsDeleting && state.typewriterCharIdx === currentPhrase.length) {
                typingSpeed = 2200; // Pausa al completar la frase
                state.typewriterIsDeleting = true;
            } else if (state.typewriterIsDeleting && state.typewriterCharIdx === 0) {
                state.typewriterIsDeleting = false;
                state.typewriterPhraseIdx = (state.typewriterPhraseIdx + 1) % TYPEWRITER_PHRASES.length;
                typingSpeed = 400; // Pausa antes de la siguiente frase
            }

            state.typewriterTimeout = setTimeout(typeLoop, typingSpeed);
        }

        typeLoop();
    }

    /* ==========================================================================
       4. PARTÍCULAS DORADAS EN CANVAS
       ========================================================================== */
    function initCanvasParticles() {
        const canvas = document.getElementById('qsCanvasParticles');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
        let height = (canvas.height = 360);

        const particles = [];
        const numParticles = Math.min(38, Math.floor(width / 25));

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 2.2 + 0.8,
                color: Math.random() > 0.3 ? '#c99d3b' : '#f1c40f',
                alpha: Math.random() * 0.6 + 0.2,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                pulsing: Math.random() * 0.02 + 0.005
            });
        }

        let mouse = { x: -1000, y: -1000 };

        function onMouseMove(e) {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        }

        function onTouchMove(e) {
            if (e.touches && e.touches[0]) {
                const rect = canvas.getBoundingClientRect();
                mouse.x = e.touches[0].clientX - rect.left;
                mouse.y = e.touches[0].clientY - rect.top;
            }
        }

        canvas.parentElement.removeEventListener('mousemove', onMouseMove);
        canvas.parentElement.addEventListener('mousemove', onMouseMove);
        canvas.parentElement.removeEventListener('touchmove', onTouchMove);
        canvas.parentElement.addEventListener('touchmove', onTouchMove);

        function resizeCanvas() {
            if (!canvas.parentElement) return;
            width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
            height = canvas.height = 360;
        }

        window.removeEventListener('resize', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);

        if (state.particlesAnimationId) {
            cancelAnimationFrame(state.particlesAnimationId);
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Atracción suave al cursor
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 100) {
                    p.x += dx * 0.02;
                    p.y += dy * 0.02;
                }

                p.alpha += Math.sin(Date.now() * p.pulsing) * 0.005;
                p.alpha = Math.max(0.15, Math.min(0.85, p.alpha));

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = p.alpha;
                ctx.fill();
            }

            ctx.globalAlpha = 1;
            state.particlesAnimationId = requestAnimationFrame(animateParticles);
        }

        animateParticles();
    }

    /* ==========================================================================
       5. SELECTOR DE PERFIL (Visitante vs Miembro)
       ========================================================================== */
    function setPerfilQS(tipo) {
        state.perfil = tipo;
        localStorage.setItem('iasd_qs_perfil', tipo);
        renderPerfilBox();
    }

    function renderPerfilBox() {
        const btnNuevo = document.getElementById('qsBtnNuevo');
        const btnMiembro = document.getElementById('qsBtnMiembro');
        const contentBox = document.getElementById('qsPerfilContentBox');

        if (!btnNuevo || !btnMiembro || !contentBox) return;

        if (state.perfil === 'miembro') {
            btnMiembro.classList.add('active');
            btnNuevo.classList.remove('active');
            contentBox.innerHTML = `
                <strong><i class="fas fa-cross" style="color: var(--golden);"></i> ¡Qué bendición tenerte en casa, hermano/a!</strong><br>
                Como miembro de esta gran familia, esta sección te servirá para repasar los pilares de nuestra fe, compartir con amigos no adventistas y profundizar en nuestro llamado profético como pueblo de esperanza. ¡Utiliza los juegos y el quiz para aprender y enseñar!
            `;
        } else {
            btnNuevo.classList.add('active');
            btnMiembro.classList.remove('active');
            contentBox.innerHTML = `
                <strong><i class="fas fa-door-open" style="color: var(--golden);"></i> ¡Bienvenido/a! Nos alegra mucho que estés aquí.</strong><br>
                En la Iglesia Adventista encontrarás una familia cristiana cálida y amigable. Nuestras reuniones son los sábados de mañana, abiertas para todas las personas sin distinción. Te invitamos a explorar nuestras creencias bíblicas, resolver el quiz y contactarnos cuando desees.
            `;
        }
    }

    /* ==========================================================================
       6. TARJETAS GIRATORIAS 3D (FLIP CARDS)
       ========================================================================== */
    function renderFlipCards() {
        const container = document.getElementById('qsFlipCardsGrid');
        if (!container) return;

        container.innerHTML = CREENCIAS_DISTINTIVAS.map(c => `
            <div class="qs-flip-card" id="card-${c.id}" data-csp-click="flipCartaCreencia('${c.id}')" role="button" tabindex="0" aria-label="Tarjeta ${c.titulo}">
                <div class="qs-flip-card-inner">
                    <!-- CARA FRONTAL -->
                    <div class="qs-flip-front">
                        <div>
                            <div class="qs-flip-front-header">
                                <div class="qs-flip-icon-box">
                                    <i class="fas ${c.icono}"></i>
                                </div>
                                <span class="qs-flip-pill">${c.pildora}</span>
                            </div>
                            <h4>${c.titulo}</h4>
                            <p>${c.resumen}</p>
                        </div>
                        <div class="qs-flip-action-hint">
                            <i class="fas fa-rotate"></i> Ver fundamento bíblico
                        </div>
                    </div>
                    <!-- CARA TRASERA -->
                    <div class="qs-flip-back">
                        <div>
                            <div class="qs-flip-back-header">
                                <span class="qs-flip-back-title"><i class="fas ${c.icono}"></i> ${c.titulo}</span>
                                <i class="fas fa-bible" style="color: var(--golden);"></i>
                            </div>
                            <div class="qs-flip-verse-box">
                                <p class="qs-flip-verse-text">"${c.versiculo}"</p>
                                <p class="qs-flip-verse-ref">— ${c.referencia}</p>
                            </div>
                            <p class="qs-flip-back-desc">${c.explicacion}</p>
                        </div>
                        <div class="qs-flip-back-hint">
                            <i class="fas fa-rotate-left"></i> Volver al frente
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function flipCartaCreencia(id) {
        const card = document.getElementById(`card-${id}`);
        if (card) {
            card.classList.toggle('flipped');
        }
    }

    /* ==========================================================================
       7. QUIZ INTERACTIVO "¿CUÁNTO SABES DE NUESTRA FE?"
       ========================================================================== */
    function renderQuiz() {
        const container = document.getElementById('qsQuizContainer');
        if (!container) return;

        // Si ya terminó el quiz
        if (state.quizIndice >= QUIZ_PREGUNTAS.length) {
            renderQuizResults(container);
            return;
        }

        const q = QUIZ_PREGUNTAS[state.quizIndice];
        const letras = ['A', 'B', 'C', 'D'];
        const progresoPorcentaje = ((state.quizIndice + 1) / QUIZ_PREGUNTAS.length) * 100;

        container.innerHTML = `
            <div class="qs-quiz-card">
                <div class="qs-quiz-progress-bar-container">
                    <div class="qs-quiz-progress-bar" style="width: ${progresoPorcentaje}%"></div>
                </div>

                <div class="qs-quiz-meta">
                    <span class="qs-quiz-badge"><i class="fas fa-question-circle"></i> Pregunta ${state.quizIndice + 1} de ${QUIZ_PREGUNTAS.length}</span>
                    <span>Puntuación: <strong>${state.quizPuntos} pts</strong></span>
                </div>

                <h3 class="qs-quiz-question-text">${q.pregunta}</h3>

                <div class="qs-quiz-options-grid">
                    ${q.opciones.map((op, idx) => {
                        let btnClass = 'qs-quiz-option-btn';
                        if (state.quizRespondido) {
                            if (idx === q.correcta) {
                                btnClass += ' correct';
                            } else if (idx === state.quizSeleccion) {
                                btnClass += ' wrong';
                            }
                        }
                        const disabledAttr = state.quizRespondido ? 'disabled' : '';

                        return `
                            <button type="button" class="${btnClass}" ${disabledAttr} data-csp-click="responderQuizQS(${idx})">
                                <span class="qs-quiz-option-letter">${letras[idx]}</span>
                                <span>${op}</span>
                            </button>
                        `;
                    }).join('')}
                </div>

                ${state.quizRespondido ? `
                    <div class="qs-quiz-feedback-box ${state.quizSeleccion === q.correcta ? 'correct' : 'wrong'}">
                        <i class="fas ${state.quizSeleccion === q.correcta ? 'fa-circle-check qs-quiz-feedback-icon' : 'fa-circle-xmark qs-quiz-feedback-icon'}"></i>
                        <div>
                            <strong>${state.quizSeleccion === q.correcta ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}</strong><br>
                            ${q.explicacion}
                        </div>
                    </div>

                    <div class="qs-quiz-actions">
                        <button type="button" class="qs-quiz-next-btn" data-csp-click="avanzarPreguntaQuizQS()">
                            ${state.quizIndice + 1 < QUIZ_PREGUNTAS.length ? 'Siguiente Pregunta <i class="fas fa-arrow-right"></i>' : 'Ver Puntuación Final <i class="fas fa-trophy"></i>'}
                        </button>
                    </div>
                ` : ''}
            </div>
        `;
    }

    function responderQuizQS(opcionIdx) {
        if (state.quizRespondido) return;

        state.quizRespondido = true;
        state.quizSeleccion = opcionIdx;

        const q = QUIZ_PREGUNTAS[state.quizIndice];
        if (opcionIdx === q.correcta) {
            state.quizPuntos += 20; // 20 puntos por pregunta (100 total)
        }

        renderQuiz();
    }

    function avanzarPreguntaQuizQS() {
        state.quizIndice++;
        state.quizRespondido = false;
        state.quizSeleccion = null;
        renderQuiz();
    }

    function renderQuizResults(container) {
        // Guardar récord
        if (state.quizPuntos > state.quizRecord) {
            state.quizRecord = state.quizPuntos;
            localStorage.setItem('iasd_quiz_qs_record', state.quizPuntos.toString());
        }

        let mensaje = '';
        let icono = 'fa-trophy';

        if (state.quizPuntos === 100) {
            mensaje = '¡Puntuación perfecta! Conoces de manera impecable los fundamentos bíblicos y doctrinales de la Iglesia Adventista.';
            icono = 'fa-crown';
        } else if (state.quizPuntos >= 60) {
            mensaje = '¡Muy buen resultado! Tienes un sólido entendimiento de nuestra fe y esperanza.';
            icono = 'fa-medal';
        } else {
            mensaje = '¡Buen intento! Te animamos a seguir explorando y estudiando la Biblia con nosotros para profundizar en cada doctrina.';
            icono = 'fa-book-bible';
        }

        container.innerHTML = `
            <div class="qs-quiz-card qs-quiz-results-card">
                <i class="fas ${icono} qs-quiz-trophy"></i>
                <h3 style="color: var(--deep-blue); font-size: 1.6rem; margin-bottom: 0.5rem;">¡Quiz Completado!</h3>
                <div class="qs-quiz-score-badge">${state.quizPuntos} / 100 puntos</div>
                <p style="color: var(--dark-text); font-size: 1rem; max-width: 600px; margin: 0 auto 1.2rem; line-height: 1.6;">${mensaje}</p>
                <div class="qs-quiz-record-note">🏆 Mejor Récord Guardado: <strong>${state.quizRecord} pts</strong></div>
                <button type="button" class="qs-quiz-next-btn" data-csp-click="reiniciarQuizQS()">
                    <i class="fas fa-rotate-left"></i> Intentar Nuevamente
                </button>
            </div>
        `;
    }

    function reiniciarQuizQS() {
        state.quizIndice = 0;
        state.quizPuntos = 0;
        state.quizRespondido = false;
        state.quizSeleccion = null;
        renderQuiz();
    }

    /* ==========================================================================
       8. JUEGO DE EMPAREJAR VERSÍCULOS Y REFERENCIAS
       ========================================================================== */
    function initMatchGame() {
        state.matchSelectedTexto = null;
        state.matchSelectedRef = null;
        state.matchAciertos = [];

        // Barajar referencias
        const shuffledRefs = [...VERSICULOS_MATCH].sort(() => Math.random() - 0.5);
        state.matchPairsShuffled = shuffledRefs;

        renderMatchGame();
    }

    function renderMatchGame() {
        const container = document.getElementById('qsMatchGameContainer');
        if (!container) return;

        const todosCompletos = state.matchAciertos.length === VERSICULOS_MATCH.length;

        container.innerHTML = `
            <div class="qs-match-container">
                <div class="qs-match-scoreboard">
                    <span class="qs-match-counter-pill">
                        <i class="fas fa-check-double" style="color: #10b981;"></i> Aciertos: <strong>${state.matchAciertos.length} de ${VERSICULOS_MATCH.length}</strong>
                    </span>
                    <button type="button" class="qs-timeline-btn" data-csp-click="reiniciarMatchQS()">
                        <i class="fas fa-shuffle"></i> Barajar y Reiniciar
                    </button>
                </div>

                <div class="qs-match-grid">
                    <!-- Columna A: Textos -->
                    <div>
                        <div class="qs-match-column-title">
                            <i class="fas fa-quote-left" style="color: var(--golden);"></i> 1. Selecciona un Texto Bíblico:
                        </div>
                        <div class="qs-match-list">
                            ${VERSICULOS_MATCH.map(item => {
                                const isMatched = state.matchAciertos.includes(item.id);
                                const isSelected = state.matchSelectedTexto === item.id;
                                let cardClass = 'qs-match-card';
                                if (isMatched) cardClass += ' matched';
                                else if (isSelected) cardClass += ' selected';

                                return `
                                    <div class="${cardClass}" id="match-text-${item.id}" data-csp-click="${isMatched ? '' : `seleccionarTextoMatchQS('${item.id}')`}">
                                        <span>${item.texto}</span>
                                        ${isMatched ? '<i class="fas fa-check-circle" style="color: #10b981; font-size: 1.1rem; margin-left: 0.5rem;"></i>' : ''}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>

                    <!-- Columna B: Referencias -->
                    <div>
                        <div class="qs-match-column-title">
                            <i class="fas fa-bookmark" style="color: var(--golden);"></i> 2. Empareja con su Referencia:
                        </div>
                        <div class="qs-match-list">
                            ${state.matchPairsShuffled.map(item => {
                                const isMatched = state.matchAciertos.includes(item.id);
                                const isSelected = state.matchSelectedRef === item.id;
                                let cardClass = 'qs-match-card';
                                if (isMatched) cardClass += ' matched';
                                else if (isSelected) cardClass += ' selected';

                                return `
                                    <div class="${cardClass}" id="match-ref-${item.id}" data-csp-click="${isMatched ? '' : `seleccionarRefMatchQS('${item.id}')`}">
                                        <div>
                                            <strong style="color: var(--deep-blue); font-size: 0.95rem;">${item.referencia}</strong>
                                            <div style="font-size: 0.8rem; color: var(--muted-text); margin-top: 2px;">${item.tema}</div>
                                        </div>
                                        ${isMatched ? '<i class="fas fa-check-circle" style="color: #10b981; font-size: 1.1rem;"></i>' : '<i class="fas fa-link" style="color: #cbd5e1;"></i>'}
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                </div>

                ${todosCompletos ? `
                    <div class="qs-match-success-banner">
                        <i class="fas fa-circle-check" style="font-size: 2rem; margin-bottom: 0.5rem; display: block;"></i>
                        <h4 style="font-size: 1.2rem; margin-bottom: 0.4rem; color: #065f46;">¡Felicitaciones! Has emparejado todos los versículos correctamente.</h4>
                        <p style="margin: 0; font-size: 0.92rem;">La Palabra de Dios es lámpara a nuestros pies y lumbrera a nuestro camino (Salmo 119:105).</p>
                    </div>
                ` : ''}
            </div>
        `;
    }

    function seleccionarTextoMatchQS(id) {
        if (state.matchAciertos.includes(id)) return;
        state.matchSelectedTexto = id;
        verificarMatch();
    }

    function seleccionarRefMatchQS(id) {
        if (state.matchAciertos.includes(id)) return;
        state.matchSelectedRef = id;
        verificarMatch();
    }

    function verificarMatch() {
        renderMatchGame();

        if (state.matchSelectedTexto && state.matchSelectedRef) {
            if (state.matchSelectedTexto === state.matchSelectedRef) {
                // Correcto
                state.matchAciertos.push(state.matchSelectedTexto);
                state.matchSelectedTexto = null;
                state.matchSelectedRef = null;
                setTimeout(renderMatchGame, 250);
            } else {
                // Error - animación de sacudida
                const textElem = document.getElementById(`match-text-${state.matchSelectedTexto}`);
                const refElem = document.getElementById(`match-ref-${state.matchSelectedRef}`);
                if (textElem) textElem.classList.add('error-shake');
                if (refElem) refElem.classList.add('error-shake');

                setTimeout(() => {
                    state.matchSelectedTexto = null;
                    state.matchSelectedRef = null;
                    renderMatchGame();
                }, 600);
            }
        }
    }

    function reiniciarMatchQS() {
        initMatchGame();
    }

    /* ==========================================================================
       9. ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
       ========================================================================== */
    function renderFaq() {
        const container = document.getElementById('qsFaqContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="qs-faq-list">
                ${PREGUNTAS_FAQ.map(f => `
                    <div class="qs-faq-item" id="faq-item-${f.id}">
                        <button type="button" class="qs-faq-question-btn" data-csp-click="toggleFaqQS('${f.id}')" aria-expanded="false">
                            <span style="display: flex; align-items: center; gap: 0.6rem;">
                                <i class="fas ${f.icono}" style="color: var(--golden);"></i>
                                ${f.pregunta}
                            </span>
                            <span class="qs-faq-icon-wrapper">
                                <i class="fas fa-chevron-down"></i>
                            </span>
                        </button>
                        <div class="qs-faq-answer-container">
                            <p class="qs-faq-answer-text">${f.respuesta}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function toggleFaqQS(id) {
        const item = document.getElementById(`faq-item-${id}`);
        if (!item) return;

        const isOpen = item.classList.contains('open');

        // Cerrar otros para mantener elegancia visual
        document.querySelectorAll('.qs-faq-item').forEach(el => {
            el.classList.remove('open');
            const btn = el.querySelector('.qs-faq-question-btn');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
            item.classList.add('open');
            const btn = item.querySelector('.qs-faq-question-btn');
            if (btn) btn.setAttribute('aria-expanded', 'true');
        }
    }

    /* ==========================================================================
       10. TIMELINE: NUESTRA IDENTIDAD EN 7 PASOS
       ========================================================================== */
    function renderTimeline() {
        const container = document.getElementById('qsTimelineContainer');
        if (!container) return;

        container.innerHTML = `
            <div class="qs-timeline-controls">
                <span style="font-size: 0.9rem; color: var(--muted-text); font-weight: 600;">
                    <i class="fas fa-hand-pointer" style="color: var(--golden);"></i> Haz clic en cada paso para ver su fundamentación
                </span>
                <div style="display: flex; gap: 0.5rem;">
                    <button type="button" class="qs-timeline-btn" data-csp-click="expandirTodoTimelineQS()">
                        <i class="fas fa-angles-down"></i> Expandir Todos
                    </button>
                    <button type="button" class="qs-timeline-btn" data-csp-click="contraerTodoTimelineQS()">
                        <i class="fas fa-angles-up"></i> Contraer Todos
                    </button>
                </div>
            </div>

            <div class="qs-timeline-wrapper">
                ${PASOS_IDENTIDAD.map(p => `
                    <div class="qs-timeline-node" id="step-${p.id}">
                        <div class="qs-timeline-dot" data-csp-click="togglePasoIdentidadQS('${p.id}')" title="Paso ${p.numero}">
                            ${p.numero}
                        </div>
                        <div class="qs-timeline-card" data-csp-click="togglePasoIdentidadQS('${p.id}')">
                            <div class="qs-timeline-header">
                                <h4 class="qs-timeline-title">
                                    <i class="fas ${p.icono}" style="color: var(--golden);"></i> ${p.titulo}
                                </h4>
                                <i class="fas fa-chevron-down qs-timeline-toggle-icon"></i>
                            </div>
                            <div class="qs-timeline-body">
                                <p style="margin: 0;">${p.descripcion}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function togglePasoIdentidadQS(id) {
        const node = document.getElementById(`step-${id}`);
        if (node) {
            node.classList.toggle('open');
        }
    }

    function expandirTodoTimelineQS() {
        document.querySelectorAll('.qs-timeline-node').forEach(node => node.classList.add('open'));
    }

    function contraerTodoTimelineQS() {
        document.querySelectorAll('.qs-timeline-node').forEach(node => node.classList.remove('open'));
    }

    /* ==========================================================================
       11. REVEAL ON SCROLL
       ========================================================================== */
    function initRevealOnScroll() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.qs-reveal').forEach(el => el.classList.add('qs-visible'));
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('qs-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        document.querySelectorAll('.qs-reveal').forEach(el => observer.observe(el));
    }

    /* ==========================================================================
       12. INICIALIZACIÓN GLOBAL DEL MÓDULO
       ========================================================================== */
    function inicializarQuienesSomos() {
        const container = document.getElementById('visitantes');
        if (!container) return;

        renderPerfilBox();
        renderFlipCards();
        renderQuiz();
        initMatchGame();
        renderFaq();
        renderTimeline();
        initTypewriter();
        initCanvasParticles();
        initRevealOnScroll();
    }

    // Exportar funciones a window para CSP Event Delegator
    window.inicializarQuienesSomos = inicializarQuienesSomos;
    window.setPerfilQS = setPerfilQS;
    window.flipCartaCreencia = flipCartaCreencia;
    window.responderQuizQS = responderQuizQS;
    window.avanzarPreguntaQuizQS = avanzarPreguntaQuizQS;
    window.reiniciarQuizQS = reiniciarQuizQS;
    window.seleccionarTextoMatchQS = seleccionarTextoMatchQS;
    window.seleccionarRefMatchQS = seleccionarRefMatchQS;
    window.reiniciarMatchQS = reiniciarMatchQS;
    window.toggleFaqQS = toggleFaqQS;
    window.togglePasoIdentidadQS = togglePasoIdentidadQS;
    window.expandirTodoTimelineQS = expandirTodoTimelineQS;
    window.contraerTodoTimelineQS = contraerTodoTimelineQS;

    // Escuchar carga de página
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarQuienesSomos);
    } else {
        setTimeout(inicializarQuienesSomos, 100);
    }

    // Escuchar cambio de página SPA
    window.addEventListener('pageChanged', function (e) {
        if (e.detail && (e.detail.page === 'visitantes' || e.detail.pageId === 'visitantes')) {
            setTimeout(inicializarQuienesSomos, 50);
        }
    });

})();
