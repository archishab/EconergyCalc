import "./App.css";
import Navbar from "./components/Navbar.js";
import AddApplianceForm from "./components/AddApplianceForm.js";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Recommendations from "./components/Recommendations";
import ApplianceState from "./context/appliances/ApplianceState";
import Alert from "./components/Alert.js";

function App() {
  //localStorage.setItem('token', null)
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2000);
    }
  
  return (
    <>
      <ApplianceState>
        <BrowserRouter>
          <div className="wrapper">
            <Navbar />
            <Alert alert={alert}/>
            <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login heading="Login" showAlert={showAlert}/>} />
              <Route
                exact
                path="/signup"
                element={<SignUp heading="Sign Up" showAlert={showAlert}/>}
              />
              <Route
                exact
                path="/recommendations"
                element={<Recommendations />}
              />
              <Route exact path="/dashboard" element={<Dashboard showAlert={showAlert}/>} />
            </Routes>
            </div>
          </div>
        </BrowserRouter>
        </ApplianceState>
    </>
  );
}

export default App;
