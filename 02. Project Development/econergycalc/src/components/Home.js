import React from "react";
import BigLogo from "../assets/BigLogo.png";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div class="container my-5">
        <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
          <div class="col-lg-4 p-0 overflow-hidden">
            <img
              class="d-block mx-auto"
              src={BigLogo}
              alt="EconergyCalc"
              width="300"
            />
          </div>
          <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
            <h1 class="display-4 fw-bold lh-1 text-body-emphasis">
              EconergyCalc
            </h1>
            <p class="lead">
              Quickly design and customize responsive mobile-first sites with
              Bootstrap, the world’s most popular front-end open source toolkit,
              featuring Sass variables and mixins, responsive grid system,
              extensive prebuilt components, and powerful JavaScript plugins.
            </p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
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
