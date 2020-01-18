import React, { useState } from "react";
import styled from "styled-components";
import { action } from "@storybook/addon-actions";
import { withKnobs, number } from "@storybook/addon-knobs";
import Checkbox from "./";

export default {
  title: "Checkbox",
  decorators: [
    withKnobs,
    storyFn => {
      const [checked, setChecked] = useState();
      const onChange = () => {
        setChecked(!checked);
        action("changed")(!checked);
      };
      return React.cloneElement(storyFn(), { onChange, checked });
    }
  ]
};

const MyCheckbox = styled(Checkbox)`
  ${({ size, borderRadius, iconMargin, borderWidth }) => `
    --size: ${size}em;
    --border-radius: ${borderRadius}%;
    --icon-margin: ${iconMargin}px;
    --border-width: ${borderWidth}px;
  `}
`;

export const normal = () => <Checkbox value="burgers" />;

export const custom = () => (
  <MyCheckbox
    value="burgers"
    size={number("size (em)", 2, { range: true, min: 1, max: 10 })}
    borderRadius={number("border radius (%)", 50, {
      range: true,
      min: 0,
      max: 50
    })}
    iconMargin={number("icon margin (px)", 5, {
      range: true,
      min: 0,
      max: 20
    })}
    borderWidth={number("border width (px)", 2, {
      range: true,
      min: 1,
      max: 10
    })}
  />
);
