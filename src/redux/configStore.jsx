import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer/productReducer";
import menuReducer from "./menuReducer/menuReducer";
import cartReducer from "./cartReducer/cartReducer";
export const store = configureStore({
  reducer: {
    productReducer,
    menuReducer,
    cartReducer
  },
});
