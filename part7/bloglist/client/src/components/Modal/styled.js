import styled from "styled-components/macro";
import { animated } from "react-spring";
import { CloseButton as CloseButtonBase } from "../Button";
import { ReactComponent as CloseGlyph } from "../../icons/clear.svg";
import { styling } from "../../constants";

export const padding = { desktop: "20px", mobile: "10px" };

export const ModalBackground = styled(animated.div)`
  overflow-x: hidden;
  position: fixed; /* fixed/absolute can't scroll all the way to end in ios */
  top: 0;
  left: 0;
  width: 100vw; /* using viewport units instead of % units so that modal doesn't jump when toggled */
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  ${styling.mobile(`
    -webkit-overflow-scrolling: touch; /* re-enable momentum scroll */
  `)}
`;

export const ModalBox = styled(animated.div)`
  margin-top: 40px;
  margin-bottom: 40px;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 768px;
  max-width: 90%;
  background: white;
  z-index: 1000;
  ${styling.mobile(`
    width: calc(100vw - 32px);
    margin-top: 10px;
    margin-bottom: 10px;
  `)}
`;

export const CloseButton = styled(CloseButtonBase)`
  --desktop-size: 1.2rem;
  --mobile-size: 1rem;
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
`;

export const CloseIcon = styled(CloseGlyph)`
  width: 1rem;
  height: 1rem;
`;
