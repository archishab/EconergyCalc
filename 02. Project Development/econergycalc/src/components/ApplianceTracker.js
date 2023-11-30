import React, { useState, useEffect } from "react";
import axios from "axios";
import Stopwatch from "./Stopwatch";

const ApplianceTracker = ({ userId }) => {
  const [appliances, setAppliances] = useState([]);
  const [selectedApplianceId, setSelectedApplianceId] = useState("");
  const [selectedApplianceUserId, setSelectedApplianceUserId] = useState("");
  const [time, setTime] = useState(0); // State to hold the time in seconds

  // Fetch appliances when the component mounts
  useEffect(() => {
    // Adjust the URL to the full path of your API if it's different
    axios
      .get("http://localhost:3030/api/appliances/fetchallappliance", {
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setAppliances(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appliances:", error);
      });
  }, []);

  const handleTimeChange = (e) => {
    setTime(e.target.value); // Update time when user types in the input field
  };

  const handleApplianceChange = (event) => {
    const applianceId = event.target.value;
    const applianceUserId =
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-userid"
      );
    setSelectedApplianceId(applianceId);
    setSelectedApplianceUserId(applianceUserId);
  };

  const handleTimeSubmit = (seconds) => {
    // Convert time to number and submit
    const timeInSeconds = Number(time);
    const selectedAppliance = appliances.find(
      (appliance) => appliance._id === selectedApplianceId
    );
    if (selectedAppliance) {
      const energyUsed = calculateEnergyConsumption(
        selectedAppliance.powerRating,
        timeInSeconds
      );
      axios
        .post("http://localhost:3030/api/appliances/usage", {
          user: selectedApplianceUserId,
          appliance: selectedApplianceId,
          duration: timeInSeconds,
          energyConsumed: energyUsed,
        })
        .then((response) => {
          console.log("Appliance usage added successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error submitting appliance usage:", error);
        });
    }
  };

  return (
    <>
      <button
        type="button"
        class="btn ms-1 shadow"
        data-bs-toggle="modal"
        data-bs-target="#logUsageModal"
      >
        <i class="fa-solid fa-gauge-simple-high fa-xl me-2" style={{color: "#000000"}}></i>
        Log Usage
      </button>

      <div
        class="modal fade"
        id="logUsageModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Log Usage
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-start">
              <select
                className="form-select my-2" aria-label="Default select example"
                value={selectedApplianceId}
                onChange={handleApplianceChange}
              >
                <option value="">Select Appliance</option>
                {appliances
                .filter(appliance => appliance.active)
                .map((appliance) => (
                  <option
                    key={appliance._id}
                    value={appliance._id}
                    data-userid={appliance.user}
                  >
                    {appliance.applianceName}
                  </option>
                ))}
              </select>
              <Stopwatch onTimeSubmit={setTime} />
              <div class="form-floating mb-3">
              <input
                class="form-control"
                type="number"
                value={time}
                onChange={handleTimeChange}
                placeholder="Enter time in seconds"
              />
                <label for="floatingInput">Enter time in seconds</label>
            </div>
              
              
            </div>
            <div class="modal-footer">
            <button class="btn btn-primary" data-bs-dismiss="modal" onClick={handleTimeSubmit}>Submit Time</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const calculateEnergyConsumption = (powerRating, seconds) => {
  return (powerRating * seconds) / 3600; // Convert to kWh
};

export default ApplianceTracker;
