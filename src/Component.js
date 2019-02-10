const Component = (text = 'This is from a Component') => {
  const element = document.createElement('h1')
  element.innerHTML = text
  return element
}

export default Component
