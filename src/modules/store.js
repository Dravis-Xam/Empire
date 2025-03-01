import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { debounce } from 'lodash';


const PERSISTENCE_DEBOUNCE = 1000;
const PERSISTENCE_KEY = 'authState';

// Placeholder reducer for slices that are not yet loaded
const placeholderReducer = (state = {}, action) => state;

// Combine reducers with placeholders
const rootReducer = combineReducers({
  auth: placeholderReducer,
  cart: placeholderReducer,
  visibility: placeholderReducer,
  reviews: placeholderReducer,
});

const loadPersistedState = () => {
  try {
    const serializedState = localStorage.getItem(PERSISTENCE_KEY);
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (error) {
    console.error('Persisted state loading error:', error);
    return undefined;
  }
};

const store = configureStore({
  reducer: rootReducer, // Use the combined reducer with placeholders
  preloadedState: loadPersistedState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// Function to dynamically inject reducers
store.injectReducer = (key, asyncReducer) => {
  store.asyncReducers = { ...store.asyncReducers, [key]: asyncReducer };
  store.replaceReducer(
    combineReducers({
      ...rootReducer,
      ...store.asyncReducers,
    })
  );
};

// Function to load reducers asynchronously
store.loadReducers = async () => {
  const { default: authReducer } = await import('../features/auth/authSlice');
  const { default: cartReducer } = await import('../features/cart/cartSlice');
  const { default: visibilityReducer } = await import('../features/visibility/visibilitySlice');
  const { default: reviewsReducer } = await import("../features/review/reviewSlice");
  // Inject the loaded reducers
  store.injectReducer('auth', authReducer);
  store.injectReducer('cart', cartReducer);
  store.injectReducer('visibility', visibilityReducer);
  store.injectReducer('reviews', reviewsReducer);
};

// Load reducers asynchronously
store.loadReducers();

const saveState = debounce(() => {
  try {
    const state = store.getState();
    const persistenceState = {
      auth: {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated,
      },
    };
    localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(persistenceState));
  } catch (error) {
    console.error('State persistence failed:', error);
  }
}, PERSISTENCE_DEBOUNCE);

store.subscribe(saveState);

export default store;