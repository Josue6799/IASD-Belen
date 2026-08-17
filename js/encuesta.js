/* ========================================
   ENCUESTA PÚBLICA (Conectada al Admin)
   IASD Belén · Iglesia Adventista
   ======================================== */

const EncuestaManager = {

    // Cargar el array de encuestas que guardó el Admin
    cargar() {
        return StorageHelper.get('encuestasIglesia', []);
    },

    // Guardar el array (para actualizar los votos)
    guardar(encuestas) {
        StorageHelper.set('encuestasIglesia', encuestas);
    },

    // Renderizar la primera encuesta del array
    render() {
        const encuestas = this.cargar();
        const elPregunta = document.getElementById('preguntaEncuesta');
        const elOpciones = document.getElementById('opcionesEncuesta');
        const elResultados = document.getElementById('resultadosEncuesta');

        // Si no hay encuestas, mostrar mensaje vacío
        if (encuestas.length === 0) {
            if (elPregunta) elPregunta.textContent = 'No hay encuestas activas en este momento.';
            if (elOpciones) elOpciones.innerHTML = '';
            if (elResultados) elResultados.innerHTML = '';
            return;
        }

        // Tomamos la primera encuesta del array
        const enc = encuestas[0];

        // Verificar si el usuario ya votó en ESTA encuesta específica
        const yaVotado = localStorage.getItem('yaVotado_' + enc.id);

        // Mostrar la pregunta
        if (elPregunta) elPregunta.textContent = enc.pregunta || enc.titulo;

        // Generar los botones de voto
        if (elOpciones) {
            elOpciones.innerHTML = (enc.opciones || []).map((op, i) => `
                <button class="opcion-btn" onclick="EncuestaManager.votar(${i})" ${yaVotado ? 'disabled' : ''}>
                    ${op}
                </button>
            `).join('');

            if (yaVotado) {
                elOpciones.innerHTML += `<p style="margin-top:0.8rem; color:#2e7d32; font-weight:600; font-size:0.9rem;">✅ Ya has votado en esta encuesta. ¡Gracias por tu participación!</p>`;
            }
        }

        // Generar la barra de resultados y porcentajes
        if (elResultados) {
            const totalVotos = (enc.votos || []).reduce((a, b) => a + (b || 0), 0);
            elResultados.innerHTML = (enc.opciones || []).map((op, i) => {
                const votosOp = (enc.votos && enc.votos[i]) || 0;
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

    // Función para votar por una opción
    votar(indexOp) {
        const encuestas = this.cargar();
        if (encuestas.length === 0) return;

        const enc = encuestas[0];

        if (localStorage.getItem('yaVotado_' + enc.id)) {
            alert('Ya has votado en esta encuesta.');
            return;
        }

        if (!enc.votos) enc.votos = new Array(enc.opciones.length).fill(0);
        enc.votos[indexOp] = (enc.votos[indexOp] || 0) + 1;

        this.guardar(encuestas);
        localStorage.setItem('yaVotado_' + enc.id, 'true');

        // Sincronizar voto individual en Supabase votos_encuestas
        if (window.supabaseClient && enc.id) {
          const userFingerprint = localStorage.getItem('alumnoIdentidad') || 'anon_' + Date.now();
          window.supabaseClient.from('votos_encuestas').insert([{
            encuesta_id: enc.id,
            usuario_identificador: userFingerprint,
            opcion_index: indexOp
          }]).catch(err => console.warn('[Encuesta] Error guardando voto en Supabase:', err));
        }

        this.render();
    }
};

// Funciones globales para que los botones del HTML la llamen
function mostrarEncuesta() { EncuestaManager.render(); }
function votar(index) { EncuestaManager.votar(index); }


// ===== CONEXIÓN CON EL ADMIN =====
// Cuando el Admin agregue o elimine una encuesta, la página se actualizará sola.
window.addEventListener('datosIglesiaActualizados', () => {
    EncuestaManager.render();
});