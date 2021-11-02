import React from "react";
import { Link } from "react-router-dom";
import "./App.module.css";
import Layout from "./core/Layout";
import {isAuth} from "./authent/helpers"

function Home() {
  return (
    <Layout>
      <div className="container mt-5">
        <div className="card" style={{ width: "30rem" ,marginTop:"150px",textAlign:"center",marginLeft:"auto" ,marginRight:"auto"}}>
          <div className="card-body">
            <h5 className="card-title">About Testrunz</h5>
            <h6 className="card-subtitle mb-2 text-muted">To Start</h6>
            <p className="card-text" style={{textAlign:"justify",fontSize:"1rem"}}>
              This app is about connecting student and academecian to have best
              experience with Laboratory
            </p>
            <Link to="/signup" className="card-link" style={{textDecoration:"none"}}>
              Sign Up
            </Link>
            <Link to="/signin" className="card-link" style={{textDecoration:"none"}}>
              Log In
            </Link>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
