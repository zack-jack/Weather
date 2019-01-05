import React from 'react';

import park from '../images/park.svg';

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing__wrapper">
        <img src={park} alt="woman outdoors" className="landing__image" />
        <div className="landing__copy">
          <h1 className="landing__heading">
            Don't let bad weather ruin your next day out.
          </h1>
          <p className="landing__paragraph">
            Realtime weather data viewable directly on your device instantly.
          </p>
          <p className="landing__paragraph">
            Get started now by entering either a zip code or a city name and
            country code in the searchbar above!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
