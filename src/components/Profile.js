// STYLES
// ******

import './Profile.scss'
import catImgSrc from '../images/cat.jpg'

// COMPONENT
// *********

const CatImage = () => {
  const img = document.createElement('img')
  img.src = catImgSrc
  img.classList.add('profile-image')
  return img
}

// EXPORTS
// *******

export default CatImage
