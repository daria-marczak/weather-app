import React from "react";
import styles from "./Weather.css";

const Weather = props => (
  <div className={styles.Weather}>
    <div className="container">
      {props.temperature && <p className="temperature">{props.temperature} °C</p>}
      {props.icon && <i className={props.icon} alt={props.description} />}
      {props.city &&
        props.city && (
          <p>
            Location: {props.city}
          </p>
        )}
      {props.humidity && <p>Humidity: {props.humidity} </p>}
      {props.description && <p>Conditions: {props.description} </p>}
      
      {props.error && <p>{props.error}</p>}
    </div>
  </div>
);

export default Weather;
