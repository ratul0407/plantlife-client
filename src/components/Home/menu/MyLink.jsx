import { motion } from "motion/react";
import { Link } from "react-router";
import { scale, slide } from "./anim";
export const MyLink = ({ item, index, isActive, setSelectedIndicator }) => {
  const { href, title } = item;
  return (
    <motion.div
      className="link | relative flex items-center"
      onMouseEnter={() => setSelectedIndicator(href)}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
      custom={index}
    >
      <motion.div
        className="indicator | absolute -left-[30px] h-[10px] w-[10px] rounded-full bg-white"
        variants={scale}
        animate={isActive ? "open" : "closed"}
      ></motion.div>
      <Link className="white font-light" to={href}>
        {title}{" "}
      </Link>
    </motion.div>
  );
};
