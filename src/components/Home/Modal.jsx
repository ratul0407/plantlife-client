import { motion } from "motion/react";
import { useRef } from "react";
import img1 from "../../assets/cactus.jpg";
const scaleAnimation = {
  initial: {
    scale: 0,
    x: "-50%",
    y: "-50%",
  },
  enter: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 1] },
  },
};
export const Modal = ({ modal, stores }) => {
  const { active, index } = modal;

  const modalContainer = useRef(null);
  return (
    <motion.div
      ref={modalContainer}
      variants={scaleAnimation}
      initial="initial"
      animate={active ? "enter" : "exit"}
      className="pointer-events-none absolute flex h-[350px] w-[400px] items-center justify-center overflow-hidden border-2 border-red-500 bg-white"
    >
      <div
        style={{ top: index * -100 + "%" }}
        className="absolute h-full w-full transition-[top] ease-[cubic-bezier(0.76,0,0.24,1)]"
      >
        {stores.map((store, index) => {
          const { src, color } = store;
          return (
            <div
              className="flex min-h-full w-full items-center justify-center"
              style={{ backgroundColor: color }}
            >
              <img
                className="h-auto max-h-[300px] object-cover"
                src={src}
                alt="image"
                width={300}
                height={0}
              />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
