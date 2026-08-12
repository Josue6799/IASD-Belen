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

  // LMS
  'lms_examenes': 'lmsAdmin2026!',
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
  'lms_examenes': 'LMS – Crear/Editar Exámenes',
  'lms_resultados': 'LMS – Gestionar Resultados'
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
  modal.onclick = function(e) {
    if (e.target === modal) {
      cerrarModalContrasena();
    }
  };

  modal.innerHTML = `
    <div class="modal-seguridad-card" onclick="event.stopPropagation()">
      <button type="button" class="modal-seguridad-close" onclick="cerrarModalContrasena()" title="Cerrar">&times;</button>
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
        <button type="button" id="btnSeguridadDesbloquear" class="btn-seguridad-desbloquear" onclick="procesarVerificacionContrasena()">
          <i class="fas fa-unlock"></i> Desbloquear
        </button>
        <button type="button" id="btnSeguridadCancelar" class="btn-seguridad-cancelar" onclick="cerrarModalContrasena()">
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
      inputPass.addEventListener('keydown', function(e) {
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
document.addEventListener('keydown', function(e) {
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

/*
 * ============================================================
 * LISTADO DE CONTRASEÑAS DEL SISTEMA ADMINISTRADOR
 * ============================================================
 * 🔴 Cuotas de Aventureros        = "aventurasCuotas2026!"   (Muy Alta)
 * 🔴 Cuotas de Conquistadores     = "conquiCuotas2026!"      (Muy Alta)
 * 🔴 Cuotas de Guías Mayores      = "guiasCuotas2026!"       (Muy Alta)
 * 🔴 Base de Datos Aventureros    = "aventurasBD2026!"       (Muy Alta)
 * 🔴 Base de Datos Conquistadores = "conquiBD2026!"          (Muy Alta)
 * 🔴 Base de Datos Guías Mayores  = "guiasBD2026!"           (Muy Alta)
 * 🟡 Calendario Aventureros       = "aventurasCal2026!"      (Media)
 * 🟡 Calendario Conquistadores    = "conquiCal2026!"         (Media)
 * 🟡 Calendario Guías Mayores     = "guiasCal2026!"          (Media)
 * 🟡 Cronograma (Predicadores)    = "predicasFuertes2026!"   (Media)
 * 🟢 Encuestas                    = "encuestas2026!"         (Baja-Media)
 * 🟢 Transmisiones                = "directo2026!"           (Baja)
 * 🟢 Calendario General Iglesia   = "iglesiaCal2026!"        (Baja)
 * 🔴 Base de Datos Iglesia        = "iglesiaBD2026!"         (Muy Alta)
 * 🟡 Interesados                  = "interesados2026!"       (Media)
 * 🟡 Biblioteca (Admin)           = "bibliotecaAdmin2026!"   (Media)
 * 🟡 Ver Pedidos de Biblioteca    = "pedidosBiblioteca2026!" (Media)
 * 🟢 Anuncios                     = "anuncios2026!"          (Baja)
 * 🟡 LMS Crear/Editar Exámenes    = "lmsAdmin2026!"          (Media)
 * 🟡 LMS Gestionar Resultados     = "lmsNotas2026!"          (Media)
 * ============================================================
 */
