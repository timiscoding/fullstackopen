import React, { useRef } from "react";
import PropTypes from "prop-types";
import Form from "../Form";
import * as validators from "../Form/validators";
import Button from "../Button";
import Row from "../Row";
import Box from "../Box";
import { RegisterLink } from "./styled";
import LoginIcon from "../../icons/login.svg";

const LoginFormView = ({ onLogin, pending }) => {
  const formRef = useRef();

  const handleSubmit = ({ username, password }) => {
    onLogin({
      username,
      password
    });
  };

  return (
    <Box>
      <Box.Header>Login</Box.Header>
      <Box.Body>
        <Form onSubmit={handleSubmit} ref={formRef} pending={pending}>
          {({ validity, errors, submit }, { text, password }) => (
            <>
              <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  {...text("username", validators.required())}
                  valid={validity.username}
                  error={errors.username}
                  autoFocus
                  autoComplete="off"
                  noValidStyle
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  id="password"
                  {...password("password", validators.required())}
                  valid={validity.password}
                  error={errors.password}
                  autoComplete="off"
                  noValidStyle
                />
              </Form.Group>
              <Row cols={2}>
                <Button
                  type="submit"
                  onClick={submit}
                  icon={LoginIcon}
                  pending={pending}
                  appearance="primary"
                >
                  Login
                </Button>
                <RegisterLink to="/register">
                  Don&apos;t have an account?
                </RegisterLink>
              </Row>
            </>
          )}
        </Form>
      </Box.Body>
    </Box>
  );
};

LoginFormView.propTypes = {
  onLogin: PropTypes.func.isRequired,
  pending: PropTypes.bool
};

export default LoginFormView;
