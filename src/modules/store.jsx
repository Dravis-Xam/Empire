import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { debounce } from 'lodash';

const PERSISTENCE_DEBOUNCE = 1000;
const PERSISTENCE_KEY = 'authState';

const staticReducers = {};

const createRootReducer = (asyncReducers) => combineReducers({
  ...staticReducers,
  ...asyncReducers
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

store.loadReducers = async () => {
  const { default: authReducer } = await import('../features/auth/authSlice');
  const { default: cartReducer } = await import('../features/cart/cartSlice');
  const { default: visibilityReducer } = await import('../features/visibility/visibilitySlice');

  store.replaceReducer(createRootReducer({
    auth: authReducer,
    cart: cartReducer,
    visibility: visibilityReducer
  }));
};

store.loadReducers();

const saveState = debounce(() => {
  try {
    const state = store.getState();
    const persistenceState = {
      auth: {
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated,
      }
    };
    localStorage.setItem(PERSISTENCE_KEY, JSON.stringify(persistenceState));
  } catch (error) {
    console.error('State persistence failed:', error);
  }
}, PERSISTENCE_DEBOUNCE);

store.subscribe(saveState);

export default store;