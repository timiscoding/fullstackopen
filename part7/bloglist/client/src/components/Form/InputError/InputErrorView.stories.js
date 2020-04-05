import React from "react";
import InputError from "./";
import { withKnobs, boolean } from "@storybook/addon-knobs";

export default {
  title: "Form.InputError",
  decorators: [
    withKnobs,
    (storyFn) => (
      <div
        style={{
          width: 100,
          height: 100,
          border: "2px solid green",
          overflow: "auto",
          resize: "both",
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
};

export const normal = () => {
  const show = boolean("show", false);

  return (
    <InputError>
      {show ? "This is a mild error. No need to be alarmed." : null}
    </InputError>
  );
};
