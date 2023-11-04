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
      "_id": "6546840364a2c2a37158851d",
      "user": "654169de86a069773db0db98",
      "applianceType": "demo appliance 1",
      "applianceName": "demo appliance name 1",
      "powerRating": 111,
      "quantity": 1,
      "active": true,
      "__v": 0
    },
    {
      "_id": "6546840364a2c2a37158851d",
      "user": "654169de86a069773db0db98",
      "applianceType": "demo appliance 1",
      "applianceName": "demo appliance name 1",
      "powerRating": 111,
      "quantity": 1,
      "active": true,
      "__v": 0
    },
    {
      "_id": "6546840364a2c2a37158851d",
      "user": "654169de86a069773db0db98",
      "applianceType": "demo appliance 1",
      "applianceName": "demo appliance name 1",
      "powerRating": 111,
      "quantity": 1,
      "active": true,
      "__v": 0
    },
    {
      "_id": "6546840364a2c2a37158851d",
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
  
  return (
    <ApplianceContext.Provider value={{appliances, setAppliances}}>
      {props.children}
    </ApplianceContext.Provider>
  );
};

export default ApplianceState;
