import { BrowserRouter, Routes, Route } from "react-router";

import { Root } from "../layouts/Root";
import { AllPlants } from "../pages/AllPlants";

export const Routing = () => {
  return (
    <BrowserRouter>
      {/* root */}
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/all-plants" element={<AllPlants />} />
      </Routes>
    </BrowserRouter>
  );
};
