export const required = (message = "Required field") => val => {
  if (!val.trim()) return message;
};

export const minLength = min => val => {
  if (val.length < min) return `Must be at least ${min} characters`;
};

export const passwordMatch = (val, values) => {
  if (val !== values.password)
    return "Password and Confirm Password fields must match";
};

export const omit = (obj, name) => {
  // eslint-disable-next-line no-unused-vars
  const { [name]: omitted, ...newObj } = obj;
  return newObj;
};
