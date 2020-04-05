import React from "react";
import styled from "styled-components/macro";
import { padding } from "../styled";
import { styling } from "../../../constants";

const Footer = styled.div`
  padding: 0 ${padding.desktop} ${padding.desktop};
  margin-top: 10px;
  ${styling.mobile(`
    padding: 0 ${padding.mobile} ${padding.mobile};
  `)}
`;

const FooterView = ({ children }) => <Footer>{children}</Footer>;

export default FooterView;
