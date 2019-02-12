// DEPENDENCIES
// ************

import Component from './components/Component'

// STYLES
// ******

import './index.scss'

// COMPONENT
// *********

document.addEventListener('DOMContentLoaded', () => { 
  document.querySelector('div#app').appendChild(Component())
})
