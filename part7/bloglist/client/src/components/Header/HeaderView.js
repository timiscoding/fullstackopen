import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import capitalize from "lodash/capitalize";
import Notification from "../Notification";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
`;

const Header = styled.header`
  background-color: ${({ theme }) => theme.primaryDark};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
`;

const Logo = styled.h2`
  user-select: none;
  font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic,
    "AppleGothic", sans-serif;
  font-size: 20px;
  margin: 0px;
  text-align: left;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.secondary};
  text-shadow: 2px 2px 0px ${({ theme }) => theme.primaryDark},
    5px 3px 1px rgba(255, 255, 255, 0.5);
  &:hover {
    color: ${({ theme }) => theme.secondaryDark};
  }
`;

const Nav = styled.nav`
  text-align: right;
`;

const StyledNavLink = styled(NavLink)`
  margin-right: 20px;
  text-decoration: none;
  color: ${({ theme }) => theme.secondary};
  &:hover {
    text-decoration: none;
    color: ${({ theme }) => theme.secondaryDark};
  }
  &:active {
    color: ${({ theme }) => theme.secondaryDarker};
  }
`;

const LogoLink = styled(NavLink)`
  &:hover {
    text-decoration: none;
  }
`;

const HeaderView = ({ currentUser, onLogout }) => {
  return (
    <Wrapper>
      <Header>
        <LogoLink to="/">
          <Logo>BlogList</Logo>
        </LogoLink>
        <Nav>
          <StyledNavLink exact to="/blogs">
            Blogs
          </StyledNavLink>
          <StyledNavLink exact to="/users">
            Users
          </StyledNavLink>
          {currentUser !== null ? (
            <>
              <StyledNavLink to={`/users/${currentUser.id}`}>
                {capitalize(currentUser.name)}
              </StyledNavLink>
              <StyledNavLink href="#" as={"a"} onClick={onLogout}>
                Log out
              </StyledNavLink>
            </>
          ) : (
            <>
              <StyledNavLink to="/login">Login</StyledNavLink>
              <StyledNavLink to="/register">Register</StyledNavLink>
            </>
          )}
        </Nav>
      </Header>
      <Notification />
    </Wrapper>
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
