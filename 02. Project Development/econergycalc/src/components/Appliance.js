import React, { useContext, useEffect, useRef, useState } from "react";
import ApplianceContext from "../context/appliances/ApplianceContext";
import ApplianceItem from "./ApplianceItem";
import AddApplianceForm from "./AddApplianceForm";
import { Link, useNavigate } from "react-router-dom";
import ApplianceTracker from "./ApplianceTracker";

export default function Appliance(props) {
  const context = useContext(ApplianceContext);
  const { appliances, getAppliance, editAppliance } = context;
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      getAppliance();
    } else {
      navigate("/");
    }
  }, []);

  const ref = useRef(null);

  const [appliance, setAppliances] = useState({
    id: "",
    eapplianceType: "",
    eapplianceName: "",
    epowerRating: "",
    eenergyStarCompliant: "",
    eactive: "",
  });

  const updateAppliance = (currentAppliance) => {
    ref.current.click();
    setAppliances({
      id: currentAppliance._id,
      eapplianceType: currentAppliance.applianceType,
      eapplianceName: currentAppliance.applianceName,
      epowerRating: currentAppliance.powerRating,
      eenergyStarCompliant: currentAppliance.energyStarCompliant,
      eactive: currentAppliance.active,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Updating the appliance...", appliance);
    editAppliance(
      appliance.id,
      appliance.eapplianceType,
      appliance.eapplianceName,
      appliance.epowerRating,
      appliance.eenergyStarCompliant,
      appliance.eactive
    );
    props.showAlert("Appliance updated successfully", "success");
  };

  const onChange = (e) => {
    setAppliances({ ...appliance, [e.target.name]: e.target.value });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Appliance
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
                  <select
                    className="form-select"
                    id="applianceType"
                    name="applianceType"
                    onChange={onChange}
                    value={appliance.eapplianceType}
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
                    id="eapplianceName"
                    name="eapplianceName"
                    value={appliance.eapplianceName}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="powerRating" className="form-label">
                  Energy Consumption (kWh / year)
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={onChange}
                    id="epowerRating"
                    name="epowerRating"
                    value={appliance.epowerRating}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="active" className="form-label">
                    Energy Star Compliant? <i class="fa-solid fa-circle-question fa-lg" style={{color: "#3F7E44"}}></i>
                  </label>
                  <select
                    className="form-select"
                    id="eenergyStarCompliant"
                    name="eenergyStarCompliant"
                    aria-label="Default select example"
                    onChange={onChange}
                    value={appliance.eenergyStarCompliant}
                  >
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
                    id="eactive"
                    name="eactive"
                    aria-label="Default select example"
                    onChange={onChange}
                    value={appliance.eactive}
                  >
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
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <AddApplianceForm
        heading="Add new Appliance"
        showAlert={props.showAlert}
      />
      <ApplianceTracker />

      <div class="my-3 p-3 bg-body rounded shadow">
        <div class="d-flex justify-content-between border-bottom pb-3 mb-0">
          <h3>My Appliances</h3>
          <div>
            <i class="fa-solid fa-leaf me-2" style={{ color: "#3f7e44" }}></i>-
            Energy Effecient <br />
            <i
              class="fa-solid fa-circle-exclamation me-2"
              style={{ color: "#ad0b0b" }}
            ></i>
            - Not Energy Effecient
          </div>
        </div>
        <div class="d-flex text-body-secondary pt-3">
        {appliances.length > 0 ? ( <div></div> ) : (<p><strong>No appliance added yet</strong></p>)}
        <div className="row row-cols-1 row-cols-md-3 g-4 my-3">
        {appliances.map((appliance) => {
              return (
                <ApplianceItem
                  key={appliance.id}
                  updateAppliance={updateAppliance}
                  appliance={appliance}
                  showAlert={props.showAlert}
                />
              );
            })}
            </div>
        </div>
      </div>
    </>
  );
}
