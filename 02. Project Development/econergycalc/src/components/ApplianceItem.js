import React, { useContext } from "react";
import ApplianceContext from "../context/appliances/ApplianceContext";

const ApplianceItem = (props) => {
  const context = useContext(ApplianceContext);
  const { deleteAppliance } = context;
  const { appliance, updateAppliance } = props;
  return (
    <div className="col-md-3">
      <div className="card my-2">
        <div className="card-body">
          <h5 className="card-title">{appliance.applianceName}</h5>
          <p className="card-text">
            {appliance.applianceType} - {appliance.powerRating} kWh
          </p>
          <i
            class="fa-solid fa-trash-can mx-2"
            onClick={() => {
              deleteAppliance(appliance._id);
              props.showAlert("Appliance Deleted Successfully", "success");
            }}
          ></i>
          <i
            class="fa-solid fa-pen-to-square mx-2 "
            onClick={() => {
              updateAppliance(appliance);
            }}
          ></i>
          {appliance.active ? (
            <span class="badge bg-success rounded-pill text-end">
              Active
            </span>
          ) : (
            <span class="badge bg-secondary rounded-pill text-end">
              Inactive
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplianceItem;
