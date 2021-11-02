import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import Layout from "./Layout";
import { isAuth, getCookie, signOut, updateUserLS } from "../authent/helpers";
import MenuItem from '@material-ui/core/MenuItem';

import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop:"100px"
  },
 
});

const Private = (props) => {
  const [credit, setCredit] = useState({
    designation: "",
    collegeName: "",
    department: "",
    country: "",
    state: "",
    year: "",
    semester: "",
    showOnce: false,
    btnText: "Submit",
  });
  const [goTo, setGoTo] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    loadProfile()
  }, []);

  const loadProfile = () => {
    axios({
      method: "GET",
      url: `${process.env.REACT_APP_API}/users/${isAuth()._id}`,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
    })
      .then((response) => {
        const {
          designation,
          collegeName,
          department,
          country,
          state,
          year,
          semester,
          showOnce,
        } = response.data;
        setCredit({
          ...credit,
          designation,
          collegeName,
          department,
          country,
          state,
          year,
          semester,
          showOnce,
        });
      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.status === 401) {
          signOut(() => {
            props.history.push("/");
          });
        }
      });
  };

  const {
    designation,
    collegeName,
    department,
    country,
    state,
    year,
    semester,
    btnText,
  } = credit;

  const handleChange = (name) => (event) => {
    setCredit({ ...credit, [name]: event.target.value, });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setCredit({ ...credit, btnText: "Submitting" });
    axios({
      method: "PATCH",
      url: `${process.env.REACT_APP_API}/users/update`,
      headers: {
        Authorization: `Bearer ${getCookie("token")}`,
      },
      data: {
        designation,
        collegeName,
        department,
        country,
        state,
        year,
        semester,
        showOnce:true,
      },
    })
      .then((response) => {
        updateUserLS(response, () => {
          setCredit({
            ...credit,
            designation: "",
            collegeName: "",
            department: "",
            country: "",
            state: "",
            year: "",
            semester: "",
            btnText: "Submitted",
            showOnce:true,
          });
          toast.success("Profile updated successful");
          setGoTo(() => true);
        });
      })
      .catch((error) => {
        console.log("Sign-up error", error.response.data);
        setCredit({ ...credit, btnText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const updateForm = () => (
    <form>
        <div className="form-group">
        <label className="text-muted">Designation</label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={designation}
          onChange={handleChange("designation")}
          // text={text.postTo}
          className="form-control"
          name="postTo">
          <MenuItem value="student">Student</MenuItem>
          <MenuItem value="teacher">Teacher</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
        </div>

{/* 
      <div className="form-group">
        <label className="text-muted">Designation</label>
        <input
          onChange={handleChange("designation")}
          type="text"
          className="form-control"
          value={designation}
        /> 
      </div> */}


      <div className="form-group">
        <label className="text-muted">College Name</label>
        <input
          onChange={handleChange("collegeName")}
          type="text"
          className="form-control"
          value={collegeName}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Department</label>
        <input
          onChange={handleChange("department")}
          type="text"
          className="form-control"
          value={department}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Country</label>
        <input
          onChange={handleChange("country")}
          type="text"
          className="form-control"
          value={country}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">State</label>
        <input
          onChange={handleChange("state")}
          type="text"
          className="form-control"
          value={state}
        />
      </div>
      {credit.designation === "student" && (
        <>
          <div className="form-group">
            <label className="text-muted">Year</label>
            <input
              onChange={handleChange("year")}
              className="form-control"
              value={year}
              type="number"  
              min="1" 
              max="4"
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Semester</label>
            <input
              onChange={handleChange("semester")}
              className="form-control"
              value={semester}
              type="number"  
              min="1" 
              max="8"
            />
          </div>
        </>
      )}
      <br/>
      <div style={{alignItems:"center"}}>
        <button className="btn btn-primary"  onClick={clickSubmit}>
          {btnText}
        </button>
        <br />
        {goTo && (
          <button
            className="btn btn-primary"
            onClick={() => {
              props.history.push("/app");
            }}
          >
            App
          </button>
        )}
      </div>
    </form>
  );
  return (
    <Card className={classes.root}>
      <CardContent style={{alignItems:"center"}}>
      <div >
        <ToastContainer />
        {credit.showOnce && props.history.push("/app")}

        {(credit.showOnce === false) && (<> <p className="lead text-center">Profile Update</p>
        {updateForm()}</>)}
      </div>
      </CardContent>
        {/* {window.location.reload(true)} */}
      </Card>
    
  );
};

export default Private;
