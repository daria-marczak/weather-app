import React, { Component } from "react";
import Form from "./Form";
import Weather from "./Weather";
import WeatherTileList from "./WeatherTileList";
import "./App.css";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import moment from "moment";

const API_KEY = "API_KEY";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "City name",
      lat: null,
      lng: null,
      data: {},
      refresh: true
    };
  }

  onChange = address => this.setState({ address });

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
              refresh: false
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
        <WeatherTileList data={weatherData} />
        {/* {weatherData && (
          <Route
            path="/w/:dateId"
            exact
            render={props => <Weather {...weatherData} {...props} />}
          />
        )} */}
      </div>
    );
  }
}

export default App;
