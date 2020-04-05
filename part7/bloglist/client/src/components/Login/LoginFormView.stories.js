import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import LoginForm from "./LoginFormView";

export default {
  title: "Forms",
  decorators: [withKnobs],
};

export const Login = () => (
  <LoginForm onLogin={action("submit")} pending={boolean("pending", false)} />
);
