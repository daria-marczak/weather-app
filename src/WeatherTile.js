import React from "react";
import "./WeatherTile.css";

const WeatherTile = props => (
  <li className="WeatherTile">{props.date}</li>
)
      

export default WeatherTile;