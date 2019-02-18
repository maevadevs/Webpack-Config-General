// DEPENDENCIES
// ************

import Header from './components/Header'
import Button from './components/Button'
import CatImage from './components/Profile'

// STYLES
// ******

import './index.scss'

// COMPONENT
// *********

document.addEventListener('DOMContentLoaded', () => { 
  document.querySelector('div#app').appendChild(Header())
  document.querySelector('div#app').appendChild(Button())
  document.querySelector('div#app').appendChild(CatImage())
})
