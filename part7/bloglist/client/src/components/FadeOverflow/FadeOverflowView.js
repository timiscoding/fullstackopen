import React from "react";
import styled from "styled-components/macro";
import { styling } from "../../constants";

const fadeWidth = "3em";
const Fade = styled.div`
  ${styling.mobile(`
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: ${fadeWidth};
      background: linear-gradient(
        to right,
        rgba(100%, 100%, 100%, 0%),
        rgba(100%, 100%, 100%, 100%)
      );
    }
  `)}
`;

const ScrollX = styled.div`
  ${styling.mobile(`
    padding-right: ${fadeWidth};
    overflow-x: auto;
  `)}
`;

const Overflow = styled.span`
  ${styling.mobile(`
    white-space: nowrap;
  `)}
`;

const FadeOverflowView = ({ children }) => {
  return (
    <Fade>
      <ScrollX>
        <Overflow>{children}</Overflow>
      </ScrollX>
    </Fade>
  );
};

export default FadeOverflowView;
