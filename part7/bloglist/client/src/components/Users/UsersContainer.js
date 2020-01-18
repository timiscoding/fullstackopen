import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { clearFix } from "polished";
import { Helmet } from "react-helmet";
import { fetchUsers } from "../../actions";
import { getPending, getPage } from "../../reducers";
import * as actionTypes from "../../constants/actionTypes";
import Users from "./UsersView";
import Error from "../Error";
import Pager from "../Pager";
import Dropdown from "../Dropdown";
import { getError } from "../../reducers";

const SortDropdown = styled(Dropdown)`
  --dd-width: 200px;
  float: right;
`;

const SortWrapper = styled.div`
  margin-bottom: 10px;
  ${clearFix()}
`;

const StyledUsers = styled(Users)`
  margin-bottom: 20px;
`;

const SORT_OPTIONS = [
  { value: "blogCount-desc", title: "Sort by: Most blogs first" },
  { value: "blogCount-asc", title: "Sort by: Fewest blogs first" },
  { value: "name-asc", title: "Sort by: Name A-Z" },
  { value: "name-desc", title: "Sort by: Name Z-A" },
  { value: "username-asc", title: "Sort by: Username A-Z" },
  { value: "username-desc", title: "Sort by: Username Z-A" }
];

const MOST_BLOGS_FIRST = SORT_OPTIONS[0].value;

const UsersContainer = ({
  fetchUsers,
  error,
  isFetchingUsers,
  history,
  location,
  page
}) => {
  const [pageNum, setPageNum] = useState();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get("page") || 1;
    const sort = params.get("sort") || MOST_BLOGS_FIRST;
    fetchUsers({ page, sort });
    setPageNum(page);
  }, [fetchUsers, location]);

  const handleUserClick = userId => {
    history.push(`/users/${userId}`);
  };

  const handleChange = (type, value) => {
    const params = new URLSearchParams(location.search);
    if (type === "page") {
      params.set("page", value);
    }
    if (type === "sort") {
      params.set("page", 1);
      params.set("sort", value);
    }
    history.push(`?${params}`);
  };
  if (error) return <Error error={error} />;
  const pending = isFetchingUsers || !page?.currentPage;
  return (
    <>
      <Helmet>
        <title>{pageNum ? `Users - Page ${pageNum}` : "Users"}</title>
      </Helmet>
      <h2>Users</h2>
      <SortWrapper>
        <SortDropdown
          onChange={sort => handleChange("sort", sort)}
          options={SORT_OPTIONS}
          defaultValue={
            new URLSearchParams(location.search).get("sort") || MOST_BLOGS_FIRST
          }
        />
      </SortWrapper>
      <StyledUsers
        users={page?.items}
        onUserClick={handleUserClick}
        pending={pending}
      />
      <Pager
        onClick={page => handleChange("page", page)}
        currentPage={page?.currentPage}
        lastPage={page?.lastPage}
        pending={pending}
      />
    </>
  );
};

const mapStateToProps = state => ({
  isFetchingUsers: getPending(state, actionTypes.FETCH_USERS_REQUEST),
  error: getError(state, actionTypes.FETCH_USERS_REQUEST),
  page: getPage(state, actionTypes.FETCH_USERS_REQUEST)
});

export default connect(mapStateToProps, { fetchUsers })(UsersContainer);
