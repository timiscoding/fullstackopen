import React, { useContext } from "react";
import styled, { css, ThemeContext } from "styled-components/macro";
import { useSpring, animated } from "react-spring";
import { math, transparentize } from "polished";

// Mobile animated icon CSS based on transformicons
// from https://www.sarasoueidan.com/blog/navicon-transformicons/
// by Sara Soueidan & Bennett Feely

const buttonSize = "1.5rem";
const line = css`
  display: inline-block;
  height: calc(${buttonSize} / 7);
  width: ${buttonSize};
  background: ${({ theme }) => theme.secondary};
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  user-select: none;
  padding: 0 calc(${buttonSize} / 2);
  &:focus {
    outline: 1px dotted ${({ theme }) => theme.secondaryDark};
  }
`;

const LineOne = styled(animated.span)`
  ${line};
  left: 0;
  content: "";
  position: absolute;
`;

const LineTwo = styled(animated.span)`
  ${line};
  position: relative;
  vertical-align: super;
`;

const LineThree = styled(LineOne)``;
const topConst = {
  lineOne: math(`-${buttonSize} / 3`),
  lineThree: math(`${buttonSize} / 3`)
};

const MobileMenuButton = ({ onClick, showX }) => {
  const theme = useContext(ThemeContext);
  const lineOneStyle = useSpring({
    top: showX ? "0rem" : topConst.lineOne,
    transform: showX ? "rotateZ(45deg)" : "rotateZ(0deg)"
  });
  const lineThreeStyle = useSpring({
    top: showX ? "0rem" : topConst.lineThree,
    transform: showX ? "rotateZ(-45deg)" : "rotateZ(0deg)"
  });
  const lineTwoStyle = useSpring({
    background: showX ? transparentize(1, theme.secondary) : theme.secondary
  });
  const handleClick = () => {
    onClick();
  };
  return (
    <MenuButton onClick={handleClick}>
      <LineTwo style={lineTwoStyle}>
        <LineOne style={lineOneStyle} />
        <LineThree style={lineThreeStyle} />
      </LineTwo>
    </MenuButton>
  );
};

export default MobileMenuButton;
