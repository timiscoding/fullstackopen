import React, { useState } from "react";
import { useQuery, useApolloClient, useSubscription } from "@apollo/client";

import { LoginForm, Persons, PersonForm, PhoneForm } from "./components";
import { ALL_PERSONS, PERSON_ADDED } from "./queries";

function App() {
  const result = useQuery(ALL_PERSONS);
  const [errorMessage, setErrorMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const updateCacheWith = (addedPerson) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_PERSONS });
    if (!includedIn(dataInStore, addedPerson)) {
      client.writeQuery({
        query: ALL_PERSONS,
        data: { allPersons: dataInStore.allPersons.concat(addedPerson) },
      });
    }
  };

  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.addedPerson;
      notify(`${addedPerson.name} added`);
      updateCacheWith(addedPerson);
    },
  });
  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <button onClick={logout}>logout</button>
      <Notify errorMessage={errorMessage} />
      <PersonForm setError={notify} updateCacheWith={updateCacheWith} />
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
