;(function () {
  // Safari shim
  if (typeof HTMLElement !== 'function') {
    var _HTMLElement = function () {}
    _HTMLElement.prototype = HTMLElement.prototype
    HTMLElement = _HTMLElement
  }

  function callOnAllChildren (el, func) {
    func(el)
    if (el.children) {
      ;[].slice.call(el.children).forEach((el) => {
        callOnAllChildren(el, func)
      })
    }
  }

  var mikrom = {
    version: '4.1.0',
    _registered: {},
    _observer: null,

    bootstrap () {
      mikrom._observer = new MutationObserver(mikrom.mutationCallback)
      mikrom._observer.observe(document, { childList: true, subtree: true, attributes: true })
      document.addEventListener('DOMContentLoaded', () => {
        mikrom.initiate(document)
      })
    },

    mutationCallback (mutations) {
      mikrom.initiate(document)

      mutations.forEach((m) => {
        if (m.type === 'attributes' && m.target.attributeChangedCallback) m.target.attributeChangedCallback(m.attributeName, m.oldValue, m.target.getAttribute(m.attributeName))
        if (m.type === 'childList') {
          for (var i = 0; i < m.removedNodes.length; i++) {
            var t = m.removedNodes[i]

            callOnAllChildren(t, (el) => {
              if (el.disconnectedCallback && el.__componentAttached) el.disconnectedCallback()
              if (el.__componentPatched) el.__componentAttached = false
            })
          }
          for (var i = 0; i < m.addedNodes.length; i++) {
            var t = m.addedNodes[i]
            if (t.connectedCallback && !t.__componentAttached) t.connectedCallback()
            if (t.__componentPatched) t.__componentAttached = true
          }
        }
      })
    },

    initiate (container) {
      var registered = []
      for (var selector in mikrom._registered) {
        var els = [].slice.call(container.querySelectorAll(selector))
        els.forEach((el) => {
          if (!el.__componentPatched) el.__componentPatched = {}
          if (el.__componentPatched[selector]) return
          el.__componentPatched[selector] = true
          el.__proto__ = mikrom._registered[selector].prototype
          registered.push(el)
        })
      }
      registered.forEach((el) => {
        if (el.__componentAttached && el.__componentPatched) return
        el.__componentAttached = true

        if (el.connectedCallback) el.connectedCallback()
      })
    },
    component (selector, definition) {
      mikrom._registered[selector] = definition
    }
  }

  mikrom.bootstrap()

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = mikrom
  } else {
    window.mikrom = mikrom
  }
})()
