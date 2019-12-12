import * as actionTypes from "../constants/actionTypes";

export const setCurrentPage = (actionType, page) => ({
  type: actionTypes.SET_CURRENT_PAGE,
  data: {
    page,
    actionType
  }
});
