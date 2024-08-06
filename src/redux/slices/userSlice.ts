import { createSlice } from "@reduxjs/toolkit";

const storedUserInfo = localStorage.getItem("userInfo");

const initialState = {
  userInfo: storedUserInfo ? JSON.parse(storedUserInfo) : null,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
  },
});

export const {setUserInfo} = userSlice.actions;
export default userSlice.reducer;
