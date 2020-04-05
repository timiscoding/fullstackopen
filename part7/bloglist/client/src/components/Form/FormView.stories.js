import React from "react";
import Form from "./";
import Button from "../Button";
import { withKnobs, boolean, object } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";

export default {
  title: "Form/Examples",
  decorators: [withKnobs],
};

const validators = {
  username: (value) =>
    /^\w+$/.test(value) || "Username must consist of letters, numbers and _-",
  password: (value) =>
    value.length > 2 || "Password must be at least 3 characters long",
  passwordConfirm: (confirmValue, { values }) =>
    values.password === confirmValue ||
    "Password and confirmation fields must match",
  email: (value) => value.length > 0 || "Email body must not be empty",
};

export const Register = () => {
  const pending = boolean("pending", false);
  const initState = object("initial state", {
    username: "",
    password: "",
    passwordConfirm: "",
  });
  return (
    <Form
      onSubmit={action("onSubmit")}
      pending={boolean("pending", false)}
      initState={initState}
    >
      {(
        { validity, errors, clearInput, submit, clear },
        { text, password }
      ) => {
        return (
          <>
            <Form.Group>
              <Form.Label htmlFor="username">Username</Form.Label>
              <Form.Control
                {...text("username", validators.username)}
                valid={validity.username}
                error={errors.username}
                onClear={clearInput("username")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Control
                {...password("password", validators.password)}
                valid={validity.password}
                error={errors.password}
                onClear={clearInput("password")}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="passwordConfirm">
                Confirm Password
              </Form.Label>
              <Form.Control
                {...password("passwordConfirm", validators.passwordConfirm)}
                valid={validity.passwordConfirm}
                error={errors.passwordConfirm}
                onClear={clearInput("passwordConfirm")}
              />
            </Form.Group>
            <Button onClick={submit} pending={pending}>
              Submit
            </Button>
            <Button onClick={clear} disabled={pending}>
              Clear
            </Button>
          </>
        );
      }}
    </Form>
  );
};

export const Email = () => {
  const pending = boolean("pending", false);
  return (
    <Form
      onSubmit={action("onSubmit")}
      pending={pending}
      initState={object("Initial state", { email: "" })}
    >
      {({ validity, errors, clearInput, submit }, { textarea }) => (
        <>
          <Form.Group>
            <Form.Label htmlFor="email">Email message</Form.Label>
            <Form.Control
              {...textarea("email", validators.email)}
              valid={validity.email}
              error={errors.email}
              onClear={clearInput("email")}
              placeholder="Type your message"
            />
          </Form.Group>
          <Button onClick={submit} pending={pending}>
            Send email
          </Button>
        </>
      )}
    </Form>
  );
};
