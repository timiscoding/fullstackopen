import React, { useState, useEffect } from 'react';
import personService from './services/persons';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState('');
  const [message, setMessage] = useState(null);

  const fetchData = () => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons);
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
    const newPerson = { name: newName, number: newNumber };
    const personExists = persons.find(p => p.name.toLowerCase() === newName.toLowerCase());
    if (personExists) {
      const replaceOk = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (!replaceOk) return;

      personService
        .update(personExists.id, newPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== personExists.id ? p : returnedPerson));
          setNewName('');
          setNewNumber('');
          setMessage({ text: `Updated number for ${returnedPerson.name}`, type: 'success' })
        })
        .catch(error => {
          setMessage({ text: `Information of ${newPerson.name} has already been removed from system`, type: 'error' });
          setPersons(persons.filter(p => p.name !== newPerson.name));
        });
    } else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNewNumber('');
          setMessage({ text: `Added ${newPerson.name} to phonebook`, type: 'success' });
        });
    }
  }
  const deletePerson = (id) => () => {
    console.log('delete person with id', id);
    const deleteOk = window.confirm(`Delete ${persons.find(p => p.id === id).name}?`);
    if (!deleteOk) return;
    personService
      .remove(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id));
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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
      <Persons search={search} persons={persons} onDelete={deletePerson} />
    </div>
  )
}

export default App
