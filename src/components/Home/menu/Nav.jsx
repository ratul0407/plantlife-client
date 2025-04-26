import { motion } from "motion/react";
import { useState } from "react";
import { useLocation } from "react-router";
import { MyLink } from "./MyLink";
import { Curve } from "./Curve";
import { menuSlide } from "./anim";
const navItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "All Plants",
    href: "/all-plants",
  },
  {
    title: "About Us",
    href: "/about",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
];
export const Nav = () => {
  const { pathname } = useLocation();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  return (
    <motion.div
      className="menu"
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className="body">
        <div
          className="nav"
          onMouseLeave={() => setSelectedIndicator(pathname)}
        >
          {navItems.map((item, index) => {
            return (
              <MyLink
                item={item}
                index={index}
                isActive={selectedIndicator === item.href}
                setSelectedIndicator={setSelectedIndicator}
              />
            );
          })}
        </div>
      </div>
      <Curve />
    </motion.div>
  );
};
