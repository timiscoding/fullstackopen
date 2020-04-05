import React from "react";
import PropTypes from "prop-types";
import {
  ToggleWrapper,
  Input,
  Toggle,
  ToggleButton,
  GarbageIcon,
  CheckIcon,
  Box,
  FocusWrapper
} from "./styled";

const CheckboxView = ({ value, onChange, checked, id, isToggle, ...props }) => {
  const handleChange = e => {
    e.stopPropagation();
    onChange(value);
  };

  if (isToggle) {
    return (
      <ToggleWrapper onClick={handleChange} {...props}>
        <Input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          value={value}
        />
        <Toggle checked={checked}>
          <ToggleButton checked={checked}>
            <GarbageIcon checked={checked} />
          </ToggleButton>
        </Toggle>
      </ToggleWrapper>
    );
  }
  return (
    <FocusWrapper>
      <Box {...props} onClick={handleChange} checked={checked}>
        <Input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          value={value}
        />
        <CheckIcon checked={checked} />
      </Box>
    </FocusWrapper>
  );
};

CheckboxView.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  id: PropTypes.string,
  isToggle: PropTypes.bool
};

export default CheckboxView;
