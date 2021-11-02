import React, { useState,useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import Layout from "../core/Layout";
import { authenticate, isAuth } from "./helpers";
import Google from "./Google";
import Facebook from "./Facebook";
import Appcontext from "../Components/RouterComponent/user/data/Appcontext"
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import  "./signup";

//import { actionTypes } from './StateProvider/reducer';
import { useStateValue } from '../Components/RouterComponent/user/data/StateProvider/StateProvider';

import { actionTypes } from "../Components/RouterComponent/user/data/StateProvider/reducer"




const SignIn = (props) => {
  const {setDetails} = useContext(Appcontext);
  const [passwordShown, setPasswordShown] = useState(false);
  const [{user}, dispatch] = useStateValue();

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const [credit, setCredit] = useState({
    email: "",
    password: "",
    btnText: "Submit",
  });
  const { email, password, btnText } = credit;

  const handleChange = (name) => (event) => {
    setCredit({ ...credit, [name]: event.target.value });
  };

  const informParent = (response) => {
  

    fetch(`http://54.144.3.140:5000/api/users/${response.data.user._id}`, {
      headers: { Authorization: `Bearer ${response.data.token}` }
    })
      .then(res => res.json())
      .then(json => {localStorage.setItem("userdetail",JSON.stringify(json) )

      dispatch({
       type: actionTypes.SET_USER,
        user: JSON.parse(localStorage.getItem('userdetail')),
    });
   })





    authenticate(response, () => {
      isAuth() && isAuth().role === "admin"
        ? props.history.push("/admin")
        : props.history.push("/private");
    });
  };





  
  const clickSubmit = (event) => {
    event.preventDefault();
    setCredit({ ...credit, btnText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then((response) => {


         fetch(`http://54.144.3.140:5000/api/users/${response.data.user._id}`, {
       headers: { Authorization: `Bearer ${response.data.token}` }
     })
       .then(res => res.json())
       .then(json => {localStorage.setItem("userdetail",JSON.stringify(json) )

       dispatch({
        type: actionTypes.SET_USER,
         user: JSON.parse(localStorage.getItem('userdetail')),
     });
        
    
    })
   
        authenticate(response, () => {
          setCredit({
            ...credit,
            email: "",
            password: "",
            btnText: "Submitted",
          });
          isAuth() && isAuth().role === "admin"
            ? props.history.push("/admin")
            : props.history.push("/private");
      
        });
      })
      .catch((error) => {
        console.log("Sign-in error", error.response.data);
        setCredit({ ...credit, btnText: "Submit" });
        toast.error(error.response.data.error);
      });
  };
  const signInForm = () => (
    <form>
      <div className="form-group">
      
        <input
          onChange={handleChange("email")}
          type="email"
          className="form-control"
          value={email}
          placeholder="Email"
        />
      </div>
      <br/>
    
      <div className="form-group"  id="input_container">
        
        <input
          onChange={handleChange("password")}
          type={passwordShown ? "text" : "password"}
          className="form-control"
          value={password}
          id="input"
          placeholder="Password"
        />
        <div id="input_img" >
        { passwordShown ? <VisibilityIcon onClick={togglePasswordVisiblity}/> : <VisibilityOff onClick={togglePasswordVisiblity}/> }
        </div> 
      </div>
      <br/>
      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {btnText}
        </button>
      </div>
    </form>
  );
  return (
    <Layout style={{ textAlign:"center", alignItems:"center"}}>
      <div className="card" style={{ width: "535px",marginTop:"150px",textAlign:"center",marginLeft:"auto" ,marginRight:"auto"}}>
        <div className="card-body">
      <div className="align-self-center" style={{width:"500px", textAlign:"center",alignItems:"center"}} >
        <ToastContainer />
        {isAuth() ?  <Redirect to="/" />   : null}

       

        <h1 className="p-5 text-center">Login</h1>
        <Google informParent={informParent} />
        {/* <Facebook informParent={informParent} />  */}
        {signInForm()}
        <br />
        <Link
          className="btn btn-sm btn-outline-danger"
          to="/auth/forgot_password"
        >
          Forgot Password
        </Link>

        <br/>
       <br/>
        <div style={{ textAlign:"left"}}>
        <p style={{color:"black",fontWeight:"30px"}}>Create a new account</p>
        <Link to="/signup" className="card-link" style={{textDecoration:"none"}}>
        <p style={{color:"#3F51B5",fontWeight:"bold", position:"relative", top:"-40px",left:"200px"}}   >SignUp</p>
        </Link>
        </div>
        <Link to="/" className="card-link" style={{textDecoration:"none"}}>
        <ArrowBackIcon style={{color:"grey"}}/>
        </Link>
      </div>
      </div>
      </div>
    </Layout>
  );
};

export default SignIn;

