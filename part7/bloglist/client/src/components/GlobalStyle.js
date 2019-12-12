import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Verdana, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }

  a {
    color: ${({ theme }) => theme.secondaryDark};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;
