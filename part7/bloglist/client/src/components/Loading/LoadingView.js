import React from "react";
import PropTypes from "prop-types";

const LoadingView = ({ label }) => {
  return <div>Loading {label}...</div>;
};

LoadingView.propTypes = {
  label: PropTypes.string.isRequired
};

export default LoadingView;
