import React from "react";
import styled from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { animated, useTransition } from "react-spring";
import { styling } from "../../constants";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.primaryDark};
  ${styling.reserveScrollBarGap("padding-left")}
`;

export const Logo = styled.span`
  user-select: none;
  font-size: 1.3em;
  font-weight: 700;
  margin: 0px;
  text-align: left;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.secondary};
  text-shadow: 2px 2px 0px ${({ theme }) => theme.primaryDark},
    5px 3px 1px rgba(255, 255, 255, 0.5);
  &:hover {
    color: ${({ theme }) => theme.secondaryDark};
  }
`;

export const Navbar = styled.header`
  line-height: ${styling.navbarHeight};
  ${styling.mobile(`
    padding: 0;
  `)}
  max-width: ${styling.maxPageWidth};
  margin: 0 auto;
  @media (max-width: ${styling.maxPageWidth}) {
    margin: 0 10px;
  }
`;

export const NavbarDesktop = styled.nav`
  display: flex;
  justify-content: space-between;

  ${styling.mobile(`
    display: none;
  `)}
`;

export const NavbarMobile = styled.nav`
  display: none;
  ${styling.mobile(`
    display: flex;
    justify-content: space-between;
  `)}
`;

export const MobileOverlay = styled(animated.div)`
  position: fixed;
  content: "";
  bottom: 0;
  top: ${styling.navbarHeight};
  left: 0;
  right: 0;
  background: #000;
`;

export const MobileNav = styled(animated.div)`
  background-color: ${({ theme }) => theme.primary};
  border-top: 1px solid ${({ theme }) => theme.greyDark};
  position: fixed;
  bottom: 0;
  top: ${styling.navbarHeight};
  right: 0;
  left: 20%;
`;

export const LogoLink = styled(NavLink)`
  &:hover {
    text-decoration: none;
  }
  ${styling.mobile(`
    padding-left: 5px;
  `)}
`;

export const AnimateSideNav = ({ show, children }) => {
  const transitions = useTransition(show, null, {
    from: {
      transform: "translateX(100%)",
      opacity: 0,
    },
    enter: {
      transform: "translateX(0%)",
      opacity: 0.5,
    },
    leave: {
      transform: "translateX(100%)",
      opacity: 0,
    },
  });

  return transitions.map(
    ({ item: showMobileMenu, props: styles, key }) =>
      showMobileMenu && <div key={key}>{children(styles)}</div>
  );
};
