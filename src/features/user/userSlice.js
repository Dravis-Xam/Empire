import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isSignedIn: false,
    userInfo: null, // You can store additional user info here
  },
  reducers: {
    signIn: (state, action) => {
      state.isSignedIn = true;
      state.userInfo = action.payload; // Save user info (e.g., email, name)
    },
    signOut: (state) => {
      state.isSignedIn = false;
      state.userInfo = null;
    },
  },
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice.reducer;