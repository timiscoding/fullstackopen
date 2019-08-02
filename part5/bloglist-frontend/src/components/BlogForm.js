import React from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ onSubmit, fields, onFieldChange }) => {
  const { title, author, url } = fields;
  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input type="text" name="title" id="title" onChange={onFieldChange} value={title} />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input type="text" name="author" id="author" onChange={onFieldChange} value={author} />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input type="text" name="url" id="url" onChange={onFieldChange} value={url} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  fields: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
};

export default BlogForm;
