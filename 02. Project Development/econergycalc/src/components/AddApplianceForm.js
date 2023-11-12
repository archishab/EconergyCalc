import "../App.css";
import React, { useState, useContext } from "react";
import ApplianceContext from "../context/appliances/ApplianceContext";

export default function AddApplianceForm(props) {
  const context = useContext(ApplianceContext);
  const { addAppliance } = context;

  const [appliance, setAppliances] = useState({
    applianceType: "",
    applianceName: "",
    powerRating: "",
    quantity: "",
    active: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addAppliance(
      appliance.applianceType,
      appliance.applianceName,
      appliance.powerRating,
      appliance.quantity,
      appliance.active
    );
    props.showAlert("Appliance Added Successfully", "success")
  };

  const onChange = (e) => {
    setAppliances({ ...appliance, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        class="btn me-1"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal1"
      >
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
                  <button className="btn btn-primary" onClick={handleClick} data-bs-dismiss="modal">
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
