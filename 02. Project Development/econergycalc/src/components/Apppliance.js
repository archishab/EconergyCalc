import React, { useContext } from "react";
import ApplianceContext from "../context/appliances/ApplianceContext";
import ApplianceItem from "./ApplianceItem";


export default function Apppliance() {
  const context = useContext(ApplianceContext);
  const { appliances, setAppliances } = context;
  return (
    <div className="row my-3">
      <h3 className="">My Appliances</h3>
      {appliances.map((appliance) => {
        return <ApplianceItem appliance={appliance} />;
      })}
    </div>
  );
}
