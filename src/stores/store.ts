import { configureStore } from "@reduxjs/toolkit";
import navReducer from "@/stores/navSlice";
import windowSlice from "@/stores/windowSlice";

export const store = configureStore({
  reducer: {
    navState: navReducer,
    window: windowSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
