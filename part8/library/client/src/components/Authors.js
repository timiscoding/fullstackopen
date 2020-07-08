import React from "react";
import { useQuery } from "@apollo/client";

import { Loading, AuthorForm } from "./";
import { ALL_AUTHORS } from "../queries";

export const Authors = ({ show, canEdit }) => {
  const { loading, data } = useQuery(ALL_AUTHORS);

  if (!show) {
    return null;
  }

  if (loading) {
    return <Loading pageName="Authors" />;
  }

  const authors = data?.allAuthors || [];

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
      {canEdit ? <AuthorForm /> : null}
    </div>
  );
};
