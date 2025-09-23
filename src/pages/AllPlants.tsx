import NavbarUi from "@/components/NavbarUi";
import Footer from "@/components/Footer";
import { Outlet } from "react-router";

export const AllPlants = () => {
  return (
    <>
      <div className="relative">
        <NavbarUi />

        <main className="sm:p-8">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};
