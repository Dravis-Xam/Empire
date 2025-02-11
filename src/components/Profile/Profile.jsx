

// src/components/Profile/Profile.jsx

import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../features/auth/authSlice';
import { X } from 'lucide-react';

export default function Profile({ onClose }) {
  const dispatch = useDispatch();
  // Get actual user data from your Redux store or context. 
  const user = { name: 'John Doe' }; 

  const handleLogout = () => {
    dispatch(signOut());
    onClose();
  };

  return (
    <div className='profile-panel'>
      <button className='close-btn' onClick={onClose}><X /></button>
      <h2>{user.name}</h2>
      <button className="see-acc-btn">Account</button>
      <button className='log-out-btn' onClick={handleLogout}>
        <img src="https://cdn-icons-png.flaticon.com/128/992/992680.png" alt='Log out'/>
      </button>
    </div>
  );
}