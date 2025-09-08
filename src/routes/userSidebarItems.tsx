import { ISidebarItems } from "@/types";
import { lazy } from "react";

const Wishlist = lazy(() => import("@/pages/user/Wishlist"));
const Cart = lazy(() => import("@/pages/user/Cart"));
const Orders = lazy(() => import("@/pages/user/Orders"));
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
      {
        title: "My Cart",
        url: "/user/cart",
        component: Cart,
      },
      {
        title: "My Orders",
        url: "/user/orders",
        component: Orders,
      },
    ],
  },
];
