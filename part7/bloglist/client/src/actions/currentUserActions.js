import { httpAction } from "./index";
import { setErrorNotification } from "./notificationActions";
import * as actionTypes from "../constants/actionTypes";

export const login = credentials =>
  httpAction({
    type: actionTypes.LOGIN_REQUEST,
    method: "post",
    url: "/api/login",
    payload: credentials,
    onFail: err => setErrorNotification("Problem logging in", err)
  });

export const setUser = user => ({
  type: "LOGIN_SUCCESS",
  data: user
});

export const logout = () => ({
  type: "CLEAR_USER"
});
