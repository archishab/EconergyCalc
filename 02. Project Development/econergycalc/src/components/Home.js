import React from "react";
import BigLogo from "../assets/BigLogo.png";
import FullLogo from "../assets/FullLogo.png";

import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container text-center">
      <img src={FullLogo} />
      <div class="d-grid gap-2 col-6 mx-auto">
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
          className="btn btn-warning btn-lg"
          tabIndex="1"
          role="button"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}
