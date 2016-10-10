'use strict';

;(function () {
  // shim for safari
  if (typeof HTMLElement !== 'function') {
    var _HTMLElement = function _HTMLElement() {};
    _HTMLElement.prototype = HTMLElement.prototype;
    HTMLElement = _HTMLElement;
  }

  var mikrom = {
    version: '3.0.0',
    _registered: {},
    _observer: null,

    bootstrap: function bootstrap() {
      mikrom._observer = new MutationObserver(mikrom.mutationCallback);
      mikrom._observer.observe(document, { childList: true, subtree: true, attributes: true });
      document.addEventListener('DOMContentLoaded', function () {
        mikrom.initiate(document);
      });
    },
    mutationCallback: function mutationCallback(mutations) {
      mikrom.initiate(document);

      mutations.forEach(function (m) {
        if (m.type === 'attributes' && m.target.attributeChangedCallback) m.target.attributeChangedCallback(m.attributeName, m.oldValue, m.target.getAttribute(m.attributeName));
        if (m.type === 'childList') {
          for (var i = 0; i < m.removedNodes.length; i++) {
            var t = m.removedNodes[i];
            if (t.detachedCallback && t.__componentAttached) t.detachedCallback();
            if (t.__componentPatched) t.__componentAttached = false;
          }
          for (var i = 0; i < m.addedNodes.length; i++) {
            var t = m.addedNodes[i];
            if (t.attachedCallback && !t.__componentAttached) t.attachedCallback();
            if (t.__componentPatched) t.__componentAttached = true;
          }
        }
      });
    },
    initiate: function initiate(container) {
      for (var selector in mikrom._registered) {
        var els = [].slice.call(container.querySelectorAll(selector));
        els.forEach(function (el) {
          if (el.__componentPatched) return;
          el.__componentPatched = true;
          el.__proto__ = mikrom._registered[selector].prototype;
          el.__componentAttached = true;

          if (el.createdCallback) el.createdCallback();
          if (el.attachedCallback) el.attachedCallback();
        });
      }
    },
    component: function component(selector, definition) {
      mikrom._registered[selector] = definition;
    }
  };

  window.mikrom = mikrom;
  mikrom.bootstrap();
})();