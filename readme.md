# Mikrom
> Dead simple js-components for next to nothing.  
> Supports IE9+, Chrome, Firefox, Safari

### What is this?
Sometimes all you need are some damn self-initiating components that run instantly, without using a heavy parent-library that kills performance and has a learning curve spanning months.  
  
_Mikrom_ is a tiny (like seriously tiny) library for the people who jumped off the React/Angular hype-train and like full control over their applications.  
  
It's made to be super simple, but extremely versatile.  
No _$scopes_, no _templates_, just elements and javascript.  
  
Inspired by the _directive_-approach of Angular 1.x.x and WebComponents.

### Features
  - Tiny framework; tiny footprint
  - Reusable components; write once and save for later use
  - Supports modern browsers

### Usage
#### Basic initiation
Mikrom components are basically functions tied to selectors.

```html
<div class="special-button" some-attribute="I am an attribute">
  Click me!
</div>
```

```javascript
mikrom.component(".special-button", function(el, attr) {
  function onClick() {
    console.log(attr.someAttribute);
  }
  
  el.addEventListener("click", onClick);
});

mikrom.init();
```

#### Extending
Mikrom components can extend each other, so that the functionality of one can be used within another.

```javascript
mikrom.component(".special-button-that-also-hovers", [".special-button"], function(el, attr) {
  function hovered() {
    el.style.background = "red";
  }
  
  el.addEventListener("mouseover", hovered);
});
```

### Method overview
```javascript
mikrom.component(selector:String[, extends:String|Array], callback:Function);
```
Register a component with _Mikrom_.


```javascript
mikrom.init([container:Element = document]);
```
Initialize components.  
Optionally you can supply an element to limit the search, which is ideal for pages with dynamic content and modules.
  
  
```javascript
mikrom.destroy([container:Element = document]);
```
Triggers the `mikrom:destroy`-event on all mikrom-components.
Optionally you can supply an element to limit the search.

### Examples
For examples on how to use _Mikrom_, please check out the `examples` folder.

### License
MIT