import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS } from "../queries";
import { Loading } from "./";

export const Books = (props) => {
  const [genre, setGenre] = useState(null);
  const { loading, data, refetch } = useQuery(ALL_BOOKS);

  const filterGenre = (g) => {
    refetch({
      genre: g !== "all genres" ? g : null,
    });
  };

  if (!props.show) {
    return null;
  }

  if (loading) {
    return <Loading pageName="Books" />;
  }

  const books = data?.allBooks || [];
  const genres = data?.allGenres.concat("all genres") || [];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map((g) => (
        <button key={g} onClick={() => filterGenre(g)}>
          {g}
        </button>
      ))}
    </div>
  );
};
