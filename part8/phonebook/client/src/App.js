import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { Persons, PersonForm, PhoneForm } from "./components";
import { ALL_PERSONS } from "./queries";

function App() {
  const result = useQuery(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState(null);

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (result.loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
      <Persons persons={result.data.allPersons} />
    </div>
  );
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null;
  return <div style={{ color: "red" }}>{errorMessage}</div>;
};

export default App;
