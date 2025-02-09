import React from 'react'
import './Header.css'
import ToggleButton from './ToggleButton'
import ProfileBtn from './ProfileBtn'
import SignIn from './SignIn'
import SearchBar from './SearchBar'


export default function Header() {

  return (
    <section className='header'>
      <h1>Empire Hub Phones</h1>
      <SearchBar />
      <div className="t-options">
        <ToggleButton />
        <ProfileBtn />
        <SignIn />
      </div>
    </section>
  )
}
