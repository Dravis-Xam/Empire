import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSignInFormOpen: false,
    isSignUpFormOpen: false,
  },
  reducers: {
    openSignInForm: (state) => {
      state.isSignInFormOpen = true;
      state.isSignUpFormOpen = false;
    },
    closeSignInForm: (state) => {
      state.isSignInFormOpen = false;
    },
    openSignUpForm: (state) => {
      state.isSignUpFormOpen = true;
      state.isSignInFormOpen = false;
    },
    closeSignUpForm: (state) => {
      state.isSignUpFormOpen = false;
    },
    signIn: (state) => {
      state.isSignedIn = true;
      state.isSignInFormOpen = false; // Close the form after signing in
    },
    signOut: (state) => {
      state.isSignedIn = false;
    },
  },
});

export const { openSignInForm, closeSignInForm, openSignUpForm, closeSignUpForm, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;