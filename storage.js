/* ========================================
   ALMACENAMIENTO (STORAGE HELPER)
   IASD Belén · Iglesia Adventista
   ======================================== */

const StorageHelper = {
    // Claves por defecto
    KEYS: {
        ENCUESTA: 'encuestaIASD',
        EVENTOS_GENERAL: 'eventosIASD',
        EVENTOS_AVENTUREROS: 'eventosAventureros',
        EVENTOS_CONQUISTADORES: 'eventosConquistadores',
        EVENTOS_GUIAS: 'eventosGuias'
    },

    // Obtener datos deserializados
    get(key, defaultValue) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (e) {
            console.error(`Error al leer ${key} desde localStorage:`, e);
            return defaultValue;
        }
    },

    // Guardar datos serializados
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            console.error(`Error al guardar ${key} en localStorage:`, e);
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
