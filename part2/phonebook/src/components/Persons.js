import React from 'react';

const Persons = ({ search, persons, onDelete }) => {
  const rows = () => {
    const personsToShow = search
      ? persons.filter(p => p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      : persons;
    return personsToShow.map((p) => (
      <tr key={p.id}>
        <td>{p.name}</td>
        <td>{p.number}</td>
        <td><button onClick={onDelete(p.id)}>delete</button></td>
      </tr>));
  };

  return (
    <table>
      <tbody>
        {rows()}
      </tbody>
    </table>
  );
};

export default Persons;
