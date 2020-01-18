import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import BlogList from "../BlogList";
import Toggleable from "../Toggleable";
import BlogForm from "./BlogForm";
import Error from "../Error";
import Pager from "../Pager";
import { SortBlogsDropdown } from "../Dropdown";
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

const StyledPager = styled(Pager)`
  margin-bottom: 20px;
`;

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
  const [pageNum, setPageNum] = useState();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const page = query.get("page") || 1;
    const sort = query.get("sort") || SortBlogsDropdown.DEFAULT_VALUE;
    fetchBlogs({ page, sort });
    setPageNum(page);
  }, [fetchBlogs, location]);

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
  const pending = !page.currentPage || isFetchingBlogs;
  return (
    <>
      <Helmet>
        <title>{pageNum ? `Blogs - Page ${pageNum}` : "Blogs"}</title>
      </Helmet>
      <h2>Blogs</h2>
      <div>
        <SortBlogsDropdown
          onChange={sort => handleChange("sort", sort)}
          defaultValue={new URLSearchParams(location.search).get("sort")}
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
      </div>
      <BlogList blogs={page?.items} onLike={handleLike} pending={pending} />
      <StyledPager
        currentPage={page?.currentPage}
        lastPage={page?.lastPage}
        maxNavPages={6}
        onClick={page => handleChange("page", page)}
        pending={pending}
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
