import React, { Component } from "react";
import Form from "./Form";
import Weather from "./Weather";
import "./App.css";
import * as weatherIcons from "./weatherIcons.json";
import "weather-icons/css/weather-icons.css";

const API_KEY = "***";

class App extends Component {
  state = {
    temperature: undefined,
    city: undefined,
    humidity: undefined,
    description: undefined,
    icon: undefined,
    error: undefined
  };

  getWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    try {
      const api_call = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await api_call.json();
      const prefix = "wi wi-";
      let code = data.weather[0].id;
      let icon = weatherIcons[code].icon;

      if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon;
      }

      if (city) {
        this.setState({
          temperature: Math.round(data.main.temp),
          city: data.name,
          humidity: data.main.humidity,
          description: data.weather[0].description,
          icon: prefix + icon,
          error: ""
        });
      } else {
        this.setState({
          temperature: undefined,
          city: undefined,
          humidity: undefined,
          description: undefined,
          icon: undefined,
          error: "Please enter the value"
        });
      }
    } catch (e) {
      this.setState({
        temperature: undefined,
        city: undefined,
        humidity: undefined,
        description: undefined,
        icon: undefined,
        error: "Please enter a correct city name"
      });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Weather application</h1>
        <span className="lead">Get current weather of your location</span>
        <Form getWeather={this.getWeather} />
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
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
