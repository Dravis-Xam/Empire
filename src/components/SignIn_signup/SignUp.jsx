// src/components/SignIn|signup/SignUp.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { closeSignUpForm, openSignInForm, signUp, clearError } from '../../features/auth/authSlice';
import './SignUp.css';

export default function SignUpForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSignUpFormOpen = useSelector((state) => state.auth.isSignUpFormOpen);
  const error = useSelector((state) => state.auth.error);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    dispatch(signUp({ username, email, password }))
      .unwrap()
      .then(() => {
        setUsername('');
        setEmail('');
        setPassword('');
        navigate('/'); // Navigate to home or another route after successful sign-up
      })
      .catch(() => {
        setUsername('');
        setEmail('');
        setPassword('');
      });
  };

  if (!isSignUpFormOpen) return null;

  return (
    <div className='sign-up-form-overlay'> 
      <div className='sign-up-form'>
        <button id='close-sign-up-btn' onClick={() => dispatch(closeSignUpForm())}>
          <X />
        </button>
        <h2>Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className='input-container'>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder=' '
              required
            />
            <label>Username</label>
          </div>
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
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=' '
              required
            />
            <label>Password</label>
          </div>
          <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='password-toggle'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          <button type='submit' className='submit-button'>Sign Up</button>
        </form>
        <p>
          Already have an account?{' '}
          <button
            onClick={() => {
              dispatch(closeSignUpForm());
              dispatch(openSignInForm());
            }}
            className='sign-in-btn'
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
