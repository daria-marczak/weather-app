import React, { Component } from "react";
import Form from "./Form";
import Weather from "./Weather";
import WeatherTile from "./WeatherTile";
import "./App.css";
import * as weatherIcons from "./weatherIcons.json";
import "weather-icons/css/weather-icons.css";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import moment from "moment";

const API_KEY = "APIKEY";

class App extends Component {
  state = {
    address: "City name",
    lat: null,
    lng: null,
    data: {}
  };

  onChange = address => this.setState({
    address
  });

  handleFormSubmit = e => {
    e.preventDefault();
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        const lat = latLng.lat;
        const lng = latLng.lng;
        this.setState({
          lat,
          lng
        });
        fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
          )
          .then(response => response.json())
          .then(data => {
            const dataWeather = data;
            this.setState({
              data: dataWeather.list
            });
          });
      })
      .catch(error => console.error("Error", error));
  };
  
  generateWeatherData() {
    const weatherData = this.state.data;
    if (!weatherData) return null;
    let days = [];
    let today = moment().date();
    const newData = [...weatherData].filter( (day) => {
      let dateFromAPI = moment.unix(day.dt).date();
      if (days.indexOf(dateFromAPI) > -1){
        return false;
      } else {
        days.push(dateFromAPI);
        return true;
      };
    });

    return newData.map((day, item) => {
        if (item === 0) {
          return <div className="column is-12">
            <Weather key={day.dt} {...day} />
          </div>
        }
    });
  }

  generateTileData() {
    const weatherData = this.state.data;
    if (!weatherData) return null;
    let days = [];
    let today = moment().date();
    const newData = [...weatherData].filter( (day) => {
      let dateFromAPI = moment.unix(day.dt).date();
      if (days.indexOf(dateFromAPI) > -1){
        return false;
      } else {
        days.push(dateFromAPI);
        return true;
      };
    });

    return newData.map((day, item) => {
        if ( item=== 0) day.dt_txt = "Today";
        return (
          <WeatherTile key={day.dt} {...day} date={day.dt_txt}
          ></WeatherTile>
        )
    });
  }

  render() {
      const inputProps = {
        value: this.state.address,
        onChange: this.onChange
      };
      const weatherData = this.state.data;
      return (
        <div className="App">
          <h1> Weather application </h1>
            <span className="lead"> Get current weather of your location </span>
            <Form
              handleFormSubmit = { this.handleFormSubmit }
              inputProps = { inputProps }
            />
            <div className="columns weather">
              {this.generateWeatherData()}
            </div>
            <div className="columns is-gapless tiles">
              { this.generateTileData() }
            </div>
        </div>
          );
        }
      }

      export default App;