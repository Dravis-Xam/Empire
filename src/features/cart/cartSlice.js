import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array of cart items
    totalPrice: 0, // Total price of all items in the cart
    discountedPrice: 0, // Price after applying discount
    discount: 0, // Discount percentage (e.g., 10 for 10%)
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ ...action.payload, quantity });
      }
      // Update total price
      state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      // Apply discount if total price is above 5000
      state.discount = state.totalPrice > 5000 ? 10 : 0;
      state.discountedPrice = state.totalPrice * (1 - state.discount / 100);
    },
    removeItemFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      // Update total price after removing an item
      state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      // Recalculate discount
      state.discount = state.totalPrice > 5000 ? 10 : 0;
      state.discountedPrice = state.totalPrice * (1 - state.discount / 100);
    },
    removeMultipleItemsFromCart: (state, action) => {
      state.items = state.items.filter((item) => !action.payload.includes(item.id));
      // Update total price after removing multiple items
      state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
      // Recalculate discount
      state.discount = state.totalPrice > 5000 ? 10 : 0;
      state.discountedPrice = state.totalPrice * (1 - state.discount / 100);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.discountedPrice = 0;
      state.discount = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  removeMultipleItemsFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;