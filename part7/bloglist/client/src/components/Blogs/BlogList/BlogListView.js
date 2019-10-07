import React from "react";
import PropTypes from "prop-types";
import * as propTypes from "../../../constants/propTypes";
import { Link } from "react-router-dom";

const style = {
  border: "1px solid black",
  marginBottom: 5,
  cursor: "pointer", // FIXME link should work for entire width of div
  listStyleType: "none"
};

const BlogItem = ({ blog }) => {
  return (
    <li style={style} data-testid="blog-body">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} {blog.author}
      </Link>
    </li>
  );
};

BlogItem.propTypes = {
  blog: propTypes.blog
};

const BlogListView = ({ blogs }) => {
  return (
    <ul style={{ paddingLeft: 0 }}>
      {blogs.map(blog => (
        <BlogItem key={blog.id} blog={blog} />
      ))}
    </ul>
  );
};

BlogListView.propTypes = {
  blogs: PropTypes.arrayOf(propTypes.blog)
};

export default BlogListView;
