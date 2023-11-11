import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Apppliance from "./Appliance";
import WeeklyGraph from "./WeeklyGraph";
import MonthlyGraph from "./MonthlyGraph";

export default function Dashboard(props) {
  console.log("Token is:" + localStorage.getItem('token'))
  let navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate("/")
    }
  }, []);
  const {showAlert} = props;
  return (
    <div className="container">
      <Apppliance showAlert={showAlert}/>
      <h3>My Consumption</h3>
      <WeeklyGraph />
      <MonthlyGraph />
      <hr />
    </div>
  );
}
