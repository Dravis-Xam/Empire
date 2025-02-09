import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import images from '../header/imagesUrls';
import "./supButtons.css";
import Profile from '../Profile/Profile'; // Import the Profile component

export default function ProfileBtn() {
  const [showProfile, setShowProfile] = useState(false);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const dispatch = useDispatch();

  const handleProfileClick = () => {
    if (isSignedIn) {
      setShowProfile(!showProfile);
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
          // Add any additional props you need to pass to Profile component
        />
      )}
    </>
  );
}