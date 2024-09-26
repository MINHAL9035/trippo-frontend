import { createSlice } from "@reduxjs/toolkit";

const storedHotelId = localStorage.getItem("hotelId");

const initialState = {
  hotelId: storedHotelId ? JSON.parse(storedHotelId) : null,
};

const hotelSlice = createSlice({
  name: "hotel",
  initialState,
  reducers: {
    setHotelId: (state, action) => {
      state.hotelId = action.payload;
      localStorage.setItem("hotelId", JSON.stringify(action.payload));
    },
    clearHotelId: (state) => {
      state.hotelId = "";
      localStorage.removeItem("hotelId");
    },
  },
});

export const { setHotelId, clearHotelId } = hotelSlice.actions;
export default hotelSlice.reducer;
