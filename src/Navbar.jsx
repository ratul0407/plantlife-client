import { IoMdMenu } from "react-icons/io";

export const Navbar = () => {
  return (
    <div className="flex items-center justify-between">
      {/* menu */}
      <button className="flex cursor-pointer items-center gap-2">
        <IoMdMenu className="h-8 w-8 text-white sm:h-10 sm:w-10" />
        <p className="font-medium sm:text-lg">Menu</p>
      </button>
      {/* logo text */}
      <div>
        <h3 className="font-simonetta text-2xl font-semibold italic sm:text-3xl">
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
