import React, { useContext } from "react";
import BigLogo from "../assets/BigLogo.png";

import { Link } from "react-router-dom";

export default function Home() {
  console.log("Token is:" + localStorage.getItem('token'))
  return (
    <>
      <div className="container my-5">
        <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div className="col-lg-4 p-0 overflow-hidden">
            <img
              className="d-block mx-auto"
              src={BigLogo}
              alt="EconergyCalc"
              width="300"
            />
          </div>
          <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 className="fw-bold lh-1 text-body-emphasis">
            Household Energy Consumption Calculator
            </h1>
            <p className="lead">
              EconergyCalc is an interactive web application where users can add or log the electrical appliances they use regularly in their household and receive their total energy consumption. The application will also provide users with weekly/yearly energy consumption predictions and give actionable recommendations, such as providing more sustainable or eco-friendly alternatives for appliances that use more energy than they should.
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
              <Link
                to="/login"
                className="btn btn-warning btn-lg"
                tabIndex="1"
                role="button"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="btn btn-outline-warning btn-lg"
                tabIndex="1"
                role="button"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
