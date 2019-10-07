import React from "react";
import { connect } from "react-redux";
import { getError } from "../../reducers";
import Error from "./ErrorView";

const ErrorContainer = ({ error }) => {
  return <Error error={error} />;
};

const mapStateToProps = (state, { location }) => {
  return {
    error: getError(state, location.state.errorType)
  };
};

export default connect(mapStateToProps)(ErrorContainer);
