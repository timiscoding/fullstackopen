import styled, { keyframes } from "styled-components/macro";

const RING_LEN = 189; // result from rinRef.current.getTotalLength()
const ARC_LEN = 0.7 * RING_LEN;

const rotate = keyframes`
  from {
    transform: rotate(0turn);
  }
  to {
    transform: rotate(1turn);
  }
`;

const varyLen = keyframes`
  0% {
    stroke-dasharray: 5 ${RING_LEN - 5};
  }
  50%, 60% {
    stroke-dasharray: ${ARC_LEN} ${RING_LEN - ARC_LEN};
    stroke-dashoffset: 0;
  }
  90%, 100% {
    stroke-dasharray: 5 ${RING_LEN - 5};
    stroke-dashoffset: -${RING_LEN};
  }
`;

const sizes = {
  sm: { dim: "1.25rem", strokeWidth: 20, borderWidth: "4px" },
  md: { dim: "2rem", strokeWidth: 15, borderWidth: "5px" },
  lg: { dim: "3rem", strokeWidth: 10, borderWidth: "6px" }
};

export const Ring = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.secondaryLight};
  stroke-width: ${({ size }) => `${sizes[size].strokeWidth}`};
`;

export const Arc = styled.circle`
  stroke: ${({ theme }) => theme.secondaryDarker};
  fill: none;
  stroke-width: ${({ size }) => `${sizes[size].strokeWidth}`};
  stroke-dasharray: 5 ${RING_LEN - 5};
  stroke-linecap: round;
  animation: ${varyLen} 2s ease-out infinite;
`;

export const Svg = styled.svg`
  width: ${({ size }) => sizes[size].dim};
  height: ${({ size }) => sizes[size].dim};
`;

export const StandardSpinner = styled.div`
  width: ${({ size }) => sizes[size].dim};
  height: ${({ size }) => sizes[size].dim};
  border-top-color: ${({ theme }) => theme.secondaryDark};
  border-left-color: ${({ theme }) => theme.secondaryLight};
  border-right-color: ${({ theme }) => theme.secondaryLight};
  border-bottom-color: ${({ theme }) => theme.secondaryLight};
  border-style: solid;
  border-width: ${({ size }) => sizes[size].borderWidth};
  border-radius: 50%;
  animation: ${rotate} 700ms linear infinite;
`;
