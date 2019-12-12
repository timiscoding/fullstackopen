import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import LoginForm from "./LoginFormView";
import { login } from "../../actions";
import { getCurrentUser, getPending } from "../../reducers";
import * as actionTypes from "../../constants/actionTypes";

const LoginContainer = ({ currentUser, login, pending }) => {
  if (currentUser !== null) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <h2>Login</h2>
      <LoginForm onLogin={login} pending={pending} />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: getCurrentUser(state),
    pending: getPending(state, actionTypes.LOGIN_REQUEST)
  };
};

export default connect(
  mapStateToProps,
  { login }
)(LoginContainer);
