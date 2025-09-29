import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPlant {
  plantId: string;
  name: string;
  firstImg: string;
  secondImg: string;
  price: number;
}
const savedRecent = localStorage.getItem("recent");
interface IRecent {
  items: IPlant[];
}
const initialState: IRecent = {
  items: savedRecent ? JSON.parse(savedRecent) : [],
};

const recentSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToRecentSlice: (state, action: PayloadAction<IPlant>) => {
      const alreadyIncluded = state.items.find(
        (item) => item.plantId === action.payload.plantId,
      );
      if (alreadyIncluded) {
        state.items = state.items.filter(
          (item) => item.plantId !== action.payload.plantId,
        );
        state.items.push(action.payload);
        return;
      }
      state.items.push(action.payload);
      localStorage.setItem("recent", JSON.stringify(state.items));
    },
  },
});
export const { addToRecentSlice } = recentSlice.actions;
export default recentSlice.reducer;
