import styled from "styled-components/macro";
import { animated } from "react-spring";

export const Error = styled(animated.div)`
  font-size: 0.7em;
  color: ${({ theme }) => theme.error};
  // margin-top: 5px;
  // height: ${({ show, height }) => `${show ? height : 0}px`};
  // transition: height 1000ms;
  overflow: hidden;
`;
