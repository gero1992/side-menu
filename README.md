[![npm version](https://badgen.net/npm/v/@maksu/side-menu)](https://www.npmjs.com/package/@maksu/side-menu)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/@maksu/side-menu)
# side-menu

Side-menu is a LitElement Web Component providing application navigation functionality withing the UI. 
It can be used for hierarchical or flat navigation.
##### Supported features:
1. Compact and normal modes
1. Adding icons to the elements
1. Multi level navigation

![Example of side-menu](https://github.com/gero1992/side-menu/blob/master/example.png)

## Installation
Install 'side-menu' web component:
```sh
npm i @maksu/side-menu --save
```
After that you can import in an html file:
```html
<head>
    <script type="module">
        import '@maksu/side-menu/side-menu.js'
        import '@maksu/side-menu/side-menu-item.js'
    </script>
</head>
```

or in another LitElement:
```js
import {LitElement, html} from "lit-element";

import '@maksu/side-menu/side-menu.js';
import '@maksu/side-menu/side-menu-item.js';

class ExampleElement extends LitElement {
  static get template() {
    return html`
        <side-menu>
            <side-menu-item label='Home' href='https://www.example.com'>
            </side-menu-item>
        </side-menu>
    `;
  }
}

customElements.define('example-element', ExampleElement);
```
 
## Examples

#### Simple
```html
<side-menu>
    <side-menu-item label="Home" href="/home"></side-menu-item>
    <side-menu-item label="Accounts" href="/accounts"></side-menu-item>
    <side-menu-item label="Assignments" href="/assignments" target="_blank"></side-menu-item>
</side-menu>
```

#### Icon
```html
<side-menu>
   <side-menu-item label="Home" href="/home">
      <iron-icon icon="home" slot="icon"></iron-icon>
   </side-menu-item>
   <side-menu-item label="Accounts" href="/accounts">
      <iron-icon icon="account-circle" slot="icon"></iron-icon>
   </side-menu-item>
   <side-menu-item label="Assignments" href="/assignments" target="_blank">
      <iron-icon icon="assignment-turned-in" slot="icon"></iron-icon>
   </side-menu-item>
</side-menu>
```

#### Multi-level
```html
<side-menu>
   <side-menu-item label="Home">
      <iron-icon icon="home" slot="icon"></iron-icon>
   </side-menu-item>
   <side-menu-item label="Favorites" expanded>
      <iron-icon icon="favorite" slot="icon"></iron-icon>
      <side-menu-item label="Learn">
         <side-menu-item
            label="How to"
            href="/howto"
            target="_blank">        
         </side-menu-item>
      </side-menu-item>
      <side-menu-item
         label="Web Components"
         href="/webcomponents"
         target="_blank">
      </side-menu-item>
      <side-menu-item label="Guides" href="guides"></side-menu-item>
   </side-menu-item>
</side-menu>
```

#### Set item selected:
You can set an item to be selected by adding a **`selected`** attribute to it
```html
<side-menu>
    <side-menu-item label="Home" selected></side-menu-item>
</side-menu>
```

#### Expand nested items:
When you have a multi level menu, you can expand the child items by adding **`expanded`** attribute to the parent:
```html
<side-menu>
   <side-menu-item label="Parent" expanded>
      <side-menu-item label="Child"></side-menu-item>
   </side-menu-item>
</side-menu>
```

## Running the demo locally
1. Fork the 'side-menu' repository and clone it.
1. Run 'npm-install' to install the dependencies.
1. Run 'npm start' and the browser will automatically open the component demo.
