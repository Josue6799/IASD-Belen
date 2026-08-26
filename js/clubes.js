/**
 * ClubesManager - Módulo de Efectos Visuales Avanzados para la Sección de Clubes
 * (Aventureros, Conquistadores, Guías Mayores)
 * IASD Belén · Iglesia Adventista del Séptimo Día
 * 
 * Efectos Implementados:
 * 1. Hero Cinematográfico con Partículas Doradas en Canvas
 * 2. Tarjetas con Inclinación 3D (Tilt) y Glow Neón Dinámico
 * 3. Desenrollado Interactivo de Pergaminos (Himno y Ley)
 * 4. Animación de Formas Orgánicas (Blobs)
 */

const ClubesManager = (function () {
    'use strict';

    let _particleCanvases = {};
    let _animationFrameId = null;
    let _tiltInitialized = false;

    /**
     * Sistema de Partículas Doradas en Canvas
     */
    class ParticleEngine {
        constructor(canvasId) {
            this.canvas = document.getElementById(canvasId);
            if (!this.canvas) return;
            this.ctx = this.canvas.getContext('2d');
            this.particles = [];
            this.isRunning = false;
            this.width = 0;
            this.height = 0;
            this.resizeHandler = this.resize.bind(this);
            this.init();
        }

        init() {
            this.resize();
            window.addEventListener('resize', this.resizeHandler);
            this.createParticles(45);
        }

        resize() {
            if (!this.canvas) return;
            const rect = this.canvas.parentElement.getBoundingClientRect();
            this.width = this.canvas.width = rect.width;
            this.height = this.canvas.height = rect.height;
        }

        createParticles(count) {
            this.particles = [];
            for (let i = 0; i < count; i++) {
                this.particles.push({
                    x: Math.random() * this.width,
                    y: Math.random() * this.height,
                    radius: Math.random() * 2.2 + 0.8,
                    speedY: -(Math.random() * 0.45 + 0.15),
                    speedX: (Math.random() - 0.5) * 0.35,
                    opacity: Math.random() * 0.65 + 0.25,
                    pulseSpeed: Math.random() * 0.02 + 0.01,
                    pulseVal: Math.random() * Math.PI,
                    color: Math.random() > 0.4 ? '#fde047' : '#f59e0b'
                });
            }
        }

        update() {
            if (!this.ctx || !this.canvas) return;
            this.ctx.clearRect(0, 0, this.width, this.height);

            for (let i = 0; i < this.particles.length; i++) {
                const p = this.particles[i];
                p.y += p.speedY;
                p.x += p.speedX;
                p.pulseVal += p.pulseSpeed;

                const currentOpacity = p.opacity + Math.sin(p.pulseVal) * 0.2;
                const safeOpacity = Math.max(0.1, Math.min(0.9, currentOpacity));

                if (p.y < -10) {
                    p.y = this.height + 10;
                    p.x = Math.random() * this.width;
                }
                if (p.x < -10) p.x = this.width + 10;
                if (p.x > this.width + 10) p.x = -10;

                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = safeOpacity;
                this.ctx.shadowBlur = 8;
                this.ctx.shadowColor = '#f59e0b';
                this.ctx.fill();
            }
            this.ctx.globalAlpha = 1;
            this.ctx.shadowBlur = 0;
        }

        destroy() {
            window.removeEventListener('resize', this.resizeHandler);
        }
    }

    /**
     * Loop global de animación para todos los canvas activos
     */
    function _startAnimationLoop() {
        if (_animationFrameId) cancelAnimationFrame(_animationFrameId);

        function loop() {
            for (const key in _particleCanvases) {
                if (_particleCanvases[key]) {
                    _particleCanvases[key].update();
                }
            }
            _animationFrameId = requestAnimationFrame(loop);
        }
        loop();
    }

    /**
     * Inicializar o redimensionar canvas de partículas del club actual
     */
    function initParticles(clubId) {
        const canvasId = `canvas-particles-${clubId}`;
        const canvasEl = document.getElementById(canvasId);
        if (!canvasEl) return;

        if (!_particleCanvases[clubId]) {
            _particleCanvases[clubId] = new ParticleEngine(canvasId);
        } else {
            _particleCanvases[clubId].resize();
        }

        _startAnimationLoop();
    }

    /**
     * Inicializar tarjetas con Efecto 3D Tilt y Glow Dinámico
     */
    function initTiltCards() {
        // En dispositivos móviles pequeños desactivamos el tilt pesado por rendimiento
        const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
        const tiltCards = document.querySelectorAll('.tilt-card');

        tiltCards.forEach(card => {
            if (card._tiltAttached) return;
            card._tiltAttached = true;

            if (isTouchDevice) {
                // En móvil sólo aplicamos estilos estáticos refinados
                return;
            }

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -9; // Máx 9 grados
                const rotateY = ((x - centerX) / centerX) * 9;

                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

                // Posición del glow dinámico
                const glowX = ((x / rect.width) * 100).toFixed(1) + '%';
                const glowY = ((y / rect.height) * 100).toFixed(1) + '%';
                card.style.setProperty('--glow-x', glowX);
                card.style.setProperty('--glow-y', glowY);
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            });

            card.addEventListener('mouseenter', () => {
                card.style.transition = 'none';
            });
        });

        _tiltInitialized = true;
    }

    /**
     * Alternar estado abierto/cerrado de un Pergamino (Himno o Ley)
     */
    function togglePergamino(pergaminoId) {
        const card = document.getElementById(pergaminoId);
        if (!card) return;

        const estaAbierto = card.classList.contains('abierto');
        const btnAction = card.querySelector('.pergamino-btn-action span');

        if (estaAbierto) {
            card.classList.remove('abierto');
            if (btnAction) btnAction.textContent = 'Desenrollar';
        } else {
            card.classList.add('abierto');
            if (btnAction) btnAction.textContent = 'Enrollar';
        }
    }

    /**
     * Desplazamiento suave hacia subsecciones dentro de la página del club
     */
    function scrollToSection(targetId) {
        const el = document.getElementById(targetId);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Inicializar todo cuando se muestra una página de club
     */
    function initClubPage(clubId) {
        setTimeout(() => {
            initParticles(clubId);
            initTiltCards();
        }, 100);
    }

    // Inicialización global al cargar DOM
    document.addEventListener('DOMContentLoaded', () => {
        initTiltCards();
    });

    return {
        initClubPage,
        initParticles,
        initTiltCards,
        togglePergamino,
        scrollToSection
    };
})();

// Exponer en window para compatibilidad con data-csp-click
window.ClubesManager = ClubesManager;
