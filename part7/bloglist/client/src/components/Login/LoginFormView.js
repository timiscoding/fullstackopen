import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useFormState } from "../../hooks";
import { required } from "../../hooks/utils";

const LoginFormView = ({ onLogin, pending }) => {
  const formRef = useRef();
  const [
    { validity, errors, values, submit },
    { text, password }
  ] = useFormState(formRef);

  const handleSubmit = event => {
    event.preventDefault();
    onLogin({
      username: values.username,
      password: values.password
    });
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef}>
      <fieldset disabled={pending}>
        <div>
          <label htmlFor="username">Username</label>
          {!validity.username && <div>{errors.username}</div>}
          <input id="username" {...text("username", required())} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          {!validity.password && <div>{errors.password}</div>}
          <input id="password" {...password("password", required())} />
        </div>
        <button type="submit" onClick={submit}>
          {pending ? "Logging in..." : "Login"}
        </button>
      </fieldset>
    </form>
  );
};

LoginFormView.propTypes = {
  onLogin: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
};

export default LoginFormView;
