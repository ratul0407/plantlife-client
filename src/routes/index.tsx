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
import { userSidebarItems } from "./userSidebarItems";
import About from "@/pages/About";

import { lazy } from "react";

const Checkout = lazy(() => import("@/pages/Checkout"));
export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/checkout",
        Component: Checkout,
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
  {
    path: "/user",
    Component: withAuth(DashboardLayout, role.user as TRole),
    children: [
      {
        index: true,
        element: <Navigate to="/user/wishlist" />,
      },
      ...generateRoute(userSidebarItems),
    ],
  },
]);
