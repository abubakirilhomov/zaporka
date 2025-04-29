
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from "./slices/AuthSlice"
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});