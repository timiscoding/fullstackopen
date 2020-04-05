import styled from "styled-components/macro";
import SpinnerBase from "../Spinner";
import { styling } from "../../constants";

export const Button = styled.button`
  ${({ theme, appearance }) => {
    switch (appearance) {
      case "primary":
        return `
          --btn-color: ${theme.fontLight};
          --btn-bg-color: ${theme.primary};
          --btn-bg-color-hover: ${theme.primaryLight};
          --btn-fg-color-hover: ${theme.fontLight};
          --btn-bg-color-active: ${theme.primaryDark};
          --btn-fg-color-active: ${theme.fontLight};
          --btn-border-color: transparent;
        `;
      case "danger":
        return `
          --btn-color: ${theme.fontLight};
          --btn-bg-color: ${theme.error};
          --btn-bg-color-hover: ${theme.redLight};
          --btn-fg-color-hover: ${theme.fontLight};
          --btn-bg-color-active: ${theme.error};
          --btn-fg-color-active: ${theme.fontLight};
          --btn-border-color: transparent;
        `;
      case "add":
        return `
          --btn-color: ${theme.fontLight};
          --btn-bg-color: ${theme.green};
          --btn-fg-color-hover: ${theme.fontLight};
          --btn-bg-color-hover: ${theme.greenLight};
          --btn-fg-color-active: ${theme.fontLight};
          --btn-bg-color-active: ${theme.greenDark};
          --btn-border-color: transparent;
        `;
      default:
        return `
          --btn-color: ${theme.fontDark};
          --btn-bg-color: #fff;
          --btn-fg-color-hover: ${theme.fontDark};
          --btn-bg-color-hover: ${theme.greyLight};
          --btn-fg-color-active: ${theme.fontDark};
          --btn-bg-color-active: ${theme.greyDark};
          --btn-border-color: ${theme.greyLight};
        `;
    }
  }}

  position: relative;
  border-radius: ${({ round }) => (round ? "50%" : "3px")};
  padding: ${({ round }) => (round ? "5px" : "7px 15px 5px")};
  pointer-events: ${({ pending }) => (pending ? "none" : "auto")};
  color: var(--btn-color);
  background: var(--btn-bg-color);
  font-size: 0.8rem;
  border: 2px solid var(--btn-border-color);
  cursor: pointer;
  user-select: none;
  transition: 0.2s ease-out;
  &:disabled {
    opacity: 0.6;
    pointer-events: none;
  }
  &:hover {
    background: var(--btn-bg-color-hover);
    color: var(--btn-fg-color-hover);
  }
  ${styling.focusAround}
  &:active {
    background: var(--btn-bg-color-active);
    color: var(--btn-fg-color-active);
    transition: none;
  }

  ${styling.mobile(`
    padding: 10px;
    text-transform: uppercase;
  `)}
`;

export const Wrapper = styled.div`
  ${({ pending }) =>
    pending &&
    `
    visibility: hidden;
  `}
`;

export const Spinner = styled(SpinnerBase)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
`;

export const Icon = styled.div`
  display: inline-block;
  width: 1rem;
  height: 1rem;
  mask-image: url(${({ icon }) => icon});
  background: ${({ appearance, theme }) =>
    appearance ? theme.fontLight : theme.fontDark};
  ${({ round }) => !round && "margin-right: 0.5rem;"}
  vertical-align: middle;
`;
