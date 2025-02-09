import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSignInForm, openSignUpForm } from '../SignIn|signup/authSlice'; // Import openSignUpForm
import './SignIn.css';

export default function SignInForm() {
  const dispatch = useDispatch();
  const isSignInFormOpen = useSelector((state) => state.auth.isSignInFormOpen);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signing in with:', email, password);
    dispatch(signIn());
  };

  if (!isSignInFormOpen) return null;

  return (
    <div className='sign-in-form-overlay'>
      <div className='sign-in-form'>
        <button id='close-sign-in-btn' onClick={() => dispatch(closeSignInForm())}>×</button>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=' '
              required
            />
            <label>Email</label>
          </div>
          <div className='input-container'>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=' '
              required
            />
            <label>Password</label>
          </div>
          <button type='submit'>Sign In</button>
        </form>
        <p>
          Don't have an account?{' '}
          <button
            onClick={() => {
              dispatch(closeSignInForm()); // Close the sign-in form
              dispatch(openSignUpForm());  // Open the sign-up form
            }}
            className='sign-up-btn'
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}