export const required = (message = "Required field") => (val) =>
  val.trim().length > 0 || message;

export const minLength = (min) => (val) =>
  val.length >= min || `Must be at least ${min} characters`;

export const passwordMatch = (val, { values }) =>
  val === values.password || "Password and Confirm Password fields must match";

export const password = (value, { setValues }) => {
  setValues({ confirmPassword: "" });
  return minLength(3)(value);
};

export const confirmPassword = (
  confirmValue,
  { values, validity, setValues }
) => {
  // returning anything other than a boolean stops any validity styling
  if (confirmValue.length === 0) return null;
  if (!validity.password) {
    setValues({ confirmPassword: "" });
    return "Please enter a password first";
  }
  return (
    values.password === confirmValue ||
    "Password and confirmation fields must match"
  );
};

export const isValidUrlScheme = (url) =>
  ["http://", "https://"].some(
    (p) => typeof url === "string" && url.startsWith(p)
  );

export const matchUrl = (val) => {
  try {
    val = val.trim();
    if (!isValidUrlScheme(val)) {
      val = "http://" + val;
    }
    new URL(val);
    return true;
  } catch (err) {
    return "Invalid URL provided";
  }
};
