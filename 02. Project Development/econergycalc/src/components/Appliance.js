import React, { useContext, useEffect, useRef, useState } from "react";
import ApplianceContext from "../context/appliances/ApplianceContext";
import ApplianceItem from "./ApplianceItem";
import AddApplianceForm from "./AddApplianceForm";

export default function Appliance() {
  const context = useContext(ApplianceContext);
  const { appliances, getAppliance, editAppliance } = context;
  useEffect(() => {
    getAppliance();
  }, []);

  const ref = useRef(null);

  const [appliance, setAppliances] = useState({
    id: "",
    eapplianceType: "",
    eapplianceName: "",
    epowerRating: "",
    equantity: "",
    eactive: "",
  });

    
  const updateAppliance = (currentAppliance) => {
    ref.current.click();
    setAppliances({id: currentAppliance._id, eapplianceType: currentAppliance.applianceType, eapplianceName: currentAppliance.applianceName, epowerRating: currentAppliance.powerRating, equantity: currentAppliance.quantity, eactive: currentAppliance.active});
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log("Updating the appliance...", appliance)
    editAppliance(appliance.id, appliance.eapplianceType, appliance.eapplianceName, appliance.epowerRating, appliance.equantity, appliance.eactive)
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
                  <input
                    type="text"
                    className="form-control"
                    onChange={onChange}
                    id="eapplianceType"
                    name="eapplianceType"
                    value={appliance.eapplianceType}
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
                    id="eapplianceName"
                    name="eapplianceName"
                    value={appliance.eapplianceName}
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
                    id="epowerRating"
                    name="epowerRating"
                    value={appliance.epowerRating}
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
                    id="equantity"
                    name="equantity"
                    value={appliance.equantity}
                  />
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
                  <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                    Cancel
                  </button>

                  <button className="btn btn-primary" onClick={handleClick} data-bs-dismiss="modal">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
 
      <div className="row my-3">
        <div class="col-5">
          <h3 className="">My Appliances</h3>
        </div>
        <div class="col"></div>

        <div class="col text-end">
          <AddApplianceForm heading="Add new Appliance" />
        </div>
      </div>
      <div div className="row my-3">
        {appliances.map((appliance) => {
          return (
            <ApplianceItem
              key={appliance.id}
              updateAppliance={updateAppliance}
              appliance={appliance}
            />
          );
        })}
      </div>
    </>
  );
}
