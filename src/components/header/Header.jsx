import React, { useState } from 'react'
import './Header.css'



export default function Header() {

    const [loading, setLoading] = useState(true)

    const openCart = () => {

    }

  return (
    <section>
      <h1>Empire Hub Phones</h1>
      <div className="t-options">
        <button onClick={openCart}>Cart<span>{}</span></button>
        <button>Profile</button>
        <button>Sign in</button>
      </div>
    </section>
  )
}
