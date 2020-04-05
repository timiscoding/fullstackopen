import styled from "styled-components/macro";
import { hideVisually } from "polished";
import { styling } from "../../constants";
import { ReactComponent as CheckGlyph } from "../../icons/check.svg";
import { ReactComponent as GarbageGlyph } from "../../icons/garbage.svg";

export const CheckIcon = styled(CheckGlyph)`
  fill: #fff;
  position: absolute;
  left: 0;
  margin: var(--icon-margin, 3px);
`;

export const Input = styled.input`
  ${hideVisually}
`;

export const FocusWrapper = styled.div`
  display: inline-block;
  ${styling.focusAround}
`;

export const Box = styled.div`
  vertical-align: top;
  box-sizing: initial;
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: var(--size, 1.25em);
  height: var(--size, 1.25em);
  box-shadow: ${({
    theme,
  }) => `inset var(--border-width, 2px) var(--border-width, 2px) ${theme.primary},
    inset calc(-1 * var(--border-width, 2px)) var(--border-width, 2px) ${theme.primary},
    inset var(--border-width, 2px) calc(-1 * var(--border-width, 2px)) ${theme.primary},
    inset calc(-1 * var(--border-width, 2px)) calc(-1 * var(--border-width, 2px)) ${theme.primary}`};
  background-color: ${({ theme, checked }) =>
    checked ? theme.primary : "#fff"};
  border-radius: var(--border-radius, 3px);
`;

// Toggle button modified from
// https://codesandbox.io/s/github/kentcdodds/advanced-react-patterns-v2
export const ToggleWrapper = styled.span`
  display: inline-block;
  outline: none;
  cursor: pointer;
  & * {
    user-select: none;
  }
`;

export const Toggle = styled.span`
  display: inline-block;
  height: 2em;
  width: 4em;
  border: 1px solid ${({ theme }) => theme.greyDark};
  background-color: ${({ theme, checked }) =>
    checked ? theme.redLighter : theme.greyLighter};
  border-radius: 4em;
  padding: 3px;
  box-sizing: initial;
  transition: background-color 0.25s ease-out;
`;

export const ToggleButton = styled.span`
  display: block;
  position: relative;
  height: 100%;
  width: 50%;
  background-color: ${({ theme, checked }) =>
    checked ? theme.red : theme.white};
  border-radius: 50%;
  transition: left 0.2s ease-out;
  left: ${({ checked }) => (checked ? "50%" : "0")};
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3), 0 1px 0 rgba(0, 0, 0, 0.05);

  ${ToggleWrapper}:focus-within & {
    box-shadow: inset 0px 0px 0px 3px ${({ theme }) => theme.secondaryDarker};
  }
`;

export const GarbageIcon = styled(GarbageGlyph)`
  width: 60%;
  height: 60%;

  margin: auto auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  fill: ${({ theme, checked }) => (checked ? "#fff" : theme.greyDarker)};
`;
