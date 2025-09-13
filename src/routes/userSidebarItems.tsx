import { ISidebarItems } from "@/types";
import { Box, Heart, ShoppingCart } from "lucide-react";
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
        icon: Heart,
      },
      {
        title: "My Cart",
        url: "/user/cart",
        component: Cart,
        icon: ShoppingCart,
      },
      {
        title: "My Orders",
        url: "/user/orders",
        component: Orders,
        icon: Box,
      },
    ],
  },
];
