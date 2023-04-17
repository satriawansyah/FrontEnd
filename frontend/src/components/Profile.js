import React from "react";
import "./../index.css";
import HeaderUser from "./HeaderUser";
import Sidebar from "./Sidebar";

const Profile = ({ children }) => {
  return (
    <div>
      <HeaderUser />
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default Profile;
