import React from 'react';
import moment from 'moment';

import getIconClass from '../../utils/getIconClass';

const ForecastCard = props => {
  const dayOfWeek = props.day;
  const data = props.data.filter(dataObj => {
    return moment.unix(dataObj.dt).format('dddd') === dayOfWeek;
  });

  const date = moment.unix(data[0].dt).format('MMM Do YYYY');

  const renderHeading = (title, subtitle) => {
    return (
      <div>
        <h2 className="forecast-card__title">{title}</h2>
        <h3 className="forecast-card__subtitle">{subtitle}</h3>
      </div>
    );
  };

  const renderListItems = dataArr => {
    return dataArr.map(dataObj => {
      return (
        <li key={dataObj.dt} className="forecast-card__list-item">
          <div className="forecast-card__hour">
            <h3>{moment.unix(dataObj.dt).format('h:mm a')}</h3>
          </div>

          <div className="forecast-card__weather">
            <div className="forecast-card__temp">
              <p>{Math.floor(dataObj.main.temp)}</p>
              <i className="wi wi-fahrenheit" />
            </div>

            <div className="forecast-card__conditions">
              <p>{dataObj.weather[0].description}</p>
            </div>
          </div>
        </li>
      );
    });
  };

  return (
    <div className="forecast-card">
      <div className="forecast-card__heading">
        {renderHeading(dayOfWeek, date)}
      </div>

      <div className="forecast-card__data">
        <ul className="forecast-card__list">{renderListItems(data)}</ul>
      </div>
    </div>
  );
};

export default ForecastCard;
