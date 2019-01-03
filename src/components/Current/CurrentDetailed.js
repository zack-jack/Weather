import React from 'react';
import moment from 'moment';

const CurrentDetailed = ({ currentData }) => {
  const data = currentData;

  /* Converts meters to miles */
  /* 1 mile = 1609.34 meters */
  const miles = Math.round((100 * data.visibility) / 1609.34) / 100;

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

  const windDirection = Math.floor(data.wind.deg);

  const closest = directions
    .sort(
      (a, b) => Math.abs(windDirection - a) - Math.abs(windDirection - b)
    )[0]
    .toString();

  return (
    <div className="current-detailed">
      <div className="current-detailed__sunrise-sunset">
        <div className="current-detailed__sunrise">
          <i className="wi wi-sunrise" />
          <p>Sunrise</p>
          <p>
            {data.sys.sunrise === 0
              ? '-'
              : moment.unix(data.sys.sunrise).format('h:mm a')}
          </p>
        </div>

        <div className="current-detailed__sunset">
          <i className="wi wi-sunset" />

          <p>Sunset</p>
          <p>
            {data.sys.sunset === 0
              ? '-'
              : moment.unix(data.sys.sunset).format('h:mm a')}
          </p>
        </div>
      </div>

      <div className="current-detailed__atmosphere">
        <div className="current-detailed__humidity">
          <i className="wi wi-humidity" />
          <p>Humidity</p>
          <p>{data.main.humidity} %</p>
        </div>
        <div className="current-detailed__visibility">
          <i className="wi wi-dust" />
          <p>Visibility</p>
          <p>{miles} miles</p>
        </div>
      </div>

      <div className="current-detailed__wind">
        <div className="current-detailed__wind-dir">
          <i className={`wi wi-wind towards-${closest}-deg`} />
          <p>Wind Direction</p>
          <p>{windDirection} deg</p>
        </div>
        <div className="current-detailed__wind-speed">
          <i className="wi wi-strong-wind" />
          <p>Wind Speed</p>
          <p>{data.wind.speed} mph</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentDetailed;
