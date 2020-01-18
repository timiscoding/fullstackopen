import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import capitalize from "lodash/capitalize";
import { likeBlog, deleteBlog, fetchBlog } from "../../actions";
import { setNotification } from "../../actions";
import Blog from "./BlogView";
import Error from "../Error";
import CommentContainer from "./Comments";
import * as selectors from "../../reducers";
import * as actionTypes from "../../constants/actionTypes";

const shouldFetchBlog = (blog, isFetching) => {
  if (isFetching) return false;
  if (!blog || (blog && !blog.user)) return true;
  return false;
};

const BlogContainer = ({
  blog,
  likeBlog,
  deleteBlog,
  history,
  currentUser,
  fetchBlog,
  match,
  isLiking,
  isDeleting,
  error,
  isFetchingBlog
}) => {
  useEffect(() => {
    if (shouldFetchBlog(blog, isFetchingBlog)) {
      fetchBlog(match.params.id);
    }
  }, [blog, fetchBlog, match.params.id, isFetchingBlog]);

  const handleDelete = () => {
    const ok = window.confirm(`Delete ${blog.title} by ${blog.author}?`);
    if (!ok) return;
    deleteBlog(blog.id, blog.user.id, history);
  };

  if (error) return <Error error={error} />;
  const isLoggedIn = !!currentUser;
  const isBlogCreator =
    isLoggedIn && currentUser.username === blog?.user?.username;
  return (
    <div>
      <Helmet>
        <title>{(blog?.title && capitalize(blog.title)) ?? "Blog"}</title>
      </Helmet>
      <Blog
        blog={blog}
        onActions={{
          like: isLoggedIn && (() => likeBlog(blog)),
          delete: isBlogCreator && handleDelete
        }}
        pending={{
          like: isLiking,
          delete: isDeleting,
          blog: isFetchingBlog || !blog
        }}
      />
      <CommentContainer />
    </div>
  );
};

const mapStateToProps = (state, { match }) => {
  return {
    blog: selectors.getBlog(state, match.params.id),
    currentUser: selectors.getCurrentUser(state),
    isLiking: selectors.getPending(state, actionTypes.LIKE_BLOG_REQUEST),
    isDeleting: selectors.getPending(state, actionTypes.DELETE_BLOG_REQUEST),
    isFetchingBlog: selectors.getPending(state, actionTypes.FETCH_BLOG_REQUEST),
    error: selectors.getError(state, actionTypes.FETCH_BLOG_REQUEST)
  };
};

export default connect(mapStateToProps, {
  likeBlog,
  deleteBlog,
  setNotification,
  fetchBlog
})(BlogContainer);
