import { createSlice } from "@reduxjs/toolkit";

export interface SearchState {
  selectedPlace?: string | null;
  checkInDate?: string | null;
  checkOutDate?: string | null;
  guests?: {
    adults: number;
    children: number;
    childrenAges: number[];
    rooms: number;
  };
}

const loadInitialState = (): SearchState => {
  const savedState = localStorage.getItem("searchData");
  if (savedState) {
    return JSON.parse(savedState);
  }
  return {
    selectedPlace: "",
    checkInDate: null,
    checkOutDate: null,
    guests: {
      adults: 2,
      children: 0,
      childrenAges: [],
      rooms: 1,
    },
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
