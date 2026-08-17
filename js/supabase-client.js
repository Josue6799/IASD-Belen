/**
 * Configuración del cliente Supabase y Helper de Sincronización (Offline-First)
 * IASD Belén · Iglesia Adventista del Séptimo Día
 */

// Credenciales por defecto (pueden ser modificadas dinámicamente desde el Panel de Base de Datos)
const DEFAULT_SUPABASE_URL = 'https://ojfpzlvayjfzzqtqydgy.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qZnB6bHZheWpmenpxdHF5ZGd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDIzOTYsImV4cCI6MjEwMDIxODM5Nn0.iLCgGBZPP0Zv0cU3xpbNq1rdb9C4AbBKyXV8Mr665NE';

// Obtener credenciales activas (prioridad: localStorage > constantes por defecto)
function getActiveCredentials() {
  const customUrl = localStorage.getItem('supabase_custom_url');
  const customKey = localStorage.getItem('supabase_custom_anon_key');
  return {
    url: (customUrl && customUrl.trim()) ? customUrl.trim() : DEFAULT_SUPABASE_URL,
    anonKey: (customKey && customKey.trim()) ? customKey.trim() : DEFAULT_SUPABASE_ANON_KEY,
    isCustom: Boolean(customUrl || customKey)
  };
}

let currentCreds = getActiveCredentials();
let SUPABASE_URL = currentCreds.url;
let SUPABASE_ANON_KEY = currentCreds.anonKey;

// Helper para convertir cualquier formato de fecha a ISO compatible con PostgreSQL
function formatDateForDb(val) {
  if (!val) return new Date().toISOString();
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) return trimmed;
  }
  if (typeof val === 'number') {
    const d = new Date(val);
    return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  }
  if (val instanceof Date) {
    return isNaN(val.getTime()) ? new Date().toISOString() : val.toISOString();
  }
  const parsed = Date.parse(val);
  if (!isNaN(parsed)) {
    return new Date(parsed).toISOString();
  }
  try {
    const str = String(val).replace(/a\.\s*m\./i, 'AM').replace(/p\.\s*m\./i, 'PM');
    const match = str.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
    if (match) {
      let day = parseInt(match[1], 10);
      let month = parseInt(match[2], 10);
      let year = parseInt(match[3], 10);
      if (year < 100) year += 2000;
      if (day <= 31 && month <= 12) {
        const d = new Date(year, month - 1, day);
        if (!isNaN(d.getTime())) return d.toISOString();
      }
    }
  } catch (e) {}

  return new Date().toISOString();
}

// Variable global del cliente Supabase
let supabaseClient = null;
let connectionStatus = {
  ok: false,
  checked: false,
  message: 'Iniciando conexión...',
  code: 'INIT'
};

// Función para inicializar o reiniciar el cliente Supabase
function initSupabase(url, key) {
  const targetUrl = url || SUPABASE_URL;
  const targetKey = key || SUPABASE_ANON_KEY;

  SUPABASE_URL = targetUrl;
  SUPABASE_ANON_KEY = targetKey;

  const supabaseLib = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);

  if (supabaseLib && typeof supabaseLib.createClient === 'function') {
    try {
      supabaseClient = supabaseLib.createClient(targetUrl, targetKey);
      window.supabaseClient = supabaseClient;
      window.SUPABASE_URL = targetUrl;
      window.SUPABASE_ANON_KEY = targetKey;
      console.log('✅ Cliente Supabase instanciado con URL:', targetUrl);
      
      // Probar conexión de forma no bloqueante
      testSupabaseConnection().then(status => {
        window.dispatchEvent(new CustomEvent('supabase_connection_status', { detail: status }));
      });
      return true;
    } catch (e) {
      console.warn('⚠️ Error al crear cliente Supabase:', e);
      connectionStatus = { ok: false, checked: true, message: `Error de inicialización: ${e.message}`, code: 'CLIENT_ERROR' };
      return false;
    }
  } else {
    console.warn('⚠️ La librería Supabase SDK no está disponible todavía en el ámbito global.');
    connectionStatus = { ok: false, checked: true, message: 'Librería Supabase SDK no cargada', code: 'NO_SDK' };
    return false;
  }
}

// Test de conexión exhaustivo y con diagnóstico detallado
async function testSupabaseConnection() {
  if (!window.supabaseClient) {
    const creds = getActiveCredentials();
    initSupabase(creds.url, creds.anonKey);
    if (!window.supabaseClient) {
      connectionStatus = {
        ok: false,
        checked: true,
        message: 'No se ha podido inicializar el cliente Supabase. Modo Local Activo.',
        code: 'NO_CLIENT'
      };
      return connectionStatus;
    }
  }

  try {
    const { data, error, status } = await window.supabaseClient
      .from('anuncios')
      .select('id')
      .limit(1);

    if (error) {
      let friendlyMsg = error.message;
      let code = error.code || String(status || 'ERROR');

      if (status === 401 || error.message.includes('API key') || error.message.includes('JWT') || error.message.includes('Invalid API key')) {
        friendlyMsg = 'Clave API (Anon Key) no válida o expirada en el proyecto Supabase.';
        code = '401_UNAUTHORIZED';
      } else if (status === 404 || error.message.includes('relation') || error.message.includes('does not exist')) {
        friendlyMsg = 'Conexión exitosa, pero algunas tablas aún no existen en Supabase. Ejecuta el script supabase_setup.sql.';
        code = 'TABLES_MISSING';
        connectionStatus = { ok: true, checked: true, message: friendlyMsg, code, data };
        return connectionStatus;
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        friendlyMsg = 'No se pudo contactar al servidor de Supabase (proyecto pausado o sin conexión a internet).';
        code = 'NETWORK_ERROR';
      }

      connectionStatus = {
        ok: false,
        checked: true,
        message: friendlyMsg,
        code: code,
        rawError: error
      };
      return connectionStatus;
    }

    connectionStatus = {
      ok: true,
      checked: true,
      message: 'Conexión activa y verificada con la base de datos Supabase en la nube.',
      code: 'CONNECTED',
      data: data
    };
    return connectionStatus;
  } catch (err) {
    connectionStatus = {
      ok: false,
      checked: true,
      message: `Error de red: ${err.message || 'Sin respuesta del servidor Supabase'}. Modo local activo.`,
      code: 'FETCH_ERROR',
      rawError: err
    };
    return connectionStatus;
  }
}

// Inicialización automática
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initSupabase());
  } else {
    initSupabase();
  }
}

// Funciones globales de configuración expuestas para la interfaz y administración
window.initSupabase = initSupabase;
window.testSupabaseConnection = testSupabaseConnection;
window.getSupabaseConnectionStatus = () => connectionStatus;
window.getActiveSupabaseCredentials = getActiveCredentials;

window.setSupabaseCredentials = async function(url, key) {
  if (!url || !url.startsWith('http')) {
    return { ok: false, message: 'La URL debe ser válida (ej: https://tuid.supabase.co)' };
  }
  if (!key || key.length < 20) {
    return { ok: false, message: 'La clave Anon Key parece inválida o demasiado corta.' };
  }

  localStorage.setItem('supabase_custom_url', url.trim());
  localStorage.setItem('supabase_custom_anon_key', key.trim());

  initSupabase(url.trim(), key.trim());
  const testRes = await testSupabaseConnection();
  window.dispatchEvent(new CustomEvent('supabase_config_changed', { detail: testRes }));
  return testRes;
};

window.resetSupabaseCredentials = async function() {
  localStorage.removeItem('supabase_custom_url');
  localStorage.removeItem('supabase_custom_anon_key');
  initSupabase(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_ANON_KEY);
  const testRes = await testSupabaseConnection();
  window.dispatchEvent(new CustomEvent('supabase_config_changed', { detail: testRes }));
  return testRes;
};

/**
 * Mapeo de claves primarias por tabla
 */
const TABLE_MATCH_COLS = {
  inscripciones_cursos: 'alumno_documento,id_curso',
  alumnos_identidades: 'documento',
  logros_alumnos: 'alumno_documento,logro_id',
  votos_encuestas: 'encuesta_id,usuario_identificador',
  cronograma_predicadores: 'id',
  pedidos_libros: 'id',
  libros: 'id',
  anuncios: 'id',
  interesados: 'id',
  examenes: 'id',
  respuestas_examenes: 'id',
  encuestas: 'id',
  galeria_fotos: 'id',
  transmisiones: 'id',
  eventos_iglesia: 'id',
  bd_aventureros: 'id',
  bd_conquistadores: 'id',
  bd_guias_mayores: 'id',
  cuotas_aventureros: 'id',
  cuotas_conquistadores: 'id',
  cuotas_guias_mayores: 'id',
  eventos_aventureros: 'id',
  eventos_conquistadores: 'id',
  eventos_guias_mayores: 'id',
  miembros_clubes: 'id',
  cuotas_clubes: 'id',
  eventos_clubes: 'id'
};
window.TABLE_MATCH_COLS = TABLE_MATCH_COLS;

const clubMemberTransformer = {
  toDb(item) {
    if (!item) return null;
    return {
      id: item.id != null ? String(item.id) : undefined,
      nombre: item.nombre || '',
      apellido: item.apellido || '',
      documento: item.documento || item.cc || '',
      fecha_nacimiento: item.fecha_nacimiento || item.fechaNacimiento || null,
      tutor_nombre: item.tutor_nombre || item.tutor || '',
      celular: item.celular || item.telefono || '',
      unidad: item.unidad || '',
      cargo: item.cargo || 'Miembro',
      tipo_sangre: item.tipo_sangre || item.tipoSangre || '',
      cartillas: Array.isArray(item.cartillas) ? item.cartillas.join(', ') : (item.cartillas || ''),
      especialidades: Array.isArray(item.especialidades) ? item.especialidades.join(', ') : (item.especialidades || ''),
      estado: item.estado || 'activo'
    };
  },
  fromDb(data) {
    if (!data) return data;
    const mapRow = r => ({
      ...r,
      cc: r.cc || r.documento || '',
      documento: r.documento || r.cc || '',
      fechaNacimiento: r.fechaNacimiento || r.fecha_nacimiento || '',
      fecha_nacimiento: r.fecha_nacimiento || r.fechaNacimiento || '',
      tipoSangre: r.tipoSangre || r.tipo_sangre || '',
      tipo_sangre: r.tipo_sangre || r.tipoSangre || '',
      tutor: r.tutor || r.tutor_nombre || '',
      tutor_nombre: r.tutor_nombre || r.tutor || ''
    });
    return Array.isArray(data) ? data.map(mapRow) : mapRow(data);
  }
};

const clubCuotasTransformer = {
  toDb(item) {
    if (!item) return null;
    return {
      id: item.id != null ? String(item.id) : undefined,
      nombre: item.nombre || item.miembro_nombre || '',
      pagos: item.pagos || {}
    };
  },
  fromDb(data) {
    if (!data) return data;
    const mapRow = r => ({
      ...r,
      nombre: r.nombre || r.miembro_nombre || '',
      pagos: r.pagos || {}
    });
    return Array.isArray(data) ? data.map(mapRow) : mapRow(data);
  }
};

const clubEventTransformer = {
  toDb(item) {
    if (!item) return null;
    return {
      id: item.id != null ? String(item.id) : undefined,
      titulo: item.titulo || item.nombre || '',
      descripcion: item.descripcion || '',
      fecha: item.fecha || item.date || new Date().toISOString().split('T')[0],
      hora: item.hora || '09:00',
      lugar: item.lugar || ''
    };
  },
  fromDb(data) {
    if (!data) return data;
    const mapRow = r => ({
      ...r,
      nombre: r.nombre || r.titulo || '',
      titulo: r.titulo || r.nombre || '',
      date: r.date || r.fecha || ''
    });
    return Array.isArray(data) ? data.map(mapRow) : mapRow(data);
  }
};

const TABLE_TRANSFORMERS = {
  bd_aventureros: clubMemberTransformer,
  bd_conquistadores: clubMemberTransformer,
  bd_guias_mayores: clubMemberTransformer,
  cuotas_aventureros: clubCuotasTransformer,
  cuotas_conquistadores: clubCuotasTransformer,
  cuotas_guias_mayores: clubCuotasTransformer,
  eventos_aventureros: clubEventTransformer,
  eventos_conquistadores: clubEventTransformer,
  eventos_guias_mayores: clubEventTransformer,

  eventos_iglesia: {
    toDb(item) {
      if (!item) return item;
      return {
        id: item.id != null ? String(item.id) : undefined,
        titulo: item.titulo || '',
        descripcion: item.descripcion || '',
        fecha: formatDateForDb(item.fecha),
        hora: item.hora || '09:00',
        tipo: item.tipo || 'General',
        lugar: item.lugar || 'Templo Principal'
      };
    },
    fromDb(data) {
      return data;
    }
  },

  cronograma_predicadores: {
    toDb(item) {
      if (!item) return item;
      return {
        id: item.id != null ? String(item.id) : `${item.actividad || 'culto'}_${item.fecha || ''}`,
        fecha: item.fecha || '',
        predicador: item.predicador || item.nombre || '',
        culto_tipo: item.culto_tipo || item.actividad || 'Culto',
        actividad: item.actividad || item.culto_tipo || 'Culto',
        tema: item.tema || '',
        curso: item.curso || '',
        recurrente: Boolean(item.recurrente),
        semanas: Number(item.semanas || 1)
      };
    },
    fromDb(data) {
      return data;
    }
  },

  pedidos_libros: {
    toDb(item) {
      if (!item) return item;
      return {
        id: item.id != null ? String(item.id) : undefined,
        libro_id: String(item.libro_id || item.libroId || item.libroid || '0'),
        solicitante: item.solicitante || item.nombre || item.solicitante_nombre || '',
        telefono: item.telefono || item.whatsapp || item.contacto || item.solicitante_contacto || '',
        email: item.email || item.correo || '',
        fecha: formatDateForDb(item.fecha),
        estado: item.estado || 'Pendiente',
        titulo_libro: item.titulo_libro || item.tituloLibro || item.libro_titulo || item.titulolibro || item.libro || ''
      };
    },
    fromDb(data) {
      if (!data) return data;
      const mapRow = r => ({
        ...r,
        id: r.id != null ? String(r.id) : String(Date.now()),
        libroId: r.libro_id ?? r.libroid ?? r.libroId ?? 0,
        solicitante: r.solicitante || r.solicitante_nombre || r.nombre || '',
        telefono: r.telefono || r.solicitante_contacto || r.contacto || r.whatsapp || '',
        email: r.email || '',
        fecha: r.fecha || r.fecha_solicitud || r.fecha_pedido || '',
        estado: r.estado || 'Pendiente',
        tituloLibro: r.titulo_libro || r.libro_titulo || r.titulolibro || r.tituloLibro || ''
      });
      return Array.isArray(data) ? data.map(mapRow) : mapRow(data);
    }
  },

  libros: {
    toDb(item) {
      if (!item) return item;
      const numInv = (item.numero_inventario != null && String(item.numero_inventario).trim() !== '')
        ? String(item.numero_inventario)
        : ((item.numeroInventario != null && String(item.numeroInventario).trim() !== '')
          ? String(item.numeroInventario)
          : String(item.id || '1'));

      return {
        id: item.id != null ? String(item.id) : undefined,
        titulo: item.titulo || 'Sin título',
        autor: item.autor || 'Autor Desconocido',
        categoria: item.categoria || item.cat || 'General',
        cant: Number(item.cant || item.cantidad || 1),
        estado: item.estado || 'Disponible',
        ubicacion: item.ubicacion || item.ubi || 'Biblioteca',
        numero_inventario: numInv,
        portada_url: item.portada_url || item.portada || '',
        disponible: item.estado ? (item.estado === 'Disponible') : true
      };
    },
    fromDb(data) {
      if (!data) return data;
      const mapRow = r => ({
        ...r,
        id: r.id,
        titulo: r.titulo || '',
        autor: r.autor || '',
        cat: r.categoria || r.cat || 'General',
        categoria: r.categoria || r.cat || 'General',
        cant: r.cant || r.cantidad || 1,
        cantidad: r.cant || r.cantidad || 1,
        estado: r.estado || (r.disponible === false ? 'Prestado' : 'Disponible'),
        ubi: r.ubicacion || r.ubi || 'Biblioteca',
        ubicacion: r.ubicacion || r.ubi || 'Biblioteca',
        numero_inventario: r.numero_inventario || r.numeroInventario || String(r.id || ''),
        portada_url: r.portada_url || r.portada || ''
      });
      return Array.isArray(data) ? data.map(mapRow) : mapRow(data);
    }
  },

  encuestas: {
    toDb(item) {
      if (!item) return item;
      return {
        id: item.id != null ? String(item.id) : undefined,
        pregunta: item.pregunta || item.titulo || '',
        titulo: item.titulo || item.pregunta || '',
        opciones: item.opciones || [],
        votos: item.votos || [],
        activa: item.activa !== false
      };
    },
    fromDb(data) {
      return data;
    }
  },

  anuncios: {
    toDb(item) {
      if (!item) return item;
      return {
        id: item.id != null ? String(item.id) : undefined,
        titulo: item.titulo || '',
        descripcion: item.descripcion || '',
        imagen: item.imagen || item.url || '',
        url: item.url || item.imagen || '',
        categoria: item.categoria || 'General',
        fecha: formatDateForDb(item.fecha),
        creadopor: item.creadopor || item.creadoPor || 'admin'
      };
    },
    fromDb(data) {
      if (!data) return data;
      const mapRow = r => ({
        ...r,
        url: r.url || r.imagen || '',
        imagen: r.imagen || r.url || ''
      });
      return Array.isArray(data) ? data.map(mapRow) : mapRow(data);
    }
  },

  transmisiones: {
    toDb(item) {
      if (!item) return item;
      return {
        id: item.id != null ? String(item.id) : undefined,
        titulo: item.titulo || '',
        url_video: item.url_video || item.url || '',
        url: item.url || item.url_video || '',
        tipo: item.tipo || 'YouTube',
        activo: item.activo !== false,
        activa: item.activa !== false,
        fecha: formatDateForDb(item.fecha)
      };
    },
    fromDb(data) {
      if (!data) return data;
      const mapRow = r => ({
        ...r,
        url_video: r.url_video || r.url || '',
        url: r.url || r.url_video || ''
      });
      return Array.isArray(data) ? data.map(mapRow) : mapRow(data);
    }
  },

  examenes: {
    toDb(item) {
      if (!item) return item;
      const cant = item.cantidadpreguntas ?? item.cantidad_preguntas ?? item.cantidadPreguntas ?? (item.preguntas ? item.preguntas.length : 0);
      return {
        id: item.id != null ? String(item.id) : undefined,
        id_curso: String(item.id_curso || item.cursoId || item.curso || 'general'),
        titulo: item.titulo || '',
        descripcion: item.descripcion || '',
        duracion_min: item.duracion_min || item.duracion || 30,
        preguntas: item.preguntas || [],
        cantidadpreguntas: cant,
        cantidad_preguntas: cant,
        activo: item.activo !== false
      };
    },
    fromDb(data) {
      if (!data) return data;
      const mapRow = r => ({
        ...r,
        cantidadPreguntas: r.cantidadpreguntas ?? r.cantidad_preguntas ?? r.cantidadPreguntas ?? (r.preguntas ? r.preguntas.length : 0),
        cantidadpreguntas: r.cantidadpreguntas ?? r.cantidad_preguntas ?? r.cantidadPreguntas ?? (r.preguntas ? r.preguntas.length : 0),
        cantidad_preguntas: r.cantidad_preguntas ?? r.cantidad_preguntas ?? r.cantidadPreguntas ?? (r.preguntas ? r.preguntas.length : 0)
      });
      return Array.isArray(data) ? data.map(mapRow) : mapRow(data);
    }
  },

  respuestas_examenes: {
    toDb(item) {
      if (!item) return item;
      return {
        id: item.id != null ? String(item.id) : undefined,
        examen_id: String(item.examen_id || item.examenId || ''),
        alumno_documento: String(item.alumno_documento || item.documento || ''),
        alumno_nombre: item.alumno_nombre || item.nombre || '',
        calificacion: Number(item.calificacion || 0),
        respuestas: item.respuestas || {},
        intento: Number(item.intento || 1),
        estado: item.estado || 'aprobado',
        fecha_rendido: formatDateForDb(item.fecha_rendido || item.fecha)
      };
    },
    fromDb(data) {
      if (!data) return data;
      const mapRow = r => ({
        ...r,
        examenId: r.examenId || r.examen_id || '',
        documento: r.documento || r.alumno_documento || '',
        nombre: r.nombre || r.alumno_nombre || ''
      });
      return Array.isArray(data) ? data.map(mapRow) : mapRow(data);
    }
  },

  inscripciones_cursos: {
    table: 'inscripciones_cursos',
    toDb(item) {
      if (!item) return null;
      let cursoId = '';
      let doc = '';
      let progreso = 0;
      let estado = 'en_proceso';
      let fechaInscripcion = new Date().toISOString();

      if (typeof item === 'string') {
        cursoId = item.trim();
        try {
          const rawId = localStorage.getItem('alumnoIdentidad');
          if (rawId) {
            const parsed = JSON.parse(rawId);
            if (parsed && parsed.documento) doc = String(parsed.documento).trim();
          }
        } catch (e) {}
      } else if (typeof item === 'object' && item !== null) {
        cursoId = String(item.id_curso || item.curso_id || item.curso || item.nombre || '').trim();
        doc = String(item.alumno_documento || item.documento || item.doc || '').trim();
        if (!doc) {
          try {
            const rawId = localStorage.getItem('alumnoIdentidad');
            if (rawId) {
              const parsed = JSON.parse(rawId);
              if (parsed && parsed.documento) doc = String(parsed.documento).trim();
            }
          } catch (e) {}
        }
        progreso = Number(item.progreso || 0);
        estado = String(item.estado || 'en_proceso');
        fechaInscripcion = item.fecha_inscripcion || item.fecha || new Date().toISOString();
      }

      if (!cursoId) return null;
      if (!doc) doc = 'alumno_local';

      return {
        alumno_documento: doc,
        id_curso: cursoId,
        curso_id: cursoId,
        progreso: isNaN(progreso) ? 0 : progreso,
        estado: estado,
        fecha_inscripcion: fechaInscripcion
      };
    },
    fromDb(data) {
      if (!data) return data;
      const mapRow = r => {
        if (!r) return r;
        if (typeof r === 'string') return r;
        return r.id_curso || r.curso_id || r.curso || r;
      };
      return Array.isArray(data) ? data.map(mapRow) : mapRow(data);
    },
    transform(data) {
      if (!data) return null;
      return {
        alumno_documento: data.alumno_documento || 'alumno_local',
        curso_id: data.curso_id || data.id_curso || 'curso',
        fecha_inscripcion: data.fecha_inscripcion || new Date().toISOString()
      };
    },
    untransform(row) {
      if (!row) return null;
      return {
        alumno_documento: row.alumno_documento,
        curso_id: row.curso_id || row.id_curso,
        fecha_inscripcion: row.fecha_inscripcion
      };
    }
  },

  alumnos_identidades: {
    toDb(item) {
      if (!item) return null;
      const doc = item.documento ? String(item.documento).trim() : '';
      if (!doc) return null;
      return {
        documento: doc,
        nombre: item.nombre || '',
        whatsapp: item.whatsapp || doc,
        grupo: item.grupo || 'General',
        pin: item.pin ? String(item.pin) : ''
      };
    },
    fromDb(data) {
      return data;
    }
  },

  interesados: {
    toDb(item) {
      if (!item) return null;
      return {
        id: item.id != null ? String(item.id) : undefined,
        nombre: item.nombre || '',
        telefono: item.telefono || item.celular || item.whatsapp || '',
        whatsapp: item.whatsapp || item.telefono || item.celular || '',
        direccion: item.direccion || '',
        email: item.email || item.correo || '',
        estudio_interes: item.estudio_interes || item.estudio || item.interes || 'Estudio Bíblico',
        estado: item.estado || 'nuevo',
        contactado: Boolean(item.contactado),
        fecha: formatDateForDb(item.fecha),
        notas: item.notas || ''
      };
    },
    fromDb(data) {
      if (!data) return data;
      const mapRow = r => ({
        ...r,
        id: r.id != null ? String(r.id) : String(Date.now()),
        nombre: r.nombre || '',
        whatsapp: r.whatsapp || r.telefono || '',
        telefono: r.telefono || r.whatsapp || '',
        email: r.email || '',
        contactado: Boolean(r.contactado),
        fecha: r.fecha || r.fecha_contacto || ''
      });
      return Array.isArray(data) ? data.map(mapRow) : mapRow(data);
    }
  },

  votos_encuestas: {
    toDb(item) {
      if (!item) return null;
      return {
        id: item.id != null ? String(item.id) : undefined,
        encuesta_id: String(item.encuesta_id || item.encuestaId || ''),
        usuario_identificador: String(item.usuario_identificador || item.usuario || ''),
        opcion_index: Number(item.opcion_index ?? item.opcionIndex ?? 0),
        fecha: formatDateForDb(item.fecha)
      };
    },
    fromDb(data) {
      return data;
    }
  }
};

const _tableIgnoredCols = {};
const _tableKnownCols = {};

function _filterPayloadForTable(table, payload) {
  if (!payload) return payload;
  const ignored = _tableIgnoredCols[table];
  const known = _tableKnownCols[table];
  if (!ignored && !known) return payload;

  const items = Array.isArray(payload) ? payload : [payload];
  const cleaned = items.map(item => {
    if (typeof item === 'object' && item !== null) {
      const clone = { ...item };
      if (ignored) {
        ignored.forEach(col => { delete clone[col]; });
      }
      if (known && known.size > 0) {
        Object.keys(clone).forEach(k => {
          if (!known.has(k)) delete clone[k];
        });
      }
      return clone;
    }
    return item;
  });
  return Array.isArray(payload) ? cleaned : cleaned[0];
}

function _safeInsertToSupabase(table, payload, retriesLeft = 4) {
  if (!payload || (Array.isArray(payload) && payload.length === 0) || retriesLeft <= 0 || !window.supabaseClient) return;

  const rawData = Array.isArray(payload) ? payload : [payload];
  const dataToInsert = _filterPayloadForTable(table, rawData);

  Promise.resolve(window.supabaseClient.from(table).insert(dataToInsert))
    .then(({ error } = {}) => {
      if (error) {
        const matchCol = error.message && (
          error.message.match(/Could not find the '([^']+)' column of/i) ||
          error.message.match(/column "([^"]+)" of relation/i) ||
          error.message.match(/column "([^"]+)" does not exist/i) ||
          error.message.match(/column ([a-zA-Z0-9_]+) does not exist/i)
        );
        if (matchCol && matchCol[1]) {
          const missingCol = matchCol[1];
          if (!_tableIgnoredCols[table]) _tableIgnoredCols[table] = new Set();
          _tableIgnoredCols[table].add(missingCol);
          const cleanedPayload = dataToInsert.map(item => {
            if (typeof item === 'object' && item !== null) {
              const clone = { ...item };
              delete clone[missingCol];
              return clone;
            }
            return item;
          });
          return _safeInsertToSupabase(table, cleanedPayload, retriesLeft - 1);
        }
        const matchNotNull = error.message && error.message.match(/null value in column "([^"]+)"/i);
        if (matchNotNull && matchNotNull[1]) {
          const col = matchNotNull[1];
          const cleanedPayload = dataToInsert.map(item => {
            if (typeof item === 'object' && item !== null) {
              const clone = { ...item };
              if (clone[col] === null || clone[col] === undefined || clone[col] === '') {
                if (col === 'numero_inventario' || col === 'numeroInventario') {
                  clone[col] = String(clone.id || '1');
                } else if (col === 'cant' || col === 'cantidad' || col === 'orden') {
                  clone[col] = 1;
                } else if (col === 'activo' || col === 'activa' || col === 'disponible') {
                  clone[col] = true;
                } else {
                  clone[col] = String(clone.id || '-');
                }
              }
              return clone;
            }
            return item;
          });
          return _safeInsertToSupabase(table, cleanedPayload, retriesLeft - 1);
        }
        if (error.message && error.message.includes('invalid input syntax for type integer')) {
          const cleanedPayload = dataToInsert.map(item => {
            if (typeof item === 'object' && item !== null) {
              const clone = {};
              for (const [k, v] of Object.entries(item)) {
                if (v === '') {
                  clone[k] = null;
                } else if (k === 'id' && typeof v === 'string' && !isNaN(v) && v.trim() !== '') {
                  clone[k] = Number(v);
                } else {
                  clone[k] = v;
                }
              }
              return clone;
            }
            return item;
          });
          return _safeInsertToSupabase(table, cleanedPayload, retriesLeft - 1);
        }
        if (error.code !== '401_UNAUTHORIZED') {
          console.warn(`[SupabaseSync] Nota al insertar en ${table}:`, error.message);
        }
      }
    })
    .catch(() => {});
}

/**
 * Helper para reintentar inserciones/upserts omitiendo columnas que falten en el esquema
 */
function _safeUpsertToSupabase(table, payload, matchCol, retriesLeft = 4) {
  if (!payload || payload.length === 0 || retriesLeft <= 0 || !window.supabaseClient) return;

  const rawData = Array.isArray(payload) ? payload : [payload];
  const filteredPayload = _filterPayloadForTable(table, rawData);
  const options = matchCol && !matchCol.includes(',') ? { onConflict: matchCol } : undefined;

  Promise.resolve(window.supabaseClient.from(table).upsert(filteredPayload, options))
    .then(({ error } = {}) => {
      if (error) {
        const matchCol = error.message && (
          error.message.match(/Could not find the '([^']+)' column of/i) ||
          error.message.match(/column "([^"]+)" of relation/i) ||
          error.message.match(/column "([^"]+)" does not exist/i) ||
          error.message.match(/column ([a-zA-Z0-9_]+) does not exist/i)
        );
        if (matchCol && matchCol[1]) {
          const missingCol = matchCol[1];
          if (!_tableIgnoredCols[table]) _tableIgnoredCols[table] = new Set();
          _tableIgnoredCols[table].add(missingCol);
          const cleanedPayload = filteredPayload.map(item => {
            if (typeof item === 'object' && item !== null) {
              const clone = { ...item };
              delete clone[missingCol];
              return clone;
            }
            return item;
          });
          return _safeUpsertToSupabase(table, cleanedPayload, matchCol, retriesLeft - 1);
        }
        if (error.message && (
          error.message.includes('unique or exclusion constraint') ||
          error.message.includes('ON CONFLICT')
        )) {
          // Fallback a delete + insert si la tabla no tiene restricción UNIQUE en 'id'
          return _safeInsertToSupabase(table, filteredPayload, retriesLeft - 1);
        }
        const matchNotNull = error.message && error.message.match(/null value in column "([^"]+)"/i);
        if (matchNotNull && matchNotNull[1]) {
          const col = matchNotNull[1];
          const cleanedPayload = filteredPayload.map(item => {
            if (typeof item === 'object' && item !== null) {
              const clone = { ...item };
              if (clone[col] === null || clone[col] === undefined || clone[col] === '') {
                if (col === 'numero_inventario' || col === 'numeroInventario') {
                  clone[col] = String(clone.id || '1');
                } else if (col === 'cant' || col === 'cantidad' || col === 'orden') {
                  clone[col] = 1;
                } else if (col === 'activo' || col === 'activa' || col === 'disponible') {
                  clone[col] = true;
                } else {
                  clone[col] = String(clone.id || '-');
                }
              }
              return clone;
            }
            return item;
          });
          return _safeUpsertToSupabase(table, cleanedPayload, matchCol, retriesLeft - 1);
        }
        if (error.message && error.message.includes('invalid input syntax for type integer')) {
          const cleanedPayload = filteredPayload.map(item => {
            if (typeof item === 'object' && item !== null) {
              const clone = {};
              for (const [k, v] of Object.entries(item)) {
                if (v === '') {
                  clone[k] = null;
                } else if (k === 'id' && typeof v === 'string' && !isNaN(v) && v.trim() !== '') {
                  clone[k] = Number(v);
                } else {
                  clone[k] = v;
                }
              }
              return clone;
            }
            return item;
          });
          return _safeUpsertToSupabase(table, cleanedPayload, matchCol, retriesLeft - 1);
        }
        if (error.code !== '401_UNAUTHORIZED') {
          console.warn(`[SupabaseSync] Nota en ${table}:`, error.message);
        }
      }
    })
    .catch(() => {});
}

/**
 * Motor de Sincronización Transparente (Offline-First)
 */
const SupabaseSync = {
  get(key, table, defaultValue, transformFromDb) {
    let localData = defaultValue;
    try {
      const raw = localStorage.getItem(key);
      if (raw) localData = JSON.parse(raw);
    } catch (e) {}

    if (window.supabaseClient && connectionStatus.ok !== false) {
      window.supabaseClient.from(table).select('*').then(({ data, error }) => {
        if (!error && data) {
          if (Array.isArray(data) && data.length > 0 && data[0] && typeof data[0] === 'object') {
            _tableKnownCols[table] = new Set(Object.keys(data[0]));
          }
          const customTransform = transformFromDb || (TABLE_TRANSFORMERS[table] ? TABLE_TRANSFORMERS[table].fromDb : null);
          const formatted = customTransform ? customTransform(data) : data;
          localStorage.setItem(key, JSON.stringify(formatted));
          window.dispatchEvent(new CustomEvent(`supabase_synced_${key}`, { detail: formatted }));
        }
      }).catch(() => {
        // Modo offline silencioso
      });
    }

    return localData;
  },

  set(key, table, value, matchColOverride, transformToDb) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}

    if (!window.supabaseClient || connectionStatus.ok === false) return;

    try {
      const matchCol = matchColOverride || TABLE_MATCH_COLS[table] || 'id';
      const transformer = transformToDb || (TABLE_TRANSFORMERS[table] ? TABLE_TRANSFORMERS[table].toDb : null);

      let rawItems = [];
      if (table === 'cronograma_predicadores' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
        for (const [act, fechasObj] of Object.entries(value)) {
          if (fechasObj && typeof fechasObj === 'object') {
            for (const [f, val] of Object.entries(fechasObj)) {
              if (val) {
                const pred = typeof val === 'object' ? (val.predicador || val.nombre || '') : String(val);
                const temaVal = typeof val === 'object' ? (val.tema || '') : '';
                rawItems.push({
                  id: `${act.replace(/\s+/g, '_')}_${f}`,
                  actividad: act,
                  culto_tipo: act,
                  fecha: f,
                  predicador: pred,
                  tema: temaVal
                });
              }
            }
          }
        }
      } else if (Array.isArray(value)) {
        rawItems = value;
      } else if (typeof value === 'object' && value !== null) {
        rawItems = Object.values(value);
      } else if (value != null) {
        rawItems = [value];
      }

      let payload = rawItems;
      if (transformer) {
        payload = rawItems.map(item => transformer(item)).filter(Boolean);
      }

      if (payload && payload.length > 0) {
        _safeUpsertToSupabase(table, payload, matchCol);
      }

      this._syncDeletions(table, matchCol, payload || []);
    } catch (e) {
      console.warn(`[SupabaseSync] Error local en ${table}:`, e);
    }
  },

  _syncDeletions(table, matchCol, currentPayload) {
    if (!window.supabaseClient || !matchCol || matchCol.includes(',') || connectionStatus.ok === false) return;

    const currentIds = new Set(
      (currentPayload || [])
        .map(item => item && item[matchCol] != null ? String(item[matchCol]) : null)
        .filter(Boolean)
    );

    Promise.resolve(window.supabaseClient.from(table).select(matchCol))
      .then(({ data, error } = {}) => {
        if (!error && Array.isArray(data)) {
          const deletedIds = data
            .map(row => row && row[matchCol] != null ? String(row[matchCol]) : null)
            .filter(id => id && !currentIds.has(id));

          if (deletedIds.length > 0) {
            Promise.resolve(window.supabaseClient.from(table).delete().in(matchCol, deletedIds)).catch(() => {});
          }
        }
      })
      .catch(() => {});
  },

  insert(key, table, row, transformRow) {
    let localList = [];
    try {
      const raw = localStorage.getItem(key);
      if (raw) localList = JSON.parse(raw);
    } catch (e) {}

    if (Array.isArray(localList)) {
      localList.push(row);
      try { localStorage.setItem(key, JSON.stringify(localList)); } catch (e) {}
    }

    if (!window.supabaseClient || connectionStatus.ok === false) return;

    const transformer = transformRow || (TABLE_TRANSFORMERS[table] ? TABLE_TRANSFORMERS[table].toDb : null);
    const payload = transformer ? transformer(row) : row;
    
    _safeInsertToSupabase(table, payload);
  },

  delete(key, table, colName, value) {
    const col = colName || TABLE_MATCH_COLS[table] || 'id';
    let localList = [];
    try {
      const raw = localStorage.getItem(key);
      if (raw) localList = JSON.parse(raw);
    } catch (e) {}

    if (Array.isArray(localList)) {
      localList = localList.filter(item => item && String(item[col]) !== String(value));
      try { localStorage.setItem(key, JSON.stringify(localList)); } catch (e) {}
    } else if (typeof localList === 'object' && localList !== null) {
      delete localList[value];
      try { localStorage.setItem(key, JSON.stringify(localList)); } catch (e) {}
    }

    if (!window.supabaseClient || connectionStatus.ok === false) return;

    try {
      const query = window.supabaseClient.from(table).delete().eq(col, value);
      Promise.resolve(query).catch(function(err) {
        console.warn(`[SupabaseSync] Error al eliminar en ${table}:`, err);
      });
    } catch (e) {
      console.warn(`[SupabaseSync] Error al preparar eliminación en ${table}:`, e);
    }
  }
};

window.SupabaseSync = SupabaseSync;

// Función integral para sincronizar todas las tablas locales a Supabase en 1 clic
window.sincronizarTodoASupabase = async function(onProgress) {
  if (!window.supabaseClient) {
    return { ok: false, message: 'Supabase no está conectado.' };
  }

  const keysToSync = Object.entries(window.KEY_TO_TABLE || {});
  let exitosos = 0;
  let total = keysToSync.length;
  let errores = [];

  for (let i = 0; i < total; i++) {
    const [key, table] = keysToSync[i];
    if (onProgress) onProgress(i + 1, total, table);

    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const val = JSON.parse(raw);
        if (val) {
          SupabaseSync.set(key, table, val);
          exitosos++;
        }
      }
    } catch (e) {
      errores.push(`${table}: ${e.message}`);
    }
  }

  return {
    ok: errores.length === 0,
    exitosos,
    total,
    errores,
    message: `Sincronización finalizada: ${exitosos} tablas enviadas a Supabase.`
  };
};
