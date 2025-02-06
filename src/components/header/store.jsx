import { configureStore } from '@reduxjs/toolkit';
import visibilityReducer from './visibilitySlice';

const store = configureStore({
    reducer: {
        visibility: visibilityReducer,
    },
});

export default store;