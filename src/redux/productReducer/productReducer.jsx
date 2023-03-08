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
  },
});
export const { getAllProduct, getProduct, increaseQuantity, decreaseQuantity } =
  productReducer.actions;
export default productReducer.reducer;
