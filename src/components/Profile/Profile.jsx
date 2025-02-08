
import React from 'react'

export default function Profile( {e}) {
  return (
    <div className='Profile'>
      <h2>                                          
        {e.name}
      </h2>
      <button className="see-acc-btn">Account</button>
      <button className='log-out-btn'>
        <img src="https://cdn-icons-png.flaticon.com/128/992/992680.png" alt='log out.'/>
      </button>
    </div>
  )
}
