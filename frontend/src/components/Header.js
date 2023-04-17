import React from "react";
import { useAuth } from "../auth/useAuth";

const Header = () => {
  const { user } = useAuth();
  return (
    <div className="header shadow-1">
      <h1>Dashboard {user.role}</h1>
    </div>
  );
};

export default Header;
