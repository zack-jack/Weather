import React, { Component } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

import Current from './Current/Current';
import Forecast from './Forecast/Forecast';
import Header from './Header';
import InvalidSearch from './InvalidSearch';
import Landing from './Landing';

import isEmpty from '../utils/isEmpty';

/* Font awesome icons library */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faSearch, faMapMarkerAlt);

const api_key = process.env.REACT_APP_WEATHER_API_KEY;

class Weather extends Component {
  state = {
    searchValue: '',
    countryCode: '',
    searchType: '',
    currentData: {},
    forecastData: {},
    error: false,
    invalidSearch: false,
    loadingData: false,
    loadingPage: true
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loadingPage: false });
    }, 800);
  }

  getWeather = e => {
    e.preventDefault();

    this.setState({ loadingData: true });

    const target = e.target.elements;
    const searchValue = target.search.value;
    const countryCode = target.country.value.toUpperCase();

    if (isEmpty(searchValue)) {
      this.setState({ error: true, invalidSearch: true });
    }

    this.setState({ searchValue, countryCode });

    /* Check search type */
    const isNumbers = /^\d{0,7}$/.test(searchValue);
    const isLetters = /^[a-zA-Z]+$/.test(searchValue);

    if (isNumbers) {
      this.setState({ searchType: 'byZip' });
    } else if (isLetters) {
      this.setState({ searchType: 'byCity' });
    } else {
      this.setState({ error: true });
    }

    /* Define the correct API query string */
    let route;
    if (isNumbers) {
      route = `//api.openweathermap.org/data/2.5/weather?zip=${searchValue}&appid=${api_key}&units=imperial`;
      this.setState({ searchType: 'byZip' });
    } else if (isLetters) {
      route = `//api.openweathermap.org/data/2.5/weather?q=${searchValue},${countryCode}&appid=${api_key}&units=imperial`;
      this.setState({ searchType: 'byCity' });
    } else {
      this.setState({ error: true });
    }

    /* Get data from API */
    axios
      .get(route)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            currentData: res.data,
            error: false,
            invalidSearch: false
          });
        } else {
          this.setState({
            error: true
          });
        }
      })
      .catch(err => {
        if (err.response.data.cod === '404') {
          this.setState({ error: true, invalidSearch: true });
        } else {
          console.log(err);
        }
      });

    /* Clear loading spinner */
    setTimeout(() => {
      this.setState({
        loadingData: false
      });
    }, 800);

    /* Clear the search input field */
    e.target.reset();
  };

  getForecast = e => {
    e.preventDefault();

    this.setState({ currentData: {}, loadingData: true });

    const { searchValue, countryCode, searchType } = this.state;

    /* Define the correct API query string */
    let route;

    if (searchType === 'byZip') {
      route = `//api.openweathermap.org/data/2.5/forecast?zip=${searchValue},${countryCode}&appid=${api_key}&units=imperial`;
    } else if (searchType === 'byCity') {
      route = `//api.openweathermap.org/data/2.5/forecast?q=${searchValue},{countryCode}&appid=${api_key}&units=imperial`;
    } else {
      this.setState({ error: true });
    }

    /* Get data from API */
    axios
      .get(route)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            forecastData: res.data,
            error: false,
            invalidSearch: false
          });
        } else {
          this.setState({
            error: true
          });
        }
      })
      .catch(err => {
        if (err.response.data.cod === '404') {
          this.setState({ error: true, invalidSearch: true });
        } else {
          console.log(err);
        }
      });

    /* Clear loading spinner */
    setTimeout(() => {
      this.setState({
        loadingData: false
      });
    }, 800);
  };

  renderSpinner = (isLoading, variant) => {
    if (isLoading) {
      return (
        <div className={`spinner spinner--${variant}`}>
          <ClipLoader
            sizeUnit={'px'}
            size={150}
            color={'#5f27cd'}
            loading={isLoading}
          />
        </div>
      );
    }
  };

  renderElement = () => {
    const { currentData, forecastData, invalidSearch } = this.state;
    const dataReady = currentData.cod === 200;
    const forecastReady = forecastData.cod === '200';

    if (invalidSearch) {
      return <InvalidSearch />;
    }

    if (dataReady) {
      return (
        <Current currentData={currentData} getForecast={this.getForecast} />
      );
    } else if (forecastReady) {
      return <Forecast forecastData={forecastData} />;
    } else {
      return <Landing />;
    }
  };

  render() {
    const { loadingData, loadingPage } = this.state;

    return (
      <div>
        {loadingPage ? (
          this.renderSpinner(loadingPage, 'full')
        ) : (
          <div className="weather">
            <Header getWeather={this.getWeather} />
            {loadingData
              ? this.renderSpinner(loadingData, 'content')
              : this.renderElement()}
          </div>
        )}
      </div>
    );
  }
}

export default Weather;
