import React, { useState } from 'react';
import images from './imagesUrls.jsx';
import './supButtons.css';
import SignUp from './SignUp.jsx'; // Import the SignUp component

export default function SignUpButton() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const openSignUp = () => setIsSignUpOpen(true);
  const closeSignUp = () => setIsSignUpOpen(false);

  return (
    <>
      <button className='signUpBtn' onClick={openSignUp}>
        <img src={images.signUp} alt="Sign Up" />
      </button>
      <SignUp isOpen={isSignUpOpen} onClose={closeSignUp} />
    </>
  );
}
