import React from "react";
import styles from "./Weather.css";
import 'bulma/css/bulma.css';

const Weather = props => (
  <div className="column is-12">
    <h4 className="forecast-title">Forecast for next 5 days</h4>
    {/* <div className="container">
      {props.temperature && <p className="temperature">{props.temperature} °C</p>}
      {props.icon && <i className={props.icon} alt={props.description} />}
      <div className="info">
        {props.city &&
          props.city && (
            <p>
              Location: {props.city}, {props.country}
            </p>
          )}
        {props.humidity && <p>Humidity: {props.humidity} </p>}
        {props.description && <p>Conditions: {props.description} </p>}
        
        {props.error && <p>{props.error}</p>}
      </div>
    </div> */}
  </div>
);

export default Weather;
