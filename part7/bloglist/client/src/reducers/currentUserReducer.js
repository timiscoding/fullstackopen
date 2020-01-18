import * as actionTypes from "../constants/actionTypes";

const setCurrentUser = (state, action) => {
  const { response, data } = action;
  if (action.type === actionTypes.LOGIN_SUCCESS) {
    return {
      token: response.token,
      username: response.user.username,
      name: response.user.name,
      id: response.user.id
    };
  }
  return {
    ...data
  };
};

const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.SET_USER:
      return setCurrentUser(state, action);
    case actionTypes.CLEAR_USER:
      return null;
    default:
      return state;
  }
};

export default currentUserReducer;

/**** SELECTORS ****/

export const getCurrentUser = state => state;
