import React, { Component } from "react";
import Form from "./Form";
import Weather from "./Weather";
import WeatherTile from "./WeatherTile";
import "./App.css";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import moment from "moment";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

const API_KEY = "API_KEY";

class App extends Component {
  state = {
    address: "City name",
    lat: null,
    lng: null,
    data: {},
    refresh: true
  };
  
  componentDidMount() {
    const storage = localStorage.getItem("weather");    
    this.hydrateStateWithLocalStorage();
  }

  onChange = address =>
    this.setState({
      address
    });

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
            localStorage.setItem("weather", JSON.stringify(data));
          });
      })
      .catch(error => console.error("Error", error));
  };

  hydrateStateWithLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key);
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          this.setState({ [key]: value });
        }
      }
    }
  }

  saveStateToLocalStorage() {
    for (let key in this.state) {
      localStorage.setItem(key, JSON.stringify(this.state[key]))
    }
  }

  generateTileData() {
    // const weatherData = this.state.data;
    const { data: weatherData } = this.state;
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

    return newData.map((day, item) => {
      const dateId = day.dt;
      return (
        <Link to={`/w/${dateId}`}>
          <WeatherTile key={day.dt} index={item} {...day} date={day.dt_txt} />
        </Link>
      );
    });
    
  };

  componentWillUnmount() {
    localStorage.removeItem("weather");
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
        <Router>
          <React.Fragment>
            <div className="columns is-gapless tiles">
              {this.generateTileData()}
            </div>
            { weatherData && <Route path="/w/:dateId" exact render={(props) => <Weather {...weatherData} {...props} />}/>}
          </React.Fragment>
        </Router>
      </div>
    );
  }
};

export default App;
