import Appcontext from "./data/Appcontext";
import React, { useContext } from "react";

const Userprofile = () => {
  const { details } = useContext(Appcontext);

  return <>{details && <>Activity</>}</>;
};

export default Userprofile;
