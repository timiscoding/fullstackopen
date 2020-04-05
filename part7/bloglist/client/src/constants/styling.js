// import { math } from "polished";
import { css } from "styled-components/macro";

export const mobileQuery = "max-width: 768px";
export const maxPageWidth = "980px";
export const navbarHeight = "40px";

/* add/remove padding equal to the scrollbar width when it shows/hides when a modal is opened
  so that content remains centered and doesn't shift.
  30 is roughly double scrollbar width */
export const reserveScrollBarGap = (prop = "margin-left") => `
  @media (min-width: ${maxPageWidth}) {
    ${prop}: calc(100vw - 100%);
  }
`;

export const mobile = (inner) => css`
  @media (${mobileQuery}) {
    ${inner}
  }
`;

export const hover = (inner) => css`
  @media (hover: hover) {
    ${inner}
  }
`;

const transition = "transition: box-shadow 200ms ease-out;";
export const focusCorner = css`
  &:focus-within {
    ${transition}
    box-shadow: 2px 2px 1px ${({ theme }) => theme.secondary};
    outline: none;
  }
`;

export const focusAround = css`
  &:focus-within {
    ${transition}
    box-shadow: 0 0 0 4px ${({ theme }) => theme.secondary};
    outline: none;
  }
`;
