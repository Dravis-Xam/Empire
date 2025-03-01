import React, { useState } from "react";
import { useSelector } from "react-redux";
import images from "./imagesUrls";
import "./supButtons.css";
import Profile from "../Profile/Profile";

export default function ProfileBtn() {
  const [showProfile, setShowProfile] = useState(false);
  const isSignedIn = useSelector((state) => state.auth.isAuthenticated); // Use isAuthenticated instead of isSignedIn

  const handleProfileClick = () => {
    setShowProfile(!showProfile); // Toggle profile panel visibility
  };

  return (
    <>
      {/* Profile Button */}
      <button className="profile-btn" onClick={handleProfileClick}>
        <img src={images.profile} alt="Profile" />
      </button>

      {/* Profile Panel */}
      {showProfile && (
        <Profile
          onClose={() => setShowProfile(false)} // Close the profile panel
        />
      )}
    </>
  );
}