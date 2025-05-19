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
    href: "/plants",
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
      className="menu | fixed top-0 left-0 z-40 h-screen bg-[#386641] text-white"
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className="body | flex h-full flex-col justify-between p-20 lg:p-[100px]">
        <div
          className="nav | mt-20 flex flex-col gap-10 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
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
