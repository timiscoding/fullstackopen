import * as actionTypes from "../constants/actionTypes";

export default (draft, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_INPUT: {
      draft.values[action.name] = action.value;
      draft.validity[action.name] = !action.error;
      if (action.error) {
        draft.errors[action.name] = action.error;
      } else {
        delete draft.errors[action.name];
      }
      return;
    }
    case actionTypes.SET_ERRORS: {
      draft.errors = action.errors;
      Object.entries(action.errors).forEach(([name, error]) => {
        draft.validity[name] = !error;
      });
      return;
    }
    case actionTypes.CLEAR_INPUT: {
      draft.values[action.name] = "";
      delete draft.validity[action.name];
      delete draft.errors[action.name];
      return;
    }
    case actionTypes.CLEAR_ALL: {
      draft.values = {};
      draft.validity = {};
      draft.errors = {};
      return;
    }
    default:
      return Error("Unknown action");
  }
};
