/* ========================================
   BUSCADOR DE LAS 28 CREENCIAS ADVENTISTAS
   IASD Belén · Iglesia Adventista
   ======================================== */

const CreenciasManager = {
    initSearch() {
        const inputSearch = document.getElementById('searchCreenciasInput');
        if (!inputSearch) return;

        inputSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            this.filter(query);
        });
    },

    filter(query) {
        const tarjetas = document.querySelectorAll('#creencias .service-box');
        let encontrados = 0;

        tarjetas.forEach(card => {
            const textoCard = card.textContent.toLowerCase();
            if (textoCard.includes(query)) {
                card.style.display = 'block';
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
            noResultsEl.style.padding = '2rem';
            noResultsEl.style.color = 'var(--muted-text)';
            noResultsEl.innerHTML = '<i class="fas fa-search" style="font-size:2rem; margin-bottom:0.8rem; color:var(--golden);"></i><p>No se encontraron creencias con esa palabra clave.</p>';
            const contenedorPadre = document.getElementById('creencias');
            if (contenedorPadre) contenedorPadre.appendChild(noResultsEl);
        }

        noResultsEl.style.display = encontrados === 0 ? 'block' : 'none';
    }
};
