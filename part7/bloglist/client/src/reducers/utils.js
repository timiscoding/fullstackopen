export const removeDupes = arr => [...new Set(arr)];

export const getActionName = httpActionType =>
  httpActionType
    .split("_")
    .slice(0, -1)
    .join("_");
