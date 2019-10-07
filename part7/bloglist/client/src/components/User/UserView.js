import React from "react";
import PropTypes from "prop-types";

const UserView = ({ user }) => {
  let blogs;
  if (user.blogs.length === 0) {
    blogs = <p>No blogs added</p>;
  } else {
    blogs = (
      <ul>
        {user.blogs.map(({ title }, i) => (
          <li key={i}>{title}</li>
        ))}
      </ul>
    );
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      {blogs}
    </div>
  );
};

UserView.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    blogs: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired
      })
    )
  })
};

export default UserView;
