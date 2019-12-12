import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFormState, useInputErrorHeights } from "../../hooks";
import { required } from "../../hooks/utils";
import Input, { InputDiv, Label, InputError, Fieldset } from "../Input";
import PrimaryButton from "../PrimaryButton";
import { ReactComponent as LoginIcon } from "../../icons/login.svg";

const LoginInput = styled(Input).attrs({
  autoComplete: "off"
})`
  ${({ valid, theme }) => `
    border-color: ${valid !== false ? theme.grey : theme.error}
    background-color: ${valid !== false ? "#fff" : theme.errorLight}
  `};
`;

const StyledLoginIcon = styled(LoginIcon)`
  height: 1em;
  width: 1em;
  vertical-align: sub;
  fill: white;
  margin-right: 5px;
`;

const LoginFormView = ({ onLogin, pending }) => {
  const formRef = useRef();
  const errorRefs = {
    username: useRef(),
    password: useRef()
  };
  const [
    { validity, errors, values, submit },
    { text, password }
  ] = useFormState(formRef);
  const errorHeights = useInputErrorHeights(errorRefs, errors);

  const handleSubmit = event => {
    event.preventDefault();
    onLogin({
      username: values.username,
      password: values.password
    });
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <Fieldset disabled={pending}>
        <InputDiv>
          <Label htmlFor="username">Username</Label>
          <LoginInput
            id="username"
            {...text("username", required())}
            valid={validity.username}
            autoFocus
          />
          <InputError ref={errorRefs.username} height={errorHeights.username}>
            {errors.username}
          </InputError>
        </InputDiv>

        <InputDiv>
          <Label htmlFor="password">Password</Label>
          <LoginInput
            id="password"
            {...password("password", required())}
            valid={validity.password}
          />
          <InputError ref={errorRefs.password} height={errorHeights.password}>
            {errors.password}
          </InputError>
        </InputDiv>
        <PrimaryButton type="submit" onClick={submit}>
          <StyledLoginIcon />
          {pending ? "Logging in..." : "Login"}
        </PrimaryButton>
      </Fieldset>
    </form>
  );
};

LoginFormView.propTypes = {
  onLogin: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
};

export default LoginFormView;
