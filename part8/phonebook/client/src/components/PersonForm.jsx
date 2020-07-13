import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_PERSON } from "../queries";

export const PersonForm = ({ setError, updateCacheWith }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");

  const [createPerson] = useMutation(CREATE_PERSON, {
    update: (store, response) => {
      updateCacheWith(response.data.addPerson);
    },
    onError: (error) => setError(error.graphQLErrors[0].message),
  });

  const submit = (e) => {
    e.preventDefault();
    createPerson({
      variables: {
        name,
        phone: phone.length ? phone : null,
        street,
        city,
      },
    });
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name{" "}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone{" "}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street{" "}
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city{" "}
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
};
