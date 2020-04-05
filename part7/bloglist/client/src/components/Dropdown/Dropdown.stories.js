import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, color, number } from "@storybook/addon-knobs";
import styled from "styled-components/macro";
import Dropdown from "./";

const MyDropdown = styled(Dropdown)`
  ${({
    width,
    borderWidth,
    borderColor,
    titleFg,
    titleBg,
    itemHighlight,
    listBg,
    fontSize
  }) => `
    --dd-width: ${width}px;
    --dd-border-width: ${borderWidth}px;
    --dd-border-color: ${borderColor};
    --dd-title-fg: ${titleFg};
    --dd-title-bg: ${titleBg};
    --dd-item-highlight-bg: ${itemHighlight};
    --dd-list-bg: ${listBg};
    --dd-font-size: ${fontSize}em;
  `}
`;

export default {
  title: "Dropdown",
  decorators: [
    withKnobs,
    storyFn => <div style={{ margin: 20 }}>{storyFn()}</div>
  ]
};

const options = [
  { value: "david", title: "David Brent" },
  { value: "tim", title: "Tim Canterbury" },
  { value: "garreth", title: "Garreth Keenan" },
  { value: "dawn", title: "Dawn Tinsley" }
];

export const normal = () => (
  <Dropdown
    defaultTitle="Choose"
    options={options}
    onChange={action("Chose")}
  />
);

export const defaultValue = () => (
  <Dropdown
    defaultTitle="Choose character"
    options={options}
    onChange={action("Chose")}
    defaultValue="garreth"
  />
);

export const customStyle = () => (
  <MyDropdown
    defaultTitle="Choose character"
    options={options}
    onChange={action("Chose")}
    width={number("width (px)", 200, {
      range: true,
      max: 600,
      min: 100,
      step: 50
    })}
    borderWidth={number("border width (px)", 4, {
      range: true,
      max: 20,
      min: 1,
      step: 1
    })}
    borderColor={color("border color", "#F5A620")}
    titleFg={color("title foreground", "green")}
    titleBg={color("title background", "#f8e710")}
    itemHighlight={color("item highlight background", "#08dead")}
    listBg={color("list background", "#abcdef")}
    fontSize={number("font size (em)", 1)}
  />
);
