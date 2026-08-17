/* ========================================
   GESTOR DE LAS 28 CREENCIAS ADVENTISTAS
   IASD Belén · Iglesia Adventista
   ======================================== */

const CreenciasManager = {
    currentCategory: 'todas',
    currentSearch: '',

    init() {
        this.initSearch();
        this.initTabs();
    },

    initSearch() {
        const inputSearch = document.getElementById('searchCreenciasInput');
        if (!inputSearch) return;

        inputSearch.addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase().trim();
            this.applyFilters();
        });
    },

    initTabs() {
        const tabs = document.querySelectorAll('.creencia-tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const btn = e.currentTarget;
                const cat = btn.getAttribute('data-cat') || 'todas';
                this.setCategory(cat, btn);
            });
        });
    },

    setCategory(category, activeBtn) {
        this.currentCategory = category;

        // Actualizar estado activo en botones
        document.querySelectorAll('.creencia-tab-btn').forEach(b => b.classList.remove('active'));
        if (activeBtn) {
            activeBtn.classList.add('active');
        } else {
            const btn = document.querySelector(`.creencia-tab-btn[data-cat="${category}"]`);
            if (btn) btn.classList.add('active');
        }

        this.applyFilters();
    },

    applyFilters() {
        const tarjetas = document.querySelectorAll('#creencias .creencia-item-card, #creencias .service-box');
        let encontrados = 0;

        tarjetas.forEach(card => {
            const cardCat = card.getAttribute('data-categoria') || '';
            const cardText = card.textContent.toLowerCase();

            const matchesCategory = (this.currentCategory === 'todas' || cardCat === this.currentCategory);
            const matchesSearch = (!this.currentSearch || cardText.includes(this.currentSearch));

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                encontrados++;
            } else {
                card.style.display = 'none';
            }
        });

        // Mensaje cuando no hay resultados
        let noResultsEl = document.getElementById('noCreenciasResults');
        if (!noResultsEl) {
            noResultsEl = document.createElement('div');
            noResultsEl.id = 'noCreenciasResults';
            noResultsEl.style.textAlign = 'center';
            noResultsEl.style.padding = '3rem 1rem';
            noResultsEl.style.color = 'var(--muted-text)';
            noResultsEl.innerHTML = '<i class="fas fa-search" style="font-size:2.5rem; margin-bottom:1rem; color:var(--golden);"></i><h4 style="color:var(--deep-blue); margin-bottom:0.4rem;">No se encontraron resultados</h4><p>Intenta con otra palabra clave o selecciona otra categoría.</p>';
            const grid = document.querySelector('.creencias-grid') || document.getElementById('creencias');
            if (grid) grid.appendChild(noResultsEl);
        }

        noResultsEl.style.display = encontrados === 0 ? 'block' : 'none';
    },

    toggleVerses(btn) {
        const drawer = btn.nextElementSibling;
        if (!drawer) return;
        const isOpen = drawer.classList.contains('open');
        drawer.classList.toggle('open', !isOpen);
        
        const icon = btn.querySelector('.chevron-icon');
        if (icon) {
            icon.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
        }
        btn.setAttribute('aria-expanded', String(!isOpen));
    }
};

function abrirProyectoCreencias() {
    window.open('https://proyecto-biblia-fe2b5.web.app/', '_blank', 'noopener,noreferrer');
}

// Exponer globalmente
window.CreenciasManager = CreenciasManager;
window.abrirProyectoCreencias = abrirProyectoCreencias;

document.addEventListener('DOMContentLoaded', () => {
    CreenciasManager.init();
});
