import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { EDIT_AUTHOR, ALL_AUTHORS } from "../queries";

export const AuthorForm = () => {
  const [author, setAuthor] = useState("");
  const [born, setBorn] = useState("");

  const { data } = useQuery(ALL_AUTHORS);
  const [editAuthor] = useMutation(EDIT_AUTHOR);

  const submit = (e) => {
    e.preventDefault();
    editAuthor({ variables: { name: author, setBornTo: parseInt(born) } });
  };

  const authors = data.allAuthors || [];

  return (
    <div>
      <h2>Set Birth Year</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="author">Name</label>
          <select
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
            value={author}
          >
            <option value="">Choose an author</option>
            {authors.map((a) => (
              <option value={a.name}>{a.name}</option>
            ))}
          </select>
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
        <button type="submit" disabled={!author || !born}>
          Update author
        </button>
      </form>
    </div>
  );
};
