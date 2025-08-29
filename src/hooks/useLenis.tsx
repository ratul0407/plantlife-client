import { useContext } from "react";
import { LenisContext } from "../layouts/LenisProvider";

export const useLenis = () => {
  const lenis = useContext(LenisContext);
  return lenis;
};
