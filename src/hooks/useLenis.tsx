import { LenisContext } from "@/layouts/LenisProvider";
import { useContext } from "react";

export const useLenis = () => {
  const lenis = useContext(LenisContext);
  return lenis;
};
