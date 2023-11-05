import { useState } from "react";
import ApplianceContext from "./ApplianceContext";

const ApplianceState = (props) => {
  const host = "http://localhost:3030/";
  const applianceInitial = [];

  const [appliances, setAppliances] = useState(applianceInitial);

  //Get all appliance
  const getAppliance = async () => {
    const response = await fetch(`${host}api/appliances/fetchallappliance`, {
      method: "GET",

      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0MTY5ZGU4NmEwNjk3NzNkYjBkYjk4In0sImlhdCI6MTY5OTA1NjIxNX0.13bbZP5pqQ3PPn0mURF6W38KTL1hjFuNSGROxl4rBoo",
      },
      
    })
    const json = await response.json();

    console.log(json)
    setAppliances(json);
  
  };
    
  


  //Add an appliance
  const addAppliance = async (
    applianceType,
    applianceName,
    powerRating,
    quantity,
    active
  ) => {
    const response = await fetch(`${host}api/appliances/addappliance/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0MTY5ZGU4NmEwNjk3NzNkYjBkYjk4In0sImlhdCI6MTY5OTA1NjIxNX0.13bbZP5pqQ3PPn0mURF6W38KTL1hjFuNSGROxl4rBoo",
      },
      body: JSON.stringify({
        applianceType,
        applianceName,
        powerRating,
        quantity,
        
    }),
    });
    const json = response.json();

    console.log("Adding an appliance");
    const newAppliance = {
      _id: "6546840364a2c2a37158851d",
      user: "654169de86a069773db0db98",
      applianceType: applianceType,
      applianceName: applianceName,
      powerRating: powerRating,
      quantity: quantity,
      active: active,
      __v: 0,
    };
    setAppliances(appliances.concat(newAppliance));
  };

  // Delete an appliance
  const deleteAppliance = (id) => {
    console.log("Deleting the appliance with id" + id);
    const newAppliance = appliances.filter((appliance) => {
      return appliance._id !== id;
    });

    setAppliances(newAppliance);
  };

  // Edit an appliance
  const editAppliance = async (
    id,
    applianceType,
    applianceName,
    powerRating,
    quantity,
    active
  ) => {
    // API CALL
    const response = await fetch(
      `${host}api/appliances/updateappliance/654596a93c9cf4fbfb81f6a3`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU0MTY5ZGU4NmEwNjk3NzNkYjBkYjk4In0sImlhdCI6MTY5OTA1NjIxNX0.13bbZP5pqQ3PPn0mURF6W38KTL1hjFuNSGROxl4rBoo",
        },
        body: JSON.stringify(applianceType,
          applianceName,
          powerRating,
          quantity,
          ),
      }
    );
    const json = response.json();

    for (let index = 0; index < appliances.length; index++) {
      const element = appliances[index];
      if ((element._id = id)) {
        element.applianceType = applianceType;
        element.applianceName = applianceName;
        element.powerRating = powerRating;
        element.quantity = quantity;
        element.active = active;
      }
    }
  };

  return (
    <ApplianceContext.Provider
      value={{ appliances, getAppliance, addAppliance, deleteAppliance, editAppliance }}
    >
      {props.children}
    </ApplianceContext.Provider>
  );
};

export default ApplianceState;
