import { Link, NavLink, Outlet } from "react-router";

import { BsBox, BsCart, BsHeart, BsPerson, BsStar } from "react-icons/bs";
import { MdClose, MdLogout, MdOutlineCancel } from "react-icons/md";
import { useState, useEffect } from "react";

import { useLenis } from "@/hooks/useLenis";
import { useGetMeQuery } from "@/redux/features/user.api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { authApi, useLogOutMutation } from "@/redux/features/auth.api";
import { useDispatch } from "react-redux";

export const AllPlants = () => {
  const { data, isLoading } = useGetMeQuery(undefined);
  const [logOut] = useLogOutMutation();
  const user = data?.data;
  const dispatch = useDispatch();
  const [openProfileBar, setOpenProfileBar] = useState(false);
  const { lenisRef } = useLenis();
  useEffect(() => {
    if (openProfileBar) {
      lenisRef?.current?.stop();
    } else {
      lenisRef?.current?.start();
    }
  }, [openProfileBar]);

  const handleLogOut = async () => {
    await logOut(undefined);
    dispatch(authApi.util.resetApiState());
  };
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
                {true ? (
                  <button
                    onClick={() => setOpenProfileBar(true)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-green-800 text-white"
                  >
                    {!isLoading && user?.name?.[0].toUpperCase()}
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
                  className={`absolute top-0 right-0 z-[100] min-h-screen w-60 border-l border-slate-200 bg-white shadow-sm ${openProfileBar ? "block" : "hidden"}`}
                >
                  <p className="flex items-center justify-between bg-green-800 px-2 py-3 text-white">
                    {/* Hi, {user?.displayName} */}
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
                    {/* <li
                      onClick={logOut}
                      className="absolute bottom-0 text-red-500"
                    >
                      <MdLogout />
                      Log out
                    </li> */}
                  </ul>
                </div>
              </div>
              {/* menu for desktop */}
              {!user ? (
                <Link to="/login" className="flex items-center gap-2">
                  <User size={20} className="text-gray-500" />
                  <p>Login</p>
                </Link>
              ) : (
                <div
                  onMouseEnter={() => setOpenProfileBar(true)}
                  onMouseLeave={() => setOpenProfileBar(false)}
                >
                  <Avatar>
                    <AvatarImage src={user?.picture} />
                    <AvatarFallback>{user?.name[0]}</AvatarFallback>
                  </Avatar>
                  {/* drop down for desktop */}
                  <div
                    className={`absolute top-6 right-0 w-44 rounded-xl bg-white py-3 shadow-xl duration-300 group-hover:block ${!openProfileBar && "hidden"}`}
                  >
                    <ul className="flex flex-col text-gray-800 *:flex *:items-center *:gap-2 *:px-4 *:py-2 *:hover:bg-gray-100 *:hover:text-green-800">
                      <li>
                        <span>
                          <BsPerson />
                        </span>
                        My Profile
                      </li>
                      <li>
                        <Link
                          className="flex items-center gap-2"
                          to="/user/wishlist"
                        >
                          <BsHeart />
                          WishList
                        </Link>
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
                      <li onClick={handleLogOut} className="text-red-500">
                        <MdLogout />
                        Log out
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            {/* cart */}
            <div className="relative">
              <BsCart className="h-6 w-6 text-gray-600" />
              <span className="absolute -top-3 -right-4.5 rounded-full bg-green-800 px-2 text-white"></span>
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
