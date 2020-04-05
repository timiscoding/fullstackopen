import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/macro";
import BlogItem from "./BlogItem";
import * as propTypes from "../../constants/propTypes";

const List = styled.ul`
  padding-left: 0;
  margin-top: 0;
  flex-grow: 1;
  position: relative;
`;

const P = styled.p`
  padding: 5px;
`;

const BlogListView = ({
  blogs,
  onLike,
  pending,
  selectable,
  onSelect = () => {},
  selected
}) => {
  if (pending || !blogs) {
    blogs = Array(10).fill();
  }
  if (!pending && blogs?.length === 0) {
    return <P>No blogs yet</P>;
  }
  return (
    <List>
      {blogs.map((blog, i) => {
        return (
          <BlogItem
            key={blog?.id || i}
            blog={blog}
            onLike={() => onLike(blog)}
            selectable={selectable}
            onSelect={onSelect}
            selected={selected?.has(blog?.id)}
            pending={!blog}
          />
        );
      })}
    </List>
  );
};

BlogListView.propTypes = {
  blogs: PropTypes.arrayOf(propTypes.blog),
  onLike: PropTypes.func,
  onSelect: PropTypes.func,
  selected: PropTypes.object,
  pending: PropTypes.bool,
  selectable: PropTypes.bool
};

export default BlogListView;
