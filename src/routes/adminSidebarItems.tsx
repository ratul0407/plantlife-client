import AddPlants from "@/pages/Admin/AddPlants";
import { ISidebarItems } from "@/types";

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
