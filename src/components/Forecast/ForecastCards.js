import React from 'react';

import ForecastCard from './ForecastCard';

const ForecastCards = () => {
  const renderCards = () => {
    this.cards.map(card => {
      return <ForecastCard />;
    });
  };
  return <div>{this.renderCards()}</div>;
};

export default ForecastCards;
