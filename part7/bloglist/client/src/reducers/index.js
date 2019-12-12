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
    blog.user = getUser(state, blog.user, { populateBlogs: false });
    blog.comments = getComments(state, blog.comments);
  }
  return blog;
};

export const getUser = (state, id, { populateBlogs = true } = {}) => {
  let user = fromUsers.getUser(state.users, id);
  if (user && populateBlogs) {
    user = { ...user };
    const blogs = [];
    for (let blogId of user.blogs) {
      const blog = getBlog(state, blogId);
      if (!blog) {
        return null; // invalidate user because blogs haven't been fetched yet
      }
      blogs.push(blog);
    }
    user.blogs = blogs;
  }
  return user;
};

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

export const getError = (state, actionType) =>
  fromUi.getError(state.ui, actionType);

export const getNotificationId = state =>
  fromNotifications.getNotificationId(state);

const getItems = (state, actionType) => {
  const actionName = getActionName(actionType);
  let items;
  if (actionName === "FETCH_BLOGS") {
    items = state.blogs;
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

export const getIsPageFetched = (state, actionType, page, sort) =>
  fromUi.getIsPageFetched(state.ui, actionType, page, sort);

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
      }
      allIds: [b1, ...]
    },
    comments: {
      byId: {
        c1: {
          id: c1,
          body,
        }
      },
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
          invalidData: boolean,
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
          ...
        }
      },
    }
  }
*/
