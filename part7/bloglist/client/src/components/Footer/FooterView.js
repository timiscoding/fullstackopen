import React from "react";
import styled from "styled-components/macro";

const Footer = styled.div`
  background-color: ${({ theme }) => theme.primaryDark};
  color: ${({ theme }) => theme.fontLight};
  font-size: 0.8em;
  padding: 10px;
  text-align: center;
  margin-top: auto;

  a {
    color: ${({ theme }) => theme.secondary};
  }
`;

const FooterView = ({ className }) => {
  return (
    <Footer className={className}>
      Icons made by{" "}
      <a href="https://www.flaticon.com/authors/google" title="Google">
        Google
      </a>{" "}
      from{" "}
      <a href="https://www.flaticon.com/" title="Flaticon">
        www.flaticon.com
      </a>
    </Footer>
  );
};

export default FooterView;
