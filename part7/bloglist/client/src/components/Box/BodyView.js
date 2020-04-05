import React from "react";
import styled from "styled-components/macro";

export const Body = styled.div`
  margin: 20px;
  form {
    margin-top: -20px;
  }
`;

const BodyView = ({ children }) => {
  return <Body>{children}</Body>;
};

export default BodyView;
