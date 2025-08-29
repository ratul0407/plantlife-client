import { Home } from "../pages/Home";

import { createBrowserRouter } from "react-router";
import { ErrorPage } from "@/pages/ErrorPage";
import App from "@/App";
import { Login } from "@/pages/authentication/Login";

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
  // {
  //   path: "plants",
  //   Component: AllPlants,
  //   children: [
  //     {
  //       index: true,
  //       Component: AllPlantsSection,
  //     },
  //     {
  //       path: "/plants/:id",
  //       Component: PlantDetails,
  //     },
  //   ],
  // },
  // {
  //   path: "/signup",
  //   Component: SignUp,
  // },
  {
    path: "/login",
    Component: Login,
  },
]);
