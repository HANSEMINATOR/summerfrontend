import { Grid } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import {Line} from 'react-chartjs-2';
import Container from "@material-ui/core/Container";
import mqtt from "mqtt";

function Gokarts(props) {

    const topCSS = {

        borderStyle: "dotted"

    }

    const websocketUrl = "ws://23.97.200.56:1888";
    const apiEndpoint = "/";

    function storeError() {

      console.log("StoreError");

    }

    function getClient(errorHandler) {
      const client = mqtt.connect(websocketUrl);
      client.stream.on("error", (err) => {
        errorHandler(`Connection to ${websocketUrl} failed`);
        client.end();
      });
      return client;
    }

    const [mqttcli, setMqttClient] = useState(null);

    const [G1WchartData, setG1WChartData] = useState({});
    const [G1WhchartData, setG1WhChartData] = useState({});

    const [G2WchartData, setG2WChartData] = useState({});
    const [G2WhchartData, setG2WhChartData] = useState({});
    
    const [chartXVals, setXVals] = useState([]);
    const [chart2XVals, set2XVals] = useState([]);

    const [chartG1WYVals, setG1WYVals] = useState([]);
    const [chartG1WhYVals, setG1WYhVals] = useState([]);
    
    const [chartG2WYVals, setG2WYVals] = useState([]);
    const [chartG2WhYVals, setG2WYhVals] = useState([]);
    

    
    const updateG1WChart = () => {

    
      setG1WChartData({
        labels: chartXVals,
        datasets: [
          {
            label: "Watt",
            data: chartG1WYVals,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)', 
          }
        ]
      });
    
    }

    const updateG1WhChart = () => {

    
      setG1WhChartData({
        labels: chartXVals,
        datasets: [
          {
            label: "Watt hours",
            data: chartG1WhYVals,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)', 
          }
        ]
      });
    
    }

    
    const updateG2WChart = () => {

    
      setG2WChartData({
        labels: chart2XVals,
        datasets: [
          {
            label: "Watt",
            data: chartG2WYVals,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)', 
          }
        ]
      });
    
    }

    const updateG2WhChart = () => {

    
      setG2WhChartData({
        labels: chart2XVals,
        datasets: [
          {
            label: "Watt hours",
            data: chartG2WhYVals,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)', 
          }
        ]
      });
    
    }

    
    
    useEffect(() => {

      console.log("UseEffect[]");

      
      const client = getClient(storeError);
      setMqttClient(client);
      
      updateG1WChart();
      updateG1WhChart();
      updateG2WChart();
      updateG2WhChart();

      client.on("connect", () => {
        console.log("connected");
      })

      client.on("message", (topic, msg) => {

        let str = String.fromCharCode.apply(String, msg);

        //console.log(str);
        
        let strobj = JSON.parse(str);

        //console.log(topic);
        //console.log(strobj.time);
        //console.log(strobj.A);
        //console.log(strobj.V);
        
        if(topic == "telemetry/gokart22") {

          console.log("Gokart2");
            
          chart2XVals.push(strobj.time);

          set2XVals(chart2XVals);
          
          chartG2WYVals.push(strobj.W);
          setG2WYVals(chartG2WYVals);

          chartG2WhYVals.push(strobj.Wh);
          setG2WYhVals(chartG2WhYVals);
          
          updateG2WChart();
          updateG2WhChart();


        }

        if(topic === "telemetry/gokart11") {

          chartXVals.push(strobj.time);

          setXVals(chartXVals);
          
          chartG1WYVals.push(strobj.W);
          setG1WYVals(chartG1WYVals);

          chartG1WhYVals.push(strobj.Wh);
          setG1WYhVals(chartG1WhYVals);
          
          updateG1WChart();
          updateG1WhChart();

        }

      });

      client.subscribe("telemetry/gokart11");
      client.subscribe("telemetry/gokart22");

      return function cleanup() {

        console.log("CLEANUP");
        

      }
      

    }, []);
    
    useEffect(() => {
      
      console.log("UseEffect");

    });
    

    console.log(props);

    return (

        <Container maxWidth="xl" color="#4833C4">

        <Grid container direction="row" justify="center" alignItems="center">

            <Grid item container='true'xs={6} justify="center" >
              
              <Grid container direction="column" justify="center" alignItems="center" style={topCSS}>
                <Grid item container='true'xs={6} justify="center" >

                  <h1>
                  Team 1200W!!
                  </h1> 
                  
                </Grid>
                <Grid item container='true'xs={12} justify="center" >

                <Line
                  data={G1WchartData}
                  options={{
                    animation: false,
                    title: { text: "W Gokart 1", display: true },
                    scales: {
                      yAxes: [
                        {
                 
                          type: 'linear',
                          position: 'left',
                        },
                      ],
                      xAxes: [
                        {
                          gridLines: {
                            display: false
                          }
                        }
                      ]
                    }
                  }}
                />
                
                </Grid>
                <Grid item container='true'xs={12} justify="center" >

                  <Line
                    data={G1WhchartData}
                    options={{
                      animation: false,
                      title: { text: "Wh Gokart 1", display: true },
                      scales: {
                        yAxes: [
                          {
                            type: 'linear',
                            position: 'left',
                          },
                        ],
                        xAxes: [
                          {
                            gridLines: {
                              display: false
                            }
                          }
                        ]
                      }
                    }}
                  />

                </Grid>
                
                <Grid item container='true'xs={6} justify="center" >

                </Grid>
                
              </Grid>


            </Grid>

            <Grid item container='true' xs={6} justify="center" >

              <Grid container direction="column" justify="center" alignItems="center" style={topCSS}>
                <Grid item container='true'xs={6} justify="center" >

                  <h1>
                  Team 800W!!
                  </h1> 
                  
                </Grid>
                <Grid item container='true'xs={12} justify="center" >

                <Line
                  data={G2WchartData}
                  options={{
                    animation: false,
                    title: { text: "W Gokart 1200", display: true },
                    scales: {
                      yAxes: [
                        {
                 
                          type: 'linear',
                          position: 'left',
                        },
                      ],
                      xAxes: [
                        {
                          gridLines: {
                            display: false
                          }
                        }
                      ]
                    }
                  }}
                />
                
                </Grid>
                <Grid item container='true'xs={12} justify="center" >

                  <Line
                    data={G2WhchartData}
                    options={{
                      animation: false,
                      title: { text: "Wh Gokart 1200", display: true },
                      scales: {
                        yAxes: [
                          {
                            type: 'linear',
                            position: 'left',
                          },
                        ],
                        xAxes: [
                          {
                            gridLines: {
                              display: false
                            }
                          }
                        ]
                      }
                    }}
                  />

                </Grid>
                
                <Grid item container='true'xs={6} justify="center" >


                </Grid>
                
              </Grid>


            </Grid>
    

        </Grid>
      </Container>
            
    );

}

export default Gokarts;