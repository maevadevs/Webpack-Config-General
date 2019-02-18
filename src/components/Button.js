// DEPENDENCIES
// ************

import React from 'react'

// STYLES
// ******

import './Button.scss'

// COMPONENT DEFINITION
// ********************

const Button = ({ text = 'This is Button' }) => <div className='round-button pure-button'>{text}</div>

// EXPORT
// ******

export default Button
