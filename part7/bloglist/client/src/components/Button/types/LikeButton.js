import React from "react";
import styled from "styled-components/macro";
import { useSpring, animated, config } from "react-spring";
import Button from "..";
import { ReactComponent as LikeGlyph } from "../../../icons/like.svg";

const StyledLikeButton = styled(Button)`
  --btn-bg-color: ${({ theme }) => theme.blue};
  --btn-bg-color-hover: ${({ theme }) => theme.blueLight};
  --btn-bg-color-active: ${({ theme }) => theme.blueDark};
  --btn-border-color: transparent;
`;

const LikeIcon = styled(animated(LikeGlyph))`
  height: 1rem;
  width: 1rem;
  fill: #fff;
`;

const LikeButton = ({ onClick, ...props }) => {
  const [likeStyle, setLikeStyle] = useSpring(() => ({
    transform: "rotate(0deg)",
    transformOrigin: "bottom left"
  }));
  const handleClick = () => {
    onClick && onClick();
    setLikeStyle({
      to: [
        {
          config: { duration: 200 },
          transform: "rotate(-25deg)"
        },
        {
          config: { ...config.wobbly },
          transform: "rotate(0deg)"
        }
      ]
    });
  };

  return (
    <StyledLikeButton {...props} onClick={handleClick} round>
      <LikeIcon style={likeStyle} />
    </StyledLikeButton>
  );
};

export default LikeButton;
