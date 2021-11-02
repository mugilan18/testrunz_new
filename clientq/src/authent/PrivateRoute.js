//import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//import { isAuth } from "../../../../authent/helpers";
import React, { useState, useContext, useEffect } from "react";
import Appcontext from "../Components/RouterComponent/user/data/Appcontext";
import { isAuth } from './helpers';




const PrivateRoute = ({ component: Component, ...rest }) => {
    const { details } = useContext(Appcontext);
     return (
   <>
    <Route {...rest} render={props => (!!isAuth() ? <Component {...props} /> :  
    <Redirect to="/signin" />)} />   </>                      
)}


export default PrivateRoute;