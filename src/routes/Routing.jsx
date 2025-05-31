import { Root } from "../layouts/Root";
import { AllPlants } from "../pages/AllPlants";
import { PlantDetails } from "../pages/PlantDetails";
import { Home } from "../pages/Home";
import { AllPlantsSection } from "../components/AllPlants/AllPlantsSection";
import { SignUp } from "../pages/authentication/SignUp";
import { Login } from "../pages/authentication/Login";
import { createBrowserRouter } from "react-router";
import { ErrorPage } from "../pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
    errorElement: <ErrorPage />,
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
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/login",
    Component: Login,
  },
]);
