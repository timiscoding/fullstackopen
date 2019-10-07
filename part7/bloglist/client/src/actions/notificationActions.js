import { getNotificationId } from "../reducers";

export const setNotification = (
  message,
  type = "success",
  { autoClose = true } = {}
) => (dispatch, getState) => {
  let cancelId = getNotificationId(getState());
  clearTimeout(cancelId);

  if (autoClose) {
    cancelId = setTimeout(() => dispatch(clearNotification()), 5000);
    console.log("cancelId", cancelId);
  }
  dispatch({
    type: "SET_NOTIFICATION",
    data: {
      message,
      type,
      cancelId
    }
  });
};

export const setErrorNotification = (message, error) =>
  setNotification(error ? `${message} (${error.message})` : message, "error");

export const clearNotification = () => ({
  type: "CLEAR_NOTIFICATION"
});
