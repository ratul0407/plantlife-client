import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWishlist {
  items: string[];
}
const initialState: IWishlist = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    addToWishlist: (state, action: PayloadAction<string>) => {
      state.items.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    deleteFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((plant) => plant !== action.payload);
      console.log(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});
export const { setWishlist, addToWishlist, deleteFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
