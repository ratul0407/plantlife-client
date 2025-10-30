import React, { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Navbar";
import Chat from "@/features/chat/Chat";
import Loader from "../shared/Loader";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 800);
    };

    if (document.readyState === "complete") handleLoad();
    else window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="font-roboto relative">
          <Navbar />
          <main>{children}</main>
          {/* <Chat /> */}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CommonLayout;
