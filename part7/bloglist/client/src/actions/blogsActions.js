import * as actionTypes from "../constants/actionTypes";
import { blogListSchema, blogSchema, commentListSchema } from "../schemas";
import { setNotification, setErrorNotification } from "./notificationActions";
import { httpAction } from "./index";
import { setPageSearchParams } from "./utils";

export const fetchBlogs = ({ page, limit, sort, userId }) => {
  const [data, params] = setPageSearchParams({ page, limit, sort, userId });
  return httpAction({
    type: actionTypes.FETCH_BLOGS_REQUEST,
    url: `/api/blogs?${params}`,
    schema: blogListSchema,
    data
  });
};

export const fetchBlog = (id, notify) =>
  httpAction({
    type: actionTypes.FETCH_BLOG_REQUEST,
    url: `/api/blogs/${id}`,
    schema: blogSchema,
    notify
  });

export const addBlog = (blog, history) =>
  httpAction({
    type: actionTypes.ADD_BLOG_REQUEST,
    url: "/api/blogs",
    schema: blogSchema,
    method: "POST",
    payload: blog,
    onSuccess: () => dispatch => {
      history.push("/blogs");
      dispatch(setNotification("Blog created"));
    },
    onFail: err => setErrorNotification("Failed to create blog", err)
  });

export const deleteBlog = (id, userId, history) =>
  httpAction({
    type: actionTypes.DELETE_BLOG_REQUEST,
    url: `/api/blogs/${id}`,
    method: "DELETE",
    data: {
      id,
      userId
    },
    onSuccess: () => dispatch => {
      history.push(`/users/${userId}`);
      dispatch(setNotification("Deleted blog"));
    },
    onFail: err => setErrorNotification("Failed to delete blog", err)
  });

export const deleteBlogs = (ids, userId, history) =>
  httpAction({
    type: actionTypes.DELETE_BLOGS_REQUEST,
    url: "/api/blogs",
    method: "DELETE",
    payload: {
      ids
    },
    data: {
      ids,
      userId
    },
    onSuccess: () => dispatch => {
      history.push(`/users/${userId}`);
      dispatch(setNotification("Deleted blogs"));
    },
    onFail: err => setErrorNotification("Failed to delete blogs", err)
  });

export const likeBlog = blog =>
  httpAction({
    type: actionTypes.LIKE_BLOG_REQUEST,
    url: `/api/blogs/${blog.id}`,
    method: "put",
    schema: blogSchema,
    payload: {
      likes: blog.likes + 1
    },
    onSuccess: () => setNotification("Liked blog"),
    onFail: err => setErrorNotification("Problem liking blog", err)
  });

export const addComment = (blogId, comment, history) =>
  httpAction({
    type: actionTypes.ADD_COMMENT_REQUEST,
    method: "POST",
    url: `/api/blogs/${blogId}/comments`,
    payload: {
      comment
    },
    data: {
      blogId
    },
    onSuccess: () => dispatch => {
      history.push(`/blogs/${blogId}`);
      dispatch(setNotification("Comment added"));
    },
    onFail: err => setErrorNotification("Failed to add comment", err)
  });

export const fetchComments = ({ blogId, page, limit, sort }) => {
  const [data, params] = setPageSearchParams({ page, limit, sort });
  return httpAction({
    type: actionTypes.FETCH_COMMENTS_REQUEST,
    method: "GET",
    url: `/api/blogs/${blogId}/comments?${params}`,
    schema: commentListSchema,
    data: {
      blogId,
      ...data
    },
    onFail: err => setErrorNotification("Failed to fetch comments", err)
  });
};
