import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const List = styled.ul`
  padding: 0;
`;

const Blog = styled.li`
  list-style-type: none;
`;

const Title = styled.span`
  font-weight: 700;
`;

const Author = styled.span`
  &:before {
    content: "by ";
  }
  font-size: 0.7em;
`;

const UserBlogs = ({ blogs }) => {
  if (blogs.length === 0) return <p>No blogs added</p>;
  return (
    <List>
      {blogs.map(({ title, author, id }, i) => (
        <Blog key={i}>
          <Link to={`/blogs/${id}`}>
            <Title>{title}</Title>
          </Link>{" "}
          <Author>{author}</Author>
        </Blog>
      ))}
    </List>
  );
};

const Name = styled.span`
  color: ${({ theme }) => theme.grey};
`;

const UserView = ({ user }) => {
  return (
    <div>
      <h2>
        {user.username} <Name>({user.name})</Name>
      </h2>
      <UserBlogs blogs={user.blogs} />
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
