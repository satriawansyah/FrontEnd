import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const Header = () => {
  const { user } = useAuth();
  return (
    <div id="profile" className="header shadow-1">
      <Link to="/user/dashboard">
        <button className="btn-back">Kembali</button>
      </Link>
      <h1>Profile {user.role}</h1>
    </div>
  );
};

export default Header;
