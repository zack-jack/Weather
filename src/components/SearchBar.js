import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = () => (
  <form>
    <input type="text" placeholder="Search..." />
    <button>
      <FontAwesomeIcon icon="search" />
    </button>
  </form>
);

export default SearchBar;
