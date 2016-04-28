/*
  Mikrom
  Hugo Wiledal
  
  Enables quick and versatile js-component initialization.
  For situations when you only need control, not bulk.
  
  MIT Licensed
*/

!function() {
  
  var mikrom = {
    _version: "2.0.1",
    _registeredComponents: {},
    _listeners: {},
    
    _getAttributes: function(element) {
      var attr = {};
      for (var i = 0; i < element.attributes.length; i++) {
        attr[mikrom._dashToCamelCase(element.attributes[i].nodeName)] = element.attributes[i].nodeValue;
      }
      return attr;
    },
    _dashToCamelCase: function(string) {
      return string.replace(/-([a-z])/gi, function (g) { return g[1].toUpperCase(); });
    },
    
    component: function() {
      var selector = arguments[0];
      var extensions = (typeof arguments[1] == "string" || typeof arguments[1] == "object") ? arguments[1] : [];
      var fn = (typeof arguments[1] == "function" ? arguments[1] : arguments[2]);
      
      var extensions = typeof extensions == "string" ? [extensions] : extensions;
      
      mikrom._registeredComponents[selector] = {
        fn: fn,
        extends: extensions
      }
    },
    init: function(container) { 
      var container = container || document;
      
      for (var selector in mikrom._registeredComponents) {
        var elements = container.querySelectorAll(selector);
        
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          var attr = mikrom._getAttributes(element);
          if (!element.__mikromData) {
            element.__mikromData = {
              destroyed: false,
              initializedComponents: {}
            };
          }
          mikrom.apply(selector, element, attr);
        }
      }
      
      mikrom.trigger("init", container);
    },
    apply: function(selector, element, attr) {
      if (element.__mikromData.initializedComponents[selector]) return;
      var component = mikrom._registeredComponents[selector];
      for (var i = 0; i < component.extends.length; i++) {
        mikrom.apply(component.extends[i], element, attr);
      }
      element.__mikromData.initializedComponents[selector] = true;
      component.fn.call(window, element, attr);
    },
    destroy: function(container) {
      var container = container || document;
      
      for (var selector in mikrom._registeredComponents) {
        var elements = container.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          if (!element.__mikromData.destroyed) {
            var event = document.createEvent("Event");
            event.initEvent("mikrom.destroy", true, true);
            element.dispatchEvent(event);
            element.__mikromData.initializedComponents = {};
          }
        }
      }
    },
    on: function(listener, fn) {
      if (!mikrom._listeners[listener]) mikrom._listeners[listener] = [];
      mikrom._listeners[listener].push(fn);
    },
    trigger: function(listener, data) {
      var listeners = mikrom._listeners[listener]
      if (listeners) {
        for (var i = 0; i < listeners.length; i++) {
          listeners[i](data);
        }
      };
    }
  }
  
  window.mikrom = mikrom;
}();