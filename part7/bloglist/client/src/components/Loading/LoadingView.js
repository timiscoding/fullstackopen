import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components/macro";
import { rgba } from "polished";
import { ReactComponent as LoopIcon } from "../../icons/loop.svg";

const rotate = keyframes`
  to {
    transform: scale(1, -1) rotate(-1turn);
  }
`;

const flash = x => keyframes`
  to {
    background-position-x: ${x}px;
  }
  `;

const StyledLoopIcon = styled(LoopIcon)`
  width: 1em;
  height: 1em;
  transform: scaleY(-1);
  animation: 1s infinite ${rotate};
`;

const Loading = styled.div`
  display: inline-block;
  background-image: linear-gradient(
    to right,
    ${({ theme }) => `
    ${rgba(theme.primary, 0.9)} 0%,
    ${rgba(theme.secondary, 1)} 10%,
      ${rgba(theme.primary, 0.9)} 20%
    `}
  );
  background-position-x: ${({ containerWidth }) => -0.3 * containerWidth}px;
  background-size: 130%;
  animation: 1s infinite linear ${({ containerWidth }) => flash(containerWidth)};
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const LoadingView = ({ children, pending }) => {
  const containerRef = useRef();
  const [containerWidth, setContainerWidth] = useState();
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth);
    }
  }, [containerRef, pending]);

  const child = React.Children.only(children);

  return pending ? (
    <Loading as={child.type} ref={containerRef} containerWidth={containerWidth}>
      {child.props.children} <StyledLoopIcon />
    </Loading>
  ) : (
    child
  );
};

LoadingView.propTypes = {
  children: PropTypes.node.isRequired,
  pending: PropTypes.bool
};

export default LoadingView;
