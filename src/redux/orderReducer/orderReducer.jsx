import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: [],
};

const orderReducer = createSlice({
  name: "orderReducer",
  initialState,
  reducers: {
    order: (state, action) => {
      state.order.push(action.payload);
    },
  },
});

export const { order } = orderReducer.actions;

export default orderReducer.reducer;
