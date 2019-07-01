import React from 'react';

const Filter = ({ onSearchChange, search }) => {
  return (
    <form>
      <label htmlFor="country">Find countries</label>
      <input type="text" id="country" onChange={onSearchChange} value={search} />
    </form>
  );
};

export default Filter;
