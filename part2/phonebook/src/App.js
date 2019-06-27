import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }
  const addPerson = (event) => {
    event.preventDefault();
    const personExists = !!persons.find(p => p.name === newName);
    if (personExists) {
      alert(`${newName} is already added to the phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName }));
    setNewName('');
  }
  const numbers = () => persons.map((p, i) => <p key={i}>{p.name}</p>);

  return (
    <div>
      <div>debug: {JSON.stringify(persons, null, 2)}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input type="text" onChange={handleNameChange} value={newName} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {numbers()}
    </div>
  )
}

export default App
