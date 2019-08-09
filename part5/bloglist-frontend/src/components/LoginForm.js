import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../hooks';

const LoginForm = ({ handleLogin }) => {
  const [ username ] = useField('text');
  const [ password ] = useField('password');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({
      username: username.value,
      password: password.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          {...username}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          {...password}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default LoginForm;
