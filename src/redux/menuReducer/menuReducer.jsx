import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  navs: [],
};

const menuReducer = createSlice({
  name: "menuReducer",
  initialState,
  reducers: {
    getNavbars: (state, action) => {
      state.navs = action.payload;
    },
  },
});

export const { getNavbars } = menuReducer.actions;

export default menuReducer.reducer;
