import React, { useRef } from "react";
import PropTypes from "prop-types";
import { config, useTransition } from "react-spring";
import { Wrapper, Life, CloseButton, Message } from "./styled";

const NotificationView = ({ notification, onClear, timeoutMs = 5000 }) => {
  const cancelRef = useRef();
  const transition = useTransition(notification, (n) => n && n.message, {
    from: {
      life: "100%",
      angle: -90,
    },
    enter: () => async (next, cancel) => {
      cancelRef.current = cancel;
      await next({
        angle: 0,
        config: config.wobbly,
      });
      await next({
        life: "0%",
        config: { duration: timeoutMs },
      });
    },
    leave: [
      {
        angle: -90,
        config: config.default,
      },
      { config: { duration: timeoutMs } },
    ],
    onRest: (item) => {
      item && typeof onClear === "function" && onClear(); // after enter animation ends, trigger the leave animation
    },
  });
  return transition.map(
    ({ item, props: { angle, life }, key }) =>
      item && (
        <Wrapper
          style={{
            transform: angle.interpolate(
              (a) => `perspective(250px) rotateX(${a}deg)`
            ),
          }}
          type={item.type}
          key={key}
        >
          <CloseButton
            onClick={() => {
              cancelRef.current && cancelRef.current();
            }}
          />
          <Life style={{ right: life }} />
          <Message type={item.type}>{item.message}</Message>
        </Wrapper>
      )
  );
};

NotificationView.propTypes = {
  notification: PropTypes.shape({
    type: PropTypes.oneOf(["success", "error"]).isRequired,
    message: PropTypes.string.isRequired,
  }),
};

export default NotificationView;
