/*
  Mikrom v1.0.0
  Hugo Wiledal
  
  Enables quick and versatile js-component initialization.
  For situations when you only need control, not bulk.
  
  MIT Licensed
*/

!function() {
  
  var mikrom = {
    _version: "1.0.0",
    _registeredComponents: {},
    component: function(selector, fn) {
      mikrom._registeredComponents[selector] = fn;
    },
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
          if (!element.__mikromData.initializedComponents[selector]) {
            element.__mikromData.initializedComponents[selector] = true;
            mikrom._registeredComponents[selector].call(element, attr);
          }
        }
      }
    },
    destroy: function(container) {
      var container = container || document;
      
      for (var selector in mikrom._registeredComponents) {
        var elements = container.querySelectorAll(selector);
        for (var i = 0; i < elements.length; i++) {
          var element = elements[i];
          if (!element.__mikromData.detroyed) {
            var event = new CustomEvent("mikromDestroy");
            element.dispatchEvent(event);
            element.__mikromData.initializedComponents = {};
          }
        }
      }
    }
  }
  
  window.mikrom = mikrom;
  
}();