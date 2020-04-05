import React from "react";
import PropTypes from "prop-types";
import Box from "../Box";
import { ErrorIcon } from "./styled";

const ErrorView = ({ error }) => {
  if (!error) return null;
  const { status, message } = error;
  return (
    <Box>
      <Box.Header>
        <ErrorIcon /> Error {status}
      </Box.Header>
      <Box.Body>{message}</Box.Body>
    </Box>
  );
};

ErrorView.propTypes = {
  error: PropTypes.shape({
    status: PropTypes.number,
    message: PropTypes.string.isRequired
  })
};

export default ErrorView;
