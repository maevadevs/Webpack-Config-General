// STYLES
// ******

import './Component.scss'

// COMPONENT
// *********

const Component = (text = 'This is a Component') => {
  const h1 = document.createElement('h1')
  h1.innerHTML = text
  h1.classList.add('Component')
  return h1
}

// EXPORT
// ******

export default Component
