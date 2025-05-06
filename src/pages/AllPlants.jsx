import { Link, NavLink } from "react-router";
import { AllPlantsSection } from "../components/AllPlants/AllPlantsSection";

export const AllPlants = () => {
  return (
    <div className="space-y-20 p-8">
      <header className="flex justify-between">
        <h3 className="font-metal text-4xl">
          <Link to="/">PlantLife</Link>
        </h3>
        <nav>
          <ul className="flex items-center gap-8 font-semibold">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/all-plants"> All Plants</NavLink>
            <NavLink to="/">About</NavLink>
            <NavLink to="/">Contact</NavLink>
          </ul>
        </nav>
      </header>
      <main>
        <AllPlantsSection />
      </main>
    </div>
  );
};
