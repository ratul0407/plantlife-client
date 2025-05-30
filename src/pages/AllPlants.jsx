import { Link, NavLink, Outlet } from "react-router";

import { BsBox, BsCart, BsHeart, BsPerson, BsStar } from "react-icons/bs";
import { MdClose, MdLogout, MdOutlineCancel } from "react-icons/md";
import { useAuth } from "../hooks/useAuth";
import { FaCaretDown } from "react-icons/fa";
import { useState } from "react";

export const AllPlants = () => {
  const { user, logOut } = useAuth();
  const [openProfileBar, setOpenProfileBar] = useState(false);
  return (
    <>
      <div className="relative">
        <header className="sticky top-0 left-0 z-50 flex items-center justify-between bg-white px-8 py-6 shadow-sm">
          <h3 className="font-metal text-4xl">
            <Link to="/">PlantLife</Link>
          </h3>
          {/*  desktop nav */}
          <nav className="hidden md:block">
            <ul className="flex items-center gap-8 font-semibold">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/plants"> All Plants</NavLink>
              <NavLink to="/">About</NavLink>
              <NavLink to="/">Contact</NavLink>
            </ul>
          </nav>
          {/* menu container */}
          <div className="flex cursor-pointer flex-row-reverse items-center gap-6 md:relative md:flex-row md:gap-8">
            {/* menu */}
            <div>
              {/* menu open button for mobile */}
              <div className="block md:hidden">
                {user ? (
                  <button
                    onClick={() => setOpenProfileBar(true)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-green-800 text-white"
                  >
                    {user?.displayName[0]}
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="cursor-pointer rounded-sm bg-slate-100 px-3 py-2 text-black shadow-xl"
                  >
                    Login
                  </Link>
                )}

                {/* menu for mobile */}
                <div
                  className={`absolute top-0 right-0 z-[100] min-h-screen w-60 bg-white ${openProfileBar ? "block" : "hidden"}`}
                >
                  <p className="flex items-center justify-between bg-green-800 px-2 py-3 text-white">
                    Hi, {user?.displayName}
                    <button onClick={() => setOpenProfileBar(false)}>
                      <MdClose className="h-6 w-6 rounded-full border p-0.5" />
                    </button>
                  </p>
                  <ul className="flex h-full flex-col bg-white text-gray-800 *:flex *:items-center *:gap-2 *:bg-white *:px-4 *:py-4">
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
                    <li
                      onClick={logOut}
                      className="absolute bottom-0 text-red-500"
                    >
                      <MdLogout />
                      Log out
                    </li>
                  </ul>
                </div>
              </div>
              {/* menu for desktop */}
              <div className={`${user ? "group" : ""}`}>
                {/* menu open button for desktop */}
                {user ? (
                  <div className="hidden items-center justify-center gap-3 md:flex md:rounded-full md:border md:border-slate-300 md:p-0.5 md:px-3">
                    <p className="text-gray-600">
                      Hi, {user?.displayName.split(" ").pop()}
                    </p>

                    <FaCaretDown className="text-slate-600" />
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="hidden cursor-pointer items-center gap-2 rounded-sm bg-white p-2 text-black shadow-xl transition-all duration-300 hover:bg-black hover:text-white md:flex"
                  >
                    <span>
                      <BsPerson />
                    </span>
                    Login
                  </Link>
                )}

                {/* drop down for desktop */}
                <div className="absolute top-6 -left-12 hidden w-44 rounded-xl bg-white py-3 shadow-xl transition-opacity duration-300 group-hover:block">
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
                    <li onClick={logOut} className="text-red-500">
                      <MdLogout />
                      Log out
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* cart */}
            <div className="relative">
              <BsCart className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-3 -right-4.5 rounded-full bg-green-800 px-2 text-white">
                1
              </span>
            </div>
          </div>
        </header>
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};
