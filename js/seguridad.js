/* ========================================
   SISTEMA DE SEGURIDAD POR SECCIÓN (ADMIN)
   IASD Belén · Iglesia Adventista
   ======================================== */

const CONTRASENAS_ADMIN = {
  // Clubes - Cuotas
  'cuotas_aventureros': 'aventurasCuotas2026!',
  'cuotas_conquistadores': 'conquiCuotas2026!',
  'cuotas_guias_mayores': 'guiasCuotas2026!',

  // Clubes - Base de Datos
  'bd_aventureros': 'aventurasBD2026!',
  'bd_conquistadores': 'conquiBD2026!',
  'bd_guias_mayores': 'guiasBD2026!',

  // Clubes - Calendario
  'calendario_aventureros': 'aventurasCal2026!',
  'calendario_conquistadores': 'conquiCal2026!',
  'calendario_guias_mayores': 'guiasCal2026!',

  // Iglesia & General
  'cronograma': 'predicasFuertes2026!',
  'encuestas': 'encuestas2026!',
  'transmisiones': 'directo2026!',
  'calendario_iglesia': 'iglesiaCal2026!',
  'bd_iglesia': 'iglesiaBD2026!',
  'interesados': 'interesados2026!',

  // Biblioteca
  'biblioteca_admin': 'bibliotecaAdmin2026!',
  'pedidos_biblioteca': 'pedidosBiblioteca2026!',

  // Anuncios
  'anuncios': 'anuncios2026!',

  // LMS - Plataforma Educativa
  'lms_crear_examen': 'lmsAdmin2026!',
  'lms_editar_examen': 'lmsAdmin2026!',
  'lms_editar_examenes': 'lmsAdmin2026!',
  'lms_gestion_pins': 'pinadmin2026!',
  'lms_plan_estudios': 'lmsAyuda2026!',
  'lms_gestionar_resultados': 'lmsNotas2026!',
  'lms_resultados': 'lmsNotas2026!'
};

const NOMBRES_SECCIONES_ADMIN = {
  'cuotas_aventureros': 'Cuotas de Aventureros',
  'cuotas_conquistadores': 'Cuotas de Conquistadores',
  'cuotas_guias_mayores': 'Cuotas de Guías Mayores',
  'bd_aventureros': 'Base de Datos de Aventureros',
  'bd_conquistadores': 'Base de Datos de Conquistadores',
  'bd_guias_mayores': 'Base de Datos de Guías Mayores',
  'calendario_aventureros': 'Calendario de Aventureros',
  'calendario_conquistadores': 'Calendario de Conquistadores',
  'calendario_guias_mayores': 'Calendario de Guías Mayores',
  'cronograma': 'Cronograma (Predicadores)',
  'encuestas': 'Encuestas',
  'transmisiones': 'Transmisiones',
  'calendario_iglesia': 'Calendario General de la Iglesia',
  'bd_iglesia': 'Base de Datos de la Iglesia',
  'interesados': 'Interesados',
  'biblioteca_admin': 'Biblioteca (Administración)',
  'pedidos_biblioteca': 'Ver Pedidos de Biblioteca',
  'anuncios': 'Anuncios',
  'lms_crear_examen': 'LMS – Crear Nuevo Examen',
  'lms_editar_examen': 'LMS – Editar Examen',
  'lms_editar_examenes': 'LMS – Editar / Eliminar Exámenes',
  'lms_gestion_pins': 'LMS – Gestión de PINs de Alumnos',
  'lms_plan_estudios': 'LMS – Plan de Estudios y Ayudas',
  'lms_gestionar_resultados': 'LMS – Gestionar Resultados',
  'lms_resultados': 'LMS – Resultados de Exámenes'
};

let _callbackModalSeguridad = null;
let _seccionModalSeguridad = null;

function verificarAccesoSeccion(nombreSeccion, callbackAbrir) {
  if (!nombreSeccion) {
    if (typeof callbackAbrir === 'function') callbackAbrir();
    return;
  }

  const claveStorage = 'desbloqueado_' + nombreSeccion;
  if (sessionStorage.getItem(claveStorage) === 'true') {
    if (typeof callbackAbrir === 'function') callbackAbrir();
  } else {
    mostrarModalContrasena(nombreSeccion, callbackAbrir);
  }
}

function mostrarModalContrasena(nombreSeccion, callback) {
  _seccionModalSeguridad = nombreSeccion;
  _callbackModalSeguridad = callback;

  let modal = document.getElementById('modalSeguridadAdmin');
  if (!modal) {
    modal = crearModalSeguridadElemento();
  }

  const nombreLegible = NOMBRES_SECCIONES_ADMIN[nombreSeccion] || nombreSeccion;
  const textoSubtitulo = document.getElementById('modalSeguridadSubtitulo');
  if (textoSubtitulo) {
    textoSubtitulo.innerHTML = `Ingresa la contraseña para acceder a <strong style="color: var(--golden, #c9a53b); font-weight: 700;">${nombreLegible}</strong>`;
  }

  const inputPass = document.getElementById('inputSeguridadPassword');
  const errorMsg = document.getElementById('errorSeguridadPassword');

  if (inputPass) {
    inputPass.value = '';
  }
  if (errorMsg) {
    errorMsg.style.display = 'none';
  }

  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  setTimeout(() => {
    if (inputPass) inputPass.focus();
  }, 100);
}

function cerrarModalContrasena() {
  const modal = document.getElementById('modalSeguridadAdmin');
  if (modal) {
    modal.style.display = 'none';
  }

  const inputPass = document.getElementById('inputSeguridadPassword');
  const errorMsg = document.getElementById('errorSeguridadPassword');
  if (inputPass) inputPass.value = '';
  if (errorMsg) errorMsg.style.display = 'none';

  _callbackModalSeguridad = null;
  _seccionModalSeguridad = null;

  // Restaurar overflow solo si no hay otros modales de nivel superior abiertos
  const algunModalAdminVisible = [
    document.getElementById('panelAdminGeneral'),
    document.getElementById('seccionCalendarioIglesia'),
    document.getElementById('seccionCalendarioClub'),
    document.getElementById('seccionCuotasClub'),
    document.getElementById('seccionBaseDatosClub')
  ].some(el => el && el.style.display !== 'none' && el.style.display !== '');

  if (!algunModalAdminVisible) {
    document.body.style.overflow = '';
  }
}

function procesarVerificacionContrasena() {
  if (!_seccionModalSeguridad) return;

  const inputPass = document.getElementById('inputSeguridadPassword');
  const errorMsg = document.getElementById('errorSeguridadPassword');
  if (!inputPass) return;

  const passwordIngresada = inputPass.value.trim();
  const passwordCorrecta = CONTRASENAS_ADMIN[_seccionModalSeguridad];

  if (passwordCorrecta && passwordIngresada === passwordCorrecta) {
    const claveStorage = 'desbloqueado_' + _seccionModalSeguridad;
    sessionStorage.setItem(claveStorage, 'true');

    const callback = _callbackModalSeguridad;
    cerrarModalContrasena();

    if (typeof callback === 'function') {
      callback();
    }
  } else {
    if (errorMsg) {
      errorMsg.style.display = 'block';
      errorMsg.innerHTML = '❌ Contraseña incorrecta. Inténtalo de nuevo.';
    }
    inputPass.value = '';
    inputPass.focus();

    const card = document.querySelector('#modalSeguridadAdmin .modal-seguridad-card');
    if (card) {
      card.style.animation = 'none';
      card.offsetHeight; // forzar reflow
      card.style.animation = 'shakeSeguridad 0.4s ease';
    }
  }
}

function crearModalSeguridadElemento() {
  const modal = document.createElement('div');
  modal.id = 'modalSeguridadAdmin';
  modal.className = 'modal-seguridad-overlay';
  modal.style.display = 'none';
  modal.onclick = function (e) {
    if (e.target === modal) {
      cerrarModalContrasena();
    }
  };

  modal.innerHTML = `
    <div class="modal-seguridad-card" data-csp-click="event.stopPropagation()">
      <button type="button" class="modal-seguridad-close" data-csp-click="cerrarModalContrasena()" title="Cerrar">&times;</button>
      <div class="modal-seguridad-icono">
        <i class="fas fa-lock"></i>
      </div>
      <h3 class="modal-seguridad-titulo">🔒 Acceso Restringido</h3>
      <p class="modal-seguridad-subtitulo" id="modalSeguridadSubtitulo">
        Ingresa la contraseña para acceder a la sección protegida
      </p>

      <div class="modal-seguridad-input-wrapper">
        <i class="fas fa-key icono-candado-input"></i>
        <input type="password" id="inputSeguridadPassword" placeholder="Contraseña..." autocomplete="off">
      </div>

      <div id="errorSeguridadPassword" class="modal-seguridad-error">
        ❌ Contraseña incorrecta. Inténtalo de nuevo.
      </div>

      <div class="modal-seguridad-botones">
        <button type="button" id="btnSeguridadDesbloquear" class="btn-seguridad-desbloquear" data-csp-click="procesarVerificacionContrasena()">
          <i class="fas fa-unlock"></i> Desbloquear
        </button>
        <button type="button" id="btnSeguridadCancelar" class="btn-seguridad-cancelar" data-csp-click="cerrarModalContrasena()">
          Cancelar
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Escuchar tecla Enter en el input de contraseña
  setTimeout(() => {
    const inputPass = document.getElementById('inputSeguridadPassword');
    if (inputPass) {
      inputPass.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          procesarVerificacionContrasena();
        }
      });
    }
  }, 50);

  return modal;
}

// Evento global Escape para cerrar modal de seguridad
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    const modal = document.getElementById('modalSeguridadAdmin');
    if (modal && modal.style.display !== 'none' && modal.style.display !== '') {
      cerrarModalContrasena();
    }
  }
});

// Exponer funciones globales
window.CONTRASENAS_ADMIN = CONTRASENAS_ADMIN;
window.verificarAccesoSeccion = verificarAccesoSeccion;
window.mostrarModalContrasena = mostrarModalContrasena;
window.cerrarModalContrasena = cerrarModalContrasena;

// Guardián global para funciones de prueba u onclick no definidas (ej. test_miembro_1)
if (typeof window.test_miembro_1 === 'undefined') {
  window.test_miembro_1 = function (e) {
    console.log('📌 Evento test_miembro_1 ejecutado');
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
  };
}

/*
 * ============================================================
 * LISTADO DE CONTRASEÑAS DEL SISTEMA ADMINISTRADOR
 * ============================================================
 * 👤 1. Usuarios y Roles del Login General (/js/app.js)
Miembro (Nivel 2) : belen2026
Club (Nivel 3) : clubbelen2026
Administrador (Nivel 4) : adminbelen2026

🛡️ 2. Panel de Administración y Secciones Protegidas (/js/seguridad.js)

🌟 Clubes (Aventureros, Conquistadores y Guías Mayores)
-Cuotas de Aventureros : aventurasCuotas2026!
-Cuotas de Conquistadores : conquiCuotas2026!
-Cuotas de Guías Mayores : guiasCuotas2026!
-Base de Datos de Aventureros : aventurasBD2026!
-Base de Datos de Conquistadores : conquiBD2026!
-Base de Datos de Guías Mayores : guiasBD2026!
-Calendario de Aventureros : aventurasCal2026!
-Calendario de Conquistadores : conquiCal2026!
-Calendario de Guías Mayores : guiasCal2026!

⛪ Iglesia y Gestión General
-Cronograma (Predicadores) : predicasFuertes2026!
-Calendario General de la Iglesia : iglesiaCal2026!
-Base de Datos de la Iglesia : iglesiaBD2026!
-Anuncios y Eventos : anuncios2026!
-Transmisiones En Vivo : directo2026!
-Encuestas : encuestas2026!
-Interesados : interesados2026!

📚 Biblioteca
-Biblioteca (Administración) : bibliotecaAdmin2026!
-Ver Pedidos de Biblioteca : pedidosBiblioteca2026!

📢 1. Sección: Anuncios
(Agregar eventos, Quitar eventos, Editar anuncios)
Contraseña: anuncios2026!

🗄️ 2. Sección: Base de Datos (Supabase)
(Configurar credenciales, Sincronizar datos locales, Estado de tablas)
Contraseña: iglesiaBD2026!

🎓 Plataforma Educativa (LMS)

-LMS – Crear Nuevo Examen : lmsAdmin2026!
-LMS – Editar / Eliminar Exámenes : lmsAdmin2026!
-LMS – Gestionar Resultados y Notas : lmsNotas2026!
-LMS – Plan de Estudios y Ayudas : lmsAyuda2026!
-LMS – Gestión de PINs de Alumnos : pinadmin2026!
 * ============================================================
 */
