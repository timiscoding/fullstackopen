import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean } from "@storybook/addon-knobs";
import styled from "styled-components";
import Button from "./";

export default {
  title: "Button",
  decorators: [withKnobs]
};

export const normal = () => (
  <Button onClick={() => action("clicked")()} disabled={boolean("disabled")}>
    I am button
  </Button>
);

const MyButton = styled(Button)`
  --btn-border-color: #8b0000;
  --btn-color: #adff2f;
  --btn-fg-color-hover: #e0ffff;
  --btn-fg-color-active: #fffacd;
  --btn-bg-color: #d2691e;
  --btn-bg-color-hover: #b22222;
  --btn-bg-color-active: #8b0000;
`;

export const customButton = () => (
  <MyButton onClick={() => action("clicked")()} disabled={boolean("disabled")}>
    Custom button
  </MyButton>
);
