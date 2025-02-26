import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'lucide-react';
import { 
  closeSignInForm, 
  openSignUpForm, 
  signIn, 
  clearError 
} from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

export default function SignInForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSignInFormOpen, error, isLoading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => dispatch(clearError()), 3000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  useEffect(() => {
    return () => dispatch(closeSignInForm());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password }))
      .unwrap()
      .then(() => {
        setEmail('');
        setPassword('');
        navigate('/')
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
        <button 
          id='close-sign-in-btn' 
          onClick={() => dispatch(closeSignInForm())}
          aria-label="Close sign in form"
        >
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
              autoComplete='email'
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
              autoComplete='current-password'
            />
            <label>Password</label>
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='password-toggle'
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type='submit' disabled={isLoading}>
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <p>
          Don't have an account?{' '}
          <button
            onClick={() => {
              dispatch(closeSignInForm());
              dispatch(openSignUpForm());
            }}
            className='sign-up-btn'
            aria-label="Navigate to sign up"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}