import React from 'react';

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div data-testid="blog-info">
      {blog.title} {blog.author}
    </div>
    <div data-testid="blog-likes">
      blog has {blog.likes} likes
      <button onClick={onClick} data-testid="like-button">like</button>
    </div>
  </div>
);

export default SimpleBlog;
