import { Link, NavLink } from "react-router";
import { AllPlantsSection } from "../components/AllPlants/AllPlantsSection";
import { IoMenu } from "react-icons/io5";

export const AllPlants = () => {
  return (
    <div className="space-y-20 p-8">
      <header className="flex items-center justify-between">
        <h3 className="font-metal text-4xl">
          <Link to="/">PlantLife</Link>
        </h3>
        {/*  desktop namv */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-8 font-semibold">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/all-plants"> All Plants</NavLink>
            <NavLink to="/">About</NavLink>
            <NavLink to="/">Contact</NavLink>
          </ul>
        </nav>

        {/* mobile nav */}

        <div>
          <IoMenu className="h-12 w-12" />
        </div>
      </header>
      <main>
        <AllPlantsSection />
      </main>
    </div>
  );
};
