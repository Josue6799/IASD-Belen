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

    // Exponer al ámbito global para compatibilidad con data-csp-click
    window.navegarTeologia = navegarTeologia;
    window.toggleFaqTeologia = toggleFaqTeologia;

    console.log('✅ Módulo de Teología Avanzada (Páginas Dedicadas) cargado correctamente.');
})();
