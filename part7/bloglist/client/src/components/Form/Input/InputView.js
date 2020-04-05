import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMatchMobile } from "../../../hooks";
import { Wrapper, BorderlessInput, ClearButton } from "./styled";

const InputView = ({ onClear, value, onChange, noValidStyle, ...props }) => {
  const isMobile = useMatchMobile();
  const inputRef = useRef();
  const [canClear, setCanClear] = useState();
  useEffect(() => {
    setCanClear(!!value?.length);
  }, [value]);
  const handleClear = e => {
    e.preventDefault();
    onClear();
    setCanClear(false);
    inputRef.current.focus();
  };
  const handleChange = e => {
    setCanClear(!!e.target.value.length);
    typeof onChange === "function" && onChange(e);
  };
  return (
    <Wrapper {...props} noValidStyle={noValidStyle}>
      <BorderlessInput
        {...props}
        value={value}
        onChange={handleChange}
        ref={inputRef}
      />
      {isMobile && onClear && canClear && <ClearButton onClick={handleClear} />}
    </Wrapper>
  );
};

InputView.propTypes = {
  onClear: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  noValidStyle: PropTypes.bool
};

export default InputView;
