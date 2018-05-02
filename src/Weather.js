import React, { Component } from "react";
import styles from "./Weather.css";
import 'bulma/css/bulma.css';
import moment from "moment";

class Weather extends Component {
  render() {
    // const prefix = "wi wi-";
    const data = this.props;
    console.log(data);
    console.log(data.data[0])
    return (
      <div className="column is-twelve Weather">
        {
          data && (
          <h2>
          Detailed information about the weather for { moment(data.dt_txt).format("dddd") }
        </h2>
      )
      }
      </div>
    );
  }
}

// const Weather = ({ match }, props) => (
//   <div>
//     <h3>ID: {match.params.dateId}</h3>
//     <p>Temperature: {this.props.route.temp}</p>
//   </div>
// );

export default Weather;
