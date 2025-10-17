import { useAuth } from "@/hooks/useAuth";
import {
  useAddWishlistMutation,
  useDeleteWishlistMutation,
} from "@/features/wishlist/api/wishlist.api";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/features/wishlist/slices/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Plant } from "@/types/plant";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { toast } from "sonner";

const WishlistHeart = ({ plant }: { plant: Plant }) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  const wishlist = useAppSelector((state) => state.wishlist.items);
  let inWishlist = wishlist.some(
    (i) => String(i.plantId) === String(plant._id),
  );

  const [addWishlist] = useAddWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();
  const plantData = {
    plantId: plant?._id,
  };
  const handleAddToWishlist = async () => {
    dispatch(addToWishlist(plantData));
    toast.success("Added to wishlist");
    if (user) {
      try {
        await addWishlist(plantData).unwrap();
      } catch (error: any) {
        dispatch(deleteFromWishlist(plant?._id));
        toast.error(error?.data?.message);
      }
    }
  };

  const handleRemoveFromWishlist = async () => {
    dispatch(deleteFromWishlist(plant?._id));
    toast.success("Removed from wishlist");
    if (user) {
      try {
        await deleteWishlist({ plantId: plant?._id }).unwrap();
      } catch (error) {
        // await addWishlist(plantData);
        console.log(error);
      }
    }
  };
  return (
    <>
      {inWishlist ? (
        <IoHeart
          fill={"#c1121f"}
          size={30}
          onClick={handleRemoveFromWishlist}
        />
      ) : (
        <IoHeartOutline size={30} onClick={handleAddToWishlist} />
      )}
    </>
  );
};

export default WishlistHeart;
