const setCurrentUser = (state, action) => {
  const { response, data } = action;
  const user = response ? response : data;
  return {
    ...user
  };
};

const currentUserReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return setCurrentUser(state, action);
    case "CLEAR_USER":
      return null;
    default:
      return state;
  }
};

export default currentUserReducer;

/**** SELECTORS ****/

export const getCurrentUser = state => state;
