import NavbarUi from "@/components/NavbarUi";
import Footer from "@/components/Footer";
import { Outlet } from "react-router";

export const AllPlants = () => {
  return (
    <>
      <div className="relative">
        <NavbarUi />

        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
