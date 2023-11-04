import { useState } from "react";
import applianceContext from "./applianceContext";

const applianceState = (props) => {
  const s1 = {};
  const [state, setState] = useState(s1);
  update = () => {
    setTimeout(() => {
      setState({
        
      });
    });
  };
  return (
    <applianceContext.Provider value={state}>
      {props.children}
    </applianceContext.Provider>
  );
};

export default applianceState;
