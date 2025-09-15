import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadWishlistFromStorage = (): string[] => {
  try {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveWishlistToStorage = (items: string[]) => {
  try {
    localStorage.setItem("wishlist", JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save wishlist", err);
  }
};

interface IWishlistState {
  items: string[];
}

const initialState: IWishlistState = {
  items: loadWishlistFromStorage(),
};
const wishlistState = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setReduxWishlist: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
      saveWishlistToStorage(state.items);
    },
    addToReduxWishlist: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
        saveWishlistToStorage(state.items);
      }
    },
    removeFromReduxWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((id) => id !== action.payload);
      saveWishlistToStorage(state.items);
    },
  },
});

export const { setReduxWishlist, addToReduxWishlist, removeFromReduxWishlist } =
  wishlistState.actions;
export default wishlistState.reducer;
