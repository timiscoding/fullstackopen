import React from "react";
import { action } from "@storybook/addon-actions";
import {
  withKnobs,
  boolean,
  optionsKnob as options,
  number,
  color,
} from "@storybook/addon-knobs";
import styled from "styled-components/macro";
import Button from "./";
import { CloseButton, LikeButton, MobileMenuButton } from "./";
import LoginIcon from "../../icons/login.svg";

export default {
  title: "Button",
  decorators: [withKnobs],
};

const buttonFactory = ({ icon, label }) => {
  const round = boolean("round", false);
  return (
    <Button
      key={Math.random()}
      onClick={() => action("clicked")()}
      disabled={boolean("disabled", false)}
      pending={boolean("pending", false)}
      round={round}
      icon={icon}
      appearance={options(
        "appearance",
        {
          default: "",
          primary: "primary",
          danger: "danger",
          add: "add",
        },
        "",
        {
          display: "inline-radio",
        }
      )}
    >
      {round ? (icon ? "" : "🙂") : label}
    </Button>
  );
};

export const normal = () => (
  <>
    {[{ icon: LoginIcon, label: "Login" }, { label: "No icon" }].map(
      buttonFactory
    )}
  </>
);

normal.story = {
  decorators: [
    (storyFn) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100%",
          justifyContent: "space-around",
        }}
      >
        {storyFn()}
      </div>
    ),
  ],
};

const MyButton = styled(Button)`
  transition: 0.2s ease-out;
  ${({ bg, bgHover, bgActive, fg, fgHover, fgActive, border }) => `
    --btn-border-color: ${border};
    --btn-color: ${fg};
    --btn-bg-color: ${bg};
    --btn-fg-color-hover: ${fgHover};
    --btn-bg-color-hover: ${bgHover};
    --btn-fg-color-active: ${fgActive};
    --btn-bg-color-active: ${bgActive};
  `}
`;

export const customButton = () => (
  <MyButton
    onClick={() => action("clicked")()}
    disabled={boolean("disabled", false)}
    fg={color("--btn-color", "aliceblue")}
    bg={color("--btn-bg-color", "steelblue")}
    fgHover={color("--btn-fg-color-hover", "plum")}
    bgHover={color("--btn-bg-color-hover", "rebeccapurple")}
    fgActive={color("--btn-fg-color-active", "mistyrose")}
    bgActive={color("--btn-bg-color-active", "crimson")}
    border={color("--btn-border-color", "transparent")}
  >
    Custom button
  </MyButton>
);

const CustomCloseButton = styled(CloseButton)`
  ${({ size, color }) => `
    --desktop-size: ${size.desktop};
    --mobile-size: ${size.mobile};
    --color: ${color};
  `}
`;

export const Close = () => {
  const dsize = number("desktop size", 1, {
    range: true,
    max: 4,
    min: 0.5,
    step: 0.25,
  });
  const msize = number("mobile size", 1, {
    range: true,
    max: 4,
    min: 0.5,
    step: 0.25,
  });
  return (
    <CustomCloseButton
      onClick={() => action("clicked")()}
      color={color("color", "grey")}
      size={{ desktop: `${dsize}rem`, mobile: `${msize}rem` }}
    />
  );
};

export const Like = () => <LikeButton onClick={action("liked")} />;

export const MobileMenu = () => (
  <MobileMenuButton
    showX={boolean("show x", false)}
    onClick={action("toggle menu")}
  />
);
