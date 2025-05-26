import { useEffect } from "react";
import { Home } from "../pages/Home";
import Lenis from "lenis";

export const Root = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  return <Home />;
};
