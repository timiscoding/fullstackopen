import React, { useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";

const Wrapper = styled.div`
  position: absolute;
  right: 10px;
  top: calc(100% + 10px);
  width: 20%;
  text-align: center;
  font-size: 16px;
  border-width: 1px;
  border-style: solid;
  padding: 10px;
  background-color: ${({ type, theme }) =>
    type === "success" ? theme.greenLighter : theme.redLighter};
  border-color: black;
  transform-origin: center top;
  transition: transform 0.4s;

  &.swing-enter {
    transform: perspective(250px) rotateX(-90deg);
  }

  &.swing-enter-done {
    transform: perspective(250px) rotateX(0deg);
    transition-timing-function: cubic-bezier(0.2, 2.25, 0.9, 0.5);
  }

  &.swing-exit {
    transform: perspective(250px) rotateX(0deg);
  }

  &.swing-exit-done {
    transform: perspective(250px) rotateX(-90deg);
    transition-timing-function: cubic-bezier(0.4, -0.7, 0, 0.9);
  }
`;

const NotificationView = ({ notification }) => {
  const notificationRef = useRef();
  return (
    <CSSTransition
      in={!!notification}
      timeout={400}
      classNames="swing"
      mountOnEnter
    >
      {() => {
        if (notification !== null) {
          notificationRef.current = { ...notification };
        }

        const { type, message } = notificationRef.current;
        return <Wrapper type={type}>{message}</Wrapper>;
      }}
    </CSSTransition>
  );
};

NotificationView.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.oneOf(["success", "error"]).isRequired,
    message: PropTypes.string.isRequired
  })
};

export default NotificationView;
