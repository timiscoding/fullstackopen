import { combineReducers } from "redux";
import produce from "immer";
import set from "lodash/set";
import get from "lodash/get";
import { getActionName } from "./utils";
import * as actions from "../constants/actionTypes";

const pending = produce((state, action) => {
  const { type } = action;
  const actionName = getActionName(type);

  if (type.endsWith("_REQUEST")) {
    state[actionName] = true;
  } else if (type.endsWith("_SUCCESS") || type.endsWith("_FAIL")) {
    state[actionName] = false;
  }
}, {});

const error = produce((state, action) => {
  const { type, error } = action;
  const actionName = getActionName(type);

  if (type.endsWith("_FAIL")) {
    state[actionName] = error;
  } else if (type.endsWith("_REQUEST") || type.endsWith("_SUCCESS")) {
    state[actionName] = null;
  }
}, {});

/* /blogs and /users end points return blog data that is
   slightly different and incompatible with each other.
   This function resets the paging state for the other
   action type so it will refetch the data
*/
const setValidData = produce((state, action) => {
  let invalidDataKey;
  if (action.type === actions.FETCH_BLOGS_SUCCESS) {
    invalidDataKey = "FETCH_USERS";
  } else if (action.type === actions.FETCH_USERS_SUCCESS) {
    invalidDataKey = "FETCH_BLOGS";
  }
  set(state, [invalidDataKey, "pages"], null);
});

const updatePaging = produce((state, action) => {
  const actionName = getActionName(action.type);
  set(
    state,
    [actionName, "lastPage"],
    Math.ceil(action.response.count / action.data.limit)
  );
  set(state, [actionName, "limit"], action.data.limit);
  set(
    state,
    [actionName, "pages", action.data.page],
    [...action.response.items.result]
  );
});

const maybeInvalidatePages = produce((state, action) => {
  const actionName = getActionName(action.type);
  const fields = {
    FETCH_BLOGS: ["sort", "userId"],
    FETCH_USERS: ["sort"],
    FETCH_COMMENTS: ["sort", "blogId"]
  };
  fields[actionName].forEach(field => {
    if (get(state, [actionName, field]) !== action.data[field]) {
      // invalidate previous page data because the field changed
      set(state, [actionName, "pages"], {
        [action.data.page]: [...action.response.items.result]
      });
    }
    set(state, [actionName, field], action.data[field]);
  });
});

const invalidatePages = produce((state, action) => {
  if (
    action.type === actions.DELETE_BLOG_SUCCESS ||
    action.type === actions.DELETE_BLOGS_SUCCESS ||
    action.type === actions.ADD_BLOG_SUCCESS
  ) {
    set(state, "FETCH_BLOGS.pages", null);
  } else if (action.type === actions.ADD_COMMENT_SUCCESS) {
    set(state, "FETCH_COMMENTS.pages", null);
  }
});

const updateCurrentPage = produce((state, action) => {
  const actionName = getActionName(action.data.actionType);
  set(state, [actionName, "currentPage"], action.data.page);
});

const paging = (state = {}, action) => {
  if (action.type === actions.FETCH_BLOGS_SUCCESS) {
    let nextState = updatePaging(state, action);
    nextState = maybeInvalidatePages(nextState, action);
    nextState = setValidData(nextState, action);
    return nextState;
  } else if (action.type === actions.FETCH_COMMENTS_SUCCESS) {
    const nextState = updatePaging(state, action);
    return maybeInvalidatePages(nextState, action);
  } else if (action.type === actions.FETCH_USERS_SUCCESS) {
    let nextState = updatePaging(state, action);
    nextState = maybeInvalidatePages(nextState, action);
    return setValidData(nextState, action);
  } else if (action.type === actions.SET_CURRENT_PAGE) {
    return updateCurrentPage(state, action);
  } else if (
    action.type === actions.DELETE_BLOG_SUCCESS ||
    action.type === actions.DELETE_BLOGS_SUCCESS ||
    action.type === actions.ADD_BLOG_SUCCESS ||
    action.type === actions.ADD_COMMENT_SUCCESS
  ) {
    return invalidatePages(state, action);
  } else {
    return state;
  }
};

const uiReducer = combineReducers({
  pending,
  error,
  paging
});

export default uiReducer;

/**** SELECTORS ****/

export const getPending = (state, actionType) =>
  state.pending[getActionName(actionType)] || false;

export const getError = (state, actionTypes) => {
  let types = [];
  if (Array.isArray(actionTypes)) {
    types = actionTypes;
  } else {
    types = [actionTypes];
  }
  for (let type of types) {
    const err = state.error[getActionName(type)];
    if (err) {
      return err;
    }
  }
};

export const getPageIds = (state, actionType) => {
  const pageData = state.paging[getActionName(actionType)];
  if (!pageData || !pageData.pages) {
    return null;
  }
  return pageData.pages[pageData.currentPage];
};

export const getCurrentPage = (state, actionType) => {
  const pageData = state.paging[getActionName(actionType)];
  if (!pageData) {
    return null;
  }
  return pageData.currentPage;
};

export const getIsPageFetched = (
  state,
  actionType,
  { page, sort, blogId, userId }
) => {
  const actionName = getActionName(actionType);
  const pageData = state.paging[actionName];
  if (!pageData || !pageData.pages) {
    return false;
  }
  if (actionName === "FETCH_BLOGS") {
    return (
      !!pageData.pages[page] &&
      sort === pageData.sort &&
      userId === pageData.userId
    );
  }
  if (actionName === "FETCH_COMMENTS") {
    return (
      !!pageData.pages[page] &&
      blogId === pageData.blogId &&
      sort === pageData.sort
    );
  }
  if (actionName === "FETCH_USERS") {
    return !!pageData.pages[page] && sort === pageData.sort;
  }
};

export const getLastPage = (state, actionType) => {
  const pageData = state.paging[getActionName(actionType)];
  if (!pageData) {
    return null;
  }
  return pageData.lastPage;
};
