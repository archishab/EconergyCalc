import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoIcon from "../assets/LogoIcon.png";
import FullLogo from "../assets/FullLogo.png";

export default function Navbar(props) {
  let navigate = useNavigate();
  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };
  let location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  const [recommendations, setRecommendations] = useState([]);
  const [recommendationsCount, setRecommendationsCount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3030/api/appliances/getrecommendations`, {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const recommendationList = response.data.recommendations.filter(rec => rec !== null);
        setRecommendations(recommendationList);
        setRecommendationsCount(recommendationList.length);
      })
      .catch((error) => {
        console.error("Error fetching recommendations:", error);
      });
  });

  return (
    <>
      <nav className="navbar bg-body-tertiary d-flex">
        <div className="container-fluid">
          {localStorage.getItem("token") ? (
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
          ) : (
            <div></div>
          )}
          <div
            className="offcanvas offcanvas-start"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="full-height d-flex flex-column flex-shrink-0 p-3 bg-body-tertiary ">
              <div className="align-items-center">
                <Link className="navbar-brand" to="/dashboard">
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
                    className={`nav-link link-body-emphasis mb-2 ${
                      location.pathname === "/dashboard" ? "active" : ""
                    }`}
                  >
                    <i class="fa-solid fa-chart-simple fa-xl me-2" style={{color: "#000000"}}></i>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/recommendations"
                    className={`nav-link link-body-emphasis mb-2 ${
                      location.pathname === "/recommendations" ? "active" : ""
                    }`}
                  >
                    <i class="fa-solid fa-check-double fa-xl me-2" style={{color: "#000000"}}></i>
                    Recommendations
                    <span class="badge rounded-pill text-bg-danger mx-2">{recommendationsCount}</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/forum"
                    className={`nav-link link-body-emphasis mb-2 ${
                      location.pathname === "/forum" ? "active" : ""
                    }`}
                  >
                    <i class="fa-solid fa-comments fa-xl me-2" style={{color: "#000000"}}></i>
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
                  <i class="fa-solid fa-circle-user fa-2xl me-2" style={{color: "#000000"}}></i>
                  <strong>{localStorage.getItem("username")}</strong>
                </Link>
                <ul
                  className="user-menu dropdown-menu text-small shadow"
                  data-popper-placement="top-star"
                >
                  {/* <li>
                    <Link className="dropdown-item" to="#">
                      Account Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li> */}
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleSignOut}
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    >
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
