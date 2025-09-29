import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IWishlist {
  items: {
    plantId: string;
    name: string;
    img: string;
    price: number;
    category: string;
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
        img: string;
        price: number;
        category: string;
        name: string;
      }>,
    ) => {
      state.items.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    deleteFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (plant) => plant.plantId !== action.payload,
      );
      console.log(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});
export const { setWishlist, addToWishlist, deleteFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
