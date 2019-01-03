import React from 'react';
import moment from 'moment';

import Button from '../Button';
import CurrentDetailed from './CurrentDetailed';
import CurrentOverview from './CurrentOverview';

const Current = props => {
  const data = props.data;
  const timestamp = data.dt;
  const formattedTimestamp = moment
    .unix(timestamp)
    .format('ddd, MMM Do, YYYY h:mm a');

  return (
    <div className="current">
      <div className="current__timestamp">
        <p>Last updated:</p>
        <h2>{timestamp === 0 ? '-' : formattedTimestamp}</h2>
      </div>
      <div className="current__detailed">
        <CurrentDetailed
          humidity={data.main.humidity}
          sunrise={data.sys.sunrise}
          sunset={data.sys.sunset}
          visibility={data.visibility}
          windDirection={data.wind.deg}
          windSpeed={data.wind.speed}
        />
      </div>
      <div className="current__overview">
        <CurrentOverview
          currentTemp={data.main.temp}
          icon={data.weather[0].icon}
          description={data.weather[0].description}
          city={data.name}
          country={data.sys.country}
          highTemp={data.main.temp_max}
          lowTemp={data.main.temp_min}
        />
      </div>
      <div className="current__button-box">
        <Button text="Get 5 Day Forecast" getForecast={props.getForecast} />
      </div>
    </div>
  );
};

export default Current;
