import { combineReducers } from "redux";
import produce from "immer";
import set from "lodash/set";
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
const setValidData = (state, actionType) => {
  let invalidDataKey;
  if (actionType === actions.FETCH_BLOGS_SUCCESS) {
    invalidDataKey = "FETCH_USERS";
  } else if (actionType === actions.FETCH_USERS_SUCCESS) {
    invalidDataKey = "FETCH_BLOGS";
  }
  set(state, [invalidDataKey, "pages"], null);
};

const paging = produce((state, action) => {
  const actionName = getActionName(action.type);
  if (action.type === actions.FETCH_BLOGS_SUCCESS) {
    let paging = state[actionName];
    if (!paging) {
      paging = state[actionName] = {};
    }
    paging.pages = paging.pages || {};
    paging.lastPage = Math.ceil(action.response.count / action.data.limit);
    paging.limit = action.data.limit;
    if (paging.sort !== action.data.sort) {
      // invalidate previous page data because the sort changed
      paging.pages = {};
    }
    paging.pages[action.data.page] = [...action.response.items.result];
    paging.sort = action.data.sort;
    setValidData(state, action.type);
  } else if (action.type === actions.SET_CURRENT_PAGE) {
    const actionName = getActionName(action.data.actionType);
    let paging = state[actionName];
    if (!paging) {
      paging = state[actionName] = {};
    }
    paging.currentPage = action.data.page;
  } else if (action.type === actions.FETCH_USERS_SUCCESS) {
    setValidData(state, action.type);
  } else if (
    action.type === actions.DELETE_BLOG_SUCCESS ||
    action.type === actions.ADD_BLOG_SUCCESS
  ) {
    set(state, "FETCH_BLOGS.pages", null);
  }
}, {});

const uiReducer = combineReducers({
  pending,
  error,
  paging
});

export default uiReducer;

/**** SELECTORS ****/

export const getPending = (state, actionType) =>
  state.pending[getActionName(actionType)] || false;

export const getError = (state, actionType) =>
  state.error[getActionName(actionType)];

export const getPageIds = (state, actionType) => {
  const pageData = state.paging[getActionName(actionType)];
  if (!pageData || !pageData.pages) {
    return [];
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

export const getIsPageFetched = (state, actionType, page, sort) => {
  const pageData = state.paging[getActionName(actionType)];
  if (!pageData || !pageData.pages) {
    return false;
  }
  return !!pageData.pages[page] && sort === pageData.sort;
};

export const getLastPage = (state, actionType) => {
  const pageData = state.paging[getActionName(actionType)];
  if (!pageData) {
    return null;
  }
  return pageData.lastPage;
};
