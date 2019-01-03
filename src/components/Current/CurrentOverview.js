import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CurrentOverview = props => {
  const responseIcon = props.icon;

  const getIconClass = responseIcon => {
    let iconClass;

    switch (responseIcon) {
      case '01d':
        iconClass = 'wi wi-day-sunny';
        break;
      case '02d':
        iconClass = 'wi wi-day-cloudy';
        break;
      case '03d':
        iconClass = 'wi wi-cloudy';
        break;
      case '04d':
        iconClass = 'wi wi-day-cloudy-high';
        break;
      case '09d':
        iconClass = 'wi wi-day-showers';
        break;
      case '10d':
        iconClass = 'wi wi-day-rain';
        break;
      case '11d':
        iconClass = 'wi wi-day-thunderstorm';
        break;
      case '13d':
        iconClass = 'wi wi-day-snow';
        break;
      case '50d':
        iconClass = 'wi wi-fog';
        break;
      case '01n':
        iconClass = 'wi wi-night-clear';
        break;
      case '02n':
        iconClass = 'wi wi-night-cloudy';
        break;
      case '03n':
        iconClass = 'wi wi-cloudy';
        break;
      case '04n':
        iconClass = 'wi wi-cloudy';
        break;
      case '09n':
        iconClass = 'wi wi-night-showers';
        break;
      case '10n':
        iconClass = 'wi wi-night-rain';
        break;
      case '11n':
        iconClass = 'wi wi-night-lightning';
        break;
      case '13n':
        iconClass = 'wi wi-night-snow';
        break;
      case '50n':
        iconClass = 'wi wi-night-fog';
        break;
      default:
        break;
    }

    return iconClass;
  };

  return (
    <div className="current-overview">
      <div className="current-overview__container">
        <h2 className="current-overview__temp">
          {Math.floor(props.currentTemp)}
          <i className="current-overview__temp--deg wi wi-fahrenheit" />
        </h2>

        <div className="current-overview__condition">
          <i
            className={`${getIconClass(responseIcon)} current-overview__icon`}
          />
          <h3 className="current-overview__description">{props.description}</h3>
        </div>
      </div>

      <div className="current-overview__location">
        <FontAwesomeIcon
          className="current-overview__location--icon"
          icon="map-marker-alt"
        />
        <h3 className="current-overview__location--text">
          {props.city ? `${props.city}, ${props.country}` : ''}
        </h3>
      </div>

      <div className="current-overview__high-low">
        <div className="current-overview__high">
          <i className="wi wi-direction-up current-overview__high-icon" />
          <p className="current-overview__high-text">
            Today's high: {Math.floor(props.highTemp)}{' '}
            <i className="wi wi-fahrenheit" />
          </p>
        </div>

        <div className="current-overview__low">
          <i className="wi wi-direction-down current-overview__low-icon" />
          <p className="current-overview__low-text">
            Today's low: {Math.floor(props.lowTemp)}{' '}
            <i className="wi wi-fahrenheit" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default CurrentOverview;