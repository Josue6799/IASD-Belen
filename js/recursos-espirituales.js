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
        }
    };

    let recursoActualUrl = '';

    // Función principal para abrir un recurso
    function abrirRecursoEspiritual(id) {
        const config = RECURSOS_CONFIG[id];
        if (!config) {
            console.warn(`⚠️ Recurso "${id}" no reconocido.`);
            return;
        }

        // Si es una página interna SPA (Salud o Plan Lectura)
        if (config.page) {
            if (typeof window.showPage === 'function') {
                window.showPage(config.page);
            }
            return;
        }

        // Si se abre directo en una nueva pestaña (Folleto o Devocional)
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

        let leidos = {};
        try {
            const raw = localStorage.getItem('iasd_plan_lectura_leidos');
            if (raw) leidos = JSON.parse(raw);
        } catch (e) {}

        leidos[diaId] = cb.checked;
        localStorage.setItem('iasd_plan_lectura_leidos', JSON.stringify(leidos));

        actualizarProgresoLecturaGlobal();
    }

    // Calcular y actualizar el progreso global de lectura bíblica
    function actualizarProgresoLecturaGlobal() {
        let leidos = {};
        try {
            const raw = localStorage.getItem('iasd_plan_lectura_leidos');
            if (raw) leidos = JSON.parse(raw);
        } catch (e) {}

        const totalCheckboxes = document.querySelectorAll('.plan-checkbox');
        if (totalCheckboxes.length === 0) return;

        let contCheck = 0;
        totalCheckboxes.forEach(cb => {
            if (leidos[cb.id]) {
                cb.checked = true;
                contCheck++;
            }
        });

        const porcentaje = Math.round((contCheck / 365) * 100);
        const progressBar = document.getElementById('progresoPlanLecturaBar');
        const progressText = document.getElementById('progresoPlanLecturaTexto');

        if (progressBar) progressBar.style.width = `${porcentaje}%`;
        if (progressText) progressText.innerText = `${contCheck} de 365 días leídos (${porcentaje}%)`;
    }

    // Cargar progreso guardado al cargar el DOM
    document.addEventListener('DOMContentLoaded', () => {
        actualizarProgresoLecturaGlobal();

        const modal = document.getElementById('modalRecursoEspiritual');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    cerrarModalRecursoEspiritual();
                }
            });
        }
    });

    // Registrar funciones globales para el delegador CSP
    window.abrirRecursoEspiritual = abrirRecursoEspiritual;
    window.abrirRecursoExternoDirecto = abrirRecursoExternoDirecto;
    window.cerrarModalRecursoEspiritual = cerrarModalRecursoEspiritual;
    window.toggleVersiculoSalud = toggleVersiculoSalud;
    window.cambiarMesPlanLectura = cambiarMesPlanLectura;
    window.marcarDiaLectura = marcarDiaLectura;
})();
