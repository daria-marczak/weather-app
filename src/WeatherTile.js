import React, { Component } from "react";
import "./WeatherTile.css";
import "bulma/css/bulma.css";
import moment from "moment";
import * as weatherIcons from "./weatherIcons.json";
import "weather-icons/css/weather-icons.css";

class WeatherTile extends Component {
  render() {
    const prefix = "wi wi-";
    const data = this.props;
    let code = data.weather[0].id;
    let icon = weatherIcons[code].icon;
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      icon = "day-" + icon;
    }
    return (
      <div className="column is-one-fifth WeatherTile">
        <h2>
          { moment(data.dt_txt).calendar().split(" at")[0] }
        </h2>
        <div className="inside">
          <p className="temperature">{Math.round(data.main.temp) + "°C"}</p>
          <i className={prefix + icon} />
        </div>
      </div>
    );
  }
}

export default WeatherTile;
