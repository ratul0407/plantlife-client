import { useState } from "react";
import { Menu } from "./menu/Menu";
import { useEffect } from "react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 400;
      if (isScrolled != scrolled) {
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const gotoPreviousState = () => {
      const atTop = window.scrollY < 112;
      if (atTop) {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", gotoPreviousState);
    return () => window.removeEventListener("scroll", gotoPreviousState);
  }, []);
  return (
    <div
      className={`sticky top-0 z-50 flex items-center justify-between bg-white/0 px-10 py-4 transition-all duration-300 ${scrolled ? "bg-white/50 text-black" : "text-white"}`}
    >
      {/* menu */}
      <Menu />
      {/* logo text */}
      <div>
        <h3 className="font-metal text-2xl font-semibold italic sm:text-3xl">
          PlantLife
        </h3>
      </div>
      {/* cart */}
      <div>
        <p className="sm:text-lg">CART (2)</p>
      </div>
    </div>
  );
};
