import React from "react";
import NavBar from "./Components/NavBar/NavBar";
import AppRouter from "./Components/RouterComponent/RouterComponent";


import Appuserstate from "../src/Components/RouterComponent/user/data/Appuserstate"


function App() {
  
  return (
    <div>
      <Appuserstate >
       <NavBar /> 
      
        <AppRouter />
 
      </Appuserstate>
    </div>
  );
}

export default App;
