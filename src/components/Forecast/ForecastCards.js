import React from 'react';
import moment from 'moment';

import ForecastCard from './ForecastCard';

const ForecastCards = ({ forecastData }) => {
  const data = forecastData.list;

  /* Format data timestamps to day of the week strings array */
  const days = data.map(item => {
    const timestamp = item.dt;
    return moment.unix(timestamp).format('dddd');
  });

  /* Find unique days array */
  const daysUnique = days.filter((item, i) => {
    return days.indexOf(item) >= i;
  });

  return (
    <div className="forecast-cards">
      {daysUnique.map(day => {
        return <ForecastCard key={day} day={day} data={data} />;
      })}
    </div>
  );
};

export default ForecastCards;
