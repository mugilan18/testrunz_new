import React ,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useStateValue } from '../RouterComponent/user/data/StateProvider/StateProvider';
const useStyles = makeStyles((theme) => ({
  root: {
   // flexGrow: 1,
   width:"100%"
  },
  
}));

export default function NavBar() {
  const classes = useStyles();
 
  const [{user}, dispatch] = useStateValue();
  console.log(user)
  
  const runz = () => {
    window.localStorage.clear();
    
   return (window.location.href = "/");
  }
  const home = () => {
   return (window.location.href = "/#/app");  
  }
  const login  = (
    <>
    <Button onClick={home} color="inherit" >TESTRUNZ</Button>
    <Button onClick={runz} color="inherit"  edge="end">logout</Button>
    
    </>
  )
  const logout  = (
    <Button onClick={runz} color="inherit"  >TESTRUNZ</Button>
  )
 
  return (
    <div className={classes.root}>
      
      <AppBar position="static">
        <Toolbar className={classes.title}>
        {user ? login : logout}
       
        </Toolbar>
      </AppBar>
    </div>
  );
}



