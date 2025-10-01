import { ISidebarItems } from "@/types";
import { Grid2X2, Leaf, Sprout, User } from "lucide-react";
import { lazy } from "react";
import { PiPlant } from "react-icons/pi";

const AddPlants = lazy(() => import("@/pages/Admin/AddPlants"));
const Overview = lazy(() => import("@/pages/Admin/Overview"));
const AllUsers = lazy(() => import("@/pages/Admin/AllUsers"));
const AllPlants = lazy(() => import("@/pages/Admin/AllPlants"));
export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/admin/overview",
        component: Overview,
        icon: Grid2X2,
      },
      {
        title: "Add Plants",
        url: "/admin/add-plants",
        component: AddPlants,
        icon: Leaf,
      },
      {
        title: "All Users",
        url: "/admin/all-users",
        component: AllUsers,
        icon: User,
      },
      {
        title: "All Plants",
        url: "/admin/all-plants",
        component: AllPlants,
        icon: Sprout,
      },
    ],
  },
];
