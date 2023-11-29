import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    user: authSlice.reducer,
  },
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
