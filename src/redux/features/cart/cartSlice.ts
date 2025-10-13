import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICart {
  plantId: string;
  quantity: number;
  sku: string;
}
interface ICartState {
  open: boolean;
  items: ICart[];
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
    setCart: (state, action: PayloadAction<ICart[]>) => {
      state.items = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    addToCart: (state, action: PayloadAction<ICart>) => {
      const isExists = state.items.find(
        (item) => item.sku === action.payload.sku,
      );
      if (isExists) {
        state.items = state.items.map((item) =>
          item.sku === action.payload.sku
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    deleteFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((plant) => plant.sku !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updatePlantQuantity: (
      state,
      action: PayloadAction<{ sku: string; newQuantity: number }>,
    ) => {
      state.items = state.items.map((item) =>
        item.sku === action.payload.sku
          ? { ...item, quantity: action.payload.newQuantity }
          : item,
      );
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
  },
});

export const {
  openCart,
  addToCart,
  setCart,
  deleteFromCart,
  updatePlantQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
