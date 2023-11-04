import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import LogoIcon from "../assets/LogoIcon.png";
import FullLogo from "../assets/FullLogo.png";

export default function Navbar() {
  return (
    <>
      <nav className="navbar bg-body-tertiary d-flex">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="full-height d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary ">
              < div className="">
              <Link className="navbar-brand" to="/">
              <img src={FullLogo} alt="Bootstrap" width="300" />
              </Link>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div> 
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li>
                  <Link to="/dashboard" className="nav-link link-body-emphasis">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/add" className="nav-link link-body-emphasis">
                    Add Appliance
                  </Link>
                </li>
                <li>
                  <Link to="/recommendations" className="nav-link link-body-emphasis">
                    Recommendations
                  </Link>
                </li>
                <li>
                  <Link to="/recommendations" className="nav-link link-body-emphasis">
                    Forum
                  </Link>
                </li>
              </ul>
              <hr />
              <div className="dropup">
                <Link
                  to="/"
                  className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt=""
                    width="32"
                    height="32"
                    className="rounded-circle me-2"
                  />
                  <strong>mdo</strong>
                </Link>
                <ul className="user-menu dropdown-menu text-small shadow" data-popper-placement="top-star">
                  <li>
                    <Link className="dropdown-item" to="#">
                      Account Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="#">
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <a className="navbar-brand" href="/">
            <img src={LogoIcon} alt="Bootstrap" width="40" />
          </a>
        </div>
      </nav>
    </>
  );
}

Navbar.propTypes = { title: PropTypes.string };
