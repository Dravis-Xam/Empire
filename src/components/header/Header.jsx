import React from 'react'
import './Header.css'
import ToggleButton from './ToggleButton'
import Profile from './Profile'
import SignIn from './SignIn'
import SearchBar from './SearchBar'


export default function Header() {

  return (
    <section className='header'>
      <h1>Empire Hub Phones</h1>
      <SearchBar />
      <div className="t-options">
        <ToggleButton />
        <Profile />
        <SignIn />
      </div>
    </section>
  )
}
