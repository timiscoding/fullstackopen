import { combineReducers } from "redux";
import notification, * as fromNotifications from "./notificationReducer";
import blogs, * as fromBlogs from "./blogsReducer";
import currentUser, * as fromCurrentUser from "./currentUserReducer";
import users, * as fromUsers from "./usersReducer";
import ui, * as fromUi from "./uiReducer";
import comments, * as fromComments from "./commentsReducer";

const rootReducer = combineReducers({
  notification,
  blogs,
  currentUser,
  users,
  ui,
  comments
});

export default rootReducer;

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
    user.blogs = user.blogs.map(blogId => getBlog(state, blogId));
  }
  return user;
};

export const getUsers = state => fromUsers.getUsers(state.users);

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
/* store schema

  httpAction:
  {
    type: 'FETCH_BLOGS_REQUEST',
    url,
    payload,
    data,
    method,
    headers,
    schema,
    onSuccess: (response) => actionCreator,
    onFail: err => actionCreator
  }

  fetch_blogs_request
  fetch_blogs_success
  fetch_blogs_fail

  fetch_blog_request
  fetch_blog_success
  fetch_blog_fail

  delete_blog_request
  delete_blog_success
  delete_blog_fail


  like_blog_request
  like_blog_success
  like_blog_fail

  fetch_comments_request
  fetch_comments_success
  fetch_comments_fail

  add_comment_request
  add_comment_success
  add_comment_fail

  fetch_users_request
  fetch_users_success
  fetch_users_fail

  fetch_user_request
  fetch_user_success
  fetch_user_fail

  login_request
  login_success
  login_fail

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
    }
  }
*/
