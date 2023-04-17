import React from "react";
import "./../index.css";
import Header from "./Header";
import Sidebar from "./Sidebar";

const MainPage = ({ children }) => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default MainPage;
