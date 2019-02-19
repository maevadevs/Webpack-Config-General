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
    <Button text='This is a button' />
    <Profile />
  </div>
)

// RENDER
// ******

ReactDOM.render(main, document.querySelector('div#app'))
