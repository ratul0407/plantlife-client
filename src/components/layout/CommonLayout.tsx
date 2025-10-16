import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-roboto">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
