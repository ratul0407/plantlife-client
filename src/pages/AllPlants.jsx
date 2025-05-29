import { Link, NavLink, Outlet } from "react-router";
import { IoMenu } from "react-icons/io5";
import { Menu } from "../components/Home/menu/Menu";

export const AllPlants = () => {
  return (
    <>
      <div className="relative p-8">
        <header className="flex items-center justify-between">
          <h3 className="font-metal text-4xl">
            <Link to="/">PlantLife</Link>
          </h3>
          {/*  desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 font-semibold">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/all-plants"> All Plants</NavLink>
              <NavLink to="/">About</NavLink>
              <NavLink to="/">Contact</NavLink>
            </ul>
          </nav>

          {/* mobile nav */}

          <div className="block md:hidden">
            <Menu />
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
