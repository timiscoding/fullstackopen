import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onSubmit, fields: { username, password } }) => {
  return (
    <form onSubmit={onSubmit}>
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
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    username: PropTypes.object.isRequired,
    password: PropTypes.object.isRequired,
  }),
};

export default LoginForm;
