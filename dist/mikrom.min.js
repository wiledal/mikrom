/*
  Mikrom v1.0
  Author: Hugo Wiledal
  Enables quick and versatile component initialization when you only need something basic.
*/
!function(){var t={_registeredComponents:{},component:function(e,n){t._registeredComponents[e]=n},_getAttributes:function(t){for(var e={},n=0;n<t.attributes.length;n++)e[t.attributes[n].nodeName]=t.attributes[n].nodeValue;return e},init:function(){for(var e in t._registeredComponents)for(var n=document.querySelectorAll(e),o=0;o<n.length;o++){var r=n[o],i=t._getAttributes(r);r.__mikromData||(r.__mikromData={destroyed:!1,initializedComponents:{}}),r.__mikromData.initializedComponents[e]||(r.__mikromData.initializedComponents[e]=!0,t._registeredComponents[e].call(r,i))}},destroy:function(e){var e=e||document;for(var n in t._registeredComponents)for(var o=e.querySelectorAll(n),r=0;r<o.length;r++){var i=o[r];if(!i.__mikromData.detroyed){var a=new CustomEvent("mDestroy");i.dispatchEvent(a),i.__mikromData.initializedComponents={}}}}};window.mikrom=t}();