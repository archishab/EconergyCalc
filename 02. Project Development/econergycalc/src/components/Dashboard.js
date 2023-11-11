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

  const handleClick = async (e) => {
    localStorage.setItem('graph-type', e.targ)
  }
  const { showAlert } = props;
  return (
    <div className="container">
      <h3>My Consumption</h3>
      <div class="container text-center">
        <div class="row justify-content-center">
          <div class="col">
            <div class="btn-group text-center">
              <button type="button" class="btn btn-primary" value="Weekly" onClick={handleClick}>
                Weekly
              </button>
              <button type="button" class="btn btn-primary" value="Monthly" onClick={handleClick}>
                Monthly
              </button>
            </div>
          </div>
        </div>
      </div>
      <WeeklyGraph />
      <MonthlyGraph />
      <hr />
      <Apppliance showAlert={showAlert} />
    </div>
  );
}
