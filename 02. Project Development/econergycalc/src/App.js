// import LogoIcon from './assets/LogoIcon.png';
// import Logo from './assets/Logo.png';
import "./App.css";
import Navbar from "./components/Navbar.js";
import AddApplianceForm from "./components/AddApplianceForm.js";
import Recommendations from "./components/Recommendations.js";
import React from "react";
// import { BrowserRouter as Routes, Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom"; 

function App() {
  return (
    <>
    <BrowserRouter> {/* renamed from Router to BrowserRouter */}
    <Navbar />
      <div>
        <Routes>
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/add" element={
            <div className="container my-5 px-5">
              <AddApplianceForm heading="Add New Appliance" />
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  </>
  );
}

export default App;
