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
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();

    console.log(json);
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
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        applianceType,
        applianceName,
        powerRating,
        quantity,
        active,
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
  const deleteAppliance = async (id) => {
    // API CALL
    const response = await fetch(
      `${host}api/appliances/deleteappliance/${id}`,
      {
        method: "DELETE",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    const json = response.json();
    console.log(json);

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
      `${host}api/appliances/updateappliance/${id}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          applianceType,
          applianceName,
          powerRating,
          quantity,
          active,
        }),
      }
    );
    const json = await response.json();

    console.log(json);
    let newAppliances = JSON.parse(JSON.stringify(appliances));
    for (let index = 0; index < newAppliances.length; index++) {
      const element = newAppliances[index];
      if (element._id === id) {
        newAppliances[index].applianceType = applianceType;
        newAppliances[index].applianceName = applianceName;
        newAppliances[index].powerRating = powerRating;
        newAppliances[index].quantity = quantity;
        newAppliances[index].active = active;
        break;
      }
    }
    setAppliances(newAppliances);
  };

  //Add an appliance
  const addUsage = async (
    applianceType,
    applianceName,
    powerRating,
    quantity,
    active
  ) => {
    const response = await fetch(`${host}api/appliances/usage/`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        applianceType,
        applianceName,
        powerRating,
        quantity,
        active,
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

  return (
    <ApplianceContext.Provider
      value={{
        appliances,
        getAppliance,
        addAppliance,
        deleteAppliance,
        editAppliance,
      }}
    >
      {props.children}
    </ApplianceContext.Provider>
  );
};

export default ApplianceState;
