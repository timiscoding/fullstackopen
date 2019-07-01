import React from 'react';

const CountryList = ({ countries, onShowClick }) => {
  if (countries.length <= 1) return null;
  return countries.length <= 10
    ? (
      <ul>
        {countries.map((c, i) => (
          <li key={i}>
            {c.name}
            <button onClick={onShowClick(i)}>show</button>
          </li>
        ))}
      </ul>
    )
    : <p>Too many matches, specify another filter.</p>
};

export default CountryList;
