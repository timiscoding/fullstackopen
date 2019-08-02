import React, { useState } from 'react';
import PropTypes from 'prop-types';

const style = {
  border: '1px solid black',
  marginBottom: 5,
  cursor: 'pointer',
};

const Blog = ({ blog, onLike, onDelete, canDelete }) => {
  const [expand, setExpand] = useState(false);
  const toggleExpand = () => {
    setExpand(!expand);
  };

  let body;
  if (!expand) {
    body = <>{blog.title} {blog.author}</>;
  } else {
    body = (
      <>
        <div>{blog.title}</div>
        <div>{blog.url}</div>
        <div>
          {blog.likes} likes
          <button onClick={() => onLike(blog)}>like</button>
        </div>
        <div>added by {blog.author}</div>
        {canDelete && <button onClick={() => onDelete(blog)}>remove</button>}
      </>
    );
  }

  return (
    <div style={style}>
      <div onClick={toggleExpand}>
        {body}
      </div>
    </div>
  );
};

Blog.propTypes = {
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  canDelete: PropTypes.bool.isRequired,
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
  })
};

export default Blog;
