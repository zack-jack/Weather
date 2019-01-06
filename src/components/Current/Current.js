import React from 'react';
import moment from 'moment';

import Button from '../Button';
import CurrentDetailed from './CurrentDetailed';
import CurrentOverview from './CurrentOverview';

const Current = ({ currentData, getForecast }) => {
  const timestamp = currentData.dt;
  const formattedTimestamp = moment
    .unix(timestamp)
    .format('ddd, MMM Do, YYYY h:mm a');

  return (
    <div className="current">
      <div className="current__wrapper">
        <div className="current__timestamp">
          <p>Last updated:</p>
          <h2>{timestamp === 0 ? '-' : formattedTimestamp}</h2>
        </div>
        <div className="current__detailed">
          <CurrentDetailed currentData={currentData} />
        </div>
        <div className="current__overview">
          <CurrentOverview currentData={currentData} />
        </div>
        <div className="current__button-box">
          <Button text="Get 5 Day Forecast" getForecast={getForecast} />
        </div>
      </div>
    </div>
  );
};

export default Current;
