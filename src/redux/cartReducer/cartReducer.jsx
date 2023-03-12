import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartReducer = createSlice({
  name: "cartReducer",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let index = state.cart.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.cart[index].quantity += action.payload.quantity;
      } else {
        let product = { ...action.payload };
        state.cart.push(product);
      }
    },
    increaseQuantity: (state, action) => {
      let index = state.cart.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.cart[index].quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      let index = state.cart.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.cart[index].quantity -= 1;
      }
    },
    deleteProduct: (state, action) => {
      let index = state.cart.findIndex((item) => item.id === action.payload);
      state.cart.splice(index, 1);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
} = cartReducer.actions;

export default cartReducer.reducer;
