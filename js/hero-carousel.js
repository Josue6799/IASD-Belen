(function () {
    'use strict';

    function initHeroCarousel() {
        const root = document.getElementById('heroParallax');
        if (!root) return;

        const slides = Array.from(root.querySelectorAll('.hero-slide'));
        const dots = Array.from(root.querySelectorAll('.hero-dot'));
        const prevBtn = root.querySelector('.hero-arrow-prev');
        const nextBtn = root.querySelector('.hero-arrow-next');
        if (slides.length <= 1) return;

        let current = 0;
        let timer = null;
        const INTERVAL_MS = 6500;

        function goTo(index) {
            const nextIndex = (index + slides.length) % slides.length;
            if (nextIndex === current) return;

            slides[current].classList.remove('active');
            slides[current].setAttribute('aria-hidden', 'true');
            if (dots[current]) {
                dots[current].classList.remove('active');
                dots[current].setAttribute('aria-selected', 'false');
            }

            current = nextIndex;
            slides[current].classList.add('active');
            slides[current].setAttribute('aria-hidden', 'false');
            if (dots[current]) {
                dots[current].classList.add('active');
                dots[current].setAttribute('aria-selected', 'true');
            }
        }

        function startAuto() {
            stopAuto();
            timer = setInterval(() => {
                const homePage = document.getElementById('home');
                if (document.visibilityState === 'visible' && homePage && homePage.classList.contains('active')) {
                    const rect = root.getBoundingClientRect();
                    // Solo avanzar automáticamente si el carrusel está visible en pantalla (evita que suba el scroll al usuario)
                    if (rect.bottom > 80) {
                        goTo(current + 1);
                    }
                }
            }, INTERVAL_MS);
        }

        function stopAuto() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                goTo(current - 1);
                startAuto();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                goTo(current + 1);
                startAuto();
            });
        }

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                goTo(idx);
                startAuto();
            });
        });

        root.addEventListener('mouseenter', stopAuto);
        root.addEventListener('mouseleave', startAuto);

        // Soporte táctil (swipe horizontal en celular)
        let touchStartX = 0;
        let touchStartY = 0;
        root.addEventListener('touchstart', (e) => {
            if (!e.touches || !e.touches[0]) return;
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            stopAuto();
        }, { passive: true });

        root.addEventListener('touchend', (e) => {
            if (!e.changedTouches || !e.changedTouches[0]) {
                startAuto();
                return;
            }
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
                if (dx < 0) goTo(current + 1);
                else goTo(current - 1);
            }
            startAuto();
        }, { passive: true });

        startAuto();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeroCarousel);
    } else {
        initHeroCarousel();
    }
})();
