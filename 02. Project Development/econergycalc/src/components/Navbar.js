import LogoIcon from "../assets/LogoIcon.png";
import FullLogo from "../assets/FullLogo.png";
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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
            <div class="full-height d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary ">
              < div className="">
              <Link className="navbar-brand" to="/">
              <img src={FullLogo} alt="Bootstrap" width="300" />
              </Link>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
              </div> 
              <hr />
              <ul class="nav nav-pills flex-column mb-auto">
                <li class="nav-item">
                  <a href="#" class="nav-link active" aria-current="page">
                    <svg class="bi pe-none me-2" width="16" height="16"></svg>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link link-body-emphasis">
                    <svg class="bi pe-none me-2" width="16" height="16"></svg>
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link link-body-emphasis">
                    <svg class="bi pe-none me-2" width="16" height="16"></svg>
                    Orders
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link link-body-emphasis">
                    <svg class="bi pe-none me-2" width="16" height="16"></svg>
                    Products
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link link-body-emphasis">
                    <svg class="bi pe-none me-2" width="16" height="16"></svg>
                    Customers
                  </a>
                </li>
              </ul>
              <hr />
              <div class="dropdown">
                <a
                  href="#"
                  class="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt=""
                    width="32"
                    height="32"
                    class="rounded-circle me-2"
                  />
                  <strong>mdo</strong>
                </a>
                <ul class="dropdown-menu text-small shadow">
                  <li>
                    <a class="dropdown-item" href="#">
                      New project...
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Profile
                    </a>
                  </li>
                  <li>
                    <hr class="dropdown-divider" />
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Sign out
                    </a>
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
