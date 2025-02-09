import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeSignUpForm, openSignInForm } from '../SignIn|signup/authSlice'; // Import openSignInForm
import './SignUp.css';

export default function SignUpForm() {
  const dispatch = useDispatch();
  const isSignUpFormOpen = useSelector((state) => state.auth.isSignUpFormOpen);

  if (!isSignUpFormOpen) return null;

  return (
    <div className='sign-up-form-overlay'>
      <div className='sign-up-form'>
        <button id='close-sign-up-btn' className="close-btn" onClick={() => dispatch(closeSignUpForm())}>×</button>
        <h2>Sign Up</h2>
        <form>
          <div className='input-container'>
            <input type='text' placeholder=' ' required />
            <label>Username</label>
          </div>
          <div className='input-container'>
            <input type='email' placeholder=' ' required />
            <label>Email</label>
          </div>
          <div className='input-container'>
            <input type='password' placeholder=' ' required />
            <label>Password</label>
          </div>
          <button type='submit'>Sign Up</button>
        </form>
        <p>
          Already have an account?{' '}
          <button
            onClick={() => {
              dispatch(closeSignUpForm()); // Close the sign-up form
              dispatch(openSignInForm());  // Open the sign-in form
            }}
            className='sign-in-btn'
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}