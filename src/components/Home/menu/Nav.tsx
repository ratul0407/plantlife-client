import { motion } from "motion/react";
import { useState } from "react";
import { useLocation } from "react-router";
import { MyLink } from "./MyLink";
import { Curve } from "./Curve";
import { menuSlide } from "./anim";
import { useAuth } from "@/hooks/useAuth";

export const Nav = ({ closeMenu }) => {
  const { pathname } = useLocation();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
  const { user } = useAuth();

  const userRole = user?.role;

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
      title: "blogs",
      href: "/blogs",
    },
    userRole?.admin === "admin" && {
      title: "Dashboard",
      href: "/admin",
    },
  ];
  return (
    <motion.div
      className="menu | bg-nav fixed top-0 left-0 z-150 h-screen text-white"
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
                closeMenu={closeMenu}
                key={index}
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
