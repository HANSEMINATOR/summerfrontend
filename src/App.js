import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import { Button } from '@material-ui/core';
import ReactDOM from 'react-dom';
import axios from "axios";
import homeLogo from "./img/home.svg"
import banditLogo from "./img/ic-bandit.svg"
import Overview from './pages/Overview.js';
import Home from './pages/home.js';
import NotFoundPage from "./pages/notfoundpage.js"
import './App.css';

const menuDiv = {
  backgroundColor: "#FFDBFF",
  color: "#4833C4",
  justifyContent: "center",
  display: "flex",
  alignItems: "center"
};

const menuText = {
  
  fontFamily: "Inconsolata",
  fontStyle: "normal",
  fontWeight: "400",
  fontSize: "22px",
  margin: "10px",
  textTransform: "uppercase",
  color: "#4833C4",
  opacity: "0.8",  
  lineHeight: "23px",
  letterSpacing: "0em",
  textAlign: "center"
  
};

const textGboys = {

  
  fontFamily: "Inconsolata",
  fontStyle: "normal",
  fontWeight: "900",
  fontSize: "32px",
  lineHeight: "34px",
  /* identical to box height */

  textAlign: "center",

  color: "#4833C3",
  
  opacity: "0.7",
  margin: "0px",
  marginLeft: "20px",

}

const mystyle = {

  backgroundColor: "#FFDBFF"

};

const specialLogo = {

  backgroundColor: "#FFDBFF",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center"
  
}

const specialBandit = {

  backgroundColor: "#FFDBFF",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center"
  
}

const homeCSS = {

  backgroundColor: "#FFDBFF",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center"

}

const imgCSS = {

  margin: "10px",
  marginRight: "20px",
}

function App() {
  
  const [chartData, setChartData] = useState({});

  const chart = () => {
    let empSal = [];
    let empAge = [];
    let yvals = [];
    let xvals = [];
    axios
      .get("http://localhost:5000/10mins")
      .then(res => {
        console.log(res);
        for (const dataObj of res.data) {
          //empSal.push(parseInt(dataObj.employee_salary));
          //empAge.push(parseInt(dataObj.employee_age));
          yvals.push(parseInt(dataObj.value));
          xvals.push(parseInt(dataObj.time));
        }
        setChartData({
          labels: xvals,
          datasets: [
            {
              label: "Amps",
              data: yvals,
              backgroundColor: ["rgba(75, 192, 192, 0.6)"],
              borderWidth: 4
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(empSal, empAge);
  };

  useEffect(() => {
    chart();
  }, []);
  
  useEffect(() => {
    console.log("UseEffect");
  });
  

  return (
    
    <Router>
      <Grid container direction="column" spacing={9}>
        <Grid container item xs={12}>
          <Grid item xs={3} style={specialLogo}>
            <p style={textGboys}>AU Summer University</p>
          </Grid>
          <Grid container item xs={6} style={mystyle} >
              <Grid item xs={2} style={homeCSS}>
                <Link to="/">
                <img src={homeLogo} alt="Logo" style={imgCSS}></img>
                </Link>      
              </Grid>
              <Grid item xs={5} style={menuDiv}>
                <Link to="/overview">
                  <p  style={menuText}>Device Overview</p>
                </Link>
              </Grid>
              <Grid item xs={5} style={menuDiv}>
                  <Link to="/seasons">
                  <p  style={menuText}>GoKartsne</p>
                  </Link>
              </Grid>
              
          </Grid>
          <Grid item xs={3} style={specialBandit}>
            <img src={banditLogo} alt="Logo" style={imgCSS}></img>
          </Grid>
      </Grid>

      <Grid container direction="column">

      <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/overview' component={Overview} />
            <Route component={NotFoundPage}></Route>
      </Switch>
      <p>pikke</p>  

      </Grid>

    </Grid>    
  </Router>

    

   );
}

export default App;
