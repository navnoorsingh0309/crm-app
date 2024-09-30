// From Redux

import { configureStore } from "@reduxjs/toolkit";
import idReducer from "./features/idSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const reduxStore = configureStore({
  reducer: {
    id: idReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;

// Custom hooks for use in components
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default reduxStore;
