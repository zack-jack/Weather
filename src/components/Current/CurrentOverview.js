import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import getIconClass from '../../utils/getIconClass';

const CurrentOverview = ({ currentData }) => {
  const data = currentData;
  const responseIcon = data.weather[0].icon;

  return (
    <div className="current-overview">
      <div className="current-overview__container">
        <h2 className="current-overview__temp">
          {Math.floor(data.main.temp)}
          <i className="current-overview__temp--deg wi wi-fahrenheit" />
        </h2>

        <div className="current-overview__condition">
          <i
            className={`${getIconClass(responseIcon)} current-overview__icon`}
          />
          <h3 className="current-overview__description">
            {data.weather[0].description}
          </h3>
        </div>
      </div>

      <div className="current-overview__location">
        <FontAwesomeIcon
          className="current-overview__location--icon"
          icon="map-marker-alt"
        />
        <h3 className="current-overview__location--text">
          {data.name ? `${data.name}, ${data.sys.country}` : ''}
        </h3>
      </div>

      <div className="current-overview__high-low">
        <div className="current-overview__high">
          <i className="wi wi-direction-up current-overview__high-icon" />
          <p className="current-overview__high-text">
            Today's high: {Math.floor(data.main.temp_max)}{' '}
            <i className="wi wi-fahrenheit" />
          </p>
        </div>

        <div className="current-overview__low">
          <i className="wi wi-direction-down current-overview__low-icon" />
          <p className="current-overview__low-text">
            Today's low: {Math.floor(data.main.temp_min)}{' '}
            <i className="wi wi-fahrenheit" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentOverview;
