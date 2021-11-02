import Appcontext from "./Appcontext";
import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { isAuth } from "../../../../authent/helpers";
const lsTorage = window.localStorage.getItem("user");


const Appuserstate = (props) => {
  const [details, setDetails] = useState({});

  useEffect(() => {
    
    {lsTorage  ?  assign() : console.log(lsTorage)}
  }, [isAuth])
  const assign =  () =>{
   
    const temp = JSON.parse(lsTorage)

    function getCookie(cName) {
      const name = cName + "=";
      const cDecoded = decodeURIComponent(document.cookie); //to be careful
      const cArr = cDecoded.split('; ');
      let res;
      cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
      })
      return res
    }

    const token = getCookie("token")
   
   
    fetch(`http://54.144.3.140:5000/api/users/${temp._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(json => setDetails(json));
     
      console.log("bfweuiiuiu lng jg j",details)
  }

  return (
    <Appcontext.Provider value={{ details, setDetails }}>
      {props.children}
    </Appcontext.Provider>
  );
};

export default Appuserstate;



















// const Appuserstate = (props) => {
//   const [details, setDetails] = useState(null);
//   useEffect(() => {
//     console.log(isAuth)
//     const temp = JSON.parse(lsTorage)

//     function getCookie(cName) {
//       const name = cName + "=";
//       const cDecoded = decodeURIComponent(document.cookie); //to be careful
//       const cArr = cDecoded.split('; ');
//       let res;
//       cArr.forEach(val => {
//         if (val.indexOf(name) === 0) res = val.substring(name.length);
//       })
//       return res
//     }

//     const token = getCookie("token")
//     console.log("hello",temp)
   
//     fetch(`http://localhost:5000/api/users/${temp._id}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//       .then(res => res.json())
//       .then(json => console.log(json));
//       setDetails(isAuth())
    
//   }, []);

//   return (
//     <Appcontext.Provider value={{ details, setDetails }}>
//       {props.children}
//     </Appcontext.Provider>
//   );
// };

// export default Appuserstate;