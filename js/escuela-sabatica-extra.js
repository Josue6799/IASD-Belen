/**
 * Escuela Sabática · Textos Clave de la Semana + Mini-Quiz Interactivo | IASD Belén
 * 100% autónomo en el navegador (cero modificaciones a la base de datos).
 */
(function () {
    'use strict';

    const TEXTOS_SEMANA_L9 = [
        {
            cita: '1 Juan 4:1-3',
            tema: 'Probar los espíritus y confesar a Cristo',
            texto: 'Amados, no creáis a todo espíritu, sino probad los espíritus si son de Dios; porque muchos falsos profetas han salido por el mundo. En esto conoced el Espíritu de Dios: Todo espíritu que confiesa que Jesucristo ha venido en carne, es de Dios; y todo espíritu que no confiesa que Jesucristo ha venido en carne, no es de Dios.'
        },
        {
            cita: 'Isaías 8:20',
            tema: 'La Ley y el Testimonio',
            texto: '¡A la ley y al testimonio! Si no dijeren conforme a esto, es porque no les ha amanecido.'
        },
        {
            cita: '1 Tesalonicenses 5:19-21',
            tema: 'No menospreciar, sino examinarlo todo',
            texto: 'No apaguéis al Espíritu. No menospreciéis las profecías. Examinadlo todo; retened lo bueno.'
        },
        {
            cita: 'Deuteronomio 18:21-22',
            tema: 'El cumplimiento de la palabra profética',
            texto: 'Y si dijeres en tu corazón: ¿Cómo conoceremos la palabra que Jehová no ha hablado?; si el profeta hablare en nombre de Jehová, y no se cumpliere lo que dijo, ni aconteciere, es palabra que Jehová no ha hablado; con presunción la habló el tal profeta; no tengas temor de él.'
        },
        {
            cita: 'Mateo 7:15-20',
            tema: 'Por sus frutos los conoceréis',
            texto: 'Guardaos de los falsos profetas, que vienen a vosotros con vestidos de ovejas, pero por dentro son lobos rapaces. Por sus frutos los conoceréis. ¿Acaso se recogen uvas de los espinos, o higos de los abrojos? Así, todo buen árbol da buenos frutos, pero el árbol malo da frutos malos... Así que, por sus frutos los conoceréis.'
        },
        {
            cita: 'Hechos 17:11',
            tema: 'El ejemplo de los creyentes de Berea',
            texto: 'Y estos eran más nobles que los que estaban en Tesalónica, pues recibieron la palabra con toda solicitud, escudriñando cada día las Escrituras para ver si estas cosas eran así.'
        }
    ];

    const QUIZ_L9 = [
        {
            pregunta: 'Según 1 Juan 4:1, ¿qué actitud nos ordena Dios tener frente a los mensajes y espíritus que afirman hablar de Su parte?',
            opciones: [
                'Aceptar cualquier mensaje si suena emotivo o hace milagros',
                'Rechazar toda profecía sin escucharla',
                'Probar los espíritus para comprobar si realmente son de Dios',
                'Dejar que solo los líderes estudien la Biblia'
            ],
            correcta: 2,
            explicacion: '1 Juan 4:1 nos llama a no ser ingenuos ni cínicos, sino a probar los espíritus a la luz de la Palabra de Dios.'
        },
        {
            pregunta: 'De acuerdo con Isaías 8:20 ("¡A la ley y al testimonio!"), ¿cuál es la prueba fundamental de todo mensaje profético verdadero?',
            opciones: [
                'Que tenga muchos seguidores en público',
                'Que esté en completa armonía con la Biblia y la ley de Dios',
                'Que anuncie siempre noticias fáciles y agradables',
                'Que reemplace la necesidad de leer las Escrituras'
            ],
            correcta: 1,
            explicacion: 'Un verdadero profeta nunca contradice la revelación bíblica previa; siempre armoniza con la Ley y el Testimonio (Isaías 8:20).'
        },
        {
            pregunta: '¿Qué enseñanza equilibrada da Pablo en 1 Tesalonicenses 5:19-21 sobre el don de profecía?',
            opciones: [
                'No menospreciar las profecías, sino examinarlo todo y retener lo bueno',
                'Creer todo automáticamente sin hacer preguntas',
                'Evitar hablar del Espíritu Santo en la iglesia',
                'Buscar únicamente señales sobrenaturales'
            ],
            correcta: 0,
            explicacion: 'Pablo nos protege de dos extremos: apagar al Espíritu por cinismo o aceptar errores sin examinarlo todo.'
        },
        {
            pregunta: '¿Por qué la predicción de Jonás contra Nínive ("De aquí a cuarenta días Nínive será destruida") no lo convirtió en un falso profeta?',
            opciones: [
                'Porque Jonás se equivocó de ciudad',
                'Porque las profecías de juicio pueden ser condicionales al arrepentimiento del pueblo',
                'Porque Deuteronomio 18:22 no aplica al Antiguo Testamento',
                'Porque Nínive nunca escuchó el mensaje'
            ],
            correcta: 1,
            explicacion: 'Jeremías 18:7-10 explica que cuando una nación se arrepiente sinceramente, Dios puede detener el juicio anunciado, revelando Su misericordia.'
        },
        {
            pregunta: 'Según Mateo 7:15-20 y 1 Juan 4:2-3, ¿qué dos señales claras confirman el ministerio de un mensajero genuino de Dios?',
            opciones: [
                'Fama personal y prosperidad material',
                'Exaltar a Jesucristo encarnado y mostrar frutos espirituales íntegros en su vida',
                'Usar palabras misteriosas imposibles de entender',
                'Criticar constantemente a la iglesia'
            ],
            correcta: 1,
            explicacion: 'Todo verdadero mensajero exalta a Jesucristo como Señor encarnado (1 Juan 4:2-3) y su vida produce frutos de humildad, amor y obediencia (Mateo 7:20).'
        }
    ];

    const QSTATE = {
        index: 0,
        score: 0,
        answered: false,
        finished: false
    };

    function esc(str) {
        return String(str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function renderTextosClave() {
        const mount = document.getElementById('esTextosClaveMount');
        if (!mount) return;

        mount.innerHTML = `
            <section class="es-section" id="textosClaveSemana">
                <div class="es-section-head">
                    <span class="es-kicker">Biblia Abierta · En 1 Clic</span>
                    <h2 class="es-section-title">Textos Clave de la Semana</h2>
                    <p class="es-section-sub">Lee, copia o comparte los pasajes bíblicos más importantes de esta lección sin salir de la página.</p>
                </div>

                <div class="es-textos-grid">
                    ${TEXTOS_SEMANA_L9.map((t, idx) => `
                        <article class="es-texto-card">
                            <div class="es-texto-top">
                                <span class="es-texto-cita"><i class="fas fa-bible"></i> ${esc(t.cita)}</span>
                                <span class="es-texto-tema">${esc(t.tema)}</span>
                            </div>
                            <p class="es-texto-body">“${esc(t.texto)}”</p>
                            <div class="es-texto-actions">
                                <button type="button" class="es-q-btn-sec es-btn-copy-verse" data-copy-v="${idx}" style="padding:0.42rem 0.85rem; font-size:0.78rem;">
                                    <i class="far fa-copy"></i> Copiar
                                </button>
                                <button type="button" class="es-q-btn-sec es-btn-wa-verse" data-wa-v="${idx}" style="padding:0.42rem 0.85rem; font-size:0.78rem; color:#15803d; border-color:#bbf7d0; background:#f0fdf4;">
                                    <i class="fab fa-whatsapp"></i> Compartir
                                </button>
                            </div>
                        </article>
                    `).join('')}
                </div>
            </section>
        `;

        mount.querySelectorAll('[data-copy-v]').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = TEXTOS_SEMANA_L9[parseInt(btn.getAttribute('data-copy-v'), 10)];
                if (!item) return;
                const payload = `📖 ${item.cita} (RVR1960)\n“${item.texto}”`;
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(payload).then(() => {
                        const orig = btn.innerHTML;
                        btn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
                        setTimeout(() => { btn.innerHTML = orig; }, 1600);
                    });
                }
            });
        });

        mount.querySelectorAll('[data-wa-v]').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = TEXTOS_SEMANA_L9[parseInt(btn.getAttribute('data-wa-v'), 10)];
                if (!item) return;
                const msg = `📖 *${item.cita}*\n“${item.texto}”\n\n✨ Escuela Sabática · IASD Belén: ${window.location.href.split('#')[0]}`;
                window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
            });
        });
    }

    function renderQuiz() {
        const mount = document.getElementById('esQuizMount');
        if (!mount) return;

        if (!document.getElementById('esQuizCardBody')) {
            mount.innerHTML = `
                <section class="es-section" id="miniQuizLeccion">
                    <div class="es-section-head">
                        <span class="es-kicker">Reto Bíblico · 5 Preguntas</span>
                        <h2 class="es-section-title">Pon a Prueba lo que Estudiaste</h2>
                        <p class="es-section-sub">Ideal para repasar el viernes en la noche en familia o con los jóvenes y comprobar cuánto aprendiste esta semana.</p>
                    </div>
                    <div id="esQuizCardBody" class="es-quiz-card"></div>
                </section>
            `;
        }

        const body = document.getElementById('esQuizCardBody');
        if (!body) return;

        if (QSTATE.finished) {
            const total = QUIZ_L9.length;
            let titulo = '¡Buen repaso!';
            let sub = 'Sigue escudriñando la Palabra cada día como los creyentes de Berea (Hechos 17:11).';
            if (QSTATE.score === total) {
                titulo = '¡Puntaje Perfecto! 🏆';
                sub = '¡Excelente dominio de la Lección 9! Estás súper listo para el repaso del sábado.';
            } else if (QSTATE.score >= 4) {
                titulo = '¡Muy Bien Hecho! ✨';
                sub = 'Se nota que estudiaste con dedicación esta semana.';
            }

            body.innerHTML = `
                <div class="es-quiz-result">
                    <div class="es-quiz-score-circle">${QSTATE.score} / ${total}</div>
                    <h3>${titulo}</h3>
                    <p>${sub}</p>
                    <div class="es-quiz-result-actions">
                        <button type="button" id="esQuizRetryBtn" class="es-btn-gold" style="padding:0.72rem 1.4rem; font-size:0.88rem;">
                            <i class="fas fa-redo-alt"></i> Volver a intentar
                        </button>
                        <button type="button" id="esQuizShareWaBtn" class="es-btn-wa" style="padding:0.72rem 1.35rem; font-size:0.88rem;">
                            <i class="fab fa-whatsapp"></i> Compartir mi puntaje
                        </button>
                    </div>
                </div>
            `;

            document.getElementById('esQuizRetryBtn').addEventListener('click', () => {
                QSTATE.index = 0;
                QSTATE.score = 0;
                QSTATE.answered = false;
                QSTATE.finished = false;
                renderQuiz();
            });

            document.getElementById('esQuizShareWaBtn').addEventListener('click', () => {
                const msg = `🏆 Saqué *${QSTATE.score}/${total}* en el Mini-Quiz de la *Lección 9 (Poniendo a prueba a los profetas)* de Escuela Sabática · IASD Belén!\n\n¿Cuánto sacas tú? Pruébalo aquí:\n👉 ${window.location.href.split('#')[0]}#miniQuizLeccion`;
                window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
            });
            return;
        }

        const q = QUIZ_L9[QSTATE.index];
        const pct = Math.round(((QSTATE.index) / QUIZ_L9.length) * 100);

        body.innerHTML = `
            <div class="es-quiz-top">
                <span class="es-q-tag-dia">Pregunta ${QSTATE.index + 1} de ${QUIZ_L9.length}</span>
                <span class="es-q-counter">Aciertos: ${QSTATE.score}</span>
            </div>
            <div class="es-progress-bar-wrap" style="margin-bottom:1.1rem;">
                <div class="es-progress-bar" style="width:${pct}%;"></div>
            </div>
            <h3 class="es-quiz-question">${esc(q.pregunta)}</h3>
            <div class="es-quiz-options">
                ${q.opciones.map((opt, idx) => `
                    <button type="button" class="es-quiz-opt" data-quiz-opt="${idx}">
                        <span class="es-quiz-letter">${String.fromCharCode(65 + idx)}</span>
                        <span>${esc(opt)}</span>
                    </button>
                `).join('')}
            </div>
            <div id="esQuizFeedback" class="es-quiz-feedback" style="display:none;"></div>
            <div id="esQuizNextWrap" style="display:none; margin-top:1rem; justify-content:flex-end;">
                <button type="button" id="esQuizNextBtn" class="es-btn-gold" style="padding:0.68rem 1.4rem; font-size:0.86rem;">
                    ${QSTATE.index + 1 < QUIZ_L9.length ? 'Siguiente pregunta <i class="fas fa-arrow-right"></i>' : 'Ver mi puntaje <i class="fas fa-trophy"></i>'}
                </button>
            </div>
        `;

        const optBtns = Array.from(body.querySelectorAll('[data-quiz-opt]'));
        optBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (QSTATE.answered) return;
                QSTATE.answered = true;
                const chosen = parseInt(btn.getAttribute('data-quiz-opt'), 10);
                const isRight = chosen === q.correcta;
                if (isRight) QSTATE.score++;

                optBtns.forEach((b, i) => {
                    b.disabled = true;
                    if (i === q.correcta) b.classList.add('correct');
                    else if (i === chosen && !isRight) b.classList.add('wrong');
                });

                const fb = document.getElementById('esQuizFeedback');
                if (fb) {
                    fb.className = `es-quiz-feedback ${isRight ? 'is-ok' : 'is-err'}`;
                    fb.innerHTML = `<strong>${isRight ? '✅ ¡Correcto!' : '💡 Respuesta bíblica:'}</strong> ${esc(q.explicacion)}`;
                    fb.style.display = 'block';
                }

                const nextWrap = document.getElementById('esQuizNextWrap');
                if (nextWrap) nextWrap.style.display = 'flex';
            });
        });

        const nextBtn = document.getElementById('esQuizNextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                QSTATE.answered = false;
                if (QSTATE.index + 1 < QUIZ_L9.length) {
                    QSTATE.index++;
                } else {
                    QSTATE.finished = true;
                }
                renderQuiz();
            });
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        renderTextosClave();
        renderQuiz();
    });
})();
