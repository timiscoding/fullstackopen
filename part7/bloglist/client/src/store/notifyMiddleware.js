import {
  setNotification,
  clearNotification,
  setErrorNotification
} from "../actions/notificationActions";
import { getActionName } from "../reducers/utils";

export default ({ getState }) => next => action => {
  if (!action.notify) return next(action);

  next(action);

  const {
    request: requestMsg,
    success: successMsg,
    fail: failMsg
  } = action.notify;

  if (action.type.endsWith("_REQUEST") && requestMsg) {
    next(setNotification(requestMsg, null, { autoClose: false }));
  }

  if (action.type.endsWith("_SUCCESS")) {
    if (successMsg) {
      next(setNotification(successMsg));
    } else {
      next(clearNotification());
    }
  }

  if (action.type.endsWith("_FAIL")) {
    if (failMsg) {
      const error = getState().ui.error[getActionName(action.type)];
      next(setErrorNotification(failMsg, error));
    } else {
      next(clearNotification());
    }
  }
};
