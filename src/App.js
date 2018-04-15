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

  onChange = (address) => this.setState({ address });

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
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
          .then(response => response.json())
          .then(data => {
            const dataWeather = data;
            this.setState({
              data: dataWeather.list
            });
            // dataWeather.list.forEach(weatherDay => console.log(weatherDay.dt)); // This gives me every day's ID number so that I can map it
          })
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
        <h1>Weather application</h1>
        <span className="lead">Get current weather of your location</span>
        <Form
          handleFormSubmit={this.handleFormSubmit}
          inputProps={inputProps}
        />
        <Weather />
        <ul>
          {Object.keys(weatherData).map((data, key) => (
            <WeatherTile
              key={key}
              index={key}
              date={weatherData[key].dt_txt}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
