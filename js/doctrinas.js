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
            tituloCorto: 'El Dios Trino (01 a 05)',
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
            tema: 'hombre',
            nombre: 'La Doctrina del Hombre (06 a 07)',
            tituloCorto: 'La Naturaleza del Hombre (06-07)',
            subtitulo: 'La Naturaleza del Hombre (06) y El Origen del Pecado (07). Creados a imagen de Dios, caídos y necesitados de redención.',
            icono: 'fa-user-group',
            badgeTema: 'Creación & Naturaleza',
            colorGrad: 'linear-gradient(135deg, #8d4f16 0%, #d97706 100%)',
            colorGlow: 'rgba(217, 119, 6, 0.35)',
            colorBadge: '#d97706',
            resumen: 'El ser humano fue creado a imagen de Dios, pero el pecado entró al mundo por la desobediencia. La muerte es consecuencia del pecado. El hombre necesita redención y salvación.',
            versiculoLema: 'Génesis 1:26-27',
            versiculos: [
                { ref: 'Génesis 1:26-27', texto: 'Entonces dijo Dios: Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza... Y creó Dios al hombre a su imagen.' },
                { ref: 'Romanos 5:12', texto: 'Por tanto, como el pecado entró en el mundo por un hombre, y por el pecado la muerte, así la muerte pasó a todos los hombres, por cuanto todos pecaron.' },
                { ref: 'Romanos 6:23', texto: 'Porque la paga del pecado es muerte, mas la dádiva de Dios es vida eterna en Cristo Jesús Señor nuestro.' },
                { ref: 'Eclesiastés 9:5', texto: 'Porque los que viven saben que han de morir; pero los muertos nada saben, ni tienen más paga; porque su memoria es puesta en olvido.' }
            ]
        },
        {
            id: 3,
            tema: 'salvacion',
            nombre: 'La Doctrina de la Salvación (08 a 10)',
            tituloCorto: 'La Salvación por Gracia (08-10)',
            subtitulo: 'La Salvación por Gracia (08), La Fe y la Justificación (09), El Bautismo y la Nueva Vida (10).',
            icono: 'fa-heart',
            badgeTema: 'Redención & Fe',
            colorGrad: 'linear-gradient(135deg, #c99d3b 0%, #8a6416 100%)',
            colorGlow: 'rgba(201, 157, 59, 0.35)',
            colorBadge: '#c99d3b',
            resumen: 'La salvación es un regalo de Dios por la fe en Jesucristo. No se obtiene por obras, sino por la gracia. El bautismo es un paso de fe que simboliza la muerte al pecado y la resurrección a una nueva vida.',
            versiculoLema: 'Efesios 2:8-9',
            versiculos: [
                { ref: 'Efesios 2:8-9', texto: 'Porque por gracia sois salvos por medio de la fe; y esto no de vosotros, pues es don de Dios; no por obras, para que nadie se gloríe.' },
                { ref: 'Romanos 5:1', texto: 'Justificados, pues, por la fe, tenemos paz para con Dios por medio de nuestro Señor Jesucristo.' },
                { ref: 'Romanos 6:3-4', texto: '¿O no sabéis que todos los que hemos sido bautizados en Cristo Jesús, hemos sido bautizados en su muerte? Porque somos sepultados juntamente con él para muerte por el bautismo...' },
                { ref: 'Gálatas 2:16', texto: 'Sabiendo que el hombre no es justificado por las obras de la ley, sino por la fe de Jesucristo, nosotros también hemos creído en Jesucristo...' }
            ]
        },
        {
            id: 4,
            tema: 'iglesia',
            nombre: 'La Doctrina de la Iglesia (11 a 18)',
            tituloCorto: 'La Iglesia y sus Ordenanzas (11-18)',
            subtitulo: 'La Iglesia Remanente (11), El Sábado (12), El Bautismo (13), La Cena del Señor (14), Dones Espirituales (15), Don de Profecía (16), Ley de Dios (17), Mayordomía (18).',
            icono: 'fa-church',
            badgeTema: 'Comunidad & Misión',
            colorGrad: 'linear-gradient(135deg, #5c2d91 0%, #311352 100%)',
            colorGlow: 'rgba(92, 45, 145, 0.35)',
            colorBadge: '#7b1fa2',
            resumen: 'La iglesia es el cuerpo de Cristo en la tierra. El sábado es el día de reposo establecido en la creación. El bautismo y la cena del Señor son ordenanzas. Los dones espirituales y el don de profecía guían a la iglesia. La ley de Dios refleja su carácter. La mayordomía incluye el diezmo y las ofrendas.',
            versiculoLema: 'Apocalipsis 12:17',
            versiculos: [
                { ref: 'Apocalipsis 12:17', texto: 'Entonces el dragón se llenó de ira contra la mujer; y se fue a hacer guerra contra el resto de la descendencia de ella, los que guardan los mandamientos de Dios y tienen el testimonio de Jesucristo.' },
                { ref: 'Éxodo 20:8-11', texto: 'Acuérdate del día de reposo para santificarlo. Seis días trabajarás, y harás toda tu obra; mas el séptimo día es reposo para Jehová tu Dios...' },
                { ref: '1 Corintios 11:23-26', texto: 'Porque yo recibí del Señor lo que también os he enseñado: Que el Señor Jesús, la noche que fue entregado, tomó pan; y habiendo dado gracias, lo partió...' },
                { ref: '1 Corintios 12:4-7', texto: 'Ahora bien, hay diversidad de dones, pero el Espíritu es el mismo... Pero a cada uno le es dada la manifestación del Espíritu para provecho.' },
                { ref: 'Malaquías 3:10', texto: 'Traed todos los diezmos al alfolí y haya alimento en mi casa; y probadme ahora en esto, dice Jehová de los ejércitos...' }
            ]
        },
        {
            id: 5,
            tema: 'vida',
            nombre: 'La Doctrina de la Vida Cristiana (19 a 22)',
            tituloCorto: 'La Vida Cristiana (19-22)',
            subtitulo: 'La Vida de Santidad (19), La Oración y la Devoción (20), El Servicio Cristiano (21), La Salud y la Temperancia (22).',
            icono: 'fa-seedling',
            badgeTema: 'Santidad & Conducta',
            colorGrad: 'linear-gradient(135deg, #1b5e20 0%, #0d3810 100%)',
            colorGlow: 'rgba(27, 94, 32, 0.35)',
            colorBadge: '#2e7d32',
            resumen: 'La vida cristiana es una vida de santidad, oración y servicio. El Espíritu Santo transforma al creyente. El servicio a los demás es una expresión del amor de Cristo. La salud integral (física, mental y espiritual) es parte del plan de Dios.',
            versiculoLema: 'Gálatas 5:22-23',
            versiculos: [
                { ref: 'Gálatas 5:22-23', texto: 'Mas el fruto del Espíritu es amor, gozo, paz, paciencia, benignidad, bondad, fe, mansedumbre, templanza; contra tales cosas no hay ley.' },
                { ref: '1 Tesalonicenses 5:17', texto: 'Orad sin cesar.' },
                { ref: 'Mateo 25:35-40', texto: 'Porque tuve hambre, y me disteis de comer; tuve sed, y me disteis de beber... En cuanto lo hicisteis a uno de estos mis hermanos más pequeños, a mí lo hicisteis.' },
                { ref: '1 Corintios 6:19-20', texto: '¿O ignoráis que vuestro cuerpo es templo del Espíritu Santo, el cual está en vosotros, el cual tenéis de Dios, y que no sois vuestros? Glorificad, pues, a Dios en vuestro cuerpo...' },
                { ref: '3 Juan 2', texto: 'Amado, yo deseo que tú seas prosperado en todas las cosas, y que tengas salud, así como prospera tu alma.' }
            ]
        },
        {
            id: 6,
            tema: 'fin',
            nombre: 'Acontecimientos Finales (23 a 28)',
            tituloCorto: 'Acontecimientos Finales (23-28)',
            subtitulo: 'La Segunda Venida (23), El Milenio (24), El Juicio (25), El Estado de los Muertos (26), La Muerte y la Resurrección (27), La Tierra Nueva (28).',
            icono: 'fa-hourglass-end',
            badgeTema: 'Profecía & Esperanza',
            colorGrad: 'linear-gradient(135deg, #880e4f 0%, #b71c1c 100%)',
            colorGlow: 'rgba(183, 28, 28, 0.35)',
            colorBadge: '#c62828',
            resumen: 'Cristo volverá literalmente y visiblemente. Habrá un milenio en el cielo. El juicio final revelará la justicia de Dios. Los muertos duermen hasta la resurrección. La tierra nueva será el hogar eterno de los redimidos.',
            versiculoLema: 'Juan 14:1-3',
            versiculos: [
                { ref: 'Juan 14:1-3', texto: 'No se turbe vuestro corazón; creéis en Dios, creed también en mí... vendré otra vez, y os tomaré a mí mismo, para que donde yo estoy, vosotros también estéis.' },
                { ref: '1 Tesalonicenses 4:16-17', texto: 'Porque el Señor mismo con voz de mando, con voz de arcángel, y con trompeta de Dios, descenderá del cielo; y los muertos en Cristo resucitarán primero.' },
                { ref: 'Daniel 7:9-10', texto: 'Estuve mirando hasta que fueron puestos tronos, y se sentó un Anciano de días... el Juez se sentó, y los libros fueron abiertos.' },
                { ref: 'Apocalipsis 20:1-6', texto: 'Y vi las almas de los decapitados por causa del testimonio de Jesús... y vivieron y reinaron con Cristo mil años.' },
                { ref: 'Apocalipsis 21:1-5', texto: 'Vi un cielo nuevo y una tierra nueva; porque el primer cielo y la primera tierra pasaron... Enjugará Dios toda lágrima de los ojos de ellos; y ya no habrá muerte, ni llanto, ni dolor.' }
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
            pregunta: 'Según la doctrina del hombre, ¿cuál es el origen y condición del ser humano?',
            doctrinaId: 2,
            opciones: [
                'Fue creado inmortal por naturaleza y no experimenta la muerte física',
                'Fue creado a imagen de Dios, pero cayó por el pecado y necesita redención y salvación',
                'Evolucionó de especies inferiores y no tiene relación con el pecado original',
                'No necesita salvador porque sus buenas obras anulan cualquier falta'
            ],
            correcta: 1,
            explicacion: 'El hombre fue creado a imagen de Dios (Génesis 1:26-27), pero por la desobediencia el pecado y la muerte entraron al mundo (Romanos 5:12; 6:23).'
        },
        {
            pregunta: 'Según Efesios 2:8-9 y Romanos 5:1, ¿cómo se obtiene la salvación y justificación?',
            doctrinaId: 3,
            opciones: [
                'Por las buenas obras y la acumulación de méritos personales',
                'Por gracia mediante la fe en Jesucristo, siendo un don inmerecido de Dios',
                'Exclusivamente por pertenecer a una organización religiosa',
                'Por cumplir perfectamente la ley sin necesidad de mediador'
            ],
            correcta: 1,
            explicacion: 'La salvación es un regalo de gracia que se recibe por la fe en Jesús, y no por obras para que nadie se gloríe (Efesios 2:8-9; Gálatas 2:16).'
        },
        {
            pregunta: '¿Cuáles son pilares fundamentales y ordenanzas bíblicas de la Iglesia de Dios?',
            doctrinaId: 4,
            opciones: [
                'El cuerpo de Cristo, el sábado bíblico, el bautismo, la Santa Cena, los dones y la mayordomía',
                'Tradiciones eclesiásticas creadas en los concilios medievales sin base en las Escrituras',
                'Un club social con ordenanzas opcionales y sin dones espirituales',
                'Una jerarquía humana donde el diezmo no tiene propósito espiritual'
            ],
            correcta: 0,
            explicacion: 'La iglesia es el cuerpo de Cristo (Apocalipsis 12:17; Éxodo 20:8-11), con ordenanzas bíblicas y guiada por el Espíritu Santo y sus dones.'
        },
        {
            pregunta: '¿Qué distingue la vida cristiana y el cuidado del cuerpo según las Escrituras?',
            doctrinaId: 5,
            opciones: [
                'Es una vida de santidad, oración, servicio y cuidado del cuerpo como templo del Espíritu Santo',
                'Una lista de prohibiciones externas sin transformación del corazón',
                'Cuidar el cuerpo solo por razones estéticas sin vinculación espiritual',
                'La fe solo importa en la mente y lo que hagamos con el cuerpo es irrelevante'
            ],
            correcta: 0,
            explicacion: 'La vida cristiana es santidad, oración y servicio, cuidando la salud integral como templo de Dios (Gálatas 5:22-23; 1 Corintios 6:19-20; 3 Juan 2).'
        },
        {
            pregunta: '¿Qué enseña la profecía bíblica acerca de los acontecimientos finales?',
            doctrinaId: 6,
            opciones: [
                'Cristo volverá literal y visiblemente, habrá un milenio, juicio y una Tierra Nueva eterna',
                'El mundo continuará indefinidamente sin intervención divina',
                'La venida de Jesús fue un evento simbólico que ocurrió en el siglo I',
                'Los muertos van inmediatamente al cielo o al infierno tras expirar'
            ],
            correcta: 0,
            explicacion: 'Jesús regresará visiblemente (Juan 14:1-3; 1 Tesalonicenses 4:16-17), los muertos resucitarán y Dios creará una Tierra Nueva (Apocalipsis 21:1-5).'
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
        { id: 1, nombre: '1. La Doctrina de Dios', versiculo: 'Mateo 28:19', texto: 'Bautizándolos en el nombre del Padre, del Hijo y del Espíritu Santo' },
        { id: 2, nombre: '2. La Doctrina del Hombre', versiculo: 'Génesis 1:26-27', texto: 'Hagamos al hombre a nuestra imagen, conforme a nuestra semejanza' },
        { id: 3, nombre: '3. La Doctrina de la Salvación', versiculo: 'Efesios 2:8-9', texto: 'Porque por gracia sois salvos por medio de la fe; es don de Dios' },
        { id: 4, nombre: '4. La Doctrina de la Iglesia', versiculo: 'Apocalipsis 12:17', texto: 'Los que guardan los mandamientos de Dios y tienen el testimonio de Jesús' },
        { id: 5, nombre: '5. La Vida Cristiana', versiculo: 'Gálatas 5:22-23', texto: 'Mas el fruto del Espíritu es amor, gozo, paz, paciencia, fe, templanza' },
        { id: 6, nombre: '6. Acontecimientos Finales', versiculo: 'Juan 14:1-3', texto: 'Vendré otra vez, y os tomaré a mí mismo, para que donde yo estoy estéis' }
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
