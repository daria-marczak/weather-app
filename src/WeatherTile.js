import React from "react";
import "./WeatherTile.css";
import 'bulma/css/bulma.css'
import moment from "moment";

const WeatherTile = props => (
  <div className="column is-one-fifth WeatherTile">
    <h2>
      {props.date === "Today" ? "Today" : moment(props.date).format("dddd")}
    </h2>
    <div className="inside">
      
      {Math.round(props.main.temp) + "°C"}
    </div>
  </div>
)
      

export default WeatherTile;