import { Link, NavLink, Outlet } from "react-router";

import { Menu } from "../components/Home/menu/Menu";
import { BsBox, BsCart, BsHeart, BsPerson, BsStar } from "react-icons/bs";
import { useAuth } from "../hooks/useAuth";
import { FaCaretDown } from "react-icons/fa";

export const AllPlants = () => {
  const { user } = useAuth();
  return (
    <>
      <div className="relative">
        <header className="sticky top-0 left-0 z-50 flex items-center justify-between bg-white px-8 py-6 shadow-xl">
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
          <div className="relative flex cursor-pointer flex-row-reverse items-center gap-6 md:flex-row md:gap-2">
            <div className="md:group md:rounded-full md:border md:border-slate-300 md:p-0.5 md:px-3">
              <div className="hidden items-center justify-center gap-3 md:flex">
                <p className="text-gray-600">
                  Hi, {user?.displayName.split(" ").pop()}
                </p>

                <FaCaretDown className="text-slate-600" />
              </div>
              <div className="group flex h-8 w-8 items-center justify-center rounded-full bg-green-800 text-white md:hidden">
                {user?.displayName[0]}
              </div>

              {/* drop down */}
              <div className="absolute top-6 -left-12 hidden w-44 rounded-xl bg-white py-3 opacity-0 shadow-xl group-hover:opacity-100 md:block">
                <ul className="flex flex-col text-gray-800 *:flex *:items-center *:gap-2 *:px-4 *:py-2 *:hover:bg-gray-100 *:hover:text-green-800">
                  <li>
                    <span>
                      <BsPerson />
                    </span>
                    My Profile
                  </li>
                  <li>
                    <BsHeart />
                    WishList
                  </li>
                  <li>
                    <BsCart />
                    Cart
                  </li>
                  <li>
                    <BsBox />
                    orders
                  </li>
                  <li>
                    <BsStar />
                    Reviews
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <BsCart className="h-5 w-5 text-gray-600" />
              <span className="absolute -top-3 -right-4.5 rounded-full bg-green-800 px-2 text-white">
                1
              </span>
            </div>
          </div>

          {/* mobile nav */}

          {/* <div className="block md:hidden"> */}
          {/* <Menu /> */}
          {/* </div> */}
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};
