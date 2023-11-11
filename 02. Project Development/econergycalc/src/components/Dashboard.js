import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Apppliance from "./Appliance";
import WeeklyGraph from "./WeeklyGraph";
import MonthlyGraph from "./MonthlyGraph";

export default function Dashboard(props) {
  console.log("Token is:" + localStorage.getItem("token"));
  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const [active, setActive] = useState("Weekly");

  const handleClick = (e) => {
    setActive(e.target.value);
  };

  const { showAlert } = props;
  return (
    <div className="container">
      <div className="row my-3">
        <div class="col-5">
          <h3 className="">My Consumption</h3>
        </div>
        <div class="col text-end">
          <div className="btn-group text-center">
            <button
              type="button"
              className={`btn btn-warning ${
                active === "Weekly" ? "active" : ""
              }`}
              value="Weekly"
              onClick={handleClick}
            >
              Weekly
            </button>
            <button
              type="button"
              className={`btn btn-warning ${
                active === "Monthly" ? "active" : ""
              }`}
              value="Monthly"
              onClick={handleClick}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
      {active === "Weekly" ? <WeeklyGraph /> : ""}
      {active === "Monthly" ? <MonthlyGraph /> : ""}
      <hr />
      <Apppliance showAlert={showAlert} />
    </div>
  );
}
