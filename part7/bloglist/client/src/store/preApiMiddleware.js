import * as actionTypes from "../constants/actionTypes";
import * as actions from "../actions";
import { getIsPageFetched } from "../reducers";

export default ({ getState }) => next => action => {
  if (action.HTTP_ACTION === undefined) {
    return next(action);
  }

  const state = getState();
  const { type, data } = action.HTTP_ACTION;

  if (type === actionTypes.FETCH_BLOGS_REQUEST) {
    const setPageAction = actions.setCurrentPage(type, data.page);
    if (getIsPageFetched(state, type, data.page, data.sort)) {
      return next(setPageAction);
    }
    action.HTTP_ACTION.onSuccess = () => setPageAction;
  }

  return next(action);
};
