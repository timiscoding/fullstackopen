import React, { useState } from "react";
import { withKnobs, boolean, color, radios } from "@storybook/addon-knobs";
import Input from "./";

export default {
  title: "Form.Input",
  parameters: {
    knobs: {
      timestamps: false,
    },
  },
  decorators: [
    withKnobs,
    (storyFn) => {
      return <div style={{ margin: 20 }}>{storyFn()}</div>;
    },
  ],
};

const inputFactory = ({ clearable, validator } = {}) => (props) => {
  const [value, setValue] = useState("");
  const [valid, setValid] = useState(null);
  const newProps = { ...props };
  if (clearable) {
    newProps.onClear = () => setValue("");
  }
  if (validator) {
    newProps.valid = valid;
  }
  return (
    <Input
      {...newProps}
      value={value}
      onChange={(e) => {
        const { value } = e.target;
        setValue(value);
        validator && setValid(validator(value));
      }}
    />
  );
};

const BasicInput = inputFactory();
const ClearableInput = inputFactory({ clearable: true });
const LoginInput = inputFactory({ validator: (value) => value.length > 0 });
const AgeInput = inputFactory({ validator: (value) => /^\d+$/.test(value) });

export const normal = () => (
  <BasicInput
    placeholder="no validation"
    type={radios("type", { text: "text", password: "password" }, "text")}
  />
);

export const ClearableButton = () => (
  <ClearableInput placeholder="type something to clear it" />
);

ClearableButton.story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

export const ValidateInput = () => {
  const type = radios("config examples", { login: "login", age: "age" }, "age");
  let style = boolean("custom colors", false)
    ? {
        "--input-valid-color": color("--input-valid-color", "gold"),
        "--input-invalid-color": color("--input-invalid-color", "darkorange"),
      }
    : {};

  return type === "age" ? (
    <AgeInput style={style} placeholder="age" />
  ) : (
    <LoginInput
      style={style}
      placeholder="username"
      noValidStyle={boolean("no valid style", true)}
    />
  );
};
