import { combineReducers } from "redux";
import produce from "immer";
import omit from "lodash/omit";
import union from "lodash/union";
import uniq from "lodash/uniq";
import without from "lodash/without";
import * as actionTypes from "../constants/actionTypes";

const deleteBlogs = (state, action) => {
  const { data } = action;
  const { id, ids } = data; // delete_blog_request action uses 'id', delete_blogs_request uses 'ids'
  return omit(state, id || ids);
};

const updateCommentCount = produce((state, action) => {
  state[action.data.blogId].commentCount++;
});

const addAllBlogsFromUserList = (state, action) => {
  const { response } = action;
  const { blogs } = response.entities.users[response.result];
  return union(state, blogs);
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BLOGS_SUCCESS:
      return { ...state, ...action.response.items.entities.blogs };
    case actionTypes.FETCH_BLOG_SUCCESS:
    case actionTypes.LIKE_BLOG_SUCCESS:
    case actionTypes.ADD_BLOG_SUCCESS:
    case actionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        ...action.response.entities.blogs
      };
    case actionTypes.FETCH_USERS_SUCCESS:
      return { ...state, ...action.response.items.entities.blogs };
    case actionTypes.DELETE_BLOG_SUCCESS:
    case actionTypes.DELETE_BLOGS_SUCCESS:
      return deleteBlogs(state, action);
    case actionTypes.ADD_COMMENT_SUCCESS:
      return updateCommentCount(state, action);
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
    case actionTypes.DELETE_BLOGS_SUCCESS: {
      let { id, ids } = action.data;
      if (id) ids = [id];
      return without(state, ...ids);
    }
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
