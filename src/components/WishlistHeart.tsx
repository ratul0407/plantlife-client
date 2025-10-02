import { useGetMeQuery } from "@/redux/features/user.api";
import { useAddWishlistMutation } from "@/redux/features/wishlist/wishlist.api";
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
  const plantData = {
    plantId: plant?._id,
  };
  const handleAddToWishlist = async () => {
    if (!userData) {
      dispatch(addToWishlist(plantData));
      toast.success("Added to wishlist");
      return;
    }

    try {
      const res = await addWishlist({ plantId: plant?._id });
      if (res.success) {
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!userData) {
      dispatch(deleteFromWishlist(plant?._id));
      toast.success("Removed from wishlist");
      return;
    }
    // try {
    //   const res = await removeFromWishlist({ plant: _id }).unwrap();/
    //   if (res.success) {
    //     toast.success(res.message);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
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
