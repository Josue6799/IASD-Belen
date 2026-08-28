/**
 * Lógica de Recursos Espirituales (Fases 2, 3 y 4)
 * IASD Belén · Iglesia Adventista del Séptimo Día
 */

(function () {
    'use strict';

    // Mapeo de URLs y configuración de los recursos
    const RECURSOS_CONFIG = {
        logos: {
            titulo: 'Biblia Interlineal (Logos)',
            icono: 'fas fa-search',
            url: 'https://www.logosklogos.com/interlinears/AT/Gn',
            modal: false
        },
        himnario: {
            titulo: 'Himnario Nuevo Adventista',
            icono: 'fas fa-music',
            url: 'https://www.nuevohimnario.com/',
            modal: false
        },
        folleto: {
            titulo: 'Folleto de Escuela Sabática',
            icono: 'fas fa-calendar-alt',
            url: 'https://files.recursos-biblicos.com/Escuela%20Sabatica/Leccion/3er2026/LeccionEscuelaSabatica_3erTrim2026.pdf',
            modal: false
        },
        devocional: {
            titulo: 'Devocional Diario Adventista',
            icono: 'fas fa-hands-praying',
            url: 'https://matutinaadventista.com/',
            modal: false
        },
        salud: {
            titulo: 'Salud y Bienestar (NEWSTART)',
            icono: 'fas fa-heart-pulse',
            page: 'salud'
        },
        planlectura: {
            titulo: 'Plan de Lectura Bíblica (365 Días)',
            icono: 'fas fa-bible',
            page: 'planlectura'
        },
        biblia: {
            titulo: 'Santa Biblia',
            icono: 'fas fa-book-bible',
            url: 'https://www.bible.com/es/bible/149/GEN.1.RVR1960',
            modal: false
        },
        comentarios: {
            titulo: 'Biblia con Comentarios',
            icono: 'fas fa-book-open',
            url: 'https://adventista7.com/biblia/',
            modal: false
        },
        creencias: {
            titulo: 'Las 28 Creencias Interactivas',
            icono: 'fas fa-cross',
            url: 'https://proyecto-biblia-fe2b5.web.app/',
            modal: false
        }
    };

    let recursoActualUrl = '';

    // ========================================================
    // ARRAY DE VERSÍCULOS DEL DÍA (BÍBLICOS RVR1960)
    // ========================================================
    const VERSICULOS_DEL_DIA = [
        {
            texto: 'Todo lo puedo en Cristo que me fortalece.',
            ref: 'Filipenses 4:13',
            url: 'https://www.bible.com/es/bible/149/PHP.4.13.RVR1960'
        },
        {
            texto: 'Jehová es mi pastor; nada me faltará. En lugares de delicados pastos me hará descansar; junto a aguas de reposo me pastoreará.',
            ref: 'Salmos 23:1-2',
            url: 'https://www.bible.com/es/bible/149/PSA.23.1-2.RVR1960'
        },
        {
            texto: 'Mira que te mando que te esfuerces y seas valiente; no temas ni desmayes, porque Jehová tu Dios estará contigo en dondequiera que vayas.',
            ref: 'Josué 1:9',
            url: 'https://www.bible.com/es/bible/149/JOS.1.9.RVR1960'
        },
        {
            texto: 'Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis.',
            ref: 'Jeremías 29:11',
            url: 'https://www.bible.com/es/bible/149/JER.29.11.RVR1960'
        },
        {
            texto: 'Fíate de Jehová de todo tu corazón, y no te apoyes en tu propia prudencia. Reconócelo en todos tus caminos, y él enderezará tus veredas.',
            ref: 'Proverbios 3:5-6',
            url: 'https://www.bible.com/es/bible/149/PRO.3.5-6.RVR1960'
        },
        {
            texto: 'Pero los que esperan a Jehová tendrán nuevas fuerzas; levantarán alas como las águilas; correrán, y no se cansarán; caminarán, y no se fatigarán.',
            ref: 'Isaías 40:31',
            url: 'https://www.bible.com/es/bible/149/ISA.40.31.RVR1960'
        },
        {
            texto: 'La paz os dejo, mi paz os doy; yo no os la doy como el mundo la da. No se turbe vuestro corazón, ni tenga miedo.',
            ref: 'Juan 14:27',
            url: 'https://www.bible.com/es/bible/149/JHN.14.27.RVR1960'
        },
        {
            texto: 'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien, esto es, a los que conforme a su propósito son llamados.',
            ref: 'Romanos 8:28',
            url: 'https://www.bible.com/es/bible/149/ROM.8.28.RVR1960'
        },
        {
            texto: 'Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.',
            ref: 'Mateo 11:28',
            url: 'https://www.bible.com/es/bible/149/MAT.11.28.RVR1960'
        },
        {
            texto: 'Lámpara es a mis pies tu palabra, y lumbrera a mi camino.',
            ref: 'Salmos 119:105',
            url: 'https://www.bible.com/es/bible/149/PSA.119.105.RVR1960'
        },
        {
            texto: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios que te esfuerzo; siempre te ayudaré, siempre te sustentaré con la diestra de mi justicia.',
            ref: 'Isaías 41:10',
            url: 'https://www.bible.com/es/bible/149/ISA.41.10.RVR1960'
        },
        {
            texto: 'Torre fuerte es el nombre de Jehová; a él correrá el justo, y estará levantado.',
            ref: 'Proverbios 18:10',
            url: 'https://www.bible.com/es/bible/149/PRO.18.10.RVR1960'
        },
        {
            texto: 'Por nada estéis afanosos, sino sean conocidas vuestras peticiones delante de Dios en toda oración y ruego, con acción de gracias.',
            ref: 'Filipenses 4:6',
            url: 'https://www.bible.com/es/bible/149/PHP.4.6.RVR1960'
        },
        {
            texto: 'El Señor es mi luz y mi salvación; ¿de quién temeré? Jehová es la fortaleza de mi vida; ¿de quién he de atemorizarme?',
            ref: 'Salmos 27:1',
            url: 'https://www.bible.com/es/bible/149/PSA.27.1.RVR1960'
        },
        {
            texto: 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
            ref: 'Juan 3:16',
            url: 'https://www.bible.com/es/bible/149/JHN.3.16.RVR1960'
        },
        {
            texto: 'Echando toda vuestra ansiedad sobre él, porque él tiene cuidado de vosotros.',
            ref: '1 Pedro 5:7',
            url: 'https://www.bible.com/es/bible/149/1PE.5.7.RVR1960'
        },
        {
            texto: 'Buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas.',
            ref: 'Mateo 6:33',
            url: 'https://www.bible.com/es/bible/149/MAT.6.33.RVR1960'
        },
        {
            texto: 'Gustad, y ved que es bueno Jehová; dichoso el hombre que confía en él.',
            ref: 'Salmos 34:8',
            url: 'https://www.bible.com/es/bible/149/PSA.34.8.RVR1960'
        },
        {
            texto: 'Él da esfuerzo al cansado, y multiplica las fuerzas al que no tiene ningunas.',
            ref: 'Isaías 40:29',
            url: 'https://www.bible.com/es/bible/149/ISA.40.29.RVR1960'
        },
        {
            texto: 'Si Dios es por nosotros, ¿quién contra nosotros?',
            ref: 'Romanos 8:31',
            url: 'https://www.bible.com/es/bible/149/ROM.8.31.RVR1960'
        },
        {
            texto: 'Por la misericordia de Jehová no hemos sido consumidos, porque nunca decayeron sus misericordias. Nuevas son cada mañana; grande es tu fidelidad.',
            ref: 'Lamentaciones 3:22-23',
            url: 'https://www.bible.com/es/bible/149/LAM.3.22-23.RVR1960'
        },
        {
            texto: 'Encomienda a Jehová tu camino, y confía en él; y él hará.',
            ref: 'Salmos 37:5',
            url: 'https://www.bible.com/es/bible/149/PSA.37.5.RVR1960'
        },
        {
            texto: 'Clama a mí, y yo te responderé, y te enseñaré cosas grandes y ocultas que tú no conoces.',
            ref: 'Jeremías 33:3',
            url: 'https://www.bible.com/es/bible/149/JER.33.3.RVR1960'
        },
        {
            texto: 'Dios es nuestro amparo y fortaleza, nuestro pronto auxilio en las tribulaciones.',
            ref: 'Salmos 46:1',
            url: 'https://www.bible.com/es/bible/149/PSA.46.1.RVR1960'
        },
        {
            texto: 'El amor es sufrido, es benigno; el amor no tiene envidia, el amor no es jactancioso, no se envanece; no hace nada indebido, no busca lo suyo, no se irrita, no guarda rencor.',
            ref: '1 Corintios 13:4-5',
            url: 'https://www.bible.com/es/bible/149/1CO.13.4-5.RVR1960'
        },
        {
            texto: 'Bendeciré a Jehová en todo tiempo; su alabanza estará de continuo en mi boca.',
            ref: 'Salmos 34:1',
            url: 'https://www.bible.com/es/bible/149/PSA.34.1.RVR1960'
        },
        {
            texto: 'Estad siempre gozosos. Orad sin cesar. Dad gracias en todo, porque esta es la voluntad de Dios para con vosotros en Cristo Jesús.',
            ref: '1 Tesalonicenses 5:16-18',
            url: 'https://www.bible.com/es/bible/149/1TH.5.16-18.RVR1960'
        },
        {
            texto: 'El que habita al abrigo del Altísimo morará bajo la sombra del Omnipotente. Diré yo a Jehová: Esperanza mía, y castillo mío; mi Dios, en quien confiaré.',
            ref: 'Salmos 91:1-2',
            url: 'https://www.bible.com/es/bible/149/PSA.91.1-2.RVR1960'
        },
        {
            texto: 'Acercaos a Dios, y él se acercará a vosotros.',
            ref: 'Santiago 4:8',
            url: 'https://www.bible.com/es/bible/149/JAS.4.8.RVR1960'
        },
        {
            texto: 'He aquí, yo estoy a la puerta y llamo; si alguno oye mi voz y abre la puerta, entraré a él, y cenaré con él, y él conmigo.',
            ref: 'Apocalipsis 3:20',
            url: 'https://www.bible.com/es/bible/149/REV.3.20.RVR1960'
        },
        {
            texto: 'Instruye al niño en su camino, y aun cuando fuere viejo no se apartará de él.',
            ref: 'Proverbios 22:6',
            url: 'https://www.bible.com/es/bible/149/PRO.22.6.RVR1960'
        },
        {
            texto: 'Gracia y paz os sean multiplicadas, en el conocimiento de Dios y de nuestro Señor Jesús.',
            ref: '2 Pedro 1:2',
            url: 'https://www.bible.com/es/bible/149/2PE.1.2.RVR1960'
        }
    ];

    let versiculoActual = null;

    // Obtener y mostrar el versículo correspondiente al día de hoy
    function cargarVersiculoDelDia() {
        const textoEl = document.getElementById('versiculoDiaTexto');
        const refEl = document.getElementById('versiculoDiaReferencia');
        const fechaEl = document.getElementById('versiculoDiaFecha');
        const linkEl = document.getElementById('versiculoDiaLink');

        if (!textoEl || !refEl) return;

        // Selección determinística según la fecha actual
        const hoy = new Date();
        const diasDesdeEpoca = Math.floor(Date.now() / 86400000);
        const indice = Math.abs(diasDesdeEpoca) % VERSICULOS_DEL_DIA.length;
        
        versiculoActual = VERSICULOS_DEL_DIA[indice] || VERSICULOS_DEL_DIA[0];

        textoEl.textContent = `"${versiculoActual.texto}"`;
        refEl.innerHTML = `<i class="fas fa-bookmark" style="color: var(--golden); font-size: 0.85rem;"></i> ${versiculoActual.ref}`;

        if (linkEl && versiculoActual.url) {
            linkEl.href = versiculoActual.url;
        }

        if (fechaEl) {
            try {
                const opciones = { weekday: 'long', day: 'numeric', month: 'long' };
                const fechaStr = hoy.toLocaleDateString('es-ES', opciones);
                fechaEl.textContent = fechaStr.charAt(0).toUpperCase() + fechaStr.slice(1);
            } catch (e) {
                fechaEl.textContent = hoy.toLocaleDateString();
            }
        }
    }

    // Copiar el versículo actual al portapapeles
    function copiarVersiculoDelDia() {
        if (!versiculoActual) return;
        const textoCompleto = `"${versiculoActual.texto}" — ${versiculoActual.ref} (IASD Belén)`;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(textoCompleto).then(() => {
                mostrarFeedbackBoton('btnCopiarVersiculo', '<i class="fas fa-check"></i> ¡Copiado!');
            }).catch(() => {
                fallbackCopiarTexto(textoCompleto);
            });
        } else {
            fallbackCopiarTexto(textoCompleto);
        }
    }

    function fallbackCopiarTexto(texto) {
        try {
            const tempInput = document.createElement('textarea');
            tempInput.value = texto;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            mostrarFeedbackBoton('btnCopiarVersiculo', '<i class="fas fa-check"></i> ¡Copiado!');
        } catch (e) {
            alert('Texto del versículo:\n' + texto);
        }
    }

    // Compartir mediante Web Share API si está disponible o copiar
    function compartirVersiculoDelDia() {
        if (!versiculoActual) return;
        const textoCompleto = `"${versiculoActual.texto}" — ${versiculoActual.ref}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Versículo del Día · IASD Belén',
                text: textoCompleto,
                url: window.location.href
            }).catch(() => {});
        } else {
            copiarVersiculoDelDia();
        }
    }

    function mostrarFeedbackBoton(btnId, htmlTemporal) {
        const btn = document.getElementById(btnId);
        if (!btn) return;
        const originalHtml = btn.innerHTML;
        btn.innerHTML = htmlTemporal;
        btn.style.borderColor = 'var(--golden, #c9a53b)';
        setTimeout(() => {
            btn.innerHTML = originalHtml;
            btn.style.borderColor = '';
        }, 2000);
    }

    // Función principal para abrir un recurso
    function abrirRecursoEspiritual(id) {
        const config = RECURSOS_CONFIG[id];
        if (!config) {
            console.warn(`⚠️ Recurso "${id}" no reconocido.`);
            return;
        }

        // Si es el Devocional Diario, abrir modal selector con las opciones (Leer y Ver)
        if (id === 'devocional') {
            if (typeof window.abrirModalDevocional === 'function') {
                window.abrirModalDevocional();
                return;
            }
        }

        // Si es una página interna SPA (Salud o Plan Lectura)
        if (config.page) {
            if (typeof window.showPage === 'function') {
                window.showPage(config.page);
            }
            return;
        }

        // Si se abre directo en una nueva pestaña (Folleto)
        if (!config.modal) {
            window.open(config.url, '_blank');
            return;
        }

        // Si es un recurso externo con intento de Modal iframe (Logos o Himnario)
        recursoActualUrl = config.url;
        const modal = document.getElementById('modalRecursoEspiritual');
        const tituloEl = document.getElementById('modalRecursoTitulo');
        const iframe = document.getElementById('iframeRecursoModal');
        const loader = document.getElementById('modalRecursoLoader');

        if (!modal || !iframe) {
            window.open(config.url, '_blank');
            return;
        }

        if (tituloEl) {
            tituloEl.innerHTML = `<i class="${config.icono}" style="color: var(--golden);"></i> ${config.titulo}`;
        }

        // Mostrar indicador de carga y cargar iframe
        if (loader) loader.style.display = 'flex';
        iframe.src = config.url;

        iframe.onload = function () {
            if (loader) loader.style.display = 'none';
        };

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Abrir la URL del recurso actual directamente en una nueva pestaña (fallback)
    function abrirRecursoExternoDirecto() {
        if (recursoActualUrl) {
            window.open(recursoActualUrl, '_blank');
        }
    }

    // Cerrar el modal y limpiar iframe
    function cerrarModalRecursoEspiritual() {
        const modal = document.getElementById('modalRecursoEspiritual');
        const iframe = document.getElementById('iframeRecursoModal');
        const loader = document.getElementById('modalRecursoLoader');

        if (modal) {
            modal.classList.remove('active');
        }

        if (iframe) {
            iframe.src = 'about:blank';
        }

        if (loader) {
            loader.style.display = 'none';
        }

        document.body.style.overflow = '';
        recursoActualUrl = '';
    }

    // Toggle para mostrar u ocultar versículos en la página de Salud
    function toggleVersiculoSalud(principioId) {
        const card = document.getElementById(`versiculo-${principioId}`);
        if (card) {
            const isVisible = window.getComputedStyle(card).display !== 'none';
            card.style.display = isVisible ? 'none' : 'block';
        }
    }

    // Cambio de mes en la pestaña del Plan de Lectura
    function cambiarMesPlanLectura(numMes) {
        const tabs = document.querySelectorAll('.plan-mes-tab');
        const paneles = document.querySelectorAll('.plan-mes-panel');

        tabs.forEach(t => t.classList.remove('active'));
        paneles.forEach(p => p.style.display = 'none');

        const tabActiva = document.querySelector(`.plan-mes-tab[data-mes="${numMes}"]`);
        const panelActivo = document.getElementById(`plan-mes-${numMes}`);

        if (tabActiva) tabActiva.classList.add('active');
        if (panelActivo) {
            panelActivo.style.display = 'block';
        }
    }

    // Guardar estado de lectura del día en localStorage
    function marcarDiaLectura(diaId) {
        const cb = document.getElementById(diaId);
        if (!cb) return;

        let leidos = obtenerProgresoLecturaGuardado();

        leidos[diaId] = !!cb.checked;
        guardarProgresoLectura(leidos);

        // Actualizar clase visual en el label contenedor
        const labelItem = cb.closest('.plan-dia-item');
        if (labelItem) {
            labelItem.classList.toggle('completado', cb.checked);
        }

        actualizarProgresoLecturaGlobal();
    }

    function obtenerProgresoLecturaGuardado() {
        let leidos = {};
        try {
            const raw = localStorage.getItem('planLecturaProgreso') || localStorage.getItem('iasd_plan_lectura_leidos');
            if (raw) leidos = JSON.parse(raw);
        } catch (e) {
            console.warn('⚠️ Error al leer progreso de lectura:', e);
        }
        return leidos || {};
    }

    function guardarProgresoLectura(leidos) {
        try {
            const str = JSON.stringify(leidos);
            localStorage.setItem('planLecturaProgreso', str);
            localStorage.setItem('iasd_plan_lectura_leidos', str);
        } catch (e) {
            console.warn('⚠️ Error al guardar progreso de lectura:', e);
        }
    }

    // Marcar o desmarcar todos los días del mes visible
    function marcarMesCompleto(numMes, estado) {
        const panel = document.getElementById(`plan-mes-${numMes}`);
        if (!panel) return;

        const checkboxes = panel.querySelectorAll('.plan-checkbox');
        let leidos = obtenerProgresoLecturaGuardado();

        checkboxes.forEach(cb => {
            cb.checked = estado;
            leidos[cb.id] = estado;
            const labelItem = cb.closest('.plan-dia-item');
            if (labelItem) {
                labelItem.classList.toggle('completado', estado);
            }
        });

        guardarProgresoLectura(leidos);
        actualizarProgresoLecturaGlobal();
    }

    // Reiniciar todo el progreso del Plan de Lectura
    function reiniciarPlanLectura() {
        // 1. Limpiar todas las claves de persistencia local
        try {
            localStorage.removeItem('planLecturaProgreso');
            localStorage.removeItem('iasd_plan_lectura_leidos');
            localStorage.setItem('planLecturaProgreso', JSON.stringify({}));
            localStorage.setItem('iasd_plan_lectura_leidos', JSON.stringify({}));
        } catch (e) {
            console.warn('⚠️ Error al limpiar localStorage:', e);
        }

        // 2. Desmarcar todos los checkboxes en el DOM y remover estado completado
        const checkboxes = document.querySelectorAll('.plan-checkbox, input[type="checkbox"][id^="dia-"]');
        checkboxes.forEach(cb => {
            cb.checked = false;
            const labelItem = cb.closest('.plan-dia-item');
            if (labelItem) {
                labelItem.classList.remove('completado');
            }
        });

        // 3. Reiniciar barra de progreso y contador visual a 0
        const progressBar = document.getElementById('progresoPlanLecturaBar');
        const progressText = document.getElementById('progresoPlanLecturaTexto');

        if (progressBar) {
            progressBar.style.width = '0%';
        }
        if (progressText) {
            progressText.innerHTML = `<strong>0</strong> de 365 días completados (0%)`;
        }

        // 4. Feedback visual breve en el botón de reinicio
        const btn = document.getElementById('btnReiniciarPlanLectura');
        if (btn) {
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-check"></i> ¡Reiniciado!';
            btn.style.pointerEvents = 'none';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.pointerEvents = '';
            }, 1500);
        }
    }

    // Calcular y actualizar el progreso global de lectura bíblica
    function actualizarProgresoLecturaGlobal() {
        const leidos = obtenerProgresoLecturaGuardado();
        const totalCheckboxes = document.querySelectorAll('.plan-checkbox');
        if (totalCheckboxes.length === 0) return;

        let contCheck = 0;
        totalCheckboxes.forEach(cb => {
            const isChecked = !!leidos[cb.id];
            cb.checked = isChecked;
            if (isChecked) contCheck++;

            const labelItem = cb.closest('.plan-dia-item');
            if (labelItem) {
                labelItem.classList.toggle('completado', isChecked);
            }
        });

        const totalDias = 365;
        const porcentaje = Math.round((contCheck / totalDias) * 100);
        const progressBar = document.getElementById('progresoPlanLecturaBar');
        const progressText = document.getElementById('progresoPlanLecturaTexto');

        if (progressBar) progressBar.style.width = `${porcentaje}%`;
        if (progressText) {
            progressText.innerHTML = `<strong>${contCheck}</strong> de ${totalDias} días completados (${porcentaje}%)`;
        }
    }

    // Cargar progreso guardado al cargar el DOM
    document.addEventListener('DOMContentLoaded', () => {
        cargarVersiculoDelDia();
        actualizarProgresoLecturaGlobal();

        // Delegación adicional para eventos de cambio en checkboxes
        document.addEventListener('change', (e) => {
            if (e.target && e.target.classList && e.target.classList.contains('plan-checkbox')) {
                marcarDiaLectura(e.target.id);
            }
        });

        const modal = document.getElementById('modalRecursoEspiritual');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    cerrarModalRecursoEspiritual();
                }
            });
        }
    });

    // Escuchar eventos de cambio de página del router
    window.addEventListener('pageChanged', (e) => {
        if (e.detail && e.detail.pageId === 'planlectura') {
            actualizarProgresoLecturaGlobal();
        } else if (e.detail && e.detail.pageId === 'home') {
            cargarVersiculoDelDia();
        }
    });

    // Registrar funciones globales para el delegador CSP
    window.abrirRecursoEspiritual = abrirRecursoEspiritual;
    window.abrirRecurso = abrirRecursoEspiritual;
    window.abrirRecursoExternoDirecto = abrirRecursoExternoDirecto;
    window.cerrarModalRecursoEspiritual = cerrarModalRecursoEspiritual;
    window.toggleVersiculoSalud = toggleVersiculoSalud;
    window.cambiarMesPlanLectura = cambiarMesPlanLectura;
    window.marcarDiaLectura = marcarDiaLectura;
    window.marcarMesCompleto = marcarMesCompleto;
    window.reiniciarPlanLectura = reiniciarPlanLectura;
    window.actualizarProgresoLecturaGlobal = actualizarProgresoLecturaGlobal;
    window.cargarVersiculoDelDia = cargarVersiculoDelDia;
    window.copiarVersiculoDelDia = copiarVersiculoDelDia;
    window.compartirVersiculoDelDia = compartirVersiculoDelDia;
})();
