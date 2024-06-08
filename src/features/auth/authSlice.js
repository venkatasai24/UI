import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: null,
  accessToken: null,
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.email = action.payload.email;
      state.accessToken = action.payload.accessToken;
    },
    logOut: (state, action) => {
      state.email = null;
      state.accessToken = null;
    },
  },
});

export const { setAuth, logOut } = auth.actions;

export default auth.reducer;
