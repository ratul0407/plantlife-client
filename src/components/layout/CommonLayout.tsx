import React from "react";
import Footer from "../Footer";
import NavbarUi from "../NavbarUi";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-roboto">
      <NavbarUi />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
