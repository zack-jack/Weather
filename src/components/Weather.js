import React, { Component } from "react";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Header from "./Header";
import Search from "./Search";

/* Font awesome icons library */
library.add(faSearch);

const api_key = process.env.REACT_APP_WEATHER_API_KEY;

class Weather extends Component {
  state = {
    results: [],
    query: "",
    error: undefined
  };

  getWeather = e => {
    /* Prevent page refresh on submission of search field */
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
      console.log("Zip code searched");
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?zip=${searchValue}&appid=${api_key}&units=imperial`
        )
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else if (hasLetters(searchValue) === true) {
      console.log("City, Country searched");
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${searchValue},${selectedCountryCode}&appid=${api_key}&units=imperial`
        )
        .then(res => {
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      console.log("Invalid search terms");
    }
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
