import React from "react";
import "./WeatherTile.css";
import "bulma/css/bulma.css";
import moment from "moment";
import * as weatherIcons from "./weatherIcons.json";
import "weather-icons/css/weather-icons.css";

const WeatherTile = (props) => {
  const prefix = "wi wi-";
  const {
    weather,
    weather: { id } = {},
    dt_txt,
    main: { temp } = {}
  } = props;
  const [weatherData] = weather;
  let code = weatherData.id;
  let icon = weatherIcons[code].icon;
  if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
    icon = "day-" + icon;
  };
  return (
    <li className="column WeatherTile is-one-fifth" onClick={() => props.onDaySelect(props)}>
      <h3>{ moment(props.dt_txt).calendar().split(" at")[0] }</h3>
      <div className="inside">
        <p className="temperature">{Math.round(props.main.temp) + "°C"}</p>
        <i className={prefix + icon} />
      </div>
    </li>
  );
};

export default WeatherTile;
