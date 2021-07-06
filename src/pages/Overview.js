
import Container from "@material-ui/core/Container";
import React, { useState, useEffect } from "react";
import {Line} from 'react-chartjs-2';
import mqtt from "mqtt";
//import mqttService from "./MqttService";

function Overview(props) {
 
  const websocketUrl = "ws://23.97.200.56:1888";
  const apiEndpoint = "/";
  
  function getClient(errorHandler) {
    const client = mqtt.connect(websocketUrl);
    client.stream.on("error", (err) => {
      errorHandler(`Connection to ${websocketUrl} failed`);
      client.end();
    });
    return client;
  }
  
  function subscribe(client, topic, errorHandler) {
    const callBack = (err, granted) => {
      if (err) {
        errorHandler("Subscription request failed");
      }
    };
    return client.subscribe(apiEndpoint + topic, callBack);
  }
  
  function onMessage(client, callBack) {
    client.on("message", (topic, message, packet) => {
      callBack(JSON.parse(new TextDecoder("utf-8").decode(message)));
    });
  }
  
  function unsubscribe(client, topic) {
    client.unsubscribe(apiEndpoint + topic);
  }
  
  function closeConnection(client) {
    client.end();
  }


    const [chartData, setChartData] = useState({});

    const [chartXVals, setXVals] = useState([]);
    const [chartYVals, setYVals] = useState([]);
    const [chartVVals, setVVals] = useState([]);

    const [mqttcli, setMqttClient] = useState(null);

    const chart = () => {
      
      let yvals = [];
      let xvals = [];
      
      //MQTT SUBSCRIBE HER

      setChartData({
        labels: chartXVals,
        datasets: [
          {
            label: "Ampere",
            yAxisID: "ampere",
            data: chartYVals,
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
            
          }, {
            label: "Voltage",
            yAxisID: "volt",
            data: chartVVals,
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgba(54, 162, 235, 0.2)',
          }
        ]
      });

    };
  
    function storeError() {

      console.log("StoreError");

    }

    function handleMessage(msg) {

      console.log(msg);
      
      let xtemp = [];

      xtemp.push(parseInt(msg.x));

      setXVals(msg);

      chart();

    }

    useEffect(() => {

      //chart();
      /*
      const client = mqttService.getClient(storeError);
      setMqttClient(client);
      const callBack = (mqttMessage) => handleMessage(mqttMessage);
      mqttService.onMessage(client, callBack);
      mqttService.subscribe(client, "telemetry/gokart1/voltage", storeError);
      return () => mqttService.closeConnection(client);
      */

      const client = getClient(storeError);
      setMqttClient(client);

      client.on("connect", () => {
        console.log("connected");
      })

      client.on("message", (topic, msg) => {

        let str = String.fromCharCode.apply(String, msg);

        console.log(str);
        
        let strobj = JSON.parse(str);

        //console.log(chartXVals);
        console.log(strobj.time);
        console.log(strobj.A);
        console.log(strobj.V);
        
        chartXVals.push(strobj.time);

        setXVals(chartXVals);
        
        chartYVals.push(strobj.A);
        setYVals(chartYVals);

        chartVVals.push(strobj.V);
        setVVals(chartVVals);
        
        chart();

      });

      client.subscribe("telemetry/gokart1");

      
      return function cleanup() {

        console.log("CLEANUP");
        client.end();

      }
      

    }, []);
    
    useEffect(() => {
      
      console.log("UseEffect");

    });

    console.log(props);

    return (
      <Container maxWidth="xl" color="#4833C4">
            <p>Overview.js</p>
            
        <Line
          data={chartData}
          options={{
            animation: false,
            title: { text: "Data monitor", display: true },
            scales: {
              yAxes: [
                {
                  id: "ampere",
                  type: 'linear',
                  position: 'right',
                },
                {
                  id: "volt",
                  position: "left",
                }
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

      </Container>
    );

}

export default Overview;