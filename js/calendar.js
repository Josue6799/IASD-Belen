/* ========================================
   GESTIÓN DE CALENDARIOS (GENERAL Y CLUBES)
   IASD Belén · Iglesia Adventista
   ======================================== */

const CalendarManager = {
    // Meses en español
    NOMBRES_MESES: [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ],

    // Estado interno por cada tipo de calendario
    state: {
        general: { fecha: new Date(), diaSeleccionado: null },
        aventureros: { fecha: new Date(), diaSeleccionado: null },
        conquistadores: { fecha: new Date(), diaSeleccionado: null },
        guias: { fecha: new Date(), diaSeleccionado: null }
    },

    // Mapeo de sufijos de IDs en el DOM
    getSuffix(type) {
        if (type === 'general') return '';
        return type.charAt(0).toUpperCase() + type.slice(1);
    },

    // Cargar eventos almacenados
    getEventos(type) {
        if (type === 'general') {
            // El calendario general lee los eventos del Admin
            try {
                const data = localStorage.getItem('eventosIglesia');
                if (!data) return {};

                const eventos = JSON.parse(data);

                // Si los datos ya son un objeto mapa, devolverlos tal cual
                if (typeof eventos === 'object' && !Array.isArray(eventos)) {
                    return eventos;
                }

                // Si los datos son un Array (lista de eventos), convertir a objeto mapa
                const mapa = {};
                eventos.forEach(ev => {
                    if (!mapa[ev.fecha]) {
                        mapa[ev.fecha] = [];
                    }
                    // ⭐ GUARDAMOS UN OBJETO con el título y la hora
                    mapa[ev.fecha].push({
                        titulo: ev.titulo,
                        hora: ev.hora || '' // Si no tiene hora, dejamos vacío
                    });
                });
                return mapa;

            } catch (e) { return {}; }
        } else {
            // Los clubes siguen usando su clave privada
            const key = StorageHelper.getCalendarKey(type);
            return StorageHelper.get(key, {});
        }
    },

    // Renderizar calendario según tipo ('general', 'aventureros', 'conquistadores', 'guias')
    render(type = 'general') {
        const suf = this.getSuffix(type);
        const stateObj = this.state[type] || this.state.general;
        const fechaActual = stateObj.fecha;
        const año = fechaActual.getFullYear();
        const mes = fechaActual.getMonth();

        // 1. Actualizar títulos
        const elTitulo = document.getElementById('tituloMes' + suf);
        const elMesActual = document.getElementById('mesActual' + suf);
        const textoMesAño = `${this.NOMBRES_MESES[mes]} ${año}`;

        if (elTitulo) elTitulo.textContent = textoMesAño;
        if (elMesActual) elMesActual.textContent = textoMesAño;

        // 2. Obtener días del mes
        const primerDiaSemana = new Date(año, mes, 1).getDay();
        const totalDiasMes = new Date(año, mes + 1, 0).getDate();
        const eventosMap = this.getEventos(type);

        const grid = document.getElementById('diasGrid' + suf);
        if (!grid) return;

        grid.innerHTML = '';

        // Días vacíos al inicio
        for (let i = 0; i < primerDiaSemana; i++) {
            const divVacio = document.createElement('div');
            divVacio.className = 'dia vacio';
            grid.appendChild(divVacio);
        }

        const hoy = new Date();
        const esMesHoy = hoy.getFullYear() === año && hoy.getMonth() === mes;

        // Renderizar días del mes
        for (let d = 1; d <= totalDiasMes; d++) {
            const fechaClave = `${año}-${String(mes + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
            const divDia = document.createElement('div');
            divDia.className = 'dia';
            divDia.textContent = d;

            if (esMesHoy && hoy.getDate() === d) {
                divDia.classList.add('hoy');
            }

            if (eventosMap[fechaClave] && eventosMap[fechaClave].length > 0) {
                divDia.classList.add('evento');
            }

            if (stateObj.diaSeleccionado === d) {
                divDia.style.borderColor = 'var(--golden)';
                divDia.style.borderWidth = '3px';
            }

            divDia.onclick = () => this.seleccionarDia(type, d);
            grid.appendChild(divDia);
        }

        // Actualizar lista de eventos y resumen
        this.actualizarEventosDia(type);
        this.actualizarResumen(type);
    },

    // Cambiar de mes
    cambiarMes(type, delta) {
        const stateObj = this.state[type] || this.state.general;
        stateObj.fecha.setMonth(stateObj.fecha.getMonth() + delta);
        stateObj.diaSeleccionado = null;
        this.render(type);
    },

    // Seleccionar día
    seleccionarDia(type, dia) {
        const stateObj = this.state[type] || this.state.general;
        stateObj.diaSeleccionado = dia;
        this.render(type);
    },

    // Actualizar sección de eventos del día seleccionado
    actualizarEventosDia(type) {
        const suf = this.getSuffix(type);
        const stateObj = this.state[type] || this.state.general;
        const contenedor = document.getElementById('listaEventos' + suf);
        if (!contenedor) return;

        if (!stateObj.diaSeleccionado) {
            contenedor.innerHTML = '<p style="color:var(--muted-text); font-size:0.8rem;">Haz clic en un día para ver los eventos.</p>';
            return;
        }

        const año = stateObj.fecha.getFullYear();
        const mes = stateObj.fecha.getMonth();
        const dia = stateObj.diaSeleccionado;
        const fechaClave = `${año}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

        const eventosMap = this.getEventos(type);
        const lista = eventosMap[fechaClave] || [];

        if (lista.length === 0) {
            contenedor.innerHTML = `<p style="color:var(--muted-text); font-size:0.85rem;">No hay eventos para el <strong>${dia} de ${this.NOMBRES_MESES[mes]}</strong>.</p>`;
            return;
        }

        let html = `<h4 style="font-size:0.9rem; color:var(--deep-blue); margin-bottom:0.6rem;">Eventos del ${dia} de ${this.NOMBRES_MESES[mes]}:</h4>`;

        lista.forEach((item, index) => {
            // Si viene de un club (string) o del admin (objeto con titulo y hora)
            const titulo = typeof item === 'string' ? item : item.titulo;
            const hora = typeof item === 'string' ? '' : (item.hora || '');

            // Formatear la hora para que se vea bonita (ej: 9:41 a. m.)
            let horaTexto = '';
            if (hora) {
                const partes = hora.split(':');
                let h = parseInt(partes[0]);
                const m = partes[1];
                const ampm = h >= 12 ? 'p. m.' : 'a. m.';
                h = h % 12 || 12;
                horaTexto = `${h}:${m} ${ampm}`;
            }

            html += `<div class="evento-item" style="display:flex; justify-content:space-between; align-items:center; padding:0.3rem 0;">`;
            // ⭐ MOSTRAMOS EL TÍTULO Y LA HORA AL LADO
            html += `<span>📌 ${titulo} ${horaTexto ? '<span style="font-size:0.8rem;color:#5a6474;margin-left:0.5rem;">(' + horaTexto + ')</span>' : ''}</span>`;

            // Solo mostrar el botón de eliminar si NO es el calendario general
            if (type !== 'general') {
                html += `<button onclick="CalendarManager.eliminarEvento('${type}', '${fechaClave}', ${index})" class="btn-sm btn-danger">
                            <i class="fas fa-trash"></i>
                        </button>`;
            } else {
                html += `<span style="font-size:0.7rem; color:var(--muted-text);">(Gestionado desde Admin)</span>`;
            }
            html += `</div>`;
        });
        contenedor.innerHTML = html;
    },

    // Abrir Modal de Creación de Eventos
    abrirModalEvento(type) {
        // 👉 Si es el calendario general, redirigir al Admin o mostrar aviso
        if (type === 'general') {
            alert('Los eventos del calendario general de la Iglesia se gestionan exclusivamente desde el Panel de Administración.');
            return;
        }

        const stateObj = this.state[type] || this.state.general;
        if (!stateObj.diaSeleccionado) {
            alert('Por favor selecciona primero un día en el calendario.');
            return;
        }

        const año = stateObj.fecha.getFullYear();
        const mes = stateObj.fecha.getMonth();
        const dia = stateObj.diaSeleccionado;

        const modal = document.getElementById('modalEvento');
        const modalTitulo = document.getElementById('modalEventoFecha');
        const inputNombre = document.getElementById('modalEventoNombre');

        if (modal && modalTitulo && inputNombre) {
            modalTitulo.textContent = `Agregar evento para el ${dia} de ${this.NOMBRES_MESES[mes]} (${type.toUpperCase()})`;
            inputNombre.value = '';
            modal.dataset.calendarType = type;
            modal.classList.add('active');
            inputNombre.focus();
        } else {
            const nombre = prompt(`Ingrese el nombre del evento para el ${dia} de ${this.NOMBRES_MESES[mes]}:`);
            if (nombre && nombre.trim()) {
                this.guardarNuevoEvento(type, nombre.trim());
            }
        }
    },

    // Guardar nuevo evento
    guardarNuevoEvento(type, nombre) {
        const stateObj = this.state[type] || this.state.general;
        const año = stateObj.fecha.getFullYear();
        const mes = stateObj.fecha.getMonth();
        const dia = stateObj.diaSeleccionado;
        const fechaClave = `${año}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

        const eventosMap = this.getEventos(type);
        if (!eventosMap[fechaClave]) {
            eventosMap[fechaClave] = [];
        }
        eventosMap[fechaClave].push(nombre);
        this.saveEventos(type, eventosMap);
        this.render(type);
    },

    // Eliminar evento
    eliminarEvento(type, fechaClave, index) {
        const eventosMap = this.getEventos(type);
        if (eventosMap[fechaClave]) {
            eventosMap[fechaClave].splice(index, 1);
            if (eventosMap[fechaClave].length === 0) {
                delete eventosMap[fechaClave];
            }
            this.saveEventos(type, eventosMap);
            this.render(type);
        }
    },

    // Actualizar lista resumen de eventos del mes
    actualizarResumen(type) {
        const suf = this.getSuffix(type);
        const contenedor = document.getElementById('listaResumen' + suf);
        if (!contenedor) return;

        const stateObj = this.state[type] || this.state.general;
        const año = stateObj.fecha.getFullYear();
        const mes = stateObj.fecha.getMonth();
        const mesClavePrefix = `${año}-${String(mes + 1).padStart(2, '0')}`;

        const eventosMap = this.getEventos(type);
        const fechasConEventos = Object.keys(eventosMap)
            .filter(f => f.startsWith(mesClavePrefix) && Array.isArray(eventosMap[f]) && eventosMap[f].length > 0)
            .sort();

        if (fechasConEventos.length === 0) {
            contenedor.innerHTML = '<p style="color:var(--muted-text);">No hay eventos programados para este mes.</p>';
            return;
        }

        let html = '<ul style="list-style:none; padding:0; display:flex; flex-direction:column; gap:0.4rem;">';
        fechasConEventos.forEach(fecha => {
            const diaNum = parseInt(fecha.split('-')[2]);
            const items = eventosMap[fecha];

            // Convertir cada elemento a texto correctamente
            const textos = items.map(item => {
                // Caso 1: Es un string simple (viene de los clubes)
                if (typeof item === 'string') return item;
                // Caso 2: Es un objeto con título y hora (viene del Admin)
                if (item && typeof item === 'object' && item.titulo) {
                    const titulo = item.titulo;
                    const hora = item.hora ? ` (${item.hora})` : '';
                    return titulo + hora;
                }
                return 'Evento';
            });

            const eventosTexto = textos.join(', ');
            html += `<li><strong>Día ${diaNum}:</strong> ${eventosTexto}</li>`;
        });
        html += '</ul>';
        contenedor.innerHTML = html;
    },

    // Inicializar todos los calendarios al cargar la aplicación
    initAll() {
        ['general', 'aventureros', 'conquistadores', 'guias'].forEach(type => {
            this.render(type);
        });
    }
};

// Funciones globales de compatibilidad con eventos inline
function mostrarCalendario() { CalendarManager.render('general'); }
function cambiarMes(delta) { CalendarManager.cambiarMes('general', delta); }
function seleccionarDia(dia) { CalendarManager.seleccionarDia('general', dia); }
function agregarEvento() { CalendarManager.abrirModalEvento('general'); }
function eliminarEvento(index) {
    const stateObj = CalendarManager.state.general;
    if (stateObj.diaSeleccionado) {
        const año = stateObj.fecha.getFullYear();
        const mes = stateObj.fecha.getMonth();
        const fechaClave = `${año}-${String(mes + 1).padStart(2, '0')}-${String(stateObj.diaSeleccionado).padStart(2, '0')}`;
        CalendarManager.eliminarEvento('general', fechaClave, index);
    }
}

// Compatibilidad con clubes
function mostrarCalendarioClub(club) { CalendarManager.render(club); }
function cambiarMesClub(club, delta) { CalendarManager.cambiarMes(club, delta); }
function seleccionarDiaClub(club, dia) { CalendarManager.seleccionarDia(club, dia); }
function agregarEventoClub(club) { CalendarManager.abrirModalEvento(club); }
function eliminarEventoClub(club, dia, index) {
    const stateObj = CalendarManager.state[club];
    if (stateObj) {
        const año = stateObj.fecha.getFullYear();
        const mes = stateObj.fecha.getMonth();
        const fechaClave = `${año}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
        CalendarManager.eliminarEvento(club, fechaClave, index);
    }
}
function inicializarClubes() {
    ['aventureros', 'conquistadores', 'guias'].forEach(c => CalendarManager.render(c));
}

// ===== CONEXIÓN CON EL ADMIN =====
window.addEventListener('datosIglesiaActualizados', () => {
    // Solo recargamos el calendario general, los clubes no se tocan
    CalendarManager.render('general');
});