import React from 'react';

const Button = props => (
  <div className="weather__button-box">
    <a href={props.route}>
      <button className="weather__button button">{props.text}</button>
    </a>
  </div>
);

export default Button;
