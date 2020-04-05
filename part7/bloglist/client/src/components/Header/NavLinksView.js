import React from "react";
import styled, { css } from "styled-components/macro";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { styling } from "../../constants";

const NavList = styled.nav`
  padding: 0;
`;

const StyledNavLink = styled(NavLink)`
  display: inline-block;
  letter-spacing: 0.1em;
  text-decoration: none;
  color: ${({ theme }) => theme.secondary};
  line-height: ${styling.navbarHeight};
  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.secondaryDark};
  }
  &:active {
    color: ${({ theme }) => theme.secondaryDarker};
  }
  :not(:last-child) {
    margin-right: 20px;
  }

  ${styling.mobile(css`
    display: block;
    padding: 10px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.greyDark};
    :not(:last-child) {
      margin-right: 0;
    }
    &:active {
      background-color: ${({ theme }) => theme.primaryLight};
    }
  `)}
`;

const NavLinksView = ({ currentUserId, onLogout, onClickLink }) => {
  return (
    <NavList onClick={onClickLink}>
      <StyledNavLink exact to="/blogs">
        Blogs
      </StyledNavLink>
      <StyledNavLink exact to="/users">
        Users
      </StyledNavLink>
      {currentUserId ? (
        <>
          <StyledNavLink to={`/users/${currentUserId}`}>
            My Profile
          </StyledNavLink>
          <StyledNavLink as={"a"} href="#" onClick={onLogout}>
            Log out
          </StyledNavLink>
        </>
      ) : (
        <>
          <StyledNavLink to="/login">Login</StyledNavLink>
          <StyledNavLink to="/register">Register</StyledNavLink>
        </>
      )}
    </NavList>
  );
};

NavLinksView.propTypes = {
  currentUserId: PropTypes.string,
  onLogout: PropTypes.func,
  onClickLink: PropTypes.func,
};

export default NavLinksView;
