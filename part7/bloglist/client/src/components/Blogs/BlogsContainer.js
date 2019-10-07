import React, { useEffect } from "react";
import { connect } from "react-redux";
import BlogList from "./BlogList";
import Toggleable from "../Toggleable";
import BlogForm from "./BlogForm";
import Error from "../Error";
import Loading from "../Loading";
import { fetchBlogs } from "../../actions";
import { getPending, getCurrentUser, getError, getBlogs } from "../../reducers";
import * as actionTypes from "../../constants/actionTypes";

const BlogsContainer = ({
  blogs,
  currentUser,
  fetchBlogs,
  isAddingBlog,
  error,
  isFetchingBlogs
}) => {
  const blogFormRef = React.useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  if (error) return <Error error={error} />;

  return (
    <div>
      {currentUser ? (
        <Toggleable buttonLabel="New blog" ref={blogFormRef}>
          <BlogForm
            blogAdded={() => blogFormRef.current.toggleVisible()}
            pending={isAddingBlog}
          />
        </Toggleable>
      ) : null}
      {isFetchingBlogs && blogs.length === 0 && <Loading label="blogs" />}
      {!isFetchingBlogs && blogs.length === 0 && <h2>No blogs</h2>}
      {blogs.length > 0 && <BlogList blogs={blogs} />}
    </div>
  );
};

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  isFetchingBlogs: getPending(state, actionTypes.FETCH_BLOGS_REQUEST) || true,
  isAddingBlog: getPending(state, actionTypes.ADD_BLOG_REQUEST),
  error: getError(state, actionTypes.FETCH_BLOGS_REQUEST),
  blogs: getBlogs(state)
});

export default connect(
  mapStateToProps,
  { fetchBlogs }
)(BlogsContainer);
