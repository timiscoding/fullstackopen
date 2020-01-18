import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { addBlog } from "../../../actions";
import BlogForm from "./BlogFormView";

const BlogFormContainer = ({
  blogAdded,
  addBlog,
  pending,
  onResize,
  toggleableOpen,
  history
}) => (
  <BlogForm
    blogAdded={blogAdded}
    addBlog={blog => addBlog(blog, history)}
    pending={pending}
    onResize={onResize}
    toggleableOpen={toggleableOpen}
  />
);

BlogForm.propTypes = {
  props: PropTypes.shape({
    blogAdded: PropTypes.func,
    addBlog: PropTypes.func.isRequired,
    pending: PropTypes.bool
  })
};

export default withRouter(connect(null, { addBlog })(BlogFormContainer));
