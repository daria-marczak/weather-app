import React, { Component } from "react";
import Form from "./Form";
import Weather from "./Weather";
import WeatherTile from "./WeatherTile";
import "./App.css";
import * as weatherIcons from "./weatherIcons.json";
import "weather-icons/css/weather-icons.css";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const API_KEY = "5aa634ad30831bfb81a9ffbbd5aa914a";

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
            <Weather />
          <ul>
            {
              [...weatherData].map((data) => {
                const myValues = data.dt_txt;
                const realHour = myValues.substring(10); 
                const hours = realHour.indexOf("12:00:00") > -1;
                console.log(hours); // true or false value
                hours === true ? console.log(data) : false;
                // hours === true ? Object.values(data).map((day) => (
                //   <WeatherTile date = { data.dt_txt }/>))
                hours === true ? [...data].map((day, key) => console.log(day, key)) : false // This gives a true / false value
                return hours === true ? [...data].map((day, key) => (<WeatherTile date={data.dt_txt}/>)) : false // This gives a true / false value
                
                })
              }
          </ul>
        </div>
          );
        }
      }

      export default App;