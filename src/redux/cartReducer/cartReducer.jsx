import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../../util/config";
const initialState = {
  cart: settings.getStorageJson("cart") ?? [],
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
        let product = { ...action.payload, quantity: +action.payload.quantity };
        state.cart.push(product);
      }
      settings.setStorageJson(
        "cart",
        state.cart.map((item) => item)
      );
    },
    increaseQuantity: (state, action) => {
      let index = state.cart.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.cart[index].quantity += 1;
      }
      settings.setStorageJson(
        "cart",
        state.cart.map((item) => item)
      );
    },
    decreaseQuantity: (state, action) => {
      let index = state.cart.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        if (state.cart[index].quantity > 0) {
          state.cart[index].quantity -= 1;
        }
      }
      settings.setStorageJson(
        "cart",
        state.cart.map((item) => item)
      );
    },
    editQuantity: (state, action) => {
      let index = state.cart.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.cart[index].quantity = +action.payload.quantity;
      }
      settings.setStorageJson(
        "cart",
        state.cart.map((item) => item)
      );
    },
    deleteProduct: (state, action) => {
      let index = state.cart.findIndex((item) => item.id === action.payload);
      state.cart.splice(index, 1);
      settings.setStorageJson(
        "cart",
        state.cart.map((item) => item)
      );
    },
    resetCart: (state) => {
      state.cart = [];
      settings.setStorageJson("cart", []);
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
  editQuantity,
} = cartReducer.actions;

export default cartReducer.reducer;
