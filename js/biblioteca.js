/**
 * Biblioteca Virtual - Lógica de Catálogo y Solicitudes
 * IASD Belén · Iglesia Adventista del Séptimo Día
 */

// Catálogo Semilla Definitivo
const LIBROS_SEMILLA = [
    { id: 1, titulo: "Oye tengo algo que decirte", cant: 1, autor: "Fernando Zabala", cat: "Juvenil", estado: "Disponible", ubi: "Sección 2" },
    { id: 2, titulo: "Fuerza para vencer", cant: 1, autor: "Alejandro Bullon", cat: "Juvenil", estado: "Disponible", ubi: "Sección 2" },
    { id: 3, titulo: "Manual del guía mayor", cant: 1, autor: "Oscar Gonzales Corona", cat: "Juvenil", estado: "Disponible", ubi: "Sección 2" },
    { id: 4, titulo: "Felicidad y armonía en el hogar", cant: 1, autor: "Elena G de white", cat: "Espiritu de profecía", estado: "Disponible", ubi: "Sección 2" },
    { id: 5, titulo: "La predicación, la ciencia y el arte de presentar a Jesús", cant: 1, autor: "Pr. Edilso A. Barrera V", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 6, titulo: "Profecías de esperanza. (libro de sermones Tomo 1)", cant: 1, autor: "Édgar redondo R.", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 7, titulo: "Adelante con salud, curso bíblico de salud para niños", cant: 1, autor: "Quiero vivir sano", cat: "Salud", estado: "Disponible", ubi: "Sección 4" },
    { id: 8, titulo: "Predíca la palabra. (16 sermones para predicadores)", cant: 1, autor: "William Barrero Sáenz", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 9, titulo: "28 Creencias adventistas", cant: 2, autor: "Asociación general", cat: "Doctrinal", estado: "Disponible", ubi: "Sección 3" },
    { id: 10, titulo: "Eventos de los últimos días", cant: 1, autor: "Elena G de white", cat: "Espiritu de profecía", estado: "Disponible", ubi: "Sección 2" },
    { id: 11, titulo: "Textos Bíblicos controversiales", cant: 1, autor: "Gerhard Pfandl", cat: "Doctrinal", estado: "Disponible", ubi: "Sección 3" },
    { id: 12, titulo: "Es el alma inmortal", cant: 1, autor: "Robert Leo Odom", cat: "Doctrinal", estado: "Disponible", ubi: "Sección 3" },
    { id: 13, titulo: "El lenguaje del amor", cant: 1, autor: "Nancy Van Pelt", cat: "Juvenil", estado: "Disponible", ubi: "Sección 2" },
    { id: 14, titulo: "Santuario (terrenal)", cant: 1, autor: "William Barrero Sáenz", cat: "Doctrinal", estado: "Disponible", ubi: "Sección 3" },
    { id: 15, titulo: "Santuario (Celestial)", cant: 1, autor: "William Barrero Sáenz", cat: "Doctrinal", estado: "Disponible", ubi: "Sección 3" },
    { id: 16, titulo: "Si podemos conservarlos en la iglesia", cant: 1, autor: "Myrna Tetz y Gary L. Hopkins", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 17, titulo: "Desde el corazón", cant: 1, autor: "Elena G de white", cat: "Espiritu de profecía", estado: "Disponible", ubi: "Sección 2" },
    { id: 18, titulo: "la próxima superpotencia mundial. (2 edición corregida)", cant: 1, autor: "Mark Finify", cat: "Profecía", estado: "En curso", ubi: "Sección 4" },
    { id: 19, titulo: "Empoderados por el Espiritu Santo", cant: 1, autor: "William Barrero Sáenz", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 20, titulo: "revolución en la iglesia", cant: 1, autor: "Russell Burrill", cat: "Doctrinal", estado: "Disponible", ubi: "Sección 3" },
    { id: 21, titulo: "El tesoro escondido", cant: 1, autor: "Pablo M. Claverie", cat: "Juvenil", estado: "Disponible", ubi: "Sección 2" },
    { id: 22, titulo: "Doctrina y salud (52 temas para grupo pequeños)", cant: 1, autor: "William Barrero Sáenz", cat: "Salud", estado: "Disponible", ubi: "Sección 4" },
    { id: 23, titulo: "¿Entiendes lo que lees?", cant: 1, autor: "J. Vladimir Polanco", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 24, titulo: "El rapto secreto un nuevo análisis", cant: 1, autor: "El centinela", cat: "Doctrinal", estado: "Disponible", ubi: "Sección 3" },
    { id: 25, titulo: "Reavivamiento nuestra mayor necesidad", cant: 1, autor: "Elena G de white", cat: "Espiritu de profecía", estado: "Disponible", ubi: "Sección 2" },
    { id: 26, titulo: "Conficto de los siglos (resumido)", cant: 1, autor: "Elena G de white", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 27, titulo: "Consejos para los maestros, padres y alumnos", cant: 1, autor: "Elena G de white", cat: "Espiritu de profecía", estado: "Disponible", ubi: "Sección 2" },
    { id: 28, titulo: "Como crear una atósfera Celestial en el hogar", cant: 1, autor: "Pedro iglesias Ortega. Cecilia Moreno", cat: "Familia", estado: "Disponible", ubi: "Sección 4" },
    { id: 29, titulo: "Fe y obra", cant: 1, autor: "Elena G de white", cat: "Espiritu de profecía", estado: "Disponible", ubi: "Sección 2" },
    { id: 30, titulo: "servicio cristiano ", cant: 1, autor: "Elena G de white", cat: "Espiritu de profecía", estado: "Disponible", ubi: "Sección 2" },
    { id: 31, titulo: "La educación ", cant: 1, autor: "Elena G de white", cat: "Espiritu de profecía", estado: "Disponible", ubi: "Sección 2" },
    { id: 32, titulo: "El conflicto de los siglos", cant: 2, autor: "Elena G de white", cat: "Espiritu de profecía", estado: "Disponible", ubi: "Sección 2" },
    { id: 33, titulo: "Nombres y titulos de Dios (52 temas para grupos pequeños)", cant: 1, autor: "William Barrero Sáenz", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 34, titulo: "Promesas 52 temas para grupos pequeños)", cant: 1, autor: "William Barrero Sáenz", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 35, titulo: "Profecías de esperanza. (libro de sermones Tomo 2)", cant: 1, autor: "William Barrero Sáenz", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 36, titulo: "Milogros (52 temas para grupos pequeños", cant: 1, autor: "William Barrero Sáenz", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 37, titulo: "El camino de la esperanza", cant: 1, autor: "Frankl. Peterson", cat: "Juvenil", estado: "Disponible", ubi: "Sección 2" },
    { id: 38, titulo: "temas del evangelio de Juan", cant: 1, autor: "Ernest Edward Zinke", cat: "Doctrinal", estado: "Disponible", ubi: "Sección 3" },
    { id: 39, titulo: "Aprenda todo sobre sexo con sentido", cant: 1, autor: "Enrique Chaij y francesc x. Gelabert", cat: "Juvenil", estado: "Disponible", ubi: "Sección 2" },
    { id: 40, titulo: "El camino a Cristo", cant: 1, autor: "Elena G de white", cat: "Espiritu de profecía", estado: "Disponible", ubi: "Sección 2" },
    { id: 41, titulo: "¿Quiénes son los adventistas del séptimo día?", cant: 1, autor: "Nancy Weber de Vyhmeister", cat: "Doctrinal", estado: "Disponible", ubi: "Sección 3" },
    { id: 42, titulo: "Esperanza perdida / Esperanza recobrada (historia de la redención resumida)", cant: 1, autor: "Elena G de white", cat: "Espiritu de profecía", estado: "Disponible", ubi: "Sección 2" },
    { id: 43, titulo: "Diccionario filosofico", cant: 1, autor: "Rosental Judin", cat: "Otros", estado: "En curso", ubi: "Sección 5" },
    { id: 44, titulo: "Señales de esperanza", cant: 1, autor: "Edgar Redondo Ramírez", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 45, titulo: "¡Predica! A todo teimpo y fuera de tiempo", cant: 1, autor: "William Barrero Sáenz", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 46, titulo: "El joven y el sexo", cant: 1, autor: "Juan F. Knight", cat: "Juvenil", estado: "Disponible", ubi: "Sección 2" },
    { id: 47, titulo: "El pacto eterno de Dios", cant: 1, autor: "Gerhard F Hasel. Michael G Hasel", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 48, titulo: "Manual del discipulado", cant: 1, autor: "Iglesia Adventista", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 49, titulo: "El poder de la esperanza", cant: 1, autor: "Julián Melgosa y Michael Berges", cat: "Salud", estado: "Disponible", ubi: "Sección 4" },
    { id: 50, titulo: "Verdades eternas (Yo iré)", cant: 1, autor: "Asocentral", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 51, titulo: "La ultima invitación", cant: 1, autor: "Mark Finify y Steven Mosley", cat: "Obra misionera", estado: "Disponible", ubi: "Sección 1" },
    { id: 52, titulo: "Lo que me gusta de tu religión ", cant: 1, autor: "Geoge E. Vandeman", cat: "Doctrinal", estado: "Disponible", ubi: "Sección 3" },
    { id: 53, titulo: "La temperancia", cant: 1, autor: "Elena G de white", cat: "Espiritu de profecía", estado: "Disponible", ubi: "Sección 2" },
    { id: 54, titulo: "Biblioteca del espiritu de profecía (Tomo 1)", cant: 1, autor: "Elena G de white", cat: "Otros", estado: "Disponible", ubi: "Sección 5" },
    { id: 55, titulo: "Biblioteca del espiritu de profecía (Tomo 2)", cant: 1, autor: "Elena G de white", cat: "Otros", estado: "Disponible", ubi: "Sección 5" }
];

let categoriaFiltroSeleccionada = 'todas';

function cargarLibros() {
    if (window.StorageHelper) {
        return StorageHelper.get('libros_biblioteca', LIBROS_SEMILLA);
    }
    try {
        const data = localStorage.getItem('libros_biblioteca');
        return data ? JSON.parse(data) : LIBROS_SEMILLA;
    } catch (e) {
        return LIBROS_SEMILLA;
    }
}

function guardarLibros(libros) {
    if (window.StorageHelper) {
        StorageHelper.set('libros_biblioteca', libros);
    } else {
        localStorage.setItem('libros_biblioteca', JSON.stringify(libros));
    }
}

function cargarPedidos() {
    if (window.StorageHelper) {
        return StorageHelper.get('libros_pedidos', []);
    }
    try {
        return JSON.parse(localStorage.getItem('libros_pedidos')) || [];
    } catch (e) {
        return [];
    }
}

function guardarPedidos(pedidos) {
    if (window.StorageHelper) {
        StorageHelper.set('libros_pedidos', pedidos);
    } else {
        localStorage.setItem('libros_pedidos', JSON.stringify(pedidos));
    }
    window.dispatchEvent(new CustomEvent('datosBibliotecaActualizados'));
}

function actualizarEstadisticas(libros) {
    const total = libros.length;
    const disponibles = libros.filter(l => (l.estado || 'Disponible') === 'Disponible' && l.disponible !== false).length;
    const prestados = total - disponibles;

    const elTotal = document.getElementById('statTotal');
    const elDisp = document.getElementById('statDisponibles');
    const elPrest = document.getElementById('statPrestados');

    if (elTotal) elTotal.textContent = total;
    if (elDisp) elDisp.textContent = disponibles;
    if (elPrest) elPrest.textContent = prestados;
}

function filtrarPorCategoria(cat, btnEl) {
    categoriaFiltroSeleccionada = cat;
    document.querySelectorAll('#contenedorCategoriasPills .pill-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    renderizarCatalogo();
}

function limpiarBuscador() {
    const inp = document.getElementById('buscadorBibliotecaPublica');
    if (inp) inp.value = '';
    const clearBtn = document.getElementById('btnClearSearch');
    if (clearBtn) clearBtn.style.display = 'none';
    renderizarCatalogo();
}

function filtrarBibliotecaPublica() {
    const inp = document.getElementById('buscadorBibliotecaPublica');
    const clearBtn = document.getElementById('btnClearSearch');
    if (clearBtn) clearBtn.style.display = inp && inp.value.trim() ? 'flex' : 'none';
    renderizarCatalogo();
}

function seleccionarLibroParaPedir(titulo) {
    const inputLibro = document.getElementById('solicitanteLibro');
    if (inputLibro) {
        inputLibro.value = titulo;
    }
    const secForm = document.getElementById('pedir-libro');
    if (secForm) {
        secForm.scrollIntoView({ behavior: 'smooth' });
        const inputNombre = document.getElementById('solicitanteNombre');
        if (inputNombre) inputNombre.focus();
    }
}

function renderizarCatalogo() {
    const gridContainer = document.getElementById('gridLibrosContainer');
    const tbody = document.getElementById('tablaLibrosBody');

    const todosLibros = cargarLibros();
    actualizarEstadisticas(todosLibros);

    const buscador = document.getElementById('buscadorBibliotecaPublica');
    const termino = buscador ? buscador.value.trim().toLowerCase() : '';

    const librosFiltrados = todosLibros.filter((libro, idx) => {
        const catText = (libro.cat || libro.categoria || 'General').trim();

        // Filtro por categoría pill
        if (categoriaFiltroSeleccionada !== 'todas') {
            if (catText.toLowerCase() !== categoriaFiltroSeleccionada.toLowerCase()) {
                return false;
            }
        }

        // Filtro por texto
        if (!termino) return true;
        const titulo = (libro.titulo || '').toLowerCase();
        const autor = (libro.autor || '').toLowerCase();
        const cat = catText.toLowerCase();
        const idStr = String(libro.id || (idx + 1)).toLowerCase();
        const numInv = String(libro.numero_inventario || libro.numeroInventario || '').toLowerCase();

        return titulo.includes(termino) || autor.includes(termino) || cat.includes(termino) || idStr.includes(termino) || numInv.includes(termino);
    });

    // 1. Render Grid Cards
    if (gridContainer) {
        if (librosFiltrados.length === 0) {
            gridContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-search"></i>
                    <p>No se encontraron libros que coincidan con la búsqueda.</p>
                    <button class="btn-clear-filter" data-csp-click="limpiarBuscador()">Restablecer Búsqueda</button>
                </div>
            `;
        } else {
            gridContainer.innerHTML = librosFiltrados.map((libro, idx) => {
                const cant = libro.cant || libro.cantidad || 1;
                const cat = libro.cat || libro.categoria || 'General';
                const ubi = libro.ubi || libro.ubicacion || 'Sección General';
                const autor = libro.autor || 'Autor Desconocido';
                const estado = libro.estado || 'Disponible';
                const esDisponible = estado === 'Disponible' && libro.disponible !== false;
                const idMostrar = (libro.numero_inventario || libro.numeroInventario) || (String(libro.id).length > 8 ? (idx + 1) : libro.id);
                const portada = libro.portada_url || libro.portada || '';

                return `
                    <div class="card-libro">
                        <div class="card-cover ${!portada ? 'cover-placeholder' : ''}">
                            ${portada ? `<img src="${portada}" alt="${libro.titulo}" loading="lazy">` : `<div class="cover-icon"><i class="fas fa-book"></i></div>`}
                            <span class="badge-cat">${cat}</span>
                            <span class="badge-status ${esDisponible ? 'disponible' : 'prestado'}">
                                <i class="fas ${esDisponible ? 'fa-check-circle' : 'fa-clock'}"></i> ${estado}
                            </span>
                        </div>
                        <div class="card-body">
                            <div class="card-id">#${idMostrar}</div>
                            <h4 class="card-titulo" title="${libro.titulo}">${libro.titulo}</h4>
                            <p class="card-autor"><i class="fas fa-feather-alt"></i> ${autor}</p>
                            <div class="card-meta">
                                <span><i class="fas fa-map-marker-alt"></i> ${ubi}</span>
                                <span><i class="fas fa-layer-group"></i> ${cant} Ejemplar(es)</span>
                            </div>
                            <button data-csp-click="seleccionarLibroParaPedir('${libro.titulo.replace(/'/g, "\\'")}')" class="btn-pedir-card">
                                <i class="fas fa-hand-holding-box"></i> Pedir este libro
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }

    // 2. Render Tabla Secundaria
    if (tbody) {
        if (librosFiltrados.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--muted-text);">Sin resultados.</td></tr>';
        } else {
            tbody.innerHTML = librosFiltrados.map((libro, idx) => {
                const cant = libro.cant || libro.cantidad || 1;
                const cat = libro.cat || libro.categoria || 'General';
                const ubi = libro.ubi || libro.ubicacion || '-';
                const autor = libro.autor || '';
                const estado = libro.estado || 'Disponible';
                const esDisponible = estado === 'Disponible' && libro.disponible !== false;
                const idMostrar = (libro.numero_inventario || libro.numeroInventario) || (String(libro.id).length > 8 ? (idx + 1) : libro.id);

                return `
                    <tr>
                        <td><strong>#${idMostrar}</strong></td>
                        <td style="font-weight: 600;">${libro.titulo}</td>
                        <td style="text-align: center;">${cant}</td>
                        <td>${autor}</td>
                        <td><span class="badge-cat-table">${cat}</span></td>
                        <td style="text-align: center;">
                            <span class="badge-status-table ${esDisponible ? 'disponible' : 'prestado'}">${estado}</span>
                        </td>
                        <td>${ubi}</td>
                        <td style="text-align: center;">
                            <button data-csp-click="seleccionarLibroParaPedir('${libro.titulo.replace(/'/g, "\\'")}')" class="btn-table-action" title="Solicitar Préstamo">
                                <i class="fas fa-hand-holding"></i>
                            </button>
                        </td>
                    </tr>
                `;
            }).join('');
        }
    }
}

function enviarSolicitud(event) {
    if (event && event.preventDefault) event.preventDefault();

    const nombreEl = document.getElementById('solicitanteNombre');
    const whatsappEl = document.getElementById('solicitanteWhatsapp');
    const emailEl = document.getElementById('solicitanteEmail');
    const libroEl = document.getElementById('solicitanteLibro');

    const nombre = nombreEl ? nombreEl.value.trim() : '';
    const whatsapp = whatsappEl ? whatsappEl.value.trim() : '';
    const email = emailEl ? emailEl.value.trim() : '';
    const libro = libroEl ? libroEl.value.trim() : '';

    if (!nombre || !libro) {
        alert('⚠️ Por favor ingresa tu nombre completo y el título del libro.');
        return;
    }

    const pedidos = cargarPedidos();
    pedidos.push({
        id: String(Date.now()),
        libroId: 0,
        solicitante: nombre,
        telefono: whatsapp || 'No especificado',
        email: email || 'No especificado',
        fecha: new Date().toISOString(),
        estado: 'Pendiente',
        tituloLibro: libro
    });
    guardarPedidos(pedidos);

    const modal = document.getElementById('modalConfirmacion');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    if (nombreEl) nombreEl.value = '';
    if (whatsappEl) whatsappEl.value = '';
    if (emailEl) emailEl.value = '';
    if (libroEl) libroEl.value = '';
}

function cerrarModalConfirmacion(e) {
    const modal = document.getElementById('modalConfirmacion');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Exponer funciones en window
window.filtrarPorCategoria = filtrarPorCategoria;
window.limpiarBuscador = limpiarBuscador;
window.filtrarBibliotecaPublica = filtrarBibliotecaPublica;
window.seleccionarLibroParaPedir = seleccionarLibroParaPedir;
window.renderizarCatalogo = renderizarCatalogo;
window.enviarSolicitud = enviarSolicitud;
window.cerrarModalConfirmacion = cerrarModalConfirmacion;

// =========================================================================
// BIBLIOTECA ELENA G. DE WHITE
// =========================================================================

const librosEGW = [
  { id: 'AFC', titulo: 'A fin de conocerle', enlace: 'https://m.egwwritings.org/es/book/1745', descripcion: 'Una valiosa colección de lecturas devocionales diarias centradas en profundizar nuestra relación personal y contemplación del carácter de Jesús.' },
  { id: 'ATO', titulo: 'Alza tus ojos', enlace: 'https://m.egwwritings.org/es/book/1700.515/toc', descripcion: 'Lecturas espirituales que nos invitan a elevar nuestra mirada por encima de las pruebas terrenales hacia la esperanza celestial y las promesas de Dios.' },
  { id: 'CDD', titulo: 'Cada día con Dios', enlace: 'https://m.egwwritings.org/es/book/1699.2772', descripcion: 'Reflexiones diarias inspiradas para guiar el caminar cristiano, fortaleciendo la fe y la comunión con el Padre celestial en todo momento.' },
  { id: 'CC', titulo: 'El camino a Cristo', enlace: 'https://m.egwwritings.org/es/book/1749', descripcion: 'Obra maestra espiritual que presenta de forma sencilla y conmovedora los pasos para encontrar el perdón, la paz y la salvación en Jesucristo.' },
  { id: 'CE', titulo: 'El colportor evangélico', enlace: 'https://m.egwwritings.org/es/book/172.706', descripcion: 'Guía fundamental para el ministerio de las publicaciones, destacando la importancia del trabajo misionero a través de la literatura.' },
  { id: 'CN', titulo: 'La conducción del niño', enlace: 'https://m.egwwritings.org/es/book/157', descripcion: 'Principios inspirados para padres y educadores sobre la crianza infantil, el desarrollo del carácter y la educación cristiana en el hogar.' },
  { id: 'CS', titulo: 'El conflicto de los siglos', enlace: 'https://m.egwwritings.org/es/book/1710', descripcion: 'Un recorrido profético e histórico fascinante desde la destrucción de Jerusalén hasta la restauración de la Tierra Nueva.' },
  { id: 'CV', titulo: 'Conflicto y valor', enlace: 'https://m.egwwritings.org/es/book/1712', descripcion: 'Estudio inspirador sobre la vida de grandes patriarcas y héroes de la fe bíblica que demostraron valor en medio de la prueba.' },
  { id: 'CI', titulo: 'Consejos para la Iglesia', enlace: 'https://m.egwwritings.org/es/book/1698', descripcion: 'Una valiosa selección de testimonios y exhortaciones prácticas para el crecimiento espiritual y la unidad de la iglesia adventista.' },
  { id: 'CM', titulo: 'Consejos para los maestros', enlace: 'https://m.egwwritings.org/es/book/162.2#18', descripcion: 'Orientación fundamental para educadores, padres y estudiantes sobre la verdadera educación física, mental y espiritual.' },
  { id: 'CRA', titulo: 'Consejos sobre el régimen alimenticio', enlace: 'https://m.egwwritings.org/es/book/1697', descripcion: 'Principios de salud integral y nutrición que promueven un estilo de vida equilibrado para mantener la vitalidad del cuerpo y la mente.' },
  { id: 'COES', titulo: 'Consejos sobre la obra de la escuela sabática', enlace: 'https://m.egwwritings.org/es/book/1711', descripcion: 'Instrucciones prácticas para dinamizar el estudio bíblico congregacional y potenciar el evangelismo en las clases.' },
  { id: 'CMC', titulo: 'Consejos sobre mayordomía cristiana', enlace: 'https://m.egwwritings.org/es/book/164', descripcion: 'Principios bíblicos sobre la administración de nuestros talentos, tiempo y recursos materiales con fidelidad ante Dios.' },
  { id: 'CSa', titulo: 'Consejos sobre la salud', enlace: 'https://m.egwwritings.org/es/book/163', descripcion: 'Una visión preventiva y restauradora del bienestar físico, mental y espiritual, enfatizando el cuidado de la salud como ministerio.' },
  { id: 'CSan', titulo: 'Cristo en su santuario', enlace: 'https://m.egwwritings.org/es/book/1746', descripcion: 'Profundo estudio sobre el ministerio sacerdotal de Jesucristo en el santuario celestial y el significado del día de la expiación.' },
  { id: 'CT', titulo: 'Cristo triunfante', enlace: 'https://m.egwwritings.org/es/book/1750', descripcion: 'Devocionario diario que resalta la victoria definitiva de Cristo sobre las fuerzas del mal y la gloriosa recompensa de los creyentes.' },
  { id: 'DCC', titulo: 'De la ciudad al campo', enlace: 'https://m.egwwritings.org/es/book/13897.2?ss=eyJwYXJhbXMiOnsicXVlcnkiOiJEZSBsYSBjaXVkYWQgYWwgY2FtcG8iLCJsYW5nIjoiZXMifSwic2dfaW5kZXgiOiIwIn0%3D#2', descripcion: 'Consejos oportunos sobre los beneficios de vivir en ambientes rurales para cultivar una vida en armonía con la naturaleza y Dios.' },
  { id: 'DTG', titulo: 'El Deseado de todas las gentes', enlace: 'https://m.egwwritings.org/es/book/1754', descripcion: 'Monumental biografía de la vida de Jesús que revela el inmenso amor de Dios manifestado en el Salvador de la humanidad.' },
  { id: 'DNC', titulo: 'Dios nos cuida', enlace: 'https://m.egwwritings.org/es/book/1748', descripcion: 'Mensajes reconfortantes de aliento y providencia divina que recuerdan el constante amor y protección de Dios por sus hijos.' },
  { id: 'DMJ', titulo: 'El discurso maestro de Jesucristo', enlace: 'https://m.egwwritings.org/es/book/1703', descripcion: 'Exposición magistral del Sermón del Monte, descubriendo la belleza de las bienaventuranzas y los principios del Reino.' },
  { id: 'Ed', titulo: 'La educación', enlace: 'https://m.egwwritings.org/es/book/1702', descripcion: 'Un tratado clásico sobre la verdadera educación, cuyo objetivo supremo es restaurar la imagen de Dios en el ser humano.' },
  { id: 'EC', titulo: 'La educación cristiana', enlace: 'https://m.egwwritings.org/es/book/1703', descripcion: 'Orientaciones clave para formar instituciones educativas con sólidos principios éticos, espirituales y académicos.' },
  { id: 'ELC', titulo: 'En los lugares celestiales', enlace: 'https://m.egwwritings.org/es/book/1751', descripcion: 'Lecturas diarias que motivan a vivir victoriosamente en Cristo, experimentando la gracia y el poder del Espíritu Santo.' },
  { id: 'Ev', titulo: 'El evangelismo', enlace: 'https://m.egwwritings.org/es/book/176', descripcion: 'Manual comprensivo sobre estrategias, principios e instrucción práctica para proclamar eficazmente el evangelio a todo el mundo.' },
  { id: 'EUD', titulo: 'Eventos de los últimos días', enlace: 'https://m.egwwritings.org/es/book/1709', descripcion: 'Compilación profética detallada sobre las señales de los tiempos, la crisis final y la gloriosa segunda venida de Cristo.' },
  { id: 'EJ', titulo: 'Exaltad a Jesús', enlace: 'https://m.egwwritings.org/es/book/1708', descripcion: 'Devocionales centrados en exaltar el carácter de Cristo, impulsándonos a reflejar su pureza y gracia en nuestro entorno.' },
  { id: 'FV', titulo: 'La fe por la cual vivo', enlace: 'https://m.egwwritings.org/es/book/1753', descripcion: 'Resumen claro de las doctrinas bíblicas fundamentales presentadas como verdades vivas para sostener nuestra fe diaria.' },
  { id: 'FO', titulo: 'Fe y obras', enlace: 'https://m.egwwritings.org/es/book/1707', descripcion: 'Clarificación bíblica sobre la relación armoniosa entre la salvación por la gracia mediante la fe y los frutos de la obediencia.' },
  { id: 'HAp', titulo: 'Los hechos de los apóstoles', enlace: 'https://m.egwwritings.org/es/book/1768', descripcion: 'Fascinante narrativa sobre el surgimiento de la iglesia cristiana primitiva, sus desafíos, victorias y la fuerza del Espíritu.' },
  { id: 'HD', titulo: 'Hijas de Dios', enlace: 'https://m.egwwritings.org/es/book/182', descripcion: 'Mensajes dirigidos especialmente a la mujer cristiana, destacando su elevado rol en la familia, la iglesia y la sociedad.' },
  { id: 'HH', titulo: 'Hijos e hijas de Dios', enlace: 'https://m.egwwritings.org/es/book/1705', descripcion: 'Devocionales enriquecedores sobre la adopción espiritual que nos otorga el privilegio de ser parte de la familia celestial.' },
  { id: 'HR', titulo: 'La historia de la redención', enlace: 'https://m.egwwritings.org/es/book/189', descripcion: 'Panorama conciso del gran conflicto entre el bien y el mal, desde la caída de Lucifer hasta el triunfo final de Dios.' },
  { id: 'IR', titulo: 'La iglesia remanente', enlace: 'https://m.egwwritings.org/es/book/1762', descripcion: 'Estudio histórico y profético sobre la identidad, misión y destino de la iglesia de los últimos tiempos.' },
  { id: '1JT', titulo: 'Joyas de los testimonios, Tomo 1', enlace: 'https://m.egwwritings.org/es/book/1696', descripcion: 'Selección especial de mensajes y exhortaciones oportunas para orientar a los creyentes en su vida práctica e institucional.' },
  { id: '2JT', titulo: 'Joyas de los testimonios, Tomo 2', enlace: 'https://m.egwwritings.org/es/book/1695.2?ss=eyJwYXJhbXMiOnsicXVlcnkiOiJKb3lhcyBkZSBsb3MgdGVzdGltb25pb3MgMiIsImxhbmciOiJlcyJ9LCJzZ19pbmRleCI6IjAifQ%3D%3D#2', descripcion: 'Continuación de testimonios inspirados que abarcan la santidad, el servicio misionero y la consolidación de la iglesia.' },
  { id: '3JT', titulo: 'Joyas de los testimonios, Tomo 3', enlace: 'https://m.egwwritings.org/es/book/1694.2?ss=eyJwYXJhbXMiOnsicXVlcnkiOiJKb3lhcyBkZSBsb3MgdGVzdGltb25pb3MgMyIsImxhbmciOiJlcyJ9LCJzZ19pbmRleCI6IjAifQ%3D%3D#2', descripcion: 'Tercer volumen con orientaciones solemnes para preparar al pueblo de Dios para las pruebas finales y la eternidad.' },
  { id: 'Mar', titulo: '¡Maranata: el Señor viene!', enlace: 'https://m.egwwritings.org/es/book/1768.2?ss=eyJwYXJhbXMiOnsicXVlcnkiOiLCoU1hcmFuYXRhOiBlbCBTZcOxb3IgdmllbmUhIiwibGFuZyI6ImVzIn0sInNnX2luZGV4IjoiMCJ9#2', descripcion: 'Devocionales enfocados en la pronta venida de Jesús, llamando a la preparación espiritual constante y a la esperanza activa.' },
  { id: 'MGD', titulo: 'La maravillosa gracia de Dios', enlace: 'https://m.egwwritings.org/es/book/1763', descripcion: 'Reflexiones diarias inspiradoras que celebran la inagotable gracia de Dios que transforma, perdona y sostiene al pecador.' },
  { id: 'MJ', titulo: 'Mensajes para los jóvenes', enlace: 'https://m.egwwritings.org/es/book/1769', descripcion: 'Consejos directos e inspiradores para la juventud sobre el carácter, noviazgo, decisiones de vida y servicio a Dios.' },
  { id: '1MS', titulo: 'Mensajes selectos, Tomo 1', enlace: 'https://m.egwwritings.org/es/book/1777', descripcion: 'Recopilación de artículos fundamentales sobre la inspiración de las Escrituras, la justificación por la fe y la unidad.' },
  { id: '2MS', titulo: 'Mensajes selectos, Tomo 2', enlace: 'https://m.egwwritings.org/es/book/201', descripcion: 'Artículos y cartas oportunas sobre salud, movimientos engañosos y el orden en las instituciones adventistas.' },
  { id: '3MS', titulo: 'Mensajes selectos, Tomo 3', enlace: 'https://m.egwwritings.org/es/book/202', descripcion: 'Documentos valiosos con orientaciones sobre administración, estilo de vida y testimonios de la historia de la iglesia.' },
  { id: '1MCP', titulo: 'Mente, carácter y personalidad, Tomo 1', enlace: 'https://m.egwwritings.org/es/book/1770', descripcion: 'Estudio pionero de psicología cristiana sobre el funcionamiento de la mente humana, las emociones y la formación del carácter.' },
  { id: '2MCP', titulo: 'Mente, carácter y personalidad, Tomo 2', enlace: 'https://m.egwwritings.org/es/book/1771', descripcion: 'Segundo volumen que profundiza en la salud mental, el control de los pensamientos y la sanación espiritual y emocional.' },
  { id: 'MC', titulo: 'El ministerio de curación', enlace: 'https://m.egwwritings.org/es/book/1757', descripcion: 'Manual esencial sobre la medicina preventiva, el remedio de la naturaleza y el ministerio compasivo de Jesús con los enfermos.' },
  { id: 'MB', titulo: 'El ministerio de la bondad', enlace: 'https://m.egwwritings.org/es/book/1758', descripcion: 'Principios para la acción social cristiana y la ayuda a los desfavorecidos, viudas, huérfanos y necesitados.' },
  { id: 'MPa', titulo: 'El ministerio pastoral', enlace: 'https://m.egwwritings.org/es/book/1773', descripcion: 'Consejos prácticos y solemnes dirigidos a pastores y líderes sobre el cuidado de la grey y la predicación del evangelio.' },
  { id: 'NB', titulo: 'Notas biográficas', enlace: 'https://m.egwwritings.org/es/book/14075', descripcion: 'Autobiografía y biografía inspiradora que narra la vida, visiones y ministerio profético de Elena G. de White.' },
  { id: 'NEV', titulo: 'Nuestra elevada vocación', enlace: 'https://m.egwwritings.org/es/book/1778', descripcion: 'Lecturas diarias que invitan a alcanzar la excelencia moral y espiritual a la que somos llamados como seguidores de Cristo.' },
  { id: 'PVGM', titulo: 'Palabras de vida del gran Maestro', enlace: 'https://m.egwwritings.org/es/book/210', descripcion: 'Fascinante explicación espiritual de las parábolas de Jesús y sus lecciones profundas para la vida cotidiana.' }
];

function mostrarBibliotecaGeneral() {
    const secGen = document.getElementById('seccionBibliotecaGeneral');
    const secEGW = document.getElementById('seccionBibliotecaEGW');
    const btnGen = document.getElementById('tabBtnGeneral');
    const btnEGW = document.getElementById('tabBtnEGW');

    if (secGen) secGen.style.display = 'block';
    if (secEGW) secEGW.style.display = 'none';

    if (btnGen) btnGen.classList.add('active');
    if (btnEGW) btnEGW.classList.remove('active');
}

function mostrarBibliotecaEGW() {
    const secGen = document.getElementById('seccionBibliotecaGeneral');
    const secEGW = document.getElementById('seccionBibliotecaEGW');
    const btnGen = document.getElementById('tabBtnGeneral');
    const btnEGW = document.getElementById('tabBtnEGW');

    if (secGen) secGen.style.display = 'none';
    if (secEGW) secEGW.style.display = 'block';

    if (btnGen) btnGen.classList.remove('active');
    if (btnEGW) btnEGW.classList.add('active');

    renderizarLibrosEGW();
}

function renderizarLibrosEGW() {
    const container = document.getElementById('gridLibrosEGWContainer');
    if (!container) return;

    const buscador = document.getElementById('buscadorEGW');
    const termino = buscador ? buscador.value.trim().toLowerCase() : '';

    const librosFiltrados = librosEGW.filter(libro => {
        if (!termino) return true;
        const titulo = (libro.titulo || '').toLowerCase();
        const autor = 'elena g. de white';
        const id = (libro.id || '').toLowerCase();
        return titulo.includes(termino) || autor.includes(termino) || id.includes(termino);
    });

    if (librosFiltrados.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <p>No se encontraron libros de Elena G. de White que coincidan con la búsqueda.</p>
                <button class="btn-clear-filter" data-csp-click="limpiarBuscadorEGW()">Restablecer Búsqueda</button>
            </div>
        `;
        return;
    }

    container.innerHTML = librosFiltrados.map(libro => {
        const tituloEscaped = libro.titulo.replace(/'/g, "\\'");
        const enlaceEscaped = libro.enlace.replace(/'/g, "\\'");
        return `
            <div class="libro-egw-card" data-csp-click="abrirLinkEGW('${enlaceEscaped}')">
                <div class="card-badge">EGW</div>
                <h3>${libro.titulo}</h3>
                <p class="autor"><i class="fas fa-pen"></i> Elena G. de White</p>
                <p class="descripcion">${libro.descripcion}</p>
                <a href="${libro.enlace}" target="_blank" rel="noopener noreferrer" class="btn-ver-libro" data-csp-click="event.stopPropagation()">Ver libro <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
    }).join('');
}

function filtrarBibliotecaEGW() {
    const inp = document.getElementById('buscadorEGW');
    const clearBtn = document.getElementById('btnClearSearchEGW');
    if (clearBtn) clearBtn.style.display = inp && inp.value.trim() ? 'flex' : 'none';
    renderizarLibrosEGW();
}

function limpiarBuscadorEGW() {
    const inp = document.getElementById('buscadorEGW');
    if (inp) inp.value = '';
    const clearBtn = document.getElementById('btnClearSearchEGW');
    if (clearBtn) clearBtn.style.display = 'none';
    renderizarLibrosEGW();
}

function abrirLinkEGW(enlace) {
    if (enlace) {
        window.open(enlace, '_blank', 'noopener,noreferrer');
    }
}

// Exponer funciones en window
window.librosEGW = librosEGW;
window.mostrarBibliotecaGeneral = mostrarBibliotecaGeneral;
window.mostrarBibliotecaEGW = mostrarBibliotecaEGW;
window.renderizarLibrosEGW = renderizarLibrosEGW;
window.filtrarBibliotecaEGW = filtrarBibliotecaEGW;
window.limpiarBuscadorEGW = limpiarBuscadorEGW;
window.abrirLinkEGW = abrirLinkEGW;

document.addEventListener('DOMContentLoaded', function () {
    renderizarCatalogo();
    window.addEventListener('datosBibliotecaActualizados', renderizarCatalogo);
    window.addEventListener('storage', function (e) {
        if (e.key === 'libros_biblioteca' || e.key === 'libros_pedidos') {
            renderizarCatalogo();
        }
    });
});
