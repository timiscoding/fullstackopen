import axios from "axios";

const login = async credentials => {
  try {
    const response = await axios.post("/api/login", credentials);
    return response.data;
  } catch (err) {
    let message = "Could not login, try again later";
    console.log("error", err.response);
    if (err.response.status === 401) {
      message = err.response.data.error;
    }
    throw Error(message);
  }
};

export default { login };
