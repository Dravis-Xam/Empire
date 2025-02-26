import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { debounce } from 'lodash';

const PERSISTENCE_DEBOUNCE = 1000;
const PERSISTENCE_KEY = 'authState';

// Static reducers (initially empty)
// Example static reducers
const staticReducers = {
  // Example: A placeholder reducer for the `auth` slice
  auth: (state = {}, action) => {
    switch (action.type) {
      case 'SET_AUTH':
        return { ...state, ...action.payload };
      default:
        return state;
    }
  },
  
  // Example: A placeholder reducer for the `visibility` slice
  visibility: (state = { isVisible: false }, action) => {
    switch (action.type) {
      case 'TOGGLE_VISIBILITY':
        return { ...state, isVisible: !state.isVisible };
      default:
        return state;
    }
  },
};

const createRootReducer = (asyncReducers = {}) => combineReducers({
  ...staticReducers,
  ...asyncReducers,
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
  reducer: createRootReducer(),
  preloadedState: loadPersistedState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

store.injectReducer = (key, asyncReducer) => {
  store.asyncReducers = { ...store.asyncReducers, [key]: asyncReducer };
  store.replaceReducer(createRootReducer(store.asyncReducers));
};

store.loadReducers = async () => {
  const { default: authReducer } = await import('../features/auth/authSlice');
  const { default: cartReducer } = await import('../features/cart/cartSlice');
  const { default: visibilityReducer } = await import('../features/visibility/visibilitySlice');

  store.replaceReducer(
    createRootReducer({
      auth: authReducer,
      cart: cartReducer,
      visibility: visibilityReducer,
    })
  );
};

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