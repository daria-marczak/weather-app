import React from "react";
import "./Weather.css";
import "bulma/css/bulma.css";
import moment from "moment";
import {Doughnut} from 'react-chartjs-2';

const Weather = (props) => {
  if (!props.selectedDay) {
    return <div>Loading...</div>
  }

  const doughnutData = {
    datasets: [{
      data: [props.selectedDay.main.humidity, 100 - props.selectedDay.main.humidity],
      backgroundColor: [
        "#a6c1ee",
        "#EEE9E9",
      ]
    }]
  };
  
  return (
    <div className="info">
      <h2>Showing data for { moment(props.selectedDay.dt_txt).calendar().split(" at")[0] }</h2>
      <div className="columns is-mobile">
        <div className="column is-one-third is-mobile">
            <Doughnut className="doughnut" data={doughnutData} />
            <p>Humidity: {props.selectedDay.main.humidity}%</p>
        </div>
        <div className="column otherinfo">
          <div className="columns is-gapless is-mobile">
            <div className="column is-one-fifth">
              <i className="fas fa-thermometer-quarter" />
            </div>
            <div className="column is-mobile">
              <p>Min temperature: {Math.round(props.selectedDay.main.temp_min)}°C</p>
            </div>
          </div>

          <div className="columns is-gapless is-mobile">
            <div className="column is-one-fifth">
              <i className="fas fa-thermometer-three-quarters" />
            </div>
            <div className="column">
              <p>Max temperature: {Math.round(props.selectedDay.main.temp_max)}°C</p>
            </div>
          </div>
          <div className="columns is-gapless is-mobile">
            <div className="column is-one-fifth">
            
            <i className="fas fa-tachometer-alt" />
            </div>
            <div className="column">
            <p>Pressure: {props.selectedDay.main.pressure} hPa</p>
            </div>
          </div>

          <div className="columns is-gapless is-mobile">
            <div className="column is-one-fifth">
              <i className="fas fa-cloud" />
            </div>
            <div className="column">
              <p>Wind speed: {props.selectedDay.wind.speed} meter/sec</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
