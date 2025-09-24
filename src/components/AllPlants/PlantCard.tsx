import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { BsCart } from "react-icons/bs";

import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useGetMeQuery } from "@/redux/features/user.api";
import { toast } from "sonner";
import AddToCartModal from "../AddToCartModal";
import { useAppSelector } from "@/redux/hooks";
import {
  useAddToWishlistMutation,
  useRemovePlantFromWishlistMutation,
} from "@/redux/features/wishlist/wishlist.api";

export const PlantCard = ({ plant, wishSet, variantImages }: any) => {
  const wishlist = useAppSelector((state) => state.wishlist.items);

  const { name, _id } = plant;
  const { data: userData } = useGetMeQuery(undefined);
  let inWishlist = wishlist.includes(plant?._id);

  const [addToWishList] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemovePlantFromWishlistMutation();
  const navigate = useNavigate();

  const addToCartVariants = {
    initial: { bottom: "-2.5rem", opacity: 0 },
    hover: { bottom: 0, opacity: 1 },
  };

  const whishListVariants = {
    initial: { opacity: 0, right: "-2.5rem" },
    hover: { opacity: 1, right: "1rem" },
  };

  const handleAddToWishlist = async () => {
    if (!userData) {
      toast.success("Added to wishlist");
      return;
    }
    try {
      const res = await addToWishList({ plant: _id }).unwrap();
      if (res.success) {
        toast.success("Added to wishlist");
      }
    } catch (error: any) {
      toast.error(error?.data?.message);
    }
  };

  const handleRemoveFromWishlist = async () => {
    if (!userData) {
      toast.success("Removed from wishlist");
      return;
    }
    try {
      const res = await removeFromWishlist({ plant: _id }).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="overflow-hidden bg-white xl:max-w-xs">
      <div className="relative rounded-xl">
        {/* motion wrapper ONLY on image container */}
        <motion.div
          initial="initial"
          whileHover="hover"
          className="group relative h-72 w-full cursor-pointer overflow-hidden rounded-xl"
        >
          {/* images */}
          <img
            onClick={() => {
              navigate(`/plants/${plant?._id}`, { state: wishSet });
            }}
            src={variantImages[0]}
            alt={name}
            className="mx-auto h-72 w-72 rounded-xl object-cover transition-opacity duration-500 group-hover:opacity-0 sm:h-full sm:w-full"
          />
          <img
            onClick={() => {
              navigate(`/plants/${plant?._id}`, { state: wishSet });
            }}
            src={variantImages[1]}
            alt={`${name} alternate`}
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
          />

          <AddToCartModal plant={plant}>
            <motion.button
              variants={addToCartVariants}
              className="absolute left-1/2 z-50 flex w-full -translate-x-1/2 items-center justify-center gap-2 rounded-b-xl bg-black py-1.5 text-center text-white uppercase"
            >
              <BsCart /> Add to cart
            </motion.button>
          </AddToCartModal>

          {/* wishlist */}
          <motion.button
            variants={whishListVariants}
            className="absolute top-4 cursor-pointer"
          >
            {inWishlist ? (
              <IoHeart
                fill={"#c1121f"}
                size={30}
                onClick={handleRemoveFromWishlist}
              />
            ) : (
              <IoHeartOutline size={30} onClick={handleAddToWishlist} />
            )}
          </motion.button>
        </motion.div>
      </div>

      {/* name + price */}
      <div className="mt-4 mb-2 flex flex-col justify-between">
        <span className="text-base font-bold text-green-900">
          ${plant?.variants?.[0].price}
        </span>
        <h2 className="text-base font-semibold text-gray-800">{name}</h2>
      </div>
    </div>
  );
};
