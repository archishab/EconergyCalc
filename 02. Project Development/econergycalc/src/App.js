// import LogoIcon from './assets/LogoIcon.png';
// import Logo from './assets/Logo.png';
import './App.css';
import Navbar from './components/Navbar.js';
import AddApplianceForm from './components/AddApplianceForm.js';
import Recommendations from './components/Recommendations.js';

function App() {
  return (
    <>
      <Navbar />
      
      <div className="container my-5 px-5">
        <AddApplianceForm heading = "Add New Appliance"/>
      </div> 
      <Recommendations />
    </>
  );
}

export default App;