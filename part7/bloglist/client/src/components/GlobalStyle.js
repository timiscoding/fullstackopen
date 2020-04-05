import { createGlobalStyle } from "styled-components/macro";
import { styling } from "../constants";
import varFont from "../fonts/Inter.var.woff2";

export default createGlobalStyle`
  @font-face {
    font-family: "Inter Variable";
    src: url("${varFont}") format("woff2");
    font-display: optional;
  }

  html, body, #root {
    height: 100%;
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  html {
    -webkit-text-size-adjust: 100%; /* Prevent font scaling in landscape while allowing user zoom */
    ${styling.mobile(`
      font-size: 14px;
    `)}
    ${styling.reserveScrollBarGap()}
  }

  body {
    margin: 0px;
    font-family: "Inter Variable", sans-serif;
  }

  h2, h3 {
    font-weight: 700;
    ${styling.mobile(`
      font-weight: 600;
    `)}
  }

  h2 {
    font-size: 2rem;
    ${styling.mobile(`
      margin: 10px auto;
    `)}
  }

  a {
    color: ${({ theme }) => theme.primaryLight};
    font-weight: 550;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }

  // reset button styles
  button {
    appearance: none;
    border: 0;
    border-radius: 0;
    background: #ccc;
  }

  input:focus,
  textarea:focus {
    outline: none;
  }

  // https://github.com/necolas/normalize.css/blob/master/normalize.css
  /**
   * 1. Change the font styles in all browsers.
   * 2. Remove the margin in Firefox and Safari.
   */

  button,
  input,
  optgroup,
  select,
  textarea {
    appearance: none; // remove browser styling
    font-family: inherit; /* 1 */
    font-size: 0.8rem; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
    padding: 0.6em 0.9em;

    ${styling.mobile(`
      padding: 0.3em;
      font-size: 16px;
    `)}
  }

  /**
   * Show the overflow in IE.
   * 1. Show the overflow in Edge.
   */

  button,
  input { /* 1 */
    overflow: visible;
  }

  /**
   * Remove the inheritance of text transform in Edge, Firefox, and IE.
   * 1. Remove the inheritance of text transform in Firefox.
   */

  button,
  select { /* 1 */
    text-transform: none;
  }

  /**
   * Remove the inner border and padding in Firefox.
   */

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
   * Restore the focus styles unset by the previous rule.
   */

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }
`;
