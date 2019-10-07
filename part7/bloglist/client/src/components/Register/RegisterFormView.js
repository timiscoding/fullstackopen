import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useFormState } from "../../hooks";
import { required, passwordMatch, minLength } from "../../hooks/utils";

const RegisterFormView = ({ onSubmit, pending }) => {
  const formRef = useRef();
  const [form, { text, password }] = useFormState(formRef);

  const handleSubmit = event => {
    event.preventDefault();
    const {
      values: { name, username, password }
    } = form;
    onSubmit({
      name,
      username,
      password
    });
  };

  const { errors } = form;

  return (
    <div>
      <h2>Register</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <fieldset disabled={pending}>
          <div>
            <label htmlFor="name">Name</label>
            {errors.name ? <div>{errors.name}</div> : null}
            <input id="name" {...text("name", required())} />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            {errors.username ? <div>{errors.username}</div> : null}
            <input id="username" {...text("username", required())} />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            {errors.password ? <div>{errors.password}</div> : null}
            <input id="password" {...password("password", minLength(3))} />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            {errors.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}
            <input
              id="confirmPassword"
              {...password("confirmPassword", passwordMatch)}
            />
          </div>
          <button type="submit" onClick={form.submit}>
            {pending ? "Submitting..." : "Submit"}
          </button>
          <button type="reset" onClick={form.clear}>
            Reset
          </button>
        </fieldset>
      </form>
    </div>
  );
};

RegisterFormView.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
};

export default RegisterFormView;
