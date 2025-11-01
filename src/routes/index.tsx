import { Home } from "../pages/Home";

import { createBrowserRouter, Navigate } from "react-router";
import { ErrorPage } from "@/pages/ErrorPage";
import App from "@/App";
import { Login } from "@/pages/authentication/Login";
import { Register } from "@/pages/authentication/Register";
import { AllPlants } from "@/pages/AllPlants";
import { AllPlantsSection } from "@/components/AllPlants/AllPlantsSection";
import { withAuth } from "@/utils/withAuth";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import { TRole } from "@/types";
import { generateRoute } from "@/utils/generateRoutes";
import { adminSidebarItems } from "./adminSidebarItems";

import { lazy } from "react";
import Orders from "@/pages/user/Orders";
import allPlantsLoader from "./allPlantsLoader";

const Checkout = lazy(() => import("@/pages/Checkout"));
const About = lazy(() => import("@/pages/About"));
const PlantDetails = lazy(() => import("@/pages/PlantDetails"));
const Profile = lazy(() => import("@/features/profile/Profile"));
const Wishlist = lazy(() => import("@/features/wishlist/pages/Wishlist"));

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
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/wishlist",
        Component: Wishlist,
      },
      {
        path: "/orders",
        Component: Orders,
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
            path: ":id",
            Component: PlantDetails,
          },
          {
            path: "*",
            Component: ErrorPage,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
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
