import { ISidebarItems } from "@/types";
import { lazy } from "react";

const AddPlants = lazy(() => import("@/pages/Admin/AddPlants"));
export const adminSidebarItems: ISidebarItems[] = [
  {
    title: "Dashboard",
    url: "#",
    items: [
      {
        title: "Add Plants",
        url: "/admin/add-plants",
        component: AddPlants,
      },
    ],
  },
];
