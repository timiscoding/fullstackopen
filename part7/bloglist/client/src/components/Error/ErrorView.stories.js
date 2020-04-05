import React from "react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import Error from "./";

export default {
  title: "Error",
  decorators: [withKnobs],
};

export const normal = () => (
  <Error
    error={{
      status: boolean("status", true) ? 404 : null,
      message: "Something bad happened. :(",
    }}
  />
);
