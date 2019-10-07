import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useFormState } from "../../../hooks";
import { required } from "../../../hooks/utils";

const BlogFormView = ({ blogAdded, addBlog, pending }) => {
  const formRef = useRef();
  const [{ validity, errors, clear, values, submit }, { text }] = useFormState(
    formRef
  );

  const handleSubmit = async event => {
    event.preventDefault();
    const action = await addBlog({
      title: values.title,
      author: values.author,
      url: values.url
    });

    if (action.type.endsWith("SUCCESS")) {
      clear();
      blogAdded();
    }
  };

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={handleSubmit} ref={formRef}>
        <fieldset disabled={pending}>
          <div>
            <label htmlFor="title">title</label>
            {!validity.title && <div>{errors.title}</div>}
            <input id="title" {...text("title", required())} />
          </div>
          <div>
            <label htmlFor="author">author</label>
            {!validity.author && <div>{errors.author}</div>}
            <input id="author" {...text("author", required())} />
          </div>
          <div>
            <label htmlFor="url">url</label>
            {!validity.url && <div>{errors.url}</div>}
            <input id="url" {...text("url", required())} />
          </div>
          <button type="submit" onClick={submit}>
            Create
          </button>
        </fieldset>
      </form>
    </div>
  );
};

BlogFormView.propTypes = {
  blogAdded: PropTypes.func.isRequired,
  addBlog: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired
};

export default BlogFormView;
