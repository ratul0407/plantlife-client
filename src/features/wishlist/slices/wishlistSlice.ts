import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWishlist {
  items: {
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
    setWishlist: (
      state,
      action: PayloadAction<
        {
          plantId: string;
          img: string;
          name: string;
          price: number;
          category: string;
        }[]
      >,
    ) => {
      state.items = action.payload;
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    addToWishlist: (
      state,
      action: PayloadAction<{
        plantId: string;
      }>,
    ) => {
      const exists = state.items.some(
        (item) => item.plantId === action.payload.plantId,
      );

      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.items));
      }
    },
    deleteFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (plant) => plant.plantId !== action.payload,
      );
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.setItem("wishlist", JSON.stringify(state.items));
      1;
    },
  },
});

export const { setWishlist, addToWishlist, deleteFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
