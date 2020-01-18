import React from "react";
import styled from "styled-components";

const Button = styled.button`
  ${({ theme }) => `
  border-color: var(--btn-border-color, ${theme.grey});
  color: var(--btn-color, ${theme.fontDark});
  box-shadow: inset 0 2px 0 rgba(255,255,255,0.4), 0 1px 1px rgba(0,0,0,0.2);

  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  &:hover, &:focus {
    background-color: var(--btn-bg-color-hover, ${theme.greyLight});
    color: var(--btn-fg-color-hover, ${theme.fontDark});
  }
  &:active {
    background-color: var(--btn-bg-color-active, ${theme.greyDark});
    color: var(--btn-fg-color-active, ${theme.fontDark});
    box-shadow: inset 0 2px 0 rgba(0,0,0,0.6);
  }
  `}
  background-color: var(--btn-bg-color, #fff);
  border-width: 1px
  border-style: solid
  border-radius: 3px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: var(--btn-font-size, .8em);
`;

const ButtonView = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};

export default ButtonView;
