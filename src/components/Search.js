import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { countries } from '../utils/CountryCodes';

const countriesSorted = countries.sort((a, b) => {
  return a.code < b.code ? -1 : a.code > b.code ? 1 : 0;
});

const Search = props => (
  <div className="search">
    <form onSubmit={props.getWeather}>
      <input
        autoComplete="off"
        className="search__input"
        name="search"
        type="text"
        placeholder="Search by zip code or by city"
      />
      <select className="search__option" name="country">
        <option value="us">US</option>
        {countriesSorted.map(country => {
          return (
            <option value={country.code} key={country.name}>
              {country.code}
            </option>
          );
        })}
        ;
      </select>
      <button className="search__icon" type="submit">
        <FontAwesomeIcon icon="search" />
      </button>
    </form>
  </div>
);

export default Search;
