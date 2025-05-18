import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  userData: {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    updateQuantity(state, action) {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setUserData } =
  cartSlice.actions;
export default cartSlice.reducer;