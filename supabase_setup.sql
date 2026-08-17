-- ============================================================
-- SCRIPT DEFINITIVO DE CONFIGURACIÓN Y MIGRACIÓN EN SUPABASE
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

-- 2. TABLA ALUMNOS_IDENTIDADES
CREATE TABLE IF NOT EXISTS public.alumnos_identidades (
    documento TEXT PRIMARY KEY,
    nombre TEXT,
    whatsapp TEXT,
    grupo TEXT DEFAULT 'General',
    pin TEXT,
    "fechaRegistro" TIMESTAMP WITH TIME ZONE DEFAULT now(),
    fecharegistro TIMESTAMP WITH TIME ZONE DEFAULT now()
);
ALTER TABLE public.alumnos_identidades ADD COLUMN IF NOT EXISTS "fechaRegistro" TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE public.alumnos_identidades ADD COLUMN IF NOT EXISTS fecharegistro TIMESTAMP WITH TIME ZONE DEFAULT now();

-- 3. TABLA CRONOGRAMA_PREDICADORES
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
ALTER TABLE public.cronograma_predicadores ADD COLUMN IF NOT EXISTS actividad TEXT DEFAULT 'Culto';
ALTER TABLE public.cronograma_predicadores ADD COLUMN IF NOT EXISTS curso TEXT;
ALTER TABLE public.cronograma_predicadores ADD COLUMN IF NOT EXISTS recurrente BOOLEAN DEFAULT false;
ALTER TABLE public.cronograma_predicadores ADD COLUMN IF NOT EXISTS semanas INTEGER DEFAULT 1;

-- 4. TABLA EVENTOS_CLUBES
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

-- 5. TABLA MIEMBROS_CLUBES
CREATE TABLE IF NOT EXISTS public.miembros_clubes (
    id TEXT PRIMARY KEY,
    club_tipo TEXT,
    nombre TEXT,
    apellido TEXT,
    documento TEXT,
    fecha_nacimiento TEXT,
    tutor_nombre TEXT,
    celular TEXT,
    unidad TEXT,
    cargo TEXT DEFAULT 'Miembro',
    tipo_sangre TEXT,
    cartillas TEXT,
    especialidades TEXT,
    estado TEXT DEFAULT 'activo'
);
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS documento TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS tipo_sangre TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS cartillas TEXT;
ALTER TABLE public.miembros_clubes ADD COLUMN IF NOT EXISTS especialidades TEXT;

-- Tablas dedicadas por club
CREATE TABLE IF NOT EXISTS public.bd_aventureros (
    id TEXT PRIMARY KEY, nombre TEXT, apellido TEXT, documento TEXT, fecha_nacimiento TEXT, tutor_nombre TEXT, celular TEXT, unidad TEXT, cargo TEXT DEFAULT 'Miembro', tipo_sangre TEXT, cartillas TEXT, especialidades TEXT, estado TEXT DEFAULT 'activo'
);
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS documento TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS tipo_sangre TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS cartillas TEXT;
ALTER TABLE public.bd_aventureros ADD COLUMN IF NOT EXISTS especialidades TEXT;

CREATE TABLE IF NOT EXISTS public.bd_conquistadores (
    id TEXT PRIMARY KEY, nombre TEXT, apellido TEXT, documento TEXT, fecha_nacimiento TEXT, tutor_nombre TEXT, celular TEXT, unidad TEXT, cargo TEXT DEFAULT 'Miembro', tipo_sangre TEXT, cartillas TEXT, especialidades TEXT, estado TEXT DEFAULT 'activo'
);
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS documento TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS tipo_sangre TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS cartillas TEXT;
ALTER TABLE public.bd_conquistadores ADD COLUMN IF NOT EXISTS especialidades TEXT;

CREATE TABLE IF NOT EXISTS public.bd_guias_mayores (
    id TEXT PRIMARY KEY, nombre TEXT, apellido TEXT, documento TEXT, fecha_nacimiento TEXT, tutor_nombre TEXT, celular TEXT, unidad TEXT, cargo TEXT DEFAULT 'Miembro', tipo_sangre TEXT, cartillas TEXT, especialidades TEXT, estado TEXT DEFAULT 'activo'
);
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS documento TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS tipo_sangre TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS cartillas TEXT;
ALTER TABLE public.bd_guias_mayores ADD COLUMN IF NOT EXISTS especialidades TEXT;

-- 6. TABLA CUOTAS_CLUBES
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

CREATE TABLE IF NOT EXISTS public.cuotas_aventureros (id TEXT PRIMARY KEY, nombre TEXT, pagos JSONB DEFAULT '{}'::jsonb);
CREATE TABLE IF NOT EXISTS public.cuotas_conquistadores (id TEXT PRIMARY KEY, nombre TEXT, pagos JSONB DEFAULT '{}'::jsonb);
CREATE TABLE IF NOT EXISTS public.cuotas_guias_mayores (id TEXT PRIMARY KEY, nombre TEXT, pagos JSONB DEFAULT '{}'::jsonb);

-- 7. TABLA ANUNCIOS
CREATE TABLE IF NOT EXISTS public.anuncios (
    id TEXT PRIMARY KEY,
    titulo TEXT,
    contenido TEXT,
    categoria TEXT DEFAULT 'General',
    ubicacion TEXT,
    fecha_inicio DATE,
    hora_inicio TIME,
    fecha_fin DATE,
    hora_fin TIME,
    imagen TEXT,
    imagen_url TEXT,
    activo BOOLEAN DEFAULT true
);
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS fecha_inicio DATE;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS hora_inicio TIME;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS fecha_fin DATE;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS hora_fin TIME;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS ubicacion TEXT;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS imagen TEXT;
ALTER TABLE public.anuncios ADD COLUMN IF NOT EXISTS imagen_url TEXT;

-- 8. TABLA TRANSMISIONES
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
ALTER TABLE public.transmisiones ADD COLUMN IF NOT EXISTS activa BOOLEAN DEFAULT true;
ALTER TABLE public.transmisiones ADD COLUMN IF NOT EXISTS fecha TIMESTAMP WITH TIME ZONE DEFAULT now();
ALTER TABLE public.transmisiones ADD COLUMN IF NOT EXISTS url_video TEXT DEFAULT '';
ALTER TABLE public.transmisiones ADD COLUMN IF NOT EXISTS url TEXT DEFAULT '';

-- 9. TABLA LIBROS
CREATE TABLE IF NOT EXISTS public.libros (
    id TEXT PRIMARY KEY,
    titulo TEXT DEFAULT '',
    autor TEXT DEFAULT '',
    categoria TEXT DEFAULT 'General',
    cant INTEGER DEFAULT 1,
    ubicacion TEXT DEFAULT 'Biblioteca',
    disponible BOOLEAN DEFAULT true,
    estado TEXT DEFAULT 'Disponible',
    portada_url TEXT DEFAULT '',
    portada TEXT DEFAULT '',
    descripcion TEXT DEFAULT '',
    numero_inventario TEXT DEFAULT ''
);
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS titulo TEXT DEFAULT '';
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS autor TEXT DEFAULT '';
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS categoria TEXT DEFAULT 'General';
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS cant INTEGER DEFAULT 1;
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS ubicacion TEXT DEFAULT 'Biblioteca';
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS estado TEXT DEFAULT 'Disponible';
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS disponible BOOLEAN DEFAULT true;
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS portada_url TEXT DEFAULT '';
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS portada TEXT DEFAULT '';
ALTER TABLE public.libros ADD COLUMN IF NOT EXISTS numero_inventario TEXT DEFAULT '';
ALTER TABLE public.libros ALTER COLUMN numero_inventario DROP NOT NULL;
ALTER TABLE public.libros ALTER COLUMN numero_inventario SET DEFAULT '';

-- 10. TABLA PEDIDOS_LIBROS
CREATE TABLE IF NOT EXISTS public.pedidos_libros (
    id TEXT PRIMARY KEY,
    libro_id TEXT,
    libro_titulo TEXT,
    titulo_libro TEXT,
    solicitante_nombre TEXT,
    solicitante TEXT,
    solicitante_contacto TEXT,
    contacto TEXT,
    email TEXT,
    estado TEXT DEFAULT 'Pendiente',
    fecha_solicitud TEXT,
    fecha_pedido TEXT
);
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS email TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS libro_id TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS libroid INTEGER;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS libro_titulo TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS titulo_libro TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS titulolibro TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS solicitante_nombre TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS solicitante TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS solicitante_contacto TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS contacto TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS telefono TEXT;
ALTER TABLE public.pedidos_libros ADD COLUMN IF NOT EXISTS fecha TEXT;

-- 11. OTRAS TABLAS (INTERESADOS, VOTOS_ENCUESTAS, EXAMENES, RESPUESTAS, INSCRIPCIONES, EVENTOS)
CREATE TABLE IF NOT EXISTS public.interesados (
    id TEXT PRIMARY KEY, nombre TEXT, telefono TEXT, whatsapp TEXT, direccion TEXT, email TEXT, estudio_interes TEXT, estado TEXT DEFAULT 'nuevo', contactado BOOLEAN DEFAULT false, fecha TEXT, fecha_contacto TEXT, notas TEXT
);
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS contactado BOOLEAN DEFAULT false;
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS whatsapp TEXT;
ALTER TABLE public.interesados ADD COLUMN IF NOT EXISTS email TEXT;

CREATE TABLE IF NOT EXISTS public.votos_encuestas (id TEXT PRIMARY KEY, encuesta_id TEXT, usuario_identificador TEXT, opcion_index INT, fecha TEXT);

CREATE TABLE IF NOT EXISTS public.examenes (
    id TEXT PRIMARY KEY, id_curso TEXT, titulo TEXT, descripcion TEXT, duracion_min INT DEFAULT 30, preguntas JSONB DEFAULT '[]'::jsonb, cantidadpreguntas INT DEFAULT 0, cantidad_preguntas INT DEFAULT 0, activo BOOLEAN DEFAULT true
);
ALTER TABLE public.examenes ADD COLUMN IF NOT EXISTS cantidadpreguntas INT DEFAULT 0;
ALTER TABLE public.examenes ADD COLUMN IF NOT EXISTS cantidad_preguntas INT DEFAULT 0;

CREATE TABLE IF NOT EXISTS public.respuestas_examenes (id TEXT PRIMARY KEY, examen_id TEXT, alumno_documento TEXT, alumno_nombre TEXT, calificacion NUMERIC DEFAULT 0, respuestas JSONB DEFAULT '{}'::jsonb, intento INT DEFAULT 1, estado TEXT DEFAULT 'aprobado', fecha_rendido TEXT);

CREATE TABLE IF NOT EXISTS public.inscripciones_cursos (
    alumno_documento TEXT, id_curso TEXT, curso_id TEXT, progreso NUMERIC DEFAULT 0, estado TEXT DEFAULT 'en_proceso', fecha_inscripcion TEXT, PRIMARY KEY (alumno_documento, id_curso)
);
ALTER TABLE public.inscripciones_cursos ADD COLUMN IF NOT EXISTS curso_id TEXT;
ALTER TABLE public.inscripciones_cursos ADD COLUMN IF NOT EXISTS id_curso TEXT;
ALTER TABLE public.inscripciones_cursos ADD COLUMN IF NOT EXISTS fecha_inscripcion TEXT;
ALTER TABLE public.inscripciones_cursos ADD COLUMN IF NOT EXISTS progreso NUMERIC DEFAULT 0;
ALTER TABLE public.inscripciones_cursos ADD COLUMN IF NOT EXISTS estado TEXT DEFAULT 'en_proceso';

CREATE TABLE IF NOT EXISTS public.eventos_iglesia (id TEXT PRIMARY KEY, titulo TEXT, descripcion TEXT, fecha TEXT, hora TEXT, lugar TEXT, categoria TEXT);
CREATE TABLE IF NOT EXISTS public.eventos_aventureros (id TEXT PRIMARY KEY, titulo TEXT, descripcion TEXT, fecha TEXT, hora TEXT, lugar TEXT);
CREATE TABLE IF NOT EXISTS public.eventos_conquistadores (id TEXT PRIMARY KEY, titulo TEXT, descripcion TEXT, fecha TEXT, hora TEXT, lugar TEXT);
CREATE TABLE IF NOT EXISTS public.eventos_guias_mayores (id TEXT PRIMARY KEY, titulo TEXT, descripcion TEXT, fecha TEXT, hora TEXT, lugar TEXT);

-- ============================================================
-- 12. POLÍTICAS RLS UNIVERSALES (ALLOW ALL) EN TODAS LAS TABLAS
-- ============================================================
DO $$
DECLARE
    tbl text;
BEGIN
    FOR tbl IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public')
    LOOP
        EXECUTE format('ALTER TABLE %I ENABLE ROW LEVEL SECURITY;', tbl);
        EXECUTE format('DROP POLICY IF EXISTS "Allow all" ON %I;', tbl);
        EXECUTE format('CREATE POLICY "Allow all" ON %I FOR ALL USING (true) WITH CHECK (true);', tbl);
    END LOOP;
END $$;

-- ============================================================
-- 13. VACIADO DE DATOS DE PRUEBA (CONSERVANDO DATOS REALES)
-- ============================================================
-- Eliminar encuestas de prueba (título 'Si o no' o similar)
DELETE FROM encuestas WHERE titulo LIKE '%Si o no%' OR titulo LIKE '%test%' OR pregunta LIKE '%Si o no%' OR pregunta LIKE '%test%';

-- Eliminar pedidos de prueba
DELETE FROM pedidos_libros WHERE solicitante_nombre LIKE '%Juan Perez%' OR solicitante_nombre LIKE '%test%' OR email LIKE '%test%' OR solicitante LIKE '%Juan Perez%';

-- Eliminar interesados de prueba
DELETE FROM interesados WHERE nombre LIKE '%Test%' OR nombre LIKE '%Prueba%';

-- Eliminar eventos de clubes de prueba
DELETE FROM eventos_clubes WHERE titulo LIKE '%Test%' OR titulo LIKE '%Prueba%';

-- Eliminar miembros de clubes de prueba
DELETE FROM miembros_clubes WHERE nombre LIKE '%Test%' OR nombre LIKE '%Prueba%';

-- Eliminar cuotas de prueba
DELETE FROM cuotas_clubes WHERE miembro_id IS NULL AND (miembro_nombre LIKE '%Test%' OR nombre LIKE '%Test%');
