import React, { useState } from "react";
import PropTypes from "prop-types";
import NavLinks from "./NavLinksView";
import Notification from "../Notification";
import {
  Wrapper,
  Navbar,
  NavbarDesktop,
  NavbarMobile,
  LogoLink,
  Logo,
  MobileOverlay,
  MobileNav,
  AnimateSideNav
} from "./styled";
import { MobileMenuButton } from "../Button/types";

const HeaderView = ({ currentUser, onLogout }) => {
  const [showSideNav, setShowSideNav] = useState(false);

  const handleLogout = e => {
    e.preventDefault();
    onLogout();
  };
  const handleToggleSidebar = () => setShowSideNav(!showSideNav);
  const navLinksProps = {
    onLogout: handleLogout,
    currentUserId: currentUser?.id
  };
  return (
    <Wrapper>
      <Navbar>
        <NavbarDesktop>
          <LogoLink to="/">
            <Logo>BlogList</Logo>
          </LogoLink>
          <NavLinks {...navLinksProps} />
        </NavbarDesktop>
        <NavbarMobile>
          <LogoLink to="/">
            <Logo>BL</Logo>
          </LogoLink>
          <MobileMenuButton onClick={handleToggleSidebar} showX={showSideNav} />
        </NavbarMobile>
      </Navbar>
      <AnimateSideNav show={showSideNav}>
        {({ opacity, transform }) => (
          <>
            <MobileOverlay onClick={handleToggleSidebar} style={{ opacity }} />
            <MobileNav
              style={{
                transform
              }}
            >
              <NavLinks
                {...navLinksProps}
                onClickLink={() => setShowSideNav(false)}
              />
            </MobileNav>
          </>
        )}
      </AnimateSideNav>
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
