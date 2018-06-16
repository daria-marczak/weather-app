import React from "react";
import WeatherTile from "./WeatherTile";
import "./WeatherTileList.css";
import moment from "moment";

const WeatherTileList = ( props ) => {
  let days = [];
  const newData = Object.values(props.data).filter(day => {
    let dateFromAPI = moment.unix(day.dt).date();
    if (days.indexOf(dateFromAPI) > -1) {
      return false;
    } else {
      days.push(dateFromAPI);
      return true;
    }
  });
  const Tiles = newData.map((day, item) => {
    return (
        <WeatherTile key={day.dt} {...day} onDaySelect={props.onDaySelect} date={day.dt_txt} />
    );
  });

  return (
    <ul className="columns">
    { Tiles }
    </ul>
  );
};

export default WeatherTileList;
