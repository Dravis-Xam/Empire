import React from 'react';
import images from './imagesUrls';
import './supButtons.css';
import { useDispatch } from 'react-redux'; // Assuming you're using Redux
import { openSignInForm } from '../../features/auth/authSlice'; // Example action to open the sign-in form

export default function SignIn() {
  const dispatch = useDispatch();

  const handleSignInClick = () => {
    dispatch(openSignInForm()); // Dispatch action to open the sign-in form
  };

  return (
    <button className='signInBtn' onClick={handleSignInClick}>
      <img src={images.signIn} alt="Sign In" />
    </button>
  );
}