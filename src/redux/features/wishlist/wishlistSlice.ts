import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWishlistState {
  items: string[];
}

const initialState: IWishlistState = {
  items: [],
};

const wishlistState = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setReduxWishlist: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    addToReduxWishlist: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFromReduxWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((id) => id !== action.payload);
    },
  },
});

export const { setReduxWishlist, addToReduxWishlist, removeFromReduxWishlist } =
  wishlistState.actions;
export default wishlistState.reducer;
