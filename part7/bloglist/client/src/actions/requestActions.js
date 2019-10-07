export const httpAction = ({
  type = "NOOP",
  url = null,
  method = "GET",
  headers = {},
  payload = null, // data to send in HTTP request
  data = null, // data for reducer, can be thought of as data to pass thru to reducer from action creator
  schema = null, // normalizr schema used to transform response
  onSuccess = null, // actions to dispatch on a successful response, can be a thunk
  onFail = null, // actions to dispatch on a failed response
  notify = null // notifications to show while request is in progress { request: string, success: string, fail: string }
}) => ({
  HTTP_ACTION: {
    type,
    url,
    method,
    headers,
    data,
    payload,
    schema,
    onSuccess,
    onFail,
    notify
  }
});
