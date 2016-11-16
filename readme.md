# Mikrom
> Dead simple js-components for next to nothing.  

### What is this?
Sometimes all you need are some damn self-initiating components that run instantly, without using a heavy parent-library that kills performance and has a learning curve spanning months.  

_Mikrom_ is a tiny library for the people who jumped off the framework hype-train and like full control over their applications.  

It's made with simplicity and flexibility in mind.

### Features
  - Tiny library; tiny footprint
  - Reusable components; write once and use in multiple projects
  - Modern browser support
  - Automatic initiation

### Usage
#### Basic initiation
Mikrom 3 follows the same pattern as [Custom Elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements/Custom_Elements_with_Classes), but uses selectors rather than limiting the registration to tag-names.

```html
<div class="special-button" data-some-attribute="I am an attribute">
  Click me!
</div>
```

```javascript
class SpecialButton extends HTMLElement {
  attachedCallback () {
    this._onClick = this._onClick.bind(this)

    this.addEventListener('click', this._onClick)
  }

  detachedCallback () {
    this.removeEventListener('click', this._onClick)
  }

  _onClick () {
    alert(this.dataset.someAttribute)
  }
}
mikrom.component('.special-button', SpecialButton)
```
Mikrom uses MutationObserver to automatically handle components as they are added, changed, and removed from the DOM.

Mikrom can be used as a basic _non-standard_ `Custom Element`-polyfill. But it's lacking any features outside of the element lifecycle callbacks.  
```javascript
document.registerElement = mikrom.component
```

### Component lifecycle
```js
class MyCustomElement extends HTMLElement {
  createdCallback () {
    // Fired when the element attached to the DOM, before attachedCallback
    // (It's recommended to just use attachedCallback)
  }
  attachedCallback () {
    // Fired when the element is attached to the DOM
  }
  attributeChangedCallback () {
    // Fired when an attribute has changed on the element
  }
  detachedCallback () {
    // Fired when the element has been removed from the DOM
  }
}
```

### Method overview
```javascript
mikrom.component(selector:String, definition:Class)
```
Register a component with _Mikrom_.

### Examples
For examples on how to use _Mikrom_, please check out the `examples` folder.

### License
MIT
