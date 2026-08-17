/**
 * SCRIPT DE MIGRACIÓN: localStorage -> Supabase
 * Lee todos los datos existentes en el navegador y los inserta/actualiza en Supabase.
 */

async function migrarLocalStorageASupabase() {
  const client = window.supabaseClient;
  if (!client) {
    console.error('❌ Cliente Supabase no disponible. Asegúrate de cargar js/supabase-client.js');
    alert('Error: Cliente Supabase no inicializado.');
    return;
  }

  console.log('🚀 Iniciando proceso de migración de localStorage a Supabase...');

  const helperParse = (key) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn(`Error parseando ${key}:`, e);
      return null;
    }
  };

  let report = [];

  // 1. Identidades de Alumnos LMS
  const alumnos = helperParse('lms_alumnos_identidades') || [];
  if (alumnos.length > 0) {
    const { error } = await client
      .from('alumnos_identidades')
      .upsert(alumnos.map(a => ({
        documento: String(a.documento).trim(),
        nombre: a.nombre,
        whatsapp: a.whatsapp || a.documento,
        grupo: a.grupo || 'General',
        pin: String(a.pin)
      })), { onConflict: 'documento' });
    if (error) console.error('❌ Error migrando alumnos:', error);
    else report.push(`✅ ${alumnos.length} Alumnos LMS migrados`);
  }

  // 2. Exámenes LMS
  const examenes = helperParse('db_examenes') || [];
  if (examenes.length > 0) {
    const { error } = await client
      .from('examenes')
      .upsert(examenes.map(e => ({
        id_curso: e.id_curso || e.cursoId || 'general',
        titulo: e.titulo,
        descripcion: e.descripcion || '',
        duracion_min: e.duracion || 30,
        preguntas: e.preguntas || []
      })));
    if (error) console.error('❌ Error migrando exámenes:', error);
    else report.push(`✅ ${examenes.length} Exámenes LMS migrados`);
  }

  // 3. Exámenes Rendidos / Respuestas
  const respuestas = helperParse('examenesRealizados') || [];
  if (respuestas.length > 0) {
    const { error } = await client
      .from('respuestas_examenes')
      .insert(respuestas.map(r => ({
        examen_id: String(r.examId || r.examen_id || '1'),
        alumno_documento: String(r.alumnoDoc || r.documento || 'desconocido'),
        alumno_nombre: r.alumnoNombre || '',
        calificacion: r.calificacion || 0,
        respuestas: r.respuestas || {},
        intento: r.intento || 1,
        estado: r.estado || 'aprobado',
        fecha_rendido: r.fecha || new Date().toISOString()
      })));
    if (error) console.error('❌ Error migrando respuestas exámenes:', error);
    else report.push(`✅ ${respuestas.length} Respuestas de Exámenes migradas`);
  }

  // 4. Eventos de la Iglesia
  const eventosIglesia = helperParse('eventosIglesia') || [];
  if (eventosIglesia.length > 0) {
    const { error } = await client
      .from('eventos_iglesia')
      .insert(eventosIglesia.map(ev => ({
        titulo: ev.titulo || ev.nombre,
        descripcion: ev.descripcion || '',
        fecha: ev.fecha,
        hora: ev.hora || '09:00',
        lugar: ev.lugar || 'Iglesia IASD Belén',
        categoria: ev.categoria || 'General'
      })));
    if (error) console.error('❌ Error migrando eventos de iglesia:', error);
    else report.push(`✅ ${eventosIglesia.length} Eventos de Iglesia migrados`);
  }

  // 5. Integrantes de Clubes
  const clubes = [
    { keyBD: 'bd_aventureros', tipo: 'aventureros' },
    { keyBD: 'bd_conquistadores', tipo: 'conquistadores' },
    { keyBD: 'bd_guias_mayores', tipo: 'guias_mayores' }
  ];

  for (const c of clubes) {
    const miembros = helperParse(c.keyBD) || [];
    if (miembros.length > 0) {
      const { error } = await client
        .from('miembros_clubes')
        .insert(miembros.map(m => ({
          club_tipo: c.tipo,
          nombre: m.nombre,
          apellido: m.apellido || '',
          fecha_nacimiento: m.fechaNacimiento || m.fecha_nacimiento || null,
          tutor_nombre: m.tutor || m.tutor_nombre || '',
          celular: m.celular || m.telefono || '',
          unidad: m.unidad || '',
          cargo: m.cargo || 'Miembro'
        })));
      if (error) console.error(`❌ Error migrando miembros ${c.tipo}:`, error);
      else report.push(`✅ ${miembros.length} Miembros de ${c.tipo} migrados`);
    }
  }

  // 6. Libros de Biblioteca
  const libros = helperParse('libros_biblioteca') || [];
  if (libros.length > 0) {
    const { error } = await client
      .from('libros')
      .insert(libros.map(l => ({
        titulo: l.titulo,
        autor: l.autor || 'Desconocido',
        categoria: l.categoria || 'General',
        disponible: l.disponible !== false,
        portada_url: l.portada || l.portada_url || '',
        descripcion: l.descripcion || ''
      })));
    if (error) console.error('❌ Error migrando libros:', error);
    else report.push(`✅ ${libros.length} Libros de Biblioteca migrados`);
  }

  // 7. Interesados
  const interesados = helperParse('interesados') || [];
  if (interesados.length > 0) {
    const { error } = await client
      .from('interesados')
      .insert(interesados.map(i => ({
        nombre: i.nombre,
        telefono: i.telefono || i.celular || '',
        direccion: i.direccion || '',
        estudio_interes: i.estudio || i.interes || 'Estudio Bíblico',
        estado: i.estado || 'nuevo',
        notas: i.notas || ''
      })));
    if (error) console.error('❌ Error migrando interesados:', error);
    else report.push(`✅ ${interesados.length} Interesados migrados`);
  }

  console.log('🎉 Migración completada:', report);
  alert('Migración a Supabase completada:\n\n' + (report.join('\n') || 'No se encontraron datos previos en localStorage para migrar.'));
}

window.migrarLocalStorageASupabase = migrarLocalStorageASupabase;
