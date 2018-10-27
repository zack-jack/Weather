import React from "react";
import moment from "moment";

const CurrentDetailed = props => {
  const formattedTimestamp = moment
    .unix(props.timestamp)
    .format("ddd, MMM Do, YYYY h:mm a");

  /* Converts hPa to inHg */
  /* 1 inHg = 33.8639 hPa */
  const inchesHg = Math.round(100 * (props.pressure / 33.8639)) / 100;

  /* Converts meters to miles */
  /* 1 mile = 1609.34 meters */
  const miles = Math.round((100 * props.visibility) / 1609.34) / 100;

  const directions = [
    0,
    23,
    45,
    68,
    90,
    113,
    135,
    158,
    180,
    203,
    225,
    248,
    270,
    293,
    313,
    336
  ];

  const windDirection = Math.floor(props.windDirection);

  const closest = directions
    .sort(
      (a, b) => Math.abs(windDirection - a) - Math.abs(windDirection - b)
    )[0]
    .toString();

  return (
    <div>
      <div>
        <p>Currently viewing weather data for:</p>
        <h2>{props.timestamp === 0 ? "-" : formattedTimestamp}</h2>
      </div>

      <div>
        <h3>Sunrise & Sunset</h3>

        <div>
          <i className="wi wi-sunrise" />
          <p>Sunrise</p>
          <p>
            {props.sunrise === 0
              ? "-"
              : moment.unix(props.sunrise).format("h:mm a")}
          </p>
          <i className="wi wi-sunset" />
          <p>Sunset</p>
          <p>
            {props.sunset === 0
              ? "-"
              : moment.unix(props.sunset).format("h:mm a")}
          </p>
        </div>
      </div>

      <div>
        <h3>Atmosphere</h3>

        <div>
          <i className="wi wi-humidity" />
          <p>Humidity</p>
          <p>{props.humidity} %</p>
          <i className="wi wi-barometer" />
          <p>Barometric Pressure</p>
          <p>{inchesHg} inHg</p>
          <i className="wi wi-dust" />
          <p>Visibility</p>
          <p>{miles} miles</p>
        </div>
      </div>

      <div>
        <h3>Wind</h3>

        <div>
          <i className={`wi wi-wind towards-${closest}-deg`} />
          <p>Wind Direction</p>
          <p>{windDirection} deg</p>
          <i className="wi wi-strong-wind" />
          <p>Wind Speed</p>
          <p>{props.windSpeed} mph</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentDetailed;
