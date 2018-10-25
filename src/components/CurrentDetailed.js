import React from "react";
import moment from "moment";

const CurrentDetailed = props => {
  const formattedTimestamp = moment
    .unix(props.timestamp)
    .format("ddd, MMM Do, YYYY h:mm a");

  return (
    <div>
      <div>
        <p>Currently viewing weather data for:</p>
        <h2>{props.timestamp === 0 ? "-" : formattedTimestamp}</h2>
      </div>

      <div>
        <h3>Sunrise & Sunset</h3>

        <div>
          <span className="wi wi-sunrise" />
          <p>Sunrise</p>
          <p>
            {props.sunrise === 0
              ? "-"
              : moment.unix(props.sunrise).format("h:mm a")}
          </p>
          <span className="wi wi-sunset" />
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
          <span className="wi wi-humidity" />
          <p>Humidity</p>
          <p>{props.humidity} %</p>
          <span className="wi wi-barometer" />
          <p>Barometric Pressure</p>
          <p>{props.pressure}</p>
          <span className="wi wi-dust" />
          <p>Visibility</p>
          <p>{props.visibility}</p>
        </div>
      </div>

      <div>
        <h3>Wind</h3>

        <div>
          <span className="wi wi-wind towards-45-deg" />
          <p>Wind Direction</p>
          <p>{props.windDirection}</p>
          <span className="wi wi-strong-wind" />
          <p>Wind Speed</p>
          <p>{props.windSpeed}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentDetailed;
