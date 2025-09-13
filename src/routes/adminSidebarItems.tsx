import { ISidebarItems } from "@/types";
import { Grid2X2 } from "lucide-react";
import { lazy } from "react";
import { PiPlant } from "react-icons/pi";

const AddPlants = lazy(() => import("@/pages/Admin/AddPlants"));
const Overview = lazy(() => import("@/pages/Admin/Overview"));
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
        icon: PiPlant,
      },
    ],
  },
];
