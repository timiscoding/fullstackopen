import React, { useLayoutEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions";
import { getPending, getUsers } from "../../reducers";
import * as actionTypes from "../../constants/actionTypes";
import Users from "./UsersView";
import Error from "../Error";
import { getError } from "../../reducers";

const UsersContainer = ({
  users,
  fetchUsers,
  error,
  isFetchingUsers,
  history
}) => {
  useLayoutEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUserClick = userId => {
    history.push(`/users/${userId}`);
  };

  if (error) return <Error error={error} />;

  return (
    <>
      <h2>Users</h2>
      {!isFetchingUsers && users.length === 0 && <p>No users to show</p>}
      {
        <Users
          users={isFetchingUsers ? null : users}
          onUserClick={handleUserClick}
        />
      }
    </>
  );
};

const mapStateToProps = (state, { location }) => ({
  isFetchingUsers: getPending(state, actionTypes.FETCH_USERS_REQUEST),
  users: (() => {
    const query = new URLSearchParams(location.search);
    let sort;
    for (let [k, v] of query.entries()) {
      const [, sortBy] = k.match(/sort\[(.*)\]/) || [];
      if (sortBy) {
        sort = {
          sort: sortBy,
          order: v
        };
      }
    }
    return getUsers(state, sort);
  })(),
  error: getError(state, actionTypes.FETCH_USERS_REQUEST)
});

export default connect(mapStateToProps, { fetchUsers })(UsersContainer);
