/* ========================================
   MÓDULO DE ANIMACIONES Y MICRO-INTERACCIONES
   Iglesia IASD Belén · JavaScript Vanilla
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initScrollRevealObserver();
    initButtonRippleEffect();
    initInteractiveCardStagger();
});

/* ==================== 2. INTERSECTION OBSERVER (SCROLL REVEAL) ==================== */
function initScrollRevealObserver() {
    // Buscar elementos para revelar al scroll
    const selectorsToReveal = [
        '.reveal',
        '.section-header',
        '.club-card',
        '.doctrina-card',
        '.creencia-card',
        '.anuncio-card',
        '.diezmo-card',
        '.historia-card',
        '.tabla-wrapper'
    ];

    const elementsToReveal = document.querySelectorAll(selectorsToReveal.join(', '));

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -40px 0px',
            threshold: 0.12
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target); // Animación de entrada única por sesión
                }
            });
        }, observerOptions);

        elementsToReveal.forEach(el => {
            if (!el.classList.contains('reveal')) {
                el.classList.add('reveal');
            }
            revealObserver.observe(el);
        });
    } else {
        // Fallback para navegadores antiguos
        elementsToReveal.forEach(el => el.classList.add('reveal-active'));
    }
}

/* ==================== 3. RIPPLE EFFECT EN BOTONES ==================== */
function initButtonRippleEffect() {
    document.addEventListener('click', (e) => {
        const targetBtn = e.target.closest('button, .btn, .nav-btn, .btn-primary, .btn-ver-candado, .btn-publicar-anuncio, .btn-flotante-envivo');
        if (!targetBtn) return;

        // Crear elemento de onda (ripple)
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-circle');

        const rect = targetBtn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        // Limpiar ripples antiguos
        const oldRipple = targetBtn.querySelector('.ripple-circle');
        if (oldRipple) oldRipple.remove();

        targetBtn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 650);
    });
}

/* ==================== 4. ESCALONAMIENTO AUTOMÁTICO EN CONTENEDORES DE TARJETAS ==================== */
function initInteractiveCardStagger() {
    const cardGrids = document.querySelectorAll('.grid-clubes, .grid-creencias, .grid-doctrinas, .grid-anuncios, .grid-diezmo');
    cardGrids.forEach(grid => {
        grid.classList.add('reveal-stagger');
    });
}
