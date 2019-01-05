import React from 'react';

import ForecastCards from './ForecastCards';

const Forecast = ({ forecastData }) => {
  return (
    <div className="forecast">
      <ForecastCards forecastData={forecastData} />
    </div>
  );
};

export default Forecast;
