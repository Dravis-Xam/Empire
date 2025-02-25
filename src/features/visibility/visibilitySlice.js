import { createSlice } from '@reduxjs/toolkit';

const visibilitySlice = createSlice({
    name: 'visibility',
    initialState: { isVisible: false },
    reducers: {
        toggleVisibility: (state) => {
            state.isVisible = !state.isVisible;
        },
    },
});

export const { toggleVisibility } = visibilitySlice.actions;
export default visibilitySlice.reducer;