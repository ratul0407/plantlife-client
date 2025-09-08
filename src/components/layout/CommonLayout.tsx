import React from "react";
import Footer from "../Footer";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Footer />
    </div>
  );
};

export default CommonLayout;
