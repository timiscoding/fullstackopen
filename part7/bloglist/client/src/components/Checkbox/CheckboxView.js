import React from "react";
import styled from "styled-components";
import { ReactComponent as CheckIcon } from "../../icons/check.svg";

const StyledCheckIcon = styled(CheckIcon)`
  fill: #fff;
  position: absolute;
  left: 0;
  margin: var(--icon-margin, 3px);
`;

const Input = styled.input`
  opacity: 0;
`;

const Box = styled.div`
  cursor: pointer;
  display: inline-block;
  position: relative;
  width: var(--size, 1.25em);
  height: var(--size, 1.25em);
  box-shadow: ${({ theme }) =>
    `inset var(--border-width, 2px) var(--border-width, 2px) ${theme.primary},
    inset calc(-1 * var(--border-width, 2px)) var(--border-width, 2px) ${theme.primary},
    inset var(--border-width, 2px) calc(-1 * var(--border-width, 2px)) ${theme.primary},
    inset calc(-1 * var(--border-width, 2px)) calc(-1 * var(--border-width, 2px)) ${theme.primary}`};
  background-color: ${({ theme, checked }) =>
    checked ? theme.primary : "#fff"};
  border-radius: var(--border-radius, 3px);
`;

const CheckboxView = ({ className, value, onChange, checked, id }) => {
  const handleChange = e => {
    e.stopPropagation();
    onChange(value);
  };
  return (
    <Box className={className} onClick={handleChange} checked={checked}>
      <Input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        value={value}
      />
      <StyledCheckIcon checked={checked} />
    </Box>
  );
};

export default CheckboxView;
