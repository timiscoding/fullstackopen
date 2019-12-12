import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
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
  font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic,
    "AppleGothic", sans-serif;
  font-size: 20px;
  margin: 0px;
  text-align: left;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.primaryLighter};
  text-shadow: 2px 2px 0px ${({ theme }) => theme.primaryDark},
    5px 3px 1px rgba(255, 255, 255, 0.5);
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

const User = styled.span`
  color: #e8e8e8;
  margin-right: 20px;
`;

const HeaderView = ({ currentUser, onLogout }) => {
  return (
    <Wrapper>
      <Header>
        <Logo>BlogList</Logo>
        <Nav>
          <StyledNavLink exact to="/blogs">
            Blogs
          </StyledNavLink>
          <StyledNavLink exact to="/users">
            Users
          </StyledNavLink>
          {currentUser !== null ? (
            <>
              <User>
                {currentUser.name[0].toUpperCase() + currentUser.name.substr(1)}{" "}
                logged in
              </User>
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
