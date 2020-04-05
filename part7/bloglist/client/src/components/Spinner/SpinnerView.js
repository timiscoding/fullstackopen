import React from "react";
import PropTypes from "prop-types";
import { Svg, Ring, Arc, StandardSpinner } from "./styled";

const SpinnerView = ({ className, size = "sm", arcLen = "const" }) => {
  if (arcLen === "const") {
    // wrapping div is used to allow centering spinner in a button using transform: translate.
    // Because spinner uses transform in animation it overrides any transform applied after.
    return (
      <div className={className}>
        <StandardSpinner size={size} />
      </div>
    );
  }
  return (
    <Svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      size={size}
      className={className}
    >
      <Ring cx="50" cy="50" r="30" size={size} />
      <Arc cx="50" cy="50" r="30" size={size}>
        <animateTransform
          attributeName="transform"
          attributeType="xml"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="5s"
          repeatCount="indefinite"
        />
      </Arc>
    </Svg>
  );
};

SpinnerView.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  arcLen: PropTypes.oneOf(["const", "var"])
};

export default SpinnerView;
