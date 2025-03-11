import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

const initialState = {
  token: null, // For authentication
  isAuthenticated: false, // For authentication
  loading: false, // For loading states
  error: null, // For error handling
  isSignInFormOpen: false, // For UI state
  isSignUpFormOpen: false, // For UI state
  userInfo: null, // For user details (e.g., email, username)
};

// Async Thunks
export const signIn = createAsyncThunk(
  "auth/signIn",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/signin", { email, password });
      return response.data; // Return both token and user info
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Sign in failed. Please check your credentials."
      );
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signUp",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/signup", { username, email, password });
      return response.data; // Return both token and user info
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || "Registration failed. Please try again."
      );
    }
  }
);

// Async Thunk for Initializing Auth
export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (token && userInfo) {
        return { token, userInfo }; // Return both token and user info
      }
      return rejectWithValue("No token or user info found");
    } catch (error) {
      return rejectWithValue("Failed to initialize auth");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    openSignInForm: (state) => {
      state.isSignInFormOpen = true;
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
    signOut: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userInfo = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userInfo");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Sign In
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userInfo = action.payload.user; // Save user info
        state.isAuthenticated = true;
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Sign Up
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userInfo = action.payload.user; // Save user info
        state.isAuthenticated = true;
        localStorage.setItem("authToken", action.payload.token);
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Initialize Auth
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userInfo = action.payload.userInfo; // Restore user info
        state.isAuthenticated = true;
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }, 
});

// Export all actions
export const {
  openSignInForm,
  closeSignInForm,
  openSignUpForm,
  closeSignUpForm,
  signOut,
  clearError,
} = authSlice.actions;

// Export aliases
export { signIn as login, signUp as signup, signOut as logout };

export default authSlice.reducer;