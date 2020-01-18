import * as actionTypes from "../constants/actionTypes";
import { httpAction } from "./index";
import { userListSchema, userSchema } from "../schemas";
import { setNotification, setErrorNotification } from "./notificationActions";
import { setPageSearchParams } from "./utils";

export const fetchUsers = ({ page, limit, sort }) => {
  const [data, params] = setPageSearchParams({ page, limit, sort });
  return httpAction({
    type: actionTypes.FETCH_USERS_REQUEST,
    url: `/api/users?${params}`,
    schema: userListSchema,
    data
  });
};

export const fetchUser = id => {
  return httpAction({
    type: actionTypes.FETCH_USER_REQUEST,
    url: `/api/users/${id}`,
    schema: userSchema
  });
};

export const registerUser = (credentials, history) =>
  httpAction({
    type: actionTypes.REGISTER_USER_REQUEST,
    url: "/api/users",
    method: "POST",
    payload: credentials,
    schema: userSchema,
    onSuccess: () => {
      history.push("/login");
      return setNotification("Account successfully created. Please login");
    },
    onFail: err => setErrorNotification("Failed to create new account", err)
  });
