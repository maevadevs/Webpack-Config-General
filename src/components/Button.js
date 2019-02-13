// STYLES
// ******

import './Button.scss'

// COMPONENT
// *********

const Button = (text = 'This is a Button') => {
  const bttn = document.createElement('div')
  bttn.innerHTML = text
  bttn.classList.add('round-button')
  bttn.classList.add('pure-button')
  return bttn
}

// EXPORT
// ******

export default Button
