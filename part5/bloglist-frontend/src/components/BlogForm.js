import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../hooks';

const BlogForm = ({ createBlog }) => {
  const [ title, titleReset ] = useField('text');
  const [ author, authorReset ] = useField('text');
  const [ url, urlReset ] = useField('text');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createBlog({
        title: title.value,
        author: author.value,
        url: author.value
      });
      titleReset();
      authorReset();
      urlReset();
    // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={handleSubmit}>
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
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
