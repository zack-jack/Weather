import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import Button from "./Button";
import Current from "./Current";
import CurrentDetailed from "./CurrentDetailed";
import Header from "./Header";

/* Font awesome icons library */
library.add(faSearch, faMapMarkerAlt);

const api_key = process.env.REACT_APP_WEATHER_API_KEY;

class Weather extends Component {
  state = {
    data: {
      dt: 0,
      main: {
        humidity: 0,
        temp: 0,
        temp_max: 0,
        temp_min: 0
      },
      sys: {
        country: "",
        sunrise: 0,
        sunset: 0
      },
      visibility: 0,
      weather: [
        {
          description: "",
          icon: ""
        }
      ],
      wind: {
        deg: 0,
        speed: 0
      }
    },
    error: undefined
  };

  getWeather = e => {
    e.preventDefault();

    const searchValue = e.target.elements.search.value;
    const selectedCountryCode = e.target.elements.country.value;

    const hasNumber = string => {
      return /^\d{4,7}$/.test(string);
    };

    const hasLetters = string => {
      return /^[a-zA-Z]+$/.test(string);
    };

    if (hasNumber(searchValue) === true) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?zip=${searchValue}&appid=${api_key}&units=imperial`
        )
        .then(res => {
          this.setState({ data: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    } else if (hasLetters(searchValue) === true) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${searchValue},${selectedCountryCode}&appid=${api_key}&units=imperial`
        )
        .then(res => {
          this.setState({ data: res.data });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("Invalid search terms");
    }

    /* Clear the input field */
    e.target.reset();
  };

  render() {
    const timestamp = this.state.data.dt;

    if (timestamp === 0) {
      return <Header getWeather={this.getWeather} />;
    }

    const formattedTimestamp = moment
      .unix(timestamp)
      .format("ddd, MMM Do, YYYY h:mm a");

    return (
      <div className="weather">
        <Header getWeather={this.getWeather} />
        <div className="weather__details">
          <div className="weather__timestamp">
            <p>Last updated:</p>
            <h2>{this.timestamp === 0 ? "-" : formattedTimestamp}</h2>
          </div>
          <div className="weather__current-detailed">
            <CurrentDetailed
              humidity={this.state.data.main.humidity}
              sunrise={this.state.data.sys.sunrise}
              sunset={this.state.data.sys.sunset}
              visibility={this.state.data.visibility}
              windDirection={this.state.data.wind.deg}
              windSpeed={this.state.data.wind.speed}
            />
          </div>
          <div className="weather__current">
            <Current
              currentTemp={this.state.data.main.temp}
              icon={this.state.data.weather[0].icon}
              description={this.state.data.weather[0].description}
              city={this.state.data.name}
              country={this.state.data.sys.country}
              highTemp={this.state.data.main.temp_max}
              lowTemp={this.state.data.main.temp_min}
            />
          </div>
          <Button />
        </div>
      </div>
    );
  }
}

export default Weather;
