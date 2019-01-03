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
    <div className="weather__details">
      <div className="weather__timestamp">
        <p>Last updated:</p>
        <h2>{timestamp === 0 ? '-' : formattedTimestamp}</h2>
      </div>
      <div className="weather__current-detailed">
        <CurrentDetailed
          humidity={data.main.humidity}
          sunrise={data.sys.sunrise}
          sunset={data.sys.sunset}
          visibility={data.visibility}
          windDirection={data.wind.deg}
          windSpeed={data.wind.speed}
        />
      </div>
      <div className="weather__current">
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
      <Button route="/forecast" text="Get 5 Day Forecast" />
    </div>
  );
};

export default Current;
