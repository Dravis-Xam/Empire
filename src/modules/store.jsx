import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../components/cart/cartSlice';
import authReducer from '../components/SignIn|signup/authSlice';
import visibilityReducer from '../components/header/visibilitySlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        visibility: visibilityReducer,
    },
});

export default store;