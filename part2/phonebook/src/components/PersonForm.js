import React from 'react';

const PersonForm = ({ onSubmit, onNameChange, name, onNumberChange, number }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input type="text" onChange={onNameChange} value={name} />
      </div>
      <div>
        number: <input type="text" onChange={onNumberChange} value={number} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
