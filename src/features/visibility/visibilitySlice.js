import { createSlice } from '@reduxjs/toolkit';

const visibilitySlice = createSlice({
  name: 'visibility',
  initialState: {
    isVisible: false,
  },
  reducers: {
    toggleCartVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
    toggleVisibility: (state) => {
      state.isVisible = !state.isVisible;
    },
  },
});
   

export const { toggleCartVisibility, toggleVisibility } = visibilitySlice.actions;
export default visibilitySlice.reducer;