import React from 'react'
import './Header.css'
import ToggleButton from './ToggleButton'
import ProfileBtn from './ProfileBtn'
import SignIn from './SignIn'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom';


export default function Header() {

  return (
    <section className='header'>
      <h1>Empire Hub Phones</h1>
      <SearchBar />
      <div className="t-options">
        <ToggleButton />
        <ProfileBtn />
        <Link to="/login"><SignIn /></Link>
      </div>
    </section>
  )
}
