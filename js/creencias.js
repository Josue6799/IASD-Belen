/* ========================================
   GESTOR DE LAS 28 CREENCIAS ADVENTISTAS
   IASD Belén · Iglesia Adventista
   Búsqueda Avanzada con Autocompletado, Resaltado Dorado,
   Filtros Combinados (Categoría + Keyword) y Modo Historia
   ======================================== */

const CreenciasManager = {
    currentCategory: 'todas',
    currentSearch: '',
    currentStoryIndex: 0,
    visibleCards: [],
    beliefsData: [],
    autocompleteIndex: -1,

    // Metadatos de categorías para sincronización y visualización
    categorias: {
        todas: { nombre: 'Todas las Creencias', count: 28, range: '1-28', color: 'var(--golden)', icon: 'fa-th-large' },
        dios: { nombre: 'Dios', count: 6, range: '1-6', color: '#1976d2', icon: 'fa-sun' },
        hombre: { nombre: 'El Hombre', count: 1, range: '7', color: '#2e7d32', icon: 'fa-user' },
        salvacion: { nombre: 'La Salvación', count: 4, range: '8-11', color: '#c99d3b', icon: 'fa-heart' },
        iglesia: { nombre: 'La Iglesia', count: 7, range: '12-18', color: '#7b1fa2', icon: 'fa-church' },
        vida: { nombre: 'La Vida Cristiana', count: 5, range: '19-23', color: '#0284c7', icon: 'fa-seedling' },
        final: { nombre: 'Acontecimientos Finales', count: 5, range: '24-28', color: '#c62828', icon: 'fa-hourglass-end' }
    },

    init() {
        this.cacheBeliefsData();
        this.initSearch();
        this.initEventListeners();
        this.initGamification();
        this.initTopCarousel();
        this.initWordcloud();
        this.initVersesTooltipsAndModals();
        this.applyFilters(false);
    },

    /**
     * Extrae y memoriza la estructura y textos originales de las 28 creencias
     * para permitir el resaltado seguro sin corromper el DOM ni los listeners.
     */
    cacheBeliefsData() {
        const cards = Array.from(document.querySelectorAll('#creencias .creencia-item-card'));
        this.beliefsData = cards.map(card => {
            const id = card.getAttribute('data-id') || '';
            const cat = card.getAttribute('data-categoria') || 'todas';
            const catMeta = this.categorias[cat] || this.categorias.todas;

            const frontTitleEl = card.querySelector('.creencia-front-title');
            const backTitleEl = card.querySelector('.card-back-title');
            const descEl = card.querySelector('.creencia-desc');
            const verseLis = Array.from(card.querySelectorAll('.verses-content li'));

            const titleText = frontTitleEl ? frontTitleEl.textContent.trim() : (backTitleEl ? backTitleEl.textContent.trim() : '');
            const descText = descEl ? descEl.textContent.trim() : '';
            const versesText = verseLis.map(li => li.textContent.trim()).join(' ');

            return {
                id,
                cardEl: card,
                category: cat,
                categoryName: catMeta.nombre,
                categoryIcon: catMeta.icon,
                frontTitleEl,
                frontTitleOrig: frontTitleEl ? frontTitleEl.innerHTML : '',
                backTitleEl,
                backTitleOrig: backTitleEl ? backTitleEl.innerHTML : '',
                descEl,
                descOrig: descEl ? descEl.innerHTML : '',
                verseLis,
                versesOrig: verseLis.map(li => li.innerHTML),
                titleText,
                descText,
                versesText,
                searchableText: `${titleText} ${descText} ${versesText}`.toLowerCase()
            };
        });
    },

    initSearch() {
        const inputSearch = document.getElementById('searchCreenciasInput');
        const clearBtn = document.getElementById('clearSearchCreenciasBtn');
        const autocompleteBox = document.getElementById('searchCreenciasAutocomplete');

        if (!inputSearch) return;

        // Input en tiempo real con debounce
        inputSearch.addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase().trim();
            this.currentStoryIndex = 0;
            this.autocompleteIndex = -1;

            if (clearBtn) {
                clearBtn.style.display = this.currentSearch ? 'flex' : 'none';
            }

            this.applyFilters(false);
            this.renderAutocomplete();
        });

        // Manejo de teclado para autocompletado y atajos
        inputSearch.addEventListener('keydown', (e) => {
            const items = autocompleteBox ? Array.from(autocompleteBox.querySelectorAll('.autocomplete-item')) : [];
            
            if (e.key === 'ArrowDown') {
                if (items.length > 0) {
                    e.preventDefault();
                    this.autocompleteIndex = (this.autocompleteIndex + 1) % items.length;
                    this.updateAutocompleteSelection(items);
                }
            } else if (e.key === 'ArrowUp') {
                if (items.length > 0) {
                    e.preventDefault();
                    this.autocompleteIndex = (this.autocompleteIndex - 1 + items.length) % items.length;
                    this.updateAutocompleteSelection(items);
                }
            } else if (e.key === 'Enter') {
                if (items.length > 0 && this.autocompleteIndex >= 0 && this.autocompleteIndex < items.length) {
                    e.preventDefault();
                    items[this.autocompleteIndex].click();
                } else {
                    this.closeAutocomplete();
                }
            } else if (e.key === 'Escape') {
                this.closeAutocomplete();
            }
        });

        // Cerrar autocompletado al hacer click fuera
        document.addEventListener('click', (e) => {
            const box = document.getElementById('searchCreenciasBox');
            if (box && !box.contains(e.target)) {
                this.closeAutocomplete();
            }
        });
    },

    initEventListeners() {
        // Manejar clicks en tabs, chips móviles y sidebar
        const selectors = '.creencia-tab-btn, .creencias-mobile-chip, .sidebar-nav-item';
        document.querySelectorAll(selectors).forEach(el => {
            el.addEventListener('click', (e) => {
                const btn = e.currentTarget;
                const cat = btn.getAttribute('data-cat') || 'todas';
                this.setCategory(cat, btn);
            });
        });
    },

    /**
     * Normaliza el identificador de categoría
     * @param {string} category
     * @returns {string}
     */
    normalizeCategory(category) {
        if (!category) return 'todas';
        const c = String(category).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
        if (c.includes('tod')) return 'todas';
        if (c.includes('dios')) return 'dios';
        if (c.includes('hombr')) return 'hombre';
        if (c.includes('salva')) return 'salvacion';
        if (c.includes('igles')) return 'iglesia';
        if (c.includes('vida')) return 'vida';
        if (c.includes('fin') || c.includes('acontec')) return 'final';
        return c;
    },

    /**
     * Establece la categoría activa y sincroniza todos los controles de navegación
     * @param {string} category 
     * @param {HTMLElement} [activeBtn]
     */
    setCategory(category, activeBtn) {
        this.currentCategory = this.normalizeCategory(category);
        this.currentStoryIndex = 0;

        // 1. Sincronizar Pestañas Superiores (Tabs)
        document.querySelectorAll('.creencia-tab-btn').forEach(b => {
            const cat = this.normalizeCategory(b.getAttribute('data-cat'));
            b.classList.toggle('active', cat === this.currentCategory);
        });

        // 2. Sincronizar Barra Lateral Sticky (Sidebar Desktop)
        document.querySelectorAll('.sidebar-nav-item').forEach(b => {
            const cat = this.normalizeCategory(b.getAttribute('data-cat'));
            b.classList.toggle('active', cat === this.currentCategory);
        });

        // 3. Sincronizar Franja Sticky Móvil (Chips)
        document.querySelectorAll('.creencias-mobile-chip').forEach(b => {
            const cat = this.normalizeCategory(b.getAttribute('data-cat'));
            const isActive = cat === this.currentCategory;
            b.classList.toggle('active', isActive);
            if (isActive && b.scrollIntoView) {
                b.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }
        });

        this.applyFilters(false);
    },

    /**
     * Resalta de manera segura las ocurrencias de búsqueda en un string de texto
     * @param {string} text 
     * @param {string} query 
     * @returns {string}
     */
    highlightHtml(text, query) {
        if (!query || !text) return text;
        const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(${escapedQuery})`, 'gi');
        return text.replace(regex, '<mark class="resaltado-creencia">$1</mark>');
    },

    /**
     * Extrae un extracto de texto que contiene la coincidencia para el autocompletado
     * @param {string} fullText 
     * @param {string} query 
     * @returns {string}
     */
    getSnippet(fullText, query) {
        if (!fullText || !query) return '';
        const lower = fullText.toLowerCase();
        const idx = lower.indexOf(query);
        if (idx === -1) {
            return fullText.length > 90 ? fullText.substring(0, 90) + '...' : fullText;
        }
        const start = Math.max(0, idx - 30);
        const end = Math.min(fullText.length, idx + query.length + 50);
        let snippet = fullText.substring(start, end);
        if (start > 0) snippet = '...' + snippet;
        if (end < fullText.length) snippet = snippet + '...';
        return this.highlightHtml(snippet, query);
    },

    /**
     * Renderiza el menú desplegable de autocompletado debajo del buscador
     */
    renderAutocomplete() {
        const autocompleteBox = document.getElementById('searchCreenciasAutocomplete');
        if (!autocompleteBox) return;

        if (!this.currentSearch || this.currentSearch.length < 1) {
            this.closeAutocomplete();
            return;
        }

        // Buscar coincidencias
        const matches = this.beliefsData.filter(b => b.searchableText.includes(this.currentSearch));

        if (matches.length === 0) {
            autocompleteBox.innerHTML = `
                <div class="autocomplete-empty">
                    <i class="fas fa-info-circle"></i> No se encontraron sugerencias para "<strong>${this.escapeHTML(this.currentSearch)}</strong>"
                </div>
            `;
            autocompleteBox.style.display = 'block';
            return;
        }

        // Tomar hasta 5 sugerencias destacadas
        const topMatches = matches.slice(0, 5);
        let html = '';

        topMatches.forEach(b => {
            const highlightedTitle = this.highlightHtml(b.titleText, this.currentSearch);
            let snippet = '';

            if (b.descText.toLowerCase().includes(this.currentSearch)) {
                snippet = this.getSnippet(b.descText, this.currentSearch);
            } else if (b.versesText.toLowerCase().includes(this.currentSearch)) {
                snippet = this.getSnippet(b.versesText, this.currentSearch);
            } else {
                snippet = b.descText.length > 90 ? b.descText.substring(0, 90) + '...' : b.descText;
            }

            html += `
                <div class="autocomplete-item" data-id="${b.id}" data-csp-click="CreenciasManager.selectSuggestion('${b.id}')" role="option">
                    <div class="autocomplete-item-header">
                        <div class="autocomplete-badges">
                            <span class="autocomplete-num-badge">Creencia ${b.id}</span>
                            <span class="autocomplete-cat-tag"><i class="fas ${b.categoryIcon}"></i> ${b.categoryName}</span>
                        </div>
                    </div>
                    <div class="autocomplete-title">${highlightedTitle}</div>
                    <div class="autocomplete-snippet">${snippet}</div>
                </div>
            `;
        });

        autocompleteBox.innerHTML = html;
        autocompleteBox.style.display = 'block';
    },

    updateAutocompleteSelection(items) {
        items.forEach((item, idx) => {
            item.classList.toggle('active-keyboard', idx === this.autocompleteIndex);
            if (idx === this.autocompleteIndex) {
                item.scrollIntoView({ block: 'nearest' });
            }
        });
    },

    closeAutocomplete() {
        const autocompleteBox = document.getElementById('searchCreenciasAutocomplete');
        if (autocompleteBox) {
            autocompleteBox.style.display = 'none';
        }
        this.autocompleteIndex = -1;
    },

    /**
     * Acción al seleccionar una sugerencia del autocompletado
     * @param {number|string} id 
     */
    selectSuggestion(id) {
        const belief = this.beliefsData.find(b => String(b.id) === String(id));
        if (!belief) return;

        const inputSearch = document.getElementById('searchCreenciasInput');
        if (inputSearch) {
            inputSearch.value = belief.titleText;
            this.currentSearch = belief.titleText.toLowerCase();
        }

        // Si la categoría actual es diferente a la de la creencia, sincronizar a todas para mostrarla
        if (this.currentCategory !== 'todas' && this.currentCategory !== belief.category) {
            this.setCategory('todas');
        } else {
            this.applyFilters(false);
        }

        this.closeAutocomplete();

        // Navegar suavemente hacia la tarjeta
        setTimeout(() => {
            this.irACreencia(id);
        }, 80);
    },

    /**
     * Limpia la caja de búsqueda y restablece los filtros
     */
    clearSearch() {
        const inputSearch = document.getElementById('searchCreenciasInput');
        const clearBtn = document.getElementById('clearSearchCreenciasBtn');

        if (inputSearch) {
            inputSearch.value = '';
            inputSearch.focus();
        }
        if (clearBtn) {
            clearBtn.style.display = 'none';
        }

        this.currentSearch = '';
        this.closeAutocomplete();
        this.applyFilters(false);
    },

    /**
     * Aplica el filtrado combinado por categoría y texto, resaltando coincidencias en dorado
     * y atenuando o mostrando las tarjetas según la intersección de filtros.
     * @param {boolean} [scrollToCurrent=false]
     */
    applyFilters(scrollToCurrent = false) {
        if (this.beliefsData.length === 0) {
            this.cacheBeliefsData();
        }

        this.visibleCards = [];
        const hasSearch = Boolean(this.currentSearch && this.currentSearch.length > 0);

        this.beliefsData.forEach(b => {
            const matchesCategory = (this.currentCategory === 'todas' || b.category === this.currentCategory);
            const matchesSearch = (!hasSearch || b.searchableText.includes(this.currentSearch));

            // Intersección obligatoria: coincide con la categoría Y coincide con la palabra buscada
            if (matchesCategory && matchesSearch) {
                b.cardEl.style.display = 'block';
                b.cardEl.classList.remove('atenuado');
                b.cardEl.classList.toggle('coincidencia', hasSearch);

                // Aplicar Resaltado Dorado a los textos
                if (hasSearch) {
                    if (b.frontTitleEl) b.frontTitleEl.innerHTML = this.highlightHtml(b.frontTitleOrig, this.currentSearch);
                    if (b.backTitleEl) b.backTitleEl.innerHTML = this.highlightHtml(b.backTitleOrig, this.currentSearch);
                    if (b.descEl) b.descEl.innerHTML = this.highlightHtml(b.descOrig, this.currentSearch);
                    b.verseLis.forEach((li, idx) => {
                        li.innerHTML = this.highlightHtml(b.versesOrig[idx], this.currentSearch);
                    });
                } else {
                    // Restaurar HTML original
                    if (b.frontTitleEl) b.frontTitleEl.innerHTML = b.frontTitleOrig;
                    if (b.backTitleEl) b.backTitleEl.innerHTML = b.backTitleOrig;
                    if (b.descEl) b.descEl.innerHTML = b.descOrig;
                    b.verseLis.forEach((li, idx) => {
                        li.innerHTML = b.versesOrig[idx];
                    });
                }

                this.visibleCards.push(b.cardEl);
            } else {
                // Si no coincide con la categoría o la búsqueda, ocultar y limpiar resaltado
                b.cardEl.style.display = 'none';
                b.cardEl.classList.remove('coincidencia');
                b.cardEl.classList.add('atenuado');

                // Restaurar HTML original
                if (b.frontTitleEl) b.frontTitleEl.innerHTML = b.frontTitleOrig;
                if (b.backTitleEl) b.backTitleEl.innerHTML = b.backTitleOrig;
                if (b.descEl) b.descEl.innerHTML = b.descOrig;
                b.verseLis.forEach((li, idx) => {
                    li.innerHTML = b.versesOrig[idx];
                });
            }
        });

        // Asegurar que el índice de historia esté en rango válido
        if (this.currentStoryIndex >= this.visibleCards.length) {
            this.currentStoryIndex = Math.max(0, this.visibleCards.length - 1);
        }

        // Actualizar UI del Modo Historia y Sidebar Widget
        this.updateStoryUI(scrollToCurrent);

        // Manejo de mensaje cuando no hay resultados
        let noResultsEl = document.getElementById('noCreenciasResults');
        if (!noResultsEl) {
            noResultsEl = document.createElement('div');
            noResultsEl.id = 'noCreenciasResults';
            noResultsEl.className = 'no-creencias-results';
            noResultsEl.innerHTML = `
                <div class="no-results-icon"><i class="fas fa-search"></i></div>
                <h4>No se encontraron creencias</h4>
                <p>No hay coincidencias para los filtros combinados actuales.</p>
                <button type="button" class="btn-reset-filters" data-csp-click="CreenciasManager.clearSearch(); CreenciasManager.setCategory('todas');">
                    <i class="fas fa-undo"></i> Restablecer filtros y ver todas (28)
                </button>
            `;
            const grid = document.querySelector('.creencias-grid') || document.getElementById('creencias');
            if (grid) grid.appendChild(noResultsEl);
        }

        noResultsEl.style.display = this.visibleCards.length === 0 ? 'block' : 'none';
    },

    /**
     * Actualiza el contador de progreso y la barra visual del Modo Secuencial
     * @param {boolean} [shouldScroll=false]
     */
    updateStoryUI(shouldScroll = false) {
        const total = this.visibleCards.length;
        const currentCard = this.visibleCards[this.currentStoryIndex];

        const badgeEl = document.getElementById('storyCurrentBadge');
        const titleEl = document.getElementById('storyTitlePreview');
        const progressFill = document.getElementById('storyProgressBarFill');
        const sidebarCounter = document.getElementById('sidebarStoryCounter');
        const btnPrev = document.getElementById('btnStoryPrev');
        const btnNext = document.getElementById('btnStoryNext');

        if (total === 0) {
            if (badgeEl) badgeEl.textContent = '0 de 0';
            if (titleEl) titleEl.textContent = '· Sin resultados';
            if (progressFill) progressFill.style.width = '0%';
            if (sidebarCounter) sidebarCounter.textContent = 'Sin resultados';
            if (btnPrev) btnPrev.classList.add('disabled');
            if (btnNext) btnNext.classList.add('disabled');
            return;
        }

        const currentPos = this.currentStoryIndex + 1;
        const percentage = Math.round((currentPos / total) * 100);

        // Obtener título de la tarjeta actual
        let currentTitle = '';
        if (currentCard) {
            const titleNode = currentCard.querySelector('.creencia-front-title') || currentCard.querySelector('.card-back-title');
            if (titleNode) {
                currentTitle = titleNode.textContent.trim();
            }
        }

        // Actualizar Textos
        if (badgeEl) {
            badgeEl.textContent = `Creencia ${currentPos} de ${total}`;
        }
        if (titleEl) {
            titleEl.textContent = currentTitle ? `· ${currentTitle}` : '';
        }
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        if (sidebarCounter) {
            sidebarCounter.textContent = `Creencia ${currentPos} de ${total}`;
        }

        // Estados de botones
        if (btnPrev) {
            btnPrev.classList.toggle('disabled', this.currentStoryIndex === 0 && total <= 1);
        }
        if (btnNext) {
            btnNext.classList.toggle('disabled', this.currentStoryIndex === total - 1 && total <= 1);
        }

        // Scroll y resalte si fue invocado por navegación
        if (shouldScroll && currentCard) {
            document.querySelectorAll('.creencia-item-card.story-active').forEach(c => c.classList.remove('story-active'));
            currentCard.classList.add('story-active');
            currentCard.scrollIntoView({ behavior: 'smooth', block: 'center' });

            setTimeout(() => {
                currentCard.classList.remove('story-active');
            }, 1800);
        }
    },

    /**
     * Avanza a la siguiente creencia en el orden visible
     */
    siguienteCreencia() {
        if (this.visibleCards.length === 0) return;
        
        if (this.currentStoryIndex < this.visibleCards.length - 1) {
            this.currentStoryIndex++;
        } else {
            this.currentStoryIndex = 0;
        }

        this.updateStoryUI(true);
    },

    /**
     * Retrocede a la creencia anterior en el orden visible
     */
    anteriorCreencia() {
        if (this.visibleCards.length === 0) return;

        if (this.currentStoryIndex > 0) {
            this.currentStoryIndex--;
        } else {
            this.currentStoryIndex = this.visibleCards.length - 1;
        }

        this.updateStoryUI(true);
    },

    /**
     * Navega directamente a una creencia por su ID (1-28)
     * @param {number|string} id 
     */
    irACreencia(id) {
        const targetCard = document.getElementById(`creencia-card-${id}`) || document.querySelector(`.creencia-item-card[data-id="${id}"]`);
        if (!targetCard) return;

        // Si la tarjeta está oculta por categoría, restablecer a todas
        const cat = targetCard.getAttribute('data-categoria');
        if (this.currentCategory !== 'todas' && this.currentCategory !== cat) {
            this.setCategory('todas');
        }

        // Si hay una búsqueda activa y la tarjeta no coincide, limpiar búsqueda
        if (this.currentSearch) {
            this.clearSearch();
        }

        // Encontrar índice en la lista visible
        const targetIdx = this.visibleCards.indexOf(targetCard);
        if (targetIdx !== -1) {
            this.currentStoryIndex = targetIdx;
            this.updateStoryUI(true);
        } else {
            targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            targetCard.classList.add('story-active');
            setTimeout(() => targetCard.classList.remove('story-active'), 2000);
        }
    },

    /**
     * Despliega u oculta los versículos bíblicos de la cara trasera (Acordeón interactivo)
     * @param {HTMLElement} btn 
     */
    toggleVerses(btn) {
        if (!btn) return;
        const drawer = btn.nextElementSibling;
        if (!drawer) return;
        const isOpen = drawer.classList.contains('open');
        drawer.classList.toggle('open', !isOpen);
        
        const icon = btn.querySelector('.chevron-icon');
        if (icon) {
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }
        btn.setAttribute('aria-expanded', String(!isOpen));
    },

    toggleVersiculos(id) {
        const card = document.getElementById(`creencia-card-${id}`);
        if (!card) return;
        const btn = card.querySelector('.verses-btn');
        if (btn) {
            this.toggleVerses(btn);
        }
    },

    // ==========================================
    // 🎠 CARRUSEL TOP 3 CREENCIAS DESTACADAS
    // ==========================================
    carouselCurrentIndex: 0,
    carouselInterval: null,

    initTopCarousel() {
        const wrapper = document.getElementById('creenciasTopCarouselWrapper');
        if (!wrapper) return;

        this.startCarouselAutoplay();

        // Pausa de rotación automática al interactuar
        wrapper.addEventListener('mouseenter', () => this.stopCarouselAutoplay());
        wrapper.addEventListener('mouseleave', () => this.startCarouselAutoplay());

        // Soporte táctil Swipe (móviles y tablets)
        let touchStartX = 0;
        let touchEndX = 0;
        const container = document.getElementById('creenciasCarouselContainer');
        if (container) {
            container.addEventListener('touchstart', (e) => {
                if (e.touches && e.touches[0]) {
                    touchStartX = e.touches[0].clientX;
                }
                this.stopCarouselAutoplay();
            }, { passive: true });

            container.addEventListener('touchend', (e) => {
                if (e.changedTouches && e.changedTouches[0]) {
                    touchEndX = e.changedTouches[0].clientX;
                }
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 40) {
                    if (diff > 0) {
                        this.moverCarrusel(1);
                    } else {
                        this.moverCarrusel(-1);
                    }
                }
                this.startCarouselAutoplay();
            }, { passive: true });
        }
    },

    moverCarrusel(delta) {
        const slides = document.querySelectorAll('.creencias-carousel-slide');
        if (!slides.length) return;
        let nextIndex = (this.carouselCurrentIndex + delta + slides.length) % slides.length;
        this.irACarruselSlide(nextIndex);
    },

    irACarruselSlide(index) {
        this.carouselCurrentIndex = index;
        const slides = document.querySelectorAll('.creencias-carousel-slide');
        const dots = document.querySelectorAll('.carousel-dot');

        slides.forEach((slide, idx) => {
            slide.classList.toggle('active', idx === index);
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === index);
        });
    },

    startCarouselAutoplay() {
        this.stopCarouselAutoplay();
        this.carouselInterval = setInterval(() => {
            this.moverCarrusel(1);
        }, 6500);
    },

    stopCarouselAutoplay() {
        if (this.carouselInterval) {
            clearInterval(this.carouselInterval);
            this.carouselInterval = null;
        }
    },

    // ==========================================
    // ☁️ MAPA CONCEPTUAL Y NUBE DE PALABRAS
    // ==========================================
    wordcloudCollapsed: false,
    conceptosClave: [
        { id: 1, label: 'Sagradas Escrituras', weight: 1.35, cat: 'dios' },
        { id: 2, label: 'La Trinidad', weight: 1.25, cat: 'dios' },
        { id: 3, label: 'Dios el Padre', weight: 1.1, cat: 'dios' },
        { id: 4, label: 'Jesucristo (Hijo)', weight: 1.45, cat: 'dios' },
        { id: 5, label: 'Espíritu Santo', weight: 1.25, cat: 'dios' },
        { id: 6, label: 'La Creación', weight: 1.3, cat: 'dios' },
        { id: 7, label: 'Naturaleza del Hombre', weight: 1.05, cat: 'hombre' },
        { id: 8, label: 'El Gran Conflicto', weight: 1.4, cat: 'salvacion' },
        { id: 9, label: 'Vida y Muerte de Cristo', weight: 1.35, cat: 'salvacion' },
        { id: 10, label: 'Experiencia de Salvación', weight: 1.2, cat: 'salvacion' },
        { id: 11, label: 'Crecimiento en Cristo', weight: 1.1, cat: 'salvacion' },
        { id: 12, label: 'La Iglesia de Dios', weight: 1.25, cat: 'iglesia' },
        { id: 13, label: 'Remanente y Misión', weight: 1.35, cat: 'iglesia' },
        { id: 14, label: 'Unidad del Cuerpo', weight: 1.05, cat: 'iglesia' },
        { id: 15, label: 'El Bautismo', weight: 1.2, cat: 'iglesia' },
        { id: 16, label: 'La Santa Cena', weight: 1.15, cat: 'iglesia' },
        { id: 17, label: 'Dones Espirituales', weight: 1.1, cat: 'iglesia' },
        { id: 18, label: 'Don de Profecía', weight: 1.3, cat: 'iglesia' },
        { id: 19, label: 'La Ley de Dios', weight: 1.35, cat: 'vida' },
        { id: 20, label: 'El Sábado', weight: 1.5, cat: 'vida' },
        { id: 21, label: 'Mayordomía Cristiana', weight: 1.1, cat: 'vida' },
        { id: 22, label: 'Conducta Cristiana', weight: 1.15, cat: 'vida' },
        { id: 23, label: 'Matrimonio y Hogar', weight: 1.15, cat: 'vida' },
        { id: 24, label: 'Santuario Celestial', weight: 1.4, cat: 'final' },
        { id: 25, label: 'Segunda Venida de Cristo', weight: 1.5, cat: 'final' },
        { id: 26, label: 'Muerte y Resurrección', weight: 1.25, cat: 'final' },
        { id: 27, label: 'El Milenio', weight: 1.15, cat: 'final' },
        { id: 28, label: 'La Tierra Nueva', weight: 1.4, cat: 'final' }
    ],

    initWordcloud() {
        const container = document.getElementById('creenciasWordcloudTags');
        if (!container) return;

        container.innerHTML = this.conceptosClave.map(c => {
            const catMeta = this.categorias[c.cat] || this.categorias.todas;
            return `
                <button type="button" class="wordcloud-tag cat-${c.cat}" 
                    data-id="${c.id}" 
                    data-cat="${c.cat}"
                    title="Creencia #${c.id}: ${c.label} · ${catMeta.nombre}"
                    data-csp-click="CreenciasManager.irACreencia(${c.id})">
                    <span class="tag-num">#${c.id}</span>
                    <span class="tag-text">${c.label}</span>
                </button>
            `;
        }).join('');
    },

    toggleWordcloudCollapse() {
        const container = document.getElementById('creenciasWordcloudTags');
        const btn = document.getElementById('btnToggleWordcloud');
        if (!container) return;

        this.wordcloudCollapsed = !this.wordcloudCollapsed;
        container.style.display = this.wordcloudCollapsed ? 'none' : 'flex';
        if (btn) {
            btn.innerHTML = `<i class="fas fa-chevron-${this.wordcloudCollapsed ? 'down' : 'up'}"></i>`;
            btn.setAttribute('title', this.wordcloudCollapsed ? 'Desplegar Nube' : 'Plegar Nube');
        }
    },

    // ==========================================
    // 📜 LÍNEA DE TIEMPO VERTICAL DE LAS 28 CREENCIAS
    // ==========================================
    timelineAllExpanded: false,

    initTimeline() {
        const track = document.getElementById('creenciasVerticalTimelineTrack');
        if (!track) return;

        if (!this.beliefsData || this.beliefsData.length === 0) {
            this.cacheBeliefsData();
        }

        track.innerHTML = this.beliefsData.map((b) => {
            const versesHtml = b.verseLis.map(li => `<li>${li.innerHTML}</li>`).join('');
            const previewDesc = b.descText.length > 130 ? `${b.descText.substring(0, 130)}...` : b.descText;

            return `
                <div class="timeline-node cat-${b.category}" id="timeline-node-${b.id}" data-id="${b.id}">
                    <div class="timeline-marker">
                        <span class="timeline-number">${b.id}</span>
                    </div>
                    <div class="timeline-card">
                        <div class="timeline-card-header" data-csp-click="CreenciasManager.toggleTimelineCreencia('${b.id}')">
                            <div class="timeline-meta-top">
                                <span class="timeline-cat-badge"><i class="fas ${b.categoryIcon}"></i> ${b.categoryName}</span>
                                <span class="timeline-num-label">Pilar #${b.id}</span>
                            </div>
                            <h4 class="timeline-title">${b.titleText}</h4>
                            <p class="timeline-summary-preview">${previewDesc}</p>
                            <div class="timeline-expand-row">
                                <span class="timeline-expand-text"><i class="fas fa-book-open"></i> Ver fundamentos y textos bíblicos</span>
                                <i class="fas fa-chevron-down timeline-chevron"></i>
                            </div>
                        </div>
                        <div class="timeline-card-body" id="timeline-body-${b.id}" style="display: none;">
                            <p class="timeline-full-desc">${b.descText}</p>
                            <div class="timeline-verses-box">
                                <div class="timeline-verses-title"><i class="fas fa-quote-left"></i> Textos Bíblicos Clave:</div>
                                <ul class="timeline-verses-list">
                                    ${versesHtml}
                                </ul>
                            </div>
                            <div class="timeline-card-footer">
                                <button type="button" class="btn-timeline-goto" data-csp-click="CreenciasManager.irACreencia('${b.id}')">
                                    <i class="fas fa-cube"></i> Explorar en Tarjeta 3D
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    },

    toggleTimelineCreencia(id) {
        const node = document.getElementById(`timeline-node-${id}`);
        const body = document.getElementById(`timeline-body-${id}`);
        if (!body || !node) return;

        const isOpen = body.style.display !== 'none';
        body.style.display = isOpen ? 'none' : 'block';
        node.classList.toggle('expanded', !isOpen);

        const chevron = node.querySelector('.timeline-chevron');
        if (chevron) {
            chevron.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }
    },

    toggleAllTimeline() {
        this.timelineAllExpanded = !this.timelineAllExpanded;
        const nodes = document.querySelectorAll('.timeline-node');
        const btnText = document.getElementById('timelineToggleAllText');
        const btnIcon = document.querySelector('#btnTimelineToggleAll i');

        nodes.forEach(node => {
            const id = node.getAttribute('data-id');
            const body = document.getElementById(`timeline-body-${id}`);
            const chevron = node.querySelector('.timeline-chevron');
            if (body) {
                body.style.display = this.timelineAllExpanded ? 'block' : 'none';
            }
            node.classList.toggle('expanded', this.timelineAllExpanded);
            if (chevron) {
                chevron.style.transform = this.timelineAllExpanded ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });

        if (btnText) {
            btnText.textContent = this.timelineAllExpanded ? 'Plegar todas' : 'Expandir todas';
        }
        if (btnIcon) {
            btnIcon.className = this.timelineAllExpanded ? 'fas fa-compress-alt' : 'fas fa-expand-alt';
        }
    },

    // ==========================================
    // 📖 TOOLTIP Y MODAL DE TEXTOS BÍBLICOS
    // ==========================================
    initVersesTooltipsAndModals() {
        const tooltip = document.getElementById('creenciasVerseTooltip');
        const refEl = document.getElementById('tooltipVerseRef');
        const textEl = document.getElementById('tooltipVerseText');

        // Escuchar versículos en las tarjetas y en la línea de tiempo
        const attachListenersToVerses = () => {
            const verseLis = document.querySelectorAll('.verses-content li, .timeline-verses-list li');
            verseLis.forEach(li => {
                if (li.hasAttribute('data-interactive-ready')) return;
                li.setAttribute('data-interactive-ready', 'true');

                const strong = li.querySelector('strong');
                if (!strong) return;
                const refText = strong.textContent.trim();
                const rawText = li.textContent.replace(refText, '').replace(/^[—\s\-:]+/, '').trim();
                const cleanQuote = rawText.replace(/^["“”']|["“”']$/g, '');

                li.classList.add('verse-interactive-item');
                li.setAttribute('title', 'Toca para leer en modal o pasa el cursor para vista previa');

                // Desktop Hover Tooltip
                li.addEventListener('mouseenter', (e) => {
                    if (window.innerWidth <= 768) return;
                    if (!tooltip || !refEl || !textEl) return;

                    refEl.textContent = refText;
                    textEl.textContent = `"${cleanQuote}"`;
                    tooltip.style.display = 'block';

                    const rect = li.getBoundingClientRect();
                    const tooltipRect = tooltip.getBoundingClientRect();

                    let top = rect.top - tooltipRect.height - 10;
                    let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

                    if (top < 10) {
                        top = rect.bottom + 10;
                    }
                    if (left < 10) left = 10;
                    if (left + tooltipRect.width > window.innerWidth - 10) {
                        left = window.innerWidth - tooltipRect.width - 10;
                    }

                    tooltip.style.top = `${top}px`;
                    tooltip.style.left = `${left}px`;
                });

                li.addEventListener('mouseleave', () => {
                    if (tooltip) tooltip.style.display = 'none';
                });

                // Click / Tap para abrir Modal
                li.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (tooltip) tooltip.style.display = 'none';
                    CreenciasManager.abrirModalVersiculo(refText, cleanQuote);
                });
            });
        };

        attachListenersToVerses();

        // Ocultar tooltip al desplazarse
        window.addEventListener('scroll', () => {
            if (tooltip && tooltip.style.display !== 'none') {
                tooltip.style.display = 'none';
            }
        }, { passive: true });
    },

    abrirModalVersiculo(ref, texto) {
        const modal = document.getElementById('modalVersiculoCompleto');
        const refEl = document.getElementById('modalVersiculoRef');
        const textEl = document.getElementById('modalVersiculoTexto');

        if (refEl) refEl.textContent = ref || 'Texto Bíblico';
        if (textEl) textEl.textContent = texto ? `"${texto}"` : '';

        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    },

    cerrarModalVersiculo(e) {
        if (e && e.target && e.target.classList.contains('modal-versiculo-dialog')) {
            return;
        }
        const modal = document.getElementById('modalVersiculoCompleto');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    },

    // ==========================================
    // 🎮 GAMIFICACIÓN: CREENCIA DEL DÍA, PROGRESO Y QUIZ
    // ==========================================
    dailyBeliefIndex: 0,
    quizActive: false,
    quizQuestions: [],
    currentQuizIndex: 0,
    quizScore: 0,
    quizAnswered: false,

    // Banco doctrinal de preguntas bíblicas sobre las 28 creencias
    bancoPreguntas: [
        {
            pregunta: "¿Cuántos libros componen las Sagradas Escrituras dadas por inspiración divina?",
            opciones: [
                "66 libros (39 en el Antiguo Testamento y 27 en el Nuevo)",
                "73 libros incluyendo libros deuterocanónicos",
                "50 libros seleccionados en concilios",
                "12 libros proféticos principales"
            ],
            correcta: 0,
            explicacion: "Las Sagradas Escrituras abarcan el Antiguo y el Nuevo Testamento (66 libros), inspiradas por el Espíritu Santo (2 Timoteo 3:16-17)."
        },
        {
            pregunta: "¿Cuál es el día de reposo bíblico según el cuarto mandamiento y la Creación?",
            opciones: [
                "El primer día de la semana (domingo)",
                "El séptimo día de la semana (sábado)",
                "El sexto día de la semana (viernes)",
                "Cualquier día elegido según el libre criterio"
            ],
            correcta: 1,
            explicacion: "El sábado es el séptimo día de la semana, bendecido y santificado por Dios en la Creación y ordenado en el Decálogo (Éxodo 20:8-11, Génesis 2:1-3)."
        },
        {
            pregunta: "¿Cuál es la naturaleza de la muerte según las Sagradas Escrituras?",
            opciones: [
                "El alma va inmediatamente al cielo o al infierno",
                "Un estado de sueño inconsciente hasta la resurrección en la Segunda Venida",
                "Reencarnación continua en otros seres vivos",
                "Un estado temporal en un purgatorio de purificación"
            ],
            correcta: 1,
            explicacion: "La muerte es un estado inconsciente ('sueño') donde nada se sabe hasta que Cristo llame a los redimidos en la resurrección (Eclesiastés 9:5, 1 Tesalonicenses 4:13-18)."
        },
        {
            pregunta: "¿Qué ministerio ejerce actualmente Jesucristo en el Santuario Celestial?",
            opciones: [
                "Descanso definitivo sin intercesión",
                "Sumo Sacerdote, Intercesor y Juez en la fase de juicio investigador",
                "Monarca visible reinando sobre tronos terrenales",
                "Profeta itinerante en la tierra"
            ],
            correcta: 1,
            explicacion: "Jesús ministra como nuestro Sumo Sacerdote en el Lugar Santísimo del Santuario Celestial, aplicando los méritos de Su sangre (Hebreos 8:1-2, Daniel 8:14)."
        },
        {
            pregunta: "¿Cómo será la Segunda Venida de Cristo según la promesa bíblica?",
            opciones: [
                "Secreta, silenciosa e invisible para los no creyentes",
                "Literal, personal, visible y gloriosa para todo ojo humano",
                "Exclusivamente espiritual dentro del corazón de cada creyente",
                "Una metáfora poética de paz mundial política"
            ],
            correcta: 1,
            explicacion: "La Segunda Venida de Cristo será literal, audible y visible a nivel mundial: 'Todo ojo le verá' (Apocalipsis 1:7, Hechos 1:11, Mateo 24:30)."
        },
        {
            pregunta: "¿Qué simboliza el Bautismo cristiano por inmersión?",
            opciones: [
                "Un rito social para recién nacidos",
                "Muerte al pecado, perdón y resurrección a una nueva vida en Cristo",
                "Una membresía honoraria en un club cultural",
                "Una tradición sin significado teológico"
            ],
            correcta: 1,
            explicacion: "Por el bautismo confesamos públicamente nuestra fe, simbolizando la muerte al pecado y el renacimiento espiritual en Jesús (Romanos 6:3-6, Mateo 28:19-20)."
        },
        {
            pregunta: "¿Qué ordenanza de humildad instituyó Jesús antes de la Santa Cena?",
            opciones: [
                "El lavamiento de los pies como acto de servicio y amor fraternal",
                "El ayuno estricto de cuarenta días",
                "La unción sacerdotal obligatoria",
                "Una procesión formal con velas"
            ],
            correcta: 0,
            explicacion: "Jesús lavó los pies de los discípulos para enseñarnos humildad, reconciliación y servicio mutuo antes de participar de la Cena del Señor (Juan 13:1-17)."
        },
        {
            pregunta: "¿Por qué medio somos justificados y salvados según el Evangelio?",
            opciones: [
                "Por el mérito de nuestras propias buenas obras",
                "Por pura gracia mediante la fe en el sacrificio de Jesucristo",
                "Por herencia familiar o nacionalidad",
                "Por comprar indulgencias eclesiásticas"
            ],
            correcta: 1,
            explicacion: "La salvación es un don gratuito recibido por fe en Cristo, que luego produce frutos de obediencia por amor (Efesios 2:8-10, Romanos 3:24-28)."
        },
        {
            pregunta: "¿Qué don espiritual distintivo se manifestó en el ministerio de Elena G. de White?",
            opciones: [
                "El don de lenguas extáticas sin intérprete",
                "El don profético (Espíritu de Profecía), guiando a la iglesia hacia la Biblia",
                "Infalibilidad doctrinal humana",
                "Creación de nuevos evangelios"
            ],
            correcta: 1,
            explicacion: "El don de profecía es una característica bíblica de la iglesia remanente que exalta las Sagradas Escrituras (Apocalipsis 12:17, Apocalipsis 19:10)."
        },
        {
            pregunta: "¿En qué consiste el principio bíblico de la Mayordomía Cristiana?",
            opciones: [
                "Dar solo lo que sobra del presupuesto mensual",
                "Reconocer a Dios como dueño de todo, devolviendo fielmente el diezmo y ofrendas",
                "Vender obligatoriamente todas las propiedades personales",
                "Delegar las finanzas personales en intermediarios"
            ],
            correcta: 1,
            explicacion: "Somos mayordomos de Dios en tiempo, dones y recursos; devolvemos el diezmo para el sostenimiento del evangelio y ofrendas de gratitud (Malaquías 3:8-10, 1 Corintios 10:31)."
        },
        {
            pregunta: "¿Cuántas personas coeternas componen la Deidad (Trinidad)?",
            opciones: [
                "Una persona que cambia de máscaras según la época",
                "Tres personas coeternas y coiguales: Padre, Hijo y Espíritu Santo",
                "Dos personas divinas y una fuerza impersonal",
                "Únicamente el Padre celestial"
            ],
            correcta: 1,
            explicacion: "Hay un solo Dios manifestado en una unidad de tres personas coeternas: Padre, Hijo y Espíritu Santo (Mateo 28:19, 2 Corintios 13:14, Génesis 1:26)."
        },
        {
            pregunta: "¿En cuántos días literales completó Dios la Creación del mundo?",
            opciones: [
                "Seis días literales de tarde y mañana, reposando en el séptimo día sábado",
                "Millones de años a través de evolución teísta",
                "Un solo instante sin división de días",
                "Diez períodos históricos indeterminados"
            ],
            correcta: 0,
            explicacion: "En seis días Dios creó los cielos y la tierra, y en el séptimo día reposó, bendiciéndolo como memorial de Su obra creadora (Génesis 1-2, Éxodo 20:11)."
        },
        {
            pregunta: "¿En qué consiste la doctrina del Gran Conflicto?",
            opciones: [
                "Una guerra política entre potencias del mundo",
                "Una controversia cósmica entre Cristo y Satanás acerca del carácter y la ley de Dios",
                "Un dilema meramente psicológico humano",
                "Una alegoría filosófica sin trascendencia real"
            ],
            correcta: 1,
            explicacion: "Toda la humanidad está involucrada en el conflicto cósmico originado en el cielo respecto a la justicia y el amor del gobierno de Dios (Apocalipsis 12:7-9, Romanos 8:18-22)."
        },
        {
            pregunta: "¿Qué ocurrirá durante el Milenio tras la Segunda Venida de Cristo?",
            opciones: [
                "Los redimidos reinarán y juzgarán con Cristo en el cielo mientras la tierra queda desolada",
                "Habrá una segunda oportunidad de salvación en la tierra",
                "Satanás gobernará en el cielo",
                "La tierra se transformará de inmediato en el Edén"
            ],
            correcta: 0,
            explicacion: "Durante los mil años, los santos juzgan con Cristo en el cielo, la tierra queda desolada y Satanás atado por las circunstancias (Apocalipsis 20:1-10)."
        },
        {
            pregunta: "¿Cuál es la promesa de Dios para la Tierra Nueva al finalizar el gran conflicto?",
            opciones: [
                "Una tierra purificada donde no habrá más llanto, dolor ni muerte, y Dios morará con Su pueblo",
                "La aniquilación total del universo físico sin restauración",
                "El regreso cíclico del pecado cada mil años",
                "Una existencia incorpórea flotando entre nubes"
            ],
            correcta: 0,
            explicacion: "Dios enjugará toda lágrima: morará con los redimidos en la Tierra Nueva en perfecta armonía y justicia eterna (Apocalipsis 21:1-4, 2 Pedro 3:13)."
        },
        {
            pregunta: "¿Qué papel desempeñan los Diez Mandamientos en la vida del cristiano?",
            opciones: [
                "Fueron abolidos totalmente en la cruz",
                "Son la norma eterna de justicia, revelan el pecado y expresan el amor de Dios",
                "Solo eran válidos para el pueblo hebreo en el desierto",
                "Son un medio para comprar el cielo mediante esfuerzos propios"
            ],
            correcta: 1,
            explicacion: "La Santa Ley de Dios es inmutable y resume los principios eternos de amor a Dios y al prójimo (Éxodo 20:1-17, Santiago 2:10-12, Romanos 7:12)."
        },
        {
            pregunta: "¿Qué mensaje profético especial proclama la Iglesia Adventista al mundo?",
            opciones: [
                "El mensaje de los Tres Ángeles de Apocalipsis 14",
                "Un mensaje de prosperidad económica inmediata",
                "Un llamado a aislarse de la sociedad",
                "Nuevas doctrinas no bíblicas"
            ],
            correcta: 0,
            explicacion: "La proclamación del evangelio eterno y el mensaje de los tres ángeles prepara al mundo para el inminente regreso de Cristo (Apocalipsis 14:6-12)."
        },
        {
            pregunta: "¿Por qué el cristiano cuida su salud física, mental y espiritual (Conducta Cristiana)?",
            opciones: [
                "Porque nuestro cuerpo es templo del Espíritu Santo y deseamos glorificar a Dios",
                "Para presumir de superioridad estética ante los demás",
                "Por una simple imposición dietética sin relación espiritual",
                "No hay ninguna razón bíblica para cuidar la salud"
            ],
            correcta: 0,
            explicacion: "Nuestro cuerpo es templo del Espíritu Santo; por ello practicamos la temperancia y hábitos que honren a nuestro Creador (1 Corintios 6:19-20, 1 Corintios 10:31)."
        },
        {
            pregunta: "¿Cuál es el diseño divino para el Matrimonio y la Familia?",
            opciones: [
                "Una unión sagrada de por vida entre un hombre y una mujer comprometidos en amor y fidelidad",
                "Un contrato temporal renovable cada año",
                "Una estructura sin propósito espiritual",
                "Una costumbre meramente civil"
            ],
            correcta: 0,
            explicacion: "El matrimonio fue instituido por Dios en el Edén como un pacto de amor, ayuda mutua y reflejo de la unión entre Cristo y Su iglesia (Génesis 2:18-24, Efesios 5:21-33)."
        },
        {
            pregunta: "¿Qué obra realiza el Espíritu Santo en el creyente?",
            opciones: [
                "Convence de pecado, regenera el corazón, guía a toda verdad y concede dones para el ministerio",
                "Es solo una fuerza de energía sin voluntad ni personalidad",
                "Obliga a las personas contra su voluntad",
                "Solo actuó en tiempos del Antiguo Testamento"
            ],
            correcta: 0,
            explicacion: "El Espíritu Santo es la tercera persona de la Deidad que consuela, convence de pecado y capacita a la iglesia con poder espiritual (Juan 16:7-13, Hechos 1:8)."
        }
    ],

    initGamification() {
        this.initStudyProgress();
        this.initQuiz();
    },

    // ----------------------------------------------------
    // 1. CREENCIA DEL DÍA Y ALEATORIA
    // ----------------------------------------------------
    initCreenciaDelDia() {
        if (this.beliefsData.length === 0) return;
        
        // Calcular índice determinista del día (0-27)
        const hoy = new Date();
        const diaDelAno = Math.floor((hoy - new Date(hoy.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const indexDia = (diaDelAno + hoy.getDate()) % this.beliefsData.length;
        
        this.dailyBeliefIndex = indexDia;
        this.renderCreenciaDelDia(this.dailyBeliefIndex, true);
    },

    renderCreenciaDelDia(index, esDelDia = true) {
        const item = this.beliefsData[index];
        if (!item) return;

        const numEl = document.getElementById('creenciaDiaNumber');
        const catEl = document.getElementById('creenciaDiaCategory');
        const titleEl = document.getElementById('creenciaDiaTitle');
        const descEl = document.getElementById('creenciaDiaDesc');
        const verseEl = document.getElementById('creenciaDiaVerseText');
        const fechaEl = document.getElementById('creenciaDiaFecha');

        if (numEl) numEl.textContent = `Creencia ${item.id}`;
        if (catEl) catEl.innerHTML = `<i class="fas ${item.categoryIcon}"></i> ${item.categoryName}`;
        if (titleEl) titleEl.textContent = item.titleText;
        if (descEl) descEl.textContent = item.descText;

        // Extraer el primer versículo bíblico si existe
        if (verseEl) {
            const firstVerse = item.verseLis && item.verseLis.length > 0 ? item.verseLis[0].textContent.trim() : 'Salmos 119:105';
            verseEl.textContent = firstVerse;
        }

        if (fechaEl) {
            if (esDelDia) {
                const hoy = new Date();
                const opcionesFecha = { day: 'numeric', month: 'long' };
                const fechaStr = hoy.toLocaleDateString('es-ES', opcionesFecha);
                fechaEl.textContent = `Creencia del Día (${fechaStr})`;
            } else {
                fechaEl.textContent = 'Creencia Aleatoria Seleccionada';
            }
        }
    },

    generarCreenciaAleatoria() {
        if (this.beliefsData.length <= 1) return;
        
        let nuevoIndex = Math.floor(Math.random() * this.beliefsData.length);
        // Asegurar que sea diferente al actual
        if (nuevoIndex === this.dailyBeliefIndex) {
            nuevoIndex = (nuevoIndex + 1) % this.beliefsData.length;
        }
        
        this.dailyBeliefIndex = nuevoIndex;
        this.renderCreenciaDelDia(this.dailyBeliefIndex, false);

        // Feedback visual con animación
        const box = document.getElementById('creenciaDelDiaBox');
        if (box) {
            box.style.transform = 'scale(0.99)';
            setTimeout(() => {
                box.style.transform = 'scale(1)';
            }, 150);
        }
    },

    irACreenciaDelDia() {
        const item = this.beliefsData[this.dailyBeliefIndex];
        if (item) {
            this.irACreencia(item.id);
        }
    },

    // ----------------------------------------------------
    // 2. PROGRESO DE ESTUDIO CON CHECKBOXES Y LOCALSTORAGE
    // ----------------------------------------------------
    initStudyProgress() {
        this.injectCheckboxes();
        this.actualizarProgreso();
    },

    getLeidas() {
        try {
            const saved = localStorage.getItem('creenciasLeidas');
            return saved ? JSON.parse(saved) : [];
        } catch (e) {
            console.error('Error al leer creenciasLeidas de localStorage:', e);
            return [];
        }
    },

    saveLeidas(leidasArray) {
        try {
            localStorage.setItem('creenciasLeidas', JSON.stringify(leidasArray));
        } catch (e) {
            console.error('Error al guardar creenciasLeidas en localStorage:', e);
        }
    },

    injectCheckboxes() {
        const leidas = this.getLeidas();

        this.beliefsData.forEach(item => {
            const card = item.cardEl;
            if (!card) return;

            const id = item.id;
            const isRead = leidas.includes(id);

            if (isRead) {
                card.classList.add('creencia-leida');
            } else {
                card.classList.remove('creencia-leida');
            }

            // Inyectar o sincronizar botón en cara frontal
            const frontTop = card.querySelector('.card-front .creencia-card-top');
            if (frontTop && !frontTop.querySelector('.btn-check-leida')) {
                const btnFront = document.createElement('button');
                btnFront.type = 'button';
                btnFront.className = `btn-check-leida ${isRead ? 'checked' : ''}`;
                btnFront.setAttribute('data-id', id);
                btnFront.setAttribute('data-csp-click', `event.stopPropagation(); CreenciasManager.toggleLeida('${id}')`);
                btnFront.setAttribute('title', isRead ? 'Marcar como no leída' : 'Marcar como leída');
                btnFront.innerHTML = `<i class="fas ${isRead ? 'fa-check-circle' : 'fa-circle'}"></i> <span>${isRead ? 'Leída' : 'Marcar leída'}</span>`;
                frontTop.appendChild(btnFront);
            }

            // Inyectar o sincronizar botón en cara trasera
            const backHeader = card.querySelector('.card-back .card-back-header');
            if (backHeader && !backHeader.querySelector('.btn-check-leida')) {
                const btnBack = document.createElement('button');
                btnBack.type = 'button';
                btnBack.className = `btn-check-leida ${isRead ? 'checked' : ''}`;
                btnBack.setAttribute('data-id', id);
                btnBack.setAttribute('data-csp-click', `event.stopPropagation(); CreenciasManager.toggleLeida('${id}')`);
                btnBack.setAttribute('title', isRead ? 'Marcar como no leída' : 'Marcar como leída');
                btnBack.innerHTML = `<i class="fas ${isRead ? 'fa-check-circle' : 'fa-circle'}"></i> <span>${isRead ? 'Leída' : 'Marcar leída'}</span>`;
                // Insertar antes del botón de cerrar giro
                const closeBtn = backHeader.querySelector('.btn-flip-close');
                if (closeBtn) {
                    backHeader.insertBefore(btnBack, closeBtn);
                } else {
                    backHeader.appendChild(btnBack);
                }
            }
        });
    },

    toggleLeida(id) {
        id = String(id);
        let leidas = this.getLeidas();

        if (leidas.includes(id)) {
            leidas = leidas.filter(item => item !== id);
        } else {
            leidas.push(id);
        }

        this.saveLeidas(leidas);
        this.actualizarCardCheckboxes(id, leidas.includes(id));
        this.actualizarProgreso();
    },

    actualizarCardCheckboxes(id, isRead) {
        const card = document.getElementById(`creencia-card-${id}`) || document.querySelector(`.creencia-item-card[data-id="${id}"]`);
        if (!card) return;

        if (isRead) {
            card.classList.add('creencia-leida');
        } else {
            card.classList.remove('creencia-leida');
        }

        const btns = card.querySelectorAll('.btn-check-leida');
        btns.forEach(btn => {
            if (isRead) {
                btn.classList.add('checked');
                btn.setAttribute('title', 'Marcar como no leída');
                btn.innerHTML = `<i class="fas fa-check-circle"></i> <span>Leída</span>`;
            } else {
                btn.classList.remove('checked');
                btn.setAttribute('title', 'Marcar como leída');
                btn.innerHTML = `<i class="fas fa-circle"></i> <span>Marcar leída</span>`;
            }
        });
    },

    marcarTodasLeidas() {
        const allIds = this.beliefsData.map(b => String(b.id));
        this.saveLeidas(allIds);

        allIds.forEach(id => {
            this.actualizarCardCheckboxes(id, true);
        });

        this.actualizarProgreso();
    },

    reiniciarProgreso() {
        this.saveLeidas([]);

        this.beliefsData.forEach(b => {
            this.actualizarCardCheckboxes(b.id, false);
        });

        this.actualizarProgreso();
    },

    actualizarProgreso() {
        const leidas = this.getLeidas();
        const total = this.beliefsData.length || 28;
        const count = leidas.length;
        const percent = Math.min(100, Math.round((count / total) * 100));

        const barFill = document.getElementById('progresoEstudioBarFill');
        const badge = document.getElementById('progresoPercentBadge');
        const counter = document.getElementById('progresoEstudioCounter');

        if (barFill) barFill.style.width = `${percent}%`;
        if (badge) badge.textContent = `${percent}%`;
        if (counter) {
            counter.innerHTML = `<i class="fas fa-book-reader"></i> Has leído <strong>${count} de ${total}</strong> creencias`;
        }
    },

    // ----------------------------------------------------
    // 3. QUIZ DOCTRINAL "¿CUÁNTO SABES DE LAS 28 CREENCIAS?"
    // ----------------------------------------------------
    initQuiz() {
        this.cargarMejorPuntaje();
    },

    cargarMejorPuntaje() {
        try {
            const best = localStorage.getItem('quizPuntaje');
            const scoreText = document.getElementById('quizBestScoreText');
            if (scoreText) {
                scoreText.textContent = best !== null ? `${best} / 5` : '--';
            }
        } catch (e) {
            console.error('Error al leer quizPuntaje de localStorage:', e);
        }
    },

    abrirOIniciarQuiz() {
        const section = document.getElementById('creenciasQuizSection');
        if (section) {
            section.style.display = 'block';
            this.iniciarQuiz();
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    cerrarQuiz() {
        const section = document.getElementById('creenciasQuizSection');
        if (section) {
            section.style.display = 'none';
        }
    },

    iniciarQuiz() {
        this.quizActive = true;
        this.currentQuizIndex = 0;
        this.quizScore = 0;
        this.quizAnswered = false;

        // Seleccionar 5 preguntas al azar sin repetición
        const copias = [...this.bancoPreguntas];
        // Algoritmo Fisher-Yates shuffle
        for (let i = copias.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [copias[i], copias[j]] = [copias[j], copias[i]];
        }
        this.quizQuestions = copias.slice(0, 5);

        // Mostrar área de preguntas y ocultar resultados
        const qArea = document.getElementById('quizQuestionArea');
        const rArea = document.getElementById('quizResultsArea');
        if (qArea) qArea.style.display = 'block';
        if (rArea) rArea.style.display = 'none';

        this.mostrarPreguntaQuiz();
    },

    mostrarPreguntaQuiz() {
        if (!this.quizQuestions || this.quizQuestions.length === 0) return;
        
        this.quizAnswered = false;
        const currentQ = this.quizQuestions[this.currentQuizIndex];
        const stepNum = this.currentQuizIndex + 1;

        // Actualizar badges e indicadores
        const stepNumEl = document.getElementById('quizCurrentNum');
        const scoreEl = document.getElementById('quizCurrentScore');
        const fillEl = document.getElementById('quizProgressFill');
        const questionTextEl = document.getElementById('quizQuestionText');
        const optionsGridEl = document.getElementById('quizOptionsGrid');
        const feedbackBox = document.getElementById('quizFeedbackBox');

        if (stepNumEl) stepNumEl.textContent = String(stepNum);
        if (scoreEl) scoreEl.textContent = String(this.quizScore);
        if (fillEl) fillEl.style.width = `${(stepNum / 5) * 100}%`;
        if (feedbackBox) feedbackBox.style.display = 'none';

        if (questionTextEl) {
            questionTextEl.textContent = `${stepNum}. ${currentQ.pregunta}`;
        }

        // Renderizar las 4 opciones
        if (optionsGridEl) {
            const letters = ['A', 'B', 'C', 'D'];
            optionsGridEl.innerHTML = currentQ.opciones.map((opcion, idx) => `
                <button type="button" class="quiz-option-btn" id="quiz-option-${idx}" data-idx="${idx}" data-csp-click="CreenciasManager.responderQuiz(${idx})">
                    <span class="quiz-option-letter">${letters[idx]}</span>
                    <span class="quiz-option-text">${this.escapeHTML(opcion)}</span>
                </button>
            `).join('');
        }
    },

    responderQuiz(opcionIndex) {
        if (this.quizAnswered) return;
        this.quizAnswered = true;

        const currentQ = this.quizQuestions[this.currentQuizIndex];
        const esCorrecta = (opcionIndex === currentQ.correcta);

        if (esCorrecta) {
            this.quizScore++;
            const scoreEl = document.getElementById('quizCurrentScore');
            if (scoreEl) scoreEl.textContent = String(this.quizScore);
        }

        // Deshabilitar botones y aplicar clases de estilo
        const buttons = document.querySelectorAll('.quiz-option-btn');
        buttons.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === currentQ.correcta) {
                btn.classList.add('correct');
            } else if (idx === opcionIndex && !esCorrecta) {
                btn.classList.add('incorrect');
            }
        });

        // Mostrar Feedback Inmediato
        const feedbackBox = document.getElementById('quizFeedbackBox');
        const feedbackIcon = document.getElementById('quizFeedbackIcon');
        const feedbackTitle = document.getElementById('quizFeedbackTitle');
        const feedbackText = document.getElementById('quizFeedbackText');
        const nextBtn = document.getElementById('btnQuizNext');

        if (feedbackBox) {
            feedbackBox.style.display = 'block';
            feedbackBox.className = `quiz-feedback-box ${esCorrecta ? 'feedback-correct' : 'feedback-incorrect'}`;
        }

        if (feedbackIcon) {
            feedbackIcon.className = `fas ${esCorrecta ? 'fa-check-circle' : 'fa-times-circle'}`;
        }

        if (feedbackTitle) {
            feedbackTitle.textContent = esCorrecta ? '¡Respuesta Correcta! ✨' : 'Respuesta Incorrecta 📖';
        }

        if (feedbackText) {
            feedbackText.textContent = currentQ.explicacion;
        }

        if (nextBtn) {
            const esUltima = (this.currentQuizIndex === 4);
            nextBtn.innerHTML = esUltima ? `<span>Ver Resultados Finales</span> <i class="fas fa-trophy"></i>` : `<span>Siguiente Pregunta</span> <i class="fas fa-arrow-right"></i>`;
        }
    },

    siguientePreguntaQuiz() {
        if (this.currentQuizIndex < 4) {
            this.currentQuizIndex++;
            this.mostrarPreguntaQuiz();
        } else {
            this.finalizarQuiz();
        }
    },

    finalizarQuiz() {
        const qArea = document.getElementById('quizQuestionArea');
        const rArea = document.getElementById('quizResultsArea');
        if (qArea) qArea.style.display = 'none';
        if (rArea) rArea.style.display = 'block';

        const finalScoreNum = document.getElementById('quizFinalScoreNum');
        const finalScorePercent = document.getElementById('quizFinalScorePercent');
        const resultsMsg = document.getElementById('quizResultsMessage');
        const resultsIcon = document.getElementById('quizResultsIcon');
        const recordAlert = document.getElementById('quizRecordAlert');

        const percent = Math.round((this.quizScore / 5) * 100);

        if (finalScoreNum) finalScoreNum.textContent = `${this.quizScore} / 5`;
        if (finalScorePercent) finalScorePercent.textContent = `(${percent}% de Aciertos)`;

        // Mensaje personalizado según puntuación
        let mensaje = '';
        let icono = 'fa-trophy';

        if (this.quizScore === 5) {
            mensaje = '¡Extraordinario! ¡Eres un auténtico teólogo bíblico adventista! 🏆 Conoces a fondo los 28 pilares de la fe.';
            icono = 'fa-crown';
        } else if (this.quizScore === 4) {
            mensaje = '¡Excelente trabajo! Tienes un conocimiento doctrinal muy sólido. ⭐ Sigue afianzando tus fundamentos.';
            icono = 'fa-star';
        } else if (this.quizScore === 3) {
            mensaje = '¡Buen avance! Tienes nociones claras de las doctrinas bíblicas. 📖 Te invitamos a continuar profundizando.';
            icono = 'fa-book-open';
        } else {
            mensaje = '¡Buen esfuerzo! Cada creencia es una joya bíblica por descubrir. ✨ Revisa las tarjetas y vuelve a intentarlo.';
            icono = 'fa-seedling';
        }

        if (resultsMsg) resultsMsg.textContent = mensaje;
        if (resultsIcon) resultsIcon.innerHTML = `<i class="fas ${icono}"></i>`;

        // Guardar mejor récord en localStorage
        try {
            const savedBest = localStorage.getItem('quizPuntaje');
            const currentBest = savedBest !== null ? parseInt(savedBest, 10) : -1;

            if (this.quizScore > currentBest) {
                localStorage.setItem('quizPuntaje', String(this.quizScore));
                if (recordAlert) recordAlert.style.display = 'inline-flex';
                this.cargarMejorPuntaje();
            } else {
                if (recordAlert) recordAlert.style.display = 'none';
            }
        } catch (e) {
            console.error('Error al guardar mejor puntaje en localStorage:', e);
        }
    },

    escapeHTML(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
};

/**
 * Alterna el giro 3D de la tarjeta de creencia
 * @param {number|string} id Número de la creencia (1-28)
 */
function flipCarta(id) {
    const card = document.getElementById(`creencia-card-${id}`) || document.querySelector(`.creencia-item-card[data-id="${id}"]`);
    if (card) {
        card.classList.toggle('flipped');
    }
}

function abrirProyectoCreencias() {
    window.open('https://proyecto-biblia-fe2b5.web.app/', '_blank', 'noopener,noreferrer');
}

/**
 * Funciones de conveniencia globales para delegación y filtros directos
 */
function filtrarCategoria(categoria) {
    CreenciasManager.setCategory(categoria);
}

function aplicarFiltros() {
    CreenciasManager.applyFilters();
}

// Exponer globalmente para compatibilidad completa
window.CreenciasManager = CreenciasManager;
window.flipCarta = flipCarta;
window.abrirProyectoCreencias = abrirProyectoCreencias;
window.filtrarCategoria = filtrarCategoria;
window.aplicarFiltros = aplicarFiltros;

// Inicialización automática
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => CreenciasManager.init());
} else {
    CreenciasManager.init();
}


