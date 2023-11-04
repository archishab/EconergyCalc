import "./App.css";
import Navbar from "./components/Navbar.js";
import AddApplianceForm from "./components/AddApplianceForm.js";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Recommendations from "./components/Recommendations";
import ApplianceState from "./context/appliances/ApplianceState";

function App() {
  return (
    <>
      <ApplianceState>
        <BrowserRouter>
          <div className="wrapper">
            <Navbar />
            <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login heading="Login" />} />
              <Route
                exact
                path="/signup"
                element={<SignUp heading="Sign Up" />}
              />
              <Route
                exact
                path="/recommendations"
                element={<Recommendations />}
              />
              <Route
                exact
                path="/add"
                element={<AddApplianceForm heading="Add New Appliance" />}
              />
              <Route exact path="/dashboard" element={<Dashboard />} />
            </Routes>
            </div>
          </div>
        </BrowserRouter>
        </ApplianceState>
    </>
  );
}

export default App;
