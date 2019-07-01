import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');

  const fetchData = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }
  useEffect(fetchData, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
  }
  const addPerson = (event) => {
    event.preventDefault();
    const personExists = !!persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
    if (personExists) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onSearchChange={handleSearchChange} search={search} />
      <h2>Add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        onNameChange={handleNameChange}
        name={newName}
        onNumberChange={handleNumberChange}
        number={newNumber}
      />
      <h2>Numbers</h2>
      <Persons search={search} persons={persons} />
    </div>
  )
}

export default App
