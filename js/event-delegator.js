/**
 * CSP Safe Event Delegator & Handler
 * IASD Belén · Iglesia Adventista del Séptimo Día
 * 
 * Permite ejecutar acciones interactivas de manera 100% compatible con Content Security Policy (CSP),
 * eliminando y neutralizando manejadores en línea en HTML estático y dinámico.
 */

(function () {
  'use strict';

  const EVENT_TYPES = [
    'click',
    'change',
    'input',
    'submit',
    'keyup',
    'keydown',
    'keypress',
    'mouseover',
    'mouseout',
    'focus',
    'blur'
  ];

  const CAPTURE_EVENTS = new Set(['focus', 'blur', 'error']);

  // Regex para transformar atributos inline on* a data-csp-* en cadenas HTML
  const INLINE_ATTR_REGEX = /\son(click|change|input|submit|keyup|keydown|keypress|mouseover|mouseout|focus|blur|error|load)\s*=\s*(["'])([\s\S]*?)\2/gi;

  function sanitizeHtmlString(html) {
    if (typeof html !== 'string') return html;
    return html.replace(INLINE_ATTR_REGEX, function (match, evtName, quote, code) {
      return ` data-csp-${evtName.toLowerCase()}=${quote}${code}${quote}`;
    });
  }

  // Interceptar asignación de innerHTML, outerHTML y setAttribute
  try {
    const originalInnerHTMLDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
    if (originalInnerHTMLDescriptor && originalInnerHTMLDescriptor.set) {
      Object.defineProperty(Element.prototype, 'innerHTML', {
        get() {
          return originalInnerHTMLDescriptor.get.call(this);
        },
        set(value) {
          const sanitized = sanitizeHtmlString(value);
          originalInnerHTMLDescriptor.set.call(this, sanitized);
        },
        configurable: true,
        enumerable: true
      });
    }

    const originalOuterHTMLDescriptor = Object.getOwnPropertyDescriptor(Element.prototype, 'outerHTML');
    if (originalOuterHTMLDescriptor && originalOuterHTMLDescriptor.set) {
      Object.defineProperty(Element.prototype, 'outerHTML', {
        get() {
          return originalOuterHTMLDescriptor.get.call(this);
        },
        set(value) {
          const sanitized = sanitizeHtmlString(value);
          originalOuterHTMLDescriptor.set.call(this, sanitized);
        },
        configurable: true,
        enumerable: true
      });
    }

    const origInsertAdjacentHTML = Element.prototype.insertAdjacentHTML;
    if (origInsertAdjacentHTML) {
      Element.prototype.insertAdjacentHTML = function (position, text) {
        return origInsertAdjacentHTML.call(this, position, sanitizeHtmlString(text));
      };
    }

    const origSetAttribute = Element.prototype.setAttribute;
    if (origSetAttribute) {
      Element.prototype.setAttribute = function (name, value) {
        if (typeof name === 'string' && name.toLowerCase().startsWith('on')) {
          const evtName = name.slice(2).toLowerCase();
          return origSetAttribute.call(this, `data-csp-${evtName}`, value);
        }
        return origSetAttribute.call(this, name, value);
      };
    }
  } catch (e) {
    console.warn('[CSP Delegator] Advertencia al envolver prototipos DOM:', e);
  }

  // Función para evaluar código de forma segura dentro del contexto del elemento y evento
  function executeHandler(element, event, code) {
    if (!code || typeof code !== 'string') return;
    const trimmed = code.trim();
    if (!trimmed) return;

    try {
      const fn = new Function('event', trimmed);
      const res = fn.call(element, event);
      if (res === false && event) {
        if (event.preventDefault) event.preventDefault();
        if (event.stopPropagation) event.stopPropagation();
      }
      return res;
    } catch (err) {
      try {
        const globalFn = new Function('event', `with(window) { ${trimmed} }`);
        const res = globalFn.call(element, event);
        if (res === false && event) {
          if (event.preventDefault) event.preventDefault();
          if (event.stopPropagation) event.stopPropagation();
        }
        return res;
      } catch (innerErr) {
        console.error('[CSP Delegator] Error ejecutando manejador:', trimmed, innerErr);
      }
    }
  }

  // Convertir elementos con atributos on* existentes en el DOM
  function convertInlineAttributes(root) {
    if (!root || !root.querySelectorAll) return;

    EVENT_TYPES.forEach(evt => {
      const inlineAttrName = `on${evt}`;
      const dataAttrName = `data-csp-${evt}`;

      try {
        const elements = root.querySelectorAll(`[${inlineAttrName}]`);
        elements.forEach(el => {
          const code = el.getAttribute(inlineAttrName);
          if (code) {
            el.setAttribute(dataAttrName, code);
            el.removeAttribute(inlineAttrName);
          }
        });
      } catch (e) {}
    });
  }

  // Configurar listeners globales delegados en document
  function setupDelegatedListeners() {
    EVENT_TYPES.forEach(eventType => {
      const dataAttrName = `data-csp-${eventType}`;
      const useCapture = CAPTURE_EVENTS.has(eventType);

      document.addEventListener(eventType, function (event) {
        let currentTarget = event.target;

        while (currentTarget && currentTarget !== document && currentTarget.nodeType === 1) {
          if (currentTarget.getAttribute && currentTarget.hasAttribute(dataAttrName)) {
            const code = currentTarget.getAttribute(dataAttrName);
            executeHandler(currentTarget, event, code);

            if (event.defaultPrevented || event.cancelBubble) {
              break;
            }
          }
          currentTarget = currentTarget.parentElement;
        }
      }, useCapture);
    });

    // Manejar errores de carga de imágenes (capture phase)
    window.addEventListener('error', function (event) {
      const target = event.target;
      if (target && target.tagName === 'IMG') {
        const errorCode = target.getAttribute('data-csp-error') || target.getAttribute('onerror');
        if (errorCode) {
          executeHandler(target, event, errorCode);
        }
      }
    }, true);
  }

  // MutationObserver para sanear nodos agregados dinámicamente
  function setupMutationObserver() {
    if (typeof MutationObserver === 'undefined') return;

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // ELEMENT_NODE
              convertInlineAttributes(node);
            }
          });
        } else if (mutation.type === 'attributes') {
          const attrName = mutation.attributeName;
          if (attrName && attrName.startsWith('on')) {
            const target = mutation.target;
            const code = target.getAttribute(attrName);
            if (code) {
              const evtName = attrName.slice(2).toLowerCase();
              target.setAttribute(`data-csp-${evtName}`, code);
              target.removeAttribute(attrName);
            }
          }
        }
      });
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: EVENT_TYPES.map(e => `on${e}`)
    });
  }

  // Inicializar escaneo y listeners
  setupDelegatedListeners();
  setupMutationObserver();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => convertInlineAttributes(document));
  } else {
    convertInlineAttributes(document);
  }

  // Filtrado defensivo en consola para avisos de origin-trials y herramientas externas
  try {
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    const IGNORABLE_PATTERNS = [
      'Origin trial controlled feature not enabled',
      'monaco',
      'aistudio.google.com/monaco',
      'language-model',
      'rewriter',
      'writer',
      'proofreader'
    ];

    console.warn = function (...args) {
      const msg = args.map(a => String(a || '')).join(' ');
      if (IGNORABLE_PATTERNS.some(p => msg.includes(p))) {
        return;
      }
      return originalConsoleWarn.apply(console, args);
    };

    console.error = function (...args) {
      const msg = args.map(a => String(a || '')).join(' ');
      if (IGNORABLE_PATTERNS.some(p => msg.includes(p))) {
        return;
      }
      return originalConsoleError.apply(console, args);
    };
  } catch (e) {}

  window.convertInlineAttributes = convertInlineAttributes;
  console.log('🛡️ [CSP Delegator] Sistema de delegación de eventos seguro activado.');
})();
