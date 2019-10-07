import * as actionTypes from "../constants/actionTypes";

const setComments = (state, action) => {
  const { comments } = action.response.entities;
  return {
    ...state,
    ...comments
  };
};

const addComment = (state, action) => {
  const { response } = action;
  const { id, body } = response;
  return {
    ...state,
    [id]: {
      body
    }
  };
};

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

export const getComments = (state, ids) => {
  return Array.isArray(ids) ? ids.map(id => state[id]) : [];
};
