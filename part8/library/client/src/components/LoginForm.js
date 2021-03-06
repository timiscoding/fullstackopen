import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";

import { LOGIN } from "../queries";

export const LoginForm = ({ show, setToken, setPage, notify }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (err) => {
      notify(err.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      localStorage.setItem("library-user-token", token);
      setToken(token);
      setPage("books");
    }
  }, [result.data]);

  const submit = (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
  };

  if (!show) {
    return null;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            autoFocus
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};
