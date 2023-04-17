import React from "react";
import "./../style.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Fragment = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Fragment;
