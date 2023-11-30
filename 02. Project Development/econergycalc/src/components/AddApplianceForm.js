import React, { useState, useContext } from "react";
import axios from "axios";
import ApplianceContext from "../context/appliances/ApplianceContext";

export default function AddApplianceForm(props) {
  const context = useContext(ApplianceContext);
  const { addAppliance } = context;
  const [modelNumber, setModelNumber] = useState("");

  const [appliance, setAppliances] = useState({
    applianceType: "",
    applianceName: "",
    powerRating: "",
    energyStarCompliant: "",
    active: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addAppliance(
      appliance.applianceType,
      appliance.applianceName,
      appliance.powerRating,
      appliance.energyStarCompliant,
      appliance.active
    );
    props.showAlert("Appliance Added Successfully", "success");
  };

  const onChange = (e) => {
    setAppliances({ ...appliance, [e.target.name]: e.target.value });
  };

  const fetchApplianceData = async () => {
    if (modelNumber) {
      try {
        const response = await axios.get(
          `http://localhost:3030/api/appliances/findappliance/${modelNumber}`
        );
        if (response.data) {
          console.log("API Response:", response.data);
          setAppliances({
            ...appliance,
            applianceType: response.data["Appliance Type"],
            applianceName: `${response.data.Brand} - ${response.data["Appliance Type"]}`,
            powerRating:
              response.data["Total Annual Energy Consumption (kWh/year)"], 
            energyStarCompliant: true,
          });
          console.log("Updated State:", appliance); 
        }
      } catch (error) {
        console.error("Error fetching appliance data", error);
        setAppliances({
          ...appliance,
          applianceType: "",
          applianceName: "",
          powerRating: "",
          energyStarCompliant: "",
          active: "",
        });
      }
    }
  };

  const onModelNumberChange = (e) => {
    setModelNumber(e.target.value);
  };

  const onSearchClick = (e) => {
    e.preventDefault();
    fetchApplianceData();
  };

  return (
    <>
      <button
        type="button"
        class="btn me-1 shadow"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
      >
        <i class="fa-solid fa-plus fa-xl me-2" style={{color: "#000000"}}></i>
        Add New Appliance
      </button>
      <div
        class="modal fade text-start"
        id="exampleModal1"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {props.heading}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form>
              <div class="modal-body">
                <div className="mb-3">
                  <label htmlFor="modelNumber" className="form-label">
                    Model Number
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      onChange={onModelNumberChange}
                      value={modelNumber}
                      id="modelNumber"
                      name="modelNumber"
                      placeholder="Enter Model Number"
                    />
                    <button className="btn btn-primary" onClick={onSearchClick}>
                      Search
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="applianceType" className="form-label">
                    Appliance Type
                  </label>
                  <select
                    className="form-select"
                    id="applianceType"
                    name="applianceType"
                    onChange={onChange}
                    value={appliance.applianceType}
                  >
                    <option>Select Appliance Type</option>
                    <option value="Clothes Dryer">Clothes Dryer</option>
                    <option value="Clothes Washer-Dryer">Clothes Washer-Dryer</option>
                    <option value="Clothes Washer">Clothes Washer</option>
                    <option value="Cooktop">Cooktop</option>
                    <option value="Dishwasher">Dishwasher</option>
                    <option value="Freezer">Freezer</option>
                    <option value="Microwave Oven">Microwave Oven</option>
                    <option value="Oven">Oven</option>
                    <option value="Refrigerator">Refrigerator</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="applianceName" className="form-label">
                    Appliance Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={onChange}
                    id="applianceName"
                    name="applianceName"
                    value={appliance.applianceName}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="powerRating" className="form-label">
                    Power Rating
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={onChange}
                    id="powerRating"
                    name="powerRating"
                    value={appliance.powerRating}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="energyStarCompliant" className="form-label">
                    Energy Star Compliant?
                  </label>
                  <select
                    className="form-select"
                    id="energyStarCompliant"
                    name="energyStarCompliant"
                    aria-label="Default select example"
                    onChange={onChange}
                    value={appliance.energyStarCompliant}
                  >
                    <option>Select a value</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="active" className="form-label">
                    Currently in use?
                  </label>
                  <select
                    className="form-select"
                    id="active"
                    name="active"
                    aria-label="Default select example"
                    onChange={onChange}
                  >
                    <option>Select a value</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>
              <div class="modal-footer">
                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    className="btn btn-primary"
                    onClick={handleClick}
                    data-bs-dismiss="modal"
                  >
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
