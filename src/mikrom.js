/*
  Mikrom v1.0
  Author: Hugo Wiledal
  
  Enables quick and versatile js-component initialization.
  For situations when you only need control, not bulk.
*/

!function() {
  
  var mikrom = {
    _registeredComponents: {},
    component: function(selector, fn) {
      mikrom._registeredComponents[selector] = fn;
    },
    _getAttributes: function(element) {
      var attr = {};
      for (var i = 0; i < element.attributes.length; i++) {
        attr[element.attributes[i].nodeName] = element.attributes[i].nodeValue;
      }
      return attr;
    },
    init: function() { 
      for (var selector in mikrom._registeredComponents) {
        var elements = document.querySelectorAll(selector);
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
            var event = new CustomEvent("mDestroy");
            element.dispatchEvent(event);
            element.__mikromData.initializedComponents = {};
          }
        }
      }
    }
  }
  
  window.mikrom = mikrom;
  
}();