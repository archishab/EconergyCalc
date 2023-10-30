import "./App.css";
import Navbar from "./components/Navbar.js";
import AddApplianceForm from "./components/AddApplianceForm.js";
import Recommendations from "./components/Recommendations.js";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="wrapper">
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/login"
              element={<Login heading="Login"/>}
            />
            <Route
              exact
              path="/signup"
              element={<SignUp heading="Sign Up"/>}
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
            <Route
              exact
              path="/add"
              element={<AddApplianceForm heading="Add New Appliance" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
