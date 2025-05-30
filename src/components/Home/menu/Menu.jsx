import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { Nav } from "./Nav";
import "./menu.css";
import { useEffect } from "react";
import { useLenis } from "../../../hooks/useLenis";
export const Menu = () => {
  const [isActive, setIsActive] = useState(false);
  const { lenisRef } = useLenis();
  console.log(lenisRef.current);
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isActive) {
      lenisRef?.current.stop();
    } else {
      lenisRef?.current?.start();
    }
  }, [isActive, lenisRef]);
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
      <AnimatePresence mode="wait">
        {isActive && <Nav closeMenu={() => setIsActive(false)} />}
      </AnimatePresence>
    </>
  );
};
