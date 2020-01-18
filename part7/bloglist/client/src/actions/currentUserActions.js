import { httpAction } from "./index";
import { setErrorNotification, fetchUser } from "./";
import * as actionTypes from "../constants/actionTypes";

export const login = credentials =>
  httpAction({
    type: actionTypes.LOGIN_REQUEST,
    method: "post",
    url: "/api/login",
    payload: credentials,
    onFail: err => setErrorNotification("Problem logging in", err)
  });

export const setUser = user => dispatch => {
  dispatch({
    type: actionTypes.SET_USER,
    data: user
  });
  dispatch(fetchUser(user.id));
};

export const logout = () => ({
  type: actionTypes.CLEAR_USER
});
