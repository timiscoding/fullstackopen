import { combineReducers } from "redux";
import { createSelector } from "reselect";
import notification, * as fromNotifications from "./notificationReducer";
import blogs, * as fromBlogs from "./blogsReducer";
import currentUser, * as fromCurrentUser from "./currentUserReducer";
import users, * as fromUsers from "./usersReducer";
import ui, * as fromUi from "./uiReducer";
import comments, * as fromComments from "./commentsReducer";
import { getActionName } from "./utils";

const rootReducer = combineReducers({
  notification,
  blogs,
  currentUser,
  users,
  ui,
  comments
});

export default rootReducer;

/**** TOP LEVEL SELECTORS ****/

export const getBlog = (state, id) => {
  let blog = fromBlogs.getBlog(state.blogs, id);
  if (blog) {
    blog = { ...blog };
    blog.user = getUser(state, blog.user);
    blog.comments = getComments(state, blog.comments);
  }
  return blog;
};

export const getUser = (state, id) => fromUsers.getUser(state.users, id);

export const getUsers = (state, sortBy = { sort: "name", order: "asc" }) =>
  fromUsers.getUsers(state.users, sortBy);

export const getBlogs = state => fromBlogs.getBlogs(state.blogs);

export const getPending = (state, actionType) =>
  fromUi.getPending(state.ui, actionType);

const getComments = (state, ids) => {
  return fromComments.getComments(state.comments, ids);
};

export const getCurrentUser = state =>
  fromCurrentUser.getCurrentUser(state.currentUser);

export const getError = (state, actionTypes) =>
  fromUi.getError(state.ui, actionTypes);

export const getNotificationId = state =>
  fromNotifications.getNotificationId(state);

const getItems = (state, actionType) => {
  const actionName = getActionName(actionType);
  let items;
  if (actionName === "FETCH_BLOGS") {
    items = state.blogs;
  } else if (actionName === "FETCH_COMMENTS") {
    items = state.comments;
  } else if (actionName === "FETCH_USERS") {
    items = state.users;
  }
  return items.byId;
};
const getPageIds = (state, actionType) =>
  fromUi.getPageIds(state.ui, actionType);
export const getCurrentPage = (state, actionType) =>
  fromUi.getCurrentPage(state.ui, actionType);
const getLastPage = (state, actionType) =>
  fromUi.getLastPage(state.ui, actionType);
export const getPage = createSelector(
  [getPageIds, getCurrentPage, getLastPage, getItems],
  (itemsIds, currentPage, lastPage, items) => {
    return {
      items: itemsIds.map(id => items[id]),
      currentPage,
      lastPage
    };
  }
);

export const getIsPageFetched = (state, actionType, data) =>
  fromUi.getIsPageFetched(state.ui, actionType, data);

/**** STORE SCHEMA ****

  {
    blogs: {
      byId: {
        b1: {
          id: b1,
          author,
          title,
          url,
          likes,
          user: u1
          comments: [c1, ...]
        },
        ...
      },
      allIds: [b1, ...],
      byUser: {
        userId1: [b1, b2, ...],
      }
    },
    comments: {
      c1: {
        id: c1,
        body,
        blog: "blogId"
      },
      ...
    },
    users: {
      byId: {
        u1: {
          id: u1,
          name,
          username,
          blogs: [b1, ...]
        }
      },
      allUsers: [u1, ...]
    },
    login: {
      token,
      username,
      name
    },
    ui: {
      pending: {
        FETCH_BLOGS: true,
        FETCH_BLOG: false,
        FETCH_USER: false
      },
      error: {
        FETCH_BLOG: message,
      },
      paging: {
        FETCH_BLOGS: {
          currentPage,
          lastPage,
          limit,
          sort,
          pages: {
            1: [blogIds],
            2: [blogIds],
          }
        },
        FETCH_USERS: {
          ...same fields as FETCH_BLOGS
        },
        FETCH_COMMENTS: {
          blogId,
          ...same fields as FETCH_BLOGS
        }
      },
    }
  }
*/
