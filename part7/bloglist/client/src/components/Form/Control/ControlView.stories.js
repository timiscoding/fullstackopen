import React, { useState } from "react";
import { withKnobs } from "@storybook/addon-knobs";
import Control from "./";

export default {
  title: "Form.Control",
  decorators: [
    withKnobs,
    storyFn => {
      return <div style={{ margin: 20 }}>{storyFn()}</div>;
    }
  ],
  excludeStories: [/.*Control$/, "controlFactory"]
};

export const controlFactory = (type, placeholder, validator) => props => {
  const [value, setValue] = useState("");
  const [valid, setValid] = useState();
  const [error, setError] = useState();
  const handleChange = e => {
    setValue(e.target.value);
    const errorRes = validator(e.target.value);
    if (typeof errorRes === "string") {
      setValid(false);
      setError(errorRes);
    } else {
      setValid(errorRes);
      setError(null);
    }
  };
  return (
    <Control
      {...props}
      type={type}
      value={value}
      onChange={handleChange}
      valid={valid}
      error={error}
      placeholder={placeholder}
      onClear={type !== "textarea" ? () => setValue("") : null}
      autoFocus
    />
  );
};

const LoginControl = controlFactory(
  "text",
  "username",
  value => value.length > 0 || "Login must not be blank"
);
const AgeControl = controlFactory("text", "What's your age?", value => {
  if (value.length === 0) {
    return null; // don't style border
  }
  return /^\d+$/.test(value) || "Age must be a number";
});
const CommentControl = controlFactory(
  "textarea",
  "Comment  here",
  value => value.length > 0 || "Comment must not be empty"
);

export const Login = () => <LoginControl noValidStyle />;

export const Age = () => <AgeControl />;

export const Comment = () => <CommentControl />;
