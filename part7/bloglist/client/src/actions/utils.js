export const setPageSearchParams = ({ page = 1, limit = 10, sort, userId }) => {
  const params = new URLSearchParams();
  page = parseInt(page);
  params.set("offset", (page - 1) * limit);
  params.set("limit", limit);
  params.set("sort", sort);
  const data = {
    page,
    limit,
    sort
  };
  if (userId) {
    params.set("userId", userId);
    data.userId = userId;
  }
  return [data, params];
};
