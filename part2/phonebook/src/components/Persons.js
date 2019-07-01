import React from 'react';

const Persons = ({ search, persons }) => {
  const rows = () => {
    const personsToShow = search
      ? persons.filter(p => p.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      : persons;
    return personsToShow.map((p, i) => (
      <tr key={i}>
        <td>{p.name}</td>
        <td>{p.number}</td>
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
