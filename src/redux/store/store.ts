import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import adminSlice from "../slices/adminSlice";
import forgotPasswordSlice from "../slices/forgotPasswordSlice";

const store = configureStore({
  reducer: {
    auth: userSlice,
    adminInfo: adminSlice,
    forgotPassword: forgotPasswordSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
