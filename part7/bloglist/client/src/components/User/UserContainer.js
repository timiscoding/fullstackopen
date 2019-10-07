import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUser, getPending } from "../../reducers";
import { fetchUser } from "../../actions";
import * as actionTypes from "../../constants/actionTypes";
import { getError } from "../../reducers";
import Error from "../Error";
import User from "./UserView";

const UserContainer = ({ user, fetchUser, match, isFetchingUser, error }) => {
  useEffect(() => {
    if (!user) {
      fetchUser(match.params.id);
    }
  }, [user, fetchUser, match.params.id]);

  if (error) return <Error message={error} />;
  if (!user || isFetchingUser) return <p>Loading...</p>;

  return <User user={user} />;
};

const mapStateToProps = (state, { match }) => ({
  user: getUser(state, match.params.id),
  isFetchingUser: getPending(state, actionTypes.FETCH_USER_REQUEST),
  error: getError(state, actionTypes.FETCH_USER_REQUEST)
});

export default connect(
  mapStateToProps,
  { fetchUser }
)(UserContainer);
