import React from "react";
import PropTypes from "prop-types";
import * as propTypes from "../../constants/propTypes";

const BlogView = ({ blog, onActions, pending }) => {
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} likes
          {onActions.like && (
            <button onClick={onActions.like} disabled={pending.like}>
              {pending.like ? "liking..." : "like"}
            </button>
          )}
        </div>
        <div>added by {blog.user.username || "unknown creator"}</div>
        {onActions.delete && (
          <button onClick={onActions.delete} disabled={pending.delete}>
            {pending.delete ? "removing..." : "remove"}
          </button>
        )}
      </div>
    </div>
  );
};

BlogView.propTypes = {
  blog: propTypes.blog,
  onActions: PropTypes.objectOf(PropTypes.func).isRequired,
  pending: PropTypes.objectOf(PropTypes.bool).isRequired
};

export default BlogView;
