import React from "react";
import styled from "styled-components";

const Footer = styled.div`
  background-color: ${({ theme }) => theme.primaryDark};
  color: ${({ theme }) => theme.fontLight};
  font-size: 0.8em;
  padding: 10px;
  text-align: center;
  margin-top: auto;
`;

const FooterView = () => {
  return (
    <Footer>
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/google" title="Google">
          Google
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </Footer>
  );
};

export default FooterView;
