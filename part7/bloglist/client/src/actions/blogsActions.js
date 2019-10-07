import * as actionTypes from "../constants/actionTypes";
import { blogListSchema, blogSchema } from "../schemas";
import { setNotification, setErrorNotification } from "./notificationActions";
import { httpAction } from "./index";

export const fetchBlogs = notify =>
  httpAction({
    type: actionTypes.FETCH_BLOGS_REQUEST,
    url: "/api/blogs",
    schema: blogListSchema,
    notify
  });

export const fetchBlog = (id, notify) =>
  httpAction({
    type: actionTypes.FETCH_BLOG_REQUEST,
    url: `/api/blogs/${id}`,
    schema: blogSchema,
    notify
  });

export const addBlog = blog =>
  httpAction({
    type: actionTypes.ADD_BLOG_REQUEST,
    url: "/api/blogs",
    schema: blogSchema,
    method: "POST",
    payload: blog,
    onSuccess: () => setNotification("Blog created"),
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
      history.push("/");
      dispatch(setNotification("Deleted blog"));
    },
    onFail: err => setErrorNotification("Failed to delete blog", err)
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

export const addComment = (blogId, comment) =>
  httpAction({
    type: "ADD_COMMENT_REQUEST",
    method: "POST",
    url: `/api/blogs/${blogId}/comments`,
    payload: {
      comment
    },
    data: {
      blogId
    },
    onSuccess: () => setNotification("Comment added"),
    onFail: err => setErrorNotification("Failed to add comment", err)
  });
