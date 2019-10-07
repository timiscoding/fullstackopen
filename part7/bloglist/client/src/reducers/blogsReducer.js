import { combineReducers } from "redux";
import * as actionTypes from "../constants/actionTypes";
import { removeDupes } from "./utils";

const byLikes = (a, b) => a.likes - b.likes;

const deleteBlog = (state, action) => {
  const { data } = action;
  const { id } = data;
  const { [id]: deletedBlog, ...blogs } = state;
  return blogs;
};

const addComment = (state, action) => {
  const { data, response } = action;
  const { blogId } = data;
  const { id } = response;
  return {
    ...state,
    [blogId]: {
      ...state[blogId],
      comments: [id, ...state[blogId].comments]
    }
  };
};

const addAllBlogsFromUserList = (state, action) => {
  // can't get the blog list from normalizr's result because it contains
  // the list of users, not blogs. So we need to manually construct it from
  // the object in entities.blogs
  const { response } = action;
  const {
    entities: { blogs }
  } = response;
  return removeDupes([...state, ...Object.keys(blogs)]);
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BLOGS_SUCCESS:
    case actionTypes.FETCH_BLOG_SUCCESS:
    case actionTypes.LIKE_BLOG_SUCCESS:
    case actionTypes.ADD_BLOG_SUCCESS:
    case actionTypes.FETCH_USERS_SUCCESS:
    case actionTypes.FETCH_USER_SUCCESS:
      return { ...state, ...action.response.entities.blogs };
    case actionTypes.DELETE_BLOG_SUCCESS:
      return deleteBlog(state, action);
    case actionTypes.ADD_COMMENT_SUCCESS:
      return addComment(state, action);
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_BLOGS_SUCCESS:
      return [...action.response.result];
    // case actionTypes.FETCH_USERS_SUCCESS:
    case actionTypes.FETCH_USER_SUCCESS:
      return addAllBlogsFromUserList(state, action);
    case actionTypes.FETCH_BLOG_SUCCESS:
    case actionTypes.ADD_BLOG_SUCCESS:
      return removeDupes([...state, action.response.result]);
    case actionTypes.DELETE_BLOG_SUCCESS:
      return state.filter(id => id !== action.data.id);
    case actionTypes.FETCH_USERS_REQUEST:
      return [];
    default:
      return state;
  }
};

const blogsReducer = combineReducers({
  byId,
  allIds
});

export default blogsReducer;

export const getBlog = (state, id) => {
  return state.byId[id];
};

export const getBlogs = state =>
  state.allIds.map(id => state.byId[id]).sort(byLikes);
