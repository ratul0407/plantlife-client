import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartState {
  open: boolean;
  items: string[];
}
const initialState: ICartState = {
  open: false,
  items: [],
};
const cartSlice = createSlice({
  name: "cartOpen",
  initialState,
  reducers: {
    openCart: (state, action) => {
      state.open = action.payload;
    },
    addItems: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
    },
  },
});

export const { openCart } = cartSlice.actions;
export default cartSlice.reducer;
