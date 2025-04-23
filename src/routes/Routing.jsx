import { BrowserRouter, Routes, Route } from "react-router";

import { Root } from "../layouts/Root";

export const Routing = () => {
  return (
    <BrowserRouter>
      {/* root */}
      <Routes>
        <Route path="/" element={<Root />} />
      </Routes>
    </BrowserRouter>
  );
};
