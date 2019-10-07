import Axios from "axios";
import { batch } from "react-redux";
import { normalize } from "normalizr";
import { getActionName } from "../reducers/utils";

export default ({ getState }) => next => async action => {
  if (action.HTTP_ACTION === undefined) return next(action);

  const {
    type,
    url,
    method,
    schema,
    payload,
    data,
    onSuccess,
    onFail,
    headers,
    notify
  } = action.HTTP_ACTION;
  const actionName = getActionName(type);
  const { currentUser } = getState();
  if (currentUser && currentUser.token) {
    headers.authorization = `bearer ${currentUser.token}`;
  }
  next({ type, notify });
  try {
    const response = await Axios({
      method,
      headers,
      baseURL: process.env.REACT_APP_BASE_URL,
      url,
      data: payload
    });
    const transformResp = schema
      ? normalize(response.data, schema)
      : response.data;
    let retVal;
    batch(() => {
      retVal = next({
        type: `${actionName}_SUCCESS`,
        data, // data sent in action creator
        response: transformResp, // data returned by server
        notify
      });
      onSuccess && next(onSuccess(data, transformResp));
    });
    return retVal;
  } catch (err) {
    let error;
    if (err.response) {
      const { data, status } = err.response;
      if (data) {
        error = { status, message: data.error || data };
      } else {
        error = { status, message: err.message };
      }
    } else if (err.request) {
      error = { message: "Request was made but no response was received" };
    } else {
      error = {
        message: `There was a problem setting up the request (${err.message})`
      };
    }
    console.log(
      "error",
      err,
      "msg",
      err.message,
      "resp",
      err.response,
      "stored error",
      error
    );
    const retVal = next({
      type: `${actionName}_FAIL`,
      error,
      notify
    });
    onFail && next(onFail(error));
    return retVal;
  }
};
