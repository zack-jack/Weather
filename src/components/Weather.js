import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Header from "./Header";
import SearchBar from "./SearchBar";

library.add(faSearch);

const Weather = () => (
  <div>
    <Header />
    <SearchBar />
  </div>
);

export default Weather;
