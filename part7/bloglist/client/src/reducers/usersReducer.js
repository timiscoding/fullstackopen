import * as actionTypes from "../constants/actionTypes";
import { combineReducers } from "redux";
import { removeDupes } from "./utils";

const addUsers = (state, action) => {
  const { response } = action;
  const {
    entities: { users }
  } = response;
  return {
    ...state,
    ...users
  };
};

const deleteBlogFromUser = (state, action) => {
  const { data } = action;
  const { userId, id: blogId } = data;

  const blogList = state[userId].blogs.filter(id => id !== blogId);
  if (blogList.length) {
    const { [userId]: userToUpdate } = state;
    const updatedUser = { ...userToUpdate, blogs: blogList };
    return {
      ...state,
      [userId]: updatedUser
    };
  }
  return state;
};

const addAllUsersFromBlogList = (state, action) => {
  // can't get users from normalizr's result array because it contains
  // the blog ids, not the user ids. To get the user ids, we have to
  // manually get it from the entities.users object
  const { response } = action;
  const {
    entities: { users }
  } = response;
  return removeDupes([...state, ...Object.keys(users)]);
};

const addBlogToUser = (state, action) => {
  const { response } = action;
  const {
    entities: { users }
  } = response;
  const userId = Object.keys(users)[0];
  const user = state[userId] ? state[userId] : users[userId];

  return {
    ...state,
    [userId]: {
      ...user,
      blogs: [...users[userId].blogs]
    }
  };
};

// TEST create a new user without any blogs and add blog. check that user is added to store properly
const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_BLOGS_SUCCESS:
    case actionTypes.FETCH_BLOG_SUCCESS:
    case actionTypes.FETCH_USERS_SUCCESS:
    case actionTypes.FETCH_USER_SUCCESS:
      return addUsers(state, action);
    case actionTypes.DELETE_BLOG_SUCCESS:
      return deleteBlogFromUser(state, action);
    case actionTypes.ADD_BLOG_SUCCESS:
      return addBlogToUser(state, action);
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case actionTypes.FETCH_BLOGS_SUCCESS:
    case actionTypes.FETCH_BLOG_SUCCESS:
    case actionTypes.ADD_BLOG_SUCCESS:
      return addAllUsersFromBlogList(state, action);
    case actionTypes.FETCH_USERS_SUCCESS:
      return [...action.response.result];
    case actionTypes.FETCH_USER_SUCCESS:
      return removeDupes([...state, action.response.result]);
    default:
      return state;
  }
};

const usersReducer = combineReducers({
  byId,
  allIds
});

export default usersReducer;

export const getUser = (state, id) => {
  return state.byId[id];
};

export const getUsers = state => state.allIds.map(id => state.byId[id]);
