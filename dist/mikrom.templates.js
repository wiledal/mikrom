/*
  Mikrom Templates v0.1.1
  Hugo Wiledal
  
  Enables quick and versatile js-component initialization.
  For situations when you only need control, not bulk.
  
  MIT Licensed
*/
!function() {
  var mikromTemplates = {
    _templates: {},
    
    init: function() {
      var templates = document.querySelectorAll("script[type='text/mikromtemplate']");
      
      for (var i = 0; i < templates.length; i++) {
        var template = templates[i];
        var forSelector = template.getAttribute("for");
        mikromTemplates.create(forSelector, template);
      }
    },
    
    initTemplates: function(container) {
      for (var componentSelector in mikrom._registeredComponents) {
        var template = mikromTemplates._templates[componentSelector];
        if (template) {
          var components = container.querySelectorAll(componentSelector);
          for (var i = 0; i < components.length; i++) {
            var component = components[i];
            var markup = template(component.templateVars);
            component.innerHTML = markup;
            mikrom.init(component);
          };
        }
      }
    },
    
    create: function(name, element) {
      if (mikromTemplates._templates[name]) return mikromTemplates._templates[name];

      var str = element.textContent;
      var returnFunc = new Function("vars",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +
        "p.push('" +
        str
          .trim()
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
      + "');return p.join('');");

      mikromTemplates._templates[name] = returnFunc;
      return mikromTemplates._templates[name];
    }
  }
  
  
  if (window.mikrom) {
    window.mikrom.templates = mikromTemplates;
    mikromTemplates.init();
    window.mikrom.on("init", mikromTemplates.initTemplates);
  }
}();