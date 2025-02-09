import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        isSignedIn: false,
        isSignInFormOpen: false, 
    },
    reducers: {
        openSignInForm: (state) => {
          state.isSignInFormOpen = true;
        },
        closeSignInForm: (state) => {
          state.isSignInFormOpen = false;
        },
        signIn: (state) => {
            state.isSignedIn = true;
        },
        signOut: (state) => {
            state.isSignedIn = false;
        },
    },
});

export const { openSignInForm, closeSignInForm, signIn, signOut } = authSlice.actions;
export default authSlice.reducer;