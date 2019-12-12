import React, { useEffect } from "react";
import { connect } from "react-redux";
import { likeBlog, deleteBlog, addComment, fetchBlog } from "../../actions";
import { setNotification } from "../../actions";
import Blog from "./BlogView";
import Error from "../Error";
import Loading from "../Loading";
import Comments from "./CommentsView";
import * as selectors from "../../reducers";
import * as actionTypes from "../../constants/actionTypes";

const shouldFetchBlog = (blog, isFetching) => {
  if (isFetching) return false;
  if (!blog) return true;
  if (!blog.user) return true;
  return false;
};

const BlogContainer = ({
  blog,
  likeBlog,
  deleteBlog,
  history,
  addComment,
  currentUser,
  fetchBlog,
  match,
  isLiking,
  isDeleting,
  isCommenting,
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

  const handleComment = comment => addComment(blog.id, comment);

  if (error) return <Error error={error} />;
  if (shouldFetchBlog(blog))
    return (
      <Loading pending={isFetchingBlog}>
        <h2>Loading blog</h2>
      </Loading>
    );

  return (
    <div>
      <Blog
        blog={blog}
        onActions={{
          like: currentUser && (() => likeBlog(blog)),
          delete:
            currentUser &&
            currentUser.username === blog.user.username &&
            handleDelete
        }}
        pending={{
          like: isLiking,
          delete: isDeleting
        }}
      />
      <Comments
        comments={blog.comments}
        onComment={handleComment}
        pending={isCommenting}
      />
    </div>
  );
};

const mapStateToProps = (state, { match }) => {
  return {
    blog: selectors.getBlog(state, match.params.id),
    currentUser: selectors.getCurrentUser(state),
    isLiking: selectors.getPending(state, actionTypes.LIKE_BLOG_REQUEST),
    isDeleting: selectors.getPending(state, actionTypes.DELETE_BLOG_REQUEST),
    isCommenting: selectors.getPending(state, actionTypes.ADD_COMMENT_REQUEST),
    isFetchingBlog: selectors.getPending(state, actionTypes.FETCH_BLOG_REQUEST),
    error: selectors.getError(state, actionTypes.FETCH_BLOG_REQUEST)
  };
};

export default connect(mapStateToProps, {
  likeBlog,
  deleteBlog,
  setNotification,
  addComment,
  fetchBlog
})(BlogContainer);
