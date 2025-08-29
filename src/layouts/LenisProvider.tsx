import Lenis from "lenis";
import { useState } from "react";
import { useEffect, useRef, createContext } from "react";

export const LenisContext = createContext(null);

export const LenisProvider = ({ children }) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis();
    lenisRef.current = lenis;

    function raf(time) {
      if (scrollEnabled) {
        lenis.raf(time);
      }

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [scrollEnabled]);
  return (
    <LenisContext.Provider value={{ setScrollEnabled, lenisRef }}>
      {children}
    </LenisContext.Provider>
  );
};
