/**
 * IASD Belén - Módulo de Gestión de Consentimiento de Cookies y Google Analytics 4
 * Cumplimiento de la Ley 1581 de 2012 (Colombia) y Google Consent Mode v2
 */
(function () {
  'use strict';

  // Helper seguro para llamar a gtag
  function safeGtag() {
    if (typeof window.gtag === 'function') {
      window.gtag.apply(window, arguments);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(arguments);
    }
  }

  // 1. Abrir panel de preferencias de cookies
  function abrirConfiguracionCookies(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    const modal = document.getElementById('cookie-config-modal');
    if (!modal) {
      console.error('❌ [Cookies] Elemento #cookie-config-modal no encontrado en el DOM.');
      return;
    }

    // Garantizar que el modal resida directamente en document.body para máxima visibilidad
    if (modal.parentElement !== document.body) {
      document.body.appendChild(modal);
    }

    // Sincronizar el toggle de analíticas con las preferencias actuales guardadas
    const analyticsCheckbox = document.getElementById('cookieConsentAnalytics');
    if (analyticsCheckbox) {
      try {
        const preferencia = localStorage.getItem('cookies_aceptadas');
        const analyticsFlag = localStorage.getItem('cookies_analytics');
        // Si el usuario ya aceptó todas o activó analíticas
        analyticsCheckbox.checked = (preferencia === 'todas' || analyticsFlag === 'true');
      } catch (err) {
        analyticsCheckbox.checked = false;
      }
    }

    // Mostrar el modal sin bloquear el scroll del body
    modal.classList.add('open', 'active');
    modal.style.setProperty('display', 'flex', 'important');
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
    modal.style.pointerEvents = 'auto';

    console.log('⚙️ [Cookies] Panel de preferencias de cookies abierto.');
  }

  // 2. Cerrar panel de configuración sin alterar el scroll
  function cerrarConfiguracionCookies(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }
    const modal = document.getElementById('cookie-config-modal');
    if (modal) {
      modal.classList.remove('open', 'active');
      modal.style.setProperty('display', 'none', 'important');
      modal.style.opacity = '0';
      modal.style.visibility = 'hidden';
    }
    console.log('🚪 [Cookies] Panel de preferencias cerrado.');
  }

  // 3. Aceptar todas las cookies (Técnicas + Analytics)
  function aceptarTodasCookies(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    safeGtag('consent', 'update', {
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'analytics_storage': 'granted'
    });

    try {
      localStorage.setItem('cookies_aceptadas', 'todas');
      localStorage.setItem('cookies_analytics', 'true');
    } catch (err) {
      console.warn('[Cookies] No se pudo escribir en localStorage:', err);
    }

    // Sincronizar el checkbox si está en pantalla
    const analyticsCheckbox = document.getElementById('cookieConsentAnalytics');
    if (analyticsCheckbox) {
      analyticsCheckbox.checked = true;
    }

    ocultarBannerCookies();
    cerrarConfiguracionCookies();
    console.log('✅ [Cookies] Consentimiento total concedido (Consent Mode: granted).');
  }

  // 4. Rechazar cookies no esenciales (solo técnicas)
  function rechazarCookiesNoEsenciales(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    safeGtag('consent', 'update', {
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'analytics_storage': 'denied'
    });

    try {
      localStorage.setItem('cookies_aceptadas', 'no_esenciales');
      localStorage.setItem('cookies_analytics', 'false');
    } catch (err) {
      console.warn('[Cookies] No se pudo escribir en localStorage:', err);
    }

    // Sincronizar el checkbox si está en pantalla
    const analyticsCheckbox = document.getElementById('cookieConsentAnalytics');
    if (analyticsCheckbox) {
      analyticsCheckbox.checked = false;
    }

    ocultarBannerCookies();
    cerrarConfiguracionCookies();
    console.log('🛑 [Cookies] Cookies no esenciales rechazadas (Consent Mode: denied).');
  }

  // 5. Guardar preferencias personalizadas según los toggles del modal
  function guardarPreferenciasCookies(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    const analyticsCheckbox = document.getElementById('cookieConsentAnalytics');
    const isAnalyticsAllowed = analyticsCheckbox ? analyticsCheckbox.checked : false;

    if (isAnalyticsAllowed) {
      safeGtag('consent', 'update', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
      });
      try {
        localStorage.setItem('cookies_aceptadas', 'personalizada');
        localStorage.setItem('cookies_analytics', 'true');
      } catch (err) {}
      console.log('✅ [Cookies] Preferencias guardadas: Analíticas PERMITIDAS (granted).');
    } else {
      safeGtag('consent', 'update', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied'
      });
      try {
        localStorage.setItem('cookies_aceptadas', 'no_esenciales');
        localStorage.setItem('cookies_analytics', 'false');
      } catch (err) {}
      console.log('🛑 [Cookies] Preferencias guardadas: Analíticas RECHAZADAS (denied).');
    }

    ocultarBannerCookies();
    cerrarConfiguracionCookies();
  }

  function ocultarBannerCookies() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.style.display = 'none';
    }
  }

  function mostrarBannerCookies() {
    const banner = document.getElementById('cookie-banner');
    if (banner) {
      if (banner.parentElement !== document.body) {
        document.body.appendChild(banner);
      }
      banner.style.display = 'block';
    }
  }

  // 6. Vincular botones y toggles usando querySelectorAll (NO querySelector) para evitar errores .forEach is not a function
  function bindConfigButtons() {
    // Seleccionar TODOS los botones y enlaces que abren la configuración
    const configButtons = document.querySelectorAll(
      '[data-csp-click*="abrirConfiguracionCookies"], .footer-legal-btn, .cookie-btn-config, .btn-configurar-cookies, #btnAbrirPreferenciasCookies'
    );
    configButtons.forEach(function (btn) {
      if (btn.dataset.cookieBound) return;
      btn.dataset.cookieBound = 'true';
      btn.addEventListener('click', function (e) {
        if (btn.tagName === 'A') {
          e.preventDefault();
        }
        abrirConfiguracionCookies(e);
      });
    });

    // Seleccionar y vincular TODOS los toggles/checkboxes con su evento change
    const toggles = document.querySelectorAll('#cookieConsentAnalytics, input[name="cookie-analytics"]');
    toggles.forEach(function (toggle) {
      if (toggle.dataset.changeBound) return;
      toggle.dataset.changeBound = 'true';
      toggle.addEventListener('change', function () {
        console.log('🔄 [Cookies] Toggle de cookies analíticas cambió a:', this.checked);
      });
    });

    // Vincular botones dentro del modal de configuración y del banner
    const saveButtons = document.querySelectorAll('[data-csp-click*="guardarPreferenciasCookies"], .btn-cookie-primary');
    saveButtons.forEach(function (btn) {
      if (btn.dataset.saveBound) return;
      btn.dataset.saveBound = 'true';
      btn.addEventListener('click', function (e) {
        guardarPreferenciasCookies(e);
      });
    });

    const acceptButtons = document.querySelectorAll(
      '[data-csp-click*="aceptarTodasCookies"], .cookie-btn-accept, .btn-cookie-accent'
    );
    acceptButtons.forEach(function (btn) {
      if (btn.dataset.acceptBound) return;
      btn.dataset.acceptBound = 'true';
      btn.addEventListener('click', function (e) {
        aceptarTodasCookies(e);
      });
    });

    const rejectButtons = document.querySelectorAll(
      '[data-csp-click*="rechazarCookiesNoEsenciales"], [data-csp-click*="rechazarTodasCookies"], .cookie-btn-reject, .btn-cookie-secondary'
    );
    rejectButtons.forEach(function (btn) {
      if (btn.dataset.rejectBound) return;
      btn.dataset.rejectBound = 'true';
      btn.addEventListener('click', function (e) {
        rechazarCookiesNoEsenciales(e);
      });
    });

    const closeButtons = document.querySelectorAll('[data-csp-click*="cerrarConfiguracionCookies"], .cookie-config-close');
    closeButtons.forEach(function (btn) {
      if (btn.dataset.closeBound) return;
      btn.dataset.closeBound = 'true';
      btn.addEventListener('click', function (e) {
        cerrarConfiguracionCookies(e);
      });
    });
  }

  // 7. Delegación de eventos a nivel de document como salvaguarda absoluta
  document.addEventListener('click', function (e) {
    // A. Si se hizo clic en un botón o enlace de abrir configuración de cookies
    const configTrigger = e.target.closest(
      '[data-csp-click*="abrirConfiguracionCookies"], [data-csp-click*="abrirPreferenciasCookies"], [data-csp-click*="abrirPanelPreferenciasCookies"], .footer-legal-btn, .cookie-btn-config, .btn-configurar-cookies, #btnAbrirPreferenciasCookies'
    );
    if (configTrigger) {
      if (configTrigger.tagName === 'A') {
        e.preventDefault();
      }
      abrirConfiguracionCookies(e);
      return;
    }

    // B. Detección por texto por si el botón carece de selector específico
    const anyBtn = e.target.closest('button, a');
    if (anyBtn && !anyBtn.closest('#cookie-config-modal')) {
      const text = (anyBtn.textContent || '').trim().toLowerCase();
      if (
        text.includes('abrir panel de preferencias') ||
        text.includes('configurar cookies') ||
        text.includes('preferencias de cookies') ||
        text.includes('modificar mis preferencias')
      ) {
        if (anyBtn.tagName === 'A') {
          e.preventDefault();
        }
        abrirConfiguracionCookies(e);
        return;
      }
    }

    // C. Botones de acción dentro del modal y banner
    const saveTrigger = e.target.closest('[data-csp-click*="guardarPreferenciasCookies"], .btn-cookie-primary');
    if (saveTrigger) {
      guardarPreferenciasCookies(e);
      return;
    }

    const acceptTrigger = e.target.closest(
      '[data-csp-click*="aceptarTodasCookies"], .cookie-btn-accept, .btn-cookie-accent'
    );
    if (acceptTrigger) {
      aceptarTodasCookies(e);
      return;
    }

    const rejectTrigger = e.target.closest(
      '[data-csp-click*="rechazarCookiesNoEsenciales"], [data-csp-click*="rechazarTodasCookies"], .cookie-btn-reject, .btn-cookie-secondary'
    );
    if (rejectTrigger) {
      rechazarCookiesNoEsenciales(e);
      return;
    }

    const closeTrigger = e.target.closest('[data-csp-click*="cerrarConfiguracionCookies"], .cookie-config-close');
    if (closeTrigger) {
      cerrarConfiguracionCookies(e);
      return;
    }

    // D. Cerrar al hacer clic en el backdrop oscuro del modal
    const modal = document.getElementById('cookie-config-modal');
    if (modal && e.target === modal) {
      cerrarConfiguracionCookies(e);
    }
  });

  // Delegación de evento change a nivel de document para los toggles de categorías
  document.addEventListener('change', function (e) {
    if (e.target && (e.target.id === 'cookieConsentAnalytics' || e.target.name === 'cookie-analytics')) {
      console.log('🔄 [Cookies] Evento change en toggle de analíticas detectado. Nuevo estado:', e.target.checked);
    }
  });

  // Cerrar modal con tecla Escape
  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      const modal = document.getElementById('cookie-config-modal');
      if (modal && modal.style.display !== 'none') {
        cerrarConfiguracionCookies(e);
      }
    }
  });

  // Exponer a window para compatibilidad directa con data-csp-click y tests
  window.abrirConfiguracionCookies = abrirConfiguracionCookies;
  window.abrirPreferenciasCookies = abrirConfiguracionCookies;
  window.abrirPanelPreferenciasCookies = abrirConfiguracionCookies;
  window.cerrarConfiguracionCookies = cerrarConfiguracionCookies;
  window.guardarPreferenciasCookies = guardarPreferenciasCookies;
  window.aceptarTodasCookies = aceptarTodasCookies;
  window.rechazarCookiesNoEsenciales = rechazarCookiesNoEsenciales;
  window.rechazarTodasCookies = rechazarCookiesNoEsenciales;

  // 8. Inicialización de Consent Mode según preferencias previas
  function initCookies() {
    try {
      const preferencia = localStorage.getItem('cookies_aceptadas');
      const analyticsFlag = localStorage.getItem('cookies_analytics');

      if (!preferencia) {
        // Primera visita: Mostrar banner de cookies
        mostrarBannerCookies();
      } else if (preferencia === 'todas' || analyticsFlag === 'true') {
        // Usuario ya había aceptado previamente: restaurar estado granted
        safeGtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted',
          'analytics_storage': 'granted'
        });
      } else {
        // Usuario rechazó: mantener denied
        safeGtag('consent', 'update', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied'
        });
      }
    } catch (e) {
      mostrarBannerCookies();
    }

    // Vincular botones en la carga inicial
    bindConfigButtons();

    // Re-vincular botones cuando cambie la página en el SPA (router.js)
    window.addEventListener('pageChanged', function (e) {
      setTimeout(bindConfigButtons, 50);

      // Ajustar título dinámico según la página legal abierta
      if (e && e.detail && e.detail.pageId) {
        if (e.detail.pageId === 'politica-privacidad') {
          document.title = 'Política de Privacidad · IASD Belén';
        } else if (e.detail.pageId === 'politica-cookies') {
          document.title = 'Política de Cookies · IASD Belén';
        }
      }
    });

    // Gestión de rutas por hash en la URL
    function checkHashRoute() {
      const hash = window.location.hash;
      if (hash === '#politica-privacidad' || hash === '#politica-cookies') {
        const pageId = hash.substring(1);
        if (typeof window.showPage === 'function') {
          window.showPage(pageId);
        }
      }
    }

    checkHashRoute();
    window.addEventListener('hashchange', checkHashRoute);

    // Delegación para enlaces con hash hacia las políticas legales
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href="#politica-privacidad"], a[href="#politica-cookies"]');
      if (link) {
        const hash = link.getAttribute('href');
        const pageId = hash.substring(1);
        if (typeof window.showPage === 'function') {
          e.preventDefault();
          window.showPage(pageId);
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCookies);
  } else {
    initCookies();
  }

  console.log('🍪 [Cookies] Sistema de Consent Mode de GA4 y Preferencias listo.');
})();
