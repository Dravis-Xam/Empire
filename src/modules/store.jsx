//src/modules/store.jsx

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice';
import visibilityReducer from '../features/visibility/visibilitySlice';
import { debounce } from 'lodash';

// 1. Load persisted state from localStorage
const loadPersistedState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.warn('Failed to load persisted state:', error);
    return undefined;
  }
};

// 2. Initialize store with potential persisted state
const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    visibility: visibilityReducer,
  },
  preloadedState: {
    auth: loadPersistedState()?.auth  // Only preload auth state
  }
});

// 3. Optimized state persistence
const saveState = debounce(() => {
  try {
    const { auth } = store.getState();
    localStorage.setItem('authState', JSON.stringify(auth));
  } catch (error) {
    console.warn('Failed to persist state:', error);
  }
}, 1000);

// 4. Subscribe to store changes
store.subscribe(saveState);

export default store;