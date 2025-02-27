import React from 'react';
import './sca.css';

export default function SocialAccContainer() {
  return (
    <div className='social-acc-container'>
        <span> Follow Us On </span>
        <div className='links'>
          <a className="social-acc" href='#'><img src='https://cdn-icons-png.flaticon.com/128/15047/15047068.png' alt='tiktok'/></a>
          <a className="social-acc" href='#'><img src='https://cdn-icons-png.flaticon.com/128/4401/4401403.png' alt='facebook'/></a>
          <a className="social-acc" href='#'><img src='https://cdn-icons-png.flaticon.com/128/3670/3670274.png' alt='instagram'/></a>
          <a className="social-acc" href='#'><img src='https://cdn-icons-png.flaticon.com/128/1216/1216915.png' alt='twitter'/></a>
        </div>
    </div>
  )
}
