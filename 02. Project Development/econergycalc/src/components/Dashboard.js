import PlaceHolderImage from "../assets/PlaceHolderImage.jpg";
import Apppliance from "./Appliance";
import AddApplianceForm from "./AddApplianceForm";
import App from "../App"


export default function Dashboard(props) {
  const {showAlert} = props;
  return (
    <div className="container">
      <Apppliance showAlert={showAlert}/>
      <h3>My Consumption</h3>
      <hr />
    </div>
  );
}
