import produce from "immer";
import * as actionTypes from "../constants/actionTypes";

const setComments = (state, action) => {
  // data may be supplied from fetching blogList (namespaced under 'items')
  // or fetching single blog so no namespacing
  const { comments } =
    action.response.entities || action.response.items.entities;
  return {
    ...state,
    ...comments
  };
};

const addComment = produce((state, action) => {
  const { response } = action;
  const { id, body, createdAt } = response;
  state[id] = { body, createdAt };
});

const commentsReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BLOGS_SUCCESS:
    case actionTypes.FETCH_BLOG_SUCCESS:
      return setComments(state, action);
    case actionTypes.ADD_COMMENT_SUCCESS:
      return addComment(state, action);
    default:
      return state;
  }
};

export default commentsReducer;

/**** SELECTORS ****/

export const getComments = (state, ids) => {
  return Array.isArray(ids) ? ids.map(id => state[id]) : [];
};
