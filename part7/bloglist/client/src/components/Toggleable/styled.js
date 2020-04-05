import styled from "styled-components/macro";
import { animated } from "react-spring";
import Button from "../Button";

export const ShowWhenVisible = styled(animated.div)`
  overflow: hidden;
  margin-top: 10px;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
`;

export const HideLabel = styled.div`
  opacity: ${({ showContent }) => (showContent ? 1 : 0)};
`;

export const ToggleButton = styled(Button)`
  ${({ showContent }) =>
    showContent &&
    `
    & > * {
      visibility: hidden;
    }
    &:before {
      content: 'Hide';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  `}
`;
