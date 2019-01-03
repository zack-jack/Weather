import React from 'react';

const Button = props => (
  <div className="weather__button-box">
    <button className="weather__button button" onClick={props.getForecast}>
      {props.text}
    </button>
  </div>
);

export default Button;
