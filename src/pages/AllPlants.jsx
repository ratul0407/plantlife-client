import React from "react";
import { Menu } from "../components/Home/menu/Menu";
import { Link, NavLink } from "react-router";

export const AllPlants = () => {
  return (
    <div>
      <header className="flex justify-between p-8">
        <h3 className="font-metal text-4xl">
          <Link to="/">PlantLife</Link>
        </h3>
        <nav>
          <ul className="flex items-center gap-8 font-semibold">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/"> All Plants</NavLink>
            <NavLink to="/">About</NavLink>
            <NavLink to="/">Contact</NavLink>
          </ul>
        </nav>
      </header>
    </div>
  );
};
