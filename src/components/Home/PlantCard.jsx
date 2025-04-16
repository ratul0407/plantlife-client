import { motion } from "motion/react";
export const PlantCard = ({ plant }) => {
  console.log(plant.new);
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5, ease: "easeIn", delay: 0.1 * plant.id }}
      className="relative mx-auto max-w-72"
    >
      {plant.new && (
        <p className="absolute top-2 left-2 bg-black px-2 py-1 text-white">
          NEW!
        </p>
      )}
      <div className="font-medium uppercase">
        <p className="absolute bottom-2 left-2">{plant.name}</p>
        <p className="absolute right-2 bottom-2">${plant.price}.00</p>
      </div>
      <img src={plant.img} className="min-h-full object-cover" />
    </motion.div>
  );
};
