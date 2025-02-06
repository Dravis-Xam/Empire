import React from 'react'
import images from './imagesUrls'
import "./supButtons.css" 

export default function Profile() {
  return (
    <button className='profile-btn'>
      <img src={images.profile} />
    </button>
  )
}
