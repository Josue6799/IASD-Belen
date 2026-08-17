-- ============================================================
-- SCRIPT DEFINITIVO DE CONFIGURACIÓN Y TABLAS EN SUPABASE
-- IASD Belén · Iglesia Adventista del Séptimo Día
-- Copia y ejecuta este script completo en el SQL Editor de Supabase
-- ============================================================

-- 1. TABLA ENCUESTAS
CREATE TABLE IF NOT EXISTS public.encuestas (
    id TEXT PRIMARY KEY,
    pregunta TEXT DEFAULT '',
    titulo TEXT DEFAULT '',
    opciones JSONB DEFAULT '[]'::jsonb,
    votos JSONB DEFAULT '[]'::jsonb,
    activa BOOLEAN DEFAULT true
);
ALTER TABLE public.encuestas ADD COLUMN IF NOT EXISTS pregunta TEXT DEFAULT '';
ALTER TABLE public.encuestas ADD COLUMN IF NOT EXISTS titulo TEXT DEFAULT '';
ALTER TABLE public.encuestas ADD COLUMN IF NOT EXISTS opciones JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.encuestas ADD COLUMN IF NOT EXISTS votos JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.encuestas ADD COLUMN IF NOT EXISTS activa BOOLEAN DEFAULT true;

-- 2. TABLA VOTOS_ENCUESTAS
CREATE TABLE IF NOT EXISTS public.votos_encuestas (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    encuesta_id TEXT,
    usuario_identificador TEXT,
    opcion_index INT,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT now()
);
ALTER TABLE public.votos_encuestas ADD COLUMN IF NOT EXISTS encuesta_id TEXT;
ALTER TABLE public.votos_encuestas ADD COLUMN IF NOT EXISTS usuario_identificador TEXT;
ALTER TABLE public.votos_encuestas ADD COLUMN IF NOT EXISTS opcion_index INT;
ALTER TABLE public.votos_encuestas ADD COLUMN IF NOT EXISTS fecha TIMESTAMP WITH TIME ZONE DEFAULT now();

-- 3. TABLA ALUMNOS_IDENTIDADES
CREATE TABLE IF NOT EXISTS public.alumnos_identidades (
    documento TEXT PRIMARY KEY,
    nombre TEXT,
    whatsapp TEXT,
    grupo TEXT DEFAULT 'General',
    pin TEXT,
    "fechaRegistro" TIMESTAMP WITH TIME ZONE DEFAULT now(),
    fecharegistro TIMESTAMP WITH TIME ZONE DEFAULT now(),
    fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT now()
);
ALTER TABLE public.alumnos_identidades ADD COLUMN IF NOT EXISTS nombre TEXT;
ALTER TABLE public.alumnos_identidades ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE public.alumnos_identidades ADD COLUMN IF NOT EXISTS grupo TEXT DEFAULT 'General';
ALTER TABLE public.alumnos_identidades ADD COLUMN IF NOT EXISTS pin TEXT;
ALTER TABLE public.alumnos_identidades ADD COLUMN IF NOT EXISTS "fechaRegistro" TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE public.alumnos_identidades ADD COLUMN IF NOT EXISTS fecharegistro TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE public.alumnos_identidades ADD COLUMN IF NOT EXISTS fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT now();

-- 4. TABLA CRONOGRAMA_PREDICADORES
CREATE TABLE IF NOT EXISTS public.cronograma_predicadores (
    id TEXT PRIMARY KEY,
    fecha TEXT,
    predicador TEXT,
    culto_tipo TEXT,
    actividad TEXT DEFAULT 'Culto',
    tema TEXT,
    curso TEXT,
    recurrente BOOLEAN DEFAULT false,
    semanas INTEGER DEFAULT 1
);
ALTER TABLE public.cronograma_predicadores ADD COLUMN IF NOT EXISTS fecha TEXT;
ALTER TABLE public.cronograma_predicadores ADD COLUMN IF NOT EXISTS predicador TEXT;
ALTER TABLE public.cronograma_predicadores ADD COLUMN IF NOT EXISTS culto_tipo TEXT;
ALTER TABLE public.cronograma_predicadores ADD COLUMN IF NOT EXISTS actividad TEXT DEFAULT 'Culto';
ALTER TABLE public.cronograma_predicadores ADD COLUMN IF NOT EXISTS tema TEXT;
ALTER TABLE public.cronograma_predicadores ADD COLUMN IF NOT EXISTS curso TEXT;
ALTER TABLE public.cronograma_predicadores ADD COLUMN IF NOT EXISTS recurrente BOOLEAN DEFAULT false;
ALTER TABLE public.cronograma_predicadores ADD COLUMN IF NOT EXISTS semanas INTEGER DEFAULT 1;

-- 5. TABLA EVENTOS_CLUBES Y EVENTOS GENERALES
CREATE TABLE IF NOT EXISTS public.eventos_iglesia (
    id TEXT PRIMARY KEY,
    titulo TEXT,
    descripcion TEXT,
    fecha TEXT,
    hora TEXT,
    lugar TEXT,
    categoria TEXT DEFAULT 'General'
);
ALTER TABLE public.eventos_iglesia ADD COLUMN IF NOT EXISTS titulo TEXT;
ALTER TABLE public.eventos_iglesia ADD COLUMN IF NOT EXISTS descripcion TEXT;
ALTER TABLE public.eventos_iglesia ADD COLUMN IF NOT EXISTS fecha TEXT;
ALTER TABLE public.eventos_iglesia ADD COLUMN IF NOT EXISTS hora TEXT;
ALTER TABLE public.eventos_iglesia ADD COLUMN IF NOT EXISTS lugar TEXT;
ALTER TABLE public.eventos_iglesia ADD COLUMN IF NOT EXISTS categoria TEXT DEFAULT 'General';

CREATE TABLE IF NOT EXISTS public.eventos_clubes (
    id TEXT PRIMARY KEY,
    club TEXT DEFAULT 'Aventureros',
    titulo TEXT,
    descripcion TEXT,
    fecha TEXT,
    hora TEXT,
    lugar TEXT
);
ALTER TABLE public.eventos_clubes ADD COLUMN IF NOT EXISTS club TEXT DEFAULT 'Aventureros';
ALTER TABLE public.eventos_clubes ADD COLUMN IF NOT EXISTS titulo TEXT;
ALTER TABLE public.eventos_clubes ADD COLUMN IF NOT EXISTS descripcion TEXT;
ALTER TABLE public.eventos_clubes ADD COLUMN IF NOT EXISTS fecha TEXT;
ALTER TABLE public.eventos_clubes ADD COLUMN IF NOT EXISTS hora TEXT;
ALTER TABLE public.eventos_clubes ADD COLUMN IF NOT EXISTS lugar TEXT;

CREATE TABLE IF NOT EXISTS public.eventos_aventureros (id TEXT PRIMARY KEY, titulo TEXT, descripcion TEXT, fecha TEXT, hora TEXT, lugar TEXT);
CREATE TABLE IF NOT EXISTS public.eventos_conquistadores (id TEXT PRIMARY KEY, titulo TEXT, descripcion TEXT, fecha TEXT, hora TEXT, lugar TEXT);
CREATE TABLE IF NOT EXISTS public.eventos_guias_mayores (id TEXT PRIMARY KEY, titulo TEXT, descripcion TEXT, fecha TEXT, hora TEXT, lugar TEXT);

-- 6. TABLAS DE MIEMBROS DE CLUBES
CREATE TABLE IF NOT EXISTS public.miembros_clubes (
    id TEXT PRIMARY KEY,
    club_tipo TEXT,
    nombre TEXT,
    apellido TEXT,
    documento TEXT,
    cc TEXT,
    fecha_nacimiento TEXT,
    fechanacimiento TEXT,
    tutor_nombre TEXT,
    tutor TEXT,
    celular TEXT,
    telefono TEXT,
    unidad TEXT,
    cargo TEXT DEFAULT 'Miembro',
    tipo_sangre TEXT,
    tiposangre TEXT,
    cartillas TEXT,
    especialidades TEXT,
    estado TEXT DEFAULT 'activo'
);
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS club_tipo TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS nombre TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS apellido TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS documento TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS cc TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS fecha_nacimiento TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS fechanacimiento TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS tutor_nombre TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS tutor TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS celular TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS telefono TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS unidad TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS cargo TEXT DEFAULT 'Miembro';
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS tipo_sangre TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS tiposangre TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS cartillas TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS especialidades TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS estado TEXT DEFAULT 'activo';

CREATE TABLE IF NOT EXISTS public.bd_aventureros (
    id TEXT PRIMARY KEY, nombre TEXT, apellido TEXT, documento TEXT, cc TEXT, fecha_nacimiento TEXT, fechanacimiento TEXT, tutor_nombre TEXT, tutor TEXT, celular TEXT, telefono TEXT, unidad TEXT, cargo TEXT DEFAULT 'Miembro', tipo_sangre TEXT, tiposangre TEXT, cartillas TEXT, especialidades TEXT, estado TEXT DEFAULT 'activo'
);
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS documento TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS cc TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS fecha_nacimiento TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS fechanacimiento TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS tutor_nombre TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS tutor TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS celular TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS telefono TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS tipo_sangre TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS tiposangre TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS cartillas TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS especialidades TEXT;

CREATE TABLE IF NOT EXISTS public.bd_conquistadores (
    id TEXT PRIMARY KEY, nombre TEXT, apellido TEXT, documento TEXT, cc TEXT, fecha_nacimiento TEXT, fechanacimiento TEXT, tutor_nombre TEXT, tutor TEXT, celular TEXT, telefono TEXT, unidad TEXT, cargo TEXT DEFAULT 'Miembro', tipo_sangre TEXT, tiposangre TEXT, cartillas TEXT, especialidades TEXT, estado TEXT DEFAULT 'activo'
);
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS documento TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS cc TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS fecha_nacimiento TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS fechanacimiento TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS tutor_nombre TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS tutor TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS celular TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS telefono TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS tipo_sangre TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS tiposangre TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS cartillas TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS especialidades TEXT;

CREATE TABLE IF NOT EXISTS public.bd_guias_mayores (
    id TEXT PRIMARY KEY, nombre TEXT, apellido TEXT, documento TEXT, cc TEXT, fecha_nacimiento TEXT, fechanacimiento TEXT, tutor_nombre TEXT, tutor TEXT, celular TEXT, telefono TEXT, unidad TEXT, cargo TEXT DEFAULT 'Miembro', tipo_sangre TEXT, tiposangre TEXT, cartillas TEXT, especialidades TEXT, estado TEXT DEFAULT 'activo'
);
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS documento TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS cc TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS fecha_nacimiento TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS fechanacimiento TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS tutor_nombre TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS tutor TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS celular TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS telefono TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS tipo_sangre TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS tiposangre TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS cartillas TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS especialidades TEXT;

-- 7. TABLAS DE CUOTAS DE CLUBES
CREATE TABLE IF NOT EXISTS public.cuotas_clubes (
    id TEXT PRIMARY KEY,
    nombre TEXT,
    miembro_nombre TEXT,
    miembro_id TEXT,
    domingo INTEGER DEFAULT 0,
    valor NUMERIC DEFAULT 0,
    pagado BOOLEAN DEFAULT false,
    pagos JSONB DEFAULT '{}'::jsonb
);
ALTER TABLE public.cuotas_clubes ADD COLUMN IF NOT EXISTS miembro_nombre TEXT;
ALTER TABLE public.cuotas_clubes ADD COLUMN IF NOT EXISTS miembro_id TEXT;
ALTER TABLE public.cuotas_clubes ADD COLUMN IF NOT EXISTS domingo INTEGER DEFAULT 0;
ALTER TABLE public.cuotas_clubes ADD COLUMN IF NOT EXISTS valor NUMERIC DEFAULT 0;
ALTER TABLE public.cuotas_clubes ADD COLUMN IF NOT EXISTS pagado BOOLEAN DEFAULT false;
ALTER TABLE public.cuotas_clubes ADD COLUMN IF NOT EXISTS pagos JSONB DEFAULT '{}'::jsonb;

CREATE TABLE IF NOT EXISTS public.cuotas_aventureros (id TEXT PRIMARY KEY, nombre TEXT, miembro_nombre TEXT, pagos JSONB DEFAULT '{}'::jsonb);
CREATE TABLE IF NOT EXISTS public.cuotas_conquistadores (id TEXT PRIMARY KEY, nombre TEXT, miembro_nombre TEXT, pagos JSONB DEFAULT '{}'::jsonb);
CREATE TABLE IF NOT EXISTS public.cuotas_guias_mayores (id TEXT PRIMARY KEY, nombre TEXT, miembro_nombre TEXT, pagos JSONB DEFAULT '{}'::jsonb);

-- 8. TABLA ANUNCIOS
CREATE TABLE IF NOT EXISTS public.anuncios (
    id TEXT PRIMARY KEY,
    titulo TEXT,
    contenido TEXT,
    categoria TEXT DEFAULT 'General',
    ubicacion TEXT,
    fecha_inicio TEXT,
    hora_inicio TEXT,
    fecha_fin TEXT,
    hora_fin TEXT,
    imagen TEXT,
    imagen_url TEXT,
    activo BOOLEAN DEFAULT true
);
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS titulo TEXT;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS contenido TEXT;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS categoria TEXT DEFAULT 'General';
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS fecha_inicio TEXT;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS hora_inicio TEXT;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS fecha_fin TEXT;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS hora_fin TEXT;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS ubicacion TEXT;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS imagen TEXT;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS imagen_url TEXT;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS activo BOOLEAN DEFAULT true;

-- 9. TABLA TRANSMISIONES
CREATE TABLE IF NOT EXISTS public.transmisiones (
    id TEXT PRIMARY KEY,
    titulo TEXT,
    url_video TEXT DEFAULT '',
    url TEXT DEFAULT '',
    tipo TEXT DEFAULT 'YouTube',
    activo BOOLEAN DEFAULT true,
    activa BOOLEAN DEFAULT true,
    fecha TIMESTAMP WITH TIME ZONE DEFAULT now()
);
ALTER TABLE public.transmisiones ADD COLUMN IF NOT EXISTS titulo TEXT;
ALTER TABLE public.transmisiones ADD COLUMN IF NOT EXISTS url_video TEXT DEFAULT '';
ALTER TABLE public.transmisiones ADD COLUMN IF NOT EXISTS url TEXT DEFAULT '';
ALTER TABLE public.transmisiones ADD COLUMN IF NOT EXISTS tipo TEXT DEFAULT 'YouTube';
ALTER TABLE public.transmisiones ADD COLUMN IF NOT EXISTS activo BOOLEAN DEFAULT true;
ALTER TABLE public.transmisiones ADD COLUMN IF NOT EXISTS activa BOOLEAN DEFAULT true;
ALTER TABLE public.transmisiones ADD COLUMN IF NOT EXISTS fecha TIMESTAMP WITH TIME ZONE DEFAULT now();

-- 10. TABLA GALERIA_FOTOS
CREATE TABLE IF NOT EXISTS public.galeria_fotos (
    id TEXT PRIMARY KEY,
    titulo TEXT,
    descripcion TEXT,
    imagen TEXT,
    url TEXT,
    categoria TEXT DEFAULT 'General',
    fecha TEXT,
    creadopor TEXT DEFAULT 'admin'
);
ALTER TABLE public.galeria_fotos ADD COLUMN IF NOT EXISTS titulo TEXT;
ALTER TABLE public.galeria_fotos ADD COLUMN IF NOT EXISTS descripcion TEXT;
ALTER TABLE public.galeria_fotos ADD COLUMN IF NOT EXISTS imagen TEXT;
ALTER TABLE public.galeria_fotos ADD COLUMN IF NOT EXISTS url TEXT;
ALTER TABLE public.galeria_fotos ADD COLUMN IF NOT EXISTS categoria TEXT DEFAULT 'General';
ALTER TABLE public.galeria_fotos ADD COLUMN IF NOT EXISTS fecha TEXT;
ALTER TABLE public.galeria_fotos ADD COLUMN IF NOT EXISTS creadopor TEXT DEFAULT 'admin';

-- 11. TABLA LIBROS
CREATE TABLE IF NOT EXISTS public.libros (
    id TEXT PRIMARY KEY,
    titulo TEXT,
    autor TEXT,
    categoria TEXT,
    disponible BOOLEAN DEFAULT true,
    estado TEXT DEFAULT 'Disponible',
    portada_url TEXT,
    portada TEXT,
    descripcion TEXT,
    numero_inventario TEXT
);
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS titulo TEXT;
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS autor TEXT;
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS categoria TEXT;
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS estado TEXT DEFAULT 'Disponible';
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS disponible BOOLEAN DEFAULT true;
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS portada_url TEXT;
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS portada TEXT;
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS descripcion TEXT;
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS numero_inventario TEXT;

-- 12. TABLA PEDIDOS_LIBROS
CREATE TABLE IF NOT EXISTS public.pedidos_libros (
    id TEXT PRIMARY KEY,
    libro_id TEXT,
    libro_titulo TEXT,
    titulo_libro TEXT,
    solicitante_nombre TEXT,
    solicitante TEXT,
    solicitante_contacto TEXT,
    contacto TEXT,
    telefono TEXT,
    email TEXT,
    estado TEXT DEFAULT 'Pendiente',
    fecha_solicitud TEXT,
    fecha_pedido TEXT,
    fecha TEXT
);
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS libro_id TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS libro_titulo TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS titulo_libro TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS solicitante_nombre TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS solicitante TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS solicitante_contacto TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS contacto TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS telefono TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS estado TEXT DEFAULT 'Pendiente';
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS fecha_solicitud TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS fecha_pedido TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS fecha TEXT;

-- 13. TABLA INTERESADOS (¡QUEREMOS CONOCERTE!)
CREATE TABLE IF NOT EXISTS public.interesados (
    id TEXT PRIMARY KEY,
    nombre TEXT,
    telefono TEXT,
    whatsapp TEXT,
    direccion TEXT,
    email TEXT,
    estudio_interes TEXT DEFAULT 'Estudio Bíblico',
    estado TEXT DEFAULT 'nuevo',
    contactado BOOLEAN DEFAULT false,
    fecha TEXT,
    fecha_contacto TEXT,
    notas TEXT
);
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS nombre TEXT;
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS telefono TEXT;
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS direccion TEXT;
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS estudio_interes TEXT DEFAULT 'Estudio Bíblico';
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS estado TEXT DEFAULT 'nuevo';
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS contactado BOOLEAN DEFAULT false;
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS fecha TEXT;
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS fecha_contacto TEXT;
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS notas TEXT;

-- 14. TABLA EXAMENES
CREATE TABLE IF NOT EXISTS public.examenes (
    id TEXT PRIMARY KEY,
    id_curso TEXT DEFAULT 'general',
    titulo TEXT,
    descripcion TEXT,
    duracion_min INT DEFAULT 30,
    preguntas JSONB DEFAULT '[]'::jsonb,
    cantidadpreguntas INT DEFAULT 0,
    cantidad_preguntas INT DEFAULT 0,
    activo BOOLEAN DEFAULT true
);
ALTER TABLE public.examenes ADD COLUMN IF NOT EXISTS id_curso TEXT DEFAULT 'general';
ALTER TABLE public.examenes ADD COLUMN IF NOT EXISTS titulo TEXT;
ALTER TABLE public.examenes ADD COLUMN IF NOT EXISTS descripcion TEXT;
ALTER TABLE public.examenes ADD COLUMN IF NOT EXISTS duracion_min INT DEFAULT 30;
ALTER TABLE public.examenes ADD COLUMN IF NOT EXISTS preguntas JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.examenes ADD COLUMN IF NOT EXISTS cantidadpreguntas INT DEFAULT 0;
ALTER TABLE public.examenes ADD COLUMN IF NOT EXISTS cantidad_preguntas INT DEFAULT 0;
ALTER TABLE public.examenes ADD COLUMN IF NOT EXISTS activo BOOLEAN DEFAULT true;

-- 15. TABLA RESPUESTAS_EXAMENES
CREATE TABLE IF NOT EXISTS public.respuestas_examenes (
    id TEXT PRIMARY KEY,
    examen_id TEXT,
    alumno_documento TEXT,
    alumno_nombre TEXT,
    calificacion NUMERIC DEFAULT 0,
    respuestas JSONB DEFAULT '{}'::jsonb,
    intento INT DEFAULT 1,
    estado TEXT DEFAULT 'aprobado',
    fecha_rendido TEXT
);
ALTER TABLE public.respuestas_examenes ADD COLUMN IF NOT EXISTS examen_id TEXT;
ALTER TABLE public.respuestas_examenes ADD COLUMN IF NOT EXISTS alumno_documento TEXT;
ALTER TABLE public.respuestas_examenes ADD COLUMN IF NOT EXISTS alumno_nombre TEXT;
ALTER TABLE public.respuestas_examenes ADD COLUMN IF NOT EXISTS calificacion NUMERIC DEFAULT 0;
ALTER TABLE public.respuestas_examenes ADD COLUMN IF NOT EXISTS respuestas JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.respuestas_examenes ADD COLUMN IF NOT EXISTS intento INT DEFAULT 1;
ALTER TABLE public.respuestas_examenes ADD COLUMN IF NOT EXISTS estado TEXT DEFAULT 'aprobado';
ALTER TABLE public.respuestas_examenes ADD COLUMN IF NOT EXISTS fecha_rendido TEXT;

-- 16. TABLA INSCRIPCIONES_CURSOS
CREATE TABLE IF NOT EXISTS public.inscripciones_cursos (
    alumno_documento TEXT,
    id_curso TEXT,
    progreso NUMERIC DEFAULT 0,
    estado TEXT DEFAULT 'en_proceso',
    PRIMARY KEY (alumno_documento, id_curso)
);
ALTER TABLE public.inscripciones_cursos ADD COLUMN IF NOT EXISTS progreso NUMERIC DEFAULT 0;
ALTER TABLE public.inscripciones_cursos ADD COLUMN IF NOT EXISTS estado TEXT DEFAULT 'en_proceso';

-- 17. TABLA LOGROS_ALUMNOS
CREATE TABLE IF NOT EXISTS public.logros_alumnos (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    alumno_documento TEXT,
    logro_id TEXT,
    fecha_desbloqueo TIMESTAMP WITH TIME ZONE DEFAULT now()
);
ALTER TABLE public.logros_alumnos ADD COLUMN IF NOT EXISTS alumno_documento TEXT;
ALTER TABLE public.logros_alumnos ADD COLUMN IF NOT EXISTS logro_id TEXT;
ALTER TABLE public.logros_alumnos ADD COLUMN IF NOT EXISTS fecha_desbloqueo TIMESTAMP WITH TIME ZONE DEFAULT now();

-- 18. TABLA PLAN_ESTUDIOS
CREATE TABLE IF NOT EXISTS public.plan_estudios (
    id TEXT PRIMARY KEY DEFAULT 'principal',
    datos JSONB DEFAULT '{}'::jsonb
);
ALTER TABLE public.plan_estudios ADD COLUMN IF NOT EXISTS datos JSONB DEFAULT '{}'::jsonb;

-- ============================================================
-- 19. POLÍTICAS RLS UNIVERSALES (ALLOW ALL) EN TODAS LAS TABLAS
-- ============================================================
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
    LOOP
        EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "Allow all" ON public.%I;', tbl);
        EXECUTE format('CREATE POLICY "Allow all" ON public.%I FOR ALL USING (true) WITH CHECK (true);', tbl);
    END LOOP;
END $$;

-- ============================================================
-- 20. HABILITAR PUBLICACIÓN SUPABASE REALTIME ENTRE DISPOSITIVOS
-- ============================================================
DO $$
DECLARE
    t text;
    realtime_tables text[] := ARRAY[
        'encuestas', 'votos_encuestas', 'alumnos_identidades', 'cronograma_predicadores',
        'eventos_iglesia', 'eventos_clubes', 'eventos_aventureros', 'eventos_conquistadores', 'eventos_guias_mayores',
        'miembros_clubes', 'bd_aventureros', 'bd_conquistadores', 'bd_guias_mayores',
        'cuotas_clubes', 'cuotas_aventureros', 'cuotas_conquistadores', 'cuotas_guias_mayores',
        'anuncios', 'transmisiones', 'galeria_fotos', 'libros', 'pedidos_libros',
        'interesados', 'examenes', 'respuestas_examenes', 'inscripciones_cursos', 'logros_alumnos', 'plan_estudios'
    ];
BEGIN
    IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
        FOREACH t IN ARRAY realtime_tables
        LOOP
            BEGIN
                EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I;', t);
            EXCEPTION WHEN OTHERS THEN
                NULL;
            END;
        END LOOP;
    END IF;
END $$;

-- ============================================================
-- 21. VACIADO DE DATOS DE PRUEBA (CONSERVANDO DATOS REALES)
-- ============================================================
DELETE FROM encuestas WHERE titulo LIKE '%Si o no%' OR titulo LIKE '%test%' OR pregunta LIKE '%Si o no%' OR pregunta LIKE '%test%';
DELETE FROM pedidos_libros WHERE solicitante_nombre LIKE '%Juan Perez%' OR solicitante_nombre LIKE '%test%' OR email LIKE '%test%' OR solicitante LIKE '%Juan Perez%';
DELETE FROM interesados WHERE nombre LIKE '%Test%' OR nombre LIKE '%Prueba%';
DELETE FROM eventos_clubes WHERE titulo LIKE '%Test%' OR titulo LIKE '%Prueba%';
DELETE FROM miembros_clubes WHERE nombre LIKE '%Test%' OR nombre LIKE '%Prueba%';
