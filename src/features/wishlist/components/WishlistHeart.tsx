import { useAppSelector } from "@/redux/hooks";
import { Plant } from "@/types/plant";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import { useWishlistActions } from "../actions/useWishlistActions";

const WishlistHeart = ({ plant }: { plant: Plant }) => {
  const { handleAddToWishlist, handleRemoveFromWishlist } =
    useWishlistActions();

  const wishlist = useAppSelector((state) => state.wishlist.items);
  let inWishlist = wishlist.some(
    (i) => String(i.plantId) === String(plant._id),
  );
  const plantData = {
    plantId: plant?._id,
  };

  return (
    <>
      {inWishlist ? (
        <IoHeart
          fill={"#c1121f"}
          size={30}
          onClick={() => handleRemoveFromWishlist(plantData)}
        />
      ) : (
        <IoHeartOutline
          size={30}
          onClick={() => handleAddToWishlist(plantData)}
        />
      )}
    </>
  );
};

export default WishlistHeart;
