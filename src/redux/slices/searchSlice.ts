import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
  destination: string;
  checkIn: string | null;
  checkOut: string | null;
  rooms: number;
  adults: number;
  children: number[];
}

const loadInitialState = (): SearchState => {
  const savedState = localStorage.getItem("searchData");
  if (savedState) {
    return JSON.parse(savedState);
  }
  return {
    destination: "",
    checkIn: null,
    checkOut: null,
    rooms: 1,
    adults: 2,
    children: [],
  };
};

const searchSlice = createSlice({
  name: "search",
  initialState: loadInitialState(),
  reducers: {
    setSearchData: (state, action) => {
      const newState = { ...state, ...action.payload };
      localStorage.setItem("searchData", JSON.stringify(newState));
      return newState;
    },
  },
});
export const { setSearchData } = searchSlice.actions;
export default searchSlice.reducer;
