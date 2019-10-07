import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBlog } from "../../../actions";
import BlogForm from "./BlogFormView";

const BlogFormContainer = ({ blogAdded, addBlog, pending }) => (
  <BlogForm blogAdded={blogAdded} addBlog={addBlog} pending={pending} />
);

BlogForm.propTypes = {
  props: PropTypes.shape({
    blogAdded: PropTypes.func,
    addBlog: PropTypes.func.isRequired,
    pending: PropTypes.bool
  })
};

export default connect(
  null,
  { addBlog }
)(BlogFormContainer);
