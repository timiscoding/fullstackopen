import React, { useRef } from "react";
import PropTypes from "prop-types";
import Form from "../Form";
import * as validators from "../Form/validators";
import Button from "../Button";
import Box from "../Box";
import Row from "../Row";
import RegisterIcon from "../../icons/add-user-button.svg";

const RegisterFormView = ({ onSubmit, pending }) => {
  const formRef = useRef();

  const handleSubmit = ({ name, username, password }) => {
    onSubmit({
      name,
      username,
      password,
    });
  };
  const handleClear = () => {
    formRef.current.clear();
    formRef.current.focus();
  };
  return (
    <Box>
      <Box.Header>Register</Box.Header>
      <Box.Body>
        <Form ref={formRef} onSubmit={handleSubmit} pending={pending}>
          {({ validity, errors, submit, clearInput }, { text, password }) => (
            <>
              <Form.Group>
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  {...text("name", validators.required())}
                  valid={validity.name}
                  error={errors.name}
                  autoFocus
                  onClear={clearInput("name")}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  {...text("username", validators.required())}
                  valid={validity.username}
                  error={errors.username}
                  onClear={clearInput("username")}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  {...password("password", validators.password)}
                  valid={validity.password}
                  error={errors.password}
                  onClear={clearInput("password")}
                  autoComplete="off"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="confirmPassword">
                  Confirm Password
                </Form.Label>
                <Form.Control
                  {...password("confirmPassword", validators.confirmPassword)}
                  valid={validity.confirmPassword}
                  error={errors.confirmPassword}
                  onClear={clearInput("confirmPassword")}
                  autoComplete="off"
                />
              </Form.Group>
              <Row cols={2}>
                <Button
                  type="submit"
                  onClick={submit}
                  icon={RegisterIcon}
                  pending={pending}
                  appearance="primary"
                >
                  Register
                </Button>
                <Button type="reset" onClick={handleClear} disabled={pending}>
                  Clear all
                </Button>
              </Row>
            </>
          )}
        </Form>
      </Box.Body>
    </Box>
  );
};

RegisterFormView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pending: PropTypes.bool,
};

export default RegisterFormView;
