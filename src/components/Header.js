import React from 'react';

import Search from './Search';

const Header = props => (
  <div className="header">
    <a href="/" className="header__logo-container">
      <div className="header__logo wi wi-day-cloudy" />
      <h1 className="header__logo-text">weather.</h1>
    </a>

    <div className="header__search-container">
      <Search getWeather={props.getWeather} />
    </div>
  </div>
);

export default Header;
