import { useState } from "react";
import { Menu } from "./menu/Menu";
import { useEffect } from "react";
import { Link } from "react-router";
// import { useAuth } from "../../hooks/useAuth";

export const Navbar = () => {
  // const { user } = useAuth();
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
      className={`sticky top-0 z-50 flex items-center justify-between bg-white/0 p-2 transition-all duration-300 sm:px-10 sm:py-4 ${scrolled ? "bg-white/50 text-black" : "text-white"}`}
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
      <div className="flex items-center gap-2 lg:gap-8">
        <div>
          <button className="sm:text-lg">CART (1)</button>
        </div>
        {/* <div className="hidden sm:block">
          {user ? (
            <p>Helllo , {user.displayName.split(" ")[0]}</p>
          ) : (
            <Link
              to="/login"
              className="cursor-pointer rounded-sm bg-white p-2 text-black shadow-xl transition-all duration-300 hover:bg-black hover:text-white"
            >
              Login
            </Link>
          )}
        </div> */}
      </div>
    </div>
  );
};
