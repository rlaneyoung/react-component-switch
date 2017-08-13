# react-component-switch


`react-component-switch` is a react component for rendering child components from a list of React.Component class constructors.  `react-component-switch` provides no return Object itself and will render null if a child component is not provided. It sits as a logic layer between a parent element and a child component, allowing a traversable list of components to be rendered in a single spot. This is useful for any part of an application that needs to support a step system such as Wizards, Account Creation forms, or Two Factor Authentication.

#### - Version: 1.0.0

## Table of Contents

* [Installing](#installing)
* [Getting Started](#getting-started)
* [Usage and Examples](#usage-and-examples)
  + [Creating a List of Child Components](#creating-a-list-of-child-components)
  + [Traversing the List](#traversing-the-list)
  + [Passing Side Components](#passing-side-components)


## Installing

```
npm install react-component-switch --save
```

## Getting Started

```js
const ComponentSwitch = require('react-component-switch');

or

import ComponentSwitch from 'react-component-switch';
```

### Usage and Examples

### Creating a List of Child Components

Components are passed to ComponentSwitch as an array assigned to the prop 'components'. Imagine we have 2 components in separate files that we want to pass, Component 'Hello' and Component 'Goodbye':

```js
import React from 'react';
import ReactDOM from 'react-dom';
import ComponentSwitch from 'react-component-switch';

import Hello from 'hello';
import Goodbye from 'goodbye';


const componentList = [Hello, Goodbye];     // Store the class constructors in an array.

// ComponentSwitch is rendered with componentList array as prop 'components';
ReactDOM.render(<ComponentSwitch components={components} />, document.getElementById('app'));

```

### Traversing The List

When a child component is rendered from the list, it is passed a reference to ComponentSwitch as a prop. This gives every component in our list access to ComponentSwitch's methods. ComponentSwitch
has 3 methods: 'next', 'back', and 'setStep'. next and back are used for single step jumps in their respective directions, where setStep can be used to jump to any step in the list. setStep also exposes access to 'Side Steps', which are components that ComponentSwitch can render that are not part of our main component list. This feature allows conditional and temporary step rendering. Useful for things like Loading screens. Child components can access all of these methods like so:

```js

/* From within the child component source */

// Trigger next component in list
this.props.ComponentSwitch.next();

// Trigger previous component in list
this.props.ComponentSwitch.back();

// Trigger any step. Using a number as the argument for main component list steps and a string to trigger side component steps.
this.props.ComponentSwitch.setStep(3);

```


### Passing Side components

Side components are given to ComponentSwitch in an Object as prop 'sides'. Each side component should have a name:value pair conforming to the format componentName:constructor. This way the component can be rendered by simply passing the components name as a string to the setStep method.

```js

import React from 'react';
import ReactDOM from 'react-dom';
import ComponentSwitch from 'react-component-switch';

import Hello from 'hello';
import Goodbye from 'goodbye';
import HowAreYou from 'howAreYou';

const componentList = [Hello, Goodbye];     // Store the class constructors in an array.
const sideComponents = { HowAreYou };        // ES6 equivalent of { "HowAreYou": HowAreYou };

// ComponentSwitch is rendered with componentList array as prop 'components';
ReactDOM.render(<ComponentSwitch components={components} sides={sideComponents} />, document.getElementById('app'));

```

When a side component is rendered, triggering the 'next' or 'back' method will render their respective components from the main list. If an event in step 2 were to trigger the rendering of a side component, then if the 'next' method is triggered from within the Side component, step 3 from the main list will be rendered. This supports the temporary nature of Side components.
