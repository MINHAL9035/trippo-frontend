import { createSlice } from "@reduxjs/toolkit";

const storedEmail = localStorage.getItem("email");
const storedOwnerInfo = localStorage.getItem("ownerInfo");

const initialState = {
  email: storedEmail ? JSON.parse(storedEmail) : null,
  ownerInfo: storedOwnerInfo ? JSON.parse(storedOwnerInfo) : null,
  isOtpVerified: false,
};

const hotelOwnerSlice = createSlice({
  name: "hotelOwner",
  initialState,
  reducers: {
    setOwnerEmail: (state, action) => {
      state.email = action.payload;
      localStorage.setItem("email", JSON.stringify(action.payload));
    },
    clearOwnerEmail: (state) => {
      state.email = null;
      localStorage.removeItem("email");
    },
    setOtpVerified: (state, action) => {
      state.isOtpVerified = action.payload;
    },
    setOwnerInfo: (state, action) => {
      state.ownerInfo = action.payload;
      localStorage.setItem("ownerInfo", JSON.stringify(action.payload));
    },
    ownerLogout: (state) => {
      state.ownerInfo = null;
      localStorage.removeItem("ownerInfo");
    },
  },
});

export const {
  setOwnerEmail,
  clearOwnerEmail,
  setOtpVerified,
  setOwnerInfo,
  ownerLogout,
} = hotelOwnerSlice.actions;
export default hotelOwnerSlice.reducer;
