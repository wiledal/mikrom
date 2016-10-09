# Mikrom
> Dead simple js-components for next to nothing.  
> Supports IE9+, Chrome, Firefox, Safari

### What is this?
Sometimes all you need are some damn self-initiating components that run instantly, without using a heavy parent-library that kills performance and has a learning curve spanning months.  

_Mikrom_ is a tiny library for the people who jumped off the framework hype-train and like full control over their applications.  

It's made to be super simple and straight up flexible.
No _$scopes_, no _templates_, just elements and javascript.  

Inspired by the _directive_-approach of Angular 1.x.x and WebComponents.

### Features
  - Tiny framework; tiny footprint
  - Reusable components; write once and use in multiple projects
  - Modern browser support

### Usage
#### Basic initiation
Mikrom components are basically functions tied to selectors.

```html
<div class="special-button" some-attribute="I am an attribute">
  Click me!
</div>
```

```javascript
mikrom.component('.special-button', (el, attr) => {
  el.addEventListener('click', () => {
    alert(attr.someAttribute);
  });
});

mikrom.init();
```

#### Extending
Mikrom components can extend each other, so that the functionality of one can be used within another.  

In this example we have a component which listen for the element to scroll into view (`scroll-into-view`), which we are combining with `<my-video-element autoplay=1>`.

```javascript
mikrom.component('my-video-element[autoplay=1]', '[scroll-into-view]', (el, attr) => {
  var video = el.querySelector('video');
  el.addEventListener('scroll-into-view', () => {
    video.play();
  })
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
Triggers the `mikrom.destroy`-event on all mikrom-components.
Optionally you can supply an element to limit the search.

### Examples
For examples on how to use _Mikrom_, please check out the `examples` folder.

### License
MIT
