import React, { useState } from "react";
import { useApolloClient, useSubscription } from "@apollo/client";
import {
  Notify,
  NewBook,
  Books,
  Authors,
  LoginForm,
  Recommend,
} from "./components";
import { BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS } from "./queries";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const client = useApolloClient();

  const updateCacheWith = (book) => {
    const includedIn = (collection, obj) => {
      return collection.findIndex((o) => o.id === obj.id) !== -1;
    };

    const booksInStore = client.readQuery({ query: ALL_BOOKS });
    const authorsInStore = client.readQuery({ query: ALL_AUTHORS });
    if (!includedIn(booksInStore.allBooks, book)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          allBooks: booksInStore.allBooks.concat(book),
        },
      });
    }
    if (!includedIn(authorsInStore.allAuthors, book.author)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: {
          allAuthors: authorsInStore.allAuthors.concat(book.author),
        },
      });
    }
  };

  const { data } = useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded;
      notify(`Added new book ${book.title}`);
      updateCacheWith(book);
    },
  });

  const logout = () => {
    setToken(null);
    client.resetStore();
    localStorage.clear();
  };

  const notify = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {token ? (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
      </div>

      <Notify message={error} />

      <Authors show={page === "authors"} canEdit={!!token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
        setPage={setPage}
        notify={notify}
      />

      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
