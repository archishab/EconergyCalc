import { useState } from "react";
import ApplianceContext from "./ApplianceContext";

const ApplianceState = (props) => {
  const applianceInitial = [
    {
      "_id": "654594ebdbe4299d81d1e128",
      "user": "654169de86a069773db0db98",
      "applianceType": "demo appliance",
      "applianceName": "demo appliance name",
      "powerRating": 111,
      "quantity": 1,
      "__v": 0
    },
    {
      "_id": "6546840364a2c2a37158851",
      "user": "654169de86a069773db0db98",
      "applianceType": "demo appliance 1",
      "applianceName": "demo appliance name 1",
      "powerRating": 111,
      "quantity": 1,
      "active": true,
      "__v": 0
    },
    {
      "_id": "6546840364a2c2a3715885",
      "user": "654169de86a069773db0db98",
      "applianceType": "demo appliance 1",
      "applianceName": "demo appliance name 1",
      "powerRating": 111,
      "quantity": 1,
      "active": true,
      "__v": 0
    },
    {
      "_id": "6546840364a2c2a371588",
      "user": "654169de86a069773db0db98",
      "applianceType": "demo appliance 1",
      "applianceName": "demo appliance name 1",
      "powerRating": 111,
      "quantity": 1,
      "active": true,
      "__v": 0
    },
    {
      "_id": "6546840364a2c2a37158",
      "user": "654169de86a069773db0db98",
      "applianceType": "demo appliance 1",
      "applianceName": "demo appliance name 1",
      "powerRating": 111,
      "quantity": 1,
      "active": true,
      "__v": 0
    }
  ]

  const [appliances, setAppliances] = useState(applianceInitial)
  
  //Add an appliance
  const addAppliance = (applianceType, applianceName, powerRating, quantity, active) => {
    console.log("Adding an appliance")
    const newAppliance = {
      "_id": "6546840364a2c2a37158851d",
      "user": "654169de86a069773db0db98",
      "applianceType": applianceType,
      "applianceName": applianceName,
      "powerRating": powerRating,
      "quantity": quantity,
      "active": active,
      "__v": 0
    }
    setAppliances(appliances.concat(newAppliance))
  }

  // Delete an appliance
  const deleteAppliance = (id) => {
    console.log("Deleting the appliance with id" + id)
    const newAppliance = appliances.filter((appliance)=>{return appliance._id!==id})

    setAppliances(newAppliance)
    
  }

  // Edit an appliance
  const editAppliance = (id, applianceType, applianceName, powerRating, quantity, active) => {
    
  }

  return (
    <ApplianceContext.Provider value={{appliances, addAppliance, deleteAppliance, editAppliance}}>
      {props.children}
    </ApplianceContext.Provider>
  );
};

export default ApplianceState;
