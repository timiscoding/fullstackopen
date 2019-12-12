import * as actionTypes from "../constants/actionTypes";
import { combineReducers } from "redux";
import produce from "immer";
import union from "lodash/union";
import uniq from "lodash/uniq";

const addUsers = (state, action) => {
  const { response } = action;
  // if data is paginated, the data is namespaced under 'items' as there's additional metadata
  // in the response. Else the data is normalized directly and supplied in the response.
  const { users } = response.entities || response.items.entities;
  return {
    ...state,
    ...users
  };
};

const deleteBlogFromUser = produce((state, action) => {
  const { data } = action;
  const { userId, id: blogId } = data;

  const blogList = state[userId].blogs.filter(id => id !== blogId);
  if (blogList.length) {
    state[userId].blogs = blogList;
  }
});

const addAllUsersFromBlogList = (state, action) => {
  // can't get users from normalizr's result array because it contains
  // the blog ids, not the user ids. To get the user ids, we have to
  // manually get it from the entities.users object
  const { response } = action;
  const { users } = response.entities || response.items.entities;
  return union(state, Object.keys(users));
};

const addBlogToUser = produce((state, action) => {
  const { response } = action;
  const {
    entities: { users }
  } = response;
  const [[userId, user]] = Object.entries(users); // users contains only the user who added the blog
  state[userId].blogs = [...user.blogs];
});

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
      return uniq([...state, action.response.result]);
    default:
      return state;
  }
};

const usersReducer = combineReducers({
  byId,
  allIds
});

export default usersReducer;

/**** SELECTORS ****/

export const getUser = (state, id) => {
  return state.byId[id];
};

export const getUsers = (state, sortBy) => {
  const users = state.allIds.map(id => state.byId[id]);
  if (sortBy) {
    const { order, sort } = sortBy;
    users.sort((a, b) => {
      if (sort === "name") {
        ({ name: a } = a);
        ({ name: b } = b);
        a = a.toLowerCase();
        b = b.toLowerCase();
        return order === "asc" ? a > b : a < b;
      } else if (sort === "blogCount") {
        ({ blogs: a } = a);
        ({ blogs: b } = b);
        return order === "asc" ? a.length - b.length : b.length - a.length;
      } else {
        throw Error(`Unable to sort by: ${sort}`);
      }
    });
  }
  return users;
};
