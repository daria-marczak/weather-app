import React, { Component } from "react";
import Form from "./Form";
import Weather from "./Weather";
import "./App.css";
import * as weatherIcons from "./weatherIcons.json";
import "weather-icons/css/weather-icons.css";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const API_KEY = "5aa634ad30831bfb81a9ffbbd5aa914a";

class App extends Component {
  state = {
    temperature: undefined,
    address: "Poznań",
    humidity: undefined,
    description: undefined,
    icon: undefined,
    error: undefined
  };

  handleFormSubmit = e => {
    e.preventDefault();
    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
    this.onChange = address => this.setState({ address });
  };

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    try {
      const api_call = await fetch(
        // `api.openweathermap.org/data/2.5/&mode=json&APPID=${API_KEY}`
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${ API_KEY }&units=metric`
      );
      const data = await api_call.json();
      const prefix = "wi wi-";
      let code = data.weather[0].id;
      let icon = weatherIcons[code].icon;

      if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon;
      }

      console.log(data);

      if (city && country) {
        this.setState({
          temperature: Math.round(data.main.temp),
          city: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: prefix + icon,
          error: ""
        });
      } else {
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          humidity: undefined,
          description: undefined,
          icon: undefined,
          error: "Please enter city and country name"
        });
      }
    } catch (e) {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        icon: undefined,
        error: "Please enter a correct city name"
      });
    }
  };

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };
    return (
      <div className="App">
        <h1>Weather application</h1>
        <span className="lead">Get current weather of your location</span>
        <Form handleFormSubmit={this.handleFormSubmit} inputProps={inputProps}/>
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          humidity={this.state.humidity}
          description={this.state.description}
          icon={this.state.icon}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
