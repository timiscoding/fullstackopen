import * as actionTypes from "../constants/actionTypes";
import { httpAction } from "./index";
import { userListSchema, userSchema } from "../schemas";
import { setNotification, setErrorNotification } from "./notificationActions";

export const fetchUsers = notify =>
  httpAction({
    type: actionTypes.FETCH_USERS_REQUEST,
    url: "/api/users",
    schema: userListSchema,
    notify
  });

export const fetchUser = id =>
  httpAction({
    type: actionTypes.FETCH_USER_REQUEST,
    url: `/api/users/${id}`,
    schema: userSchema
  });

export const registerUser = (creds, history) =>
  httpAction({
    type: actionTypes.REGISTER_USER_REQUEST,
    url: "/api/users",
    method: "POST",
    payload: creds,
    schema: userSchema,
    onSuccess: () => {
      history.push("/login");
      return setNotification("Account successfully created. Please login");
    },
    onFail: err => setErrorNotification("Failed to create new account", err)
  });
