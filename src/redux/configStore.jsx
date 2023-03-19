import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productReducer/productReducer";
import cartReducer from "./cartReducer/cartReducer";
import orderReducer from "./orderReducer/orderReducer";
import userReducer from "./userReducer/userReducer";
export const store = configureStore({
  reducer: {
    productReducer,
    cartReducer,
    orderReducer,
    userReducer
  },
});
