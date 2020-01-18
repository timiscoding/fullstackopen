import { combineReducers } from "redux";
import produce from "immer";
import * as actionTypes from "../constants/actionTypes";
import omitBy from "lodash/omitBy";

const setComments = (state, action) => {
  const { comments } = action.response.items.entities;
  return {
    ...state,
    ...comments
  };
};

const addComment = produce((state, action) => {
  const { response } = action;
  const { id, body, createdAt, blog } = response;
  state[id] = { body, createdAt, blog };
});

const deleteComments = (state, action) => {
  let { id, ids } = action.data;
  if (id) ids = [id];
  return omitBy(state, comment => ids.includes(comment.blog));
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_COMMENTS_SUCCESS:
      return setComments(state, action);
    case actionTypes.ADD_COMMENT_SUCCESS:
      return addComment(state, action);
    case actionTypes.DELETE_BLOG_SUCCESS:
    case actionTypes.DELETE_BLOGS_SUCCESS:
      return deleteComments(state, action);
    default:
      return state;
  }
};

const commentsReducer = combineReducers({
  byId
});

export default commentsReducer;

/**** SELECTORS ****/

export const getComments = (state, ids) => {
  return Array.isArray(ids) ? ids.map(id => state[id]) : [];
};
