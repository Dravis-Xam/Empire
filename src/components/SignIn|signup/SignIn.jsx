import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSignInForm, signIn } from '../SignIn|signup/authSlice';
import './SignInForm.css';

export default function SignInForm() {
  const dispatch = useDispatch();
  const isSignInFormOpen = useSelector((state) => state.auth.isSignInFormOpen);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform sign-in logic (e.g., API call)
    console.log('Signing in with:', email, password);
    dispatch(signIn()); // Update Redux state
  };

  if (!isSignInFormOpen) return null;

  return (
    <div className='sign-in-form-overlay'>
      <div className='sign-in-form'>
        <button className='close-btn' onClick={() => dispatch(closeSignInForm())}>×</button>
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <label>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='input-container'>
            <label>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type='submit'>Sign In</button>
        </form>
        <p>Don't have an account? <button onClick={() => dispatch(openSignInForm())}>Sign Up</button></p>
      </div>
    </div>
  );
}