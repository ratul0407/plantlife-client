import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
};
const cartSlice = createSlice({
  name: "cartOpen",
  initialState,
  reducers: {
    openCart: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { openCart } = cartSlice.actions;
export default cartSlice.reducer;
