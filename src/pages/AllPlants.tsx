import { useLenis } from "@/hooks/useLenis";

import NavbarUi from "@/components/NavbarUi";
import Footer from "@/components/Footer";
import { Outlet } from "react-router";

export const AllPlants = () => {
  const { lenisRef } = useLenis();

  return (
    <>
      <div className="relative">
        <NavbarUi />

        <main className="p-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
