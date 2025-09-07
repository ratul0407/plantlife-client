import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { BsCart } from "react-icons/bs";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import {
  useAddToWishlistMutation,
  useGetMeQuery,
} from "@/redux/features/user.api";
import { toast } from "sonner";
export const PlantCard = ({ plant, wishSet, variantImages }: any) => {
  const { name, _id } = plant;
  const { data: userData } = useGetMeQuery(undefined);
  console.log(userData, "from plant card component");
  const alreadyInWishlist = wishSet.has(_id);
  console.log(alreadyInWishlist);
  const [addedToWishlist, setAddedToWishlist] = useState(alreadyInWishlist);

  const [addToWishList] = useAddToWishlistMutation();

  const navigate = useNavigate();
  const addToCartVariants = {
    initial: {
      bottom: "-2.5rem", // -bottom-10
      opacity: 0,
    },
    hover: {
      bottom: 0, // bottom-4
      opacity: 1,
    },
  };

  const whishListVariants = {
    initial: {
      opacity: 0,
      right: "-2.5rem",
    },
    hover: {
      opacity: 1,
      right: "1rem",
    },
  };

  const handleAddToWishlist = async () => {
    if (!userData) {
      navigate("/login");
      return;
    }
    setAddedToWishlist(true);
    try {
      const res = await addToWishList({ plant: _id }).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  };
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="relative max-w-3xs overflow-hidden bg-white p-4 xl:max-w-xs"
    >
      <div className="relative rounded-xl">
        <div
          onClick={() => {
            navigate(`/plants/${plant?._id}`, { state: wishSet });
          }}
          className="group relative h-72 w-full cursor-pointer overflow-hidden rounded-xl"
        >
          <img
            src={variantImages[0]}
            alt="ZZ Plant"
            className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />

          <img
            src={variantImages[1]}
            alt="ZZ Plant Alternate"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
          />
        </div>
        <motion.button
          onClick={() => console.log("I was clicked")}
          variants={addToCartVariants}
          className={`absolute left-1/2 z-50 flex w-full -translate-x-1/2 cursor-pointer items-center justify-center gap-2 rounded-b-xl bg-black py-1.5 text-center text-white uppercase`}
        >
          <BsCart /> Add to cart{" "}
        </motion.button>

        <motion.button
          variants={whishListVariants}
          className="absolute top-4 cursor-pointer"
        >
          {addedToWishlist ? (
            <IoHeart fill={"#c1121f"} size={30} />
          ) : (
            <IoHeartOutline size={30} onClick={handleAddToWishlist} />
          )}
        </motion.button>
      </div>
      <div className="mt-4 mb-2 flex flex-col justify-between">
        <span className="text-base font-bold text-green-900">
          ${plant?.variants?.[0].price}
        </span>
        <h2 className="text-base font-semibold text-gray-800">{name}</h2>
      </div>
    </motion.div>
  );
};
