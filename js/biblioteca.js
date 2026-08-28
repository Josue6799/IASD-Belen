/**
 * Biblioteca Virtual · IASD Belén
 * Lógica Completa e Independiente del Catálogo, Búsqueda, Filtros y Préstamos
 */

(function () {
    'use strict';

    const STORAGE_LIBROS = 'libros_biblioteca';
    const STORAGE_PEDIDOS = 'libros_pedidos';

    // Catálogo por defecto enriquecido para inicialización offline-first
    const LIBROS_DEFAULT = [
        { id: 1, titulo: "El Conflicto de los Siglos", autor: "Elena G. de White", cat: "Espiritu de profecía", estado: "Disponible", cant: 3, ubi: "Estante 1" },
        { id: 2, titulo: "El Deseado de Todas las Gentes", autor: "Elena G. de White", cat: "Espiritu de profecía", estado: "Disponible", cant: 2, ubi: "Estante 1" },
        { id: 3, titulo: "Patriarcas y Profetas", autor: "Elena G. de White", cat: "Espiritu de profecía", estado: "Disponible", cant: 2, ubi: "Estante 1" },
        { id: 4, titulo: "Profetas y Reyes", autor: "Elena G. de White", cat: "Espiritu de profecía", estado: "Disponible", cant: 2, ubi: "Estante 1" },
        { id: 5, titulo: "Los Hechos de los Apóstoles", autor: "Elena G. de White", cat: "Espiritu de profecía", estado: "Disponible", cant: 2, ubi: "Estante 1" },
        { id: 6, titulo: "El Camino a Cristo", autor: "Elena G. de White", cat: "Espiritu de profecía", estado: "Disponible", cant: 5, ubi: "Estante 1" },
        { id: 7, titulo: "El Ministerio de Curación", autor: "Elena G. de White", cat: "Salud", estado: "Disponible", cant: 2, ubi: "Estante 2" },
        { id: 8, titulo: "Consejos sobre el Régimen Alimenticio", autor: "Elena G. de White", cat: "Salud", estado: "Disponible", cant: 1, ubi: "Estante 2" },
        { id: 9, titulo: "Consejos para los Maestros", autor: "Elena G. de White", cat: "Familia", estado: "Disponible", cant: 1, ubi: "Estante 2" },
        { id: 10, titulo: "La Educación", autor: "Elena G. de White", cat: "Familia", estado: "Disponible", cant: 3, ubi: "Estante 2" },
        { id: 11, titulo: "El Hogar Cristiano", autor: "Elena G. de White", cat: "Familia", estado: "Disponible", cant: 4, ubi: "Estante 2" },
        { id: 12, titulo: "Conducción del Niño", autor: "Elena G. de White", cat: "Familia", estado: "Disponible", cant: 2, ubi: "Estante 2" },
        { id: 13, titulo: "Mensajes para los Jóvenes", autor: "Elena G. de White", cat: "Juvenil", estado: "Disponible", cant: 3, ubi: "Estante 3" },
        { id: 14, titulo: "El Gran Conflicto Explicado", autor: "C. Mervyn Maxwell", cat: "Doctrinal", estado: "Disponible", cant: 1, ubi: "Estante 3" },
        { id: 15, titulo: "Díganlo al Mundo", autor: "C. Mervyn Maxwell", cat: "Obra misionera", estado: "Disponible", cant: 2, ubi: "Estante 3" },
        { id: 16, titulo: "En los Pasos del Gran Médico", autor: "Dr. Hans Diehl", cat: "Salud", estado: "Disponible", cant: 2, ubi: "Estante 2" },
        { id: 17, titulo: "Creencias de los Adventistas del 7° Día", autor: "Asociación General IASD", cat: "Doctrinal", estado: "Disponible", cant: 3, ubi: "Estante 3" },
        { id: 18, titulo: "Manual de Iglesia", autor: "Asociación General IASD", cat: "Doctrinal", estado: "Disponible", cant: 2, ubi: "Estante 3" },
        { id: 19, titulo: "Daniel y el Apocalipsis", autor: "Uriah Smith", cat: "Doctrinal", estado: "Disponible", cant: 1, ubi: "Estante 3" },
        { id: 20, titulo: "Hijos e Hijas de Dios", autor: "Elena G. de White", cat: "Espiritu de profecía", estado: "Disponible", cant: 2, ubi: "Estante 1" },
        { id: 21, titulo: "Mente, Carácter y Personalidad (Tomo 1)", autor: "Elena G. de White", cat: "Salud", estado: "Disponible", cant: 1, ubi: "Estante 2" },
        { id: 22, titulo: "Mente, Carácter y Personalidad (Tomo 2)", autor: "Elena G. de White", cat: "Salud", estado: "Disponible", cant: 1, ubi: "Estante 2" },
        { id: 23, titulo: "Eventos de los Últimos Días", autor: "Elena G. de White", cat: "Espiritu de profecía", estado: "Disponible", cant: 3, ubi: "Estante 1" },
        { id: 24, titulo: "Palabras de Vida del Gran Maestro", autor: "Elena G. de White", cat: "Espiritu de profecía", estado: "Disponible", cant: 2, ubi: "Estante 1" },
        { id: 25, titulo: "El Discurso Maestro de Jesucristo", autor: "Elena G. de White", cat: "Espiritu de profecía", estado: "Disponible", cant: 2, ubi: "Estante 1" }
    ];

    // Obras completas de Elena G. de White (EGW) con enlaces directos a EGW Writings
    const LIBROS_EGW = [
        { id: 1, titulo: "A fin de conocerle (AFC)", desc: "Reflexiones devocionales diarias para profundizar en el conocimiento personal y transformador de Jesús.", url: "https://m.egwwritings.org/es/book/1745", cat: "Devocional" },
        { id: 2, titulo: "Alza tus ojos (ATO)", desc: "Mensajes inspiradores matutinos que invitan a elevar la mirada hacia las sublimes realidades celestiales.", url: "https://m.egwwritings.org/es/book/1700.515/toc", cat: "Devocional" },
        { id: 3, titulo: "Cada día con Dios (CDD)", desc: "Lecturas diarias orientadas a fortalecer una comunión íntima y constante con el Señor.", url: "https://m.egwwritings.org/es/book/1699.2772", cat: "Devocional" },
        { id: 4, titulo: "El camino a Cristo (CC)", desc: "Una de las guías espirituales más queridas hacia la conversión y una relación viva con Jesucristo.", url: "https://m.egwwritings.org/es/book/1749", cat: "Vida Cristiana" },
        { id: 5, titulo: "El colportor evangélico (CE)", desc: "Instrucciones fundamentales sobre el ministerio de las publicaciones y la difusión del mensaje salvador.", url: "https://m.egwwritings.org/es/book/172.706", cat: "Obra Misionera" },
        { id: 6, titulo: "La conducción del niño (CN)", desc: "Consejos sabios y prácticos para los padres sobre la formación del carácter y la disciplina con amor.", url: "https://m.egwwritings.org/es/book/157", cat: "Familia" },
        { id: 7, titulo: "El conflicto de los siglos (CS)", desc: "La historia monumental de la gran controversia cósmica entre el bien y el mal hasta la Tierra Nueva.", url: "https://m.egwwritings.org/es/book/1710", cat: "Serie Conflicto" },
        { id: 8, titulo: "Conflicto y valor (CV)", desc: "Relatos biográficos y lecciones de fe inspirados en los héroes bíblicos del gran conflicto universal.", url: "https://m.egwwritings.org/es/book/1712", cat: "Devocional" },
        { id: 9, titulo: "Consejos para la Iglesia (CI)", desc: "Compilación selecta de directrices y testimonios para la orientación y el crecimiento espiritual de la iglesia.", url: "https://m.egwwritings.org/es/book/1698", cat: "Testimonios" },
        { id: 10, titulo: "Consejos para los maestros (CM)", desc: "Orientación integral para educadores, padres y líderes sobre la verdadera educación cristiana.", url: "https://m.egwwritings.org/es/book/162.2#18", cat: "Educación" },
        { id: 11, titulo: "Consejos sobre el régimen alimenticio (CRA)", desc: "Principios de nutrición sana, temperancia y salud integral revelados por Dios para Su pueblo.", url: "https://m.egwwritings.org/es/book/1697", cat: "Salud y Vida" },
        { id: 12, titulo: "Consejos sobre la obra de la escuela sabática (COES)", desc: "Pautas clave para dinamizar la Escuela Sabática, el estudio de la Biblia y el servicio misionero.", url: "https://m.egwwritings.org/es/book/1711", cat: "Ministerio" },
        { id: 13, titulo: "Consejos sobre mayordomía cristiana (CMC)", desc: "El privilegio y la responsabilidad de administrar fielmente los recursos, dones y tiempo encomendados por Dios.", url: "https://m.egwwritings.org/es/book/164", cat: "Vida Cristiana" },
        { id: 14, titulo: "Consejos sobre la salud (CSa)", desc: "Enseñanzas para el cuidado físico, mental y espiritual, promoviendo el bienestar integral.", url: "https://m.egwwritings.org/es/book/163", cat: "Salud y Vida" },
        { id: 15, titulo: "Cristo en su santuario", desc: "Exposición bíblica del ministerio sumo sacerdotal de Jesucristo en el Santuario Celestial.", url: "https://m.egwwritings.org/es/book/1746", cat: "Doctrinal" },
        { id: 16, titulo: "Cristo triunfante", desc: "Meditaciones diarias que exaltan las gloriosas victorias de Cristo a lo largo de la historia de la redención.", url: "https://m.egwwritings.org/es/book/1750", cat: "Devocional" },
        { id: 17, titulo: "De la ciudad al campo", desc: "Llamados solemnes y consejos prácticos para establecer los hogares cristianos en entornos naturales.", url: "https://m.egwwritings.org/es/book/13897.2?ss=eyJwYXJhbXMiOnsicXVlcnkiOiJEZSBsYSBjaXVkYWQgYWwgY2FtcG8iLCJsYW5nIjoiZXMifSwic2dfaW5kZXgiOiIwIn0%3D#2", cat: "Vida Práctica" },
        { id: 18, titulo: "El Deseado de todas las gentes (DTG)", desc: "La obra cumbre sobre la vida, sacrificio redentor y ministerio eterno de nuestro Señor Jesucristo.", url: "https://m.egwwritings.org/es/book/1754", cat: "Serie Conflicto" },
        { id: 19, titulo: "Dios nos cuida", desc: "Mensajes reconfortantes de esperanza, paz y la protección inquebrantable de la providencia divina.", url: "https://m.egwwritings.org/es/book/1748", cat: "Devocional" },
        { id: 20, titulo: "El discurso maestro de Jesucristo (DMJ)", desc: "Comentario espiritual del Sermón del Monte y las Bienaventuranzas pronunciadas por Jesús.", url: "https://m.egwwritings.org/es/book/1703", cat: "Enseñanza Bíblica" },
        { id: 21, titulo: "La educación (Ed)", desc: "El modelo pedagógico celestial que busca restaurar en la persona la imagen de su Creador.", url: "https://m.egwwritings.org/es/book/1702", cat: "Educación" },
        { id: 22, titulo: "La educación cristiana (EC)", desc: "Principios esenciales para cimentar la formación intelectual sobre la roca de la verdad bíblica.", url: "https://m.egwwritings.org/es/book/1703", cat: "Educación" },
        { id: 23, titulo: "En los lugares celestiales", desc: "Meditaciones devocionales sobre la sublime santificación y los privilegios espirituales en Cristo.", url: "https://m.egwwritings.org/es/book/1751", cat: "Devocional" },
        { id: 24, titulo: "El evangelismo (Ev)", desc: "Estrategias de predicación, evangelización pública y personal inspiradas por el Espíritu de Profecía.", url: "https://m.egwwritings.org/es/book/176", cat: "Obra Misionera" },
        { id: 25, titulo: "Eventos de los últimos días (EUD)", desc: "Recopilación cronológica y profética sobre el tiempo del fin, la crisis mundial y la Segunda Venida.", url: "https://m.egwwritings.org/es/book/1709", cat: "Profecía" },
        { id: 26, titulo: "Exaltad a Jesús (EJ)", desc: "Devocionario matutino centrado en exaltar la gracia, pureza y divinidad de Cristo en la vida diaria.", url: "https://m.egwwritings.org/es/book/1708", cat: "Devocional" },
        { id: 27, titulo: "La fe por la cual vivo (FV)", desc: "Exposición amena y devocional de las doctrinas adventistas fundamentales.", url: "https://m.egwwritings.org/es/book/1753", cat: "Devocional" },
        { id: 28, titulo: "Fe y obras (FO)", desc: "Estudio esclarecedor sobre la justificación por la fe en Cristo y el fruto genuino de la obediencia.", url: "https://m.egwwritings.org/es/book/1707", cat: "Doctrinal" },
        { id: 29, titulo: "Los hechos de los apóstoles (HAp)", desc: "La historia épica de la iglesia apostólica y el derramamiento del Espíritu Santo en el siglo I.", url: "https://m.egwwritings.org/es/book/1768", cat: "Serie Conflicto" },
        { id: 30, titulo: "Hijas de Dios (HD)", desc: "Mensajes motivadores sobre la trascendental labor de las mujeres en la causa de Dios.", url: "https://m.egwwritings.org/es/book/182", cat: "Vida Cristiana" },
        { id: 31, titulo: "Hijos e hijas de Dios (HH)", desc: "Reflexiones devocionales diarias sobre el privilegio y gozo de ser adoptados en la familia divina.", url: "https://m.egwwritings.org/es/book/1705", cat: "Devocional" },
        { id: 32, titulo: "La historia de la redención (HR)", desc: "Un compendio sintético y poderoso del plan de salvación desde la caída edénica hasta el Edén restaurado.", url: "https://m.egwwritings.org/es/book/189", cat: "Historia Sagrada" },
        { id: 33, titulo: "La iglesia remanente", desc: "Identidad profética, llamado universal y destino triunfal del pueblo remanente de Dios.", url: "https://m.egwwritings.org/es/book/1762", cat: "Doctrinal" },
        { id: 34, titulo: "Joyas de los testimonios, Tomo 1", desc: "Selección selecta de consejos para la iglesia: consagración, vida espiritual y organización.", url: "https://m.egwwritings.org/es/book/1696", cat: "Testimonios" },
        { id: 35, titulo: "Joyas de los testimonios, Tomo 2", desc: "Orientación sobre salud, vida de servicio, educación e interacciones comunitarias cristianas.", url: "https://m.egwwritings.org/es/book/1695.2?ss=eyJwYXJhbXMiOnsicXVlcnkiOiJKb3lhcyBkZSBsb3MgdGVzdGltb25pb3MgMiIsImxhbmciOiJlcyJ9LCJzZ19pbmRleCI6IjAifQ%3D%3D#2", cat: "Testimonios" },
        { id: 36, titulo: "Joyas de los testimonios, Tomo 3", desc: "Instrucciones trascendentales para la preparación ante los eventos solemnes del fin del tiempo.", url: "https://m.egwwritings.org/es/book/1694.2?ss=eyJwYXJhbXMiOnsicXVlcnkiOiJKb3lhcyBkZSBsb3MgdGVzdGltb25pb3MgMyIsImxhbmciOiJlcyJ9LCJzZ19pbmRleCI6IjAifQ%3D%3D#2", cat: "Testimonios" },
        { id: 37, titulo: "¡Maranata: el Señor viene!", desc: "Devocionario centrado en las profecías del advenimiento y la culminación de la historia humana.", url: "https://m.egwwritings.org/es/book/1768.2?ss=eyJwYXJhbXMiOnsicXVlcnkiOiLCoU1hcmFuYXRhOiBlbCBTZcOxb3IgdmllbmUhIiwibGFuZyI6ImVzIn0sInNnX2luZGV4IjoiMCJ9#2", cat: "Profecía" },
        { id: 38, titulo: "La maravillosa gracia de Dios", desc: "Lecturas diarias que celebran el amor insondable del Salvador y el poder santificador de Su gracia.", url: "https://m.egwwritings.org/es/book/1763", cat: "Devocional" },
        { id: 39, titulo: "Mensajes para los jóvenes (MJ)", desc: "Consejos vibrantes para ayudar a los jóvenes a tomar decisiones correctas con pureza y valor.", url: "https://m.egwwritings.org/es/book/1769", cat: "Juvenil" },
        { id: 40, titulo: "Mensajes selectos, Tomo 1", desc: "Artículos doctrinales sobre la inspiración de las Escrituras, la justificación y las verdades bíblicas.", url: "https://m.egwwritings.org/es/book/1777", cat: "Doctrinal" },
        { id: 41, titulo: "Mensajes selectos, Tomo 2", desc: "Tratados sobre el ministerio médico misionero, falsas enseñanzas y la unidad de la iglesia.", url: "https://m.egwwritings.org/es/book/201", cat: "Doctrinal" },
        { id: 42, titulo: "Mensajes selectos, Tomo 3", desc: "Consejos adicionales sobre la vida cristiana, el matrimonio, los principios de salud y liderazgo.", url: "https://m.egwwritings.org/es/book/202", cat: "Doctrinal" },
        { id: 43, titulo: "Mente, carácter y personalidad, Tomo 1", desc: "Principios de psicología y salud mental bajo la perspectiva iluminada de la Palabra de Dios.", url: "https://m.egwwritings.org/es/book/1770", cat: "Salud Mental" },
        { id: 44, titulo: "Mente, carácter y personalidad, Tomo 2", desc: "Enseñanzas para el desarrollo armonioso del carácter, el dominio propio y la paz emocional.", url: "https://m.egwwritings.org/es/book/1771", cat: "Salud Mental" },
        { id: 45, titulo: "El ministerio de curación (MC)", desc: "Principios inmortales sobre la medicina natural, el cuidado de los enfermos y la sanidad integral.", url: "https://m.egwwritings.org/es/book/1757", cat: "Salud y Vida" },
        { id: 46, titulo: "El ministerio de la bondad (MB)", desc: "El llamado de Cristo a servir con misericordia a los pobres, huérfanos, ancianos y desamparados.", url: "https://m.egwwritings.org/es/book/1758", cat: "Servicio Social" },
        { id: 47, titulo: "El ministerio pastoral (MPa)", desc: "Consejos indispensables para ministros y líderes en la administración y pastoreo del rebaño.", url: "https://m.egwwritings.org/es/book/1773", cat: "Ministerio" },
        { id: 48, titulo: "Notas biográficas (NB)", desc: "Relato autobiográfico de la vida, experiencias y visiones proféticas de Elena G. de White.", url: "https://m.egwwritings.org/es/book/14075", cat: "Biográfico" },
        { id: 49, titulo: "Nuestra elevada vocación (NEV)", desc: "Llamado a la santidad, a la excelencia de vida y a reflejar plenamente a Cristo en cada acción.", url: "https://m.egwwritings.org/es/book/1778", cat: "Devocional" },
        { id: 50, titulo: "Palabras de vida del gran Maestro (PVGM)", desc: "Explicación profunda y enriquecedora de las parábolas más memorables impartidas por Jesús.", url: "https://m.egwwritings.org/es/book/210", cat: "Parábolas" }
    ];

    let categoriaFiltroActual = 'todas';

    // Obtener lista completa de libros con índice secuencial asignado
    function obtenerLibros() {
        let libros = [];
        if (typeof StorageHelper !== 'undefined') {
            libros = StorageHelper.get(STORAGE_LIBROS, []);
        } else {
            try {
                const item = localStorage.getItem(STORAGE_LIBROS);
                if (item) libros = JSON.parse(item);
            } catch (e) {}
        }

        if (!Array.isArray(libros) || libros.length === 0) {
            libros = LIBROS_DEFAULT;
            if (typeof StorageHelper !== 'undefined') {
                StorageHelper.set(STORAGE_LIBROS, libros);
            } else {
                localStorage.setItem(STORAGE_LIBROS, JSON.stringify(libros));
            }
        }

        // Asignar un número secuencial amigable (1..N) preservando los datos originales del libro
        return libros.map((l, index) => {
            return {
                ...l,
                _secuencial: index + 1
            };
        });
    }

    // Renderizar catálogo y estadísticas
    function renderBiblioteca() {
        const libros = obtenerLibros();
        actualizarEstadisticas(libros);
        aplicarFiltros();
        renderLibrosEGW();
    }

    // Actualizar tarjetas de métricas
    function actualizarEstadisticas(libros) {
        const total = libros.length;
        const disponibles = libros.filter(l => (l.estado || '').toLowerCase() === 'disponible').length;
        const prestados = total - disponibles;

        const statTotal = document.getElementById('statTotal');
        const statDisponibles = document.getElementById('statDisponibles');
        const statPrestados = document.getElementById('statPrestados');

        if (statTotal) statTotal.textContent = total;
        if (statDisponibles) statDisponibles.textContent = disponibles;
        if (statPrestados) statPrestados.textContent = prestados >= 0 ? prestados : 0;
    }

    // Renderizar libros en Grid con IDs secuenciales (#1, #2, ...)
    function renderLibros(libros) {
        const gridContainer = document.getElementById('gridLibrosContainer');
        if (!gridContainer) return;

        if (!libros || libros.length === 0) {
            gridContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book-open"></i>
                    <h4>No se encontraron libros</h4>
                    <p>Intenta con otro término de búsqueda o selecciona otra categoría.</p>
                </div>
            `;
            return;
        }

        gridContainer.innerHTML = libros.map((l, idx) => {
            const seqNum = l._secuencial || (idx + 1);
            const titulo = l.titulo || 'Sin título';
            const autor = l.autor || 'Desconocido';
            const cat = l.cat || l.categoria || 'General';
            const estado = l.estado || 'Disponible';
            const cant = l.cant || l.cantidad || 1;
            const ubi = l.ubi || l.ubicacion || 'Biblioteca';
            const isDisp = estado.toLowerCase() === 'disponible';

            return `
                <div class="libro-card">
                    <div>
                        <div class="libro-top">
                            <span class="libro-id-tag">#${seqNum}</span>
                            <span class="libro-cat-badge">${cat}</span>
                        </div>
                        <h3 class="libro-titulo">${titulo}</h3>
                        <div class="libro-autor"><i class="fas fa-pen-nib"></i> ${autor}</div>
                        <div class="libro-info-pills">
                            <span class="libro-status-pill ${isDisp ? 'disponible' : 'prestado'}">
                                <i class="fas ${isDisp ? 'fa-check-circle' : 'fa-clock'}"></i> ${estado} (${cant})
                            </span>
                            <span class="libro-ubi-pill">
                                <i class="fas fa-map-marker-alt"></i> ${ubi}
                            </span>
                        </div>
                    </div>
                    <div class="libro-actions">
                        <button type="button" class="btn-pedir-libro" data-csp-click="solicitarLibroDirecto('${titulo.replace(/'/g, "\\'")}')">
                            <i class="fas fa-hand-holding-heart"></i> Solicitar Préstamo
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Renderizar sección Elena G. de White (solo lectura online)
    function renderLibrosEGW(filtro = '') {
        const container = document.getElementById('gridLibrosEGWContainer');
        if (!container) return;

        let lista = LIBROS_EGW;
        if (filtro) {
            const query = filtro.toLowerCase().trim();
            lista = lista.filter(l => (l.titulo || '').toLowerCase().includes(query) || (l.desc || '').toLowerCase().includes(query) || (l.cat || '').toLowerCase().includes(query));
        }

        if (lista.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-book-open"></i>
                    <h4>No se encontraron obras</h4>
                    <p>Intenta con otro término de búsqueda.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = lista.map((l, idx) => {
            const seqNum = l.id || (idx + 1);
            return `
                <div class="libro-card">
                    <div>
                        <div class="libro-top">
                            <span class="libro-id-tag">#${seqNum}</span>
                            <span class="libro-cat-badge">${l.cat || 'Elena G. de White'}</span>
                        </div>
                        <h3 class="libro-titulo">${l.titulo}</h3>
                        <div class="libro-autor"><i class="fas fa-feather-alt"></i> Elena G. de White</div>
                        <p style="color: var(--muted-text); font-size: 0.9rem; margin-bottom: 1rem; line-height: 1.5;">${l.desc || ''}</p>
                    </div>
                    <div class="libro-actions">
                        <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="btn-pedir-libro" style="background: rgba(201, 157, 59, 0.12); border-color: var(--golden); color: var(--deep-blue); text-decoration: none;">
                            <i class="fas fa-globe"></i> Leer Online (EGW Writings)
                        </a>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Búsqueda y filtrado dinámico
    function aplicarFiltros() {
        const libros = obtenerLibros();
        const inputBuscador = document.getElementById('buscadorBibliotecaPublica');
        const query = inputBuscador ? inputBuscador.value.toLowerCase().trim() : '';

        const btnClear = document.getElementById('btnClearSearch');
        if (btnClear) {
            btnClear.style.display = query ? 'block' : 'none';
        }

        let filtrados = libros;

        // Filtro por categoría
        if (categoriaFiltroActual !== 'todas') {
            filtrados = filtrados.filter(l => {
                const c = (l.cat || l.categoria || '').toLowerCase().trim();
                return c === categoriaFiltroActual.toLowerCase().trim();
            });
        }

        // Filtro por texto o número
        if (query) {
            const cleanQueryNum = query.replace(/^#/, '');
            filtrados = filtrados.filter(l => {
                const tit = (l.titulo || '').toLowerCase();
                const aut = (l.autor || '').toLowerCase();
                const cat = (l.cat || l.categoria || '').toLowerCase();
                const seq = String(l._secuencial || '');
                const id = String(l.id || '');
                return tit.includes(query) || aut.includes(query) || cat.includes(query) || seq === cleanQueryNum || seq.includes(cleanQueryNum) || id.includes(query);
            });
        }

        renderLibros(filtrados);
    }

    // Funciones globales expuestas para data-csp-click / data-csp-input
    window.filtrarBibliotecaPublica = function () {
        aplicarFiltros();
    };

    window.limpiarBuscador = function () {
        const input = document.getElementById('buscadorBibliotecaPublica');
        if (input) {
            input.value = '';
            input.focus();
        }
        aplicarFiltros();
    };

    window.filtrarPorCategoria = function (cat, btnElement) {
        categoriaFiltroActual = cat;
        const container = document.getElementById('contenedorCategoriasPills');
        if (container) {
            container.querySelectorAll('.pill-btn').forEach(btn => btn.classList.remove('active'));
        }
        if (btnElement) {
            btnElement.classList.add('active');
        }
        aplicarFiltros();
    };

    window.mostrarBibliotecaGeneral = function () {
        const secGen = document.getElementById('seccionBibliotecaGeneral');
        const secEGW = document.getElementById('seccionBibliotecaEGW');
        const tabGen = document.getElementById('tabBtnGeneral');
        const tabEGW = document.getElementById('tabBtnEGW');

        if (secGen) secGen.style.display = 'block';
        if (secEGW) secEGW.style.display = 'none';
        if (tabGen) tabGen.classList.add('active');
        if (tabEGW) tabEGW.classList.remove('active');
    };

    window.mostrarBibliotecaEGW = function () {
        const secGen = document.getElementById('seccionBibliotecaGeneral');
        const secEGW = document.getElementById('seccionBibliotecaEGW');
        const tabGen = document.getElementById('tabBtnGeneral');
        const tabEGW = document.getElementById('tabBtnEGW');

        if (secGen) secGen.style.display = 'none';
        if (secEGW) secEGW.style.display = 'block';
        if (tabGen) tabGen.classList.remove('active');
        if (tabEGW) tabEGW.classList.add('active');
    };

    window.filtrarBibliotecaEGW = function () {
        const input = document.getElementById('buscadorEGW');
        const query = input ? input.value : '';
        const btnClear = document.getElementById('btnClearSearchEGW');
        if (btnClear) btnClear.style.display = query ? 'block' : 'none';
        renderLibrosEGW(query);
    };

    window.limpiarBuscadorEGW = function () {
        const input = document.getElementById('buscadorEGW');
        if (input) {
            input.value = '';
            input.focus();
        }
        const btnClear = document.getElementById('btnClearSearchEGW');
        if (btnClear) btnClear.style.display = 'none';
        renderLibrosEGW('');
    };

    window.solicitarLibroDirecto = function (titulo) {
        if (typeof window.showPage === 'function') {
            const pagActiva = document.querySelector('.page.active');
            if (!pagActiva || pagActiva.id !== 'biblioteca') {
                window.showPage('biblioteca');
            }
        }
        if (typeof window.mostrarBibliotecaGeneral === 'function') {
            window.mostrarBibliotecaGeneral();
        }
        const inputLibro = document.getElementById('solicitanteLibro') || document.getElementById('inputTituloLibroPrestamo');
        if (inputLibro) {
            inputLibro.value = titulo || '';
        }
        const formSec = document.getElementById('pedir-libro');
        if (formSec) {
            setTimeout(() => {
                formSec.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
        const nombreInput = document.getElementById('solicitanteNombre') || document.getElementById('inputNombreSolicitante');
        if (nombreInput) {
            setTimeout(() => nombreInput.focus(), 450);
        }
    };

    // Procesar formulario de solicitud
    window.enviarSolicitud = function (event) {
        if (event && event.preventDefault) event.preventDefault();

        // Buscar campos del formulario de la biblioteca o del modal
        const formTarget = event && event.target && event.target.tagName === 'FORM' ? event.target : null;
        const inputNombreSol = document.getElementById('solicitanteNombre');
        const inputNombreModal = document.getElementById('inputNombreSolicitante');
        const inputTelSol = document.getElementById('solicitanteWhatsapp');
        const inputTelModal = document.getElementById('inputTelefonoSolicitante');
        const inputEmailSol = document.getElementById('solicitanteEmail');
        const inputEmailModal = document.getElementById('inputEmailSolicitante');
        const inputLibroSol = document.getElementById('solicitanteLibro');
        const inputLibroModal = document.getElementById('inputTituloLibroPrestamo');

        let nombre = '';
        let tel = '';
        let email = '';
        let libro = '';

        if (formTarget && formTarget.id === 'formPrestamo') {
            nombre = inputNombreModal ? inputNombreModal.value.trim() : '';
            tel = inputTelModal ? inputTelModal.value.trim() : '';
            email = inputEmailModal ? inputEmailModal.value.trim() : '';
            libro = inputLibroModal ? inputLibroModal.value.trim() : '';
        } else if (formTarget && formTarget.id === 'formSolicitud') {
            nombre = inputNombreSol ? inputNombreSol.value.trim() : '';
            tel = inputTelSol ? inputTelSol.value.trim() : '';
            email = inputEmailSol ? inputEmailSol.value.trim() : '';
            libro = inputLibroSol ? inputLibroSol.value.trim() : '';
        } else {
            // Si no se identificó por formTarget, tomar los campos que tengan contenido
            nombre = (inputNombreModal && inputNombreModal.value.trim()) || (inputNombreSol && inputNombreSol.value.trim()) || '';
            tel = (inputTelModal && inputTelModal.value.trim()) || (inputTelSol && inputTelSol.value.trim()) || '';
            email = (inputEmailModal && inputEmailModal.value.trim()) || (inputEmailSol && inputEmailSol.value.trim()) || '';
            libro = (inputLibroModal && inputLibroModal.value.trim()) || (inputLibroSol && inputLibroSol.value.trim()) || '';
        }

        if (!nombre || !libro) {
            alert('⚠️ Por favor completa tu nombre completo y el título del libro deseado.');
            return;
        }

        const nuevoPedido = {
            id: String(Date.now()),
            libroId: 0,
            libro_id: '0',
            solicitante: nombre,
            telefono: tel || 'No especificado',
            email: email || 'No especificado',
            fecha: new Date().toISOString(),
            estado: 'Pendiente',
            tituloLibro: libro,
            titulo_libro: libro
        };

        try {
            let pedidos = [];
            if (typeof StorageHelper !== 'undefined') {
                pedidos = StorageHelper.get(STORAGE_PEDIDOS, []);
                pedidos.push(nuevoPedido);
                StorageHelper.set(STORAGE_PEDIDOS, pedidos);
            } else {
                pedidos = JSON.parse(localStorage.getItem(STORAGE_PEDIDOS) || '[]');
                pedidos.push(nuevoPedido);
                localStorage.setItem(STORAGE_PEDIDOS, JSON.stringify(pedidos));
            }

            // Sincronizar con Supabase si está disponible
            if (window.SupabaseSync && typeof window.SupabaseSync.upsert === 'function') {
                window.SupabaseSync.upsert(STORAGE_PEDIDOS, 'pedidos_libros', nuevoPedido);
            } else if (window.supabaseClient) {
                const transformer = (window.TABLE_TRANSFORMERS && window.TABLE_TRANSFORMERS.pedidos_libros) ? window.TABLE_TRANSFORMERS.pedidos_libros.toDb : null;
                const dbRow = transformer ? transformer(nuevoPedido) : {
                    id: nuevoPedido.id,
                    libro_id: '0',
                    solicitante: nuevoPedido.solicitante,
                    telefono: nuevoPedido.telefono,
                    email: nuevoPedido.email,
                    fecha: nuevoPedido.fecha,
                    estado: nuevoPedido.estado,
                    titulo_libro: nuevoPedido.tituloLibro
                };
                window.supabaseClient.from('pedidos_libros').insert([dbRow]).then(res => {
                    console.log('📦 Pedido sincronizado con Supabase:', res);
                }).catch(err => {
                    console.warn('⚠️ Error al enviar a Supabase:', err);
                });
            }

            window.dispatchEvent(new CustomEvent('datosBibliotecaActualizados'));
            window.dispatchEvent(new Event('datosBibliotecaActualizados'));
        } catch (e) {
            console.error('Error guardando solicitud de libro:', e);
        }

        // Limpiar campos de ambos formularios
        ['solicitanteNombre', 'inputNombreSolicitante', 'solicitanteWhatsapp', 'inputTelefonoSolicitante', 'solicitanteEmail', 'inputEmailSolicitante', 'solicitanteLibro', 'inputTituloLibroPrestamo'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
        });

        if (typeof window.cerrarModalPrestamo === 'function') {
            window.cerrarModalPrestamo();
        }

        // Abrir popup de confirmación
        if (typeof window.abrirModalConfirmacion === 'function') {
            window.abrirModalConfirmacion();
        }
    };

    window.abrirModalPrestamo = function () {
        const modal = document.getElementById('modalPrestamo');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            const inputs = modal.querySelectorAll('input');
            inputs.forEach(input => input.value = '');
            setTimeout(() => {
                const primerInput = modal.querySelector('input');
                if (primerInput) primerInput.focus();
            }, 300);
        }
    };

    window.cerrarModalPrestamo = function (event) {
        if (event && event.target && event.target !== document.getElementById('modalPrestamo') && !event.target.classList.contains('modal-overlay') && !event.target.closest('.modal-close')) {
            return;
        }
        const modal = document.getElementById('modalPrestamo');
        if (modal) {
            modal.classList.remove('active');
        }
        document.body.style.overflow = '';
    };

    window.abrirModalConfirmacion = function () {
        const modal = document.getElementById('modalConfirmacion');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.cerrarModalConfirmacion = function (event) {
        if (event && event.target && event.target !== document.getElementById('modalConfirmacion') && !event.target.classList.contains('modal-overlay') && !event.target.closest('.modal-close') && !event.target.classList.contains('btn-popup-close')) {
            return;
        }
        const modal = document.getElementById('modalConfirmacion');
        if (modal) {
            modal.classList.remove('active');
        }
        document.body.style.overflow = '';
    };

    // Exportar función para enrutador SPA y eventos
    window.renderBiblioteca = renderBiblioteca;

    // Inicializar al cargar el DOM
    document.addEventListener('DOMContentLoaded', function () {
        renderBiblioteca();

        window.addEventListener('datosBibliotecaActualizados', function () {
            renderBiblioteca();
        });

        window.addEventListener('storage', function (e) {
            if (e.key === STORAGE_LIBROS || e.key === STORAGE_PEDIDOS) {
                renderBiblioteca();
            }
        });
    });

})();
