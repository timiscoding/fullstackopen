import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../actions";
import { getPending, getUsers } from "../../reducers";
import * as actionTypes from "../../constants/actionTypes";
import Users from "./UsersView";
import Error from "../Error";
import Loading from "../Loading";
import { getError } from "../../reducers";

const UsersContainer = ({ users, fetchUsers, error, isFetchingUsers }) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  if (error) return <Error error={error} />;
  if (isFetchingUsers && users.length === 0) return <Loading label="users" />;
  if (!isFetchingUsers && users.length === 0) return <h2>No users</h2>;
  if (users.length > 0) return <Users users={users} />;
};

const mapStateToProps = state => ({
  isFetchingUsers: getPending(state, actionTypes.FETCH_USERS_REQUEST) || true,
  users: getUsers(state),
  error: getError(state, actionTypes.FETCH_USERS_REQUEST)
});

export default connect(
  mapStateToProps,
  { fetchUsers }
)(UsersContainer);
