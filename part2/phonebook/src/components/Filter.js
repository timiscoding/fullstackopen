import React from 'react';

const Filter = ({ onSearchChange, search }) => {
  return (
    <p>filter shown with <input type="text" name="filter" onChange={onSearchChange} value={search} /></p>
  );
};

export default Filter;
