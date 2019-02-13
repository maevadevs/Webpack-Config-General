// DEPENDENCIES
// ************

import Header from './components/Header'
import Button from './components/Button'

// STYLES
// ******

import './index.scss'

// COMPONENT
// *********

document.addEventListener('DOMContentLoaded', () => { 
  document.querySelector('div#app').appendChild(Header())
  document.querySelector('div#app').appendChild(Button())
})
