import styled from "styled-components/macro";
import { animated } from "react-spring";
import { CloseButton as CloseBtn } from "../Button/types";
import ErrorIcon from "../../icons/round-error-symbol.svg";
import { styling } from "../../constants";

export const Wrapper = styled(animated.div)`
  position: absolute;
  right: 10px;
  top: calc(100% + 10px);
  left: 70%;
  font-size: 1em;
  border-width: 1px;
  border-style: solid;
  padding: 15px;
  background-color: ${({ theme, type }) =>
    type !== "error" ? theme.primaryLight : theme.error};
  color: ${({ theme }) => theme.fontLight};
  border-color: ${({ theme }) => theme.primaryDark};
  transform-origin: center top;
  ${styling.mobile(`
    left: 10px;
  `)}
`;

export const Message = styled.div`
  ${({ type }) =>
    type === "error" &&
    `
    &:before {
      display: inline-block;
      float: left;
      content: "";
      mask-image: url(${ErrorIcon});
      background-color: white;
      width: 2rem;
      height: 2rem;
      margin-right: 10px;
    }
  `}
`;

export const Life = styled(animated.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 5px;
  background-image: ${({ theme }) =>
    `linear-gradient(to right, ${theme.secondaryDarker}, ${theme.secondaryLight})`};
`;

export const CloseButton = styled(CloseBtn)`
  --desktop-size: 0.6rem;
  --mobile-size: 0.9rem;
  position: absolute;
  top: 0;
  right: 0;
`;
