import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useFormState, useInputErrorHeights } from "../../hooks";
import { required, passwordMatch, minLength } from "../../hooks/utils";
import Input, { Fieldset, InputDiv, InputError, Label } from "../Input";
import PrimaryButton from "../PrimaryButton";
import Button from "../Button";
import { ReactComponent as RegisterIcon } from "../../icons/add-user-button.svg";

const ButtonDiv = styled.div`
  & button:first-child {
    margin-right: 20px;
  }
`;

const StyledRegisterIcon = styled(RegisterIcon)`
  height: 1.25em;
  width: 1.25em;
  fill: white;
  vertical-align: middle;
  margin-right: 5px;
  fill: white;
`;

const StyledInput = styled(Input).attrs({
  autoComplete: "off"
})``;

const RegisterFormView = ({ onSubmit, pending }) => {
  const formRef = useRef();
  const errorRefs = {
    name: useRef(),
    username: useRef(),
    password: useRef(),
    confirmPassword: useRef()
  };
  const [
    { values, validity, errors, submit, clear },
    { text, password }
  ] = useFormState(formRef);
  const errorHeights = useInputErrorHeights(errorRefs, errors);

  const handleSubmit = event => {
    event.preventDefault();
    const { name, username, password } = values;
    onSubmit({
      name,
      username,
      password
    });
  };

  const handleClear = () => {
    clear();
    formRef.current.elements.name.focus();
  };

  return (
    <div>
      <h2>Register</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <Fieldset disabled={pending}>
          <InputDiv>
            <Label htmlFor="name">Name</Label>
            <StyledInput
              id="name"
              {...text("name", required())}
              valid={validity.name}
              autoFocus
            />
            <InputError ref={errorRefs.name} height={errorHeights.name}>
              {errors.name}
            </InputError>
          </InputDiv>
          <InputDiv>
            <Label htmlFor="username">Username</Label>
            <StyledInput
              id="username"
              {...text("username", required())}
              valid={validity.username}
            />
            <InputError ref={errorRefs.username} height={errorHeights.username}>
              {errors.username}
            </InputError>
          </InputDiv>
          <InputDiv>
            <Label htmlFor="password">Password</Label>
            <StyledInput
              id="password"
              {...password("password", minLength(3))}
              valid={validity.password}
            />
            <InputError ref={errorRefs.password} height={errorHeights.password}>
              {errors.password}
            </InputError>
          </InputDiv>
          <InputDiv>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <StyledInput
              id="confirmPassword"
              {...password("confirmPassword", passwordMatch)}
              valid={validity.confirmPassword}
            />
            <InputError
              ref={errorRefs.confirmPassword}
              height={errorHeights.confirmPassword}
            >
              {errors.confirmPassword}
            </InputError>
          </InputDiv>
          <ButtonDiv>
            <PrimaryButton type="submit" onClick={submit}>
              <StyledRegisterIcon />
              {pending ? "Submitting..." : "Submit"}
            </PrimaryButton>
            <Button type="reset" onClick={handleClear}>
              Clear
            </Button>
          </ButtonDiv>
        </Fieldset>
      </form>
    </div>
  );
};

RegisterFormView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
};

export default RegisterFormView;
