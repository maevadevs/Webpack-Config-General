// DEPENDENCIES
// ************

import React from 'react'
import ReactDOM from 'react-dom'

import Header from './components/Header'
import Button from './components/Button'
import Profile from './components/Profile'

// STYLES
// ******

import './index.scss'

// COMPONENT
// *********

const main = (
  <div>
    <Header />
    <Button />
    <Profile />
  </div>
)

// RENDER
// ******

ReactDOM.render(main, document.querySelector('div#app'))
