import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  isSignInFormOpen: false,
  isSignUpFormOpen: false,
};

// Async Thunks
export const signIn = createAsyncThunk(
  'auth/signIn',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/signin', { email, password }); // Changed to lowercase endpoint
      return response.data.token;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Sign in failed. Please check your credentials.'
      );
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/signup', { username, email, password }); // Consistent lowercase
      return response.data.token;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error || 'Registration failed. Please try again.'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
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
    closeSignUpForm: (state) => { // Fixed casing
      state.isSignUpFormOpen = false;
    },
    signOut: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },
    initializeAuth: (state) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
      }
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('authToken', action.payload);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
        localStorage.setItem('authToken', action.payload);
      })
      .addCase(signUp.rejected, (state, action) => {
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
  initializeAuth,
  clearError
} = authSlice.actions;

// Export aliases
export { signIn as login, signUp as signup, signOut as logout };

export default authSlice.reducer;