import { combineReducers } from "redux";
import produce from "immer";
import omit from "lodash/omit";
import union from "lodash/union";
import uniq from "lodash/uniq";
import * as actionTypes from "../constants/actionTypes";

const deleteBlog = (state, action) => {
  const { data } = action;
  const { id } = data;
  return omit(state, id);
};

const addComment = produce((state, action) => {
  const { data, response } = action;
  const { blogId } = data;
  const { id } = response;
  state[blogId].comments = [id, ...state[blogId].comments];
});

const addAllBlogsFromUserList = (state, action) => {
  // can't get the blog list from normalizr's result because it contains
  // the list of users, not blogs. So we need to manually construct it from
  // the object in entities.blogs
  const { response } = action;
  const {
    entities: { blogs }
  } = response;
  return union(state, Object.keys(blogs));
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BLOGS_SUCCESS:
      return { ...state, ...action.response.items.entities.blogs };
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
      return [...action.response.items.result];
    case actionTypes.FETCH_USER_SUCCESS:
      return addAllBlogsFromUserList(state, action);
    case actionTypes.FETCH_BLOG_SUCCESS:
    case actionTypes.ADD_BLOG_SUCCESS:
      return uniq([...state, action.response.result]);
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

/**** SELECTORS ****/

export const getBlog = (state, id) => state.byId[id];

export const getBlogs = state => state.allIds.map(id => state.byId[id]);
