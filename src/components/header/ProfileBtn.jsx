import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import images from './imagesUrls';
import "./supButtons.css";
import Profile from '../Profile/Profile';

export default function ProfileBtn() {
  const [showProfile, setShowProfile] = useState(false);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    if (isSignedIn) {
      setShowProfile(!showProfile);
      navigate('/profile');
    }
  };

  return (
    <>
      <button className='profile-btn' onClick={handleProfileClick}>
        <img src={images.profile} alt="Profile" />
      </button>
      
      {showProfile && isSignedIn && (
        <Profile 
          onClose={() => setShowProfile(false)}
        />
      )}
    </>
  );
}