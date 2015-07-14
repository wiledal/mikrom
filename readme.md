# Mikrom
> Dead simple js-components for next to nothing.

### What is this?
Sometimes all you need is some damn self-initiating components that run instantly, without using a heavy parent-library that kills performance and has a learning curve spanning months.  
  
_Mikrom_ is a tiny (like, seriously tiny) library for the people who are jumped off the React/Angular hype-train and like full control over their applications.  
  
It's made to be super simple, but extremely versatile.  
No _$scopes*_, no _templates*_, just elements and javascript.  
  
Inspired by the _directive_-approach of Angular 1.x.x and WebComponents.

### Usage
```html
<div class=".selector" some-attribute="I am an attribute">
  Click me, if you dare
</div>
```

```javascript
mikrom.component(".selector", function(attr)) {
  function onClick() {
    console.log(attr.someAttribute); // prints "I am an attribute"
  }
  
  this.addEventListener("click", onClick);
});

mikrom.init();
```

### Method overview
```javascript
mikrom.component(selector:String, func:Function);
```
Register a component with mikrom.

```javascript
mikrom.init([container:Element = document]);
```
Destroy all component.
Optionally you can supply a container in which mikrom should search for components to initialize.

```javascript
mikrom.destroy([container:Element = document]);
```
Triggers the `mikromDestroy`-event on all mikrom-components.
Optionally you can supply a container in which mikrom should search for components to destroy.

### Examples
For examples on how to use _Mikrom_, please check out the `examples` folder.

### License
MIT