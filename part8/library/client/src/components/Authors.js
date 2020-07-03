import React from "react";
import { useQuery } from "@apollo/client";

import { Loading, AuthorForm } from "./";
import { ALL_AUTHORS } from "../queries";

export const Authors = (props) => {
  const { loading, data } = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }
  const authors = data?.allAuthors || [];

  if (loading) {
    return <Loading pageName="Authors" />;
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorForm />
    </div>
  );
};
