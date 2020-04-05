import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import RegisterForm from "./RegisterFormView";

export default {
  title: "Forms",
  decorators: [withKnobs],
};

export const register = () => (
  <RegisterForm
    pending={boolean("pending", false)}
    onSubmit={action("submitting")}
  />
);
