import { motion } from "motion/react";
import { Link } from "react-router";
import { scale, slide } from "./anim";
export const MyLink = ({ item, index, isActive, setSelectedIndicator }) => {
  console.log(item);
  const { href, title } = item;
  return (
    <motion.div
      className="link"
      onMouseEnter={() => setSelectedIndicator(href)}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
      custom={index}
    >
      <motion.div
        className="indicator"
        variants={scale}
        animate={isActive ? "open" : "closed"}
      ></motion.div>
      <Link to={href}>{title} </Link>
    </motion.div>
  );
};
