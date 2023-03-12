import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  listProduct: [],
  product: {},
};
const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProduct: (state, action) => {
      state.listProduct = action.payload;
    },
    getProduct: (state, action) => {
      state.product = { ...action.payload, quantity: 1 };
    },
    increaseQuantity: (state) => {
      state.product.quantity += 1;
    },
    decreaseQuantity: (state) => {
      if (state.product.quantity > 1) {
        state.product.quantity -= 1;
      }
    },
    sortProduct: (state, action) => {
      if (action.payload === 1) {
        state.listProduct.sort((a, b) => a.unitPrice - b.unitPrice);
      }
      if (action.payload === 2) {
        state.listProduct.sort((a, b) => b.unitPrice - a.unitPrice);
      }
      if (action.payload === 3) {
        state.listProduct.sort((a, b) => a.name.localeCompare(b.name));
      }
      if (action.payload === 4) {
        state.listProduct.sort((a, b) => b.name.localeCompare(a.name));
      }
    },
  },
});
export const {
  getAllProduct,
  getProduct,
  increaseQuantity,
  decreaseQuantity,
  sortProduct,
} = productReducer.actions;
export default productReducer.reducer;
