import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWishlist {
  items: {
    userId: string;
    plantId: string;
  }[];
}
const initialState: IWishlist = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (
      state,
      action: PayloadAction<{ userId: string; plantId: string }>,
    ) => {
      state.items.push(action.payload);
    },
  },
});
export const { addToWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
