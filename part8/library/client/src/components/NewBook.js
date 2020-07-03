import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";

export const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [addBook] = useMutation(ADD_BOOK, {
    update(cache, { data: { addBook } }) {
      const { allBooks } = cache.readQuery({ query: ALL_BOOKS });
      const { allAuthors } = cache.readQuery({ query: ALL_AUTHORS });
      cache.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: allBooks.concat(addBook) },
      });
      const author = allAuthors.find((a) => a.name === addBook.author);
      let updatedAuthors;
      if (!author) {
        updatedAuthors = allAuthors.concat({
          name: addBook.author,
          bookCount: 1,
        });
      } else {
        updatedAuthors = allAuthors.map((a) =>
          a.name === addBook.author ? { ...a, bookCount: a.bookCount + 1 } : a
        );
      }
      cache.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: updatedAuthors,
        },
      });
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    console.log("add book...", title, published, author, genres);
    addBook({
      variables: { title, published: Number(published), author, genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};
