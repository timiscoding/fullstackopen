import axios from 'axios';
const baseUrl = '/api/blogs';

let authorization = '';

const setToken = (token) => {
  authorization = `bearer ${token}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addBlog = async (blog) => {
  try {
    const config = {
      headers: {
        authorization
      }
    };
    const response = await axios.post(baseUrl, blog, config);
    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
};

const updateBlog = async (id, blog) => {
  try {
    const config = {
      headers: {
        authorization
      }
    };
    const response = await axios
      .put(`${baseUrl}/${id}`, blog, config);

    return response.data;
  } catch (err) {
    throw Error(err.response.data.error);
  }
};

const deleteBlog = async (id) => {
  try {
    const config = {
      headers: {
        authorization,
      }
    };
    await axios.delete(`${baseUrl}/${id}`, config);
  } catch (err) {
    throw Error(err.response.data.error);
  }
};

export default { getAll, addBlog, updateBlog, deleteBlog, setToken };
