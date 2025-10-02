import { useGetMeQuery } from "@/redux/features/user.api";
import {
  useAddWishlistMutation,
  useDeleteWishlistMutation,
} from "@/redux/features/wishlist/wishlist.api";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/redux/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { toast } from "sonner";

const WishlistHeart = ({ plant }) => {
  const dispatch = useAppDispatch();
  const { data: userData } = useGetMeQuery(undefined);

  const wishlist = useAppSelector((state) => state.wishlist.items);
  let inWishlist = wishlist.find((i) => i?.plantId === plant?._id);

  const [addWishlist] = useAddWishlistMutation();
  const [deleteWishlist] = useDeleteWishlistMutation();
  const plantData = {
    plantId: plant?._id,
  };
  const handleAddToWishlist = async () => {
    dispatch(addToWishlist(plantData));
    toast.success("Added to wishlist");
    if (userData) {
      try {
        const res = await addWishlist(plantData).unwrap();
        console.log(res);
      } catch (error: any) {
        dispatch(deleteFromWishlist(plant?._id));
        toast.error(error?.data?.message);
      }
    }
  };

  const handleRemoveFromWishlist = async () => {
    dispatch(deleteFromWishlist(plant?._id));
    toast.success("Removed from wishlist");
    if (userData) {
      try {
        const res = await deleteWishlist({ plantId: plant?._id }).unwrap();
        console.log(res);
        if (res.success) {
          toast.success(res.message);
        }
      } catch (error) {
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
