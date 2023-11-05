import "../App.css";
import React, { useState, useContext } from "react";
import ApplianceContext from "../context/appliances/ApplianceContext";

export default function AddApplianceForm(props) {
  const context = useContext(ApplianceContext);
  const { addAppliance } = context;

  const [appliance, setAppliances] = useState({applianceType: "", applianceName: "", powerRating: "", quantity: "", active: "true"})

  const handleClick = (e) => {
    e.preventDefault();
    addAppliance(appliance.applianceType, appliance.applianceName, appliance.powerRating, appliance.quantity, appliance.active)
  };
  
  const onChange = (e) => {
    setAppliances({...appliance, [e.target.name]: e.target.value})
  }
  
  return (
    <div className="container form my-5">
      <h3>{props.heading}</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="applianceType" className="form-label">
            Appliance Type
          </label>
          {/* <select className="form-select" aria-label="Default select example" onChange={onChange}>
            <option defaultValue>Select Appliance Type</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="Stove">Stove</option>
            <option value="Dishwasher">Dishwasher</option>
          </select> */}
          <input
            type="text"
            className="form-control"
            onChange={onChange}
            id="applianceType"
            name="applianceType"
          />
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
          />
        </div>
        <div className="mb-3">
          <label htmlFor="UsageDuration" className="form-label">
            Usage Duration
          </label>
          <input
            type="number"
            className="form-control"
            onChange={onChange}
            id="UsageDuration"
            name="UsageDuration"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            onChange={onChange}
            id="quantity"
            name="quantity"
          />
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" className="btn btn-primary">
            Cancel
          </button>

          <button className="btn btn-primary" onClick={handleClick}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}
