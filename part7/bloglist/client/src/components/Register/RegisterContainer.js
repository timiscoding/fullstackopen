import React from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions";
import { getPending } from "../../reducers";
import * as actionTypes from "../../constants/actionTypes";
import RegisterForm from "./RegisterFormView";

const RegisterContainer = ({ history, registerUser, isRegistering }) => {
  const handleSubmit = user => {
    registerUser(user, history);
  };

  return <RegisterForm onSubmit={handleSubmit} pending={isRegistering} />;
};

const mapStateToProps = state => ({
  isRegistering: getPending(state, actionTypes.REGISTER_USER_REQUEST)
});

export default connect(
  mapStateToProps,
  { registerUser }
)(RegisterContainer);
