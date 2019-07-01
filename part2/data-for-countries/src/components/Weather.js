import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);

  const fetchWeather = () => {
    const cityEnc = encodeURI(city);
    axios
      .get('https://api.apixu.com/v1/current.json?key=c553eacbcd2b4fb089e72147190107&q=' + cityEnc)
      .then(({ data: { current } }) => {
        console.log('weather', current);
        setWeather(current);
      });
  };
  useEffect(fetchWeather, []);

  if (weather === null) return null;
  const {temp_c, condition: { icon }, wind_kph, wind_dir} = weather;

  return (
    <div>
      <p><b>Temperature:</b> {temp_c}℃</p>
      <img src={icon} alt="temperature icon" />
      <p><b>Wind:</b> {wind_kph}kph direction {wind_dir}</p>
    </div>
  );
};

export default Weather;
