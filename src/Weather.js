import React, { Component } from "react";
import styles from "./Weather.css";
import 'bulma/css/bulma.css';
import moment from "moment";

class Weather extends Component {

  componentDidUpdate() {
    console.log(this.props.data);
    const data = this.props.data;
    localStorage.setItem("weather", JSON.stringify(data));
  }
  render() {
    const data = this.props.data;
    
    return (
      <div className="info">
        {data && (<p>Here goes the info</p>)}
      </div>
    )
  }

  
}

export default Weather;
