import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const UsersView = ({ users }) => {
  if (!users) return null;

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th />
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, blogs, name }) => (
            <tr key={id}>
              <td>
                <Link to={`/users/${id}`}>{name}</Link>
              </td>
              <td>{blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

UsersView.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      blogs: PropTypes.arrayOf(PropTypes.string).isRequired
    })
  )
};

export default UsersView;
