import React from "react";
import WeatherTile from "./WeatherTile";
import moment from "moment";
import { Link } from "react-router-dom";

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
  return newData.map((day, item) => {
    const dateId = day.dt;
    return (
        <WeatherTile key={day.dt} {...day} date={day.dt_txt} />
    );
  });
  // const { data: weatherData } = this.props;
  // console.log(weatherData);
  // if (!weatherData) return <div>Loading...</div>;
  // let days = [];
  // const newData = [...weatherData].filter(day => {
  //   let dateFromAPI = moment.unix(day.dt).date();
  //   if (days.indexOf(dateFromAPI) > -1) {
  //     return false;
  //   } else {
  //     days.push(dateFromAPI);
  //     return true;
  //   }
  // });
  // return newData.map((day, item) => {
  //   const dateId = day.dt;
  //   return (
  //     <Link to={`/w/${dateId}`}>
  //       <WeatherTile key={day.dt} index={item} {...day} date={day.dt_txt} />
  //     </Link>
  //   );
  // });
  return (
    <p>Hi</p>
  )
};

export default WeatherTileList;
