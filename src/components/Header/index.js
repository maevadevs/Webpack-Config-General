// DEPENDENCIES
// ************

import React from 'react'

// STYLES
// ******

import './Header.scss'

// COMPONENT DEFINITION
// ********************

const Header = ({ text = 'This is a Header' }) => <h1 className='Header'>{text}</h1>

// EXPORT
// ******

export default Header
