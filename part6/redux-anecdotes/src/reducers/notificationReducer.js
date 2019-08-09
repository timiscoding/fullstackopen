const notificationReducer = (state = { message: null }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        message: action.message
      };
    case 'CLEAR_NOTIFICATION':
      return { message: null };
    default:
      return state;
  }
};

export const setNotification = (message, timeInSec) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message,
    });
    await new Promise((resolve) => {
      setTimeout(() => {
        dispatch(clearNotification());
        resolve();
      }, timeInSec * 1000);
    })
  };
};

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' };
};

export default notificationReducer;
