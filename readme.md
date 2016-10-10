# Mikrom
> Dead simple js-components for next to nothing.  

### What is this?
Sometimes all you need are some damn self-initiating components that run instantly, without using a heavy parent-library that kills performance and has a learning curve spanning months.  

_Mikrom_ is a tiny library for the people who jumped off the framework hype-train and like full control over their applications.  

It's made to be super simple and straight up flexible.
No _$scopes_, no _templates_, just elements and javascript.

### Features
  - Tiny library; tiny footprint
  - Reusable components; write once and use in multiple projects
  - Modern browser support

### Usage
#### Basic initiation
Mikrom 3.x follows the same pattern as the  [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements/Custom_Elements_with_Classes), but uses selectors rather than limiting the initiation to tag-names.

```html
<div class="special-button" some-attribute="I am an attribute">
  Click me!
</div>
```

```javascript
class SpecialButton extends HTMLElement {
  createdCallback() {
    this.addEventListener('click', () => {
      alert(this.getAttribute('some-attribute'))
    })
  }
}
mikrom.component('.special-button', SpecialButton)
```

Mikrom can be used as a basic `CustomElement`-polyfill. But it's lacking any features outside of the standard element lifecycle callbacks.
```javascript
document.registerElement = mikrom.component;
```

### Method overview
```javascript
mikrom.component(selector:String, definition:Function)
```
Register a component with _Mikrom_.

### Examples
For examples on how to use _Mikrom_, please check out the `examples` folder.

### License
MIT
