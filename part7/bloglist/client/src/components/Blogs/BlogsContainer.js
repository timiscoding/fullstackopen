import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import BlogList from "./BlogList";
import Toggleable from "../Toggleable";
import BlogForm from "./BlogForm";
import Error from "../Error";
import Pager from "../Pager";
import Dropdown from "../Dropdown";
import { fetchBlogs, likeBlog } from "../../actions";
import { getPending, getCurrentUser, getError, getPage } from "../../reducers";
import * as actionTypes from "../../constants/actionTypes";
import { ReactComponent as AddIcon } from "../../icons/add.svg";

const StyledAddIcon = styled(AddIcon)`
  width: 1.1em;
  height: 1.1em;
  fill: white;
  vertical-align: middle;
  margin-right: 5px;
`;

const StyledToggleable = styled(Toggleable)`
  margin-bottom: 10px;
`;

const SortDropdown = styled(Dropdown)`
  --dd-width: 200px;
  float: right;
`;

const Wrapper = styled.div`
  // position: relative;
`;

const sortOptions = [
  {
    value: "createdAt-desc",
    title: "Sort by: Newest first"
  },
  {
    value: "createdAt-asc",
    title: "Sort by: Oldest first"
  },
  {
    value: "title-asc",
    title: "Sort by: Title A-Z"
  },
  {
    value: "title-desc",
    title: "Sort by: Title Z-A"
  },
  {
    value: "likes-desc",
    title: "Sort by: Most popular first"
  },
  {
    value: "likes-asc",
    title: "Sort by: Least popular first"
  }
];

const BlogsContainer = ({
  currentUser,
  fetchBlogs,
  isAddingBlog,
  error,
  isFetchingBlogs,
  history,
  location,
  likeBlog,
  page
}) => {
  const blogFormRef = React.useRef(null);
  const SORT_BY_NEWEST = sortOptions[0].value;

  useLayoutEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = query.get("page") || 1;
    const sort = query.get("sort") || SORT_BY_NEWEST;
    fetchBlogs({ page, sort });
  }, [fetchBlogs, location, SORT_BY_NEWEST]);

  const handleLike = blog => {
    if (!currentUser) {
      history.push("/login");
      return;
    }
    likeBlog(blog);
  };

  const handleChange = (param, value) => {
    const params = new URLSearchParams(location.search);
    if (param === "page") {
      params.set("page", value);
    }
    if (param === "sort") {
      params.set("sort", value);
      params.set("page", 1);
    }
    history.push(`?${params}`);
  };

  if (error) return <Error error={error} />;
  return (
    <>
      <h2>Blogs</h2>
      <Wrapper>
        <SortDropdown
          options={sortOptions}
          defaultValue={
            new URLSearchParams(location.search).get("sort") || SORT_BY_NEWEST
          }
          onChange={sort => handleChange("sort", sort)}
        />
        {currentUser ? (
          <StyledToggleable
            buttonLabel={() => (
              <>
                <StyledAddIcon />{" "}
                <span style={{ fontSize: "1em" }}>Add Blog</span>
              </>
            )}
            ref={blogFormRef}
          >
            <BlogForm
              blogAdded={() => blogFormRef.current.toggleVisible()}
              pending={isAddingBlog}
            />
          </StyledToggleable>
        ) : null}
      </Wrapper>
      {!isFetchingBlogs && page.items.length === 0 && <h2>No blogs</h2>}

      <BlogList
        blogs={page.items}
        onLike={handleLike}
        pending={isFetchingBlogs}
      />
      <Pager
        currentPage={page.currentPage}
        lastPage={page.lastPage}
        maxNavPages={6}
        onClick={page => handleChange("page", page)}
      />
    </>
  );
};

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
  isFetchingBlogs: getPending(state, actionTypes.FETCH_BLOGS_REQUEST),
  isAddingBlog: getPending(state, actionTypes.ADD_BLOG_REQUEST),
  error: getError(state, actionTypes.FETCH_BLOGS_REQUEST),
  page: getPage(state, actionTypes.FETCH_BLOGS_REQUEST)
});

export default connect(mapStateToProps, { fetchBlogs, likeBlog })(
  BlogsContainer
);
