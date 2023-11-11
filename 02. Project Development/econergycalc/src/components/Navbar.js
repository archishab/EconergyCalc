import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoIcon from "../assets/LogoIcon.png";
import FullLogo from "../assets/FullLogo.png";

export default function Navbar() {
  let navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.clear();
    navigate("/")
  }
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <>
      <nav className="navbar bg-body-tertiary d-flex">
        <div className="container-fluid">
          {localStorage.getItem('token')? <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>:<div></div>}
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="full-height d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary ">
              <div className="">
                <Link className="navbar-brand" to="/">
                  <img src={FullLogo} alt="Bootstrap" width="300" />
                </Link>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <hr />
              <ul className="nav nav-pills flex-column mb-auto">
                <li>
                  <Link
                    to="/dashboard"
                    className={`nav-link link-body-emphasis ${
                      location.pathname === "/dashboard" ? "active" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/add"
                    className={`nav-link link-body-emphasis ${
                      location.pathname === "/add" ? "active" : ""
                    }`}
                  >
                    Add Appliance
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recommendations"
                    className={`nav-link link-body-emphasis ${
                      location.pathname === "/recommendations" ? "active" : ""
                    }`}
                  >
                    Recommendations
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recommendations"
                    className={`nav-link link-body-emphasis ${
                      location.pathname === "/forum" ? "active" : ""
                    }`}
                  >
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
                  <strong>{localStorage.getItem('username')}</strong>
                </Link>
                <ul
                  className="user-menu dropdown-menu text-small shadow"
                  data-popper-placement="top-star"
                >
                  <li>
                    <Link className="dropdown-item" to="#">
                      Account Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item" onClick={handleSignOut} data-bs-dismiss="offcanvas"
                  aria-label="Close">
                      Sign out
                    </button>
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
