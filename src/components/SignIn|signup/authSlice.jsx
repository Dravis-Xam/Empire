import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: { isSignedIn: false },
    reducers: {
        signIn: (state) => {
            state.isSignedIn = true;
        },
        signOut: (state) => {
            state.isSignedIn = false;
        },
    },
});

export const { signIn, signOut } = authSlice.actions;
export default authSlice.reducer;