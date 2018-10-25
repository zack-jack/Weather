import React from "react";

const Current = props => {
  const responseIcon = props.icon;

  const getIconClass = responseIcon => {
    let iconClass;

    switch (responseIcon) {
      case "01d":
        iconClass = "wi wi-day-sunny";
        break;
      case "02d":
        iconClass = "wi wi-day-cloudy";
        break;
      case "03d":
        iconClass = "wi wi-cloudy";
        break;
      case "04d":
        iconClass = "wi wi-day-cloudy-high";
        break;
      case "09d":
        iconClass = "wi wi-day-showers";
        break;
      case "10d":
        iconClass = "wi wi-day-rain";
        break;
      case "11d":
        iconClass = "wi wi-day-thunderstorm";
        break;
      case "13d":
        iconClass = "wi wi-day-snow";
        break;
      case "50d":
        iconClass = "wi wi-fog";
        break;
      case "01n":
        iconClass = "wi wi-night-clear";
        break;
      case "02n":
        iconClass = "wi wi-night-cloudy";
        break;
      case "03n":
        iconClass = "wi wi-cloudy";
        break;
      case "04n":
        iconClass = "wi wi-cloudy-high";
        break;
      case "09n":
        iconClass = "wi wi-night-showers";
        break;
      case "10n":
        iconClass = "wi wi-night-rain";
        break;
      case "11n":
        iconClass = "wi wi-night-lightning";
        break;
      case "13n":
        iconClass = "wi wi-night-snow";
        break;
      case "50n":
        iconClass = "wi wi-night-fog";
        break;
      default:
        break;
    }

    return iconClass;
  };

  return (
    <div>
      <div>
        <h2>
          {Math.floor(props.currentTemp)}
          <span className="wi wi-fahrenheit" />
        </h2>
        <span className={getIconClass(responseIcon)} />
        <h3>{props.description}</h3>
        <h3>
          {props.city}, {props.country}
        </h3>
      </div>

      <div>
        <span className="wi wi-direction-up" />
        <p>
          Today's high: {Math.floor(props.highTemp)}{" "}
          <span className="wi wi-fahrenheit" />
        </p>
        <span className="wi wi-direction-down" />
        <p>
          Today's low: {Math.floor(props.lowTemp)}{" "}
          <span className="wi wi-fahrenheit" />
        </p>
      </div>
    </div>
  );
};

export default Current;
