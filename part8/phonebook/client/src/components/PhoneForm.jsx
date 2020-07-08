import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";

import { EDIT_NUMBER } from "../queries";

export const PhoneForm = ({ setError }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [editNumber, result] = useMutation(EDIT_NUMBER, {
    onError: (err) => setError(err.graphQLErrors[0].message),
  });

  const submit = (e) => {
    e.preventDefault();
    editNumber({
      variables: { name, phone },
    });

    setName("");
    setPhone("");
  };

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError("Person not found");
    }
  }, [result.data]); // eslint-disable-line

  return (
    <div>
      <h2>Update number</h2>
      <form onSubmit={submit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            onChange={({ target }) => setName(target.value)}
            value={name}
          />
        </div>
        <div>
          <label>Phone</label>
          <input
            type="text"
            onChange={({ target }) => setPhone(target.value)}
            value={phone}
          />
        </div>
        <button type="submit">Update phone</button>
      </form>
    </div>
  );
};
