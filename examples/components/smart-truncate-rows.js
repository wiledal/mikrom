mikrom.component("[smart-truncate-rows]", function(el, attr) {
  // Get original text
  var originalText = el.innerText;
  var adjustedText = el.innerText;
  var maxRowCount = parseInt(attr.smartTrunateRows);
  
  function truncate() {
    // Get the computed style of the element
    var style = getComputedStyle(el);
    
    // Get the height of the element
    var height = el.offsetHeight;
    var lineHeight = parseInt(style.getPropertyValue("line-height"));
    
    // If the height divided by the lineHeight is more than the allowed 
    // rows, remove words until it's not.
    var rows = height / lineHeight;
    
    if (rows > maxRowCount) {
      adjustedText = removeLastWord(adjustedText);
      el.innerText = adjustedText + "...";
      truncate(); // recursive
    }
  }
  
  function removeLastWord(str) {
    // Find the last space, substring it.
    return str.substring(0, str.lastIndexOf(" "));
  }
  
  function resize() {
    // On resize, set it back to the original, start over.
    adjustedText = originalText;
    el.innerText = originalText;
    truncate();
  }
  
  el.addEventListener("mikrom.destroy", destroy);
  
  function destroy() {
    window.removeEventListener("resize", resize); 
    el.removeEventListener("mikrom.destroy", destroy);
  }
  
  window.addEventListener("resize", resize);

  truncate();
});