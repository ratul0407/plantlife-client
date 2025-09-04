import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { BsCart } from "react-icons/bs";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
export const PlantCard = ({ plant }: any) => {
  const { name, img, price, _id, second_img } = plant;
  const [addToWishList, setAddToWishList] = useState(false);
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
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      className="relative max-w-3xs overflow-hidden bg-white p-4 xl:max-w-xs"
    >
      <div className="relative rounded-xl">
        <div
          onClick={() => {
            navigate(`/plants/${plant?._id}`);
          }}
          className="group relative h-72 w-full cursor-pointer overflow-hidden rounded-xl"
        >
          <img
            src={img}
            alt="ZZ Plant"
            className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />

          <img
            src={second_img}
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
          onClick={() => setAddToWishList(!addToWishList)}
          variants={whishListVariants}
          className="absolute top-4 cursor-pointer"
        >
          {addToWishList ? (
            <IoHeart fill={"#c1121f"} size={30} />
          ) : (
            <IoHeartOutline size={30} />
          )}
        </motion.button>
      </div>
      <div className="mt-4 mb-2 flex flex-col justify-between">
        <span className="text-base font-bold text-green-900">${price}</span>
        <h2 className="text-base font-semibold text-gray-800">{name}</h2>
      </div>
    </motion.div>
  );
};
