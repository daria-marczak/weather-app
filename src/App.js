import React, { Component } from "react";
import Form from "./Form";
import Weather from "./Weather";
import WeatherTile from "./WeatherTile";
import "./App.css";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import moment from "moment";
import { BrowserRouter as Router, Link, Route} from "react-router-dom";


const API_KEY = "API_KEY";

class App extends Component {
  state = {
    address: "City name",
    lat: null,
    lng: null,
    data: {}
  };

  onChange = address =>
    this.setState({
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

  generateTileData() {
    const weatherData = this.state.data;
    if (!weatherData) return null;
    let days = [];
    
    const newData = [...weatherData].filter(day => {
      let dateFromAPI = moment.unix(day.dt).date();
      if (days.indexOf(dateFromAPI) > -1) {
        return false;
      } else {
        days.push(dateFromAPI);
        return true;
      }
    });
    // console.log(days)
    return newData.map((day, item) => {
      const dateId = day.dt;
      return (
        <Link to={`/w/${dateId}`}>
          <WeatherTile key={day.dt} index={item} {...day} date={day.dt_txt} />
        </Link>
      );
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
          handleFormSubmit={this.handleFormSubmit}
          inputProps={inputProps}
        />
        <Router>
          <React.Fragment>
            <div className="columns is-gapless tiles">
              {this.generateTileData()}
            </div>
          {weatherData && <Route path="/w/:dateId" render={({ match }) => <Weather day={[...weatherData].find(day => day.dt == match.params.dateId)} />} />}
         </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
