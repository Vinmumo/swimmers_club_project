import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">
          Aqua Swimming Club
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link active " aria-current="page" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
            <Link to={`/swimmerslogin`} className="btn ">
            Register
          </Link>
            </li>
            <li className="nav-item">
            <Link to={`/about`} className="btn ">
            About Us
          </Link>
            </li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
