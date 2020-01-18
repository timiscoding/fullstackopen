import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { currentUserLocalStorageKey } from "../../constants/authentication";
import Header from "./HeaderView";
import { getCurrentUser } from "../../reducers";
import { logout, setUser, setNotification } from "../../actions";

const HeaderContainer = ({
  logout,
  setUser,
  currentUser,
  history,
  setNotification
}) => {
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

  const handleLogout = () => {
    logout();
    history.push("/");
    setNotification("You have been logged out");
  };

  useEffect(checkStoredCurrentUser, []);
  useEffect(updateStoredCurrentUser, [currentUser]);

  return <Header currentUser={currentUser} onLogout={handleLogout} />;
};

const mapStateToProps = state => ({
  currentUser: getCurrentUser(state)
});

export default withRouter(
  connect(mapStateToProps, { logout, setUser, setNotification })(
    HeaderContainer
  )
);
