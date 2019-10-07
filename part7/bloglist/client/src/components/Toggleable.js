import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Toggleable = React.forwardRef(({ buttonLabel, children }, ref) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const toggleVisible = () => {
    setVisible(!visible);
  };
  useImperativeHandle(ref, () => ({
    toggleVisible
  }));

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </div>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

Toggleable.displayName = "Toggleable";

export default Toggleable;
