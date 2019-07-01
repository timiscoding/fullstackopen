import React from 'react';
import Weather from './Weather';

const Country = ({
  country : { name, population, capital, languages, flag }
}) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>capital {capital}</p>
      <p>Population {population}</p>
      <h2>languages</h2>
      <ul>
        {languages.map(({ name }, i) => <li key={i}>{name}</li>)}
      </ul>
      <img src={flag} alt="flag" width={250} height={200} />
      <h2>Weather in {capital}</h2>
      <Weather city={capital} />
    </div>
  );
};

export default Country;
