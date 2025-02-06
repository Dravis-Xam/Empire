import React from 'react'
import "./SignIn.css"
import { useDispatch } from 'react-redux';
import { signIn, signOut } from './authSlice';

export default function SignIn() {

  const dispatch = useDispatch();

  return (
    <div className='sign-in'>
      <button onClick={() => dispatch(signIn())}>Sign In</button>
      <button onClick={() => dispatch(signOut())}>Sign Out</button>
    </div>
  )
}
