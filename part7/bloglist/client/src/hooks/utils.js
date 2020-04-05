export const omit = (obj, name) => {
  // eslint-disable-next-line no-unused-vars
  const { [name]: omitted, ...newObj } = obj;
  return newObj;
};
