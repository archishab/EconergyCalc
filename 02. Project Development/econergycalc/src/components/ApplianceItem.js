import React, { useContext }  from "react";
import ApplianceContext from "../context/appliances/ApplianceContext";

const ApplianceItem = (props) => {
  const context = useContext(ApplianceContext);
  const{ deleteAppliance } = context;
  const { appliance, updateAppliance } = props;
  return (
    <div className="col-md-3">
      
      
      {/* {appliance.powerRating}
      {appliance.usageDuration}
      {appliance.quantity}
      {appliance.active} */}

      <div className="card my-2">
        {/* <img src={PlaceHolderImage} className="card-img-top" alt="..." /> */}
        <div className="card-body">
          <h5 className="card-title">{appliance.applianceName}</h5>
          <p className="card-text">
          {appliance.applianceType} - {appliance.powerRating}
          </p>
          <i class="fa-solid fa-trash-can mx-2" onClick={()=>{deleteAppliance(appliance._id); props.showAlert("Appliance Deleted Successfully", "success")}}></i>
          <i class="fa-solid fa-pen-to-square mx-2 " onClick={()=>{updateAppliance(appliance)}}></i>
        </div>
      </div>
    </div>
  );
};

export default ApplianceItem;
