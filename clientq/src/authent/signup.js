import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";
import Layout from "../core/Layout";
import { isAuth } from "./helpers";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import "./signup.css"
import PasswordStrengthBar from 'react-password-strength-bar';

const SignUp = () => {
  const [credit, setCredit] = useState({
    name: "",
    email: "",
    password: "",
    passwordc:"",
    btnText: "Submit",
  });
  const { name, email, password, btnText,passwordc } = credit;

  const handleChange = (name) => (event) => {
    setCredit({ ...credit, [name]: event.target.value });
  };

  const clickSubmit = (event) => {

    if(password===passwordc){

  
        if (/[0-9]/.test(password) && password.length > 7 && /\d/.test(password) && !/\s/.test(password) ){
    
        



   

    event.preventDefault();
    setCredit({ ...credit, btnText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password },
    })
      .then((response) => {
        console.log(response);
        setCredit({
          ...credit,
          name: "",
          email: "",
          password: "",
          btnText: "Submitted",
        });
        toast.success(response.data.message);
      })
      .catch((error) => {
        console.log("Sign-up error", error.response.data);
        setCredit({ ...credit, btnText: "Submit" });
        toast.error(error.response.data.error);
      });
    }
    else if(!/[0-9]/.test(password)){
      console.log("must include a number")
      event.preventDefault();
      setIncorrectpass("must include a number"); 
       setTimeout(() => {
        setIncorrectpass(""); 
       }, 1000);
    
    }
    else if(!/\d/.test(password)){
      console.log("must include a text")
      event.preventDefault();
      setIncorrectpass("must include a text"); 
       setTimeout(() => {
        setIncorrectpass(""); 
       }, 1000);
    }
    else if(/\s/.test(password)){
      console.log("must not have space")
      event.preventDefault();
      setIncorrectpass("must not have space"); 
       setTimeout(() => {
        setIncorrectpass(""); 
       }, 1000);
    }
    else if(! (password.length > 7)){
      console.log("must have minimum 8 char")
      event.preventDefault();
      setIncorrectpass("must have 7 char"); 
       setTimeout(() => {
        setIncorrectpass(""); 
       }, 1000);
    }
  


  }
    else{
      event.preventDefault();
      setIncorrectpass("Password does not match"); 
       setTimeout(() => {
        setIncorrectpass(""); 
       }, 1000);
      
    }
  };
  const [incorrectpass, setIncorrectpass] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [passwordShownc, setPasswordShownc] = useState(false);
  const togglePasswordVisiblityc = () => {
    setPasswordShownc(passwordShownc ? false : true);
  };



 
  const signUpForm = () => (
    <form>
     
      <div className="form-group">
        
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
          placeholder="Name"
        />
      </div>
      <br/>
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

      <div className="form-group" id="input_container">
      
        <input
          onChange={handleChange("password")}
          className="form-control"
          type={passwordShown ? "text" : "password"}
          value={password}
          id="input" 
          placeholder="Password"/>
            <div id="input_img" >
          { passwordShown ?<VisibilityIcon onClick={togglePasswordVisiblity}/> : <VisibilityOff onClick={togglePasswordVisiblity}/> }
          </div>
      </div>
      <PasswordStrengthBar password={password} style={{heigth:"50px"}}/>
      <br/>

      <div className="form-group" id="input_container">
      
        <input
          onChange={handleChange("passwordc")}
          type={passwordShownc ? "text" : "password"}
          className="form-control"
          value={passwordc}
          id="input"
          placeholder="Confirm Password" />
          
          <div id="input_img" >
        { passwordShownc ? <VisibilityIcon onClick={togglePasswordVisiblityc}/> : <VisibilityOff onClick={togglePasswordVisiblityc}/>}
          </div>     
      </div>
      <div style={{color:"red"}}>
      {incorrectpass}
      </div>
      <br/>
      <div>
        <button className="btn btn-primary" onClick={clickSubmit} style={{backgroundColor:"#3F51B5"}}>
          {btnText}
        </button>
      </div>
    </form>
  );
  return (
   <Layout>
  <div className="card" style={{ width: "535px",marginTop:"150px",textAlign:"center",marginLeft:"auto" ,marginRight:"auto"}}>
        <div className="card-body">
         <div className="align-self-center" style={{width:"500px", textAlign:"center",alignItems:"center"}} >      
          <ToastContainer />
          {isAuth() ? <Redirect to="/" /> : null}
         
          <h1 className="p-5 text-center">SignUp</h1>
          {signUpForm()}
          <br/>
          <br/>
          <div style={{ }}>
           <p style={{color:"black",fontWeight:"30px"}}>Do you have an account?</p>
           <Link to="/signin" className="card-link" style={{textDecoration:"none"}}>
           <p style={{color:"#3F51B5",fontWeight:"bold"}}   >Login Instead</p>
           </Link>
          </div>
          <Link to="/" className="card-link" style={{textDecoration:"none"}}>
          <ArrowBackIcon  style={{color:"grey"}}/>
          </Link>
         </div>
        </div>
  </div>
    </Layout>
  );
};

export default SignUp;
