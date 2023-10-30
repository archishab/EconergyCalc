import React, {useState} from "react";

export default function AddApplianceForm(props) {
    const addAppliance = () => {
        console.log("New appliance was added");
    }

    const handleOnChange = (event)=> {
        console.log("On change");
        addedAppliance(event.target.value);
    }

    const [appliance, addedAppliance] = useState('Select Appliance Type');
  return (
    <div>
        <h3>{props.heading}</h3>
      <form>
        <div className="mb-3">
          <label htmlFor="ApplianceName" className="form-label">
            Appliance Type
          </label>
          <select className="form-select" aria-label="Default select example" onChange={handleOnChange}>
            <option defaultValue>Select Appliance Type</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="Stove">Stove</option>
            <option value="Dishwasher">Dishwasher</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="ApplianceName" className="form-label">
            Appliance Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            value={appliance}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="PowerRating" className="form-label">
            Power Rating
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="UsageDuration" className="form-label">
            Usage Duration
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
          />
          
        </div>
        <div className="mb-3">
          <label htmlFor="Quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="submit" className="btn btn-primary">
            Cancel
            </button>

            <button className="btn btn-primary" onClick={addAppliance}>
            Save
            </button>
        </div>
      </form>
    </div>
  );
}