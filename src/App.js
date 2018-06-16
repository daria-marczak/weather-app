import React, { Component } from "react";
import Form from "./Form";
import Weather from "./Weather";
import WeatherTileList from "./WeatherTileList";
import "./App.css";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";

const API_KEY = "API_KEY";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "City name",
      lat: null,
      lng: null,
      data: {},
      selectedDay: null,
      showWeather: false
    };
  }

  onChange = address => {
    this.setState({ address })
  };

  handleFormSubmit = () => {
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
              data: dataWeather.list,
              selectedDay: dataWeather.list[0],
              showWeather: true
            });
          });
      })
      .catch(error => console.error("Error", error));
  };

  selectDay = selectedDay => {
    this.setState({ selectedDay });
    console.log("Changing the day to " + selectedDay)
  }

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.onChange
    };
    const { data: weatherData } = this.state;
    return (
      <div className="App">
        <h1> Weather application </h1>
        <span className="lead"> Get current weather of your location </span>
        <Form
          handleFormSubmit={this.handleFormSubmit}
          onEnterKeyDown={this.handleFormSubmit}
          inputProps={inputProps}
        />
        <WeatherTileList
          data={weatherData}
          className="columns is-gapless"
          onDaySelect={this.selectDay}
        />
        {this.state.showWeather && <Weather selectedDay={this.state.selectedDay} />}
      </div>
    );
  }
}

export default App;
