import React from 'react'
import images from './imagesUrls'
import "./supButtons.css"

export default function SignIn() {
  return (
    <button className='signInBtn'>
      <img src={images.signIn} />
    </button>
  )
}
