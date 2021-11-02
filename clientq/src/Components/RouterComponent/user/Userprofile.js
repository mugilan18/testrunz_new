
import { useStateValue } from '../user/data/StateProvider/StateProvider';

import React from "react";

const Userprofile = () => {
 
  const [{user}, dispatch] = useStateValue();
  return (
    <>
      {/* {console.log("Wn", info)} */}
    
        <>
          <span>name:</span>
          {console.log(user)}
       <span>{user.name}</span> 
          <br />

          <span>email:</span>
          <span>{user.email}</span> 
       
        </>
    
    </>
  );
};

export default Userprofile;
