import { ISidebarItems } from "@/types";
import { lazy } from "react";

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
      },
      {
        title: "Add Plants",
        url: "/admin/add-plants",
        component: AddPlants,
      },
    ],
  },
];
