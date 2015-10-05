/*
  Mikrom v1.1.0
  Hugo Wiledal
  
  Enables quick and versatile js-component initialization.
  For situations when you only need control, not bulk.
  
  MIT Licensed
*/

!function() {
  
  var mikrom = {
    _version: "1.0.0",
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
      var fn = (typeof arguments[1] == "function" ? arguments[1] : arguments[2]);
      
      mikrom._registeredComponents[selector] = {
        fn: fn
      }
    },
    init: function(container) { 
      var container = container || document;
      
      for (var selector in mikrom._registeredComponents) {
        var elements = container.querySelectorAll(selector);
        var component = mikrom._registeredComponents[selector];
        
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          var attr = mikrom._getAttributes(element);
          if (!element.__mikromData) {
            element.__mikromData = {
              destroyed: false,
              initializedComponents: {}
            };
          }
          if (!element.__mikromData.initializedComponents[selector]) {
            element.__mikromData.initializedComponents[selector] = true;
            component.fn.call(element, attr);
          }
        }
      }
      
      mikrom.trigger("init", container);
    },
    destroy: function(container) {
      var container = container || document;
      
      for (var selector in mikrom._registeredComponents) {
        var elements = container.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          if (!element.__mikromData.destroyed) {
            var event = document.createEvent("Event");
            event.initEvent("mikrom:destroy", true, true);
            element.dispatchEvent(event);
            element.__mikromData.initializedComponents = {};
          }
        }
      }
    },
    addEventListener: function(listener, fn) {
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