import * as actionTypes from "../constants/actionTypes";
import { blogListSchema, blogSchema } from "../schemas";
import { setNotification, setErrorNotification } from "./notificationActions";
import { httpAction } from "./index";

export const fetchBlogs = ({ page = 1, limit = 10, sort } = { limit: 10 }) => {
  page = parseInt(page) || 1;
  const params = new URLSearchParams();
  params.set("offset", (page - 1) * limit);
  params.set("limit", limit);
  sort && params.set("sort", sort);
  return httpAction({
    type: actionTypes.FETCH_BLOGS_REQUEST,
    url: `/api/blogs?${params}`,
    schema: blogListSchema,
    data: { page, limit, sort }
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
    type: actionTypes.ADD_COMMENT_REQUEST,
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
