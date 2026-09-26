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

      // Suscripción Realtime para Anuncios / Eventos y Cronograma
      try {
        if (supabaseClient.channel) {
          supabaseClient.channel('realtime:anuncios')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'anuncios' }, () => {
              if (window.SupabaseSync) {
                window.SupabaseSync.get('anuncios_eventos', 'anuncios', []);
              }
            })
            .subscribe();

          supabaseClient.channel('realtime:cronograma')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'cronograma_predicadores' }, () => {
              if (window.SupabaseSync) {
                window.SupabaseSync.get('cronograma_predicadores_fechas', 'cronograma_predicadores', {});
              }
            })
            .subscribe();

          supabaseClient.channel('realtime:eventos_iglesia')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'eventos_iglesia' }, () => {
              if (window.SupabaseSync) {
                window.SupabaseSync.get('eventosIglesia', 'eventos_iglesia', []);
              }
            })
            .subscribe();

          supabaseClient.channel('realtime:transmisiones')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'transmisiones' }, () => {
              if (typeof window.sincronizarTransmisionesConSupabase === 'function') {
                window.sincronizarTransmisionesConSupabase();
              } else if (window.SupabaseSync) {
                window.SupabaseSync.get('transmisiones', 'transmisiones', []);
              }
            })
            .subscribe();
        }
      } catch (rtErr) {
        console.warn('Realtime no disponible en este cliente:', rtErr);
      }

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
  cronograma_predicadores: 'id',
  pedidos_libros: 'id',
  libros: 'id',
  anuncios: 'id',
  interesados: 'id',
  examenes: 'id',
  respuestas_examenes: 'id',
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
  eventos_clubes: 'id',
  cursos: 'id',
  plan_estudios: 'id',
  alumnos_identidades: 'documento',
  alumnoIdentidad: 'documento',
  lms_alumnos_identidades: 'documento'
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
      if (!item) return null;
      let f = item.fecha || item.date || '';
      if (typeof f === 'string' && f.includes('T')) {
        f = f.split('T')[0];
      }
      return {
        id: item.id != null ? String(item.id) : (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
        titulo: item.titulo || item.nombre || '',
        descripcion: item.descripcion || '',
        fecha: f || new Date().toISOString().split('T')[0],
        hora: item.hora || '09:00',
        lugar: item.lugar || 'Templo Principal',
        categoria: item.categoria || item.tipo || 'General'
      };
    },
    fromDb(data) {
      if (!data) return [];
      const mapRow = r => {
        if (!r) return null;
        let f = r.fecha || '';
        if (typeof f === 'string' && f.includes('T')) {
          f = f.split('T')[0];
        }
        return {
          id: r.id != null ? String(r.id) : String(Date.now()),
          titulo: r.titulo || r.nombre || '',
          descripcion: r.descripcion || '',
          fecha: f,
          hora: r.hora || '',
          lugar: r.lugar || 'Templo Principal',
          categoria: r.categoria || r.tipo || 'General',
          recurrente: Boolean(r.recurrente),
          semanas: Number(r.semanas || 1),
          serieId: r.serieId || r.serie_id || null
        };
      };
      return Array.isArray(data) ? data.map(mapRow).filter(Boolean) : (mapRow(data) ? [mapRow(data)] : []);
    }
  },

  cronograma_predicadores: {
    toDb(item) {
      if (!item) return null;
      const act = item.actividad || item.culto_tipo || item.act || 'Canto';
      const fecha = item.fecha || '';
      const actId = String(act).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
      const safeId = item.id != null && String(item.id).trim() !== '' 
        ? String(item.id) 
        : `cron_${fecha}_${actId}`;
      return {
        id: safeId,
        fecha: fecha,
        predicador: item.predicador || item.nombre || '',
        culto_tipo: act,
        actividad: act,
        tema: item.tema || '',
        curso: item.curso || '',
        recurrente: Boolean(item.recurrente),
        semanas: Number(item.semanas || 1)
      };
    },
    fromDb(data) {
      if (!data) return {};
      if (!Array.isArray(data)) return data;
      const res = {};

      const KNOWN_ACTIVITIES = [
        'Canto', 'Escuela Sabática', 'Minuto Misionero', 'Predica',
        'Sociedad de Jóvenes', 'Lunes de Oración', 'Miércoles de Testimonio',
        'Unidos en Verdad', 'Mansión Gloriosa', 'Mansión Gloriosa Kid',
        'Aposento Alto', 'Jehová Jireh', 'Maranatha 1', 'Maranatha 2', 'Ah de Venir'
      ];

      const normMap = {};
      KNOWN_ACTIVITIES.forEach(a => {
        const norm = a.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
        normMap[norm] = a;
      });

      function resolveActivityName(row) {
        if (!row) return 'Canto';

        // 1. Coincidencia directa con actividad (si no es 'Culto' genérico o si coincide con una conocida)
        if (row.actividad && String(row.actividad).trim() !== '') {
          const actStr = String(row.actividad).trim();
          const norm = actStr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
          if (normMap[norm]) return normMap[norm];
          if (actStr !== 'Culto') return actStr;
        }

        // 2. Coincidencia con culto_tipo
        if (row.culto_tipo && String(row.culto_tipo).trim() !== '') {
          const cStr = String(row.culto_tipo).trim();
          const norm = cStr.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
          if (normMap[norm]) return normMap[norm];
          if (cStr !== 'Culto') return cStr;
        }

        // 3. Extracción de la actividad a partir del id (Patrones: cron_YYYY-MM-DD_Actividad o Actividad_YYYY-MM-DD)
        if (row.id && typeof row.id === 'string') {
          const idWithoutDate = row.id
            .replace(/^cron_\d{4}-\d{2}-\d{2}_/, '')
            .replace(/_\d{4}-\d{2}-\d{2}$/, '')
            .replace(/_/g, ' ')
            .trim();
          if (idWithoutDate && idWithoutDate !== 'Culto') {
            const norm = idWithoutDate.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
            if (normMap[norm]) return normMap[norm];
            return idWithoutDate;
          }
        }

        if (row.actividad && String(row.actividad).trim() !== '') return String(row.actividad).trim();
        if (row.culto_tipo && String(row.culto_tipo).trim() !== '') return String(row.culto_tipo).trim();
        return 'Canto';
      }

      data.forEach(row => {
        if (!row) return;
        const act = resolveActivityName(row);
        const fecha = row.fecha;
        const predicador = row.predicador || row.nombre || '';
        if (act && fecha) {
          if (!res[act]) res[act] = {};
          if (predicador) {
            res[act][fecha] = predicador;
          }
        }
      });
      return res;
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

  anuncios: {
    table: 'anuncios',
    toDb(data) {
      if (!data) return data;
      return {
        id: data.id != null ? String(data.id) : undefined,
        titulo: data.titulo || '',
        contenido: data.contenido || data.descripcion || '',
        categoria: data.categoria || 'General',
        ubicacion: data.ubicacion || 'Templo Principal',
        fecha_inicio: data.fecha_inicio || data.fechaInicio || '',
        hora_inicio: data.hora_inicio || data.horaInicio || '00:00',
        fecha_fin: data.fecha_fin || data.fechaFin || data.fecha_inicio || data.fechaInicio || '',
        hora_fin: data.hora_fin || data.horaFin || data.hora_inicio || data.horaInicio || '00:00',
        imagen: data.imagen || data.image || data.url || '',
        activo: data.activo !== undefined ? Boolean(data.activo) : true
      };
    },
    fromDb(data) {
      if (!data) return data;
      const mapRow = r => {
        if (!r) return r;
        const fInicio = r.fecha_inicio || r.fechaInicio || (r.fecha ? String(r.fecha).substring(0, 10) : '');
        const fFin = r.fecha_fin || r.fechaFin || fInicio;
        const hInicio = r.hora_inicio || r.horaInicio || r.hora || '';
        const hFin = r.hora_fin || r.horaFin || hInicio;
        return {
          id: r.id != null ? String(r.id) : '',
          titulo: r.titulo || '',
          contenido: r.contenido || r.descripcion || '',
          categoria: r.categoria || 'General',
          ubicacion: r.ubicacion || 'Templo Principal',
          fecha_inicio: fInicio,
          hora_inicio: hInicio,
          fecha_fin: fFin,
          hora_fin: hFin,
          fechaInicio: fInicio,
          fechaFin: fFin,
          horaInicio: hInicio,
          horaFin: hFin,
          imagen: r.imagen || r.image || r.url || '',
          activo: r.activo !== undefined ? Boolean(r.activo) : true
        };
      };
      return Array.isArray(data) ? data.map(mapRow) : mapRow(data);
    },
    transform(data) {
      if (!data) return data;
      return {
        id: data.id != null ? String(data.id) : undefined,
        titulo: data.titulo || '',
        contenido: data.contenido || data.descripcion || '',
        categoria: data.categoria || 'General',
        ubicacion: data.ubicacion || 'Templo Principal',
        fecha_inicio: data.fecha_inicio || data.fechaInicio || '',
        hora_inicio: data.hora_inicio || data.horaInicio || '00:00',
        fecha_fin: data.fecha_fin || data.fechaFin || data.fecha_inicio || data.fechaInicio || '',
        hora_fin: data.hora_fin || data.horaFin || data.hora_inicio || data.horaInicio || '00:00',
        imagen: data.imagen || data.image || data.url || '',
        activo: data.activo !== undefined ? Boolean(data.activo) : true
      };
    },
    untransform(row) {
      if (!row) return row;
      const fInicio = row.fecha_inicio || row.fechaInicio || (row.fecha ? String(row.fecha).substring(0, 10) : '');
      const fFin = row.fecha_fin || row.fechaFin || fInicio;
      const hInicio = row.hora_inicio || row.horaInicio || row.hora || '';
      const hFin = row.hora_fin || row.horaFin || hInicio;
      return {
        id: row.id != null ? String(row.id) : '',
        titulo: row.titulo || '',
        contenido: row.contenido || row.descripcion || '',
        categoria: row.categoria || 'General',
        ubicacion: row.ubicacion || 'Templo Principal',
        fecha_inicio: fInicio,
        hora_inicio: hInicio,
        fecha_fin: fFin,
        hora_fin: hFin,
        fechaInicio: fInicio,
        fechaFin: fFin,
        horaInicio: hInicio,
        horaFin: hFin,
        imagen: row.imagen || row.image || row.url || '',
        activo: row.activo !== undefined ? Boolean(row.activo) : true
      };
    }
  },

  'anuncios_eventos': {
    table: 'anuncios',
    toDb(data) {
      if (!data) return data;
      return {
        id: data.id != null ? String(data.id) : undefined,
        titulo: data.titulo || '',
        contenido: data.contenido || data.descripcion || '',
        categoria: data.categoria || 'General',
        ubicacion: data.ubicacion || 'Templo Principal',
        fecha_inicio: data.fecha_inicio || data.fechaInicio || data.fecha || '',
        hora_inicio: data.hora_inicio || data.horaInicio || data.hora || '00:00',
        fecha_fin: data.fecha_fin || data.fechaFin || '',
        hora_fin: data.hora_fin || data.horaFin || '',
        imagen: data.imagen || data.image || data.url || '',
        activo: data.activo !== undefined ? Boolean(data.activo) : true
      };
    },
    fromDb(data) {
      if (!data) return data;
      const mapRow = row => {
        if (!row) return row;
        const fInicio = row.fecha_inicio || row.fechaInicio || row.fecha || '';
        const fFin = row.fecha_fin || row.fechaFin || fInicio;
        const hInicio = row.hora_inicio || row.horaInicio || row.hora || '00:00';
        const hFin = row.hora_fin || row.horaFin || hInicio;
        return {
          id: row.id != null ? String(row.id) : '',
          titulo: row.titulo || '',
          contenido: row.contenido || row.descripcion || '',
          categoria: row.categoria || 'General',
          ubicacion: row.ubicacion || 'Templo Principal',
          fecha_inicio: fInicio,
          hora_inicio: hInicio,
          fecha_fin: fFin,
          hora_fin: hFin,
          fechaInicio: fInicio,
          fechaFin: fFin,
          horaInicio: hInicio,
          horaFin: hFin,
          imagen: row.imagen || row.image || row.url || '',
          activo: row.activo !== undefined ? Boolean(row.activo) : true
        };
      };
      return Array.isArray(data) ? data.map(mapRow) : mapRow(data);
    },
    transform: (data) => ({
      id: data.id != null ? String(data.id) : undefined,
      titulo: data.titulo || '',
      contenido: data.contenido || data.descripcion || '',
      categoria: data.categoria || 'General',
      ubicacion: data.ubicacion || 'Templo Principal',
      fecha_inicio: data.fecha_inicio || data.fechaInicio || data.fecha || '',
      hora_inicio: data.hora_inicio || data.horaInicio || data.hora || '00:00',
      fecha_fin: data.fecha_fin || data.fechaFin || '',
      hora_fin: data.hora_fin || data.horaFin || '',
      imagen: data.imagen || data.image || data.url || '',
      activo: data.activo !== undefined ? data.activo : true
    }),
    untransform: (row) => ({
      id: row.id != null ? String(row.id) : '',
      titulo: row.titulo || '',
      contenido: row.contenido || row.descripcion || '',
      categoria: row.categoria || 'General',
      ubicacion: row.ubicacion || 'Templo Principal',
      fecha_inicio: row.fecha_inicio || row.fechaInicio || '',
      hora_inicio: row.hora_inicio || row.horaInicio || '00:00',
      fecha_fin: row.fecha_fin || row.fechaFin || '',
      hora_fin: row.hora_fin || row.horaFin || '',
      fechaInicio: row.fecha_inicio || row.fechaInicio || '',
      fechaFin: row.fecha_fin || row.fechaFin || '',
      horaInicio: row.hora_inicio || row.horaInicio || '00:00',
      horaFin: row.hora_fin || row.horaFin || '',
      imagen: row.imagen || row.image || row.url || '',
      activo: row.activo !== undefined ? row.activo : true
    })
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

  cursos: {
    table: 'cursos',
    transform: (data) => ({
      id: data.id || (data.nombre ? data.nombre.toLowerCase().replace(/\s+/g, '_') : 'curso'),
      nombre: data.nombre,
      icono: data.icono || '📖',
      descripcion: data.descripcion || ''
    }),
    untransform: (row) => ({
      id: row.id,
      nombre: row.nombre,
      icono: row.icono,
      descripcion: row.descripcion
    }),
    toDb(item) {
      if (!item) return null;
      return this.transform(item);
    },
    fromDb(data) {
      if (!data) return {};
      if (Array.isArray(data)) {
        const res = {};
        data.forEach(r => {
          if (r && (r.nombre || r.id)) {
            const key = r.nombre || r.id;
            res[key] = {
              id: r.id || key,
              nombre: r.nombre || key,
              icono: r.icono || '📖',
              descripcion: r.descripcion || '',
              temas: Array.isArray(r.temas) ? r.temas : [],
              ayudas: r.ayudas || ''
            };
          }
        });
        return res;
      }
      return data;
    }
  },

  plan_estudios: {
    table: 'plan_estudios',
    toDb(item) {
      if (!item) return null;
      const cName = item.curso || item.id || item.nombre || '';
      return {
        id: cName,
        curso: cName,
        temas: Array.isArray(item.temas) ? item.temas : [],
        ayudas: Array.isArray(item.ayudas) ? item.ayudas : [],
        actualizado_en: item.actualizado_en || new Date().toISOString()
      };
    },
    fromDb(data) {
      if (!data) return {};
      if (Array.isArray(data)) {
        const res = {};
        data.forEach(r => {
          if (r && (r.curso || r.id)) {
            const key = r.curso || r.id;
            res[key] = {
              curso: key,
              temas: Array.isArray(r.temas) ? r.temas : [],
              ayudas: Array.isArray(r.ayudas) ? r.ayudas : []
            };
          }
        });
        return res;
      }
      return data;
    },
    transform(data) {
      return this.toDb(data);
    },
    untransform(row) {
      return this.fromDb(row);
    }
  },

  alumnos_identidades: {
    toDb(data) {
      if (!data) return null;
      return {
        documento: String(data.documento || data.id || '').trim(),
        nombre: data.nombre || '',
        whatsapp: data.whatsapp || data.celular || data.telefono || '',
        grupo: data.grupo || 'General',
        pin: data.pin != null ? String(data.pin).trim() : '',
        fecha_registro: data.fecha_registro || data.fechaRegistro || new Date().toISOString()
      };
    },
    fromDb(row) {
      if (!row) return row;
      const mapRow = r => ({
        id: r.id || r.documento,
        documento: String(r.documento || '').trim(),
        nombre: r.nombre || '',
        whatsapp: r.whatsapp || '',
        grupo: r.grupo || 'General',
        pin: r.pin != null ? String(r.pin).trim() : '',
        fecha_registro: r.fecha_registro || '',
        fechaRegistro: r.fecha_registro || ''
      });
      return Array.isArray(row) ? row.map(mapRow) : mapRow(row);
    }
  },

  alumnoIdentidad: {
    toDb(data) {
      if (!data) return null;
      return {
        documento: String(data.documento || data.id || '').trim(),
        nombre: data.nombre || '',
        whatsapp: data.whatsapp || data.celular || data.telefono || '',
        grupo: data.grupo || 'General',
        pin: data.pin != null ? String(data.pin).trim() : '',
        fecha_registro: data.fecha_registro || data.fechaRegistro || new Date().toISOString()
      };
    },
    fromDb(row) {
      if (!row) return null;
      const mapRow = r => ({
        id: r.id || r.documento,
        documento: String(r.documento || '').trim(),
        nombre: r.nombre || '',
        whatsapp: r.whatsapp || '',
        grupo: r.grupo || 'General',
        pin: r.pin != null ? String(r.pin).trim() : '',
        fecha_registro: r.fecha_registro || '',
        fechaRegistro: r.fecha_registro || ''
      });
      if (Array.isArray(row)) {
        return row.length > 0 ? mapRow(row[0]) : null;
      }
      return mapRow(row);
    }
  }
};

const _tablesNotFound = new Set();
const _lastGetTime = {};

const _tableIgnoredCols = {
  anuncios: new Set(['descripcion', 'fecha', 'creadopor', 'url'])
};
const _tableKnownCols = {
  eventos_iglesia: new Set(['id', 'titulo', 'descripcion', 'fecha', 'hora', 'lugar', 'categoria']),
  anuncios: new Set(['id', 'titulo', 'contenido', 'categoria', 'ubicacion', 'fecha_inicio', 'hora_inicio', 'fecha_fin', 'hora_fin', 'imagen', 'activo']),
  cronograma_predicadores: new Set(['id', 'fecha', 'predicador', 'culto_tipo', 'actividad', 'tema', 'curso', 'recurrente', 'semanas']),
  cursos: new Set(['id', 'nombre', 'icono', 'descripcion', 'temas', 'ayudas']),
  plan_estudios: new Set(['id', 'curso', 'temas', 'ayudas', 'actualizado_en']),
  transmisiones: new Set(['id', 'titulo', 'url_video', 'plataforma', 'fecha', 'descripcion', 'destacado', 'en_vivo', 'activo'])
};

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
  if (!payload || (Array.isArray(payload) && payload.length === 0) || retriesLeft <= 0 || !window.supabaseClient || _tablesNotFound.has(table)) return;

  const rawData = Array.isArray(payload) ? payload : [payload];
  const dataToInsert = _filterPayloadForTable(table, rawData);

  Promise.resolve(window.supabaseClient.from(table).insert(dataToInsert))
    .then(({ error } = {}) => {
      if (error) {
        if (error.code === '42P01' || error.code === 'PGRST204' || error.status === 404 ||
            (error.message && (error.message.includes('relation') && error.message.includes('does not exist') || error.message.includes('404') || error.message.includes('Not Found')))) {
          _tablesNotFound.add(table);
          return;
        }
        const errFull = `${error.message || ''} ${error.details || ''} ${error.hint || ''}`;
        const matchColRegex = (
          errFull.match(/Could not find the '([^']+)' column of/i) ||
          errFull.match(/column "([^"]+)" of relation/i) ||
          errFull.match(/column "([^"]+)" does not exist/i) ||
          errFull.match(/column ([a-zA-Z0-9_]+) does not exist/i)
        );
        if (matchColRegex && matchColRegex[1]) {
          const missingCol = matchColRegex[1];
          if (!_tableIgnoredCols[table]) _tableIgnoredCols[table] = new Set();
          _tableIgnoredCols[table].add(missingCol);
          if (_tableKnownCols[table]) _tableKnownCols[table].delete(missingCol);
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
        const matchNotNull = errFull.match(/null value in column "([^"]+)"/i);
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
        if (errFull.includes('invalid input syntax for type integer')) {
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
  if (!payload || payload.length === 0 || retriesLeft <= 0 || !window.supabaseClient || _tablesNotFound.has(table)) return;

  const rawData = Array.isArray(payload) ? payload : [payload];
  const filteredPayload = _filterPayloadForTable(table, rawData);
  const options = matchCol ? { onConflict: matchCol } : undefined;

  Promise.resolve(window.supabaseClient.from(table).upsert(filteredPayload, options))
    .then(({ error } = {}) => {
      if (error) {
        if (error.code === '42P01' || error.code === 'PGRST204' || error.status === 404 ||
            (error.message && (error.message.includes('relation') && error.message.includes('does not exist') || error.message.includes('404') || error.message.includes('Not Found')))) {
          _tablesNotFound.add(table);
          return;
        }
        if (error.code === '23505' || error.status === 409 ||
            (error.message && (error.message.includes('duplicate key') || error.message.includes('unique constraint') || error.message.includes('409') || error.message.includes('ON CONFLICT')))) {
          // Si falló por 409 en lote, reintentar individualmente cada registro
          if (Array.isArray(filteredPayload) && filteredPayload.length > 1) {
            filteredPayload.forEach(singleItem => {
              _safeUpsertToSupabase(table, [singleItem], matchCol, retriesLeft - 1);
            });
            return;
          }
          // Si es un solo registro con conflicto, intentar actualizar directamente
          if (Array.isArray(filteredPayload) && filteredPayload.length === 1) {
            const single = filteredPayload[0];
            if (single) {
              if (table === 'cronograma_predicadores') {
                const act = single.actividad || single.culto_tipo;
                const fecha = single.fecha;
                if (fecha && act) {
                  // Intentar actualizar por id o por fecha+actividad
                  Promise.resolve(
                    window.supabaseClient.from(table).update(single).eq('id', single.id)
                  ).then(({ error: upErr }) => {
                    if (upErr) {
                      return window.supabaseClient.from(table).update(single).eq('fecha', fecha).eq('actividad', act);
                    }
                  }).catch(() => {});
                  return;
                }
              }
              if (matchCol && single[matchCol] != null) {
                Promise.resolve(window.supabaseClient.from(table).update(single).eq(matchCol, single[matchCol])).catch(() => {});
              }
            }
          }
          return;
        }
        const errFull = `${error.message || ''} ${error.details || ''} ${error.hint || ''}`;
        const matchColRegex = (
          errFull.match(/Could not find the '([^']+)' column of/i) ||
          errFull.match(/column "([^"]+)" of relation/i) ||
          errFull.match(/column "([^"]+)" does not exist/i) ||
          errFull.match(/column ([a-zA-Z0-9_]+) does not exist/i)
        );
        if (matchColRegex && matchColRegex[1]) {
          const missingCol = matchColRegex[1];
          if (!_tableIgnoredCols[table]) _tableIgnoredCols[table] = new Set();
          _tableIgnoredCols[table].add(missingCol);
          if (_tableKnownCols[table]) _tableKnownCols[table].delete(missingCol);
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
        if (errFull.includes('unique or exclusion constraint') ||
            errFull.includes('ON CONFLICT') ||
            error.code === '42P10') {
          // Fallback a delete + insert si la tabla no tiene restricción UNIQUE en 'id'
          return _safeInsertToSupabase(table, filteredPayload, retriesLeft - 1);
        }
        const matchNotNull = errFull.match(/null value in column "([^"]+)"/i);
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
        if (errFull.includes('invalid input syntax for type integer')) {
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

    const now = Date.now();
    if (_tablesNotFound.has(table)) {
      return localData;
    }
    if (_lastGetTime[table] && (now - _lastGetTime[table] < 8000)) {
      return localData;
    }
    _lastGetTime[table] = now;

    if (window.supabaseClient && connectionStatus.code !== 'NO_SDK' && connectionStatus.code !== 'NO_CLIENT' && connectionStatus.code !== '401_UNAUTHORIZED') {
      window.supabaseClient.from(table).select('*').then(({ data, error }) => {
        if (error) {
          if (error.code === '42P01' || error.code === 'PGRST204' || error.status === 404 ||
              (error.message && (error.message.includes('relation') && error.message.includes('does not exist') || error.message.includes('404') || error.message.includes('Not Found')))) {
            _tablesNotFound.add(table);
          }
          return;
        }
        if (data) {
          if (Array.isArray(data) && data.length > 0 && data[0] && typeof data[0] === 'object') {
            _tableKnownCols[table] = new Set(Object.keys(data[0]));
          }
          const customTransform = transformFromDb || (TABLE_TRANSFORMERS[table] ? (TABLE_TRANSFORMERS[table].fromDb || TABLE_TRANSFORMERS[table].untransform) : null);
          const formatted = customTransform ? customTransform(data) : data;
          
          const currentRaw = localStorage.getItem(key);
          const newRaw = JSON.stringify(formatted);
          if (currentRaw !== newRaw) {
            localStorage.setItem(key, newRaw);
            window.dispatchEvent(new CustomEvent(`supabase_synced_${key}`, { detail: formatted }));
          }
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

    if (!window.supabaseClient || connectionStatus.ok === false || _tablesNotFound.has(table)) return;

    try {
      const matchCol = matchColOverride || TABLE_MATCH_COLS[table] || 'id';
      const transformer = transformToDb || (TABLE_TRANSFORMERS[table] ? (TABLE_TRANSFORMERS[table].toDb || TABLE_TRANSFORMERS[table].transform) : null);

      let rawItems = [];
      if (table === 'cronograma_predicadores' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
        for (const [act, fechasObj] of Object.entries(value)) {
          if (fechasObj && typeof fechasObj === 'object') {
            for (const [f, val] of Object.entries(fechasObj)) {
              if (val) {
                const pred = typeof val === 'object' ? (val.predicador || val.nombre || '') : String(val);
                const temaVal = typeof val === 'object' ? (val.tema || '') : '';
                const actId = String(act).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');
                rawItems.push({
                  id: `cron_${f}_${actId}`,
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
      } else if (table === 'plan_estudios' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
        for (const [cName, planObj] of Object.entries(value)) {
          if (planObj && typeof planObj === 'object') {
            rawItems.push({
              id: cName,
              curso: cName,
              temas: planObj.temas || [],
              ayudas: planObj.ayudas || []
            });
          }
        }
      } else if (table === 'cursos' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
        for (const [cName, cObj] of Object.entries(value)) {
          if (cObj && typeof cObj === 'object') {
            rawItems.push({
              id: cName,
              nombre: cName,
              icono: cObj.icono || '📚',
              descripcion: cObj.descripcion || '',
              temas: cObj.temas || [],
              ayudas: cObj.ayudas || ''
            });
          }
        }
      } else if (table === 'alumnos_identidades' && typeof value === 'object' && value !== null && !Array.isArray(value)) {
        rawItems = [value];
      } else if (Array.isArray(value)) {
        rawItems = value;
      } else if (typeof value === 'object' && value !== null) {
        if (value.documento || value.id || value.nombre || value.titulo || value.curso) {
          rawItems = [value];
        } else {
          rawItems = Object.values(value);
        }
      } else if (value != null) {
        rawItems = [value];
      }

      let payload = rawItems;
      if (transformer) {
        payload = rawItems.map(item => transformer(item)).filter(Boolean);
      }

      // Deduplicar payload por matchCol para evitar error 409 (ON CONFLICT command cannot affect row a second time)
      if (Array.isArray(payload) && payload.length > 1 && matchCol) {
        const seen = new Map();
        payload.forEach(item => {
          if (item && item[matchCol] != null) {
            seen.set(String(item[matchCol]), item);
          }
        });
        payload = Array.from(seen.values());
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
    if (table === 'alumnos_identidades' || table === 'respuestas_examenes' || table === 'inscripciones_cursos' || table === 'transmisiones' || table === 'cronograma_predicadores') return;

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

  delete(key, table, param3, param4) {
    let col = TABLE_MATCH_COLS[table] || 'id';
    let val = param3;
    if (param4 !== undefined) {
      if (param3 === 'id' || param3 === 'documento' || param3 === 'alumno_documento' || (TABLE_MATCH_COLS[table] && param3 === TABLE_MATCH_COLS[table])) {
        col = param3;
        val = param4;
      } else {
        val = param3;
        col = param4;
      }
    }
    const targetCol = col || 'id';
    const targetVal = String(val);

    let localList = [];
    try {
      const raw = localStorage.getItem(key);
      if (raw) localList = JSON.parse(raw);
    } catch (e) {}

    if (Array.isArray(localList)) {
      localList = localList.filter(item => item && String(item[targetCol] || item.id) !== targetVal);
      try { localStorage.setItem(key, JSON.stringify(localList)); } catch (e) {}
    } else if (typeof localList === 'object' && localList !== null) {
      delete localList[targetVal];
      try { localStorage.setItem(key, JSON.stringify(localList)); } catch (e) {}
    }

    if (!window.supabaseClient || connectionStatus.ok === false) return;

    try {
      const query = window.supabaseClient.from(table).delete().eq(targetCol, targetVal);
      Promise.resolve(query).catch(function(err) {
        console.warn(`[SupabaseSync] Error al eliminar en ${table}:`, err);
      });
    } catch (e) {
      console.warn(`[SupabaseSync] Error al preparar eliminación en ${table}:`, e);
    }
  }
};

window.SupabaseSync = SupabaseSync;

/**
 * Mapeo de claves en LocalStorage a Tablas en Supabase (unificado en window.KEY_TO_TABLE)
 */
window.KEY_TO_TABLE = Object.assign(window.KEY_TO_TABLE || {}, {
  'cronograma_predicadores_fechas': 'cronograma_predicadores',
  'anuncios_eventos': 'anuncios',
  'pedidosLibros': 'pedidos_libros',
  'librosBiblioteca': 'libros',
  'personasInteresadas': 'interesados',
  'iasd_transmisiones': 'transmisiones',
  'eventosIglesia': 'eventos_iglesia',
  'bd_aventureros': 'bd_aventureros',
  'bd_conquistadores': 'bd_conquistadores',
  'bd_guias_mayores': 'bd_guias_mayores',
  'cuotas_aventureros': 'cuotas_aventureros',
  'cuotas_conquistadores': 'cuotas_conquistadores',
  'cuotas_guias_mayores': 'cuotas_guias_mayores',
  'eventos_aventureros': 'eventos_aventureros',
  'eventos_conquistadores': 'eventos_conquistadores',
  'eventos_guias_mayores': 'eventos_guias_mayores',
  'lms_examenes': 'examenes',
  'lms_respuestas_examenes': 'respuestas_examenes',
  'lms_inscripciones': 'inscripciones_cursos',
  'lms_alumnos': 'alumnos_identidades',
  'lms_alumnos_identidades': 'alumnos_identidades',
  'alumnos_identidades': 'alumnos_identidades',
  'alumnoIdentidad': 'alumnos_identidades',
  'listaAlumnosIdentidades': 'alumnos_identidades',
  'alumnosIdentidades': 'alumnos_identidades',
  'cursos': 'cursos',
  'lms_cursos': 'cursos',
  'plan_estudios': 'plan_estudios',
  'lms_plan_estudios': 'plan_estudios'
});

/**
 * StorageHelper: Capa unificada Offline-First (LocalStorage + Supabase)
 */
window.StorageHelper = Object.assign(window.StorageHelper || {}, {
  get(key, defaultValue) {
    const table = window.KEY_TO_TABLE ? window.KEY_TO_TABLE[key] : null;
    if (table && window.SupabaseSync) {
      return window.SupabaseSync.get(key, table, defaultValue);
    }
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
    const table = window.KEY_TO_TABLE ? window.KEY_TO_TABLE[key] : null;
    if (table && window.SupabaseSync) {
      window.SupabaseSync.set(key, table, value);
    }
  },
  sync(key, value) {
    const table = window.KEY_TO_TABLE ? window.KEY_TO_TABLE[key] : null;
    if (table && window.SupabaseSync) {
      window.SupabaseSync.set(key, table, value);
    }
  },
  insert(key, row) {
    const table = window.KEY_TO_TABLE ? window.KEY_TO_TABLE[key] : null;
    if (table && window.SupabaseSync) {
      window.SupabaseSync.insert(key, table, row);
    } else {
      let list = this.get(key, []);
      if (Array.isArray(list)) {
        list.push(row);
        this.set(key, list);
      }
    }
  },
  delete(key, param2, param3) {
    const table = window.KEY_TO_TABLE ? window.KEY_TO_TABLE[key] : null;
    let col = 'id';
    let val = param2;
    if (param3 !== undefined) {
      if (param2 === 'id' || param2 === 'documento' || param2 === 'alumno_documento') {
        col = param2;
        val = param3;
      } else {
        val = param2;
        col = param3;
      }
    }
    if (table && window.SupabaseSync) {
      window.SupabaseSync.delete(key, table, col, val);
    } else {
      let list = this.get(key, []);
      if (Array.isArray(list)) {
        list = list.filter(item => item && String(item[col || 'id']) !== String(val));
        this.set(key, list);
      }
    }
  }
});

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
