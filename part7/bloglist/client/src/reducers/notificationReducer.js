import * as actionTypes from "../constants/actionTypes";

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATION:
      return {
        ...action.data
      };
    case actionTypes.CLEAR_NOTIFICATION:
      return null;
    default:
      return state;
  }
};

export default notificationReducer;

/**** SELECTORS ****/

export const getNotificationId = state => state.cancelId;
