import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function toggleNav() {
    setIsActive(!isActive);
  }

  const { signout } = useAuth();

  const logout = [
    {
      command: () => signout(),
    },
  ];

  return (
    <section id="header">
      <Link to="/user/dashboard">
        <img src={logo} className="logo" alt="" />
      </Link>
      <div>
        <ul id="navbar" className={isActive ? "active" : ""}>
          <li>
            <Link to="/user/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link id="lg-bag" to="/cart">
              <i className="fas fa-shopping-cart"></i>
            </Link>
          </li>
          <li>
            <Link id="lg-bag" to="/profile">
              <i class="far fa-user"></i>
            </Link>
            {/* <button id="lg-bag" onClick={logout[0].command}>
              <i class="far fa-user"></i>
            </button> */}
          </li>
          <a href="#" id="close" onClick={toggleNav}>
            <i className="fas fa-times"></i>
          </a>
        </ul>
      </div>

      <div id="mobile">
        <Link to="/cart">
          <i className="fas fa-shopping-cart"></i>
        </Link>
        <Link to="/profile">
          <i class="far fa-user"></i>
        </Link>
        {/* <button onClick={logout[0].command}>
          <i class="far fa-user"></i>
        </button> */}
        <a href="#">
          <i id="bar" onClick={toggleNav} className="fas fa-bars"></i>
        </a>
      </div>
    </section>
  );
};

export default Navbar;
