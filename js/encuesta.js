/* ========================================
   ENCUESTAS Y VOTACIONES (ENCUESTA MANAGER)
   IASD Belén · Iglesia Adventista
   ======================================== */

const EncuestaManager = {
    DEFAULT_DATA: {
        pregunta: "¿Cuál es tu actividad favorita en la iglesia?",
        opciones: ["Culto Divino", "Escuela Sabática", "Sociedad de Jóvenes", "Clubes de Iglesia", "Servicio y Misión"],
        votos: {}
    },

    cargar() {
        return StorageHelper.get(StorageHelper.KEYS.ENCUESTA, this.DEFAULT_DATA);
    },

    guardar(data) {
        StorageHelper.set(StorageHelper.KEYS.ENCUESTA, data);
    },

    render() {
        const data = this.cargar();
        const elPregunta = document.getElementById('preguntaEncuesta');
        const elOpciones = document.getElementById('opcionesEncuesta');
        const elResultados = document.getElementById('resultadosEncuesta');

        if (elPregunta) elPregunta.textContent = data.pregunta;

        // Renderizar botones de opción
        if (elOpciones) {
            elOpciones.innerHTML = data.opciones.map((op, i) => `
                <button class="opcion-btn" onclick="votar(${i})">
                    ${op}
                </button>
            `).join('');
        }

        // Renderizar barra de resultados y porcentajes
        if (elResultados) {
            const totalVotos = Object.values(data.votos).reduce((a, b) => a + b, 0);

            elResultados.innerHTML = data.opciones.map((op, i) => {
                const votosOp = data.votos[i] || 0;
                const porcentaje = totalVotos > 0 ? Math.round((votosOp / totalVotos) * 100) : 0;

                return `
                    <div class="resultado-item">
                        <div class="info">
                            <span>${op}</span>
                            <span>${porcentaje}% (${votosOp} votos)</span>
                        </div>
                        <div class="resultado-barra">
                            <div class="resultado-fill" style="width: ${porcentaje}%;"></div>
                        </div>
                    </div>
                `;
            }).join('') + `<p style="text-align:right; font-size:0.8rem; color:var(--muted-text); margin-top:0.5rem;">Total de votos: ${totalVotos}</p>`;
        }
    },

    votar(indexOp) {
        const data = this.cargar();
        if (!data.votos[indexOp]) {
            data.votos[indexOp] = 0;
        }
        data.votos[indexOp]++;
        this.guardar(data);
        this.render();
    },

    toggleAdmin() {
        const el = document.getElementById('adminEncuesta');
        if (el) {
            el.style.display = (el.style.display === 'none' || !el.style.display) ? 'block' : 'none';
        }
    },

    guardarAdmin() {
        const inputPregunta = document.getElementById('inputPreguntaAdmin');
        const inputOpciones = document.getElementById('inputOpcionesAdmin');

        if (!inputPregunta || !inputOpciones) return;

        const nuevaPregunta = inputPregunta.value.trim();
        const nuevasOpcionesStr = inputOpciones.value.trim();

        if (!nuevaPregunta || !nuevasOpcionesStr) {
            alert('Por favor complete la pregunta y las opciones separadas por coma.');
            return;
        }

        const nuevasOpciones = nuevasOpcionesStr.split(',').map(o => o.trim()).filter(o => o.length > 0);

        const nuevaEncuesta = {
            pregunta: nuevaPregunta,
            opciones: nuevasOpciones,
            votos: {}
        };

        this.guardar(nuevaEncuesta);
        this.render();
        this.toggleAdmin();
        alert('Encuesta actualizada con éxito.');
    }
};

// Funciones globales de compatibilidad
function mostrarEncuesta() { EncuestaManager.render(); }
function votar(index) { EncuestaManager.votar(index); }
function toggleAdmin() { EncuestaManager.toggleAdmin(); }
function guardarPreguntaAdmin() { EncuestaManager.guardarAdmin(); }
