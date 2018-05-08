import React, { Component } from "react";
import styles from "./Weather.css";
import 'bulma/css/bulma.css';
import moment from "moment";

const Weather = ({ day }) => {
  console.log(day);
  const data = day;
  return (
    <p>{data.main.temp}</p>
  )
}

export default Weather;
