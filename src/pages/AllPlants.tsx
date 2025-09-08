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
import { Cart } from "@/components/Cart";
import NavbarUi from "@/components/NavbarUi";

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
        <NavbarUi />

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </>
  );
};
