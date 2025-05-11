import { Link, NavLink } from "react-router";
import { AllPlantsSection } from "../components/AllPlants/AllPlantsSection";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";

export const AllPlants = () => {
  const [overlay, setOverlay] = useState(false);
  console.log(overlay);
  return (
    <>
      <div className="relative space-y-20 p-8">
        <header className="flex items-center justify-between">
          <h3 className="font-metal text-4xl">
            <Link to="/">PlantLife</Link>
          </h3>
          {/*  desktop nav */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-8 font-semibold">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/all-plants"> All Plants</NavLink>
              <NavLink to="/">About</NavLink>
              <NavLink to="/">Contact</NavLink>
            </ul>
          </nav>

          {/* mobile nav */}

          <div className="block md:hidden">
            <IoMenu className="h-12 w-12" />
          </div>
        </header>
        <main>
          <AllPlantsSection setOverlay={setOverlay} />
        </main>
      </div>
      {/* overlay */}
      <div
        className={`${overlay ? "block" : "hidden"} overlay | absolute top-0 z-10 min-h-screen min-w-full cursor-pointer bg-black/20`}
      ></div>
    </>
  );
};
