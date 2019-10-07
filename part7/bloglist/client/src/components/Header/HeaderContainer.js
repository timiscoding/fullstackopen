import React, { useEffect } from "react";
import { connect } from "react-redux";
import { currentUserLocalStorageKey } from "../../constants/authentication";
import Header from "./HeaderView";
import { getCurrentUser } from "../../reducers";
import { logout, setUser } from "../../actions";

const HeaderContainer = ({ logout, setUser, currentUser }) => {
  const checkStoredCurrentUser = () => {
    const currentUserJSON = window.localStorage.getItem(
      currentUserLocalStorageKey
    );
    if (!currentUserJSON) return;
    const currentUser = JSON.parse(currentUserJSON);
    setUser(currentUser);
  };

  const updateStoredCurrentUser = () => {
    if (currentUser) {
      window.localStorage.setItem(
        currentUserLocalStorageKey,
        JSON.stringify(currentUser)
      );
    } else {
      window.localStorage.removeItem(currentUserLocalStorageKey);
    }
  };

  useEffect(checkStoredCurrentUser, []);
  useEffect(updateStoredCurrentUser, [currentUser]);

  return <Header currentUser={currentUser} onLogout={logout} />;
};

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state)
});

export default connect(
  mapStateToProps,
  { logout, setUser }
)(HeaderContainer);
