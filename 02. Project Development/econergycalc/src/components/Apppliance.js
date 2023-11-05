import React, { useContext } from "react";
import ApplianceContext from "../context/appliances/ApplianceContext";
import ApplianceItem from "./ApplianceItem";
import AddApplianceForm from "./AddApplianceForm";

export default function Apppliance() {
  const context = useContext(ApplianceContext);
  const { appliances, addAppliance } = context;
  return (
    <>
      <AddApplianceForm />
      <div className="row my-3">
        <h3 className="">My Appliances</h3>
        {appliances.map((appliance) => {
          return <ApplianceItem key={appliance.id} appliance={appliance} />;
        })}
      </div>
    </>
  );
}
