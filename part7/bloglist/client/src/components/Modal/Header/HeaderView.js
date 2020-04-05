import React from "react";
import styled from "styled-components/macro";
import { padding } from "../styled";
import { styling } from "../../../constants";

const Header = styled.h2`
  margin: 0;
  font-size: 1.4rem;
  padding: ${padding.desktop} calc(1rem + 20px) 0 ${padding.desktop};
  ${styling.mobile(`
    font-size: 1.2rem;
    padding: ${padding.mobile} calc(1rem + 20px) 0 ${padding.mobile};
  `)}
`;

const HeaderView = ({ children }) => <Header>{children}</Header>;

export default HeaderView;
