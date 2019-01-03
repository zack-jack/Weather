import React, { Component } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

import Current from './components/Current/Current';
import Header from './components/Header';
import InvalidSearch from './components/InvalidSearch';
import Landing from './components/Landing';

/* Font awesome icons library */
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

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
        country: '',
        sunrise: 0,
        sunset: 0
      },
      visibility: 0,
      weather: [
        {
          description: '',
          icon: ''
        }
      ],
      wind: {
        deg: 0,
        speed: 0
      }
    },
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

    const searchValue = e.target.elements.search.value;
    const selectedCountryCode = e.target.elements.country.value;

    /* Check if the search string is empty */
    const isEmpty = searchValue.length === 0 ? true : false;

    if (isEmpty) {
      this.setState({ error: true, invalidSearch: true });
    }

    /* Define the correct API query string */
    const isNumbers = /^\d{0,7}$/.test(searchValue);
    const isLetters = /^[a-zA-Z]+$/.test(searchValue);

    let route;
    if (isNumbers) {
      route = `http://api.openweathermap.org/data/2.5/weather?zip=${searchValue}&appid=${api_key}&units=imperial`;
    } else if (isLetters) {
      route = `http://api.openweathermap.org/data/2.5/weather?q=${searchValue},${selectedCountryCode}&appid=${api_key}&units=imperial`;
    } else {
      this.setState({ error: true });
    }

    /* Get data from API */
    axios
      .get(route)
      .then(res => {
        if (res.status === 200) {
          this.setState({
            data: res.data,
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

    setTimeout(() => {
      this.setState({
        loadingData: false
      });
    }, 500);

    /* Clear the search input field */
    e.target.reset();
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
    const timestamp = this.state.data.dt;

    if (!this.state.invalidSearch && timestamp === 0) {
      return <Landing />;
    } else if (this.state.invalidSearch) {
      return <InvalidSearch />;
    } else if (!this.state.invalidSearch && timestamp !== 0) {
      return <Current data={this.state.data} />;
    } else {
      return null;
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
