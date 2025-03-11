import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut, openSignInForm } from "../../features/auth/authSlice";
import { X } from "lucide-react";
import './Profile.css';

export default function Profile({ onClose }) {
  const dispatch = useDispatch();

  // Get user data from the Redux store
  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(signOut()); // Dispatch the signOut action
    onClose(); // Close the profile panel after logout
  };

  const handleSignIn = () => {
    dispatch(openSignInForm()); // Open the sign-in form
    onClose(); // Close the profile panel
  };

  return (
    <div className="profile-panel">
      {/* Close Button */}
      <button className="close-btn" onClick={onClose}>
        <X />
      </button>

      {isAuthenticated ? (
        <>
          <h2>{userInfo?.username || "User"}</h2>
          <p>Email: {userInfo?.email}</p>
          <button className="see-acc-btn">Account</button>
          <button className="log-out-btn" onClick={handleLogout}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/992/992680.png"
              alt="Log out"
            />
          </button>
        </>
      ) : (
        <>
          <h2>Guest Account</h2>
          <p>You are not signed in.</p>
          <button className="sign-in-btn" onClick={handleSignIn}>
            Sign In
          </button>
        </>
      )}
    </div>
  );
}