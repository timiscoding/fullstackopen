import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { EDIT_AUTHOR } from "../queries";

export const AuthorForm = () => {
  const [author, setAuthor] = useState("");
  const [born, setBorn] = useState("");

  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const submit = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name: author, setBornTo: parseInt(born) } });
  };

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="author">Name</label>
          <input
            type="text"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
          />
        </div>
        <div>
          <label htmlFor="born">Birth year</label>
          <input
            type="text"
            id="born"
            onChange={({ target }) => setBorn(target.value)}
            value={born}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};
