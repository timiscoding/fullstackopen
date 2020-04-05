import React from "react";
import styled from "styled-components/macro";

const StyledFieldset = styled.fieldset`
  padding: 0;
  margin: 0;
  border: none;
  min-width: 0;
`;

const Fieldset = ({ children, ...rest }) => (
  <StyledFieldset {...rest}>{children}</StyledFieldset>
);

export default Fieldset;
