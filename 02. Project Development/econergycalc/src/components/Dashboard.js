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
    <>
      <div className="container align-items-center">
        <Apppliance showAlert={showAlert} />

        <div class="my-5 p-3 bg-body rounded shadow">
          <h3 class="d-flex justify-content-between border-bottom pb-3 mb-0">
            My Consumption
            <div className="btn-group text-center shadow">
              <button
                type="button"
                className={`btn btn-warning ${
                  active === "Weekly" ? "active" : ""
                }`}
                value="Weekly"
                onClick={handleClick}
              >
                {active === "Weekly" ? (<i class="fa-solid fa-calendar-week fa-xl me-2" style={{color: "#ffffff"}}></i>) : (<i class="fa-solid fa-calendar-week fa-xl me-2" style={{color: "#000000"}}></i>)}
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
                {active === "Monthly" ? (<i class="fa-solid fa-calendar-days fa-xl me-2" style={{color: "#ffffff"}}></i>) : (<i class="fa-solid fa-calendar-days fa-xl me-2" style={{color: "#000000"}}></i>)}
                Monthly
              </button>
            </div>
          </h3>

          <div class="d-flex text-body-secondary pt-3">
            {active === "Weekly" ? <WeeklyGraph /> : ""}
            {active === "Monthly" ? <MonthlyGraph /> : ""}
            <div div className="row row-cols-1 row-cols-md-3 g-4 my-3"></div>
          </div>
        </div>
      </div>
    </>
  );
}
