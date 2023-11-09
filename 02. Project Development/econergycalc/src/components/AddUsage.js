import React, { useContext, useState, useEffect } from 'react';
import ApplianceContext from "../context/appliances/ApplianceContext";
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const AddUsage = () => {
    const context = useContext(ApplianceContext);
    const { appliances, getAppliance, editAppliance } = context;

  const [appliance, setAppliances] = useState({
    id: "",
    eapplianceType: "",
    eapplianceName: "",
    epowerRating: "",
    equantity: "",
    eactive: "",
  });


  return (
    <div>
      <h1>Energy Consumption Dashboard</h1>
      
      {/* Dropdown for selecting appliance */}
      <select
        value=""
      >
        <option value="">Select an Appliance</option>
        {appliances.map((appliance) => (
          <option key={appliance._id} value={appliance._id}>
            {appliance.applianceName}
          </option>
        ))}
      </select>

      {/* Form for logging usage */}
      <form>
        <input
          type="number"
          value=""
          placeholder="Duration in minutes"
        />
        <button type="submit">Log Usage</button>
      </form>

      
    </div>
  );
};


export default AddUsage

