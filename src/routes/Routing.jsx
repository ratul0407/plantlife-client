import { createBrowserRouter } from "react-router";

import { Root } from "../layouts/Root";
import { AllPlants } from "../pages/AllPlants";
import { PlantDetails } from "../pages/PlantDetails";
import { Home } from "../pages/Home";
import { Component } from "react";
import { AllPlantsSection } from "../components/AllPlants/AllPlantsSection";

// <BrowserRouter>
//   {/* root */}
//   <Routes>
//     <Route path="/" element={<Root />} />
//     <Route path="/all-plants" element={<AllPlants />} />
//     <Route path="/plant/:id" element={<PlantDetails />} />
//   </Routes>
// </BrowserRouter>
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
