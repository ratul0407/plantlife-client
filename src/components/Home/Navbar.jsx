import { Menu } from "./menu/Menu";

export const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between px-10 py-4">
      {/* menu */}
      <Menu />
      {/* logo text */}
      <div>
        <h3 className="font-metal text-2xl font-semibold italic sm:text-3xl">
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
