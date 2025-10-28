import { useAppDispatch } from "@/redux/hooks";
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
} from "../api/cart.api";
import {
  addToCart,
  deleteFromCart,
  updatePlantQuantity,
} from "../slices/cartSlice";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { Plant } from "@/types/plant";

export const useCartActions = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useRemoveFromCartMutation();
  const [addToDatabaseCart] = useAddToCartMutation();

  const handleIncrement = async (sku: string, newQuantity: number) => {
    dispatch(updatePlantQuantity({ sku, newQuantity }));

    if (user) {
      try {
        await updateCart({ newQuantity, sku });
      } catch (error) {
        dispatch(updatePlantQuantity({ sku, newQuantity: newQuantity - 1 }));
      }
    }
  };

  const handleDecrement = async (sku: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(deleteFromCart(sku));
      return;
    }

    dispatch(updatePlantQuantity({ sku, newQuantity }));
    if (user) {
      try {
        await updateCart({ newQuantity, sku });
      } catch (error) {
        dispatch(updatePlantQuantity({ sku, newQuantity: newQuantity + 1 }));
      }
    }
  };

  const handleRemoveFromCart = async (sku: string) => {
    dispatch(deleteFromCart(sku));
    if (user) {
      try {
        await deleteCart({ sku });
      } catch (error) {
        console.log(error);
      }
    }
    toast.info("Plant removed from cart");
  };
  const handleAddToCart = async (
    plant: Plant,
    quantity: number,
    selectedVariant: string,
  ) => {
    const variant = plant?.variants?.find((v) => v.sku === selectedVariant);
    if (!variant) return;
    const item = {
      plantId: plant._id,
      sku: variant.sku,
      quantity: quantity,
    };
    dispatch(addToCart(item));
    toast.success("Plant added to cart");

    if (user) {
      try {
        const res = await addToDatabaseCart(item).unwrap();
        if (res?.success) {
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to add");
      }
    }
  };

  return {
    handleIncrement,
    handleDecrement,
    handleRemoveFromCart,
    handleAddToCart,
  };
};
