import React, { useState, useImperativeHandle, useContext } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components/macro";
import { useSpring } from "react-spring";
import { useMeasure } from "../../hooks";
import { ToggleButton, ShowWhenVisible } from "./styled";

const ToggleableView = React.forwardRef(
  ({ buttonLabel, buttonIcon, children, className }, ref) => {
    const [showContent, setShowContent] = useState(false);
    const [contentRef, { height: contentHeight }] = useMeasure();
    const theme = useContext(ThemeContext);
    const accordionStyles = useSpring({
      height: showContent ? contentHeight : 0,
      borderColor: showContent ? theme.greyLight : "#fff"
    });
    useImperativeHandle(ref, () => ({
      toggleVisible
    }));

    const toggleVisible = () => {
      setShowContent(!showContent);
    };
    return (
      <div className={className}>
        <ToggleButton
          onClick={toggleVisible}
          showContent={showContent}
          icon={buttonIcon}
          appearance="primary"
        >
          {buttonLabel}
        </ToggleButton>
        <ShowWhenVisible style={accordionStyles}>
          <div ref={contentRef}>
            {typeof children === "function" ? children(showContent) : children}
          </div>
        </ShowWhenVisible>
      </div>
    );
  }
);

ToggleableView.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  buttonIcon: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired
};

ToggleableView.displayName = "ToggleableView";

export default ToggleableView;
