// src/components/SignIn|signup/SignIn.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { 
  closeSignInForm, 
  openSignUpForm, 
  signIn, 
  clearError 
} from '../../features/auth/authSlice';
import './SignIn.css';

export default function SignInForm() {
  const dispatch = useDispatch();
  const isSignInFormOpen = useSelector((state) => state.auth.isSignInFormOpen);
  const error = useSelector((state) => state.auth.error);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }))
      .unwrap()
      .then(() => {
        setEmail('');
        setPassword('');
      })
      .catch(() => {
        setEmail('');
        setPassword('');
      });
  };

  if (!isSignInFormOpen) return null;

  return (
    <div className='sign-in-form-overlay'>
      <div className='sign-in-form'>
        <button id='close-sign-in-btn' onClick={() => dispatch(closeSignInForm())}>
          <X />
        </button>
        <h2>Sign In</h2>
        {error && <div className="error-message">{error}</div>}
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
              dispatch(closeSignInForm());
              dispatch(openSignUpForm());
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