import React from "react";
import styled from "styled-components";
import Button from "../Button";

const StyledButton = styled(Button)`
  ${({ theme }) => `
  --btn-color: ${theme.fontLight};
  --btn-border-color: ${theme.primaryDark};
  --btn-bg-color: ${theme.primaryLight};
  --btn-bg-color-hover: ${theme.primary};
  --btn-fg-color-hover: ${theme.fontLight};
  --btn-bg-color-active: ${theme.primaryDark};
  --btn-fg-color-active: ${theme.fontLight};
  `}
`;

const PrimaryButton = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

export default PrimaryButton;
