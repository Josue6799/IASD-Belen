/* ========================================
   ALMACENAMIENTO (STORAGE HELPER)
   IASD Belén · Iglesia Adventista
   ======================================== */

const KEY_TO_TABLE = {
    'eventosIglesia': 'eventos_iglesia',
    'eventosIASD': 'eventos_iglesia',
    'encuestaIASD': 'encuestas',
    'encuestasIglesia': 'encuestas',
    'libros_biblioteca': 'libros',
    'libros_pedidos': 'pedidos_libros',
    'anuncios_eventos': 'anuncios',
    'cronograma_predicadores_fechas': 'cronograma_predicadores',
    'interesados': 'interesados',
    'galeria_fotos': 'galeria_fotos',
    'transmisiones': 'transmisiones',
    'examenesRealizados': 'respuestas_examenes',
    'plan_estudios': 'plan_estudios',
    'lms_alumnos_identidades': 'alumnos_identidades',
    'alumnos_identidades': 'alumnos_identidades',
    'alumnoIdentidad': 'alumnos_identidades',
    'db_examenes': 'examenes',
    'misCursos': 'inscripciones_cursos',

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
};

const StorageHelper = {
    // Claves por defecto
    KEYS: {
        ENCUESTA: 'encuestasIglesia',
        EVENTOS_GENERAL: 'eventosIglesia',
        EVENTOS_AVENTUREROS: 'eventos_aventureros',
        EVENTOS_CONQUISTADORES: 'eventos_conquistadores',
        EVENTOS_GUIAS: 'eventos_guias_mayores'
    },

    // Obtener datos deserializados (con lectura local inmediata + sync Supabase)
    get(key, defaultValue) {
        try {
            const table = KEY_TO_TABLE[key];
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
            const table = KEY_TO_TABLE[key];
            if (table && window.SupabaseSync) {
                window.SupabaseSync.set(key, table, value);
            }
            return true;
        } catch (e) {
            console.error(`Error al guardar ${key}:`, e);
            return false;
        }
    },

    // Eliminar un elemento por ID (guarda en localStorage y elimina en Supabase)
    delete(key, valueId, colNameOverride) {
        try {
            const table = KEY_TO_TABLE[key];
            if (table && window.SupabaseSync) {
                window.SupabaseSync.delete(key, table, colNameOverride, valueId);
            } else {
                const raw = localStorage.getItem(key);
                if (raw) {
                    let localData = JSON.parse(raw);
                    if (Array.isArray(localData)) {
                        localData = localData.filter(item => item && String(item[colNameOverride || 'id']) !== String(valueId));
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

window.KEY_TO_TABLE = KEY_TO_TABLE;
window.StorageHelper = StorageHelper;

