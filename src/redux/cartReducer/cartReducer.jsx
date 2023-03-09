import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let index = state.cart.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.cart[index].quantity += 1;
      } else {
        let product = { ...action.payload };
        state.cart.push(product);
      }
    },
  },
});

export const { addToCart } = cartReducer.actions;

export default cartReducer.reducer;
