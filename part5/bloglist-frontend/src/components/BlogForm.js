import React from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ onSubmit, fields: { title, author, url } }) => {
  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input id="title" {...title} />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input id="author" {...author} />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input id="url" {...url} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    title: PropTypes.object.isRequired,
    author: PropTypes.object.isRequired,
    url: PropTypes.object.isRequired,
  }),
};

export default BlogForm;
