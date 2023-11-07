import PlaceHolderImage from "../assets/PlaceHolderImage.jpg";
import Apppliance from "./Appliance";
import AddApplianceForm from "./AddApplianceForm";


export default function Dashboard() {
  return (
    <div className="container">
      <Apppliance/>
      <h3>My Consumption</h3>
      <hr />
    </div>
  );
}
