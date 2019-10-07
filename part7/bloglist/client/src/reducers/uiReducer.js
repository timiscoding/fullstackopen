import { combineReducers } from "redux";
import { getActionName } from "./utils";

const pending = (state = {}, action) => {
  const { type } = action;
  const actionName = getActionName(type);

  if (type.endsWith("_REQUEST")) {
    return {
      ...state,
      [actionName]: true
    };
  }

  if (type.endsWith("_SUCCESS") || type.endsWith("_FAIL")) {
    return {
      ...state,
      [actionName]: false
    };
  }

  return {
    ...state
  };
};

const error = (state = {}, action) => {
  const { type, error } = action;
  const actionName = getActionName(type);

  if (type.endsWith("_FAIL")) {
    return {
      ...state,
      [actionName]: error
    };
  }

  if (type.endsWith("_REQUEST") || type.endsWith("_SUCCESS")) {
    return {
      ...state,
      [actionName]: null
    };
  }

  return {
    ...state
  };
};

const uiReducer = combineReducers({
  pending,
  error
});

export default uiReducer;

export const getPending = (state, actionType) =>
  state.pending[getActionName(actionType)] || false;

export const getError = (state, actionType) =>
  state.error[getActionName(actionType)];
