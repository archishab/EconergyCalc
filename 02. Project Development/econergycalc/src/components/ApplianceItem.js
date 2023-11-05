import React from "react";
import PlaceHolderImage from "../assets/PlaceHolderImage.jpg";
import { Link } from "react-router-dom";

const ApplianceItem = (props) => {
  const { appliance } = props;
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
          <i class="fa-solid fa-trash-can mx-2"></i>
          <i class="fa-solid fa-pen-to-square mx-2"></i>
        </div>
      </div>
    </div>
  );
};

export default ApplianceItem;
