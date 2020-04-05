import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import capitalize from "lodash/capitalize";
import { getUser } from "../../reducers";
import { fetchUser, deleteBlogs, fetchBlogs, likeBlog } from "../../actions";
import * as actionTypes from "../../constants/actionTypes";
import { getError, getCurrentUser, getPage } from "../../reducers";
import Error from "../Error";
import User from "./UserView";
import { SortBlogsDropdown } from "../Dropdown";
import { getPending } from "../../reducers";

const UserContainer = ({
  user,
  fetchUser,
  match,
  error,
  deleteBlogs,
  history,
  currentUser,
  fetchBlogs,
  page,
  location,
  isFetchingUser,
  isFetchingBlogs,
  likeBlog
}) => {
  const [pageNum, setPageNum] = useState();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page") || 1;
    const sort = params.get("sort") || SortBlogsDropdown.DEFAULT_VALUE;
    const userId = match.params.id;
    if (!user) {
      fetchUser(userId);
    }
    if (!page?.items) {
      fetchBlogs({ userId, page, sort });
      setPageNum(page);
    }
  }, [fetchUser, match.params.id, fetchBlogs, location, user]);
  const handleDeleteBlogs = ids => deleteBlogs(ids, user.id, history);
  const handleChange = (type, value) => {
    const params = new URLSearchParams(location.search);
    if (type === "page") {
      params.set("page", value);
    }
    if (type === "sort") {
      params.set("sort", value);
      params.set("page", 1);
    }
    history.push(`?${params}`);
  };
  if (error) return <Error error={error} />;
  const userId = match.params.id;
  const currentUserId = currentUser?.id;
  const isCurrentUser =
    userId === currentUserId && typeof currentUserId === "string";
  const title = {
    name: (user?.username && capitalize(user.username)) ?? "User",
    page: pageNum
  };
  return (
    <>
      <Helmet>
        <title>{`${title.name} - Page ${title.page}`}</title>
      </Helmet>
      <User
        user={user}
        onDeleteBlogs={handleDeleteBlogs}
        onLikeBlog={likeBlog}
        showActions={isCurrentUser}
        blogPage={{ ...page, onPageChange: val => handleChange("page", val) }}
        onSortBlogsChange={val => handleChange("sort", val)}
        sortBlogs={new URLSearchParams(location.search).get("sort")}
        pending={{
          blogs: isFetchingBlogs || !page.currentPage,
          user: isFetchingUser || !user
        }}
      />
    </>
  );
};

const mapStateToProps = (state, { match }) => ({
  user: getUser(state, match.params.id),
  error: getError(state, [
    actionTypes.FETCH_USER_REQUEST,
    actionTypes.FETCH_BLOGS_REQUEST
  ]),
  currentUser: getCurrentUser(state),
  page: getPage(state, actionTypes.FETCH_BLOGS_REQUEST),
  isFetchingBlogs: getPending(state, actionTypes.FETCH_BLOGS_REQUEST),
  isFetchingUser: getPending(state, actionTypes.FETCH_USER_REQUEST)
});

export default connect(mapStateToProps, {
  fetchUser,
  deleteBlogs,
  fetchBlogs,
  likeBlog
})(UserContainer);
