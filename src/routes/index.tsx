import { Home } from "../pages/Home";

import { createBrowserRouter, Navigate } from "react-router";
import { ErrorPage } from "@/pages/ErrorPage";
import App from "@/App";
import { Login } from "@/pages/authentication/Login";
import { Register } from "@/pages/authentication/Register";
import { AllPlants } from "@/pages/AllPlants";
import { AllPlantsSection } from "@/components/AllPlants/AllPlantsSection";
import { PlantDetails } from "@/pages/PlantDetails";
import { withAuth } from "@/utils/withAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import { TRole } from "@/types";
import { generateRoute } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
  {
    path: "plants",
    Component: AllPlants,
    children: [
      {
        index: true,
        Component: AllPlantsSection,
      },
      {
        path: "/plants/:id",
        Component: PlantDetails,
      },
    ],
  },
  {
    path: "/register",
    Component: Register,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/admin",
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    children: [
      { index: true, element: <Navigate to="/admin/add-plants" /> },
      ...generateRoute(adminSidebarItems),
    ],
  },
]);
