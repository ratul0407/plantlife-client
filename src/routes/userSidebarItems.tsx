import { ISidebarItems } from "@/types";
import { lazy } from "react";

const Wishlist = lazy(() => import("@/pages/user/Wishlist"));
export const userSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "My Wishlist",
        url: "/user/wishlist",
        component: Wishlist,
      },
    ],
  },
];
