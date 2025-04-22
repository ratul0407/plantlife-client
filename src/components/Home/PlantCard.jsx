// eslint-disable-next-line no-unused-vars
import { animate, motion } from "motion/react";

export const PlantCard = ({ plant }) => {
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
  const infoVariants = {
    initial: {
      bottom: "1rem",
    },
    hover: {
      bottom: "2rem",
    },
  };
  return (
    <motion.div
      whileHover="hover"
      initial="initial"
      className="relative mx-auto max-w-72 cursor-pointer overflow-y-hidden"
    >
      {plant.new && (
        <p className="absolute top-2 left-2 bg-black px-2 py-1 text-white">
          NEW!
        </p>
      )}
      <div className="font-medium uppercase">
        <motion.p variants={infoVariants} className="absolute bottom-2 left-2">
          {plant.name}
        </motion.p>
        <motion.p variants={infoVariants} className="absolute right-2 bottom-2">
          ${plant.price}.00
        </motion.p>
      </div>
      <motion.p
        variants={addToCartVariants}
        className={`absolute -bottom-10 left-1/2 w-full -translate-x-1/2 bg-black py-1.5 text-center text-white uppercase underline`}
      >
        Add to cart{" "}
      </motion.p>
      <img src={plant.img} className="min-h-full object-cover" />
    </motion.div>
  );
};
