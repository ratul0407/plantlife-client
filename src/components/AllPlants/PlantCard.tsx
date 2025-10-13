import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { BsCart } from "react-icons/bs";

import AddToCartModal from "../AddToCartModal";

import WishlistHeart from "../WishlistHeart";

export const PlantCard = ({ plant, wishSet, variantImages }: any) => {
  const { name } = plant;

  const navigate = useNavigate();

  const addToCartVariants = {
    initial: { bottom: "-2.5rem", opacity: 0 },
    hover: { bottom: 0, opacity: 1 },
  };

  const whishListVariants = {
    initial: { opacity: 0, right: "-2.5rem" },
    hover: { opacity: 1, right: "1rem" },
  };

  return (
    <div className="overflow-hidden rounded-xl bg-white p-4 shadow-sm xl:max-w-xs">
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
              className="absolute left-1/2 z-20 flex w-full -translate-x-1/2 items-center justify-center gap-2 rounded-b-xl bg-black py-1.5 text-center text-white uppercase"
            >
              <BsCart /> Add to cart
            </motion.button>
          </AddToCartModal>

          {/* wishlist */}
          <motion.button
            variants={whishListVariants}
            className="absolute top-4 cursor-pointer"
          >
            <WishlistHeart plant={plant} />
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
