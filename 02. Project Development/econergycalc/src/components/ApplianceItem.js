import React, { useContext } from "react";
import ApplianceContext from "../context/appliances/ApplianceContext";
import regrigeratorIcon from "../assets/icons/refrigerator.png";
import washerIcon from "../assets/icons/washer.png";
import cooktopIcon from "../assets/icons/cooktop.png";
import dishwasherIcon from "../assets/icons/dishwasher.png";
import microwaveIcon from "../assets/icons/microwaveoven.png"
import ovenIcon from "../assets/icons/oven.png"

const ApplianceItem = (props) => {
  const context = useContext(ApplianceContext);
  const { deleteAppliance } = context;
  const { appliance, updateAppliance } = props;
  return (
    <div className="col">
      <div className="card mb-3 h-100 w-100 shadow-sm">
        <div className="row g-0 align-items-center card-body">
          <div class="col-md-4">
            {appliance.applianceType==="Clothes Dryer" || appliance.applianceType==="Clothes Washer-Dryer" || appliance.applianceType==="Clothes Washer"? (<img src={washerIcon} class="appliance-icon img-fluid rounded-start"/>) : (<div></div>)} 
            {appliance.applianceType==="Refrigerator" || appliance.applianceType==="Freezer"? (<img src={regrigeratorIcon} class="appliance-icon img-fluid rounded-start"/>) : (<div></div>)}
            {appliance.applianceType==="Cooktop" ? (<img src={cooktopIcon} class="appliance-icon img-fluid rounded-start"/>) : (<div></div>)}
            {appliance.applianceType==="Dishwasher" ? (<img src={dishwasherIcon} class="appliance-icon img-fluid rounded-start"/>) : (<div></div>)} 
            {appliance.applianceType==="Microwave Oven" ? (<img src={microwaveIcon} class="appliance-icon img-fluid rounded-start"/>) : (<div></div>)}
            {appliance.applianceType==="Oven" ? (<img src={ovenIcon} class="appliance-icon img-fluid rounded-start"/>) : (<div></div>)}        
          </div>
          <div class="col-md-8">
            <div class=" ms-4 card-body">
            {appliance.active ? (
                  <span class="badge rounded-pill text-end mb-2">Active</span>
                ) : (
                  <span class="badge bg-secondary rounded-pill text-end mb-2">
                    Inactive
                  </span>
                )}
              <h5 className="card-title">
                {appliance.energyStarCompliant ? (
                  <i
                    class="fa-solid fa-leaf me-2"
                    style={{ color: "#3f7e44" }}
                  ></i>
                ) : (
                  <i
                    class="fa-solid fa-circle-exclamation me-2"
                    style={{ color: "#ad0b0b" }}
                  ></i>
                )}
                {appliance.applianceName}
              </h5>
              <p className="card-text">
                {appliance.applianceType} - {appliance.powerRating} kWh
              </p>
              <p class="card-text">
                <i
                  class="fa-regular fa-trash-can fa-2xl me-2"
                  style={{ color: "#878787" }}
                  onClick={() => {
                    deleteAppliance(appliance._id);
                    props.showAlert(
                      "Appliance Deleted Successfully",
                      "success"
                    );
                  }}
                ></i>
                <i
                  class="fa-regular fa-pen-to-square fa-2xl mx-2"
                  style={{ color: "#D1A103" }}
                  onClick={() => {
                    updateAppliance(appliance);
                  }}
                ></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplianceItem;
