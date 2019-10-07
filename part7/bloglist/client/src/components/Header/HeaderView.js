import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import Notification from "../Notification";
import "./Header.css";

const HeaderView = ({ currentUser, onLogout }) => {
  return (
    <div>
      <nav>
        <NavLink exact to="/blogs">
          blogs
        </NavLink>
        <NavLink exact to="/users">
          users
        </NavLink>
        {currentUser !== null ? (
          <span>
            {currentUser.name} logged in{" "}
            <button onClick={onLogout}>Log out</button>
          </span>
        ) : (
          <>
            <NavLink to="/login">login</NavLink>
            <NavLink to="/register">register</NavLink>
          </>
        )}
      </nav>
      <Notification />
    </div>
  );
};

HeaderView.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired
  }),
  onLogout: PropTypes.func.isRequired
};

export default HeaderView;
