import React, { Component } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Header from "./Header";
import Search from "./Search";

/* Font awesome icons library */
library.add(faSearch);

const api_key = process.env.REACT_APP_WEATHER_API_KEY;

class Weather extends Component {
  state = {
    location: {
      city: undefined,
      country: undefined,
      zipcode: undefined
    },
    weatherOverview: {
      description: undefined,
      icon: undefined,
      sunrise: undefined,
      sunset: undefined
    },
    weatherDetailed: {
      temperature: undefined,
      humidity: undefined,
      tempMin: undefined,
      tempMax: undefined
    },
    wind: {
      speed: undefined,
      deg: undefined
    },
    error: undefined
  };

  render() {
    return (
      <div>
        <Header />
        <Search getWeather={this.getWeather} />
      </div>
    );
  }
}

export default Weather;
