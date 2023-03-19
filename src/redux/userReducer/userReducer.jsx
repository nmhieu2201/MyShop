import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../../util/config";

const initialState = {
  user: settings.getCookieJson("user") ?? {},
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = { ...action.payload };
      settings.setCookieJson("user", state.user, 30);
    },
  },
});

export const { login } = userReducer.actions;

export default userReducer.reducer;
