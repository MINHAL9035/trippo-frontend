import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import adminSlice from "../slices/adminSlice";
import forgotPasswordSlice from "../slices/forgotPasswordSlice";
import hotelOwnerSlice from "../slices/hotelOwnerSlice";
import hotelSlice from "../slices/hotelSlice";
import searchSlice from "../slices/searchSlice";

const store = configureStore({
  reducer: {
    auth: userSlice,
    adminInfo: adminSlice,
    forgotPassword: forgotPasswordSlice,
    hotelOwner: hotelOwnerSlice,
    hotel: hotelSlice,
    search: searchSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
