import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Array of cart items
    },
    reducers: {
        addItemToCart: (state, action) => {
            state.items.push(action.payload); // Add item to cart
        },
        removeItemFromCart: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload); // Remove item from cart
        },
        removeMultipleItemsFromCart: (state, action) => {
          state.items = state.items.filter(item => !action.payload.includes(item.id));
        },
        clearCart: (state) => {
          state.items = [];
        },
    },
});

export const { addItemToCart, removeItemFromCart, removeMultipleItemsFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;