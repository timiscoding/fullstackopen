import { normalize } from "normalizr";
import * as actions from "../constants/actionTypes";

export default () => next => action => {
  if (action.TRANSFORM_ACTION === undefined) {
    return next(action);
  }

  const { type, data, response, schema } = action.TRANSFORM_ACTION;

  let transformResp;

  if (type === actions.FETCH_BLOGS_SUCCESS) {
    // Response shape includes metadata so additional processing
    // has to be done before updating the store.

    // transform response into a format that blog and ui reducers understand
    transformResp = {
      count: response.count,
      items: normalize(response.items, schema)
    };
  } else {
    transformResp = schema ? normalize(response, schema) : response;
  }

  return next({
    type,
    data, // data sent in action creator
    response: transformResp // data returned by server
  });
};
