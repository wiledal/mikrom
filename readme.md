# Mikrom
## Dead simple js-components for next to nothing.

### Usage
```javascript
/*
<div class=".selector" element-attribute="I am an attribute">Click me, if you dare</div>
*/

mikrom.component(".selector", function(attr)) {
  function onClick() {
    console.log(attr.elementAttribute); // prints "I am an attribute"
  }
  
  this.addEventListener("click", onClick);
});

mikrom.init();
```