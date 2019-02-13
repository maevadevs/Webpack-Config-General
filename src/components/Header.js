// STYLES
// ******

import './Header.scss'

// COMPONENT
// *********

const Header = (text = 'This is a Header') => {
  const h1 = document.createElement('h1')
  h1.innerHTML = text
  h1.classList.add('Header')
  return h1
}

// EXPORT
// ******

export default Header
