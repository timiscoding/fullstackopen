import React from "react";
import styled from "styled-components/macro";
import { padding } from "../styled";
import { styling } from "../../../constants";

const Body = styled.div`
  padding: 0 ${padding.desktop};
  margin-top: 10px;
  ${styling.mobile(`
    padding: 0 ${padding.mobile};
  `)}
`;

const BodyView = ({ children }) => <Body>{children}</Body>;

export default BodyView;
