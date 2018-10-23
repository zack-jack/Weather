import React from "react";
import ReactDOM from "react-dom";
import "normalize.css";
import "./styles/styles.scss";
import Weather from "./components/Weather";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<Weather />, document.getElementById("root"));

serviceWorker.unregister();
