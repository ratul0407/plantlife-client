import { createBrowserRouter } from "react-router";

import { Root } from "../layouts/Root";
import { AllPlants } from "../pages/AllPlants";
import { PlantDetails } from "../pages/PlantDetails";
import { Home } from "../pages/Home";
import { Component } from "react";
import { AllPlantsSection } from "../components/AllPlants/AllPlantsSection";

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
]);
