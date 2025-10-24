import React from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Chat from "@/features/chat/Chat";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="font-roboto relative">
      <Navbar />
      <main>{children}</main>
      <Chat />
      <Footer />
    </div>
  );
};

export default CommonLayout;
