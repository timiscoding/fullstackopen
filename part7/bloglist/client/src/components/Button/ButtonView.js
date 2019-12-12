import React from "react";
import styled from "styled-components";

const Button = styled.button`
  ${({ theme }) => `
  border-color: var(--btn-border-color, ${theme.grey});
  color: var(--btn-color, ${theme.fontDark});
  &:hover {
    background-color: var(--btn-bg-color-hover, ${theme.greyLight});
    color: var(--btn-fg-color-hover, ${theme.fontDark});
  }
  &:active {
    background-color: var(--btn-bg-color-active, ${theme.greyDark});
    color: var(--btn-fg-color-active, ${theme.fontLight});
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
