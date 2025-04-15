import React from "react";
import { IoMdMenu } from "react-icons/io";

export const Navbar = () => {
  return (
    <div className="flex justify-between  items-center">
      {/* menu */}
      <button className="flex  items-center gap-2 cursor-pointer">
        <IoMdMenu className="text-white h-8 w-8 sm:w-10 sm:h-10" />
        <p className="font-medium sm:text-lg">Menu</p>
      </button>
      {/* logo text */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-semibold font-charm">
          PlantLife
        </h3>
      </div>
      {/* cart */}
      <div>
        <p className="sm:text-lg">CART (2)</p>
      </div>
    </div>
  );
};
