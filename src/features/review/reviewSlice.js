import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
  },
  reducers: {
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
  },
});

export const { addReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;