// import { getNotificationId } from "../reducers";

export const setNotification = (message, type = "success") => ({
  type: "SET_NOTIFICATION",
  data: {
    message,
    type
  }
});

export const setErrorNotification = (message, error) =>
  setNotification(error ? `${message} (${error.message})` : message, "error");

export const clearNotification = () => ({
  type: "CLEAR_NOTIFICATION"
});
