import { useAppDispatch } from "@/redux/hooks";
import { addToWishlist, deleteFromWishlist } from "../slices/wishlistSlice";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import {
  useAddWishlistMutation,
  useDeleteWishlistMutation,
} from "../api/wishlist.api";

export const useWishlistActions = () => {
  const [addWishlist] = useAddWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const handleAddToWishlist = async (plantData: { plantId: string }) => {
    dispatch(addToWishlist(plantData));
    toast.success("Added to wishlist");
    if (user) {
      try {
        await addWishlist(plantData).unwrap();
      } catch (error: any) {
        dispatch(deleteFromWishlist(plantData.plantId));
        toast.error(error?.data?.message);
      }
    }
  };
  const handleRemoveFromWishlist = async (plantData: { plantId: string }) => {
    dispatch(deleteFromWishlist(plantData.plantId));
    toast.success("Removed from wishlist");
    if (user) {
      try {
        await deleteWishlist({ plantId: plantData.plantId }).unwrap();
      } catch (error) {
        // await addWishlist(plantData);
      }
    }
  };

  return { handleAddToWishlist, handleRemoveFromWishlist };
};
