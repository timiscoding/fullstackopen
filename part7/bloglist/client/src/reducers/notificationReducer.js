const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...action.data
      };
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

export default notificationReducer;

/**** SELECTORS ****/

export const getNotificationId = state => state.cancelId;
