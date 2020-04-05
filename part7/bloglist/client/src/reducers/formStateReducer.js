import * as actionTypes from "../constants/actionTypes";

const isString = val => typeof val === "string";

export default (draft, action) => {
  const updateValidity = ({ name, validateRes }) => {
    if (isString(validateRes)) {
      draft.validity[name] = false;
      draft.errors[name] = validateRes;
    } else if (validateRes === true) {
      draft.validity[name] = true;
      delete draft.errors[name];
    } else {
      delete draft.errors[name];
      delete draft.validity[name];
    }
  };

  switch (action.type) {
    case actionTypes.INIT_VALUE: {
      draft.values[action.name] = action.value;
      return;
    }
    case actionTypes.INIT_VALUES: {
      draft.values = action.values;
      return;
    }
    case actionTypes.CHANGE_INPUT: {
      const { name, value, validateRes } = action;
      draft.values[name] = value;
      updateValidity({
        name,
        validateRes
      });
      return;
    }
    case actionTypes.SET_ERRORS: {
      action.validateResults.forEach(updateValidity);
      return;
    }
    case actionTypes.CLEAR_INPUT: {
      draft.values[action.name] = action.value;
      delete draft.validity[action.name];
      delete draft.errors[action.name];
      return;
    }
    case actionTypes.CLEAR_ALL: {
      draft.values = { ...action.values };
      draft.validity = {};
      draft.errors = {};
      return;
    }
    default:
      return Error("Unknown action");
  }
};
