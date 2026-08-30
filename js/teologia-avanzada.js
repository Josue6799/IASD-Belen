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

    // Exponer al ámbito global para compatibilidad con data-csp-click
    window.navegarTeologia = navegarTeologia;
    window.toggleFaqTeologia = toggleFaqTeologia;
    window.toggleAcordeonSabado = toggleAcordeonSabado;
    window.toggleTodosArgumentosSabado = toggleTodosArgumentosSabado;
    window.filtrarSiglosSabado = filtrarSiglosSabado;
    window.toggleAcordeonSantuario = toggleAcordeonSantuario;
    window.toggleTodosArgumentosSantuario = toggleTodosArgumentosSantuario;
    window.filtrarMobiliarioSantuario = filtrarMobiliarioSantuario;

    console.log('✅ Módulo de Teología Avanzada (Páginas Dedicadas e Interactivas) cargado correctamente.');
})();
