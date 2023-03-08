import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    { id: 1, quantity: 13 },
    { id: 2, quantity: 12 },
  ],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (action, payload) => {},
  },
});

export const { addToCart } = cartReducer.actions;

export default cartReducer.reducer;
