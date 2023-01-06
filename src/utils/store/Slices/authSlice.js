import { createSlice } from "@reduxjs/toolkit";

let initialState = null;

if (localStorage.getItem("jwt"))
  initialState = JSON.parse(localStorage.getItem("jwt"));
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createUser: (state, action) => {
      return (state = action.payload);
    },
    destroyUser: (state, action) => {
      return (state = null);
    },
  },
});

export const { createUser, destroyUser } = authSlice.actions;
export default authSlice.reducer;
