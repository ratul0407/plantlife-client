import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { Nav } from "./Nav";
import "./menu.css";
export const Menu = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <div className="main">
        <div className="header | relative z-50">
          <button
            className="button | flex h-[80px] w-[80px] cursor-pointer items-center justify-center rounded-full"
            onClick={() => setIsActive(!isActive)}
          >
            <div className={`burger ${isActive ? "burger-active" : ""}`}></div>
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait">{isActive && <Nav />}</AnimatePresence>
    </>
  );
};
