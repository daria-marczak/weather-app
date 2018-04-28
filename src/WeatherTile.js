import React from "react";
import "./WeatherTile.css";
import 'bulma/css/bulma.css'

const WeatherTile = props => (
  <div className="column is-one-fifth WeatherTile">{props.date}</div>
)
      

export default WeatherTile;