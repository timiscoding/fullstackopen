import React from "react";
import PropTypes from "prop-types";

const ErrorView = ({ error }) => {
  if (!error) return null;

  const { status, message } = error;
  return (
    <div>
      <h1>Error {status}</h1>
      <p>{message}</p>
    </div>
  );
};

ErrorView.propTypes = {
  error: PropTypes.shape({
    status: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired
  })
};

export default ErrorView;
