import React from "react";
import styled from "styled-components/macro";
import { styling } from "../../constants";

const StyledLabel = styled.label`
  margin-bottom: 5px;
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  ${styling.mobile(`
    font-weight: 500;
    font-size: 1rem;
  `)}
`;

const Label = ({ children, ...props }) => (
  <StyledLabel {...props}>{children}</StyledLabel>
);

export default Label;
