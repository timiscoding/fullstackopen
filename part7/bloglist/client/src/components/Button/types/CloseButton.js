import React from "react";
import styled from "styled-components/macro";
import { ReactComponent as CloseGlyph } from "../../../icons/clear.svg";
import { styling } from "../../../constants";

const defaults = { desktop: ".6rem", mobile: "1rem" };

const Button = styled.button`
  background: transparent;
  padding: calc(var(--desktop-size, ${defaults.desktop}) * 0.5);
  cursor: pointer;
  border: none;
  ${styling.mobile(`
    padding: calc(var(--mobile-size, ${defaults.mobile}) * 0.5);
  `)}
`;

const CloseIcon = styled(CloseGlyph)`
  /* remove small height that inline elements introduce by default
     https://stackoverflow.com/questions/27536428/inline-block-element-height-issue
  */
  vertical-align: top;
  width: var(--desktop-size, ${defaults.desktop});
  height: var(--desktop-size, ${defaults.desktop});
  fill: var(--color, ${({ theme }) => theme.greyDark});
  ${Button}:active & {
    fill: ${({ theme }) => theme.fontDark};
  }
  ${styling.mobile(`
    width: var(--mobile-size, ${defaults.mobile});
    height: var(--mobile-size, ${defaults.mobile});
  `)}
`;

const CloseButton = ({ onClick, ...props }) => {
  return (
    <Button {...props} onClick={onClick}>
      <CloseIcon />
    </Button>
  );
};

export default CloseButton;
