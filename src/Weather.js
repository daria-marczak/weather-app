import React, { Component } from "react";
import styles from "./Weather.css";
import 'bulma/css/bulma.css';
// import moment from "moment";
import { VictoryPie } from "victory";
import moment from "moment";

class Weather extends Component {

  render() {
    console.log(this.props);
    const arrayOfData = Object.assign([], this.props);
    console.log(arrayOfData);
    // const { "0",..."39": weatherData} = this.props;
    // console.log(Object.values(data));
    const selected = this.props.match.params.dateId;
    // console.log(weatherData);
    const today = [];
    // const arr = Object.values(data).filter((day) => day).map(day=> day.dt == selected ? today.push(day) : false);
    // console.log(arr);
    // console.table(today[0].dt);
    // const todayData = Object.values(today);
    // const todayObj = todayData[0];
    // const humidity = todayObj.main.humidity;
    // // console.log(humidity);
    // const grayPart = 100 - `${humidity}`;
    // console.log(grayPart);
    return (
      <div className="info">
      {/* <h2>Showing data for { moment(todayObj.dt_txt).calendar().split(" at")[0] }</h2> */}
      <div className="columns">
        <div className="column is-one-third humidity">
          <p className="header">Humidity</p>
          {/* <VictoryPie
            innerRadius={80}
            labelComponent={<span/>}
            height={200} width={200}
            colorScale={["#EEE", "#fbc2eb"]}
            data={[{'key': "", 'y': `${humidity}`}, {'key': "", 'y': `${grayPart}`}] }
          />
          <p>{`${humidity}`}%</p> */}
        </div>
        <div className="column otherinfo">
          <div className="columns is-gapless">
            <div className="column is-one-fifth">
              <i className="fas fa-thermometer-quarter"></i>
            </div>
            <div className="column">
              {/* <p>Min temperature: {`${todayObj.main.temp_min}`}</p> */}
            </div>
          </div>
          <div className="columns is-gapless">
            <div className="column is-one-fifth">
              <i className="fas fa-tachometer-alt"></i>            
            </div>
            <div className="column">
              {/* <p>Pressure: {`${todayObj.main.pressure}`}</p> */}
            </div>    
          </div> 
          <div className="columns is-gapless">
          
            <div className="column is-one-fifth">                   
              <i className="fas fa-thermometer-three-quarters"></i>
            </div>
            <div className="column">
              {/* <p>Max temperature: {`${todayObj.main.temp_max}`}</p> */}
            </div>
            </div>
          <div className="columns is-gapless">
            
            <div className="column is-one-fifth">
              <i className="fas fa-cloud"></i>
            </div>
            <div className="column">
              {/* <p>Wind speed: {`${todayObj.wind.speed}`}</p> */}
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }

  
}

export default Weather;
