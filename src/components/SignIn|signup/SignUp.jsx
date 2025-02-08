import React, { useState } from 'react';
import './SignUp.css';

export default function SignUp({ isOpen, onClose }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log('Form submitted');
  };

  const [isVisible, setIsVisible] = useState(true);

  if (!isOpen || !isVisible) return null;

  return (
    <div className='sign-up'>
      <button
        className='close-btn'
        onClick={() => {
          setIsVisible(false);
          onClose(); // Make sure onClose is called to close the modal
        }}
      >
        x
      </button>
      <h1 className='form-title'>Sign Up</h1>
      <form method='POST' action='#' onSubmit={handleSubmit}>
        <div className="input-container">
          <div className='label'>Username</div>
          <input type='text' className='input' name='username' required />
        </div>
        <div className="input-container">
          <div className='label'>Email</div>
          <input type='email' className='input' name='email' required />
        </div>
        <div className="input-container">
          <div className='label'>Contact</div>
          <input type='tel' className='input' name='phone' required />
        </div>
        <div className="input-container">
          <div className='label'>Password</div>
          <input type='password' className='input' name='password' required />
        </div>
        <div className="input-container">
          <div className='label'>Code</div>
          <input type='text' className='input' name='verificationCode' required />
        </div>
        <button type='submit' className='submit-button'>Sign Up</button>
      </form>
    </div>
  );
}
