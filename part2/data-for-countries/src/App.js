import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import CountryList from './components/CountryList';
import Country from './components/Country';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [showCountry, setShowCountry] = useState(null);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setShowCountry(null);
  };

  const handleShowClick = (countryListIndex) => () => {
    setShowCountry(countryListIndex);
  };

  const fetchData = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(({ data }) => {
        setCountries(data);
      });
  };

  useEffect(fetchData, []);

  const countryList = search
      ? countries.filter(c => c.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      : [];
  if (countryList.length === 1 && showCountry !== 0) {
    setShowCountry(0);
  }

  return (
    <div>
      <Filter onSearchChange={handleSearchChange} search={search} />
      <CountryList countries={countryList} onShowClick={handleShowClick} />
      { showCountry !== null ? <Country country={countryList[showCountry]} /> : '' }
    </div>
  );
}

export default App;
