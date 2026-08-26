/* ========================================
   ALMACENAMIENTO (STORAGE HELPER)
   IASD Belén · Iglesia Adventista
   ======================================== */

window.KEY_TO_TABLE = Object.assign(window.KEY_TO_TABLE || {}, {
    'eventosIglesia': 'eventos_iglesia',
    'eventosIASD': 'eventos_iglesia',
    'libros_biblioteca': 'libros',
    'librosBiblioteca': 'libros',
    'libros_pedidos': 'pedidos_libros',
    'pedidosLibros': 'pedidos_libros',
    'anuncios_eventos': 'anuncios',
    'cronograma_predicadores_fechas': 'cronograma_predicadores',
    'interesados': 'interesados',
    'personasInteresadas': 'interesados',
    'galeria_fotos': 'galeria_fotos',
    'transmisiones': 'transmisiones',
    'iasd_transmisiones': 'transmisiones',
    'examenesRealizados': 'respuestas_examenes',
    'lms_respuestas_examenes': 'respuestas_examenes',
    'plan_estudios': 'plan_estudios',
    'lms_plan_estudios': 'plan_estudios',
    'cursos': 'cursos',
    'lms_cursos': 'cursos',
    'lms_alumnos_identidades': 'alumnos_identidades',
    'alumnos_identidades': 'alumnos_identidades',
    'lms_alumnos': 'alumnos_identidades',
    'alumnoIdentidad': 'alumnos_identidades',
    'listaAlumnosIdentidades': 'alumnos_identidades',
    'alumnosIdentidades': 'alumnos_identidades',
    'db_examenes': 'examenes',
    'lms_examenes': 'examenes',
    'misCursos': 'inscripciones_cursos',
    'lms_inscripciones': 'inscripciones_cursos',

    // Tablas dedicadas por Club y generales
    'bd_aventureros': 'bd_aventureros',
    'bd_conquistadores': 'bd_conquistadores',
    'bd_guias_mayores': 'bd_guias_mayores',
    'cuotas_aventureros': 'cuotas_aventureros',
    'cuotas_conquistadores': 'cuotas_conquistadores',
    'cuotas_guias_mayores': 'cuotas_guias_mayores',
    'eventos_aventureros': 'eventos_aventureros',
    'eventos_conquistadores': 'eventos_conquistadores',
    'eventos_guias_mayores': 'eventos_guias_mayores',
    'miembros_clubes': 'miembros_clubes',
    'eventos_clubes': 'eventos_clubes',
    'cuotas_clubes': 'cuotas_clubes'
});

window.StorageHelper = {
    // Claves por defecto
    KEYS: {
        EVENTOS_GENERAL: 'eventosIglesia',
        EVENTOS_AVENTUREROS: 'eventos_aventureros',
        EVENTOS_CONQUISTADORES: 'eventos_conquistadores',
        EVENTOS_GUIAS: 'eventos_guias_mayores'
    },

    // Obtener datos deserializados (con lectura local inmediata + sync Supabase)
    get(key, defaultValue) {
        try {
            const table = window.KEY_TO_TABLE ? window.KEY_TO_TABLE[key] : null;
            if (table && window.SupabaseSync) {
                return window.SupabaseSync.get(key, table, defaultValue);
            }
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error(`Error al leer ${key}:`, e);
            return defaultValue;
        }
    },

    // Guardar datos serializados (guarda en localStorage y sincroniza en Supabase)
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            const table = window.KEY_TO_TABLE ? window.KEY_TO_TABLE[key] : null;
            if (table && window.SupabaseSync) {
                window.SupabaseSync.set(key, table, value);
            }
            return true;
        } catch (e) {
            console.error(`Error al guardar ${key}:`, e);
            return false;
        }
    },

    // Sincronizar datos con Supabase
    sync(key, value) {
        try {
            const table = window.KEY_TO_TABLE ? window.KEY_TO_TABLE[key] : null;
            if (table && window.SupabaseSync) {
                window.SupabaseSync.set(key, table, value);
            }
            return true;
        } catch (e) {
            console.error(`Error al sincronizar ${key}:`, e);
            return false;
        }
    },

    // Insertar un registro
    insert(key, row) {
        try {
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
            return true;
        } catch (e) {
            console.error(`Error al insertar en ${key}:`, e);
            return false;
        }
    },

    // Eliminar un elemento por ID (guarda en localStorage y elimina en Supabase)
    delete(key, param2, param3) {
        try {
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
                const raw = localStorage.getItem(key);
                if (raw) {
                    let localData = JSON.parse(raw);
                    if (Array.isArray(localData)) {
                        localData = localData.filter(item => item && String(item[col || 'id']) !== String(val));
                        localStorage.setItem(key, JSON.stringify(localData));
                    }
                }
            }
            return true;
        } catch (e) {
            console.error(`Error al eliminar en ${key}:`, e);
            return false;
        }
    },

    // Obtener clave por tipo de club/calendario
    getCalendarKey(type) {
        switch (type) {
            case 'aventureros': return this.KEYS.EVENTOS_AVENTUREROS;
            case 'conquistadores': return this.KEYS.EVENTOS_CONQUISTADORES;
            case 'guias': return this.KEYS.EVENTOS_GUIAS;
            default: return this.KEYS.EVENTOS_GENERAL;
        }
    }
};

// Aliases para máxima compatibilidad
var StorageHelper = window.StorageHelper;
var KEY_TO_TABLE = window.KEY_TO_TABLE;

