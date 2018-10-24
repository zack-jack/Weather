import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = props => (
  <div className="search__container">
    <form onSubmit={props.getWeather}>
      <input
        className="search__input"
        name="search"
        type="text"
        placeholder="Search..."
      />
      <button type="submit">
        <FontAwesomeIcon icon="search" />
      </button>
    </form>
  </div>
);

export default Search;
