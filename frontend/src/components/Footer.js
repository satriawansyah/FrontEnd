import React from "react";
import logo from "../img/logo.png";

const Navbar = () => {
  return (
    <footer className="section-p1">
      <div className="col">
        <img className="logo" src={logo} alt="" />
        <h4>Contact</h4>
        <p>
          <strong>Address:</strong> Jl. xxxxxxxxxxx No.xx
        </p>
        <p>
          <strong>Phone:</strong> +62 8xx-xxxx-xxxx
        </p>
        <p>
          <strong>Hours:</strong> 08:00 - 17:00, Mon - Sat
        </p>
        <div className="follow">
          <h4>Follow Us</h4>
          <div className="icon">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>
      </div>

      <div className="col">
        <h4>About</h4>
        <a href="#">About Us</a>
        <a href="#">Delivery Information</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Contact Us</a>
      </div>

      <div className="col">
        <h4>My Account</h4>
        <a href="#">Sign In</a>
        <a href="#">View Cart</a>
        <a href="#">My Whislist</a>
        <a href="#">Track My Order</a>
        <a href="#">Help</a>
      </div>

      {/* <div className="col install">
        <h4>Install App</h4>
        <p>From App Store or Google Play</p>
        <div className="row">
          <img src="../img/pay/app.jpg" alt="" />
          <img src="../img/pay/play.jpg" alt="" />
        </div>
        <p>Secured Payment Gateways</p>
        <img src="../img/pay/pay.png" alt="" />
      </div> */}

      <div className="copyright">
        <p>&copy; 2023 Company, Inc. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Navbar;
